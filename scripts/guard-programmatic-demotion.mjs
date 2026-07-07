import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const DEFAULT_CONFIG_PATH = path.join(root, "scripts", "programmatic-landings.config.json");
const DEFAULT_OUT_DIR = path.join(root, "tmp-programmatic");
const DEFAULT_ALERT_PATH = path.join(DEFAULT_OUT_DIR, "programmatic-demotion-alerts.json");
const DEFAULT_ALERT_MD_PATH = path.join(DEFAULT_OUT_DIR, "programmatic-demotion-alerts.md");

const DEMOTE_REVIEW_SCORE = 60;
const DEMOTE_REVIEW_DROP = 12;

function getArg(flag, fallback = undefined) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return fallback;
  return process.argv[idx + 1] ?? fallback;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function scoreLanding(input) {
  let score = 0;
  score += clamp(Math.round((input.wordCount || 0) / 200), 0, 10) * 3;
  score += clamp(input.faqCount || 0, 0, 6) * 3;
  score += clamp(input.internalLinkCount || 0, 0, 12) * 2;
  score += clamp(input.proofCount || 0, 0, 4) * 4;
  if (input.hasCaseStudy) score += 6;
  if (input.hasLocalEntity) score += 4;
  const duplicatePenalty = input.duplicateRisk === "high" ? 12 : input.duplicateRisk === "medium" ? 6 : 0;
  score -= duplicatePenalty;
  return clamp(score, 0, 100);
}

function toRows(config) {
  const rows = [];
  for (const item of config.websiteIndustry || []) {
    rows.push({
      group: "websiteIndustry",
      slug: item.slug,
      routePath: `/website/nganh/${item.slug}`,
      title: item.title,
      qualityScore: scoreLanding(item),
      indexOverride: item.indexOverride || null,
      overrideReason: item.indexOverrideReason || null,
      promotedAt: item.promotedAt || null,
    });
  }
  for (const item of config.localSeo || []) {
    rows.push({
      group: "localSeo",
      slug: item.slug,
      routePath: `/seo-website/dia-phuong/${item.slug}`,
      title: item.title,
      qualityScore: scoreLanding(item),
      indexOverride: item.indexOverride || null,
      overrideReason: item.indexOverrideReason || null,
      promotedAt: item.promotedAt || null,
    });
  }
  return rows;
}

function renderMarkdown(alerts) {
  const lines = ["# Programmatic Demotion Guard", ""];
  lines.push(`- Generated at: ${new Date().toISOString()}`);
  lines.push(`- Alerts: ${alerts.length}`);
  lines.push("");
  if (!alerts.length) {
    lines.push("No demotion alerts. All override-index URLs are healthy.");
    lines.push("");
    return lines.join("\n");
  }
  for (const a of alerts) {
    lines.push(`## ${a.routePath}`);
    lines.push(`- Title: ${a.title}`);
    lines.push(`- Quality score: ${a.qualityScore}`);
    lines.push(`- Manual review reason: ${a.reason}`);
    lines.push(`- Suggested action: ${a.suggestedAction}`);
    lines.push("");
  }
  return lines.join("\n");
}

function main() {
  const configPath = path.resolve(getArg("--config", DEFAULT_CONFIG_PATH));
  const outDir = path.resolve(getArg("--outDir", DEFAULT_OUT_DIR));
  const alertPath = path.resolve(getArg("--alert", DEFAULT_ALERT_PATH));
  const alertMdPath = path.resolve(getArg("--alert-md", DEFAULT_ALERT_MD_PATH));

  if (!fs.existsSync(configPath)) {
    console.error(`Config not found: ${configPath}`);
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const rows = toRows(config);
  const overrideRows = rows.filter((r) => r.indexOverride === "index");

  const alerts = overrideRows
    .map((row) => {
      const hadAutoPromotion = row.overrideReason === "auto-promoted-by-quality-gate";
      const weakScore = row.qualityScore < DEMOTE_REVIEW_SCORE;
      const needsLifecycleReview = hadAutoPromotion && !!row.promotedAt;
      const reason = weakScore
        ? `quality score < ${DEMOTE_REVIEW_SCORE}`
        : needsLifecycleReview
          ? "override-index URL needs periodic quality re-review"
          : null;
      if (!reason) return null;
      return {
        routePath: row.routePath,
        title: row.title,
        qualityScore: row.qualityScore,
        reason,
        suggestedAction: weakScore
          ? "Review content depth/proof/internal links; consider removing override if quality does not recover."
          : `Re-audit URL quarterly. If quality drops by >= ${DEMOTE_REVIEW_DROP} points, move to manual noindex review queue.`,
      };
    })
    .filter(Boolean);

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(alertPath, JSON.stringify(alerts, null, 2), "utf8");
  fs.writeFileSync(alertMdPath, renderMarkdown(alerts), "utf8");

  console.log("=== Programmatic demotion guard ===");
  console.log(`Config: ${configPath}`);
  console.log(`Override-index URLs: ${overrideRows.length}`);
  console.log(`Alerts: ${alerts.length}`);
  console.log(`JSON: ${alertPath}`);
  console.log(`Markdown: ${alertMdPath}`);
}

main();
