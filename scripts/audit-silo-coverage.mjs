/**
 * Audit silo links trên các slug P2 + registry seo-silo-inject.
 * Chạy: node scripts/audit-silo-coverage.mjs
 */
import dotenv from "dotenv";
import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { SILO_FIXES } from "./seo-silo-inject.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });

const P2_THIN_SLUGS = [
  "checklist-website-my-pham-2026",
  "checklist-website-logistics-2026",
  "checklist-website-tham-my-vien-2026",
  "checklist-website-phong-kham-2026",
  "checklist-website-nha-khoa-2026",
  "template-website-nha-khoa-2026",
  "thiet-ke-website-noi-that",
  "thiet-ke-website-go-noi-that",
  "case-study-thiet-ke-website-van-toc-express-logistics",
  "thiet-ke-website-vat-lieu-xay-dung",
  "case-study-thiet-ke-website-glow-dew-cosmetics",
  "thiet-ke-website-noi-that-van-phong",
  "seo-maps-la-gi",
];

const OPTIONAL_SLUGS = new Set(["seo-maps-la-gi"]);

const TARGET_SLUGS = [
  ...new Set([...SILO_FIXES.map((x) => x.slug), ...P2_THIN_SLUGS.filter((s) => !OPTIONAL_SLUGS.has(s))]),
];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function checkSilo(content, cfg) {
  const issues = [];
  if (cfg) {
    if (!content.includes(cfg.hub)) issues.push("hub");
    if (!content.includes(cfg.money)) issues.push("money");
    if (cfg.caseStudy && !content.includes(cfg.caseStudy)) issues.push("caseStudy");
  }
  const hasDuAn = content.includes("/du-an/");
  if (!hasDuAn) issues.push("du-an");
  const hasWebsite = content.includes("/website");
  if (!hasWebsite) issues.push("/website");
  return issues;
}

const results = [];
for (const slug of TARGET_SLUGS) {
  const { data, error } = await supabase.from("news").select("slug,content").eq("slug", slug).maybeSingle();
  if (error) throw error;
  if (!data) {
    results.push({ slug, status: "missing", issues: ["not-in-db"] });
    continue;
  }
  const cfg = SILO_FIXES.find((x) => x.slug === slug);
  const issues = checkSilo(data.content || "", cfg);
  results.push({
    slug,
    status: issues.length ? "fail" : "pass",
    issues,
    hasSiloBlock: (data.content || "").includes('id="silo-nganh"'),
  });
}

const outDir = path.join(root, "tmp-programmatic");
fs.mkdirSync(outDir, { recursive: true });
const outJson = path.join(outDir, "silo-coverage-audit.json");
const outMd = path.join(outDir, "silo-coverage-audit.md");

fs.writeFileSync(outJson, JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2), "utf8");

const fail = results.filter((r) => r.status === "fail");
const lines = [
  "# Silo Coverage Audit",
  "",
  `- Generated at: ${new Date().toISOString()}`,
  `- Checked: ${results.length}`,
  `- Pass: ${results.length - fail.length}`,
  `- Fail: ${fail.length}`,
  "",
  "| Slug | Status | Issues | Silo block |",
  "|---|---|---|---|",
];
for (const r of results) {
  lines.push(`| ${r.slug} | ${r.status} | ${r.issues?.join(", ") || "-"} | ${r.hasSiloBlock ? "yes" : "no"} |`);
}
lines.push("");
fs.writeFileSync(outMd, lines.join("\n"), "utf8");

console.log("=== Silo coverage audit ===");
console.log(`Pass: ${results.length - fail.length}/${results.length}`);
if (fail.length) {
  fail.forEach((r) => console.log(`  FAIL ${r.slug}: ${r.issues.join(", ")}`));
  process.exitCode = 1;
}
console.log(`Report: ${outMd}`);
