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

test("findNode resolves across packs and returns null for unknowns", () => {
  assert.equal(findNode("footwork.six_step").style, "breaking");
  assert.equal(findNode("party.wop").style, "hiphop");
  assert.equal(findNode("nope.nothing"), null);
});
