import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
export async function compileEpisode({ write = true } = {}) {
  const config = JSON.parse(await readFile(path.join(root, 'content/episodes/frozen-hollow/READER.json'), 'utf8'));
  const source = await readFile(path.join(root, 'content/episodes/frozen-hollow/STORYBOARD.md'), 'utf8');
  const headings = [...source.matchAll(/^(#{4,5}) (P\d{2}(?:-[KNY][12])?) — ([^\n]+)\r?\n/gm)];
  const blocks = new Map(headings.map((h, i) => [h[2], { title: h[3].trim(), body: source.slice(h.index + h[0].length, headings[i + 1]?.index ?? source.length) }]));
  const dialogue = (id) => {
    const block = blocks.get(id);
    if (!block) throw new Error(`Ontbrekend storyboardpaneel: ${id}`);
    return [...block.body.matchAll(/^\*\*Dialoog, ([^*]+)\*\*\s*“([^”]+)”/gm)].map(m => ({ speaker: m[1].split(' — ')[0].replace(/:$/, '').trim(), text: m[2] }));
  };
  if (config.panels.length !== 38 || new Set(config.panels.map(p => p.id)).size !== 38) throw new Error('Verwacht 38 unieke hoofdpanelen.');
  for (const asset of Object.values(config.assets)) {
    const bytes = await readFile(path.join(root, asset.file));
    asset.width = bytes.readUInt32BE(16); asset.height = bytes.readUInt32BE(20);
    delete asset.file;
  }
  config.panels = config.panels.map(p => {
    const chapter = config.chapters.find(c => c.id === p.scene);
    if (!chapter) throw new Error(`Onbekende scène ${p.scene}`);
    const result = { ...p, title: blocks.get(p.id).title, sceneTitle: chapter.title, dialogue: dialogue(p.id) };
    if (p.id === 'P17') {
      result.perspectives = Object.fromEntries([['Krek','K'],['Nicola','N'],['Nyra','Y']].map(([name, key]) => [name,[dialogue(`P17-${key}1`),dialogue(`P17-${key}2`)]]));
      result.theories = result.perspectives.Nicola.map(part => part.map(l => l.text).join(' '));
    }
    return result;
  });
  const output = `/* Generated from the storyboard and READER.json. Run node scripts/compile-episode.mjs. */\nwindow.COMIC_EPISODE = ${JSON.stringify(config, null, 2)};\n`;
  if (write) await writeFile(path.join(root, 'reader/frozen-hollow-data.js'), output, 'utf8');
  return config;
}

export function transcriptHTML(episode) {
  const escape = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  const line = l => `<p lang="en"><strong>${escape(l.speaker)}:</strong> “${escape(l.text)}”</p>`;
  return episode.panels.map((p,i) => `<section><h3>${i+1}. ${escape(p.title)}</h3><p>${escape(p.description)}</p><p>${escape(p.narration)}</p>${p.dialogue.map(line).join('')}${(p.theories||[]).map(t=>`<p lang="en">Nicola tegen de lezer: “${escape(t)}”</p>`).join('')}${Object.entries(p.perspectives||{}).filter(([name])=>name!=='Nicola').map(([name, parts])=>`<h4>Gedachtebeeld — ${escape(name)}</h4>${parts.flat().map(line).join('')}`).join('')}</section>`).join('\n');
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) console.log(`Compiled ${(await compileEpisode()).panels.length} panels.`);
