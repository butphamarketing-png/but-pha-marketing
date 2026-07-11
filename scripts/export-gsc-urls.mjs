/**
 * Export danh sách URL GSC (plain text) từ checklist.
 * Chạy: node scripts/export-gsc-urls.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configPath = path.join(root, "scripts", "programmatic-landings.config.json");
const outDir = path.join(root, "tmp-programmatic");
const SITE = "https://www.butphamarketing.com";

const CORE = [
  "/website",
  "/blog/thiet-ke-website",
  "/blog/bao-gia-thiet-ke-website",
  "/seo-website",
  "/du-an/van-toc-express-logistics",
  "/du-an/glow-dew-cosmetics",
  "/du-an/nha-khoa-dang-khoa",
];

const cfg = JSON.parse(fs.readFileSync(configPath, "utf8"));
const landings = (cfg.websiteIndustry || [])
  .filter((x) => x.indexOverride !== "noindex")
  .map((x) => `/website/nganh/${x.slug}`);

const paths = [...CORE, ...landings];
const urls = paths.map((p) => `${SITE}${p}`);

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "gsc-indexing-urls.txt"), urls.join("\n") + "\n", "utf8");
console.log(`Exported ${urls.length} URLs → tmp-programmatic/gsc-indexing-urls.txt`);
