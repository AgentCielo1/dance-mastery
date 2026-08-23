// Rhythm Trainer page — UI over the shared audio engine (js/audio.js) and
// the pure scheduler (engine/rhythm.js).

import { PATTERNS, STYLE_PATTERNS } from "./engine/rhythm.js";
import { createRhythmPlayer } from "./audio.js";
import { keepAwake } from "./wakelock.js";

const $ = (s) => document.querySelector(s);
keepAwake();

let savedStyle = null;
try { savedStyle = localStorage.getItem("dance-mastery-style"); } catch { /* no storage */ }
const defaultKey = STYLE_PATTERNS[savedStyle] ?? "straight";

$("#pattern").innerHTML = Object.entries(PATTERNS).map(([key, p]) =>
  `<option value="${key}" ${key === defaultKey ? "selected" : ""}>${p.name}</option>`).join("");

let patternKey = defaultKey;
let bpm = PATTERNS[patternKey].defaultBpm;
const player = createRhythmPlayer();

function pattern() { return PATTERNS[patternKey]; }

player.onHit = (h, secondsFromNow) => {
  setTimeout(() => {
    const el = document.querySelector(`[data-beat="${Math.floor(h.beat) % pattern().beats}"]`);
    if (!el) return;
    el.classList.add("on");
    if (h.type === "hat") el.classList.add("soft");
    setTimeout(() => el.classList.remove("on", "soft"), 90);
  }, Math.max(0, secondsFromNow * 1000));
};

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
  player.set(pattern(), bpm);
  syncControls();
});
$("#bpm").addEventListener("input", (e) => {
  bpm = Number(e.target.value);
  player.set(pattern(), bpm);
  $("#bpmval").innerHTML = `${bpm}<small> BPM</small>`;
});

$("#go").addEventListener("click", async () => {
  if (player.running) {
    player.stop();
    $("#go").textContent = "▶ Start";
    $("#go").classList.remove("running");
    return;
  }
  await player.start(pattern(), bpm);
  $("#go").textContent = "■ Stop";
  $("#go").classList.add("running");
});

syncControls();
