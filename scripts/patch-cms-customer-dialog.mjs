/**
 * Keep customer entry dialog open when switching browser tabs,
 * without blocking focus moves between form fields (IME / click).
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

const badFocusOutside = "onFocusOutside:x=>x.preventDefault()";
const goodFocusOutside =
  'onFocusOutside:x=>{const o=x.detail?.originalEvent;!o?.relatedTarget&&x.preventDefault()}';

if (s.includes(goodFocusOutside)) {
  console.log("Customer dialog onFocusOutside: already applied (tab-switch only)");
} else if (s.includes(badFocusOutside)) {
  s = s.replaceAll(badFocusOutside, goodFocusOutside);
  console.log("Customer dialog onFocusOutside: fixed (tab-switch only)");
} else {
  console.log("Customer dialog onFocusOutside: skipped (anchor not found)");
}

fs.writeFileSync(bundlePath, s);
console.log(`Patched ${path.basename(bundlePath)} (${originalLen} -> ${s.length} bytes)`);
