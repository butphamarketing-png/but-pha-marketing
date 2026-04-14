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
  const dragonStyleMap: Record<string, { filter: string; scale: number }> = {
    home: { filter: "none", scale: 1 },
    facebook: { filter: "hue-rotate(190deg) saturate(1.05)", scale: 0.98 },
    tiktok: { filter: "hue-rotate(300deg) saturate(1.15)", scale: 1.02 },
    instagram: { filter: "hue-rotate(250deg) saturate(1.2)", scale: 1 },
    zalo: { filter: "hue-rotate(170deg) saturate(1.1)", scale: 0.99 },
    googlemaps: { filter: "hue-rotate(330deg) saturate(1.1)", scale: 1.01 },
    website: { filter: "hue-rotate(90deg) saturate(1.08)", scale: 1 },
  };
  const dragonStyle = dragonStyleMap[platform] || dragonStyleMap.home;

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
        animate={{ x: [0, 6, -6, 0], y: [0, -9, 0, -4, 0], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 shadow-xl"
        style={{ background: `radial-gradient(circle at 30% 30%, ${color}, #1f1238)` }}
        aria-label="AI Mascot"
      >
        <img
          src="/api/mascot-image"
          alt="Linh vật rồng"
          className="h-14 w-14 object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)]"
          style={{ filter: dragonStyle.filter, transform: `scale(${dragonStyle.scale})` }}
        />
      </motion.button>
    </div>
  );
}
