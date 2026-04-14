"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useAdmin } from "@/lib/AdminContext";

function getPlatformFromPath(pathname: string) {
  if (pathname.startsWith("/facebook")) return "facebook";
  if (pathname.startsWith("/tiktok")) return "tiktok";
  if (pathname.startsWith("/instagram")) return "instagram";
  if (pathname.startsWith("/zalo")) return "zalo";
  if (pathname.startsWith("/google-maps")) return "googlemaps";
  if (pathname.startsWith("/website")) return "website";
  return "home";
}

export function AnimatedMascot() {
  const pathname = usePathname();
  const { settings } = useAdmin();
  const [open, setOpen] = useState(false);

  const platform = getPlatformFromPath(pathname);
  const color = settings.colors?.[platform] || settings.colors?.primary || "#7C3AED";
  const message = settings.mascotMessages?.[platform] || settings.mascotMessages?.home || "Chào bạn, hôm nay bứt phá doanh số nhé!";
  const hidden = useMemo(() => pathname.startsWith("/admin"), [pathname]);

  if (!settings.mascotEnabled || hidden) return null;

  return (
    <div className="fixed bottom-40 right-4 z-[93]">
      {open && (
        <div className="mb-2 max-w-[230px] rounded-xl border border-white/15 bg-black/75 px-3 py-2 text-xs text-white backdrop-blur-sm">
          {message}
        </div>
      )}
      <motion.button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen(prev => !prev)}
        animate={{ y: [0, -6, 0], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 text-2xl shadow-xl"
        style={{ background: `radial-gradient(circle at 30% 30%, ${color}, #1f1238)` }}
        aria-label="AI Mascot"
      >
        <span role="img" aria-label="dragon">🐉</span>
      </motion.button>
    </div>
  );
}
