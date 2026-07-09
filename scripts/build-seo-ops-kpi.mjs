import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tmp-programmatic");
const historyPath = path.join(outDir, "seo-ops-kpi-history.json");
const outJsonPath = path.join(outDir, "seo-ops-kpi-latest.json");
const outMdPath = path.join(outDir, "seo-ops-kpi.md");

const sources = {
  health: path.join(outDir, "seo-health-scorecard.json"),
  proof: path.join(outDir, "priority-proof-audit.json"),
  links: path.join(outDir, "priority-internal-links-audit.json"),
  freshness: path.join(outDir, "priority-content-freshness-audit.json"),
  promotion: path.join(outDir, "programmatic-promotion-report.json"),
};

function readJsonSafe(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function delta(current, previous) {
  if (previous === undefined || previous === null) return null;
  return Math.round((current - previous) * 10) / 10;
}

function formatDelta(d) {
  if (d === null) return "-";
  return `${d > 0 ? "+" : ""}${d}`;
}

function computeKpi() {
  const health = readJsonSafe(sources.health, {});
  const proof = readJsonSafe(sources.proof, []);
  const links = readJsonSafe(sources.links, []);
  const freshness = readJsonSafe(sources.freshness, []);
  const promotion = readJsonSafe(sources.promotion, []);
  const verticalKpi = readJsonSafe(path.join(outDir, "vertical-kpi-latest.json"), null);

  return {
    generatedAt: new Date().toISOString(),
    healthScore: Number(health.score || 0),
    healthGrade: health.grade || "N/A",
    weakProofUrls: proof.filter((x) => (x.proofScore || 0) < 70).length,
    failedLinkUrls: links.filter((x) => x.status === "fail").length,
    staleUrls: freshness.filter((x) => x.stale).length,
    promotableUrls: promotion.filter((x) => x.promotable).length,
    verticalAvgProofPct: verticalKpi?.avgProofPct ?? null,
    verticalComplete: verticalKpi
      ? `${verticalKpi.completeVerticals}/${verticalKpi.totalVerticals}`
      : null,
  };
}

function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const current = computeKpi();
  const history = readJsonSafe(historyPath, []);
  const prev = history.length ? history[history.length - 1] : null;

  const currentWithDelta = {
    ...current,
    delta: {
      healthScore: delta(current.healthScore, prev?.healthScore),
      weakProofUrls: delta(current.weakProofUrls, prev?.weakProofUrls),
      failedLinkUrls: delta(current.failedLinkUrls, prev?.failedLinkUrls),
      staleUrls: delta(current.staleUrls, prev?.staleUrls),
      promotableUrls: delta(current.promotableUrls, prev?.promotableUrls),
    },
  };

  history.push(current);
  // keep last 90 runs
  const trimmed = history.slice(-90);

  fs.writeFileSync(historyPath, JSON.stringify(trimmed, null, 2), "utf8");
  fs.writeFileSync(outJsonPath, JSON.stringify(currentWithDelta, null, 2), "utf8");

  const lines = [];
  lines.push("# SEO Ops KPI");
  lines.push("");
  lines.push(`- Generated at: ${current.generatedAt}`);
  lines.push(`- Health score: **${current.healthScore} (${current.healthGrade})** (${formatDelta(currentWithDelta.delta.healthScore)})`);
  lines.push(`- Weak proof URLs: **${current.weakProofUrls}** (${formatDelta(currentWithDelta.delta.weakProofUrls)})`);
  lines.push(`- Failed link URLs: **${current.failedLinkUrls}** (${formatDelta(currentWithDelta.delta.failedLinkUrls)})`);
  lines.push(`- Stale URLs: **${current.staleUrls}** (${formatDelta(currentWithDelta.delta.staleUrls)})`);
  lines.push(`- Promotable URLs: **${current.promotableUrls}** (${formatDelta(currentWithDelta.delta.promotableUrls)})`);
  if (current.verticalAvgProofPct != null) {
    lines.push(`- Vertical proof avg: **${current.verticalAvgProofPct}%** (${current.verticalComplete} verticals 7/7)`);
  }
  lines.push("");
  lines.push("## Interpretation");
  lines.push("- Health score should stay >= 85.");
  lines.push("- Weak proof / failed links should trend to 0.");
  lines.push("- Stale URLs should stay low and predictable.");
  lines.push("- Promotable URLs > 0 means there is index-growth opportunity.");
  lines.push("");

  fs.writeFileSync(outMdPath, lines.join("\n"), "utf8");

  console.log("=== SEO ops KPI generated ===");
  console.log(`Health: ${current.healthScore} (${current.healthGrade})`);
  console.log(`Report: ${outMdPath}`);
}

main();
