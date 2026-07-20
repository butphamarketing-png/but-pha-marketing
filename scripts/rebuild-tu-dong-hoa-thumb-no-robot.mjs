/**
 * Tạo lại nganh-thumbs/tu-dong-hoa.png — KHÔNG dùng ảnh robot.
 * Base = mockup UI HTML (PLC/SCADA/dashboard), crop 16:9 card.
 *
 *   node scripts/rebuild-tu-dong-hoa-thumb-no-robot.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mockup = path.join(root, "public/tin-tuc/tu-dong-hoa/tu-dong-hoa-1.png");
const out = path.join(root, "public/tin-tuc/nganh-thumbs/tu-dong-hoa.png");
const W = 1536;
const H = 1024;

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function main() {
  if (!fs.existsSync(mockup)) {
    console.error("Missing mockup:", mockup);
    process.exit(1);
  }

  const overlay = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0e7490" stop-opacity="0.15"/>
      <stop offset="55%" stop-color="#0f172a" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#042f2e" stop-opacity="0.88"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <text x="48" y="${H - 120}" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="3" fill="#5eead4">TỰ ĐỘNG HÓA</text>
  <text x="48" y="${H - 70}" font-family="Arial Black, Arial, sans-serif" font-size="42" font-weight="900" fill="#FFFFFF">${escapeXml("THIẾT KẾ WEBSITE")}</text>
  <text x="48" y="${H - 28}" font-family="Arial Black, Arial, sans-serif" font-size="40" font-weight="900" fill="#5eead4">${escapeXml("PLC · SCADA · IoT")}</text>
</svg>`);

  // Crop top portion of long mockup (hero + services) then cover 1536x1024
  const meta = await sharp(mockup).metadata();
  const srcW = meta.width || 560;
  const srcH = meta.height || 899;
  const cropH = Math.min(srcH, Math.round(srcW * (H / W) * 1.15));

  await sharp(mockup)
    .extract({ left: 0, top: 0, width: srcW, height: cropH })
    .resize(W, H, { fit: "cover", position: "north" })
    .modulate({ brightness: 0.92, saturation: 1.05 })
    .composite([{ input: overlay, top: 0, left: 0 }])
    .png({ compressionLevel: 8 })
    .toFile(out);

  console.log("OK", out, `${W}x${H}`, Math.round(fs.statSync(out).size / 1024) + "KB");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
