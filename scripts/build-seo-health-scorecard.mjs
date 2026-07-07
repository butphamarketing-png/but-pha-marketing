import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tmp-programmatic");
const scoreJson = path.join(outDir, "seo-health-scorecard.json");
const scoreMd = path.join(outDir, "seo-health-scorecard.md");
const snapshotPath = path.join(outDir, "seo-health-scorecard.snapshot.json");

const inputs = {
  proof: path.join(outDir, "priority-proof-audit.json"),
  links: path.join(outDir, "priority-internal-links-audit.json"),
  freshness: path.join(outDir, "priority-content-freshness-audit.json"),
  promotion: path.join(outDir, "programmatic-promotion-report.json"),
  intent: path.join(outDir, "priority-intent-coverage-audit.json"),
};

function readJsonSafe(p, fallback) {
  if (!fs.existsSync(p)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return fallback;
  }
}

function avg(nums) {
  if (!nums.length) return 0;
  return Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 10) / 10;
}

function computeScorecard() {
  const proof = readJsonSafe(inputs.proof, []);
  const links = readJsonSafe(inputs.links, []);
  const freshness = readJsonSafe(inputs.freshness, []);
  const promotion = readJsonSafe(inputs.promotion, []);
  const intent = readJsonSafe(inputs.intent, []);

  const proofAvg = avg(proof.map((x) => x.proofScore || 0));
  const proofWeak = proof.filter((x) => (x.proofScore || 0) < 70).length;

  const linkAvg = avg(links.map((x) => x.complianceScore || 0));
  const linkFail = links.filter((x) => x.status === "fail").length;

  const stale = freshness.filter((x) => x.stale).length;
  const freshnessAvg = avg(freshness.map((x) => 100 - Math.min(100, Math.max(0, x.ageDays || 0))));

  const promotable = promotion.filter((x) => x.promotable).length;
  const intentAvg = avg(intent.map((x) => x.intentCoverageScore || 0));
  const intentFail = intent.filter((x) => x.status === "fail").length;

  const score =
    proofAvg * 0.35 +
    linkAvg * 0.25 +
    intentAvg * 0.1 +
    (100 - Math.min(100, stale * 10)) * 0.2 +
    (promotable > 0 ? 90 : 75) * 0.1;

  const rounded = Math.round(score * 10) / 10;
  const grade = rounded >= 90 ? "A" : rounded >= 80 ? "B" : rounded >= 70 ? "C" : "D";

  const blockers = [];
  if (proofWeak > 0) blockers.push(`Proof yếu: ${proofWeak} URL`);
  if (linkFail > 0) blockers.push(`Internal links fail: ${linkFail} URL`);
  if (intentFail > 0) blockers.push(`Intent coverage fail: ${intentFail} URL`);
  if (stale > 0) blockers.push(`Content stale: ${stale} URL`);
  if (promotable > 0) blockers.push(`Có ${promotable} URL sẵn sàng promote index`);

  return {
    generatedAt: new Date().toISOString(),
    score: rounded,
    grade,
    metrics: {
      proofAvg,
      proofWeak,
      linkAvg,
      linkFail,
      stale,
      freshnessAvg,
      promotable,
      intentAvg,
      intentFail,
    },
    blockers,
  };
}

function buildMd(current, prev) {
  const delta = prev ? Math.round((current.score - (prev.score || 0)) * 10) / 10 : null;
  const lines = [];
  lines.push("# SEO Health Scorecard");
  lines.push("");
  lines.push(`- Generated at: ${current.generatedAt}`);
  lines.push(`- Score: **${current.score} / 100**`);
  lines.push(`- Grade: **${current.grade}**`);
  if (delta !== null) lines.push(`- Score delta vs previous: **${delta > 0 ? "+" : ""}${delta}**`);
  lines.push("");
  lines.push("## Core Metrics");
  lines.push(`- Proof average: ${current.metrics.proofAvg}`);
  lines.push(`- Weak proof URLs: ${current.metrics.proofWeak}`);
  lines.push(`- Internal-link compliance average: ${current.metrics.linkAvg}`);
  lines.push(`- Internal-link failed URLs: ${current.metrics.linkFail}`);
  lines.push(`- Stale URLs: ${current.metrics.stale}`);
  lines.push(`- Promotable URLs: ${current.metrics.promotable}`);
  lines.push(`- Intent coverage average: ${current.metrics.intentAvg}`);
  lines.push(`- Intent failed URLs: ${current.metrics.intentFail}`);
  lines.push("");
  lines.push("## Priority Alerts");
  if (!current.blockers.length) {
    lines.push("- Không có blocker lớn. Tiếp tục giữ nhịp sản xuất và backlink.");
  } else {
    current.blockers.forEach((b) => lines.push(`- ${b}`));
  }
  lines.push("");
  return lines.join("\n");
}

function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const prev = readJsonSafe(snapshotPath, null);
  const current = computeScorecard();

  fs.writeFileSync(scoreJson, JSON.stringify(current, null, 2), "utf8");
  fs.writeFileSync(scoreMd, buildMd(current, prev), "utf8");
  fs.writeFileSync(snapshotPath, JSON.stringify(current, null, 2), "utf8");

  console.log("=== SEO health scorecard generated ===");
  console.log(`Score: ${current.score} (${current.grade})`);
  console.log(`Report: ${scoreMd}`);
}

main();
