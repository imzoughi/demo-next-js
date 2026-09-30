// Redimensionne et compresse les images de démo : design/pack/assets/images (originaux) → public/images.
// Mêmes noms et formats, pour ne rien changer dans le code. Usage : npm run images
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const src = 'design/pack/assets/images';
const out = 'public/images';
const wide = new Set(['img-17.jpg', 'img-12.jpg']); // hero et bloc histoire

for (const name of await readdir(src)) {
  const ext = path.extname(name).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
  const width = wide.has(name) ? 1600 : 900;
  let img = sharp(path.join(src, name)).resize({ width, withoutEnlargement: true });
  img = ext === '.png' ? img.png({ compressionLevel: 9, palette: true, quality: 80 }) : img.jpeg({ quality: 72, mozjpeg: true });
  await img.toFile(path.join(out, name));
  const { size } = await stat(path.join(out, name));
  console.log(`${name} → ${Math.round(size / 1024)} Ko`);
}
