"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const [pos, setPos] = useState({ x: 220, y: 260 });
  const velocityRef = useRef({ x: 2.3, y: 2.1 });
  const frameRef = useRef<number | null>(null);

  const platform = getPlatformFromPath(pathname);
  const message = settings.mascotMessages?.[platform] || settings.mascotMessages?.home || "Chào bạn, hôm nay bứt phá doanh số nhé!";
  const hidden = useMemo(() => pathname.startsWith("/admin"), [pathname]);
  const enabled = settings.mascotEnabled !== false && !hidden;
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

  useEffect(() => {
    if (!enabled) return;
    const width = 76;
    const height = 76;
    let x = Math.max(20, window.innerWidth - 200);
    let y = Math.max(140, window.innerHeight - 300);
    setPos({ x, y });

    const tick = () => {
      const v = velocityRef.current;
      x += v.x;
      y += v.y;
      const minX = 6;
      const minY = 88;
      const maxX = window.innerWidth - width - 6;
      const maxY = window.innerHeight - height - 6;
      if (x <= minX || x >= maxX) {
        v.x *= -1;
        x = Math.max(minX, Math.min(maxX, x));
      }
      if (y <= minY || y >= maxY) {
        v.y *= -1;
        y = Math.max(minY, Math.min(maxY, y));
      }
      setPos({ x, y });
      frameRef.current = requestAnimationFrame(tick);
    };

    const repelFromPoint = (px: number, py: number) => {
      const cx = x + width / 2;
      const cy = y + height / 2;
      const dx = cx - px;
      const dy = cy - py;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < 120) {
        velocityRef.current.x += (dx / dist) * 0.9;
        velocityRef.current.y += (dy / dist) * 0.9;
      }
    };

    const onMouseMove = (e: MouseEvent) => repelFromPoint(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) repelFromPoint(t.clientX, t.clientY);
    };
    const onScroll = () => {
      const elem = document.elementFromPoint(x + width / 2, y + height / 2);
      if (elem && !elem.closest("[data-mascot='dragon']")) {
        velocityRef.current.x += (Math.random() - 0.5) * 3;
        velocityRef.current.y += (Math.random() - 0.5) * 3;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname, enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed z-[93]" style={{ left: pos.x, top: pos.y }} data-mascot="dragon">
      {open && (
        <div className="absolute -top-14 left-1/2 mb-2 w-max max-w-[230px] -translate-x-1/2 rounded-xl border border-white/15 bg-black/75 px-3 py-2 text-xs text-white backdrop-blur-sm">
          {message}
        </div>
      )}
      <motion.button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => {
          setOpen(true);
          if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(message);
            utter.lang = "vi-VN";
            utter.rate = 1;
            utter.pitch = 1.1;
            window.speechSynthesis.speak(utter);
          }
        }}
        animate={{ y: [0, -7, 0], rotate: [0, 4, -4, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-[76px] w-[76px] items-center justify-center rounded-full border border-white/20 bg-black/20 shadow-xl backdrop-blur-sm"
        aria-label="AI Mascot"
      >
        <img
          src="/mascot-dragon.svg"
          alt="Linh vật rồng"
          className="h-[68px] w-[68px] object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.5)]"
          style={{ filter: dragonStyle.filter, transform: `scale(${dragonStyle.scale})` }}
        />
      </motion.button>
    </div>
  );
}
