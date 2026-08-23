import test from "node:test";
import assert from "node:assert/strict";
import { warmupFor, COOLDOWN } from "../js/engine/warmup.js";
import { STYLES } from "../js/data/styles.js";

test("warmup: every trainable style gets a real protocol — generic prep plus its own loads", () => {
  for (const style of Object.keys(STYLES)) {
    const w = warmupFor(style);
    assert.ok(w.length >= 8, `${style} has generic + style-specific items (${w.length})`);
    assert.ok(w.some((s) => /Ankles/.test(s)), `${style} preps ankles — dancers live on these`);
  }
});

test("warmup: floor and hit styles load the joints they punish", () => {
  assert.ok(warmupFor("breaking").some((s) => /Wrists/.test(s)), "breaking preps wrists before floors");
  assert.ok(warmupFor("popping").some((s) => /squeeze-and-RELEASE/.test(s)), "popping rehearses the release half");
  assert.ok(warmupFor("ballet").some((s) => /HIP/.test(s)), "ballet activates turnout from the hip");
  assert.ok(warmupFor("waacking").some((s) => /shoulders/i.test(s)), "waacking warms the shoulders");
});

test("warmup: cooldown exists and ends on a win", () => {
  assert.ok(COOLDOWN.length >= 3);
  assert.match(COOLDOWN[COOLDOWN.length - 1], /better than yesterday/);
});
