/**
 * Deeper body audit: scan content snippets for leftover template phrases.
 * Usage: node scripts/audit-news-body-template.mjs [--limit=500]
 */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const limit = Number(process.argv.find((a) => a.startsWith("--limit="))?.split("=")[1] || 0) || Infinity;
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const BAD_RE =
  /là chủ đề nhiều doanh nghiệp Việt quan tâm — đặc biệt khi|definition\.\.|Hướng dẫn triển khai và đo lường hiệu quả|xoay quanh [A-Za-z]{5,}(?![àáạảãâăèéêìíòóôơùúýđ])|Google Ads definition|Facebook advertising|Meta advertising definition/i;

let from = 0;
let scanned = 0;
const bad = [];

while (scanned < limit) {
  const end = Math.min(from + 49, from + Math.min(49, limit - scanned - 1));
  const { data, error } = await sb
    .from("news")
    .select("slug,content")
    .eq("published", true)
    .range(from, from + 49);
  if (error) {
    console.error(error.message);
    process.exit(1);
  }
  if (!data?.length) break;
  for (const row of data) {
    scanned++;
    if (BAD_RE.test(row.content || "")) bad.push(row.slug);
    if (scanned >= limit) break;
  }
  if (data.length < 50) break;
  from += 50;
  if (from % 500 === 0) console.log("scanned", scanned, "bad", bad.length);
}

console.log("scanned", scanned, "badBody", bad.length);
console.log(bad.slice(0, 30).join("\n"));
fs.writeFileSync(
  path.join(root, "tmp-programmatic", "news-body-audit.json"),
  JSON.stringify({ scanned, bad }, null, 2),
);
