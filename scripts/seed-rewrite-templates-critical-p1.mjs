/**
 * P1 — re-seed 3 template critical (<4k → ≥12k)
 * Chạy: node scripts/seed-rewrite-templates-critical-p1.mjs
 */
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const SCRIPTS = [
  "./seed-template-website-logistics-2026.mjs",
  "./seed-template-website-luat-2026.mjs",
  "./seed-template-website-co-khi-2026.mjs",
];

console.log("=== P1 template critical rewrite ===\n");
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
