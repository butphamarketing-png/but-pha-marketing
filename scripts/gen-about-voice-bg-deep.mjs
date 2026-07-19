import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "public/about/about-city-bg.png");
const out = path.join(root, "public/about/about-voice-bg-deep.png");

const meta = await sharp(src).metadata();
const w = meta.width || 1920;
const h = meta.height || 1080;

/** Nền tiếng nói: city soft + sóng/vòng “echo” tím */
const overlay = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a1035" stop-opacity="0.55"/>
      <stop offset="40%" stop-color="#2a1858" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#0e0a1c" stop-opacity="0.62"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="18%" r="55%">
      <stop offset="0%" stop-color="#A78BFA" stop-opacity="0.45"/>
      <stop offset="45%" stop-color="#7C3AED" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="amber" cx="30%" cy="12%" r="40%">
      <stop offset="0%" stop-color="#C4955A" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="echo1" cx="50%" cy="58%" r="28%">
      <stop offset="70%" stop-color="#8B7CF6" stop-opacity="0"/>
      <stop offset="85%" stop-color="#8B7CF6" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#8B7CF6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="echo2" cx="50%" cy="58%" r="42%">
      <stop offset="78%" stop-color="#C4B5FD" stop-opacity="0"/>
      <stop offset="90%" stop-color="#C4B5FD" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#C4B5FD" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#base)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <rect width="100%" height="100%" fill="url(#amber)"/>
  <rect width="100%" height="100%" fill="url(#echo1)"/>
  <rect width="100%" height="100%" fill="url(#echo2)"/>
</svg>`);

await sharp(src)
  .modulate({ brightness: 0.55, saturation: 1.35, hue: 280 })
  .tint({ r: 42, g: 28, b: 88 })
  .composite([{ input: overlay, blend: "over" }])
  .png()
  .toFile(out);

console.log("OK", out, fs.statSync(out).size);
