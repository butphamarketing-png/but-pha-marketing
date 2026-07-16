/**
 * E14b — Batch patch Facebook Topic articles → Money Page /facebook
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const SITE = "https://www.butphamarketing.com";

function isFacebookTopic(row) {
  const hay = `${row.slug || ""} ${row.title || ""} ${row.keywords_main || ""}`.toLowerCase();
  return (
    hay.includes("facebook") ||
    hay.includes("fanpage") ||
    hay.includes("meta ads") ||
    hay.includes("quảng cáo fb") ||
    hay.includes("quang-cao-facebook") ||
    hay.includes("cham-soc-fanpage") ||
    hay.includes("thiet-ke-fanpage")
  );
}

function needsPatch(html) {
  return (
    html.includes(`${SITE}/lien-he`) ||
    html.includes(`${SITE}/facebook/`) ||
    html.includes(`${SITE}/seo-website`) ||
    html.includes('href="/lien-he"') ||
    html.includes('href="/facebook/')
  );
}

function patchContent(html) {
  let n = html;
  n = n.replaceAll(`${SITE}/facebook/thiet-ke-fanpage`, `${SITE}/facebook`);
  n = n.replaceAll(`${SITE}/facebook/cham-soc-fanpage`, `${SITE}/facebook`);
  n = n.replaceAll(`${SITE}/facebook/quang-cao-fanpage`, `${SITE}/facebook`);
  n = n.replaceAll(`${SITE}/lien-he`, `${SITE}/facebook`);
  n = n.replaceAll('href="/lien-he"', 'href="/facebook"');
  // Don't steal Website money page from FB articles that mention SEO service as upsell — point SEO to website money is OK
  n = n.replaceAll(`${SITE}/seo-website`, `${SITE}/website`);
  n = n.replaceAll(
    `href="${SITE}/facebook">Liên hệ`,
    `href="${SITE}/facebook">Dịch vụ Facebook Marketing`,
  );
  n = n.replaceAll(
    `href="${SITE}/facebook">Tư vấn`,
    `href="${SITE}/facebook">Dịch vụ Facebook Marketing`,
  );
  return n;
}

let from = 0;
let ok = 0;
let fail = 0;
let scanned = 0;
let matched = 0;

while (true) {
  const { data, error } = await supabase
    .from("news")
    .select("id,slug,title,keywords_main,content")
    .eq("published", true)
    .order("timestamp", { ascending: false })
    .range(from, from + 499);

  if (error) {
    console.error(error.message);
    process.exit(1);
  }
  if (!data?.length) break;

  for (const row of data) {
    scanned++;
    if (!isFacebookTopic(row)) continue;
    const c = row.content || "";
    if (!needsPatch(c)) continue;
    matched++;
    const next = patchContent(c);
    if (next === c) continue;

    const { error: e } = await supabase
      .from("news")
      .update({ content: next, updated_at: new Date().toISOString() })
      .eq("id", row.id);

    if (e) {
      fail++;
      console.log("FAIL", row.slug);
    } else {
      ok++;
      if (ok <= 25 || ok % 50 === 0) console.log("OK", ok, row.slug);
    }
  }

  if (data.length < 500) break;
  from += 500;
}

console.log(JSON.stringify({ scanned, matched, ok, fail }));
