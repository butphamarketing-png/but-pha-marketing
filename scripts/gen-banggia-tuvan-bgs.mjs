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

const jobs = [
  {
    src: path.join(assetsDir, "banggia-bg-concept.png"),
    conceptOut: path.join(root, "public/about/banggia-bg-concept.png"),
    out: path.join(root, "public/about/banggia-bg-deep.png"),
    label: "banggia",
  },
  {
    src: path.join(assetsDir, "tu-van-bg-concept.png"),
    conceptOut: path.join(root, "public/about/tu-van-bg-concept.png"),
    out: path.join(root, "public/about/tu-van-bg-deep.png"),
    label: "tu-van",
  },
];

const w = 1920;
const h = 1080;

function overlaySvg() {
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a1035" stop-opacity="0.4"/>
      <stop offset="45%" stop-color="#2a1858" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#0e0a1c" stop-opacity="0.52"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="18%" r="55%">
      <stop offset="0%" stop-color="#A78BFA" stop-opacity="0.26"/>
      <stop offset="50%" stop-color="#7C3AED" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="amber" cx="22%" cy="8%" r="38%">
      <stop offset="0%" stop-color="#C4955A" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#base)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <rect width="100%" height="100%" fill="url(#amber)"/>
</svg>`);
}

for (const job of jobs) {
  const src = fs.existsSync(job.src) ? job.src : job.conceptOut;
  if (!fs.existsSync(src)) {
    console.error("Missing", job.label, src);
    process.exit(1);
  }
  fs.copyFileSync(src, job.conceptOut);
  await sharp(src)
    .resize(w, h, { fit: "cover" })
    .modulate({ brightness: 0.8, saturation: 1.12 })
    .composite([{ input: overlaySvg(), blend: "over" }])
    .png()
    .toFile(job.out);
  console.log("OK", job.label, job.out, fs.statSync(job.out).size);
}
