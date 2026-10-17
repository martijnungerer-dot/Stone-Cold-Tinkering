import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
export async function buildOffline(destination = path.join(root, 'dist', 'reader-offline.html')) {
  const [html, css, data, app, image, head] = await Promise.all([
    readFile(path.join(root, 'reader/index.html'), 'utf8'),
    readFile(path.join(root, 'reader/styles.css'), 'utf8'),
    readFile(path.join(root, 'reader/scene-data.js'), 'utf8'),
    readFile(path.join(root, 'reader/app.js'), 'utf8'),
    readFile(path.join(root, 'assets/concepts/forward-v3.png')),
    readFile(path.join(root, 'assets/concepts/nicola-reader-head-v1.png'))
  ]);
  const output = html
    .replace('<link rel="stylesheet" href="styles.css">', () => `<style>${css}</style>`)
    .replace('<script src="scene-data.js" defer></script>', '')
    .replace('<script src="app.js" defer></script>', '')
    .replace('href="assets/forward-v3.png"', () => `href="data:image/png;base64,${image.toString('base64')}"`)
    .replace('href="assets/nicola-reader-head-v1.png"', () => `href="data:image/png;base64,${head.toString('base64')}"`)
    .replace('</body>', () => `<script>${data}</script><script>${app}</script></body>`);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, output, 'utf8');
  return destination;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(await buildOffline());
}
