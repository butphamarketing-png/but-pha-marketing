"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  FileSignature,
  MapPinned,
  Megaphone,
  MessageCircle,
  Phone,
  Search,
  Shield,
  Target,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { SiFacebook } from "react-icons/si";
import Link from "next/link";

const trafficSources = [
  {
    title: "Google Search",
    caption: "Khách tìm dịch vụ đúng lúc có nhu cầu",
    icon: Search,
    preview: "nha khoa quận 7",
  },
  {
    title: "Google Maps",
    caption: "Hiện diện địa phương, nhận cuộc gọi & chỉ đường",
    icon: MapPinned,
    preview: "4.9★ · Gần bạn",
  },
  {
    title: "Facebook",
    caption: "Fanpage & quảng cáo thu hút khách quan tâm",
    icon: SiFacebook,
    preview: "Nhắn tin tư vấn",
  },
  {
    title: "Zalo",
    caption: "Kênh chat quen thuộc của khách Việt",
    icon: MessageCircle,
    preview: "Chat nhanh 24/7",
  },
  {
    title: "Google Ads",
    caption: "Quảng cáo đúng từ khóa, tăng traffic chất lượng",
    icon: Megaphone,
    preview: "Quảng cáo · Tìm kiếm",
  },
];

const conversionSteps = [
  { step: "01", title: "Khách tiềm năng", desc: "Truy cập website từ nhiều kênh", icon: Users },
  { step: "02", title: "Tin nhắn & tư vấn", desc: "Form, Zalo, Messenger", icon: MessageCircle },
  { step: "03", title: "Cuộc gọi", desc: "Hotline tư vấn sát nhu cầu", icon: Phone },
  { step: "04", title: "Ký hợp đồng", desc: "Chốt gói dịch vụ / dự án", icon: FileSignature },
  { step: "05", title: "Tăng doanh thu", desc: "Khách quay lại & giới thiệu thêm", icon: TrendingUp },
];

const benefits = [
  { title: "More Leads", label: "Nhiều khách để lại thông tin", icon: UserPlus },
  { title: "More Calls", label: "Tăng cuộc gọi tư vấn", icon: Phone },
  { title: "More Messages", label: "Nhiều tin Zalo / Messenger", icon: MessageCircle },
  { title: "More Conversions", label: "Tỷ lệ chuyển đổi cao hơn", icon: Target },
  { title: "More Revenue", label: "Doanh thu tăng bền vững", icon: TrendingUp },
  { title: "Brand Authority", label: "Thương hiệu uy tín, chuyên nghiệp", icon: Shield },
];

function GlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-violet-400/20 bg-white/[0.04] p-4 shadow-[0_0_40px_rgba(124,58,237,0.12)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

export function WebsitePurposeSection() {
  return (
    <section
      id="website-purpose"
      className="relative overflow-hidden bg-[#05010d] px-4 py-20 md:px-8 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(124,58,237,0.22),transparent_55%)]" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-violet-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-indigo-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-violet-200">
              Hành trình khách hàng
            </span>
            <h2 className="text-4xl font-black leading-tight text-white md:text-5xl">
              Website để{" "}
              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
                làm gì?
              </span>
            </h2>
            <p className="max-w-xl text-base leading-8 text-slate-300 md:text-lg">
              Website không chỉ để giới thiệu — mà là trung tâm thu hút khách từ Google, Facebook, Maps, Zalo,
              tạo lead, tăng cuộc gọi, tin nhắn, chuyển đổi và doanh thu bền vững.
            </p>
            <Link
              href="/website"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-violet-900 transition hover:bg-violet-50"
            >
              Xem giải pháp website
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-violet-600/20 blur-3xl" />
            <GlowCard className="relative overflow-hidden p-0">
              <div className="border-b border-white/10 bg-gradient-to-r from-violet-950/80 to-indigo-950/80 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-200">Website doanh nghiệp</p>
                <p className="mt-1 text-lg font-bold text-white">Trung tâm chuyển đổi khách hàng</p>
              </div>
              <div className="space-y-4 p-5">
                <div className="rounded-xl border border-white/10 bg-gradient-to-br from-violet-900/40 to-indigo-900/20 p-4">
                  <p className="text-sm font-bold text-white">Thiết kế chuyên nghiệp · Chuẩn SEO</p>
                  <p className="mt-1 text-xs text-slate-300">Hero · Dịch vụ · Dự án · Form liên hệ</p>
                  <div className="mt-3 inline-flex rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-bold text-white">
                    Tư vấn miễn phí
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["Dịch vụ", "Dự án", "Đánh giá"].map((item) => (
                    <div key={item} className="rounded-lg border border-white/10 bg-white/5 px-2 py-3 text-center text-[11px] font-semibold text-violet-100">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-[11px] font-semibold text-violet-200">Form đăng ký tư vấn</p>
                  <div className="mt-2 space-y-2">
                    <div className="h-8 rounded-lg bg-white/10" />
                    <div className="h-8 rounded-lg bg-white/10" />
                    <div className="h-9 rounded-lg bg-violet-600/80" />
                  </div>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-8 xl:grid-cols-[1fr_1.2fr_1fr]">
          <div className="space-y-3">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-violet-300">Nguồn traffic</p>
            {trafficSources.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <GlowCard className="flex items-start gap-3">
                  <div className="rounded-xl bg-violet-500/15 p-2 text-violet-200">
                    <item.icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{item.caption}</p>
                    <p className="mt-2 inline-flex rounded-md border border-white/10 bg-black/20 px-2 py-1 text-[10px] text-violet-200">
                      {item.preview}
                    </p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>

          <div className="hidden xl:flex items-center justify-center">
            <div className="h-full w-px bg-gradient-to-b from-transparent via-violet-500/50 to-transparent" />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-violet-300">Hành trình chuyển đổi</p>
            {conversionSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <GlowCard className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-xs font-black text-white">
                    {item.step}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <item.icon size={16} className="text-violet-300" />
                      <p className="font-semibold text-white">{item.title}</p>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{item.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <p className="mb-6 text-center text-sm font-bold uppercase tracking-[0.18em] text-violet-300">
            Website mang lại kết quả thật
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {benefits.map((item) => (
              <GlowCard key={item.title} className="text-center">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-200">
                  <item.icon size={20} />
                </div>
                <p className="text-xs font-bold uppercase tracking-wide text-violet-200">{item.title}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-400">{item.label}</p>
              </GlowCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
