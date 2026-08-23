// Add-to-home-screen hint — shown once, dismissible forever. The app is
// built to be opened daily; living on the home screen is how that happens.
const KEY = "dance-mastery-install-hint-dismissed";

export function installHint(storage) {
  try { if (storage?.getItem?.(KEY)) return; } catch { return; }
  if (window.matchMedia?.("(display-mode: standalone)").matches || navigator.standalone) return;

  function dismiss(el) {
    el.remove();
    try { storage?.setItem?.(KEY, "1"); } catch { /* no storage */ }
  }

  function show(text, actionLabel, action) {
    if (document.getElementById("install-hint")) return;
    const el = document.createElement("div");
    el.id = "install-hint";
    el.style.cssText =
      "position:fixed;left:12px;right:12px;bottom:12px;z-index:50;display:flex;gap:10px;align-items:center;" +
      "background:var(--panel,#151924);border:1px solid var(--accent,#f5a623);border-radius:14px;" +
      "padding:12px 14px;font-size:.9rem;box-shadow:0 6px 24px rgba(0,0,0,.45)";
    el.innerHTML =
      `<span style="flex:1">${text}</span>` +
      (actionLabel ? `<button id="install-go" style="background:var(--accent,#f5a623);color:#14100a;border:none;border-radius:10px;padding:10px 16px;font-weight:700;cursor:pointer;min-height:44px">${actionLabel}</button>` : "") +
      `<button id="install-x" aria-label="dismiss" style="background:none;border:none;color:var(--muted,#8b94ab);font-size:1.2rem;cursor:pointer;min-width:44px;min-height:44px">✕</button>`;
    document.body.appendChild(el);
    el.querySelector("#install-x").addEventListener("click", () => dismiss(el));
    if (action) el.querySelector("#install-go")?.addEventListener("click", () => { action(); dismiss(el); });
  }

  // Android/Chrome: real install prompt.
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    show("Put <b>Dance Mastery</b> on your home screen — it opens like a real app, works offline.", "Install", () => e.prompt());
  });

  // iOS Safari: no prompt API — tell the dancer the two taps.
  if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
    show("Install <b>Dance Mastery</b>: tap <b>Share</b> (the ▵ box) → <b>Add to Home Screen</b>. Full screen, works offline.", null, null);
  }
}
