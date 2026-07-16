/**
 * Force-rewrite + seed ALL MARKETING_ONLY stubs across seo-keywords-500-batch*.mjs
 * using intent-aware marketing builder (via upgradeArticle).
 *
 * Usage:
 *   node scripts/seed-rewrite-marketing-only-all.mjs
 *   node scripts/seed-rewrite-marketing-only-all.mjs --dry-run
 *   node scripts/seed-rewrite-marketing-only-all.mjs --batches=15,16,22
 *   node scripts/seed-rewrite-marketing-only-all.mjs --slug=google-ads-la-gi-b15
 *   node scripts/seed-rewrite-marketing-only-all.mjs --skip-b21
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { upgradeArticle } from "./seo-upgrade-article.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);

const dryRun = args["dry-run"] === true;
const skipB21 = args["skip-b21"] === true;
const onlySlug = typeof args.slug === "string" ? args.slug : null;
const batchFilter = typeof args.batches === "string" ? args.batches.split(",").map((x) => x.trim()) : null;
const limit = args.limit ? Number(args.limit) : Infinity;

const files = fs
  .readdirSync(root)
  .filter((f) => /^seo-keywords-500-batch\d+\.mjs$/.test(f))
  .sort((a, b) => {
    const na = Number(a.match(/batch(\d+)/)[1]);
    const nb = Number(b.match(/batch(\d+)/)[1]);
    return na - nb;
  });

const targets = [];

for (const file of files) {
  const batchNum = file.match(/batch(\d+)/)[1];
  if (batchFilter && !batchFilter.includes(batchNum)) continue;
  if (skipB21 && batchNum === "21") continue;

  const mod = await import(`./${file}`);
  const exportName = `KEYWORDS_500_BATCH${batchNum}`;
  const mktName = `KEYWORDS_500_BATCH${batchNum}_MARKETING_ONLY`;
  const KEYWORDS = mod[exportName];
  const MKT = mod[mktName];
  if (!KEYWORDS?.length || !MKT) continue;

  for (const e of KEYWORDS) {
    if (!MKT.has(e.slug)) continue;
    if (onlySlug && e.slug !== onlySlug) continue;
    targets.push({ ...e, _batch: batchNum });
  }
}

const list = targets.slice(0, limit);
console.log(`Marketing-only targets: ${list.length} (dryRun=${dryRun})`);

let ok = 0;
let fail = 0;
const sample = [];

for (let i = 0; i < list.length; i++) {
  const entry = list[i];
  try {
    const article = upgradeArticle(
      {
        slug: entry.slug,
        title: entry.h1,
        keywords_main: entry.keywordsMain,
        description: entry.angle,
      },
      i + Number(entry._batch) * 500,
    );

    if (dryRun) {
      const bad =
        /definition\.\.|advertising\.\.|xoay quanh [A-Za-z]{3,}(?![àáạ])/.test(article.content) ||
        /: [A-Za-z][A-Za-z\s]{8,}\./.test(article.description || "");
      if (i < 5 || bad) {
        sample.push({
          slug: entry.slug,
          intentHint: entry.keywordsMain,
          desc: article.metaDescription?.slice(0, 100),
          chars: article.content.length,
          bad,
        });
      }
      ok++;
      continue;
    }

    await seedRewriteArticle(article, {
      log: false,
      revalidate: false,
      skipGuardrails: false,
    });
    ok++;
    if ((i + 1) % 25 === 0 || i === list.length - 1) {
      console.log(`  … ${i + 1}/${list.length} (${entry.slug})`);
    }
  } catch (err) {
    fail++;
    console.error(`FAIL [${entry._batch}] ${entry.slug}:`, err.message || err);
  }
}

if (!dryRun && ok > 0) {
  await revalidateBlogAfterSeed();
}

if (dryRun && sample.length) {
  console.log("Sample:", JSON.stringify(sample, null, 2));
}

console.log(`Done. ok=${ok} fail=${fail}`);
if (fail) process.exit(1);
