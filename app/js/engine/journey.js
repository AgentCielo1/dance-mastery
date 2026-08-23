// Your Journey — pure progress math over saved states (Doc 05 law: progress
// must be VISIBLE; identity evidence beats willpower). No DOM in here.

import { STAGE } from "./graph.js";
import { addDays } from "./dates.js";

// {style: state} → Map date -> [{style, size}]
export function mergeSessions(states) {
  const byDate = new Map();
  for (const [style, s] of Object.entries(states ?? {})) {
    for (const sess of s?.sessions ?? []) {
      const arr = byDate.get(sess.date) ?? [];
      arr.push({ style, size: sess.size });
      byDate.set(sess.date, arr);
    }
  }
  return byDate;
}

// Every frozen/repaired day across styles.
export function mergeFreezes(states) {
  const out = new Set();
  for (const s of Object.values(states ?? {})) for (const d of s?.freezes ?? []) out.add(d);
  return out;
}

// Last `weeks` full weeks ending today: rows of 7 days, oldest first.
// Each cell: {date, count, frozen}.
export function heatmap(byDate, freezes, today, weeks = 12) {
  const days = weeks * 7;
  const cells = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = addDays(today, -i);
    cells.push({
      date,
      count: (byDate.get(date) ?? []).length,
      frozen: freezes.has(date) && !(byDate.get(date)?.length),
    });
  }
  return cells;
}

// Whole-journey numbers + per-style breakdown.
export function totals(states) {
  const byDate = mergeSessions(states);
  let sessions = 0;
  const byStyle = {};
  for (const [style, s] of Object.entries(states ?? {})) {
    const nodes = Object.values(s?.nodes ?? {});
    byStyle[style] = {
      sessions: s?.sessions?.length ?? 0,
      touched: nodes.filter((n) => (n.stage ?? 0) >= STAGE.learned).length,
      clean: nodes.filter((n) => (n.stage ?? 0) >= STAGE.clean).length,
      startDate: s?.startDate ?? null,
    };
    sessions += byStyle[style].sessions;
  }
  const activeDays = byDate.size;
  const firstDay = [...byDate.keys()].sort()[0] ?? null;
  return { sessions, activeDays, firstDay, byStyle };
}

// Longest run of consecutive practice days (freezes bridge gaps, as designed).
export function longestRun(byDate, freezes) {
  const covered = new Set([...byDate.keys(), ...freezes]);
  let best = 0;
  for (const d of covered) {
    if (covered.has(addDays(d, -1))) continue; // not a run start
    let len = 1;
    while (covered.has(addDays(d, len))) len++;
    best = Math.max(best, len);
  }
  return best;
}
