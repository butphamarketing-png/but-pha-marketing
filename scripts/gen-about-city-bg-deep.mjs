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

const overlay = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e1018" stop-opacity="0.5"/>
      <stop offset="50%" stop-color="#1a1430" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#0a0914" stop-opacity="0.55"/>
    </linearGradient>
    <radialGradient id="a" cx="50%" cy="0%" r="70%">
      <stop offset="0%" stop-color="#C4955A" stop-opacity="0.22"/>
      <stop offset="60%" stop-color="#8B7CF6" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="v" cx="88%" cy="18%" r="48%">
      <stop offset="0%" stop-color="#8B7CF6" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#a)"/>
  <rect width="100%" height="100%" fill="url(#v)"/>
</svg>`);

await sharp(src)
  .modulate({ brightness: 0.45, saturation: 1.4, hue: 275 })
  .tint({ r: 36, g: 24, b: 68 })
  .composite([{ input: overlay, blend: "over" }])
  .png()
  .toFile(out);

console.log("OK", out, fs.statSync(out).size);
