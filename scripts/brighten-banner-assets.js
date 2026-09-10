const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const COLOR_GRADE = Object.freeze({
  brightness: 0.10,
  contrast: 1.02,
  saturation: 1.10,
  gamma: 1.05,
  webpQuality: 75
});

function buildEqFilter() {
  return `eq=${[
    `brightness=${COLOR_GRADE.brightness.toFixed(2)}`,
    `contrast=${COLOR_GRADE.contrast.toFixed(2)}`,
    `saturation=${COLOR_GRADE.saturation.toFixed(2)}`,
    `gamma=${COLOR_GRADE.gamma.toFixed(2)}`
  ].join(':')}`;
}

function runFfmpeg(args) {
  try {
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
  } catch (error) {
    throw new Error(error.stderr || 'ffmpeg failed while grading the banner');
  }
}

function writeBrightBannerAssets({ source, gifOutput, webpOutput }) {
  if (!source || !gifOutput || !webpOutput) {
    throw new Error('source, gifOutput, and webpOutput are required');
  }
  if (!fs.existsSync(source)) throw new Error(`source banner does not exist: ${source}`);

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'threetwoa-banner-bright-'));
  const palettePath = path.join(tempDir, 'palette.png');
  const gifPath = path.join(tempDir, 'banner.gif');
  const webpPath = path.join(tempDir, 'banner.webp');
  const filter = buildEqFilter();

  try {
    runFfmpeg([
      '-i', source,
      '-vf', `${filter},palettegen=max_colors=256:stats_mode=full`,
      palettePath
    ]);
    runFfmpeg([
      '-i', source,
      '-i', palettePath,
      '-lavfi', `${filter} [graded]; [graded][1:v] paletteuse=dither=sierra2_4a`,
      '-loop', '0',
      gifPath
    ]);
    runFfmpeg([
      '-i', source,
      '-vf', filter,
      '-c:v', 'libwebp',
      '-q:v', String(COLOR_GRADE.webpQuality),
      '-compression_level', '6',
      '-loop', '0',
      '-an',
      webpPath
    ]);

    fs.mkdirSync(path.dirname(gifOutput), { recursive: true });
    fs.mkdirSync(path.dirname(webpOutput), { recursive: true });
    fs.copyFileSync(gifPath, gifOutput);
    fs.copyFileSync(webpPath, webpOutput);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

if (require.main === module) {
  const [, , source = 'assets/v9-banner.gif', gifOutput = 'assets/v9-banner.gif', webpOutput = 'assets/v9-banner-animated.webp'] = process.argv;
  writeBrightBannerAssets({ source, gifOutput, webpOutput });
  console.log(`Bright banner written to ${gifOutput} and ${webpOutput}`);
}

module.exports = { COLOR_GRADE, buildEqFilter, writeBrightBannerAssets };
