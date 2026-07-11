/**
 * P1.4 — seed 2 case study blog mới (logistics + mỹ phẩm)
 * Chạy: node scripts/seed-case-studies-p1-batch.mjs
 */
const SCRIPTS = [
  "./seed-case-study-van-toc-express-logistics-blog.mjs",
  "./seed-case-study-glow-dew-cosmetics-blog.mjs",
];

console.log("=== P1.4 case study blog batch ===\n");
for (const script of SCRIPTS) {
  process.stdout.write(`→ ${script} … `);
  await import(new URL(script, import.meta.url).href);
  console.log("OK");
}
console.log("\nHoàn tất 2 case study blog.");
