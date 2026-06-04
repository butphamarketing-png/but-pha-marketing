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
