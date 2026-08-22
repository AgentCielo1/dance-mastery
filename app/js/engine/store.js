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
