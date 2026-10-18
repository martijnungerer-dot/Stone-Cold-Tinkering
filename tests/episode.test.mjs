import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import os from 'node:os';
import { compileEpisode } from '../scripts/compile-episode.mjs';
import { buildEpisodeOffline } from '../scripts/build-offline.mjs';

async function reader(hash = '', options = {}) {
  let document, audioAccesses = 0;
  class Element {
    constructor(tag = 'div') {
      this.tagName = tag.toUpperCase(); this.children = []; this.attrs = new Map(); this.listeners = new Map(); this.dataset = {}; this._text = ''; this.isConnected = true; this.style = { setProperty() {} };
      const classes = new Set(); this.classList = { add: (...a) => a.forEach(n => classes.add(n)), remove: (...a) => a.forEach(n => classes.delete(n)), contains: n => classes.has(n) };
    }
    set textContent(t) { this._text = t; this.children = []; }
    get textContent() { return this._text + this.children.map(c => c.textContent).join(''); }
    setAttribute(k,v) { this.attrs.set(k,String(v)); } getAttribute(k) { return this.attrs.get(k); } removeAttribute(k) { this.attrs.delete(k); }
    append(...a) { this.children.push(...a); } replaceChildren(...a) { this._text = ''; this.children = a; }
    addEventListener(k,h) { this.listeners.set(k,h); }
    fire(k,p = {}) { return this.listeners.get(k)?.({ target: this, currentTarget: this, preventDefault() {}, ...p }); }
    focus() { document.activeElement = this; }
    scrollIntoView(options) { this.scrollOptions = options; }
  }
  const elements = new Map(), $ = id => { if (!elements.has(id)) elements.set(id,new Element()); return elements.get(id); };
  document = new Element(); Object.assign(document,{ body:new Element('body'), getElementById:$, createElement:tag => new Element(tag) });
  const layout = new Element(); layout.append($('comic-reader')); layout.parentElement = document.body;
  $('comic-reader').parentElement = layout; document.body.append(layout,$('motion-toggle'));
  if (options.nativeFullscreen) {
    document.fullscreenEnabled = true;
    $('comic-reader').requestFullscreen = async () => {
      if (options.rejectFullscreen) throw new Error('Fullscreen denied');
      document.fullscreenElement = $('comic-reader'); document.fire('fullscreenchange');
    };
    document.exitFullscreen = async () => { document.fullscreenElement = null; document.fire('fullscreenchange'); };
  }
  const storage = new Map(), window = { COMIC_EPISODE:await compileEpisode({write:false}), matchMedia:() => ({matches:true,addEventListener(){}}), location:{hash}, history:{replaceState(a,b,c){window.location.hash=c;}} };
  Object.defineProperty(window,'AudioContext',{get(){audioAccesses++;return undefined;}});
  const context = vm.createContext({window,document,localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v)},Image:class{},setTimeout:()=>1,clearTimeout(){},console});
  vm.runInContext(await readFile(new URL('../reader/episode.js',import.meta.url),'utf8'),context);
  return {$,document,window,storage,audioAccesses:()=>audioAccesses};
}

