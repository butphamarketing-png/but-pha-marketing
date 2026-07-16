"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ServiceConversionFooter } from "@/components/shared/ServiceConversionFooter";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SiteNavMenu } from "@/components/shared/SiteNavMenu";
import { captureBanggiaAttribution } from "@/lib/banggia-attribution";
import { getBanggiaLastTab, setBanggiaLastTab } from "@/lib/banggia-prefs";
import { PRICING_PLATFORMS } from "@/lib/pricing-catalog";
import type { PricingPlatformId } from "@/lib/pricing-catalog";
import { PricingStickyBar } from "./PricingStickyBar";
import { PricingTabs } from "./PricingTabs";
import { MoneyKwSiloLinks } from "@/components/seo/MoneyKwSiloLinks";

const TAB_ORDER: PricingPlatformId[] = ["website", "facebook", "googlemaps"];

const TAB_INTROS: Record<PricingPlatformId, { title: string; body: string; links: { href: string; label: string }[] }> = {
  website: {
    title: "Báo giá thiết kế website",
    body: "Bảng giá thiết kế website từ Landing Page đến E-commerce — UI/UX, lập trình chuẩn SEO, form/Zalo và bàn giao admin. Giá tham khảo; báo giá chính xác sau khảo sát.",
    links: [
      { href: "/website", label: "Dịch vụ thiết kế website" },
      { href: "/blog/bao-gia-thiet-ke-website", label: "Hướng dẫn đọc báo giá" },
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
  const prevTabRef = useRef<PricingPlatformId>("website");

  const activeColor = PRICING_PLATFORMS.find((p) => p.id === activeTab)?.color ?? "#7C3AED";
  const tabIntro = TAB_INTROS[activeTab];

  useEffect(() => {
    const lastTab = getBanggiaLastTab();
    setActiveTab(lastTab);
    prevTabRef.current = lastTab;
    captureBanggiaAttribution();
  }, []);

  const handleTabChange = (tab: PricingPlatformId) => {
    setTabDirection(getTabDirection(prevTabRef.current, tab));
    prevTabRef.current = tab;
    setActiveTab(tab);
    setBanggiaLastTab(tab);
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

      <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 text-center sm:mb-10"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">Báo giá thiết kế website</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-indigo-950 sm:text-3xl">
            Báo giá thiết kế website & bảng giá dịch vụ
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Xem ngay chi phí thiết kế website, Facebook Marketing và Google Maps — không cần nhập số điện thoại để xem bảng giá.
            Giá tham khảo; báo giá chính xác theo quy mô dự án.
          </p>
          <p className="mx-auto mt-4 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm">
            <span>Xem giá miễn phí</span>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <span>Giá minh bạch</span>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <Link href="/website" className="font-semibold text-violet-700 hover:underline">
              Dịch vụ thiết kế website
            </Link>
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

        <PricingTabs activeId={activeTab} onChange={handleTabChange} direction={tabDirection} />

        <section className="mt-12 rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-indigo-950">Quy trình chọn gói và nhận báo giá thiết kế website</h2>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Xem bảng giá thiết kế website (tab Website)",
              "Đối chiếu phạm vi và ngân sách tham khảo",
              "Xem chi tiết dịch vụ tại trang thiết kế website",
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
          <h2 className="text-xl font-bold text-indigo-950">Câu hỏi thường gặp về báo giá thiết kế website</h2>
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
            Cần tư vấn gói phù hợp? Xem{" "}
            <Link href="/website" className="font-semibold text-violet-700 underline">
              dịch vụ thiết kế website
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
          <ServiceConversionFooter title="Cần báo giá thiết kế website chi tiết?" />
        </div>
      </main>

      <PricingStickyBar />
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
