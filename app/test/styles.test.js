import test from "node:test";
import assert from "node:assert/strict";
import { STYLES, DEFAULT_STYLE, findNode, styleName } from "../js/data/styles.js";
import { indexTree, frontier, workingPhase } from "../js/engine/graph.js";
import { generateSession } from "../js/engine/session.js";
import { newState, loadState, saveState } from "../js/engine/store.js";
import { seasonInfo } from "../js/engine/season.js";
import { MOVES } from "../js/moves3d.js";

const T = "2026-08-22";

test("registry: breaking is default, every pack has a style id and nodes", () => {
  assert.equal(DEFAULT_STYLE, "breaking");
  assert.ok(Object.keys(STYLES).length >= 2, "at least two style packs");
  for (const [id, tree] of Object.entries(STYLES)) {
    assert.equal(tree.style, id);
    assert.ok(tree.nodes.length > 10, `${id} has real content`);
    assert.ok(styleName(id).length > 0);
  }
});

for (const [id, tree] of Object.entries(STYLES)) {
  test(`${id}: every prereq and attribute reference resolves`, () => {
    const idx = indexTree(tree);
    for (const n of tree.nodes) {
      for (const p of n.prereqs ?? []) {
        assert.ok(idx.nodesById.has(p.id) || idx.attributesById.has(p.id),
          `${id}/${n.id} references unknown prereq ${p.id}`);
      }
    }
  });

  test(`${id}: a fresh dancer gets a valid session (phase-0 frontier, freestyle last)`, () => {
    const idx = indexTree(tree);
    const f = frontier(tree, idx, newState(T));
    assert.ok(f.length > 0, "fresh frontier non-empty");
    assert.equal(f[0].phase, 0, "lowest-phase material first");
    assert.equal(workingPhase(tree, newState(T)), 0);
    const sess = generateSession(tree, newState(T), "normal", T);
    const kinds = sess.blocks.map((b) => b.kind);
    assert.equal(kinds[0], "ignition");
    assert.equal(kinds[kinds.length - 1], "freestyle");
    assert.ok(kinds.includes("new"));
  });
}

test("hip hop pack: party moves carry provenance; seasons come from the pack", () => {
  const hh = STYLES.hiphop;
  const party = hh.nodes.filter((n) => n.family === "party");
  assert.ok(party.length >= 8, `party canon present (${party.length})`);
  for (const n of party) assert.ok(n.origin, `${n.id} missing origin credit`);
  const info = seasonInfo(newState(T), T, hh.seasons);
  assert.equal(info.theme, "Groove Season");
});

test("animated hip hop moves exist in the tree and the move library", () => {
  for (const id of ["groove.bounce", "party.running_man", "party.cabbage_patch", "party.dougie"]) {
    assert.ok(MOVES[id], `${id} animated`);
    const hit = findNode(id);
    assert.equal(hit.style, "hiphop");
    assert.ok(hit.node.checkpoints?.length, `${id} has teaching checkpoints`);
  }
});

test("per-style state is isolated; breaking keeps the legacy storage key", () => {
  const mem = new Map();
  const storage = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, v) };
  const b = { ...newState(T), sessions: [{ date: T, size: "mvs" }] };
  saveState(b, storage, "breaking");
  saveState(newState(T), storage, "hiphop");
  assert.ok(mem.has("dance-mastery-state-v1"), "legacy key preserved for breaking");
  assert.ok(mem.has("dance-mastery-state-v1:hiphop"));
  assert.equal(loadState(T, storage, "breaking").sessions.length, 1);
  assert.equal(loadState(T, storage, "hiphop").sessions.length, 0, "styles do not bleed into each other");
});

test("salsa pack: solo-first — partner nodes are flagged, late-phase, and frame prep is solo", () => {
  const sa = STYLES.salsa;
  const partnered = sa.nodes.filter((n) => n.partner);
  assert.ok(partnered.length >= 4, `partnerwork present (${partnered.length})`);
  for (const n of partnered) {
    assert.ok(n.phase >= 3, `${n.id} is partner-flagged but early-phase (${n.phase})`);
  }
  const frame = sa.nodes.find((n) => n.id === "partner.frame");
  assert.ok(frame && !frame.partner, "frame/connection prep is trainable solo");
  const named = sa.nodes.filter((n) => n.family === "shines" && n.origin);
  assert.ok(named.length >= 3, "named shines carry provenance");
  assert.ok(sa.attributes.some((a) => a.id === "attr.timing.l1"), "clave ear gate exists");
  const info = seasonInfo(newState(T), T, sa.seasons);
  assert.equal(info.theme, "Timing Season");
});

