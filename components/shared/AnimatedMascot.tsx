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
  const velocityRef = useRef({ x: 1.05, y: 0.95 });
  const lastVelocityRef = useRef({ x: 1.05, y: 0.95 });
  const frameRef = useRef<number | null>(null);
  const holdingRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const platform = getPlatformFromPath(pathname);
  const message = settings.mascotMessages?.[platform] || settings.mascotMessages?.home || "Chào bạn, hôm nay bứt phá doanh số nhé!";
  const audioUrl = settings.mascotAudioUrls?.[platform] || settings.mascotAudioUrls?.home || "";
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
      if (holdingRef.current) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }
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
      const elem = document.elementFromPoint(x + width / 2, y + height / 2) as HTMLElement | null;
      if (elem && !elem.closest("[data-mascot='dragon']") && !["HTML", "BODY"].includes(elem.tagName)) {
        v.x = -v.x * 0.95 + (Math.random() - 0.5) * 0.6;
        v.y = -v.y * 0.95 + (Math.random() - 0.5) * 0.6;
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
      if (dist < 120 && !holdingRef.current) {
        velocityRef.current.x += (dx / dist) * 0.35;
        velocityRef.current.y += (dy / dist) * 0.35;
      }
    };

    const onMouseMove = (e: MouseEvent) => repelFromPoint(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) repelFromPoint(t.clientX, t.clientY);
    };
    const stopSpeaking = () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
    const onPointerUp = () => {
      holdingRef.current = false;
      velocityRef.current = { ...lastVelocityRef.current };
      stopSpeaking();
    };
    const onMascotAlert = (event: Event) => {
      const custom = event as CustomEvent<{ message?: string; durationMs?: number }>;
      const alertMessage = custom.detail?.message || "Bạn nhập sai rồi, nhập lại giúp mình nhé!";
      const durationMs = custom.detail?.durationMs ?? 5000;
      holdingRef.current = true;
      setOpen(true);
      lastVelocityRef.current = { ...velocityRef.current };
      velocityRef.current = { x: 0, y: 0 };

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(alertMessage);
        utter.lang = "vi-VN";
        utter.rate = 1;
        utter.pitch = 1.08;
        window.speechSynthesis.speak(utter);
      }
      window.setTimeout(() => {
        holdingRef.current = false;
        velocityRef.current = { ...lastVelocityRef.current };
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
      }, durationMs);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("mascot-alert", onMascotAlert as EventListener);
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("mascot-alert", onMascotAlert as EventListener);
      stopSpeaking();
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
        onPointerDown={() => {
          setOpen(true);
          holdingRef.current = true;
          lastVelocityRef.current = { ...velocityRef.current };
          velocityRef.current = { x: 0, y: 0 };
          if (audioUrl) {
            if (!audioRef.current) {
              audioRef.current = new Audio(audioUrl);
            } else {
              audioRef.current.src = audioUrl;
            }
            audioRef.current.loop = true;
            audioRef.current.play().catch(() => {});
          } else if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(message);
            utter.lang = "vi-VN";
            utter.rate = 1;
            utter.pitch = 1.08;
            window.speechSynthesis.speak(utter);
          }
        }}
        animate={{ y: [0, -7, 0], rotate: [0, 4, -4, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-[78px] w-[78px] items-center justify-center rounded-full border border-pink-200/40 bg-gradient-to-br from-white/30 via-orange-100/20 to-pink-200/15 shadow-[0_10px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm"
        aria-label="AI Mascot"
      >
        <img
          src="/mascot-dragon.svg"
          alt="Linh vật rồng"
          className="h-[70px] w-[70px] object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]"
          style={{ filter: dragonStyle.filter, transform: `scale(${dragonStyle.scale})` }}
        />
      </motion.button>
    </div>
  );
}
