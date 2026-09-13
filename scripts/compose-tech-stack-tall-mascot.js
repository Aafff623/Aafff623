const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const sequence = require('./tech-stack-sword-sequence');

const ROOT = path.resolve(__dirname, '..');
const WIDTH = 320;
const HEIGHT = 1100;
const CHARACTER_TOP = 390;
const DECORATION_SCRIPT = path.join(__dirname, 'tech-stack-tall-decorations.py');
const SWORD_PREPARATION_SCRIPT = path.join(__dirname, 'prepare-tech-stack-sword-frames.py');
const SWORD_ART_DIR = path.join(__dirname, 'art', 'tech-stack-sword');
const SWORD_SOURCES = Object.freeze([
  path.join(SWORD_ART_DIR, 'character-sword-keyframes.png'),
  path.join(SWORD_ART_DIR, 'character-sword-followthrough.png')
]);
const SWORD_EFFECTS = path.join(SWORD_ART_DIR, 'sword-effects-atlas.png');
const THEMES = Object.freeze([
  {
    name: 'light',
    source: path.join(ROOT, 'assets', 'tech-stack-knight-v2.gif'),
    background: 'white',
    output: path.join(ROOT, 'assets', 'tech-stack-knight-v2-tall.gif')
  },
  {
    name: 'dark',
    source: path.join(ROOT, 'assets', 'tech-stack-knight-v2-dark.gif'),
    background: '0x0d1117',
    sourceMatte: '0x0c0f16',
    output: path.join(ROOT, 'assets', 'tech-stack-knight-v2-tall-dark.gif')
  }
]);

function runFfmpeg(args) {
  try {
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
  } catch (error) {
    throw new Error(error.stderr || 'ffmpeg failed while composing the tall mascot');
  }
}

function skipGifSubBlocks(bytes, start) {
  let cursor = start;
  while (cursor < bytes.length) {
    const length = bytes[cursor++];
    if (length === 0) return cursor;
    cursor += length;
  }
  throw new Error('GIF contains an unterminated data sub-block');
}

function parseGifFrames(bytes) {
  if (bytes.toString('ascii', 0, 3) !== 'GIF') {
    throw new Error('GIF parsing requires a GIF file');
  }

  let offset = 13;
  if (bytes[10] & 0x80) offset += 3 * (1 << ((bytes[10] & 0x07) + 1));
  let pendingDelayOffset = null;
  const frames = [];

  while (offset < bytes.length) {
    const marker = bytes[offset++];
    if (marker === 0x3b) return frames;
    if (marker === 0x21) {
      const label = bytes[offset++];
      if (label === 0xf9) {
        if (bytes[offset] !== 4) throw new Error('GIF graphic control extension must have length 4');
        pendingDelayOffset = offset + 2;
        offset += 6;
      } else {
        offset = skipGifSubBlocks(bytes, offset);
      }
      continue;
    }
    if (marker !== 0x2c) throw new Error(`unexpected GIF marker 0x${marker.toString(16)}`);

    const imageStart = offset - 1;
    const packed = bytes[offset + 8];
    offset += 9;
    if (packed & 0x80) offset += 3 * (1 << ((packed & 0x07) + 1));
    offset += 1;
    offset = skipGifSubBlocks(bytes, offset);
    frames.push({ imageStart, delayOffset: pendingDelayOffset });
    pendingDelayOffset = null;
  }

  throw new Error('GIF is missing a trailer');
}

function rewriteGifDelays(inputPath, outputPath, durations) {
  const bytes = Buffer.from(fs.readFileSync(inputPath));
  const frames = parseGifFrames(bytes);
  if (frames.length !== durations.length) {
    throw new Error(`GIF has ${frames.length} image frames; expected ${durations.length}`);
  }

  const chunks = [];
  let sourceCursor = 0;
  for (const [frame, { imageStart, delayOffset }] of frames.entries()) {
    if (delayOffset !== null) {
      const centiseconds = Math.max(1, Math.round(durations[frame] / 10));
      bytes[delayOffset] = centiseconds & 0xff;
      bytes[delayOffset + 1] = (centiseconds >> 8) & 0xff;
    }
    chunks.push(bytes.subarray(sourceCursor, imageStart));
    if (delayOffset === null) {
      const centiseconds = Math.max(1, Math.round(durations[frame] / 10));
      chunks.push(Buffer.from([
        0x21, 0xf9, 0x04, 0x00,
        centiseconds & 0xff,
        (centiseconds >> 8) & 0xff,
        0x00, 0x00
      ]));
    }
    sourceCursor = imageStart;
  }
  chunks.push(bytes.subarray(sourceCursor));
  fs.writeFileSync(outputPath, Buffer.concat(chunks));
}

function renderDecorations(directoryPath, theme, frameCount) {
  try {
    execFileSync('python', [DECORATION_SCRIPT, directoryPath, theme, String(frameCount)], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
  } catch (error) {
    throw new Error(error.stderr || `python failed while rendering ${theme} decoration frames`);
  }
}

function prepareSwordFrames(directoryPath, theme) {
  for (const source of [...SWORD_SOURCES, SWORD_EFFECTS]) {
    if (!fs.existsSync(source)) throw new Error(`sword source does not exist: ${source}`);
  }
  try {
    execFileSync('python', [
      SWORD_PREPARATION_SCRIPT,
      SWORD_SOURCES[0],
      SWORD_SOURCES[1],
      SWORD_EFFECTS,
      directoryPath,
      theme
    ], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
  } catch (error) {
    throw new Error(error.stderr || `python failed while preparing ${theme} sword frames`);
  }
}

function frameFiles(directory) {
  return fs.readdirSync(directory)
    .filter(file => /^frame-\d+\.png$/i.test(file))
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));
}

