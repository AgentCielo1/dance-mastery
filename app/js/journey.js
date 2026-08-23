// Your Journey page — progress made visible (Doc 05: identity evidence).

import { STYLES, styleName } from "./data/styles.js";
import { todayKey } from "./engine/dates.js";
import { loadState } from "./engine/store.js";
import { mergeSessions, mergeFreezes, heatmap, totals, longestRun } from "./engine/journey.js";

const $ = (s) => document.querySelector(s);
const storage = window.localStorage;
const today = todayKey();

// only styles with real progress — loadState hands back fresh states otherwise
const states = {};
for (const style of Object.keys(STYLES)) {
  const s = loadState(today, storage, style);
  if (s.sessions.length || Object.keys(s.nodes).length || Object.keys(s.attributes).length) states[style] = s;
}

const byDate = mergeSessions(states);
const freezes = mergeFreezes(states);
const t = totals(states);

$("#n-sessions").textContent = t.sessions;
$("#n-days").textContent = t.activeDays;
$("#n-run").textContent = longestRun(byDate, freezes);

$("#heat").innerHTML = heatmap(byDate, freezes, today).map((c) => {
  const cls = c.frozen ? "frozen" : c.count >= 2 ? "c2" : c.count === 1 ? "c1" : "";
  return `<div class="cell ${cls} ${c.date === today ? "today" : ""}" title="${c.date}: ${c.frozen ? "freeze" : `${c.count} session${c.count === 1 ? "" : "s"}`}"></div>`;
}).join("");

const rows = Object.entries(t.byStyle).sort((a, b) => b[1].sessions - a[1].sessions);
$("#styles").innerHTML = rows.length ? rows.map(([style, s]) => {
  const total = STYLES[style].nodes.length;
  const pct = Math.round((s.touched / total) * 100);
  const pctClean = Math.round((s.clean / total) * 100);
  return `<div class="style-row">
    <div class="head"><b>${styleName(style)}</b><small>${s.sessions} session${s.sessions === 1 ? "" : "s"} · ${s.clean}/${total} clean</small></div>
    <div class="bar"><div class="fill clean" style="width:${pctClean}%"></div><div class="fill touched" style="width:${Math.max(0, pct - pctClean)}%"></div></div>
  </div>`;
}).join("") : `<p class="empty">No sessions yet — your first square is one <a href="index.html" style="color:var(--accent2)">Today session</a> away. Even the 8-minute version fills it.</p>`;

$("#word").textContent = t.firstDay
  ? `Dancing since ${t.firstDay}. The graph doesn't care how any single day went — it only counts that you came back. Keep the squares coming.`
  : "This page fills itself. All you do is show up.";
