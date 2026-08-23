import test from "node:test";
import assert from "node:assert/strict";
import { newState, saveState, loadState, exportBundle, importBundle } from "../js/engine/store.js";

const T = "2026-08-23";

function memStorage() {
  const mem = new Map();
  return {
    mem,
    getItem: (k) => (mem.has(k) ? mem.get(k) : null),
    setItem: (k, v) => mem.set(k, String(v)),
  };
}

test("sync: bundle carries every style's state and preferences", () => {
  const src = memStorage();
  const b = { ...newState(T), sessions: [{ date: T, size: "normal" }] };
  const h = { ...newState(T), sessions: [{ date: T, size: "mvs" }, { date: T, size: "mvs" }] };
  saveState(b, src, "breaking");
  saveState(h, src, "hiphop");
  src.setItem("dance-mastery-style", "hiphop");
  src.setItem("dance-mastery-crew-url", "https://example.com/cypher");

  const json = exportBundle(src, ["breaking", "hiphop", "salsa"], T);
  const parsed = JSON.parse(json);
  assert.equal(parsed.kind, "dance-mastery-sync");
  assert.equal(parsed.exported, T);
  assert.deepEqual(Object.keys(parsed.states).sort(), ["breaking", "hiphop"], "only styles with progress");
  assert.equal(parsed.prefs["dance-mastery-style"], "hiphop");

  const dst = memStorage();
  const result = importBundle(json, dst);
  assert.equal(result.kind, "bundle");
  assert.deepEqual(result.imported.sort(), ["breaking", "hiphop"]);
  assert.equal(loadState(T, dst, "breaking").sessions.length, 1);
  assert.equal(loadState(T, dst, "hiphop").sessions.length, 2);
  assert.equal(dst.getItem("dance-mastery-style"), "hiphop", "active style follows the dancer");
  assert.equal(dst.getItem("dance-mastery-crew-url"), "https://example.com/cypher");
});

test("sync: legacy single-style export is recognized, not rejected", () => {
  const legacy = JSON.stringify({ ...newState(T), sessions: [{ date: T, size: "normal" }] });
  const result = importBundle(legacy, memStorage());
  assert.equal(result.kind, "single");
  assert.equal(result.state.sessions.length, 1);
});

test("sync: garbage and wrong shapes fail loudly, corrupt entries are skipped", () => {
  assert.throws(() => importBundle('{"kind":"other-app"}', memStorage()));
  assert.throws(() => importBundle("not json at all", memStorage()));
  const dst = memStorage();
  const mixed = JSON.stringify({
    kind: "dance-mastery-sync", version: 1, exported: T,
    states: { breaking: { ...newState(T) }, salsa: { version: 99, evil: true } },
    prefs: { "dance-mastery-style": "breaking", "unrelated-key": "ignored" },
  });
  const result = importBundle(mixed, dst);
  assert.deepEqual(result.imported, ["breaking"], "invalid style state skipped");
  assert.equal(dst.getItem("unrelated-key"), null, "only known preference keys restored");
});
