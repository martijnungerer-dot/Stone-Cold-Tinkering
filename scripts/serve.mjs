import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileEpisode } from './compile-episode.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const routes = new Map([
  ['/', ['reader/index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['reader/index.html', 'text/html; charset=utf-8']],
  ['/styles.css', ['reader/styles.css', 'text/css; charset=utf-8']],
  ['/app.js', ['reader/app.js', 'text/javascript; charset=utf-8']],
  ['/scene-data.js', ['reader/scene-data.js', 'text/javascript; charset=utf-8']],
  ['/frozen-hollow', ['reader/frozen-hollow.html', 'text/html; charset=utf-8']],
  ['/frozen-hollow.html', ['reader/frozen-hollow.html', 'text/html; charset=utf-8']],
  ['/episode.css', ['reader/episode.css', 'text/css; charset=utf-8']],
  ['/episode.js', ['reader/episode.js', 'text/javascript; charset=utf-8']],
  ['/frozen-hollow-data.js', ['reader/frozen-hollow-data.js', 'text/javascript; charset=utf-8']],
  ['/assets/forward-v3.png', ['assets/concepts/forward-v3.png', 'image/png']],
  ['/assets/nicola-reader-head-v1.png', ['assets/concepts/nicola-reader-head-v1.png', 'image/png']]
]);
for (const key of ['arrival','hollow','breakthrough','aftermath','stash-after','chamber-two-v2']) routes.set(`/assets/frozen-hollow/${key}.png`, [`assets/episodes/frozen-hollow/${key}.png`, 'image/png']);

export function createReaderHandler() {
  return async (request, response) => {
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Referrer-Policy', 'no-referrer');
    response.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'self'");
    if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405, { Allow: 'GET, HEAD' }); response.end('Alleen lezen.'); return; }
    let pathname;
    try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); } catch { response.writeHead(400); response.end('Ongeldig adres.'); return; }
    const route = routes.get(pathname);
    if (!route) { response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); response.end('Deze pagina bestaat niet.'); return; }
    try {
      const filename = path.join(projectRoot, route[0]);
      const info = await stat(filename);
      response.writeHead(200, { 'Content-Type': route[1], 'Content-Length': info.size, 'Cache-Control': route[1] === 'image/png' ? 'private, max-age=3600' : 'no-store' });
      if (request.method === 'HEAD') response.end(); else response.end(await readFile(filename));
    } catch { if (!response.headersSent) response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }); response.end('Een bestand ontbreekt. Controleer de lokale projectmap.'); }
  };
}

export function createReaderServer() { return http.createServer(createReaderHandler()); }

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await compileEpisode();
  let port = Number(process.env.PORT || 4173);
  if (!Number.isInteger(port) || port < 1 || port > 65515) throw new Error('Kies een geldige lokale poort.');
  const server = createReaderServer();
  for (let attempt = 0; ; attempt++, port++) {
    try {
      await new Promise((resolve, reject) => { server.once('error', reject); server.listen(port, '127.0.0.1', resolve); });
      server.removeAllListeners('error');
      break;
    } catch (error) { if (error.code !== 'EADDRINUSE' || attempt >= 19) throw error; }
  }
  console.log(`Local: http://127.0.0.1:${port}/frozen-hollow`);
  console.log(`Proef: http://127.0.0.1:${port}/`);
  console.log('Stone & Cold Tinkering — Frozen Hollow. Stoppen met Ctrl+C.');
  process.on('SIGINT', () => server.close(() => process.exit(0)));
}