function composeTallMascot({ name, source, sourceMatte, background, output }) {
  if (!fs.existsSync(source)) throw new Error(`source mascot does not exist: ${source}`);
  fs.mkdirSync(path.dirname(output), { recursive: true });

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'threetwoa-tech-stack-tall-'));
  const sourceFrames = path.join(tempDir, 'source-frames');
  const swordFrames = path.join(tempDir, 'sword-frames');
  const combinedFrames = path.join(tempDir, 'combined-frames');
  const decorationFrames = path.join(tempDir, 'decorations');
  const renderedFrames = path.join(tempDir, 'rendered-frames');
  const palettePath = path.join(tempDir, 'palette.png');
  const uniformPath = path.join(tempDir, 'uniform.gif');
  fs.mkdirSync(sourceFrames, { recursive: true });
  fs.mkdirSync(swordFrames, { recursive: true });
  fs.mkdirSync(combinedFrames, { recursive: true });
  fs.mkdirSync(decorationFrames, { recursive: true });
  fs.mkdirSync(renderedFrames, { recursive: true });

  try {
    runFfmpeg([
      '-i', source,
      '-vf', 'format=rgb24',
      '-fps_mode', 'passthrough',
      '-start_number', '1',
      path.join(sourceFrames, 'frame-%03d.png')
    ]);

    const frames = frameFiles(sourceFrames);
    if (frames.length !== sequence.baseFrameCount) {
      throw new Error(`decoded ${frames.length} source frames; expected ${sequence.baseFrameCount}`);
    }

    prepareSwordFrames(swordFrames, name);
    const actionFrames = frameFiles(swordFrames);
    if (actionFrames.length !== sequence.preparedActionFrameCount) {
      throw new Error(`prepared ${actionFrames.length} sword frames; expected ${sequence.preparedActionFrameCount}`);
    }
    const combinedFrameSources = [
      ...frames.slice(0, sequence.preSwordBaseFrameCount)
        .map(frame => ({ directory: sourceFrames, frame })),
      ...actionFrames.map(frame => ({ directory: swordFrames, frame })),
      { directory: sourceFrames, frame: frames.at(-1) },
      ...frames.slice(sequence.celebrationStartIndex)
        .map(frame => ({ directory: sourceFrames, frame }))
    ];
    if (combinedFrameSources.length !== sequence.frameCount) {
      throw new Error(`assembled ${combinedFrameSources.length} frames; expected ${sequence.frameCount}`);
    }
    for (const [index, { directory, frame }] of combinedFrameSources.entries()) {
      fs.copyFileSync(
        path.join(directory, frame),
        path.join(combinedFrames, `frame-${String(index + 1).padStart(3, '0')}.png`)
      );
    }

    renderDecorations(decorationFrames, name, sequence.frameCount);
    const characterInput = sourceMatte
      ? `[0:v]format=rgba,colorkey=${sourceMatte}:0.01:0.0[character]`
      : '[0:v]format=rgba[character]';
    const renderFilter = [
      characterInput,
      `color=c=${background}:s=${WIDTH}x${HEIGHT}:r=10[base]`,
      `[base][character]overlay=0:${CHARACTER_TOP}:format=auto[canvas]`,
      '[1:v]format=rgba[decor]',
      '[canvas][decor]overlay=0:0:format=auto,format=rgb24[out]'
    ].join(';');

    runFfmpeg([
      '-filter_threads', '1',
      '-filter_complex_threads', '1',
      '-framerate', '10',
      '-i', path.join(combinedFrames, 'frame-%03d.png'),
      '-framerate', '10',
      '-i', path.join(decorationFrames, 'frame-%03d.png'),
      '-filter_complex', renderFilter,
      '-map', '[out]',
      '-frames:v', String(sequence.frameCount),
      '-start_number', '1',
      path.join(renderedFrames, 'frame-%03d.png')
    ]);

    runFfmpeg([
      '-framerate', '10',
      '-start_number', '1',
      '-i', path.join(renderedFrames, 'frame-%03d.png'),
      '-vf', 'palettegen=max_colors=256:stats_mode=full:reserve_transparent=0',
      '-frames:v', '1',
      palettePath
    ]);

    runFfmpeg([
      '-filter_threads', '1',
      '-filter_complex_threads', '1',
      '-framerate', '10',
      '-start_number', '1',
      '-i', path.join(renderedFrames, 'frame-%03d.png'),
      '-loop', '1',
      '-i', palettePath,
      '-filter_complex', '[0:v][1:v]paletteuse=dither=sierra2_4a[out]',
      '-map', '[out]',
      '-frames:v', String(sequence.frameCount),
      '-loop', '0',
      '-gifflags', '-offsetting-transdiff',
      '-an',
      uniformPath
    ]);

    rewriteGifDelays(uniformPath, output, sequence.frameDurations);
    console.log(`[tall-mascot] ${output}: ${WIDTH}x${HEIGHT}, ${sequence.frameCount} frames, ${sequence.totalDurationMs} ms`);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

function main() {
  for (const theme of THEMES) {
    composeTallMascot(theme);
  }
}

if (require.main === module) main();

module.exports = {
  CHARACTER_TOP,
  HEIGHT,
  THEMES,
  WIDTH,
  composeTallMascot,
  rewriteGifDelays
};
