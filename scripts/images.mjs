// Generates responsive image variants from the masters in src/assets/images/masters.
// Output goes to public/img, which Vite copies into dist/img. Run with `bun run images`.
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const mastersDir = join(here, '../src/assets/images/masters');
const outDir = join(here, '../public/img');

// Widths are chosen around each image's largest CSS size times 1x–3x device pixels.
const images = [
  { file: 'ultron-logo.png', name: 'ultron-logo', widths: [256, 512, 768, 1024] },
  { file: 'rocket.png', name: 'rocket', widths: [500, 999] },
  { file: 'adobe-reader.png', name: 'adobe-reader', widths: [300, 600] },
  { file: 'ie.png', name: 'ie', widths: [256, 512] },
  { file: 'header-logo.png', name: 'header-logo', widths: [246, 369, 492] },
  { file: 'toolbar.png', name: 'toolbar', widths: [400, 600, 1014] },
  {
    file: 'ultron-origins.jpg',
    name: 'ultron-origins',
    widths: [400, 634, 1268],
    fallback: 'jpeg',
  },
  ...['astronaut', 'bypass', 'ram', 'design', 'security', 'safety', 'autofill', 'pink'].map(
    (name) => ({ file: `features/${name}.png`, name, widths: [140, 280, 420, 560] }),
  ),
];

const formats = {
  avif: (img) => img.avif({ quality: 60, effort: 6 }),
  webp: (img) => img.webp({ quality: 85, effort: 6 }),
  png: (img) => img.png({ compressionLevel: 9, palette: false }),
  jpeg: (img) => img.jpeg({ quality: 85, mozjpeg: true }),
};

async function isFresh(src, out) {
  try {
    const [a, b] = await Promise.all([stat(src), stat(out)]);
    return b.mtimeMs >= a.mtimeMs;
  } catch {
    return false;
  }
}

await mkdir(outDir, { recursive: true });
const manifest = {};
let written = 0;

for (const image of images) {
  const src = join(mastersDir, image.file);
  const input = await readFile(src);
  const meta = await sharp(input).metadata();
  const fallback = image.fallback ?? 'png';
  manifest[image.name] = { width: meta.width, height: meta.height, widths: image.widths, fallback };

  for (const width of image.widths) {
    if (width > meta.width)
      throw new Error(`${image.file}: requested ${width}px but master is ${meta.width}px`);
    for (const format of ['avif', 'webp', fallback]) {
      const ext = format === 'jpeg' ? 'jpg' : format;
      const out = join(outDir, `${image.name}-${width}.${ext}`);
      if (await isFresh(src, out)) continue;
      const pipeline = sharp(input).resize({ width, withoutEnlargement: true });
      await formats[format](pipeline).toFile(out);
      written += 1;
    }
  }
}

await writeFile(join(outDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(
  `images: ${Object.keys(images).length} sources, ${written} files written to public/img`,
);
