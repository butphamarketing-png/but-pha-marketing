/**
 * Sinh 1000 từ khóa SEO đa dạng từ nganh-nghe-500.md
 * Chạy: node scripts/_gen-keywords-1000.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mdPath = path.join(root, "tmp-programmatic", "nganh-nghe-500.md");
const outMd = path.join(root, "tmp-programmatic", "tu-khoa-1000.md");
const outJson = path.join(root, "tmp-programmatic", "tu-khoa-1000.json");

const md = fs.readFileSync(mdPath, "utf8");
const niches = [...md.matchAll(/^\d+\.\s+(.+?)\s+—\s+`([^`]+)`/gm)].map((m) => ({
  label: m[1].replace(/\s+/g, " ").trim(),
  slug: m[2].trim(),
}));

const cities = [
  { name: "TP.HCM", slug: "tphcm" },
  { name: "Hà Nội", slug: "ha-noi" },
  { name: "Đà Nẵng", slug: "da-nang" },
  { name: "Cần Thơ", slug: "can-tho" },
  { name: "Bình Dương", slug: "binh-duong" },
  { name: "Đồng Nai", slug: "dong-nai" },
  { name: "Hải Phòng", slug: "hai-phong" },
  { name: "Nha Trang", slug: "nha-trang" },
  { name: "Huế", slug: "hue" },
  { name: "Đà Lạt", slug: "da-lat" },
];

/** Quota mỗi nhóm → đủ 1000, đa intent */
const QUOTAS = [
  {
    group: "Money website",
    quota: 200,
    fn: (n) => ({
      kw: `thiết kế website ${n.label.toLowerCase()}`,
      slug: `thiet-ke-website-${n.slug}`,
      intent: "money",
    }),
  },
  {
    group: "Báo giá website",
    quota: 150,
    fn: (n) => ({
      kw: `báo giá thiết kế website ${n.label.toLowerCase()}`,
      slug: `bao-gia-thiet-ke-website-${n.slug}`,
      intent: "pricing",
    }),
  },
  {
    group: "Local (tỉnh/thành)",
    quota: 200,
    fn: (n, i) => {
      const c = cities[i % cities.length];
      return {
        kw: `thiết kế website ${n.label.toLowerCase()} ${c.name}`,
        slug: `thiet-ke-website-${n.slug}-${c.slug}`,
        intent: "local",
      };
    },
  },
  {
    group: "SEO Google Maps",
    quota: 120,
    fn: (n) => ({
      kw: `seo google maps ${n.label.toLowerCase()}`,
      slug: `seo-google-maps-${n.slug}`,
      intent: "maps",
    }),
  },
  {
    group: "Facebook Ads",
    quota: 120,
    fn: (n) => ({
      kw: `quảng cáo facebook ${n.label.toLowerCase()}`,
      slug: `quang-cao-facebook-${n.slug}`,
      intent: "facebook-ads",
    }),
  },
  {
    group: "Làm website",
    quota: 80,
    fn: (n) => ({
      kw: `làm website ${n.label.toLowerCase()}`,
      slug: `lam-website-${n.slug}`,
      intent: "money-alt",
    }),
  },
  {
    group: "Chi phí website",
    quota: 70,
    fn: (n) => ({
      kw: `chi phí làm website ${n.label.toLowerCase()}`,
      slug: `chi-phi-lam-website-${n.slug}`,
      intent: "pricing",
    }),
  },
  {
    group: "Fanpage",
    quota: 60,
    fn: (n) => ({
      kw: `thiết kế fanpage ${n.label.toLowerCase()}`,
      slug: `thiet-ke-fanpage-${n.slug}`,
      intent: "fanpage",
    }),
  },
];

const TARGET = 1000;
const seen = new Set();
const rows = [];

function add(row, group) {
  const key = row.kw.toLowerCase();
  if (seen.has(key) || seen.has(row.slug)) return false;
  seen.add(key);
  seen.add(row.slug);
  rows.push({ ...row, group });
  return true;
}

for (const p of QUOTAS) {
  let added = 0;
  for (let i = 0; i < niches.length && added < p.quota && rows.length < TARGET; i++) {
    const row = p.fn(niches[i], i);
    if (add(row, p.group)) added++;
  }
}

/** Bù cho đủ 1000: local tỉnh xen kẽ + modifier */
const fillers = [
  (n, i) => {
    const c = cities[(i + 3) % cities.length];
    return {
      group: "Local (tỉnh/thành)",
      row: {
        kw: `thiết kế website ${n.label.toLowerCase()} ${c.name}`,
        slug: `thiet-ke-website-${n.slug}-${c.slug}`,
        intent: "local",
      },
    };
  },
  (n) => ({
    group: "Modifier",
    row: {
      kw: `thiết kế website ${n.label.toLowerCase()} chuyên nghiệp`,
      slug: `thiet-ke-website-${n.slug}-chuyen-nghiep`,
      intent: "modifier",
    },
  }),
  (n) => ({
    group: "Modifier",
    row: {
      kw: `thiết kế website ${n.label.toLowerCase()} giá rẻ`,
      slug: `thiet-ke-website-${n.slug}-gia-re`,
      intent: "modifier",
    },
  }),
  (n) => ({
    group: "Modifier",
    row: {
      kw: `thiết kế website ${n.label.toLowerCase()} trọn gói`,
      slug: `thiet-ke-website-${n.slug}-tron-goi`,
      intent: "modifier",
    },
  }),
  (n) => ({
    group: "Google Ads",
    row: {
      kw: `quảng cáo google ${n.label.toLowerCase()}`,
      slug: `quang-cao-google-${n.slug}`,
      intent: "google-ads",
    },
  }),
];

for (const fill of fillers) {
  for (let i = 0; i < niches.length && rows.length < TARGET; i++) {
    const { group, row } = fill(niches[i], i);
    add(row, group);
  }
}

const final = rows.slice(0, TARGET);
const byGroup = {};
for (const r of final) byGroup[r.group] = (byGroup[r.group] || 0) + 1;

const lines = [];
lines.push("# 1000 từ khóa SEO — mở rộng từ 500 ngành nghề");
lines.push("");
lines.push(`- Generated: ${new Date().toISOString()}`);
lines.push(`- Tổng: **${final.length}** từ khóa`);
lines.push(`- Nguồn ngành: \`nganh-nghe-500.md\` (${niches.length} ngành)`);
lines.push("");
lines.push("## Phân bổ theo nhóm");
lines.push("");
for (const [g, c] of Object.entries(byGroup)) lines.push(`- ${g}: ${c}`);
lines.push("");
lines.push("---");
lines.push("");

let n = 1;
let lastGroup = "";
for (const r of final) {
  if (r.group !== lastGroup) {
    lines.push(`## ${r.group}`);
    lines.push("");
    lastGroup = r.group;
  }
  lines.push(`${n}. **${r.kw}** — \`${r.slug}\` · _${r.intent}_`);
  n++;
}
lines.push("");

fs.writeFileSync(outMd, lines.join("\n"), "utf8");
fs.writeFileSync(
  outJson,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      total: final.length,
      groups: byGroup,
      keywords: final.map(({ kw, slug, intent, group }) => ({ kw, slug, intent, group })),
    },
    null,
    2,
  ),
  "utf8",
);

console.log("=== 1000 keywords ===");
console.log(`Total: ${final.length}`);
console.log(byGroup);
console.log(`MD: ${outMd}`);
