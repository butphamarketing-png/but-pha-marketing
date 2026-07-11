/**
 * Sửa silo links cho checklist/template mất hub/du-an sau upgradeArticle.
 * Chạy: node scripts/seed-fix-checklist-silo-links.mjs
 */
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";
import { SILO_FIXES, injectSiloLinks } from "./seo-silo-inject.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

let ok = 0;
for (const cfg of SILO_FIXES) {
  const { data: row, error } = await supabase
    .from("news")
    .select("slug,title,keywords_main,keywords_secondary,description,content")
    .eq("slug", cfg.slug)
    .maybeSingle();
  if (error) throw error;
  if (!row) {
    console.warn(`Skip (missing): ${cfg.slug}`);
    continue;
  }

  const before = row.content?.length || 0;
  const content = injectSiloLinks(row.content || "", cfg);
  if (content === row.content) {
    console.log(`  · ${cfg.slug}: already OK`);
    ok++;
    continue;
  }
  const after = content.length;

  await seedRewriteArticle(
    {
      slug: row.slug,
      title: row.title,
      keywordsMain: row.keywords_main || row.title,
      keywordsSecondary: row.keywords_secondary || "",
      description: row.description || "",
      metaTitle: row.title,
      metaDescription: row.description || row.title,
      content,
    },
    { log: true, revalidate: false },
  );
  console.log(`  ✓ ${cfg.slug}: ${before} → ${after} chars`);
  ok++;
}

if (ok) await revalidateBlogAfterSeed();
console.log(`\nDone: ${ok}/${SILO_FIXES.length}`);
