function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type NewsSlugRow = {
  id: string;
  slug?: string | null;
  title?: string | null;
};

export function buildNewsSlugBase(input: { slug?: string; title?: string }) {
  const preferred = (input.slug || "").trim();
  if (preferred) return slugify(preferred);
  return slugify((input.title || "").trim());
}

export function ensureUniqueNewsSlug(rows: NewsSlugRow[], input: { slug?: string; title?: string; excludeId?: string }) {
  const baseSlug = buildNewsSlugBase(input);
  if (!baseSlug) return "";

  const existing = new Set(
    rows
      .filter((row) => row.id !== input.excludeId)
      .map((row) => slugify((row.slug || row.title || "").trim()))
      .filter(Boolean),
  );

  if (!existing.has(baseSlug)) return baseSlug;

  let suffix = 2;
  let candidate = `${baseSlug}-${suffix}`;
  while (existing.has(candidate)) {
    suffix += 1;
    candidate = `${baseSlug}-${suffix}`;
  }

  return candidate;
}
