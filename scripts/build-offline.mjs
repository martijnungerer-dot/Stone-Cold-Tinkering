import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileEpisode, transcriptHTML } from './compile-episode.mjs';

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

export async function buildEpisodeOffline(destination = path.join(root, 'dist', 'frozen-hollow.html')) {
  const episode = await compileEpisode({ write: false });
  const [html, css, extraCSS, app, head] = await Promise.all([
    readFile(path.join(root, 'reader/frozen-hollow.html'), 'utf8'),
    readFile(path.join(root, 'reader/styles.css'), 'utf8'),
    readFile(path.join(root, 'reader/episode.css'), 'utf8'),
    readFile(path.join(root, 'reader/episode.js'), 'utf8'),
    readFile(path.join(root, 'assets/concepts/nicola-reader-head-v2.png'))
  ]);
  for (const [key, asset] of Object.entries(episode.assets)) {
    const bytes = await readFile(path.join(root, 'assets/episodes/frozen-hollow', key + '.png'));
    asset.src = `data:image/png;base64,${bytes.toString('base64')}`;
  }
  const data = `window.COMIC_EPISODE = ${JSON.stringify(episode).replaceAll('<','\\u003c')};`;
  const output = html
    .replace('<link rel="stylesheet" href="styles.css">', () => `<style>${css}</style>`)
    .replace('<link rel="stylesheet" href="episode.css">', () => `<style>${extraCSS}</style>`)
    .replace('<script src="frozen-hollow-data.js" defer></script>', '')
    .replace('<script src="episode.js" defer></script>', '')
    .replace('href="assets/nicola-reader-head-v2.png"', () => `href="data:image/png;base64,${head.toString('base64')}"`)
    .replace('<!--EPISODE_TRANSCRIPT-->', () => transcriptHTML(episode))
    .replace('</body>', () => `<script>${data}</script><script>${app}</script></body>`);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, output, 'utf8');
  return destination;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(await buildOffline());
  console.log(await buildEpisodeOffline());
}
