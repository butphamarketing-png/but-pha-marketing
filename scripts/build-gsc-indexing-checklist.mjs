/**
 * Checklist GSC indexing + outreach tuần — ops off-page.
 * Chạy: node scripts/build-gsc-indexing-checklist.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tmp-programmatic");
const outPath = path.join(outDir, "gsc-indexing-checklist.md");
const configPath = path.join(root, "scripts", "programmatic-landings.config.json");

const SITE = "https://www.butphamarketing.com";

const CORE_URLS = [
  { path: "/website", label: "Money — dịch vụ website" },
  { path: "/blog/thiet-ke-website", label: "Pillar cluster" },
  { path: "/blog/bao-gia-thiet-ke-website", label: "Money — báo giá" },
  { path: "/seo-website", label: "Service pillar SEO" },
  { path: "/du-an/van-toc-express-logistics", label: "Case study logistics mới" },
  { path: "/du-an/glow-dew-cosmetics", label: "Case study mỹ phẩm mới" },
  { path: "/du-an/nha-khoa-dang-khoa", label: "Case study GSC proof" },
];

function landingUrls() {
  if (!fs.existsSync(configPath)) return [];
  const cfg = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const industries = Array.isArray(cfg.websiteIndustry) ? cfg.websiteIndustry : [];
  return industries
    .filter((x) => x.indexOverride !== "noindex")
    .map((x) => ({
      path: `/website/nganh/${x.slug}`,
      label: `Landing ${x.slug} (index)`,
    }));
}

const PRIORITY_URLS = [...CORE_URLS, ...landingUrls()];

const lines = [];
lines.push("# GSC Indexing & Outreach Checklist");
lines.push("");
lines.push(`- Generated at: ${new Date().toISOString()}`);
lines.push(`- Total URLs: **${PRIORITY_URLS.length}** (core + programmatic landings)`);
lines.push("");
lines.push("## 1. Request indexing (Google Search Console)");
lines.push("");
for (const u of PRIORITY_URLS) {
  lines.push(`- [ ] \`${u.path}\` — ${u.label}`);
  lines.push(`      ${SITE}${u.path}`);
}
lines.push("");
lines.push("## 2. Outreach tuần (copy từ syndication)");
lines.push("- [ ] 1 guest post / PR → `/website`");
lines.push("- [ ] 1 case study share → `/du-an/nha-khoa-dang-khoa` hoặc logistics/mỹ phẩm mới");
lines.push("- [ ] 2 social → pillar `/blog/thiet-ke-website`");
lines.push("- [ ] 1 vertical snippet → xem `vertical-syndication-snippets.md`");
lines.push("- [ ] 1 directory citation NAP đồng bộ");
lines.push("- [ ] Log placement → `npm run build:backlink-weekly-tracker -- --log=\"...\"`");
lines.push("");
lines.push("## 3. Theo dõi KPI tuần");
lines.push("- [ ] Brand query impressions (GSC)");
lines.push("- [ ] Referring domains mới (Ahrefs/GSC links)");
lines.push("- [ ] Assisted conversions từ blog → `/lien-he`");
lines.push("- [ ] `npm run run:seo-weekly` — audit xanh");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log("=== GSC indexing checklist ===");
console.log(`URLs: ${PRIORITY_URLS.length} (${landingUrls().length} landings)`);
console.log(`Report: ${outPath}`);
