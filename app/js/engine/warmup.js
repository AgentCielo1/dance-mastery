// Warm-up protocol — pure data (Doc 03: the body-prep spine exists because
// adult dancers get hurt in minute one, not minute thirty). Generic joint
// prep for every session, plus what each style loads hardest.

const GENERIC = [
  "Neck: 5 slow half-circles each way — never crank backwards",
  "Shoulders: 10 big rolls back, 10 forward",
  "Hips: 8 circles each direction, hands on hips",
  "Knees: 8 gentle circles together, then each leg",
  "Ankles: 10 rolls each side — dancers live on these",
  "Pulse up: 60s of light bounce to the music — sweat says ready",
];

// What each style loads first — added after the generic sequence.
const STYLE_EXTRAS = {
  breaking: [
    "Wrists: 20 circles each way + 10 gentle palm-down loading leans — floors punish cold wrists",
    "Cat-cow x8 and one slow squat hold — spine and hips awake before any get-down",
  ],
  popping: [
    "Forearm squeeze-and-RELEASE x10 each arm — rehearse the hit's relax half",
    "Chest lifts x10, easy — the pop starts warm",
  ],
  locking: [
    "Wrist twirl rehearsal x10 each hand, elbows high and light",
    "Arm swings: 10 big loose backstrokes — locking hates cold shoulders",
  ],
  house: [
    "Calf raises x15 and light skips 30s — the balls of your feet clock in first",
    "Loose knee bounces 30s — the jack rides warm knees",
  ],
  hiphop: [
    "Bounce 60s at half depth — grease the groove before you feed it",
    "Torso rolls x8 — chest and waist loose for layering",
  ],
  salsa: [
    "Relevé rises x15 — turns live on warm ankles",
    "Slow Cuban-motion transfers x10 — hips from the floor, not the waist",
  ],
  bachata: [
    "Hip circles x10 each way with soft knees — the tap's hip needs warm hips",
    "Small side basics 60s at half tempo",
  ],
  ballet: [
    "Feet: slow tendu brushes x8 each side before anything — articulate, don't smash",
    "Turnout activation: 10 slow clamshell squeezes each side (from the HIP)",
  ],
  tango: [
    "Slow walks 60s with full transfers — the caminada warms itself",
    "Disassociation twists x8 each way, gentle — wring the towel slowly",
  ],
  afrobeats: [
    "Bounce with shoulder rolls 60s — the groove is the warm-up",
    "Knee-lift marches x10 each side",
  ],
  westafrican: [
    "Grounded posture hold 30s, then gentle torso pumps x10",
    "Flat-foot stomps in place 30s, soft knees — earth first",
  ],
  waacking: [
    "Arm circles: 10 full backstrokes each arm building speed — whacks need warm shoulders",
    "Wrist circles x15 each hand at face height",
  ],
  dancehall: [
    "Knee-driven bounce 60s — sit into it gradually",
    "Waistline circles x8 each way, easy range first",
  ],
  vogue: [
    "Wrist and finger articulation 30s — hands wake up first",
    "Deep squat hold 20s, heels down — the floor work says hello",
  ],
  kizomba: [
    "Slow weight transfers 60s, hips answering — the ginga warms itself",
    "Balance pauses: 5 mid-step holds each side",
  ],
  lindy: [
    "Pulse bounce 60s building to tempo — the engine idles first",
    "Ankle springs x15 — triples are an ankle tax",
  ],
  samba: [
    "Calf raises x20 slow + 60s light ball-of-foot bounce — samba punishes cold calves first",
    "Loose hip swings x10 each side, knees soft",
  ],
  forro: [
    "Side-to-side weight transfers 60s, settling fully each side",
    "Easy knee circles x8 — the two-step rides soft knees",
  ],
  bzouk: [
    "Cat-cow x8 and slow standing side-bends x6 each way — wake the spine gently, never the neck",
    "Single-leg balance 15s each side — the lateral lives on your axis",
  ],
};

export function warmupFor(style) {
  return [...GENERIC, ...(STYLE_EXTRAS[style] ?? [])];
}

export const COOLDOWN = [
  "Shake everything out 20s",
  "One slow forward fold, knees soft — breathe 5 breaths",
  "Note ONE thing that felt better than yesterday (out loud counts)",
];
