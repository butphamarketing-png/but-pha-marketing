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
  const [isShown, setIsShown] = useState(true);
  const [bursting, setBursting] = useState(false);
  const [pos, setPos] = useState({ x: 220, y: 240 });
  const velocityRef = useRef({ x: 0.55, y: 0.48 });
  const lastVelocityRef = useRef({ x: 0.55, y: 0.48 });
  const frameRef = useRef<number | null>(null);
  const holdingRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sectionSpeakCooldownRef = useRef(0);
  const lastSectionRef = useRef("");
  const clickCountRef = useRef(0);

  const platform = getPlatformFromPath(pathname);
  const message = settings.mascotMessages?.[platform] || settings.mascotMessages?.home || "Chào bạn, hôm nay bứt phá doanh số nhé!";
  const audioUrl = settings.mascotAudioUrls?.[platform] || settings.mascotAudioUrls?.home || "";
  const hidden = useMemo(() => pathname.startsWith("/admin"), [pathname]);
  const enabled = settings.mascotEnabled !== false && !hidden;
  const platformColor = settings.colors?.[platform] || settings.colors?.primary || "#7C3AED";
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
  const sectionMessages = useMemo(
    () => settings.mascotSectionMessages?.[platform] || settings.mascotSectionMessages?.home || {},
    [platform, settings.mascotSectionMessages],
  );
  const clickMessages = useMemo(
    () => settings.mascotClickMessages?.[platform] || settings.mascotClickMessages?.home || [],
    [platform, settings.mascotClickMessages],
  );

  const estimateSpeechDurationMs = (text: string) => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1300, Math.min(9000, words * 430 + 450));
  };

  const speakCute = (text: string) => {
    if (!("speechSynthesis" in window)) return Promise.resolve();
    if (!text.trim()) return Promise.resolve();
    const estimatedDuration = estimateSpeechDurationMs(text);
    window.speechSynthesis.cancel();
    return new Promise<void>((resolve) => {
      const utter = new SpeechSynthesisUtterance(text);
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        resolve();
      };
      utter.lang = "vi-VN";
      utter.rate = 0.96;
      utter.pitch = 1.35;
      utter.onend = finish;
      utter.onerror = finish;
      const viVoice = window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith("vi"));
      if (viVoice) utter.voice = viVoice;
      window.speechSynthesis.speak(utter);
      window.setTimeout(finish, estimatedDuration + 1200);
    });
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (!enabled) return;
    if (!isShown) return;
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
      setPos({ x, y });
      frameRef.current = requestAnimationFrame(tick);
    };

    const onPointerUp = () => {
      if (!holdingRef.current) return;
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

      speakCute(alertMessage);
      window.setTimeout(() => {
        holdingRef.current = false;
        velocityRef.current = { ...lastVelocityRef.current };
        stopSpeaking();
      }, durationMs);
    };
    const onSectionChange = (event: Event) => {
      if (holdingRef.current) return;
      const custom = event as CustomEvent<{ sectionId?: string; sectionLabel?: string }>;
      const sectionId = custom.detail?.sectionId || "";
      if (!sectionId) return;
      if (lastSectionRef.current === sectionId) return;
      const now = Date.now();
      if (now - sectionSpeakCooldownRef.current < 2200) return;
      lastSectionRef.current = sectionId;
      sectionSpeakCooldownRef.current = now;
      const text =
        sectionMessages[sectionId] ||
        `Đây là phần ${custom.detail?.sectionLabel?.toLowerCase() || sectionId}`;
      speakCute(text);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key.toLowerCase() === "d") {
        event.preventDefault();
        if (isShown) {
          setBursting(true);
          window.setTimeout(() => {
            setIsShown(false);
            setBursting(false);
            stopSpeaking();
            clickCountRef.current = 0;
          }, 420);
        } else {
          clickCountRef.current = 0;
          setIsShown(true);
        }
      }
    };

    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("mascot-alert", onMascotAlert as EventListener);
    window.addEventListener("mascot-section-change", onSectionChange as EventListener);
    window.addEventListener("keydown", onKeyDown);
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("mascot-alert", onMascotAlert as EventListener);
      window.removeEventListener("mascot-section-change", onSectionChange as EventListener);
      window.removeEventListener("keydown", onKeyDown);
      stopSpeaking();
    };
  }, [pathname, enabled, isShown, sectionMessages]);

  if (!enabled) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (isShown) {
            setBursting(true);
            window.setTimeout(() => {
              setIsShown(false);
              setBursting(false);
              stopSpeaking();
              clickCountRef.current = 0;
            }, 420);
          } else {
            clickCountRef.current = 0;
            setIsShown(true);
          }
        }}
        className="fixed left-3 top-1/2 z-[94] -translate-y-1/2 rounded-full border border-white/20 bg-black/50 px-3 py-2 text-xs font-semibold text-white backdrop-blur"
        title="Bật/tắt rồng (Shift + D)"
      >
        {isShown ? "Ẩn rồng" : "Hiện rồng"}
      </button>

      {isShown && (
        <div className="fixed z-[93]" style={{ left: pos.x, top: pos.y }} data-mascot="dragon">
          {open && (
            <div className="absolute -top-14 left-1/2 mb-2 w-max max-w-[230px] -translate-x-1/2 rounded-xl border border-white/15 bg-black/75 px-3 py-2 text-xs text-white backdrop-blur-sm">
              {message}
            </div>
          )}

          {bursting && (
            <div className="pointer-events-none absolute left-1/2 top-1/2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
                  animate={{
                    x: Math.cos((i / 6) * Math.PI * 2) * 42,
                    y: Math.sin((i / 6) * Math.PI * 2) * 42,
                    opacity: 0,
                    scale: 1.25,
                  }}
                  transition={{ duration: 0.38 }}
                  className="absolute h-3 w-3 rounded-full bg-cyan-300/90"
                />
              ))}
            </div>
          )}

          <motion.button
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onClick={() => {
              setOpen(true);
              holdingRef.current = true;
              lastVelocityRef.current = { ...velocityRef.current };
              velocityRef.current = { x: 0, y: 0 };
              clickCountRef.current += 1;
              const idx = clickCountRef.current - 1;
              const clickLine = clickMessages[idx];
              const lineToSpeak = clickLine || message;
              const speechDone = speakCute(lineToSpeak);
              const audioDone = new Promise<void>((resolve) => {
                if (!audioUrl || idx !== 0) {
                  resolve();
                  return;
                }
                if (!audioRef.current) audioRef.current = new Audio(audioUrl);
                else audioRef.current.src = audioUrl;
                audioRef.current.loop = false;
                audioRef.current.onended = () => resolve();
                audioRef.current.onerror = () => resolve();
                audioRef.current.play().catch(() => resolve());
              });

              Promise.all([speechDone, audioDone]).then(() => {
                holdingRef.current = false;
                velocityRef.current = { ...lastVelocityRef.current };
                stopSpeaking();
              });

              if (clickMessages.length > 0 && clickCountRef.current >= clickMessages.length) {
                Promise.all([speechDone, audioDone]).then(() => {
                  setBursting(true);
                  window.setTimeout(() => {
                    setIsShown(false);
                    setBursting(false);
                    clickCountRef.current = 0;
                  }, 420);
                });
              }
            }}
            animate={{ y: [0, -4, 0], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-[78px] w-[78px] items-center justify-center rounded-full border shadow-[0_10px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm"
            style={{
              borderColor: `${platformColor}99`,
              background: `radial-gradient(circle at 30% 30%, ${platformColor}66, rgba(255,255,255,0.16), rgba(0,0,0,0.28))`,
            }}
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
      )}
    </>
  );
}
