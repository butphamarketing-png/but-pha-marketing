import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronUp } from "lucide-react";
import { ConsultModal } from "./ConsultModal";
import { CursorEffect } from "./CursorEffect";
import { ChatbotWidget } from "./ChatbotWidget";
import { PresentationButton } from "./PresentationButton";
import { DynamicGreeting } from "./DynamicGreeting";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useAdmin } from "@/lib/AdminContext";
import { getBrandingAssetUrl } from "@/lib/branding";
import { usePathname } from "next/navigation";

interface SubPageLayoutProps {
  platformName: string;
  primaryColor: string;
  children: React.ReactNode;
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

export function SubPageLayout({ platformName, primaryColor, children }: SubPageLayoutProps) {
  const { settings } = useAdmin();
  const logoSrc = getBrandingAssetUrl("logo", settings.logo || settings.favicon || "");
  const pathname = usePathname();
  const [showConsult, setShowConsult] = useState(false);
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const playClick = useClickSound();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    () => [
      { id: "slideshow", label: "Tổng quan" },
      { id: "intro", label: `Giới Thiệu Về Dịch Vụ ${platformName}` },
      { id: "audit", label: "Chuẩn Đoán Sức Khỏe Fanpage" },
      { id: "pricing", label: "Bảng Giá Dịch Vụ" },
      { id: "before-after", label: "Sự Thay Đổi Kỳ Diệu" },
      { id: "process", label: "Quy Trình Triển Khai" },
      { id: "faq", label: "Câu Hỏi Thường Gặp" },
      { id: "contact", label: "Liên Hệ Tư Vấn" },
    ],
    [platformName],
  );

  useEffect(() => {
    const seen = new Set<string>();

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

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [pathname, sections]);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ "--platform-color": primaryColor } as React.CSSProperties}>
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

      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-background/80 px-4 py-3 backdrop-blur-md md:px-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-white">
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Hub Center</span>
        </Link>
        <div className="flex items-center gap-3">
          <img src={logoSrc} alt="Logo" className="h-8 w-8 rounded-full object-cover" />
          <span className="hidden font-bold text-white sm:inline">{settings.title}</span>
        </div>
        <button
          onClick={() => setShowConsult(true)}
          className="rounded-full px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95"
          style={{ backgroundColor: primaryColor }}
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
              backgroundColor: activeSection === idx ? primaryColor : "white",
              transform: activeSection === idx ? "scale(1.5)" : "scale(1)",
              opacity: activeSection === idx ? 1 : 0.35,
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
            className="fixed bottom-24 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-background/80 text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95"
            style={{ borderLeftColor: primaryColor, borderTopColor: primaryColor }}
            type="button"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <ChatbotWidget color={primaryColor} />
      <PresentationButton />
      <ConsultModal isOpen={showConsult} onClose={() => setShowConsult(false)} platformColor={primaryColor} />
    </div>
  );
}
