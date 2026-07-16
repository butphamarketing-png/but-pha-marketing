/**
 * Audit published news for keyword/title/description mismatch and old templates.
 * Usage: node scripts/audit-news-keyword-fit.mjs
 */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

let rows = [];
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
  rows = rows.concat(data);
  if (data.length < 1000) break;
  from += 1000;
}

console.log("total published", rows.length);

function badDesc(r) {
  const d = r.meta_description || r.description || "";
  return (
    /definition\.|advertising\.|explained|tracking Meta|vs search|focus:|Hướng dẫn triển khai và đo lường hiệu quả/.test(
      d,
    ) || /:\s*[A-Za-z][A-Za-z0-9 +\-]{8,}\.\s*Hướng dẫn/.test(d)
  );
}

function kwMismatch(r) {
  const kw = (r.keywords_main || "").trim();
  if (!kw) return "missing_kw";
  const title = (r.title || "").toLowerCase();
  const desc = (r.meta_description || r.description || "").toLowerCase();
  const needle = kw.toLowerCase();
  const inTitle = title.includes(needle) || needle.split(/\s+/).filter((t) => t.length > 2).slice(0, 2).every((t) => title.includes(t));
  const inDesc = desc.includes(needle) || needle.split(/\s+/).filter((t) => t.length > 2).slice(0, 2).every((t) => desc.includes(t));
  if (!inTitle && !inDesc) return "both";
  if (!inTitle) return "title";
  if (!inDesc) return "desc";
  return null;
}

const badD = rows.filter(badDesc);
const mism = rows.map((r) => ({ r, m: kwMismatch(r) })).filter((x) => x.m);
const missingKw = mism.filter((x) => x.m === "missing_kw");
const titleMiss = mism.filter((x) => x.m === "title" || x.m === "both");
const descMiss = mism.filter((x) => x.m === "desc" || x.m === "both");

console.log("badDesc(english/old)", badD.length);
console.log("missing keywords_main", missingKw.length);
console.log("kw missing in title", titleMiss.length);
console.log("kw missing in desc", descMiss.length);

// Sample content for old template — pull 200 recent / random badDesc + website slugs
const sampleSlugs = [
  ...badD.slice(0, 30).map((r) => r.slug),
  ...rows.filter((r) => r.slug.startsWith("thiet-ke-website-")).slice(0, 20).map((r) => r.slug),
  ...rows.filter((r) => /la-gi/.test(r.slug)).slice(0, 20).map((r) => r.slug),
];
const unique = [...new Set(sampleSlugs)].slice(0, 60);

let oldTemplate = 0;
const oldSamples = [];
for (const slug of unique) {
  const { data, error } = await sb.from("news").select("slug,content").eq("slug", slug).maybeSingle();
  if (error || !data) continue;
  const c = data.content || "";
  const bad =
    /là chủ đề nhiều doanh nghiệp Việt quan tâm — đặc biệt khi/.test(c) ||
    /definition\.\./.test(c) ||
    /xoay quanh [A-Za-z]{4,}/.test(c);
  if (bad) {
    oldTemplate++;
    oldSamples.push(slug);
  }
}

console.log("oldTemplate in sample", oldTemplate, "/", unique.length);
console.log("old samples", oldSamples.slice(0, 15));
console.log("badDesc samples:");
badD.slice(0, 12).forEach((r) => console.log(" -", r.slug, "|", (r.meta_description || r.description || "").slice(0, 90)));

const out = {
  total: rows.length,
  badDesc: badD.map((r) => r.slug),
  descMissingKw: descMiss.map((x) => x.r.slug),
  titleMissingKw: titleMiss.map((x) => x.r.slug),
  oldTemplateSamples: oldSamples,
};
fs.writeFileSync(path.join(root, "tmp-programmatic", "news-keyword-audit.json"), JSON.stringify(out, null, 2));
console.log("Wrote tmp-programmatic/news-keyword-audit.json");
