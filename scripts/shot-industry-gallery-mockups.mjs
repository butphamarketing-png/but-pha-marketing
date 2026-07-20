/**
 * Screenshot gallery mockups *-2 … *-5 cho mọi ngành.
 *
 *   node scripts/shot-industry-gallery-mockups.mjs
 *   node scripts/shot-industry-gallery-mockups.mjs --only=spa,co-khi
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { chromium } from "playwright";
import sharp from "sharp";
import { INDUSTRY_HOMEPAGE_MOCKUPS } from "./industry-homepage-mockup-config.mjs";
import { GALLERY_BUILDERS } from "./build-industry-gallery-html.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlDir = path.join(root, "tmp-programmatic", "industry-gallery-mockups");
const VIEW_W = 1200;
const VARIANTS = [2, 3, 4, 5];

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

async function shotBuf(browser, htmlPath) {
  const page = await browser.newPage({
    viewport: { width: VIEW_W, height: 900 },
    deviceScaleFactor: 2,
  });
  await page.goto("file:///" + htmlPath.replace(/\\/g, "/"), {
    waitUntil: "networkidle",
    timeout: 120000,
  });
  await page.waitForTimeout(500);
  const height = await page.evaluate(() => {
    const el = document.getElementById("page");
    return el ? Math.ceil(el.getBoundingClientRect().height) : document.body.scrollHeight;
  });
  await page.setViewportSize({ width: VIEW_W, height: Math.min(height + 20, 16000) });
  await page.waitForTimeout(200);
  const buf = await page.locator("#page").screenshot({ type: "png" });
  await page.close();
  return buf;
}

async function writeOutputs(slug, n, buf) {
  const dir = path.join(root, "public", "tin-tuc", slug);
  const hdDir = path.join(dir, "hd");
  fs.mkdirSync(hdDir, { recursive: true });
  const png = path.join(dir, `${slug}-${n}.png`);
  const hd = path.join(hdDir, `${slug}-${n}-1920.webp`);

  const meta = await sharp(buf).metadata();
  const srcW = meta.width || VIEW_W * 2;
  const srcH = meta.height || 1;

  await sharp(buf)
    .resize(1920, Math.round((1920 / srcW) * srcH), {
      fit: "fill",
      kernel: sharp.kernel.lanczos3,
    })
    .webp({ quality: 90, effort: 4 })
    .toFile(hd);

  const thumbW = 560;
  const thumbH = Math.round((thumbW / srcW) * srcH);
  await sharp(buf)
    .resize(thumbW, thumbH, { fit: "fill", kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 8 })
    .toFile(png);

  const hdMeta = await sharp(hd).metadata();
  return {
    pngRel: `/tin-tuc/${slug}/${slug}-${n}.png`,
    hdRel: `/tin-tuc/${slug}/hd/${slug}-${n}-1920.webp`,
    thumbW,
    thumbH,
    hdW: hdMeta.width || 1920,
    hdH: hdMeta.height || 0,
  };
}

async function main() {
  const list = INDUSTRY_HOMEPAGE_MOCKUPS.filter((c) => !only || only.has(c.slug));
  if (!list.length) {
    console.error("No industries");
    process.exit(1);
  }

  fs.mkdirSync(htmlDir, { recursive: true });
  console.log(`Gallery 2–5 × ${list.length} industries = ${list.length * 4} shots`);

  const browser = await chromium.launch({ headless: true });
  const patch = {};
  try {
    for (const cfg of list) {
      for (const n of VARIANTS) {
        const build = GALLERY_BUILDERS[n];
        const htmlPath = path.join(htmlDir, `${cfg.slug}-${n}.html`);
        fs.writeFileSync(htmlPath, build(cfg), "utf8");
        const buf = await shotBuf(browser, htmlPath);
        const out = await writeOutputs(cfg.slug, n, buf);
        patch[out.pngRel] = { width: out.thumbW, height: out.thumbH };
        patch[out.hdRel] = { width: out.hdW, height: out.hdH };
        process.stdout.write(`✓ ${cfg.slug}-${n} `);
      }
      console.log("");
    }
  } finally {
    await browser.close();
  }

  const dimPatch = path.join(root, "tmp-programmatic", "industry-mockup-dims-patch.json");
  fs.writeFileSync(dimPatch, JSON.stringify(patch, null, 2));
  console.log("Wrote", dimPatch, Object.keys(patch).length, "keys");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
