/**
 * KPI vertical proof — 6 ngành ưu tiên, theo dõi độ đầy đủ bộ URL proof.
 * Chạy: npm run build:vertical-kpi
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tmp-programmatic");
const outJson = path.join(outDir, "vertical-kpi-latest.json");
const outMd = path.join(outDir, "vertical-kpi.md");
const historyPath = path.join(outDir, "vertical-kpi-history.json");

const PRIORITY_VERTICALS = [
  { slug: "nha-khoa", label: "Nha khoa" },
  { slug: "xay-dung", label: "Xây dựng" },
  { slug: "tham-my", label: "Thẩm mỹ" },
  { slug: "spa", label: "Spa" },
  { slug: "phong-kham", label: "Phòng khám" },
  { slug: "my-pham", label: "Mỹ phẩm" },
  { slug: "pccc", label: "PCCC" },
];

const VERTICAL_PROOF = {
  "nha-khoa": {
    moneySlug: "thiet-ke-website-nha-khoa",
    checklistSlug: "checklist-website-nha-khoa-2026",
    templateSlug: "template-website-nha-khoa-2026",
    caseStudySlug: "nha-khoa-dang-khoa",
    caseStudyBlogSlug: "case-study-thiet-ke-website-nha-khoa-dang-khoa",
    pillarSlug: "thiet-ke-website",
  },
  "xay-dung": {
    moneySlug: "thiet-ke-website-xay-dung-nha-thau",
    checklistSlug: "checklist-website-xay-dung-2026",
    templateSlug: "template-website-xay-dung-2026",
    caseStudySlug: "kien-truc-sao-khue",
    caseStudyBlogSlug: "case-study-thiet-ke-website-xay-dung-sao-khue",
    pillarSlug: "thiet-ke-website",
  },
  "tham-my": {
    moneySlug: "thiet-ke-website-tham-my-vien",
    checklistSlug: "checklist-website-tham-my-vien-2026",
    templateSlug: "template-website-tham-my-vien-2026",
    caseStudySlug: "tham-my-thien-hoang-kim",
    caseStudyBlogSlug: "case-study-thiet-ke-website-tham-my-thien-hoang-kim",
    pillarSlug: "thiet-ke-website",
  },
  spa: {
    moneySlug: "thiet-ke-website-spa",
    checklistSlug: "checklist-website-spa-2026",
    templateSlug: "template-website-spa-2026",
    caseStudySlug: "phuoc-lai-luxury",
    caseStudyBlogSlug: "case-study-thiet-ke-website-spa-phuoc-lai-luxury",
    pillarSlug: "thiet-ke-website",
  },
  "phong-kham": {
    moneySlug: "thiet-ke-website-phong-kham-da-khoa",
    checklistSlug: "checklist-website-phong-kham-2026",
    templateSlug: "template-website-phong-kham-2026",
    caseStudySlug: "nha-khoa-dang-khoa",
    caseStudyBlogSlug: "case-study-thiet-ke-website-nha-khoa-dang-khoa",
    pillarSlug: "thiet-ke-website",
  },
  "my-pham": {
    moneySlug: "thiet-ke-website-my-pham-lam-dep",
    checklistSlug: "checklist-website-my-pham-2026",
    templateSlug: "template-website-my-pham-2026",
    caseStudySlug: "glow-dew-cosmetics",
    caseStudyBlogSlug: "case-study-thiet-ke-website-glow-dew-cosmetics",
    pillarSlug: "thiet-ke-website",
  },
  pccc: {
    moneySlug: "thiet-ke-website-pccc",
    checklistSlug: "checklist-website-pccc-2026",
    templateSlug: "template-website-pccc-2026",
    caseStudySlug: "pccc-bao-an-fire",
    caseStudyBlogSlug: "case-study-thiet-ke-website-pccc-bao-an",
    pillarSlug: "thiet-ke-website",
  },
};

function scoreVertical(slug) {
  const cfg = VERTICAL_PROOF[slug];
  const slots = [
    { key: "hub", ok: true },
    { key: "money", ok: Boolean(cfg.moneySlug) },
    { key: "checklist", ok: Boolean(cfg.checklistSlug) },
    { key: "template", ok: Boolean(cfg.templateSlug) },
    { key: "caseStudy", ok: Boolean(cfg.caseStudySlug) },
    { key: "caseStudyBlog", ok: Boolean(cfg.caseStudyBlogSlug) },
    { key: "pillar", ok: Boolean(cfg.pillarSlug) },
  ];
  const score = slots.filter((s) => s.ok).length;
  return { score, total: slots.length, slots };
}

function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const verticals = PRIORITY_VERTICALS.map((v) => {
    const { score, total, slots } = scoreVertical(v.slug);
    return {
      slug: v.slug,
      label: v.label,
      score,
      total,
      pct: Math.round((score / total) * 100),
      complete: score === total,
      slots,
    };
  });

  const avgPct = Math.round(verticals.reduce((s, v) => s + v.pct, 0) / verticals.length);
  const completeCount = verticals.filter((v) => v.complete).length;

  const snapshot = {
    generatedAt: new Date().toISOString(),
    avgProofPct: avgPct,
    completeVerticals: completeCount,
    totalVerticals: verticals.length,
    verticals,
    kpiTargets: {
      avgProofPct: 100,
      completeVerticals: verticals.length,
      weakProofUrls: 0,
    },
  };

  const history = fs.existsSync(historyPath) ? JSON.parse(fs.readFileSync(historyPath, "utf8")) : [];
  history.push({
    generatedAt: snapshot.generatedAt,
    avgProofPct: avgPct,
    completeVerticals: completeCount,
  });
  fs.writeFileSync(historyPath, JSON.stringify(history.slice(-52), null, 2), "utf8");
  fs.writeFileSync(outJson, JSON.stringify(snapshot, null, 2), "utf8");

  const lines = [
    "# Vertical Proof KPI",
    "",
    `- Generated: ${snapshot.generatedAt}`,
    `- Avg proof completeness: **${avgPct}%**`,
    `- Verticals 7/7: **${completeCount}/${verticals.length}**`,
    "",
    "## Per vertical",
    "",
    "| Vertical | Score | % |",
    "|----------|-------|---|",
    ...verticals.map((v) => `| ${v.label} | ${v.score}/${v.total} | ${v.pct}% |`),
    "",
    "## Weekly targets",
    "- Mỗi vertical ưu tiên đạt 7/7 URL proof",
    "- Weak proof URLs → 0 (audit:priority-proof)",
    "- Index rate URL mới sau 7–14 ngày (GSC manual)",
    "",
  ];
  fs.writeFileSync(outMd, lines.join("\n"), "utf8");

  console.log(`Vertical KPI: ${avgPct}% avg, ${completeCount}/${verticals.length} complete`);
  console.log(`Report: ${outMd}`);
}

main();
