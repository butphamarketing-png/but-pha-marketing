"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
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
import { SiFacebook, SiMessenger, SiYoutube, SiZalo } from "react-icons/si";
import { LoginModal } from "@/components/shared/LoginModal";
import { ParticleBackground } from "@/components/shared/ParticleBackground";
import { useAdmin } from "@/lib/AdminContext";
import { getBrandingAssetUrl } from "@/lib/branding";
import { db, type Service } from "@/lib/useData";
import { playClickSound } from "@/lib/utils";

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

const budgetOptions = [
  "Dưới 10 triệu",
  "10 - 20 triệu",
  "20 - 50 triệu",
  "Trên 50 triệu",
];

export default function ContactPageClient() {
  const [showLogin, setShowLogin] = useState(false);
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
  const logoSrc = useMemo(
    () => getBrandingAssetUrl("logo", settings?.logo || settings?.favicon || ""),
    [settings?.favicon, settings?.logo],
  );
  const mascotImage = settings?.mascotImage || "/mascot-home.png";

  const navigation = [
    { label: "Trang Chủ", href: "/" },
    { label: "Giới Thiệu", href: "/gioi-thieu" },
    { label: "Website", href: "/website" },
    { label: "Fanpage", href: "/facebook" },
    { label: "Google Maps", href: "/google-maps" },
    { label: "Tin Tức", href: "/blog" },
    { label: "Liên Hệ", href: "/lien-he" },
  ];

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

  return (
    <div className="min-h-screen bg-[#06030d] text-white">
      <ParticleBackground />
      <header className="sticky top-0 z-40 border-b border-fuchsia-400/15 bg-[#080510]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-6">
          <Link href="/" className="flex items-center gap-3">
            <img src={logoSrc} alt={brandName} className="h-12 w-12 rounded-full object-cover" />
            <div>
              <div className="text-sm font-black uppercase tracking-[0.16em] text-white">{brandName}</div>
              <div className="text-xs text-slate-400">Giải pháp marketing thực chiến</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-bold transition ${
                  item.href === "/lien-he" ? "text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setShowLogin(true);
              }}
              className="rounded-2xl border border-fuchsia-400/30 bg-white/5 px-4 py-3 text-sm font-black text-white transition hover:bg-white/10"
            >
              Lộ trình dự án
            </button>
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-5 py-3 text-sm font-black text-white shadow-[0_18px_40px_rgba(168,85,247,0.3)] transition hover:scale-[1.01]"
            >
              <Phone className="h-4 w-4" />
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden">
        <section className="border-b border-fuchsia-400/12 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.28),transparent_38%),linear-gradient(180deg,#090512,#07040d)]">
          <div className="mx-auto max-w-7xl px-4 py-14 lg:px-6 lg:py-16">
            <div className="mb-6 flex items-center gap-2 text-sm text-slate-400">
              <Link href="/" className="transition hover:text-white">
                Trang chủ
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">Liên hệ</span>
            </div>

            <div className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center rounded-full border border-fuchsia-400/35 bg-fuchsia-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-fuchsia-200">
                    Liên hệ với chúng tôi
                  </div>
                  <h1 className="mt-6 max-w-2xl text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">
                    {brandName}
                    <br />
                    luôn sẵn sàng <span className="text-fuchsia-300">hỗ trợ bạn!</span>
                  </h1>
                  <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                    Bạn có câu hỏi hoặc muốn tư vấn dịch vụ? Đội ngũ của chúng tôi luôn sẵn sàng đồng hành cùng bạn.
                  </p>
                </div>

                <div className="rounded-[1.9rem] border border-fuchsia-400/20 bg-[#0d0817]/90 p-6 shadow-[0_24px_70px_rgba(4,2,10,0.34)]">
                  {[
                    { icon: Phone, title: "Hotline", value: settings?.hotline || "090.143.8303" },
                    { icon: Mail, title: "Email", value: settings?.email || "hello@butphamarketing.com" },
                    { icon: MapPin, title: "Địa chỉ", value: settings?.address || "123 Đường ABC, P. An Lạc, Q. Bình Tân, TP. HCM" },
                    { icon: Clock3, title: "Thời gian làm việc", value: "08:30 - 17:30 (Thứ 2 - Thứ 7)" },
                  ].map((item, index) => (
                    <div key={item.title} className={index === 0 ? "" : "border-t border-white/10 pt-5 mt-5"}>
                      <div className="flex items-start gap-4">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-200">
                          <item.icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-300">{item.title}</p>
                          <p className="mt-1 text-2xl font-bold text-white">{item.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-fuchsia-400/20 bg-[linear-gradient(135deg,rgba(22,10,37,0.98),rgba(35,12,66,0.92))] p-6 shadow-[0_28px_80px_rgba(5,2,12,0.42)] lg:p-8">
                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                  <div>
                    <h2 className="text-[32px] font-black tracking-[-0.05em] text-fuchsia-200">Gửi yêu cầu tư vấn</h2>
                    <p className="mt-3 text-base leading-7 text-slate-300">
                      Điền thông tin, chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.
                    </p>

                    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <input
                          value={form.name}
                          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                          placeholder="Họ và tên *"
                          className="rounded-2xl border border-fuchsia-400/20 bg-[#10081b] px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-fuchsia-300/50"
                          required
                        />
                        <input
                          value={form.phone}
                          onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                          placeholder="Số điện thoại *"
                          className="rounded-2xl border border-fuchsia-400/20 bg-[#10081b] px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-fuchsia-300/50"
                          required
                        />
                      </div>

                      <input
                        type="email"
                        value={form.email}
                        onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                        placeholder="Email"
                        className="w-full rounded-2xl border border-fuchsia-400/20 bg-[#10081b] px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-fuchsia-300/50"
                      />

                      <div className="grid gap-4 sm:grid-cols-2">
                        <select
                          value={form.service}
                          onChange={(event) => setForm((prev) => ({ ...prev, service: event.target.value }))}
                          className="rounded-2xl border border-fuchsia-400/20 bg-[#10081b] px-4 py-4 text-sm text-white outline-none transition focus:border-fuchsia-300/50"
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
                          className="rounded-2xl border border-fuchsia-400/20 bg-[#10081b] px-4 py-4 text-sm text-white outline-none transition focus:border-fuchsia-300/50"
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
                        className="w-full rounded-2xl border border-fuchsia-400/20 bg-[#10081b] px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-fuchsia-300/50"
                      />

                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-6 py-4 text-sm font-black text-white shadow-[0_18px_40px_rgba(168,85,247,0.3)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        <Send className="h-4 w-4" />
                        {submitting ? "Đang gửi yêu cầu..." : "Gửi yêu cầu tư vấn"}
                      </button>

                      <p className="text-center text-sm text-slate-400">Thông tin của bạn được bảo mật tuyệt đối.</p>

                      {state.type !== "idle" ? (
                        <p className={`text-center text-sm font-semibold ${state.type === "success" ? "text-emerald-300" : "text-rose-300"}`}>
                          {state.message}
                        </p>
                      ) : null}
                    </form>
                  </div>

                  <div className="relative flex items-end justify-center">
                    <span className="absolute inset-x-8 bottom-6 h-28 rounded-full bg-fuchsia-500/30 blur-3xl" />
                    <img src={mascotImage} alt="Mascot Bứt Phá Marketing" className="relative max-h-[360px] w-full object-contain drop-shadow-[0_24px_40px_rgba(168,85,247,0.35)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Phản hồi nhanh chóng", description: "Chúng tôi phản hồi trong 15 phút", icon: Headphones },
              { title: "Bảo mật thông tin", description: "Cam kết bảo mật tuyệt đối", icon: ShieldCheck },
              { title: "Tư vấn tận tâm", description: "Đưa ra giải pháp phù hợp nhất", icon: Target },
              { title: "Đồng hành dài lâu", description: "Hỗ trợ bạn trước - trong - sau dự án", icon: Users },
            ].map((item) => (
              <div key={item.title} className="rounded-[1.7rem] border border-white/10 bg-[#0d0817]/90 px-6 py-6 shadow-[0_20px_60px_rgba(4,2,10,0.28)]">
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-200">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-xl font-black text-white">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#06030e]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr_0.8fr] lg:px-6">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoSrc} alt={brandName} className="h-11 w-11 rounded-full object-cover" />
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-white">{brandName}</p>
                <p className="text-xs text-slate-400">Giải pháp marketing thực chiến</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              Giải pháp marketing toàn diện giúp doanh nghiệp tăng trưởng bền vững bằng công nghệ, tự động và dữ liệu thông minh.
            </p>
            <div className="mt-5 flex items-center gap-3 text-white">
              <a href={settings?.fanpage || "#"} className="rounded-full border border-white/10 p-2 transition hover:border-fuchsia-400/40 hover:text-fuchsia-200"><SiFacebook /></a>
              <a href={settings?.fanpage || "#"} className="rounded-full border border-white/10 p-2 transition hover:border-fuchsia-400/40 hover:text-fuchsia-200"><SiMessenger /></a>
              <a href={settings?.zalo ? `https://zalo.me/${settings.zalo}` : "#"} className="rounded-full border border-white/10 p-2 transition hover:border-fuchsia-400/40 hover:text-fuchsia-200"><SiZalo /></a>
              <a href="https://www.youtube.com" className="rounded-full border border-white/10 p-2 transition hover:border-fuchsia-400/40 hover:text-fuchsia-200"><SiYoutube /></a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.24em] text-white">Liên hệ</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>{settings?.hotline || "090.143.8303"}</li>
              <li>{settings?.email || "hello@butphamarketing.com"}</li>
              <li>{settings?.address || "123 Đường ABC, P. An Lạc, Q. Bình Tân, TP. HCM"}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.24em] text-white">Dịch vụ</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li><Link href="/website">Thiết Kế Website</Link></li>
              <li><Link href="/facebook">Quản trị Fanpage</Link></li>
              <li><Link href="/google-maps">Google Maps Marketing</Link></li>
              <li><Link href="/blog">AI Content / SEO</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.24em] text-white">Liên kết nhanh</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li><Link href="/">Trang Chủ</Link></li>
              <li><Link href="/gioi-thieu">Giới Thiệu</Link></li>
              <li><Link href="/website">Website</Link></li>
              <li><Link href="/facebook">Fanpage</Link></li>
              <li><Link href="/google-maps">Google Maps</Link></li>
              <li><Link href="/blog">Tin Tức</Link></li>
              <li><Link href="/lien-he">Liên Hệ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.24em] text-white">Kết nối với chúng tôi</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li><a href={settings?.fanpage || "#"}>Facebook</a></li>
              <li><a href={settings?.fanpage || "#"}>Messenger</a></li>
              <li><a href={settings?.zalo ? `https://zalo.me/${settings.zalo}` : "#"}>Zalo</a></li>
              <li><a href="https://www.youtube.com">YouTube</a></li>
            </ul>
          </div>
        </div>
      </footer>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}
