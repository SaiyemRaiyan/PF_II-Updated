// One-off: converts the original repo pictures into small, EXIF-free WebP files.
// Usage: node scripts/optimize-images.mjs <path-to-old-Pictures-folder>
import sharp from 'sharp';
import path from 'node:path';
const src = process.argv[2];
const map = {
  'EM.jpeg': ['portrait', 900],
  'Text-Summarization.jpg': ['summaryscribe', 900],
  'LLM sum.jpeg': ['llm-summarizing', 900],
  'obj detection.jpeg': ['object-detection', 900],
  'vaccine info.png': ['vaccination', 900],
  'path.jpg': ['poth-nirdeshika', 900],
  'LPG.jpg': ['lpg-detector', 900],
  'CPU.jpg': ['cpu-scheduling', 900],
  'atm.jpeg': ['atm', 900],
  'diabetes.jpg': ['diabetes', 900],
  'travel mate.jpeg': ['cholo-ghuri', 900],
  'heart disease.avif': ['heart-disease', 900],
  'Vanderbilt.jpeg': ['issuer-vanderbilt', 160],
  'skillup_online_logo.jpeg': ['issuer-skillup', 160],
};
for (const [file, [name, w]] of Object.entries(map)) {
  // sharp drops EXIF/GPS metadata by default unless .withMetadata() is called
  const info = await sharp(path.join(src, file)).rotate().resize({ width: w, withoutEnlargement: true })
    .webp({ quality: 78 }).toFile(`public/img/${name}.webp`);
  console.log(name, info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB');
}
