import test from "node:test";
import assert from "node:assert/strict";
import catalog from "../js/data/catalog.js";
import { STYLES } from "../js/data/styles.js";

test("catalog: 200+ verified styles with all required fields", () => {
  assert.ok(catalog.styles.length >= 200, `${catalog.styles.length} styles`);
  for (const s of catalog.styles) {
    for (const k of ["name", "family", "region", "origin", "essence", "scene"]) {
      assert.ok(s[k]?.length, `${s.name ?? "?"} missing ${k}`);
    }
  }
});

test("catalog: names are unique", () => {
  const names = catalog.styles.map((s) => s.name);
  assert.equal(names.length, new Set(names).size);
});

test("catalog: every full training pack is represented and linked", () => {
  const linked = new Set(catalog.styles.map((s) => s.pack).filter(Boolean));
  for (const id of Object.keys(STYLES)) {
    assert.ok(linked.has(id), `pack ${id} has no catalog entry linking to it`);
  }
  for (const s of catalog.styles) {
    if (s.pack) assert.ok(STYLES[s.pack], `${s.name} links unknown pack ${s.pack}`);
  }
});

test("catalog: the mission leads the data, and sacred forms are flagged", () => {
  assert.match(catalog.mission, /everyone/);
  assert.match(catalog.mission, /respect/);
  const sacred = catalog.styles.filter((s) => s.sacred);
  assert.ok(sacred.length >= 10, `ceremonial/lineage forms flagged (${sacred.length})`);
  assert.ok(sacred.some((s) => s.name === "Haka"));
  assert.ok(sacred.some((s) => /Hula/.test(s.name)));
});

test("catalog: adaptive dance is present — 'everyone' means every body", () => {
  const adaptive = catalog.styles.filter((s) => s.family === "adaptive");
  assert.ok(adaptive.length >= 3);
  assert.ok(adaptive.some((s) => /Para Dance/.test(s.name)));
});
