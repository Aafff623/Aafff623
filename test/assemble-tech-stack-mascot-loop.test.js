const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { buildSequence } = require('../scripts/assemble-tech-stack-mascot-loop');

function writeMarker(directory, name, marker) {
  fs.writeFileSync(path.join(directory, name), marker, 'utf8');
}

test('the loop assembler preserves baseline frames and inserts generated transitions', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'tech-stack-loop-'));
  const baselineDir = path.join(root, 'baseline');
  const keyDir = path.join(root, 'keys');
  const transitionDir = path.join(root, 'transitions');
  const outputDir = path.join(root, 'output');
  for (const directory of [baselineDir, keyDir, transitionDir]) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const manifest = {
    keyFrames: ['A', 'B', 'C'],
    connections: [
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C' },
      { from: 'C', to: 'A' }
    ],
    frameLabels: [
      'source-A', 'transition-A-B-1', 'transition-A-B-2', 'transition-A-B-3',
      'source-B', 'transition-B-C-1', 'transition-B-C-2', 'transition-B-C-3',
      'source-C', 'transition-C-A-1', 'transition-C-A-2', 'transition-C-A-3'
    ],
    frameCount: 12,
    transitionsPerConnection: 3
  };

  writeMarker(baselineDir, 'frame-001.png', 'baseline-A');
  writeMarker(baselineDir, 'frame-002.png', 'baseline-A-t1');
  writeMarker(baselineDir, 'frame-003.png', 'baseline-A-t2');
  writeMarker(baselineDir, 'frame-004.png', 'baseline-A-t3');
  writeMarker(baselineDir, 'frame-005.png', 'baseline-B');
  writeMarker(baselineDir, 'frame-006.png', 'baseline-B-t1');
  writeMarker(baselineDir, 'frame-007.png', 'baseline-B-t2');
  writeMarker(baselineDir, 'frame-008.png', 'baseline-B-t3');
  writeMarker(keyDir, 'frame-C.png', 'generated-C');
  writeMarker(transitionDir, 'frame-001.png', 'generated-C-t1');
  writeMarker(transitionDir, 'frame-002.png', 'generated-C-t2');
  writeMarker(transitionDir, 'frame-003.png', 'generated-C-t3');

  const result = buildSequence({
    manifest,
    baselineDir,
    keyDir,
    transitionDir,
    outputDir,
    baselineKeyPositions: { A: 0, B: 1 },
    generatedKeys: new Set(['C']),
    generatedKeyFiles: { C: 'frame-C.png' },
    generatedConnections: new Set(['C-A'])
  });

  assert.equal(result.frameLabels.length, 12);
  assert.deepEqual(
    result.frameLabels.map((_, index) => fs.readFileSync(path.join(outputDir, `frame-${String(index + 1).padStart(3, '0')}.png`), 'utf8')),
    [
      'baseline-A', 'baseline-A-t1', 'baseline-A-t2', 'baseline-A-t3',
      'baseline-B', 'baseline-B-t1', 'baseline-B-t2', 'baseline-B-t3',
      'generated-C', 'generated-C-t1', 'generated-C-t2', 'generated-C-t3'
    ]
  );
});
