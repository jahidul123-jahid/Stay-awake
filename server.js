const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX_PATH = path.join(__dirname, 'index.html');

let indexHtml = '';
try {
  indexHtml = fs.readFileSync(INDEX_PATH);
} catch (e) {
  console.error('Could not load index.html:', e);
}

const server = http.createServer((req, res) => {
  // If indexHtml was somehow not loaded, try to load it again
  if (!indexHtml) {
    try {
      indexHtml = fs.readFileSync(INDEX_PATH);
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Error loading index.html: ' + e.message);
      return;
    }
  }

  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'public, max-age=0, must-revalidate'
  });
  res.end(indexHtml);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

module.exports = server;
