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
};
