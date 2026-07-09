/**
 * Rewrite bài website generic → inject INDUSTRY_ENTRIES khi slug khớp ngành.
 * Chạy: npm run seed:rewrite-website-industry
 *       npm run seed:rewrite-website-industry -- --dry-run --limit=10
 *       npm run seed:rewrite-website-industry -- --industry-only
 */
import dotenv from "dotenv";
import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { PILLAR_THIET_KE_WEBSITE } from "./seo-pillar-thiet-ke-website.mjs";
import { PILLAR_SLUG_SET } from "./seo-pillar-hub.mjs";
import { upgradeArticle } from "./seo-upgrade-article.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";
import { resolveIndustryEntryFromSlug } from "./seo-industry-resolve.mjs";

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

const dryRun = args["dry-run"] === true;
const limit = args.limit ? Number(args.limit) : Infinity;
const onlySlug = typeof args.slug === "string" ? args.slug : null;
const industryOnly = args["industry-only"] === true;
const quiet = args.quiet === true;

function isWebsiteSlug(slug) {
  return slug.startsWith("thiet-ke-website-") || slug.startsWith("bao-gia-thiet-ke-website-");
}

function isGenericWebsiteContent(content) {
  return !content?.includes('id="nganh"') && !content?.includes("Đặc thù ");
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

let slugs = [];
let from = 0;
while (true) {
  const { data: page, error: pageError } = await supabase
    .from("news")
    .select("slug")
    .eq("category", "blog")
    .eq("published", true)
    .order("slug")
    .range(from, from + 999);
  if (pageError) {
    console.error(pageError.message);
    process.exit(1);
  }
  if (!page?.length) break;
  slugs = slugs.concat(page.map((r) => r.slug));
  if (page.length < 1000) break;
  from += 1000;
}

let rows = [];
const BATCH = 40;
for (let i = 0; i < slugs.length; i += BATCH) {
  const chunk = slugs.slice(i, i + BATCH);
  const { data: page, error: pageError } = await supabase
    .from("news")
    .select("slug,title,keywords_main,description,content,hot")
    .in("slug", chunk);
  if (pageError) {
    console.error(pageError.message);
    process.exit(1);
  }
  rows = rows.concat(page || []);
}

if (onlySlug) {
  const found = rows.find((r) => r.slug === onlySlug);
  if (!found) {
    const { data: one, error: oneErr } = await supabase
      .from("news")
      .select("slug,title,keywords_main,description,content,hot")
      .eq("slug", onlySlug)
      .maybeSingle();
    if (oneErr) {
      console.error(oneErr.message);
      process.exit(1);
    }
    if (one) rows.push(one);
  }
}

let pending = rows.filter(
  (r) =>
    isWebsiteSlug(r.slug) &&
    !REWRITE_SLUGS.has(r.slug) &&
    !PILLAR_SLUG_SET.has(r.slug) &&
    isGenericWebsiteContent(r.content),
);

if (industryOnly) {
  pending = pending.filter((r) => resolveIndustryEntryFromSlug(r.slug));
}

if (onlySlug) {
  pending = pending.filter((r) => r.slug === onlySlug);
  if (!pending.length) {
    console.error(`Slug "${onlySlug}" không trong tập rewrite website generic.`);
    process.exit(1);
  }
}

pending.sort((a, b) => a.slug.localeCompare(b.slug));
const targets = pending.slice(0, limit);

const industryCount = targets.filter((r) => resolveIndustryEntryFromSlug(r.slug)).length;

console.log(`Rewrite website generic: ${targets.length}/${pending.length} bài`);
console.log(`  · Có industry data từ slug: ${industryCount}`);
console.log(`  · Generic refresh (không khớp ngành): ${targets.length - industryCount}`);
console.log(`Dry run: ${dryRun ? "YES" : "NO"}\n`);

if (targets.length) {
  console.log(
    "Mẫu:",
    targets
      .slice(0, 5)
      .map((r) => {
        const ind = resolveIndustryEntryFromSlug(r.slug);
        return `${r.slug} (${ind ? ind.industry : "generic"})`;
      })
      .join(", "),
    targets.length > 5 ? "…" : "",
  );
  console.log("");
}

let ok = 0;
let fail = 0;
let warned = 0;
let upgradedIndustry = 0;

for (let i = 0; i < targets.length; i++) {
  const row = targets[i];
  const hadIndustry = Boolean(resolveIndustryEntryFromSlug(row.slug));
  try {
    const article = upgradeArticle(row, i);
    const hasNganh = article.content.includes('id="nganh"');
    if (dryRun) {
      console.log(
        `[dry-run] ${row.slug}: ${row.content?.length || 0} → ${article.content.length} | industry: ${hasNganh ? "YES" : "no"}`,
      );
      ok++;
      if (hasNganh) upgradedIndustry++;
      continue;
    }
    const result = await seedRewriteArticle(article, { log: !quiet, revalidate: false });
    if ((i + 1) % 50 === 0 || i === targets.length - 1) {
      console.log(`  … ${i + 1}/${targets.length} (${row.slug}) industry+${upgradedIndustry}`);
    }
    if (!result.seoOk) {
      warned++;
      if (!quiet) console.warn(`  ⚠ SEO warnings: ${row.slug}`);
    }
    ok++;
    if (hasNganh) upgradedIndustry++;
  } catch (err) {
    fail++;
    console.error(`  ✗ FAIL ${row.slug}:`, err.message);
  }
}

if (!dryRun && ok > 0) {
  await revalidateBlogAfterSeed();
}

console.log(
  `\nHoàn tất: ${ok} OK (${upgradedIndustry} có section ngành), ${fail} lỗi, ${warned} cảnh báo SEO${dryRun ? " (dry-run)" : ""}.`,
);
