const base = require('./tech-stack-mascot-sequence');

// The sword chapter is inserted between the existing punch group (C01-C10)
// and celebration group (D01-D10). The familiar base frames remain in their
// original order around that insertion, so the visual story reads punch ->
// sword -> celebration before the cycle returns to its opening pose.
const PLAYBACK_RATE = 1.15;
const PUNCH_PLAYBACK_RATE = 1.25;
const actionFrameDurationsAtNormalSpeed = Object.freeze([
  220, 180, 150, 130, 120, 100, 100, 110,
  140, 160, 150, 140, 130, 120, 140, 180,
  180, 160, 150, 140, 130, 130, 150, 160,
  180, 180, 200, 220, 240, 260, 320, 420
]);
const speedUp = (duration, playbackRate) => Math.max(10, Math.round((duration / playbackRate) / 10) * 10);
const punchStartLabel = 'source-C01';
const punchEndLabel = 'transition-C10-9-3';
const punchStartIndex = base.frameLabels.indexOf(punchStartLabel);
const punchEndIndex = base.frameLabels.indexOf(punchEndLabel);
if (punchStartIndex < 0 || punchEndIndex < punchStartIndex) {
  throw new Error(`Missing punch boundary labels: ${punchStartLabel}, ${punchEndLabel}`);
}
const baseFrameDurations = Object.freeze(base.frameDurations.map((duration, index) => {
  const playbackRate = index >= punchStartIndex && index <= punchEndIndex
    ? PUNCH_PLAYBACK_RATE
    : PLAYBACK_RATE;
  return speedUp(duration, playbackRate);
}));
const punchFrameDurations = Object.freeze(baseFrameDurations.slice(punchStartIndex, punchEndIndex + 1));
const actionFrameDurations = Object.freeze(actionFrameDurationsAtNormalSpeed.map(duration => speedUp(duration, PLAYBACK_RATE)));
const actionFrameLabels = Object.freeze(
  Array.from({ length: actionFrameDurations.length }, (_, index) => `sword-${String(index + 1).padStart(2, '0')}`)
);
const celebrationStartLabel = 'source-D01';
const celebrationStartIndex = base.frameLabels.indexOf(celebrationStartLabel);
if (celebrationStartIndex < 0) {
  throw new Error(`Missing celebration boundary label: ${celebrationStartLabel}`);
}
const preSwordBaseFrameLabels = Object.freeze(base.frameLabels.slice(0, celebrationStartIndex));
const celebrationFrameLabels = Object.freeze(base.frameLabels.slice(celebrationStartIndex));
const preSwordBaseFrameDurations = Object.freeze(baseFrameDurations.slice(0, celebrationStartIndex));
const celebrationFrameDurations = Object.freeze(baseFrameDurations.slice(celebrationStartIndex));
const loopBridgeFrameLabels = Object.freeze(['loop-bridge-base-last']);
const loopBridgeFrameDurations = Object.freeze([100]);

const actionTotalDurationMs = actionFrameDurations.reduce((total, duration) => total + duration, 0);
const punchTotalDurationMs = punchFrameDurations.reduce((total, duration) => total + duration, 0);
const baseTotalDurationMs = baseFrameDurations.reduce((total, duration) => total + duration, 0);
const loopBridgeTotalDurationMs = loopBridgeFrameDurations.reduce((total, duration) => total + duration, 0);
const frameLabels = Object.freeze([
  ...preSwordBaseFrameLabels,
  ...actionFrameLabels,
  ...loopBridgeFrameLabels,
  ...celebrationFrameLabels
]);
const frameDurations = Object.freeze([
  ...preSwordBaseFrameDurations,
  ...actionFrameDurations,
  ...loopBridgeFrameDurations,
  ...celebrationFrameDurations
]);

module.exports = Object.freeze({
  ...base,
  playbackRate: PLAYBACK_RATE,
  punchPlaybackRate: PUNCH_PLAYBACK_RATE,
  baseFrameCount: base.frameCount,
  punchStartLabel,
  punchEndLabel,
  punchStartIndex,
  punchFrameCount: punchFrameDurations.length,
  punchFrameDurations,
  punchTotalDurationMs,
  preSwordBaseFrameCount: preSwordBaseFrameLabels.length,
  celebrationStartLabel,
  celebrationStartIndex,
  celebrationFrameCount: celebrationFrameLabels.length,
  preparedActionFrameCount: actionFrameDurations.length,
  actionFrameCount: actionFrameLabels.length,
  actionFrameLabels,
  actionFrameDurations,
  actionTotalDurationMs,
  loopBridgeFrameCount: loopBridgeFrameLabels.length,
  loopBridgeFrameLabels,
  loopBridgeFrameDurations,
  loopBridgeTotalDurationMs,
  celebrationFrameLabels,
  celebrationFrameDurations,
  baseFrameDurations,
  baseTotalDurationMs,
  frameLabels,
  frameDurations,
  frameCount: frameLabels.length,
  totalDurationMs: baseTotalDurationMs + actionTotalDurationMs + loopBridgeTotalDurationMs
});
