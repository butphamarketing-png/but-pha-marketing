/**
 * E12 — Batch fix internal links for Website Topic articles (Hướng B)
 * Replace /lien-he → /banggia, /seo-website → /website in content HTML.
 * Scope: published, keywords/title/slug related to thiết kế website | báo giá, limit 40.
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const SITE = "https://www.butphamarketing.com";
const LIMIT = 40;

function isWebsiteTopic(row) {
  const hay = `${row.slug || ""} ${row.title || ""} ${row.keywords_main || ""}`.toLowerCase();
  return (
    hay.includes("thiết kế website") ||
    hay.includes("thiet-ke-website") ||
    hay.includes("báo giá") ||
    hay.includes("bao-gia") ||
    hay.includes("làm website") ||
    hay.includes("lam website")
  );
}

function needsPatch(html) {
  return (
    html.includes(`${SITE}/lien-he`) ||
    html.includes(`${SITE}/seo-website`) ||
    html.includes('href="/lien-he"') ||
    html.includes('href="/seo-website"') ||
    html.includes(`${SITE}/facebook/`) ||
    html.includes(`${SITE}/google-maps/`)
  );
}

function patchContent(html) {
  let next = html;
  next = next.replaceAll(`${SITE}/seo-website`, `${SITE}/website`);
  next = next.replaceAll('href="/seo-website"', 'href="/website"');
  next = next.replaceAll(`${SITE}/lien-he`, `${SITE}/banggia`);
  next = next.replaceAll('href="/lien-he"', 'href="/banggia"');
  // Sub-landings → Money Pages (Spec Phase 1)
  next = next.replaceAll(`${SITE}/facebook/thiet-ke-fanpage`, `${SITE}/facebook`);
  next = next.replaceAll(`${SITE}/facebook/cham-soc-fanpage`, `${SITE}/facebook`);
  next = next.replaceAll(`${SITE}/facebook/quang-cao-fanpage`, `${SITE}/facebook`);
  next = next.replaceAll(`${SITE}/google-maps/thiet-ke-google-maps`, `${SITE}/google-maps`);
  next = next.replaceAll(`${SITE}/google-maps/quang-cao-google-maps`, `${SITE}/google-maps`);
  next = next.replaceAll(
    `href="${SITE}/banggia">Liên hệ`,
    `href="${SITE}/banggia">Xem báo giá thiết kế website`,
  );
  next = next.replaceAll(
    `href="${SITE}/banggia">Tư vấn`,
    `href="${SITE}/banggia">Xem báo giá`,
  );
  return next;
}

// Fetch in pages
const candidates = [];
let from = 0;
while (candidates.length < LIMIT * 3) {
  const { data, error } = await supabase
    .from("news")
    .select("id,slug,title,keywords_main,hot,content")
    .eq("published", true)
    .order("hot", { ascending: false })
    .order("timestamp", { ascending: false })
    .range(from, from + 499);

  if (error) {
    console.error(error.message);
    process.exit(1);
  }
  if (!data?.length) break;

  for (const row of data) {
    if (!isWebsiteTopic(row)) continue;
    const content = row.content || "";
    if (!needsPatch(content)) continue;
    candidates.push(row);
    if (candidates.length >= LIMIT) break;
  }
  if (candidates.length >= LIMIT || data.length < 500) break;
  from += 500;
}

console.log("Candidates to patch:", candidates.length);

let ok = 0;
let fail = 0;
for (const row of candidates) {
  const next = patchContent(row.content || "");
  if (next === row.content) continue;

  const { error } = await supabase
    .from("news")
    .update({ content: next, updated_at: new Date().toISOString() })
    .eq("id", row.id);

  if (error) {
    console.log("FAIL", row.slug, error.message);
    fail++;
  } else {
    console.log("OK", row.hot ? "[hot]" : "     ", row.slug);
    ok++;
  }
}

console.log("\nDone. ok=", ok, "fail=", fail);
