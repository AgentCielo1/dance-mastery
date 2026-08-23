// Procedural v1 move animations ($0 lane, Doc 08 §3.1) for the FK skeleton in
// viewer3d.js. Each: keyframed pose params + optional continuous spin/rootFn.

import { TAU, PI, sin, cos } from "./viewer3d.js";

export const MOVES = {
  "toprock.two_step": {
    bpm: 100, beats: 4,
    keys: [
      { t: 0.00, p: { y: 0.84, lHipF: 0.9, lKnee: 0.5, rHipF: -0.15, tYaw: 0.25, lShF: -0.7, lShA: 0.25, rShF: 0.9, rElb: 0.5, tPitch: 0.06 } },
      { t: 0.25, p: { y: 0.88, lHipF: 0.1, rHipF: 0.1, lShF: 0.25, rShF: 0.25, lShA: 0.5, rShA: 0.5 } },
      { t: 0.50, p: { y: 0.84, rHipF: 0.9, rKnee: 0.5, lHipF: -0.15, tYaw: -0.25, rShF: -0.7, rShA: 0.25, lShF: 0.9, lElb: 0.5, tPitch: 0.06 } },
      { t: 0.75, p: { y: 0.88, lHipF: 0.1, rHipF: 0.1, lShF: 0.25, rShF: 0.25, lShA: 0.5, rShA: 0.5 } },
    ],
    rootFn: (p, u) => { p.y += 0.015 * sin(u * TAU * 2); },
  },
  "toprock.indian_step": {
    bpm: 100, beats: 4,
    keys: [
      { t: 0.00, p: { y: 0.85, lHipF: 0.7, lHipA: 0.45, lKnee: 0.4, tRoll: 0.08, lShA: 0.9, rShA: 0.9, lShF: -0.3, rShF: -0.3 } },
      { t: 0.25, p: { y: 0.88, lHipF: 0.5, lHipA: -0.25, lKnee: 0.35, tYaw: 0.2, lShA: 0.15, rShA: 0.15, lElb: 0.6, rElb: 0.6 } },
      { t: 0.50, p: { y: 0.85, rHipF: 0.7, rHipA: 0.45, rKnee: 0.4, tRoll: -0.08, lShA: 0.9, rShA: 0.9, lShF: -0.3, rShF: -0.3 } },
      { t: 0.75, p: { y: 0.88, rHipF: 0.5, rHipA: -0.25, rKnee: 0.35, tYaw: -0.2, lShA: 0.15, rShA: 0.15, lElb: 0.6, rElb: 0.6 } },
    ],
  },
  "getdown.corkscrew": {
    bpm: 90, beats: 8, spin: TAU,
    keys: [
      { t: 0.00, p: { y: 0.86 } },
      { t: 0.35, p: { y: 0.45, tPitch: 0.5, lHipF: 1.5, rHipF: 1.5, lKnee: 1.9, rKnee: 1.9, lShF: 0.7, rShF: 0.7 } },
      { t: 0.55, p: { y: 0.3, tPitch: 0.7, lHipF: 1.9, rHipF: 1.9, lKnee: 2.3, rKnee: 2.3, lShF: 1.1, rShF: 1.1, lElb: 0.3, rElb: 0.3 } },
      { t: 0.8, p: { y: 0.6, tPitch: 0.25, lHipF: 0.9, rHipF: 0.9, lKnee: 1.1, rKnee: 1.1 } },
    ],
  },
  "footwork.six_step": {
    bpm: 96, beats: 6, spin: -TAU,
    keys: [
      { t: 0.00, p: { y: 0.36, tPitch: 0.85, lHipF: 1.3, lKnee: 2.3, rHipF: 0.45, rKnee: 0.1, rHipA: 0.4, lShF: -1.5, rShF: -1.3, lElb: 0.05, rElb: 0.05 } },
      { t: 0.17, p: { y: 0.34, tPitch: 0.9, lHipF: 1.35, lKnee: 2.3, rHipF: 1.0, rKnee: 1.2, rHipA: 0.55, lShF: -1.55, rShF: -1.2, lElb: 0.05, rElb: 0.05 } },
      { t: 0.33, p: { y: 0.36, tPitch: 0.85, rHipF: 1.3, rKnee: 2.3, lHipF: 0.45, lKnee: 0.1, lHipA: 0.5, lShF: -1.3, rShF: -1.5, lElb: 0.05, rElb: 0.05 } },
      { t: 0.5, p: { y: 0.34, tPitch: 0.8, rHipF: 1.35, rKnee: 2.25, lHipF: 0.9, lKnee: 0.9, lShF: -1.45, rShF: -1.45, lElb: 0.05, rElb: 0.05 } },
      { t: 0.67, p: { y: 0.36, tPitch: 0.85, lHipF: 1.25, lKnee: 2.2, rHipF: 0.5, rKnee: 0.2, rHipA: 0.3, lShF: -1.5, rShF: -1.35, lElb: 0.05, rElb: 0.05 } },
      { t: 0.83, p: { y: 0.34, tPitch: 0.9, lHipF: 1.3, lKnee: 2.2, rHipF: 1.15, rKnee: 1.1, lShF: -1.55, rShF: -1.25, lElb: 0.05, rElb: 0.05 } },
    ],
  },
  "footwork.cc": {
    bpm: 96, beats: 2,
    keys: [
      { t: 0.0, p: { y: 0.34, tPitch: 0.75, tYaw: 0.5, lHipF: 1.3, lKnee: 2.25, rHipF: 0.3, rKnee: 0.05, rHipA: 0.8, lShF: -1.4, lElb: 0.05, rShF: -0.4, rShA: 1.0, rElb: 0.3 } },
      { t: 0.5, p: { y: 0.34, tPitch: 0.75, tYaw: -0.5, rHipF: 1.3, rKnee: 2.25, lHipF: 0.3, lKnee: 0.05, lHipA: 0.8, rShF: -1.4, rElb: 0.05, lShF: -0.4, lShA: 1.0, lElb: 0.3 } },
    ],
  },
  "freeze.baby": {
    bpm: 60, beats: 4,
    keys: [
      { t: 0.0, p: { y: 0.34, pitch: 0.9, roll: 0.25, tPitch: 0.35, lHipF: 1.9, lKnee: 2.2, rHipF: 1.4, rKnee: 2.0, rHipA: 0.5, lShF: 1.5, lElb: 1.6, rShF: 1.6, rElb: 0.1 } },
      { t: 0.5, p: { y: 0.36, pitch: 0.92, roll: 0.28, tPitch: 0.35, lHipF: 1.85, lKnee: 2.15, rHipF: 1.5, rKnee: 2.05, rHipA: 0.55, lShF: 1.5, lElb: 1.6, rShF: 1.6, rElb: 0.1 } },
    ],
  },
  "freeze.chair": {
    bpm: 60, beats: 4,
    keys: [
      { t: 0.0, p: { y: 0.42, roll: 0.85, pitch: 0.25, tRoll: -0.3, lHipF: 1.2, lKnee: 1.5, rHipF: 0.6, rKnee: 0.9, rHipA: 0.6, rShF: 1.7, rElb: 1.7, lShF: -0.4, lShA: 0.7, lElb: 0.9 } },
      { t: 0.5, p: { y: 0.43, roll: 0.88, pitch: 0.27, tRoll: -0.3, lHipF: 1.25, lKnee: 1.55, rHipF: 0.62, rKnee: 0.9, rHipA: 0.62, rShF: 1.7, rElb: 1.7, lShF: -0.42, lShA: 0.72, lElb: 0.9 } },
    ],
  },
  "power.backspin": {
    bpm: 110, beats: 4, spin: 3 * TAU,
    keys: [
      { t: 0.0, p: { y: 0.24, pitch: -1.15, lHipF: 2.1, rHipF: 2.1, lKnee: 2.3, rKnee: 2.3, lShF: 1.3, rShF: 1.3, lElb: 1.9, rElb: 1.9, tPitch: 0.55 } },
      { t: 0.5, p: { y: 0.24, pitch: -1.15, lHipF: 2.0, rHipF: 2.2, lKnee: 2.2, rKnee: 2.35, lShF: 1.3, rShF: 1.3, lElb: 1.9, rElb: 1.9, tPitch: 0.55 } },
    ],
  },
  "power.windmill": {
    bpm: 112, beats: 4, spin: TAU,
    keys: [
      { t: 0.0, p: { y: 0.3, pitch: 1.35, lHipA: 1.1, rHipA: 1.1, lHipF: 0.35, rHipF: 0.35, lKnee: 0.05, rKnee: 0.05, lShF: 1.4, rShF: 1.4, lElb: 1.9, rElb: 1.9, tPitch: 0.35 } },
      { t: 0.5, p: { y: 0.26, pitch: 1.35, lHipA: 1.15, rHipA: 1.15, lHipF: 0.5, rHipF: 0.2, lKnee: 0.05, rKnee: 0.05, lShF: 1.5, rShF: 1.3, lElb: 1.9, rElb: 1.9, tPitch: 0.4 } },
    ],
    rootFn: (p, u, t) => { p.roll = sin(t * TAU) * 0.9; p.y += 0.05 * Math.abs(sin(t * TAU)); },
  },
  "power.swipes": {
    bpm: 104, beats: 4, spin: TAU,
    keys: [
      { t: 0.0, p: { y: 0.5, pitch: -0.7, tPitch: -0.3, lHipF: 0.9, rHipF: 0.9, lKnee: 1.2, rKnee: 1.2, lShF: -1.6, rShF: -1.6, lElb: -0.1, rElb: -0.1 } },
      { t: 0.45, p: { y: 0.34, pitch: -0.5, tPitch: -0.2, lHipF: 1.2, rHipF: 0.6, lKnee: 1.5, rKnee: 0.9, lShF: -1.7, rShF: -1.5 } },
      { t: 0.75, p: { y: 0.55, pitch: -0.8, tPitch: -0.35, lHipF: 0.7, rHipF: 1.1, lKnee: 1.0, rKnee: 1.4, lShF: -1.5, rShF: -1.7 } },
    ],
  },
  "power.headspin_taps": {
    bpm: 100, beats: 4, spin: 1.5 * TAU,
    keys: [
      { t: 0.0, p: { y: 1.02, pitch: PI, lHipA: 0.9, rHipA: 0.9, lHipF: 0.15, rHipF: 0.15, lKnee: 0.05, rKnee: 0.05, lShF: 0.6, rShF: 0.6, lShA: 1.15, rShA: 1.15, lElb: 0.9, rElb: 0.9 } },
      { t: 0.5, p: { y: 1.02, pitch: PI, lHipA: 1.05, rHipA: 0.75, lHipF: 0.25, rHipF: 0.1, lKnee: 0.05, rKnee: 0.05, lShF: 0.6, rShF: 0.6, lShA: 1.2, rShA: 1.1, lElb: 0.9, rElb: 0.9 } },
    ],
  },
  "power.flare": {
    bpm: 108, beats: 4, spin: TAU,
    keys: [
      { t: 0.0, p: { y: 0.6, tPitch: 1.15, lHipA: 1.2, rHipA: 1.2, lHipF: -0.3, rHipF: 0.5, lKnee: 0.05, rKnee: 0.05, lShF: 1.5, rShF: 1.5, lElb: 0.05, rElb: 0.05 } },
      { t: 0.5, p: { y: 0.66, tPitch: 1.05, lHipA: 1.25, rHipA: 1.25, lHipF: 0.5, rHipF: -0.3, lKnee: 0.05, rKnee: 0.05, lShF: 1.45, rShF: 1.55, lElb: 0.05, rElb: 0.05 } },
    ],
    rootFn: (p, u, t) => { p.x += 0.09 * cos(t * TAU); p.z += 0.09 * sin(t * TAU); },
  },

  /* ---------------- hip hop pack (procedural v1, $0 lane) ---------------- */
  "groove.bounce": {
    bpm: 96, beats: 2,
    keys: [
      { t: 0.0, p: { y: 0.83, lHipF: 0.28, rHipF: 0.28, lKnee: 0.5, rKnee: 0.5, tPitch: 0.07, lShF: 0.2, rShF: 0.2, lElb: 0.5, rElb: 0.5 } },
      { t: 0.5, p: { y: 0.88, lHipF: 0.08, rHipF: 0.08, lKnee: 0.14, rKnee: 0.14, tPitch: 0.02, lShF: 0.05, rShF: 0.05, lElb: 0.3, rElb: 0.3 } },
    ],
    rootFn: (p, u, t) => { p.tYaw = 0.08 * sin(t * TAU); },
  },
  "party.running_man": {
    bpm: 104, beats: 2,
    keys: [
      { t: 0.0, p: { y: 0.82, lHipF: 1.0, lKnee: 1.35, rHipF: -0.18, rKnee: 0.1, tPitch: 0.1, rShF: -0.9, rElb: 1.1, lShF: 0.7, lElb: 1.1 } },
      { t: 0.25, p: { y: 0.79, lHipF: 0.45, lKnee: 0.7, rHipF: -0.05, rKnee: 0.35, tPitch: 0.12, rShF: -0.1, lShF: -0.1, rElb: 1.1, lElb: 1.1 } },
      { t: 0.5, p: { y: 0.82, rHipF: 1.0, rKnee: 1.35, lHipF: -0.18, lKnee: 0.1, tPitch: 0.1, lShF: -0.9, lElb: 1.1, rShF: 0.7, rElb: 1.1 } },
      { t: 0.75, p: { y: 0.79, rHipF: 0.45, rKnee: 0.7, lHipF: -0.05, lKnee: 0.35, tPitch: 0.12, lShF: -0.1, rShF: -0.1, lElb: 1.1, rElb: 1.1 } },
    ],
  },
  "party.roger_rabbit": {
    bpm: 102, beats: 2,
    keys: [
      { t: 0.0, p: { y: 0.84, lHipF: -0.55, lKnee: 1.7, rHipF: 0.12, rKnee: 0.25, tPitch: -0.04, lShF: -0.5, rShF: 0.5, lElb: 0.9, rElb: 0.9 } },
      { t: 0.25, p: { y: 0.87, lHipF: 0.3, lKnee: 0.6, rHipF: 0.05, rKnee: 0.2, lShF: 0.2, rShF: -0.2, lElb: 0.8, rElb: 0.8 } },
      { t: 0.5, p: { y: 0.84, rHipF: -0.55, rKnee: 1.7, lHipF: 0.12, lKnee: 0.25, tPitch: -0.04, rShF: -0.5, lShF: 0.5, lElb: 0.9, rElb: 0.9 } },
      { t: 0.75, p: { y: 0.87, rHipF: 0.3, rKnee: 0.6, lHipF: 0.05, lKnee: 0.2, rShF: 0.2, lShF: -0.2, lElb: 0.8, rElb: 0.8 } },
    ],
  },
  "party.cabbage_patch": {
    bpm: 100, beats: 4,
    keys: [
      { t: 0.0, p: { y: 0.85, lShF: -0.9, rShF: -0.9, lShA: 0.15, rShA: 0.15, lElb: 1.1, rElb: 1.1, tYaw: 0.3, lKnee: 0.3, rKnee: 0.3 } },
      { t: 0.25, p: { y: 0.83, lShF: -0.5, rShF: -0.5, lShA: 0.7, rShA: 0.05, lElb: 1.2, rElb: 1.2, tYaw: 0.0, lKnee: 0.4, rKnee: 0.4 } },
      { t: 0.5, p: { y: 0.85, lShF: -0.1, rShF: -0.1, lShA: 0.15, rShA: 0.15, lElb: 1.3, rElb: 1.3, tYaw: -0.3, lKnee: 0.3, rKnee: 0.3 } },
      { t: 0.75, p: { y: 0.83, lShF: -0.5, rShF: -0.5, lShA: 0.05, rShA: 0.7, lElb: 1.2, rElb: 1.2, tYaw: 0.0, lKnee: 0.4, rKnee: 0.4 } },
    ],
    rootFn: (p, u, t) => { p.x = 0.05 * cos(t * TAU); },
  },
  "party.prep": {
    bpm: 100, beats: 4,
    keys: [
      { t: 0.0, p: { y: 0.85, tRoll: 0.12, tPitch: -0.03, rShF: -0.6, rShA: 0.5, rElb: 1.3, lShF: 0.15, lShA: 0.3, lElb: 0.6, lHipA: 0.35, lKnee: 0.3, rKnee: 0.25 } },
      { t: 0.25, p: { y: 0.87, tRoll: 0.0, rShF: 0.1, rShA: 0.2, rElb: 0.8, lShF: 0.1, lKnee: 0.15, rKnee: 0.15 } },
      { t: 0.5, p: { y: 0.85, tRoll: -0.12, tPitch: -0.03, rShF: 0.5, rShA: 0.15, rElb: 1.3, lShF: -0.6, lShA: 0.5, lElb: 1.3, rHipA: 0.35, lKnee: 0.25, rKnee: 0.3 } },
      { t: 0.75, p: { y: 0.87, tRoll: 0.0, lShF: 0.1, lShA: 0.2, lElb: 0.8, rShF: 0.1, lKnee: 0.15, rKnee: 0.15 } },
    ],
  },
  "party.dougie": {
    bpm: 92, beats: 4,
    keys: [
      { t: 0.0, p: { y: 0.85, roll: 0.1, tYaw: 0.35, tRoll: 0.08, lShF: -1.5, lShA: 0.4, lElb: 2.1, rShF: 0.15, rElb: 0.7, lKnee: 0.35, rKnee: 0.2 } },
      { t: 0.25, p: { y: 0.87, roll: 0.0, tYaw: 0.0, lShF: -0.6, lElb: 1.4, rShF: 0.1, lKnee: 0.2, rKnee: 0.2 } },
      { t: 0.5, p: { y: 0.85, roll: -0.1, tYaw: -0.35, tRoll: -0.08, rShF: -1.5, rShA: 0.4, rElb: 2.1, lShF: 0.15, lElb: 0.7, rKnee: 0.35, lKnee: 0.2 } },
      { t: 0.75, p: { y: 0.87, roll: 0.0, tYaw: 0.0, rShF: -0.6, rElb: 1.4, lShF: 0.1, lKnee: 0.2, rKnee: 0.2 } },
    ],
    rootFn: (p, u, t) => { p.x = 0.06 * sin(t * TAU); },
  },

  /* ---------------- salsa pack (procedural v1, $0 lane) ---------------- */
  "basic.on1": {
    bpm: 184, beats: 8,
    keys: [
      { t: 0.0, p: { z: 0.13, lHipF: 0.42, lKnee: 0.28, rHipF: -0.08, tPitch: 0.03, lShF: 0.35, rShF: -0.35, lElb: 0.8, rElb: 0.8 } },
      { t: 0.125, p: { z: 0.03, lHipF: 0.22, rHipF: 0.05, lShF: 0.15, rShF: -0.15, lElb: 0.75, rElb: 0.75 } },
      { t: 0.25, p: { z: 0.0, lHipF: 0.06, rHipF: 0.06, lKnee: 0.16, rKnee: 0.16, lShF: 0.05, rShF: 0.05, lElb: 0.7, rElb: 0.7 } },
      { t: 0.375, p: { z: 0.0, y: 0.855, lKnee: 0.2, rKnee: 0.2, lElb: 0.7, rElb: 0.7 } },
      { t: 0.5, p: { z: -0.13, rHipF: -0.4, rKnee: 0.26, lHipF: 0.1, tPitch: -0.02, rShF: 0.35, lShF: -0.35, lElb: 0.8, rElb: 0.8 } },
      { t: 0.625, p: { z: -0.03, rHipF: -0.18, lHipF: 0.06, rShF: 0.15, lShF: -0.15, lElb: 0.75, rElb: 0.75 } },
      { t: 0.75, p: { z: 0.0, lHipF: 0.06, rHipF: 0.06, lKnee: 0.16, rKnee: 0.16, lShF: 0.05, rShF: 0.05, lElb: 0.7, rElb: 0.7 } },
      { t: 0.875, p: { z: 0.0, y: 0.855, lKnee: 0.2, rKnee: 0.2, lElb: 0.7, rElb: 0.7 } },
    ],
    rootFn: (p, u, t) => { p.roll = 0.05 * sin(u * TAU * 2); },
  },
  "basic.side": {
    bpm: 184, beats: 8,
    keys: [
      { t: 0.0, p: { x: -0.13, lHipA: 0.4, lKnee: 0.25, roll: -0.06, lShA: 0.35, rShA: 0.1, lElb: 0.8, rElb: 0.8 } },
      { t: 0.125, p: { x: -0.04, lHipA: 0.15, roll: -0.02 } },
      { t: 0.25, p: { x: 0.0, lHipA: 0.06, rHipA: 0.06, lKnee: 0.16, rKnee: 0.16 } },
      { t: 0.375, p: { x: 0.0, y: 0.855 } },
      { t: 0.5, p: { x: 0.13, rHipA: 0.4, rKnee: 0.25, roll: 0.06, rShA: 0.35, lShA: 0.1, lElb: 0.8, rElb: 0.8 } },
      { t: 0.625, p: { x: 0.04, rHipA: 0.15, roll: 0.02 } },
      { t: 0.75, p: { x: 0.0, lHipA: 0.06, rHipA: 0.06, lKnee: 0.16, rKnee: 0.16 } },
      { t: 0.875, p: { x: 0.0, y: 0.855 } },
    ],
  },
  "style.cuban_motion": {
    bpm: 120, beats: 2,
    keys: [
      { t: 0.0, p: { y: 0.855, lKnee: 0.38, rKnee: 0.08, roll: -0.09, x: -0.035, lShF: 0.1, rShF: 0.1, lElb: 0.6, rElb: 0.6 } },
      { t: 0.5, p: { y: 0.855, rKnee: 0.38, lKnee: 0.08, roll: 0.09, x: 0.035, lShF: 0.1, rShF: 0.1, lElb: 0.6, rElb: 0.6 } },
    ],
    rootFn: (p, u) => { p.tRoll = -p.roll * 0.5; },
  },
  "shine.suzy_q": {
    bpm: 180, beats: 4,
    keys: [
      { t: 0.0, p: { yaw: 0.4, lHipA: -0.35, rHipA: 0.2, lKnee: 0.3, rKnee: 0.3, lShF: 0.45, rShF: -0.45, lElb: 0.9, rElb: 0.9, tYaw: -0.15 } },
      { t: 0.25, p: { yaw: 0.0, lHipA: 0.05, rHipA: 0.05, lKnee: 0.22, rKnee: 0.22, lShF: 0.0, rShF: 0.0 } },
      { t: 0.5, p: { yaw: -0.4, rHipA: -0.35, lHipA: 0.2, lKnee: 0.3, rKnee: 0.3, rShF: 0.45, lShF: -0.45, lElb: 0.9, rElb: 0.9, tYaw: 0.15 } },
      { t: 0.75, p: { yaw: 0.0, lHipA: 0.05, rHipA: 0.05, lKnee: 0.22, rKnee: 0.22, lShF: 0.0, rShF: 0.0 } },
    ],
    rootFn: (p, u, t) => { p.x = 0.12 * sin(t * TAU * 0.5); },
  },
  "turn.right": {
    bpm: 180, beats: 8, spin: TAU,
    keys: [
      { t: 0.0, p: { y: 0.86, lHipF: 0.3, lKnee: 0.25, lShF: -0.35, rShF: -0.35, lShA: 0.15, rShA: 0.15, lElb: 1.5, rElb: 1.5, tPitch: 0.0 } },
      { t: 0.25, p: { y: 0.875, lHipF: 0.1, rHipF: 0.1, lKnee: 0.12, rKnee: 0.12, lElb: 1.6, rElb: 1.6 } },
      { t: 0.5, p: { y: 0.86, rHipF: 0.25, rKnee: 0.22, lElb: 1.5, rElb: 1.5 } },
      { t: 0.75, p: { y: 0.875, lKnee: 0.12, rKnee: 0.12, lElb: 1.4, rElb: 1.4 } },
    ],
  },

  /* ---------------- ballet pack (procedural v1, $0 lane) ---------------- */
  "barre.plie": {
    bpm: 60, beats: 4,
    keys: [
      { t: 0.0, p: { y: 0.88, lHipA: 0.3, rHipA: 0.3, lKnee: 0.04, rKnee: 0.04, lShA: 0.95, rShA: 0.95, lShF: -0.1, rShF: -0.1, lElb: 0.3, rElb: 0.3, tPitch: -0.02 } },
      { t: 0.5, p: { y: 0.8, lHipA: 0.38, rHipA: 0.38, lHipF: 0.28, rHipF: 0.28, lKnee: 0.62, rKnee: 0.62, lShA: 0.95, rShA: 0.95, lShF: -0.1, rShF: -0.1, lElb: 0.3, rElb: 0.3, tPitch: -0.02 } },
    ],
  },
  "barre.tendu": {
    bpm: 80, beats: 4,
    keys: [
      { t: 0.0, p: { y: 0.875, lHipA: 0.28, rHipA: 0.28, lKnee: 0.04, rKnee: 0.04, lShA: 0.95, rShA: 0.95, lElb: 0.3, rElb: 0.3 } },
      { t: 0.25, p: { y: 0.87, x: -0.03, rHipF: 0.38, rHipA: 0.3, rKnee: 0.14, lKnee: 0.03, lShA: 0.95, rShA: 0.95, lElb: 0.3, rElb: 0.3 } },
      { t: 0.5, p: { y: 0.87, x: -0.03, rHipF: 0.38, rHipA: 0.3, rKnee: 0.14, lKnee: 0.03, lShA: 0.95, rShA: 0.95, lElb: 0.3, rElb: 0.3 } },
      { t: 0.75, p: { y: 0.875, lHipA: 0.28, rHipA: 0.28, lKnee: 0.04, rKnee: 0.04, lShA: 0.95, rShA: 0.95, lElb: 0.3, rElb: 0.3 } },
    ],
  },
  "barre.releve": {
    bpm: 60, beats: 4,
    keys: [
      { t: 0.0, p: { y: 0.88, lHipA: 0.26, rHipA: 0.26, lKnee: 0.04, rKnee: 0.04, lShA: 0.9, rShA: 0.9, lElb: 0.3, rElb: 0.3, tPitch: -0.02 } },
      { t: 0.5, p: { y: 0.9, lHipA: 0.26, rHipA: 0.26, lHipF: -0.06, rHipF: -0.06, lKnee: 0.3, rKnee: 0.3, lShA: 0.9, rShA: 0.9, lElb: 0.3, rElb: 0.3, tPitch: -0.03 } },
    ],
  },
  "align.port_de_bras": {
    bpm: 60, beats: 8,
    keys: [
      { t: 0.0, p: { lShF: 0.12, rShF: 0.12, lShA: 0.22, rShA: 0.22, lElb: 0.55, rElb: 0.55, lKnee: 0.05, rKnee: 0.05, lHipA: 0.24, rHipA: 0.24 } },
      { t: 0.22, p: { lShF: -0.6, rShF: -0.6, lShA: 0.18, rShA: 0.18, lElb: 1.05, rElb: 1.05, lHipA: 0.24, rHipA: 0.24 } },
      { t: 0.45, p: { lShF: -2.5, rShF: -2.5, lShA: 0.3, rShA: 0.3, lElb: 0.6, rElb: 0.6, lHipA: 0.24, rHipA: 0.24, tPitch: -0.03 } },
      { t: 0.7, p: { lShF: -0.15, rShF: -0.15, lShA: 1.15, rShA: 1.15, lElb: 0.28, rElb: 0.28, lHipA: 0.24, rHipA: 0.24 } },
    ],
    rootFn: (p, u) => { p.y = 0.875 + 0.004 * sin(u * TAU); },
  },
  "centre.retire": {
    bpm: 60, beats: 4,
    keys: [
      { t: 0.0, p: { y: 0.87, lKnee: 0.03, rHipF: 0.62, rHipA: 0.55, rKnee: 2.15, lHipA: 0.22, lShF: -0.5, rShF: -0.5, lShA: 0.2, rShA: 0.2, lElb: 1.0, rElb: 1.0, tPitch: -0.02 } },
      { t: 0.5, p: { y: 0.872, lKnee: 0.03, rHipF: 0.6, rHipA: 0.57, rKnee: 2.12, lHipA: 0.22, lShF: -0.52, rShF: -0.52, lShA: 0.2, rShA: 0.2, lElb: 1.0, rElb: 1.0, tPitch: -0.02 } },
    ],
  },
  "allegro.saute": {
    bpm: 100, beats: 2,
    keys: [
      { t: 0.0, p: { y: 0.8, lHipA: 0.3, rHipA: 0.3, lHipF: 0.3, rHipF: 0.3, lKnee: 0.6, rKnee: 0.6, lShA: 0.6, rShA: 0.6, lElb: 0.4, rElb: 0.4 } },
      { t: 0.3, p: { y: 0.92, lHipA: 0.28, rHipA: 0.28, lHipF: 0.02, rHipF: 0.02, lKnee: 0.4, rKnee: 0.4, lShA: 0.7, rShA: 0.7, lElb: 0.35, rElb: 0.35 } },
      { t: 0.5, p: { y: 0.96, lHipA: 0.28, rHipA: 0.28, lHipF: 0.04, rHipF: 0.04, lKnee: 0.45, rKnee: 0.45, lShA: 0.75, rShA: 0.75, lElb: 0.3, rElb: 0.3 } },
      { t: 0.7, p: { y: 0.88, lHipA: 0.28, rHipA: 0.28, lHipF: 0.15, rHipF: 0.15, lKnee: 0.35, rKnee: 0.35, lShA: 0.65, rShA: 0.65 } },
    ],
  },

  /* ---------------- tango pack (procedural v1, $0 lane) ---------------- */
  "walk.caminada": {
    bpm: 62, beats: 4,
    keys: [
      { t: 0.0, p: { y: 0.865, rHipF: 0.52, rKnee: 0.04, lHipF: -0.1, lKnee: 0.08, tPitch: -0.05, lShF: -0.35, rShF: -0.35, lShA: 0.22, rShA: 0.22, lElb: 0.95, rElb: 0.95 } },
      { t: 0.25, p: { y: 0.87, rHipF: 0.06, lHipF: 0.06, rKnee: 0.1, lKnee: 0.1, tPitch: -0.05, lShF: -0.35, rShF: -0.35, lShA: 0.22, rShA: 0.22, lElb: 0.95, rElb: 0.95 } },
      { t: 0.5, p: { y: 0.865, lHipF: 0.52, lKnee: 0.04, rHipF: -0.1, rKnee: 0.08, tPitch: -0.05, lShF: -0.35, rShF: -0.35, lShA: 0.22, rShA: 0.22, lElb: 0.95, rElb: 0.95 } },
      { t: 0.75, p: { y: 0.87, rHipF: 0.06, lHipF: 0.06, rKnee: 0.1, lKnee: 0.1, tPitch: -0.05, lShF: -0.35, rShF: -0.35, lShA: 0.22, rShA: 0.22, lElb: 0.95, rElb: 0.95 } },
    ],
    rootFn: (p, u, t) => { p.z = 0.07 * sin(t * TAU * 0.5); },
  },
  "pivot.disassociation": {
    bpm: 60, beats: 4,
    keys: [
      { t: 0.0, p: { yaw: 0.55, tYaw: -0.55, lKnee: 0.2, rKnee: 0.2, lShA: 0.55, rShA: 0.55, lElb: 0.5, rElb: 0.5, tPitch: -0.04 } },
      { t: 0.25, p: { yaw: 0.0, tYaw: 0.0, lKnee: 0.15, rKnee: 0.15, lShA: 0.55, rShA: 0.55, lElb: 0.5, rElb: 0.5 } },
      { t: 0.5, p: { yaw: -0.55, tYaw: 0.55, lKnee: 0.2, rKnee: 0.2, lShA: 0.55, rShA: 0.55, lElb: 0.5, rElb: 0.5, tPitch: -0.04 } },
      { t: 0.75, p: { yaw: 0.0, tYaw: 0.0, lKnee: 0.15, rKnee: 0.15, lShA: 0.55, rShA: 0.55, lElb: 0.5, rElb: 0.5 } },
    ],
  },
  "pivot.ocho_forward": {
    bpm: 63, beats: 4,
    keys: [
      { t: 0.0, p: { yaw: -0.55, tYaw: 0.42, lHipF: 0.42, lHipA: -0.32, lKnee: 0.06, rKnee: 0.12, tPitch: -0.05, lShF: -0.35, rShF: -0.35, lShA: 0.22, rShA: 0.22, lElb: 0.95, rElb: 0.95 } },
      { t: 0.25, p: { yaw: 0.0, tYaw: 0.0, lHipF: 0.05, rHipF: 0.05, lKnee: 0.12, rKnee: 0.12, lShF: -0.35, rShF: -0.35, lShA: 0.22, rShA: 0.22, lElb: 0.95, rElb: 0.95 } },
      { t: 0.5, p: { yaw: 0.55, tYaw: -0.42, rHipF: 0.42, rHipA: -0.32, rKnee: 0.06, lKnee: 0.12, tPitch: -0.05, lShF: -0.35, rShF: -0.35, lShA: 0.22, rShA: 0.22, lElb: 0.95, rElb: 0.95 } },
      { t: 0.75, p: { yaw: 0.0, tYaw: 0.0, lHipF: 0.05, rHipF: 0.05, lKnee: 0.12, rKnee: 0.12, lShF: -0.35, rShF: -0.35, lShA: 0.22, rShA: 0.22, lElb: 0.95, rElb: 0.95 } },
    ],
    rootFn: (p, u, t) => { p.x = 0.08 * sin(t * TAU); },
  },
  "adorno.lapiz": {
    bpm: 60, beats: 4,
    keys: [
      { t: 0.0, p: { rHipF: 0.3, rHipA: 0.02, rKnee: 0.16, lKnee: 0.05, tPitch: -0.05, lShF: -0.35, rShF: -0.35, lShA: 0.22, rShA: 0.22, lElb: 0.95, rElb: 0.95 } },
      { t: 0.25, p: { rHipF: 0.16, rHipA: 0.34, rKnee: 0.14, lKnee: 0.05, lShF: -0.35, rShF: -0.35, lShA: 0.22, rShA: 0.22, lElb: 0.95, rElb: 0.95 } },
      { t: 0.5, p: { rHipF: -0.04, rHipA: 0.02, rKnee: 0.18, lKnee: 0.05, lShF: -0.35, rShF: -0.35, lShA: 0.22, rShA: 0.22, lElb: 0.95, rElb: 0.95 } },
      { t: 0.75, p: { rHipF: 0.16, rHipA: -0.18, rKnee: 0.14, lKnee: 0.05, lShF: -0.35, rShF: -0.35, lShA: 0.22, rShA: 0.22, lElb: 0.95, rElb: 0.95 } },
    ],
  },
  "partner.frame_prep": {
    bpm: 62, beats: 4,
    keys: [
      { t: 0.0, p: { y: 0.865, rHipF: 0.5, rKnee: 0.05, lHipF: -0.08, tPitch: -0.06, lShA: 1.05, lShF: -0.4, lElb: 0.85, rShF: -0.75, rShA: 0.35, rElb: 1.55 } },
      { t: 0.25, p: { y: 0.87, rHipF: 0.06, lHipF: 0.06, rKnee: 0.1, lKnee: 0.1, tPitch: -0.06, lShA: 1.05, lShF: -0.4, lElb: 0.85, rShF: -0.75, rShA: 0.35, rElb: 1.55 } },
      { t: 0.5, p: { y: 0.865, lHipF: 0.5, lKnee: 0.05, rHipF: -0.08, tPitch: -0.06, lShA: 1.05, lShF: -0.4, lElb: 0.85, rShF: -0.75, rShA: 0.35, rElb: 1.55 } },
      { t: 0.75, p: { y: 0.87, rHipF: 0.06, lHipF: 0.06, rKnee: 0.1, lKnee: 0.1, tPitch: -0.06, lShA: 1.05, lShF: -0.4, lElb: 0.85, rShF: -0.75, rShA: 0.35, rElb: 1.55 } },
    ],
    rootFn: (p, u, t) => { p.z = 0.06 * sin(t * TAU * 0.5); },
  },

  /* ---------------- afrobeats pack (procedural v1, $0 lane) ---------------- */
  "groove.afro_bounce": {
    bpm: 104, beats: 2,
    keys: [
      { t: 0.0, p: { y: 0.845, x: -0.06, lKnee: 0.42, rKnee: 0.18, roll: -0.05, tYaw: 0.12, lShF: 0.3, rShF: -0.2, lElb: 0.9, rElb: 0.9, tPitch: 0.06 } },
      { t: 0.5, p: { y: 0.845, x: 0.06, rKnee: 0.42, lKnee: 0.18, roll: 0.05, tYaw: -0.12, rShF: 0.3, lShF: -0.2, lElb: 0.9, rElb: 0.9, tPitch: 0.06 } },
    ],
    rootFn: (p, u) => { p.y += 0.012 * sin(u * TAU * 2); },
  },
  "named.azonto": {
    bpm: 105, beats: 2,
    keys: [
      { t: 0.0, p: { y: 0.84, lHipF: 0.75, lKnee: 1.0, rKnee: 0.2, rShF: -1.05, rShA: 0.25, rElb: 1.35, lShF: 0.35, lElb: 1.0, tPitch: 0.08, tYaw: 0.15 } },
      { t: 0.25, p: { y: 0.86, lHipF: 0.1, lKnee: 0.25, rKnee: 0.2, rShF: -0.95, rShA: 0.45, rElb: 1.2, lShF: 0.0, lElb: 0.9 } },
      { t: 0.5, p: { y: 0.84, rHipF: 0.75, rKnee: 1.0, lKnee: 0.2, rShF: -1.15, rShA: 0.15, rElb: 1.45, lShF: 0.35, lElb: 1.0, tPitch: 0.08, tYaw: -0.15 } },
      { t: 0.75, p: { y: 0.86, rHipF: 0.1, rKnee: 0.25, lKnee: 0.2, rShF: -0.95, rShA: 0.45, rElb: 1.2, lShF: 0.0, lElb: 0.9 } },
    ],
  },
  "named.shaku": {
    bpm: 106, beats: 2,
    keys: [
      { t: 0.0, p: { y: 0.84, lHipA: 0.45, lKnee: 0.35, rKnee: 0.3, roll: -0.12, tPitch: 0.14, lShF: -0.65, rShF: -0.75, lShA: 0.06, rShA: 0.06, lElb: 1.45, rElb: 1.55 } },
      { t: 0.25, p: { y: 0.85, lHipA: 0.1, rHipA: 0.1, lKnee: 0.3, rKnee: 0.3, roll: 0.0, lShF: -0.75, rShF: -0.6, lElb: 1.55, rElb: 1.4 } },
      { t: 0.5, p: { y: 0.84, rHipA: 0.45, rKnee: 0.35, lKnee: 0.3, roll: 0.12, tPitch: 0.14, lShF: -0.75, rShF: -0.65, lShA: 0.06, rShA: 0.06, lElb: 1.55, rElb: 1.45 } },
      { t: 0.75, p: { y: 0.85, lHipA: 0.1, rHipA: 0.1, lKnee: 0.3, rKnee: 0.3, roll: 0.0, lShF: -0.6, rShF: -0.75, lElb: 1.4, rElb: 1.55 } },
    ],
  },
  "named.zanku": {
    bpm: 104, beats: 2,
    keys: [
      { t: 0.0, p: { y: 0.8, lHipF: 0.32, lKnee: 0.6, rHipF: -0.5, rKnee: 1.45, tPitch: 0.16, rShF: -0.9, rElb: 1.1, lShF: 0.4, lElb: 0.8 } },
      { t: 0.25, p: { y: 0.82, lKnee: 0.45, rHipF: -0.1, rKnee: 0.6, rShF: 0.15, rElb: 0.9, lShF: 0.1 } },
      { t: 0.5, p: { y: 0.8, rHipF: 0.32, rKnee: 0.6, lHipF: -0.5, lKnee: 1.45, tPitch: 0.16, lShF: -0.9, lElb: 1.1, rShF: 0.4, rElb: 0.8 } },
      { t: 0.75, p: { y: 0.82, rKnee: 0.45, lHipF: -0.1, lKnee: 0.6, lShF: 0.15, lElb: 0.9, rShF: 0.1 } },
    ],
  },
  "named.kupe": {
    bpm: 100, beats: 4,
    keys: [
      { t: 0.0, p: { y: 0.855, x: -0.04, lKnee: 0.28, rKnee: 0.15, lShF: -0.8, lElb: 1.65, rShF: -0.65, rElb: 1.05, tYaw: 0.1, roll: -0.04 } },
      { t: 0.25, p: { y: 0.86, x: 0.0, lShF: -0.65, lElb: 1.05, rShF: -0.8, rElb: 1.65 } },
      { t: 0.5, p: { y: 0.855, x: 0.04, rKnee: 0.28, lKnee: 0.15, lShF: -0.8, lElb: 1.65, rShF: -0.65, rElb: 1.05, tYaw: -0.1, roll: 0.04 } },
      { t: 0.75, p: { y: 0.86, x: 0.0, lShF: -0.65, lElb: 1.05, rShF: -0.8, rElb: 1.65 } },
    ],
  },

  /* ------------- west african foundation (procedural v1, $0 lane) ------------- */
  "move.grounded_posture": {
    bpm: 90, beats: 4,
    keys: [
      { t: 0.0, p: { y: 0.78, tPitch: 0.34, lHipF: 0.5, rHipF: 0.5, lKnee: 0.8, rKnee: 0.8, lShA: 0.85, rShA: 0.85, lShF: -0.25, rShF: -0.25, lElb: 0.35, rElb: 0.35 } },
      { t: 0.5, p: { y: 0.76, tPitch: 0.38, lHipF: 0.55, rHipF: 0.55, lKnee: 0.9, rKnee: 0.9, lShA: 0.6, rShA: 0.6, lShF: 0.15, rShF: 0.15, lElb: 0.45, rElb: 0.45 } },
    ],
    rootFn: (p, u, t) => { p.tYaw = 0.1 * sin(t * TAU * 0.5); },
  },
  "move.echauffement": {
    bpm: 120, beats: 2,
    keys: [
      { t: 0.0, p: { y: 0.82, tPitch: 0.22, lHipF: 0.8, lKnee: 1.2, rHipF: -0.15, rKnee: 0.35, rShF: -0.8, rElb: 1.3, lShF: 0.6, lElb: 1.3 } },
      { t: 0.25, p: { y: 0.8, tPitch: 0.24, lHipF: 0.2, lKnee: 0.6, rHipF: 0.1, rKnee: 0.5 } },
      { t: 0.5, p: { y: 0.82, tPitch: 0.22, rHipF: 0.8, rKnee: 1.2, lHipF: -0.15, lKnee: 0.35, lShF: -0.8, lElb: 1.3, rShF: 0.6, rElb: 1.3 } },
      { t: 0.75, p: { y: 0.8, tPitch: 0.24, rHipF: 0.2, rKnee: 0.6, lHipF: 0.1, lKnee: 0.5 } },
    ],
  },

  /* ------------- popping (procedural v1, $0 lane) ------------- */
  "pop.fresno": {
    bpm: 104, beats: 4,
    keys: [
      // hit lands as the weight arrives left — plateau sells the contraction
      { t: 0.0, p: { y: 0.86, roll: -0.05, lKnee: 0.12, rKnee: 0.32, rHipA: 0.28, lShA: 1.35, lElb: 0.05, rShA: 0.35, rElb: 1.15, tRoll: -0.05 } },
      { t: 0.18, p: { y: 0.865, roll: -0.05, lShA: 1.3, lElb: 0.15, rElb: 1.05 } },
      { t: 0.32, p: { y: 0.87, roll: 0.0, lShA: 0.7, rShA: 0.7, lElb: 0.7, rElb: 0.7, lKnee: 0.22, rKnee: 0.22 } },
      { t: 0.5, p: { y: 0.86, roll: 0.05, rKnee: 0.12, lKnee: 0.32, lHipA: 0.28, rShA: 1.35, rElb: 0.05, lShA: 0.35, lElb: 1.15, tRoll: 0.05 } },
      { t: 0.68, p: { y: 0.865, roll: 0.05, rShA: 1.3, rElb: 0.15, lElb: 1.05 } },
      { t: 0.82, p: { y: 0.87, roll: 0.0, lShA: 0.7, rShA: 0.7, lElb: 0.7, rElb: 0.7, lKnee: 0.22, rKnee: 0.22 } },
    ],
  },
  "wave.arm": {
    bpm: 88, beats: 4,
    keys: [
      // a point of energy travels L fingertips → chest → R fingertips and back
      { t: 0.0, p: { y: 0.87, lShA: 1.45, rShA: 1.45, lElb: 1.15, rElb: 0.05, tRoll: 0.0 } },
      { t: 0.25, p: { y: 0.87, lShA: 1.35, rShA: 1.45, lElb: 0.05, rElb: 0.05, tRoll: 0.12 } },
      { t: 0.5, p: { y: 0.87, lShA: 1.45, rShA: 1.45, lElb: 0.05, rElb: 1.15, tRoll: 0.0 } },
      { t: 0.75, p: { y: 0.87, lShA: 1.45, rShA: 1.35, lElb: 0.05, rElb: 0.05, tRoll: -0.12 } },
    ],
    rootFn: (p, u) => { p.tPitch = 0.03 * sin(u * TAU * 2); },
  },
  "robot.dimestop": {
    bpm: 100, beats: 4,
    keys: [
      // move smooth, stop DEAD — long plateaus are the dime stops
      { t: 0.0, p: { y: 0.87, rShF: 0.95, rElb: 1.3, lShF: 0.1, lElb: 0.35, tYaw: 0.3 } },
      { t: 0.2, p: { y: 0.87, rShF: 0.95, rElb: 1.3, lShF: 0.1, lElb: 0.35, tYaw: 0.3 } },
      { t: 0.28, p: { y: 0.87, rShF: 0.1, rElb: 0.35, lShF: 0.95, lElb: 1.3, tYaw: -0.3 } },
      { t: 0.48, p: { y: 0.87, rShF: 0.1, rElb: 0.35, lShF: 0.95, lElb: 1.3, tYaw: -0.3 } },
      { t: 0.56, p: { y: 0.85, rShF: 0.6, rElb: 1.6, lShF: 0.6, lElb: 1.6, tYaw: 0.0, tPitch: 0.12 } },
      { t: 0.78, p: { y: 0.85, rShF: 0.6, rElb: 1.6, lShF: 0.6, lElb: 1.6, tYaw: 0.0, tPitch: 0.12 } },
      { t: 0.86, p: { y: 0.87, rShF: 0.95, rElb: 1.3, lShF: 0.1, lElb: 0.35, tYaw: 0.3, tPitch: 0.0 } },
    ],
  },
  "boog.roll": {
    bpm: 96, beats: 4,
    keys: [
      { t: 0.0, p: { y: 0.845, lKnee: 0.4, rKnee: 0.4, lHipF: 0.15, rHipF: 0.15, lShF: 0.3, rShF: 0.3, lShA: 0.4, rShA: 0.4, lElb: 0.7, rElb: 0.7 } },
      { t: 0.5, p: { y: 0.835, lKnee: 0.5, rKnee: 0.5, lHipF: 0.2, rHipF: 0.2, lElb: 0.85, rElb: 0.85 } },
    ],
    // hips and chest draw circles, not corners
    rootFn: (p, u, t) => { p.tRoll = 0.16 * sin(t * TAU); p.tPitch = 0.1 + 0.09 * cos(t * TAU); p.tYaw = 0.08 * sin(t * TAU); },
  },

  /* ------------- locking (procedural v1, $0 lane) ------------- */
  "lock.lock": {
    bpm: 100, beats: 4,
    keys: [
      // fast loose groove…
      { t: 0.0, p: { y: 0.875, lShF: 0.7, rShF: -0.7, lElb: 0.4, rElb: 0.4, tYaw: 0.12 } },
      { t: 0.14, p: { y: 0.885, lShF: -0.7, rShF: 0.7, tYaw: -0.12 } },
      // …SLAMMED into the lock: crouch, forearms up, dead still for two beats
      { t: 0.28, p: { y: 0.8, lHipF: 0.45, rHipF: 0.45, lKnee: 0.55, rKnee: 0.55, lShF: 0.35, rShF: 0.35, lElb: 1.95, rElb: 1.95, tPitch: 0.1, tYaw: 0.0 } },
      { t: 0.72, p: { y: 0.8, lHipF: 0.45, rHipF: 0.45, lKnee: 0.55, rKnee: 0.55, lShF: 0.35, rShF: 0.35, lElb: 1.95, rElb: 1.95, tPitch: 0.1 } },
      { t: 0.86, p: { y: 0.88, lHipF: 0.05, rHipF: 0.05, lKnee: 0.1, rKnee: 0.1, lShF: 0.5, rShF: -0.5, lElb: 0.4, rElb: 0.4, tPitch: 0.0 } },
    ],
  },
  "point.point": {
    bpm: 100, beats: 4,
    keys: [
      { t: 0.0, p: { y: 0.87, lElb: 0.6, rElb: 0.6, lShF: 0.2, rShF: 0.2 } },
      // full-arm point, held with attitude — eyes go where the point goes
      { t: 0.12, p: { y: 0.875, rShF: 1.5, rShA: 0.25, rElb: 0.05, tYaw: -0.18, lElb: 1.2, lShF: 0.1 } },
      { t: 0.42, p: { y: 0.875, rShF: 1.5, rShA: 0.25, rElb: 0.05, tYaw: -0.18, lElb: 1.2 } },
      { t: 0.5, p: { y: 0.87, lElb: 0.6, rElb: 0.6, lShF: 0.2, rShF: 0.2, tYaw: 0.0, rShA: 0.0 } },
      { t: 0.62, p: { y: 0.875, lShF: 1.5, lShA: 0.25, lElb: 0.05, tYaw: 0.18, rElb: 1.2, rShF: 0.1 } },
      { t: 0.92, p: { y: 0.875, lShF: 1.5, lShA: 0.25, lElb: 0.05, tYaw: 0.18, rElb: 1.2 } },
    ],
  },
  "point.wrist_twirl": {
    bpm: 104, beats: 2,
    keys: [
      { t: 0.0, p: { y: 0.87, lShA: 1.15, rShA: 1.15, lShF: 0.25, rShF: 0.25, lElb: 1.25, rElb: 1.25, lKnee: 0.15, rKnee: 0.15 } },
      { t: 0.5, p: { y: 0.88, lShA: 1.2, rShA: 1.2, lElb: 1.35, rElb: 1.35, lKnee: 0.05, rKnee: 0.05 } },
    ],
    // elbows high and quiet; the forearms roll
    rootFn: (p, u, t) => { p.lElb += 0.28 * sin(t * TAU * 4); p.rElb += 0.28 * cos(t * TAU * 4); p.y += 0.012 * sin(u * TAU * 2); },
  },
  "lflow.scoobydoo": {
    bpm: 104, beats: 4,
    keys: [
      // kick-step with a lean-back, arms paddling
      { t: 0.0, p: { y: 0.85, lHipF: 1.05, lKnee: 0.55, tPitch: -0.14, rShF: 0.85, rElb: 0.5, lShF: -0.45, lElb: 0.6 } },
      { t: 0.25, p: { y: 0.875, lHipF: 0.1, lKnee: 0.15, tPitch: 0.0, rShF: 0.2, lShF: 0.2 } },
      { t: 0.5, p: { y: 0.85, rHipF: 1.05, rKnee: 0.55, tPitch: -0.14, lShF: 0.85, lElb: 0.5, rShF: -0.45, rElb: 0.6 } },
      { t: 0.75, p: { y: 0.875, rHipF: 0.1, rKnee: 0.15, tPitch: 0.0, rShF: 0.2, lShF: 0.2 } },
    ],
  },

  /* ------------- house (procedural v1, $0 lane) ------------- */
  "jack.basic": {
    bpm: 122, beats: 2,
    keys: [
      { t: 0.0, p: { y: 0.85, lKnee: 0.35, rKnee: 0.35, lHipF: 0.12, rHipF: 0.12, lShF: 0.25, rShF: 0.25, lElb: 0.55, rElb: 0.55 } },
      { t: 0.5, p: { y: 0.84, lKnee: 0.45, rKnee: 0.45, lHipF: 0.16, rHipF: 0.16, lElb: 0.65, rElb: 0.65 } },
    ],
    // the wave starts in the hips and rolls up, once per beat
    rootFn: (p, u) => { p.tPitch = 0.09 + 0.13 * sin(u * TAU * 2); p.y += 0.02 * sin(u * TAU * 2 + 1.2); },
  },
  "hfoot.pdbr": {
    bpm: 122, beats: 2,
    keys: [
      // behind–side–front on the balls of the feet, then mirrored
      { t: 0.0, p: { y: 0.855, lHipA: -0.32, lHipF: -0.18, lKnee: 0.45, rKnee: 0.2, lShF: 0.3, rShF: -0.3 } },
      { t: 0.17, p: { y: 0.86, rHipA: 0.3, rKnee: 0.35, lHipA: 0.0, lHipF: 0.0, lKnee: 0.2 } },
      { t: 0.33, p: { y: 0.855, lHipF: 0.38, lKnee: 0.3, rHipA: 0.0, rKnee: 0.18 } },
      { t: 0.5, p: { y: 0.855, rHipA: -0.32, rHipF: -0.18, rKnee: 0.45, lKnee: 0.2, rShF: 0.3, lShF: -0.3, lHipF: 0.0 } },
      { t: 0.67, p: { y: 0.86, lHipA: 0.3, lKnee: 0.35, rHipA: 0.0, rHipF: 0.0, rKnee: 0.2 } },
      { t: 0.83, p: { y: 0.855, rHipF: 0.38, rKnee: 0.3, lHipA: 0.0, lKnee: 0.18 } },
    ],
    rootFn: (p, u) => { p.tPitch = 0.08 + 0.07 * sin(u * TAU * 2); },
  },
  "hfoot.heeltoe": {
    bpm: 122, beats: 2,
    keys: [
      // heel forward on one side answers toe back on the other
      { t: 0.0, p: { y: 0.855, lHipF: 0.5, lKnee: 0.05, rHipF: -0.22, rKnee: 0.55, tYaw: 0.16, lShF: -0.4, rShF: 0.4, lElb: 0.5, rElb: 0.5 } },
      { t: 0.25, p: { y: 0.865, lHipF: 0.1, lKnee: 0.25, rHipF: 0.1, rKnee: 0.25, tYaw: 0.0 } },
      { t: 0.5, p: { y: 0.855, rHipF: 0.5, rKnee: 0.05, lHipF: -0.22, lKnee: 0.55, tYaw: -0.16, rShF: -0.4, lShF: 0.4 } },
      { t: 0.75, p: { y: 0.865, lHipF: 0.1, lKnee: 0.25, rHipF: 0.1, rKnee: 0.25, tYaw: 0.0 } },
    ],
    rootFn: (p, u) => { p.tPitch = 0.07 + 0.05 * sin(u * TAU * 2); },
  },
  /* ------------- partner-dance wave: solo cores (procedural v1) ------------- */
  "bbasic.side": {
    bpm: 130, beats: 4,
    keys: [
      // three steps side, weightless tap on 4 with the hip riding through
      { t: 0.0, p: { y: 0.86, lHipA: 0.3, lKnee: 0.25, rKnee: 0.15, roll: -0.04, lShF: 0.2, rShF: 0.2, lElb: 0.8, rElb: 0.8 } },
      { t: 0.25, p: { y: 0.86, rHipA: 0.28, rKnee: 0.25, lHipA: 0.0, lKnee: 0.15, roll: 0.0 } },
      { t: 0.5, p: { y: 0.86, lHipA: 0.3, lKnee: 0.25, rKnee: 0.15, roll: -0.04 } },
      { t: 0.75, p: { y: 0.865, rHipA: 0.15, rHipF: 0.1, rKnee: 0.4, lKnee: 0.2, roll: -0.08, tRoll: 0.14, lHipA: 0.0 } },
    ],
    rootFn: (p, u) => { p.tPitch = 0.04 + 0.02 * sin(u * TAU * 4); },
  },
  "kwalk.ginga": {
    bpm: 92, beats: 4,
    keys: [
      // grounded swaying walk — full transfers, hips answering, unhurried
      { t: 0.0, p: { y: 0.845, lHipF: 0.45, lKnee: 0.35, rHipF: -0.1, rKnee: 0.3, tRoll: 0.1, roll: -0.05, lShF: -0.15, rShF: 0.15, lElb: 0.4, rElb: 0.4 } },
      { t: 0.25, p: { y: 0.85, lHipF: 0.15, lKnee: 0.3, rHipF: 0.1, rKnee: 0.35, tRoll: 0.0, roll: 0.0 } },
      { t: 0.5, p: { y: 0.845, rHipF: 0.45, rKnee: 0.35, lHipF: -0.1, lKnee: 0.3, tRoll: -0.1, roll: 0.05, rShF: -0.15, lShF: 0.15 } },
      { t: 0.75, p: { y: 0.85, rHipF: 0.15, rKnee: 0.3, lHipF: 0.1, lKnee: 0.35, tRoll: 0.0, roll: 0.0 } },
    ],
  },
  "sjazz.charleston": {
    bpm: 140, beats: 4,
    keys: [
      // touch back, step, kick front, step — arms swinging opposite
      { t: 0.0, p: { y: 0.855, lHipF: -0.45, lKnee: 0.35, rKnee: 0.2, rShF: 0.7, lShF: -0.7, lElb: 0.6, rElb: 0.6 } },
      { t: 0.25, p: { y: 0.86, lHipF: 0.1, lKnee: 0.25, rKnee: 0.25, rShF: 0.2, lShF: 0.2 } },
      { t: 0.5, p: { y: 0.855, lHipF: 0.8, lKnee: 0.15, rKnee: 0.25, lShF: 0.7, rShF: -0.7 } },
      { t: 0.75, p: { y: 0.86, lHipF: 0.1, lKnee: 0.25, rKnee: 0.25, rShF: 0.2, lShF: 0.2 } },
    ],
    rootFn: (p, u) => { p.y -= 0.015 * Math.abs(sin(u * TAU * 4)); },
  },
  "sfoot.triples": {
    bpm: 140, beats: 2,
    keys: [
      // swung triple: tri-ple-step left, then right — low, weight trading
      { t: 0.0, p: { y: 0.855, lHipA: 0.22, lKnee: 0.35, rKnee: 0.2, roll: -0.04, lShF: 0.25, rShF: -0.25, lElb: 0.7, rElb: 0.7 } },
      { t: 0.17, p: { y: 0.86, rKnee: 0.32, lKnee: 0.22 } },
      { t: 0.33, p: { y: 0.855, lHipA: 0.26, lKnee: 0.34, rKnee: 0.2 } },
      { t: 0.5, p: { y: 0.855, rHipA: 0.22, rKnee: 0.35, lKnee: 0.2, roll: 0.04, rShF: 0.25, lShF: -0.25, lHipA: 0.0 } },
      { t: 0.67, p: { y: 0.86, lKnee: 0.32, rKnee: 0.22 } },
      { t: 0.83, p: { y: 0.855, rHipA: 0.26, rKnee: 0.34, lKnee: 0.2 } },
    ],
    rootFn: (p, u) => { p.y -= 0.012 * Math.abs(sin(u * TAU * 2)); },
  },

  /* ------------- step-dance wave: solo cores (procedural v1) ------------- */
  "tpstep.shuffle": {
    bpm: 120, beats: 2,
    keys: [
      // brush out, brush in — a flick from a loose ankle, knee quiet
      { t: 0.0, p: { y: 0.87, rHipF: 0.25, rKnee: 0.5, lKnee: 0.1, lShF: 0.1, rShF: 0.1, lElb: 0.5, rElb: 0.5 } },
      { t: 0.2, p: { y: 0.87, rHipF: 0.45, rKnee: 0.25 } },
      { t: 0.4, p: { y: 0.87, rHipF: 0.2, rKnee: 0.55 } },
      { t: 0.5, p: { y: 0.87, lHipF: 0.25, lKnee: 0.5, rKnee: 0.1, rHipF: 0.0 } },
      { t: 0.7, p: { y: 0.87, lHipF: 0.45, lKnee: 0.25 } },
      { t: 0.9, p: { y: 0.87, lHipF: 0.2, lKnee: 0.55 } },
    ],
  },
  "irstep.123s": {
    bpm: 112, beats: 2,
    keys: [
      // hop-1-2-3 — light, lifted, on the balls of the feet, arms easy and low
      { t: 0.0, p: { y: 0.885, lHipF: 0.5, lKnee: 0.35, rKnee: 0.1, tPitch: -0.02 } },
      { t: 0.17, p: { y: 0.87, lHipF: 0.25, lKnee: 0.1, rKnee: 0.12 } },
      { t: 0.33, p: { y: 0.872, rHipF: 0.25, rKnee: 0.12, lKnee: 0.1, lHipF: 0.0 } },
      { t: 0.5, p: { y: 0.885, rHipF: 0.5, rKnee: 0.35, lKnee: 0.1 } },
      { t: 0.67, p: { y: 0.87, rHipF: 0.25, rKnee: 0.1, lKnee: 0.12 } },
      { t: 0.83, p: { y: 0.872, lHipF: 0.25, lKnee: 0.12, rKnee: 0.1, rHipF: 0.0 } },
    ],
    rootFn: (p, u) => { p.y += 0.012 * Math.abs(sin(u * TAU * 2)); },
  },
  "flmove.braceo": {
    bpm: 66, beats: 8,
    keys: [
      // arms carve por abajo to por arriba — slow, proud spine, elbows lifted
      { t: 0.0, p: { y: 0.875, lShA: 0.5, rShA: 0.5, lShF: -0.3, rShF: -0.3, lElb: 0.6, rElb: 0.6, tPitch: -0.05 } },
      { t: 0.25, p: { y: 0.875, lShA: 1.2, rShA: 0.6, lShF: 0.4, lElb: 0.8, tRoll: 0.06 } },
      { t: 0.5, p: { y: 0.875, lShA: 1.6, rShA: 1.6, lShF: 0.9, rShF: 0.9, lElb: 0.9, rElb: 0.9, tRoll: 0.0, tPitch: -0.08 } },
      { t: 0.75, p: { y: 0.875, rShA: 1.2, lShA: 0.6, rShF: 0.4, rElb: 0.8, tRoll: -0.06 } },
    ],
    rootFn: (p, u, t) => { p.lElb += 0.1 * sin(t * TAU * 4); p.rElb += 0.1 * cos(t * TAU * 4); },
  },

  /* ------------- k-pop wave: solo cores (procedural v1) ------------- */
  "kpskill.sharpness": {
    bpm: 120, beats: 4,
    keys: [
      // original sharp 8-count: hit, HOLD dead, snap to the next line
      { t: 0.0, p: { y: 0.87, rShA: 1.4, rShF: 0.3, rElb: 0.1, lElb: 1.3, lShF: 0.3, tYaw: -0.12 } },
      { t: 0.2, p: { y: 0.87, rShA: 1.4, rShF: 0.3, rElb: 0.1, lElb: 1.3, tYaw: -0.12 } },
      { t: 0.27, p: { y: 0.87, lShA: 1.4, lShF: 0.3, lElb: 0.1, rElb: 1.3, rShF: 0.3, rShA: 0.0, tYaw: 0.12 } },
      { t: 0.47, p: { y: 0.87, lShA: 1.4, lShF: 0.3, lElb: 0.1, rElb: 1.3, tYaw: 0.12 } },
      { t: 0.54, p: { y: 0.85, lShF: 0.9, rShF: 0.9, lElb: 1.6, rElb: 1.6, lKnee: 0.25, rKnee: 0.25, tYaw: 0.0, tPitch: 0.08, lShA: 0.0 } },
      { t: 0.78, p: { y: 0.85, lShF: 0.9, rShF: 0.9, lElb: 1.6, rElb: 1.6, lKnee: 0.25, rKnee: 0.25, tPitch: 0.08 } },
      { t: 0.86, p: { y: 0.875, lShF: 0.15, rShF: 0.15, lElb: 0.4, rElb: 0.4, lKnee: 0.1, rKnee: 0.1, tPitch: 0.0 } },
    ],
  },
  "jziso.tower": {
    bpm: 100, beats: 4,
    keys: [
      // head slides, shoulder lifts, rib shift, hip bump — one floor at a time
      { t: 0.0, p: { y: 0.87, tYaw: 0.18, lShA: 0.3, rShA: 0.3, lElb: 0.9, rElb: 0.9 } },
      { t: 0.25, p: { y: 0.87, tYaw: -0.18 } },
      { t: 0.5, p: { y: 0.87, tYaw: 0.0, tRoll: 0.14 } },
      { t: 0.75, p: { y: 0.865, tRoll: -0.14, roll: 0.05, lHipA: 0.12 } },
    ],
  },
  "jzfoot.jazzwalk": {
    bpm: 96, beats: 4,
    keys: [
      // low in plié, toe leading, stretched through the crown, opposition alive
      { t: 0.0, p: { y: 0.84, lHipF: 0.55, lKnee: 0.2, rHipF: -0.1, rKnee: 0.35, rShF: 0.4, lShF: -0.4, lElb: 0.3, rElb: 0.3, tPitch: -0.04 } },
      { t: 0.25, p: { y: 0.845, lHipF: 0.15, rHipF: 0.15, lKnee: 0.3, rKnee: 0.3 } },
      { t: 0.5, p: { y: 0.84, rHipF: 0.55, rKnee: 0.2, lHipF: -0.1, lKnee: 0.35, lShF: 0.4, rShF: -0.4, tPitch: -0.04 } },
      { t: 0.75, p: { y: 0.845, lHipF: 0.15, rHipF: 0.15, lKnee: 0.3, rKnee: 0.3 } },
    ],
  },
  "ctmove.swings": {
    bpm: 160, beats: 6,
    keys: [
      // release into gravity, ride the arc, catch the suspension at the top
      { t: 0.0, p: { y: 0.83, tPitch: 0.55, lShF: 1.1, rShF: 1.1, lElb: 0.2, rElb: 0.2, lKnee: 0.4, rKnee: 0.4 } },
      { t: 0.25, p: { y: 0.87, tPitch: 0.05, lShF: -0.6, rShF: -0.6, lKnee: 0.15, rKnee: 0.15 } },
      { t: 0.42, p: { y: 0.875, tPitch: -0.08, lShF: -0.9, rShF: -0.9, lKnee: 0.1, rKnee: 0.1 } },
      { t: 0.5, p: { y: 0.83, tPitch: 0.55, lShF: 1.1, rShF: 1.1, lKnee: 0.4, rKnee: 0.4 } },
      { t: 0.75, p: { y: 0.87, tPitch: 0.05, lShF: -0.6, rShF: -0.6, tRoll: 0.12, lKnee: 0.15, rKnee: 0.15 } },
      { t: 0.92, p: { y: 0.875, tPitch: -0.08, lShF: -0.9, rShF: -0.9, tRoll: 0.0, lKnee: 0.1, rKnee: 0.1 } },
    ],
  },

  /* ------------- country & western wave: solo cores (procedural v1) ------------- */
  "tsfoot.basic": {
    bpm: 180, beats: 6,
    keys: [
      // quick-quick-slow-slow — all walking forward, level as a truck on cruise
      { t: 0.0, p: { y: 0.87, lHipF: 0.35, lKnee: 0.12, rHipF: -0.1, lShF: -0.15, rShF: 0.15, lElb: 0.35, rElb: 0.35 } },
      { t: 0.167, p: { y: 0.87, rHipF: 0.35, rKnee: 0.12, lHipF: -0.1, rShF: -0.15, lShF: 0.15 } },
      { t: 0.333, p: { y: 0.87, lHipF: 0.45, lKnee: 0.1, rHipF: -0.15, lShF: -0.2, rShF: 0.2 } },
      { t: 0.583, p: { y: 0.87, lHipF: 0.1, rHipF: 0.1, lKnee: 0.15, rKnee: 0.15 } },
      { t: 0.667, p: { y: 0.87, rHipF: 0.45, rKnee: 0.1, lHipF: -0.15, rShF: -0.2, lShF: 0.2 } },
      { t: 0.917, p: { y: 0.87, lHipF: 0.1, rHipF: 0.1, lKnee: 0.15, rKnee: 0.15 } },
    ],
  },
  "ldstep.grapevine": {
    bpm: 120, beats: 4,
    keys: [
      // side, behind, side, touch — flat travel, crossing foot goes BEHIND
      { t: 0.0, p: { y: 0.865, lHipA: 0.35, lKnee: 0.2, rKnee: 0.15, lShF: 0.2, rShF: -0.2, lElb: 0.45, rElb: 0.45 } },
      { t: 0.25, p: { y: 0.86, rHipA: -0.3, rHipF: -0.2, rKnee: 0.4, lKnee: 0.15, tYaw: 0.12 } },
      { t: 0.5, p: { y: 0.865, lHipA: 0.35, lKnee: 0.2, rKnee: 0.15, rHipA: 0.0, rHipF: 0.0, tYaw: 0.0 } },
      { t: 0.75, p: { y: 0.87, rHipA: 0.2, rHipF: 0.15, rKnee: 0.25, lKnee: 0.1, tRoll: 0.08 } },
    ],
  },
  "wcfoot.anchor": {
    bpm: 92, beats: 4,
    keys: [
      // two rolling walks, then the anchor triple — settled BACK, never creeping
      { t: 0.0, p: { y: 0.865, lHipF: 0.4, lKnee: 0.12, rHipF: -0.1, lShF: -0.15, rShF: 0.15, lElb: 0.4, rElb: 0.4 } },
      { t: 0.25, p: { y: 0.865, rHipF: 0.4, rKnee: 0.12, lHipF: -0.1, rShF: -0.15, lShF: 0.15 } },
      { t: 0.5, p: { y: 0.855, lHipF: -0.25, lKnee: 0.35, rHipF: 0.15, rKnee: 0.2, tPitch: -0.06, lShF: 0.2, rShF: 0.2 } },
      { t: 0.65, p: { y: 0.85, lHipF: -0.28, lKnee: 0.4, rKnee: 0.25, tPitch: -0.08 } },
      { t: 0.8, p: { y: 0.855, lHipF: -0.25, lKnee: 0.35, rKnee: 0.2, tPitch: -0.06 } },
    ],
    rootFn: (p, u) => { p.y += 0.004 * sin(u * TAU * 2); },
  },

  /* ------------- brazilian wave: solo cores (procedural v1) ------------- */
  "sbfoot.basic": {
    bpm: 104, beats: 2,
    keys: [
      // triple-time feet on the balls, tiny and under you — spring alive
      { t: 0.0, p: { y: 0.865, lKnee: 0.3, rKnee: 0.15, lHipF: 0.12, roll: -0.03, tRoll: 0.08, lShF: -0.25, rShF: 0.25, lElb: 0.5, rElb: 0.5 } },
      { t: 0.17, p: { y: 0.87, rKnee: 0.3, lKnee: 0.15, rHipF: 0.12, lHipF: 0.0 } },
      { t: 0.33, p: { y: 0.865, lKnee: 0.28, rKnee: 0.15, lHipF: 0.1, rHipF: 0.0 } },
      { t: 0.5, p: { y: 0.865, rKnee: 0.3, lKnee: 0.15, rHipF: 0.12, lHipF: 0.0, roll: 0.03, tRoll: -0.08, rShF: -0.25, lShF: 0.25 } },
      { t: 0.67, p: { y: 0.87, lKnee: 0.3, rKnee: 0.15, lHipF: 0.12, rHipF: 0.0 } },
      { t: 0.83, p: { y: 0.865, rKnee: 0.28, lKnee: 0.15, rHipF: 0.1, lHipF: 0.0 } },
    ],
    rootFn: (p, u) => { p.y += 0.012 * sin(u * TAU * 6); },
  },
  "ffoot.basic": {
    bpm: 100, beats: 4,
    keys: [
      // dois pra lá, dois pra cá — two steps left, two steps right, grounded
      { t: 0.0, p: { y: 0.855, lHipA: 0.28, lKnee: 0.3, rKnee: 0.18, roll: -0.05, tRoll: 0.07, lShF: 0.15, rShF: -0.15, lElb: 0.55, rElb: 0.55 } },
      { t: 0.25, p: { y: 0.86, lHipA: 0.12, rKnee: 0.28, lKnee: 0.2, roll: -0.02 } },
      { t: 0.5, p: { y: 0.855, rHipA: 0.28, rKnee: 0.3, lKnee: 0.18, roll: 0.05, tRoll: -0.07, rShF: 0.15, lShF: -0.15, lHipA: 0.0 } },
      { t: 0.75, p: { y: 0.86, rHipA: 0.12, lKnee: 0.28, rKnee: 0.2, roll: 0.02 } },
    ],
  },
  "zmove.lateral": {
    bpm: 76, beats: 2,
    keys: [
      // slow-quick-quick: the slow stretches, the quicks answer — level glide
      { t: 0.0, p: { y: 0.86, lHipA: 0.4, lKnee: 0.22, rKnee: 0.28, roll: -0.05, tRoll: 0.1, lShF: 0.2, rShF: -0.2, lElb: 0.5, rElb: 0.5 } },
      { t: 0.38, p: { y: 0.86, lHipA: 0.15, rKnee: 0.25, lKnee: 0.22, tRoll: 0.02 } },
      { t: 0.5, p: { y: 0.86, rHipA: 0.4, rKnee: 0.22, lKnee: 0.28, roll: 0.05, tRoll: -0.1, rShF: 0.2, lShF: -0.2, lHipA: 0.0 } },
      { t: 0.88, p: { y: 0.86, rHipA: 0.15, lKnee: 0.25, rKnee: 0.22, tRoll: -0.02 } },
    ],
    // chest-led wave riding the slow count — the neck stays a passenger
    rootFn: (p, u) => { p.tPitch = 0.06 + 0.07 * sin(u * TAU); },
  },

  /* ------------- waacking / dancehall / vogue prep (procedural v1) ------------- */
  "whack.basic": {
    bpm: 118, beats: 4,
    keys: [
      // overhead strikes: elbow leads, forearm whips past the ear, then recovers soft
      { t: 0.0, p: { y: 0.87, rShA: 1.55, rShF: 0.9, rElb: 1.7, lShA: 0.4, lElb: 0.6, tRoll: 0.05 } },
      { t: 0.12, p: { y: 0.875, rShA: 1.6, rShF: 1.1, rElb: 0.1 } },
      { t: 0.35, p: { y: 0.87, rShA: 0.9, rShF: 0.4, rElb: 0.8, tRoll: 0.0 } },
      { t: 0.5, p: { y: 0.87, lShA: 1.55, lShF: 0.9, lElb: 1.7, rShA: 0.4, rElb: 0.6, tRoll: -0.05 } },
      { t: 0.62, p: { y: 0.875, lShA: 1.6, lShF: 1.1, lElb: 0.1 } },
      { t: 0.85, p: { y: 0.87, lShA: 0.9, lShF: 0.4, lElb: 0.8, tRoll: 0.0 } },
    ],
    rootFn: (p, u) => { p.y += 0.01 * sin(u * TAU * 2); },
  },
  "dnamed.willie_bounce": {
    bpm: 102, beats: 4,
    keys: [
      // step-touch with a shoulder lean, hand rolling out on the touch
      { t: 0.0, p: { y: 0.85, roll: -0.09, lHipA: 0.35, lKnee: 0.25, rKnee: 0.4, rShF: 0.7, rShA: 0.5, rElb: 0.9, lElb: 0.5, tRoll: -0.1 } },
      { t: 0.25, p: { y: 0.855, roll: 0.0, lHipA: 0.0, lKnee: 0.3, rKnee: 0.3, rElb: 0.4, tRoll: 0.0 } },
      { t: 0.5, p: { y: 0.85, roll: 0.09, rHipA: 0.35, rKnee: 0.25, lKnee: 0.4, lShF: 0.7, lShA: 0.5, lElb: 0.9, rElb: 0.5, tRoll: 0.1 } },
      { t: 0.75, p: { y: 0.855, roll: 0.0, rHipA: 0.0, lKnee: 0.3, rKnee: 0.3, lElb: 0.4, tRoll: 0.0 } },
    ],
    rootFn: (p, u) => { p.tPitch = 0.08 + 0.06 * sin(u * TAU * 4); },
  },
  "vfound.catwalk": {
    bpm: 112, beats: 4,
    keys: [
      // hip-led walk on a line, chest proud, hands alive at the sides
      { t: 0.0, p: { y: 0.865, lHipF: 0.55, lHipA: -0.22, lKnee: 0.15, rHipF: -0.1, tRoll: 0.1, roll: -0.05, lShA: 0.35, rShA: 0.35, lElb: 0.5, rElb: 0.5, tPitch: -0.06 } },
      { t: 0.25, p: { y: 0.875, lHipF: 0.15, lHipA: 0.0, rHipF: 0.1, tRoll: 0.0, roll: 0.0 } },
      { t: 0.5, p: { y: 0.865, rHipF: 0.55, rHipA: -0.22, rKnee: 0.15, lHipF: -0.1, tRoll: -0.1, roll: 0.05, lShA: 0.35, rShA: 0.35, tPitch: -0.06 } },
      { t: 0.75, p: { y: 0.875, rHipF: 0.15, rHipA: 0.0, lHipF: 0.1, tRoll: 0.0, roll: 0.0 } },
    ],
  },
  "hfoot.skate": {
    bpm: 118, beats: 4,
    keys: [
      // push off one foot, glide long and level onto the other
      { t: 0.0, p: { y: 0.85, roll: -0.07, lHipA: 0.5, lHipF: -0.15, lKnee: 0.12, rKnee: 0.35, rShF: 0.55, lShF: -0.55, lElb: 0.35, rElb: 0.35 } },
      { t: 0.4, p: { y: 0.85, roll: -0.05, lHipA: 0.42, lKnee: 0.15, rKnee: 0.32 } },
      { t: 0.5, p: { y: 0.85, roll: 0.07, rHipA: 0.5, rHipF: -0.15, rKnee: 0.12, lKnee: 0.35, lHipA: 0.0, lHipF: 0.0, lShF: 0.55, rShF: -0.55 } },
      { t: 0.9, p: { y: 0.85, roll: 0.05, rHipA: 0.42, rKnee: 0.15, lKnee: 0.32 } },
    ],
    rootFn: (p, u) => { p.y += 0.008 * sin(u * TAU * 2); },
  },
};
