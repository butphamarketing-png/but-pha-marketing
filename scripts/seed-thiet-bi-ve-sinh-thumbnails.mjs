import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  THIET_BI_VE_SINH_ARTICLE_THUMBNAILS,
  thietBiVeSinhThumbnailPath,
} from "./thiet-bi-ve-sinh-images.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

for (const [slug, entry] of Object.entries(THIET_BI_VE_SINH_ARTICLE_THUMBNAILS)) {
  const imagePath = thietBiVeSinhThumbnailPath(slug);
  if (!imagePath) continue;

  const { data: existing, error: findError } = await supabase
    .from("news")
    .select("id, slug, image_url, keywords_main")
    .eq("slug", slug)
    .maybeSingle();

  if (findError) throw new Error(findError.message);
  if (!existing) {
    console.log(`Skip (not in DB): ${slug}`);
    continue;
  }

  const payload = {
    image_url: imagePath,
    updated_at: new Date().toISOString(),
  };

  const kw = (existing.keywords_main || "").trim().toLowerCase();
  if (!kw || kw === "thiết kế website") {
    payload.keywords_main = entry.keywordsMain;
  }

  const { error } = await supabase.from("news").update(payload).eq("id", existing.id);
  if (error) throw new Error(`${slug}: ${error.message}`);

  console.log(`Updated: ${slug} → ${imagePath}`);
  await revalidateBlogAfterSeed(slug);
}

console.log("Done — thiet-bi-ve-sinh thumbnails.");