test('Frozen Hollow bewaart alle ankers, 35 panelen en de gecorrigeerde chronologie', async () => {
  const e = await compileEpisode({write:false});
  assert.equal(e.panels.length,35); assert.equal(new Set(e.panels.map(p=>p.id)).size,35);
  const ids=e.panels.map(p=>p.id);
  assert.deepEqual(ids.slice(0,4),['P07','P08','P09','P01']);
  assert.ok(ids.indexOf('P25') < ids.indexOf('P19'));
  assert.deepEqual(ids.slice(ids.indexOf('P27'),ids.indexOf('P27')+2),['P27','P30']);
  assert.ok(!ids.includes('P28')&&!ids.includes('P29')&&!ids.includes('P36'));
  assert.deepEqual(ids.slice(ids.indexOf('P35'),ids.indexOf('P35')+2),['P35','P37']);
  assert.equal(e.panels.find(p=>p.id==='P23').location,'Kamer 2');
  assert.match(e.panels.find(p=>p.id==='P19').description,/mist naar de derde kamer/);
  assert.match(e.panels.find(p=>p.id==='P27').narration,/staan nog/);
  assert.match(e.panels.find(p=>p.id==='P30').narration,/volgende ronde.*samen/);
  assert.match(e.panels.find(p=>p.id==='P38').dialogue.at(-1).text,/Make it stay/);
  assert.equal(Object.values(e.panels.find(p=>p.id==='P17').perspectives).flat().length,6);
  for(const p of e.panels){const a=e.assets[p.art.key];assert.ok(a,p.id);assert.ok(p.art.cell>=0 && p.art.cell<a.columns*a.rows,p.id);assert.ok(p.description&&p.narration);if(p.theories?.length)assert.ok(p.head,p.id);}
  const allWords=e.panels.flatMap(p=>p.dialogue.map(l=>l.text)).join('\n');
  assert.match(allWords,/Retreat is for meat\. I am stone, and stone loves metal! Give me metal!/);
  assert.match(allWords,/Cold blue, horrid!/); assert.match(allWords,/Your perception is flawless/);
  assert.doesNotMatch(allWords,/NICOLA! HEAL|NOTHING CAN BREAK ME/,'De voorgestelde healinggebeurtenis wordt niet toegevoegd.');
});

test('zijpijlen volgen de leeslijn en de grote leesweergave bewaart reacties en grenzen', async()=>{
  const {$,window,document}=await reader('#P03');
  $('scene-previous').fire('click');assert.equal(window.location.hash,'#P02');
  await $('fullscreen-toggle').fire('click');
  assert.equal($('comic-reader').classList.contains('is-expanded'),true);
  assert.equal(document.body.classList.contains('has-expanded-reader'),true);
  assert.equal($('motion-toggle').inert,true,'Bediening buiten de leesweergave krijgt geen onzichtbare toetsenbordfocus.');
  assert.equal($('fullscreen-toggle').getAttribute('aria-pressed'),'true');
  assert.match($('display-announcement').textContent,/binnen dit venster/);
  $('nicola-hotspot').fire('click');assert.equal($('nicola-balloon').hidden,false);
  document.fire('keydown',{key:'Escape'});assert.equal($('nicola-balloon').hidden,true);assert.equal($('comic-reader').classList.contains('is-expanded'),true);
  $('scene-next').fire('click');assert.equal(window.location.hash,'#P03');assert.equal($('comic-reader').classList.contains('is-expanded'),true);
  document.fire('keydown',{key:'Escape'});assert.equal($('comic-reader').classList.contains('is-expanded'),false);assert.equal(document.activeElement,$('fullscreen-toggle'));
  assert.equal($('motion-toggle').inert,false);
  const start=await reader('#P07');assert.equal(start.$('scene-previous').disabled,true);start.$('scene-previous').fire('click');assert.equal(start.window.location.hash,'#P07');
  const end=await reader('#P38');assert.equal(end.$('scene-next').disabled,true);end.$('scene-next').fire('click');assert.equal(end.window.location.hash,'#P38');
});

test('native fullscreen kan terugkeren en een geweigerd verzoek behoudt de leesmogelijkheid', async()=>{
  const {$,document}=await reader('#P25',{nativeFullscreen:true});
  await $('fullscreen-toggle').fire('click');assert.equal(document.fullscreenElement,$('comic-reader'));
  $('krek-hotspot').fire('click');assert.equal($('krek-comment').textContent,'Forward?');
  await document.exitFullscreen();assert.equal($('fullscreen-toggle').getAttribute('aria-pressed'),'false');assert.equal($('comic-reader').classList.contains('is-expanded'),false);
  await $('fullscreen-toggle').fire('click');await $('fullscreen-toggle').fire('click');assert.equal(document.fullscreenElement,null);assert.equal(document.body.classList.contains('has-expanded-reader'),false);
  const denied=await reader('#P03',{nativeFullscreen:true,rejectFullscreen:true});await denied.$('fullscreen-toggle').fire('click');
  assert.equal(denied.$('comic-reader').classList.contains('is-expanded'),true);assert.match(denied.$('display-announcement').textContent,/binnen dit venster/);
  await denied.$('fullscreen-toggle').fire('click');assert.equal(denied.$('comic-reader').classList.contains('is-expanded'),false);
});

