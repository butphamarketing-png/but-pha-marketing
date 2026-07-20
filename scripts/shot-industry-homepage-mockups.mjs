/**
 * Render HTML + screenshot mockup trang chủ cho mọi ngành (trừ nha-khoa đã làm tay).
 *
 *   node scripts/shot-industry-homepage-mockups.mjs
 *   node scripts/shot-industry-homepage-mockups.mjs --only=spa,co-khi
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { chromium } from "playwright";
import sharp from "sharp";
import { INDUSTRY_HOMEPAGE_MOCKUPS } from "./industry-homepage-mockup-config.mjs";
import { buildIndustryHomepageHtml } from "./build-industry-homepage-html.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlDir = path.join(root, "tmp-programmatic", "industry-homepage-mockups");
const VIEW_W = 1200;

const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const only = onlyArg
  ? new Set(
      onlyArg
        .slice("--only=".length)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    )
  : null;

function outPaths(slug) {
  const dir = path.join(root, "public", "tin-tuc", slug);
  return {
    dir,
    png: path.join(dir, `${slug}-1.png`),
    hdDir: path.join(dir, "hd"),
    hd: path.join(dir, "hd", `${slug}-1-1920.webp`),
    html: path.join(htmlDir, `${slug}.html`),
  };
}

async function shotOne(browser, cfg) {
  const paths = outPaths(cfg.slug);
  fs.mkdirSync(htmlDir, { recursive: true });
  fs.mkdirSync(paths.dir, { recursive: true });
  fs.mkdirSync(paths.hdDir, { recursive: true });

  const html = buildIndustryHomepageHtml(cfg);
  fs.writeFileSync(paths.html, html, "utf8");

  const page = await browser.newPage({
    viewport: { width: VIEW_W, height: 900 },
    deviceScaleFactor: 2,
  });

  const fileUrl = "file:///" + paths.html.replace(/\\/g, "/");
  await page.goto(fileUrl, { waitUntil: "networkidle", timeout: 120000 });
  await page.waitForTimeout(800);

  const height = await page.evaluate(() => {
    const el = document.getElementById("page");
    return el ? Math.ceil(el.getBoundingClientRect().height) : document.body.scrollHeight;
  });

  await page.setViewportSize({ width: VIEW_W, height: Math.min(height + 20, 16000) });
  await page.waitForTimeout(300);

  const buf = await page.locator("#page").screenshot({ type: "png" });
  await page.close();

  const hdMeta = await sharp(buf).metadata();
  const srcW = hdMeta.width || VIEW_W * 2;
  const srcH = hdMeta.height || 1;

  await sharp(buf)
    .resize(1920, Math.round((1920 / srcW) * srcH), {
      fit: "fill",
      kernel: sharp.kernel.lanczos3,
    })
    .webp({ quality: 92, effort: 4 })
    .toFile(paths.hd);

  const thumbW = 560;
  const thumbH = Math.round((thumbW / srcW) * srcH);
  await sharp(buf)
    .resize(thumbW, thumbH, { fit: "fill", kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 8 })
    .toFile(paths.png);

  const pngKb = Math.round(fs.statSync(paths.png).size / 1024);
  const hdKb = Math.round(fs.statSync(paths.hd).size / 1024);
  console.log(`✓ ${cfg.slug}: ${thumbW}×${thumbH} (${pngKb}KB) · HD ${hdKb}KB`);
  return { slug: cfg.slug, png: paths.png, hd: paths.hd, thumbW, thumbH };
}

async function main() {
  const list = INDUSTRY_HOMEPAGE_MOCKUPS.filter((c) => !only || only.has(c.slug));
  if (!list.length) {
    console.error("No industries to shoot");
    process.exit(1);
  }

  console.log(`Shooting ${list.length} industry homepage mockups...`);
  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const cfg of list) {
      results.push(await shotOne(browser, cfg));
    }
  } finally {
    await browser.close();
  }

  const dimPath = path.join(root, "tmp-programmatic", "industry-mockup-dims-patch.json");
  const patch = {};
  for (const r of results) {
    const relPng = `/tin-tuc/${r.slug}/${r.slug}-1.png`;
    const relHd = `/tin-tuc/${r.slug}/hd/${r.slug}-1-1920.webp`;
    const hdMeta = await sharp(r.hd).metadata();
    patch[relPng] = { width: r.thumbW, height: r.thumbH };
    patch[relHd] = { width: hdMeta.width || 1920, height: hdMeta.height || 0 };
  }
  fs.writeFileSync(dimPath, JSON.stringify(patch, null, 2));
  console.log("Wrote dim patch:", dimPath);
  console.log("Done:", results.map((r) => r.slug).join(", "));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
