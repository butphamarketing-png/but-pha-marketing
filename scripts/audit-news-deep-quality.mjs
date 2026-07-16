/**
 * Deeper quality audit beyond legacy template regex.
 * Flags: thin content, desc without keyword, title/kw drift, generic intro leftovers.
 */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { keywordInText } from "./seo-article-helpers.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const issues = {
  thin: [],
  descNoKw: [],
  titleNoKw: [],
  oldIntro: [],
  englishDesc: [],
  emptyContent: [],
};

let from = 0;
let total = 0;

while (true) {
  const { data, error } = await sb
    .from("news")
    .select("slug,title,keywords_main,meta_description,description,content")
    .eq("published", true)
    .range(from, from + 24);
  if (error) {
    console.error(error.message);
    process.exit(1);
  }
  if (!data?.length) break;

  for (const row of data) {
    total++;
    const kw = row.keywords_main || "";
    const title = row.title || "";
    const desc = row.meta_description || row.description || "";
    const content = row.content || "";

    if (!content || content.length < 500) issues.emptyContent.push(row.slug);
    else if (content.length < 4000) issues.thin.push(row.slug);

    if (kw && !keywordInText(title, kw)) issues.titleNoKw.push(row.slug);
    if (kw && !keywordInText(desc, kw)) issues.descNoKw.push(row.slug);

    if (
      /là chủ đề nhiều doanh nghiệp Việt quan tâm — đặc biệt khi|definition\.\.|Hướng dẫn triển khai và đo lường hiệu quả/i.test(
        content,
      )
    ) {
      issues.oldIntro.push(row.slug);
    }
    if (/definition\.|advertising\.|Hướng dẫn triển khai và đo lường hiệu quả/i.test(desc)) {
      issues.englishDesc.push(row.slug);
    }
  }

  if (data.length < 25) break;
  from += 25;
  if (from % 1000 === 0) console.log("scanned", total);
}

const summary = Object.fromEntries(Object.entries(issues).map(([k, v]) => [k, v.length]));
console.log("total", total);
console.log(summary);

const out = { total, summary, issues };
fs.writeFileSync(path.join(root, "tmp-programmatic", "news-deep-audit.json"), JSON.stringify(out, null, 2));

const needFix = [
  ...new Set([
    ...issues.oldIntro,
    ...issues.englishDesc,
    ...issues.descNoKw,
    ...issues.titleNoKw,
    ...issues.emptyContent,
  ]),
];
console.log("needFix", needFix.length);
if (needFix.length) console.log(needFix.slice(0, 40).join("\n"));
console.log("thin(sample)", issues.thin.slice(0, 15).join("\n"));
