(() => {
  'use strict';
  const episode = window.COMIC_EPISODE;
  const panels = episode.panels;
  const $ = (id) => document.getElementById(id);
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  let savedMotion = null;
  try { savedMotion = localStorage.getItem('stone-cold-motion'); } catch { /* Reading also works without storage. */ }
  const state = { index: 0, motion: savedMotion === null ? !mq.matches : savedMotion === 'on', sound: false, theory: 0, detail: false, krek: -1, orb: false, expanded: false };
  const stage = $('art-stage');
  const viewer = $('comic-reader');
  let timer, opener, thoughtOpener, audioContext, master, generation = 0, nativeFullscreen = false;
  const inertBackground = [];

  function expandedView(expanded) {
    state.expanded = expanded;
    if (expanded && !inertBackground.length) {
      for (let current = viewer; current?.parentElement && current !== document.body; current = current.parentElement) {
        for (const sibling of current.parentElement.children) if (sibling !== current && !sibling.inert) {
          sibling.inert = true; inertBackground.push(sibling);
        }
      }
    } else if (!expanded) {
      for (const element of inertBackground.splice(0)) element.inert = false;
    }
    for (const [element, name] of [[viewer, 'is-expanded'], [document.body, 'has-expanded-reader']]) {
      if (expanded) element.classList.add(name); else element.classList.remove(name);
    }
    const label = expanded ? 'Normale weergave' : 'Volledig scherm';
    $('fullscreen-label').textContent = label;
    $('fullscreen-toggle').setAttribute('aria-label', label);
    $('fullscreen-toggle').setAttribute('aria-pressed', String(expanded));
    if (!expanded) $('fullscreen-toggle').focus();
  }
  async function toggleFullscreen() {
    if (state.expanded) {
      if (document.fullscreenElement === viewer) {
        try { await document.exitFullscreen(); }
        catch { $('display-announcement').textContent = 'Gebruik Escape om volledig scherm te sluiten.'; return; }
      }
      nativeFullscreen = false; expandedView(false); return;
    }
    stopMotion();
    if (document.fullscreenEnabled !== false && typeof viewer.requestFullscreen === 'function') {
      try {
        await viewer.requestFullscreen();
        if (document.fullscreenElement === viewer) { nativeFullscreen = true; expandedView(true); return; }
      } catch { /* Some embedded browsers offer only an expanded reading view. */ }
    }
    expandedView(true);
    $('display-announcement').textContent = 'Grote leesweergave binnen dit venster. Met Escape keer je terug.';
  }
  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement === viewer) { nativeFullscreen = true; expandedView(true); }
    else if (nativeFullscreen) { nativeFullscreen = false; expandedView(false); }
  });
  $('fullscreen-toggle').addEventListener('click', toggleFullscreen);

  function preferences() {
    document.body.dataset.motion = state.motion ? 'on' : 'off';
    for (const name of ['motion', 'sound']) $(name + '-toggle').setAttribute('aria-pressed', String(state[name]));
    $('motion-label').textContent = state.motion ? 'Beweging aan' : 'Beweging uit';
    $('sound-label').textContent = state.sound ? 'Geluid aan' : 'Geluid uit';
  }
  function stopMotion() { clearTimeout(timer); stage.classList.remove('is-animating', 'is-impact'); }
  function animate() {
    stopMotion();
    if (!state.motion) return;
    void stage.offsetWidth;
    stage.classList.add('is-animating');
    if (['impact', 'tunnel'].includes(panels[state.index].motion)) stage.classList.add('is-impact');
    timer = setTimeout(stopMotion, 3200);
  }
  async function playSound() {
    if (!state.sound) return;
    const current = ++generation;
    try {
      const Context = window.AudioContext || window.webkitAudioContext;
      if (!Context) throw new Error('Audio unavailable');
      audioContext ||= new Context();
      if (!master) { master = audioContext.createGain(); master.gain.value = .09; master.connect(audioContext.destination); }
      if (audioContext.state === 'suspended') await audioContext.resume();
      if (!state.sound || current !== generation) return;
      master.gain.setTargetAtTime(.09, audioContext.currentTime, .02);
      const panel = panels[state.index], effect = panel.motion;
      const fire = panel.sound === 'fire', bang = panel.sound === 'bang';
      const magical = ['orb', 'drain', 'spell', 'spirit', 'vanish'].includes(effect);
      const duration = fire ? 2.4 : bang ? .65 : magical ? 1.6 : .85;
      const buffer = audioContext.createBuffer(1, Math.ceil(audioContext.sampleRate * duration), audioContext.sampleRate);
      let last = 0;
      const samples = buffer.getChannelData(0);
      let crackle = 0;
      for (let i = 0; i < samples.length; i++) {
        last = (last + (Math.random() * 2 - 1) * .04) / 1.04;
        if (fire) { if (Math.random() < 14 / audioContext.sampleRate) crackle = .3 + Math.random() * .6; crackle *= .986; }
        samples[i] = fire ? last * .6 + (Math.random() * 2 - 1) * crackle : last * 3;
      }
      const source = audioContext.createBufferSource(), filter = audioContext.createBiquadFilter(), envelope = audioContext.createGain();
      source.buffer = buffer; filter.type = fire ? 'highpass' : 'lowpass'; filter.frequency.value = fire ? 700 : bang ? 850 : magical ? 1400 : 450;
      const now = audioContext.currentTime;
      envelope.gain.setValueAtTime(.001, now); envelope.gain.exponentialRampToValueAtTime(.6, now + (bang ? .015 : .1)); envelope.gain.exponentialRampToValueAtTime(.001, now + duration);
      source.connect(filter); filter.connect(envelope); envelope.connect(master);
      source.onended = () => { source.disconnect(); filter.disconnect(); envelope.disconnect(); };
      source.start(now); source.stop(now + duration);
    } catch {
      state.sound = false; preferences();
      $('audio-announcement').textContent = 'Geluid is hier niet beschikbaar. De strip blijft zonder geluid leesbaar.';
    }
  }
  function rect(art) {
    const asset = episode.assets[art.key];
    const cw = asset.width / (asset.columns || 1), ch = asset.height / (asset.rows || 1);
    const col = art.cell % (asset.columns || 1), row = Math.floor(art.cell / (asset.columns || 1));
    const inset = art.inset ?? 6;
    const base = { x: col * cw + inset, y: row * ch + inset, width: cw - inset * 2, height: ch - inset * 2 };
    if (!art.focus) return base;
    const f = art.focus;
    return { x: base.x + f.x * base.width, y: base.y + f.y * base.height, width: base.width * f.width, height: base.height * f.height };
  }
  function paintArt() {
    const p = panels[state.index], asset = episode.assets[p.art.key];
    $('nicola-facing-head').setAttribute('visibility', p.head ? 'visible' : 'hidden');
    const box = rect(state.detail && p.detail ? p.detail : p.art);
    $('scene-art').setAttribute('viewBox', `${box.x} ${box.y} ${box.width} ${box.height}`);
    stage.style.aspectRatio = `${box.width} / ${box.height}`;
    stage.style.setProperty('--scene-ratio', String(box.width / box.height));
    for (const [key, value] of Object.entries({ href: asset.src, width: asset.width, height: asset.height })) $('scene-image').setAttribute(key, value);
    const after = p.after ? episode.assets[p.after.key] : null;
    stage.dataset.after = String(Boolean(after));
    if (after) {
      const r = rect(p.after), sx = box.width / r.width, sy = box.height / r.height;
      for (const [key, value] of Object.entries({ href: after.src, x: box.x - r.x * sx, y: box.y - r.y * sy, width: after.width * sx, height: after.height * sy })) $('scene-after').setAttribute(key, value);
    } else $('scene-after').removeAttribute('href');
    if (p.head) {
      const w = box.width * p.head.width;
      const values = { x: box.x + box.width * p.head.x - w / 2, y: box.y + box.height * p.head.y - w / 2, width: w, height: w };
      for (const [key, value] of Object.entries(values)) $('nicola-facing-head').setAttribute(key, value);
      $('nicola-hotspot').style.left = `${p.head.x * 100}%`; $('nicola-hotspot').style.top = `${p.head.y * 100}%`;
      $('art-shell').style.setProperty('--nicola-x', `${p.head.x * 100}%`);
    }
  }
  function closeNicola(restore = false) {
    const inside = document.activeElement === $('nicola-close') || document.activeElement === $('nicola-another');
    $('nicola-balloon').hidden = true; stage.classList.remove('is-looking');
    for (const id of ['nicola-hotspot', 'nicola-open']) $(id).setAttribute('aria-expanded', 'false');
    $('art-description').textContent = panels[state.index].description;
    if ((restore || inside) && opener?.isConnected) opener.focus();
  }
  function closeThought(restore = false) {
    const inside = document.activeElement === $('thought-close');
    $('thought-panel').hidden = true;
    if ((restore || inside) && thoughtOpener?.isConnected) thoughtOpener.focus();
  }
  function closeKrek(restore = false) {
    $('krek-balloon').hidden = true;
    $('krek-hotspot').setAttribute('aria-expanded', 'false');
    if (restore) $('krek-hotspot').focus();
  }
  function showKrek() {
    const lines = panels[state.index].krek?.lines;
    if (!lines?.length) return;
    closeNicola(); closeThought(); stopMotion();
    state.krek = (state.krek + 1) % lines.length;
    $('krek-comment').textContent = lines[state.krek];
    $('krek-balloon').hidden = false;
    $('krek-hotspot').setAttribute('aria-expanded', 'true');
  }
  function toggleOrb() {
    if (!panels[state.index].orb) return;
    state.orb = !state.orb; stopMotion();
    $('orb-hotspot').setAttribute('aria-pressed', String(state.orb));
    stage.dataset.orbBright = String(state.orb);
    $('art-description').textContent = panels[state.index].description + (state.orb ? ' De blauwe bol schijnt nu helderder.' : '');
  }
  function showNicola(event) {
    const p = panels[state.index];
    if (!p.theories?.length) return;
    if (!$('nicola-balloon').hidden) { closeNicola(); return; }
    closeThought(); closeKrek(); stopMotion(); opener = event.currentTarget; state.theory = 0;
    stage.classList.add('is-looking'); $('nicola-balloon').hidden = false;
    $('nicola-comment').textContent = p.theories[0]; $('nicola-another').hidden = p.theories.length < 2;
    for (const id of ['nicola-hotspot', 'nicola-open']) $(id).setAttribute('aria-expanded', 'true');
    $('art-description').textContent = `${p.description} Nicola draait zijn hoofd naar de lezer en spreekt die aan.`;
  }
  function speech(line, parent, className = 'speech') {
    const card = document.createElement('div'); card.className = className; card.dataset.speaker = line.speaker;
    const name = document.createElement('strong'); name.textContent = line.speaker;
    const words = document.createElement('p'); words.lang = 'en'; words.textContent = `“${line.text}”`;
    card.append(name, words); parent.append(card);
  }
  function showThought(name, button) {
    closeNicola(); closeThought(); thoughtOpener = button;
    if (name === 'Nicola') { showNicola({ currentTarget: button }); return; }
    $('thought-title').textContent = `${name.toUpperCase()} · GEDACHTEBEELD`;
    $('thought-cards').replaceChildren();
    panels[state.index].perspectives[name].forEach((part) => {
      const card = document.createElement('div'); card.className = 'thought-card';
      part.forEach(line => { const text = document.createElement('p'); text.lang = 'en'; text.textContent = `${line.speaker}: “${line.text}”`; card.append(text); });
      $('thought-cards').append(card);
    });
    $('thought-panel').hidden = false;
  }
  function render() {
    closeNicola(); closeThought(); closeKrek(); stopMotion(); state.theory = 0; state.detail = false; state.krek = -1; state.orb = false;
    const p = panels[state.index], number = String(state.index + 1).padStart(2, '0');
    paintArt(); stage.dataset.effect = p.motion;
    stage.dataset.orbBright = 'false';
    $('krek-hotspot').hidden = !p.krek; $('orb-hotspot').hidden = !p.orb;
    $('orb-hotspot').setAttribute('aria-pressed', 'false');
    $('orb-glow').hidden = !p.orb; $('treasure-gleam').hidden = !p.treasure;
    for (const [id, location] of [['krek-hotspot', p.krek], ['orb-hotspot', p.orb], ['orb-glow', p.orb], ['treasure-gleam', p.treasure]]) if (location) {
      $(id).style.left = `${location.x * 100}%`; $(id).style.top = `${location.y * 100}%`;
      if (location.width) $(id).style.width = `${location.width * 100}%`;
      if (location.height) $(id).style.height = `${location.height * 100}%`;
    }
    $('art-title').textContent = p.title; $('art-description').textContent = p.description;
    $('frame-label').textContent = `${number} / ${p.title.toUpperCase()}`; $('location-label').textContent = p.location;
    $('panel-title').textContent = p.title; $('panel-narration').textContent = p.narration;
    $('scene-label').textContent = p.sceneTitle.toUpperCase(); $('current-number').textContent = number; $('note-number').textContent = number;
    $('total-number').textContent = String(panels.length); $('previous').disabled = state.index === 0;
    $('scene-previous').disabled = state.index === 0; $('scene-next').disabled = state.index === panels.length - 1;
    $('next').textContent = state.index === panels.length - 1 ? 'Opnieuw lezen ↻' : 'Verder →';
    $('progress-fill').style.width = `${(state.index + 1) / panels.length * 100}%`;
    $('ending-note').hidden = state.index !== panels.length - 1;
    $('dialogue-strip').replaceChildren(); p.dialogue.forEach(line => speech(line, $('dialogue-strip')));
    const canSpeak = Boolean(p.head && p.theories?.length);
    $('nicola-hotspot').hidden = !canSpeak; $('nicola-open').hidden = !canSpeak;
    $('crystal-detail').hidden = !p.detail; $('crystal-detail').setAttribute('aria-pressed', 'false'); $('crystal-detail').textContent = 'Bekijk het kristal';
    $('perspective-choices').hidden = !p.perspectives;
    $('perspective-buttons').replaceChildren();
    if (p.perspectives) Object.keys(p.perspectives).forEach(name => { const b = document.createElement('button'); b.type = 'button'; b.textContent = name; b.addEventListener('click', () => showThought(name, b)); $('perspective-buttons').append(b); });
    $('chapter-select').value = p.scene;
    $('reader-announcement').textContent = `Paneel ${state.index + 1} van ${panels.length}. ${p.title}. ${p.narration}`;
    $('image-error').hidden = true;
    const check = new Image(); const atIndex = state.index;
    check.onerror = () => { if (atIndex === state.index) $('image-error').hidden = false; }; check.src = episode.assets[p.art.key].src;
    try { window.history.replaceState(null, '', `#${p.id}`); } catch { /* Optional local bookmark. */ }
    animate(); void playSound();
  }
  function goTo(index) {
    const next = Math.max(0, Math.min(panels.length - 1, index));
    if (next !== state.index) {
      state.index = next; render();
      if (!state.expanded) $('art-shell').scrollIntoView?.({ block: 'start', behavior: state.motion ? 'smooth' : 'instant' });
    }
  }
  for (const [id, handler] of Object.entries({ previous: () => goTo(state.index - 1), next: () => goTo(state.index === panels.length - 1 ? 0 : state.index + 1), replay: () => { closeNicola(); closeThought(); closeKrek(); animate(); void playSound(); }, 'nicola-hotspot': showNicola, 'nicola-open': showNicola, 'nicola-close': () => closeNicola(true), 'thought-close': () => closeThought(true), 'krek-hotspot': showKrek, 'krek-again': showKrek, 'krek-close': () => closeKrek(true), 'orb-hotspot': toggleOrb })) $(id).addEventListener('click', handler);
  $('scene-previous').addEventListener('click', () => goTo(state.index - 1));
  $('scene-next').addEventListener('click', () => goTo(state.index + 1));
  $('nicola-another').addEventListener('click', () => { const lines = panels[state.index].theories; state.theory = (state.theory + 1) % lines.length; $('nicola-comment').textContent = lines[state.theory]; });
  $('crystal-detail').addEventListener('click', () => { state.detail = !state.detail; $('crystal-detail').setAttribute('aria-pressed', String(state.detail)); $('crystal-detail').textContent = state.detail ? 'Terug naar het paneel' : 'Bekijk het kristal'; closeNicola(); stopMotion(); paintArt(); });
  $('chapter-select').addEventListener('change', () => { const index = panels.findIndex(p => p.scene === $('chapter-select').value); if (index >= 0) goTo(index); });
  $('motion-toggle').addEventListener('click', () => { state.motion = !state.motion; savedMotion = state.motion ? 'on' : 'off'; try { localStorage.setItem('stone-cold-motion', savedMotion); } catch { /* Optional persistence. */ } preferences(); if (state.motion) animate(); else stopMotion(); });
  $('sound-toggle').addEventListener('click', () => { state.sound = !state.sound; preferences(); if (state.sound) void playSound(); else { generation++; if (master) master.gain.setTargetAtTime(.001, audioContext.currentTime, .02); } });
  mq.addEventListener('change', () => { if (savedMotion === null) { state.motion = !mq.matches; preferences(); if (!state.motion) stopMotion(); } });
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName) || event.target.isContentEditable) return;
    if (event.key === 'Escape') {
      const commentOpen = !$('nicola-balloon').hidden || !$('thought-panel').hidden || !$('krek-balloon').hidden;
      if (!$('nicola-balloon').hidden) closeNicola(true); if (!$('thought-panel').hidden) closeThought(true); if (!$('krek-balloon').hidden) closeKrek(true);
      if (!commentOpen && state.expanded) void toggleFullscreen();
    }
    if (event.key === 'ArrowRight') { event.preventDefault(); goTo(state.index + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(state.index - 1); }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { stopMotion(); generation++; if (master) master.gain.setTargetAtTime(.001, audioContext.currentTime, .02); } });
  episode.chapters.forEach(chapter => { const option = document.createElement('option'); option.value = chapter.id; option.textContent = chapter.title; $('chapter-select').append(option); });
  for (let i = 0; i < 18; i++) { const particle = document.createElement('span'); particle.className = 'dust-particle'; for (const [key, value] of Object.entries({ x: `${20 + i * 17 % 70}%`, y: `${45 + i * 11 % 50}%`, dx: `${-20 - i * 13 % 80}px`, dy: `${-10 - i * 7 % 45}px`, duration: `${1000 + i * 43 % 600}ms`, delay: `${i * 25}ms` })) particle.style.setProperty('--' + key, value); $('dust').append(particle); }
  if (!$('transcript-content').children.length) panels.forEach((p, i) => {
    const section = document.createElement('section'), heading = document.createElement('h3'); heading.textContent = `${i + 1}. ${p.title}`;
    const description = document.createElement('p'); description.textContent = p.description;
    const narration = document.createElement('p'); narration.textContent = p.narration; section.append(heading, description, narration);
    p.dialogue.forEach(line => speech(line, section));
    for (const text of p.krek?.lines || []) speech({speaker:'Krek na aanklikken', text}, section);
    for (const line of p.theories || []) { const text = document.createElement('p'); text.lang = 'en'; text.textContent = `Nicola tegen de lezer: “${line}”`; section.append(text); }
    for (const [name, parts] of Object.entries(p.perspectives || {})) if (name !== 'Nicola') for (const part of parts) for (const line of part) { const text = document.createElement('p'); text.lang = 'en'; text.textContent = `Gedachtebeeld — ${line.speaker}: “${line.text}”`; section.append(text); }
    $('transcript-content').append(section);
  });
  const requested = (window.location?.hash || '').slice(1); const redirects = {P28:'P30',P29:'P30',P36:'P37'}; const start = panels.findIndex(p => p.id === (redirects[requested] || requested)); if (start >= 0) state.index = start;
  preferences(); render();
})();
