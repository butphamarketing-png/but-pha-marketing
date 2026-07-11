/**
 * P1.2 — re-seed 5 template còn lại (<8k → ≥12k)
 * Chạy: node scripts/seed-rewrite-templates-p1-batch2.mjs
 */
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const SCRIPTS = [
  "./seed-template-website-spa-2026.mjs",
  "./seed-template-website-tham-my-vien-2026.mjs",
  "./seed-template-website-phong-kham-2026.mjs",
  "./seed-template-website-my-pham-2026.mjs",
  "./seed-template-website-pccc-2026.mjs",
];

console.log("=== P1.2 template batch 2 rewrite ===\n");
let ok = 0;
let fail = 0;

for (const script of SCRIPTS) {
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
