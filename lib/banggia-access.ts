import type { BanggiaAttribution } from "@/lib/banggia-attribution";

export type BanggiaAccessMetadata = BanggiaAttribution & {
  kind: "banggia_access";
  source: "/banggia";
  accessedAt: string;
  lastAccessedAt?: string;
  ip: string | null;
  userAgent: string | null;
  referrer: string | null;
  device: string | null;
  browser: string | null;
  visitCount?: number;
};

export type BanggiaAccessPayload = {
  name: string;
  phone: string;
  referrer?: string | null;
  device?: string | null;
  browser?: string | null;
} & BanggiaAttribution;

export function buildBanggiaNote(
  metadata: Omit<BanggiaAccessMetadata, "kind" | "source"> & { source?: string },
  options?: { visitCount?: number; lastAccessedAt?: string },
): string {
  const payload: BanggiaAccessMetadata = {
    kind: "banggia_access",
    source: "/banggia",
    accessedAt: metadata.accessedAt,
    lastAccessedAt: options?.lastAccessedAt ?? metadata.accessedAt,
    ip: metadata.ip,
    userAgent: metadata.userAgent,
    referrer: metadata.referrer,
    device: metadata.device,
    browser: metadata.browser,
    utmSource: metadata.utmSource,
    utmMedium: metadata.utmMedium,
    utmCampaign: metadata.utmCampaign,
    gclid: metadata.gclid,
    fbclid: metadata.fbclid,
    visitCount: options?.visitCount ?? 1,
  };

  return JSON.stringify(payload);
}

export function parseBanggiaNote(note: string | null | undefined): BanggiaAccessMetadata | null {
  if (!note) return null;
  try {
    const parsed = JSON.parse(note) as BanggiaAccessMetadata;
    if (parsed?.kind === "banggia_access") return parsed;
  } catch {
    return null;
  }
  return null;
}

export function mergeBanggiaNote(
  existingNote: string | null | undefined,
  next: Omit<BanggiaAccessMetadata, "kind" | "source" | "visitCount">,
): string {
  const previous = parseBanggiaNote(existingNote);
  const visitCount = (previous?.visitCount ?? 0) + 1;

  return buildBanggiaNote(
    {
      ...next,
      accessedAt: previous?.accessedAt ?? next.accessedAt,
    },
    {
      visitCount,
      lastAccessedAt: next.accessedAt,
    },
  );
}

export const BANGGIA_SPAM_WINDOW_MS = 5 * 60 * 1000;
