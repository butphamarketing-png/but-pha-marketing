import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { REWRITE_THIET_KE_WEBSITE_DIEN_CONG_NGHIEP } from "./seo-rewrite-thiet-ke-website-dien-cong-nghiep.mjs";
import { buildRewriteSeedPayload } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";
import { tuDongHoaThumbnailPath, TU_DONG_HOA_ARTICLE_THUMBNAILS } from "./seo-article-helpers.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const slug = "thiet-ke-website-dien-cong-nghiep";
const imagePath = tuDongHoaThumbnailPath(slug);
const payload = buildRewriteSeedPayload(REWRITE_THIET_KE_WEBSITE_DIEN_CONG_NGHIEP);
delete payload._seoCheck;
if (imagePath) payload.image_url = imagePath;

const entry = TU_DONG_HOA_ARTICLE_THUMBNAILS[slug];
const { data: existing } = await supabase.from("news").select("id, keywords_main").eq("slug", slug).maybeSingle();
if (!existing) {
  console.log("Skip — not in DB");
  process.exit(0);
}

const kw = (existing.keywords_main || "").trim().toLowerCase();
if ((!kw || kw === "thiết kế website") && entry) payload.keywords_main = entry.keywordsMain;

const { error } = await supabase.from("news").update(payload).eq("id", existing.id);
if (error) throw error;

console.log(`Updated: ${slug} → ${imagePath}`);
await revalidateBlogAfterSeed(slug);
