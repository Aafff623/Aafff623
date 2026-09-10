const express = require('express');
const path = require('path');
const fs = require('fs');
const { marked } = require('marked');

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: false
});

const app = express();
const HOST = process.env.HOST || '127.0.0.1';
const PORT = Number.parseInt(process.env.PORT || '3000', 10);
const ASSETS_DIR = path.join(__dirname, 'assets');
const PREVIEW_PATH = path.join(__dirname, 'index.html');

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error(`Invalid PORT: ${process.env.PORT}`);
}

app.disable('x-powered-by');

// Only expose the published local assets. Do not serve the project root.
app.use('/assets', express.static(ASSETS_DIR, { fallthrough: false }));

// API endpoint returning parsed English and Chinese profiles
app.get('/api/profile', (req, res) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    const enPath = path.join(__dirname, 'README.md');
    const zhPath = path.join(__dirname, 'README.zh.md');
    const enMd = fs.existsSync(enPath) ? fs.readFileSync(enPath, 'utf8') : '';
    const zhMd = fs.existsSync(zhPath) ? fs.readFileSync(zhPath, 'utf8') : '';

    const normalizeAssets = (html) => html.replace(/(src|srcset)=["']\.\/assets\//g, '$1="/assets/');

    res.json({
      enHtml: normalizeAssets(marked.parse(enMd)),
      zhHtml: normalizeAssets(marked.parse(zhMd)),
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function sendPreview(req, res) {
  res.set('Cache-Control', 'no-cache');
  res.sendFile(PREVIEW_PATH);
}

// Local Showcase and Editor & Annotation Mode routes
app.get(['/', '/edit', '/edit/zh'], sendPreview);

app.get('/preview', (req, res) => {
  res.redirect('/edit');
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    return res.status(404).json({ error: 'Not found' });
  }
  next(err);
});

// Missing files and routes must remain real 404s, especially under /assets.
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

if (require.main === module) {
  app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
  });
}

module.exports = { app };
