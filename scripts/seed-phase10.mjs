/**
 * Pha 10 — Phân biệt nội dung 20 ngành ưu tiên + batch ngành template.
 * Chạy: npm run seed:phase10
 *       npm run seed:phase10 -- --dry-run
 *       npm run seed:phase10 -- --industry-batch   (76+ bài ngành còn template)
 *       npm run seed:phase10 -- --slug=thiet-ke-website-spa
 */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { REWRITE_BY_SLUG } from "./seo-rewrite-registry.mjs";
import { PHASE10_PRIORITY_SLUGS, TEMPLATE_INTRO_MARK } from "./seo-phase10-industry.mjs";
import { INDUSTRY_ENTRIES } from "./seo-industry-data.mjs";
import { upgradeArticle } from "./seo-upgrade-article.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";
import { industryKeywordsMain } from "./seo-industry-articles.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);

const dryRun = args["dry-run"] === true;
const industryBatch = args["industry-batch"] === true;
const onlySlug = typeof args.slug === "string" ? args.slug : null;

const industrySlugs = new Set(INDUSTRY_ENTRIES.map((e) => e.slug));

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const { data: rows, error } = await supabase
  .from("news")
  .select("slug,title,keywords_main,keywords_secondary,description,content")
  .eq("category", "blog")
  .eq("published", true);

if (error) {
  console.error(error.message);
  process.exit(1);
}

const rowBySlug = Object.fromEntries((rows || []).map((r) => [r.slug, r]));

let targets = [...PHASE10_PRIORITY_SLUGS];

if (onlySlug) {
  targets = [onlySlug];
} else if (industryBatch) {
  targets = (rows || [])
    .filter((r) => industrySlugs.has(r.slug) && r.content?.includes(TEMPLATE_INTRO_MARK))
    .map((r) => r.slug)
    .sort();
}

console.log(`=== Pha 10 — Content differentiation ===`);
console.log(`Mode: ${onlySlug ? "single" : industryBatch ? "industry-batch" : "priority-20"}`);
console.log(`Targets: ${targets.length} | Dry run: ${dryRun ? "YES" : "NO"}\n`);

let ok = 0;
let fail = 0;
let custom = 0;
let upgraded = 0;

for (let i = 0; i < targets.length; i++) {
  const slug = targets[i];
  const row = rowBySlug[slug];
  if (!row) {
    console.warn(`  ⚠ Skip (không có trên DB): ${slug}`);
    continue;
  }

  const registryArticle = REWRITE_BY_SLUG[slug];
  let article;

  if (registryArticle) {
    article = {
      ...registryArticle,
      keywordsMain: registryArticle.keywordsMain,
      keywordsSecondary: registryArticle.keywordsSecondary || row.keywords_secondary,
    };
    custom++;
  } else {
    const entry = INDUSTRY_ENTRIES.find((e) => e.slug === slug);
    article = upgradeArticle(
      {
        ...row,
        keywords_main: row.keywords_main || (entry ? industryKeywordsMain(entry) : row.title),
        keywords_secondary: row.keywords_secondary,
      },
      i,
    );
    upgraded++;
  }

  const before = row.content?.length || 0;
  const after = article.content.length;
  const wasTemplate = row.content?.includes(TEMPLATE_INTRO_MARK);

  if (dryRun) {
    console.log(
      `  [dry] ${slug}: ${before}→${after} chars | ${registryArticle ? "custom-rewrite" : "industry-upgrade"} | template:${wasTemplate}`,
    );
    ok++;
    continue;
  }

  try {
    await seedRewriteArticle(article, { log: false });
    console.log(
      `  ✓ ${slug}: ${before}→${after} chars | ${registryArticle ? "custom" : "upgrade"}${wasTemplate ? " (replaced template)" : ""}`,
    );
    ok++;
  } catch (err) {
    console.error(`  ✗ ${slug}:`, err.message);
    fail++;
  }
}

if (!dryRun && ok > 0) await revalidateBlogAfterSeed();

console.log(`\n=== Kết quả ===`);
console.log(`OK: ${ok} | Lỗi: ${fail} | Custom rewrite: ${custom} | Industry upgrade: ${upgraded}${dryRun ? " (dry-run)" : ""}`);
