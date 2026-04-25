type NewsContentMeta = {
  metaTitle?: string;
  seoScore?: number;
  qualityLabel?: "ready" | "needs_optimization" | "weak";
  indexStatus?: "pending_indexing" | "indexed" | "unknown";
  automation?: {
    source?: "manual" | "seo-automation";
    runId?: string;
    batchId?: string;
    keyword?: string;
    generatedAt?: string;
    autoPublished?: boolean;
  };
};

const META_PREFIX = "<!-- BUTPHA_META ";
const META_SUFFIX = " -->";

export function parseNewsContentMeta(rawContent?: string | null) {
  const content = rawContent || "";
  const match = content.match(/^<!-- BUTPHA_META ([\s\S]+?) -->\s*/);
  if (!match) {
    return { meta: {} as NewsContentMeta, content };
  }

  try {
    const meta = JSON.parse(match[1]) as NewsContentMeta;
    return {
      meta: meta && typeof meta === "object" ? meta : {},
      content: content.slice(match[0].length),
    };
  } catch {
    return { meta: {} as NewsContentMeta, content };
  }
}

export function mergeNewsContentMeta(rawContent: string, meta: NewsContentMeta) {
  const parsed = parseNewsContentMeta(rawContent);
  const nextMeta = {
    ...parsed.meta,
    ...meta,
  };

  const hasMeta = Object.values(nextMeta).some((value) => {
    if (typeof value === "string") return Boolean(value.trim());
    if (value && typeof value === "object") return Object.values(value).some(Boolean);
    return Boolean(value);
  });
  if (!hasMeta) return parsed.content;

  return `${META_PREFIX}${JSON.stringify(nextMeta)}${META_SUFFIX}\n${parsed.content}`;
}
