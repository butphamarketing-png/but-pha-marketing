import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bases = [
  "public/about/about-city-bg-deep.png",
  "public/tin-tuc/tin-tuc-marketing.png",
  "public/hero-slideshow/hero-slide-01-strategy.png",
]
  .map((p) => path.join(root, p))
  .filter((p) => fs.existsSync(p));

if (!bases.length) {
  console.error("No base image");
  process.exit(1);
}

const w = 1200;
const h = 630;
const svg = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#06070c" stop-opacity="0.85"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <text x="64" y="270" font-family="Arial Black, Arial, sans-serif" font-size="48" font-weight="900" fill="#FFFFFF">BUT PHA MARKETING</text>
  <text x="64" y="340" font-family="Arial, sans-serif" font-size="26" fill="#C4955A">Website · Facebook · Maps · SEO</text>
  <rect x="64" y="370" width="120" height="6" rx="3" fill="#8B7CF6"/>
</svg>`);

const ogOut = path.join(root, "public/opengraph.jpg");
const logoOut = path.join(root, "public/logo.jpg");

await sharp(bases[0])
  .resize(w, h, { fit: "cover" })
  .modulate({ brightness: 0.72, saturation: 1.1 })
  .composite([{ input: svg, top: 0, left: 0 }])
  .jpeg({ quality: 86 })
  .toFile(ogOut);

await sharp(path.join(root, "public/logo.png")).jpeg({ quality: 90 }).toFile(logoOut);

console.log("Wrote", ogOut, fs.statSync(ogOut).size);
console.log("Wrote", logoOut, fs.statSync(logoOut).size);
