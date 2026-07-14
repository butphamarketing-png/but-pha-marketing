/**
 * Liệt kê mockup /tin-tuc dưới 900px và thiếu bản HD 1920.webp
 * Chạy: node scripts/audit-blurry-mockups.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dimsPath = path.join(root, "lib", "industry-mockup-dimensions.generated.ts");
const text = fs.readFileSync(dimsPath, "utf8");

/** @type {Record<string, {width:number,height:number}>} */
const dims = {};
for (const m of text.matchAll(/"(\/tin-tuc\/[^"]+)": \{ width: (\d+), height: (\d+) \}/g)) {
  dims[m[1]] = { width: Number(m[2]), height: Number(m[3]) };
}

function hdMockupVariantSrc(src) {
  const m = src.match(new RegExp("^(/tin-tuc/.*/)([^/]+)\\.(png|jpe?g)$", "i"));
  if (!m) return null;
  const base = m[2].replace(/\.(png|jpe?g)$/i, "");
  return `${m[1]}hd/${base}-1920.webp`;
}

const lowRes = [];
const missingHd = [];
const hasHd = [];

for (const [src, d] of Object.entries(dims)) {
  if (src.includes("/hd/")) continue;
  if (d.width >= 900) continue;
  if (!/\.(png|jpe?g)$/i.test(src)) continue;
  const row = { src, width: d.width, height: d.height };
  lowRes.push(row);
  const hd = hdMockupVariantSrc(src);
  if (hd && dims[hd]) hasHd.push({ ...row, hd, hdW: dims[hd].width });
  else missingHd.push(row);
}

console.log("=== Audit mockup mờ (width < 900, ngoài /hd/) ===");
console.log(`Low-res PNG/JPG: ${lowRes.length}`);
console.log(`Đã có HD webp: ${hasHd.length}  ← blog vẫn mờ nếu HTML trỏ PNG`);
console.log(`Thiếu HD: ${missingHd.length}`);

const byFolder = {};
for (const row of missingHd) {
  const parts = row.src.split("/");
  const folder = parts.length >= 3 ? parts.slice(0, 3).join("/") : row.src;
  byFolder[folder] = (byFolder[folder] || 0) + 1;
}
console.log("\n--- Thiếu HD theo thư mục ---");
Object.entries(byFolder)
  .sort((a, b) => b[1] - a[1])
  .forEach(([k, v]) => console.log(`  ${k}: ${v} file`));

console.log("\n--- Ngành đã có HD (hero landing OK, blog inline vẫn risk) ---");
[...new Set(hasHd.map((r) => r.src.split("/").slice(0, 3).join("/")))].sort().forEach((f) => console.log(`  ${f}`));
