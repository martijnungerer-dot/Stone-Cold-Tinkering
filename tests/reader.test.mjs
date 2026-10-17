import test from 'node:test';
import assert from 'node:assert/strict';
import { createReaderHandler } from '../scripts/serve.mjs';

test('de lokale reader levert de scène en bewaakt de publieke bestandsgrens', async () => {
  const handler = createReaderHandler();
  async function request(url, method = 'GET') {
    const headers = new Map();
    const result = { status: 200, body: Buffer.alloc(0), headers };
    const response = {
      headersSent: false,
      setHeader(name, value) { headers.set(name.toLowerCase(), value); },
      writeHead(status, values = {}) { result.status = status; this.headersSent = true; Object.entries(values).forEach(([name, value]) => this.setHeader(name, value)); },
      end(body) { result.body = Buffer.from(body || ''); }
    };
    await handler({ url, method }, response);
    return result;
  }
  const home = await request('/');
  assert.equal(home.status, 200);
  assert.match(home.body.toString(), /Altijd <em>voorwaarts\./);
  assert.equal(home.headers.get('cache-control'), 'no-store');
  const data = await request('/scene-data.js');
  assert.equal(data.status, 200);
  assert.match(data.body.toString(), /A much better path/);
  const image = await request('/assets/forward-v3.png');
  assert.equal(image.status, 200);
  assert.equal(image.headers.get('content-type'), 'image/png');
  const bytes = image.body;
  assert.deepEqual([...bytes.slice(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  const readerHead = await request('/assets/nicola-reader-head-v1.png');
  assert.equal(readerHead.status, 200);
  assert.equal(readerHead.headers.get('content-type'), 'image/png');
  assert.deepEqual([...readerHead.body.slice(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  for (const route of ['/.git/config', '/WORLDBUILDING.md', '/content/episodes/frozen-hollow/STORYBOARD.md', '/assets/%2e%2e%2f.git/config', '/not-found']) {
    assert.equal((await request(route)).status, 404, route);
  }
  assert.equal((await request('/%ZZ')).status, 400);
  assert.equal((await request('/', 'POST')).status, 405);
  const head = await request('/assets/forward-v3.png', 'HEAD');
  assert.equal(head.status, 200);
  assert.equal(head.body.byteLength, 0);
});
