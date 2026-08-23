import test from "node:test";
import assert from "node:assert/strict";
import { mergeSessions, mergeFreezes, heatmap, totals, longestRun } from "../js/engine/journey.js";
import { newState } from "../js/engine/store.js";
import { STAGE } from "../js/engine/graph.js";

const mk = (sessions, nodes = {}, freezes = []) => ({ ...newState("2026-08-01"), sessions, nodes, freezes });

test("journey: sessions merge across styles by date", () => {
  const states = {
    breaking: mk([{ date: "2026-08-20", size: "normal" }, { date: "2026-08-21", size: "mvs" }]),
    house: mk([{ date: "2026-08-21", size: "normal" }]),
  };
  const byDate = mergeSessions(states);
  assert.equal(byDate.get("2026-08-20").length, 1);
  assert.equal(byDate.get("2026-08-21").length, 2, "two styles on one day = two votes");
});

test("journey: heatmap covers exactly 12 weeks, marks counts, freezes, order", () => {
  const states = { breaking: mk([{ date: "2026-08-22", size: "normal" }], {}, ["2026-08-21"]) };
  const cells = heatmap(mergeSessions(states), mergeFreezes(states), "2026-08-23");
  assert.equal(cells.length, 84);
  assert.equal(cells[cells.length - 1].date, "2026-08-23", "ends today");
  assert.equal(cells[0].date, "2026-06-01", "84 days back");
  assert.equal(cells.find((c) => c.date === "2026-08-22").count, 1);
  assert.equal(cells.find((c) => c.date === "2026-08-21").frozen, true);
});

test("journey: totals count sessions, active days, and per-style stage progress", () => {
  const states = {
    breaking: mk(
      [{ date: "2026-08-20", size: "normal" }, { date: "2026-08-21", size: "mvs" }],
      { a: { stage: STAGE.learned }, b: { stage: STAGE.clean }, c: { stage: STAGE.fast } }
    ),
    house: mk([{ date: "2026-08-21", size: "normal" }]),
  };
  const t = totals(states);
  assert.equal(t.sessions, 3);
  assert.equal(t.activeDays, 2);
  assert.equal(t.firstDay, "2026-08-20");
  assert.equal(t.byStyle.breaking.touched, 3);
  assert.equal(t.byStyle.breaking.clean, 2, "clean counts clean-and-above");
});

test("journey: longest run counts consecutive days, freezes bridge gaps", () => {
  const states = {
    breaking: mk(
      [{ date: "2026-08-18", size: "n" }, { date: "2026-08-19", size: "n" }, { date: "2026-08-21", size: "n" }],
      {},
      ["2026-08-20"] // frozen day bridges 19 → 21
    ),
  };
  assert.equal(longestRun(mergeSessions(states), mergeFreezes(states)), 4);
  assert.equal(longestRun(new Map(), new Set()), 0);
});
