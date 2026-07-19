import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "public/about/about-city-bg.png");
const out = path.join(root, "public/about/about-city-bg-deep.png");

const meta = await sharp(src).metadata();
const w = meta.width || 1920;
const h = meta.height || 1080;

/** Tím deep rõ skyline — không crush thành đen */
const overlay = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0%" stop-color="#1a1438" stop-opacity="0.35"/>
      <stop offset="45%" stop-color="#2a1f55" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#120e28" stop-opacity="0.42"/>
    </linearGradient>
    <radialGradient id="a" cx="42%" cy="8%" r="68%">
      <stop offset="0%" stop-color="#C4955A" stop-opacity="0.28"/>
      <stop offset="45%" stop-color="#8B7CF6" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="v" cx="78%" cy="22%" r="52%">
      <stop offset="0%" stop-color="#9B8CFF" stop-opacity="0.42"/>
      <stop offset="55%" stop-color="#6B5CE6" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="mid" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#5B4DB8" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#mid)"/>
  <rect width="100%" height="100%" fill="url(#a)"/>
  <rect width="100%" height="100%" fill="url(#v)"/>
</svg>`);

await sharp(src)
  .modulate({ brightness: 0.62, saturation: 1.55, hue: 278 })
  .tint({ r: 48, g: 36, b: 92 })
  .composite([{ input: overlay, blend: "over" }])
  .png()
  .toFile(out);

console.log("OK", out, fs.statSync(out).size);
