const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const framesDir = path.join(__dirname, 'public', 'seedance_frames');
const outDir = path.join(__dirname, 'public', 'seedance_frames_webp');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

const files = fs.readdirSync(framesDir).filter(f => f.endsWith('.png'));

async function compressAll() {
  for (const file of files) {
    const inputPath = path.join(framesDir, file);
    const outputPath = path.join(outDir, file.replace('.png', '.webp'));
    console.log(`Compressing ${file}...`);
    // Convert to lossless WebP, keeping original size
    await sharp(inputPath)
      .webp({ lossless: true })
      .toFile(outputPath);
  }
  console.log('Compression complete!');
}

compressAll().catch(console.error);
