const BASELINE_BEFORE_COMBAT_EXTENSION = Object.freeze([
  '16', '1', '6', '2', '3', '4', '5'
]);
const BASELINE_AFTER_COMBAT_EXTENSION = Object.freeze([
  '9', '10', '11', '12', '14', '8', '13', '7', '15'
]);
const BASELINE_KEY_ORDER = Object.freeze([
  ...BASELINE_BEFORE_COMBAT_EXTENSION,
  ...BASELINE_AFTER_COMBAT_EXTENSION
]);

const groups = Object.freeze({
  'evade-counter': Object.freeze([
    'C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07', 'C08', 'C09', 'C10'
  ]),
  'observe-understand-celebrate': Object.freeze([
    'D01', 'D02', 'D03', 'D04', 'D05', 'D06', 'D07', 'D08', 'D09', 'D10'
  ])
});

const keyFrames = Object.freeze([
  ...BASELINE_BEFORE_COMBAT_EXTENSION,
  ...groups['evade-counter'],
  ...BASELINE_AFTER_COMBAT_EXTENSION,
  ...groups['observe-understand-celebrate']
]);

const insertions = Object.freeze([
  Object.freeze({ after: 5, before: 9, group: 'evade-counter' }),
  Object.freeze({ after: 15, before: 16, group: 'observe-understand-celebrate' })
]);

const connections = Object.freeze(keyFrames.map((from, index) => ({
  from,
  to: keyFrames[(index + 1) % keyFrames.length]
})));

const frameLabels = Object.freeze(connections.flatMap(({ from, to }) => [
  `source-${from}`,
  ...Array.from({ length: 3 }, (_, transitionIndex) => (
    `transition-${from}-${to}-${transitionIndex + 1}`
  ))
]));

const baselineSourceDurations = Object.freeze(Object.fromEntries(
  BASELINE_KEY_ORDER.map((key, index) => [key, index <= 10 ? 400 : 600])
));

const expressiveSourceDurations = Object.freeze({
  D01: 550,
  D02: 650,
  D03: 700,
  D04: 750,
  D05: 900,
  D06: 900,
  D07: 750,
  D08: 600,
  D09: 850,
  D10: 1000
});

const expressiveTransitionDurations = Object.freeze({
  '15-D01': [150, 150, 300],
  'D01-D02': [180, 180, 360],
  'D02-D03': [220, 220, 440],
  'D03-D04': [220, 220, 440],
  'D04-D05': [240, 240, 480],
  'D05-D06': [260, 260, 520],
  'D06-D07': [240, 240, 480],
  'D07-D08': [200, 200, 400],
  'D08-D09': [220, 220, 440],
  'D09-D10': [280, 280, 560],
  'D10-16': [320, 320, 640]
});

function sourceDuration(key) {
  if (Object.hasOwn(expressiveSourceDurations, key)) {
    return expressiveSourceDurations[key];
  }
  if (key.startsWith('C')) {
    return 400;
  }
  return baselineSourceDurations[key];
}

function transitionDurations(from, to) {
  const id = `${from}-${to}`;
  if (Object.hasOwn(expressiveTransitionDurations, id)) {
    return expressiveTransitionDurations[id];
  }
  if (id === 'C10-9') {
    return [120, 120, 260];
  }
  if (id === '5-C01' || from.startsWith('C')) {
    return [90, 90, 180];
  }

  const baselineIndex = BASELINE_KEY_ORDER.indexOf(from);
  if (baselineIndex < 0) {
    throw new Error(`No timing class registered for ${id}`);
  }
  if (baselineIndex <= 9) {
    return [90, 90, 180];
  }
  if (baselineIndex === 10) {
    return [120, 120, 260];
  }
  if (baselineIndex <= 14) {
    return [150, 150, 300];
  }
  return [180, 180, 360];
}

const frameDurations = Object.freeze(connections.flatMap(({ from, to }) => [
  sourceDuration(from),
  ...transitionDurations(from, to)
]));

module.exports = Object.freeze({
  targetSize: 320,
  headAnchor: Object.freeze({ x: 132, y: 115 }),
  transitionsPerConnection: 3,
  groups,
  insertions,
  keyFrames,
  connections,
  frameLabels,
  frameCount: frameLabels.length,
  frameDurations,
  totalDurationMs: frameDurations.reduce((total, duration) => total + duration, 0)
});
