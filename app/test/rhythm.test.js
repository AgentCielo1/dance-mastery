import test from "node:test";
import assert from "node:assert/strict";
import { PATTERNS, STYLE_PATTERNS, SOUND_TYPES, scheduleWindow } from "../js/engine/rhythm.js";
import { STYLES } from "../js/data/styles.js";

test("rhythm: every pattern is well-formed", () => {
  for (const [key, p] of Object.entries(PATTERNS)) {
    assert.ok(p.name && p.note, `${key} named and explained`);
    assert.ok(p.beats > 0 && p.defaultBpm >= 60, `${key} sane meter`);
    for (const h of p.hits) {
      assert.ok(h.t >= 0 && h.t < p.beats, `${key} hit ${h.t} inside the cycle`);
      assert.ok(SOUND_TYPES.includes(h.type), `${key} known sound ${h.type}`);
    }
  }
});

test("rhythm: every trainable style opens with a real pattern", () => {
  for (const style of Object.keys(STYLES)) {
    const key = STYLE_PATTERNS[style];
    assert.ok(key && PATTERNS[key], `${style} → ${key}`);
  }
});

test("rhythm: son clave is actually the clave", () => {
  const strokes = PATTERNS.clave32.hits.filter((h) => h.type === "clave").map((h) => h.t);
  assert.deepEqual(strokes, [0, 1.5, 3, 5, 6], "3-2 son clave strokes");
  const flipped = PATTERNS.clave23.hits.filter((h) => h.type === "clave").map((h) => h.t);
  assert.deepEqual(flipped, [1, 2, 4, 5.5, 7], "2-3 son clave strokes");
});

test("rhythm: 12/8 bell carries the standard pattern", () => {
  const bell = PATTERNS.bell12.hits.map((h) => h.t);
  assert.deepEqual(bell, [0, 2, 4, 5, 7, 9, 11]);
});

test("rhythm: scheduleWindow is exact, sorted, and wraps cycles", () => {
  const p = PATTERNS.straight; // 4 beats, hits on every beat
  const win = scheduleWindow(p, 120, 0, 4); // 120bpm → 0.5s/beat, 2s cycle → 2 cycles
  assert.equal(win.length, 8, "8 hits across two cycles");
  assert.equal(win[0].time, 0);
  assert.equal(win[4].time, 2, "second cycle starts on time");
  for (let i = 1; i < win.length; i++) assert.ok(win[i].time >= win[i - 1].time, "sorted");
  // window boundaries: [from, until) — no duplicates when windows tile
  const a = scheduleWindow(p, 120, 0, 1.0);
  const b = scheduleWindow(p, 120, 1.0, 2.0);
  assert.equal(a.length + b.length, scheduleWindow(p, 120, 0, 2.0).length, "tiling windows never double-fire");
});
