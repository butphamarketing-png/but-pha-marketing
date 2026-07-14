/**
 * Upscale mockup ngành → WebP 1920px wide (từ gap report).
 * Chạy: npm run generate:mockup-hd
 * Dry-run: npm run generate:mockup-hd -- --dry-run
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gapPath = path.join(root, "tmp-programmatic", "mockup-hd-gap-report.json");
const HD_TARGET = 1920;
const dryRun = process.argv.includes("--dry-run");
const force = process.argv.includes("--force");

async function main() {
  if (!fs.existsSync(gapPath)) {
    console.error("Missing gap report. Run: npm run build:mockup-hd-gap");
    process.exit(1);
  }

  const report = JSON.parse(fs.readFileSync(gapPath, "utf8"));
  const gaps = (report.gaps || []).filter((g) => g.status === "needs-hd" || g.status === "missing-dim");
  let created = 0;
  let skipped = 0;

  for (const g of gaps) {
    const srcRel = (g.src || "").replace(/^\//, "");
    const hdRel = (g.suggestedHd || "").replace(/^\//, "");
    if (!srcRel || !hdRel) continue;

    const srcAbs = path.join(root, "public", srcRel);
    const hdAbs = path.join(root, "public", hdRel);

    if (!fs.existsSync(srcAbs)) {
      console.warn(`SKIP missing source: ${g.src}`);
      skipped++;
      continue;
    }

    if (fs.existsSync(hdAbs) && !force) {
      console.log(`SKIP exists: ${g.suggestedHd}`);
      skipped++;
      continue;
    }

    if (dryRun) {
      console.log(`DRY ${g.src} → ${g.suggestedHd}`);
      continue;
    }

    fs.mkdirSync(path.dirname(hdAbs), { recursive: true });

    const meta = await sharp(srcAbs).metadata();
    const srcWidth = meta.width || g.width;
    const scale = HD_TARGET / srcWidth;
    const outHeight = Math.round((meta.height || g.height) * scale);

    await sharp(srcAbs)
      .resize(HD_TARGET, outHeight, { fit: "fill", kernel: sharp.kernel.lanczos3 })
      .webp({ quality: 88, effort: 4 })
      .toFile(hdAbs);

    const kb = Math.round(fs.statSync(hdAbs).size / 1024);
    console.log(`OK ${g.suggestedHd} (${HD_TARGET}×${outHeight}, ${kb}KB)`);
    created++;
  }

  console.log("\n=== Generate mockup HD ===");
  console.log(`Created: ${created}`);
  console.log(`Skipped: ${skipped}`);
  if (dryRun) {
    console.log("Dry-run only — no files written.");
    return;
  }
  if (created > 0) {
    console.log("\nNext: npm run audit:industry-mockup-dimensions && npm run build:mockup-hd-gap");
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exitCode = 1;
});
