"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Globe,
  Phone,
  Rocket,
  Server,
  Shield,
} from "lucide-react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { ConsultModal } from "@/components/shared/ConsultModal";
import { ConsultationModal } from "@/components/shared/PlatformPage";
import { useAdmin } from "@/lib/AdminContext";
import { PLATFORM_COLORS } from "@/lib/brand-colors";
import {
  formatPriceVnd,
  getWebsiteOperationPackagesByTier,
  type WebsiteOperationTierKey,
} from "@/lib/service-pricing";
import { getTelHref, getZaloUrl, resolveHotline } from "@/lib/site-contact";
import { fadeUpChild, staggerIntro, VIEWPORT_ONCE } from "@/lib/motion-presets";

const PRIMARY = PLATFORM_COLORS.website;

const HERO_BULLETS = [
  "Theo dõi website liên tục",
  "Hỗ trợ xử lý sự cố",
  "Bảo mật dữ liệu",
  "Sao lưu định kỳ",
  "Tối ưu hiệu suất",
];

const PRICING_GROUPS: {
  emoji: string;
  title: string;
  tier: WebsiteOperationTierKey;
  color: string;
  description: string;
}[] = [
  {
    emoji: "🟢",
    title: "NHÓM KHỞI ĐẦU",
    tier: "yeu",
    color: "#22C55E",
    description: "Phù hợp cho website mới hoạt động và lượng truy cập thấp.",
  },
  {
    emoji: "🔵",
    title: "NHÓM TĂNG TRƯỞNG",
    tier: "vua",
    color: "#3B82F6",
    description: "Dành cho doanh nghiệp đang chạy marketing và quảng cáo thường xuyên.",
  },
  {
    emoji: "🟣",
    title: "NHÓM DOANH NGHIỆP",
    tier: "manh",
    color: "#9333EA",
    description: "Dành cho doanh nghiệp cần hiệu suất cao và vận hành ổn định lâu dài.",
  },
];

const WHAT_WE_DO = [
  { icon: "🛠️", text: "Theo dõi hoạt động website" },
  { icon: "🔒", text: "Kiểm tra và tăng cường bảo mật" },
  { icon: "💾", text: "Sao lưu dữ liệu định kỳ" },
  { icon: "⚡", text: "Tối ưu tốc độ tải trang" },
  { icon: "📞", text: "Hỗ trợ kỹ thuật khi phát sinh sự cố" },
  { icon: "📊", text: "Kiểm tra hiệu suất hoạt động" },
  { icon: "🔄", text: "Cập nhật và bảo trì hệ thống" },
  { icon: "🌐", text: "Quản lý tên miền và SSL" },
];

const WHY_US = [
  "Hỗ trợ nhanh chóng",
  "Đồng hành lâu dài",
  "Chủ động phát hiện lỗi",
  "Bảo vệ dữ liệu doanh nghiệp",
  "Website hoạt động ổn định 24/7",
  "Không cần thuê nhân sự kỹ thuật riêng",
];

const PROCESS_STEPS = [
  "Tiếp nhận thông tin website",
  "Kiểm tra tổng thể hệ thống",
  "Tư vấn gói phù hợp",
  "Thiết lập vận hành",
  "Theo dõi và hỗ trợ liên tục",
];

const NAV_SECTIONS = [
  { id: "hero", label: "Tổng quan" },
  { id: "pricing", label: "Bảng giá" },
  { id: "services", label: "Dịch vụ" },
  { id: "why-us", label: "Vì sao chọn" },
  { id: "process", label: "Quy trình" },
  { id: "cta", label: "Liên hệ" },
];

function SectionHeading({ title }: { title: React.ReactNode }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-indigo-950 md:text-4xl lg:text-5xl">{title}</h2>
    </div>
  );
}

