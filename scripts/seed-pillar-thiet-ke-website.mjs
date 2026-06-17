import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PILLAR_THIET_KE_WEBSITE } from "./seo-pillar-thiet-ke-website.mjs";
import { validateSeoKeywordPlacement } from "./seo-article-helpers.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const article = PILLAR_THIET_KE_WEBSITE;
const check = validateSeoKeywordPlacement({
  keywordsMain: article.keywordsMain,
  title: article.title,
  metaTitle: article.metaTitle,
  metaDescription: article.metaDescription,
  description: article.description,
  imageAlts: ["Thiết kế website chuyên nghiệp chuẩn SEO — Bứt Phá Marketing"],
});
if (!check.ok) {
  console.warn("SEO keyword placement warnings:", check.missing.join(", "));
}

const supabase = createClient(url, key);
const payload = {
  title: article.title,
  content: article.content,
  category: "blog",
  published: true,
  description: article.description,
  image_url: article.imageUrl,
  slug: article.slug,
  hot: true,
  meta_description: article.metaDescription,
  keywords_main: article.keywordsMain,
  keywords_secondary: article.keywordsSecondary,
  timestamp: Date.now(),
  published_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const { data: existing, error: loadError } = await supabase
  .from("news")
  .select("id,slug")
  .eq("slug", article.slug)
  .maybeSingle();

if (loadError) {
  console.error("Load failed:", loadError.message);
  process.exit(1);
}

let error;
if (existing) {
  ({ error } = await supabase.from("news").update(payload).eq("id", existing.id));
  console.log(error ? `Update failed: ${error.message}` : `Updated: ${article.slug}`);
} else {
  ({ error } = await supabase.from("news").insert({ id: article.slug, ...payload }));
  console.log(error ? `Insert failed: ${error.message}` : `Created: ${article.slug}`);
}

if (error) process.exit(1);
console.log(`Done. Content: ${article.content.length} chars`);
