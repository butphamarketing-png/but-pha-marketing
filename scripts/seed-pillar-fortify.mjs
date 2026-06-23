/**
 * Pha 5 — Nâng 8 pillar mỏng lên chuẩn hub (15k+ ký tự, cluster index, hot).
 * Chạy: npm run seed:pillar-fortify
 *       npm run seed:pillar-fortify -- --dry-run
 *       npm run seed:pillar-fortify -- --slug=seo-la-gi
 */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { THIN_PILLAR_SLUGS, buildPillarFortifiedArticle } from "./seo-pillar-longform.mjs";
import { fetchClusterGroupsForPillar } from "./pillar-cluster-index.mjs";
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
const onlySlug = typeof args.slug === "string" ? args.slug : null;
const targets = onlySlug ? [onlySlug] : THIN_PILLAR_SLUGS;

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing Supabase env");
  process.exit(1);
}

const supabase = createClient(url, key);

console.log(`=== Pha 5: Fortify ${targets.length} pillar ===`);
console.log(`Dry run: ${dryRun ? "YES" : "NO"}\n`);

let ok = 0;
let fail = 0;

for (const slug of targets) {
  try {
    const clusterGroups = await fetchClusterGroupsForPillar(supabase, slug);
    const clusterCount = clusterGroups.reduce((n, g) => n + g.items.length, 0);
    const article = buildPillarFortifiedArticle(slug, clusterGroups);

    if (dryRun) {
      console.log(`  [dry] ${slug}: ${article.content.length} chars, ${clusterCount} cluster links, hot=${article.hot}`);
      ok++;
      continue;
    }

    const result = await seedRewriteArticle(article, { log: true });
    console.log(`  ✓ ${slug}: ${article.content.length} chars, ${clusterCount} cluster links${result.seoOk ? "" : " (SEO warn)"}`);
    ok++;
  } catch (err) {
    fail++;
    console.error(`  ✗ ${slug}:`, err.message);
  }
}

if (!dryRun && ok > 0) await revalidateBlogAfterSeed();

console.log(`\n=== Kết quả ===`);
console.log(`${dryRun ? "Sẽ cập nhật" : "Cập nhật"}: ${ok} | Lỗi: ${fail}`);
