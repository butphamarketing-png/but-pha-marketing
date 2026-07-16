/**
 * Rewrite ALL published news: content structure + meta description bám sát
 * title / keywords_main (via upgradeArticle + builders mới).
 *
 * Usage:
 *   node scripts/seed-rewrite-keyword-fit-all.mjs --dry-run --limit=10
 *   node scripts/seed-rewrite-keyword-fit-all.mjs
 *   node scripts/seed-rewrite-keyword-fit-all.mjs --weak-only
 *   node scripts/seed-rewrite-keyword-fit-all.mjs --slug=meta-ads-la-gi-b21
 *   node scripts/seed-rewrite-keyword-fit-all.mjs --offset=0 --limit=500
 */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { upgradeArticle } from "./seo-upgrade-article.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";
import { hasMetaB21Intent } from "./seo-meta-b21-intent-builder.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scriptsDir = path.join(root, "scripts");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);

const dryRun = args["dry-run"] === true;
const weakOnly = args["weak-only"] === true;
const skipB21 = args["skip-b21"] !== false; // default skip curated Meta B21
const limit = args.limit ? Number(args.limit) : Infinity;
const offset = args.offset ? Number(args.offset) : 0;
const onlySlug = typeof args.slug === "string" ? args.slug : null;

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

/** Load curated angles from all keyword batch files. */
async function loadBatchBySlug() {
  const map = new Map();
  const files = fs
    .readdirSync(scriptsDir)
    .filter((f) => /^seo-keywords-500-batch\d+\.mjs$/.test(f) || f === "seo-keywords-ai-1000.mjs");

  for (const file of files) {
    try {
      const mod = await import(`./${file}`);
      let list = [];
      if (file === "seo-keywords-ai-1000.mjs") {
        list = mod.KEYWORDS_AI_1000 || [];
      } else {
        const num = file.match(/batch(\d+)/)?.[1];
        list = mod[`KEYWORDS_500_BATCH${num}`] || [];
      }
      for (const e of list) {
        if (e?.slug) map.set(e.slug, e);
      }
    } catch (err) {
      console.warn("Skip batch file", file, err.message);
    }
  }
  return map;
}

function isWeakDesc(d) {
  const text = d || "";
  if (text.length < 120) return true;
  if (/Tư vấn Bứt Phá Marketing\.?$/i.test(text) && text.length < 140) return true;
  if (/\.\.\s*Tư vấn/.test(text)) return true;
  if (/definition\.|advertising\.|Hướng dẫn triển khai và đo lường hiệu quả/i.test(text)) return true;
  return false;
}

const batchBySlug = await loadBatchBySlug();
console.log("Batch/AI curated entries:", batchBySlug.size);

let rows = [];
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
  rows = [data];
} else {
  let from = 0;
  while (true) {
    const { data, error } = await sb
      .from("news")
      .select("slug,title,keywords_main,meta_description,description")
      .eq("published", true)
      .order("slug", { ascending: true })
      .range(from, from + 999);
    if (error) {
      console.error(error.message);
      process.exit(1);
    }
    if (!data?.length) break;
    rows.push(...data);
    if (data.length < 1000) break;
    from += 1000;
  }
}

let targets = rows.filter((r) => {
  if (skipB21 && hasMetaB21Intent(r.slug)) return false;
  if (!weakOnly) return true;
  return isWeakDesc(r.meta_description || r.description || "");
});

targets = targets.slice(offset, offset + (Number.isFinite(limit) ? limit : targets.length));
console.log(`Targets: ${targets.length} / published ${rows.length} (dryRun=${dryRun} weakOnly=${weakOnly} offset=${offset})`);

let ok = 0;
let fail = 0;
const fails = [];
const samples = [];

for (let i = 0; i < targets.length; i++) {
  const row = targets[i];
  const curated = batchBySlug.get(row.slug);
  try {
    const article = upgradeArticle(
      {
        slug: row.slug,
        title: curated?.h1 || row.title,
        keywords_main: curated?.keywordsMain || row.keywords_main || row.title,
        description: curated?.angle || row.description || row.meta_description || "",
      },
      i + offset,
    );

    if (dryRun) {
      if (samples.length < 12) {
        samples.push({
          slug: row.slug,
          oldDesc: (row.meta_description || row.description || "").slice(0, 100),
          newDesc: (article.metaDescription || "").slice(0, 120),
          chars: article.content.length,
        });
      }
      ok++;
      continue;
    }

    await seedRewriteArticle(article, { log: false, revalidate: false, skipGuardrails: true });
    ok++;
    if ((i + 1) % 100 === 0 || i === targets.length - 1) {
      console.log(`  … ${i + 1}/${targets.length} (${row.slug})`);
    }
  } catch (err) {
    fail++;
    fails.push({ slug: row.slug, err: String(err.message || err) });
    console.error(`FAIL ${row.slug}:`, err.message || err);
  }
}

if (dryRun) {
  console.log("\nSamples:");
  for (const s of samples) {
    console.log(`\n[${s.slug}] chars=${s.chars}`);
    console.log(`  OLD: ${s.oldDesc}`);
    console.log(`  NEW: ${s.newDesc}`);
  }
}

const logPath = path.join(root, "tmp-programmatic", "keyword-fit-rewrite-log.json");
fs.writeFileSync(
  logPath,
  JSON.stringify({ ok, fail, dryRun, weakOnly, total: targets.length, fails: fails.slice(0, 100) }, null, 2),
);

if (!dryRun && ok > 0) await revalidateBlogAfterSeed();
console.log(`Done. ok=${ok} fail=${fail} log=${logPath}`);
if (fail) process.exit(1);
