const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const zlib = require('node:zlib');

const SOURCE_DIR = process.argv[2];
const OUTPUT_DIR = process.argv[3];
const CALIBRATION_PATH = process.argv[4];
const TARGET_SIZE = 320;
const TARGET_SCALE = 0.9;
const TARGET_HEAD_X = 132;
const TARGET_HEAD_Y = 115;
const CANONICAL_HEAD_HEIGHT = 122;
const ALPHA_THRESHOLD = 16;
const GEOMETRY_COMPONENT_PADDING = 24;

// Original poses and reference-guided in-betweens were drawn at different
// native scales. These per-frame corrections were calibrated from the head
// silhouette, then applied around the fixed character anchor. The lower
// canonical target leaves safe padding for the crouch pose instead of clipping
// it to force the largest source scale. The 64-frame loop is ordered as
// source pose, generated in-between 1, generated in-between 2, existing
// in-between, then the next source pose.
const FRAME_SCALE_CORRECTIONS = Object.freeze([
  0.8714, 0.8653, 0.8592, 0.8841, 0.8531, 0.8571, 0.8612, 0.8841,
  0.8652, 0.8592, 0.8532, 0.8591, 0.8472, 0.8512, 0.8551, 0.8714,
  0.8591, 0.8532, 0.8473, 0.8714, 0.8414, 0.8514, 0.8614, 0.8905,
  0.8714, 0.8633, 0.8553, 0.8841, 0.8472, 0.8553, 0.8633, 0.8531,
  0.8714, 0.8693, 0.8673, 0.8591, 0.8652, 0.9367, 0.8700, 0.9457,
  1.0796, 1.0144, 0.9493, 0.9173, 0.8841, 0.8841, 0.8841, 0.8841,
  0.8714, 0.8841, 0.8799, 0.8756, 0.8652, 0.8714, 0.8735, 0.8756,
  0.8531, 0.8777, 0.8798, 0.8820, 0.8777, 0.8841, 0.8799, 0.8756
]);

if (!SOURCE_DIR || !OUTPUT_DIR) {
  console.error('Usage: node scripts/normalize-tech-stack-frames.js <source-dir> <output-dir> [calibration.json]');
  process.exitCode = 1;
  return;
}

function loadScaleCorrections() {
  if (!CALIBRATION_PATH) return FRAME_SCALE_CORRECTIONS;
  const parsed = JSON.parse(fs.readFileSync(CALIBRATION_PATH, 'utf8'));
  const corrections = Array.isArray(parsed) ? parsed : parsed.corrections;
  if (!Array.isArray(corrections) || corrections.some(value => typeof value !== 'number' || value <= 0)) {
    throw new Error(`calibration file must contain a positive numeric corrections array: ${CALIBRATION_PATH}`);
  }
  return Object.freeze(corrections);
}

function readPng(filePath) {
  const bytes = fs.readFileSync(filePath);
  if (bytes.toString('hex', 0, 8) !== '89504e470d0a1a0a') throw new Error(`not a PNG: ${filePath}`);

  let offset = 8;
  let width;
  let height;
  let bitDepth;
  let colorType;
  let interlace;
  const idat = [];
  while (offset < bytes.length) {
    const length = bytes.readUInt32BE(offset);
    const type = bytes.toString('ascii', offset + 4, offset + 8);
    const data = bytes.subarray(offset + 8, offset + 8 + length);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      interlace = data[12];
    }
    if (type === 'IDAT') idat.push(data);
    offset += 12 + length;
  }
  if (bitDepth !== 8 || colorType !== 6 || interlace !== 0) {
    throw new Error(`expected non-interlaced 8-bit RGBA PNG, got ${bitDepth}/${colorType}/interlace${interlace}`);
  }

  const channels = 4;
  const stride = width * channels;
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const pixels = Buffer.alloc(width * height * channels);
  let rawOffset = 0;
  let previous = Buffer.alloc(stride);
  const paeth = (left, up, upLeft) => {
    const predictor = left + up - upLeft;
    const leftDistance = Math.abs(predictor - left);
    const upDistance = Math.abs(predictor - up);
    const upLeftDistance = Math.abs(predictor - upLeft);
    return leftDistance <= upDistance && leftDistance <= upLeftDistance
      ? left
      : upDistance <= upLeftDistance ? up : upLeft;
  };

  for (let y = 0; y < height; y++) {
    const filter = raw[rawOffset++];
    const encoded = raw.subarray(rawOffset, rawOffset + stride);
    rawOffset += stride;
    const row = Buffer.alloc(stride);
    for (let x = 0; x < stride; x++) {
      const left = x >= channels ? row[x - channels] : 0;
      const up = previous[x];
      const upLeft = x >= channels ? previous[x - channels] : 0;
      const predictor = filter === 0
        ? 0
        : filter === 1
          ? left
          : filter === 2
            ? up
            : filter === 3
              ? Math.floor((left + up) / 2)
              : paeth(left, up, upLeft);
      row[x] = (encoded[x] + predictor) & 255;
    }
    row.copy(pixels, y * stride);
    previous = row;
  }
  return { width, height, pixels };
}

