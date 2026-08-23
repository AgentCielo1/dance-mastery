// State persistence with injectable storage (localStorage in the browser,
// plain objects in tests). Every read/write is guarded (Doc 06: storage can
// throw in previews/private windows).

// Per-style state. The bare key is breaking's (back-compat with existing
// users); other styles get a suffixed key.
function keyFor(style) {
  return !style || style === "breaking"
    ? "dance-mastery-state-v1"
    : `dance-mastery-state-v1:${style}`;
}

export function newState(today) {
  return {
    version: 1,
    startDate: today,
    sessions: [],   // [{date, size}]
    nodes: {},      // id -> {stage, intervalIndex, dueDate, lastReviewed, reps, cleanStreak}
    attributes: {}, // id -> {achieved, date}
    freezes: [],    // ["YYYY-MM-DD"] frozen (or repaired) days
  };
}

export function loadState(today, storage, style) {
  try {
    const raw = storage?.getItem?.(keyFor(style));
    if (raw) {
      const s = JSON.parse(raw);
      if (s && s.version === 1) return s;
    }
  } catch { /* fall through to fresh state */ }
  return newState(today);
}

export function saveState(state, storage, style) {
  try {
    storage?.setItem?.(keyFor(style), JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function exportState(state) {
  return JSON.stringify(state, null, 2);
}

export function importState(json) {
  const s = JSON.parse(json);
  if (!s || s.version !== 1 || !Array.isArray(s.sessions)) {
    throw new Error("Not a dance-mastery v1 state file");
  }
  return s;
}

// ---- All-device sync (Doc 06: progress is the dancer's, not a server's) ----
// One bundle carries every style's state plus preferences, so a phone and a
// computer can trade complete snapshots with zero backend.

const PREF_KEYS = ["dance-mastery-style", "dance-mastery-crew-url", "dance-mastery-onboarded"];

export function exportBundle(storage, styles, today) {
  const bundle = { kind: "dance-mastery-sync", version: 1, exported: today, states: {}, prefs: {} };
  for (const style of styles) {
    try {
      const raw = storage?.getItem?.(keyFor(style));
      if (raw) bundle.states[style] = JSON.parse(raw);
    } catch { /* skip unreadable */ }
  }
  for (const k of PREF_KEYS) {
    try {
      const v = storage?.getItem?.(k);
      if (v != null) bundle.prefs[k] = v;
    } catch { /* skip */ }
  }
  return JSON.stringify(bundle, null, 2);
}

// Accepts a sync bundle, or (back-compat) a bare single-style v1 state —
// the caller decides which style a bare state belongs to.
export function importBundle(json, storage) {
  const b = JSON.parse(json);
  if (b && b.version === 1 && Array.isArray(b.sessions)) return { kind: "single", state: b };
  if (!b || b.kind !== "dance-mastery-sync" || b.version !== 1 || typeof b.states !== "object" || b.states === null) {
    throw new Error("Not a Dance Mastery sync file");
  }
  const imported = [];
  for (const [style, state] of Object.entries(b.states)) {
    if (state && state.version === 1 && Array.isArray(state.sessions)) {
      if (saveState(state, storage, style)) imported.push(style);
    }
  }
  for (const [k, v] of Object.entries(b.prefs ?? {})) {
    if (PREF_KEYS.includes(k) && typeof v === "string") {
      try { storage?.setItem?.(k, v); } catch { /* no storage */ }
    }
  }
  return { kind: "bundle", imported };
}
