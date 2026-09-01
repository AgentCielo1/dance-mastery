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
  polska: {
    name: "Polska three (the lean)",
    beats: 3, defaultBpm: 126,
    hits: [
      { t: 0, type: "kick" }, { t: 2, type: "kick" },
      { t: 0.9, type: "hat" },
      { t: 0, type: "clave" }, { t: 2, type: "clave" }, { t: 2.5, type: "hat" },
      { t: 0, type: "accent" },
    ],
    note: "Long-short-long: beats ONE and THREE are the ground (svikt dips there), beat two arrives early and floats. The bar leans forward like a walker on a hill.",
  },
  hallingbeat: {
    name: "Halling drive (hardingfele)",
    beats: 2, defaultBpm: 108,
    hits: [
      { t: 0, type: "kick" }, { t: 1, type: "kick" },
      { t: 0.5, type: "snare" }, { t: 1.75, type: "snare" },
      { t: 0.25, type: "hat" }, { t: 0.75, type: "hat" }, { t: 1.25, type: "hat" }, { t: 1.5, type: "hat" },
      { t: 0, type: "accent" },
    ],
    note: "The fiddle's relentless duple push — a dare set to strings. The coil rides it low; spend height only on purpose, and save the biggest answer for the last strain.",
  },
  fintango: {
    name: "Finnish tango (march-bass)",
    beats: 4, defaultBpm: 60,
    hits: [
      { t: 0, type: "kick" }, { t: 1, type: "kick" }, { t: 2, type: "kick" }, { t: 3, type: "kick" },
      { t: 1.5, type: "snare" }, { t: 3.5, type: "snare" },
      { t: 0, type: "hat" }, { t: 2, type: "hat" },
      { t: 0, type: "accent" }, { t: 2, type: "accent" },
    ],
    note: "The steady walking bass under the weeping melody — even, patient, weatherproof. The feet belong to the bass; the yearning stays upstairs. Smaller and heavier as it aches.",
  },
  kocharibeat: {
    name: "Kochari two-beat (dhol & zurna)",
    beats: 2, defaultBpm: 104,
    hits: [
      { t: 0, type: "kick" }, { t: 1, type: "kick" }, { t: 1.5, type: "kick" },
      { t: 0.5, type: "snare" }, { t: 1.75, type: "snare" },
      { t: 0.5, type: "hat" }, { t: 1.5, type: "hat" },
      { t: 0, type: "accent" },
    ],
    note: "The dhol's grounded drive with the doubled hit — that double is your stamp's cue. The knee-bounce never stops; it is the line's shared heartbeat.",
  },
  doli: {
    name: "Doli drive (Georgian)",
    beats: 6, defaultBpm: 156,
    hits: [
      { t: 0, type: "kick" }, { t: 3, type: "kick" },
      { t: 1.5, type: "snare" }, { t: 4.5, type: "snare" }, { t: 5, type: "snare" },
      { t: 1, type: "hat" }, { t: 2, type: "hat" }, { t: 4, type: "hat" }, { t: 5, type: "hat" },
      { t: 0, type: "accent" },
    ],
    note: "The double-headed drum's two messages: steady drive (carry) and the doubled crack (strike). Glide on the carry; place the proud angles on the crack.",
  },
  lezginka68: {
    name: "Lezginka gallop (wedding heat)",
    beats: 6, defaultBpm: 184,
    hits: [
      { t: 0, type: "kick" }, { t: 2, type: "kick" }, { t: 3, type: "kick" }, { t: 5, type: "kick" },
      { t: 1, type: "clave" }, { t: 4, type: "clave" },
      { t: 0.5, type: "hat" }, { t: 2.5, type: "hat" }, { t: 3.5, type: "hat" }, { t: 5.5, type: "hat" },
      { t: 0, type: "accent" }, { t: 3, type: "accent" },
    ],
    note: "The 6/8 gallop with the crowd's claps (the claves are the room's hands). Short solos exist because nobody survives long ones — the music designs the etiquette.",
  },
  ramthon: {
    name: "Ram thon stroll (ching & drum)",
    beats: 4, defaultBpm: 84,
    hits: [
      { t: 0, type: "kick" }, { t: 2, type: "kick" }, { t: 2.5, type: "kick" },
      { t: 1, type: "clave" }, { t: 3, type: "clave" },
      { t: 0.5, type: "hat" }, { t: 1.5, type: "hat" }, { t: 2.5, type: "hat" }, { t: 3.5, type: "hat" },
      { t: 3, type: "accent" },
    ],
    note: "The goblet drum strolls; the ching's closed 'chap' anchors. Built so everyone's grandmother wins — never let practice speed past the culture.",
  },
  kendang: {
    name: "Kendang jaipong (the cracks)",
    beats: 4, defaultBpm: 110,
    hits: [
      { t: 0, type: "kick" }, { t: 1.5, type: "kick" }, { t: 2, type: "kick" },
      { t: 0.75, type: "snare" }, { t: 2.75, type: "snare" }, { t: 3.25, type: "snare" },
      { t: 0.5, type: "hat" }, { t: 1, type: "hat" }, { t: 2.5, type: "hat" }, { t: 3, type: "hat" },
      { t: 3.75, type: "accent" }, { t: 0, type: "accent" },
    ],
    note: "The drum conducts the dancer: deep duts get the grind, the sharp 'pak!' cracks get the hit, the roll gets the sway. The accent before the ONE is the gong's doorstep.",
  },
  rondalla: {
    name: "Rondalla three (cariñosa)",
    beats: 3, defaultBpm: 140,
    hits: [
      { t: 0, type: "kick" },
      { t: 1, type: "clave" }, { t: 2, type: "clave" },
      { t: 0.5, type: "hat" }, { t: 1.5, type: "hat" }, { t: 2.5, type: "hat" },
      { t: 0, type: "accent" },
    ],
    note: "Waltz-time on plucked strings — the ONE lands soft because the bandurria plucks it. Glide the step, and time the fan's peeks to the phrase-ends.",
  },
  lazgi: {
    name: "Lazgi six (doira)",
    beats: 6, defaultBpm: 132,
    hits: [
      { t: 0, type: "kick" }, { t: 3, type: "kick" },
      { t: 1, type: "clave" }, { t: 2, type: "clave" }, { t: 4, type: "clave" }, { t: 5, type: "clave" }, { t: 5.5, type: "clave" },
      { t: 2, type: "hat" }, { t: 5, type: "hat" },
      { t: 0, type: "accent" },
    ],
    note: "The doira's six — fingers chattering around the deep bak. Lazgi accelerates live: run it slow, then nudge the bpm up in stages and keep your figures honest at every speed.",
  },
  dombra: {
    name: "Dombra trot (kara zhorga)",
    beats: 2, defaultBpm: 116,
    hits: [
      { t: 0, type: "kick" }, { t: 1, type: "kick" },
      { t: 0.5, type: "clave" }, { t: 0.75, type: "clave" }, { t: 1.5, type: "clave" }, { t: 1.75, type: "clave" },
      { t: 0.5, type: "hat" }, { t: 1.5, type: "hat" },
      { t: 0, type: "accent" },
    ],
    note: "The strummed two-beat amble — the dombra's wrist is doing the dance already. Let it drop into your knees; the pacer's smoothness is the whole brand.",
  },
  tatlaga: {
    name: "Tatlaga two-beat (bielgee)",
    beats: 4, defaultBpm: 92,
    hits: [
      { t: 0, type: "kick" }, { t: 2, type: "kick" },
      { t: 1, type: "snare" }, { t: 3, type: "snare" },
      { t: 0.5, type: "hat" }, { t: 1.5, type: "hat" }, { t: 2.5, type: "hat" }, { t: 3.5, type: "hat" },
      { t: 3.5, type: "clave" },
      { t: 0, type: "accent" },
    ],
    note: "The feast's clapped two-beat under the morin khuur's gaits — steady ground for shoulders that do all the talking. Phrase in fours and let the pauses speak.",
  },
  baladi: {
    name: "Baladi (dum-dum tak)",
    beats: 4, defaultBpm: 96,
    hits: [
      { t: 0, type: "kick" }, { t: 0.5, type: "kick" },
      { t: 1, type: "clave" }, { t: 1.5, type: "clave" },
      { t: 2, type: "kick" },
      { t: 3, type: "clave" },
      { t: 0.5, type: "hat" }, { t: 1.5, type: "hat" }, { t: 2.5, type: "hat" }, { t: 3.5, type: "hat" },
      { t: 0, type: "accent" },
    ],
    note: "DUM-DUM tak-tak DUM tak — the doubled dum up front is the homeland's heartbeat. Drop the hip on the dums; the tabla and your weight agree on gravity.",
  },
  saidi: {
    name: "Saidi (the strut)",
    beats: 4, defaultBpm: 104,
    hits: [
      { t: 0, type: "kick" },
      { t: 1, type: "clave" },
      { t: 2, type: "kick" }, { t: 2.5, type: "kick" },
      { t: 3, type: "clave" },
      { t: 0.5, type: "hat" }, { t: 1.5, type: "hat" }, { t: 3.5, type: "hat" },
      { t: 0, type: "accent" }, { t: 2, type: "accent" },
    ],
    note: "DUM tak DUM-DUM tak — the doubled dum in the middle is the strut; let it lift your knee. When this starts at a hafla, Upper Egypt takes the floor by proxy.",
  },
  chaabi68: {
    name: "Moroccan 6/8 (the weave)",
    beats: 6, defaultBpm: 180,
    hits: [
      { t: 0, type: "kick" }, { t: 2, type: "kick" }, { t: 4, type: "kick" },
      { t: 0, type: "clave" }, { t: 1.5, type: "clave" }, { t: 3, type: "clave" }, { t: 4.5, type: "clave" },
      { t: 1, type: "hat" }, { t: 3, type: "hat" }, { t: 5, type: "hat" },
      { t: 0, type: "accent" },
    ],
    note: "Two threes and three twos in the same bar — the bendir says both at once. Hips ride the kicks (threes), shoulders chatter the claves (twos). Never let them agree.",
  },
  sgubhu: {
    name: "Sgubhu (kwaito walk)",
    beats: 4, defaultBpm: 108,
    hits: [
      { t: 0, type: "kick" }, { t: 1, type: "kick" }, { t: 2, type: "kick" }, { t: 3, type: "kick" },
      { t: 1, type: "snare" }, { t: 3, type: "snare" },
      { t: 0.5, type: "hat" }, { t: 1.5, type: "hat" }, { t: 2.5, type: "hat" }, { t: 2.75, type: "hat" }, { t: 3.5, type: "hat" },
      { t: 0, type: "accent" },
    ],
    note: "House slowed to a township walk — heavy four below, feet subdividing above. The kick states it; the footwork argues with it.",
  },
  gumboot: {
    name: "Gumboot cycle (slaps & stamps)",
    beats: 4, defaultBpm: 100,
    hits: [
      { t: 0, type: "kick" }, { t: 2, type: "kick" }, { t: 3, type: "kick" },
      { t: 0.5, type: "clave" }, { t: 1, type: "clave" }, { t: 1.5, type: "clave" }, { t: 2.5, type: "clave" }, { t: 3.5, type: "clave" },
      { t: 1, type: "accent" }, { t: 3, type: "accent" },
    ],
    note: "Stamps low (kick), boot slaps sharp (clave) — the pattern was syntax before it was rhythm. Drill both hands until the recording can't tell them apart.",
  },
  logdrum: {
    name: "Log drum (amapiano)",
    beats: 4, defaultBpm: 112,
    hits: [
      { t: 0, type: "kick" }, { t: 0.75, type: "kick" }, { t: 1.5, type: "kick" }, { t: 2.5, type: "kick" }, { t: 3.25, type: "kick" },
      { t: 0.25, type: "hat" }, { t: 0.75, type: "hat" }, { t: 1.25, type: "hat" }, { t: 1.75, type: "hat" },
      { t: 2.25, type: "hat" }, { t: 2.75, type: "hat" }, { t: 3.25, type: "hat" }, { t: 3.75, type: "hat" },
      { t: 2, type: "snare" },
      { t: 0, type: "accent" },
    ],
    note: "The rolling hollow bass that drops late and takes the floor with it — shakers whispering above, space everywhere else. Groove small until it arrives.",
  },
  seben: {
    name: "Seben groove (ndombolo)",
    beats: 4, defaultBpm: 136,
    hits: [
      { t: 0, type: "kick" }, { t: 1, type: "kick" }, { t: 2, type: "kick" }, { t: 3, type: "kick" },
      { t: 1, type: "snare" }, { t: 3, type: "snare" },
      { t: 0.5, type: "hat" }, { t: 1.5, type: "hat" }, { t: 2.5, type: "hat" }, { t: 3.5, type: "hat" },
      { t: 0.5, type: "clave" }, { t: 1.75, type: "clave" }, { t: 2.5, type: "clave" }, { t: 3.75, type: "clave" },
      { t: 0, type: "accent" },
    ],
    note: "The guitar's short phrases chatter over the drive — the seben is a staircase, so dance bigger every eight bars. Hips on the pulse, shoulders on the eighths.",
  },
  batida: {
    name: "Batida (kuduro, hard 140)",
    beats: 4, defaultBpm: 140,
    hits: [
      { t: 0, type: "kick" }, { t: 1, type: "kick" }, { t: 2, type: "kick" }, { t: 3, type: "kick" },
      { t: 1.5, type: "snare" }, { t: 2.75, type: "snare" }, { t: 3.5, type: "snare" },
      { t: 0.5, type: "hat" }, { t: 1.25, type: "hat" }, { t: 2.5, type: "hat" }, { t: 3.25, type: "hat" },
      { t: 0, type: "accent" }, { t: 2, type: "accent" },
    ],
    note: "Hard four with jabbing off-grid snares — hit ON the accents with machine precision, go loose between them. The contrast is the style.",
  },
  semba: {
    name: "Semba pulse (dikanza)",
    beats: 2, defaultBpm: 96,
    hits: [
      { t: 0, type: "kick" }, { t: 1, type: "kick" },
      { t: 0.5, type: "snare" }, { t: 1.75, type: "snare" },
      { t: 0.25, type: "clave" }, { t: 0.75, type: "clave" }, { t: 1.25, type: "clave" }, { t: 1.5, type: "clave" }, { t: 1.75, type: "clave" },
      { t: 0, type: "accent" },
    ],
    note: "Ngoma below, the dikanza scraper chattering above — quicker and cheekier than its child kizomba. The breaks are invitations: stop clean, grin, resume.",
  },
  sabar: {
    name: "Sabar cycle (drum-talk)",
    beats: 4, defaultBpm: 130,
    hits: [
      { t: 0, type: "kick" }, { t: 1.5, type: "kick" }, { t: 2, type: "kick" },
      { t: 0.5, type: "clave" }, { t: 0.75, type: "clave" }, { t: 1, type: "clave" },
      { t: 2.5, type: "clave" }, { t: 3, type: "clave" }, { t: 3.25, type: "clave" }, { t: 3.75, type: "clave" },
      { t: 1, type: "snare" }, { t: 3, type: "snare" },
      { t: 0, type: "accent" },
    ],
    note: "Stick-and-hand chatter over the low pulse — busy, buoyant, up on the beat. When the pattern breaks, that's the drum asking; answer with a picture stop.",
  },
  kpanlogo: {
    name: "Kpanlogo bell (Ga timeline)",
    beats: 4, defaultBpm: 112,
    hits: [
      { t: 0, type: "clave" }, { t: 1, type: "clave" }, { t: 1.5, type: "clave" }, { t: 2.5, type: "clave" }, { t: 3, type: "clave" },
      { t: 0, type: "kick" }, { t: 2, type: "kick" },
      { t: 1, type: "snare" }, { t: 3, type: "snare" },
      { t: 0, type: "accent" },
    ],
    note: "The bell keeps the truth — five strokes every dancer measures against. Clap the bell till it's boring; then your feet are ready.",
  },
  coupedecale: {
    name: "Coupé-décalé drive",
    beats: 4, defaultBpm: 132,
    hits: [
      { t: 0, type: "kick" }, { t: 1, type: "kick" }, { t: 2, type: "kick" }, { t: 3, type: "kick" },
      { t: 0.5, type: "hat" }, { t: 1.5, type: "hat" }, { t: 2.5, type: "hat" }, { t: 3.5, type: "hat" },
      { t: 1.75, type: "snare" }, { t: 2, type: "snare" }, { t: 3.5, type: "snare" }, { t: 3.75, type: "snare" },
      { t: 0, type: "accent" },
    ],
    note: "Four-on-the-floor with soukous DNA — the snare rolls are where the décalé cuts. Imagine the atalaku calling your name; dance accordingly.",
  },
  chaal: {
    name: "Dhol chaal (bhangra)",
    beats: 4, defaultBpm: 100,
    hits: [
      { t: 0, type: "kick" }, { t: 0.67, type: "kick" }, { t: 2, type: "kick" }, { t: 2.67, type: "kick" },
      { t: 1, type: "snare" }, { t: 3, type: "snare" }, { t: 3.67, type: "snare" },
      { t: 0, type: "hat" }, { t: 1.67, type: "hat" }, { t: 2, type: "hat" }, { t: 3.67, type: "hat" },
      { t: 0, type: "accent" },
    ],
    note: "The dhol's swung eight: deep dhin rolling under, sharp ta answering. The bounce rides the swing, not the grid.",
  },
  garba: {
    name: "Garba cycle (claps in)",
    beats: 4, defaultBpm: 138,
    hits: [
      { t: 0, type: "kick" }, { t: 1, type: "kick" }, { t: 2, type: "kick" }, { t: 3, type: "kick" },
      { t: 1.5, type: "snare" }, { t: 3.5, type: "snare" },
      { t: 0.5, type: "hat" }, { t: 1.5, type: "hat" }, { t: 2.5, type: "hat" }, { t: 3.5, type: "hat" },
      { t: 2, type: "clave" }, { t: 0, type: "accent" },
    ],
    note: "The circle's driving four with the crowd's claps built in — the clave hit is where ten thousand hands agree. Tempo climbs as the night deepens.",
  },
  aditala: {
    name: "Adi tala (8-beat cycle)",
    beats: 8, defaultBpm: 76,
    hits: [
      { t: 0, type: "kick" }, { t: 4, type: "snare" }, { t: 6, type: "snare" },
      { t: 1, type: "hat" }, { t: 2, type: "hat" }, { t: 3, type: "hat" }, { t: 5, type: "hat" }, { t: 7, type: "hat" },
      { t: 0, type: "accent" },
    ],
    note: "Carnatic music's home cycle: clap-2-3-4, clap-and, clap-and — 4+2+2. Speak a sollukattu over it: tai ya tai hi. The dance's clock.",
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
  bhangra: "chaal",
  garba: "garba",
  bharatanatyam: "aditala",
  sabar: "sabar",
  kpanlogo: "kpanlogo",
  coupedecale: "coupedecale",
  ndombolo: "seben",
  kuduro: "batida",
  semba: "semba",
  pantsula: "sgubhu",
  gumboot: "gumboot",
  amapiano: "logdrum",
  baladi: "baladi",
  saidi: "saidi",
  chaabi: "chaabi68",
  lazgi: "lazgi",
  karazhorga: "dombra",
  bielgee: "tatlaga",
  ramwong: "ramthon",
  jaipongan: "kendang",
  carinosa: "rondalla",
  kochari: "kocharibeat",
  georgian: "doli",
  lezginka: "lezginka68",
  polska: "polska",
  halling: "hallingbeat",
  finnishtango: "fintango",
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
