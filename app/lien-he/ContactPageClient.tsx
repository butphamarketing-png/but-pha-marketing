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
  "w-full border border-white/12 bg-[#0c0d12] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#6D5CE6]/50";

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

    if (!form.phone.trim()) {
      setState({ type: "error", message: "Số điện thoại đang bị trống." });
      return;
    }

    setSubmitting(true);
    setState({ type: "idle", message: "" });

    const result = await db.leads.add({
      type: "contact",
      name: form.name.trim() || "Khách liên hệ",
      phone: form.phone.trim(),
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
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#08090c]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src={logoSrc} alt={brandName} width={44} height={44} className="h-11 w-11 object-contain" />
            <div className="hidden sm:block">
              <div className="text-sm font-medium tracking-wide text-white/90">{brandName}</div>
              <div className="text-[11px] text-white/40">Marketing thực chiến</div>
            </div>
          </Link>

          <div className="hidden lg:block">
            <SiteNavMenu tone="dark" layout="horizontal" activeHref="/lien-he" />
          </div>

          <a
            href={getTelHref(settings?.hotline)}
            className="hidden items-center gap-2 rounded-md bg-[#6D5CE6] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#5B4BD4] lg:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" />
            Gọi ngay
          </a>

          <div className="lg:hidden [&_button]:text-white/80">
            <SiteNavMenu tone="dark" activeHref="/lien-he" />
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 pb-16 pt-7 sm:px-6 sm:pt-9">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-white/40">
          <Link href="/" className="transition hover:text-white/80">
            Trang chủ
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-white/25" />
          <span className="text-white/70">Liên hệ</span>
        </nav>

        <section className="border-b border-white/[0.08] pb-8">
          <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr] xl:gap-10">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
                Liên hệ tư vấn
              </p>
              <h1 className="mt-2 max-w-xl text-[1.75rem] font-semibold leading-snug tracking-tight text-white sm:text-[2.05rem]">
                Luôn sẵn sàng hỗ trợ bạn
              </h1>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/45">
                Bạn có câu hỏi hoặc muốn tư vấn dịch vụ? Đội ngũ Bứt Phá luôn sẵn sàng đồng hành cùng bạn.
              </p>

              <div className="mt-6 space-y-0">
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
                      <item.icon className="mt-1 h-4 w-4 shrink-0 text-white/40" />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                          {item.title}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="mt-1.5 block text-base font-medium text-white/90 transition hover:text-white"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-1.5 text-base font-medium text-white/90">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-white/[0.08] bg-white/[0.02] px-6 py-8 sm:px-8 sm:py-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">Form tư vấn</p>
              <h2 className="mt-2 text-xl font-semibold text-white sm:text-[1.35rem]">
                Gửi yêu cầu tư vấn
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/40">
                Điền thông tin, chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
              </p>

              <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    value={form.name}
                    onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                    placeholder="Họ và tên"
                    className={inputClass}
                  />
                  <input
                    value={form.phone}
                    onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                    placeholder="Số điện thoại *"
                    className={inputClass}
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
                  >
                    <option value="">Dịch vụ quan tâm</option>
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
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#6D5CE6] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#5B4BD4] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? "Đang gửi yêu cầu..." : "Gửi yêu cầu tư vấn"}
                </button>

                <p className="text-center text-xs text-white/30">Thông tin của bạn được bảo mật tuyệt đối.</p>

                {state.type !== "idle" ? (
                  <p
                    className={`text-center text-sm font-medium ${
                      state.type === "success" ? "text-white/80" : "text-red-300"
                    }`}
                  >
                    {state.message}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.08] pt-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">Cam kết</p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-[1.35rem]">
            Vì sao liên hệ với chúng tôi
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Phản hồi nhanh chóng", description: "Chúng tôi phản hồi trong 15 phút", icon: Headphones },
              { title: "Bảo mật thông tin", description: "Cam kết bảo mật tuyệt đối", icon: ShieldCheck },
              { title: "Tư vấn tận tâm", description: "Đưa ra giải pháp phù hợp nhất", icon: Target },
              { title: "Đồng hành dài lâu", description: "Hỗ trợ trước — trong — sau dự án", icon: Users },
            ].map((item) => (
              <article key={item.title} className="border-l border-white/15 pl-4">
                <item.icon className="h-4 w-4 text-white/40" />
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
                <p className="text-[11px] text-white/35">Marketing thực chiến</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/40">
              Giải pháp marketing toàn diện giúp doanh nghiệp tăng trưởng bền vững bằng công nghệ, tự động và dữ liệu
              thông minh.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={settings?.fanpage || "#"}
                className="border border-white/12 p-2 text-white/50 transition hover:border-white/25 hover:text-white/80"
                aria-label="Facebook"
              >
                <SiFacebook />
              </a>
              <a
                href={settings?.fanpage || "#"}
                className="border border-white/12 p-2 text-white/50 transition hover:border-white/25 hover:text-white/80"
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
                <a href={getMailtoHref(settings?.email)} className="hover:text-white/80">
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
                <Link href="/website" className="hover:text-white/80">
                  Thiết kế website
                </Link>
              </li>
              <li>
                <Link href="/facebook" className="hover:text-white/80">
                  Quản trị Fanpage
                </Link>
              </li>
              <li>
                <Link href="/google-maps" className="hover:text-white/80">
                  Google Maps
                </Link>
              </li>
              <li>
                <Link href="/seo-website" className="hover:text-white/80">
                  SEO Website
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Liên kết</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/45">
              <li>
                <Link href="/" className="hover:text-white/80">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu" className="hover:text-white/80">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white/80">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link href="/banggia" className="hover:text-white/80">
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
