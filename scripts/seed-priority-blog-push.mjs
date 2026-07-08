/**
 * Batch push priority blog articles: proof fixes + next industry silos.
 * Chạy: node scripts/seed-priority-blog-push.mjs
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const STEPS = [
  // Proof gap fixes (re-seed)
  "seed-rewrite-bao-gia-thiet-ke-website.mjs",
  "seed-rewrite-thiet-ke-website-wordpress.mjs",
  "seed-rewrite-thiet-ke-website-xay-dung-nha-thau.mjs",
  "seed-checklist-website-spa-2026.mjs",
  "seed-template-website-spa-2026.mjs",
  "seed-template-website-xay-dung-2026.mjs",
  // Next industry silos — thẩm mỹ
  "seed-rewrite-thiet-ke-website-tham-my-vien.mjs",
  "seed-checklist-website-tham-my-vien-2026.mjs",
  "seed-template-website-tham-my-vien-2026.mjs",
  // Phòng khám
  "seed-rewrite-thiet-ke-website-phong-kham-da-khoa.mjs",
  "seed-checklist-website-phong-kham-2026.mjs",
  "seed-template-website-phong-kham-2026.mjs",
  // Logistics
  "seed-rewrite-thiet-ke-website-logistics-van-tai.mjs",
  "seed-checklist-website-logistics-2026.mjs",
  "seed-template-website-logistics-2026.mjs",
  // Mỹ phẩm
  "seed-rewrite-thiet-ke-website-my-pham.mjs",
  "seed-checklist-website-my-pham-2026.mjs",
  "seed-template-website-my-pham-2026.mjs",
  // Cơ khí
  "seed-rewrite-thiet-ke-website-co-khi.mjs",
  "seed-checklist-website-co-khi-2026.mjs",
  "seed-template-website-co-khi-2026.mjs",
  // Luật
  "seed-rewrite-thiet-ke-website-cong-ty-luat.mjs",
  "seed-checklist-website-luat-2026.mjs",
  "seed-template-website-luat-2026.mjs",
];

function run(script) {
  const scriptPath = path.join(root, "scripts", script);
  console.log(`\n=== ${script} ===`);
  const result = spawnSync(process.execPath, [scriptPath], {
    cwd: root,
    encoding: "utf8",
    stdio: "pipe",
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  return { script, ok: (result.status ?? 1) === 0, status: result.status ?? 1 };
}

const results = STEPS.map(run);
const failed = results.filter((r) => !r.ok);

console.log("\n=== Batch summary ===");
console.log(`Total: ${results.length}`);
console.log(`Passed: ${results.length - failed.length}`);
console.log(`Failed: ${failed.length}`);
if (failed.length) {
  failed.forEach((f) => console.log(`  FAIL: ${f.script} (exit ${f.status})`));
  process.exit(1);
}
