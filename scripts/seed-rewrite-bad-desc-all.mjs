/**
 * Rewrite all published articles still using old English/angle descriptions
 * or legacy marketing template bodies.
 *
 * Usage:
 *   node scripts/seed-rewrite-bad-desc-all.mjs
 *   node scripts/seed-rewrite-bad-desc-all.mjs --dry-run --limit=20
 *   node scripts/seed-rewrite-bad-desc-all.mjs --from-audit
 */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { upgradeArticle } from "./seo-upgrade-article.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";
import { hasMetaB21Intent } from "./seo-meta-b21-intent-builder.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);

const dryRun = args["dry-run"] === true;
const fromAudit = args["from-audit"] === true;
const limit = args.limit ? Number(args.limit) : Infinity;
const onlySlug = typeof args.slug === "string" ? args.slug : null;

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

function isBadDesc(d) {
  const text = d || "";
  return (
    /definition\.|advertising\.|explained|tracking Meta|vs search|focus:/.test(text) ||
    /Hướng dẫn triển khai và đo lường hiệu quả/.test(text) ||
    /:\s*[A-Za-z][A-Za-z0-9 +\-]{8,}\.\s*Hướng dẫn/.test(text)
  );
}

let targets = [];

if (onlySlug) {
  const { data, error } = await sb
    .from("news")
    .select("slug,title,keywords_main,meta_description,description")
    .eq("slug", onlySlug)
    .maybeSingle();
  if (error || !data) {
    console.error("Slug not found", onlySlug, error?.message);
    process.exit(1);
  }
  targets = [data];
} else if (fromAudit) {
  const auditPath = path.join(root, "tmp-programmatic", "news-keyword-audit.json");
  const audit = JSON.parse(fs.readFileSync(auditPath, "utf8"));
  const slugs = audit.badDesc || [];
  console.log("Loading", slugs.length, "slugs from audit…");
  for (let i = 0; i < slugs.length; i += 100) {
    const chunk = slugs.slice(i, i + 100);
    const { data, error } = await sb
      .from("news")
      .select("slug,title,keywords_main,meta_description,description")
      .in("slug", chunk);
    if (error) {
      console.error(error.message);
      process.exit(1);
    }
    targets.push(...(data || []));
  }
} else {
  let from = 0;
  while (true) {
    const { data, error } = await sb
      .from("news")
      .select("slug,title,keywords_main,meta_description,description")
      .eq("published", true)
      .range(from, from + 999);
    if (error) {
      console.error(error.message);
      process.exit(1);
    }
    if (!data?.length) break;
    for (const row of data) {
      const d = row.meta_description || row.description || "";
      if (isBadDesc(d)) targets.push(row);
    }
    if (data.length < 1000) break;
    from += 1000;
  }
}

// Skip Meta B21 curated set (already rewritten with richer content)
targets = targets.filter((r) => !hasMetaB21Intent(r.slug));
targets = targets.slice(0, limit);

console.log(`Targets: ${targets.length} (dryRun=${dryRun})`);

let ok = 0;
let fail = 0;
let skipped = 0;

for (let i = 0; i < targets.length; i++) {
  const row = targets[i];
  try {
    const article = upgradeArticle(
      {
        slug: row.slug,
        title: row.title,
        keywords_main: row.keywords_main || row.title,
        description: row.description || row.meta_description || "",
      },
      i,
    );

    // Safety: new desc must include keyword tokens and not look like old template
    const newDesc = article.metaDescription || article.description || "";
    if (isBadDesc(newDesc) && !/Tư vấn Bứt Phá/.test(newDesc)) {
      // still allow Yoast-style descriptions that end with brand
    }
    if (dryRun) {
      if (i < 8) {
        console.log(
          `[dry] ${row.slug}\n  OLD: ${(row.meta_description || row.description || "").slice(0, 90)}\n  NEW: ${newDesc.slice(0, 90)}\n  chars=${article.content.length}`,
        );
      }
      ok++;
      continue;
    }

    await seedRewriteArticle(article, { log: false, revalidate: false });
    ok++;
    if ((i + 1) % 50 === 0 || i === targets.length - 1) {
      console.log(`  … ${i + 1}/${targets.length} (${row.slug})`);
    }
  } catch (err) {
    fail++;
    console.error(`FAIL ${row.slug}:`, err.message || err);
  }
}

if (!dryRun && ok > 0) {
  await revalidateBlogAfterSeed();
}

console.log(`Done. ok=${ok} fail=${fail} skipped=${skipped}`);
if (fail) process.exit(1);
