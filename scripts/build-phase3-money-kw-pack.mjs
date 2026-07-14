/**
 * Phase 3: tracker 5 money KW + seed-gate checklist.
 * Chạy: node scripts/build-phase3-money-kw-pack.mjs
 *       npm run build:phase3-money-kw-pack
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tmp-programmatic");
const SITE = "https://www.butphamarketing.com";

/** Mirror lib/money-kw-targets.ts — keep in sync */
const MONEY = [
  {
    id: "thiet-ke-website",
    keyword: "thiết kế website",
    primary: "/website",
    secondary: "/blog/thiet-ke-website",
    benchmark: "Mona / WebsiteViet",
  },
  {
    id: "bao-gia",
    keyword: "báo giá thiết kế website",
    primary: "/banggia",
    secondary: "/blog/bao-gia-thiet-ke-website",
    benchmark: "Expro / K-Tech",
  },
  {
    id: "tphcm",
    keyword: "thiết kế website tphcm",
    primary: "/seo-website/dia-phuong/ho-chi-minh",
    secondary: "/seo-website/dia-phuong/quan-1",
    benchmark: "Mona HCM / Cánh Cam",
  },
  {
    id: "spa",
    keyword: "thiết kế website spa",
    primary: "/website/nganh/spa",
    secondary: "/blog/thiet-ke-website-spa",
    benchmark: "Vertical agencies",
  },
  {
    id: "nha-khoa",
    keyword: "thiết kế website nha khoa",
    primary: "/website/nganh/nha-khoa",
    secondary: "/blog/thiet-ke-website-nha-khoa",
    benchmark: "Vertical + local",
  },
];

fs.mkdirSync(outDir, { recursive: true });

const week = new Date().toISOString().slice(0, 10);
const tracker = [
  `# Phase 3 — Money KW weekly tracker`,
  ``,
  `- Week of: **${week}**`,
  `- Mục tiêu 90 ngày: ≥3/5 KW vào top-20 **hoặc** CTR/impression ↑ rõ trên GSC`,
  ``,
  `## Cách ghi`,
  `1. GSC → Performance → filter exact query (hoặc gần đúng).`,
  `2. Ghi position avg, impressions, clicks, CTR 7 ngày vs tuần trước.`,
  `3. SERP spot-check incognito (địa điểm HCM) 1 lần/tuần.`,
  ``,
  `| KW | URL đích | Pos (ước) | Imp | Click | CTR | vs tuần trước | Note |`,
  `|----|----------|-----------|-----|-------|-----|---------------|------|`,
  ...MONEY.map(
    (m) =>
      `| ${m.keyword} | ${SITE}${m.primary} |  |  |  |  |  | vs ${m.benchmark} |`,
  ),
  ``,
  `## On-page checklist (mỗi URL đích)`,
  ...MONEY.flatMap((m, i) => [
    ``,
    `### ${i + 1}. ${m.keyword}`,
    `- [ ] Title/H1 chứa KW (hoặc biến thể tự nhiên)`,
    `- [ ] Meta description có CTA + số/proof nếu có`,
    `- [ ] CTA → /lien-he hoặc form; secondary → /banggia khi phù hợp`,
    `- [ ] Internal link từ ≥3 URL liên quan (pillar / ngành / local)`,
    `- [ ] Primary: \`${m.primary}\` · Secondary: \`${m.secondary}\``,
    `- [ ] Không có blog/landing khác tranh cùng intent (canonical hoặc 301)`,
  ]),
  ``,
  `## GSC Request Index (5 primary)`,
  ...MONEY.map((m, i) => `- [ ] ${i + 1}. ${SITE}${m.primary}`),
  ``,
];

fs.writeFileSync(path.join(outDir, "phase3-money-kw-tracker.md"), tracker.join("\n"), "utf8");

const seedGate = [
  `# Phase 3 — Seed gate (có mở mass niche lại không?)`,
  ``,
  `- Generated: ${new Date().toISOString()}`,
  ``,
  `## Mặc định: **KHÔNG** mass-seed niche mới`,
  ``,
  `Chỉ resume \`seed:niche-*\` / customer-kw bulk khi **ĐỦ cả 3**:`,
  ``,
  `1. [ ] Money stack indexed ổn: ≥4/5 primary URL ở trạng thái Indexed (GSC URL Inspection)`,
  `2. [ ] Không spike «Crawled – currently not indexed» trên batch blog mới (so tuần trước)`,
  `3. [ ] ≥1 tín hiệu rank/CTR cải thiện trên KW «báo giá thiết kế website» **hoặc** «thiết kế website» / «… tphcm»`,
  ``,
  `## Vẫn được viết tiếp (không tính mass-seed)`,
  `- Rewrite unique / DNA ngành Jaccard cao`,
  `- Bài customer-intent lẻ (1–10) có outline riêng`,
  `- Case study / PR / citation`,
  `- Landing quận mới nếu có unique NAP/FAQ (không clone template)`,
  ``,
  `## Lệnh kiểm tra trước khi seed`,
  "```",
  "npm run audit:phase1-jaccard",
  "npm run export:phase2-money-urls",
  "npm run export:phase3-local-urls",
  "npm run build:phase3-money-kw-pack",
  "```",
  ``,
  `Nếu gate FAIL → ưu tiên GSC index + PR + rewrite, không mở batch mới.`,
  ``,
];

fs.writeFileSync(path.join(outDir, "phase3-seed-gate.md"), seedGate.join("\n"), "utf8");

const urls = [
  ...MONEY.map((m) => `${SITE}${m.primary}`),
  ...MONEY.map((m) => `${SITE}${m.secondary}`),
  `${SITE}/lien-he`,
  `${SITE}/du-an/nha-khoa-dang-khoa`,
  `${SITE}/google-maps`,
];
const unique = [...new Set(urls)];
fs.writeFileSync(
  path.join(outDir, "indexnow-phase3-money-kw-urls.txt"),
  unique.join("\n") + "\n",
  "utf8",
);

console.log("Wrote:");
console.log("- tmp-programmatic/phase3-money-kw-tracker.md");
console.log("- tmp-programmatic/phase3-seed-gate.md");
console.log("- tmp-programmatic/indexnow-phase3-money-kw-urls.txt (" + unique.length + " URLs)");
