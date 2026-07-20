/**
 * Rebuild all Facebook / Google Maps article thumbs without robot bases.
 *   node scripts/regen-fb-maps-thumbs-no-robot.mjs
 */
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { spawnSync } from "child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function isFbOrMaps(row) {
  const t = `${row.slug || ""} ${row.keywords_main || ""} ${row.title || ""}`.toLowerCase();
  return (
    /facebook|fanpage|meta ads|instagram/.test(t) ||
    /google maps|gmb|gbp|maps marketing|gmap|local ads|local seo|google business/.test(t)
  );
}

async function fetchSlugs() {
  const slugs = [];
  let from = 0;
  for (;;) {
    const { data, error } = await supabase
      .from("news")
      .select("slug,keywords_main,title")
      .eq("published", true)
      .range(from, from + 999);
    if (error) throw error;
    if (!data?.length) break;
    for (const row of data) {
      if (row.slug && isFbOrMaps(row)) slugs.push(row.slug);
    }
    if (data.length < 1000) break;
    from += 1000;
  }
  return [...new Set(slugs)];
}

async function main() {
  const slugs = await fetchSlugs();
  console.log(`FB/Maps slugs to regen: ${slugs.length}`);

  const chunkSize = 80;
  const forceScript = path.join(root, "scripts/force-regenerate-dup-thumbs.mjs");
  let okChunks = 0;
  for (let i = 0; i < slugs.length; i += chunkSize) {
    const chunk = slugs.slice(i, i + chunkSize);
    const arg = `--slugs=${chunk.join(",")}`;
    console.log(`\nChunk ${i / chunkSize + 1}/${Math.ceil(slugs.length / chunkSize)} (${chunk.length})`);
    const r = spawnSync(process.execPath, [forceScript, arg], {
      cwd: root,
      stdio: "inherit",
      env: process.env,
    });
    if (r.status !== 0) {
      console.error("Chunk failed status", r.status);
      process.exit(r.status || 1);
    }
    okChunks++;
  }
  console.log(`Done chunks=${okChunks}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
