/**
 * Keep customer entry dialog open when switching browser tabs (Radix onFocusOutside).
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
  'children:c.jsxs(gn,{className:"max-h-[92vh] max-w-lg overflow-y-auto sm:max-w-xl",children:[c.jsxs(bn,{children:[c.jsx(xn,{className:"text-left",children:"Nhập / sửa khách hàng"})';
const replacement =
  'children:c.jsxs(gn,{className:"max-h-[92vh] max-w-lg overflow-y-auto sm:max-w-xl",onFocusOutside:e=>e.preventDefault(),children:[c.jsxs(bn,{children:[c.jsx(xn,{className:"text-left",children:"Nhập / sửa khách hàng"})';

if (s.includes("onFocusOutside:e=>e.preventDefault(),children:[c.jsxs(bn,{children:[c.jsx(xn,{className:\"text-left\",children:\"Nhập / sửa khách hàng\"})")) {
  console.log("Customer dialog onFocusOutside: already applied");
} else if (!s.includes(anchor)) {
  console.log("Customer dialog onFocusOutside: skipped (anchor not found)");
} else {
  s = s.replace(anchor, replacement);
  console.log("Customer dialog onFocusOutside: applied");
}

fs.writeFileSync(bundlePath, s);
console.log(`Patched ${path.basename(bundlePath)} (${originalLen} -> ${s.length} bytes)`);
