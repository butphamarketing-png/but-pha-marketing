/**
 * Seed / upgrade 30 bài từ KEYWORD_ENTRIES — nội dung dài chuẩn SEO qua buildRewriteArticle.
 * Chạy: node scripts/seed-keyword-data-batch.mjs
 *       node scripts/seed-keyword-data-batch.mjs --dry-run
 */
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { KEYWORD_ENTRIES } from "./seo-keyword-data.mjs";
import { buildRewriteArticle } from "./seo-rewrite-builder.mjs";
import { validateSeoKeywordPlacement } from "./seo-article-helpers.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const dryRun = process.argv.includes("--dry-run");
let ok = 0;
let fail = 0;

console.log(`=== Seed keyword-data batch (${KEYWORD_ENTRIES.length} bài) | dry-run: ${dryRun} ===\n`);

for (const entry of KEYWORD_ENTRIES) {
  const article = buildRewriteArticle({
    slug: entry.slug,
    title: entry.h1,
    keywordsMain: entry.keywordsMain,
    keywordsSecondary: entry.keywordsSecondary,
    description: entry.angle,
  });

  const seo = validateSeoKeywordPlacement({
    keywordsMain: article.keywordsMain,
    title: article.title,
    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
    description: article.description,
    html: article.content,
  });

  const lenOk = article.content.length >= 12000;
  const status = seo.ok && lenOk ? "OK" : "WARN";
  console.log(
    `${status} ${entry.slug}: ${article.content.length} chars | seo:${seo.ok ? "OK" : seo.missing.join(",")}`,
  );

  if (!seo.ok || !lenOk) fail++;

  if (dryRun) {
    ok++;
    continue;
  }

  try {
    await seedRewriteArticle(article, { log: false });
    ok++;
  } catch (err) {
    console.error(`  ✗ ${entry.slug}:`, err.message);
    fail++;
  }
}

if (!dryRun && ok > 0) await revalidateBlogAfterSeed();

console.log(`\nDone: ${ok} ok, ${fail} warnings/errors${dryRun ? " (dry-run)" : ""}`);
