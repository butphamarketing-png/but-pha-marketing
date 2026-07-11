/**
 * Chèn block Zalo chuẩn vào mọi bài trong bảng news.
 * Chạy: node scripts/seed-blog-zalo-cta-all.mjs
 */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ensureZaloConsultBlock, hasZaloConsultBlock } from "./blog-zalo-cta.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Thiếu NEXT_PUBLIC_SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key);
const PAGE_SIZE = 500;
const CONCURRENCY = 30;

console.log("=== Patch Zalo CTA — toàn bộ bài viết ===\n");

let from = 0;
let scanned = 0;
let updated = 0;
let skipped = 0;
let failed = 0;

async function runPool(items, worker) {
  let index = 0;
  async function loop() {
    while (index < items.length) {
      const current = index++;
      await worker(items[current]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, items.length) }, loop));
}

while (true) {
  const { data: rows, error } = await supabase
    .from("news")
    .select("id, slug, content")
    .not("content", "is", null)
    .order("slug")
    .range(from, from + PAGE_SIZE - 1);

  if (error) {
    console.error("Lỗi đọc DB:", error.message);
    process.exit(1);
  }
  if (!rows?.length) break;

  const pending = [];
  for (const row of rows) {
    scanned++;
    const content = String(row.content || "");
    if (!content.trim() || hasZaloConsultBlock(content)) {
      skipped++;
      continue;
    }
    pending.push({
      id: row.id,
      slug: row.slug,
      content: ensureZaloConsultBlock(content),
    });
  }

  await runPool(pending, async (item) => {
    const { error: updateError } = await supabase
      .from("news")
      .update({ content: item.content, updated_at: new Date().toISOString() })
      .eq("id", item.id);

    if (updateError) {
      failed++;
      console.error(`FAIL ${item.slug}: ${updateError.message}`);
    } else {
      updated++;
    }
  });

  console.log(`… batch ${from}-${from + rows.length - 1}: +${pending.length} cập nhật (tổng ${updated})`);

  if (rows.length < PAGE_SIZE) break;
  from += PAGE_SIZE;
}

await revalidateBlogAfterSeed();
console.log(`\nHoàn tất: ${scanned} bài quét · ${updated} cập nhật · ${skipped} đã có/skip · ${failed} lỗi`);
if (failed) process.exit(1);
