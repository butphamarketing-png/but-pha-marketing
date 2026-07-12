/**
 * Inject pillar cluster block cho bài thiếu (paginated).
 * Chạy: npm run seed:fix-pillar-blocks
 */
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";
import { applyPillarClusterLinks, contentHasPillarClusterBlock } from "./pillar-cluster-links.mjs";
import { PILLAR_SLUG_SET } from "./seo-pillar-hub.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });

const dryRun = process.argv.includes("--dry-run");
const hotOnly = process.argv.includes("--hot-only");
const PAGE = 100;

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

let scanned = 0;
let updated = 0;
let from = 0;

while (true) {
  let q = sb
    .from("news")
    .select("slug,title,keywords_main,keywords_secondary,description,content,hot")
    .eq("category", "blog")
    .eq("published", true)
    .order("slug")
    .range(from, from + PAGE - 1);
  if (hotOnly) q = q.eq("hot", true);

  const { data, error } = await q;
  if (error) throw error;
  if (!data?.length) break;

  for (const row of data) {
    scanned++;
    if (PILLAR_SLUG_SET.has(row.slug) || contentHasPillarClusterBlock(row.content || "")) continue;

    const result = applyPillarClusterLinks(row);
    if (!result.updated || !result.content) continue;

    if (dryRun) {
      console.log(`DRY pillar ${row.slug}`);
      updated++;
      continue;
    }

    await seedRewriteArticle(
      {
        slug: row.slug,
        title: row.title,
        keywordsMain: row.keywords_main || row.title,
        keywordsSecondary: row.keywords_secondary || "",
        description: row.description || "",
        metaTitle: row.title,
        metaDescription: row.description || row.title,
        content: result.content,
        hot: row.hot,
      },
      { log: false, revalidate: false },
    );
    updated++;
    if (updated % 10 === 0) console.log(`  ... pillar ${updated}`);
  }

  if (data.length < PAGE) break;
  from += PAGE;
}

if (!dryRun && updated > 0) await revalidateBlogAfterSeed();

console.log("\n=== Fix pillar blocks ===");
console.log(`Scanned: ${scanned}`);
console.log(`Updated: ${updated}`);
console.log(`Mode: ${dryRun ? "dry-run" : "live"}`);
