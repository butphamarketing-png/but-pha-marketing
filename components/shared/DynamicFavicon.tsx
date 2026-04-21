"use client";

import { useEffect } from "react";
import { useAdmin } from "@/lib/AdminContext";
import { getBrandingAssetUrl } from "@/lib/branding";

export function DynamicFavicon() {
  const { settings } = useAdmin();

  useEffect(() => {
    const href = getBrandingAssetUrl("favicon", settings.favicon || settings.logo);

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
  }, [settings.favicon, settings.logo]);

  return null;
}
