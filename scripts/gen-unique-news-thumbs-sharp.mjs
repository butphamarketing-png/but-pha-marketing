/**
 * Tạo thumbnail riêng mỗi bài bằng Sharp (overlay tiêu đề) — không cần API / không cần bấm duyệt.
 * Usage: node scripts/gen-unique-news-thumbs-sharp.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const JOBS = [
  {
    base: "public/tin-tuc/crm/zoho-crm-hay-pipedrive.png",
    out: "public/tin-tuc/crm/hubspot-hay-zoho-crm.png",
    line1: "HUBSPOT HAY",
    line2: "ZOHO CRM?",
    accent: "#FF7A59",
  },
  {
    base: "public/tin-tuc/zalo/zns-la-gi.png",
    out: "public/tin-tuc/zalo/zalo-zns-la-gi-b17.png",
    line1: "ZALO ZNS",
    line2: "LÀ GÌ?",
    accent: "#0068FF",
  },
  {
    base: "public/tin-tuc/zalo/zns-hay-sms.png",
    out: "public/tin-tuc/zalo/zalo-zns-hay-sms-b17.png",
    line1: "ZALO ZNS",
    line2: "HAY SMS?",
    accent: "#00C2FF",
  },
  {
    base: "public/tin-tuc/zalo/zns-bi-tu-choi-template.png",
    out: "public/tin-tuc/zalo/zalo-zns-template-bi-tu-choi.png",
    line1: "ZNS TEMPLATE",
    line2: "BỊ TỪ CHỐI",
    accent: "#FF4D6A",
  },
  {
    base: "public/tin-tuc/zalo/zns-bi-tu-choi-template.png",
    out: "public/tin-tuc/zalo/zalo-zns-bi-tu-choi-b17.png",
    line1: "ZALO ZNS",
    line2: "BỊ TỪ CHỐI",
    accent: "#FF6B4A",
  },
  {
    base: "public/tin-tuc/zalo/zns-bi-tu-choi-template.png",
    out: "public/tin-tuc/zalo/zalo-zns-bi-chan.png",
    line1: "ZALO ZNS",
    line2: "BỊ CHẶN",
    accent: "#FF3B30",
  },
];

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function titleOverlaySvg(width, height, line1, line2, accent) {
  const barH = Math.round(height * 0.28);
  const y0 = height - barH;
  const fontSize = Math.round(height * 0.085);
  const fontSize2 = Math.round(height * 0.09);
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="45%" stop-color="#0a0c14" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#06070c" stop-opacity="0.92"/>
    </linearGradient>
  </defs>
  <rect x="0" y="${y0 - 40}" width="${width}" height="${barH + 40}" fill="url(#g)"/>
  <rect x="48" y="${height - 28}" width="120" height="8" rx="4" fill="${accent}"/>
  <text x="48" y="${height - barH + fontSize + 8}" font-family="Arial Black, Arial, sans-serif" font-size="${fontSize}" font-weight="900" fill="#FFFFFF" letter-spacing="1">${escapeXml(line1)}</text>
  <text x="48" y="${height - barH + fontSize + fontSize2 + 18}" font-family="Arial Black, Arial, sans-serif" font-size="${fontSize2}" font-weight="900" fill="${accent}" letter-spacing="1">${escapeXml(line2)}</text>
</svg>`);
}

async function run() {
  for (const job of JOBS) {
    const baseAbs = path.join(root, job.base);
    const outAbs = path.join(root, job.out);
    if (!fs.existsSync(baseAbs)) {
      console.error(`Missing base: ${job.base}`);
      process.exitCode = 1;
      continue;
    }
    fs.mkdirSync(path.dirname(outAbs), { recursive: true });

    const meta = await sharp(baseAbs).metadata();
    const w = meta.width || 1536;
    const h = meta.height || 1024;
    const overlay = titleOverlaySvg(w, h, job.line1, job.line2, job.accent);

    // Hue/tint shift nhẹ để mỗi file khác nhau rõ hơn
    const hue = Math.abs(hash(job.out)) % 40;
    await sharp(baseAbs)
      .modulate({ brightness: 0.92, saturation: 1.05, hue })
      .composite([{ input: overlay, top: 0, left: 0 }])
      .png({ quality: 90 })
      .toFile(outAbs);

    console.log(`OK ${job.out} (${fs.statSync(outAbs).size} bytes)`);
  }
  console.log("Done — unique thumbs via Sharp.");
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

await run();
