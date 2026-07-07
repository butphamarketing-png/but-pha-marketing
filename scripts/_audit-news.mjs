import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PILLAR_THIET_KE_WEBSITE } from "./seo-pillar-thiet-ke-website.mjs";
import { WEBSITE_ARTICLES } from "./seo-website-articles.mjs";
import { INDUSTRY_ARTICLES } from "./seo-industry-articles.mjs";
import { KEYWORD_ARTICLES } from "./seo-keyword-articles.mjs";
import { LA_GI_ARTICLES } from "./seo-la-gi-articles.mjs";
import { LOCAL_SEO_ARTICLES } from "./seo-local-articles.mjs";
import { MARKETING_ARTICLES } from "./seo-marketing-articles.mjs";
import { SEO_ARTICLES } from "./seo-articles-content.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const scriptsDir = path.join(root, "scripts");
const rewriteSlugs = new Set([PILLAR_THIET_KE_WEBSITE.slug]);
for (const f of fs.readdirSync(scriptsDir)) {
  if (!f.startsWith("seo-rewrite-") || !f.endsWith(".mjs")) continue;
  const text = fs.readFileSync(path.join(scriptsDir, f), "utf8");
  const m = text.match(/slug:\s*["']([^"']+)["']/);
  if (m) rewriteSlugs.add(m[1]);
}

const rewriteInSeed = SEO_ARTICLES.filter((a) => rewriteSlugs.has(a.slug));
const templateInSeed = SEO_ARTICLES.filter((a) => !rewriteSlugs.has(a.slug));

console.log("=== TRONG CODE (seo-articles-content.mjs) ===");
console.log(`Đã viết lại (rewrite): ${rewriteSlugs.size} slug`);
console.log(`Chỉ template ngắn:     ${templateInSeed.length} slug`);
console.log(`Tổng trong seed:       ${SEO_ARTICLES.length} bài`);

console.log("\n=== ĐÃ VIẾT LẠI (${rewriteSlugs.size}) ===");
[...rewriteSlugs].sort().forEach((s) => {
  const a = SEO_ARTICLES.find((x) => x.slug === s);
  console.log(`  ✓ ${s}${a ? "" : " (chưa có trong SEO_ARTICLES)"}`);
});

console.log("\n=== CHƯA VIẾT LẠI — 20 bài đầu (theo slug) ===");
templateInSeed
  .slice(0, 20)
  .forEach((a) => console.log(`  ○ ${a.slug} — ${a.title.slice(0, 60)}…`));

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.log("\n=== SUPABASE ===\n  (Thiếu env — không kiểm tra DB được)");
  process.exit(0);
}

const supabase = createClient(url, key);
const { data: rows, error } = await supabase
  .from("news")
  .select("slug,title,published,hot,updated_at")
  .order("updated_at", { ascending: false });

if (error) {
  console.log("\n=== SUPABASE ===\n  Lỗi:", error.message);
  process.exit(1);
}

const dbSlugs = new Set((rows || []).map((r) => r.slug));
const seedSlugs = new Set(SEO_ARTICLES.map((a) => a.slug));
const missingOnSite = SEO_ARTICLES.filter((a) => !dbSlugs.has(a.slug));
const extraOnSite = (rows || []).filter((r) => !seedSlugs.has(r.slug) && !rewriteSlugs.has(r.slug));

console.log("\n=== TRÊN SUPABASE (tin tức live) ===");
console.log(`Tổng bài trên DB:     ${rows?.length ?? 0}`);
console.log(`Published:            ${(rows || []).filter((r) => r.published).length}`);
console.log(`Hot:                  ${(rows || []).filter((r) => r.hot).length}`);
console.log(`Rewrite có trên DB:   ${[...rewriteSlugs].filter((s) => dbSlugs.has(s)).length}/${rewriteSlugs.size}`);
console.log(`Template có trên DB:  ${templateInSeed.filter((a) => dbSlugs.has(a.slug)).length}/${templateInSeed.length}`);
console.log(`Seed chưa lên DB:     ${missingOnSite.length} bài`);

if (missingOnSite.length > 0 && missingOnSite.length <= 15) {
  console.log("\n  Chưa seed lên DB:");
  missingOnSite.forEach((a) => console.log(`    - ${a.slug}`));
} else if (missingOnSite.length > 15) {
  console.log("\n  Ví dụ chưa seed (5 bài đầu):");
  missingOnSite.slice(0, 5).forEach((a) => console.log(`    - ${a.slug}`));
}

const rewriteMissingDb = [...rewriteSlugs].filter((s) => !dbSlugs.has(s));
if (rewriteMissingDb.length) {
  console.log("\n  ⚠ Rewrite chưa có trên DB:");
  rewriteMissingDb.forEach((s) => console.log(`    - ${s}`));
}

const shortContent = (rows || []).filter((r) => rewriteSlugs.has(r.slug));
console.log(`\n  Rewrite đã publish: ${shortContent.filter((r) => r.published).length}/${rewriteSlugs.size}`);
