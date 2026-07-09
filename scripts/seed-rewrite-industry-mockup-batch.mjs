/**
 * Re-seed bài rewrite ngành — cập nhật HTML (ảnh nội dung #2..n) + thumbnail DB.
 * Chạy: node scripts/seed-rewrite-industry-mockup-batch.mjs
 *       node scripts/seed-rewrite-industry-mockup-batch.mjs --rewrite-only
 *       node scripts/seed-rewrite-industry-mockup-batch.mjs --thumbnails-only
 */
import { pathToFileURL } from "node:url";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));

const REWRITE_SEEDS = [
  "seed-rewrite-thiet-ke-website-pccc.mjs",
  "seed-rewrite-thiet-ke-website-thiet-bi-pccc.mjs",
  "seed-rewrite-thiet-ke-website-nha-khoa.mjs",
  "seed-rewrite-thiet-ke-website-nha-khoa-nieng-rang.mjs",
  "seed-rewrite-thiet-ke-website-logistics-van-tai.mjs",
  "seed-rewrite-thiet-ke-website-cong-ty-luat.mjs",
  "seed-rewrite-thiet-ke-website-phap-luat-luat-su.mjs",
  "seed-rewrite-thiet-ke-website-tham-my-vien.mjs",
  "seed-rewrite-thiet-ke-website-spa.mjs",
  "seed-rewrite-thiet-ke-website-phong-kham-da-khoa.mjs",
  "seed-rewrite-thiet-ke-website-my-pham.mjs",
  "seed-rewrite-thiet-ke-website-my-pham-lam-dep.mjs",
  "seed-rewrite-thiet-ke-website-thang-may.mjs",
  "seed-rewrite-thiet-ke-website-co-khi.mjs",
  "seed-rewrite-thiet-ke-website-gia-cong-cnc.mjs",
  "seed-rewrite-thiet-ke-website-in-an-bao-bi.mjs",
  "seed-rewrite-thiet-ke-website-tu-dong-hoa.mjs",
  "seed-rewrite-thiet-ke-website-khach-san.mjs",
  "seed-rewrite-thiet-ke-website-nha-hang.mjs",
  "seed-rewrite-thiet-ke-website-tre-em-mam-non.mjs",
  "seed-rewrite-thiet-ke-website-kien-truc-noi-that.mjs",
  "seed-rewrite-thiet-ke-website-noi-that-showroom.mjs",
  "seed-rewrite-thiet-ke-website-cong-ty-xay-dung.mjs",
  "seed-rewrite-thiet-ke-website-xay-dung-nha-thau.mjs",
  "seed-rewrite-thiet-ke-website-ho-so-nang-luc.mjs",
  "seed-rewrite-thiet-ke-website-bat-dong-san.mjs",
  "seed-rewrite-thiet-ke-website-bat-dong-san-du-an.mjs",
];

const THUMBNAIL_SEEDS = [
  "seed-pccc-thumbnails.mjs",
  "seed-nha-khoa-thumbnails.mjs",
  "seed-tham-my-thumbnails.mjs",
  "seed-phong-kham-thumbnails.mjs",
  "seed-my-pham-thumbnails.mjs",
  "seed-luat-thumbnails.mjs",
  "seed-thang-may-thumbnails.mjs",
  "seed-logistics-thumbnails.mjs",
  "seed-co-khi-thumbnails.mjs",
  "seed-bao-bi-thumbnails.mjs",
  "seed-tu-dong-hoa-thumbnails.mjs",
  "seed-kien-truc-thumbnails.mjs",
  "seed-khach-san-thumbnails.mjs",
  "seed-mam-non-thumbnails.mjs",
  "seed-thiet-bi-ve-sinh-thumbnails.mjs",
  "seed-bat-dong-san-thumbnails.mjs",
];

const args = new Set(process.argv.slice(2).map((a) => a.replace(/^--/, "")));
const rewriteOnly = args.has("rewrite-only");
const thumbnailsOnly = args.has("thumbnails-only");

async function runScripts(label, files) {
  let ok = 0;
  let fail = 0;
  console.log(`\n=== ${label} (${files.length} scripts) ===\n`);

  for (const file of files) {
    process.stdout.write(`→ ${file} … `);
    try {
      await import(pathToFileURL(path.join(scriptsDir, file)).href);
      ok++;
      console.log("OK");
    } catch (err) {
      fail++;
      console.log("FAIL");
      console.error(`  ${err.message}`);
    }
  }

  return { ok, fail };
}

let rewriteStats = { ok: 0, fail: 0 };
let thumbStats = { ok: 0, fail: 0 };

if (!thumbnailsOnly) {
  rewriteStats = await runScripts("Re-seed rewrite content", REWRITE_SEEDS);
}

if (!rewriteOnly) {
  thumbStats = await runScripts("Re-seed thumbnails", THUMBNAIL_SEEDS);
}

if (!thumbnailsOnly && rewriteStats.ok > 0) {
  await revalidateBlogAfterSeed();
}

console.log(
  `\nHoàn tất: rewrite ${rewriteStats.ok}/${REWRITE_SEEDS.length} OK (${rewriteStats.fail} lỗi), thumbnails ${thumbStats.ok}/${THUMBNAIL_SEEDS.length} OK (${thumbStats.fail} lỗi).`,
);

if (rewriteStats.fail + thumbStats.fail > 0) process.exit(1);
