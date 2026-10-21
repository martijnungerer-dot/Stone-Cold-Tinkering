import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const base = 'assets/references';
const registryPath = 'assets/references/character-registry.json';
const imageExt = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);
const images = [];
async function walk(dir) {
  const entries = await readdir(path.join(root, dir), { withFileTypes: true });
  for (const item of entries.sort((a,b) => a.name.localeCompare(b.name))) {
    const p = path.posix.join(dir, item.name);
    if (item.isDirectory()) await walk(p);
    else if (item.isFile() && imageExt.has(path.extname(item.name).toLowerCase())) {
      const info = await stat(path.join(root, p));
      images.push({ path: p, bytes: info.size });
    }
  }
}
function validPath(p) {
  return typeof p === 'string' && p.startsWith(base + '/') &&
    !p.split('/').includes('..') && imageExt.has(path.extname(p).toLowerCase());
}
await walk(base);
const registry = JSON.parse(await readFile(path.join(root, registryPath), 'utf8'));
if (registry.schemaVersion !== 1 || !Array.isArray(registry.characters)) {
  throw new Error('Ongeldig karakterregister: schemaVersion 1 en characters[] vereist.');
}
const byPath = new Map(images.map(v => [v.path, v]));
const seenIds = new Set();
const errors = [];
const warnings = [];
const registered = new Set();
const characters = registry.characters.map(c => {
  if (!c || typeof c.id !== 'string' || !c.id || seenIds.has(c.id)) errors.push('Ongeldige of dubbele karakter-id');
  else seenIds.add(c.id);
  if (!Array.isArray(c.references)) errors.push('references[] ontbreekt voor ' + (c.id ?? '?'));
  const refs = (Array.isArray(c.references) ? c.references : []).map(ref => {
    const p = ref?.path;
    if (!validPath(p)) { errors.push('Ongeldig referentiepad voor ' + c.id + ': ' + String(p)); return { path: p, present: false, required: ref?.required === true }; }
    registered.add(p);
    const present = byPath.has(p) && byPath.get(p).bytes > 0;
    if (!present && ref.required === true) errors.push('Vereiste referentie ontbreekt: ' + c.id + ' -> ' + p);
    else if (!present) warnings.push('Optionele referentie ontbreekt: ' + c.id + ' -> ' + p);
    return { path: p, role: ref.role, required: ref.required === true, present };
  });
  if (c.approval === 'approved' && !refs.some(r => r.role === 'approved-model' && r.present)) errors.push('Goedgekeurd model mist bestaande approved-model-referentie: ' + c.id);
  if (c.approval === 'pending') warnings.push('Nog geen goedgekeurd model: ' + c.id);
  if (!refs.length) warnings.push('Nog geen referenties geregistreerd: ' + c.id);
  return { id: c.id, name: c.name, kind: c.kind, model: c.model, approval: c.approval, references: refs };
});
const unregistered = images.filter(img => !registered.has(img.path));
const report = { totalImages: images.length, characters, unregistered, images, errors, warnings };
if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else {
  console.log('Afbeeldingen totaal:', images.length, '| personages geregistreerd:', characters.length);
  for (const c of characters) {
    console.log('\n' + c.name + ' (' + c.id + ', ' + c.approval + ')');
    for (const r of c.references) console.log(' ' + (r.present ? 'OK' : r.required ? 'ONTBREEKT' : 'OPTIONEEL ONTBREEKT') + ' ' + r.path);
  }
  console.log('\nNog niet aan een karakter gekoppelde afbeeldingen:', unregistered.length);
  for (const img of unregistered) console.log(' ? ' + img.path);
  for (const w of warnings) console.log('WAARSCHUWING: ' + w);
  for (const e of errors) console.error('FOUT: ' + e);
  console.log('Een bestandscheck is geen inhoudelijke beeldcontrole.');
}
if (errors.length) process.exitCode = 1;
