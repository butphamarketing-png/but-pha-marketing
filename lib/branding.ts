export type BrandingAssetKind = "logo" | "favicon";

function hashString(value: string): string {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36);
}

export function getBrandingAssetUrl(kind: BrandingAssetKind, seed?: string): string {
  const version = seed && seed.trim() ? hashString(seed) : "default";
  return `/api/branding/${kind}?v=${version}`;
}
