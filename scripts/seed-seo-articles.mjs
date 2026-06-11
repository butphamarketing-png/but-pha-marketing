import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });
import { SEO_ARTICLES } from "./seo-articles-content.mjs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key);

async function main() {
  const { data: existing, error: loadError } = await supabase.from("news").select("id,slug,title");
  if (loadError) {
    console.error("Failed to load existing news:", loadError.message);
    process.exit(1);
  }

  const bySlug = new Map((existing || []).map((row) => [row.slug, row]));

  for (const article of SEO_ARTICLES) {
    const current = bySlug.get(article.slug);
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

    if (current) {
      const { error } = await supabase.from("news").update(payload).eq("id", current.id);
      if (error) {
        console.error(`Update failed [${article.slug}]:`, error.message);
        process.exit(1);
      }
      console.log(`Updated: ${article.slug}`);
      continue;
    }

    const { error } = await supabase.from("news").insert({ id: article.slug, ...payload });
    if (error) {
      console.error(`Insert failed [${article.slug}]:`, error.message);
      process.exit(1);
    }
    console.log(`Created: ${article.slug}`);
  }

  console.log(`Done. ${SEO_ARTICLES.length} SEO articles seeded.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
