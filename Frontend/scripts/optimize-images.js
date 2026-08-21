/*
Image optimization script (uses sharp)

Usage:
  1. npm install --save-dev sharp
  2. npm run optimize:images

What it does:
- Creates public/favicon.png (32x32) from src/assets/logo.png
- Creates public/og-image.jpg (1200x630) from src/assets/hero-event.jpg (or other source)
- Produces smaller variants in public/assets/ (logo-64.png, logo-128.png)

NOTE: If sharp is not installed, the script prints instructions.
*/

const fs = require('fs');
const path = require('path');

const logoSrc = path.resolve(__dirname, '..', 'src', 'assets', 'logo.png');
const heroSrc = path.resolve(__dirname, '..', 'src', 'assets', 'hero-event.jpg');
const publicDir = path.resolve(__dirname, '..', 'public');
const assetsOut = path.join(publicDir, 'assets');

async function main() {
  try {
    const sharp = require('sharp');

    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
    if (!fs.existsSync(assetsOut)) fs.mkdirSync(assetsOut, { recursive: true });

    if (fs.existsSync(logoSrc)) {
      console.log('Optimizing logo -> favicon.png (32x32) and larger variants...');
      await sharp(logoSrc).resize(32, 32).png({ quality: 80 }).toFile(path.join(publicDir, 'favicon.png'));
      await sharp(logoSrc).resize(64, 64).png({ quality: 80 }).toFile(path.join(assetsOut, 'logo-64.png'));
      await sharp(logoSrc).resize(128, 128).png({ quality: 80 }).toFile(path.join(assetsOut, 'logo-128.png'));
    } else {
      console.warn('Logo source not found at', logoSrc);
    }

    if (fs.existsSync(heroSrc)) {
      console.log('Optimizing hero -> og-image.jpg (1200x630)...');
      await sharp(heroSrc).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 80 }).toFile(path.join(publicDir, 'og-image.jpg'));
    } else {
      console.warn('Hero source not found at', heroSrc);
    }

    console.log('Image optimization complete. Please commit public/favicon.png and public/og-image.jpg if you want them tracked.');
  } catch (err) {
    console.error('sharp not installed or error running sharp. To enable image optimization run:');
    console.error('  npm install --save-dev sharp');
    console.error('Then re-run: npm run optimize:images');
    process.exitCode = 1;
  }
}

main();
