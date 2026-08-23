// Keep the screen awake while training (Doc 05: friction kills sessions —
// a phone that locks mid-drill is friction). Re-acquires when the tab
// returns to the foreground; silently does nothing where unsupported.
export function keepAwake() {
  let lock = null;
  async function acquire() {
    try { lock = await navigator.wakeLock?.request?.("screen"); } catch { /* low battery / unsupported */ }
  }
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") acquire();
  });
  acquire();
  return () => { try { lock?.release(); } catch { /* already gone */ } };
}
