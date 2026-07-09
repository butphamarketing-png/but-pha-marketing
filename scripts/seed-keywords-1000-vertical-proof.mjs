/**
 * Seed 1000 từ khóa vertical proof (batch 11 + 12).
 * Plan: seo-vertical-proof-90d — 6 vertical ưu tiên.
 * Chạy: npm run seed:keywords-1000-vertical
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runner = path.join(root, "scripts", "seed-keywords-500-batch-runner.mjs");
const extraArgs = process.argv.slice(2);

function run(batch) {
  console.log(`\n########## BATCH ${batch} ##########\n`);
  const result = spawnSync(process.execPath, [runner, String(batch), ...extraArgs], {
    cwd: root,
    encoding: "utf8",
    stdio: "inherit",
  });
  return (result.status ?? 1) === 0;
}

const ok11 = run(11);
const ok12 = run(12);

console.log("\n=== Vertical proof 1000 summary ===");
console.log(`Batch 11: ${ok11 ? "OK" : "FAIL"}`);
console.log(`Batch 12: ${ok12 ? "OK" : "FAIL"}`);

if (!ok11 || !ok12) process.exit(1);
