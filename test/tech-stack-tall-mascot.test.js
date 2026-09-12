const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const sequence = require('../scripts/tech-stack-sword-sequence');
const { rewriteGifDelays } = require('../scripts/compose-tech-stack-tall-mascot');
const decorationRendererPath = path.join(ROOT, 'scripts', 'tech-stack-tall-decorations.py');
const spriteSheetPath = path.join(ROOT, 'scripts', 'art', 'tech-stack-ornament-sprites.png');
const README_PATHS = [
  path.join(ROOT, 'README.md'),
  path.join(ROOT, 'README.zh.md')
];
const TALL_MASCOTS = [
  {
    gif: 'tech-stack-knight-v2-tall.gif',
    theme: 'light'
  },
  {
    gif: 'tech-stack-knight-v2-tall-dark.gif',
    theme: 'dark'
  }
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

function readMotionEvidence(gifPath) {
  const script = [
    'from PIL import Image, ImageChops',
    'import sys',
    'image = Image.open(sys.argv[1])',
    'frames = []',
    'for index in (0, 12, 24, 36, 48):',
    '    image.seek(index)',
    '    frames.append(image.convert("RGB").copy())',
    'def changed(first, second, box):',
    '    return ImageChops.difference(first.crop(box), second.crop(box)).getbbox() is not None',
    'top = any(changed(frames[0], frame, (0, 0, 320, 360)) for frame in frames[1:])',
    'bottom = any(changed(frames[0], frame, (0, 760, 320, 1100)) for frame in frames[1:])',
    'print(f"{int(top)} {int(bottom)}")'
  ].join('\n');
  return execFileSync('python', ['-c', script, gifPath], { encoding: 'utf8' }).trim();
}

test('GIF delay rewriting ignores marker-like bytes after the trailer', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tech-stack-gif-delay-test-'));
  const inputPath = path.join(tempDir, 'input.gif');
  const outputPath = path.join(tempDir, 'output.gif');
  const sourcePath = path.join(ROOT, 'assets', 'tech-stack-knight-v2-tall.gif');
  const markerLikeBytes = Buffer.from([0x21, 0xf9, 0x04, 0x01, 0x00, 0x00, 0x00, 0x00]);

  try {
    fs.writeFileSync(inputPath, Buffer.concat([fs.readFileSync(sourcePath), markerLikeBytes]));
    assert.doesNotThrow(() => rewriteGifDelays(
      inputPath,
      outputPath,
      sequence.frameDurations
    ));
    assert.equal(fs.readFileSync(outputPath).length, fs.readFileSync(inputPath).length);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test('tall tech stack mascot fills the side rail without changing the animation contract', () => {
  const decorationRenderer = fs.readFileSync(decorationRendererPath, 'utf8');
  assert.match(decorationRenderer, /CANVAS = \(320, 1100\)/);
  assert.match(decorationRenderer, /TOP_SIGNAL = "top-signal"/);
  assert.match(decorationRenderer, /BOTTOM_LANDING_PAD = "bottom-landing-pad"/);
  assert.ok(fs.existsSync(spriteSheetPath), 'generated ornament sprite sheet must be tracked as a pipeline source');
  assert.match(decorationRenderer, /tech-stack-ornament-sprites\.png/);
  assert.match(decorationRenderer, /frame_index/);
  assert.match(decorationRenderer, /frame_count/);

  for (const { gif, theme } of TALL_MASCOTS) {
    const gifPath = path.join(ROOT, 'assets', gif);
    assert.ok(fs.existsSync(gifPath), `missing tall mascot: ${gif}`);

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

    assert.match(decorationRenderer, new RegExp(`"${theme}"`), `${theme} decoration palette should be available`);
    assert.equal(readMotionEvidence(gifPath), '1 1', `${theme} top and bottom ornaments must animate across the loop`);
  }

  for (const readmePath of README_PATHS) {
    const readme = fs.readFileSync(readmePath, 'utf8');
    assert.match(readme, /tech-stack-knight-v2-tall\.gif/);
    assert.match(readme, /tech-stack-knight-v2-tall-dark\.gif/);
  }
});
