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
  twostep: [
    "60s of smooth walking, heel rolling to toe — the two-step IS a walk",
    "Easy hip circles x8 each way; the glide rides loose hips",
  ],
  linedance: [
    "Grapevines at half speed, 4 each way — wake the crossing step",
    "Ball-of-foot pivots x8 each direction, gentle — the walls turn on these",
  ],
  wcs: [
    "Slow rolling walks 60s, level head — smoothness starts here",
    "Sit-back holds x6 (3s each) — load the anchor before you dance it",
  ],
  kpop: [
    "Dynamic full-body: arm swings, torso twists, leg swings x10 each — sharp choreo loads everything",
    "Controlled arm stops x8 easy-range — rehearse the brakes before you drive fast",
  ],
  jazz: [
    "Gentle isolation ladder: head, shoulders, ribs, hips x4 each — wake the tower slowly",
    "Ankle relevés x15 — turns and walks bill the ankles first",
  ],
  contemporary: [
    "Three slow roll-downs, hanging heavy at the bottom — the spine opens gradually",
    "Quadruped wrist rocks 30s — floor visits start with happy wrists",
  ],
  tap: [
    "Ankle shakes 30s each foot until they flop free — tension is tap's only enemy",
    "Slow brushes x10 each foot before any speed — tune the drum first",
  ],
  irish: [
    "Calf raises x20 + light bounce 60s — the spring pays for everything",
    "Ankle circles x10 each way; land-through-the-foot rehearsals x8",
  ],
  flamenco: [
    "Slow arm circles x6 each arm, shoulders down — braceo begins warm",
    "Gentle heel-ball strike alternations 30s, knees soft — never hammer cold",
  ],
  raqs: [
    "Slow hip circles x8 each way over SOFT knees — the hips wake gently",
    "Knee-release bounces 30s, totally relaxed — the shimmy's engine is looseness",
  ],
  dabke: [
    "Ankle circles x10 each way + light stomp rehearsals x8, soft knees",
    "Springy pulse-step 60s — the line runs on warm calves",
  ],
  persian: [
    "Wrist circles x10 each hand, forearm still — the signature starts warm",
    "Easy shoulder rolls x10 and single-shoulder lifts x8 each side",
  ],
  soca: [
    "Slow hip circles x10 each way over SOFT knees — the wine wakes gently",
    "Easy chip in place 60s — the road engine idles first",
  ],
  son: [
    "Small unhurried weight transfers 60s, upper body calm",
    "Ankle circles x10 each way — elegant feet start supple",
  ],
  bomba: [
    "Grounded stance 30s, then easy full-body accents x6 at half power — wake the piquete muscles kindly",
    "Wrist and arm circles x8 each — the falda hand warms with the feet",
  ],
  polka: [
    "Calf raises x15 then 60s of SMALL hops — the spring pays for the whole night",
    "Easy knee circles x8; the hop lands on soft knees or not for long",
  ],
  kalamatianos: [
    "Light lifted stepping 60s on the balls of the feet, landings quiet",
    "Shoulder rolls x10 — the W hold needs easy shoulders",
  ],
  pizzica: [
    "Spring-step in place 60s building gently — the drum outlasts cold calves",
    "Ankle circles x10 each way + soft-focus quarter turns x6 each direction",
  ],
  bon: [
    "Settled soft-knee stepping 60s, unhurried — the circle's pace, found early",
    "Easy arm circles and mimed gestures x8 — the hands lead this dance",
  ],
  tinikling: [
    "Light alternating hops 60s, quiet landings — the poles reward warm calves",
    "Small target-hops x10 each foot — precision wakes before speed",
  ],
  buchaechum: [
    "Rise-and-settle breathing with soft knees 60s — the vertical breath IS the warm-up",
    "Wrist circles and fan-snap rehearsals x10 each hand",
  ],
  cumbia: [
    "Easy back-step shuffles 60s, weight settling — the party pace, found early",
    "Relaxed hip sways x10 each side over soft knees",
  ],
  marinera: [
    "Wrist circles x10 each hand at shoulder height — the pañuelo hand wakes first",
    "Gentle floor brushes x8 each foot, standing leg steady",
  ],
  capoeira: [
    "Slow ginga 60s at half depth — the sway warms before it schemes",
    "Deep squat holds x4 (10s) + quadruped wrist rocks 30s — base and hands ready",
  ],
  ori: [
    "Bent-knee base holds 3x30s, back tall — the shelf warms before it stills",
    "Slow hip circles x8 each way over deep knees — the 'ami wakes gently",
  ],
  waltz: [
    "Slow relevé rises and soft descents x12 — rise and fall lives in warm ankles",
    "Tall sways in 3/4, 60s — the ONE settling, the frame arms floating up gradually",
  ],
  chacha: [
    "Small quick side-chasses 45s on the balls of the feet — wake the chatter",
    "Slow Cuban-motion transfers x10 — hips from the floor, as always",
  ],
  foxtrot: [
    "60s of smooth heel-to-toe walking, level head — the whole dance, gently started",
    "Easy shoulder rolls x10 and frame-arm lifts x6 — the topline warms last",
  ],
  bhangra: [
    "60s of easy high-knee marching with soft landings — the engine idles before it revs",
    "Loose alternating shoulder bounces 45s — relaxed, never shrugged",
    "Big slow arm circles x8 each way — the dhamaal shapes need warm shoulders",
  ],
  garba: [
    "Gentle side-to-side sway steps 60s with light claps — find the cycle before you chase it",
    "Slow wrist circles x10 each way — dandiya wrists earn their warm-up",
    "Easy quarter-turns on the spot x8 — the spin comes later; the balance starts now",
  ],
  bharatanatyam: [
    "Shallow half-sit pulses x10, knees over toes, spine tall — greet araimandi, don't demand it",
    "Ankle rolls x10 each and flat-foot floor taps 30s — the strikes live in warm ankles",
    "Finger stretches and slow hasta forming 45s — strong fingers, soft wrists",
  ],
  sabar: [
    "60s of light springy bouncing on the balls of the feet — sabar rides UP; find the lift",
    "Quick low knee-flicks x10 each side, building height gradually — fast legs warm slowly",
    "Loose arm swings and throws 45s — the flings need shoulders like rope",
  ],
  kpanlogo: [
    "60s of easy bent-knee grooving, staying level — the low swing starts shallow and sinks",
    "Heavy relaxed arm swings in opposition 45s — let them be pendulums",
    "Slow hip circles x8 each way — the swing that scandalized 1964 deserves a warm-up",
  ],
  coupedecale: [
    "Smooth hip rolls 45s, then add rolling shoulders on top — two engines, warmed in order",
    "Light side-to-side shuffles 60s — the décalé feet wake up before they cut",
    "30s of grooving while actually smiling — the face is a muscle in this style; warm it",
  ],
  ndombolo: [
    "Slow full hip circles x8 each way over bent knees — grease the circle before the music shrinks it",
    "60s of easy low bouncing, shoulders loose and chattering — the chassis warms before the engine",
    "Gentle waist rolls with hands on ribs 30s — feel the waist move separately from the chest",
  ],
  kuduro: [
    "60s of tension-release pulses: squeeze everything one count, melt the next — the contrast, rehearsed gently",
    "Shallow squat pulses x12 with soft knees — the drops are earned from halfway up",
    "Fast small-step marching 45s, building speed — wake the feet before the batida demands them",
  ],
  semba: [
    "90s of springy walking with alive knees — never locking straight; the walk IS the dance, warm it first",
    "Easy hip sway from stepping in place 45s — sway as exhaust, never pushed",
    "Quick freeze drill x6: walk, stop dead clean, resume — cold paragens are wobbly paragens",
  ],
  pantsula: [
    "60s of small flat-footed marching, building speed — heels low, the floor is a friend",
    "Ankle circles x10 each and quick toe-taps 30s — flat-fast feet live on warm ankles",
    "Practice the cool 30s: feet busy, face bored — the contrast is a skill, warm it too",
  ],
  gumboot: [
    "Wrist circles and loose-hand shakes 45s — slaps come from the snap, not the arm",
    "Shallow knee-bend pulses x12 with a long quiet back — the stance is built from the legs",
    "Gentle palm-to-thigh pats 30s building crispness — wake the hands before the boots",
  ],
  amapiano: [
    "90s of slow grounded swaying, knees soft — the groove warms at groove tempo, not gym tempo",
    "Easy shoulder rolls x10 and small hip circles x8 — the narrators warm before the story",
    "Three 10s footwork bursts with calm returns — rehearse the sentence shape: calm, flurry, calm",
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
