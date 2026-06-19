"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  Globe,
  Phone,
  Rocket,
  XCircle,
} from "lucide-react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { ConsultModal } from "@/components/shared/ConsultModal";
import { useAdmin } from "@/lib/AdminContext";
import { PLATFORM_COLORS } from "@/lib/brand-colors";
import { getTelHref, getZaloUrl, resolveHotline } from "@/lib/site-contact";
import { fadeUpChild, staggerIntro, VIEWPORT_ONCE } from "@/lib/motion-presets";

const PRIMARY = PLATFORM_COLORS.website;

const HERO_BULLETS = [
  "Chuẩn SEO Google",
  "Giao diện chuyên nghiệp",
  "Tốc độ tải nhanh",
  "Responsive mọi thiết bị",
  "Dễ dàng quản trị",
];

const PROBLEMS = [
  "Không có khách hàng từ Google",
  "Website cũ, lỗi thời",
  "Tải chậm, trải nghiệm kém",
  "Thiếu sự chuyên nghiệp với khách hàng",
  "Không có đơn vị hỗ trợ kỹ thuật",
  "Không cạnh tranh được với các đối thủ",
];

const SOLUTIONS = [
  "Thiết kế giao diện chuyên nghiệp",
  "Xây dựng website chuẩn SEO",
  "Tối ưu tốc độ tải trang",
  "Tích hợp Zalo, Messenger, Google Maps",
  "Tích hợp Form nhận khách hàng tiềm năng",
  "Kết nối Google Analytics & Search Console",
  "Bảo mật SSL và sao lưu dữ liệu",
  "Hỗ trợ vận hành sau bàn giao",
];

const BENEFITS = [
  "Nhận diện thương hiệu tốt",
  "Chuẩn SEO ngay từ đầu",
  "Tối ưu tốc độ tải trang",
  "Tương thích điện thoại, tablet, máy tính",
  "Tích hợp Google Maps Messenger/Zalo",
  "Tích hợp Form liên hệ",
  "Đội ngũ hỗ trợ kỹ thuật nhanh chóng",
  "Hệ thống quản trị dễ sử dụng",
];

const PROCESS_STEPS = [
  { step: 1, title: "Tiếp nhận yêu cầu" },
  { step: 2, title: "Phân tích ngành nghề" },
  { step: 3, title: "Thiết kế giao diện" },
  { step: 4, title: "Lập trình website" },
  { step: 5, title: "Kiểm thử & tối ưu" },
  { step: 6, title: "Bàn giao & hướng dẫn sử dụng" },
];

const WHY_US = [
  "Thiết kế chuẩn SEO",
  "Tối ưu chuyển đổi khách hàng",
  "Giao diện hiện đại",
  "Đồng hành lâu dài",
  "Hỗ trợ kỹ thuật nhanh chóng",
  "Tư vấn giải pháp phù hợp từng doanh nghiệp",
];

const FAQS = [
  {
    q: "Website bao lâu hoàn thành?",
    a: "Landing page: 3–5 ngày. Website doanh nghiệp: 1–2 tuần. Website bán hàng / TMĐT: 3–4 tuần tùy phạm vi tính năng.",
  },
  {
    q: "Tôi có thể tự chỉnh sửa nội dung không?",
    a: "Có. Bứt Phá Marketing bàn giao tài khoản quản trị và hướng dẫn sử dụng để bạn tự cập nhật tin tức, sản phẩm, hình ảnh.",
  },
  {
    q: "Website có chuẩn SEO không?",
    a: "Có. Cấu trúc heading, meta, tốc độ tải, schema và sitemap được tối ưu ngay từ giai đoạn thiết kế — sẵn sàng index Google.",
  },
  {
    q: "Có hỗ trợ sau bàn giao không?",
    a: "Có. Đội ngũ hỗ trợ kỹ thuật, bảo trì và gói vận hành website giúp website luôn ổn định sau khi go-live.",
  },
  {
    q: "Tôi cần chuẩn bị những gì để làm website?",
    a: "Logo, thông tin doanh nghiệp, hình ảnh sản phẩm/dịch vụ, nội dung giới thiệu cơ bản. Đội ngũ sẽ hướng dẫn chi tiết sau khi tiếp nhận.",
  },
];

