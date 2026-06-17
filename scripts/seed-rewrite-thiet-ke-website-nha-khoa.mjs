import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { REWRITE_THIET_KE_WEBSITE_NHA_KHOA } from "./seo-rewrite-thiet-ke-website-nha-khoa.mjs";
import { validateSeoKeywordPlacement } from "./seo-article-helpers.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const article = REWRITE_THIET_KE_WEBSITE_NHA_KHOA;
const check = validateSeoKeywordPlacement({
  keywordsMain: article.keywordsMain,
  title: article.title,
  metaTitle: article.metaTitle,
  metaDescription: article.metaDescription,
  description: article.description,
  imageAlts: ["Thiết kế website nha khoa hiện đại với đặt lịch khám online"],
});
console.log("SEO check:", check.ok ? "OK" : check.missing.join(", "));

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const payload = {
  title: article.title,
  content: article.content,
  category: "blog",
  published: true,
  description: article.description,
  image_url: article.imageUrl,
  slug: article.slug,
  hot: false,
  meta_description: article.metaDescription,
  keywords_main: article.keywordsMain,
  keywords_secondary: article.keywordsSecondary,
  timestamp: Date.now(),
  published_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const { data: existing } = await supabase.from("news").select("id").eq("slug", article.slug).maybeSingle();
const { error } = existing
  ? await supabase.from("news").update(payload).eq("id", existing.id)
  : await supabase.from("news").insert({ id: article.slug, ...payload });

if (error) {
  console.error(error.message);
  process.exit(1);
}
console.log(`${existing ? "Updated" : "Created"}: ${article.slug} (${article.content.length} chars)`);
await revalidateBlogAfterSeed(article.slug);
