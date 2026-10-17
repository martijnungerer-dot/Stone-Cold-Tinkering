(() => {
  'use strict';
  const panels = window.COMIC_PANELS;
  const $ = (id) => document.getElementById(id);
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let savedMotion = null;
  try { savedMotion = localStorage.getItem('stone-cold-motion'); } catch { /* Reading works without storage. */ }
  const state = { index: 0, motion: savedMotion === null ? !motionQuery.matches : savedMotion === 'on', sound: false, theory: 0 };
  let audioContext = null;
  let audioMaster = null;
  let animationTimer = null;
  let dialogTrigger = null;
  let soundGeneration = 0;
  const dialog = $('nicola-dialog');
  const artStage = $('art-stage');

  function preferences() {
    document.body.dataset.motion = state.motion ? 'on' : 'off';
    $('motion-toggle').setAttribute('aria-pressed', String(state.motion));
    $('motion-label').textContent = state.motion ? 'Beweging aan' : 'Beweging uit';
    $('sound-toggle').setAttribute('aria-pressed', String(state.sound));
    $('sound-label').textContent = state.sound ? 'Geluid aan' : 'Geluid uit';
  }

  function makeDust() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 18; i++) {
      const particle = document.createElement('span');
      particle.className = 'dust-particle';
      particle.style.setProperty('--x', `${40 + (i * 17 % 48)}%`);
      particle.style.setProperty('--y', `${65 + (i * 11 % 29)}%`);
      particle.style.setProperty('--dx', `${-24 - (i * 13 % 75)}px`);
      particle.style.setProperty('--dy', `${-8 - (i * 7 % 44)}px`);
      particle.style.setProperty('--duration', `${950 + (i * 53 % 550)}ms`);
      particle.style.setProperty('--delay', `${i * 23}ms`);
      fragment.append(particle);
    }
    $('dust').append(fragment);
  }

  function animate() {
    clearTimeout(animationTimer);
    artStage.classList.remove('is-animating', 'is-impact');
    if (!state.motion) return;
    // Restart a short, finite effect. No continuous animation or automatic paging.
    void artStage.offsetWidth;
    artStage.classList.add('is-animating');
    if (state.index === 1) artStage.classList.add('is-impact');
    animationTimer = setTimeout(() => artStage.classList.remove('is-animating', 'is-impact'), 2000);
  }

  async function playSound() {
    if (!state.sound) return;
    const thisSound = ++soundGeneration;
    try {
      const Context = window.AudioContext || window.webkitAudioContext;
      if (!Context) throw new Error('Audio is unavailable.');
      audioContext ||= new Context();
      if (!audioMaster) { audioMaster = audioContext.createGain(); audioMaster.gain.value = 0.12; audioMaster.connect(audioContext.destination); }
      if (audioContext.state === 'suspended') await audioContext.resume();
      if (!state.sound || thisSound !== soundGeneration) return;
      audioMaster.gain.setTargetAtTime(0.12, audioContext.currentTime, 0.02);
      const duration = state.index === 1 ? 1.35 : 0.8;
      const buffer = audioContext.createBuffer(1, Math.ceil(audioContext.sampleRate * duration), audioContext.sampleRate);
      const samples = buffer.getChannelData(0);
      let last = 0;
      for (let i = 0; i < samples.length; i++) { last = (last + (Math.random() * 2 - 1) * 0.045) / 1.045; samples[i] = last * 3; }
      const source = audioContext.createBufferSource();
      const filter = audioContext.createBiquadFilter();
      const envelope = audioContext.createGain();
      filter.type = 'lowpass'; filter.frequency.value = state.index === 1 ? 800 : 350;
      source.buffer = buffer;
      const now = audioContext.currentTime;
      envelope.gain.setValueAtTime(0.001, now);
      envelope.gain.exponentialRampToValueAtTime(0.65, now + 0.1);
      envelope.gain.exponentialRampToValueAtTime(0.001, now + duration);
      source.connect(filter); filter.connect(envelope); envelope.connect(audioMaster);
      source.onended = () => { source.disconnect(); filter.disconnect(); envelope.disconnect(); };
      source.start(now); source.stop(now + duration);
    } catch {
      state.sound = false; preferences();
      $('audio-announcement').textContent = 'Geluid is hier niet beschikbaar. Je kunt de strip zonder geluid lezen.';
    }
  }

  function render({ announce = true } = {}) {
    const panel = panels[state.index];
    const number = String(state.index + 1).padStart(2, '0');
    $('scene-art').setAttribute('viewBox', `0 ${panel.crop.y} 1536 ${panel.crop.height}`);
    artStage.style.aspectRatio = `1536 / ${panel.crop.height}`;
    $('art-title').textContent = panel.title;
    $('art-description').textContent = panel.description;
    $('frame-label').textContent = `${number} / ${panel.label}`;
    $('current-number').textContent = number;
    $('note-number').textContent = number;
    $('panel-title').textContent = panel.title;
    $('panel-narration').textContent = panel.narration;
    $('quote-character').textContent = panel.speaker;
    $('quote-text').textContent = `“${panel.quote}”`;
    $('quote-text').lang = 'en';
    $('nicola-hotspot').style.left = `${panel.hotspot.x}%`;
    $('nicola-hotspot').style.top = `${panel.hotspot.y}%`;
    $('previous').disabled = state.index === 0;
    $('next').replaceChildren(document.createTextNode(state.index === panels.length - 1 ? 'Opnieuw lezen ' : 'Verder '));
    const arrow = document.createElement('span'); arrow.setAttribute('aria-hidden', 'true'); arrow.textContent = state.index === panels.length - 1 ? '↻' : '→'; $('next').append(arrow);
    $('progress-fill').style.width = `${((state.index + 1) / panels.length) * 100}%`;
    $('ending-note').hidden = state.index !== panels.length - 1;
    document.querySelectorAll('[data-panel]').forEach((button) => {
      if (Number(button.dataset.panel) === state.index) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    if (announce) $('reader-announcement').textContent = `Paneel ${state.index + 1} van ${panels.length}. ${panel.title}`;
    state.theory = 0;
    animate();
    void playSound();
  }

  function goTo(index) {
    if (dialog.open) return;
    const next = Math.max(0, Math.min(panels.length - 1, index));
    if (next === state.index) return;
    state.index = next; render();
  }

  function showNicola(event) {
    dialogTrigger = event.currentTarget;
    $('nicola-comment').textContent = panels[state.index].theories[state.theory];
    if (!dialog.open) dialog.showModal();
  }

  function buildTranscript() {
    const fragment = document.createDocumentFragment();
    panels.forEach((panel, index) => {
      const section = document.createElement('section');
      const title = document.createElement('h3'); title.textContent = `${index + 1}. ${panel.title}`;
      const description = document.createElement('p'); description.textContent = panel.description;
      const quote = document.createElement('p'); quote.textContent = `${panel.speaker}: “${panel.quote}”`;
      const heading = document.createElement('h4'); heading.textContent = 'Optioneel: Nicola tegen de lezer';
      const list = document.createElement('ul');
      panel.theories.forEach((theory) => { const item = document.createElement('li'); item.lang = 'en'; item.textContent = theory; list.append(item); });
      section.append(title, description, quote, heading, list); fragment.append(section);
    });
    $('transcript-content').append(fragment);
  }

  $('previous').addEventListener('click', () => goTo(state.index - 1));
  $('next').addEventListener('click', () => goTo(state.index === panels.length - 1 ? 0 : state.index + 1));
  document.querySelectorAll('[data-panel]').forEach((button) => button.addEventListener('click', () => goTo(Number(button.dataset.panel))));
  $('replay').addEventListener('click', () => { animate(); void playSound(); });
  $('nicola-hotspot').addEventListener('click', showNicola);
  $('nicola-open').addEventListener('click', showNicola);
  $('nicola-close').addEventListener('click', () => dialog.close());
  $('nicola-another').addEventListener('click', () => { state.theory = (state.theory + 1) % panels[state.index].theories.length; $('nicola-comment').textContent = panels[state.index].theories[state.theory]; });
  dialog.addEventListener('click', (event) => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { if (dialogTrigger?.isConnected) dialogTrigger.focus(); });
  $('motion-toggle').addEventListener('click', () => {
    state.motion = !state.motion; savedMotion = state.motion ? 'on' : 'off';
    try { localStorage.setItem('stone-cold-motion', savedMotion); } catch { /* Optional persistence. */ }
    preferences(); if (state.motion) animate(); else { clearTimeout(animationTimer); artStage.classList.remove('is-animating', 'is-impact'); }
  });
  $('sound-toggle').addEventListener('click', () => {
    state.sound = !state.sound; preferences();
    if (state.sound) void playSound();
    else { soundGeneration++; if (audioContext && audioMaster) audioMaster.gain.setTargetAtTime(0.001, audioContext.currentTime, 0.015); }
  });
  motionQuery.addEventListener('change', () => { if (savedMotion === null) { state.motion = !motionQuery.matches; preferences(); if (!state.motion) artStage.classList.remove('is-animating', 'is-impact'); } });
  document.addEventListener('keydown', (event) => {
    if (dialog.open || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName) || event.target.isContentEditable) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); goTo(state.index + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(state.index - 1); }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden && audioContext && audioMaster) { soundGeneration++; audioMaster.gain.setTargetAtTime(0.001, audioContext.currentTime, 0.015); } });
  const imageCheck = new Image(); imageCheck.onerror = () => { $('image-error').hidden = false; }; imageCheck.src = document.querySelector('#scene-art image').getAttribute('href');
  makeDust(); buildTranscript(); preferences(); render({ announce: false });
})();
