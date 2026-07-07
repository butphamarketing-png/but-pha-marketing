/**
 * Sửa title/metaTitle viết hoa chuẩn cho SERP Google.
 * Chạy: node scripts/seed-fix-title-capitalization.mjs
 */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildSeoMetaTitle,
  buildSeoMetaDescription,
  toTitleCaseVi,
  patchNewsContentMetaTitle,
  keywordInText,
} from "./seo-article-helpers.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function needsCapitalize(text) {
  const t = String(text || "").trim();
  if (!t) return false;
  const first = t[0];
  return first === first.toLowerCase() && first !== first.toUpperCase();
}

function fixTitle(title, keywordsMain) {
  const t = String(title || "").trim();
  const kw = String(keywordsMain || "").trim();
  if (!t) return toTitleCaseVi(kw);
  if (needsCapitalize(t)) return toTitleCaseVi(t);
  return t;
}

const { data: rows, error } = await supabase
  .from("news")
  .select("id,slug,title,keywords_main,description,content,meta_description")
  .eq("category", "blog");

if (error) throw error;

let updated = 0;

for (const row of rows || []) {
  const kw = (row.keywords_main || "").trim();
  const newTitle = fixTitle(row.title, kw);
  const newMetaTitle = buildSeoMetaTitle(kw || newTitle);
  const newMetaDesc =
    row.meta_description && keywordInText(row.meta_description, kw)
      ? row.meta_description
      : buildSeoMetaDescription(kw, row.description || "");

  const titleChanged = newTitle !== row.title;
  const contentChanged = !String(row.content || "").includes(`"metaTitle":"${newMetaTitle}"`);
  const metaDescChanged = needsCapitalize(row.meta_description) || row.meta_description !== newMetaDesc;

  if (!titleChanged && !contentChanged && !metaDescChanged) continue;

  const payload = {
    title: newTitle,
    content: patchNewsContentMetaTitle(row.content || "", newMetaTitle),
    meta_description: newMetaDesc,
    updated_at: new Date().toISOString(),
  };

  const { error: upErr } = await supabase.from("news").update(payload).eq("id", row.id);
  if (upErr) {
    console.error(`✗ ${row.slug}:`, upErr.message);
    continue;
  }

  updated++;
  console.log(`✓ ${row.slug}`);
  console.log(`   title: ${row.title} → ${newTitle}`);
  console.log(`   meta:  ${newMetaTitle}`);
}

if (updated > 0) await revalidateBlogAfterSeed();
console.log(`\nDone — ${updated}/${rows?.length || 0} bài đã cập nhật title/meta.`);
