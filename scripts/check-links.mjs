// Gagal bila ada href/src di HTML dist yang menunjuk ke file yang tidak ada.
// Pakai: node scripts/check-links.mjs [folder-dist]
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'dist');

if (!existsSync(root)) {
  console.error(`Folder ${root} tidak ada. Jalankan "npm run build" dulu.`);
  process.exit(1);
}

const html = [];
(function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith('.html')) html.push(path);
  }
})(root);

const ATTR = /\s(?:href|src)\s*=\s*"([^"]*)"/g;
const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

function isFile(path) {
  if (!existsSync(path)) return false;
  return statSync(path).isFile() || existsSync(join(path, 'index.html'));
}

const problems = [];
let checked = 0;

for (const file of html) {
  const page = relative(root, file);
  for (const [, raw] of readFileSync(file, 'utf8').matchAll(ATTR)) {
    const value = raw.trim();
    if (!value || value.startsWith('#')) continue;
    if (EXTERNAL.test(value)) continue;

    const [pathPart] = value.split(/[?#]/);
    if (!pathPart) continue;

    checked += 1;
    const decoded = decodeURI(pathPart);
    const target = decoded.startsWith('/')
      ? join(root, decoded)
      : resolve(dirname(file), decoded);

    if (!isFile(target)) problems.push(`${page} → ${value}`);
  }
}

if (problems.length) {
  console.error(`Ada ${problems.length} tautan/aset yang menunjuk ke file hilang:`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log(`OK: ${checked} href/src di ${html.length} halaman, semuanya ada di ${relative(process.cwd(), root) || '.'}.`);
