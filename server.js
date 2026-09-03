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

// API endpoint returning parsed English and Chinese profiles
app.get('/api/profile', (req, res) => {
  try {
    const enPath = path.join(__dirname, 'README.md');
    const zhPath = path.join(__dirname, 'README.zh.md');
    const enMd = fs.existsSync(enPath) ? fs.readFileSync(enPath, 'utf8') : '';
    const zhMd = fs.existsSync(zhPath) ? fs.readFileSync(zhPath, 'utf8') : '';

    res.json({
      enHtml: marked.parse(enMd),
      zhHtml: marked.parse(zhMd),
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve static assets and files from root
app.use(express.static(__dirname));

// Primary entry point route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
