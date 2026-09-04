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
const PORT = 3000;

// Robust assets middleware - serve /assets/* regardless of route prefix (e.g., /edit/assets/*)
app.use((req, res, next) => {
  const assetsIdx = req.path.indexOf('/assets/');
  if (assetsIdx !== -1) {
    const subPath = decodeURIComponent(req.path.substring(assetsIdx + 8));
    const fullPath = path.join(__dirname, 'assets', subPath);
    if (fs.existsSync(fullPath)) {
      return res.sendFile(fullPath);
    }
  }
  next();
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/edit/assets', express.static(path.join(__dirname, 'assets')));

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

// Serve static assets and files from root
app.use(express.static(__dirname));

// Local Editor & Annotation Mode routes
app.get('/edit', (req, res) => {
  res.set('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/edit/zh', (req, res) => {
  res.set('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/preview', (req, res) => {
  res.redirect('/edit');
});

// Primary entry point route (Finished Showcase Preview)
app.get('/', (req, res) => {
  res.set('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback route
app.get('*', (req, res) => {
  res.set('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
