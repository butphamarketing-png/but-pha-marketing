/**
 * GSC batch 3 — top hot blog money pages sau P4 (request indexing thủ công).
 * Chạy: npm run build:gsc-hot-blog-batch
 */
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { INDUSTRY_SILO_REGISTRY } from "./seo-industry-silo-resolver.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });

const outDir = path.join(root, "tmp-programmatic");
const outMd = path.join(outDir, "gsc-hot-blog-batch.md");
const outTxt = path.join(outDir, "gsc-hot-blog-urls.txt");
const SITE = "https://www.butphamarketing.com";
const LIMIT = 50;

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const moneySlugs = new Set(
  INDUSTRY_SILO_REGISTRY.map((e) => e.money.replace(/^\/blog\//, "")).filter(Boolean),
);

const PRIORITY_PREFIXES = ["thiet-ke-website-", "template-website-", "bao-gia-", "thiet-ke-fanpage-"];
const PRIORITY_EXACT = [
  "thiet-ke-fanpage-facebook",
  "quang-cao-facebook",
  "seo-la-gi",
];

const CORE_SLUGS = new Set([
  "thiet-ke-website",
  "bao-gia-thiet-ke-website",
]);

function scoreSlug(slug) {
  if (PRIORITY_EXACT.includes(slug)) return 100;
  if (moneySlugs.has(slug)) return 90;
  if (PRIORITY_PREFIXES.some((p) => slug.startsWith(p))) return 80;
  if (slug.includes("thiet-ke-website")) return 70;
  if (slug.includes("website") && !slug.includes("facebook")) return 50;
  return 0;
}

const { data, error } = await sb
  .from("news")
  .select("slug,title,keywords_main")
  .eq("category", "blog")
  .eq("published", true)
  .eq("hot", true)
  .order("slug");
if (error) throw error;

const ranked = (data || [])
  .map((row) => ({ ...row, score: scoreSlug(row.slug) }))
  .filter((row) => row.score > 0 && !CORE_SLUGS.has(row.slug))
  .sort((a, b) => b.score - a.score || a.slug.localeCompare(b.slug))
  .slice(0, LIMIT);

const lines = [];
lines.push("# GSC Batch 3 — Hot Blog Money Pages");
lines.push("");
lines.push(`- Generated: ${new Date().toISOString()}`);
lines.push(`- Total: **${ranked.length} URL** (top hot blog sau P4 proof/silo inject)`);
lines.push(`- Ưu tiên sau Batch 1–2 trong \`gsc-copy-paste.md\``);
lines.push("");
lines.push("## Cách làm");
lines.push("1. GSC → URL Inspection → dán URL → **Request indexing**");
lines.push("2. Làm **10 URL/ngày** (quota GSC ~10–20/ngày) → hoàn thành trong ~5 ngày");
lines.push("3. Tick checkbox khi xong");
lines.push("");
lines.push("## URL list");
lines.push("");

for (const row of ranked) {
  const label = row.keywords_main || row.title || row.slug;
  lines.push(`- [ ] \`/blog/${row.slug}\` — ${label}`);
  lines.push(`  ${SITE}/blog/${row.slug}`);
}

lines.push("");
lines.push("## Copy nhanh");
lines.push("```");
lines.push(ranked.map((r) => `${SITE}/blog/${r.slug}`).join("\n"));
lines.push("```");
lines.push("");
lines.push("## Sau batch 3");
lines.push("- IndexNow blog hot: `npm run export:indexnow-blog-hot` → `npm run ping:indexnow:blog-hot` (cần Bing WMT verify)");
lines.push("- Còn lại ~6k hot URL: rely sitemap + IndexNow, không request indexing thủ công từng URL");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outMd, lines.join("\n"), "utf8");
fs.writeFileSync(
  outTxt,
  ranked.map((r) => `${SITE}/blog/${r.slug}`).join("\n") + "\n",
  "utf8",
);

console.log("=== GSC hot blog batch ===");
console.log(`URLs: ${ranked.length}`);
console.log(`MD: ${outMd}`);
