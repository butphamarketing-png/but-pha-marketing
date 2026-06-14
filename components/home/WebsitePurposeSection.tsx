"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Globe,
  Headphones,
  MapPin,
  Megaphone,
  MessageCircle,
  MousePointerClick,
  Phone,
  Search,
  Share2,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionWaveDivider } from "@/components/shared/SectionWaveDivider";
import {
  EASE_PREMIUM,
  fadeUp,
  fadeUpChild,
  scaleIn,
  slideLeft,
  staggerIntro,
  VIEWPORT_ONCE,
} from "@/lib/motion-presets";

const journeySteps = [
  {
    step: "01",
    title: "Khách hàng tìm kiếm",
    desc: "Khách tìm thấy bạn đúng lúc cần — qua tìm kiếm, mạng xã hội hoặc quảng cáo.",
    descMobile: "Tìm thấy bạn đúng lúc cần qua Google, MXH hoặc Ads.",
    icon: Search,
  },
  {
    step: "02",
    title: "Truy cập website",
    desc: "Website xuất hiện chuyên nghiệp, tạo ấn tượng tin cậy ngay lần đầu.",
    descMobile: "Giao diện chuyên nghiệp, tạo niềm tin ngay lần đầu.",
    icon: MousePointerClick,
  },
  {
    step: "03",
    title: "Xem dịch vụ & thông tin",
    desc: "Khách đọc dịch vụ, dự án, đánh giá và so sánh trước khi liên hệ.",
    descMobile: "Đọc dịch vụ, dự án và đánh giá trước khi liên hệ.",
    icon: Sparkles,
  },
  {
    step: "04",
    title: "Để lại thông tin",
    desc: "Form tư vấn, Zalo, Messenger — thu lead nhanh trên mobile.",
    descMobile: "Form, Zalo, Messenger — thu lead nhanh trên mobile.",
    icon: MessageCircle,
    href: "/lien-he",
  },
  {
    step: "05",
    title: "Chăm sóc & tư vấn",
    desc: "Đội ngũ gọi điện, nhắn tin và tư vấn đúng nhu cầu khách hàng.",
    descMobile: "Gọi điện, nhắn tin và tư vấn đúng nhu cầu.",
    icon: Headphones,
  },
  {
    step: "06",
    title: "Chốt đơn & tăng trưởng",
    desc: "Ký hợp đồng, giữ chân khách và mở rộng doanh thu bền vững.",
    descMobile: "Chốt đơn, giữ chân khách và tăng doanh thu.",
    icon: TrendingUp,
  },
];

