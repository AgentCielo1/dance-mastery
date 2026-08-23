// Shared WebAudio rhythm engine — synthesis + lookahead scheduling over the
// pure scheduler in engine/rhythm.js. Used by the Rhythm Trainer page and
// Guided Session Mode. Five little drums, all oscillators and noise.

import { scheduleWindow } from "./engine/rhythm.js";

export function createRhythmPlayer() {
  let ctx = null, noise = null, ticker = null;
  let pattern = null, bpm = 100;
  let startTime = 0, scheduled = 0;
  let running = false;
  let onHit = null; // (hit, secondsFromNow) => void — for visuals

  function ensureCtx() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    const b = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    noise = b;
  }

  function play(type, at) {
    const g = ctx.createGain();
    g.connect(ctx.destination);
    if (type === "kick") {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.setValueAtTime(150, at);
      o.frequency.exponentialRampToValueAtTime(48, at + 0.11);
      g.gain.setValueAtTime(0.9, at);
      g.gain.exponentialRampToValueAtTime(0.001, at + 0.13);
      o.connect(g); o.start(at); o.stop(at + 0.14);
    } else if (type === "snare") {
      const src = ctx.createBufferSource();
      src.buffer = noise;
      const f = ctx.createBiquadFilter();
      f.type = "bandpass"; f.frequency.value = 1800; f.Q.value = 0.8;
      g.gain.setValueAtTime(0.5, at);
      g.gain.exponentialRampToValueAtTime(0.001, at + 0.11);
      src.connect(f); f.connect(g); src.start(at); src.stop(at + 0.12);
    } else if (type === "hat") {
      const src = ctx.createBufferSource();
      src.buffer = noise;
      const f = ctx.createBiquadFilter();
      f.type = "highpass"; f.frequency.value = 7000;
      g.gain.setValueAtTime(0.16, at);
      g.gain.exponentialRampToValueAtTime(0.001, at + 0.04);
      src.connect(f); f.connect(g); src.start(at); src.stop(at + 0.05);
    } else { // clave / accent — woodblock: two detuned sines, fast decay
      const loud = type === "accent" ? 0.85 : 0.5;
      for (const freq of type === "accent" ? [880, 1320] : [780, 1170]) {
        const o = ctx.createOscillator();
        o.type = "sine"; o.frequency.value = freq;
        const og = ctx.createGain();
        og.gain.setValueAtTime(loud / 2, at);
        og.gain.exponentialRampToValueAtTime(0.001, at + 0.08);
        o.connect(og); og.connect(ctx.destination);
        o.start(at); o.stop(at + 0.09);
      }
    }
  }

  function tick() {
    const now = ctx.currentTime - startTime;
    const until = now + 0.12;
    for (const h of scheduleWindow(pattern, bpm, Math.max(scheduled, now - 0.01), until)) {
      const at = startTime + h.time;
      play(h.type, at);
      onHit?.(h, at - ctx.currentTime);
    }
    scheduled = until;
  }

  function restartClock() {
    startTime = ctx.currentTime + 0.08;
    scheduled = 0;
  }

  return {
    get running() { return running; },
    set onHit(cb) { onHit = cb; },
    async start(p, b) {
      pattern = p; bpm = b;
      ensureCtx();
      await ctx.resume();
      restartClock();
      clearInterval(ticker);
      ticker = setInterval(tick, 25);
      running = true;
    },
    set(p, b) { // change pattern/bpm; restarts the cycle clock if running
      pattern = p; bpm = b;
      if (ctx && running) restartClock();
    },
    stop() {
      clearInterval(ticker);
      running = false;
    },
    // one-shot block-change chime (guided mode) — reuses the accent voice
    async chime() {
      ensureCtx();
      await ctx.resume();
      play("accent", ctx.currentTime + 0.02);
      play("accent", ctx.currentTime + 0.22);
    },
  };
}
