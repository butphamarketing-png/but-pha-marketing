/**
 * Phase 2: export URL money ưu tiên cho IndexNow + GSC checklist.
 * Chạy: node scripts/export-phase2-money-urls.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://www.butphamarketing.com";
const outDir = path.join(root, "tmp-programmatic");

const catalog = fs.readFileSync(path.join(root, "lib", "website-industry-catalog.ts"), "utf8");
const landings = [...catalog.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1]);
// only top-level industry slugs from item({ slug:
const industrySlugs = [...catalog.matchAll(/item\(\{\s*slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const blogMoney = [...catalog.matchAll(/blogMoneySlug:\s*"([^"]+)"/g)].map((m) => m[1]);

const core = [
  "/",
  "/website",
  "/banggia",
  "/seo-website",
  "/lien-he",
  "/du-an",
  "/blog/thiet-ke-website",
  "/blog/bao-gia-thiet-ke-website",
  "/blog/thiet-ke-website-spa",
  "/blog/thiet-ke-website-nha-khoa",
  "/blog/thiet-ke-website-tp-hcm",
  "/du-an/van-toc-express-logistics",
  "/du-an/glow-dew-cosmetics",
  "/du-an/nha-khoa-dang-khoa",
  "/du-an/phuoc-lai-luxury",
  "/google-maps",
  "/facebook",
];

const urls = [
  ...core.map((p) => `${SITE}${p}`),
  ...industrySlugs.map((s) => `${SITE}/website/nganh/${s}`),
  ...blogMoney.map((s) => `${SITE}/blog/${s}`),
];

const unique = [...new Set(urls)];
fs.mkdirSync(outDir, { recursive: true });
const txt = path.join(outDir, "indexnow-phase2-money-urls.txt");
fs.writeFileSync(txt, unique.join("\n") + "\n", "utf8");

const md = path.join(outDir, "gsc-phase2-money-checklist.md");
const lines = [
  "# GSC + IndexNow — Phase 2 Money URLs",
  "",
  `- Generated: ${new Date().toISOString()}`,
  `- Total: **${unique.length}**`,
  "",
  "## IndexNow",
  "```",
  `npm run ping:indexnow -- --urls=tmp-programmatic/indexnow-phase2-money-urls.txt`,
  "```",
  "",
  "## GSC Request Indexing (ưu tiên 15 URL đầu)",
  "",
];
unique.slice(0, 15).forEach((u, i) => {
  lines.push(`- [ ] ${i + 1}. ${u}`);
});
lines.push("", "## Full list", "", ...unique.map((u) => `- ${u}`), "");
fs.writeFileSync(md, lines.join("\n"), "utf8");

console.log(`URLs: ${unique.length}`);
console.log(txt);
console.log(md);
