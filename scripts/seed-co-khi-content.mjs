import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { REWRITE_THIET_KE_WEBSITE_CO_KHI } from "./seo-rewrite-thiet-ke-website-co-khi.mjs";
import { REWRITE_THIET_KE_WEBSITE_GIA_CONG_CNC } from "./seo-rewrite-thiet-ke-website-gia-cong-cnc.mjs";
import { buildRewriteSeedPayload } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const REWRITES = [REWRITE_THIET_KE_WEBSITE_CO_KHI, REWRITE_THIET_KE_WEBSITE_GIA_CONG_CNC];

async function upsertArticle(article) {
  const payload = buildRewriteSeedPayload(article);
  const seoCheck = payload._seoCheck;
  delete payload._seoCheck;

  const { data: existing } = await supabase.from("news").select("id").eq("slug", article.slug).maybeSingle();
  const { error } = existing
    ? await supabase.from("news").update(payload).eq("id", existing.id)
    : await supabase.from("news").insert({ id: article.slug, ...payload });

  if (error) throw new Error(`${article.slug}: ${error.message}`);

  const count = (article.content.match(/\/tin-tuc\/co-khi\//g) || []).length;
  console.log(
    `Updated: ${article.slug} (${count} co-khi images in content)`,
    seoCheck && !seoCheck.ok ? `[SEO: ${seoCheck.missing.join(", ")}]` : "",
  );
  await revalidateBlogAfterSeed(article.slug);
}

for (const article of REWRITES) {
  await upsertArticle(article);
}

console.log("Done — co-khi content seeded.");
