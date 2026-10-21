import { readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const base = 'assets/references';
const ext = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);
const required = [
  ['KREK-M03', 'assets/references/characters/Krek Cragheart Karaktermodelblad.png'],
  ['NICOLA-M04', 'assets/references/characters/Nicola Tinkerer Karaktermodelblad.png'],
  ['NYRA-M03', 'assets/references/characters/Nyra Spellweaver Karaktermodelblad.png'],
];
const referenceHints = ['aesther', 'summoner', 'diviner', 'nightshroud'];
const found = [];
async function walk(rel) {
  let entries;
  try { entries = await readdir(path.join(root, rel), { withFileTypes: true }); }
  catch (err) { if (err.code === 'ENOENT') throw new Error('Referentiemap ontbreekt: ' + rel); throw err; }
  for (const item of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const next = path.posix.join(rel, item.name);
    if (item.isDirectory()) await walk(next);
    else if (item.isFile() && ext.has(path.extname(item.name).toLowerCase())) {
      const meta = await stat(path.join(root, next));
      found.push({ path: next, bytes: meta.size });
    }
  }
}
await walk(base);
const present = new Set(found.map(x => x.path));
const modelStatus = required.map(([model, file]) => ({ model, path: file, present: present.has(file) }));
const candidates = found.filter(x => referenceHints.some(term => x.path.toLowerCase().includes(term)));
const report = { generatedBy: 'scripts/check-references.mjs', totalImages: found.length, modelStatus, aestherCandidates: candidates, images: found };
if (process.argv.includes('--json')) {
  process.stdout.write(JSON.stringify(report, null, 2) + '\n');
} else {
  console.log('Referentieafbeeldingen gevonden:', found.length);
  for (const item of found) console.log(' - ' + item.path);
  for (const m of modelStatus) console.log((m.present ? 'OK ' : 'ONTBREEKT ') + m.model + ': ' + m.path);
  console.log('Aesther-kandidaten:', candidates.length);
  for (const a of candidates) console.log(' ? ' + a.path);
  console.log('LET OP: aanwezigheid is geen bevestiging dat een beeld inhoudelijk goedgekeurd of bekeken is.');
}
if (modelStatus.some(x => !x.present)) process.exitCode = 1;
