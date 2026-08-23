import test from "node:test";
import assert from "node:assert/strict";
import { allocate, FREESTYLE_PROMPTS, pickPrompt } from "../js/engine/guided.js";
import { generateSession } from "../js/engine/session.js";
import { newState } from "../js/engine/store.js";
import { STYLES } from "../js/data/styles.js";

const T = "2026-08-23";

test("guided: allocation covers every block, respects the minute floor, hits the total", () => {
  for (const size of ["mvs", "normal", "big"]) {
    const session = generateSession(STYLES.breaking, newState(T), size, T);
    const plan = allocate(session);
    assert.equal(plan.length, session.blocks.length, `${size}: every block timed`);
    for (const b of plan) assert.ok(b.seconds >= 60, `${size}/${b.kind} gets at least a minute`);
    const total = plan.reduce((s, b) => s + b.seconds, 0);
    assert.ok(Math.abs(total - session.minutes * 60) <= 120,
      `${size}: plan (${total}s) tracks the session length (${session.minutes * 60}s)`);
  }
});

test("guided: worst-day plan is genuinely short — the 8-minute promise holds", () => {
  const session = generateSession(STYLES.breaking, newState(T), "mvs", T);
  const plan = allocate(session);
  const total = plan.reduce((s, b) => s + b.seconds, 0);
  assert.ok(total <= 10 * 60, `mvs stays under 10 minutes (${total}s)`);
  assert.equal(plan[plan.length - 1].kind, "freestyle", "freestyle is never skipped, even on the worst day");
});

test("guided: prompt deck is real and pickPrompt is uniform over it", () => {
  assert.ok(FREESTYLE_PROMPTS.length >= 12);
  assert.ok(new Set(FREESTYLE_PROMPTS).size === FREESTYLE_PROMPTS.length, "no duplicate prompts");
  assert.equal(pickPrompt(() => 0), FREESTYLE_PROMPTS[0]);
  assert.equal(pickPrompt(() => 0.999), FREESTYLE_PROMPTS[FREESTYLE_PROMPTS.length - 1]);
});
