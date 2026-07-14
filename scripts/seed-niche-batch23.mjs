/**
 * Seed batch 2+3 ngành nghề (~2500 bài).
 * Chạy: npm run seed:niche-batch23
 *       npm run seed:niche-batch23 -- --dry-run --limit=3
 *       npm run seed:niche-batch23 -- --limit=100
 */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { NICHE_BATCH23_KEYWORDS } from "./seo-niche-batch23-keywords.mjs";
import { upgradeArticle } from "./seo-upgrade-article.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

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
const limit = args.limit ? Number(args.limit) : Infinity;
const onlySlug = typeof args.slug === "string" ? args.slug : null;
const quiet = args.quiet === true || (!onlySlug && !dryRun && limit === Infinity);

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing Supabase env");
  process.exit(1);
}

const supabase = createClient(url, key);
const { data: rows, error } = await supabase.from("news").select("slug");
if (error) {
  console.error(error.message);
  process.exit(1);
}

const dbSlugs = new Set((rows || []).map((r) => r.slug));
let targets = NICHE_BATCH23_KEYWORDS.filter((e) => !dbSlugs.has(e.slug));

if (onlySlug) {
  targets = NICHE_BATCH23_KEYWORDS.filter((e) => e.slug === onlySlug);
  if (!targets.length) {
    console.error(`Slug "${onlySlug}" không có trong batch23.`);
    process.exit(1);
  }
}

const already = NICHE_BATCH23_KEYWORDS.length - targets.length;
targets = targets.slice(0, limit);

console.log(`=== Seed niche batch23 (500+2000) ===`);
console.log(
  `Catalog: ${NICHE_BATCH23_KEYWORDS.length} | Đã có DB: ${already} | Sẽ xử lý: ${targets.length} | dry-run: ${dryRun ? "YES" : "NO"}`,
);

let created = 0;
let fail = 0;

for (let i = 0; i < targets.length; i++) {
  const entry = targets[i];

  try {
    const article = upgradeArticle(
      {
        slug: entry.slug,
        title: entry.h1,
        keywords_main: entry.keywordsMain,
        description: `${entry.keywordsMain}: ${entry.angle}.`,
      },
      i,
    );

    if (dryRun) {
      if (!quiet) console.log(`  [dry] CREATE ${entry.slug} (${article.content.length} chars)`);
      created++;
      continue;
    }

    await seedRewriteArticle(article, { log: !quiet });
    created++;
    dbSlugs.add(entry.slug);

    if (!quiet && (i + 1) % 25 === 0) {
      console.log(`  … ${i + 1}/${targets.length}`);
    } else if (quiet && ((i + 1) % 50 === 0 || i === targets.length - 1)) {
      console.log(`  … ${i + 1}/${targets.length} (${entry.slug})`);
    }
  } catch (err) {
    fail++;
    console.error(`  ✗ FAIL ${entry.slug}:`, err.message || err);
  }
}

if (!dryRun && created > 0) {
  try {
    await revalidateBlogAfterSeed();
  } catch (e) {
    console.warn("Revalidate warn:", e.message || e);
  }
}

console.log(`\n=== Kết quả niche batch23 ===`);
if (dryRun) {
  console.log(`Sẽ tạo ${created} bài mới`);
} else {
  console.log(`Tạo mới: ${created} | Lỗi: ${fail}`);
}
