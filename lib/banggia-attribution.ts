const STORAGE_PREFIX = "banggia_attr_";

const TRACKED_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "gclid",
  "fbclid",
] as const;

export type BanggiaAttribution = {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  gclid: string | null;
  fbclid: string | null;
};

function readStored(key: string): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(`${STORAGE_PREFIX}${key}`);
}

function writeStored(key: string, value: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(`${STORAGE_PREFIX}${key}`, value);
}

/** Lưu UTM / click id từ URL vào session — giữ qua reload trang /banggia */
export function captureBanggiaAttribution() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  for (const key of TRACKED_KEYS) {
    const value = params.get(key)?.trim();
    if (value) writeStored(key, value);
  }
}

export function getBanggiaAttribution(): BanggiaAttribution {
  return {
    utmSource: readStored("utm_source"),
    utmMedium: readStored("utm_medium"),
    utmCampaign: readStored("utm_campaign"),
    gclid: readStored("gclid"),
    fbclid: readStored("fbclid"),
  };
}

export function getBanggiaClientContext() {
  if (typeof window === "undefined") {
    return {
      referrer: null as string | null,
      device: "Unknown" as const,
      browser: "Unknown",
    };
  }

  const ua = navigator.userAgent;
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
  const isTablet = /iPad|Tablet/i.test(ua);

  let browser = "Unknown";
  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) browser = "Chrome";
  else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = "Safari";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";
  else if (/OPR\//i.test(ua)) browser = "Opera";

  return {
    referrer: document.referrer || null,
    device: isTablet ? ("Tablet" as const) : isMobile ? ("Mobile" as const) : ("Desktop" as const),
    browser,
  };
}