function findAlphaBox(image) {
  const seen = new Uint8Array(image.width * image.height);
  const components = [];
  const alphaAt = (x, y) => image.pixels[(y * image.width + x) * 4 + 3];

  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      const start = y * image.width + x;
      if (seen[start] || alphaAt(x, y) < ALPHA_THRESHOLD) continue;

      const queue = [start];
      let minX = x;
      let minY = y;
      let maxX = x;
      let maxY = y;
      seen[start] = 1;

      for (let head = 0; head < queue.length; head++) {
        const current = queue[head];
        const currentX = current % image.width;
        const currentY = Math.floor(current / image.width);
        minX = Math.min(minX, currentX);
        minY = Math.min(minY, currentY);
        maxX = Math.max(maxX, currentX);
        maxY = Math.max(maxY, currentY);

        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) {
          const nextX = currentX + dx;
          const nextY = currentY + dy;
          if (nextX < 0 || nextY < 0 || nextX >= image.width || nextY >= image.height) continue;
          const next = nextY * image.width + nextX;
          if (!seen[next] && alphaAt(nextX, nextY) >= ALPHA_THRESHOLD) {
            seen[next] = 1;
            queue.push(next);
          }
        }
      }

      components.push({ area: queue.length, minX, minY, maxX, maxY });
    }
  }

  if (components.length === 0) throw new Error('frame has no visible pixels');
  const main = components.reduce((largest, component) => component.area > largest.area ? component : largest);
  const expanded = {
    minX: main.minX - GEOMETRY_COMPONENT_PADDING,
    minY: main.minY - GEOMETRY_COMPONENT_PADDING,
    maxX: main.maxX + GEOMETRY_COMPONENT_PADDING,
    maxY: main.maxY + GEOMETRY_COMPONENT_PADDING
  };
  const geometry = components.filter(component => component === main
    || (component.maxX >= expanded.minX
      && component.minX <= expanded.maxX
      && component.maxY >= expanded.minY
      && component.minY <= expanded.maxY));
  const minX = Math.min(...geometry.map(component => component.minX));
  const minY = Math.min(...geometry.map(component => component.minY));
  const maxX = Math.max(...geometry.map(component => component.maxX));
  const maxY = Math.max(...geometry.map(component => component.maxY));
  return {
    x: minX,
    y: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1
  };
}

function isWarmBodyPixel(red, green, blue, alpha) {
  return alpha >= ALPHA_THRESHOLD
    && red >= 125
    && green >= 65
    && red - green >= 8
    && red - blue >= 35;
}

function findHeadAnchor(image, box) {
  const headMaxY = box.y + Math.round(box.height * 0.5);
  let totalX = 0;
  let totalY = 0;
  let count = 0;

  for (let y = box.y; y <= headMaxY; y++) {
    for (let x = box.x; x < box.x + box.width; x++) {
      const offset = (y * image.width + x) * 4;
      const red = image.pixels[offset];
      const green = image.pixels[offset + 1];
      const blue = image.pixels[offset + 2];
      const alpha = image.pixels[offset + 3];
      if (!isWarmBodyPixel(red, green, blue, alpha)) continue;
      totalX += x;
      totalY += y;
      count++;
    }
  }

  if (count === 0) {
    throw new Error('frame has no warm head/body pixels for registration');
  }

  return { x: totalX / count, y: totalY / count };
}

const frames = fs.readdirSync(SOURCE_DIR)
  .filter(file => /^frame-\d+\.png$/i.test(file))
  .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));
if (frames.length === 0) throw new Error(`no frame-*.png files found in ${SOURCE_DIR}`);
const scaleCorrections = loadScaleCorrections();
if (frames.length !== scaleCorrections.length) {
  throw new Error(`expected ${scaleCorrections.length} calibrated frames, got ${frames.length}`);
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
for (const [frameIndex, frame] of frames.entries()) {
  const inputPath = path.join(SOURCE_DIR, frame);
  const outputPath = path.join(OUTPUT_DIR, frame);
  const image = readPng(inputPath);
  if (image.width <= 0 || image.height <= 0) {
    throw new Error(`${frame} must have positive dimensions, got ${image.width}x${image.height}`);
  }
  const box = findAlphaBox(image);
  const head = findHeadAnchor(image, box);
  const correction = scaleCorrections[frameIndex];
  const frameScale = TARGET_SCALE * correction;
  const scaledWidth = Math.max(1, Math.round(box.width * frameScale));
  const scaledHeight = Math.max(1, Math.round(box.height * frameScale));
  if (scaledWidth > TARGET_SIZE || scaledHeight > TARGET_SIZE) {
    throw new Error(`${frame} exceeds target canvas after shared-scale registration: ${scaledWidth}x${scaledHeight}px`);
  }
  const targetX = Math.round(TARGET_HEAD_X - (head.x - box.x) * frameScale);
  const targetY = Math.round(TARGET_HEAD_Y - (head.y - box.y) * frameScale);
  if (targetX < 0 || targetY < 0 || targetX + scaledWidth > TARGET_SIZE || targetY + scaledHeight > TARGET_SIZE) {
    throw new Error(`${frame} cannot be placed in target canvas at x=${targetX}, y=${targetY}`);
  }
  const scaleFilter = `,scale=${scaledWidth}:${scaledHeight}:flags=lanczos`;
  const filter = `crop=${box.width}:${box.height}:${box.x}:${box.y}${scaleFilter},pad=${TARGET_SIZE}:${TARGET_SIZE}:${targetX}:${targetY}:color=black@0,format=rgba`;

  try {
    execFileSync('ffmpeg', [
    '-y',
    '-loglevel', 'error',
    '-i', inputPath,
    '-vf', filter,
    '-frames:v', '1',
    '-pix_fmt', 'rgba',
      outputPath
    ], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (error) {
    throw new Error(error.stderr || `ffmpeg failed for ${frame}`);
  }
  console.log(`[sprite-register] ${frame}: head=${head.x.toFixed(1)},${head.y.toFixed(1)} -> ${TARGET_HEAD_X},${TARGET_HEAD_Y}; ${box.width}x${box.height} -> ${scaledWidth}x${scaledHeight} @ x=${targetX}, y=${targetY}, base=${TARGET_SCALE}, correction=${correction}, effective=${frameScale.toFixed(4)}, canonicalHead=${CANONICAL_HEAD_HEIGHT}`);
}
