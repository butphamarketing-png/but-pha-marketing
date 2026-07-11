/**
 * Tuần 1 SEO silo — re-seed pillar, money pages, checklist priority.
 * Chạy: node scripts/seed-rewrite-seo-silo-week1.mjs
 */
import { PILLAR_THIET_KE_WEBSITE } from "./seo-pillar-thiet-ke-website.mjs";
import { REWRITE_THIET_KE_WEBSITE_CHUAN_SEO } from "./seo-rewrite-thiet-ke-website-chuan-seo.mjs";
import { REWRITE_THIET_KE_WEBSITE_WORDPRESS } from "./seo-rewrite-thiet-ke-website-wordpress.mjs";
import { REWRITE_THIET_KE_WEBSITE_MY_PHAM } from "./seo-rewrite-thiet-ke-website-my-pham.mjs";
import { REWRITE_THIET_KE_WEBSITE_MY_PHAM_LAM_DEP } from "./seo-rewrite-thiet-ke-website-my-pham-lam-dep.mjs";
import { REWRITE_THIET_KE_WEBSITE_NHA_KHOA } from "./seo-rewrite-thiet-ke-website-nha-khoa.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const REWRITE_ARTICLES = [
  PILLAR_THIET_KE_WEBSITE,
  REWRITE_THIET_KE_WEBSITE_CHUAN_SEO,
  REWRITE_THIET_KE_WEBSITE_WORDPRESS,
  REWRITE_THIET_KE_WEBSITE_MY_PHAM_LAM_DEP,
  REWRITE_THIET_KE_WEBSITE_MY_PHAM,
  REWRITE_THIET_KE_WEBSITE_NHA_KHOA,
];

const CHECKLIST_SCRIPTS = [
  "./seed-checklist-website-nha-khoa-2026.mjs",
  "./seed-checklist-website-tham-my-vien-2026.mjs",
  "./seed-checklist-website-phong-kham-2026.mjs",
  "./seed-checklist-website-logistics-2026.mjs",
  "./seed-checklist-website-my-pham-2026.mjs",
];

console.log("=== SEO silo week 1 — re-seed ===\n");

let ok = 0;
let fail = 0;

for (const article of REWRITE_ARTICLES) {
  process.stdout.write(`→ ${article.slug} … `);
  try {
    await seedRewriteArticle(article, { log: false, revalidate: false });
    ok++;
    console.log("OK");
  } catch (err) {
    fail++;
    console.log("FAIL");
    console.error(`  ${err.message}`);
  }
}

for (const script of CHECKLIST_SCRIPTS) {
  process.stdout.write(`→ ${script} … `);
  try {
    await import(new URL(script, import.meta.url).href);
    ok++;
    console.log("OK");
  } catch (err) {
    fail++;
    console.log("FAIL");
    console.error(`  ${err.message}`);
  }
}

await revalidateBlogAfterSeed();
console.log(`\nHoàn tất: ${ok} OK, ${fail} lỗi.`);
if (fail) process.exit(1);
