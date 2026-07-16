/**
 * E15b resume — smaller batches, skip already clean
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { db: { schema: "public" } },
);

const SITE = "https://www.butphamarketing.com";
const BATCH_UPDATE = 20;

function isMapsTopic(row) {
  const hay = `${row.slug || ""} ${row.title || ""} ${row.keywords_main || ""}`.toLowerCase();
  return (
    hay.includes("google maps") ||
    hay.includes("google-maps") ||
    hay.includes("local seo") ||
    hay.includes("local-seo") ||
    hay.includes("gbp") ||
    hay.includes("google business") ||
    hay.includes("gmb") ||
    (hay.includes("maps") && (hay.includes("seo") || hay.includes("google")))
  );
}

function needsPatch(html) {
  return (
    html.includes(`${SITE}/lien-he`) ||
    html.includes(`${SITE}/google-maps/`) ||
    html.includes(`${SITE}/seo-website`) ||
    html.includes('href="/lien-he"')
  );
}

function patchContent(html) {
  let n = html;
  n = n.replaceAll(`${SITE}/google-maps/thiet-ke-google-maps`, `${SITE}/google-maps`);
  n = n.replaceAll(`${SITE}/google-maps/quang-cao-google-maps`, `${SITE}/google-maps`);
  n = n.replaceAll(`${SITE}/lien-he`, `${SITE}/google-maps`);
  n = n.replaceAll('href="/lien-he"', 'href="/google-maps"');
  n = n.replaceAll(`${SITE}/seo-website`, `${SITE}/website`);
  n = n.replaceAll(
    `href="${SITE}/google-maps">Liên hệ`,
    `href="${SITE}/google-maps">Dịch vụ Google Maps`,
  );
  n = n.replaceAll(
    `href="${SITE}/google-maps">Tư vấn`,
    `href="${SITE}/google-maps">Dịch vụ Google Maps`,
  );
  return n;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

let from = 0;
let ok = 0;
let fail = 0;
let scanned = 0;
let matched = 0;
const queue = [];

while (true) {
  const { data, error } = await supabase
    .from("news")
    .select("id,slug,title,keywords_main,content")
    .eq("published", true)
    .order("timestamp", { ascending: false })
    .range(from, from + 499);

  if (error) {
    console.error("select", error.message);
    process.exit(1);
  }
  if (!data?.length) break;

  for (const row of data) {
    scanned++;
    if (!isMapsTopic(row)) continue;
    const c = row.content || "";
    if (!needsPatch(c)) continue;
    matched++;
    const next = patchContent(c);
    if (next === c) continue;
    queue.push({ id: row.id, slug: row.slug, content: next });
  }

  if (data.length < 500) break;
  from += 500;
}

console.log("Queued:", queue.length, "scanned:", scanned, "matched_need:", matched);

for (let i = 0; i < queue.length; i += BATCH_UPDATE) {
  const chunk = queue.slice(i, i + BATCH_UPDATE);
  for (const row of chunk) {
    let attempts = 0;
    while (attempts < 3) {
      attempts++;
      const { error: e } = await supabase
        .from("news")
        .update({ content: row.content, updated_at: new Date().toISOString() })
        .eq("id", row.id);
      if (!e) {
        ok++;
        if (ok <= 15 || ok % 50 === 0) console.log("OK", ok, row.slug);
        break;
      }
      console.log("RETRY", row.slug, e.message);
      await sleep(1500 * attempts);
      if (attempts === 3) {
        fail++;
        console.log("FAIL", row.slug);
      }
    }
  }
  await sleep(400);
}

console.log(JSON.stringify({ scanned, matched, queued: queue.length, ok, fail }));
