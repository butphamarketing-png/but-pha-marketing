/**
 * E11 — Pillar internal link fix (Hướng B / Battlefield Website v1)
 * - /lien-he → /banggia (transactional path) or keep context
 * - /seo-website → /website (Money Page commercial)
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const SITE = "https://www.butphamarketing.com";

function patchContent(html, slug) {
  let next = html;
  const before = html;

  // SEO service page competes with /website for this Topic — point to Money Page
  next = next.replaceAll(`${SITE}/seo-website`, `${SITE}/website`);
  next = next.replaceAll('href="/seo-website"', 'href="/website"');

  // Contact as primary commercial CTA → báo giá Money Page (Hướng B: no phone gate)
  next = next.replaceAll(`${SITE}/lien-he`, `${SITE}/banggia`);
  next = next.replaceAll('href="/lien-he"', 'href="/banggia"');

  // Soften anchor text that still says "liên hệ" pointing at banggia — optional light rewrite
  next = next.replaceAll(
    `href="${SITE}/banggia">Liên hệ`,
    `href="${SITE}/banggia">Xem báo giá thiết kế website`,
  );
  next = next.replaceAll(
    `href="${SITE}/banggia">Tư vấn`,
    `href="${SITE}/banggia">Xem báo giá`,
  );
  next = next.replaceAll(
    'href="/banggia">Liên hệ',
    'href="/banggia">Xem báo giá thiết kế website',
  );

  if (slug === "thiet-ke-website") {
    // Ensure banggia appears as pricing CTA if somehow missing after replace
    if (!next.includes("/banggia")) {
      console.warn("WARN: thiet-ke-website missing /banggia after patch");
    }
  }

  return { next, changed: next !== before };
}

const SLUGS = ["thiet-ke-website", "bao-gia-thiet-ke-website"];

for (const slug of SLUGS) {
  const { data, error } = await supabase
    .from("news")
    .select("id,slug,content")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    console.log("FAIL", slug, error?.message || "not found");
    continue;
  }

  const { next, changed } = patchContent(data.content || "", slug);
  if (!changed) {
    console.log("SKIP (no change)", slug);
    continue;
  }

  const { error: upErr } = await supabase
    .from("news")
    .update({
      content: next,
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.id);

  if (upErr) {
    console.log("UPDATE FAIL", slug, upErr.message);
    continue;
  }

  const links = [...next.matchAll(/href=["']([^"']+)["']/gi)].map((m) => m[1]);
  const uniq = [...new Set(links)];
  console.log("OK", slug);
  console.log("  lien-he left:", uniq.filter((u) => u.includes("lien-he")).length);
  console.log("  seo-website left:", uniq.filter((u) => u.includes("seo-website")).length);
  console.log("  banggia:", uniq.some((u) => u.includes("banggia")));
  console.log("  website:", uniq.some((u) => u.includes("/website")));
}
