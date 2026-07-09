/**
 * Guardrails cho pipeline seed/rewrite — thin content, cannibalization, duplicate slug.
 */
import { PILLAR_SLUG_SET } from "./seo-pillar-hub.mjs";

const MIN_CONTENT_WARN = 8000;
const MIN_CONTENT_BLOCK = 4000;
const GENERIC_KEYWORD = "thiết kế website";

/** Intent theo slug — tránh cannibalization money/checklist/template/local. */
const INTENT_BY_PREFIX = [
  ["checklist-website-", "checklist"],
  ["template-website-", "template"],
  ["case-study-", "case-study"],
  ["thiet-ke-website-", "money"],
  ["bao-gia-thiet-ke-website", "pricing"],
];

export function resolveArticleIntent(slug) {
  if (!slug) return "cluster";
  if (PILLAR_SLUG_SET.has(slug)) return "pillar";
  for (const [prefix, intent] of INTENT_BY_PREFIX) {
    if (slug.startsWith(prefix)) return intent;
  }
  if (slug.includes("-") && /-(ha-noi|tphcm|da-nang|can-tho|hue|binh-duong)/.test(slug)) {
    return "local";
  }
  return "cluster";
}

export async function runPipelineGuardrails(article, supabase) {
  const warnings = [];
  const blockers = [];

  const contentLen = (article.content || "").length;
  if (contentLen < MIN_CONTENT_BLOCK) {
    blockers.push(`content quá mỏng (${contentLen} chars < ${MIN_CONTENT_BLOCK})`);
  } else if (contentLen < MIN_CONTENT_WARN) {
    warnings.push(`content có thể mỏng (${contentLen} chars < ${MIN_CONTENT_WARN})`);
  }

  const kw = (article.keywordsMain || "").trim().toLowerCase();
  if (!kw) {
    blockers.push("thiếu keywords_main");
  } else if (kw === GENERIC_KEYWORD && !PILLAR_SLUG_SET.has(article.slug)) {
    warnings.push(`keywords_main generic "${GENERIC_KEYWORD}" — rủi ro cannibalization`);
  }

  if (!article.slug) {
    blockers.push("thiếu slug");
  }

  if (supabase && article.slug) {
    const { data: slugDup } = await supabase
      .from("news")
      .select("id,slug")
      .eq("slug", article.slug)
      .maybeSingle();

    if (slugDup && slugDup.id !== article.slug) {
      warnings.push(`slug "${article.slug}" đã tồn tại — sẽ update`);
    }

    if (kw) {
      const { data: kwRows } = await supabase
        .from("news")
        .select("slug,keywords_main")
        .eq("keywords_main", article.keywordsMain)
        .eq("published", true)
        .neq("slug", article.slug)
        .limit(5);

    if (kwRows?.length) {
      const intent = resolveArticleIntent(article.slug);
      const conflicts = kwRows.filter((r) => resolveArticleIntent(r.slug) === intent);
      const others = (conflicts.length ? conflicts : kwRows).map((r) => r.slug).join(", ");
      if (PILLAR_SLUG_SET.has(article.slug)) {
        warnings.push(`keywords_main trùng pillar cluster: ${others}`);
      } else if (conflicts.length) {
        warnings.push(`cannibalization cùng intent "${intent}" với: ${others}`);
      } else {
        warnings.push(`keywords_main trùng slug khác intent: ${others}`);
      }
    }
  }
  }

  return {
    ok: blockers.length === 0,
    warnings,
    blockers,
  };
}