const NAV_SECTIONS = [
  { id: "hero", label: "Tổng quan" },
  { id: "problems", label: "Vấn đề" },
  { id: "solutions", label: "Giải pháp" },
  { id: "benefits", label: "Lợi ích" },
  { id: "process", label: "Quy trình" },
  { id: "portfolio", label: "Dự án" },
  { id: "why-us", label: "Vì sao chọn" },
  { id: "faq", label: "FAQ" },
  { id: "cta", label: "Liên hệ" },
];

const FALLBACK_PORTFOLIO = [
  { title: "Doanh nghiệp xây dựng", industry: "Xây dựng", image: "/Website.png" },
  { title: "Spa & thẩm mỹ", industry: "Làm đẹp", image: "/Website.png" },
  { title: "Cửa hàng thời trang", industry: "Bán lẻ", image: "/Website.png" },
];

function SectionHeading({ eyebrow, title, accent }: { eyebrow?: string; title: React.ReactNode; accent?: string }) {
  return (
    <div className="mb-12 text-center space-y-4">
      {eyebrow && (
        <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: accent || PRIMARY }}>
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-indigo-950 md:text-4xl lg:text-5xl">{title}</h2>
    </div>
  );
}

function CheckList({ items, variant = "check" }: { items: string[]; variant?: "check" | "cross" | "rocket" }) {
  const Icon = variant === "cross" ? XCircle : variant === "rocket" ? Rocket : CheckCircle2;
  const iconClass =
    variant === "cross"
      ? "text-rose-500"
      : variant === "rocket"
        ? "text-violet-600"
        : "text-emerald-600";

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm">
          <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconClass}`} />
          <span className="text-sm font-medium leading-relaxed text-slate-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ThietKeWebsiteLanding() {
  const { settings } = useAdmin();
  const [showConsult, setShowConsult] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const hotline = resolveHotline(settings?.hotline);
  const telHref = getTelHref(settings?.hotline);
  const zaloHref = getZaloUrl(settings?.hotline);

  const portfolio = useMemo(() => {
    const fromFeatured = (settings?.featuredProjects || [])
      .filter((p) => p.title.trim())
      .map((p) => ({
        title: p.title,
        industry: p.description || p.note || "Doanh nghiệp",
        image: p.thumbnail || "/Website.png",
      }));

    if (fromFeatured.length > 0) return fromFeatured.slice(0, 6);

    const cases = settings?.media?.home?.cases || [];
    if (cases.length > 0) {
      return cases.slice(0, 6).map((c) => ({
        title: c.title,
        industry: c.description || "Dự án tiêu biểu",
        image: c.after || c.before || "/Website.png",
      }));
    }

    return FALLBACK_PORTFOLIO;
  }, [settings?.featuredProjects, settings?.media?.home?.cases]);

  return (
    <SubPageLayout platformName="Thiết kế Website" primaryColor={PRIMARY} customSections={NAV_SECTIONS}>
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
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500">Bứt Phá Marketing</p>
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-indigo-950 md:text-4xl lg:text-5xl">
                  THIẾT KẾ WEBSITE CHUYÊN NGHIỆP CHO DOANH NGHIỆP
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
                  Website không chỉ để giới thiệu doanh nghiệp mà còn là công cụ tìm kiếm khách hàng 24/7.
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
                  NHẬN TƯ VẤN MIỄN PHÍ
                </button>
              </motion.div>
              <motion.div variants={fadeUpChild} className="relative">
                <div
                  className="absolute -inset-4 rounded-[2rem] opacity-20 blur-2xl"
                  style={{ backgroundColor: PRIMARY }}
                />
                <img
                  src="/Website.png"
                  alt="Thiết kế website chuyên nghiệp"
                  className="relative w-full rounded-3xl border border-indigo-100 object-cover shadow-2xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* 2. Problems */}
        <section id="problems" className="scroll-mt-24 py-16 md:py-20">
          <SectionHeading
            title={
              <>
                Website Của Bạn Đang Gặp{" "}
                <span style={{ color: PRIMARY }}>Những Vấn Đề Này?</span>
              </>
            }
          />
          <CheckList items={PROBLEMS} variant="cross" />
        </section>

        {/* 3. Solutions */}
        <section id="solutions" className="scroll-mt-24 py-16 md:py-20">
          <SectionHeading
            eyebrow="Giải pháp"
            accent={PRIMARY}
            title={
              <>
                Giải Pháp Từ <span style={{ color: PRIMARY }}>Bứt Phá Marketing</span>
              </>
            }
          />
          <CheckList items={SOLUTIONS} variant="check" />
        </section>

        {/* 4. Benefits */}
        <section id="benefits" className="scroll-mt-24 py-16 md:py-20">
          <SectionHeading
            title={
              <>
                Những Gì Bạn <span style={{ color: PRIMARY }}>Nhận Được</span>
              </>
            }
          />
          <CheckList items={BENEFITS} variant="check" />
        </section>

        {/* 5. Process */}
        <section id="process" className="scroll-mt-24 py-16 md:py-20">
          <SectionHeading
            eyebrow="Quy trình"
            accent={PRIMARY}
            title={
              <>
                Quy Trình <span style={{ color: PRIMARY }}>Triển Khai</span>
              </>
            }
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className="brand-card group relative overflow-hidden p-8 transition hover:-translate-y-1"
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold text-white"
                  style={{ backgroundColor: PRIMARY }}
                >
                  {item.step}
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Bước {item.step}</p>
                <h3 className="mt-2 text-xl font-bold text-indigo-950">{item.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Portfolio */}
        <section id="portfolio" className="scroll-mt-24 py-16 md:py-20">
          <SectionHeading
            title={
              <>
                Dự Án <span style={{ color: PRIMARY }}>Đã Thực Hiện</span>
              </>
            }
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((item) => (
              <article key={`${item.title}-${item.industry}`} className="brand-card overflow-hidden transition hover:-translate-y-1">
                <div className="aspect-[16/10] overflow-hidden bg-indigo-50">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-1 p-6">
                  <h3 className="text-lg font-bold text-indigo-950">{item.title}</h3>
                  <p className="text-sm font-medium text-slate-500">{item.industry}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 7. Why us */}
        <section id="why-us" className="scroll-mt-24 py-16 md:py-20">
          <SectionHeading
            title={
              <>
                Vì Sao Chọn <span style={{ color: PRIMARY }}>Bứt Phá Marketing?</span>
              </>
            }
          />
          <CheckList items={WHY_US} variant="rocket" />
        </section>

        {/* 8. FAQ */}
        <section id="faq" className="scroll-mt-24 py-16 md:py-20">
          <SectionHeading title={<>Câu Hỏi <span style={{ color: PRIMARY }}>Thường Gặp</span></>} />
          <div className="mx-auto max-w-3xl space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className="brand-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  >
                    <span className="font-bold text-indigo-950">{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-indigo-100 px-6 pb-6 pt-2">
                      <p className="text-sm leading-relaxed text-slate-600">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 9. CTA */}
        <section id="cta" className="scroll-mt-24 py-16 md:py-20">
          <div
            className="overflow-hidden rounded-[2rem] p-8 text-center md:p-14"
            style={{ background: `linear-gradient(135deg, #312E81 0%, ${PRIMARY} 100%)` }}
          >
            <h2 className="text-2xl font-bold text-white md:text-4xl">
              SỞ HỮU WEBSITE CHUYÊN NGHIỆP NGAY HÔM NAY
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-indigo-100 md:text-base">
              Đừng để khách hàng tìm thấy đối thủ trước khi tìm thấy bạn.
              <br />
              Liên hệ Bứt Phá Marketing để được tư vấn giải pháp phù hợp nhất.
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
                NHẬN TƯ VẤN NGAY
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
              Xem thêm dịch vụ vận hành &amp; chăm sóc tại{" "}
              <Link href="/website" className="underline hover:text-white">
                trang Website
              </Link>
            </p>
          </div>
        </section>
      </div>

      <ConsultModal isOpen={showConsult} onClose={() => setShowConsult(false)} platformColor={PRIMARY} />
    </SubPageLayout>
  );
}
