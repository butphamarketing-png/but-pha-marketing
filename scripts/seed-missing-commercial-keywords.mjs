import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MISSING_COMMERCIAL_ARTICLES } from "./seo-missing-commercial-keywords.mjs";
import { validateSeoKeywordPlacement } from "./seo-article-helpers.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

for (const article of MISSING_COMMERCIAL_ARTICLES) {
  const seo = validateSeoKeywordPlacement({
    keywordsMain: article.keywordsMain,
    title: article.title,
    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
    description: article.description,
    html: article.content,
  });
  console.log(
    `${seo.ok && article.content.length >= 12000 ? "OK" : "FAIL"} ${article.slug}: ${article.content.length} chars`,
  );
  await seedRewriteArticle(article);
}

await revalidateBlogAfterSeed();
console.log("Done — missing commercial keywords seeded.");
