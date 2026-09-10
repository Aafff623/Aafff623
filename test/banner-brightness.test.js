const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const { spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const BANNER_GIF = path.join(ROOT, 'assets', 'v9-banner.gif');
const BANNER_WEBP = path.join(ROOT, 'assets', 'v9-banner-animated.webp');

function signalStats(filePath) {
  const result = spawnSync('ffmpeg', [
    '-v', 'error',
    '-i', filePath,
    '-vf', 'signalstats,metadata=print:file=-',
    '-frames:v', '1',
    '-f', 'null',
    '-'
  ], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  const output = `${result.stdout}\n${result.stderr}`;
  const match = output.match(/lavfi\.signalstats\.YAVG=([0-9.]+)/);
  assert.ok(match, `ffmpeg did not report YAVG for ${filePath}`);
  return Number(match[1]);
}

function readAnimatedWebpChunk(bytes, offset) {
  const type = bytes.toString('ascii', offset, offset + 4);
  const size = bytes.readUInt32LE(offset + 4);
  return { type, size, next: offset + 8 + size + (size % 2) };
}

test('banner keeps its pixel-art animation while using a brighter midtone grade', () => {
  const probe = spawnSync('ffprobe', [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height,nb_frames',
    '-show_entries', 'format=duration',
    '-of', 'default=noprint_wrappers=1',
    BANNER_GIF
  ], { encoding: 'utf8' });

  assert.equal(probe.status, 0, probe.stderr);
  assert.match(probe.stdout, /width=760/);
  assert.match(probe.stdout, /height=342/);
  assert.match(probe.stdout, /nb_frames=24/);
  assert.match(probe.stdout, /duration=3\.600000/);
  assert.ok(signalStats(BANNER_GIF) >= 150, 'banner midtones should be visibly brighter than the old grade');
});

test('animated WebP banner has a self-consistent RIFF container and 24 frames', () => {
  const bytes = fs.readFileSync(BANNER_WEBP);
  assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
  assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
  assert.equal(bytes.readUInt32LE(4), bytes.length - 8, 'RIFF payload length must match the file');

  let offset = 12;
  let animationFrames = 0;
  while (offset + 8 <= bytes.length) {
    const chunk = readAnimatedWebpChunk(bytes, offset);
    if (chunk.type === 'ANMF') animationFrames += 1;
    offset = chunk.next;
  }

  assert.equal(offset, bytes.length, 'WebP chunks must consume the complete file');
  assert.equal(animationFrames, 24, 'banner WebP should contain all 24 source frames');
  assert.ok(bytes.length <= 2_200_000, 'animated WebP should stay within the first-load budget');
});
