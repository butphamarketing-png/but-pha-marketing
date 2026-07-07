/**
 * Sửa hàng loạt toàn bộ blog: title/meta, nội dung ngắn, pillar links.
 * Chạy: node scripts/seed-fix-all-blog.mjs
 *       node scripts/seed-fix-all-blog.mjs --dry-run
 *       node scripts/seed-fix-all-blog.mjs --phase=content|pillar|meta
 */
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import {
  buildSeoMetaTitle,
  buildSeoMetaDescription,
  toTitleCaseVi,
  patchNewsContentMetaTitle,
  keywordInText,
} from "./seo-article-helpers.mjs";
import { parseNewsContentMeta } from "../lib/news-content-meta.ts";
import { REWRITE_BY_SLUG } from "./seo-rewrite-registry.mjs";
import { PILLAR_SLUG_SET } from "./seo-pillar-hub.mjs";
import { upgradeArticle } from "./seo-upgrade-article.mjs";
import { applyPillarClusterLinks } from "./pillar-cluster-links.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const MIN_CHARS = 12000;
const PAGE = 50;
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const phaseArg = args.find((a) => a.startsWith("--phase="));
const phases = phaseArg
  ? new Set(phaseArg.split("=")[1].split("|"))
  : new Set(["content", "pillar", "meta"]);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function startsWithLowerLetter(text) {
  return /^[a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/.test(
    String(text || "").trim(),
  );
}

function fixTitle(title, keywordsMain) {
  const t = String(title || "").trim();
  const kw = String(keywordsMain || "").trim();
  if (!t) return toTitleCaseVi(kw);
  if (startsWithLowerLetter(t)) return toTitleCaseVi(t);
  return t;
}

async function withRetry(fn, label, retries = 3) {
  let lastErr;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const msg = err?.message || String(err);
      if (i === retries - 1) break;
      console.warn(`  retry ${i + 1}/${retries - 1} ${label}: ${msg}`);
      await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
    }
  }
  throw lastErr;
}

async function forEachBlogSlug(fn) {
  let from = 0;
  let total = 0;
  while (true) {
    const rows = await withRetry(
      () =>
        supabase
          .from("news")
          .select("slug")
          .eq("category", "blog")
          .eq("published", true)
          .order("slug")
          .range(from, from + PAGE - 1)
          .then(({ data, error }) => {
            if (error) throw error;
            return data;
          }),
      `slug-page-${from}`,
    );
    if (!rows?.length) break;
    for (const { slug } of rows) {
      try {
        await fn(slug);
      } catch (err) {
        console.error(`  ✗ skip ${slug}:`, err?.message || err);
        stats.fail++;
      }
      total++;
    }
    if (rows.length < PAGE) break;
    from += PAGE;
  }
  return total;
}

