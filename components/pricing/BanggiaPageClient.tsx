"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ServiceConversionFooter } from "@/components/shared/ServiceConversionFooter";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SiteNavMenu } from "@/components/shared/SiteNavMenu";
import { captureBanggiaAttribution } from "@/lib/banggia-attribution";
import {
  getBanggiaLastTab,
  getBanggiaProfile,
  setBanggiaLastTab,
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
    title: "Báo giá thiết kế website",
    body: "Từ Landing Page đến hệ thống — UI/UX, chuẩn SEO, form/Zalo và bàn giao admin. Giá tham khảo; báo giá chính xác sau khảo sát.",
    links: [
      { href: "/website", label: "Dịch vụ thiết kế website" },
      { href: "/blog/bao-gia-thiet-ke-website", label: "Hướng dẫn đọc báo giá" },
      { href: "/du-an", label: "Case study" },
    ],
  },
  facebook: {
    title: "Bảng giá Facebook Marketing",
    body: "Thiết kế Fanpage, chăm sóc content theo tháng và phí quản lý Meta Ads (chưa gồm ngân sách ads).",
    links: [
      { href: "/facebook", label: "Dịch vụ Facebook" },
      { href: "/du-an/sao-khue", label: "Case study Fanpage" },
      { href: "/blog/chu-de/facebook", label: "Kiến thức Facebook" },
    ],
  },
  googlemaps: {
    title: "Bảng giá Google Maps",
    body: "Tối ưu Google Business Profile, Local SEO và phí quản lý Local Ads — tăng gọi điện & chỉ đường.",
    links: [
      { href: "/google-maps", label: "Dịch vụ Google Maps" },
      { href: "/blog/chu-de/google-maps", label: "Kiến thức Local SEO" },
    ],
  },
};

const PRICING_FAQS = [
  {
    q: "Báo giá thiết kế website trên bảng giá có phải giá cuối cùng không?",
    a: "Đây là giá tham khảo. Báo giá thiết kế website chính xác sau khi khảo sát quy mô, tính năng và timeline dự án.",
  },
  {
    q: "Chi phí thiết kế website phụ thuộc yếu tố nào?",
    a: "Số trang, tính năng (form, đặt lịch, bán hàng), thiết kế độc quyền hay theo mẫu, và tiến độ bàn giao.",
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
    q: "Làm sao chọn gói thiết kế website phù hợp?",
    a: "Website mới: bắt đầu gói cơ bản hoặc doanh nghiệp. Cần xem phạm vi dịch vụ đầy đủ tại trang thiết kế website.",
  },
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
        <div className="h-10 w-10 animate-pulse rounded-full bg-amber-200/20" aria-hidden />
        <span className="sr-only">Đang tải bảng giá…</span>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="relative min-h-screen overflow-hidden deep-theme">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(196,149,90,0.18), transparent 55%), radial-gradient(ellipse 50% 40% at 80% 60%, rgba(88,28,135,0.12), transparent)",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 select-none opacity-30 blur-xl" aria-hidden>
          <div className="mx-auto max-w-5xl px-6 py-28">
            <div className="h-3 w-40 rounded bg-white/10" />
            <div className="mt-6 h-14 w-full max-w-md rounded bg-white/5" />
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-36 rounded-2xl border border-white/5 bg-white/[0.03]" />
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
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(196,149,90,0.16), transparent 58%), radial-gradient(ellipse 45% 40% at 88% 18%, rgba(139,124,246,0.14), transparent 55%), radial-gradient(ellipse 40% 35% at 12% 40%, rgba(109,90,230,0.08), transparent 50%), linear-gradient(180deg, #0c0e14 0%, #08090c 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <header className="sticky top-0 z-40 border-b border-white/[0.06]  bg-[#0e1018]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Bứt Phá Marketing" width={40} height={40} className="h-10 w-10 object-contain" />
            <span className="hidden text-sm font-medium tracking-wide text-white/90 sm:inline">Bứt Phá Marketing</span>
          </Link>
          <div>
            <SiteNavMenu tone="dark" />
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center sm:mb-14"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-200/70">Bảng giá dịch vụ</p>
          <h1
            className="mx-auto mt-4 max-w-3xl text-[clamp(1.85rem,5vw,3.25rem)] font-semibold leading-[1.12] tracking-tight text-white"
            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
          >
            Báo giá thiết kế website
            <span className="block font-normal text-white/55"> & marketing thực chiến</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50 sm:text-[15px]">
            {welcomeName
              ? `Xin chào ${welcomeName}. Chọn nền tảng — xem gói rõ ràng, không ẩn phí.`
              : "Website · Facebook · Google Maps — minh bạch theo gói, tư vấn sau khảo sát."}
          </p>
          <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">
            <span>Giá tham khảo</span>
            <span className="h-1 w-1 rounded-full bg-amber-200/40" aria-hidden />
            <span>Tư vấn miễn phí</span>
            <span className="h-1 w-1 rounded-full bg-amber-200/40" aria-hidden />
            <Link href="/website" className="text-amber-200/80 transition hover:text-amber-100">
              Dịch vụ website
            </Link>
          </div>
        </motion.div>

        <motion.section
          key={activeTab}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8 border-b border-white/[0.06] pb-8"
        >
          <h2
            className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
          >
            {tabIntro.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45 sm:text-[15px]">{tabIntro.body}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {tabIntro.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-white/70 transition hover:border-amber-200/30 hover:bg-amber-200/5 hover:text-amber-100"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.section>

        <PricingTabs activeId={activeTab} onChange={handleTabChange} direction={tabDirection} />

        <section className="mt-14 border-t border-white/[0.06] pt-12">
          <h2
            className="text-2xl font-semibold text-white sm:text-3xl"
            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
          >
            Quy trình chọn gói
          </h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Xem bảng giá thiết kế website",
              "Đối chiếu phạm vi và ngân sách",
              "Xem chi tiết tại trang dịch vụ",
              "Nhận báo giá & timeline bàn giao",
            ].map((step, index) => (
              <li key={step} className="relative pl-4">
                <span className="absolute left-0 top-1 h-full w-px bg-gradient-to-b from-amber-200/50 to-transparent" aria-hidden />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/60">
                  0{index + 1}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 border-t border-white/[0.06] pt-12">
          <h2
            className="text-2xl font-semibold text-white sm:text-3xl"
            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
          >
            Câu hỏi thường gặp
          </h2>
          <div className="mt-6 divide-y divide-white/[0.06]">
            {PRICING_FAQS.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="cursor-pointer list-none text-sm font-medium text-white/85 marker:hidden sm:text-base">
                  {item.q}
                </summary>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/45">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-sm text-white/40">
            Cần tư vấn gói? Xem{" "}
            <Link href="/website" className="text-amber-200/80 underline-offset-2 hover:underline">
              dịch vụ thiết kế website
            </Link>{" "}
            hoặc{" "}
            <Link href="/blog/bao-gia-thiet-ke-website" className="text-amber-200/80 underline-offset-2 hover:underline">
              hướng dẫn báo giá
            </Link>
            .
          </p>
        </section>

        <div className="mt-14 [&_a]:text-amber-200/80 [&_h2]:text-white [&_li]:text-white/50 [&_p]:text-white/45">
          <MoneyKwSiloLinks excludePath="/banggia" />
        </div>

        <div className="mt-10 [&_*]:border-white/10 [&_a]:text-amber-200/80 [&_h2]:text-white [&_p]:text-white/45">
          <ServiceConversionFooter title="Cần báo giá thiết kế website chi tiết?" />
        </div>
      </main>

      <PricingStickyBar />
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
