/**
 * Tạo thư mục public/tin-tuc/{ngành}/hd/ cho mockup 1920px.
 * Chạy: node scripts/scaffold-mockup-hd-dirs.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gapPath = path.join(root, "tmp-programmatic", "mockup-hd-gap-report.json");

if (!fs.existsSync(gapPath)) {
  console.error("Run first: npm run build:mockup-hd-gap");
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(gapPath, "utf8"));
const created = [];

for (const g of report.gaps || []) {
  const hdRel = (g.suggestedHd || "").replace(/^\//, "");
  if (!hdRel) continue;
  const dir = path.join(root, "public", path.dirname(hdRel));
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    created.push(dir);
  }
  const readme = path.join(dir, "README.txt");
  if (!fs.existsSync(readme)) {
    fs.writeFileSync(
      readme,
      `Drop WebP mockup here: ${path.basename(g.suggestedHd || "file-1920.webp")}\nTarget width: 1920px\nSource: ${g.src}\n`,
      "utf8",
    );
  }
}

console.log("=== Scaffold mockup HD dirs ===");
console.log(`Dirs created: ${created.length}`);
created.forEach((d) => console.log(`  + ${path.relative(root, d)}`));
console.log("\nNext: export mockup → drop file → npm run audit:industry-mockup-dimensions");
