"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isInternalAppPath } from "@/lib/app-paths";

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (isInternalAppPath(pathname)) return;

    const controller = new AbortController();

    fetch("/api/visitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
      signal: controller.signal,
    }).catch(() => null);

    return () => controller.abort();
  }, [pathname]);

  return null;
}
