const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync, spawn } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const INDEX_PATH = path.join(ROOT, 'index.html');
const README_PATHS = [
  path.join(ROOT, 'README.md'),
  path.join(ROOT, 'README.zh.md')
];
const MASCOT_ASSETS = [
  'tech-stack-knight-v2.gif',
  'tech-stack-knight-v2-dark.gif'
];
const FALLBACK_ASSETS = ['mascot.gif', 'mascot-dark.gif'];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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

    for (const route of ['/edit', '/edit/zh']) {
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
  assert.match(launcher, /\$previewBase\/edit["']/);
  assert.match(launcher, /\$previewBase\/edit\/zh["']/);
  assert.doesNotMatch(launcher, /temp[\\/]preview/);
  assert.match(batchLauncher, /open-previews\.ps1/);
  assert.match(spriteCrop, /ACTION_ORDER = \[16, 1, 6, 2, 3, 4, 5, 9, 10, 11, 12, 14, 8, 13, 7, 15\]/);
  assert.match(assetDocs, /16 frames in an action-grouped loop[\s\S]*3 fps/);

  for (const [index, readme] of readmes.entries()) {
    assert.match(readme, /tech-stack-knight-v2\.gif/, `README ${index} should use the new mascot`);
    assert.match(readme, /tech-stack-knight-v2-dark\.gif/, `README ${index} should use the dark mascot`);
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
