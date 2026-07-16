/**
 * Find articles still containing the OLD marketing intro template.
 * Then rewrite via upgradeArticle.
 *
 * Usage:
 *   node scripts/seed-rewrite-old-template-body.mjs --scan
 *   node scripts/seed-rewrite-old-template-body.mjs
 *   node scripts/seed-rewrite-old-template-body.mjs --dry-run --limit=20
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
const scanOnly = args.scan === true;
const limit = args.limit ? Number(args.limit) : Infinity;
const onlySlug = typeof args.slug === "string" ? args.slug : null;

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

/** Chỉ bắt template CŨ thật — không bắt "xoay quanh …" của bản mới. */
const OLD_BODY =
  /là chủ đề nhiều doanh nghiệp Việt quan tâm — đặc biệt khi|definition\.\.|Google Ads definition|Facebook advertising\.\.|Meta advertising definition/i;

const OLD_DESC = /Hướng dẫn triển khai và đo lường hiệu quả|definition\.\./i;

async function findTargets() {
  if (onlySlug) {
    const { data } = await sb
      .from("news")
      .select("slug,title,keywords_main,meta_description,description,content")
      .eq("slug", onlySlug)
      .maybeSingle();
    return data ? [data] : [];
  }

  const auditPath = path.join(root, "tmp-programmatic", "news-keyword-audit.json");
  const descMissing = fs.existsSync(auditPath)
    ? JSON.parse(fs.readFileSync(auditPath, "utf8")).descMissingKw || []
    : [];

  const found = [];
  const seen = new Set();

  // 1) Always include desc-missing from last audit
  for (let i = 0; i < descMissing.length; i += 80) {
    const chunk = descMissing.slice(i, i + 80);
    const { data, error } = await sb
      .from("news")
      .select("slug,title,keywords_main,meta_description,description,content")
      .in("slug", chunk);
    if (error) throw new Error(error.message);
    for (const row of data || []) {
      if (seen.has(row.slug)) continue;
      seen.add(row.slug);
      found.push(row);
    }
  }

  // 2) Scan published content for OLD body phrases (batched)
  let from = 0;
  while (true) {
    const { data, error } = await sb
      .from("news")
      .select("slug,title,keywords_main,meta_description,description,content")
      .eq("published", true)
      .range(from, from + 39);
    if (error) throw new Error(error.message);
    if (!data?.length) break;
    for (const row of data) {
      if (seen.has(row.slug) || hasMetaB21Intent(row.slug)) continue;
      const c = row.content || "";
      const d = row.meta_description || row.description || "";
      if (OLD_BODY.test(c) || OLD_DESC.test(d)) {
        seen.add(row.slug);
        found.push(row);
      }
    }
    if (data.length < 40) break;
    from += 40;
    if (from % 800 === 0) console.log("scan…", from, "found", found.length);
  }

  return found;
}

const targets = (await findTargets()).slice(0, limit);
console.log(`Targets: ${targets.length} (dryRun=${dryRun} scanOnly=${scanOnly})`);
if (scanOnly) {
  console.log(targets.map((t) => t.slug).join("\n"));
  fs.writeFileSync(
    path.join(root, "tmp-programmatic", "old-template-targets.json"),
    JSON.stringify(
      targets.map((t) => t.slug),
      null,
      2,
    ),
  );
  process.exit(0);
}

let ok = 0;
let fail = 0;

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

    if (OLD_BODY.test(article.content) || OLD_DESC.test(article.metaDescription || "")) {
      console.warn("WARN still dirty after upgrade:", row.slug);
    }

    if (dryRun) {
      if (i < 10) {
        console.log(
          `[dry] ${row.slug}\n  NEW desc: ${(article.metaDescription || "").slice(0, 100)}\n  chars=${article.content.length}`,
        );
      }
      ok++;
      continue;
    }

    await seedRewriteArticle(article, { log: false, revalidate: false });
    ok++;
    if ((i + 1) % 25 === 0 || i === targets.length - 1) {
      console.log(`  … ${i + 1}/${targets.length} (${row.slug})`);
    }
  } catch (err) {
    fail++;
    console.error(`FAIL ${row.slug}:`, err.message || err);
  }
}

if (!dryRun && ok > 0) await revalidateBlogAfterSeed();
console.log(`Done. ok=${ok} fail=${fail}`);
if (fail) process.exit(1);
