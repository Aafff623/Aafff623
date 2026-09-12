const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync, spawn } = require('node:child_process');
const mascotSequence = require('../scripts/tech-stack-mascot-sequence');

const ROOT = path.resolve(__dirname, '..');
const INDEX_PATH = path.join(ROOT, 'index.html');
const README_PATHS = [
  path.join(ROOT, 'README.md'),
  path.join(ROOT, 'README.zh.md')
];
const MASCOT_ASSETS = [
  'tech-stack-knight-v2-tall.gif',
  'tech-stack-knight-v2-tall-dark.gif'
];
const FALLBACK_ASSETS = ['mascot.gif', 'mascot-dark.gif'];
const ANIMATED_WEBP_EXPECTATIONS = [
  { file: 'v9-banner-animated.webp', frames: 24, maxBytes: 2200000 },
  { file: 'hero-knight-animated.webp', frames: 28, maxBytes: 2100000 }
];
const TECH_STACK_GIF_EXPECTATIONS = [
  'tech-stack-knight-v2.gif',
  'tech-stack-knight-v2-dark.gif'
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

async function waitForServer(url, child) {
  const deadline = Date.now() + 4000;
  let lastError;

  while (Date.now() < deadline) {
    try {
      return await fetch(url);
    } catch (error) {
      lastError = error;
      if (child.exitCode !== null) break;
      await sleep(50);
    }
  }

  throw lastError || new Error(`Server did not start: ${url}`);
}

test('preview server exposes only the local preview surface', async () => {
  const port = 34000 + (process.pid % 1000);
  const child = spawn(process.execPath, ['server.js'], {
    cwd: ROOT,
    env: { ...process.env, HOST: '127.0.0.1', PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  try {
    const base = `http://127.0.0.1:${port}`;
    await waitForServer(`${base}/`, child);

    const root = await fetch(`${base}/`);
    assert.equal(root.status, 200);
    assert.match(root.headers.get('content-type') || '', /text\/html/);

    for (const route of ['/edit', '/edit/zh', '/edit/en']) {
      const response = await fetch(`${base}${route}`);
      assert.equal(response.status, 200, route);
    }

    const api = await fetch(`${base}/api/profile`);
    assert.equal(api.status, 200);
    const profile = await api.json();
    assert.ok(profile.enHtml.length > 1000);
    assert.ok(profile.zhHtml.length > 1000);

    for (const route of ['/server.js', '/package.json', '/assets/missing.svg', '/assets/%2e%2e/server.js']) {
      const response = await fetch(`${base}${route}`);
      assert.equal(response.status, 404, route);
      if (route.startsWith('/assets/')) {
        assert.match(response.headers.get('content-type') || '', /application\/json/, route);
      }
    }
  } finally {
    child.kill();
    await sleep(100);
  }
});

test('editor regressions stay fixed', () => {
  const index = fs.readFileSync(INDEX_PATH, 'utf8');
  const launcher = fs.readFileSync(path.join(ROOT, 'scripts', 'open-previews.ps1'), 'utf8');
  const batchLauncher = fs.readFileSync(path.join(ROOT, 'scripts', 'open-previews.bat'), 'utf8');
  const spriteCrop = fs.readFileSync(path.join(ROOT, 'scripts', 'crop-tech-stack-sprite.js'), 'utf8');
  const assetDocs = fs.readFileSync(path.join(ROOT, 'docs', 'assets-reproduction.md'), 'utf8');
  const readmes = README_PATHS.map(filePath => fs.readFileSync(filePath, 'utf8'));

  assert.doesNotMatch(index, /Latest commit:\s*40e7081/);
  assert.match(index, /toggleLiveEdit\(false\);\s*toggleAnnotationMode\(false\);\s*render\(\);/s);
  assert.doesNotMatch(index, /card\.innerHTML\s*=\s*`/);
  assert.match(launcher, /\$previewBase\/["']/);
  assert.match(launcher, /\$previewBase\/edit["']/);
  assert.doesNotMatch(launcher, /temp[\\/]preview/);
  assert.match(batchLauncher, /open-previews\.ps1/);
  assert.match(index, /else if \(isEditMode\) \{\s*\/\/ Editor always opens in Chinese; only the showcase page honors the saved preference\.\s*currentLang = 'zh';/);
  assert.match(spriteCrop, /ACTION_ORDER = \[16, 1, 6, 2, 3, 4, 5, 9, 10, 11, 12, 14, 8, 13, 7, 15\]/);
  assert.match(assetDocs, /176 frames[\s\S]*C group keeps the punch cadence/);

  for (const [index, readme] of readmes.entries()) {
    assert.match(readme, /tech-stack-knight-v2-tall\.gif/, `README ${index} should use the tall mascot`);
    assert.match(readme, /tech-stack-knight-v2-tall-dark\.gif/, `README ${index} should use the tall dark mascot`);
    assert.match(readme, /loading="lazy" decoding="async"/, `README ${index} should defer the tall mascot request`);
    assert.match(readme, /<sub><i>🤖 Models secure the baseline; experience expands the frontier\.<\/i><\/sub>/, `README ${index} should include the architecture line in italic style`);
    assert.doesNotMatch(readme, /srcset="\.\/assets\/mascot-dark\.gif"/);
    assert.doesNotMatch(readme, /src="\.\/assets\/mascot\.gif"/);
  }

  for (const asset of MASCOT_ASSETS) {
    assert.ok(fs.existsSync(path.join(ROOT, 'assets', asset)), `missing generated asset: ${asset}`);
  }
  for (const asset of FALLBACK_ASSETS) {
    assert.ok(fs.existsSync(path.join(ROOT, 'assets', asset)), `fallback asset was removed: ${asset}`);
  }

  execFileSync('git', ['check-ignore', '-q', 'scripts/sync-gitee.js'], { cwd: ROOT });
});

test('highlighted animations keep lossless WebP primaries and GIF fallbacks', () => {
  for (const readme of README_PATHS.map(filePath => fs.readFileSync(filePath, 'utf8'))) {
    assert.match(readme, /<source type="image\/webp" srcset="\.\/assets\/v9-banner-animated\.webp" \/>/);
    assert.match(readme, /<source type="image\/webp" srcset="\.\/assets\/hero-knight-animated\.webp" \/>/);
    assert.match(readme, /<img src="\.\/assets\/v9-banner\.gif"/);
    assert.match(readme, /<img src="\.\/assets\/hero-knight\.gif"/);
  }

  for (const expectation of ANIMATED_WEBP_EXPECTATIONS) {
    const filePath = path.join(ROOT, 'assets', expectation.file);
    assert.ok(fs.statSync(filePath).size <= expectation.maxBytes, `${expectation.file} exceeds the first-load budget`);
    const binary = fs.readFileSync(filePath, 'latin1');
    assert.match(binary.slice(0, 16), /RIFF[\s\S]{4}WEBP/);
    assert.match(binary, /ANIM/);
    assert.equal((binary.match(/ANMF/g) || []).length, expectation.frames);
  }
});

test('tech stack mascot keeps punch cadence and smooths the full loop with in-betweens', () => {
  for (const asset of TECH_STACK_GIF_EXPECTATIONS) {
    const filePath = path.join(ROOT, 'assets', asset);
    const probe = execFileSync('ffprobe', [
      '-v', 'error',
      '-select_streams', 'v:0',
      '-show_entries', 'stream=r_frame_rate,nb_frames',
      '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1',
      filePath
    ], { encoding: 'utf8' });

    assert.match(probe, /nb_frames=144/);
    assert.match(probe, /duration=39\.410000/);

    const durations = [];
    const bytes = fs.readFileSync(filePath);
    for (let index = 0; index < bytes.length - 7; index += 1) {
      if (bytes[index] === 0x21 && bytes[index + 1] === 0xf9 && bytes[index + 2] === 0x04) {
        const centiseconds = bytes[index + 4] | (bytes[index + 5] << 8);
        durations.push(centiseconds * 10);
      }
    }

    assert.deepEqual(durations, mascotSequence.frameDurations);

    const imageFrames = readGifImageFrames(bytes);
    assert.equal(imageFrames.length, mascotSequence.frameCount, 'GIF should contain the manifest frame count');
    for (const [index, frame] of imageFrames.entries()) {
      assert.deepEqual(
        frame,
        { left: 0, top: 0, width: 320, height: 320, transparent: false },
        `GIF frame ${index + 1} must be a complete opaque 320×320 canvas`
      );
    }
  }
});

test('tech stack frame pipeline anchors the character instead of each frame bounds', () => {
  const normalizerPath = path.join(ROOT, 'scripts', 'normalize-tech-stack-frames.js');
  assert.ok(fs.existsSync(normalizerPath), 'missing deterministic sprite registration pass');
  const normalizer = fs.readFileSync(normalizerPath, 'utf8');
  assert.match(normalizer, /TARGET_SCALE\s*=\s*0\.9/);
  assert.match(normalizer, /TARGET_HEAD_X\s*=\s*132/);
  assert.match(normalizer, /TARGET_HEAD_Y\s*=\s*115/);
  assert.match(normalizer, /CANONICAL_HEAD_HEIGHT\s*=\s*122/);
  assert.match(normalizer, /FRAME_SCALE_CORRECTIONS/);
  assert.match(normalizer, /frames\.length\s*!==\s*scaleCorrections\.length/);
  assert.match(normalizer, /findHeadAnchor/);
  assert.doesNotMatch(normalizer, /TARGET_CENTER_X/);
  assert.doesNotMatch(normalizer, /TARGET_HEIGHT\s*\/\s*box\.height/);
  assert.match(normalizer, /alpha/i);
});
