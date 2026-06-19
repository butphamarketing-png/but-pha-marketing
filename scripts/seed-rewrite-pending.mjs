/**
 * Viết lại (upgrade) mọi bài template trên Supabase sang chuẩn WP SEO dài.
 * Chạy: node scripts/seed-rewrite-pending.mjs
 * Tùy chọn: node scripts/seed-rewrite-pending.mjs --limit=10
 *           node scripts/seed-rewrite-pending.mjs --slug=thiet-ke-website-portfolio-ca-nhan
 */
import dotenv from "dotenv";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "url";
import { PILLAR_THIET_KE_WEBSITE } from "./seo-pillar-thiet-ke-website.mjs";
import { SEO_ARTICLES } from "./seo-articles-content.mjs";
import { buildRewriteArticle } from "./seo-rewrite-builder.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const REWRITE_SLUGS = new Set([PILLAR_THIET_KE_WEBSITE.slug]);
const scriptsDir = path.join(root, "scripts");
for (const f of fs.readdirSync(scriptsDir)) {
  if (!f.startsWith("seo-rewrite-") || !f.endsWith(".mjs")) continue;
  const text = fs.readFileSync(path.join(scriptsDir, f), "utf8");
  const m = text.match(/slug:\s*["']([^"']+)["']/);
  if (m) REWRITE_SLUGS.add(m[1]);
}

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);

const limit = args.limit ? Number(args.limit) : Infinity;
const onlySlug = typeof args.slug === "string" ? args.slug : null;

const bySlug = new Map(SEO_ARTICLES.map((a) => [a.slug, a]));

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const { data: rows, error } = await supabase.from("news").select("slug,title,keywords_main,description").order("slug");
if (error) {
  console.error(error.message);
  process.exit(1);
}

const pending = (rows || []).filter((r) => !REWRITE_SLUGS.has(r.slug));
let targets = pending;

if (onlySlug) {
  targets = pending.filter((r) => r.slug === onlySlug);
  if (!targets.length) {
    console.error(`Slug "${onlySlug}" không nằm trong danh sách template cần viết lại (hoặc đã rewrite).`);
    process.exit(1);
  }
}

targets = targets.slice(0, limit);

console.log(`Viết lại ${targets.length}/${pending.length} bài template...\n`);

let ok = 0;
let fail = 0;

for (const row of targets) {
  const base = bySlug.get(row.slug) || {
    slug: row.slug,
    title: row.title,
    keywordsMain: row.keywords_main || row.title,
    description: row.description || "",
  };

  try {
    const article = buildRewriteArticle(base);
    const result = await seedRewriteArticle(article, { log: true });
    if (result.seoOk) ok++;
    else console.warn(`  ⚠ SEO warnings: ${row.slug}`);
  } catch (err) {
    fail++;
    console.error(`  ✗ FAIL ${row.slug}:`, err.message);
  }
}

console.log(`\nHoàn tất: ${ok} OK, ${fail} lỗi, ${targets.length - ok - fail} cảnh báo.`);
