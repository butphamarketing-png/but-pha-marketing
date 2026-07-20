/**
 * Audit thumbnail trùng (byte-identical) + image_url DB dùng chung.
 * Usage: node scripts/audit-news-thumb-duplicates.mjs
 */
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });

const ARTICLES = path.join(root, "public/tin-tuc/articles");
const MAP_JSON = path.join(root, "lib/news-article-thumbs.generated.json");
const OUT = path.join(root, "tmp-programmatic/news-thumb-dup-report.json");

function sha1File(fp) {
  return crypto.createHash("sha1").update(fs.readFileSync(fp)).digest("hex");
}

async function fetchAllNews(supabase) {
  const rows = [];
  let from = 0;
  const page = 1000;
  for (;;) {
    const { data, error } = await supabase
      .from("news")
      .select("slug,title,keywords_main,image_url")
      .eq("published", true)
      .range(from, from + page - 1);
    if (error) throw error;
    if (!data?.length) break;
    rows.push(...data);
    if (data.length < page) break;
    from += page;
  }
  return rows;
}

function normalizeUrl(u) {
  if (!u) return "";
  try {
    if (u.startsWith("http")) return new URL(u).pathname;
  } catch {
    /* ignore */
  }
  return u;
}

async function main() {
  const files = fs.readdirSync(ARTICLES).filter((f) => /\.(webp|png)$/i.test(f));
  const byHash = new Map();
  for (const f of files) {
    const fp = path.join(ARTICLES, f);
    const st = fs.statSync(fp);
    if (st.size < 800) continue;
    const h = sha1File(fp);
    if (!byHash.has(h)) byHash.set(h, []);
    byHash.get(h).push({ file: f, size: st.size });
  }
  const byteDupes = [...byHash.entries()]
    .filter(([, arr]) => arr.length > 1)
    .map(([hash, arr]) => ({ hash, count: arr.length, files: arr.map((x) => x.file) }))
    .sort((a, b) => b.count - a.count);

  const map = JSON.parse(fs.readFileSync(MAP_JSON, "utf8"));
  const fileToSlugs = new Map();
  for (const [slug, entry] of Object.entries(map)) {
    const f = entry?.file;
    if (!f) continue;
    if (!fileToSlugs.has(f)) fileToSlugs.set(f, []);
    fileToSlugs.get(f).push(slug);
  }
  const mapDupes = [...fileToSlugs.entries()]
    .filter(([, slugs]) => slugs.length > 1)
    .map(([file, slugs]) => ({ file, count: slugs.length, slugs }))
    .sort((a, b) => b.count - a.count);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
  const news = await fetchAllNews(supabase);
  const urlToSlugs = new Map();
  for (const row of news) {
    const u = normalizeUrl(row.image_url);
    if (!u) continue;
    if (!urlToSlugs.has(u)) urlToSlugs.set(u, []);
    urlToSlugs.get(u).push(row.slug);
  }
  const dbDupes = [...urlToSlugs.entries()]
    .filter(([, slugs]) => slugs.length > 1)
    .map(([url, slugs]) => ({ url, count: slugs.length, slugs }))
    .sort((a, b) => b.count - a.count);

  // Keyword mismatch: map keywords vs title / DB keywords
  const keywordMismatch = [];
  for (const row of news) {
    const entry = map[row.slug];
    if (!entry) continue;
    const mk = (entry.keywordsMain || "").trim().toLowerCase();
    const dk = (row.keywords_main || "").trim().toLowerCase();
    if (dk && mk && mk !== dk) {
      keywordMismatch.push({
        slug: row.slug,
        mapKw: entry.keywordsMain,
        dbKw: row.keywords_main,
        title: row.title,
      });
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    published: news.length,
    articleFiles: files.length,
    mapEntries: Object.keys(map).length,
    byteIdenticalGroups: byteDupes.length,
    byteIdenticalFiles: byteDupes.reduce((s, g) => s + g.count, 0),
    mapSharedFiles: mapDupes.length,
    dbSharedUrls: dbDupes.length,
    keywordMismatch: keywordMismatch.length,
    topByteDupes: byteDupes.slice(0, 30),
    mapDupes: mapDupes.slice(0, 30),
    dbDupes: dbDupes.slice(0, 30),
    keywordMismatchSample: keywordMismatch.slice(0, 40),
    regenerateSlugs: [
      ...new Set([
        ...byteDupes.flatMap((g) => g.files.map((f) => f.replace(/\.(webp|png)$/i, ""))),
        ...dbDupes.flatMap((g) => g.slugs),
      ]),
    ],
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({
    published: report.published,
    byteIdenticalGroups: report.byteIdenticalGroups,
    byteIdenticalFiles: report.byteIdenticalFiles,
    mapSharedFiles: report.mapSharedFiles,
    dbSharedUrls: report.dbSharedUrls,
    keywordMismatch: report.keywordMismatch,
    regenerateSlugs: report.regenerateSlugs.length,
    out: OUT,
  }, null, 2));
  if (dbDupes[0]) console.log("Top DB shared:", dbDupes[0].count, dbDupes[0].url);
  if (byteDupes[0]) console.log("Top byte dup:", byteDupes[0].count, byteDupes[0].files.slice(0, 4).join(", "));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
