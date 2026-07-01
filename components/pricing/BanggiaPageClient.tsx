"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SiteNavMenu } from "@/components/shared/SiteNavMenu";
import { captureBanggiaAttribution } from "@/lib/banggia-attribution";
import {
  getBanggiaLastTab,
  markBanggiaWelcomeShown,
  setBanggiaLastTab,
  shouldShowBanggiaWelcomeBack,
} from "@/lib/banggia-prefs";
import { isBanggiaUnlocked } from "@/lib/marketing-popup-gate";
import { PRICING_PLATFORMS } from "@/lib/pricing-catalog";
import type { PricingPlatformId } from "@/lib/pricing-catalog";
import { PricingGateForm } from "./PricingGateForm";
import { PricingStickyBar } from "./PricingStickyBar";
import { PricingTabs } from "./PricingTabs";

const TAB_ORDER: PricingPlatformId[] = ["website", "facebook", "googlemaps"];

function getTabDirection(from: PricingPlatformId, to: PricingPlatformId) {
  return TAB_ORDER.indexOf(to) >= TAB_ORDER.indexOf(from) ? 1 : -1;
}

export function BanggiaPageClient() {
  const reduceMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<PricingPlatformId>("website");
  const [tabDirection, setTabDirection] = useState(1);
  const [welcomeBack, setWelcomeBack] = useState(false);
  const prevTabRef = useRef<PricingPlatformId>("website");

  const activeColor = PRICING_PLATFORMS.find((p) => p.id === activeTab)?.color ?? "#7C3AED";

  useEffect(() => {
    setHydrated(true);
    const alreadyUnlocked = isBanggiaUnlocked();
    setUnlocked(alreadyUnlocked);
    if (alreadyUnlocked) {
      setActiveTab(getBanggiaLastTab());
      prevTabRef.current = getBanggiaLastTab();
      if (shouldShowBanggiaWelcomeBack()) {
        setWelcomeBack(true);
        markBanggiaWelcomeShown();
        const timer = window.setTimeout(() => setWelcomeBack(false), 3200);
        return () => window.clearTimeout(timer);
      }
    }
    captureBanggiaAttribution();
  }, []);

  const showGate = hydrated && !unlocked;

  const handleTabChange = (tab: PricingPlatformId) => {
    setTabDirection(getTabDirection(prevTabRef.current, tab));
    prevTabRef.current = tab;
    setActiveTab(tab);
    setBanggiaLastTab(tab);
  };

  const handleUnlocked = () => {
    setJustUnlocked(true);
    setUnlocked(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F6FC]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-56 transition-[background] duration-500"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${activeColor}18, transparent)`,
        }}
        aria-hidden
      />

      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Bứt Phá Marketing" width={40} height={40} className="h-10 w-10 object-contain" />
            <span className="hidden text-sm font-semibold text-indigo-950 sm:inline">Bứt Phá Marketing</span>
          </Link>
          <SiteNavMenu />
        </div>
      </header>

      <AnimatePresence>
        {welcomeBack && unlocked ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-medium text-violet-800 shadow-lg"
          >
            Chào bạn — bảng giá đã sẵn sàng
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 text-center sm:mb-10"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">Tra cứu dịch vụ</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-indigo-950 sm:text-3xl">Bảng giá dịch vụ</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Tham khảo nhanh các gói Website, Facebook và Google Maps. Giá có thể điều chỉnh theo quy mô dự án.
          </p>
          <p className="mx-auto mt-4 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm">
            <span>Tư vấn miễn phí</span>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <span>Giá minh bạch</span>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <span>Phản hồi trong 24h</span>
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {showGate ? (
              <motion.div
                key="gate-preview"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="pointer-events-none select-none opacity-60 saturate-[0.85] blur-[2px]">
                  <PricingTabs activeId={activeTab} onChange={handleTabChange} direction={tabDirection} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="pricing-content"
                initial={justUnlocked && !reduceMotion ? { opacity: 0, y: 14 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <PricingTabs activeId={activeTab} onChange={handleTabChange} direction={tabDirection} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {unlocked && !showGate ? <PricingStickyBar /> : null}
      {showGate ? <PricingGateForm onUnlocked={handleUnlocked} /> : null}

      {unlocked && !showGate ? <div className="h-20 md:hidden" aria-hidden /> : null}
    </div>
  );
}
