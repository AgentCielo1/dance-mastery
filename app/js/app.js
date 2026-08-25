// The "what do I do today" screen — Phase B0 UI over the engine.

import { STYLES, DEFAULT_STYLE, styleName } from "./data/styles.js";
import { FAMILY_LABELS } from "./labels.js";
import { todayKey, addDays } from "./engine/dates.js";
import { STAGES, STAGE, familyProgress, workingPhase } from "./engine/graph.js";
import { QUALITY, stageUpSuggested } from "./engine/srs.js";
import { rollingWeek, firewall, freezesLeft, applyFreeze, repairYesterday } from "./engine/streak.js";
import { generateSession, completeSession, allowedSizes, SIZES } from "./engine/session.js";
import { loadState, saveState, newState, importState, exportBundle, importBundle, hasAnyProgress } from "./engine/store.js";
import { keepAwake } from "./wakelock.js";
import { installHint } from "./install.js";
import { allocate, pickPrompt } from "./engine/guided.js";
import { warmupFor, COOLDOWN } from "./engine/warmup.js";
import { PATTERNS, STYLE_PATTERNS } from "./engine/rhythm.js";
import { createRhythmPlayer } from "./audio.js";

const $ = (sel) => document.querySelector(sel);
const storage = window.localStorage;

// Active style pack (Doc 04): per-style progress, one dancer identity.
function savedStyle() {
  try { return storage.getItem("dance-mastery-style"); } catch { return null; }
}
let style = new URLSearchParams(location.search).get("style") || savedStyle() || DEFAULT_STYLE;
if (!STYLES[style]) style = DEFAULT_STYLE;
let tree = STYLES[style];

let today = todayKey();
let state = loadState(today, storage, style);
let chosenSize = null;
let session = null;
// pending user input for this session
let pending = { reviews: new Map(), learned: new Set(), attrs: new Set(), stageUps: new Set(), blocks: new Set() };

const styleSel = $("#style");
styleSel.innerHTML = Object.keys(STYLES).map((s) =>
  `<option value="${s}" ${s === style ? "selected" : ""}>${styleName(s)}</option>`).join("");
styleSel.addEventListener("change", () => {
  style = styleSel.value;
  tree = STYLES[style];
  try { storage.setItem("dance-mastery-style", style); } catch { /* no storage */ }
  state = loadState(today, storage, style);
  chosenSize = null;
  resetPending();
  render();
});

const FIREWALL_COPY = {
  fresh: { cls: "ok", title: "Day one.", body: "The only goal this week: five sessions. The worst-day version counts fully." },
  normal: { cls: "ok", title: "System green.", body: "Show up, press play. Every session is a vote for the dancer." },
  mvs_required: { cls: "warn", title: "Missed yesterday — that's data, not a verdict.", body: "Today auto-downgrades to the 8-minute version. Never miss twice. You can also patch yesterday: completing today's session repairs it." },
  never_miss_twice: { cls: "warn", title: "Two or more days missed.", body: "One tap back in: today is MVS-only. If even that is too much, the 3-minute imagery rep counts — vividly rehearse your current move, eyes closed." },
  fresh_start: { cls: "alert", title: "A week off. The program bends — it doesn't break.", body: "No guilt screen. Fresh start Monday: the season resumes one node back, MVS-only for week one. Until then, any session you do is a bonus." },
  reentry: { cls: "alert", title: "Welcome back, dancer.", body: "You're a returning dancer, not a beginner and not a failure. Two-week re-entry: body-prep heavy, everything MVS-sized." },
};

function stageName(s) { return STAGES[s] ?? "untouched"; }

function nodeState(id) { return state.nodes[id] ?? {}; }

