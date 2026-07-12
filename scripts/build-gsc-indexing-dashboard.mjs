/**
 * Dashboard GSC indexing — gộp batch 1–3 + lịch 10 URL/ngày.
 * Chạy: npm run build:gsc-indexing-dashboard
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tmp-programmatic");
const configPath = path.join(root, "scripts", "programmatic-landings.config.json");
const hotBlogPath = path.join(outDir, "gsc-hot-blog-urls.txt");
const outMd = path.join(outDir, "gsc-indexing-dashboard.md");

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

function loadHotBlog() {
  if (!fs.existsSync(hotBlogPath)) return [];
  return fs
    .readFileSync(hotBlogPath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((url) => ({ path: url.replace(SITE, ""), label: "hot blog", url }));
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const batch1 = CORE.map((u) => ({ ...u, batch: 1 }));
const batch2 = landingPaths().map((u) => ({ ...u, batch: 2 }));
const batch3 = loadHotBlog().map((u) => ({ path: u.path, label: u.label, batch: 3 }));
const all = [...batch1, ...batch2, ...batch3];

const schedule = [];
schedule.push({ day: "Thứ 2", title: "Batch 1 — Core", items: batch1 });
const landChunks = chunk(batch2, 12);
landChunks.forEach((items, i) => {
  schedule.push({ day: i === 0 ? "Thứ 3" : "Thứ 4", title: `Batch 2 — Landings (${i + 1}/${landChunks.length})`, items });
});
chunk(batch3, 10).forEach((items, i) => {
  schedule.push({ day: `Tuần 2 — Ngày ${i + 1}`, title: `Batch 3 — Hot blog (${i + 1})`, items });
});

const lines = [];
lines.push("# GSC Indexing Dashboard");
lines.push("");
lines.push(`- Generated: ${new Date().toISOString()}`);
lines.push(`- Tổng URL: **${all.length}** (core ${batch1.length} · landings ${batch2.length} · hot blog ${batch3.length})`);
lines.push(`- Chi tiết: \`gsc-copy-paste.md\` · \`gsc-hot-blog-batch.md\` · \`bing-wmt-checklist.md\``);
lines.push("");
lines.push("## Progress");
lines.push(`- [ ] Batch 1: 0/${batch1.length}`);
lines.push(`- [ ] Batch 2: 0/${batch2.length}`);
lines.push(`- [ ] Batch 3: 0/${batch3.length}`);
lines.push(`- [ ] **Tổng: 0/${all.length}**`);
lines.push("");
lines.push("## Lịch đề xuất");
lines.push("");

for (const block of schedule) {
  lines.push(`### ${block.day} — ${block.title} (${block.items.length} URL)`);
  for (const u of block.items) {
    const full = u.url || `${SITE}${u.path}`;
    lines.push(`- [ ] \`${u.path}\`${u.label !== "hot blog" ? ` — ${u.label}` : ""}`);
    lines.push(`  ${full}`);
  }
  lines.push("");
}

lines.push("## Sau khi index");
lines.push("- Bing WMT verify → `npm run ping:indexnow` + `npm run ping:indexnow:blog-hot`");
lines.push("- Log outreach: `npm run build:backlink-weekly-tracker -- --log=\"GSC indexed batch X\"`");
lines.push("- Smoke: `npm run smoke:gsc-urls` · `npm run smoke:gsc-hot-blog`");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outMd, lines.join("\n"), "utf8");
console.log("=== GSC indexing dashboard ===");
console.log(`Total: ${all.length} URLs`);
console.log(`Report: ${outMd}`);
