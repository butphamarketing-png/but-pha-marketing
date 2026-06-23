export type BlogAnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackBlogEvent(eventName: string, params: BlogAnalyticsParams = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", eventName, params);
  } catch {
    // ignore analytics failures
  }
}
