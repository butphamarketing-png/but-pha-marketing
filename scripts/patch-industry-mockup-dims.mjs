import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const patchPath = path.join(root, "tmp-programmatic", "industry-mockup-dims-patch.json");
const dimPath = path.join(root, "lib", "industry-mockup-dimensions.generated.ts");

const patch = JSON.parse(fs.readFileSync(patchPath, "utf8"));
let src = fs.readFileSync(dimPath, "utf8");

for (const [key, value] of Object.entries(patch)) {
  const entry = `"${key}": { width: ${value.width}, height: ${value.height} }`;
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`"${escaped}"\\s*:\\s*\\{[^}]+\\}`);
  if (re.test(src)) {
    src = src.replace(re, entry);
  } else {
    src = src.replace(/\n\};\s*$/, `,\n  ${entry}\n};\n`);
  }
}

fs.writeFileSync(dimPath, src);
console.log("Patched", Object.keys(patch).length, "dimension entries");
