import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { KIEN_TRUC_ARTICLE_THUMBNAILS } from "./seo-article-helpers.mjs";
import { buildRewriteSeedPayload } from "./seed-rewrite-utils.mjs";
import { REWRITE_THIET_KE_WEBSITE_CONG_TY_XAY_DUNG } from "./seo-rewrite-thiet-ke-website-cong-ty-xay-dung.mjs";
import { REWRITE_THIET_KE_WEBSITE_KIEN_TRUC_NOI_THAT } from "./seo-rewrite-thiet-ke-website-kien-truc-noi-that.mjs";
import { REWRITE_THIET_KE_WEBSITE_XAY_DUNG_NHA_THAU } from "./seo-rewrite-thiet-ke-website-xay-dung-nha-thau.mjs";
import { REWRITE_THIET_KE_WEBSITE_HO_SO_NANG_LUC } from "./seo-rewrite-thiet-ke-website-ho-so-nang-luc.mjs";
import { REWRITE_THIET_KE_WEBSITE_NOI_THAT_SHOWROOM } from "./seo-rewrite-thiet-ke-website-noi-that-showroom.mjs";
import { INDUSTRY_ARTICLES } from "./seo-industry-articles.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const REWRITES = [
  REWRITE_THIET_KE_WEBSITE_CONG_TY_XAY_DUNG,
  REWRITE_THIET_KE_WEBSITE_KIEN_TRUC_NOI_THAT,
  REWRITE_THIET_KE_WEBSITE_XAY_DUNG_NHA_THAU,
  REWRITE_THIET_KE_WEBSITE_HO_SO_NANG_LUC,
  REWRITE_THIET_KE_WEBSITE_NOI_THAT_SHOWROOM,
];

const KIEN_TRUC_SLUGS = new Set(Object.keys(KIEN_TRUC_ARTICLE_THUMBNAILS));

async function upsertArticle(article) {
  const payload =
    article.content && article.content.includes("BUTPHA_META")
      ? buildRewriteSeedPayload(article)
      : {
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

  const seoCheck = payload._seoCheck;
  delete payload._seoCheck;

  const { data: existing } = await supabase.from("news").select("id").eq("slug", article.slug).maybeSingle();
  const { error } = existing
    ? await supabase.from("news").update(payload).eq("id", existing.id)
    : await supabase.from("news").insert({ id: article.slug, ...payload });

  if (error) throw new Error(`${article.slug}: ${error.message}`);

  const kienTrucCount = (article.content.match(/\/tin-tuc\/kien-truc\//g) || []).length;
  console.log(
    `Updated: ${article.slug} (${kienTrucCount} kien-truc images in content)`,
    seoCheck && !seoCheck.ok ? `[SEO: ${seoCheck.missing.join(", ")}]` : "",
  );
  await revalidateBlogAfterSeed(article.slug);
}

for (const article of REWRITES) {
  await upsertArticle(article);
}

for (const article of INDUSTRY_ARTICLES) {
  if (KIEN_TRUC_SLUGS.has(article.slug)) {
    await upsertArticle(article);
  }
}

console.log("Done — kien-truc content images seeded.");
