"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ServiceConversionFooter } from "@/components/shared/ServiceConversionFooter";
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
import { MoneyKwSiloLinks } from "@/components/seo/MoneyKwSiloLinks";

const TAB_ORDER: PricingPlatformId[] = ["website", "facebook", "googlemaps"];

const TAB_INTROS: Record<PricingPlatformId, { title: string; body: string; links: { href: string; label: string }[] }> = {
  website: {
    title: "Bảng giá thiết kế website",
    body: "Gói từ Landing Page đến E-commerce — bao gồm UI/UX, lập trình chuẩn SEO, form/Zalo và bàn giao admin. Giá tham khảo, báo giá chính xác sau khảo sát nhu cầu.",
    links: [
      { href: "/website", label: "Dịch vụ thiết kế website" },
      { href: "/website/nganh/spa", label: "Website spa" },
      { href: "/website/nganh/nha-khoa", label: "Website nha khoa" },
      { href: "/blog/bao-gia-thiet-ke-website", label: "Hướng dẫn báo giá" },
      { href: "/du-an", label: "Case study" },
    ],
  },
  facebook: {
    title: "Bảng giá Facebook Marketing",
    body: "Gói thiết kế Fanpage, chăm sóc content theo tháng và phí quản lý Meta Ads (chưa gồm ngân sách ads). Funnel khuyến nghị: Fanpage → care → ads.",
    links: [
      { href: "/facebook", label: "Dịch vụ Facebook" },
      { href: "/du-an/sao-khue", label: "Case study Fanpage" },
      { href: "/blog/chu-de/facebook", label: "Kiến thức Facebook" },
    ],
  },
  googlemaps: {
    title: "Bảng giá Google Maps",
    body: "Gói tối ưu Google Business Profile, Local SEO và phí quản lý Local Ads. Phù hợp doanh nghiệp có địa điểm vật lý cần tăng lượt gọi và chỉ đường.",
    links: [
      { href: "/google-maps", label: "Dịch vụ Google Maps" },
      { href: "/seo-website/dia-phuong/ho-chi-minh", label: "SEO TP.HCM" },
      { href: "/seo-website/dia-phuong/quan-1", label: "SEO Quận 1" },
      { href: "/blog/chu-de/google-maps", label: "Kiến thức Local SEO" },
    ],
  },
};

const PRICING_FAQS = [
  {
    q: "Giá trên bảng giá có phải giá cuối cùng không?",
    a: "Đây là giá tham khảo. Báo giá chính xác sau khi khảo sát quy mô, tính năng và timeline dự án.",
  },
  {
    q: "Có hỗ trợ trả góp hoặc chia đợt thanh toán không?",
    a: "Có. Thường chia 50% ký hợp đồng — 50% nghiệm thu, hoặc theo milestone dự án lớn.",
  },
  {
    q: "Phí quảng cáo Facebook/Google Maps có nằm trong bảng giá không?",
    a: "Không. Ngân sách ads trả trực tiếp cho Meta/Google. Bảng giá chỉ gồm phí setup và quản lý chiến dịch.",
  },
  {
    q: "Làm sao chọn gói phù hợp?",
    a: "Website mới: bắt đầu gói cơ bản hoặc doanh nghiệp. Đã có traffic: nâng cấp SEO + care. Có cửa hàng: thêm Google Maps.",
  },
];

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
  const [gateDissolving, setGateDissolving] = useState(false);
  const prevTabRef = useRef<PricingPlatformId>("website");

  const activeColor = PRICING_PLATFORMS.find((p) => p.id === activeTab)?.color ?? "#7C3AED";
  const tabIntro = TAB_INTROS[activeTab];

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

        <motion.section
          key={activeTab}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6"
        >
          <h2 className="text-lg font-bold text-indigo-950 sm:text-xl">{tabIntro.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{tabIntro.body}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tabIntro.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-indigo-100 bg-indigo-50/50 px-3 py-1.5 text-xs font-semibold text-indigo-800 transition hover:border-violet-300 hover:bg-violet-50"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.section>

        <div className="relative">
          <AnimatePresence mode="wait">
            {showGate ? (
              <motion.div
                key="gate-preview"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div
                  className={`pointer-events-none select-none transition-all duration-500 ${
                    gateDissolving ? "blur-0 opacity-100 saturate-100" : "blur-[2px] opacity-60 saturate-[0.85]"
                  }`}
                >
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

        <section className="mt-12 rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-indigo-950">Quy trình chọn gói và nhận báo giá</h2>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Chọn nhóm dịch vụ cần triển khai",
              "Đối chiếu phạm vi và ngân sách tham khảo",
              "Gửi yêu cầu để được khảo sát chi tiết",
              "Nhận báo giá, timeline và checklist bàn giao",
            ].map((step, index) => (
              <li key={step} className="rounded-xl border border-indigo-100 bg-indigo-50/30 p-4 text-sm text-slate-700">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-violet-700">
                  Bước {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12 rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-indigo-950">Câu hỏi thường gặp về bảng giá</h2>
          <div className="mt-5 space-y-3">
            {PRICING_FAQS.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-indigo-100 bg-indigo-50/20 p-4 open:border-violet-200 open:bg-violet-50/30"
              >
                <summary className="cursor-pointer list-none text-sm font-bold text-indigo-950 marker:hidden sm:text-base">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Cần báo giá chi tiết?{" "}
            <Link href="/lien-he" className="font-semibold text-violet-700 underline">
              Liên hệ tư vấn miễn phí
            </Link>{" "}
            hoặc đọc{" "}
            <Link href="/blog/bao-gia-thiet-ke-website" className="font-semibold text-violet-700 underline">
              hướng dẫn báo giá website
            </Link>
            .
          </p>
        </section>

        <div className="mt-12">
          <MoneyKwSiloLinks excludePath="/banggia" />
        </div>

        <div className="mt-10">
          <ServiceConversionFooter title="Cần báo giá chi tiết?" />
        </div>
      </main>

      {unlocked && !showGate ? <PricingStickyBar /> : null}
      {showGate ? (
        <PricingGateForm onUnlockStart={() => setGateDissolving(true)} onUnlocked={handleUnlocked} />
      ) : null}

      {unlocked && !showGate ? <div className="h-20 md:hidden" aria-hidden /> : null}
    </div>
  );
}
