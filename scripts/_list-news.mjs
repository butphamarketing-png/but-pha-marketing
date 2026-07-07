import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { PILLAR_THIET_KE_WEBSITE } from "./seo-pillar-thiet-ke-website.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const scriptsDir = path.join(root, "scripts");
const rewriteSlugs = new Set([PILLAR_THIET_KE_WEBSITE.slug]);
for (const f of fs.readdirSync(scriptsDir)) {
  if (!f.startsWith("seo-rewrite-") || !f.endsWith(".mjs")) continue;
  const text = fs.readFileSync(path.join(scriptsDir, f), "utf8");
  const m = text.match(/slug:\s*["']([^"']+)["']/);
  if (m) rewriteSlugs.add(m[1]);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing Supabase env");
  process.exit(1);
}

const supabase = createClient(url, key);
const { data: rows, error } = await supabase
  .from("news")
  .select("slug,title,hot,published_at")
  .order("slug");

if (error) {
  console.error(error.message);
  process.exit(1);
}

const rewrite = [];
const template = [];
const other = [];

for (const r of rows || []) {
  const item = { slug: r.slug, title: r.title, hot: r.hot };
  if (rewriteSlugs.has(r.slug)) rewrite.push(item);
  else if (r.slug.startsWith("thiet-ke-website") || r.slug.startsWith("bao-gia-") || r.slug.startsWith("quy-trinh-") || r.slug.startsWith("website-") || r.slug.startsWith("seo-") || r.slug.includes("-la-gi") || r.slug.startsWith("dich-vu-") || r.slug.startsWith("marketing-"))
    template.push(item);
  else other.push(item);
}

const out = path.join(root, "tmp-news-list.txt");
const lines = [];
lines.push(`# DANH SÁCH TIN TỨC LIVE — ${rows?.length ?? 0} bài`);
lines.push(`# Cập nhật: ${new Date().toISOString().slice(0, 10)}`);
lines.push("");
lines.push(`## A. ĐÃ VIẾT LẠI (${rewrite.length})`);
rewrite.forEach((r, i) => lines.push(`${String(i + 1).padStart(2, "0")}. [${r.hot ? "HOT" : "   "}] ${r.slug} — ${r.title}`));
lines.push("");
lines.push(`## B. TEMPLATE TRÊN SITE — CẦN VIẾT LẠI (${template.length})`);
template.forEach((r, i) => lines.push(`${String(i + 1).padStart(3, "0")}. ${r.slug} — ${r.title}`));
if (other.length) {
  lines.push("");
  lines.push(`## C. KHÁC (${other.length})`);
  other.forEach((r, i) => lines.push(`${String(i + 1).padStart(3, "0")}. ${r.slug} — ${r.title}`));
}

fs.writeFileSync(out, lines.join("\n"), "utf8");
console.log(`Wrote ${out}`);
console.log(`Rewrite: ${rewrite.length} | Template: ${template.length} | Other: ${other.length}`);
