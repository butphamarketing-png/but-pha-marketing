/**
 * Export blog URLs cho IndexNow ping sau P4 batch.
 * Chạy: npm run export:indexnow-blog-hot
 *       npm run export:indexnow-blog-hot -- --all
 */
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });

const hotOnly = !process.argv.includes("--all");
const outDir = path.join(root, "tmp-programmatic");
const outPath = path.join(outDir, hotOnly ? "indexnow-blog-hot-urls.txt" : "indexnow-blog-all-urls.txt");
const SITE = "https://www.butphamarketing.com";
const PAGE = 200;

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const urls = [];
let from = 0;

while (true) {
  let q = sb
    .from("news")
    .select("slug")
    .eq("category", "blog")
    .eq("published", true)
    .order("slug")
    .range(from, from + PAGE - 1);
  if (hotOnly) q = q.eq("hot", true);

  const { data, error } = await q;
  if (error) throw error;
  if (!data?.length) break;

  for (const row of data) {
    urls.push(`${SITE}/blog/${row.slug}`);
  }

  if (data.length < PAGE) break;
  from += PAGE;
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, urls.join("\n") + "\n", "utf8");

console.log("=== Export IndexNow blog URLs ===");
console.log(`Scope: ${hotOnly ? "hot-only" : "all-published"}`);
console.log(`Count: ${urls.length}`);
console.log(`File: ${outPath}`);
