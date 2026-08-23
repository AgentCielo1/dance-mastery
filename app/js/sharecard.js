// Share card — your journey as one image (Doc 05: identity evidence works
// harder when someone else sees it). Canvas-drawn, shared via the phone's
// share sheet when available, downloaded as PNG otherwise.

const W = 1080, H = 1350;
const C = { bg: "#0d0f14", panel: "#151924", line: "#262e42", text: "#e8ebf2", muted: "#8b94ab", accent: "#f5a623", accent2: "#4cc2ff", ok: "#38c172", dim: "#2a5b41", frozen: "#1f4864" };

function drawCard({ votes, days, run, since, styles, heat }) {
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const x = canvas.getContext("2d");

  x.fillStyle = C.bg; x.fillRect(0, 0, W, H);

  // header
  x.fillStyle = C.text;
  x.font = "800 64px system-ui, sans-serif";
  x.fillText("DANCE ", 70, 130);
  x.fillStyle = C.accent;
  x.fillText("MASTERY", 70 + x.measureText("DANCE ").width, 130);
  x.fillStyle = C.muted;
  x.font = "400 30px system-ui, sans-serif";
  x.fillText(since ? `dancing since ${since}` : "day one is today", 70, 180);

  // big numbers
  const nums = [[votes, "VOTES CAST"], [days, "DAYS DANCED"], [run, "LONGEST RUN"]];
  nums.forEach(([n, label], i) => {
    const bx = 70 + i * 320;
    x.fillStyle = C.panel;
    roundRect(x, bx, 230, 290, 200, 22); x.fill();
    x.strokeStyle = C.line; x.stroke();
    x.fillStyle = C.accent;
    x.font = "800 84px system-ui, sans-serif";
    x.textAlign = "center";
    x.fillText(String(n), bx + 145, 350);
    x.fillStyle = C.muted;
    x.font = "600 24px system-ui, sans-serif";
    x.fillText(label, bx + 145, 400);
    x.textAlign = "left";
  });

  // heatmap — 12 weeks × 7 days
  x.fillStyle = C.accent2;
  x.font = "600 28px system-ui, sans-serif";
  x.fillText("LAST 12 WEEKS", 70, 530);
  const hx = 70, hy = 560;
  const cw = (W - 140 - 11 * 6) / 12; // 12 week-columns with 6px gaps
  heat.forEach((c, i) => {
    const col = Math.floor(i / 7), row = i % 7;
    x.fillStyle = c.frozen ? C.frozen : c.count >= 2 ? C.ok : c.count === 1 ? C.dim : C.panel;
    roundRect(x, hx + col * (cw + 6), hy + row * 42, cw, 34, 7);
    x.fill();
  });

  // style bars (top 3)
  let sy = 950;
  x.fillStyle = C.accent2;
  x.font = "600 28px system-ui, sans-serif";
  x.fillText("THE STYLES", 70, sy - 20);
  styles.slice(0, 3).forEach((s) => {
    x.fillStyle = C.text;
    x.font = "700 34px system-ui, sans-serif";
    x.fillText(s.name, 70, sy + 30);
    x.fillStyle = C.muted;
    x.font = "400 26px system-ui, sans-serif";
    x.textAlign = "right";
    x.fillText(`${s.sessions} sessions · ${s.clean}/${s.total} clean`, W - 70, sy + 30);
    x.textAlign = "left";
    x.fillStyle = C.panel;
    roundRect(x, 70, sy + 50, W - 140, 18, 9); x.fill();
    x.fillStyle = C.ok;
    if (s.clean > 0) { roundRect(x, 70, sy + 50, Math.max(18, (W - 140) * s.clean / s.total), 18, 9); x.fill(); }
    sy += 120;
  });

  // footer
  x.fillStyle = C.muted;
  x.font = "italic 400 28px system-ui, sans-serif";
  x.fillText("Every session is a vote for the dancer.", 70, H - 70);
  x.fillStyle = C.accent2;
  x.font = "400 26px system-ui, sans-serif";
  x.fillText("agentcielo1.github.io/dance-mastery", 70, H - 30);
  return canvas;
}

function roundRect(x, px, py, w, h, r) {
  if (w <= 0 || h <= 0) return;
  x.beginPath();
  x.moveTo(px + r, py);
  x.arcTo(px + w, py, px + w, py + h, r);
  x.arcTo(px + w, py + h, px, py + h, r);
  x.arcTo(px, py + h, px, py, r);
  x.arcTo(px, py, px + w, py, r);
  x.closePath();
}

export async function shareJourneyCard(data) {
  const canvas = drawCard(data);
  const blob = await new Promise((r) => canvas.toBlob(r, "image/png"));
  const file = new File([blob], "dance-mastery-journey.png", { type: "image/png" });
  try {
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: "Dance Mastery", text: "My dance journey so far 🕺" });
      return "shared";
    }
  } catch { /* user cancelled the sheet — fall through to download */ }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = file.name;
  a.click();
  URL.revokeObjectURL(a.href);
  return "downloaded";
}
