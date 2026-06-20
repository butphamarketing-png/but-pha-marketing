import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tin = path.join(root, "public", "tin-tuc");

function copy(src, dest) {
  fs.copyFileSync(src, dest);
  console.log("copied", path.basename(dest));
}

if (!fs.existsSync(tin)) fs.mkdirSync(tin, { recursive: true });

copy(path.join(root, "public", "Facebook.png"), path.join(tin, "facebook-marketing.png"));
copy(path.join(root, "public", "GoogleMaps.png"), path.join(tin, "google-maps-marketing.png"));

const fbDir = path.join(root, "public", "Facebook");
fs.readdirSync(fbDir)
  .filter((f) => f.endsWith(".png"))
  .sort()
  .forEach((f, i) => copy(path.join(fbDir, f), path.join(tin, `facebook-marketing-${i + 1}.png`)));

const gmDir = path.join(root, "public", "Google Maps");
fs.readdirSync(gmDir)
  .filter((f) => f.endsWith(".png"))
  .sort()
  .forEach((f, i) => copy(path.join(gmDir, f), path.join(tin, `google-maps-marketing-${i + 1}.png`)));

console.log("Done preparing tin-tuc images.");
