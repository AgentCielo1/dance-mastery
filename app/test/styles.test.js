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

test("samba pack: Afro-Brazilian roots credited; escolas are curriculum; genuinely solo", () => {
  const sb = STYLES.samba;
  const roots = sb.nodes.find((n) => n.id === "sbculture.roots");
  assert.ok(roots.checkpoints.some((c) => /Afro-Brazilian/.test(c) && /Angolan/.test(c)), "roots told straight");
  assert.ok(roots.checkpoints.some((c) => /Tia Ciata/.test(c)), "Tia Ciata's house credited");
  assert.ok(sb.nodes.some((n) => n.id === "sbculture.escolas"), "the escolas are curriculum");
  assert.equal(sb.nodes.filter((n) => n.partner).length, 0, "samba no pé needs no partner — zero partner nodes");
  const basic = sb.nodes.find((n) => n.id === "sbfoot.basic");
  assert.ok(basic.prereqs.some((p) => p.id === "sbfoot.bounce"), "spring before the basic — calves protected");
  const info = seasonInfo(newState(T), T, sb.seasons);
  assert.equal(info.theme, "Surdo Season");
});

test("forró pack: Gonzaga and the Northeast credited; three rhythms; partner late and friendly", () => {
  const fo = STYLES.forro;
  const gonzaga = fo.nodes.find((n) => n.id === "fculture.gonzaga");
  assert.ok(gonzaga.checkpoints.some((c) => /Luiz Gonzaga/.test(c) && /Baião/.test(c)));
  assert.ok(fo.nodes.some((n) => n.id === "fmusic.three"), "baião/xote/arrasta-pé are curriculum");
  const branches = fo.nodes.find((n) => n.id === "fculture.branches");
  assert.ok(branches.checkpoints.some((c) => /pé-de-serra/.test(c) && /root/.test(c)), "the root named");
  for (const n of fo.nodes.filter((x) => x.partner)) {
    assert.ok(n.phase >= 3, `${n.id} partner-flagged but early-phase`);
  }
  const info = seasonInfo(newState(T), T, fo.seasons);
  assert.equal(info.theme, "Baião Season");
});

test("brazilian zouk pack: lambada lineage told; NO head-movement move exists — the neck rule holds", () => {
  const bz = STYLES.bzouk;
  const lambada = bz.nodes.find((n) => n.id === "zculture.lambada");
  assert.ok(lambada.checkpoints.some((c) => /lambada/i.test(c) || /Porto Seguro/.test(c)), "lambada root credited");
  assert.ok(lambada.checkpoints.some((c) => /unrelated to kizomba/.test(c)), "the name confusion untangled");
  const honesty = bz.nodes.find((n) => n.id === "meta.neck_honesty");
  assert.ok(honesty.checkpoints.some((c) => /NEVER self-taught from video/.test(c)));
  assert.ok(!bz.nodes.some((n) => n.type === "move" && /head|cambr/i.test(n.name)),
    "no head-movement MOVE exists anywhere in the tree — like ballet's no-pointe rule");
  const wave = bz.nodes.find((n) => n.id === "zmove.wave");
  assert.ok(wave.prereqs.some((p) => p.id === "meta.neck_honesty" && p.kind === "hard"),
    "even shoulder-stopped waves require reading the safety limit");
  assert.ok(wave.checkpoints.some((c) => /STOPS AT THE SHOULDERS/.test(c)));
  const info = seasonInfo(newState(T), T, bz.seasons);
  assert.equal(info.theme, "Lambada Roots Season");
});

test("two-step pack: dance-hall lineage honest; floorcraft is curriculum; partner late", () => {
  const ts = STYLES.twostep;
  const halls = ts.nodes.find((n) => n.id === "tsculture.halls");
  assert.ok(halls.checkpoints.some((c) => /German and Czech/.test(c)), "immigrant dance-hall roots named");
  assert.ok(halls.checkpoints.some((c) => /Black American/.test(c) && /banjo/.test(c)), "country music's own debt acknowledged");
  assert.ok(ts.nodes.some((n) => n.id === "tsculture.floorcraft"), "line of dance is curriculum — the two-step's códigos");
  for (const n of ts.nodes.filter((x) => x.partner)) assert.ok(n.phase >= 3, `${n.id} partner-flagged but early`);
  const info = seasonInfo(newState(T), T, ts.seasons);
  assert.equal(info.theme, "Train Beat Season");
});

