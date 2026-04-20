"use client";

import { useEffect } from "react";
import { useAdmin } from "@/lib/AdminContext";

export function DynamicFavicon() {
  const { settings } = useAdmin();

  useEffect(() => {
    if (!settings.favicon) return;

    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    
    // Add version to bypass browser cache
    const version = Date.now();
    link.href = `${settings.favicon}?v=${version}`;

    // Update apple-touch-icon if exists
    const appleLink = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement;
    if (appleLink) {
      appleLink.href = `${settings.favicon}?v=${version}`;
    }
  }, [settings.favicon]);

  return null;
}
