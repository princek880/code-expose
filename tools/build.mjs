#!/usr/bin/env node
// snippets/** -> dist/index.json + dist/shards/*.json
//
// Zero dependencies, node only. The app never runs this; it reads the generated
// dist/ over http(s). Run it after adding or editing a snippet:
//
//   node tools/build.mjs            build, fail on any error
//   node tools/build.mjs --check    validate only, write nothing
//
// One path rule: snippets/<lang>/<topic>/<name>.md  ->  id <lang>/<topic>/<name>
// lang and topic are also written in the frontmatter, and a mismatch with the
// path is an error -- the redundancy is there to catch a moved file.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'snippets');
const DIST = path.join(ROOT, 'dist');
const CHECK_ONLY = process.argv.includes('--check');

const LANGS = ['python', 'cpp'];
const SOFT_MIN = 5, SOFT_MAX = 25;   // target length; longer is a "long form" pack

const errors = [], warnings = [];
const err = (f, m) => errors.push(f + ': ' + m);
const warn = (f, m) => warnings.push(f + ': ' + m);

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out.sort();
}

// Minimal frontmatter: --- , `key: value` lines, --- , then the code verbatim.
// Values are plain strings; `[a, b]` becomes an array. No YAML, no dependency.
function parse(raw, file) {
  if (!raw.startsWith('---\n')) { err(file, 'missing opening --- frontmatter fence'); return null; }
  const end = raw.indexOf('\n---\n', 3);
  if (end === -1) { err(file, 'missing closing --- frontmatter fence'); return null; }
  const meta = {};
  for (const line of raw.slice(4, end).split('\n')) {
    if (!line.trim()) continue;
    const c = line.indexOf(':');
    if (c === -1) { err(file, 'frontmatter line is not `key: value`: ' + line); continue; }
    const k = line.slice(0, c).trim();
    let v = line.slice(c + 1).trim();
    if (v.startsWith('[') && v.endsWith(']')) {
      meta[k] = v.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
    } else {
      meta[k] = v;
    }
  }
  return { meta, code: raw.slice(end + 5) };
}

// Mirrors the app's normalization, so the length and emptiness checks here match
// what a typist actually sees.
function normalize(code) {
  const lines = code.replace(/\t/g, '    ').split(/\r\n|\r|\n/).map(l => l.replace(/[ \t]+$/, ''));
  let a = 0, b = lines.length;
  while (a < b && lines[a] === '') a++;
  while (b > a && lines[b - 1] === '') b--;
  return lines.slice(a, b);
}

const seen = new Map();
const snippets = [];

for (const file of walk(SRC)) {
  const rel = path.relative(SRC, file).replace(/\\/g, '/');
  const id = rel.replace(/\.md$/, '');
  const parts = id.split('/');
  if (parts.length !== 3) {
    err(rel, 'expected snippets/<lang>/<topic>/<name>.md, got ' + parts.length + ' path segments');
    continue;
  }
  const [lang, topic] = parts;

  const parsed = parse(fs.readFileSync(file, 'utf8'), rel);
  if (!parsed) continue;
  const { meta, code } = parsed;

  if (!LANGS.includes(lang)) err(rel, 'unknown language directory "' + lang + '"');
  if (meta.lang !== lang) err(rel, 'frontmatter lang "' + meta.lang + '" does not match path "' + lang + '"');
  if (meta.topic !== topic) err(rel, 'frontmatter topic "' + meta.topic + '" does not match path "' + topic + '"');

  const tier = Number(meta.tier);
  if (!Number.isInteger(tier) || tier < 1 || tier > 4) err(rel, 'tier must be an integer 1..4, got "' + meta.tier + '"');

  if (!meta.note) err(rel, 'note is required -- it is the whole learning layer');
  else if (meta.note.includes('\n')) err(rel, 'note must be one line');
  else if (meta.note.length > 120) warn(rel, 'note is ' + meta.note.length + ' chars; one short line reads better');

  const lines = normalize(code);
  if (!lines.length) err(rel, 'code is empty after normalization');
  else if (lines.length < SOFT_MIN) warn(rel, 'only ' + lines.length + ' lines; under the ' + SOFT_MIN + '-line target');
  else if (lines.length > SOFT_MAX) warn(rel, lines.length + ' lines; long-form pack (target is ' + SOFT_MAX + ')');

  if (seen.has(id)) err(rel, 'duplicate id, also at ' + seen.get(id));
  seen.set(id, rel);

  const tags = Array.isArray(meta.tags) ? meta.tags : (meta.tags ? [meta.tags] : []);
  snippets.push({ id, lang, topic, tier, tags, code: lines.join('\n'), note: meta.note || '' });
}

if (!snippets.length) err('snippets/', 'no snippets found');

for (const w of warnings) console.log('  warn  ' + w);
if (errors.length) {
  for (const e of errors) console.error('  ERROR ' + e);
  console.error('\n' + errors.length + ' error(s). Nothing written.');
  process.exit(1);
}

// One shard per lang+topic: small diffs, obvious layout, and the app merges them
// all anyway. Sorted so a rebuild with no content change is a no-op diff.
const byShard = new Map();
for (const s of snippets) {
  const key = s.lang + '-' + s.topic;
  if (!byShard.has(key)) byShard.set(key, []);
  byShard.get(key).push(s);
}
const shardNames = [...byShard.keys()].sort();

if (!CHECK_ONLY) {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(path.join(DIST, 'shards'), { recursive: true });
  for (const name of shardNames) {
    const rows = byShard.get(name).sort((a, b) => a.id.localeCompare(b.id));
    fs.writeFileSync(path.join(DIST, 'shards', name + '.json'), JSON.stringify(rows, null, 1) + '\n');
  }
  fs.writeFileSync(
    path.join(DIST, 'index.json'),
    JSON.stringify(shardNames.map(n => 'shards/' + n + '.json'), null, 1) + '\n'
  );
}

const pad = (s, n) => String(s).padEnd(n);
console.log('\n' + pad('shard', 30) + pad('n', 5) + 'tiers');
for (const name of shardNames) {
  const rows = byShard.get(name);
  const t = [1, 2, 3, 4].map(i => rows.filter(r => r.tier === i).length).join('/');
  console.log(pad(name, 30) + pad(rows.length, 5) + t);
}
const tot = t => snippets.filter(s => s.tier === t).length;
console.log('\n' + snippets.length + ' snippets  ' +
  LANGS.map(l => l + ' ' + snippets.filter(s => s.lang === l).length).join('  ') +
  '  tiers ' + [1, 2, 3, 4].map(tot).join('/') +
  '  ' + shardNames.length + ' shards' +
  (CHECK_ONLY ? '  (check only, nothing written)' : '  -> dist/'));
if (warnings.length) console.log(warnings.length + ' warning(s)');
