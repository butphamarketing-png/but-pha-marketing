/** Sửa nhanh các bài local SEO la-gi còn ngắn. Chạy: node scripts/seed-fix-short-local-la-gi.mjs */
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { upgradeArticle } from "./seo-upgrade-article.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });

const SLUGS = [
  "danh-gia-google-maps-la-gi",
  "embed-google-maps-website-la-gi",
  "gan-toi-google-maps-la-gi",
  "geo-tagging-la-gi",
  "google-maps-marketing-la-gi",
  "google-maps-seo-la-gi",
  "local-citation-la-gi",
  "nap-seo-la-gi",
  "quang-cao-google-maps-la-gi",
  "schema-local-business-la-gi",
  "seo-local-la-gi",
  "toi-uu-google-maps-la-gi",
  "google-business-profile-la-gi",
  "local-pack-la-gi",
];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

let ok = 0;
for (let i = 0; i < SLUGS.length; i++) {
  const slug = SLUGS[i];
  let row;
  for (let attempt = 0; attempt < 3; attempt++) {
    const { data, error } = await supabase
      .from("news")
      .select("slug,title,keywords_main,keywords_secondary,description,content")
      .eq("slug", slug)
      .maybeSingle();
    if (!error) {
      row = data;
      break;
    }
    if (attempt === 2) throw error;
    await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
  }
  if (!row) {
    console.warn(`Skip (không có): ${slug}`);
    continue;
  }
  const article = upgradeArticle(row, i);
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await seedRewriteArticle(article, { log: true, revalidate: false });
      ok++;
      break;
    } catch (err) {
      if (attempt === 2) throw err;
      console.warn(`  retry ${slug}:`, err.message);
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
    }
  }
}

if (ok) await revalidateBlogAfterSeed();
console.log(`Done: ${ok}/${SLUGS.length}`);
