/**
 * Phase 3: export URL local (tỉnh + quận) cho IndexNow + GSC.
 * Chạy: node scripts/export-phase3-local-urls.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://www.butphamarketing.com";
const outDir = path.join(root, "tmp-programmatic");

const generated = fs.readFileSync(path.join(root, "lib", "programmatic-seo.generated.ts"), "utf8");
const localBlock = generated.split("LOCAL_SEO_GENERATED")[1] || "";
const localSlugs = [...localBlock.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

const hubs = [
  "/seo-website",
  "/google-maps",
  "/banggia",
  "/website",
  "/lien-he",
];

const districtPriority = [
  "quan-1",
  "quan-3",
  "quan-7",
  "binh-thanh",
  "thu-duc",
  "go-vap",
  "cau-giay",
  "dong-da",
  "hai-ba-trung",
  "nam-tu-liem",
  "hai-chau",
  "thanh-khe",
];

const cityPriority = ["ho-chi-minh", "ha-noi", "da-nang"];

const orderedSlugs = [
  ...districtPriority,
  ...cityPriority,
  ...localSlugs.filter((s) => !districtPriority.includes(s) && !cityPriority.includes(s)),
];

const urls = [
  ...hubs.map((p) => `${SITE}${p}`),
  ...orderedSlugs.map((s) => `${SITE}/seo-website/dia-phuong/${s}`),
];

const unique = [...new Set(urls)];
fs.mkdirSync(outDir, { recursive: true });
const txt = path.join(outDir, "indexnow-phase3-local-urls.txt");
fs.writeFileSync(txt, unique.join("\n") + "\n", "utf8");

const md = path.join(outDir, "gsc-phase3-local-checklist.md");
const lines = [
  "# GSC + IndexNow — Phase 3 Local (tỉnh + quận)",
  "",
  `- Generated: ${new Date().toISOString()}`,
  `- Total: **${unique.length}**`,
  `- District landings: **${districtPriority.length}**`,
  "",
  "## IndexNow",
  "```",
  "npm run ping:indexnow:phase3-local",
  "```",
  "",
  "## GSC Request Indexing (ưu tiên 12 quận + 3 hub)",
  "",
];
unique.slice(0, 20).forEach((u, i) => {
  lines.push(`- [ ] ${i + 1}. ${u}`);
});
lines.push("", "## Full list", "", ...unique.map((u) => `- ${u}`), "");
fs.writeFileSync(md, lines.join("\n"), "utf8");

console.log(`URLs: ${unique.length}`);
console.log(txt);
console.log(md);