export function VanHanhWebsiteLanding() {
  const { settings } = useAdmin();
  const [showConsult, setShowConsult] = useState(false);
  const [checkoutPkg, setCheckoutPkg] = useState<{
    name: string;
    price: string;
    color: string;
    tabLabel: string;
  } | null>(null);

  const hotline = resolveHotline(settings?.hotline);
  const telHref = getTelHref(settings?.hotline);
  const zaloHref = getZaloUrl(settings?.hotline);

  const openPackageConsult = (pkgName: string, price: number, groupTitle: string) => {
    setCheckoutPkg({
      name: `Vận hành ${pkgName}`,
      price: formatPriceVnd(price),
      color: PRIMARY,
      tabLabel: `Gói vận hành — ${groupTitle}`,
    });
  };

  return (
    <SubPageLayout platformName="Vận hành Website" primaryColor={PRIMARY} customSections={NAV_SECTIONS}>
      <div className="mx-auto max-w-7xl px-4 pb-24">
        {/* 1. Hero */}
        <section id="hero" className="scroll-mt-24 py-16 md:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={staggerIntro}
            className="brand-card overflow-hidden p-8 md:p-14 lg:p-16"
          >
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <motion.div variants={fadeUpChild} className="space-y-8">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500">Managed Operations</p>
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-indigo-950 md:text-4xl lg:text-5xl">
                  VẬN HÀNH WEBSITE CHUYÊN NGHIỆP
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
                  Để doanh nghiệp tập trung kinh doanh, mọi vấn đề kỹ thuật đã có Bứt Phá Marketing đồng hành.
                </p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {HERO_BULLETS.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setShowConsult(true)}
                  className="rounded-2xl px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:brightness-105 active:scale-[0.99]"
                  style={{ background: `linear-gradient(135deg, #312E81, ${PRIMARY})` }}
                >
                  NHẬN TƯ VẤN
                </button>
              </motion.div>
              <motion.div variants={fadeUpChild} className="relative">
                <div
                  className="absolute -inset-4 rounded-[2rem] opacity-20 blur-2xl"
                  style={{ backgroundColor: PRIMARY }}
                />
                <div className="relative flex aspect-[4/3] items-center justify-center rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-100 p-10 shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    {[Server, Shield, Activity, Globe].map((Icon, i) => (
                      <div
                        key={i}
                        className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-md"
                        style={{ color: PRIMARY }}
                      >
                        <Icon size={36} />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* 2. Pricing groups */}
        <section id="pricing" className="scroll-mt-24 py-16 md:py-20">
          <SectionHeading
            title={
              <>
                Các Gói <span style={{ color: PRIMARY }}>Vận Hành Website</span>
              </>
            }
          />
          <div className="space-y-12">
            {PRICING_GROUPS.map((group) => {
              const packages = getWebsiteOperationPackagesByTier(group.tier);
              return (
                <div key={group.tier} className="brand-card overflow-hidden">
                  <div
                    className="border-b border-indigo-100 px-6 py-5 md:px-8"
                    style={{ backgroundColor: `${group.color}08` }}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xl">{group.emoji}</span>
                      <h3 className="text-lg font-bold tracking-wide text-indigo-950 md:text-xl">{group.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{group.description}</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[320px] text-left">
                      <thead>
                        <tr className="border-b border-indigo-100 bg-indigo-50/50">
                          <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500 md:px-8">
                            Gói
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500 md:px-8">
                            Giá
                          </th>
                          <th className="hidden px-8 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500 sm:table-cell">
                            Đăng ký
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {packages.map((pkg) => (
                          <tr
                            key={pkg.id}
                            className="border-b border-indigo-50 transition hover:bg-indigo-50/40"
                          >
                            <td className="px-6 py-4 font-semibold text-indigo-950 md:px-8">{pkg.name}</td>
                            <td className="px-6 py-4 text-right font-bold md:px-8" style={{ color: group.color }}>
                              {formatPriceVnd(pkg.price)}
                              <span className="block text-xs font-medium text-slate-500">/ năm</span>
                            </td>
                            <td className="hidden px-8 py-4 text-right sm:table-cell">
                              <button
                                type="button"
                                onClick={() => openPackageConsult(pkg.name, pkg.price, group.title)}
                                className="rounded-xl px-4 py-2 text-xs font-bold text-white transition hover:brightness-105"
                                style={{ backgroundColor: group.color }}
                              >
                                Chọn gói
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="border-t border-indigo-100 p-4 sm:hidden">
                    <button
                      type="button"
                      onClick={() =>
                        openPackageConsult(packages[0].name, packages[0].price, group.title)
                      }
                      className="w-full rounded-xl py-3 text-sm font-bold text-white"
                      style={{ backgroundColor: group.color }}
                    >
                      Tư vấn {group.title}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. What we do */}
        <section id="services" className="scroll-mt-24 py-16 md:py-20">
          <SectionHeading
            title={
              <>
                Bứt Phá Marketing <span style={{ color: PRIMARY }}>Sẽ Làm Gì?</span>
              </>
            }
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHAT_WE_DO.map((item) => (
              <li
                key={item.text}
                className="brand-card flex items-start gap-3 p-5 transition hover:-translate-y-0.5"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium leading-relaxed text-slate-700">{item.text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 4. Why us */}
        <section id="why-us" className="scroll-mt-24 py-16 md:py-20">
          <SectionHeading
            title={
              <>
                Vì Sao Chọn <span style={{ color: PRIMARY }}>Bứt Phá Marketing?</span>
              </>
            }
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm"
              >
                <Rocket className="mt-0.5 h-5 w-5 shrink-0 text-violet-600" />
                <span className="text-sm font-medium leading-relaxed text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Process */}
        <section id="process" className="scroll-mt-24 py-16 md:py-20">
          <SectionHeading
            title={
              <>
                Quy Trình <span style={{ color: PRIMARY }}>Triển Khai</span>
              </>
            }
          />
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS_STEPS.map((title, idx) => (
              <div key={title} className="brand-card p-6 text-center">
                <div
                  className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: PRIMARY }}
                >
                  {idx + 1}
                </div>
                <p className="text-sm font-bold text-indigo-950">{title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. CTA */}
        <section id="cta" className="scroll-mt-24 py-16 md:py-20">
          <div
            className="overflow-hidden rounded-[2rem] p-8 text-center md:p-14"
            style={{ background: `linear-gradient(135deg, #312E81 0%, ${PRIMARY} 100%)` }}
          >
            <h2 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
              WEBSITE KHÔNG CHỈ CẦN XÂY DỰNG — MÀ CẦN ĐƯỢC VẬN HÀNH
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-indigo-100 md:text-base">
              Đừng để website gặp sự cố mới bắt đầu quan tâm đến việc bảo trì và vận hành.
              <br />
              Liên hệ Bứt Phá Marketing để được tư vấn giải pháp phù hợp.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-white">
              <a href={telHref} className="inline-flex items-center gap-2 transition hover:opacity-90">
                <Phone className="h-5 w-5" />
                Hotline: {hotline}
              </a>
              <a
                href="https://www.butphamarketing.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition hover:opacity-90"
              >
                <Globe className="h-5 w-5" />
                Butphamarketing.com
              </a>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => setShowConsult(true)}
                className="rounded-2xl bg-white px-8 py-4 text-sm font-bold text-indigo-900 shadow-xl transition hover:scale-[1.02] active:scale-[0.99]"
              >
                ĐĂNG KÝ TƯ VẤN NGAY
              </button>
              <a
                href={zaloHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/30 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Chat Zalo
              </a>
            </div>
            <p className="mt-8 text-xs text-indigo-200">
              Xem thêm thiết kế website tại{" "}
              <Link href="/website/thietkewebsite" className="underline hover:text-white">
                /website/thietkewebsite
              </Link>
            </p>
          </div>
        </section>
      </div>

      <ConsultModal isOpen={showConsult} onClose={() => setShowConsult(false)} platformColor={PRIMARY} />
      <AnimatePresence>
        {checkoutPkg && (
          <ConsultationModal
            pkg={checkoutPkg}
            platformKey="website"
            onClose={() => setCheckoutPkg(null)}
          />
        )}
      </AnimatePresence>
    </SubPageLayout>
  );
}
