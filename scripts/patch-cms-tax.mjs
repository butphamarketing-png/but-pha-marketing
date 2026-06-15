/**
 * CMS menu: link to /cms/tax (Trách nhiệm thuế).
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

const anchor =
  '{href:"/reports/billing-periods",label:"Kỳ Thu theo Tháng",icon:xq}';
const insert =
  '{href:"/reports/billing-periods",label:"Kỳ Thu theo Tháng",icon:xq},{href:"/cms/tax",label:"Trách Nhiệm Thuế",icon:jq}';

if (s.includes('href:"/cms/tax",label:"Trách Nhiệm Thuế"')) {
  console.log("Tax menu item: already applied");
} else if (s.includes(anchor)) {
  s = s.replace(anchor, insert);
  console.log("Tax menu item: applied");
} else {
  console.log("Tax menu item: skipped (anchor not found)");
}

fs.writeFileSync(bundlePath, s);
console.log(`Patched ${path.basename(bundlePath)} (${originalLen} -> ${s.length} bytes)`);
