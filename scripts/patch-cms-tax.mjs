/**
 * CMS menu: Trách nhiệm thuế + sub-pages (TNCN, TNDN, HĐĐT).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = path.join(root, "public", "cms", "assets");
const bundlePath = fs
  .readdirSync(assetsDir)
  .filter((f) => f.startsWith("index-") && f.endsWith(".js"))
  .map((f) => path.join(assetsDir, f))[0];

if (!bundlePath) {
  console.error("No CMS bundle found");
  process.exit(1);
}

let s = fs.readFileSync(bundlePath, "utf8");
const originalLen = s.length;

const billingAnchor =
  '{href:"/reports/billing-periods",label:"Kỳ Thu theo Tháng",icon:xq}';
const taxMain = '{href:"/cms/tax",label:"Trách Nhiệm Thuế",icon:jq}';
const taxSubmenus =
  '{href:"/cms/tax/ctv",label:"TNCN CTV",icon:J1},{href:"/cms/tax/tndn",label:"TNDN Tạm Nộp",icon:tm},{href:"/cms/tax/hddt",label:"Hóa Đơn ĐT",icon:fG}';
const taxBlock = `${taxMain},${taxSubmenus}`;

if (s.includes('href:"/cms/tax/hddt"')) {
  console.log("Tax submenu: already applied");
} else if (s.includes(taxMain)) {
  s = s.replace(taxMain, taxBlock);
  console.log("Tax submenu: extended existing Trách Nhiệm Thuế item");
} else if (s.includes(billingAnchor)) {
  s = s.replace(billingAnchor, `${billingAnchor},${taxBlock}`);
  console.log("Tax menu block: applied");
} else {
  console.log("Tax menu: skipped (anchor not found)");
}

fs.writeFileSync(bundlePath, s);
console.log(`Patched ${path.basename(bundlePath)} (${originalLen} -> ${s.length} bytes)`);
