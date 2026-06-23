/**
 * Pha 2A — Chèn block link pillar vào nội dung HTML các bài cluster.
 * Chạy: node scripts/seed-pillar-cluster-links.mjs
 *       node scripts/seed-pillar-cluster-links.mjs --dry-run
 *       node scripts/seed-pillar-cluster-links.mjs --limit=20
 *       node scripts/seed-pillar-cluster-links.mjs --slug=thiet-ke-website-spa
 */
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { applyPillarClusterLinks } from "./pillar-cluster-links.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const limitArg = args.find((a) => a.startsWith("--limit="));
const slugArg = args.find((a) => a.startsWith("--slug="));
const limit = limitArg ? Number.parseInt(limitArg.split("=")[1], 10) : null;
const onlySlug = slugArg ? slugArg.split("=")[1] : null;

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key);

let query = supabase
  .from("news")
  .select("id,slug,title,content,keywords_main")
  .eq("category", "blog")
  .eq("published", true)
  .order("slug");

if (onlySlug) {
  query = query.eq("slug", onlySlug);
}

const { data: rows, error } = await query;
if (error) {
  console.error(error.message);
  process.exit(1);
}

const stats = {
  total: rows?.length ?? 0,
  updated: 0,
  skipped: {},
  errors: 0,
};

const toUpdate = [];

for (const row of rows || []) {
  const result = applyPillarClusterLinks(row);
  if (result.updated) {
    toUpdate.push({ id: row.id, slug: row.slug, content: result.content, pillarCount: result.pillarCount });
    stats.updated++;
    if (dryRun) {
      console.log(`[dry-run] would update: ${row.slug} (+${result.pillarCount} pillar links, ${result.reason})`);
    }
    if (limit != null && stats.updated >= limit && !onlySlug) break;
  } else {
    stats.skipped[result.reason] = (stats.skipped[result.reason] || 0) + 1;
  }
}

if (dryRun) {
  console.log("\n--- Dry run summary ---");
  console.log(`Would update: ${stats.updated} / ${stats.total}`);
  console.log("Skipped:", stats.skipped);
  process.exit(0);
}

for (const item of toUpdate) {
  const { error: updateError } = await supabase
    .from("news")
    .update({
      content: item.content,
      updated_at: new Date().toISOString(),
    })
    .eq("id", item.id);

  if (updateError) {
    console.error(`Error updating ${item.slug}:`, updateError.message);
    stats.errors++;
    continue;
  }
  console.log(`Updated: ${item.slug} (+${item.pillarCount} pillar links)`);
}

if (stats.updated > 0) {
  await revalidateBlogAfterSeed();
}

console.log("\n--- Summary ---");
console.log(`Updated: ${stats.updated} / ${stats.total}`);
console.log("Skipped:", stats.skipped);
if (stats.errors) console.log(`Errors: ${stats.errors}`);