test("ballet pack: gate-heavy technique education with the pointe honesty node", () => {
  const ba = STYLES.ballet;
  assert.ok(ba.attributes.length >= 5, "ballet is readiness-gate heavy by design");
  const honesty = ba.nodes.find((n) => n.id === "meta.pointe_honesty");
  assert.ok(honesty, "pointe honesty node exists");
  assert.ok(honesty.checkpoints.some((c) => /in-person/.test(c)), "states the in-person assessment requirement");
  assert.ok(!ba.nodes.some((n) => /pointe/i.test(n.name) && n.type === "move"), "no pointe MOVE exists anywhere in the tree");
  const gated = ba.nodes.filter((n) => (n.prereqs ?? []).some((p) => p.id.startsWith("attr.")));
  assert.ok(gated.length >= 6, `attribute gates actually used (${gated.length})`);
  const info = seasonInfo(newState(T), T, ba.seasons);
  assert.equal(info.theme, "Alignment Season");
});

test("tango pack: embrace honesty gates the embrace itself; walk-first; códigos present", () => {
  const ta = STYLES.tango;
  const honesty = ta.nodes.find((n) => n.id === "meta.embrace_honesty");
  assert.ok(honesty, "embrace honesty node exists");
  assert.ok(honesty.checkpoints.some((c) => /cannot be taught by showing/.test(c)));
  const embrace = ta.nodes.find((n) => n.id === "partner.embrace");
  assert.ok(embrace.partner, "the embrace is partner-flagged");
  assert.ok(embrace.prereqs.some((p) => p.id === "meta.embrace_honesty" && p.kind === "hard"),
    "you must read the honest limit before the embrace unlocks");
  const walk = ta.nodes.find((n) => n.id === "walk.caminada");
  assert.equal(walk.phase, 0, "the walk is the first movement of the whole pack");
  assert.ok(ta.nodes.some((n) => n.id === "culture.codigos"), "milonga códigos are curriculum");
  assert.ok(ta.nodes.some((n) => n.id === "meta.practica"), "the práctica is a node, not a suggestion");
  const info = seasonInfo(newState(T), T, ta.seasons);
  assert.equal(info.theme, "The Walk Season");
});

test("afrobeats pack: every named move carries its origin; creator etiquette is curriculum", () => {
  const af = STYLES.afrobeats;
  const named = af.nodes.filter((n) => n.family === "named" && n.type === "move");
  assert.ok(named.length >= 6, `named-move canon present (${named.length})`);
  for (const n of named) assert.ok(n.origin, `${n.id} missing origin credit`);
  assert.ok(af.nodes.some((n) => n.id === "culture.creators"), "creator-crediting etiquette is a node");
  assert.ok(af.teachers?.length >= 2, "African-based teachers linked");
  const info = seasonInfo(newState(T), T, af.seasons);
  assert.equal(info.theme, "Bounce Season");
});

test("west african pack: foundation-only by design — lineage honesty enforced", () => {
  const wa = STYLES.westafrican;
  const honesty = wa.nodes.find((n) => n.id === "meta.lineage_honesty");
  assert.ok(honesty, "lineage honesty node exists");
  assert.ok(honesty.checkpoints.some((c) => /lineage teachers|tradition-bearers/.test(c)));
  const movement = wa.nodes.filter((n) => n.family === "movement");
  assert.ok(movement.length <= 3, `movement stays preparatory (${movement.length}) — the repertoire waits for partners`);
  assert.ok(wa.nodes.filter((n) => n.family === "rhythms").length >= 5, "rhythm literacy is the substance");
  assert.ok(wa.nodes.some((n) => n.id === "rhythm.break"), "the break (drum call) is curriculum");
  const info = seasonInfo(newState(T), T, wa.seasons);
  assert.equal(info.theme, "The Drum Season");
});

test("popping pack: Fresno lineage credited; 'not breakdance' is curriculum; the hit comes first", () => {
  const po = STYLES.popping;
  const origins = po.nodes.find((n) => n.id === "popculture.origins");
  assert.ok(origins.checkpoints.some((c) => /Boogaloo Sam/.test(c)), "Boogaloo Sam credited");
  assert.ok(origins.checkpoints.some((c) => /NOT 'breakdance'/.test(c)), "popping is popping — stated in the tree");
  const fresno = po.nodes.find((n) => n.id === "pop.fresno");
  assert.match(fresno.origin, /Boogaloo Sam/);
  const robot = po.nodes.find((n) => n.id === "robot.dimestop");
  assert.match(robot.origin, /predating popping/, "the robot's older lineage is honest");
  const hit = po.nodes.find((n) => n.id === "pop.hit");
  assert.equal(hit.phase, 0, "the hit is the atom — before any illusion vocabulary");
  const info = seasonInfo(newState(T), T, po.seasons);
  assert.equal(info.theme, "The Hit Season");
});