test("line dance pack: BOTH threads credited; choreographers named; genuinely solo", () => {
  const ld = STYLES.linedance;
  const threads = ld.nodes.find((n) => n.id === "ldculture.threads");
  assert.ok(threads.checkpoints.some((c) => /soul line dancing/.test(c) && /Black American/.test(c)),
    "the soul line dancing thread is told, not erased");
  assert.match(ld.nodes.find((n) => n.id === "lddance.electric").origin, /Ric Silver/);
  assert.match(ld.nodes.find((n) => n.id === "lddance.tushpush").origin, /Jim Ferrazzano/);
  assert.match(ld.nodes.find((n) => n.id === "lddance.cupid").origin, /Bryson Bernard/);
  assert.match(ld.nodes.find((n) => n.id === "lddance.cottoneye").origin, /traditional/, "no-author dances say so honestly");
  assert.ok(ld.nodes.some((n) => n.id === "ldculture.stepsheets"), "step-sheet crediting norm is curriculum");
  assert.equal(ld.nodes.filter((n) => n.partner).length, 0, "line dancing is alone-together — zero partner nodes");
  const info = seasonInfo(newState(T), T, ld.seasons);
  assert.equal(info.theme, "Vocabulary Season");
});

test("wcs pack: Lindy descent credited back to Harlem; the anchor is gated core work; partner late", () => {
  const wc = STYLES.wcs;
  const lineage = wc.nodes.find((n) => n.id === "wcculture.lineage");
  assert.ok(lineage.checkpoints.some((c) => /Lindy Hop/.test(c) && /Black American/.test(c)), "the Harlem root credited");
  assert.ok(lineage.checkpoints.some((c) => /Dean Collins/.test(c)), "the LA bridge named");
  assert.ok(lineage.checkpoints.some((c) => /Lindy pack/.test(c)), "cross-linked to this app's own Lindy tree");
  const anchor = wc.nodes.find((n) => n.id === "wcfoot.anchor");
  assert.ok(anchor.prereqs.some((p) => p.id === "attr.core.l1"), "the anchor sits on real core readiness");
  for (const n of wc.nodes.filter((x) => x.partner)) assert.ok(n.phase >= 3, `${n.id} partner-flagged but early`);
  const info = seasonInfo(newState(T), T, wc.seasons);
  assert.equal(info.theme, "Lineage Season");
});

test("k-pop pack: teaches skills, never routines — choreo copyright honesty enforced", () => {
  const kp = STYLES.kpop;
  const honesty = kp.nodes.find((n) => n.id === "meta.choreo_honesty");
  assert.ok(honesty.checkpoints.some((c) => /copyrighted|choreographic WORK/i.test(c)), "the legal rule stated");
  assert.ok(honesty.checkpoints.some((c) => /OFFICIAL dance-practice videos/.test(c)), "covers routed to the sanctioned door");
  assert.ok(!kp.nodes.some((n) => n.type === "move" && /routine|cover of/i.test(n.name)),
    "no node teaches a specific group's routine");
  const origins = kp.nodes.find((n) => n.id === "kpculture.origins");
  assert.ok(origins.checkpoints.some((c) => /Seo Taiji/.test(c)), "the 1992 spark credited");
  assert.ok(kp.nodes.some((n) => n.id === "kpculture.training"), "the trainee system acknowledged honestly");
  const cover = kp.nodes.find((n) => n.id === "meta.kpop_cover");
  assert.ok(cover.prereqs.some((p) => p.id === "meta.choreo_honesty" && p.kind === "hard"),
    "the cover milestone is gated on the honesty rule");
  const info = seasonInfo(newState(T), T, kp.seasons);
  assert.equal(info.theme, "Sharpness Season");
});

