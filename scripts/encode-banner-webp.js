const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const WEBP_OPTIONS = Object.freeze({
  quality: 75,
  compressionLevel: 6
});

function runFfmpeg(args) {
  try {
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
  } catch (error) {
    throw new Error(error.stderr || 'ffmpeg failed while encoding the banner WebP');
  }
}

function encodeBannerWebp({ source, output }) {
  if (!source || !output) throw new Error('source and output are required');
  if (!fs.existsSync(source)) throw new Error(`source banner does not exist: ${source}`);

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'threetwoa-banner-webp-'));
  const webpPath = path.join(tempDir, 'banner.webp');

  try {
    runFfmpeg([
      '-i', source,
      '-c:v', 'libwebp',
      '-q:v', String(WEBP_OPTIONS.quality),
      '-compression_level', String(WEBP_OPTIONS.compressionLevel),
      '-loop', '0',
      '-an',
      webpPath
    ]);

    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.copyFileSync(webpPath, output);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

if (require.main === module) {
  const [, , source = 'assets/v9-banner.gif', output = 'assets/v9-banner-animated.webp'] = process.argv;
  encodeBannerWebp({ source, output });
  console.log(`Banner WebP written to ${output}`);
}

module.exports = { WEBP_OPTIONS, encodeBannerWebp };
