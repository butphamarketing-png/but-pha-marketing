import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "public", "Tin tức");
const destDir = path.join(root, "public", "tin-tuc");

fs.mkdirSync(destDir, { recursive: true });

const map = [
  ["Tin tức Marketing.png", "tin-tuc-marketing.png"],
  ["thiết kế website.png", "thiet-ke-website.png"],
  ...Array.from({ length: 10 }, (_, i) => [
    `thiết kế website ${i + 1}.png`,
    `thiet-ke-website-${i + 1}.png`,
  ]),
];

for (const [from, to] of map) {
  fs.copyFileSync(path.join(srcDir, from), path.join(destDir, to));
  console.log("Copied:", to);
}

console.log("Done.", fs.readdirSync(destDir).length, "files in public/tin-tuc");
