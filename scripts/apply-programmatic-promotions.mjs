import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const DEFAULT_CONFIG_PATH = path.join(root, "scripts", "programmatic-landings.config.json");
const DEFAULT_OUT_DIR = path.join(root, "tmp-programmatic");
const DEFAULT_PROMOTION_REPORT_PATH = path.join(DEFAULT_OUT_DIR, "programmatic-promotion-report.json");
const DEFAULT_CHANGELOG_PATH = path.join(DEFAULT_OUT_DIR, "programmatic-promotions-changelog.md");

function getArg(flag, fallback = undefined) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return fallback;
  return process.argv[idx + 1] ?? fallback;
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function parseRoutePath(routePath) {
  if (routePath.startsWith("/website/nganh/")) {
    return {
      group: "websiteIndustry",
      slug: routePath.replace("/website/nganh/", ""),
    };
  }
  if (routePath.startsWith("/seo-website/dia-phuong/")) {
    return {
      group: "localSeo",
      slug: routePath.replace("/seo-website/dia-phuong/", ""),
    };
  }
  return null;
}

function applyPromotions(config, promotions) {
  const promotedItems = [];
  for (const item of promotions) {
    const parsed = parseRoutePath(item.routePath);
    if (!parsed) continue;
    const list = Array.isArray(config[parsed.group]) ? config[parsed.group] : [];
    const target = list.find((x) => x.slug === parsed.slug);
    if (!target) continue;

    target.indexOverride = "index";
    target.indexOverrideReason = "auto-promoted-by-quality-gate";
    target.promotedAt = new Date().toISOString();
    promotedItems.push({
      routePath: item.routePath,
      title: item.title,
      qualityScore: item.qualityScore,
      previousPolicy: item.previousPolicy,
      currentPolicy: item.currentPolicy,
    });
  }
  return promotedItems;
}

function renderChangelog(promotedItems, reportPath) {
  const lines = [];
  lines.push("# Programmatic Promotions Changelog");
  lines.push("");
  lines.push(`- Generated at: ${new Date().toISOString()}`);
  lines.push(`- Source report: ${reportPath}`);
  lines.push(`- Promoted count: ${promotedItems.length}`);
  lines.push("");
  if (!promotedItems.length) {
    lines.push("No promotable URLs in this run.");
    lines.push("");
    return lines.join("\n");
  }
  for (const item of promotedItems) {
    lines.push(`## ${item.routePath}`);
    lines.push(`- Title: ${item.title}`);
    lines.push(`- Quality: ${item.qualityScore}`);
    lines.push(`- Policy: ${item.previousPolicy} -> ${item.currentPolicy}`);
    lines.push("");
  }
  return lines.join("\n");
}

function main() {
  const configPath = path.resolve(getArg("--config", DEFAULT_CONFIG_PATH));
  const outDir = path.resolve(getArg("--outDir", DEFAULT_OUT_DIR));
  const reportPath = path.resolve(getArg("--report", DEFAULT_PROMOTION_REPORT_PATH));
  const changelogPath = path.resolve(getArg("--changelog", DEFAULT_CHANGELOG_PATH));
  const apply = hasFlag("--apply");

  if (!fs.existsSync(configPath)) {
    console.error(`Config not found: ${configPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(reportPath)) {
    console.error(`Promotion report not found: ${reportPath}`);
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  const promotions = (Array.isArray(report) ? report : []).filter((x) => x.promotable);
  const promotedItems = applyPromotions(config, promotions);

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(changelogPath, renderChangelog(promotedItems, reportPath), "utf8");

  if (apply) {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");
  }

  console.log("=== Apply programmatic promotions ===");
  console.log(`Config: ${configPath}`);
  console.log(`Report: ${reportPath}`);
  console.log(`Promotable in report: ${promotions.length}`);
  console.log(`Applied count: ${promotedItems.length}`);
  console.log(`Changelog: ${changelogPath}`);
  if (!apply) console.log("Dry run mode. Add --apply to persist config updates.");
}

main();