function render() {
  today = todayKey();
  const { fw, sizes } = allowedSizes(state, today);
  if (!chosenSize || !sizes.includes(chosenSize)) chosenSize = sizes.includes("normal") ? "normal" : sizes[0];
  session = generateSession(tree, state, chosenSize, today);
  const week = rollingWeek(state, today);
  const doneToday = state.sessions.some((s) => s.date === today);

  $("#season").textContent = session.season.offSeason
    ? `Season ${session.season.number} · Off-season week — light, playful, low-stakes`
    : `Season ${session.season.number} · Week ${session.season.week} of 6 · ${session.season.theme} · finale in ${session.season.daysToFinale}d`;
  $("#date").textContent = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

  const copy = FIREWALL_COPY[fw.state] ?? FIREWALL_COPY.normal;
  const fwEl = $("#firewall");
  fwEl.className = `banner ${copy.cls}`;
  fwEl.innerHTML = `<strong>${copy.title}</strong> ${copy.body}`;
  if (fw.state === "fresh_start" && fw.restartDate) fwEl.innerHTML += ` <em>(Monday: ${fw.restartDate})</em>`;

  $("#weekdots").innerHTML = week.days.map((d) =>
    `<span class="dot ${d.status}" title="${d.date}: ${d.status}"></span>`).join("");
  $("#weekcount").textContent = `${week.count}/${week.target} this week${week.met ? " ✓" : ""}`;
  $("#freezes").textContent = `❄ ${freezesLeft(state, today)} freeze${freezesLeft(state, today) === 1 ? "" : "s"} left this month`;

  $("#sizes").innerHTML = Object.entries(SIZES).map(([key, cfg]) => {
    const allowed = sizes.includes(key);
    const active = key === chosenSize;
    return `<button class="size ${active ? "active" : ""}" data-size="${key}" ${allowed ? "" : "disabled"}>
      <span>${cfg.label}</span><small>${cfg.minutes} min</small></button>`;
  }).join("");
  document.querySelectorAll("[data-size]").forEach((b) =>
    b.addEventListener("click", () => { chosenSize = b.dataset.size; resetPending(); render(); }));

  renderSession(doneToday);
  renderProgress();
}

function resetPending() {
  pending = { reviews: new Map(), learned: new Set(), attrs: new Set(), stageUps: new Set(), blocks: new Set() };
}

