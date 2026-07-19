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
        className="h-full w-full object-cover object-[center_30%] opacity-100"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 50% at 20% -5%, rgba(196,149,90,0.2), transparent 55%), radial-gradient(ellipse 45% 40% at 88% 18%, rgba(139,124,246,0.22), transparent 55%), linear-gradient(180deg, rgba(14,16,24,0.35) 0%, rgba(8,9,12,0.55) 55%, rgba(8,9,12,0.88) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e1018]/40 via-transparent to-[#08090c]/85" />
    </div>
  );
}

const TAB_INTROS: Record<
  PricingPlatformId,
  { title: string; body: string; links: { href: string; label: string }[] }
> = {
  website: {
    title: "Thiết kế website",
    body: "Landing Page đến hệ thống doanh nghiệp — UI/UX, chuẩn SEO, form/Zalo, bàn giao admin. Giá tham khảo; báo giá chính xác sau khảo sát.",
    links: [
      { href: "/website", label: "Chi tiết dịch vụ" },
      { href: "/blog/bao-gia-thiet-ke-website", label: "Cách đọc báo giá" },
      { href: "/du-an", label: "Case study" },
    ],
  },
  facebook: {
    title: "Facebook Marketing",
    body: "Thiết kế Fanpage, chăm sóc content theo tháng và phí quản lý Meta Ads (chưa gồm ngân sách quảng cáo).",
    links: [
      { href: "/facebook", label: "Chi tiết dịch vụ" },
      { href: "/du-an/sao-khue", label: "Case study Fanpage" },
      { href: "/blog/chu-de/facebook", label: "Kiến thức" },
    ],
  },
  googlemaps: {
    title: "Google Maps",
    body: "Tối ưu Google Business Profile, Local SEO và phí quản lý Local Ads — tăng gọi điện & chỉ đường.",
    links: [
      { href: "/google-maps", label: "Chi tiết dịch vụ" },
      { href: "/blog/chu-de/google-maps", label: "Kiến thức Local SEO" },
    ],
  },
};

const PRICING_FAQS = [
  {
    q: "Giá trên bảng có phải giá cuối cùng không?",
    a: "Đây là mức tham khảo. Báo giá chính xác sau khi khảo sát quy mô, tính năng và timeline dự án.",
  },
  {
    q: "Chi phí thiết kế website phụ thuộc yếu tố nào?",
    a: "Số trang, tính năng (form, đặt lịch, bán hàng), thiết kế độc quyền hay theo mẫu, và tiến độ bàn giao.",
  },
  {
    q: "Có chia đợt thanh toán không?",
    a: "Có. Thường 50% ký hợp đồng — 50% nghiệm thu, hoặc theo milestone với dự án lớn.",
  },
  {
    q: "Ngân sách ads có nằm trong bảng giá không?",
    a: "Không. Ngân sách ads trả trực tiếp cho Meta/Google. Bảng giá chỉ gồm phí setup và quản lý chiến dịch.",
  },
];

const PROCESS_STEPS = [
  { n: "01", title: "Chọn nền tảng", desc: "Website, Facebook hoặc Google Maps" },
  { n: "02", title: "Đối chiếu phạm vi", desc: "Gói dịch vụ khớp ngân sách & mục tiêu" },
  { n: "03", title: "Tư vấn nhanh", desc: "Làm rõ yêu cầu trước khi chốt" },
  { n: "04", title: "Báo giá & timeline", desc: "Hợp đồng rõ ràng, bàn giao đúng hạn" },
];

function getTabDirection(from: PricingPlatformId, to: PricingPlatformId) {
  return TAB_ORDER.indexOf(to) >= TAB_ORDER.indexOf(from) ? 1 : -1;
}

const serif = { fontFamily: '"Cormorant Garamond", Georgia, serif' } as const;

export function BanggiaPageClient() {
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<PricingPlatformId>("website");
  const [tabDirection, setTabDirection] = useState(1);
  const [gateReady, setGateReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [welcomeName, setWelcomeName] = useState<string | null>(null);
  const prevTabRef = useRef<PricingPlatformId>("website");

  const tabIntro = TAB_INTROS[activeTab];

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
        <div className="h-px w-24 animate-pulse bg-amber-200/30" aria-hidden />
        <span className="sr-only">Đang tải bảng giá…</span>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="relative min-h-screen overflow-hidden deep-theme">
        <BanggiaAtmosphere />
        <div className="pointer-events-none absolute inset-0 select-none opacity-25 blur-xl" aria-hidden>
          <div className="mx-auto max-w-5xl px-6 py-28">
            <div className="h-px w-24 bg-white/20" />
            <div className="mt-8 h-12 w-full max-w-md bg-white/5" />
            <div className="mt-16 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 border border-white/5 bg-white/[0.02]" />
              ))}
            </div>
          </div>
        </div>
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

      <main className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-2xl sm:mb-16"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-200/55">Bảng giá</p>
          <h1
            className="mt-4 text-[clamp(2.1rem,4.5vw,3.4rem)] font-semibold leading-[1.08] tracking-tight text-white"
            style={serif}
          >
            Báo giá dịch vụ
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/45 sm:text-[15px]">
            {welcomeName
              ? `Xin chào ${welcomeName}. Giá tham khảo minh bạch — báo giá chính thức sau khảo sát.`
              : "Website · Facebook · Google Maps — mức giá tham khảo, tư vấn miễn phí theo mục tiêu."}
          </p>
        </motion.header>

        <section className="mb-10 border-b border-white/[0.06] pb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl" style={serif}>
                {tabIntro.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/40">{tabIntro.body}</p>
            </div>
            <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm" aria-label="Liên kết liên quan">
              {tabIntro.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-amber-200/70 underline-offset-4 transition hover:text-amber-100 hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <PricingTabs activeId={activeTab} onChange={handleTabChange} direction={tabDirection} />

        <section className="mt-16 border-t border-white/[0.06] pt-12">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl" style={serif}>
            Quy trình làm việc
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <li key={step.n} className="relative border-l border-amber-200/25 pl-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200/50">
                  {step.n}
                </span>
                <p className="mt-2 text-[15px] font-medium text-white/85">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/40">{step.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 border-t border-white/[0.06] pt-12">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl" style={serif}>
            Câu hỏi thường gặp
          </h2>
          <div className="mt-6 divide-y divide-white/[0.06]">
            {PRICING_FAQS.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="cursor-pointer list-none text-sm font-medium text-white/85 marker:hidden sm:text-[15px]">
                  <span className="flex items-start justify-between gap-4">
                    {item.q}
                    <span className="mt-0.5 text-white/25 transition group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/40">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-14 [&_a]:text-amber-200/75 [&_h2]:text-white [&_li]:text-white/45 [&_p]:text-white/40">
          <MoneyKwSiloLinks excludePath="/banggia" />
        </div>

        <div className="mt-10 [&_*]:border-white/10 [&_a]:text-amber-200/75 [&_h2]:text-white [&_p]:text-white/40">
          <ServiceConversionFooter title="Cần báo giá chi tiết theo dự án?" />
        </div>
      </main>

      <PricingStickyBar />
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