test("jazz pack: Black American roots named as the trunk; Dunham and Cole credited", () => {
  const jz = STYLES.jazz;
  const roots = jz.nodes.find((n) => n.id === "jzculture.roots");
  assert.ok(roots.checkpoints.some((c) => /Black American vernacular/.test(c)), "the trunk named");
  assert.ok(roots.checkpoints.some((c) => /Broadway.*middle, not the beginning/.test(c)), "the whitewash called out");
  const codifiers = jz.nodes.find((n) => n.id === "jzculture.codifiers");
  assert.ok(codifiers.checkpoints.some((c) => /Katherine Dunham/.test(c)));
  assert.ok(codifiers.checkpoints.some((c) => /Jack Cole/.test(c)));
  assert.ok(codifiers.checkpoints.some((c) => /copyrighted work/.test(c)), "Fosse's choreo stays his — rule applied");
  const iso = jz.nodes.find((n) => n.id === "jziso.tower");
  assert.equal(iso.phase, 0, "isolations open the pack — class starts here every day");
  const info = seasonInfo(newState(T), T, jz.seasons);
  assert.equal(info.theme, "Roots Season");
});

test("contemporary pack: the rebellions credited; floorwork gated and honestly capped", () => {
  const ct = STYLES.contemporary;
  const rebellions = ct.nodes.find((n) => n.id === "ctculture.rebellions");
  for (const name of ["Duncan", "Graham", "Humphrey", "Limón", "Cunningham", "Judson"]) {
    assert.ok(rebellions.checkpoints.some((c) => c.includes(name)), `${name} credited`);
  }
  const floor = ct.nodes.find((n) => n.id === "ctmove.floor");
  assert.ok(floor.prereqs.some((p) => p.id === "attr.wrists.l1"), "floor visits gated on wrist readiness");
  assert.ok(floor.checkpoints.some((c) => /sprung floor and a teacher/.test(c)), "the deep-floorwork limit stated");
  assert.ok(ct.nodes.some((n) => n.id === "ctmove.improv"), "improvisation is curriculum, not garnish");
  const today9 = ct.nodes.find((n) => n.id === "ctculture.today");
  assert.ok(today9.checkpoints.some((c) => /integrated companies/.test(c)), "every body is repertory here");
  const info = seasonInfo(newState(T), T, ct.seasons);
  assert.equal(info.theme, "Breath Season");
});

test("tap pack: a Black American art form, said plainly; the master lineage named; gear honesty", () => {
  const tp = STYLES.tap;
  const roots = tp.nodes.find((n) => n.id === "tpculture.roots");
  assert.ok(roots.checkpoints.some((c) => /Black American art form/.test(c)), "the art form named as what it is");
  assert.ok(roots.checkpoints.some((c) => /Master Juba/.test(c)), "the documented root credited");
  assert.ok(roots.checkpoints.some((c) => /minstrelsy/i.test(c)), "the honest history includes the shadow");
  const lineage = tp.nodes.find((n) => n.id === "tpculture.lineage");
  for (const name of ["Bojangles", "Bubbles", "Nicholas Brothers", "Gregory Hines", "Dianne Walker", "Savion Glover"]) {
    assert.ok(lineage.checkpoints.some((c) => c.includes(name)), `${name} credited`);
  }
  assert.ok(tp.nodes.some((n) => n.id === "tpculture.gear"), "apartment/gear honesty is curriculum");
  assert.match(tp.nodes.find((n) => n.id === "tpstep.timestep").origin, /belongs to the lineage/, "the time step credited to the tradition");
  const info = seasonInfo(newState(T), T, tp.seasons);
  assert.equal(info.theme, "Lineage Season");
});

