const fs = require('node:fs');
const path = require('node:path');

const sequence = require('./tech-stack-mascot-sequence');

const BASELINE_KEY_ORDER = Object.freeze([
  '16', '1', '6', '2', '3', '4', '5', '9', '10', '11', '12', '14', '8', '13', '7', '15'
]);

function pad(value, width) {
  return String(value).padStart(width, '0');
}

function connectionId(from, to) {
  return `${from}-${to}`;
}

function fileFor(directory, filename) {
  const filePath = path.join(directory, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing assembled source frame: ${filePath}`);
  }
  return filePath;
}

function indexedFileFor(directory, frameNumber) {
  for (const width of [3, 2]) {
    const filename = `frame-${pad(frameNumber, width)}.png`;
    const filePath = path.join(directory, filename);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  throw new Error(`Missing indexed source frame ${frameNumber} in ${directory}`);
}

function copyFrame(sourcePath, outputDir, frameNumber) {
  const outputPath = path.join(outputDir, `frame-${pad(frameNumber, 3)}.png`);
  fs.copyFileSync(sourcePath, outputPath);
  return outputPath;
}

function clearGeneratedFrames(outputDir) {
  if (!fs.existsSync(outputDir)) {
    return;
  }

  for (const entry of fs.readdirSync(outputDir, { withFileTypes: true })) {
    if (entry.isFile() && /^frame-\d+\.png$/i.test(entry.name)) {
      fs.unlinkSync(path.join(outputDir, entry.name));
    }
  }
}

function normalizeKeyPositions(baselineKeyPositions) {
  if (baselineKeyPositions) {
    return new Map(Object.entries(baselineKeyPositions));
  }
  return new Map(BASELINE_KEY_ORDER.map((key, index) => [key, index]));
}

function buildSequence({
  manifest = sequence,
  baselineDir,
  keyDir,
  transitionDir,
  outputDir,
  baselineKeyPositions,
  generatedKeys,
  generatedConnections,
  generatedKeyFiles
}) {
  const baselinePositions = normalizeKeyPositions(baselineKeyPositions);
  const generatedKeySet = generatedKeys
    ? new Set(generatedKeys)
    : new Set(manifest.keyFrames.filter((key) => !baselinePositions.has(key)));
  const generatedConnectionSet = generatedConnections
    ? new Set(generatedConnections)
    : new Set(manifest.connections
      .map(({ from, to }) => connectionId(from, to))
      .filter((id) => {
        const [from, to] = id.split('-');
        return generatedKeySet.has(from) || generatedKeySet.has(to);
      }));
  const generatedKeyOrder = manifest.keyFrames.filter((key) => generatedKeySet.has(key));
  const generatedKeyFileMap = generatedKeyFiles || {};

  if (!baselineDir || !keyDir || !transitionDir || !outputDir) {
    throw new Error('baselineDir, keyDir, transitionDir, and outputDir are required');
  }
  if (manifest.frameLabels.length !== manifest.frameCount) {
    throw new Error('Manifest frameLabels/frameCount mismatch');
  }
  if (manifest.transitionsPerConnection !== 3) {
    throw new Error('This assembler expects exactly three transition frames per connection');
  }

  fs.mkdirSync(outputDir, { recursive: true });
  clearGeneratedFrames(outputDir);

  let outputFrameNumber = 1;
  let generatedTransitionNumber = 1;
  const emittedLabels = [];

  for (const { from, to } of manifest.connections) {
    const sourceKey = from;
    if (generatedKeySet.has(sourceKey)) {
      const generatedIndex = generatedKeyOrder.indexOf(sourceKey);
      const generatedFilename = generatedKeyFileMap[sourceKey]
        || `frame-${pad(generatedIndex + 1, 2)}.png`;
      copyFrame(fileFor(keyDir, generatedFilename), outputDir, outputFrameNumber);
    } else {
      const baselinePosition = baselinePositions.get(sourceKey);
      if (baselinePosition === undefined) {
        throw new Error(`No baseline position registered for key frame ${sourceKey}`);
      }
      copyFrame(indexedFileFor(baselineDir, baselinePosition * 4 + 1), outputDir, outputFrameNumber);
    }
    emittedLabels.push(`source-${sourceKey}`);
    outputFrameNumber += 1;

    const id = connectionId(from, to);
    for (let transitionIndex = 0; transitionIndex < manifest.transitionsPerConnection; transitionIndex += 1) {
      if (generatedConnectionSet.has(id)) {
        copyFrame(
          indexedFileFor(transitionDir, generatedTransitionNumber),
          outputDir,
          outputFrameNumber
        );
        generatedTransitionNumber += 1;
      } else {
        const baselinePosition = baselinePositions.get(sourceKey);
        if (baselinePosition === undefined) {
          throw new Error(`No baseline transition position registered for key frame ${sourceKey}`);
        }
        copyFrame(
          indexedFileFor(baselineDir, baselinePosition * 4 + transitionIndex + 2),
          outputDir,
          outputFrameNumber
        );
      }
      emittedLabels.push(`transition-${from}-${to}-${transitionIndex + 1}`);
      outputFrameNumber += 1;
    }
  }

  if (generatedTransitionNumber !== generatedConnectionSet.size * manifest.transitionsPerConnection + 1) {
    throw new Error(`Generated transition count mismatch: consumed ${generatedTransitionNumber - 1}`);
  }
  if (emittedLabels.length !== manifest.frameCount || emittedLabels.join('|') !== manifest.frameLabels.join('|')) {
    throw new Error('Assembled labels do not match the manifest');
  }

  return {
    frameLabels: emittedLabels,
    frameCount: emittedLabels.length,
    outputDir
  };
}

if (require.main === module) {
  const [, , baselineDir = 'temp/tech-stack-64-frame-registered-v11', keyDir = 'temp/tech-stack-mascot-v3/key-normalized', transitionDir = 'temp/tech-stack-mascot-v3/transition-normalized', outputDir = 'temp/tech-stack-mascot-v3/sequence-source'] = process.argv;
  const result = buildSequence({ baselineDir, keyDir, transitionDir, outputDir });
  console.log(`Assembled ${result.frameCount} frames in ${result.outputDir}`);
}

module.exports = { buildSequence, connectionId };
