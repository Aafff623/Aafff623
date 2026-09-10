const test = require('node:test');
const assert = require('node:assert/strict');
const { removeBoundaryNoise } = require('../scripts/crop-tech-stack-sprite.js');

test('crop removes small components touching a vertical cell boundary', () => {
  const width = 314;
  const height = 314;
  const cell = Buffer.alloc(width * height * 4);
  const paint = (x, y, rgba) => {
    cell.set(rgba, (y * width + x) * 4);
  };

  for (let y = 120; y < 172; y += 1) {
    for (let x = 0; x < 6; x += 1) paint(x, y, [40, 100, 220, 255]);
  }
  paint(6, 140, [40, 100, 220, 24]);
  paint(8, 140, [40, 100, 220, 24]);
  paint(3, 116, [40, 100, 220, 24]);
  for (let y = 100; y < 220; y += 1) {
    for (let x = 100; x < 220; x += 1) paint(x, y, [240, 200, 140, 255]);
  }

  removeBoundaryNoise(cell, width, height);

  assert.equal(cell[(140 * width + 0) * 4 + 3], 0, 'left-edge residue should be transparent');
  assert.equal(cell[(140 * width + 6) * 4 + 3], 0, 'left-edge antialias residue should be transparent');
  assert.equal(cell[(140 * width + 8) * 4 + 3], 0, 'left-edge outer antialias residue should be transparent');
  assert.equal(cell[(116 * width + 3) * 4 + 3], 0, 'left-edge upper antialias residue should be transparent');
  assert.equal(cell[(140 * width + 150) * 4 + 3], 255, 'main character pixels should remain opaque');
});
