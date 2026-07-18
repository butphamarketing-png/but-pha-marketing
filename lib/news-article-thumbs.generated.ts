/** Auto-generated — do not edit. Source: news-article-thumbs.generated.json */
import data from "./news-article-thumbs.generated.json";

type ThumbEntry = { file: string; keywordsMain: string };
export const GENERATED_ARTICLE_THUMBNAILS = data as Record<string, ThumbEntry>;

export function getGeneratedArticleThumbnailPath(slug?: string): string | null {
  const entry = slug ? GENERATED_ARTICLE_THUMBNAILS[slug] : undefined;
  return entry ? `/tin-tuc/articles/${entry.file}` : null;
}

export function getGeneratedArticleThumbnailAlt(slug?: string): string | null {
  const entry = slug ? GENERATED_ARTICLE_THUMBNAILS[slug] : undefined;
  if (!entry?.keywordsMain) return null;
  const k = entry.keywordsMain.trim();
  return k ? k.charAt(0).toUpperCase() + k.slice(1) : null;
}
