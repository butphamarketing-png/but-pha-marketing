import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronUp } from "lucide-react";
import { ConsultModal } from "./ConsultModal";
import { CursorEffect } from "./CursorEffect";
import { DynamicGreeting } from "./DynamicGreeting";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useAdmin } from "@/lib/AdminContext";
import { usePathname } from "next/navigation";

interface SubPageLayoutProps {
  platformName: string;
  primaryColor: string;
  children: React.ReactNode;
  customSections?: { id: string; label: string }[];
}

function useClickSound() {
  const playClick = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.12);
    } catch (_) {}
  }, []);
  return playClick;
}

export function SubPageLayout({ platformName, primaryColor, children, customSections }: SubPageLayoutProps) {
  const { settings } = useAdmin();
  const logoSrc = "/logo.png";
  const pathname = usePathname();
  const [showConsult, setShowConsult] = useState(false);
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const playClick = useClickSound();

  useEffect(() => {
    let rafId = 0;

    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        setShowBackToTop(window.scrollY > 500);
        rafId = 0;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a")) {
        playClick();
      }
      const rippleTargets = target.closest("button");
      if (!rippleTargets) return;
      const rect = rippleTargets.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute; border-radius:50%; pointer-events:none;
        width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size / 2}px;
        top:${e.clientY - rect.top - size / 2}px;
        background:rgba(255,255,255,0.25);
        animation:ripple-anim 0.5s ease-out forwards;
      `;
      if (getComputedStyle(rippleTargets).position === "static") {
        rippleTargets.style.position = "relative";
      }
      rippleTargets.style.overflow = "hidden";
      rippleTargets.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [playClick]);

  const sections = useMemo(
    () => customSections || [
      { id: "audit", label: "Chuẩn đoán" },
      { id: "build", label: "Xây dựng Fanpage" },
      { id: "care", label: "Chăm sóc Fanpage" },
      { id: "ads", label: "Quảng cáo Fanpage" },
      { id: "gm-pricing", label: "Gói Google Maps" },
      { id: "ads-pricing", label: "Gói Quảng cáo" },
      { id: "benefits", label: "Lợi ích" },
      { id: "contact", label: "Liên hệ tư vấn" },
    ],
    [customSections],
  );

  useEffect(() => {
    const seen = new Set<string>();
    let rafId = 0;

    const updateActiveSection = () => {
      const anchor = window.innerHeight * 0.32;
      let nextActiveIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section, idx) => {
        const target = document.getElementById(section.id);
        if (!target) return;

        const rect = target.getBoundingClientRect();
        const isInViewport = rect.top <= anchor && rect.bottom >= anchor;
        const distance = isInViewport ? 0 : Math.abs(rect.top - anchor);

        if (distance < closestDistance) {
          closestDistance = distance;
          nextActiveIndex = idx;
        }
      });

      const active = sections[nextActiveIndex];
      if (!active) return;

      setActiveSection(nextActiveIndex);

      if (seen.has(active.id)) return;
      seen.add(active.id);

      window.dispatchEvent(
        new CustomEvent("mascot-section-change", {
          detail: {
            sectionId: active.id,
            sectionLabel: active.label,
            platform: pathname.replace("/", "") || "home",
          },
        }),
      );
    };

    const scheduleUpdateActiveSection = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        updateActiveSection();
        rafId = 0;
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdateActiveSection, { passive: true });
    window.addEventListener("resize", scheduleUpdateActiveSection);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdateActiveSection);
      window.removeEventListener("resize", scheduleUpdateActiveSection);
    };
  }, [pathname, sections]);

  return (
    <div className="platform-page-canvas text-foreground" style={{ "--platform-color": primaryColor } as React.CSSProperties}>
      <style>{`
        @keyframes ripple-anim {
          from { transform: scale(0); opacity: 1; }
          to { transform: scale(2.5); opacity: 0; }
        }
      `}</style>

      <CursorEffect color={primaryColor} />
      <DynamicGreeting color={primaryColor} />

      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-1 origin-left"
        style={{ scaleX: scrollYProgress, backgroundColor: primaryColor }}
      />

      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-indigo-100/90 bg-white/85 px-4 py-3 shadow-[0_8px_24px_rgba(49,46,129,0.04)] backdrop-blur-xl md:px-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-900">
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Trang chủ</span>
        </Link>
        <div className="flex items-center gap-3">
          <img src={logoSrc} alt="Logo" className="h-9 w-9 rounded-full border border-indigo-100 object-cover shadow-sm" />
          <span className="hidden text-sm font-semibold text-indigo-950 sm:inline">{settings.title}</span>
        </div>
        <button
          onClick={() => setShowConsult(true)}
          className="rounded-2xl px-5 py-2.5 text-sm font-semibold text-white shadow-brand-accent transition hover:brightness-105 active:scale-[0.99]"
          style={{ background: `linear-gradient(135deg, #312E81, ${primaryColor})` }}
        >
          Tư vấn ngay
        </button>
      </header>

      <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {sections.map((section, idx) => (
          <button
            key={section.id}
            onClick={() => {
              const el = document.getElementById(section.id);
              if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
            }}
            className="h-3 w-3 rounded-full transition-all"
            style={{
              backgroundColor: activeSection === idx ? primaryColor : "rgba(49, 46, 129, 0.2)",
              transform: activeSection === idx ? "scale(1.5)" : "scale(1)",
              opacity: activeSection === idx ? 1 : 0.45,
            }}
            title={section.label}
            type="button"
          />
        ))}
      </div>

      <main>{children}</main>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="brand-icon-btn fixed bottom-24 right-6 z-40 h-12 w-12 shadow-lg hover:scale-110 active:scale-95"
            style={{ borderLeftColor: primaryColor, borderTopColor: primaryColor }}
            type="button"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <ConsultModal isOpen={showConsult} onClose={() => setShowConsult(false)} platformColor={primaryColor} />
    </div>
  );
}
