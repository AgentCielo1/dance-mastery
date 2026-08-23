// Rhythm Trainer page — WebAudio synthesis over the pure scheduler in
// engine/rhythm.js. Lookahead pattern: a 25ms ticker schedules every hit due
// in the next 120ms at sample-accurate times.

import { PATTERNS, STYLE_PATTERNS, scheduleWindow } from "./engine/rhythm.js";
import { keepAwake } from "./wakelock.js";

const $ = (s) => document.querySelector(s);
keepAwake();

// pattern select, grouped by "your style" first if we know it
let savedStyle = null;
try { savedStyle = localStorage.getItem("dance-mastery-style"); } catch { /* no storage */ }
const defaultKey = STYLE_PATTERNS[savedStyle] ?? "straight";

$("#pattern").innerHTML = Object.entries(PATTERNS).map(([key, p]) =>
  `<option value="${key}" ${key === defaultKey ? "selected" : ""}>${p.name}</option>`).join("");

let patternKey = defaultKey;
let bpm = PATTERNS[patternKey].defaultBpm;
let running = false;
let ctx = null;
let ticker = null;
let startTime = 0;   // AudioContext time the cycle clock started
let scheduled = 0;   // pattern-relative time scheduled up to

function pattern() { return PATTERNS[patternKey]; }

function syncControls() {
  $("#pnote").textContent = pattern().note;
  $("#bpm").value = bpm;
  $("#bpmval").innerHTML = `${bpm}<small> BPM</small>`;
  $("#beats").innerHTML = Array.from({ length: pattern().beats }, (_, i) =>
    `<div class="b" data-beat="${i}"></div>`).join("");
}

$("#pattern").addEventListener("change", (e) => {
  patternKey = e.target.value;
  bpm = pattern().defaultBpm;
  restartClock();
  syncControls();
});
$("#bpm").addEventListener("input", (e) => {
  bpm = Number(e.target.value);
  restartClock();
  $("#bpmval").innerHTML = `${bpm}<small> BPM</small>`;
});

function restartClock() {
  if (!ctx) return;
  startTime = ctx.currentTime + 0.08;
  scheduled = 0;
}

// ---- synthesis: five little drums, all oscillators and noise ----
function noiseBuffer(c) {
  const b = c.createBuffer(1, c.sampleRate * 0.2, c.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return b;
}
let noise = null;

function play(type, at) {
  const g = ctx.createGain();
  g.connect(ctx.destination);
  if (type === "kick") {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(150, at);
    o.frequency.exponentialRampToValueAtTime(48, at + 0.11);
    g.gain.setValueAtTime(0.9, at);
    g.gain.exponentialRampToValueAtTime(0.001, at + 0.13);
    o.connect(g); o.start(at); o.stop(at + 0.14);
  } else if (type === "snare") {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const f = ctx.createBiquadFilter();
    f.type = "bandpass"; f.frequency.value = 1800; f.Q.value = 0.8;
    g.gain.setValueAtTime(0.5, at);
    g.gain.exponentialRampToValueAtTime(0.001, at + 0.11);
    src.connect(f); f.connect(g); src.start(at); src.stop(at + 0.12);
  } else if (type === "hat") {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const f = ctx.createBiquadFilter();
    f.type = "highpass"; f.frequency.value = 7000;
    g.gain.setValueAtTime(0.16, at);
    g.gain.exponentialRampToValueAtTime(0.001, at + 0.04);
    src.connect(f); f.connect(g); src.start(at); src.stop(at + 0.05);
  } else { // clave / accent — woodblock: two detuned sines, fast decay
    const loud = type === "accent" ? 0.85 : 0.5;
    for (const freq of type === "accent" ? [880, 1320] : [780, 1170]) {
      const o = ctx.createOscillator();
      o.type = "sine"; o.frequency.value = freq;
      const og = ctx.createGain();
      og.gain.setValueAtTime(loud / 2, at);
      og.gain.exponentialRampToValueAtTime(0.001, at + 0.08);
      o.connect(og); og.connect(ctx.destination);
      o.start(at); o.stop(at + 0.09);
    }
    return;
  }
}

// visual beat pulse, driven off the same schedule
function flash(beat, type, when) {
  setTimeout(() => {
    const el = document.querySelector(`[data-beat="${Math.floor(beat) % pattern().beats}"]`);
    if (!el) return;
    el.classList.add("on");
    if (type === "hat") el.classList.add("soft");
    setTimeout(() => el.classList.remove("on", "soft"), 90);
  }, Math.max(0, when * 1000));
}

function tick() {
  const now = ctx.currentTime - startTime;
  const until = now + 0.12;
  for (const h of scheduleWindow(pattern(), bpm, Math.max(scheduled, now - 0.01), until)) {
    const at = startTime + h.time;
    play(h.type, at);
    flash(h.beat, h.type, at - ctx.currentTime);
  }
  scheduled = until;
}

$("#go").addEventListener("click", async () => {
  if (running) {
    clearInterval(ticker);
    running = false;
    $("#go").textContent = "▶ Start";
    $("#go").classList.remove("running");
    return;
  }
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    noise = noiseBuffer(ctx);
  }
  await ctx.resume();
  restartClock();
  ticker = setInterval(tick, 25);
  running = true;
  $("#go").textContent = "■ Stop";
  $("#go").classList.add("running");
});

syncControls();
