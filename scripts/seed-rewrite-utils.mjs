import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateSeoKeywordPlacement } from "./seo-article-helpers.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const GENERIC_KEYWORD = "thiết kế website";
const PILLAR_SLUGS = new Set(["thiet-ke-website"]);

export function isQualitySeoArticle(article) {
  if (PILLAR_SLUGS.has(article.slug)) return true;
  const kw = (article.keywordsMain || "").trim().toLowerCase();
  if (!kw || kw === GENERIC_KEYWORD) return false;
  return kw.startsWith("thiết kế website") || kw.includes("website");
}

export function buildRewriteSeedPayload(article) {
  const check = validateSeoKeywordPlacement({
    keywordsMain: article.keywordsMain,
    title: article.title,
    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
    description: article.description,
    html: article.content,
  });

  return {
    title: article.title,
    content: article.content,
    category: "blog",
    published: true,
    description: article.description,
    image_url: article.imageUrl,
    slug: article.slug,
    hot: isQualitySeoArticle(article) && article.content.length >= 12000,
    meta_description: article.metaDescription,
    keywords_main: article.keywordsMain,
    keywords_secondary: article.keywordsSecondary,
    timestamp: Date.now(),
    published_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    _seoCheck: check,
  };
}

export async function seedRewriteArticle(article, { log = true } = {}) {
  const payload = buildRewriteSeedPayload(article);
  const check = payload._seoCheck;
  delete payload._seoCheck;

  if (log) {
    console.log(
      `SEO check [${article.slug}]:`,
      check.ok ? "OK" : check.missing.join(", "),
      payload.hot ? "(hot)" : "",
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  const { data: existing } = await supabase.from("news").select("id").eq("slug", article.slug).maybeSingle();
  const { error } = existing
    ? await supabase.from("news").update(payload).eq("id", existing.id)
    : await supabase.from("news").insert({ id: article.slug, ...payload });

  if (error) throw new Error(error.message);

  if (log) {
    console.log(`${existing ? "Updated" : "Created"}: ${article.slug} (${article.content.length} chars)`);
  }

  await revalidateBlogAfterSeed(article.slug);
  return { slug: article.slug, seoOk: check.ok, hot: payload.hot };
}
