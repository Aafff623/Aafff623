const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const sequence = require('../scripts/tech-stack-sword-sequence');
const composerPath = path.join(ROOT, 'scripts', 'compose-tech-stack-tall-mascot.js');
const preparationPath = path.join(ROOT, 'scripts', 'prepare-tech-stack-sword-frames.py');
const SWORD_DIR = path.join(ROOT, 'scripts', 'art', 'tech-stack-sword');
const SWORD_SOURCES = [
  'character-sword-keyframes.png',
  'character-sword-followthrough.png',
  'sword-effects-atlas.png'
];
const TALL_MASCOTS = [
  path.join(ROOT, 'assets', 'tech-stack-knight-v2-tall.gif'),
  path.join(ROOT, 'assets', 'tech-stack-knight-v2-tall-dark.gif')
];

function readGifImageFrames(bytes) {
  assert.equal(bytes.toString('ascii', 0, 3), 'GIF', 'asset must be a GIF');

  let offset = 13;
  if (bytes[10] & 0x80) offset += 3 * (1 << ((bytes[10] & 0x07) + 1));
  let graphicControl = { transparent: false };
  const frames = [];

  const skipSubBlocks = start => {
    let cursor = start;
    while (cursor < bytes.length) {
      const length = bytes[cursor++];
      if (length === 0) return cursor;
      cursor += length;
    }
    throw new Error('unterminated GIF sub-blocks');
  };

  while (offset < bytes.length) {
    const marker = bytes[offset++];
    if (marker === 0x3b) break;
    if (marker === 0x21) {
      const label = bytes[offset++];
      if (label === 0xf9) {
        assert.equal(bytes[offset], 4, 'GIF graphic control extension must have length 4');
        graphicControl = { transparent: Boolean(bytes[offset + 1] & 0x01) };
        offset += 6;
        continue;
      }
      if (label === 0xff) offset += 1 + bytes[offset];
      offset = skipSubBlocks(offset);
      continue;
    }
    assert.equal(marker, 0x2c, `unexpected GIF marker 0x${marker.toString(16)}`);

    const left = bytes.readUInt16LE(offset);
    const top = bytes.readUInt16LE(offset + 2);
    const width = bytes.readUInt16LE(offset + 4);
    const height = bytes.readUInt16LE(offset + 6);
    const packed = bytes[offset + 8];
    offset += 9;
    if (packed & 0x80) offset += 3 * (1 << ((packed & 0x07) + 1));
    offset++;
    offset = skipSubBlocks(offset);
    frames.push({ left, top, width, height, transparent: graphicControl.transparent });
  }

  return frames;
}

test('sword extension keeps a staged 32-frame action chapter', () => {
  assert.equal(sequence.playbackRate, 1.15);
  assert.equal(sequence.baseFrameCount, 144);
  assert.equal(sequence.actionFrameCount, 32);
  assert.equal(sequence.frameCount, 176);
  assert.equal(sequence.frameLabels.length, sequence.frameCount);
  assert.equal(sequence.frameDurations.length, sequence.frameCount);
  assert.equal(sequence.actionTotalDurationMs, 4780);
  assert.equal(sequence.totalDurationMs, 39200);
  assert.equal(sequence.frameDurations[0], 350);
  assert.equal(sequence.frameDurations[144], 190);
  assert.equal(sequence.frameLabels[0], 'source-16');
  assert.equal(sequence.frameLabels[143], 'transition-D10-16-3');
  assert.equal(sequence.frameLabels[144], 'sword-01');
  assert.equal(sequence.frameLabels.at(-1), 'sword-32');
  assert.match(fs.readFileSync(composerPath, 'utf8'), /tech-stack-sword-sequence/);
  assert.ok(fs.existsSync(preparationPath), 'sword frame preparation script must exist');
});

test('generated sword source sheets and their integration contract are present', () => {
  for (const source of SWORD_SOURCES) {
    const sourcePath = path.join(SWORD_DIR, source);
    assert.ok(fs.existsSync(sourcePath), `missing sword source: ${source}`);
    const probe = execFileSync('ffprobe', [
      '-v', 'error',
      '-show_entries', 'stream=width,height,pix_fmt',
      '-of', 'default=noprint_wrappers=1',
      sourcePath
    ], { encoding: 'utf8' });
    assert.match(probe, /width=1266/);
    assert.match(probe, /height=124[23]/);
  }

  const preparation = fs.readFileSync(preparationPath, 'utf8');
  assert.match(preparation, /4x4|GRID/);
  assert.match(preparation, /checker|neutral|background/i);
  assert.match(preparation, /effects/i);
  assert.match(preparation, /frame_count|frameCount/);
});

test('published tall mascots append the sword chapter as full opaque canvases', () => {
  for (const gifPath of TALL_MASCOTS) {
    assert.ok(fs.existsSync(gifPath), `missing tall mascot: ${path.basename(gifPath)}`);
    const probe = execFileSync('ffprobe', [
      '-v', 'error',
      '-select_streams', 'v:0',
      '-show_entries', 'stream=width,height,nb_frames',
      '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1',
      gifPath
    ], { encoding: 'utf8' });
    assert.match(probe, /width=320/);
    assert.match(probe, /height=1100/);
    assert.match(probe, /nb_frames=176/);
    assert.match(probe, /duration=39\.200000/);

    const imageFrames = readGifImageFrames(fs.readFileSync(gifPath));
    assert.equal(imageFrames.length, sequence.frameCount);
    for (const [index, frame] of imageFrames.entries()) {
      assert.deepEqual(
        frame,
        { left: 0, top: 0, width: 320, height: 1100, transparent: false },
        `GIF frame ${index + 1} must be a complete opaque 320×1100 canvas`
      );
    }

    assert.ok(fs.statSync(gifPath).size < 7_000_000, 'lazy-start animation should stay below the per-theme budget');
  }
});
