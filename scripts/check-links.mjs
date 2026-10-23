// Gagal bila ada href/src di HTML atau url(...) di CSS dist yang menunjuk ke
// file yang tidak ada. Pakai: node scripts/check-links.mjs [folder-dist]
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'dist');

if (!existsSync(root)) {
  console.error(`Folder ${root} tidak ada. Jalankan "npm run build" dulu.`);
  process.exit(1);
}

const html = [];
const css = [];
(function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith('.html')) html.push(path);
    else if (entry.name.endsWith('.css')) css.push(path);
  }
})(root);

const ATTR = /\s(?:href|src)\s*=\s*"([^"]*)"/g;
const URL_FN = /url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*?))\s*\)/g;
const STYLE_BLOCK = /<style[^>]*>([\s\S]*?)<\/style>/gi;
const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

function isFile(path) {
  if (!existsSync(path)) return false;
  return statSync(path).isFile() || existsSync(join(path, 'index.html'));
}

const problems = [];
let checked = 0;

// baseDir: folder acuan untuk path relatif (folder halaman, atau folder CSS).
function check(label, baseDir, raw) {
  const value = raw.trim();
  if (!value || value.startsWith('#')) return;
  if (EXTERNAL.test(value)) return;

  const [pathPart] = value.split(/[?#]/);
  if (!pathPart) return;

  checked += 1;
  const decoded = decodeURI(pathPart);
  const target = decoded.startsWith('/') ? join(root, decoded) : resolve(baseDir, decoded);

  if (!isFile(target)) problems.push(`${label} → ${value}`);
}

for (const file of html) {
  const page = relative(root, file);
  const text = readFileSync(file, 'utf8');

  for (const [, raw] of text.matchAll(ATTR)) check(page, dirname(file), raw);

  for (const [, block] of text.matchAll(STYLE_BLOCK)) {
    for (const [, a, b, c] of block.matchAll(URL_FN)) check(page, dirname(file), a ?? b ?? c ?? '');
  }
}

for (const file of css) {
  const sheet = relative(root, file);
  const text = readFileSync(file, 'utf8');
  for (const [, a, b, c] of text.matchAll(URL_FN)) check(sheet, dirname(file), a ?? b ?? c ?? '');
}

if (problems.length) {
  console.error(`Ada ${problems.length} tautan/aset yang menunjuk ke file hilang:`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log(
  `OK: ${checked} referensi di ${html.length} halaman dan ${css.length} CSS, semuanya ada di ${relative(process.cwd(), root) || '.'}.`,
);
