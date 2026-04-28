"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useAdmin } from "@/lib/AdminContext";
import { Bot, EyeOff, MessageSquare } from "lucide-react";

function getPlatformFromPath(pathname: string) {
  if (pathname.startsWith("/facebook")) return "facebook";
  if (pathname.startsWith("/tiktok")) return "tiktok";
  if (pathname.startsWith("/instagram")) return "instagram";
  if (pathname.startsWith("/zalo")) return "zalo";
  if (pathname.startsWith("/google-maps")) return "googlemaps";
  if (pathname.startsWith("/website")) return "website";
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

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const normalized = clean.length === 3 ? clean.split("").map((char) => char + char).join("") : clean;
  const value = Number.parseInt(normalized, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((value) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0"))
    .join("")}`;
}

function mixHex(base: string, target: string, amount: number) {
  const a = hexToRgb(base);
  const b = hexToRgb(target);
  return rgbToHex(
    a.r + (b.r - a.r) * amount,
    a.g + (b.g - a.g) * amount,
    a.b + (b.b - a.b) * amount,
  );
}

function buildMascotPalette(platformColor: string, platform: string): MascotPalette {
  if (platform === "home") {
    return {
      bodyTop: "#A78BFA",
      bodyMid: "#7C3AED",
      bodyBottom: "#4C1D95",
      shell: "#8B5CF6",
      bellyTop: "#F5F3FF",
      bellyBottom: "#EDE9FE",
      accent: "#6D28D9",
      accentDark: "#7C3AED",
      stroke: "#4C1D95",
      eye: "#1E1B4B",
      highlight: "#DDD6FE",
    };
  }

  const base = platformColor.startsWith("#") ? platformColor : "#3B82F6";
  return {
    bodyTop: mixHex(base, "#FFFFFF", 0.55),
    bodyMid: base,
    bodyBottom: mixHex(base, "#000000", 0.32),
    shell: mixHex(base, "#FFFFFF", 0.42),
    bellyTop: mixHex(base, "#FFFFFF", 0.92),
    bellyBottom: mixHex(base, "#FFFFFF", 0.8),
    accent: mixHex(base, "#000000", 0.08),
    accentDark: mixHex(base, "#000000", 0.22),
    stroke: mixHex(base, "#000000", 0.35),
    eye: "#0F172A",
    highlight: mixHex(base, "#FFFFFF", 0.82),
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
        className={svgClassName}
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
          <ellipse cx="51.5" cy="69" rx="11.5" ry="12" fill={palette.eye} />
          <ellipse cx="53.5" cy="67" rx="5.8" ry="6.2" fill="#FFF" />
          <circle cx="55.4" cy="68.2" r="2.3" fill={palette.eye} />
        </g>
        <g className={eyeClassName} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <ellipse cx="76.5" cy="69" rx="11.5" ry="12" fill={palette.eye} />
          <ellipse cx="78.5" cy="67" rx="5.8" ry="6.2" fill="#FFF" />
          <circle cx="80.4" cy="68.2" r="2.3" fill={palette.eye} />
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

function RobotMascotGraphic({
  animate,
  glowColor,
  filter,
  scale,
}: {
  animate: boolean;
  glowColor: string;
  filter: string;
  scale: number;
}) {
  return (
    <>
      <div
        className={animate ? "mascot-robot-shell mascot-robot-sway" : "mascot-robot-shell"}
        style={{
          filter: `${filter} drop-shadow(0 0 18px ${glowColor}55) drop-shadow(0 8px 16px rgba(0,0,0,0.45))`,
          transform: `scale(${scale})`,
          transformOrigin: "center bottom",
        }}
        aria-hidden="true"
      >
        <img src="/mascot-home.png" alt="" className="h-[118px] w-[118px] object-contain select-none" draggable="false" />
      </div>

      <style>{`
        .mascot-robot-shell {
          position: relative;
          width: 118px;
          height: 118px;
        }

        .mascot-robot-sway {
          animation: mascot-robot-sway 4s ease-in-out infinite;
        }

        @keyframes mascot-robot-sway {
          0%,
          74% {
            transform: translateY(0) rotate(0deg) scale(${scale});
          }

          82% {
            transform: translateY(-1px) rotate(-5deg) scale(${scale});
          }

          88% {
            transform: translateY(-2px) rotate(6deg) scale(${scale});
          }

          94% {
            transform: translateY(-1px) rotate(-4deg) scale(${scale});
          }

          100% {
            transform: translateY(0) rotate(0deg) scale(${scale});
          }
        }
      `}</style>
    </>
  );
}

export function AnimatedMascot() {
  const pathname = usePathname();
  const { settings } = useAdmin();
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [isShown, setIsShown] = useState(true);
  const [bursting, setBursting] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [pos, setPos] = useState({ x: 220, y: 240 });
  const [flightPath, setFlightPath] = useState<{ x: number[]; y: number[] }>({
    x: [220, 220, 220, 220, 220],
    y: [240, 240, 240, 240, 240],
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sectionSpeakCooldownRef = useRef(0);
  const lastSectionRef = useRef("");
  const clickCountRef = useRef(0);

  const platform = getPlatformFromPath(pathname);
  const message =
    settings.mascotMessages?.[platform] || settings.mascotMessages?.home || "Chào bạn, hôm nay bứt phá doanh số nhé!";
  const audioUrl = settings.mascotAudioUrls?.[platform] || settings.mascotAudioUrls?.home || "";
  const hidden = useMemo(() => pathname.startsWith("/admin"), [pathname]);
  const enabled = settings.mascotEnabled !== false && !hidden;
  const mascotGlowColor = settings.colors?.[platform] || settings.colors?.primary || "#7C3AED";
  const mascotPalette = useMemo(
    () => buildMascotPalette(mascotGlowColor, platform),
    [mascotGlowColor, platform],
  );
  const sectionMessages = useMemo(
    () => settings.mascotSectionMessages?.[platform] || settings.mascotSectionMessages?.home || {},
    [platform, settings.mascotSectionMessages],
  );
  const clickMessages = useMemo(
    () => settings.mascotClickMessages?.[platform] || settings.mascotClickMessages?.home || [],
    [platform, settings.mascotClickMessages],
  );
  const mascotImg = settings.mascotImages?.[platform] || settings.mascotImage || "/mascot-home.png";
  const isDefaultMascot =
    !mascotImg || mascotImg === "/mascot-dragon.svg" || mascotImg.endsWith("/mascot-dragon.svg");
  const isBuiltInRobot = mascotImg === "/mascot-home.png" || mascotImg.endsWith("/mascot-home.png");
  const dragonStyleMap: Record<string, { filter: string; scale: number }> = {
    home: { filter: "none", scale: 1 },
    facebook: { filter: "hue-rotate(280deg) saturate(1.2) brightness(1.1)", scale: 1 },
    tiktok: { filter: "hue-rotate(110deg) saturate(1.5) brightness(1)", scale: 1.05 },
    instagram: { filter: "hue-rotate(80deg) saturate(1.3) brightness(1.1)", scale: 1 },
    zalo: { filter: "hue-rotate(200deg) saturate(1.3) brightness(1.1)", scale: 1 },
    googlemaps: { filter: "hue-rotate(130deg) saturate(1.4) brightness(1)", scale: 1.02 },
    website: { filter: "hue-rotate(220deg) saturate(1.2) brightness(1.1)", scale: 1 },
  };
  const customFilter = useMemo(() => {
    return dragonStyleMap[platform]?.filter || dragonStyleMap.home.filter;
  }, [platform]);
  const dragonStyle = dragonStyleMap[platform] || dragonStyleMap.home;

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
    if (!enabled || !isShown) return;

    const timer = window.setTimeout(() => {
      speakCute(message);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [pathname, enabled, isShown, message]);

  useEffect(() => {
    if (!enabled || !isShown) return;

    const updatePos = () => {
      const width = 118;
      const height = 126;
      const mobile = window.innerWidth < 768;
      const maxX = Math.max(24, window.innerWidth - width - 24);
      const maxY = Math.max(140, window.innerHeight - height - 24);
      const startX = Math.max(24, window.innerWidth - width - 40);
      const startY = Math.max(160, window.innerHeight - height - 36);
      const centerX = Math.max(24, Math.min(maxX, Math.round(window.innerWidth * (mobile ? 0.52 : 0.44))));
      const farLeftX = Math.max(24, Math.min(maxX, Math.round(window.innerWidth * (mobile ? 0.12 : 0.03))));
      const leftX = Math.max(24, Math.min(maxX, Math.round(window.innerWidth * (mobile ? 0.26 : 0.16))));
      const rightX = Math.max(24, Math.min(maxX, Math.round(window.innerWidth * (mobile ? 0.66 : 0.68))));
      const farRightX = Math.max(24, Math.min(maxX, Math.round(window.innerWidth * (mobile ? 0.82 : 0.88))));
      const topY = Math.max(mobile ? 120 : 96, Math.min(maxY, Math.round(window.innerHeight * (mobile ? 0.18 : 0.08))));
      const midY = Math.max(mobile ? 180 : 120, Math.min(maxY, Math.round(window.innerHeight * (mobile ? 0.42 : 0.3))));
      const lowerY = Math.max(mobile ? 260 : 180, Math.min(maxY, Math.round(window.innerHeight * (mobile ? 0.64 : 0.58))));
      const bottomY = Math.max(mobile ? 320 : 220, Math.min(maxY, Math.round(window.innerHeight * (mobile ? 0.78 : 0.82))));

      setIsMobileViewport(mobile);
      setPos({ x: startX, y: startY });
      setFlightPath({
        x: mobile
          ? [startX, rightX, centerX, leftX, farLeftX, centerX, startX]
          : [startX, farLeftX, centerX, farRightX, leftX, rightX, startX],
        y: mobile
          ? [startY, lowerY, midY, topY, midY, bottomY, startY]
          : [startY, midY, bottomY, topY, lowerY, midY, startY],
      });
    };

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

    updatePos();
    window.addEventListener("resize", updatePos);
    window.addEventListener("mascot-alert", onMascotAlert as EventListener);
    window.addEventListener("mascot-section-change", onSectionChange as EventListener);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("mascot-alert", onMascotAlert as EventListener);
      window.removeEventListener("mascot-section-change", onSectionChange as EventListener);
      window.removeEventListener("keydown", onKeyDown);
      stopSpeaking();
    };
  }, [enabled, isShown, message, sectionMessages]);

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
        className="fixed left-3 top-1/2 z-[94] flex -translate-y-1/2 items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-2 text-white shadow-xl backdrop-blur transition-all hover:scale-105 active:scale-95"
        aria-label={isShown ? "Ẩn robot" : "Hiện robot"}
        title={isShown ? "Tắt linh vật" : "Bật linh vật"}
      >
        {isShown ? <EyeOff size={18} className="text-cyan-300" /> : <Bot size={18} className="text-white/70" />}
        <span className="text-xs font-semibold">{isShown ? "Ẩn robot" : "Hiện robot"}</span>
      </button>

      {isShown && (
        <motion.div
          className="fixed left-0 top-0 z-[93]"
          initial={{ x: pos.x, y: pos.y }}
          animate={
            prefersReducedMotion
              ? { x: pos.x, y: pos.y }
              : { x: flightPath.x, y: flightPath.y }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: isMobileViewport ? 25 : 18,
                  repeat: Infinity,
                  ease: "linear",
                }
          }
          data-mascot="dragon"
        >
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="absolute -top-16 left-1/2 mb-2 w-max max-w-[260px] -translate-x-1/2 rounded-2xl border border-white/15 bg-black/80 px-4 py-3 text-sm font-medium text-white backdrop-blur-md shadow-2xl"
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

          <motion.button
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
            animate={
              prefersReducedMotion
                ? { y: 0, rotate: 0 }
                : { y: [0, -10, 0], rotate: [0, 2, -2, 0] }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
            }
            className="flex h-[126px] w-[118px] items-center justify-center transition-transform hover:scale-110 active:scale-90"
            aria-label="AI Mascot"
          >
            <div
              className="relative group"
              style={{
                filter: `drop-shadow(0 0 15px ${mascotGlowColor}44)`,
              }}
            >
              <div className="absolute inset-0 -z-10 rounded-full bg-white/20 opacity-50 blur-2xl transition-transform duration-500 scale-75 group-hover:scale-100" />

              {isDefaultMascot ? (
                <DefaultMascotGraphic
                  animate={!prefersReducedMotion}
                  glowColor={mascotGlowColor}
                  palette={mascotPalette}
                />
              ) : isBuiltInRobot ? (
                <RobotMascotGraphic
                  animate={!prefersReducedMotion}
                  glowColor={mascotGlowColor}
                  filter={customFilter}
                  scale={dragonStyle.scale}
                />
              ) : (
                <div className={prefersReducedMotion ? "" : "mascot-default-wave"}>
                  <img
                    src={mascotImg}
                    alt="AI Mascot"
                    className="h-[118px] w-[118px] object-contain"
                    style={{
                      filter: `${customFilter} drop-shadow(0 5px 15px rgba(0,0,0,0.5))`,
                      transform: `scale(${dragonStyle.scale})`,
                      transformBox: "fill-box",
                      transformOrigin: "center bottom",
                    }}
                  />
                </div>
              )}
            </div>
          </motion.button>
        </motion.div>
      )}
    </>
  );
}
