import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir =
  process.env.BPM_ASSETS ||
  path.join(
    process.env.USERPROFILE || "",
    ".cursor/projects/c-Users-Admin-Downloads-ButPhaMarketing-1/assets",
  );

const srcCandidate = path.join(assetsDir, "du-an-bg-concept.png");
const conceptOut = path.join(root, "public/about/du-an-bg-concept.png");
const out = path.join(root, "public/about/du-an-bg-deep.png");
const src = fs.existsSync(srcCandidate) ? srcCandidate : conceptOut;

if (!fs.existsSync(src)) {
  console.error("Missing", src);
  process.exit(1);
}

fs.copyFileSync(src, conceptOut);

const w = 1920;
const h = 1080;
const overlay = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0%" stop-color="#1a1035" stop-opacity="0.38"/>
      <stop offset="50%" stop-color="#2a1858" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#0e0a1c" stop-opacity="0.5"/>
    </linearGradient>
    <radialGradient id="glow" cx="55%" cy="20%" r="55%">
      <stop offset="0%" stop-color="#A78BFA" stop-opacity="0.28"/>
      <stop offset="55%" stop-color="#7C3AED" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="amber" cx="18%" cy="12%" r="40%">
      <stop offset="0%" stop-color="#C4955A" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#base)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <rect width="100%" height="100%" fill="url(#amber)"/>
</svg>`);

await sharp(src)
  .resize(w, h, { fit: "cover" })
  .modulate({ brightness: 0.82, saturation: 1.12 })
  .composite([{ input: overlay, blend: "over" }])
  .png()
  .toFile(out);

console.log("OK", out, fs.statSync(out).size);
