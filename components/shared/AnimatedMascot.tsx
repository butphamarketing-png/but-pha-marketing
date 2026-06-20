"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { DEFAULT_MASCOT_IMAGE } from "@/lib/media-assets";
import { useAdmin } from "@/lib/AdminContext";
import { MessageSquare } from "lucide-react";

const QUICK_ACTION_DISMISS_KEY = "quick-action-dismissed";
const QUICK_ACTION_SCROLL_THRESHOLD = 300;
const QUICK_ACTION_CLOSE_ANCHOR_ID = "quick-action-close-anchor";
const MASCOT_PURPLE = "#7C3AED";

export { QUICK_ACTION_CLOSE_ANCHOR_ID };

function getPlatformFromPath(pathname: string) {
  if (pathname.startsWith("/facebook")) return "facebook";
  if (pathname.startsWith("/google-maps")) return "googlemaps";
  if (pathname.startsWith("/website")) return "website";
  if (pathname.startsWith("/gioi-thieu")) return "gioi_thieu";
  if (pathname.startsWith("/blog") || pathname.startsWith("/tin-tuc")) return "blog";
  if (pathname.startsWith("/lien-he")) return "lien_he";
  return "home";
}

function CompanyMascotGraphic({ mascotSrc }: { mascotSrc: string }) {
  return (
    <img
      src={mascotSrc}
      alt=""
      aria-hidden="true"
      className="h-[72px] w-[68px] object-contain md:h-[118px] md:w-[112px]"
      style={{
        filter: `drop-shadow(0 0 14px ${MASCOT_PURPLE}66) drop-shadow(0 5px 15px rgba(0,0,0,0.35))`,
      }}
    />
  );
}

