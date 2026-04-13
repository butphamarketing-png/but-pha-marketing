import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ConsultModal } from "./ConsultModal";
import { DecisionTreeQuiz } from "./DecisionTreeQuiz";
import { CursorEffect } from "./CursorEffect";
import { ChatbotWidget } from "./ChatbotWidget";
import { PresentationButton } from "./PresentationButton";
import { DynamicGreeting } from "./DynamicGreeting";
import { motion, useScroll } from "framer-motion";
import { useAdmin } from "@/lib/AdminContext";

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
  const [showConsult, setShowConsult] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState(0);
  const playClick = useClickSound();

  useEffect(() => {
    const handlePresentationStart = () => {
      setPresentationMode(true);
    };

    const handlePresentationEnd = () => {
      setPresentationMode(false);
    };

    window.addEventListener('presentationStart', handlePresentationStart);
    window.addEventListener('presentationEnd', handlePresentationEnd);

    return () => {
      window.removeEventListener('presentationStart', handlePresentationStart);
      window.removeEventListener('presentationEnd', handlePresentationEnd);
    };
  }, []);

  // Disable scroll when in presentation mode
  useEffect(() => {
    if (presentationMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [presentationMode]);

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

  const sections = [
    { id: "slideshow", label: "Tổng quan" },
    { id: "intro", label: "Giới thiệu" },
    { id: "pricing", label: "Bảng giá" },
    { id: "compare", label: "So sánh" },
    { id: "audit", label: "Chẩn đoán" },
    { id: "process", label: "Quy trình" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Liên hệ" },
  ];

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
        <Link href="/" className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Hub Center</span>
        </Link>
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="Logo" className="h-8 w-8 rounded-full" />
          <span className="font-bold text-white hidden sm:inline">{settings.title}</span>
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
          />
        ))}
      </div>

      <main className="pb-24">
        {children}
        {!presentationMode && (
          <div className="mt-12 flex justify-center pb-12">
            <button
              onClick={() => setShowQuiz(true)}
              className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-medium text-white transition-colors hover:bg-white/10"
            >
              🎯 Tìm Gói Dịch Vụ Phù Hợp
            </button>
          </div>
        )}
      </main>

      {!presentationMode && <ChatbotWidget color={primaryColor} />}
      <PresentationButton />
      <ConsultModal isOpen={showConsult} onClose={() => setShowConsult(false)} platformColor={primaryColor} />
      <DecisionTreeQuiz isOpen={showQuiz} onClose={() => setShowQuiz(false)} />
    </div>
  );
}