test("locking pack: Don Campbell credited on the lock and point; named moves keep their creators", () => {
  const lo = STYLES.locking;
  assert.match(lo.nodes.find((n) => n.id === "lock.lock").origin, /Don Campbell/);
  assert.match(lo.nodes.find((n) => n.id === "point.point").origin, /Don Campbell/);
  assert.match(lo.nodes.find((n) => n.id === "lflow.scoobydoo").origin, /Jimmy 'Scoo B Doo' Foster/);
  assert.ok(lo.nodes.some((n) => n.id === "lockculture.lockers"), "The Lockers are curriculum");
  assert.ok(lo.nodes.some((n) => n.id === "lockculture.character"), "humor-as-technique is a node");
  const info = seasonInfo(newState(T), T, lo.seasons);
  assert.equal(info.theme, "Groove & Lock Season");
});

test("house pack: the jack comes first; club roots credited; borrowed steps say where they came from", () => {
  const ho = STYLES.house;
  const jack = ho.nodes.find((n) => n.id === "jack.basic");
  assert.equal(jack.phase, 0, "the jack is house's heartbeat — footwork waits");
  const roots = ho.nodes.find((n) => n.id === "houseculture.roots");
  assert.ok(roots.checkpoints.some((c) => /Frankie Knuckles/.test(c)), "Warehouse lineage credited");
  assert.match(ho.nodes.find((n) => n.id === "hfoot.pdbr").origin, /ballet/, "pas de bourrée credits its source");
  assert.ok(ho.nodes.some((n) => n.id === "meta.house_club"), "dancing WITH people is the final node");
  const info = seasonInfo(newState(T), T, ho.seasons);
  assert.equal(info.theme, "Jack Season");
});

