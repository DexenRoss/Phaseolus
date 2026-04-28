const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('ffmpeg-static');
const sharp = require('sharp');

const videoPath = "C:\\Users\\sasuk\\Downloads\\Video Project.mp4";
const tempDir = path.join(__dirname, 'temp_frames');
const outDir = path.join(__dirname, 'public', 'seedance_frames_webp_v2');

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

async function main() {
  console.log("Getting video duration...");
  let duration = 0;
  try {
    execSync(`"${ffmpeg}" -i "${videoPath}"`, { stdio: 'pipe' });
  } catch (e) {
    const stderr = e.stderr.toString();
    const match = stderr.match(/Duration: (\d{2}):(\d{2}):(\d{2}\.\d+)/);
    if (match) {
      duration = parseInt(match[1]) * 3600 + parseInt(match[2]) * 60 + parseFloat(match[3]);
    }
  }

  if (duration === 0) {
    console.error("Could not determine duration.");
    return;
  }
  
  console.log(`Duration: ${duration}s. Extracting 60 frames...`);
  const fps = 60 / duration;
  
  // Extract to png
  try {
    execSync(`"${ffmpeg}" -y -i "${videoPath}" -vf "fps=${fps}" "${tempDir}/frame_%02d.png"`, { stdio: 'inherit' });
  } catch (e) {
    console.error("Error extracting frames", e);
  }

  console.log("Converting to lossless WebP...");
  let files = fs.readdirSync(tempDir).filter(f => f.endsWith('.png'));
  
  // Make sure we only process exactly 60 if it extracted a bit more
  files = files.slice(0, 60);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = path.join(tempDir, file);
    // Rename to 1-indexed format
    const outName = `frame_${String(i + 1).padStart(2, '0')}.webp`;
    const outputPath = path.join(outDir, outName);
    
    await sharp(inputPath)
      .webp({ lossless: true })
      .toFile(outputPath);
      
    process.stdout.write(`\rConverted ${i + 1}/${files.length}`);
  }
  console.log("\nCleaning up temp files...");
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log("Done!");
}

main().catch(console.error);
