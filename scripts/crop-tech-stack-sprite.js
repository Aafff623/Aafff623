const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const SOURCE = process.argv[2];
const OUTPUT_DIR = process.argv[3];
const GRID_EDGES = [0, 314, 627, 941, 1254];
const ACTION_ORDER = [16, 1, 6, 2, 3, 4, 5, 9, 10, 11, 12, 14, 8, 13, 7, 15];
const TARGET_SIZE = 320;

if (!SOURCE || !OUTPUT_DIR) {
  console.error('Usage: node scripts/crop-tech-stack-sprite.js <source.png> <output-dir>');
  process.exitCode = 1;
  return;
}

function readPng(filePath) {
  const bytes = fs.readFileSync(filePath);
  if (bytes.toString('hex', 0, 8) !== '89504e470d0a1a0a') throw new Error('source is not a PNG');

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

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBytes, data]);
  const output = Buffer.alloc(12 + data.length);
  output.writeUInt32BE(data.length, 0);
  body.copy(output, 4);
  output.writeUInt32BE(crc32(body), data.length + 8);
  return output;
}

function writePng(filePath, width, height, pixels) {
  const raw = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    const rowOffset = y * (width * 4 + 1);
    raw[rowOffset] = 0;
    pixels.copy(raw, rowOffset + 1, y * width * 4, (y + 1) * width * 4);
  }

  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;
  const signature = Buffer.from('89504e470d0a1a0a', 'hex');
  const png = Buffer.concat([
    signature,
    chunk('IHDR', header),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
  fs.writeFileSync(filePath, png);
}

function removeBoundaryNoise(cell, width, height) {
  const threshold = 32;
  const seen = new Uint8Array(width * height);
  const alphaAt = (x, y) => cell[(y * width + x) * 4 + 3];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const start = y * width + x;
      if (seen[start] || alphaAt(x, y) < threshold) continue;

      const queue = [start];
      const component = [];
      seen[start] = 1;
      let minY = y;
      let maxY = y;

      for (let head = 0; head < queue.length; head++) {
        const current = queue[head];
        const currentX = current % width;
        const currentY = Math.floor(current / width);
        component.push(current);
        minY = Math.min(minY, currentY);
        maxY = Math.max(maxY, currentY);

        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nextX = currentX + dx;
          const nextY = currentY + dy;
          if (nextX < 0 || nextY < 0 || nextX >= width || nextY >= height) continue;
          const next = nextY * width + nextX;
          if (!seen[next] && alphaAt(nextX, nextY) >= threshold) {
            seen[next] = 1;
            queue.push(next);
          }
        }
      }

      const isSmall = component.length < 1000;
      const touchesHorizontalBoundary = minY <= 6 || maxY >= height - 7;
      if ((isSmall && touchesHorizontalBoundary) || component.length < 8) {
        for (const pixel of component) cell[pixel * 4 + 3] = 0;
      }
    }
  }

  for (let y = 0; y < height; y++) {
    if (y > 6 && y < height - 7) continue;
    for (let x = 0; x < width; x++) {
      const alphaOffset = (y * width + x) * 4 + 3;
      if (cell[alphaOffset] < threshold) cell[alphaOffset] = 0;
    }
  }
}

function cropCell(source, cellNumber) {
  const row = Math.floor((cellNumber - 1) / 4);
  const column = (cellNumber - 1) % 4;
  const x0 = GRID_EDGES[column];
  const y0 = GRID_EDGES[row];
  const width = GRID_EDGES[column + 1] - x0;
  const height = GRID_EDGES[row + 1] - y0;
  const cell = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    const sourceOffset = ((y0 + y) * source.width + x0) * 4;
    source.pixels.copy(cell, y * width * 4, sourceOffset, sourceOffset + width * 4);
  }

  removeBoundaryNoise(cell, width, height);
  const output = Buffer.alloc(TARGET_SIZE * TARGET_SIZE * 4);
  const offsetX = Math.floor((TARGET_SIZE - width) / 2);
  const offsetY = Math.floor((TARGET_SIZE - height) / 2);
  for (let y = 0; y < height; y++) {
    const sourceOffset = y * width * 4;
    const targetOffset = ((offsetY + y) * TARGET_SIZE + offsetX) * 4;
    cell.copy(output, targetOffset, sourceOffset, sourceOffset + width * 4);
  }
  return output;
}

const source = readPng(SOURCE);
if (source.width !== 1254 || source.height !== 1254) {
  throw new Error(`expected 1254×1254 source, got ${source.width}×${source.height}`);
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
for (let index = 0; index < ACTION_ORDER.length; index++) {
  const outputPath = path.join(OUTPUT_DIR, `frame-${String(index + 1).padStart(2, '0')}.png`);
  writePng(outputPath, TARGET_SIZE, TARGET_SIZE, cropCell(source, ACTION_ORDER[index]));
}

console.log(`[sprite-crop] wrote ${ACTION_ORDER.length} frames to ${OUTPUT_DIR}`);
