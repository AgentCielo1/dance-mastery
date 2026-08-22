// Move Library — catalog browser over the shared 3D viewer (viewer3d.js).
// Procedural v1 moves (moves3d.js, $0 lane) + real CMU studio captures.

import { STYLES, DEFAULT_STYLE, styleName } from "./data/styles.js";
import capture85 from "./data/capture85.js";
import { Viewer, decodeClip } from "./viewer3d.js";
import { MOVES } from "./moves3d.js";
import { FAMILY_LABELS } from "./labels.js";

const CAPTURES = {};
for (const c of capture85.clips) CAPTURES[c.id] = decodeClip(c);

const params0 = new URLSearchParams(location.search);
let style = params0.get("style") || (() => { try { return localStorage.getItem("dance-mastery-style"); } catch { return null; } })() || DEFAULT_STYLE;
if (!STYLES[style]) style = DEFAULT_STYLE;
const tree = STYLES[style];
const catalog = tree.nodes.filter((n) => ["move", "combo"].includes(n.type));

const viewer = new Viewer(document.getElementById("stage"));
viewer.attachOrbit();

let speed = 1, playing = true, t = 0, last = performance.now();
let currentId = "footwork.six_step";
const reelParam = new URLSearchParams(location.search).get("reel");
let reel = reelParam !== null;
const REEL_ORDER = reelParam === "capture" ? Object.keys(CAPTURES) : Object.keys(MOVES);
const REEL_SECONDS = (id) => CAPTURES[id] ? Math.min(CAPTURES[id].duration, 30) : 4.2;
let reelIdx = 0, reelTimer = 0;

function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  const move = MOVES[currentId];
  const cap = CAPTURES[currentId];
  if (playing) {
    if (move) t += (dt / ((move.beats * 60) / move.bpm)) * speed;
    else if (cap) t += dt * speed;
  }
  if (reel) {
    reelTimer += dt;
    if (reelTimer > REEL_SECONDS(REEL_ORDER[reelIdx])) {
      reelTimer = 0; reelIdx = (reelIdx + 1) % REEL_ORDER.length; select(REEL_ORDER[reelIdx]);
    }
  }
  viewer.begin(dt);
  if (cap) viewer.renderCapture(cap, Math.floor(t * cap.fps) % cap.nFrames);
  else if (move) viewer.renderProcedural(move, t);
  requestAnimationFrame(frame);
}

function select(id) {
  currentId = id;
  t = 0;
  const cap = CAPTURES[id];
  const animated = Boolean(MOVES[id]);
  const n = catalog.find((c) => c.id === id);
  document.getElementById("move-name").textContent = cap ? cap.name : (n?.name ?? id);
  const learn = (animated || cap) ? ` · <a href="learn.html?move=${id}" style="color:var(--accent2)">open lesson →</a>` : "";
  document.getElementById("move-meta").innerHTML = cap
    ? `<span class="badge star">★ real optical mocap</span> CMU Graphics Lab, subject 85 (pro breaker, marker stage) · ${Math.round(cap.duration)}s · this is the "finished version" motion quality${learn}`
    : animated
      ? `<span class="badge ok">procedural v1 · $0</span> ${MOVES[id].bpm} BPM · ${MOVES[id].beats}-count loop · drag to orbit${learn}`
      : `<span class="badge queue">factory queue</span> lane: self-capture (Doc 08) — phone rig → FreeMoCap → Blender → GLB`;
  if (!animated && !cap) currentId = null;
  document.getElementById("empty").style.display = (animated || cap) ? "none" : "grid";
  document.querySelectorAll(".mv").forEach((el) => el.classList.toggle("sel", el.dataset.id === id));
}

function buildList() {
  const box = document.getElementById("list");
  const fams = [...new Set(catalog.map((n) => n.family))];
  const styleSwitch = `<div class="fam-group"><h3>Style</h3>` +
    Object.keys(STYLES).map((s) =>
      `<button class="mv ${s === style ? "sel" : ""}" data-style="${s}"><span>${styleName(s)}</span><em>${s === style ? "●" : ""}</em></button>`).join("") + `</div>`;
  const capGroup = style !== "breaking" ? "" : `<div class="fam-group"><h3>★ Studio capture — the finished look</h3>` +
    Object.values(CAPTURES).map((c) =>
      `<button class="mv anim cap" data-id="${c.id}"><span>${c.name}</span><em>★ mocap</em></button>`).join("") +
    `</div>`;
  box.innerHTML = styleSwitch + capGroup + fams.map((f) => {
    const rows = catalog.filter((n) => n.family === f).map((n) => {
      const anim = Boolean(MOVES[n.id]);
      return `<button class="mv ${anim ? "anim" : ""}" data-id="${n.id}">
        <span>${n.name}${n.partner ? " 🤝" : ""}</span><em>${anim ? "▶ v1" : "queued"}</em></button>`;
    }).join("");
    return `<div class="fam-group"><h3>${FAMILY_LABELS[f] ?? f}</h3>${rows}</div>`;
  }).join("");
  box.querySelectorAll(".mv[data-id]").forEach((el) => el.addEventListener("click", () => { reel = false; select(el.dataset.id); }));
  box.querySelectorAll(".mv[data-style]").forEach((el) => el.addEventListener("click", () => {
    try { localStorage.setItem("dance-mastery-style", el.dataset.style); } catch { /* no storage */ }
    location.search = `?style=${el.dataset.style}`;
  }));
  const animated = catalog.filter((n) => MOVES[n.id]).length;
  const caps = style === "breaking" ? ` · ${Object.keys(CAPTURES).length} real studio-mocap clips (CMU)` : "";
  const counts = `${styleName(style)}: ${catalog.length} moves${caps} · ${animated} procedural v1 · ${catalog.length - animated} in the factory queue`;
  document.getElementById("counts").textContent = counts;
}

document.getElementById("play").addEventListener("click", (e) => { playing = !playing; e.target.textContent = playing ? "⏸" : "▶"; });
document.getElementById("speed").addEventListener("input", (e) => {
  speed = Number(e.target.value);
  document.getElementById("speedv").textContent = `${speed.toFixed(2)}×`;
});
document.getElementById("orbit").addEventListener("click", () => { viewer.cam.auto = !viewer.cam.auto; });

buildList();
select(reel ? REEL_ORDER[0] : (catalog.find((n) => MOVES[n.id])?.id ?? catalog[0].id));
requestAnimationFrame(frame);