export function AnimatedMascot() {
  const pathname = usePathname();
  const { settings } = useAdmin();
  const [mounted, setMounted] = useState(false);
  const [dockStyle, setDockStyle] = useState<React.CSSProperties>({
    position: "fixed",
    right: 12,
    left: "auto",
    bottom: 16,
    transform: "none",
    zIndex: 62,
  });
  const [open, setOpen] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [isShown, setIsShown] = useState(true);
  const [bursting, setBursting] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sectionSpeakCooldownRef = useRef(0);
  const lastSectionRef = useRef("");
  const clickCountRef = useRef(0);

  const platform = getPlatformFromPath(pathname);
  const mascotSrc =
    settings.mascotImages?.[platform]?.trim() ||
    settings.mascotImage?.trim() ||
    DEFAULT_MASCOT_IMAGE;
  const message =
    settings.mascotMessages?.[platform] || settings.mascotMessages?.home || "Chào bạn, hôm nay bứt phá doanh số nhé!";
  const audioUrl = settings.mascotAudioUrls?.[platform] || settings.mascotAudioUrls?.home || "";
  const hidden = useMemo(() => {
    return (
      pathname.startsWith("/adminbp") ||
      pathname.startsWith("/cms") ||
      pathname === "/admin"
    );
  }, [pathname]);
  const enabled = settings.mascotEnabled !== false && !hidden;
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

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const speakCute = (text: string) => {
    if (!("speechSynthesis" in window)) return Promise.resolve();
    if (!text.trim()) return Promise.resolve();

    setCurrentText(text);
    setOpen(true);

    const estimatedDuration = estimateSpeechDurationMs(text);
    window.speechSynthesis.cancel();

    return new Promise<void>((resolve) => {
      const utter = new SpeechSynthesisUtterance(text);
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        setOpen(false);
        resolve();
      };
      utter.lang = "vi-VN";
      utter.rate = 0.96;
      utter.pitch = 1.35;
      utter.onend = finish;
      utter.onerror = finish;
      const viVoice = window.speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase().startsWith("vi"));
      if (viVoice) utter.voice = viVoice;
      window.speechSynthesis.speak(utter);
      window.setTimeout(finish, estimatedDuration + 1200);
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!enabled || !isShown) return;

    const updateDock = () => {
      const mobile = window.innerWidth < 768;
      const dismissed = window.sessionStorage.getItem(QUICK_ACTION_DISMISS_KEY) === "1";
      const barVisible = mobile && !dismissed && window.scrollY > QUICK_ACTION_SCROLL_THRESHOLD;

      if (mobile && barVisible) {
        const anchor = document.getElementById(QUICK_ACTION_CLOSE_ANCHOR_ID);
        if (anchor) {
          const rect = anchor.getBoundingClientRect();
          setDockStyle({
            position: "fixed",
            left: rect.left + rect.width / 2,
            right: "auto",
            bottom: Math.max(0, window.innerHeight - rect.top + 8),
            transform: "translateX(-50%)",
            zIndex: 62,
            width: "max-content",
          });
          return;
        }
      }

      setDockStyle({
        position: "fixed",
        right: mobile ? 12 : 32,
        left: "auto",
        bottom: mobile
          ? "max(1rem, calc(1rem + env(safe-area-inset-bottom, 0px)))"
          : "max(2rem, calc(2rem + env(safe-area-inset-bottom, 0px)))",
        transform: "none",
        zIndex: 62,
        width: "max-content",
      });
    };

    updateDock();
    window.addEventListener("scroll", updateDock, { passive: true });
    window.addEventListener("resize", updateDock);
    window.addEventListener("quick-action-bar-change", updateDock);

    return () => {
      window.removeEventListener("scroll", updateDock);
      window.removeEventListener("resize", updateDock);
      window.removeEventListener("quick-action-bar-change", updateDock);
    };
  }, [enabled, isShown, pathname]);

  useEffect(() => {
    if (!enabled || !isShown) return;

    const timer = window.setTimeout(() => {
      speakCute(message);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [pathname, enabled, isShown, message]);

  useEffect(() => {
    if (!enabled || !isShown) return;

    const onMascotAlert = (event: Event) => {
      const custom = event as CustomEvent<{ message?: string; durationMs?: number }>;
      const alertMessage = custom.detail?.message || "Bạn nhập sai rồi, nhập lại giúp mình nhé!";
      const durationMs = custom.detail?.durationMs ?? 5000;

      setOpen(true);
      speakCute(alertMessage);
      window.setTimeout(() => {
        stopSpeaking();
      }, durationMs);
    };

    const onSectionChange = (event: Event) => {
      const custom = event as CustomEvent<{ sectionId?: string; sectionLabel?: string }>;
      const sectionId = custom.detail?.sectionId || "";
      if (!sectionId) return;
      if (lastSectionRef.current === sectionId) return;

      const now = Date.now();
      if (now - sectionSpeakCooldownRef.current < 2500) return;

      lastSectionRef.current = sectionId;
      sectionSpeakCooldownRef.current = now;

      const text = sectionMessages[sectionId] || `Bạn đang xem phần ${custom.detail?.sectionLabel || sectionId}`;
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

    window.addEventListener("mascot-alert", onMascotAlert as EventListener);
    window.addEventListener("mascot-section-change", onSectionChange as EventListener);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("mascot-alert", onMascotAlert as EventListener);
      window.removeEventListener("mascot-section-change", onSectionChange as EventListener);
      window.removeEventListener("keydown", onKeyDown);
      stopSpeaking();
    };
  }, [enabled, isShown, sectionMessages]);

  if (!enabled || !mounted) return null;

  const mascotNode = (
    <>
      {isShown && (
        <div data-mascot="dragon" style={dockStyle}>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="absolute bottom-full left-1/2 mb-2 w-max max-w-[260px] -translate-x-1/2 rounded-2xl border border-white/15 bg-black/80 px-4 py-3 text-sm font-medium text-white backdrop-blur-md shadow-2xl"
              >
                <div className="relative">
                  <MessageSquare size={12} className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-black/80" />
                  {currentText || message}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
                  className="absolute h-3 w-3 rounded-full bg-violet-300/90"
                />
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => {
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
            className="flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            aria-label="Linh vật Bứt Phá Marketing"
          >
            <CompanyMascotGraphic mascotSrc={mascotSrc} />
          </button>
        </div>
      )}
    </>
  );

  return createPortal(mascotNode, document.body);
}
