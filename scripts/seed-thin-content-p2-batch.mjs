/**
 * P2.2 — Nâng các bài blog còn dưới 12k chars (upgradeArticle longform).
 * Chạy: node scripts/seed-thin-content-p2-batch.mjs
 *       node scripts/seed-thin-content-p2-batch.mjs --dry-run
 */
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { upgradeArticle } from "./seo-upgrade-article.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";
import { getSiloConfigForSlug, injectSiloLinks } from "./seo-silo-inject.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });

const THIN_SLUGS = [
  "checklist-website-my-pham-2026",
  "checklist-website-logistics-2026",
  "checklist-website-tham-my-vien-2026",
  "checklist-website-phong-kham-2026",
  "checklist-website-nha-khoa-2026",
  "template-website-nha-khoa-2026",
  "thiet-ke-website-noi-that",
  "thiet-ke-website-go-noi-that",
  "case-study-thiet-ke-website-van-toc-express-logistics",
  "thiet-ke-website-vat-lieu-xay-dung",
  "case-study-thiet-ke-website-glow-dew-cosmetics",
  "thiet-ke-website-noi-that-van-phong",
  "seo-maps-la-gi",
];

const THIN_THRESHOLD = 12000;
const dryRun = process.argv.includes("--dry-run");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing Supabase env");
  process.exit(1);
}

const supabase = createClient(url, key);

async function fetchRow(slug) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const { data, error } = await supabase
      .from("news")
      .select("slug,title,keywords_main,keywords_secondary,description,content")
      .eq("slug", slug)
      .maybeSingle();
    if (!error) return data;
    if (attempt === 2) throw error;
    await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
  }
  return null;
}

const rows = [];
for (const slug of THIN_SLUGS) {
  const row = await fetchRow(slug);
  if (row) rows.push(row);
}

const thin = rows
  .filter((r) => (r.content?.length || 0) < THIN_THRESHOLD)
  .sort((a, b) => (a.content?.length || 0) - (b.content?.length || 0));

console.log(`=== P2.2 thin content batch ===`);
console.log(`Target slugs: ${THIN_SLUGS.length} | Still under ${THIN_THRESHOLD}: ${thin.length} | Dry run: ${dryRun ? "YES" : "NO"}\n`);

let ok = 0;
let fail = 0;

for (let i = 0; i < thin.length; i++) {
  const row = thin[i];
  const before = row.content?.length || 0;
  try {
    let article = upgradeArticle(row, i);
    const siloCfg = getSiloConfigForSlug(row.slug);
    if (siloCfg) {
      article = { ...article, content: injectSiloLinks(article.content, siloCfg) };
    }
    const after = article.content.length;
    if (dryRun) {
      console.log(`  [dry] ${row.slug}: ${before} → ${after}`);
      ok++;
      continue;
    }
    await seedRewriteArticle(article, { log: true, revalidate: false });
    console.log(`  ✓ ${row.slug}: ${before} → ${after}`);
    ok++;
  } catch (err) {
    fail++;
    console.error(`  ✗ ${row.slug}:`, err.message);
  }
}

if (!dryRun && ok > 0) await revalidateBlogAfterSeed();

console.log(`\nDone: ${ok}/${thin.length} | Lỗi: ${fail}`);
