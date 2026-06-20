"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
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

type MascotPalette = {
  bodyTop: string;
  bodyMid: string;
  bodyBottom: string;
  shell: string;
  bellyTop: string;
  bellyBottom: string;
  accent: string;
  accentDark: string;
  stroke: string;
  eye: string;
  highlight: string;
};

function buildMascotPalette(): MascotPalette {
  return {
    bodyTop: MASCOT_PURPLE,
    bodyMid: MASCOT_PURPLE,
    bodyBottom: MASCOT_PURPLE,
    shell: MASCOT_PURPLE,
    bellyTop: MASCOT_PURPLE,
    bellyBottom: MASCOT_PURPLE,
    accent: MASCOT_PURPLE,
    accentDark: MASCOT_PURPLE,
    stroke: MASCOT_PURPLE,
    eye: MASCOT_PURPLE,
    highlight: MASCOT_PURPLE,
  };
}

function DefaultMascotGraphic({
  animate,
  glowColor,
  palette,
}: {
  animate: boolean;
  glowColor: string;
  palette: MascotPalette;
}) {
  const svgClassName = animate ? "mascot-default-wave" : "";
  const eyeClassName = animate ? "mascot-default-blink" : "";

  return (
    <>
      <svg
        width="128"
        height="128"
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${svgClassName} h-[72px] w-[68px] md:h-[118px] md:w-[112px]`}
        style={{
          filter: `drop-shadow(0 0 15px ${glowColor}44) drop-shadow(0 5px 15px rgba(0,0,0,0.5))`,
          transformBox: "fill-box",
          transformOrigin: "center bottom",
        }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient
            id="body"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(54 33) rotate(48) scale(82 78)"
          >
            <stop stopColor={palette.bodyTop} />
            <stop offset="0.55" stopColor={palette.bodyMid} />
            <stop offset="1" stopColor={palette.bodyBottom} />
          </radialGradient>
          <linearGradient id="belly" x1="64" y1="78" x2="64" y2="111" gradientUnits="userSpaceOnUse">
            <stop stopColor={palette.bellyTop} />
            <stop offset="1" stopColor={palette.bellyBottom} />
          </linearGradient>
        </defs>
        <ellipse cx="64" cy="117" rx="30" ry="7" fill="#000" fillOpacity="0.22" />
        <path
          d="M26 78C26 55 43 36 64 36C85 36 102 55 102 78C102 99 85 116 64 116C43 116 26 99 26 78Z"
          fill="url(#body)"
        />
        <path d="M44 61C44 47 53 34 64 34C75 34 84 47 84 61V68H44V61Z" fill={palette.shell} />
        <g className={eyeClassName} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <ellipse cx="51.5" cy="69" rx="11.5" ry="12" fill="#5B21B6" />
          <ellipse cx="53.5" cy="67" rx="5.8" ry="6.2" fill="#DDD6FE" />
          <circle cx="55.4" cy="68.2" r="2.3" fill="#5B21B6" />
        </g>
        <g className={eyeClassName} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <ellipse cx="76.5" cy="69" rx="11.5" ry="12" fill="#5B21B6" />
          <ellipse cx="78.5" cy="67" rx="5.8" ry="6.2" fill="#DDD6FE" />
          <circle cx="80.4" cy="68.2" r="2.3" fill="#5B21B6" />
        </g>
        <path d="M58 80C60.4 83.1 67.6 83.1 70 80" stroke={palette.stroke} strokeWidth="3" strokeLinecap="round" />
        <path d="M43 96C45 88 51 82.6 57.8 82.6H70.2C77 82.6 83 88 85 96L81.5 103.5H46.5L43 96Z" fill="url(#belly)" />
        <path d="M37 58L26.5 48L35.3 44.5L43.5 52L37 58Z" fill={palette.accent} />
        <path d="M91 58L101.5 48L92.7 44.5L84.5 52L91 58Z" fill={palette.accent} />
        <path d="M33 91C25 87 19 80 18 73.5C24.8 76.8 30.5 80.8 35 86L33 91Z" fill={palette.accentDark} />
        <path d="M95 91C103 87 109 80 110 73.5C103.2 76.8 97.5 80.8 93 86L95 91Z" fill={palette.accentDark} />
        <path d="M42 108L29 115" stroke={palette.accent} strokeWidth="6" strokeLinecap="round" />
        <path d="M86 108L99 115" stroke={palette.accent} strokeWidth="6" strokeLinecap="round" />
        <circle cx="46.8" cy="51.5" r="1.8" fill={palette.highlight} />
        <circle cx="57.8" cy="47" r="1.8" fill={palette.highlight} />
        <circle cx="69.8" cy="47" r="1.8" fill={palette.highlight} />
        <circle cx="80.8" cy="51.5" r="1.8" fill={palette.highlight} />
        <ellipse cx="45" cy="78.5" rx="3.6" ry="2.2" fill={palette.highlight} fillOpacity="0.75" />
        <ellipse cx="83" cy="78.5" rx="3.6" ry="2.2" fill={palette.highlight} fillOpacity="0.75" />
      </svg>

      <style>{`
        .mascot-default-wave {
          animation: mascot-default-wave 4s linear infinite;
        }

        .mascot-default-blink {
          animation: mascot-default-blink 4s linear infinite;
        }

        @keyframes mascot-default-blink {
          0%,
          49%,
          56%,
          100% {
            transform: scaleY(1);
          }

          50%,
          55% {
            transform: scaleY(0.12);
          }
        }

        @keyframes mascot-default-wave {
          0%,
          75% {
            transform: translateY(0) rotate(0deg);
          }

          82% {
            transform: translateY(-1px) rotate(-3deg);
          }

          88% {
            transform: translateY(-2px) rotate(6deg);
          }

          94% {
            transform: translateY(-1px) rotate(-4deg);
          }

          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
      `}</style>
    </>
  );
}

export function AnimatedMascot() {
  const pathname = usePathname();
  const { settings } = useAdmin();
  const [mounted, setMounted] = useState(false);
  const [dockStyle, setDockStyle] = useState<React.CSSProperties>({
    position: "fixed",
    right: 12,
    bottom: 16,
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
  const mascotGlowColor = MASCOT_PURPLE;
  const mascotPalette = useMemo(() => buildMascotPalette(), []);
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
        bottom: mobile
          ? "max(1rem, calc(1rem + env(safe-area-inset-bottom, 0px)))"
          : "max(2rem, calc(2rem + env(safe-area-inset-bottom, 0px)))",
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
                  className="absolute h-3 w-3 rounded-full bg-cyan-300/90"
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
            className="flex h-[72px] w-[68px] md:h-[118px] md:w-[112px] items-center justify-center transition-transform hover:scale-105 active:scale-95"
            aria-label="AI Mascot"
          >
            <div
              className="relative"
              style={{
                filter: `drop-shadow(0 0 14px ${mascotGlowColor}66)`,
              }}
            >
              <DefaultMascotGraphic animate={false} glowColor={mascotGlowColor} palette={mascotPalette} />
            </div>
          </button>
        </div>
      )}
    </>
  );

  return createPortal(mascotNode, document.body);
}