function renderSession(doneToday) {
  const el = $("#session");
  if (doneToday) {
    el.innerHTML = `<div class="card done-card"><h2>Session counted. 🗳️</h2>
      <p>That was a vote for <strong>“I am a dancer who trains daily.”</strong> Leave the floor wanting more — see you tomorrow.</p></div>`;
    $("#complete").style.display = "none";
    $("#guided").style.display = "none";
    return;
  }
  $("#complete").style.display = "block";
  $("#guided").style.display = "block";

  el.innerHTML = session.blocks.map((b, i) => {
    if (b.kind === "ignition" || b.kind === "freestyle") {
      const checked = pending.blocks.has(b.kind) ? "checked" : "";
      const extra = b.kind === "ignition"
        ? `<details style="margin-top:8px"><summary style="cursor:pointer;color:var(--accent2);font-size:.85rem">Warm-up checklist (${styleName(style)})</summary>
            <ul style="color:var(--muted);font-size:.85rem;margin:8px 0 0 18px;line-height:1.7">${warmupFor(style).map((w) => `<li>${w}</li>`).join("")}</ul></details>`
        : `<p class="note" style="margin-top:8px">After: ${COOLDOWN.join(" · ")}</p>`;
      return `<div class="card"><h2>${b.title}</h2><p>${b.detail}</p>${extra}
        <label class="check"><input type="checkbox" data-block="${b.kind}" ${checked}> Done</label></div>`;
    }
    if (b.kind === "review") {
      return `<div class="card"><h2>${b.title}</h2><p class="note">${b.note}</p>` + b.items.map((it) => {
        const ns = nodeState(it.id);
        const grade = pending.reviews.get(it.id);
        const suggest = stageUpSuggested(ns);
        const up = pending.stageUps.has(it.id);
        return `<div class="item">
          <div class="item-head"><span class="fam ${it.node.family}">${FAMILY_LABELS[it.node.family] ?? it.node.family}</span>
            <strong><a class="mlink" href="learn.html?move=${it.id}">${it.node.name}</a></strong>${it.node.partner ? ' <span class="warm">🤝 partner</span>' : ""} <span class="stage">${stageName(ns.stage ?? 0)}</span>
            ${it.due ? "" : '<span class="warm">keep-warm</span>'}</div>
          <div class="grades">${["Rough", "OK", "Clean"].map((g, q) =>
            `<button class="grade ${grade === q ? "sel" : ""}" data-review="${it.id}" data-q="${q}">${g}</button>`).join("")}
          ${suggest ? `<button class="levelup ${up ? "sel" : ""}" data-up="${it.id}">⬆ ${stageName((ns.stage ?? 1) + 1)}?</button>` : ""}</div>
        </div>`;
      }).join("") + `</div>`;
    }
    if (b.kind === "new") {
      return `<div class="card"><h2>${b.title}</h2><p class="note">${b.note}</p>` + b.items.map((it) => {
        const checked = pending.learned.has(it.id) ? "checked" : "";
        return `<div class="item">
          <div class="item-head"><span class="fam ${it.node.family}">${FAMILY_LABELS[it.node.family] ?? it.node.family}</span>
            <strong><a class="mlink" href="learn.html?move=${it.id}">${it.node.name}</a></strong>${it.node.partner ? ' <span class="warm">🤝 partner</span>' : ""}${it.node.anchor ? ` <span class="anchor">${it.node.anchor}</span>` : ""}</div>
          <label class="check"><input type="checkbox" data-learned="${it.id}" ${checked}> Got real reps in (marks it Learned)</label>
        </div>`;
      }).join("") + `</div>`;
    }
    if (b.kind === "bodyprep") {
      return `<div class="card"><h2>${b.title}</h2><p class="note">${b.note}</p>` + b.items.map((it) => {
        const checked = pending.attrs.has(it.id) ? "checked" : "";
        return `<div class="item">
          <div class="item-head"><span class="fam attr">Gate</span> <strong>${it.attr.name}</strong></div>
          <p class="test">Test: ${it.attr.test}</p>
          <label class="check"><input type="checkbox" data-attr="${it.id}" ${checked}> Passed the test today</label>
        </div>`;
      }).join("") + `</div>`;
    }
    return "";
  }).join("");

  document.querySelectorAll("[data-review]").forEach((b) => b.addEventListener("click", () => {
    pending.reviews.set(b.dataset.review, Number(b.dataset.q)); renderSession(false);
  }));
  document.querySelectorAll("[data-up]").forEach((b) => b.addEventListener("click", () => {
    pending.stageUps.has(b.dataset.up) ? pending.stageUps.delete(b.dataset.up) : pending.stageUps.add(b.dataset.up);
    renderSession(false);
  }));
  document.querySelectorAll("[data-learned]").forEach((c) => c.addEventListener("change", () => {
    c.checked ? pending.learned.add(c.dataset.learned) : pending.learned.delete(c.dataset.learned);
  }));
  document.querySelectorAll("[data-attr]").forEach((c) => c.addEventListener("change", () => {
    c.checked ? pending.attrs.add(c.dataset.attr) : pending.attrs.delete(c.dataset.attr);
  }));
  document.querySelectorAll("[data-block]").forEach((c) => c.addEventListener("change", () => {
    c.checked ? pending.blocks.add(c.dataset.block) : pending.blocks.delete(c.dataset.block);
  }));
}

function renderProgress() {
  const fams = familyProgress(tree, state).filter((f) => f.total > 0);
  const phase = workingPhase(tree, state);
  $("#progress").innerHTML = `<h2>${styleName(style)} tree · Phase ${phase}</h2>` + fams.map((f) => {
    const pct = Math.round((f.touched / f.total) * 100);
    const pctClean = Math.round((f.clean / f.total) * 100);
    return `<div class="prog"><span class="prog-label">${FAMILY_LABELS[f.family] ?? f.family}</span>
      <div class="bar"><div class="fill clean" style="width:${pctClean}%"></div><div class="fill touched" style="width:${pct - pctClean}%"></div></div>
      <span class="prog-num">${f.clean}/${f.total}</span></div>`;
  }).join("");
}