async function fetchBlogRow(slug, columns) {
  const { data, error } = await supabase
    .from("news")
    .select(columns)
    .eq("category", "blog")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

const stats = { meta: 0, content: 0, pillar: 0, skip: 0, fail: 0, total: 0 };

console.log(`=== Sửa toàn bộ blog | dry-run: ${dryRun} ===`);
console.log(`Phases: ${[...phases].join(", ")}\n`);

if (phases.has("content")) {
  console.log("--- Phase 1: Nội dung dài (≥12k) ---");
  let index = 0;
  stats.total = await forEachBlogSlug(async (slug) => {
    const row = await withRetry(
      () => fetchBlogRow(slug, "id,slug,title,keywords_main,keywords_secondary,description,content,hot"),
      `fetch ${slug}`,
    );
    if (!row) return;

    const len = row.content?.length || 0;
    if (len >= MIN_CHARS) return;
    if (PILLAR_SLUG_SET.has(row.slug)) {
      stats.skip++;
      return;
    }

    let article;
    const registry = REWRITE_BY_SLUG[row.slug];
    if (registry && registry.content.length >= MIN_CHARS) {
      stats.skip++;
      return;
    }
    if (registry) {
      article = {
        ...registry,
        keywordsSecondary: registry.keywordsSecondary || row.keywords_secondary,
      };
    } else {
      article = upgradeArticle(row, index);
    }
    index++;

    if (dryRun) {
      stats.content++;
      return;
    }

    try {
      await withRetry(
        () => seedRewriteArticle(article, { log: false, revalidate: false }),
        row.slug,
      );
      stats.content++;
      if (stats.content % 25 === 0) console.log(`  ... ${stats.content} bài`);
    } catch (err) {
      console.error(`  ✗ content ${row.slug}:`, err.message);
      stats.fail++;
    }
  });
  console.log(`  → ${stats.content} bài nâng cấp (${stats.total} quét)\n`);
}

if (phases.has("pillar")) {
  console.log("--- Phase 2: Pillar cluster links ---");
  stats.total = await forEachBlogSlug(async (slug) => {
    const row = await withRetry(
      () => fetchBlogRow(slug, "id,slug,title,content,keywords_main"),
      `fetch ${slug}`,
    );
    if (!row) return;

    const result = applyPillarClusterLinks(row);
    if (!result.updated) return;

    if (dryRun) {
      stats.pillar++;
      return;
    }

    try {
      await withRetry(
        () =>
          supabase
            .from("news")
            .update({ content: result.content, updated_at: new Date().toISOString() })
            .eq("id", row.id)
            .then(({ error }) => {
              if (error) throw error;
            }),
        row.slug,
      );
      stats.pillar++;
    } catch (err) {
      console.error(`  ✗ pillar ${row.slug}:`, err.message);
      stats.fail++;
    }
  });
  console.log(`  → ${stats.pillar} bài thêm pillar links (${stats.total} quét)\n`);
}

if (phases.has("meta")) {
  console.log("--- Phase 3: Title & meta (bài đã đủ dài) ---");
  stats.total = await forEachBlogSlug(async (slug) => {
    const row = await withRetry(
      () => fetchBlogRow(slug, "id,slug,title,keywords_main,description,content,meta_description"),
      `fetch ${slug}`,
    );
    if (!row) return;

    const kw = (row.keywords_main || "").trim();
    const { meta } = parseNewsContentMeta(row.content);
    const currentMetaTitle = meta.metaTitle || "";
    const newTitle = fixTitle(row.title, kw);
    const newMetaTitle = buildSeoMetaTitle(kw || newTitle);
    const newMetaDesc =
      row.meta_description && keywordInText(row.meta_description, kw) && !startsWithLowerLetter(row.meta_description)
        ? row.meta_description
        : buildSeoMetaDescription(kw, row.description || "");

    const needsContentMeta =
      currentMetaTitle !== newMetaTitle || startsWithLowerLetter(currentMetaTitle);
    const needsMeta =
      newTitle !== row.title ||
      needsContentMeta ||
      row.meta_description !== newMetaDesc ||
      startsWithLowerLetter(row.meta_description);

    if (!needsMeta) return;

    if (dryRun) {
      stats.meta++;
      return;
    }

    const payload = {
      title: newTitle,
      meta_description: newMetaDesc,
      updated_at: new Date().toISOString(),
    };
    if (needsContentMeta) {
      payload.content = patchNewsContentMetaTitle(row.content || "", newMetaTitle);
    }

    try {
      await withRetry(
        () =>
          supabase
            .from("news")
            .update(payload)
            .eq("id", row.id)
            .then(({ error }) => {
              if (error) throw error;
            }),
        row.slug,
      );
      stats.meta++;
    } catch (err) {
      console.error(`  ✗ meta ${row.slug}:`, err.message);
      stats.fail++;
    }
  });
  console.log(`  → ${stats.meta} bài cập nhật meta (${stats.total} quét)\n`);
}

if (!dryRun && (stats.meta > 0 || stats.content > 0 || stats.pillar > 0)) {
  await revalidateBlogAfterSeed();
}

console.log("=== Hoàn tất ===");
console.log(`Content: ${stats.content} | Pillar: ${stats.pillar} | Meta: ${stats.meta} | Skip: ${stats.skip} | Lỗi: ${stats.fail}`);