test("irish pack: three branches told; Riverdance as moment, arms-down as lore; sean-nós honest", () => {
  const ir = STYLES.irish;
  const branches = ir.nodes.find((n) => n.id === "irculture.branches");
  assert.ok(branches.checkpoints.some((c) => /sean-nós/.test(c)), "the older style is in the story");
  const rd = ir.nodes.find((n) => n.id === "irculture.riverdance");
  assert.ok(rd.checkpoints.some((c) => /1994/.test(c)));
  assert.ok(rd.checkpoints.some((c) => /LORE/.test(c)), "the arms-down origin stories marked as lore, not fact");
  const sn = ir.nodes.find((n) => n.id === "irstep.seannos");
  assert.ok(sn.checkpoints.some((c) => /living tradition is the real teacher/.test(c)), "sean-nós intro stays honest");
  const info = seasonInfo(newState(T), T, ir.seasons);
  assert.equal(info.theme, "Reel Season");
});

test("flamenco pack: Gitano heart credited; cante-first hierarchy; zapateado gated behind the limit", () => {
  const fl = STYLES.flamenco;
  const roots = fl.nodes.find((n) => n.id === "flculture.roots");
  assert.ok(roots.checkpoints.some((c) => /Gitano/.test(c) && /Roma/.test(c)), "the Gitano heart credited by name");
  const hierarchy = fl.nodes.find((n) => n.id === "flculture.hierarchy");
  assert.ok(hierarchy.checkpoints.some((c) => /CANTE.*root|cante.*root/i.test(c)), "the song is the root");
  const honesty = fl.nodes.find((n) => n.id === "meta.cante_honesty");
  assert.ok(honesty.checkpoints.some((c) => /peña|tablao/.test(c)), "the living rooms named");
  const zap = fl.nodes.find((n) => n.id === "flmove.zapateado");
  assert.ok(zap.prereqs.some((p) => p.id === "meta.cante_honesty" && p.kind === "hard"),
    "footwork gated behind the honest limit");
  assert.ok(zap.checkpoints.some((c) => /belong with a teacher/.test(c)));
  const compas = fl.nodes.find((n) => n.id === "flmusic.compas");
  assert.equal(compas.phase, 0, "compás before everything — the absolute law");
  const info = seasonInfo(newState(T), T, fl.seasons);
  assert.equal(info.theme, "Compás Season");
});

test("raqs pack: Egyptian art named as its own; baladi root and golden age credited; orientalism named", () => {
  const rq = STYLES.raqs;
  const exonym = rq.nodes.find((n) => n.id === "rqculture.exonym");
  assert.ok(exonym.checkpoints.some((c) => /Western exonym/.test(c) && /raqs sharqi/.test(c)), "the name honesty stated");
  assert.ok(exonym.checkpoints.some((c) => /orientalist|exoticized/.test(c)), "orientalism's shadow named");
  const baladi = rq.nodes.find((n) => n.id === "rqculture.baladi");
  assert.ok(baladi.checkpoints.some((c) => /Badia Masabni/.test(c)), "the Cairo stage credited");
  assert.ok(baladi.checkpoints.some((c) => /Tahia Carioca/.test(c) && /Samia Gamal/.test(c)), "golden-age dancers credited");
  const shimmy = rq.nodes.find((n) => n.id === "rqhip.shimmy");
  assert.ok(shimmy.prereqs.some((p) => p.id === "attr.knees.l1"), "the shimmy is gated on knee release");
  assert.equal(rq.nodes.filter((n) => n.partner).length, 0, "raqs sharqi is genuinely solo");
  const info = seasonInfo(newState(T), T, rq.seasons);
  assert.equal(info.theme, "Maqsoum Season");
});

test("dabke pack: the Levant named; continuity meaning stated plainly; the line waits for people", () => {
  const db = STYLES.dabke;
  const levant = db.nodes.find((n) => n.id === "dbculture.levant");
  assert.ok(levant.checkpoints.some((c) => /Lebanon, Palestine, Syria, Jordan/.test(c)), "whose dance this is");
  const meaning = db.nodes.find((n) => n.id === "dbculture.meaning");
  assert.ok(meaning.checkpoints.some((c) => /Palestinians/.test(c) && /cultural preservation/.test(c)),
    "the continuity meaning stated as communities state it");
  assert.ok(db.nodes.some((n) => n.id === "dbculture.lawweeh"), "the lawweeh is curriculum");
  const line = db.nodes.find((n) => n.id === "dbline.join");
  assert.ok(line.partner && line.phase >= 3, "the line is group-flagged and late — the hafleh is the classroom");
  assert.ok(line.checkpoints.some((c) => /END of the line/.test(c)), "join-at-the-end etiquette taught");
  const info = seasonInfo(newState(T), T, db.seasons);
  assert.equal(info.theme, "Mijwiz Season");
});