const channelChips = [
  { label: "Google", icon: Search, className: "bg-blue-50 text-blue-700 border-blue-100" },
  { label: "Maps", icon: MapPin, className: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  { label: "Facebook", icon: Share2, className: "bg-sky-50 text-sky-700 border-sky-100" },
  { label: "Zalo", icon: MessageCircle, className: "bg-indigo-50 text-indigo-700 border-indigo-100" },
  { label: "Google Ads", icon: Megaphone, className: "bg-amber-50 text-amber-700 border-amber-100" },
];

const mockupServices = [
  { title: "Thiết kế web", accent: "from-violet-100 to-indigo-100" },
  { title: "Facebook Ads", accent: "from-sky-100 to-blue-100" },
  { title: "Google Maps", accent: "from-emerald-100 to-teal-100" },
];

const benefits = [
  { label: "Lead từ form & Zalo", icon: UserPlus },
  { label: "Cuộc gọi từ hotline web", icon: Phone },
  { label: "Tin nhắn qua Messenger", icon: MessageCircle },
  { label: "Tỷ lệ chuyển đổi cao", icon: Target },
  { label: "Doanh thu tăng trưởng", icon: TrendingUp },
  { label: "Uy tín thương hiệu", icon: Shield },
];

function WebsiteMockup() {
  return (
    <div className="relative mx-auto max-w-lg lg:max-w-none">
      <div className="home-blob-float absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-violet-200/50 via-indigo-100/30 to-transparent blur-2xl" />
      <div className="group/mockup relative transition-transform duration-700 lg:-rotate-2 lg:hover:-rotate-[1.5deg]">
        <div className="overflow-hidden rounded-[1.75rem] border border-indigo-100 bg-white shadow-brand-lg transition-shadow duration-500 group-hover/mockup:shadow-[0_32px_64px_rgba(49,46,129,0.18)]">
          <div className="flex items-center gap-2 border-b border-indigo-50 bg-indigo-50/60 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            </div>
            <div className="mx-auto flex h-7 flex-1 max-w-[220px] items-center gap-1.5 rounded-full border border-indigo-100 bg-white px-3 text-[10px] text-slate-400">
              <Globe size={10} className="shrink-0 text-emerald-500" />
              doanhnghiep-mau.vn
            </div>
          </div>

          <div className="border-b border-indigo-50 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full border border-indigo-100 bg-white">
                  <Image src="/logo.png" alt="Logo mẫu" fill className="object-contain p-1" />
                </div>
                <span className="text-xs font-bold text-indigo-950">Doanh nghiệp mẫu</span>
              </div>
              <div className="hidden gap-3 sm:flex">
                {["Dịch vụ", "Dự án", "Liên hệ"].map((item) => (
                  <span key={item} className="text-[10px] font-semibold text-slate-500">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-950 via-violet-900 to-indigo-800 px-5 py-6 text-white">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-200">Thiết kế chuẩn SEO</p>
            <p className="mt-2 text-lg font-black leading-snug">Website chuyên nghiệp giúp thu khách mỗi ngày</p>
            <p className="mt-2 max-w-sm text-xs leading-relaxed text-violet-100/90">
              Hiển thị dịch vụ rõ ràng, tạo niềm tin và dẫn khách đến form liên hệ nhanh.
            </p>
            <div className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold text-violet-800">
              Tư vấn miễn phí
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 p-4">
            {mockupServices.map((item) => (
              <div key={item.title} className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-2 text-center">
                <div className={`mx-auto mb-2 h-10 w-full rounded-lg bg-gradient-to-br ${item.accent}`} />
                <p className="text-[10px] font-bold leading-tight text-indigo-950">{item.title}</p>
              </div>
            ))}
          </div>

          <div className="relative border-t border-indigo-50 bg-indigo-50/30 p-4">
            <span className="absolute -top-3 right-4 inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-700 shadow-sm">
              +12 lead tuần này
            </span>
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-bold text-indigo-950">Đăng ký tư vấn nhanh</p>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <MessageCircle size={12} />
              </span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="rounded-lg border border-indigo-100 bg-white px-3 py-2 text-[10px] text-slate-400">Họ và tên</div>
              <div className="rounded-lg border border-indigo-100 bg-white px-3 py-2 text-[10px] text-slate-400">Số điện thoại</div>
              <div className="rounded-lg bg-violet-600 py-2 text-center text-[10px] font-bold text-white">Gửi thông tin</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function JourneyStepCard({
  item,
  index,
  total,
}: {
  item: (typeof journeySteps)[number];
  index: number;
  total: number;
}) {
  const reduceMotion = useReducedMotion();

  const content = (
    <>
      {index < total - 1 && (
        <motion.span
          className="absolute left-[1.35rem] top-12 w-px origin-top bg-gradient-to-b from-violet-400 to-indigo-100"
          style={{ height: "calc(100% - 0.5rem)" }}
          initial={reduceMotion ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.5, delay: index * 0.08 + 0.12, ease: EASE_PREMIUM }}
        />
      )}
      <motion.div
        className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-xs font-black text-white shadow-brand-accent"
        initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.45, delay: index * 0.08, ease: EASE_PREMIUM }}
      >
        {item.step}
      </motion.div>
      <div className="brand-card-soft min-w-0 flex-1 p-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-violet-200/80 group-hover:shadow-brand">
        <div className="flex items-center gap-2">
          <item.icon size={16} className="text-violet-600 transition-colors group-hover:text-violet-700" />
          <p className="font-bold text-indigo-950">{item.title}</p>
        </div>
        <p className="mt-2 hidden text-sm leading-relaxed text-slate-600 sm:block">{item.desc}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:hidden">{item.descMobile}</p>
      </div>
    </>
  );

  const rowClassName = "relative flex gap-4";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      custom={index * 0.08}
      className="group"
    >
      {item.href ? (
        <Link href={item.href} className={rowClassName}>
          {content}
        </Link>
      ) : (
        <div className={rowClassName}>{content}</div>
      )}
    </motion.div>
  );
}

export function WebsitePurposeSection() {
  return (
    <section id="website-purpose" className="relative overflow-hidden brand-section-muted">
      <SectionWaveDivider from="#ffffff" to="#eef2ff" />

      <div className="brand-section-inner px-4 pb-24 pt-4 md:px-8 lg:px-12">
        <motion.div
          variants={staggerIntro}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="brand-section-intro mb-12 md:mb-16"
        >
          <motion.p variants={fadeUpChild} className="brand-eyebrow">
            Vai trò website
          </motion.p>
          <motion.h2 variants={fadeUpChild} className="brand-section-title">
            Website để <span className="brand-gradient-text">làm gì?</span>
          </motion.h2>
          <motion.p variants={fadeUpChild} className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-slate-600">
            Website là trung tâm thu khách — biến traffic từ Google, Facebook, Maps và Zalo thành lead, cuộc gọi và doanh thu.
          </motion.p>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} custom={0.05}>
            <WebsiteMockup />
            <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              {channelChips.map((chip, index) => (
                <motion.span
                  key={chip.label}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_ONCE}
                  custom={index * 0.07}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${chip.className}`}
                >
                  <chip.icon size={12} className="shrink-0 opacity-80" />
                  {chip.label}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <div className="space-y-4">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="text-sm font-bold text-violet-700"
            >
              Quy trình chuyển đổi trên website
            </motion.p>
            <div className="space-y-3">
              {journeySteps.map((item, index) => (
                <JourneyStepCard key={item.step} item={item} index={index} total={journeySteps.length} />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-16 rounded-[2rem] border border-indigo-100 bg-gradient-to-br from-white via-indigo-50/20 to-violet-50/10 p-6 shadow-brand md:p-8"
        >
          <div className="mb-8 text-center">
            <p className="brand-eyebrow mb-3">Kết quả thực tế</p>
            <h3 className="text-2xl font-black text-indigo-950 md:text-3xl">Website mang lại giá trị gì?</h3>
          </div>

          <div className="grid grid-cols-3 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {benefits.map((item, index) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                custom={index * 0.06}
                className="text-center"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-100 text-violet-700 transition-transform duration-300 hover:scale-105">
                  <item.icon size={20} />
                </div>
                <p className="text-xs font-bold leading-snug text-indigo-950 sm:text-sm">{item.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <Link href="/website" className="brand-btn-primary px-8 py-4">
              Xem giải pháp website
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/lien-he"
              className="text-sm font-semibold text-violet-600 underline-offset-4 transition hover:text-violet-800 hover:underline"
            >
              Tư vấn miễn phí — phản hồi trong 15 phút
            </Link>
            <p className="text-xs font-medium text-slate-500">1.000+ dự án đã triển khai thành công</p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-10 flex items-center justify-center gap-2 px-2 text-center text-sm font-semibold text-violet-600"
        >
          <Users size={16} className="hidden shrink-0 sm:block" />
          <span className="leading-relaxed sm:inline">
            <span className="sm:hidden">Từ tìm kiếm đến chốt đơn — bắt đầu từ website đúng cách</span>
            <span className="hidden sm:inline">
              Từ tìm kiếm đến ký hợp đồng — tất cả bắt đầu từ một website đúng cách
            </span>
          </span>
          <ChevronRight size={16} className="hidden shrink-0 sm:block" />
        </motion.div>
      </div>
    </section>
  );
}