test("waacking pack: queer club origins are the root, in curriculum; Proctor credited", () => {
  const wa = STYLES.waacking;
  const origins = wa.nodes.find((n) => n.id === "wculture.origins");
  assert.ok(origins.checkpoints.some((c) => /gay clubs/.test(c) && /punking/.test(c)), "punking origin told straight");
  assert.ok(wa.nodes.some((n) => n.id === "wculture.proctor"), "Tyrone Proctor is curriculum");
  const today9 = wa.nodes.find((n) => n.id === "wculture.today");
  assert.ok(today9.checkpoints.some((c) => /weren't welcomed/.test(c)), "the welcome principle stated");
  const info = seasonInfo(newState(T), T, wa.seasons);
  assert.equal(info.theme, "Disco Season");
});

test("dancehall pack: every named step credits Bogle; etiquette is curriculum", () => {
  const dh = STYLES.dancehall;
  const named = dh.nodes.filter((n) => n.family === "named");
  assert.ok(named.length >= 3, `named canon present (${named.length})`);
  for (const n of named) assert.match(n.origin, /Bogle/, `${n.id} credits its creator`);
  assert.ok(dh.nodes.some((n) => n.id === "dculture.bogle"), "Bogle's story is a node");
  const etiquette = dh.nodes.find((n) => n.id === "dculture.etiquette");
  assert.ok(etiquette.checkpoints.some((c) => /Jamaican teachers/.test(c)), "learn from the source");
  const info = seasonInfo(newState(T), T, dh.seasons);
  assert.equal(info.theme, "Riddim Season");
});

test("vogue pack: foundation-only — ballroom honesty hard-gates the movement prep", () => {
  const vo = STYLES.vogue;
  const honesty = vo.nodes.find((n) => n.id === "meta.ballroom_honesty");
  assert.ok(honesty, "honesty node exists");
  assert.ok(honesty.checkpoints.some((c) => /cannot make anyone part of ballroom/.test(c)));
  for (const id of ["vfound.catwalk", "vfound.hands"]) {
    const n = vo.nodes.find((x) => x.id === id);
    assert.ok(n.prereqs.some((p) => p.id === "meta.ballroom_honesty" && p.kind === "hard"),
      `${id} gated behind the honest limit`);
  }
  const ballroom = vo.nodes.find((n) => n.id === "vculture.ballroom");
  assert.ok(ballroom.checkpoints.some((c) => /LGBTQ/.test(c) && /Harlem/.test(c)), "whose culture it is, stated");
  const movement = vo.nodes.filter((n) => n.family === "movement");
  assert.ok(movement.length <= 4, `movement stays preparatory (${movement.length}) — the categories are learned in community`);
  assert.ok(vo.nodes.some((n) => n.id === "meta.vogue_class"), "the community class is the final destination");
  const info = seasonInfo(newState(T), T, vo.seasons);
  assert.equal(info.theme, "History Season");
});

test("bachata pack: Dominican-first — root credited, derivative branches named honestly, partner late", () => {
  const ba = STYLES.bachata;
  const dr = ba.nodes.find((n) => n.id === "bculture.dr");
  assert.ok(dr.checkpoints.some((c) => /Dominican Republic/.test(c)), "DR named as the origin");
  const branches = ba.nodes.find((n) => n.id === "bculture.branches");
  assert.ok(branches.checkpoints.some((c) => /derivative, not the origin/.test(c)), "sensual named as derivative");
  for (const n of ba.nodes.filter((x) => x.partner)) {
    assert.ok(n.phase >= 3, `${n.id} partner-flagged but early-phase (${n.phase})`);
  }
  const frame = ba.nodes.find((n) => n.id === "bpartner.frame");
  assert.ok(frame && !frame.partner, "frame prep is trainable solo");
  const info = seasonInfo(newState(T), T, ba.seasons);
  assert.equal(info.theme, "Guitar Season");
});

test("kizomba pack: Angola credited; connection honesty hard-gates the partnered embrace", () => {
  const ki = STYLES.kizomba;
  const angola = ki.nodes.find((n) => n.id === "kculture.angola");
  assert.ok(angola.checkpoints.some((c) => /Luanda, Angola/.test(c)), "Luanda named");
  assert.ok(ki.nodes.some((n) => n.id === "kculture.semba"), "semba parentage is curriculum");
  const honesty = ki.nodes.find((n) => n.id === "meta.connection_honesty");
  assert.ok(honesty.checkpoints.some((c) => /cannot be taught by video or app/.test(c)));
  const embrace = ki.nodes.find((n) => n.id === "kpartner.embrace");
  assert.ok(embrace.partner, "the connection is partner-flagged");
  assert.ok(embrace.prereqs.some((p) => p.id === "meta.connection_honesty" && p.kind === "hard"),
    "the honest limit gates the embrace");
  const ginga = ki.nodes.find((n) => n.id === "kwalk.ginga");
  assert.equal(ginga.phase, 0, "the ginga is the first movement of the pack");
  const info = seasonInfo(newState(T), T, ki.seasons);
  assert.equal(info.theme, "Semba Roots Season");
});

test("lindy pack: Savoy lineage credited; solo jazz carries its names; swingout waits for partners", () => {
  const li = STYLES.lindy;
  const savoy = li.nodes.find((n) => n.id === "sculture.savoy");
  assert.ok(savoy.checkpoints.some((c) => /Black American dance/.test(c) && /Harlem/.test(c)));
  const legends = li.nodes.find((n) => n.id === "sculture.legends");
  assert.ok(legends.checkpoints.some((c) => /Frankie Manning/.test(c)));
  assert.ok(legends.checkpoints.some((c) => /Norma Miller/.test(c)));
  assert.match(li.nodes.find((n) => n.id === "sjazz.shorty_george").origin, /Snowden/);
  for (const n of li.nodes.filter((x) => x.partner)) {
    assert.ok(n.phase >= 3, `${n.id} partner-flagged but early-phase`);
  }
  const swingout = li.nodes.find((n) => n.id === "spartner.swingout");
  assert.ok(swingout.partner && swingout.checkpoints.some((c) => /Frankie Manning/.test(c)));
  const info = seasonInfo(newState(T), T, li.seasons);
  assert.equal(info.theme, "Pulse Season");
});

test("new-pack animations exist in tree + move library with teaching checkpoints", () => {
  for (const id of ["pop.fresno", "wave.arm", "lock.lock", "point.point", "jack.basic", "hfoot.pdbr"]) {
    assert.ok(MOVES[id], `${id} animated`);
    const hit = findNode(id);
    assert.ok(hit, `${id} in a tree`);
    assert.ok(hit.node.checkpoints?.length, `${id} has teaching checkpoints`);
  }
});

test("findNode resolves across packs and returns null for unknowns", () => {
  assert.equal(findNode("footwork.six_step").style, "breaking");
  assert.equal(findNode("party.wop").style, "hiphop");
  assert.equal(findNode("nope.nothing"), null);
});