test("persian pack: Qajar lineage; suppression and diaspora keeping told factually; wrists first", () => {
  const pr = STYLES.persian;
  const survival = pr.nodes.find((n) => n.id === "prculture.survival");
  assert.ok(survival.checkpoints.some((c) => /1979/.test(c) && /suppressed/.test(c)), "the suppression stated factually");
  assert.ok(survival.checkpoints.some((c) => /sustained by its diaspora/.test(c)), "the keeping credited");
  const honesty = pr.nodes.find((n) => n.id === "meta.diaspora_honesty");
  assert.ok(honesty.checkpoints.some((c) => /cannot be the aroosi/.test(c)), "the honest limit stated");
  const wrists = pr.nodes.find((n) => n.id === "prmove.wrists");
  assert.ok(wrists.prereqs.some((p) => p.id === "attr.wrists.l1"), "the signature is gated on articulation readiness");
  assert.ok(pr.nodes.some((n) => n.id === "prmove.shoulders" && n.checkpoints.some((c) => /naz/.test(c))),
    "naz is described, then practiced");
  const info = seasonInfo(newState(T), T, pr.seasons);
  assert.equal(info.theme, "Shesh-o-Hasht Season");
});

test("soca pack: emancipation roots and Lord Shorty credited; consent is curriculum; truly solo", () => {
  const sc = STYLES.soca;
  const canboulay = sc.nodes.find((n) => n.id === "scculture.canboulay");
  assert.ok(canboulay.checkpoints.some((c) => /emancipation/.test(c) && /Canboulay/.test(c)), "the festival's roots told");
  const shorty = sc.nodes.find((n) => n.id === "scculture.shorty");
  assert.ok(shorty.checkpoints.some((c) => /Lord Shorty/.test(c) && /Garfield Blackman/.test(c)), "soca's creator credited");
  const consent = sc.nodes.find((n) => n.id === "scculture.consent");
  assert.ok(consent.checkpoints.some((c) => /never overrides somebody's no/.test(c)), "consent etiquette stated plainly");
  const wine = sc.nodes.find((n) => n.id === "scwine.basic");
  assert.ok(wine.prereqs.some((p) => p.id === "attr.knees.l1"), "the wine gated on knee release");
  assert.equal(sc.nodes.filter((n) => n.partner).length, 0, "carnival needs no partner — truly solo");
  const info = seasonInfo(newState(T), T, sc.seasons);
  assert.equal(info.theme, "Engine Room Season");
});

test("son pack: Afro-Cuban creation credited; salsa's ancestor cross-linked; contratiempo is the core", () => {
  const sn = STYLES.son;
  const oriente = sn.nodes.find((n) => n.id === "snculture.oriente");
  assert.ok(oriente.checkpoints.some((c) => /Afro-Cuban creation/.test(c)), "whose creation, stated");
  assert.ok(oriente.checkpoints.some((c) => /Ignacio Piñeiro|Trío Matamoros/.test(c)), "the septet era credited");
  const ancestor = sn.nodes.find((n) => n.id === "snculture.ancestor");
  assert.ok(ancestor.checkpoints.some((c) => /salsa pack/.test(c)), "cross-linked to this app's salsa tree");
  const basic = sn.nodes.find((n) => n.id === "snstep.basic");
  assert.ok(basic.prereqs.some((p) => p.id === "attr.timing.l2"), "the basic gated on the offbeat ear");
  for (const n of sn.nodes.filter((x) => x.partner)) assert.ok(n.phase >= 3, `${n.id} partner-flagged but early`);
  const info = seasonInfo(newState(T), T, sn.seasons);
  assert.equal(info.theme, "Clave Season");
});

test("bomba pack: Black creators and keeper families credited; the dancer leads the drum; batey-gated", () => {
  const bm = STYLES.bomba;
  const roots = bm.nodes.find((n) => n.id === "bmculture.roots");
  assert.ok(roots.checkpoints.some((c) => /enslaved and free Black communities/.test(c)), "the creators credited");
  const keepers = bm.nodes.find((n) => n.id === "bmculture.keepers");
  assert.ok(keepers.checkpoints.some((c) => /Cepeda/.test(c) && /Ayala/.test(c)), "the keeper families named");
  const honesty = bm.nodes.find((n) => n.id === "meta.batey_honesty");
  assert.ok(honesty.checkpoints.some((c) => /LIVE conversation/.test(c)), "the honest limit: the dialogue needs a drummer");
  const piquetes = bm.nodes.find((n) => n.id === "bmmove.piquetes");
  assert.ok(piquetes.prereqs.some((p) => p.id === "meta.batey_honesty" && p.kind === "hard"),
    "piquete vocabulary sits behind the honesty node");
  assert.ok(piquetes.checkpoints.some((c) => /the primo must answer/.test(c)), "the dancer leads the drum — in the curriculum");
  const info = seasonInfo(newState(T), T, bm.seasons);
  assert.equal(info.theme, "Sicá Season");
});

test("polka pack: Bohemian origin with the lore marked as lore; the migration cross-links two packs", () => {
  const pk = STYLES.polka;
  const bohemia = pk.nodes.find((n) => n.id === "pkculture.bohemia");
  assert.ok(bohemia.checkpoints.some((c) => /LORE, told as lore/.test(c)), "the village-girl tale marked honestly");
  assert.ok(bohemia.checkpoints.some((c) => /polkamania/.test(c)), "the 1840s craze named");
  const migration = pk.nodes.find((n) => n.id === "pkculture.migration");
  assert.ok(migration.checkpoints.some((c) => /Two-Step pack/.test(c)), "cross-linked to the Texas dance halls");
  assert.ok(migration.checkpoints.some((c) => /conjunto and norteño/.test(c)), "the border's polka child credited");
  for (const n of pk.nodes.filter((x) => x.partner)) assert.ok(n.phase >= 3, `${n.id} partner-flagged but early`);
  const info = seasonInfo(newState(T), T, pk.seasons);
  assert.equal(info.theme, "Oom-Pah Season");
});

test("kalamatianos pack: continuity told with humility; the seven is the payload; circle etiquette taught", () => {
  const kl = STYLES.kalamatianos;
  const syrtos = kl.nodes.find((n) => n.id === "klculture.syrtos");
  assert.ok(syrtos.checkpoints.some((c) => /lineage-with-humility/.test(c)), "ancient claims hedged honestly");
  const epta = kl.nodes.find((n) => n.id === "klmusic.epta");
  assert.ok(epta.checkpoints.some((c) => /slow-quick-quick/.test(c)), "the 7/8 taught as 3+2+2");
  const circle = kl.nodes.find((n) => n.id === "klculture.circle");
  assert.ok(circle.checkpoints.some((c) => /open END/.test(c)), "join-at-the-end etiquette");
  assert.ok(circle.checkpoints.some((c) => /mantili/.test(c)), "the leader's kerchief in curriculum");
  const join = kl.nodes.find((n) => n.id === "klline.join");
  assert.ok(join.partner && join.phase >= 3, "the circle is group-flagged and late");
  const info = seasonInfo(newState(T), T, kl.seasons);
  assert.equal(info.theme, "Epta Season");
});

test("pizzica pack: tarantism told with care and its scholar cited; the revival credited; ronda waits", () => {
  const pz = STYLES.pizzica;
  const tarantism = pz.nodes.find((n) => n.id === "pzculture.tarantism");
  assert.ok(tarantism.checkpoints.some((c) => /De Martino/.test(c)), "the landmark study cited");
  assert.ok(tarantism.checkpoints.some((c) => /not a costume/.test(c)), "the ritual history carried with respect");
  const taranta = pz.nodes.find((n) => n.id === "pzculture.taranta");
  assert.ok(taranta.checkpoints.some((c) => /Notte della Taranta/.test(c)), "the revival festival credited");
  const fazzoletto = pz.nodes.find((n) => n.id === "pzstep.fazzoletto");
  assert.ok(fazzoletto.checkpoints.some((c) => /consent built into the tradition/.test(c)), "the handkerchief as consent grammar");
  const ronda = pz.nodes.find((n) => n.id === "pzronda.enter");
  assert.ok(ronda.partner && ronda.phase >= 3, "the ronda is entered with people, late");
  const info = seasonInfo(newState(T), T, pz.seasons);
  assert.equal(info.theme, "Tamburello Season");
});

test("bon odori pack: Obon's meaning intact; radical welcome as choreography; the circle open", () => {
  const bo = STYLES.bon;
  const obon = bo.nodes.find((n) => n.id === "boculture.obon");
  assert.ok(obon.checkpoints.some((c) => /remembrance AND celebration/.test(c)), "both halves of Obon honored");
  const circle = bo.nodes.find((n) => n.id === "boculture.circle");
  assert.ok(circle.checkpoints.some((c) => /simple ON PURPOSE/.test(c)), "the welcome-by-design stated");
  assert.match(bo.nodes.find((n) => n.id === "bostep.tanko").origin, /Miike mine/, "Tankō Bushi's working roots credited");
  const join = bo.nodes.find((n) => n.id === "bocircle.join");
  assert.ok(join.partner && join.phase >= 3, "the circle is joined with people, late");
  const info = seasonInfo(newState(T), T, bo.seasons);
  assert.equal(info.theme, "Ondo Season");
});

test("tinikling pack: the punishment tale marked as LORE; the clacker dignified; live poles are 🤝", () => {
  const tk = STYLES.tinikling;
  const bird = tk.nodes.find((n) => n.id === "tkculture.bird");
  assert.ok(bird.checkpoints.some((c) => /LORE, unproven/.test(c)), "the colonial-punishment tale hedged honestly");
  assert.ok(bird.checkpoints.some((c) => /Leyte/.test(c)), "the dance's home named");
  const stage = tk.nodes.find((n) => n.id === "tkculture.stage");
  assert.ok(stage.checkpoints.some((c) => /Bayanihan/.test(c)), "the national company credited");
  assert.ok(tk.nodes.some((n) => n.id === "tkstep.clacker"), "the clacker's craft is curriculum, not an afterthought");
  const live = tk.nodes.find((n) => n.id === "tkpoles.live");
  assert.ok(live.partner, "live poles are 🤝 by physics");
  assert.ok(tk.nodes.find((n) => n.id === "tkstep.lines").checkpoints.some((c) => /never touch the lines/.test(c)),
    "the schoolyard floor-lines method taught first");
  const info = seasonInfo(newState(T), T, tk.seasons);
  assert.equal(info.theme, "Triple-Time Season");
});

test("buchaechum pack: Kim Baek-bong credited as the named creator; ensemble honesty; breath first", () => {
  const bc = STYLES.buchaechum;
  const kim = bc.nodes.find((n) => n.id === "bcculture.kim");
  assert.ok(kim.checkpoints.some((c) => /KIM BAEK-BONG/.test(c) && /1954/.test(c)), "the creator credited by name and year");
  assert.ok(kim.checkpoints.some((c) => /counter-example/.test(c)), "'folk dances have no author' countered");
  const ensemble = bc.nodes.find((n) => n.id === "bcculture.ensemble");
  assert.ok(ensemble.checkpoints.some((c) => /honest doorway/.test(c)), "the ensemble limit stated");
  const flower = bc.nodes.find((n) => n.id === "bcensemble.flower");
  assert.ok(flower.partner && flower.phase >= 3, "the ensemble forms wait for a team");
  const breath = bc.nodes.find((n) => n.id === "bcmusic.breath");
  assert.ok(breath.checkpoints.some((c) => /with humility/.test(c)), "heung described with humility");
  const info = seasonInfo(newState(T), T, bc.seasons);
  assert.equal(info.theme, "Jangdan Season");
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
