/**
 * Chạy đến khi mọi bài published có thumbnail riêng (+ alt via keywords_main).
 * Usage: node scripts/finish-news-thumbs.mjs
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const GENERIC = new Set([
  "tin-tuc-marketing.png",
  "thiet-ke-website.png",
  "facebook-marketing.png",
  "google-maps-marketing.png",
]);

async function remaining() {
  let from = 0;
  let need = 0;
  let total = 0;
  let unique = 0;
  while (true) {
    const { data, error } = await sb
      .from("news")
      .select("image_url")
      .eq("published", true)
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    if (!data?.length) break;
    for (const r of data) {
      total++;
      const img = (r.image_url || "").split("?")[0];
      const file = img.split("/").pop() || "";
      if (img.includes("/tin-tuc/articles/")) {
        unique++;
        continue;
      }
      if (!img || GENERIC.has(file)) {
        need++;
        continue;
      }
      if (/\/tin-tuc\/[^/]+\//.test(img) && !img.includes("/nganh-thumbs/")) need++;
    }
    from += 1000;
    if (data.length < 1000) break;
  }
  return { need, unique, total };
}

let round = 0;
while (true) {
  round++;
  const stats = await remaining();
  console.log(
    `\n=== FINISH ROUND ${round} === unique=${stats.unique}/${stats.total} need=${stats.need}`,
  );
  if (stats.need === 0) {
    console.log("ALL DONE — every published post has a unique article thumb.");
    break;
  }

  const result = spawnSync(
    process.execPath,
    [path.join(root, "scripts/gen-news-thumbs-batch.mjs"), "500", "--all"],
    { cwd: root, stdio: "inherit", env: process.env },
  );
  if (result.status !== 0) {
    console.error("Batch failed with", result.status);
    process.exit(result.status ?? 1);
  }

  // safety: avoid infinite if batch finds 0 but remaining>0 (filter mismatch)
  const after = await remaining();
  if (after.need >= stats.need) {
    console.warn("No progress this round — stopping to avoid loop.");
    console.log(after);
    process.exit(2);
  }
}
