import fs from "node:fs";
import path from "node:path";

const cmsDir = "public/cms";
const indexHtml = fs.readFileSync(path.join(cmsDir, "index.html"), "utf8");
const match = indexHtml.match(/\/cms\/assets\/(index-[^"]+\.js)/);
if (!match) {
  console.error("Could not find CMS bundle in public/cms/index.html");
  process.exit(1);
}

const bundlePath = path.join(cmsDir, "assets", match[1]);
const s = fs.readFileSync(bundlePath, "utf8");
console.log(`Auditing ${bundlePath} (${(s.length / 1024).toFixed(0)} KB)\n`);

const keys = [
  "revenue-comparison",
  "ar-aging",
  "invoice-reconciliation",
  "reports/cash-flow",
  "/contracts",
  "/employees",
  "/audit-logs",
  "Quản Lý",
  "Phải Trả NCC",
  "Hệ Thống",
  "Nhật Ký",
  "_none",
  'SelectItem value:""',
  "Ce,{value:\"\"",
  'variant:"ghost",size:"sm",onClick',
];

for (const k of keys) {
  const ok = s.includes(k);
  const label = k.includes('""') || k.includes("ghost") ? (ok ? "FOUND (review)" : "OK") : ok ? "YES" : "NO";
  console.log(k, label);
}
