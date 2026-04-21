"use client";

import { useEffect } from "react";
import { useAdmin } from "@/lib/AdminContext";

export function DynamicFavicon() {
  const { settings } = useAdmin();

  useEffect(() => {
    if (!settings.favicon) return;

    const href = settings.favicon.startsWith("data:")
      ? settings.favicon
      : `${settings.favicon}${settings.favicon.includes("?") ? "&" : "?"}v=${Date.now()}`;

    const ensureIconLink = (rel: string) => {
      let link = document.querySelector(`link[rel='${rel}']`) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    ensureIconLink("icon");
    ensureIconLink("shortcut icon");
    ensureIconLink("apple-touch-icon");
  }, [settings.favicon]);

  return null;
}
