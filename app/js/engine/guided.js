// Guided Session Mode — pure timing math + freestyle prompt deck.
// Doc 05: the lower the activation energy, the more sessions happen.
// Guided mode removes the last decision: press play, follow the clock.

const WEIGHTS = { ignition: 0.1, review: 0.35, new: 0.3, bodyprep: 0.15, freestyle: 0.1 };
const MIN_SECONDS = 60;

// Split session.minutes across the blocks actually present, re-normalizing
// weights, flooring at one minute, rounding to 10s. Deterministic.
export function allocate(session) {
  const total = session.minutes * 60;
  const present = session.blocks.map((b) => ({ kind: b.kind, title: b.title, weight: WEIGHTS[b.kind] ?? 0.1 }));
  const weightSum = present.reduce((s, b) => s + b.weight, 0);
  const out = present.map((b) => ({
    kind: b.kind,
    title: b.title,
    seconds: Math.max(MIN_SECONDS, Math.round((total * b.weight) / weightSum / 10) * 10),
  }));
  // trim overshoot from the largest block so short sessions stay short
  const overshoot = out.reduce((s, b) => s + b.seconds, 0) - total;
  if (overshoot > 0) {
    const biggest = out.reduce((a, b) => (b.seconds > a.seconds ? b : a));
    biggest.seconds = Math.max(MIN_SECONDS, biggest.seconds - Math.round(overshoot / 10) * 10);
  }
  return out;
}

// Constraint cards for the freestyle block — constraints breed style (Doc 03).
export const FREESTYLE_PROMPTS = [
  "Levels only: spend the whole track changing height, never staying anywhere.",
  "One arm is off duty. The other does everything.",
  "Face a wall. Dance for it like it paid for tickets.",
  "Half speed. Everything you know, at 50% — no cheating the transitions.",
  "Eyes closed for the whole track (clear the floor first).",
  "Repeat one move until it changes into something else. Follow it.",
  "Only travel: cross the room the entire track, never dance in place.",
  "Dance the drums only. Ignore the melody completely.",
  "Dance the melody only. Ignore the drums completely.",
  "Freeze every time the music breathes. Stillness counts as dancing.",
  "Your hands lead everything. The body just follows them around.",
  "Smallest possible version of every move — whisper the whole track.",
  "Biggest possible version of every move — shout the whole track.",
  "Pick one corner of the room. Everything is aimed at it.",
  "No repeats: once you do a move, it's spent for the rest of the track.",
  "Tell a story: entrance, problem, victory lap. Make someone imaginary cry.",
];

export function pickPrompt(rand = Math.random) {
  return FREESTYLE_PROMPTS[Math.floor(rand() * FREESTYLE_PROMPTS.length)];
}
