import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { ChevronUp, Menu, X } from "lucide-react";
import { ConsultModal } from "./ConsultModal";
import { DynamicGreeting } from "./DynamicGreeting";
import { SiteNavMenu } from "./SiteNavMenu";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useAdmin } from "@/lib/AdminContext";
import { usePathname } from "next/navigation";

interface SubPageLayoutProps {
  platformName: string;
  primaryColor: string;
  children: React.ReactNode;
  customSections?: { id: string; label: string }[];
  theme?: "light" | "deep";
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

export function SubPageLayout({
  platformName,
  primaryColor,
  children,
  customSections,
  theme = "light",
}: SubPageLayoutProps) {
  const { settings } = useAdmin();
  const logoSrc = "/logo.png";
  const pathname = usePathname();
  const [showConsult, setShowConsult] = useState(false);
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const playClick = useClickSound();
  const deep = theme === "deep";
  const accent = deep ? primaryColor || "#6D5CE6" : primaryColor;

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
    <div
      className={`platform-page-canvas text-foreground ${deep ? "platform-deep text-white" : ""}`}
      style={{ "--platform-color": accent, "--landing-accent": accent } as React.CSSProperties}
    >
      <style>{`
        @keyframes ripple-anim {
          from { transform: scale(0); opacity: 1; }
          to { transform: scale(2.5); opacity: 0; }
        }
      `}</style>

      <DynamicGreeting color={accent} />

      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-1 origin-left"
        style={{ scaleX: scrollYProgress, backgroundColor: accent }}
      />

      <header
        className={`sticky top-0 z-50 overflow-visible border-b backdrop-blur-xl ${
          deep
            ? "border-white/[0.06] bg-[#0e1018]/80"
            : "border-violet-200/50 bg-[#f3f0fa]/90 shadow-[0_8px_24px_rgba(49,46,129,0.06)]"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Link
              href="/"
              className="group flex min-w-0 items-center gap-2.5 transition-transform hover:scale-[1.02] sm:gap-3"
            >
              <img
                src={logoSrc}
                alt="Logo"
                className={`h-9 w-9 shrink-0 rounded-full object-cover sm:h-10 sm:w-10 ${
                  deep ? "border border-white/10" : "border border-indigo-100 shadow-sm"
                }`}
              />
              <div className="min-w-0 hidden sm:block">
                <span className={`block truncate text-sm font-semibold ${deep ? "text-white/90" : "text-indigo-950"}`}>
                  {settings.title}
                </span>
                <span className={`block truncate text-[11px] font-medium ${deep ? "text-violet-300/70" : "text-violet-600"}`}>
                  {platformName}
                </span>
              </div>
            </Link>

            <button
              type="button"
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
              className={`ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition lg:hidden ${
                deep
                  ? "border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]"
                  : "border-violet-200/70 bg-[#f3f0fa] text-indigo-950 hover:bg-violet-100/80"
              }`}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <div className="hidden lg:block">
            <SiteNavMenu tone={deep ? "dark" : "light"} layout="horizontal" activeHref={pathname} />
          </div>

          <button
            onClick={() => setShowConsult(true)}
            className={`hidden shrink-0 rounded-md px-4 py-2 text-sm font-medium transition active:scale-[0.99] sm:inline-flex ${
              deep
                ? "bg-[#6D5CE6] text-white hover:bg-[#5B4BD4]"
                : "rounded-full text-white shadow-brand-accent hover:brightness-105"
            }`}
            style={deep ? undefined : { background: `linear-gradient(135deg, #312E81, ${primaryColor})` }}
          >
            Tư vấn ngay
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`overflow-hidden border-t lg:hidden ${
                deep ? "border-white/[0.06] bg-[#0c0e14]/98" : "border-violet-200/50 bg-[#f3f0fa]/98"
              }`}
            >
              <div className="mx-auto max-w-7xl px-4 py-4">
                <SiteNavMenu
                  tone={deep ? "dark" : "light"}
                  layout="stack"
                  activeHref={pathname}
                  onNavigate={() => setMobileMenuOpen(false)}
                />
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowConsult(true);
                  }}
                  className={`mt-3 w-full rounded-xl px-4 py-3 text-sm font-bold ${
                    deep ? "bg-[#6D5CE6] text-white" : "text-white"
                  }`}
                  style={deep ? undefined : { background: `linear-gradient(135deg, #312E81, ${primaryColor})` }}
                >
                  Tư vấn ngay
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="section-scroll-nav pointer-events-none fixed right-4 top-1/2 z-30 hidden w-fit -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        {sections.map((section, idx) => (
          <button
            key={section.id}
            onClick={() => {
              const el = document.getElementById(section.id);
              if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
            }}
            className="pointer-events-auto h-3 w-3 rounded-full transition-all"
            style={{
              backgroundColor: activeSection === idx ? accent : deep ? "rgba(255,255,255,0.2)" : "rgba(49, 46, 129, 0.2)",
              transform: activeSection === idx ? "scale(1.5)" : "scale(1)",
              opacity: activeSection === idx ? 1 : 0.45,
            }}
            title={section.label}
            type="button"
          />
        ))}
      </div>

      <main className={deep ? "relative" : undefined}>{children}</main>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`fixed bottom-24 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border transition hover:scale-110 active:scale-95 ${
              deep
                ? "border-white/15 bg-[#0e1016] text-white/80 shadow-lg"
                : "brand-icon-btn shadow-lg"
            }`}
            style={deep ? undefined : { borderLeftColor: primaryColor, borderTopColor: primaryColor }}
            type="button"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <ConsultModal isOpen={showConsult} onClose={() => setShowConsult(false)} platformColor={accent} />
    </div>
  );
}