test('de volledige reader loopt door alle panelen en houdt optionele inhoud binnen hetzelfde verhaal', async () => {
  const {$,document,window,storage,audioAccesses}=await reader();
  assert.equal($('current-number').textContent,'01'); assert.equal(document.body.dataset.motion,'off'); assert.equal(audioAccesses(),0);
  for(let i=0;i<window.COMIC_EPISODE.panels.length;i++){
    const p=window.COMIC_EPISODE.panels[i];assert.equal(window.location.hash,'#'+p.id);assert.equal($('current-number').textContent,String(i+1).padStart(2,'0'));
    assert.match($('scene-image').getAttribute('href'),/assets\/frozen-hollow\//);
    if(p.id==='P02'){
      assert.equal($('art-shell').scrollOptions.behavior,'instant','Het volgende paneel komt in beeld zonder beweging bij reduced motion.');
      $('nicola-open').fire('click');assert.equal($('nicola-balloon').hidden,false);assert.equal($('art-stage').classList.contains('is-looking'),true);
      const words=$('nicola-comment').textContent;$('nicola-another').fire('click');assert.notEqual($('nicola-comment').textContent,words);
      $('nicola-close').fire('click');assert.equal(document.activeElement,$('nicola-open'));
      $('nicola-hotspot').fire('click');
    }
    if(p.id==='P03'){assert.equal($('nicola-balloon').hidden,true);assert.equal($('art-stage').classList.contains('is-looking'),false);}
    if(p.id==='P08'){const box=$('scene-art').getAttribute('viewBox');$('crystal-detail').fire('click');assert.notEqual($('scene-art').getAttribute('viewBox'),box);$('crystal-detail').fire('click');assert.equal($('scene-art').getAttribute('viewBox'),box);}
    if(p.id==='P09'){assert.equal($('art-stage').dataset.after,'true');assert.match($('scene-after').getAttribute('href'),/stash-after/);}
    if(p.id==='P25'){
      assert.equal($('krek-hotspot').hidden,false);
      $('krek-hotspot').fire('click');assert.equal($('krek-comment').textContent,'Forward?');assert.equal($('krek-balloon').hidden,false);
      $('krek-hotspot').fire('click');assert.equal($('krek-comment').textContent,'Forward!');
      document.fire('keydown',{key:'Escape'});assert.equal($('krek-balloon').hidden,true);assert.equal(document.activeElement,$('krek-hotspot'));
      $('krek-hotspot').fire('click');assert.equal($('krek-comment').textContent,'Forward?');
    }
    if(p.id==='P16'){assert.equal($('krek-balloon').hidden,true);assert.equal($('krek-hotspot').hidden,true);}
    if(p.id==='P20')assert.equal($('treasure-gleam').hidden,false);
    if(p.id==='P21')assert.equal($('treasure-gleam').hidden,true);
    if(p.id==='P17'){
      const hash=window.location.hash, choices=$('perspective-buttons').children;
      choices[0].fire('click');assert.equal($('thought-panel').hidden,false);assert.equal($('thought-cards').children.length,2);
      choices[1].fire('click');assert.equal($('thought-panel').hidden,true);assert.equal($('nicola-balloon').hidden,false);assert.equal(window.location.hash,hash);
      document.fire('keydown',{key:'Escape'});assert.equal($('nicola-balloon').hidden,true);
      choices[2].fire('click');assert.equal($('thought-panel').hidden,false);
    }
    if(p.id==='P18')assert.equal($('thought-panel').hidden,true);
    if(p.id==='P30'){$('nicola-hotspot').fire('click');assert.match($('nicola-comment').textContent,/Time is fleeting/);assert.equal($('nicola-another').hidden,true);}
    if(p.id==='P33'){
      assert.equal($('orb-hotspot').hidden,false);$('orb-hotspot').fire('click');
      assert.equal($('art-stage').dataset.orbBright,'true');assert.equal($('orb-hotspot').getAttribute('aria-pressed'),'true');
      assert.match($('art-description').textContent,/helderder/);$('orb-hotspot').fire('click');assert.equal($('art-stage').dataset.orbBright,'false');
      $('orb-hotspot').fire('click');
    }
    if(p.id==='P34'){assert.equal($('orb-hotspot').hidden,true);assert.equal($('art-stage').dataset.orbBright,'false');}
    if(i<window.COMIC_EPISODE.panels.length-1)$('next').fire('click');
  }
  assert.equal($('ending-note').hidden,false);assert.match($('next').textContent,/Opnieuw lezen/);
  document.fire('keydown',{key:'ArrowRight'});assert.equal(window.location.hash,'#P38');
  $('next').fire('click');assert.equal(window.location.hash,'#P07');
  document.fire('keydown',{key:'ArrowLeft'});assert.equal(window.location.hash,'#P07');
  $('chapter-select').value='S08';$('chapter-select').fire('change');assert.equal(window.location.hash,'#P23');
  $('motion-toggle').fire('click');assert.equal(storage.get('stone-cold-motion'),'on');assert.equal($('art-stage').classList.contains('is-animating'),true);
  $('motion-toggle').fire('click');assert.equal($('art-stage').classList.contains('is-animating'),false);
  $('sound-toggle').fire('click');await new Promise(resolve=>setImmediate(resolve));assert.equal(audioAccesses(),1);assert.equal($('sound-label').textContent,'Geluid uit');
  assert.equal($('transcript-content').children.length,35);
  assert.match($('transcript-content').textContent,/Forward\?/);
});

test('paneellinks behouden hun scène en overgeslagen finale-panelen openen de nasleep', async()=>{
  const skipped=await reader('#P36');assert.equal(skipped.window.location.hash,'#P37');assert.equal(skipped.$('panel-title').textContent,'Het resultaat');
  for(const hash of ['#P30','#P28','#P29']){const r=await reader(hash);assert.equal(r.window.location.hash,'#P30');assert.equal(r.$('panel-title').textContent,'Nyra');}
});

test('het zelfstandige HTML-bestand bevat alle originele assets en een statisch volledig transcript', async t=>{
  const dir=await mkdtemp(path.join(os.tmpdir(),'stone-cold-episode-'));
  t.after(async()=>{const resolved=path.resolve(dir);assert.equal(path.dirname(resolved),path.resolve(os.tmpdir()));assert.match(path.basename(resolved),/^stone-cold-episode-/);await rm(resolved,{recursive:true,force:true});});
  const file=await buildEpisodeOffline(path.join(dir,'frozen-hollow.html')), html=await readFile(file,'utf8');
  assert.doesNotMatch(html,/<script[^>]+src=|<link[^>]+rel="stylesheet"|<dialog|showModal|::backdrop/i);
  const script=html.match(/<script>(window\.COMIC_EPISODE = [\s\S]*?)<\/script>/)[1];
  const context=vm.createContext({window:{}});vm.runInContext(script,context);const e=context.window.COMIC_EPISODE;
  const digest=b=>createHash('sha256').update(b).digest('hex');
  for(const [key,a] of Object.entries(e.assets)){assert.match(a.src,/^data:image\/png;base64,/);assert.equal(digest(Buffer.from(a.src.split(',')[1],'base64')),digest(await readFile(new URL(`../assets/episodes/frozen-hollow/${key}.png`,import.meta.url))));}
  const head=html.match(/id="nicola-facing-head"[^>]+href="data:image\/png;base64,([A-Za-z0-9+/=]+)"/);assert.ok(head);
  assert.equal(digest(Buffer.from(head[1],'base64')),digest(await readFile(new URL('../assets/concepts/nicola-reader-head-v2.png',import.meta.url))));
  assert.equal((html.match(/<section><h3>/g)||[]).length,35);
  assert.match(html,/Krek na aanklikken: “Forward\?”/);assert.match(html,/Time is fleeting/);
  assert.match(html,/Make it stay/);assert.match(html,/Gedachtebeeld — Krek/);assert.match(html,/Gedachtebeeld — Nyra/);
  assert.doesNotMatch(html,/Regie\/open|source_labels|SRC-FH-END/,'Productienotities worden niet aan de reader geleverd.');
});
