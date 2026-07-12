/**
 * Audit toàn diện chất lượng blog (xử lý từng bài, tránh timeout).
 * Chạy: node scripts/audit-blog-full.mjs
 */
import dotenv from "dotenv";
import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { validateSeoKeywordPlacement } from "./seo-article-helpers.mjs";
import { parseNewsContentMeta } from "../lib/news-content-meta.ts";
import { contentHasPillarClusterBlock, contentLinksToPillar } from "./pillar-cluster-links.mjs";
import { getPillarHubForArticle } from "./seo-pillar-hub.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const PAGE = 20;

async function withRetry(fn, retries = 3) {
  let last;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (e) {
      last = e;
      if (i < retries - 1) await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    }
  }
  throw last;
}

function startsWithLowerLetter(text) {
  return /^[a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/.test(
    String(text || "").trim(),
  );
}

const issues = {
  seoFail: [],
  short: [],
  noMeta: [],
  lowerTitle: [],
  lowerMeta: [],
  genericKw: [],
  noPillar: [],
  fetchFail: [],
};

let total = 0;
let from = 0;

while (true) {
  const slugs = await withRetry(() =>
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
  );
  if (!slugs?.length) break;

  for (const { slug } of slugs) {
    total++;
    let row;
    try {
      const { data, error: rowErr } = await supabase
        .from("news")
        .select("slug,title,keywords_main,description,content,meta_description,hot")
        .eq("slug", slug)
        .maybeSingle();
      if (rowErr) throw rowErr;
      row = data;
    } catch {
      issues.fetchFail.push(slug);
      continue;
    }
    if (!row) continue;

    const { meta } = parseNewsContentMeta(row.content);
    const metaTitle = meta.metaTitle || row.title;
    const check = validateSeoKeywordPlacement({
      keywordsMain: row.keywords_main || row.title,
      title: row.title,
      metaTitle,
      metaDescription: row.meta_description,
      description: row.description,
      html: row.content,
    });
    if (!check.ok) issues.seoFail.push({ slug: row.slug, missing: check.missing });

    const len = row.content?.length || 0;
    if (len < 12000) issues.short.push({ slug: row.slug, len });

    if (!row.content?.startsWith("<!-- BUTPHA_META")) issues.noMeta.push(row.slug);

    if (startsWithLowerLetter(row.title)) issues.lowerTitle.push(row.slug);
    if (startsWithLowerLetter(metaTitle)) issues.lowerMeta.push(row.slug);

    const kw = (row.keywords_main || "").trim().toLowerCase();
    if (kw === "thiết kế website" || !kw) issues.genericKw.push(row.slug);

    const hub = getPillarHubForArticle({ slug: row.slug, keywordsMain: row.keywords_main, title: row.title });
    const hasPillarLink =
      contentHasPillarClusterBlock(row.content || "") ||
      hub.links.some((p) => p.slug !== row.slug && contentLinksToPillar(row.content || "", p.slug));
    if (!hasPillarLink && row.slug !== "thiet-ke-website") {
      issues.noPillar.push(row.slug);
    }

    if (total % 100 === 0) console.log(`  ... ${total} bài`);
  }

  if (slugs.length < PAGE) break;
  from += PAGE;
}

console.log("=== AUDIT TOÀN BỘ BLOG ===\n");
console.log(`Tổng: ${total}`);
console.log(`Fetch lỗi: ${issues.fetchFail.length}`);
console.log(`SEO fail: ${issues.seoFail.length}`);
console.log(`< 12k chars: ${issues.short.length}`);
console.log(`Thiếu BUTPHA_META: ${issues.noMeta.length}`);
console.log(`Title chữ thường: ${issues.lowerTitle.length}`);
console.log(`metaTitle chữ thường: ${issues.lowerMeta.length}`);
console.log(`keywords_main generic: ${issues.genericKw.length}`);
console.log(`Thiếu pillar block: ${issues.noPillar.length}`);

if (issues.short.length) {
  console.log("\nBài ngắn (<12k) — mẫu:");
  issues.short.slice(0, 10).forEach((x) => console.log(`  ${x.slug}: ${x.len}`));
}
if (issues.lowerMeta.length) {
  console.log("\nmetaTitle chữ thường — mẫu:");
  issues.lowerMeta.slice(0, 10).forEach((s) => console.log(`  ${s}`));
}
if (issues.noPillar.length) {
  console.log("\nThiếu pillar block — mẫu:");
  issues.noPillar.slice(0, 10).forEach((s) => console.log(`  ${s}`));
}

const totalIssues = new Set([
  ...issues.seoFail.map((x) => x.slug),
  ...issues.short.map((x) => x.slug),
  ...issues.noMeta,
  ...issues.lowerTitle,
  ...issues.lowerMeta,
  ...issues.fetchFail,
]).size;

console.log(`\nTổng bài có ít nhất 1 vấn đề: ${totalIssues}`);

const report = {
  generatedAt: new Date().toISOString(),
  total,
  issues: {
    fetchFail: issues.fetchFail.length,
    seoFail: issues.seoFail.length,
    short: issues.short.length,
    noMeta: issues.noMeta.length,
    lowerTitle: issues.lowerTitle.length,
    lowerMeta: issues.lowerMeta.length,
    genericKw: issues.genericKw.length,
    noPillar: issues.noPillar.length,
  },
  seoFailSlugs: issues.seoFail.map((x) => x.slug).slice(0, 500),
  noPillarSlugs: issues.noPillar,
  genericKwSlugs: issues.genericKw,
  totalWithIssues: totalIssues,
};

const outDir = path.join(root, "tmp-programmatic");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "blog-full-audit.json"), JSON.stringify(report, null, 2), "utf8");
console.log(`Report: ${path.join(outDir, "blog-full-audit.json")}`);

process.exit(totalIssues > 0 ? 1 : 0);
