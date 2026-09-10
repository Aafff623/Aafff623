const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT, 'scripts', 'tech-stack-mascot-sequence.js');
const MASCOT_ASSETS = [
  'tech-stack-knight-v2.gif',
  'tech-stack-knight-v2-dark.gif'
];

test('the expanded mascot manifest defines two ten-pose action groups', () => {
  assert.ok(fs.existsSync(MANIFEST_PATH), 'missing mascot sequence manifest');
  const sequence = require(MANIFEST_PATH);

  assert.equal(sequence.targetSize, 320);
  assert.deepEqual(sequence.headAnchor, { x: 132, y: 115 });
  assert.equal(sequence.transitionsPerConnection, 3);
  assert.deepEqual(sequence.groups['evade-counter'], [
    'C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07', 'C08', 'C09', 'C10'
  ]);
  assert.deepEqual(sequence.groups['observe-understand-celebrate'], [
    'D01', 'D02', 'D03', 'D04', 'D05', 'D06', 'D07', 'D08', 'D09', 'D10'
  ]);
  assert.deepEqual(sequence.insertions, [
    { after: 5, before: 9, group: 'evade-counter' },
    { after: 15, before: 16, group: 'observe-understand-celebrate' }
  ]);
  assert.equal(sequence.keyFrames.length, 36);
  assert.equal(sequence.connections.length, 36);
  assert.equal(sequence.frameCount, 144);
  assert.equal(sequence.frameDurations.length, 144);
  assert.deepEqual(sequence.frameDurations.slice(0, 4), [400, 90, 90, 180]);
  assert.equal(sequence.frameDurations[sequence.frameLabels.indexOf('source-D01')], 550);
  assert.equal(sequence.frameDurations[sequence.frameLabels.indexOf('source-D10')], 1000);
  assert.ok(sequence.totalDurationMs > 25000);
});

test('the expanded manifest exposes the exact frame labels used by the encoder', () => {
  const sequence = require(MANIFEST_PATH);
  assert.deepEqual(sequence.frameLabels.slice(0, 8), [
    'source-16', 'transition-16-1-1', 'transition-16-1-2', 'transition-16-1-3',
    'source-1', 'transition-1-6-1', 'transition-1-6-2', 'transition-1-6-3'
  ]);
  assert.equal(sequence.frameLabels.at(-4), 'source-D10');
  assert.equal(sequence.frameLabels.at(-1), 'transition-D10-16-3');
  assert.equal(new Set(sequence.frameLabels).size, 144);
});

test('both published mascots are expected to follow the expanded binary contract', () => {
  const sequence = require(MANIFEST_PATH);
  for (const asset of MASCOT_ASSETS) {
    assert.ok(fs.existsSync(path.join(ROOT, 'assets', asset)), `missing mascot asset: ${asset}`);
    assert.equal(sequence.frameCount, 144, `${asset} must use the expanded frame count`);
  }
});

test('the normalizer accepts a manifest-sized calibration table and non-square source crops', () => {
  const normalizerPath = path.join(ROOT, 'scripts', 'normalize-tech-stack-frames.js');
  const normalizer = fs.readFileSync(normalizerPath, 'utf8');

  assert.match(normalizer, /CALIBRATION_PATH/);
  assert.match(normalizer, /calibrated frames/);
  assert.doesNotMatch(normalizer, /image\.width\s*!==\s*TARGET_SIZE/);
});
