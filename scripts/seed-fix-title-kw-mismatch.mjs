/**
 * Fix ~100 articles where keywords_main thiếu dấu / lệch title,
 * rồi rewrite content + description bám từ khóa đã sửa.
 *
 * Usage: node scripts/seed-fix-title-kw-mismatch.mjs
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
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const ACRONYMS = new Set(
  ["ai", "seo", "gtm", "kpi", "faq", "roi", "cpa", "roas", "b2b", "b2c", "crm", "api", "ux", "ui", "ga4", "utm", "capi", "rsa", "pmax", "llm", "geo", "aeo", "chatgpt", "gemini", "claude", "meta", "google", "facebook", "tiktok", "youtube", "zalo", "wordpress", "shopify"].map(
    (x) => x.toLowerCase(),
  ),
);

function normalizeStrict(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFC")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(kw) {
  return normalizeStrict(kw)
    .split(" ")
    .filter((t) => t.length > 2 && !["la", "gi", "hay", "cac", "cho", "cua", "va", "voi", "mot"].includes(t));
}

function hasKwStrict(hay, kw) {
  const h = normalizeStrict(hay);
  const full = normalizeStrict(kw);
  if (full && h.includes(full)) return true;
  const t = tokens(kw);
  if (!t.length) return Boolean(full);
  return t.slice(0, Math.min(3, t.length)).every((x) => h.includes(x));
}

function titleToKeywords(title) {
  const base = String(title || "")
    .replace(/\s*[—–].*$/, "")
    .replace(/\?+$/, "")
    .replace(/\s+cho\s+spa\s*$/i, " ngành spa") // Blog Hay Video Cho Spa? → blog hay video ngành spa-ish
    .trim();
  return base
    .split(/\s+/)
    .map((w) => {
      const bare = w.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
      if (ACRONYMS.has(bare)) {
        if (bare === "chatgpt") return "ChatGPT";
        if (bare === "ga4") return "GA4";
        return bare.toUpperCase() === bare ? w : w.length <= 4 ? w.toUpperCase() : w;
      }
      // Keep short brand tokens; lowercase Vietnamese words
      if (/^[A-Z0-9]{2,6}$/.test(w) && !/[àáạảãâăèéêìíòóôơùúýđ]/i.test(w)) return w;
      return w.toLocaleLowerCase("vi");
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

async function loadBatchBySlug() {
  const map = new Map();
  const scriptsDir = path.join(root, "scripts");
  const files = fs
    .readdirSync(scriptsDir)
    .filter((f) => /^seo-keywords-500-batch\d+\.mjs$/.test(f) || f === "seo-keywords-ai-1000.mjs");
  for (const file of files) {
    try {
      const mod = await import(`./${file}`);
      const list =
        file === "seo-keywords-ai-1000.mjs"
          ? mod.KEYWORDS_AI_1000 || []
          : mod[`KEYWORDS_500_BATCH${file.match(/batch(\d+)/)[1]}`] || [];
      for (const e of list) if (e?.slug) map.set(e.slug, e);
    } catch {
      /* skip */
    }
  }
  return map;
}

const batchBySlug = await loadBatchBySlug();

const bad = [];
let from = 0;
while (true) {
  const { data, error } = await sb
    .from("news")
    .select("slug,title,keywords_main,meta_description,description")
    .eq("published", true)
    .range(from, from + 199);
  if (error) throw new Error(error.message);
  if (!data?.length) break;
  for (const r of data) {
    const kw = r.keywords_main || "";
    const desc = r.meta_description || r.description || "";
    const titleMiss = kw && !hasKwStrict(r.title || "", kw);
    const badDescPattern = /:\s*[A-Za-z][A-Za-z0-9 +\-]{8,}\.\s*Hướng dẫn/.test(desc);
    if (titleMiss || badDescPattern) bad.push(r);
  }
  if (data.length < 200) break;
  from += 200;
}

console.log("Fix targets:", bad.length);

let ok = 0;
let fail = 0;

for (let i = 0; i < bad.length; i++) {
  const row = bad[i];
  if (hasMetaB21Intent(row.slug)) continue;
  const curated = batchBySlug.get(row.slug);
  let keywordsMain = curated?.keywordsMain || row.keywords_main;
  let title = curated?.h1 || row.title;
  let angle = curated?.angle || "";

  if (!hasKwStrict(title, keywordsMain)) {
    keywordsMain = titleToKeywords(title);
    // Align title to include keyword phrase
    if (!hasKwStrict(title, keywordsMain)) {
      title = curated?.h1 || row.title;
      keywordsMain = titleToKeywords(title);
    }
  }

  // Vietnamese angle if English stub
  if (!angle || (/^[A-Za-z0-9 +/,&\-().]{0,60}$/.test(angle) && !/[àáạảãâăèéêìíòóôơùúýđ]/i.test(angle))) {
    angle = "";
  }

  try {
    const article = upgradeArticle(
      {
        slug: row.slug,
        title,
        keywords_main: keywordsMain,
        description: angle,
      },
      i,
    );
    // Force keywords on article
    article.keywordsMain = keywordsMain;
    article.title = article.title || title;

    await seedRewriteArticle(article, { log: false, revalidate: false, skipGuardrails: true });
    ok++;
    if ((i + 1) % 25 === 0 || i === bad.length - 1) {
      console.log(`  … ${i + 1}/${bad.length} ${row.slug} → "${keywordsMain}"`);
    }
  } catch (err) {
    fail++;
    console.error("FAIL", row.slug, err.message || err);
  }
}

await revalidateBlogAfterSeed();
console.log(`Done. ok=${ok} fail=${fail}`);
if (fail) process.exit(1);
