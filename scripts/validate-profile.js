const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const EN_PATH = path.join(ROOT, 'README.md');
const ZH_PATH = path.join(ROOT, 'README.zh.md');
const INDEX_PATH = path.join(ROOT, 'index.html');
const SERVER_PATH = path.join(ROOT, 'server.js');

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function count(text, pattern) {
  return (text.match(pattern) || []).length;
}

function uniqueMatches(text, pattern) {
  return [...text.matchAll(pattern)].map(match => match[1]).sort();
}

function fail(message) {
  throw new Error(`[profile-check] ${message}`);
}

const en = read(EN_PATH);
const zh = read(ZH_PATH);
const index = read(INDEX_PATH);
const server = read(SERVER_PATH);

const pairedTags = [
  ['table', /<table\b/gi, /<\/table\s*>/gi],
  ['picture', /<picture\b/gi, /<\/picture\s*>/gi],
  ['tr', /<tr\b/gi, /<\/tr\s*>/gi],
  ['td', /<td\b/gi, /<\/td\s*>/gi],
  ['a', /<a\b/gi, /<\/a\s*>/gi],
  ['h1-h6', /<h[1-6]\b/gi, /<\/h[1-6]\s*>/gi]
];

for (const [name, openPattern, closePattern] of pairedTags) {
  const enOpen = count(en, openPattern);
  const enClose = count(en, closePattern);
  const zhOpen = count(zh, openPattern);
  const zhClose = count(zh, closePattern);

  if (enOpen !== enClose || zhOpen !== zhClose) {
    fail(`${name} tags are unbalanced: EN ${enOpen}/${enClose}, ZH ${zhOpen}/${zhClose}`);
  }
  if (enOpen !== zhOpen || enClose !== zhClose) {
    fail(`${name} structure differs: EN ${enOpen}/${enClose}, ZH ${zhOpen}/${zhClose}`);
  }
}

const enUrls = uniqueMatches(en, /href="(https?:\/\/[^"#]+)/gi);
const zhUrls = uniqueMatches(zh, /href="(https?:\/\/[^"#]+)/gi);
if (JSON.stringify(enUrls) !== JSON.stringify(zhUrls)) {
  fail('English and Chinese external links differ');
}

const localAssetPattern = /(?:src|srcset)="\.\/assets\/([^"?\s]+)/gi;
const enAssets = uniqueMatches(en, localAssetPattern);
const zhAssets = uniqueMatches(zh, localAssetPattern);
const allAssets = [...new Set([...enAssets, ...zhAssets])];
for (const asset of allAssets) {
  if (!fs.existsSync(path.join(ROOT, 'assets', asset))) {
    fail(`missing local asset: assets/${asset}`);
  }
}

if (index.includes('Latest commit: 40e7081')) {
  fail('index.html contains a stale hard-coded commit label');
}
if (server.includes("express.static(__dirname)")) {
  fail('server.js must not expose the project root as static content');
}
if (server.includes("app.get('*'")) {
  fail('server.js must not turn missing routes into successful preview pages');
}

console.log(`[profile-check] passed: ${enUrls.length} links, ${allAssets.length} local assets, ${enOpenCount(en)} paired HTML structures`);

function enOpenCount(text) {
  return count(text, /<table\b/gi) + count(text, /<picture\b/gi);
}
