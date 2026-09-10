const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const COLUMNS = 5;
const ROWS = 2;

function computeGridEdges(total, cells) {
  if (!Number.isInteger(total) || total <= 0 || !Number.isInteger(cells) || cells <= 0) {
    throw new Error('total and cells must be positive integer values');
  }
  if (total < cells) throw new Error('total must be at least the number of cells');
  return Array.from({ length: cells + 1 }, (_, index) => Math.round((total * index) / cells));
}

function readPngDimensions(filePath) {
  const bytes = fs.readFileSync(filePath);
  if (bytes.toString('hex', 0, 8) !== '89504e470d0a1a0a') {
    throw new Error(`source is not a PNG: ${filePath}`);
  }
  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20)
  };
}

function cropSheet(sourcePath, outputDir, prefix, columns = COLUMNS, rows = ROWS) {
  const { width, height } = readPngDimensions(sourcePath);
  const xEdges = computeGridEdges(width, columns);
  const yEdges = computeGridEdges(height, rows);
  fs.mkdirSync(outputDir, { recursive: true });

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const index = row * columns + column + 1;
      const x = xEdges[column];
      const y = yEdges[row];
      const cellWidth = xEdges[column + 1] - x;
      const cellHeight = yEdges[row + 1] - y;
      const outputPath = path.join(outputDir, `${prefix}${String(index).padStart(2, '0')}.png`);
      const filter = `crop=${cellWidth}:${cellHeight}:${x}:${y},format=rgba`;
      execFileSync('ffmpeg', [
        '-y',
        '-loglevel',
        'error',
        '-i',
        sourcePath,
        '-vf',
        filter,
        '-frames:v',
        '1',
        '-pix_fmt',
        'rgba',
        outputPath
      ], { stdio: ['ignore', 'pipe', 'pipe'] });
    }
  }

  return { width, height, xEdges, yEdges };
}

function main() {
  const [sourcePath, outputDir, prefix, columnsArg, rowsArg] = process.argv.slice(2);
  if (!sourcePath || !outputDir || !prefix) {
    console.error('Usage: node scripts/crop-generated-mascot-sheet.js <source.png> <output-dir> <prefix> [columns] [rows]');
    process.exitCode = 1;
    return;
  }
  const columns = columnsArg ? Number(columnsArg) : COLUMNS;
  const rows = rowsArg ? Number(rowsArg) : ROWS;
  const grid = cropSheet(sourcePath, outputDir, prefix, columns, rows);
  console.log(`[generated-sheet-crop] ${prefix}: ${grid.width}x${grid.height} -> ${outputDir}`);
}

module.exports = { computeGridEdges, cropSheet };
if (require.main === module) main();
