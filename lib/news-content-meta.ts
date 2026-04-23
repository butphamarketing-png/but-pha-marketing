type NewsContentMeta = {
  metaTitle?: string;
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

  const hasMeta = Object.values(nextMeta).some((value) => typeof value === "string" && value.trim());
  if (!hasMeta) return parsed.content;

  return `${META_PREFIX}${JSON.stringify(nextMeta)}${META_SUFFIX}\n${parsed.content}`;
}
