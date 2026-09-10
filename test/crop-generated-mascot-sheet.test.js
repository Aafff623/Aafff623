const test = require('node:test');
const assert = require('node:assert/strict');

const { computeGridEdges } = require('../scripts/crop-generated-mascot-sheet');

test('generated sprite sheets split uneven dimensions without cumulative drift', () => {
  assert.deepEqual(computeGridEdges(1983, 5), [0, 397, 793, 1190, 1586, 1983]);
  assert.deepEqual(computeGridEdges(793, 2), [0, 397, 793]);
  assert.deepEqual(computeGridEdges(1983, 3), [0, 661, 1322, 1983]);
});

test('generated sprite sheet grid rejects invalid dimensions', () => {
  assert.throws(() => computeGridEdges(0, 5), /positive integer/);
  assert.throws(() => computeGridEdges(1983, 0), /positive integer/);
  assert.throws(() => computeGridEdges(1983, 4.5), /positive integer/);
});
