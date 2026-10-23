import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const src = 'C:/Users/Ramli/AppData/Local/Temp/koi/img';
const out = 'public/img';

const jobs = [
  ['3-jumbo.jpg', 'jumbo-tangan.webp', 1100],
  ['t-anakan-ikan-koi-blitar-qgje7zjc1zooz2186hgzj8b4m8nbo8cdxkc1sbx30o.jpg', 'bibitan-anakan.webp', 1000],
  ['67-Bibit.jpg', 'bibitan-ember.webp', 900],
  ['g13.jpg', 'borongan-lima.webp', 900],
  ['g14.jpg', 'borongan-empat.webp', 900],
  ['117-mix.jpg', 'mix-varietas.webp', 1000],
  ['g5.jpg', 'kohaku.webp', 900],
  ['g7.jpg', 'tancho.webp', 900],
  ['g10.jpg', 'showa.webp', 900],
  ['g9.jpg', 'sanke.webp', 900],
  ['g17.jpg', 'ogon.webp', 900],
  ['g16.jpg', 'doitsu.webp', 900],
  ['g12.jpg', 'kohaku-panjang.webp', 900],
  ['g8.jpg', 'showa-gelap.webp', 900],
];

await mkdir(out, { recursive: true });

for (const [input, name, width] of jobs) {
  await sharp(path.join(src, input))
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(path.join(out, name));
  console.log(name);
}

await sharp(path.join(src, 'logo.png'))
  .resize({ width: 240, withoutEnlargement: true })
  .png({ compressionLevel: 9, palette: true })
  .toFile(path.join(out, 'logo-duta-koi.png'));
console.log('logo-duta-koi.png');
