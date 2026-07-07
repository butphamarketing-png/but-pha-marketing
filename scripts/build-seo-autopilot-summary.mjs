import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tmp-programmatic");
const outMd = path.join(outDir, "seo-autopilot-summary.md");
const outJson = path.join(outDir, "seo-autopilot-summary.json");

const files = {
  health: path.join(outDir, "seo-health-scorecard.json"),
  kpi: path.join(outDir, "seo-ops-kpi-latest.json"),
  execBoard: path.join(outDir, "seo-execution-board.md"),
  weeklyAudit: path.join(outDir, "seo-weekly-report.md"),
  weeklyApply: path.join(outDir, "seo-weekly-apply-report.md"),
  proof: path.join(outDir, "priority-proof-audit.json"),
  links: path.join(outDir, "priority-internal-links-audit.json"),
  freshness: path.join(outDir, "priority-content-freshness-audit.json"),
  intent: path.join(outDir, "priority-intent-coverage-audit.json"),
};

function readJsonSafe(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function readTextSafe(filePath) {
  if (!fs.existsSync(filePath)) return "";
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

function extractFirstMatches(text, regex, fallback = "-") {
  const m = text.match(regex);
  return m?.[1] || fallback;
}

function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const health = readJsonSafe(files.health, {});
  const kpi = readJsonSafe(files.kpi, {});
  const proof = readJsonSafe(files.proof, []);
  const links = readJsonSafe(files.links, []);
  const freshness = readJsonSafe(files.freshness, []);
  const intent = readJsonSafe(files.intent, []);
  const weeklyAuditText = readTextSafe(files.weeklyAudit);
  const weeklyApplyText = readTextSafe(files.weeklyApply);

  const summary = {
    generatedAt: new Date().toISOString(),
    healthScore: health.score ?? null,
    healthGrade: health.grade ?? null,
    kpi: {
      weakProofUrls: kpi.weakProofUrls ?? proof.filter((x) => (x.proofScore || 0) < 70).length,
      failedLinkUrls: kpi.failedLinkUrls ?? links.filter((x) => x.status === "fail").length,
      staleUrls: kpi.staleUrls ?? freshness.filter((x) => x.stale).length,
      intentFailedUrls: health?.metrics?.intentFail ?? intent.filter((x) => x.status === "fail").length,
      promotableUrls: kpi.promotableUrls ?? 0,
    },
    runners: {
      weeklyAuditFailedSteps: extractFirstMatches(weeklyAuditText, /- Failed:\s*([0-9]+)/i, "0"),
      weeklyApplyFailedSteps: extractFirstMatches(weeklyApplyText, /- Failed:\s*([0-9]+)/i, "0"),
    },
  };

  const status =
    Number(summary.runners.weeklyApplyFailedSteps) === 0 &&
    summary.kpi.weakProofUrls === 0 &&
    summary.kpi.failedLinkUrls === 0 &&
    summary.kpi.staleUrls === 0 &&
    summary.kpi.intentFailedUrls === 0
      ? "GREEN"
      : "YELLOW";

  const lines = [];
  lines.push("# SEO Autopilot Summary");
  lines.push("");
  lines.push(`- Generated at: ${summary.generatedAt}`);
  lines.push(`- System status: **${status}**`);
  lines.push(`- Health score: **${summary.healthScore ?? "-"} (${summary.healthGrade ?? "-"})**`);
  lines.push("");
  lines.push("## Core KPI");
  lines.push(`- Weak proof URLs: ${summary.kpi.weakProofUrls}`);
  lines.push(`- Failed internal-link URLs: ${summary.kpi.failedLinkUrls}`);
  lines.push(`- Stale URLs: ${summary.kpi.staleUrls}`);
  lines.push(`- Intent failed URLs: ${summary.kpi.intentFailedUrls}`);
  lines.push(`- Promotable URLs: ${summary.kpi.promotableUrls}`);
  lines.push("");
  lines.push("## Runner Status");
  lines.push(`- Weekly audit failed steps: ${summary.runners.weeklyAuditFailedSteps}`);
  lines.push(`- Weekly apply failed steps: ${summary.runners.weeklyApplyFailedSteps}`);
  lines.push("");
  lines.push("## Next Commands");
  lines.push("- `npm run run:seo-weekly` (audit mode)");
  lines.push("- `npm run run:seo-weekly:apply` (apply mode)");
  lines.push("- `npm run build:seo-execution-board` (team tasks)");
  lines.push("");

  fs.writeFileSync(outJson, JSON.stringify({ ...summary, status }, null, 2), "utf8");
  fs.writeFileSync(outMd, lines.join("\n"), "utf8");

  console.log("=== SEO autopilot summary generated ===");
  console.log(`Status: ${status}`);
  console.log(`Report: ${outMd}`);
}

main();
