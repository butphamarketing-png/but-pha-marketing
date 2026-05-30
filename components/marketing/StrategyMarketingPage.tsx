"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Globe,
  MapPin,
  Shield,
  Clock3,
  BarChart3,
  Headphones,
  ChevronRight,
  ArrowLeft,
  Facebook,
} from "lucide-react";
import { db } from "@/lib/useData";
import {
  STRATEGY_FOOTER,
  STRATEGY_PRICING,
  type StrategyPricingItem,
} from "@/lib/marketing-strategy-pricing";

type LeadForm = {
  fullName: string;
  companyName: string;
  phone: string;
  address: string;
  email: string;
  industry: string;
};

const initialForm: LeadForm = {
  fullName: "",
  companyName: "",
  phone: "",
  address: "",
  email: "",
  industry: "",
};

const inputClass =
  "w-full rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20";

const COLUMN_ICONS = {
  website: Globe,
  fanpage: Facebook,
  googlemaps: MapPin,
} as const;

const FOOTER_ICONS = [Shield, Clock3, BarChart3, Headphones];

function PricingRow({ item }: { item: StrategyPricingItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="flex w-full cursor-default items-center justify-between gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-violet-50"
      >
        <span className="text-sm font-semibold text-slate-700">{item.label}</span>
        <span className="shrink-0 text-sm font-black text-violet-700">{item.price}</span>
      </button>

      {open && (
        <div className="absolute bottom-full left-1/2 z-30 mb-2 w-[min(280px,calc(100vw-2rem))] -translate-x-1/2 md:pointer-events-none">
          <div className="rounded-2xl border border-violet-200 bg-white p-4 shadow-2xl shadow-violet-900/15">
            <p className="text-xs font-black uppercase tracking-wide text-violet-600">{item.label}</p>
            {item.quantity && (
              <p className="mt-1 text-sm font-bold text-slate-800">Số lượng: {item.quantity}</p>
            )}
            <p className="mt-2 text-lg font-black text-violet-700">{item.price}</p>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-slate-400">Công việc bao gồm</p>
            <ul className="mt-2 space-y-1.5">
              {item.works.map((work) => (
                <li key={work} className="flex gap-2 text-xs leading-relaxed text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                  {work}
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto h-3 w-3 rotate-45 border-b border-r border-violet-200 bg-white" />
        </div>
      )}
    </div>
  );
}

export function StrategyMarketingPage() {
  const [form, setForm] = useState<LeadForm>(initialForm);
  const [showStrategy, setShowStrategy] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof LeadForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;

    const required = [
      form.fullName.trim(),
      form.companyName.trim(),
      form.phone.trim(),
      form.address.trim(),
      form.email.trim(),
      form.industry.trim(),
    ];
    if (required.some((value) => !value)) {
      setError("Vui lòng điền đầy đủ thông tin trước khi xem chiến lược.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const result = await db.leads.add({
      type: "contact",
      name: form.fullName.trim(),
      phone: form.phone.trim(),
      service: "Chiến lược Marketing",
      note: JSON.stringify({
        kind: "strategy_marketing",
        companyName: form.companyName.trim(),
        address: form.address.trim(),
        email: form.email.trim(),
        industry: form.industry.trim(),
      }),
      platform: "chienluocmarketing",
    });

    setSubmitting(false);

    if (result.error) {
      setError("Không lưu được thông tin. Vui lòng thử lại.");
      return;
    }

    setShowStrategy(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showStrategy) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f3ecff] via-white to-[#ede4ff] px-4 py-12">
        <div className="mx-auto max-w-xl">
          <div className="mb-8 text-center">
            <Image src="/logo.png" alt="Bứt Phá Marketing" width={72} height={72} className="mx-auto rounded-2xl" />
            <h1 className="mt-4 text-3xl font-black tracking-tight text-violet-900">Chiến lược Marketing</h1>
            <p className="mt-2 text-sm text-slate-600">
              Nhập thông tin doanh nghiệp để xem bảng báo giá & chiến lược dịch vụ
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-[2rem] border border-violet-100 bg-white p-6 shadow-xl shadow-violet-900/10 md:p-8"
          >
            <label className="block space-y-2">
              <span className="text-sm font-bold text-slate-700">Họ và Tên *</span>
              <input
                className={inputClass}
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                placeholder="Nguyễn Văn A"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-bold text-slate-700">Tên công ty *</span>
              <input
                className={inputClass}
                value={form.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
                placeholder="Công ty TNHH ..."
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-bold text-slate-700">Số điện thoại *</span>
              <input
                className={inputClass}
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="09xx xxx xxx"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-bold text-slate-700">Địa chỉ công ty / cơ sở *</span>
              <input
                className={inputClass}
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="Số nhà, đường, quận, thành phố"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-bold text-slate-700">Gmail *</span>
              <input
                type="email"
                className={inputClass}
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="email@company.com"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-bold text-slate-700">Ngành nghề *</span>
              <input
                className={inputClass}
                value={form.industry}
                onChange={(e) => updateField("industry", e.target.value)}
                placeholder="VD: Nha khoa, Spa, TMĐT, F&B..."
              />
            </label>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-700 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-violet-600 disabled:opacity-60"
            >
              {submitting ? "Đang xử lý..." : "Xem chiến lược"}
              <ChevronRight size={18} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f0fb] px-3 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => setShowStrategy(false)}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-bold text-violet-700 shadow-sm hover:bg-violet-50"
        >
          <ArrowLeft size={14} /> Quay lại form
        </button>

        <div className="overflow-hidden rounded-[2rem] border border-violet-100 bg-white shadow-2xl shadow-violet-900/10">
          {/* Header */}
          <div className="border-b border-violet-100 px-6 py-8 text-center md:px-10">
            <Image src="/logo.png" alt="Bứt Phá Marketing" width={80} height={80} className="mx-auto" />
            <h1 className="mt-4 text-3xl font-black tracking-tight text-violet-900 md:text-4xl">BỨT PHÁ MARKETING</h1>
            <div className="mx-auto mt-4 flex max-w-md items-center gap-3">
              <div className="h-px flex-1 bg-violet-200" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                Giải pháp Marketing – Hiệu quả – Bền vững
              </p>
              <div className="h-px flex-1 bg-violet-200" />
            </div>
            <p className="mt-4 text-sm text-slate-500">
              {form.companyName} · {form.industry} · {form.fullName}
            </p>
          </div>

          {/* Branch line + columns */}
          <div className="relative px-4 py-8 md:px-8">
            <div className="absolute left-[16.67%] right-[16.67%] top-8 hidden h-1 rounded-full bg-violet-600 md:block" />
            <div className="grid gap-8 md:grid-cols-3">
              {STRATEGY_PRICING.map((column) => {
                const Icon = COLUMN_ICONS[column.id];
                return (
                  <div key={column.id} className="relative">
                    <div className="relative z-10 mx-auto mb-6 flex w-fit items-center gap-3 rounded-2xl bg-violet-700 px-5 py-3 text-white shadow-lg shadow-violet-700/30">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                        <Icon size={22} />
                      </div>
                      <span className="text-lg font-black tracking-wide">{column.title}</span>
                    </div>

                    <div className="space-y-5 rounded-[1.75rem] border border-violet-100 bg-[#faf8ff] p-4 md:p-5">
                      {column.groups.map((group) => (
                        <div key={group.title}>
                          <h3 className="mb-2 border-b border-violet-100 pb-2 text-center text-xs font-black uppercase tracking-wide text-violet-800">
                            {group.title}
                          </h3>
                          <div className="space-y-1">
                            {group.items.map((item) => (
                              <PricingRow key={item.id} item={item} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-center text-[11px] text-slate-400">
              Rê chuột vào từng dòng để xem số lượng, công việc và giá chi tiết
            </p>
          </div>

          {/* Footer */}
          <div className="grid gap-4 border-t border-violet-100 bg-[#faf8ff] p-4 sm:grid-cols-2 lg:grid-cols-4 md:p-6">
            {STRATEGY_FOOTER.map((item, index) => {
              const Icon = FOOTER_ICONS[index];
              return (
                <div
                  key={item.title}
                  className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-white px-4 py-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-violet-900">{item.title}</p>
                    <p className="text-[11px] leading-snug text-slate-500">{item.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
