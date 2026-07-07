import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const DEFAULT_CONFIG_PATH = path.join(root, "scripts", "programmatic-landings.config.json");
const DEFAULT_OUT_DIR = path.join(root, "tmp-programmatic");
const DEFAULT_SNAPSHOT_PATH = path.join(DEFAULT_OUT_DIR, "programmatic-index-snapshot.json");

const INDEX_THRESHOLD = 70;
const PROMOTION_MIN_SCORE = 75;
const PROMOTION_MIN_SCORE_DELTA = 8;

function getArg(flag, fallback = undefined) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return fallback;
  return process.argv[idx + 1] ?? fallback;
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function ensureDir(targetPath) {
  fs.mkdirSync(targetPath, { recursive: true });
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

function resolveIndexPolicy(input, qualityScore) {
  if (input.indexOverride === "index" || input.indexOverride === "noindex") return input.indexOverride;
  return qualityScore >= INDEX_THRESHOLD ? "index" : "noindex";
}

function toRow(type, item) {
  const qualityScore = scoreLanding(item);
  const routePath =
    type === "websiteIndustry" ? `/website/nganh/${item.slug}` : `/seo-website/dia-phuong/${item.slug}`;
  return {
    type,
    slug: item.slug,
    routePath,
    title: item.title,
    qualityScore,
    indexPolicy: resolveIndexPolicy(item, qualityScore),
    indexOverride: item.indexOverride || null,
    proofCount: item.proofCount || 0,
    hasCaseStudy: Boolean(item.hasCaseStudy),
  };
}

function buildCurrentRows(config) {
  const website = Array.isArray(config.websiteIndustry) ? config.websiteIndustry : [];
  const local = Array.isArray(config.localSeo) ? config.localSeo : [];
  return [...website.map((x) => toRow("websiteIndustry", x)), ...local.map((x) => toRow("localSeo", x))];
}

function readSnapshot(snapshotPath) {
  if (!fs.existsSync(snapshotPath)) return { rows: [] };
  try {
    const raw = fs.readFileSync(snapshotPath, "utf8");
    return JSON.parse(raw);
  } catch {
    return { rows: [] };
  }
}

function toMap(rows) {
  const map = new Map();
  for (const row of rows || []) map.set(row.routePath, row);
  return map;
}

function getPromotionDecision(current, previous) {
  const prevPolicy = previous?.indexPolicy || "noindex";
  const scoreDelta = current.qualityScore - (previous?.qualityScore || 0);
  const hasProof = current.proofCount > 0 || current.hasCaseStudy;
  const passScore = current.qualityScore >= PROMOTION_MIN_SCORE;
  const passDelta = scoreDelta >= PROMOTION_MIN_SCORE_DELTA;
  const nowIndexable = current.indexPolicy === "index";

  const promotable = prevPolicy === "noindex" && nowIndexable && passScore && passDelta && hasProof;

  return {
    promotable,
    prevPolicy,
    scoreDelta,
    hasProof,
    passScore,
    passDelta,
    nowIndexable,
  };
}

function main() {
  const configPath = path.resolve(getArg("--config", DEFAULT_CONFIG_PATH));
  const outDir = path.resolve(getArg("--outDir", DEFAULT_OUT_DIR));
  const snapshotPath = path.resolve(getArg("--snapshot", DEFAULT_SNAPSHOT_PATH));
  const commitSnapshot = hasFlag("--commit");

  if (!fs.existsSync(configPath)) {
    console.error(`Config not found: ${configPath}`);
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const currentRows = buildCurrentRows(config);
  const previousSnapshot = readSnapshot(snapshotPath);
  const previousMap = toMap(previousSnapshot.rows);

  const decisions = currentRows.map((row) => {
    const previous = previousMap.get(row.routePath);
    const decision = getPromotionDecision(row, previous);
    return {
      routePath: row.routePath,
      title: row.title,
      qualityScore: row.qualityScore,
      previousQualityScore: previous?.qualityScore ?? null,
      scoreDelta: decision.scoreDelta,
      previousPolicy: decision.prevPolicy,
      currentPolicy: row.indexPolicy,
      promotable: decision.promotable,
      gates: {
        nowIndexable: decision.nowIndexable,
        passScore: decision.passScore,
        passDelta: decision.passDelta,
        hasProof: decision.hasProof,
      },
    };
  });

  const promotions = decisions.filter((x) => x.promotable);
  ensureDir(outDir);

  const reportPath = path.join(outDir, "programmatic-promotion-report.json");
  const promotePathsPath = path.join(outDir, "programmatic-promote-paths.txt");
  fs.writeFileSync(reportPath, JSON.stringify(decisions, null, 2), "utf8");
  fs.writeFileSync(
    promotePathsPath,
    promotions.map((x) => x.routePath).join("\n"),
    "utf8",
  );

  if (commitSnapshot) {
    fs.writeFileSync(
      snapshotPath,
      JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          rows: currentRows,
        },
        null,
        2,
      ),
      "utf8",
    );
  }

  console.log("=== Programmatic promotion audit ===");
  console.log(`Config: ${configPath}`);
  console.log(`Total rows: ${currentRows.length}`);
  console.log(`Promotable now: ${promotions.length}`);
  console.log(`Report: ${reportPath}`);
  console.log(`Promote paths: ${promotePathsPath}`);
  if (commitSnapshot) console.log(`Snapshot updated: ${snapshotPath}`);
}

main();
