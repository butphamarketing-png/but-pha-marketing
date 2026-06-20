import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { detectNewsTopic, newsThumbnailUrl } from "./seo-article-helpers.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing Supabase env");
  process.exit(1);
}

const supabase = createClient(url, key);
const { data: rows, error } = await supabase
  .from("news")
  .select("id,slug,title,keywords_main,keywords_secondary,image_url");

if (error) {
  console.error(error.message);
  process.exit(1);
}

const counts = { website: 0, facebook: 0, "google-maps": 0, marketing: 0, skipped: 0 };
let updated = 0;

for (const row of rows || []) {
  const topic = detectNewsTopic({
    slug: row.slug,
    keywordsMain: row.keywords_main,
    keywordsSecondary: row.keywords_secondary,
    title: row.title,
  });
  counts[topic] += 1;

  const nextImage = newsThumbnailUrl(topic);
  const current = row.image_url || "";
  const currentPath = current.startsWith("http") ? new URL(current).pathname : current;

  if (currentPath === new URL(nextImage).pathname) {
    counts.skipped += 1;
    continue;
  }

  const { error: updateError } = await supabase
    .from("news")
    .update({ image_url: nextImage })
    .eq("id", row.id);

  if (updateError) {
    console.error(`Failed ${row.slug}:`, updateError.message);
    continue;
  }
  updated += 1;
}

console.log(JSON.stringify({ total: rows?.length ?? 0, updated, counts }, null, 2));
