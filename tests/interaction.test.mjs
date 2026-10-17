import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

// In-process DOM double: exercises the real reader logic without pretending to
// verify browser layout, browser focus trapping, audio hardware or rendering.
test('de reader bewaart paneelvolgorde, optioneel perspectief en veilige voorkeuren', async () => {
  let document;
  class Element {
    constructor(tag = 'div') { this.tagName = tag.toUpperCase(); this.children = []; this.attrs = new Map(); this.listeners = new Map(); this.dataset = {}; this._text = ''; this.style = { setProperty() {} }; this.open = false; this.isConnected = true; const classes = new Set(); this.classList = { add: (...names) => names.forEach((name) => classes.add(name)), remove: (...names) => names.forEach((name) => classes.delete(name)), contains: (name) => classes.has(name) }; }
    set textContent(value) { this._text = value; this.children = []; }
    get textContent() { return this._text + this.children.map((child) => child.textContent).join(''); }
    setAttribute(name, value) { this.attrs.set(name, String(value)); }
    getAttribute(name) { return this.attrs.get(name); }
    removeAttribute(name) { this.attrs.delete(name); }
    append(...children) { this.children.push(...children); }
    replaceChildren(...children) { this._text = ''; this.children = children; }
    addEventListener(name, handler) { this.listeners.set(name, handler); }
    fire(name, props = {}) { this.listeners.get(name)?.({ target: this, currentTarget: this, ...props }); }
    focus() { document.activeElement = this; }
    showModal() { this.open = true; }
    close() { this.open = false; this.fire('close'); }
  }
  const elements = new Map();
  const $ = (id) => { if (!elements.has(id)) elements.set(id, new Element()); return elements.get(id); };
  const steps = [0, 1, 2].map((index) => { const element = new Element('button'); element.dataset.panel = String(index); return element; });
  const image = new Element('image'); image.setAttribute('href', 'assets/forward-v3.png');
  document = new Element();
  Object.assign(document, { body: new Element('body'), getElementById: $, createElement: (tag) => new Element(tag), createTextNode: (value) => { const node = new Element(); node.textContent = value; return node; }, createDocumentFragment: () => new Element(), querySelectorAll: () => steps, querySelector: () => image });
  const storage = new Map();
  let audioAccesses = 0;
  const window = { matchMedia: () => ({ matches: true, addEventListener() {} }) };
  Object.defineProperty(window, 'AudioContext', { get() { audioAccesses++; return undefined; } });
  const context = vm.createContext({ window, document, localStorage: { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) }, Image: class {}, setTimeout: () => 1, clearTimeout() {}, console });
  vm.runInContext(await readFile(new URL('../reader/scene-data.js', import.meta.url), 'utf8'), context);
  vm.runInContext(await readFile(new URL('../reader/app.js', import.meta.url), 'utf8'), context);

  assert.equal($('current-number').textContent, '01');
  assert.equal($('previous').disabled, true);
  assert.equal(document.body.dataset.motion, 'off', 'De systeemvoorkeur voor minder beweging is het startpunt.');
  assert.equal(audioAccesses, 0, 'Geen audio-initialisatie voor een gebruikersactie.');
  $('next').fire('click');
  assert.equal($('current-number').textContent, '02');
  const viewBox = $('scene-art').getAttribute('viewBox');
  $('nicola-open').fire('click');
  assert.equal($('nicola-dialog').open, true);
  const firstTheory = $('nicola-comment').textContent;
  $('nicola-another').fire('click');
  assert.notEqual($('nicola-comment').textContent, firstTheory);
  assert.equal($('scene-art').getAttribute('viewBox'), viewBox, 'Een theorie verandert de verhaalpositie niet.');
  $('next').fire('click');
  assert.equal($('current-number').textContent, '02', 'Bladeren achter de dialoog is geblokkeerd.');
  $('nicola-close').fire('click');
  assert.equal(document.activeElement, $('nicola-open'), 'Focus keert terug naar de opener.');
  $('next').fire('click');
  assert.equal($('current-number').textContent, '03');
  assert.match($('next').textContent, /Opnieuw lezen/);
  assert.match($('quote-text').textContent, /A much better path/);
  document.fire('keydown', { key: 'ArrowRight', preventDefault() {} });
  assert.equal($('current-number').textContent, '03', 'De rechterpijl blijft aan het einde begrensd.');
  $('next').fire('click');
  assert.equal($('current-number').textContent, '01');
  document.fire('keydown', { key: 'ArrowLeft', preventDefault() {} });
  assert.equal($('current-number').textContent, '01');
  steps[1].fire('click');
  assert.equal($('current-number').textContent, '02');
  $('motion-toggle').fire('click');
  assert.equal(storage.get('stone-cold-motion'), 'on');
  $('motion-toggle').fire('click');
  assert.equal(document.body.dataset.motion, 'off');
  assert.equal($('art-stage').classList.contains('is-animating'), false);
  $('sound-toggle').fire('click');
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(audioAccesses, 1);
  assert.equal($('sound-label').textContent, 'Geluid uit');
  assert.match($('audio-announcement').textContent, /niet beschikbaar/);
  assert.equal($('transcript-content').children[0].children.length, 3);
});
