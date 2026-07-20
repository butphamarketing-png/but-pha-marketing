/**
 * Thay base facebook-marketing.png & google-maps-marketing.png (bản có robot)
 * bằng ảnh không robot. Rồi force-regen toàn bộ thumb chủ đề FB/Maps.
 *
 *   node scripts/purge-robot-marketing-bases.mjs
 *   node scripts/purge-robot-marketing-bases.mjs --regen
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tin = path.join(root, "public/tin-tuc");
const DO_REGEN = process.argv.includes("--regen");

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function buildFacebookBase() {
  const safe = path.join(tin, "facebook-marketing-1.png");
  const out = path.join(tin, "facebook-marketing.png");
  if (!fs.existsSync(safe)) throw new Error("Missing facebook-marketing-1.png");
  await sharp(safe).resize(1672, 941, { fit: "cover" }).png({ compressionLevel: 8 }).toFile(out);
  console.log("FB base ← facebook-marketing-1.png (no robot)");
}

async function buildMapsBase() {
  const safe = path.join(tin, "google-maps-marketing-1.png");
  const out = path.join(tin, "google-maps-marketing.png");
  if (!fs.existsSync(safe)) throw new Error("Missing google-maps-marketing-1.png");
  await sharp(safe).resize(1672, 941, { fit: "cover" }).png({ compressionLevel: 8 }).toFile(out);
  console.log("Maps base ← google-maps-marketing-1.png (no robot)");
}

async function auditRobotishBases() {
  // Replace numbered variants that match main robot file size closely? 
  // Safer: point TOPIC pools to safe files only via rewriting gen scripts.
  const safeFb = ["facebook-marketing-1.png"];
  // Keep 2-8 if they exist but gen will prefer new main + 1
  console.log("Safe FB variants:", safeFb.join(", "));
}

async function main() {
  await buildFacebookBase();
  await buildMapsBase();
  await auditRobotishBases();

  // Backup note: robot originals overwritten — intentional

  if (!DO_REGEN) {
    console.log("Bases ready. Run with --regen to rebuild FB/Maps article thumbs.");
    return;
  }

  // Collect slugs via child calling force script in chunks — use dedicated regen
  const script = path.join(root, "scripts/regen-fb-maps-thumbs-no-robot.mjs");
  if (!fs.existsSync(script)) {
    console.error("Missing", script);
    process.exit(1);
  }
  const r = spawnSync(process.execPath, [script], { cwd: root, stdio: "inherit" });
  process.exit(r.status || 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
