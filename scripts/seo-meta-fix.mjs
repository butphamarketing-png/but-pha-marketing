import {
  buildSeoMetaTitle,
  buildSeoMetaDescription,
  ensureTitleHasKeyword,
  patchNewsContentMetaTitle,
  validateSeoKeywordPlacement,
  keywordInText,
} from "./seo-article-helpers.mjs";

/**
 * Chuẩn hóa title + meta SERP cho một bài (dùng khi audit/fix batch).
 * @param {{ slug: string, title: string, keywords_main?: string, description?: string, content?: string, meta_description?: string }} row
 */
export function buildSeoMetaFix(row) {
  const keywordsMain = (row.keywords_main || row.title || "").trim();
  const title = ensureTitleHasKeyword(row.title, keywordsMain);
  let metaTitle = buildSeoMetaTitle(keywordsMain);
  let metaDescription = buildSeoMetaDescription(keywordsMain, row.description || row.meta_description || "");
  let content = patchNewsContentMetaTitle(row.content || "", metaTitle);

  let check = validateSeoKeywordPlacement({
    keywordsMain,
    title,
    metaTitle,
    metaDescription,
    description: row.description || metaDescription,
    html: content,
  });

  if (!keywordInText(metaTitle, keywordsMain)) {
    metaTitle = buildSeoMetaTitle(title);
    content = patchNewsContentMetaTitle(row.content || "", metaTitle);
    check = validateSeoKeywordPlacement({
      keywordsMain,
      title,
      metaTitle,
      metaDescription,
      description: row.description || metaDescription,
      html: content,
    });
  }

  return {
    slug: row.slug,
    title,
    metaTitle,
    metaDescription,
    content,
    check,
    changed:
      title !== row.title ||
      metaDescription !== (row.meta_description || "") ||
      content !== (row.content || ""),
  };
}
