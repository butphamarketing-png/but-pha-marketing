/**
 * GSC copy-paste checklist — chỉ URL + hướng dẫn ngắn.
 * Chạy: npm run build:gsc-copy-paste
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tmp-programmatic");
const configPath = path.join(root, "scripts", "programmatic-landings.config.json");
const outMd = path.join(outDir, "gsc-copy-paste.md");
const outTxt = path.join(outDir, "gsc-indexing-urls.txt");

const SITE = "https://www.butphamarketing.com";

const CORE = [
  { path: "/website", label: "Money" },
  { path: "/blog/thiet-ke-website", label: "Pillar" },
  { path: "/blog/bao-gia-thiet-ke-website", label: "Money báo giá" },
  { path: "/seo-website", label: "SEO pillar" },
  { path: "/du-an/van-toc-express-logistics", label: "Case logistics" },
  { path: "/du-an/glow-dew-cosmetics", label: "Case mỹ phẩm" },
  { path: "/du-an/nha-khoa-dang-khoa", label: "Case GSC proof" },
];

function landingPaths() {
  const cfg = JSON.parse(fs.readFileSync(configPath, "utf8"));
  return (cfg.websiteIndustry || [])
    .filter((x) => x.indexOverride !== "noindex")
    .map((x) => ({ path: `/website/nganh/${x.slug}`, label: x.slug }));
}

const core = CORE;
const landings = landingPaths();
const all = [...core, ...landings];
const urls = all.map((u) => `${SITE}${u.path}`);

const lines = [];
lines.push("# GSC Copy-Paste — Request Indexing");
lines.push("");
lines.push(`- Generated: ${new Date().toISOString()}`);
lines.push(`- Total: **${all.length} URL**`);
lines.push("");
lines.push("## Cách làm (2 phút/URL)");
lines.push("1. Mở [Google Search Console](https://search.google.com/search-console)");
lines.push("2. Chọn property `https://www.butphamarketing.com`");
lines.push("3. Thanh trên → dán URL → Enter");
lines.push("4. **Request indexing** (nếu có nút)");
lines.push("5. Tick checkbox bên dưới khi xong");
lines.push("");
lines.push("## Batch 1 — Core (7 URL) · làm trước");
lines.push("");
for (const u of core) {
  lines.push(`- [ ] \`${u.path}\` — ${u.label}`);
  lines.push(`  ${SITE}${u.path}`);
}
lines.push("");
lines.push("## Batch 2 — Landings (23 URL)");
lines.push("");
for (const u of landings) {
  lines.push(`- [ ] \`${u.path}\` — ${u.label}`);
  lines.push(`  ${SITE}${u.path}`);
}
lines.push("");
lines.push("## Copy nhanh — tất cả URL (1 URL/dòng)");
lines.push("```");
lines.push(urls.join("\n"));
lines.push("```");
lines.push("");
lines.push("## Sau khi xong");
lines.push("- IndexNow đã ping: `npm run ping:indexnow`");
lines.push("- Smoke test: `npm run smoke:gsc-urls`");
lines.push("- Theo dõi 7–14 ngày trong GSC → Pages → Not indexed");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outMd, lines.join("\n"), "utf8");
fs.writeFileSync(outTxt, urls.join("\n") + "\n", "utf8");

console.log("=== GSC copy-paste ===");
console.log(`MD: ${outMd}`);
console.log(`TXT: ${outTxt} (${urls.length} URLs)`);
