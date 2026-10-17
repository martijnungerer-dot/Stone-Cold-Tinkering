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
  const encoded = html.match(/href="data:image\/png;base64,([A-Za-z0-9+/=]+)"/);
  assert.ok(encoded, 'Een ingesloten stripplaat is vereist.');
  const original = await readFile(new URL('../assets/concepts/forward-v3.png', import.meta.url));
  const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
  assert.equal(digest(Buffer.from(encoded[1], 'base64')), digest(original));
  assert.match(html, /dialog.showModal\(\)/);
  assert.match(html, /prefers-reduced-motion/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /A much better path/);
});
