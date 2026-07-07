import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { REWRITE_THIET_KE_WEBSITE_CONG_TY_LUAT } from "./seo-rewrite-thiet-ke-website-cong-ty-luat.mjs";
import { REWRITE_THIET_KE_WEBSITE_PHAP_LUAT_LUAT_SU } from "./seo-rewrite-thiet-ke-website-phap-luat-luat-su.mjs";
import { buildRewriteSeedPayload } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const REWRITES = [REWRITE_THIET_KE_WEBSITE_CONG_TY_LUAT, REWRITE_THIET_KE_WEBSITE_PHAP_LUAT_LUAT_SU];

async function upsertArticle(article) {
  const payload = buildRewriteSeedPayload(article);
  const seoCheck = payload._seoCheck;
  delete payload._seoCheck;

  const { data: existing } = await supabase.from("news").select("id").eq("slug", article.slug).maybeSingle();
  const { error } = existing
    ? await supabase.from("news").update(payload).eq("id", existing.id)
    : await supabase.from("news").insert({ id: article.slug, ...payload });

  if (error) throw new Error(`${article.slug}: ${error.message}`);

  const count = (article.content.match(/\/tin-tuc\/luat\//g) || []).length;
  console.log(
    `Updated: ${article.slug} (${count} luat images in content)`,
    seoCheck && !seoCheck.ok ? `[SEO: ${seoCheck.missing.join(", ")}]` : "",
  );
  await revalidateBlogAfterSeed(article.slug);
}

for (const article of REWRITES) {
  await upsertArticle(article);
}

console.log("Done — luat content seeded.");
