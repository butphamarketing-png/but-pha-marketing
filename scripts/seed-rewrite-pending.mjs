/**
 * Pha 2B — Viết lại bài template mỏng sang chuẩn SEO dài (ưu tiên < 12k ký tự).
 * Chạy: npm run seed:rewrite-pending
 *       npm run seed:rewrite-pending -- --limit=50
 *       npm run seed:rewrite-pending -- --dry-run
 *       npm run seed:rewrite-pending -- --slug=bao-tri-website
 */
import dotenv from "dotenv";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "url";
import { PILLAR_THIET_KE_WEBSITE } from "./seo-pillar-thiet-ke-website.mjs";
import { PILLAR_SLUG_SET } from "./seo-pillar-hub.mjs";
import { upgradeArticle } from "./seo-upgrade-article.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const HOT_CHAR_THRESHOLD = 12000;

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

const dryRun = args["dry-run"] === true;
const limit = args.limit ? Number(args.limit) : 50;
const onlySlug = typeof args.slug === "string" ? args.slug : null;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const { data: rows, error } = await supabase
  .from("news")
  .select("slug,title,keywords_main,description,content,hot")
  .eq("category", "blog")
  .eq("published", true)
  .order("slug");

if (error) {
  console.error(error.message);
  process.exit(1);
}

let pending = (rows || []).filter((r) => !REWRITE_SLUGS.has(r.slug) && !PILLAR_SLUG_SET.has(r.slug));
pending = pending.filter((r) => (r.content?.length || 0) < HOT_CHAR_THRESHOLD);
pending.sort((a, b) => (a.content?.length || 0) - (b.content?.length || 0));

if (onlySlug) {
  pending = pending.filter((r) => r.slug === onlySlug);
  if (!pending.length) {
    const row = (rows || []).find((r) => r.slug === onlySlug);
    if (!row) {
      console.error(`Slug "${onlySlug}" không tồn tại.`);
      process.exit(1);
    }
    if (REWRITE_SLUGS.has(onlySlug) || PILLAR_SLUG_SET.has(onlySlug)) {
      console.error(`Slug "${onlySlug}" là pillar/đã rewrite — bỏ qua.`);
      process.exit(1);
    }
    if ((row.content?.length || 0) >= HOT_CHAR_THRESHOLD) {
      console.error(`Slug "${onlySlug}" đã đủ dài (${row.content.length} chars).`);
      process.exit(1);
    }
    pending = [row];
  }
}

const targets = pending.slice(0, limit);

console.log(`Pha 2B — Viết lại ${targets.length}/${pending.length} bài mỏng nhất (< ${HOT_CHAR_THRESHOLD} chars)...\n`);
if (targets.length) {
  console.log(
    "Mẫu:",
    targets
      .slice(0, 5)
      .map((r) => `${r.slug} (${r.content?.length || 0})`)
      .join(", "),
    targets.length > 5 ? "…" : "",
  );
  console.log("");
}

let ok = 0;
let fail = 0;
let warned = 0;

for (let i = 0; i < targets.length; i++) {
  const row = targets[i];
  try {
    const article = upgradeArticle(row, i);
    const chars = article.content.length;
    if (dryRun) {
      console.log(`[dry-run] ${row.slug}: ${row.content?.length || 0} → ${chars} chars${chars >= HOT_CHAR_THRESHOLD ? " (hot)" : ""}`);
      ok++;
      continue;
    }
    const result = await seedRewriteArticle(article, { log: true });
    if (result.seoOk) ok++;
    else {
      warned++;
      console.warn(`  ⚠ SEO warnings: ${row.slug}`);
    }
  } catch (err) {
    fail++;
    console.error(`  ✗ FAIL ${row.slug}:`, err.message);
  }
}

console.log(`\nHoàn tất: ${ok} OK, ${fail} lỗi, ${warned} cảnh báo SEO${dryRun ? " (dry-run)" : ""}.`);
