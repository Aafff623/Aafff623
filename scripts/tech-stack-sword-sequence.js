const base = require('./tech-stack-mascot-sequence');

// The action chapter stays after the original 144-frame loop. That ordering
// lets a browser decode and paint the familiar idle/combat loop before it
// reaches the larger generated sword section.
const PLAYBACK_RATE = 1.15;
const actionFrameDurationsAtNormalSpeed = Object.freeze([
  220, 180, 150, 130, 120, 100, 100, 110,
  140, 160, 150, 140, 130, 120, 140, 180,
  180, 160, 150, 140, 130, 130, 150, 160,
  180, 180, 200, 220, 240, 260, 320, 420
]);
const speedUp = duration => Math.max(10, Math.round((duration / PLAYBACK_RATE) / 10) * 10);
const baseFrameDurations = Object.freeze(base.frameDurations.map(speedUp));
const actionFrameDurations = Object.freeze(actionFrameDurationsAtNormalSpeed.map(speedUp));
const actionFrameLabels = Object.freeze(
  Array.from({ length: actionFrameDurations.length }, (_, index) => `sword-${String(index + 1).padStart(2, '0')}`)
);

const actionTotalDurationMs = actionFrameDurations.reduce((total, duration) => total + duration, 0);
const baseTotalDurationMs = baseFrameDurations.reduce((total, duration) => total + duration, 0);
const frameLabels = Object.freeze([...base.frameLabels, ...actionFrameLabels]);
const frameDurations = Object.freeze([...baseFrameDurations, ...actionFrameDurations]);

module.exports = Object.freeze({
  ...base,
  playbackRate: PLAYBACK_RATE,
  baseFrameCount: base.frameCount,
  actionFrameCount: actionFrameLabels.length,
  actionFrameLabels,
  actionFrameDurations,
  actionTotalDurationMs,
  baseFrameDurations,
  baseTotalDurationMs,
  frameLabels,
  frameDurations,
  frameCount: frameLabels.length,
  totalDurationMs: baseTotalDurationMs + actionTotalDurationMs
});
