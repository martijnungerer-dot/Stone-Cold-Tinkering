import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { buildOffline } from '../scripts/build-offline.mjs';

test('de offline reader bevat de echte bronplaat, alle bediening en geen externe bestanden', async (t) => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'stone-cold-offline-'));
  t.after(async () => {
    const resolved = path.resolve(directory);
    assert.equal(path.dirname(resolved), path.resolve(os.tmpdir()));
    assert.match(path.basename(resolved), /^stone-cold-offline-/);
    await rm(resolved, { recursive: true, force: true });
  });
  const destination = await buildOffline(path.join(directory, 'reader.html'));
  const html = await readFile(destination, 'utf8');
  assert.doesNotMatch(html, /<script[^>]+src=/i);
  assert.doesNotMatch(html, /<link[^>]+rel="stylesheet"/i);
  const encoded = [...html.matchAll(/href="data:image\/png;base64,([A-Za-z0-9+/=]+)"/g)];
  assert.equal(encoded.length, 2, 'De stripplaat en de naar de lezer gedraaide kop zitten beide in het bestand.');
  const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
  for (const [index, name] of ['forward-v3.png', 'nicola-reader-head-v1.png'].entries()) {
    const original = await readFile(new URL(`../assets/concepts/${name}`, import.meta.url));
    assert.equal(digest(Buffer.from(encoded[index][1], 'base64')), digest(original));
  }
  assert.doesNotMatch(html, /<dialog|showModal|::backdrop/);
  assert.match(html, /aria-controls="nicola-balloon"/);
  assert.match(html, /class="nicola-facing-head"/);
  assert.match(html, /\.is-looking \.nicola-facing-head\{opacity:1/);
  assert.match(html, /prefers-reduced-motion/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /A much better path/);
});
