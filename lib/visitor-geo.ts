import { isPrivateOrLocalIp } from "@/lib/visitor-request";
import type { VisitorGeo } from "@/lib/visitor-types";

const EMPTY_GEO: VisitorGeo = {
  city: null,
  region: null,
  country: null,
  countryCode: null,
};

function countryCodeToName(code: string | null) {
  if (!code || code === "XX") return null;
  try {
    return new Intl.DisplayNames(["vi"], { type: "region" }).of(code.toUpperCase()) || code;
  } catch {
    return code;
  }
}

/** Ưu tiên header Cloudflare (miễn phí, chính xác hơn khi site qua CF). */
export function resolveGeoFromRequest(request: Request): VisitorGeo | null {
  const countryCode =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    null;
  if (!countryCode || countryCode === "XX") return null;

  const city =
    request.headers.get("cf-ipcity") ||
    request.headers.get("x-vercel-ip-city") ||
    null;
  const region =
    request.headers.get("cf-region") ||
    request.headers.get("x-vercel-ip-country-region") ||
    null;

  return {
    city: city?.trim() || null,
    region: region?.trim() || null,
    countryCode: countryCode.toUpperCase(),
    country: countryCodeToName(countryCode),
  };
}

/** Fallback: ip-api.com (chỉ gọi server-side, 1 lần / IP). */
export async function lookupGeoByIp(ip: string): Promise<VisitorGeo> {
  if (isPrivateOrLocalIp(ip)) return EMPTY_GEO;

  try {
    const url = `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,countryCode,regionName,city`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return EMPTY_GEO;

    const data = (await res.json()) as {
      status?: string;
      country?: string;
      countryCode?: string;
      regionName?: string;
      city?: string;
    };

    if (data.status !== "success") return EMPTY_GEO;

    return {
      city: data.city?.trim() || null,
      region: data.regionName?.trim() || null,
      country: data.country?.trim() || null,
      countryCode: data.countryCode?.trim().toUpperCase() || null,
    };
  } catch {
    return EMPTY_GEO;
  }
}

export async function resolveVisitorGeo(
  request: Request,
  ip: string,
  existing: VisitorGeo | null,
): Promise<VisitorGeo> {
  if (existing?.countryCode || existing?.city) {
    return existing;
  }

  const fromHeaders = resolveGeoFromRequest(request);
  if (fromHeaders?.countryCode) {
    return fromHeaders;
  }

  return lookupGeoByIp(ip);
}

export function formatVisitorLocation(session: Pick<VisitorGeo, "city" | "region" | "country" | "countryCode">) {
  const parts = [session.city, session.region, session.country || session.countryCode].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "Không xác định";
}
