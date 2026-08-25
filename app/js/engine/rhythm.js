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
  bachata: {
    name: "Bachata (1-2-3-tap)",
    beats: 4, defaultBpm: 130,
    hits: [
      { t: 0, type: "kick" }, { t: 1, type: "kick" }, { t: 2, type: "kick" },
      { t: 3, type: "accent" },
      { t: 0.5, type: "hat" }, { t: 1.5, type: "hat" }, { t: 2.5, type: "hat" }, { t: 3.5, type: "hat" },
    ],
    note: "Steps on 1-2-3, the accent is your tap-and-hip on 4. Güira lives in the hats.",
  },
  kizomba: {
    name: "Kizomba slow groove",
    beats: 4, defaultBpm: 92,
    hits: [
      { t: 0, type: "kick" }, { t: 1.75, type: "kick" }, { t: 2, type: "kick" },
      { t: 1, type: "snare" }, { t: 3, type: "snare" },
      { t: 0.5, type: "hat" }, { t: 2.5, type: "hat" }, { t: 3.5, type: "hat" },
    ],
    note: "Slow and rolling — the ginga strolls beside this, never chases it.",
  },
  swing: {
    name: "Swing ride (swung 4/4)",
    beats: 4, defaultBpm: 140,
    hits: [
      { t: 0, type: "hat" }, { t: 1, type: "hat" }, { t: 1.67, type: "hat" },
      { t: 2, type: "hat" }, { t: 3, type: "hat" }, { t: 3.67, type: "hat" },
      { t: 0, type: "kick" }, { t: 2, type: "kick" },
      { t: 1, type: "snare" }, { t: 3, type: "snare" },
    ],
    note: "The ride pattern, swung: ding, ding-ga-ding. Pulse on every beat — long-SHORT, never even.",
  },
  samba: {
    name: "Samba batucada (surdo + tamborim)",
    beats: 4, defaultBpm: 104,
    hits: [
      { t: 1, type: "accent" }, { t: 3, type: "accent" },
      { t: 0, type: "kick" }, { t: 2, type: "kick" },
      { t: 0, type: "hat" }, { t: 0.5, type: "hat" }, { t: 0.75, type: "hat" },
      { t: 1.5, type: "hat" }, { t: 2.25, type: "hat" }, { t: 2.5, type: "hat" }, { t: 3.5, type: "hat" },
    ],
    note: "Two bars of 2/4: the surdo lands HEAVY on the second beat of each bar. Triple-time feet ride the top.",
  },
  baiao: {
    name: "Baião (forró zabumba)",
    beats: 2, defaultBpm: 100,
    hits: [
      { t: 0, type: "kick" }, { t: 1.5, type: "kick" },
      { t: 0.75, type: "snare" },
      { t: 0, type: "hat" }, { t: 0.5, type: "hat" }, { t: 1, type: "hat" }, { t: 1.5, type: "hat" },
    ],
    note: "Zabumba low-boom, dry slap, boom — the triangle keeps eighths on top. Two-step home.",
  },
  bzouk: {
    name: "Zouk (boom-chik-chik)",
    beats: 2, defaultBpm: 76,
    hits: [
      { t: 0, type: "kick" },
      { t: 0.75, type: "snare" }, { t: 1.25, type: "snare" },
      { t: 0.5, type: "hat" }, { t: 1, type: "hat" }, { t: 1.5, type: "hat" },
    ],
    note: "Boom… chik-chik. The slow step stretches through the boom; the quicks answer the chiks.",
  },
  chacha: {
    name: "Cha-cha (güiro & cowbell)",
    beats: 4, defaultBpm: 124,
    hits: [
      { t: 0, type: "kick" }, { t: 2, type: "kick" },
      { t: 1, type: "clave" }, { t: 3, type: "clave" }, { t: 3.5, type: "clave" },
      { t: 0.5, type: "hat" }, { t: 1.5, type: "hat" }, { t: 2.5, type: "hat" },
      { t: 1, type: "accent" },
    ],
    note: "Two-three-cha-cha-cha: break on the TWO, chatter home on 4-and-1. The dance named after its own footsteps.",
  },
  foxtrot: {
    name: "Foxtrot stroll (light swing)",
    beats: 4, defaultBpm: 116,
    hits: [
      { t: 0, type: "kick" }, { t: 2, type: "kick" },
      { t: 1, type: "snare" }, { t: 3, type: "snare" },
      { t: 0, type: "hat" }, { t: 1.67, type: "hat" }, { t: 2, type: "hat" }, { t: 3.67, type: "hat" },
    ],
    note: "Big-band swing at strolling tempo — slows take two beats, quicks take one. Walk it like the singer sounds.",
  },
  toere: {
    name: "Tō'ere pehe ('ōte'a)",
    beats: 4, defaultBpm: 168,
    hits: [
      { t: 0, type: "clave" }, { t: 0.5, type: "clave" }, { t: 1, type: "clave" },
      { t: 1.75, type: "clave" }, { t: 2, type: "clave" }, { t: 2.5, type: "clave" }, { t: 3.5, type: "clave" },
      { t: 0, type: "kick" }, { t: 2, type: "kick" },
      { t: 0, type: "accent" },
    ],
    note: "The slit drum's wooden fire over the pahu's pulse — hips answer the tō'ere, feet answer the pahu.",
  },
  cumbia: {
    name: "Cumbia pulse (guacharaca)",
    beats: 2, defaultBpm: 96,
    hits: [
      { t: 0, type: "kick" }, { t: 1, type: "kick" },
      { t: 0.5, type: "clave" }, { t: 0.75, type: "clave" }, { t: 1.5, type: "clave" }, { t: 1.75, type: "clave" },
      { t: 1, type: "snare" },
    ],
    note: "Tambores below, the scraper's cha-ka-cha above — the pulse that crossed every border in Latin America.",
  },
  sesquialtera: {
    name: "Sesquiáltera (6/8 vs 3/4)",
    beats: 6, defaultBpm: 190,
    hits: [
      { t: 0, type: "kick" }, { t: 3, type: "kick" },
      { t: 0, type: "clave" }, { t: 2, type: "clave" }, { t: 4, type: "clave" },
      { t: 1, type: "hat" }, { t: 5, type: "hat" },
    ],
    note: "Two threes (the kicks) against three twos (the claves) — marinera, chacarera and joropo all live on this seam.",
  },
  berimbau: {
    name: "Berimbau toque (capoeira)",
    beats: 4, defaultBpm: 120,
    hits: [
      { t: 0, type: "kick" }, { t: 2, type: "kick" },
      { t: 1, type: "clave" }, { t: 1.5, type: "clave" }, { t: 3, type: "clave" },
      { t: 0.5, type: "hat" }, { t: 2.5, type: "hat" }, { t: 3.5, type: "hat" },
    ],
    note: "The bow commands the roda — the toque tells the players what game to play. Ginga to it; listen first.",
  },
  ondo: {
    name: "Ondo (bon odori taiko)",
    beats: 4, defaultBpm: 116,
    hits: [
      { t: 0, type: "kick" }, { t: 0.75, type: "kick" }, { t: 2, type: "kick" }, { t: 2.75, type: "kick" },
      { t: 1.5, type: "snare" }, { t: 3.5, type: "snare" },
      { t: 0, type: "accent" }, { t: 3, type: "clave" }, { t: 3.25, type: "clave" },
    ],
    note: "Don-doko under the song, the crowd's claps on the break — a sore sore! The circle never rushes.",
  },
  tinikling: {
    name: "Tinikling poles (3/4)",
    beats: 3, defaultBpm: 160,
    hits: [
      { t: 0, type: "clave" }, { t: 1, type: "clave" }, { t: 2, type: "accent" },
      { t: 0, type: "hat" }, { t: 1, type: "hat" },
    ],
    note: "Tap, tap, CLOSE. Feet IN on the taps, OUT before the close — the beat your ankles depend on.",
  },
  gutgeori: {
    name: "Gutgeori jangdan (korean 12/8)",
    beats: 12, defaultBpm: 320,
    hits: [
      { t: 0, type: "kick" }, { t: 6, type: "kick" },
      { t: 3, type: "clave" }, { t: 8, type: "clave" }, { t: 10, type: "clave" },
      { t: 2, type: "hat" }, { t: 5, type: "hat" }, { t: 9, type: "hat" },
    ],
    note: "The janggu's lilting cycle — breathe it, don't count it: rise on the kung, settle on the deok.",
  },
  oompah: {
    name: "Oom-pah (polka 2/4)",
    beats: 2, defaultBpm: 116,
    hits: [
      { t: 0, type: "kick" }, { t: 1, type: "kick" },
      { t: 0.5, type: "snare" }, { t: 1.5, type: "snare" },
      { t: 0, type: "accent" },
    ],
    note: "OOM on the beat, PAH answering — hop-step-close-step fits one pair exactly. Spring small.",
  },
  epta: {
    name: "Epta — 7/8 (kalamatianos)",
    beats: 7, defaultBpm: 250,
    hits: [
      { t: 0, type: "accent" }, { t: 3, type: "clave" }, { t: 5, type: "clave" },
      { t: 1, type: "hat" }, { t: 2, type: "hat" }, { t: 4, type: "hat" }, { t: 6, type: "hat" },
    ],
    note: "Seven that stays seven: ONE-two-three, ONE-two, ONE-two. Slow-quick-quick — kal-a-ma — tia — nos.",
  },
  pizzica: {
    name: "Tamburello drive (pizzica 6/8)",
    beats: 6, defaultBpm: 300,
    hits: [
      { t: 0, type: "kick" }, { t: 3, type: "kick" },
      { t: 0, type: "clave" }, { t: 2, type: "clave" }, { t: 3, type: "clave" }, { t: 5, type: "clave" },
      { t: 1, type: "hat" }, { t: 4, type: "hat" },
    ],
    note: "The frame drum's relentless 6/8 — it had a cure to drive. Spring light; it does not stop.",
  },
  soca: {
    name: "Soca engine room",
    beats: 4, defaultBpm: 158,
    hits: [
      { t: 0, type: "kick" }, { t: 1, type: "kick" }, { t: 2, type: "kick" }, { t: 3, type: "kick" },
      { t: 1.5, type: "snare" }, { t: 3.5, type: "snare" },
      { t: 0.5, type: "hat" }, { t: 2.5, type: "hat" }, { t: 3.75, type: "clave" },
    ],
    note: "Power soca's road engine — four on the floor with the iron pushing between. Chip to conserve, jump on command.",
  },
  sica: {
    name: "Sicá (bomba)",
    beats: 4, defaultBpm: 96,
    hits: [
      { t: 0, type: "kick" }, { t: 2, type: "kick" }, { t: 2.5, type: "kick" },
      { t: 0, type: "clave" }, { t: 0.5, type: "clave" }, { t: 1, type: "clave" },
      { t: 1.75, type: "clave" }, { t: 2.5, type: "clave" }, { t: 3, type: "clave" }, { t: 3.5, type: "clave" },
    ],
    note: "The buleador holds the base, the cuá patterns the time — and the primo above answers the DANCER. Hold the ground.",
  },
  maqsoum: {
    name: "Maqsoum (dum-tak)",
    beats: 4, defaultBpm: 108,
    hits: [
      { t: 0, type: "kick" }, { t: 2, type: "kick" },
      { t: 0.5, type: "clave" }, { t: 1.5, type: "clave" }, { t: 3, type: "clave" },
      { t: 1, type: "hat" }, { t: 2.5, type: "hat" }, { t: 3.5, type: "hat" },
    ],
    note: "DUM-TAK — TAK-DUM — TAK. The tabla's language; the hips answer the dums.",
  },
  dabkeh: {
    name: "Dabke drive",
    beats: 4, defaultBpm: 120,
    hits: [
      { t: 0, type: "kick" }, { t: 1, type: "kick" }, { t: 2, type: "kick" }, { t: 3, type: "kick" },
      { t: 0, type: "accent" }, { t: 2.5, type: "snare" }, { t: 3.5, type: "snare" },
      { t: 0.5, type: "hat" }, { t: 1.5, type: "hat" },
    ],
    note: "The derbake drives, the line answers — six-count step over a four-beat engine; stomp the ONE.",
  },
  shesh: {
    name: "Shesh-o-hasht (persian 6/8)",
    beats: 6, defaultBpm: 170,
    hits: [
      { t: 0, type: "kick" }, { t: 3, type: "kick" },
      { t: 2, type: "clave" }, { t: 5, type: "clave" },
      { t: 1, type: "hat" }, { t: 4, type: "hat" },
    ],
    note: "The Persian lilt — six-eight that refuses to be square. Sway until your weight changes without permission.",
  },
  reel: {
    name: "Reel (irish 4/4)",
    beats: 4, defaultBpm: 112,
    hits: [
      { t: 0, type: "accent" }, { t: 2, type: "clave" },
      { t: 0.5, type: "hat" }, { t: 1, type: "hat" }, { t: 1.5, type: "hat" },
      { t: 2.5, type: "hat" }, { t: 3, type: "hat" }, { t: 3.5, type: "hat" },
    ],
    note: "The workhorse tune — buoyant eighths, lift on the ONE. Land like rain.",
  },
  compas12: {
    name: "Compás de 12 (soleá / bulerías)",
    beats: 12, defaultBpm: 200,
    hits: [
      { t: 2, type: "accent" }, { t: 5, type: "accent" }, { t: 7, type: "accent" },
      { t: 9, type: "accent" }, { t: 11, type: "accent" },
      { t: 0, type: "hat" }, { t: 1, type: "hat" }, { t: 3, type: "hat" }, { t: 4, type: "hat" },
      { t: 6, type: "hat" }, { t: 8, type: "hat" }, { t: 10, type: "hat" },
    ],
    note: "Flamenco's absolute law: twelve counts, accents on 3-6-8-10-12. Count aloud until it counts you.",
  },
  flow68: {
    name: "Flowing 6/8 (contemporary)",
    beats: 6, defaultBpm: 160,
    hits: [
      { t: 0, type: "accent" }, { t: 3, type: "clave" },
      { t: 1, type: "hat" }, { t: 2, type: "hat" }, { t: 4, type: "hat" }, { t: 5, type: "hat" },
    ],
    note: "Two gentle pulses per bar, six underneath — breathe with the ONE and the FOUR.",
  },
  train: {
    name: "Train beat (country shuffle)",
    beats: 2, defaultBpm: 180,
    hits: [
      { t: 0, type: "kick" }, { t: 1, type: "snare" },
      { t: 0.5, type: "hat" }, { t: 1.5, type: "hat" },
    ],
    note: "The honky-tonk train rolls steady — quick-quick-slow-slow rides on top.",
  },
  westcoast: {
    name: "Half-time groove (west coast swing)",
    beats: 4, defaultBpm: 92,
    hits: [
      { t: 0, type: "kick" }, { t: 2.5, type: "kick" },
      { t: 1, type: "snare" }, { t: 3, type: "snare" },
      { t: 0.5, type: "hat" }, { t: 1.5, type: "hat" }, { t: 2, type: "hat" }, { t: 3.5, type: "hat" },
    ],
    note: "Slow pocket, heavy backbeat — walk-walk triple-triple, and settle the anchor on the 2-and-4.",
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
  bachata: "bachata",
  kizomba: "kizomba",
  lindy: "swing",
  samba: "samba",
  forro: "baiao",
  bzouk: "bzouk",
  twostep: "train",
  linedance: "fourfloor",
  wcs: "westcoast",
  kpop: "fourfloor",
  jazz: "swing",
  contemporary: "flow68",
  tap: "swing",
  irish: "reel",
  flamenco: "compas12",
  raqs: "maqsoum",
  dabke: "dabkeh",
  persian: "shesh",
  soca: "soca",
  son: "clave32",
  bomba: "sica",
  polka: "oompah",
  kalamatianos: "epta",
  pizzica: "pizzica",
  bon: "ondo",
  tinikling: "tinikling",
  buchaechum: "gutgeori",
  cumbia: "cumbia",
  marinera: "sesquialtera",
  capoeira: "berimbau",
  ori: "toere",
  waltz: "waltz",
  chacha: "chacha",
  foxtrot: "foxtrot",
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
