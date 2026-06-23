/**
 * Audit meta SEO toàn bộ blog trên Supabase.
 * Chạy: node scripts/audit-blog-seo-meta.mjs
 */
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { validateSeoKeywordPlacement } from "./seo-article-helpers.mjs";

function parseMetaTitle(content) {
  const match = String(content || "").match(/^<!-- BUTPHA_META ([\s\S]+?) -->\s*/);
  if (!match) return "";
  try {
    const meta = JSON.parse(match[1]);
    return meta?.metaTitle || "";
  } catch {
    return "";
  }
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const { data: rows, error } = await supabase
  .from("news")
  .select("slug,title,keywords_main,description,content,meta_description")
  .eq("category", "blog")
  .eq("published", true)
  .order("slug");

if (error) {
  console.error(error.message);
  process.exit(1);
}

const issues = [];

for (const row of rows || []) {
  const metaTitle = parseMetaTitle(row.content) || row.title;
  const check = validateSeoKeywordPlacement({
    keywordsMain: row.keywords_main || row.title,
    title: row.title,
    metaTitle,
    metaDescription: row.meta_description,
    description: row.description,
    html: row.content,
  });
  if (!check.ok) {
    issues.push({ slug: row.slug, missing: check.missing, metaTitleLen: metaTitle.length, metaDescLen: (row.meta_description || "").length });
  }
}

console.log(`=== Audit SEO meta — ${rows?.length ?? 0} bài ===`);
console.log(`Pass: ${(rows?.length ?? 0) - issues.length}`);
console.log(`Cần sửa: ${issues.length}\n`);

const byIssue = {};
for (const item of issues) {
  for (const m of item.missing) {
    byIssue[m] = (byIssue[m] || 0) + 1;
  }
}
console.log("Theo loại lỗi:", byIssue);
console.log("\nMẫu (20 đầu):");
for (const item of issues.slice(0, 20)) {
  console.log(`  ${item.slug}: ${item.missing.join(", ")}`);
}
