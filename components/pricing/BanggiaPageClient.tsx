"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ServiceConversionFooter } from "@/components/shared/ServiceConversionFooter";
import { SiteNavMenu } from "@/components/shared/SiteNavMenu";
import { MoneyKwSiloLinks } from "@/components/seo/MoneyKwSiloLinks";
import { captureBanggiaAttribution } from "@/lib/banggia-attribution";
import {
  getBanggiaLastTab,
  getBanggiaProfile,
  setBanggiaLastTab,
} from "@/lib/banggia-prefs";
import { isBanggiaUnlocked } from "@/lib/marketing-popup-gate";
import type { PricingPlatformId } from "@/lib/pricing-catalog";
import { PricingGateForm } from "./PricingGateForm";
import { PricingStickyBar } from "./PricingStickyBar";
import { PricingTabs } from "./PricingTabs";

const TAB_ORDER: PricingPlatformId[] = ["website", "facebook", "googlemaps"];

const BANGGIA_BG = "/about/banggia-bg-deep.png?v=banggia1";

function BanggiaAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BANGGIA_BG}
        alt=""
        className="h-full w-full object-cover object-[center_30%] opacity-90"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(139,124,246,0.12), transparent 55%), linear-gradient(180deg, rgba(14,16,24,0.45) 0%, rgba(8,9,12,0.7) 50%, rgba(8,9,12,0.92) 100%)",
        }}
      />
    </div>
  );
}

const PRICING_FAQS = [
  {
    q: "Giá trên bảng có phải giá cuối cùng không?",
    a: "Mức tham khảo. Báo giá chính xác sau khảo sát.",
  },
  {
    q: "Chi phí website phụ thuộc yếu tố nào?",
    a: "Số trang, tính năng, thiết kế, và tiến độ bàn giao.",
  },
  {
    q: "Có chia đợt thanh toán không?",
    a: "Có — thường 50% ký HĐ, 50% nghiệm thu.",
  },
  {
    q: "Ngân sách ads có nằm trong bảng giá không?",
    a: "Không. Bảng giá chỉ gồm phí setup và quản lý.",
  },
];

const PROCESS_STEPS = [
  { n: "01", title: "Chọn nền tảng", desc: "Website · Facebook · Maps" },
  { n: "02", title: "Đối chiếu phạm vi", desc: "Gói khớp ngân sách" },
  { n: "03", title: "Tư vấn nhanh", desc: "Làm rõ yêu cầu" },
  { n: "04", title: "Báo giá & timeline", desc: "Hợp đồng rõ ràng" },
];

function getTabDirection(from: PricingPlatformId, to: PricingPlatformId) {
  return TAB_ORDER.indexOf(to) >= TAB_ORDER.indexOf(from) ? 1 : -1;
}


export function BanggiaPageClient() {
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<PricingPlatformId>("website");
  const [tabDirection, setTabDirection] = useState(1);
  const [gateReady, setGateReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [welcomeName, setWelcomeName] = useState<string | null>(null);
  const prevTabRef = useRef<PricingPlatformId>("website");

  useEffect(() => {
    const lastTab = getBanggiaLastTab();
    setActiveTab(lastTab);
    prevTabRef.current = lastTab;
    captureBanggiaAttribution();

    const open = isBanggiaUnlocked();
    setUnlocked(open);
    if (open) {
      const profile = getBanggiaProfile();
      setWelcomeName(profile?.name?.split(/\s+/).filter(Boolean).pop() ?? null);
    }
    setGateReady(true);
  }, []);

  const handleTabChange = (tab: PricingPlatformId) => {
    setTabDirection(getTabDirection(prevTabRef.current, tab));
    prevTabRef.current = tab;
    setActiveTab(tab);
    setBanggiaLastTab(tab);
  };

  const handleUnlocked = () => {
    setUnlocked(true);
    const profile = getBanggiaProfile();
    setWelcomeName(profile?.name?.split(/\s+/).filter(Boolean).pop() ?? null);
  };

  if (!gateReady) {
    return (
      <div className="flex min-h-screen items-center justify-center deep-theme">
        <div className="h-px w-16 bg-white/20" aria-hidden />
        <span className="sr-only">Đang tải bảng giá…</span>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="relative min-h-screen overflow-hidden deep-theme">
        <BanggiaAtmosphere />
        <PricingGateForm onUnlocked={handleUnlocked} />
      </div>
    );
  }

  return (
    <div className="banggia-deep relative min-h-screen overflow-x-hidden deep-theme text-white">
      <BanggiaAtmosphere />

      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0a0b10]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Bứt Phá Marketing" width={40} height={40} className="h-10 w-10 object-contain" />
            <span className="hidden text-sm font-medium tracking-wide text-white/90 sm:inline">
              Bứt Phá Marketing
            </span>
          </Link>
          <SiteNavMenu tone="dark" />
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-7">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 max-w-2xl sm:mb-5"
        >
          <h1
            className="text-[1.75rem] font-semibold leading-snug tracking-tight text-white sm:text-[2.05rem]"
           
          >
            Báo giá dịch vụ
          </h1>
          {welcomeName ? (
            <p className="mt-1.5 text-sm text-white/45">Xin chào {welcomeName}.</p>
          ) : null}
        </motion.header>

        <PricingTabs activeId={activeTab} onChange={handleTabChange} direction={tabDirection} />

        <section className="mt-8 border-t border-white/[0.07] pt-6 sm:mt-9 sm:pt-7">
          <h2 className="text-[1.4rem] font-semibold text-white sm:text-[1.6rem]">
            Quy trình
          </h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {PROCESS_STEPS.map((step) => (
              <li key={step.n} className="relative border-l border-white/12 pl-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-300/55">
                  {step.n}
                </span>
                <p className="mt-1.5 text-[15px] font-medium text-white/85">{step.title}</p>
                <p className="mt-0.5 text-sm text-white/40">{step.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-8 border-t border-white/[0.07] pt-6 sm:mt-9 sm:pt-7">
          <h2 className="text-[1.4rem] font-semibold text-white sm:text-[1.6rem]">
            Câu hỏi thường gặp
          </h2>
          <div className="mt-3 divide-y divide-white/[0.07]">
            {PRICING_FAQS.map((item) => (
              <details key={item.q} className="group py-2.5">
                <summary className="cursor-pointer list-none text-sm font-medium text-white/85 marker:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {item.q}
                    <span className="mt-0.5 text-white/25 transition group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/45">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-8 [&_a]:text-violet-200/70 [&_h2]:text-white [&_li]:text-white/45 [&_p]:text-white/40">
          <MoneyKwSiloLinks excludePath="/banggia" />
        </div>

        <div className="mt-8 [&_*]:border-white/10 [&_a]:text-violet-200/70 [&_h2]:text-white [&_p]:text-white/40">
          <ServiceConversionFooter title="Cần báo giá chi tiết theo dự án?" />
        </div>
      </main>

      <PricingStickyBar />
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
