"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SiteNavMenu } from "@/components/shared/SiteNavMenu";
import {
  ChevronRight,
  Headphones,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Target,
  Clock3,
  Users,
} from "lucide-react";
import { SiFacebook, SiMessenger } from "react-icons/si";
import { useAdmin } from "@/lib/AdminContext";
import { db, type Service } from "@/lib/useData";
import { getMailtoHref, getTelHref, resolveAddress, resolveEmail, resolveHotline } from "@/lib/site-contact";
import { ZaloConsultCta } from "@/components/blog/ZaloConsultCta";

const serif = { fontFamily: '"Cormorant Garamond", Georgia, serif' } as const;

type ContactFormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  note: string;
};

const initialForm: ContactFormState = {
  name: "",
  phone: "",
  email: "",
  service: "",
  budget: "",
  note: "",
};

const budgetOptions = ["Dưới 10 triệu", "10 - 20 triệu", "20 - 50 triệu", "Trên 50 triệu"];

const inputClass =
  "w-full border border-white/12 bg-[#0c0d12] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-amber-200/35";

export default function ContactPageClient() {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState<ContactFormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [state, setState] = useState<{ type: "idle" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });
  const { settings } = useAdmin();

  useEffect(() => {
    void db.services.getAll().then((result) => setServices(result.data || []));
  }, []);

  const brandName = settings?.title || "Bứt Phá Marketing";
  const logoSrc = "/logo.png";
  const serviceOptions = useMemo(() => {
    const names = services.map((service) => service.name).filter(Boolean);
    return names.length > 0
      ? names
      : ["Thiết Kế Website", "Quản trị Fanpage", "Google Maps Marketing", "AI Content / SEO"];
  }, [services]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setState({ type: "idle", message: "" });

    const result = await db.leads.add({
      type: "contact",
      name: form.name,
      phone: form.phone,
      service: form.service || "Tư vấn tổng thể",
      note: [form.email, form.budget, form.note].filter(Boolean).join(" | "),
      platform: "contact_page",
    });

    if (result.error) {
      setState({
        type: "error",
        message: "Chưa gửi được yêu cầu. Vui lòng thử lại sau.",
      });
    } else {
      setState({
        type: "success",
        message: "Đã gửi yêu cầu tư vấn. Đội ngũ sẽ liên hệ với bạn sớm nhất.",
      });
      setForm(initialForm);
    }

    setSubmitting(false);
  };

  const contactRows = [
    {
      icon: Phone,
      title: "Hotline",
      value: resolveHotline(settings?.hotline),
      href: getTelHref(settings?.hotline),
    },
    {
      icon: Mail,
      title: "Email",
      value: resolveEmail(settings?.email),
      href: getMailtoHref(settings?.email),
    },
    { icon: MapPin, title: "Địa chỉ", value: resolveAddress(settings?.address) },
    { icon: Clock3, title: "Thời gian làm việc", value: "08:30 - 17:30 (Thứ 2 - Thứ 7)" },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#08090c] text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(196,149,90,0.16), transparent 58%), radial-gradient(ellipse 40% 30% at 15% 25%, rgba(234,88,12,0.06), transparent), linear-gradient(180deg, #0c0e14 0%, #08090c 100%)",
        }}
        aria-hidden
      />

      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#08090c]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src={logoSrc} alt={brandName} width={44} height={44} className="h-11 w-11 object-contain" />
            <div className="hidden sm:block">
              <div className="text-sm font-medium tracking-wide text-white/90">{brandName}</div>
              <div className="text-[11px] text-amber-200/55">Marketing thực chiến</div>
            </div>
          </Link>

          <div className="hidden lg:block">
            <SiteNavMenu tone="dark" layout="horizontal" activeHref="/lien-he" />
          </div>

          <a
            href={getTelHref(settings?.hotline)}
            className="hidden items-center gap-2 rounded-full bg-amber-200 px-4 py-2.5 text-xs font-semibold text-[#0b0d12] transition hover:bg-amber-100 lg:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" />
            Gọi ngay
          </a>

          <div className="lg:hidden [&_button]:text-white/80">
            <SiteNavMenu activeHref="/lien-he" />
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-sm text-white/40">
          <Link href="/" className="transition hover:text-amber-100">
            Trang chủ
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-white/25" />
          <span className="text-white/70">Liên hệ</span>
        </nav>

        <section className="border-b border-white/[0.06] pb-14">
          <div className="grid gap-12 xl:grid-cols-[0.85fr_1.15fr] xl:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-200/70">
                Liên hệ tư vấn
              </p>
              <h1
                className="mt-4 max-w-xl text-[clamp(2.1rem,5vw,3.5rem)] font-semibold leading-[1.08] tracking-tight text-white"
                style={serif}
              >
                Luôn sẵn sàng hỗ trợ bạn
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/45 sm:text-[15px]">
                Bạn có câu hỏi hoặc muốn tư vấn dịch vụ? Đội ngũ Bứt Phá luôn sẵn sàng đồng hành cùng bạn.
              </p>

              <div className="mt-10 space-y-0">
                {contactRows.map((item, index) => (
                  <div
                    key={item.title}
                    className={
                      index === 0
                        ? "border-t border-white/[0.06] py-5"
                        : "border-t border-white/[0.06] py-5 last:border-b"
                    }
                  >
                    <div className="flex items-start gap-4">
                      <item.icon className="mt-1 h-4 w-4 shrink-0 text-amber-200/55" />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                          {item.title}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="mt-1.5 block text-lg font-medium text-white/90 transition hover:text-amber-100 sm:text-xl"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-1.5 text-lg font-medium text-white/90 sm:text-xl">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-white/[0.08] bg-white/[0.02] px-6 py-8 sm:px-8 sm:py-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/55">Form tư vấn</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl" style={serif}>
                Gửi yêu cầu tư vấn
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/40">
                Điền thông tin, chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
              </p>

              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    value={form.name}
                    onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                    placeholder="Họ và tên *"
                    className={inputClass}
                    required
                  />
                  <input
                    value={form.phone}
                    onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                    placeholder="Số điện thoại *"
                    className={inputClass}
                    required
                  />
                </div>

                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="Email"
                  className={inputClass}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <select
                    value={form.service}
                    onChange={(event) => setForm((prev) => ({ ...prev, service: event.target.value }))}
                    className={`${inputClass} [&>option]:bg-[#0c0d12] [&>option]:text-white`}
                    required
                  >
                    <option value="">Dịch vụ quan tâm *</option>
                    {serviceOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <select
                    value={form.budget}
                    onChange={(event) => setForm((prev) => ({ ...prev, budget: event.target.value }))}
                    className={`${inputClass} [&>option]:bg-[#0c0d12] [&>option]:text-white`}
                  >
                    <option value="">Ngân sách dự kiến</option>
                    {budgetOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <textarea
                  value={form.note}
                  onChange={(event) => setForm((prev) => ({ ...prev, note: event.target.value }))}
                  rows={4}
                  placeholder="Nội dung bạn muốn tư vấn"
                  className={`${inputClass} resize-y`}
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-200 px-6 py-3.5 text-sm font-semibold text-[#0b0d12] transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? "Đang gửi yêu cầu..." : "Gửi yêu cầu tư vấn"}
                </button>

                <p className="text-center text-xs text-white/30">Thông tin của bạn được bảo mật tuyệt đối.</p>

                {state.type !== "idle" ? (
                  <p
                    className={`text-center text-sm font-medium ${
                      state.type === "success" ? "text-amber-100" : "text-red-300"
                    }`}
                  >
                    {state.message}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.06] pt-14">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/55">Cam kết</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl" style={serif}>
            Vì sao liên hệ với chúng tôi
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Phản hồi nhanh chóng", description: "Chúng tôi phản hồi trong 15 phút", icon: Headphones },
              { title: "Bảo mật thông tin", description: "Cam kết bảo mật tuyệt đối", icon: ShieldCheck },
              { title: "Tư vấn tận tâm", description: "Đưa ra giải pháp phù hợp nhất", icon: Target },
              { title: "Đồng hành dài lâu", description: "Hỗ trợ trước — trong — sau dự án", icon: Users },
            ].map((item) => (
              <article key={item.title} className="border-l border-amber-200/25 pl-4">
                <item.icon className="h-4 w-4 text-amber-200/55" />
                <h3 className="mt-3 text-base font-medium text-white/90">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/40">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative border-t border-white/[0.06]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_0.9fr_0.9fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src={logoSrc} alt={brandName} width={44} height={44} className="h-11 w-11 object-contain" />
              <div>
                <p className="text-sm font-medium tracking-wide text-white/90">{brandName}</p>
                <p className="text-[11px] text-amber-200/50">Marketing thực chiến</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/40">
              Giải pháp marketing toàn diện giúp doanh nghiệp tăng trưởng bền vững bằng công nghệ, tự động và dữ liệu
              thông minh.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={settings?.fanpage || "#"}
                className="border border-white/12 p-2 text-white/50 transition hover:border-amber-200/30 hover:text-amber-100"
                aria-label="Facebook"
              >
                <SiFacebook />
              </a>
              <a
                href={settings?.fanpage || "#"}
                className="border border-white/12 p-2 text-white/50 transition hover:border-amber-200/30 hover:text-amber-100"
                aria-label="Messenger"
              >
                <SiMessenger />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Liên hệ</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/45">
              <li>{resolveHotline(settings?.hotline)}</li>
              <li>
                <a href={getMailtoHref(settings?.email)} className="hover:text-amber-100">
                  {resolveEmail(settings?.email)}
                </a>
              </li>
              <li>{resolveAddress(settings?.address)}</li>
            </ul>
            <div className="mt-4">
              <ZaloConsultCta className="border-white/10 bg-white/[0.03] text-white/80" />
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Dịch vụ</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/45">
              <li>
                <Link href="/website" className="hover:text-amber-100">
                  Thiết kế website
                </Link>
              </li>
              <li>
                <Link href="/facebook" className="hover:text-amber-100">
                  Quản trị Fanpage
                </Link>
              </li>
              <li>
                <Link href="/google-maps" className="hover:text-amber-100">
                  Google Maps
                </Link>
              </li>
              <li>
                <Link href="/seo-website" className="hover:text-amber-100">
                  SEO Website
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Liên kết</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/45">
              <li>
                <Link href="/" className="hover:text-amber-100">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu" className="hover:text-amber-100">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-100">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link href="/banggia" className="hover:text-amber-100">
                  Bảng giá
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
