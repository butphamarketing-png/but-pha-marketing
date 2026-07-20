/**
 * Screenshot mockup trang chủ nha khoa → PNG + HD WebP sắc nét.
 * Chạy: node scripts/shot-nha-khoa-homepage-mockup.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { chromium } from "playwright";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = path.join(root, "tmp-programmatic", "nha-khoa-homepage-mockup.html");
const outPng = path.join(root, "public", "tin-tuc", "nha-khoa", "nha-khoa-1.png");
const outHd = path.join(root, "public", "tin-tuc", "nha-khoa", "hd", "nha-khoa-1-1920.webp");
const previewOut = path.join(root, "tmp-programmatic", "nha-khoa-homepage-preview.png");

const VIEW_W = 1200;

async function main() {
  if (!fs.existsSync(htmlPath)) {
    console.error("Missing HTML:", htmlPath);
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: VIEW_W, height: 900 },
    deviceScaleFactor: 2,
  });

  const fileUrl = "file:///" + htmlPath.replace(/\\/g, "/");
  await page.goto(fileUrl, { waitUntil: "networkidle", timeout: 120000 });
  await page.waitForTimeout(1500);

  const height = await page.evaluate(() => {
    const el = document.getElementById("page");
    return el ? Math.ceil(el.getBoundingClientRect().height) : document.body.scrollHeight;
  });

  await page.setViewportSize({ width: VIEW_W, height: Math.min(height + 20, 16000) });
  await page.waitForTimeout(400);

  const buf = await page.locator("#page").screenshot({ type: "png" });
  await browser.close();

  fs.mkdirSync(path.dirname(outHd), { recursive: true });
  fs.writeFileSync(previewOut, buf);

  // HD WebP @ 1920 wide (deviceScaleFactor=2 → ~2400px native; normalize to 1920)
  const hdMeta = await sharp(buf).metadata();
  const hd = await sharp(buf)
    .resize(1920, Math.round((1920 / (hdMeta.width || VIEW_W * 2)) * (hdMeta.height || 1)), {
      fit: "fill",
      kernel: sharp.kernel.lanczos3,
    })
    .webp({ quality: 92, effort: 5 })
    .toFile(outHd);

  // Card/list PNG ~560px wide (giữ tỉ lệ, sắc nét từ nguồn 2x)
  const thumbW = 560;
  const thumbH = Math.round((thumbW / (hdMeta.width || VIEW_W * 2)) * (hdMeta.height || 1));
  await sharp(buf)
    .resize(thumbW, thumbH, { fit: "fill", kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 8 })
    .toFile(outPng);

  const pngStat = fs.statSync(outPng);
  const hdStat = fs.statSync(outHd);
  console.log("OK preview:", previewOut);
  console.log(`OK PNG: ${outPng} (${thumbW}×${thumbH}, ${Math.round(pngStat.size / 1024)}KB)`);
  console.log(`OK HD:  ${outHd} (1920×?, ${Math.round(hdStat.size / 1024)}KB)`, hd);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
