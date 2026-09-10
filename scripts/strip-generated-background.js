const fs = require('node:fs');
const zlib = require('node:zlib');

const PNG_SIGNATURE = '89504e470d0a1a0a';

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBytes, data]);
  const output = Buffer.alloc(data.length + 12);
  output.writeUInt32BE(data.length, 0);
  body.copy(output, 4);
  output.writeUInt32BE(crc32(body), data.length + 8);
  return output;
}

function readRgbaPng(filePath) {
  const bytes = fs.readFileSync(filePath);
  if (bytes.toString('hex', 0, 8) !== PNG_SIGNATURE) throw new Error(`source is not a PNG: ${filePath}`);

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
    offset += length + 12;
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

  for (let y = 0; y < height; y += 1) {
    const filter = raw[rawOffset++];
    const encoded = raw.subarray(rawOffset, rawOffset + stride);
    rawOffset += stride;
    const row = Buffer.alloc(stride);
    for (let x = 0; x < stride; x += 1) {
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

function writeRgbaPng(filePath, width, height, pixels) {
  const raw = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y += 1) {
    const rowOffset = y * (width * 4 + 1);
    raw[rowOffset] = 0;
    pixels.copy(raw, rowOffset + 1, y * width * 4, (y + 1) * width * 4);
  }

  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;
  fs.writeFileSync(filePath, Buffer.concat([
    Buffer.from(PNG_SIGNATURE, 'hex'),
    pngChunk('IHDR', header),
    pngChunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    pngChunk('IEND', Buffer.alloc(0))
  ]));
}

function isNeutralMatte(red, green, blue, alpha) {
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  return alpha >= 16 && maximum - minimum <= 12;
}

function stripBoundaryMatte(pixels, width, height) {
  const seen = new Uint8Array(width * height);
  const queue = [];
  const enqueue = (x, y) => {
    const index = y * width + x;
    if (seen[index]) return;
    const offset = index * 4;
    if (!isNeutralMatte(pixels[offset], pixels[offset + 1], pixels[offset + 2], pixels[offset + 3])) return;
    seen[index] = 1;
    queue.push(index);
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }
  for (let y = 1; y < height - 1; y += 1) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }

  for (let head = 0; head < queue.length; head += 1) {
    const index = queue[head];
    const x = index % width;
    const y = Math.floor(index / width);
    const alphaOffset = index * 4 + 3;
    pixels[alphaOffset] = 0;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) {
      const nextX = x + dx;
      const nextY = y + dy;
      if (nextX >= 0 && nextY >= 0 && nextX < width && nextY < height) enqueue(nextX, nextY);
    }
  }

  return queue.length;
}

function main() {
  const [sourcePath, outputPath] = process.argv.slice(2);
  if (!sourcePath || !outputPath) {
    console.error('Usage: node scripts/strip-generated-background.js <source.png> <output.png>');
    process.exitCode = 1;
    return;
  }
  const image = readRgbaPng(sourcePath);
  const removed = stripBoundaryMatte(image.pixels, image.width, image.height);
  writeRgbaPng(outputPath, image.width, image.height, image.pixels);
  console.log(`[matte-strip] removed ${removed} boundary pixels from ${sourcePath}`);
}

module.exports = { stripBoundaryMatte };
if (require.main === module) main();
