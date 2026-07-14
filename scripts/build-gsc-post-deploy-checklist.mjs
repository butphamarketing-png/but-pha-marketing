/**
 * Gộp checklist GSC sau deploy (Phase 1+2+3 money/local).
 * Chạy: node scripts/build-gsc-post-deploy-checklist.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tmp-programmatic");
const SITE = "https://www.butphamarketing.com";

const batch1Core = [
  "/",
  "/website",
  "/banggia",
  "/seo-website",
  "/lien-he",
  "/du-an",
  "/google-maps",
  "/blog/thiet-ke-website",
  "/blog/bao-gia-thiet-ke-website",
];

const batch2MoneyKw = [
  "/website/nganh/spa",
  "/website/nganh/nha-khoa",
  "/seo-website/dia-phuong/ho-chi-minh",
  "/blog/thiet-ke-website-spa",
  "/blog/thiet-ke-website-nha-khoa",
  "/du-an/nha-khoa-dang-khoa",
];

const batch3Districts = [
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
].map((s) => `/seo-website/dia-phuong/${s}`);

const batch4Cities = ["ha-noi", "da-nang", "can-tho", "binh-duong"].map(
  (s) => `/seo-website/dia-phuong/${s}`,
);

const qaLive = [
  ["301 /bao-gia → /banggia", `${SITE}/bao-gia`],
  ["301 /case-study → /du-an", `${SITE}/case-study`],
  ["301 TPHCM blog → local", `${SITE}/blog/thiet-ke-website-tphcm`],
  ["301 tp-hcm customer → local", `${SITE}/blog/thiet-ke-website-tp-hcm`],
  ["IndexNow key file", `${SITE}/butpha-indexnow-202607.txt`],
];

fs.mkdirSync(outDir, { recursive: true });

const allPaths = [...batch1Core, ...batch2MoneyKw, ...batch3Districts, ...batch4Cities];
const unique = [...new Set(allPaths)];

const lines = [
  `# GSC Post-Deploy Checklist (Phase 1–3)`,
  ``,
  `- Generated: ${new Date().toISOString()}`,
  `- Total URL Inspection priority: **${unique.length}**`,
  ``,
  `## 0. QA live trước khi request index`,
  ...qaLive.map(([label, url]) => `- [ ] ${label}: ${url}`),
  ``,
  `## Batch 1 — Core money (ngày 1)`,
  ...batch1Core.map((p, i) => `- [ ] ${i + 1}. ${SITE}${p}`),
  ``,
  `## Batch 2 — 5 money KW stack (ngày 1–2)`,
  ...batch2MoneyKw.map((p, i) => `- [ ] ${i + 1}. ${SITE}${p}`),
  ``,
  `## Batch 3 — 12 quận Phase 3 (ngày 2–3)`,
  ...batch3Districts.map((p, i) => `- [ ] ${i + 1}. ${SITE}${p}`),
  ``,
  `## Batch 4 — hub tỉnh phụ (ngày 3)`,
  ...batch4Cities.map((p, i) => `- [ ] ${i + 1}. ${SITE}${p}`),
  ``,
  `## IndexNow (sau Bing verify)`,
  "```",
  "npm run ping:indexnow:phase2-money",
  "npm run ping:indexnow:phase3-local",
  "npm run ping:indexnow:phase3-money-kw",
  "```",
  ``,
  `## Ghi chú`,
  `- GSC URL Inspection giới hạn ~10–20 request/ngày — chia batch.`,
  `- Sau index: ghi \`phase3-money-kw-tracker.md\` mỗi tuần.`,
  `- Seed gate: \`phase3-seed-gate.md\` — chưa PASS thì không mass-seed.`,
  ``,
];

fs.writeFileSync(path.join(outDir, "gsc-post-deploy-checklist.md"), lines.join("\n"), "utf8");
fs.writeFileSync(
  path.join(outDir, "indexnow-post-deploy-priority-urls.txt"),
  unique.map((p) => `${SITE}${p}`).join("\n") + "\n",
  "utf8",
);

console.log(`URLs: ${unique.length}`);
console.log("tmp-programmatic/gsc-post-deploy-checklist.md");
console.log("tmp-programmatic/indexnow-post-deploy-priority-urls.txt");
