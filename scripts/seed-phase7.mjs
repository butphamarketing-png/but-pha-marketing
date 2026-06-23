/**
 * Pha 7 — Nâng 51 bài -la-gi mỏng + cluster index cho 2 pillar website chính.
 * Chạy: npm run seed:phase7
 *       npm run seed:phase7 -- --dry-run
 *       npm run seed:phase7 -- --la-gi-only
 *       npm run seed:phase7 -- --website-only
 */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PILLAR_SLUG_SET } from "./seo-pillar-hub.mjs";
import { upgradeArticle } from "./seo-upgrade-article.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";
import { fetchClusterGroupsForPillar } from "./pillar-cluster-index.mjs";
import { WEBSITE_MAIN_PILLARS, buildWebsitePillarWithCluster } from "./seo-pillar-longform.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const THIN_THRESHOLD = 8000;

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);

const dryRun = args["dry-run"] === true;
const laGiOnly = args["la-gi-only"] === true;
const websiteOnly = args["website-only"] === true;
const quiet = !dryRun && !args.verbose;

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing Supabase env");
  process.exit(1);
}

const supabase = createClient(url, key);

const { data: rows, error } = await supabase
  .from("news")
  .select("slug,title,keywords_main,description,content")
  .eq("category", "blog")
  .eq("published", true);

if (error) {
  console.error(error.message);
  process.exit(1);
}

const thinLaGi = (rows || [])
  .filter((r) => (r.content?.length || 0) < THIN_THRESHOLD && r.slug.endsWith("-la-gi") && !PILLAR_SLUG_SET.has(r.slug))
  .sort((a, b) => (a.content?.length || 0) - (b.content?.length || 0));

console.log(`=== Pha 7 ===`);
console.log(`Dry run: ${dryRun ? "YES" : "NO"}`);
console.log(`Bài -la-gi mỏng: ${thinLaGi.length}`);
console.log(`Pillar website cluster: ${WEBSITE_MAIN_PILLARS.join(", ")}\n`);

let ok = 0;
let fail = 0;
let warned = 0;

async function runLaGi() {
  if (websiteOnly) return;
  for (let i = 0; i < thinLaGi.length; i++) {
    const row = thinLaGi[i];
    try {
      const article = upgradeArticle(row, i);
      const before = row.content?.length || 0;
      const after = article.content.length;

      if (dryRun) {
        console.log(`  [dry] ${row.slug}: ${before} → ${after} chars`);
        ok++;
        continue;
      }

      const result = await seedRewriteArticle(article, { log: !quiet });
      if (!quiet) {
        console.log(`  ✓ ${row.slug}: ${before} → ${after}${result.seoOk ? "" : " (SEO warn)"}`);
      } else if ((i + 1) % 15 === 0 || i === thinLaGi.length - 1) {
        console.log(`  … ${i + 1}/${thinLaGi.length} (${row.slug}: ${after} chars)`);
      }
      if (!result.seoOk) warned++;
      ok++;
    } catch (err) {
      fail++;
      console.error(`  ✗ ${row.slug}:`, err.message);
    }
  }
}

async function runWebsitePillars() {
  if (laGiOnly) return;
  for (const slug of WEBSITE_MAIN_PILLARS) {
    try {
      const clusterGroups = await fetchClusterGroupsForPillar(supabase, slug);
      const clusterCount = clusterGroups.reduce((n, g) => n + g.items.length, 0);
      const article = buildWebsitePillarWithCluster(slug, clusterGroups);
      const hasCluster = article.content.includes("article-cluster-index");

      if (dryRun) {
        console.log(`  [dry] ${slug}: ${article.content.length} chars, cluster=${hasCluster}, links=${clusterCount}`);
        ok++;
        continue;
      }

      const result = await seedRewriteArticle(article, { log: true });
      console.log(`  ✓ ${slug}: ${article.content.length} chars, ${clusterCount} cluster links${result.seoOk ? "" : " (SEO warn)"}`);
      if (!result.seoOk) warned++;
      ok++;
    } catch (err) {
      fail++;
      console.error(`  ✗ ${slug}:`, err.message);
    }
  }
}

await runLaGi();
await runWebsitePillars();

if (!dryRun && ok > 0) await revalidateBlogAfterSeed();

console.log(`\n=== Kết quả ===`);
console.log(`${dryRun ? "Sẽ cập nhật" : "Cập nhật"}: ${ok} | Lỗi: ${fail} | Cảnh báo SEO: ${warned}`);