$("#complete").addEventListener("click", () => {
  const wasMvsRequired = firewall(state, today).state === "mvs_required";
  const results = {
    reviews: [...pending.reviews.entries()].map(([id, quality]) => ({ id, quality })),
    learned: [...pending.learned],
    attrs: [...pending.attrs],
    stageUps: [...pending.stageUps].map((id) => ({ id, stage: Math.min((nodeState(id).stage ?? 1) + 1, STAGE.styled) })),
  };
  state = completeSession(tree, state, session, results, today);
  if (wasMvsRequired) state = repairYesterday(state, today); // showing up repairs yesterday
  saveState(state, storage, style);
  resetPending();
  render();
});

// ---- Sync devices: whole-progress export/import, zero backend ----
const syncModal = $("#sync-modal");
function syncStatus(msg, ok) {
  const el = $("#sync-status");
  el.textContent = msg;
  el.className = ok ? "ok" : "err";
}

$("#sync").addEventListener("click", () => { syncModal.classList.add("open"); syncStatus("", true); });
$("#sync-close").addEventListener("click", () => syncModal.classList.remove("open"));
syncModal.addEventListener("click", (e) => { if (e.target === syncModal) syncModal.classList.remove("open"); });

$("#sync-download").addEventListener("click", () => {
  const data = exportBundle(storage, Object.keys(STYLES), today);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([data], { type: "application/json" }));
  a.download = `dance-mastery-sync-${today}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  syncStatus("Backup saved. Send the file to your other device (AirDrop, email, anything).", true);
});

$("#sync-copy").addEventListener("click", async () => {
  const data = exportBundle(storage, Object.keys(STYLES), today);
  try { await navigator.clipboard.writeText(data); syncStatus("Copied. Paste it into Sync on your other device.", true); }
  catch { window.prompt("Copy your sync text:", data); }
});

function doImport(raw) {
  try {
    const result = importBundle(raw, storage);
    if (result.kind === "single") {
      // legacy single-style export — belongs to whichever style is active now
      state = importState(raw);
      saveState(state, storage, style);
      syncStatus(`Imported ${styleName(style)} progress.`, true);
    } else {
      const saved = savedStyle();
      if (saved && STYLES[saved]) { style = saved; tree = STYLES[style]; styleSel.value = style; }
      state = loadState(today, storage, style);
      syncStatus(`Imported: ${result.imported.map(styleName).join(", ") || "nothing recognized"}.`, result.imported.length > 0);
    }
    resetPending();
    render();
  } catch (e) {
    syncStatus(`Import failed: ${e.message}`, false);
  }
}

$("#sync-file").addEventListener("click", () => $("#sync-file-input").click());
$("#sync-file-input").addEventListener("change", async (e) => {
  const f = e.target.files?.[0];
  if (f) doImport(await f.text());
  e.target.value = "";
});
$("#sync-import-paste").addEventListener("click", () => {
  const raw = $("#sync-paste").value.trim();
  if (raw) doImport(raw);
});

$("#freeze").addEventListener("click", () => {
  const y = addDays(today, -1);
  const before = state;
  state = applyFreeze(state, y, today);
  if (state === before) { alert("Nothing to freeze (yesterday is covered, or no freezes left this month)."); return; }
  saveState(state, storage, style);
  render();
});

// Crew board (Doc 10): one shared live board per crew; URL stored locally.
$("#crew-link").addEventListener("click", (e) => {
  e.preventDefault();
  let url = null;
  try { url = storage.getItem("dance-mastery-crew-url"); } catch { /* no storage */ }
  if (!url) {
    url = window.prompt("Paste your crew board link (The Cypher). You'll only do this once:");
    if (!url || !/^https?:\/\//.test(url)) return;
    try { storage.setItem("dance-mastery-crew-url", url); } catch { /* no storage */ }
  }
  window.open(url, "_blank", "noopener");
});

$("#reset").addEventListener("click", () => {
  if (!confirm("Reset ALL training data? Export first if you want a backup.")) return;
  state = newState(todayKey());
  saveState(state, storage, style);
  resetPending();
  render();
});

// ---- Guided Session Mode: press play, follow the clock (Doc 05) ----
const G = {
  modal: $("#guided-modal"),
  plan: [], i: 0, remaining: 0, paused: false, timer: null,
  player: createRhythmPlayer(), beatOn: false,
};

const KIND_COACH = {
  ignition: "No decisions. Music on, body moving — the session has already started.",
  review: "Work the due moves below. Rough reps count; grade them after.",
  new: "New material. Slow, curious, zero pressure to be good yet.",
  bodyprep: "Gate work. Test honestly — a gate passed too early fails you later.",
  freestyle: "Never skipped. Your prompt is on the card — go.",
};

function gRender() {
  const b = G.plan[G.i];
  const sessionBlock = session.blocks[G.i];
  $("#g-kind").textContent = `${G.i + 1} / ${G.plan.length} · ${b.kind}`;
  $("#g-title").textContent = b.title;
  const m = Math.floor(G.remaining / 60), s = String(G.remaining % 60).padStart(2, "0");
  $("#g-time").textContent = `${m}:${s}`;
  $("#g-bar").style.width = `${(1 - G.remaining / b.seconds) * 100}%`;
  if (b.kind === "ignition") {
    // the warm-up is the ignition — real joint prep, style-loaded
    $("#g-items").innerHTML = `<div style="text-align:left;max-width:340px;margin:0 auto;font-size:.85rem;line-height:1.7">` +
      warmupFor(style).map((w) => `• ${w}`).join("<br>") + `</div>`;
  } else {
    const items = (sessionBlock.items ?? []).map((it) => it.node?.name ?? it.attr?.name).filter(Boolean);
    $("#g-items").textContent = items.length ? items.join(" · ") : KIND_COACH[b.kind] ?? "";
  }
  const prompt = $("#g-prompt");
  if (b.kind === "freestyle") {
    if (prompt.style.display === "none") { prompt.textContent = `🎴 ${pickPrompt()}`; prompt.style.display = "block"; }
  } else prompt.style.display = "none";
}

function gTick() {
  if (G.paused) return;
  G.remaining -= 1;
  if (G.remaining <= 0) {
    G.player.chime();
    if (G.i + 1 >= G.plan.length) { gExit(true); return; }
    G.i += 1;
    G.remaining = G.plan[G.i].seconds;
  }
  gRender();
}

function gExit(finished) {
  clearInterval(G.timer);
  G.player.stop();
  G.beatOn = false;
  $("#g-rhythm").textContent = "🥁 Beat on";
  G.modal.classList.remove("open");
  if (finished) {
    const fw = $("#firewall");
    fw.className = "banner ok";
    fw.innerHTML = "<strong>Guided session done. 🔥</strong> Now grade what you did below and press complete — that's what makes it count.";
  }
}

$("#guided").addEventListener("click", () => {
  G.plan = allocate(session);
  G.i = 0;
  G.remaining = G.plan[0].seconds;
  G.paused = false;
  $("#g-prompt").style.display = "none";
  G.modal.classList.add("open");
  gRender();
  clearInterval(G.timer);
  G.timer = setInterval(gTick, 1000);
});

$("#g-pause").addEventListener("click", (e) => {
  G.paused = !G.paused;
  e.target.textContent = G.paused ? "▶ Resume" : "⏸ Pause";
});
$("#g-next").addEventListener("click", () => {
  G.player.chime();
  if (G.i + 1 >= G.plan.length) { gExit(true); return; }
  G.i += 1;
  G.remaining = G.plan[G.i].seconds;
  $("#g-prompt").style.display = "none";
  gRender();
});
$("#g-rhythm").addEventListener("click", async (e) => {
  if (G.beatOn) { G.player.stop(); G.beatOn = false; e.target.textContent = "🥁 Beat on"; return; }
  const key = STYLE_PATTERNS[style] ?? "straight";
  await G.player.start(PATTERNS[key], PATTERNS[key].defaultBpm);
  G.beatOn = true;
  e.target.textContent = "🥁 Beat off";
});
$("#g-exit").addEventListener("click", () => gExit(false));

// ---- First visit: 30 seconds from stranger to dancer ----
const TAGLINES = {
  breaking: "footwork, freezes, power — the original",
  hiphop: "grooves and the party classics",
  popping: "hits, waves, robot — funk styles",
  locking: "locks, points, big character",
  house: "the jack and flying footwork",
  salsa: "shines, timing, partnerwork prep",
  ballet: "alignment, barre, control",
  tango: "the walk, pivots, musicality",
  afrobeats: "bounce and creator-credited moves",
  westafrican: "rhythm literacy foundation",
  waacking: "whacks, poses, disco drama",
  dancehall: "the bounce and Bogle's steps",
  vogue: "ballroom history + honest prep",
  bachata: "Dominican basic, hips, footwork",
  kizomba: "the Angolan ginga, solo-first",
  lindy: "swing pulse, Charleston, solo jazz",
  samba: "carnival feet — truly solo",
  forro: "the friendliest two-step alive",
  bzouk: "waves and flow, neck kept safe",
  twostep: "honky-tonk glide, QQSS",
  linedance: "alone together — truly solo",
  wcs: "the slot, the anchor, slow groove",
  kpop: "sharpness, isolations, performance",
  jazz: "the technique gym — roots credited",
  contemporary: "breath, spine, swings, improv",
  tap: "you are the drummer",
  irish: "the lift — 1-2-3s and céilí prep",
  flamenco: "compás, palmas, braceo — cante first",
  raqs: "hipwork on the dums — Egypt first",
  dabke: "the Levant's line — six counts in",
  persian: "wrists, naz, the 6/8 — a keeping",
  soca: "the wine and the road — truly solo",
  son: "salsa's ancestor — the offbeat ear",
  bomba: "the dancer leads the drum",
  polka: "the 1840s craze, still going",
  kalamatianos: "the circle in seven — join the end",
  pizzica: "the drum that drove the cure",
  bon: "the circle built for joining",
  tinikling: "be the bird — tap, tap, close",
  buchaechum: "fans, breath, curves — a named maker",
  cumbia: "the continent's shared floor",
  marinera: "the pañuelo speaks — Peru's duet",
  capoeira: "the ginga — the bow leads the game",
  ori: "the tō'ere commands — fenua first",
};

function needsOnboarding() {
  try {
    return !storage.getItem("dance-mastery-onboarded") && !hasAnyProgress(storage, Object.keys(STYLES));
  } catch { return false; }
}

function showOnboarding() {
  const wrap = $("#onboard");
  let pick = null;
  $("#onboard-styles").innerHTML = Object.keys(STYLES).map((s) =>
    `<button class="size" data-pick="${s}" style="text-align:left"><span>${styleName(s)}</span><small>${TAGLINES[s] ?? ""}</small></button>`).join("");
  wrap.querySelectorAll("[data-pick]").forEach((b) => b.addEventListener("click", () => {
    pick = b.dataset.pick;
    wrap.querySelectorAll("[data-pick]").forEach((x) => x.classList.toggle("active", x === b));
    $("#onboard-start").disabled = false;
  }));
  $("#onboard-start").addEventListener("click", () => {
    try {
      storage.setItem("dance-mastery-onboarded", "1");
      if (pick) storage.setItem("dance-mastery-style", pick);
    } catch { /* no storage */ }
    if (pick && STYLES[pick]) {
      style = pick;
      tree = STYLES[style];
      styleSel.value = style;
      state = loadState(today, storage, style);
      resetPending();
    }
    wrap.classList.remove("open");
    render();
    installHint(storage);
  });
  wrap.classList.add("open");
}

render();
keepAwake(); // a phone that locks mid-drill kills the session
if (needsOnboarding()) {
  showOnboarding();
} else {
  try { storage.setItem("dance-mastery-onboarded", "1"); } catch { /* no storage */ }
  installHint(storage); // once, dismissible: put the app on the home screen
}
