const test = require('node:test');
const assert = require('node:assert/strict');

const { stripBoundaryMatte } = require('../scripts/strip-generated-background');

function pixelOffset(width, x, y) {
  return (y * width + x) * 4;
}

test('stripBoundaryMatte removes neutral boundary matte but preserves warm character pixels', () => {
  const width = 7;
  const height = 7;
  const pixels = Buffer.alloc(width * height * 4);
  for (let index = 0; index < width * height; index += 1) {
    pixels[index * 4] = 198;
    pixels[index * 4 + 1] = 198;
    pixels[index * 4 + 2] = 198;
    pixels[index * 4 + 3] = 255;
  }

  for (let y = 2; y <= 4; y += 1) {
    for (let x = 2; x <= 4; x += 1) {
      const offset = pixelOffset(width, x, y);
      pixels[offset] = 230;
      pixels[offset + 1] = 150;
      pixels[offset + 2] = 80;
    }
  }

  stripBoundaryMatte(pixels, width, height);

  assert.equal(pixels[pixelOffset(width, 0, 0) + 3], 0);
  assert.equal(pixels[pixelOffset(width, 6, 6) + 3], 0);
  assert.equal(pixels[pixelOffset(width, 3, 3) + 3], 255);
});

test('stripBoundaryMatte also removes a boundary-connected black matte', () => {
  const width = 5;
  const height = 5;
  const pixels = Buffer.alloc(width * height * 4);
  for (let index = 0; index < width * height; index += 1) {
    pixels[index * 4] = 0;
    pixels[index * 4 + 1] = 0;
    pixels[index * 4 + 2] = 0;
    pixels[index * 4 + 3] = 255;
  }
  const center = pixelOffset(width, 2, 2);
  pixels[center] = 220;
  pixels[center + 1] = 145;
  pixels[center + 2] = 92;

  const removed = stripBoundaryMatte(pixels, width, height);

  assert.equal(removed, 24);
  assert.equal(pixels[3], 0);
  assert.equal(pixels[center + 3], 255);
});
