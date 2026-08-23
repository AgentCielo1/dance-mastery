// Rhythm trainer engine — pure pattern data + scheduling (Doc 03/04:
// musicality is a pillar in every pack, but full songs are a licensing
// minefield; synthesized practice rhythms are 100% ours). The audio synthesis
// lives in the page; everything here is testable data and math.

// Each pattern is one cycle: `beats` beats long, hits at beat offsets.
// Sound types: kick (low thump), snare (crack), hat (tick), clave (woodblock),
// accent (louder woodblock — the ONE).
export const PATTERNS = {
  straight: {
    name: "Straight 4/4 metronome",
    beats: 4, defaultBpm: 100,
    hits: [
      { t: 0, type: "accent" }, { t: 1, type: "clave" }, { t: 2, type: "clave" }, { t: 3, type: "clave" },
    ],
    note: "Count your 8s. The accent is the ONE.",
  },
  boombap: {
    name: "Boom bap (hip hop / breaks)",
    beats: 4, defaultBpm: 96,
    hits: [
      { t: 0, type: "kick" }, { t: 1, type: "snare" },
      { t: 2.5, type: "kick" }, { t: 3, type: "snare" }, { t: 3.5, type: "hat" },
    ],
    note: "Kick and snare — bounce on the kick, rock on the snare.",
  },
  funk: {
    name: "Funk ONE (popping / locking)",
    beats: 4, defaultBpm: 104,
    hits: [
      { t: 0, type: "accent" }, { t: 0.5, type: "hat" }, { t: 1, type: "snare" }, { t: 1.5, type: "hat" },
      { t: 2, type: "kick" }, { t: 2.5, type: "hat" }, { t: 3, type: "snare" }, { t: 3.75, type: "kick" },
    ],
    note: "Everything comes back to the ONE. Hit with it.",
  },
  fourfloor: {
    name: "Four on the floor (house)",
    beats: 4, defaultBpm: 122,
    hits: [
      { t: 0, type: "kick" }, { t: 0.5, type: "hat" }, { t: 1, type: "kick" }, { t: 1.5, type: "hat" },
      { t: 2, type: "kick" }, { t: 2.5, type: "hat" }, { t: 3, type: "kick" }, { t: 3.5, type: "hat" },
    ],
    note: "Kick every beat, hats pushing between — jack to it.",
  },
  clave32: {
    name: "Son clave 3–2 (salsa)",
    beats: 8, defaultBpm: 180,
    hits: [
      { t: 0, type: "clave" }, { t: 1.5, type: "clave" }, { t: 3, type: "clave" },
      { t: 5, type: "clave" }, { t: 6, type: "clave" },
      { t: 0, type: "hat" }, { t: 1, type: "hat" }, { t: 2, type: "hat" }, { t: 3, type: "hat" },
      { t: 4, type: "hat" }, { t: 5, type: "hat" }, { t: 6, type: "hat" }, { t: 7, type: "hat" },
    ],
    note: "The key of salsa. Two bars: 3 then 2. Count 1-2-3-4-5-6-7-8.",
  },
  clave23: {
    name: "Son clave 2–3 (salsa)",
    beats: 8, defaultBpm: 180,
    hits: [
      { t: 1, type: "clave" }, { t: 2, type: "clave" },
      { t: 4, type: "clave" }, { t: 5.5, type: "clave" }, { t: 7, type: "clave" },
      { t: 0, type: "hat" }, { t: 1, type: "hat" }, { t: 2, type: "hat" }, { t: 3, type: "hat" },
      { t: 4, type: "hat" }, { t: 5, type: "hat" }, { t: 6, type: "hat" }, { t: 7, type: "hat" },
    ],
    note: "Same clave, flipped: 2 then 3.",
  },
  tangowalk: {
    name: "Tango walking beat",
    beats: 4, defaultBpm: 120,
    hits: [
      { t: 0, type: "accent" }, { t: 1, type: "clave" }, { t: 2, type: "accent" }, { t: 3, type: "clave" },
    ],
    note: "Strong-weak, strong-weak. Walk on the strong beats; pause where the music breathes.",
  },
  waltz: {
    name: "Waltz 3/4 (ballet / vals)",
    beats: 3, defaultBpm: 138,
    hits: [
      { t: 0, type: "accent" }, { t: 1, type: "hat" }, { t: 2, type: "hat" },
    ],
    note: "ONE-two-three. Pliés breathe a full bar down, a full bar up.",
  },
  afro338: {
    name: "3-3-2 bounce (afrobeats)",
    beats: 4, defaultBpm: 104,
    hits: [
      { t: 0, type: "accent" }, { t: 1.5, type: "clave" }, { t: 3, type: "clave" },
      { t: 0, type: "kick" }, { t: 1, type: "kick" }, { t: 2, type: "kick" }, { t: 3, type: "kick" },
    ],
    note: "The 3-3-2 cell over a steady four — the bounce lives in between.",
  },
  ha: {
    name: "The Ha (ballroom)",
    beats: 4, defaultBpm: 126,
    hits: [
      { t: 0, type: "kick" }, { t: 1, type: "kick" }, { t: 2, type: "kick" }, { t: 3, type: "kick" },
      { t: 0.5, type: "hat" }, { t: 1.5, type: "hat" }, { t: 2.5, type: "hat" },
      { t: 3, type: "accent" }, { t: 3, type: "snare" },
    ],
    note: "The crash lands on the 4 — land something WITH it, every time.",
  },
  bell12: {
    name: "12/8 bell (west african)",
    beats: 12, defaultBpm: 300,
    hits: [
      { t: 0, type: "accent" }, { t: 2, type: "clave" }, { t: 4, type: "clave" },
      { t: 5, type: "clave" }, { t: 7, type: "clave" }, { t: 9, type: "clave" }, { t: 11, type: "clave" },
    ],
    note: "The standard bell pattern — the timekeeper the whole ensemble hangs on. Count 12 pulses.",
  },
};

// Which pattern a style opens with (every trainable pack must have one).
export const STYLE_PATTERNS = {
  breaking: "boombap",
  hiphop: "boombap",
  popping: "funk",
  locking: "funk",
  house: "fourfloor",
  salsa: "clave32",
  ballet: "waltz",
  tango: "tangowalk",
  afrobeats: "afro338",
  westafrican: "bell12",
  waacking: "fourfloor",
  dancehall: "afro338",
  vogue: "ha",
};

export const SOUND_TYPES = ["kick", "snare", "hat", "clave", "accent"];

// All hit times (seconds) in [from, until), given a cycle anchored at time 0.
// Pure: same inputs, same schedule. The page feeds this a rolling window.
export function scheduleWindow(pattern, bpm, from, until) {
  const spb = 60 / bpm;
  const cycleLen = pattern.beats * spb;
  const out = [];
  const firstCycle = Math.floor(from / cycleLen);
  for (let c = firstCycle; c * cycleLen < until; c++) {
    for (const h of pattern.hits) {
      const time = c * cycleLen + h.t * spb;
      if (time >= from && time < until) out.push({ time, type: h.type, beat: h.t, cycle: c });
    }
  }
  return out.sort((a, b) => a.time - b.time || SOUND_TYPES.indexOf(a.type) - SOUND_TYPES.indexOf(b.type));
}
