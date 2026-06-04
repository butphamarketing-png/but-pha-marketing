"use client";

import { ChevronRight, Search } from "lucide-react";
import type { ReactNode } from "react";

type PlatformAuditSectionProps = {
  accentColor: string;
  badge: string;
  title: ReactNode;
  description?: string;
  placeholder: string;
  buttonLabel: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  features: string[];
  zaloItems?: string[];
};

export function PlatformAuditSection({
  accentColor,
  badge,
  title,
  description,
  placeholder,
  buttonLabel,
  value,
  onChange,
  onSubmit,
  features,
  zaloItems = [
    "Báo cáo chi tiết miễn phí",
    "Đề xuất cải thiện cụ thể",
    "Tư vấn 1-1 qua Zalo",
  ],
}: PlatformAuditSectionProps) {
  return (
    <section
      id="audit"
      className="platform-audit-shell scroll-mt-24"
      style={{ "--platform-accent": accentColor } as React.CSSProperties}
    >
      <div className="flex flex-col items-center gap-10 md:flex-row">
        <div className="flex-1 space-y-6">
          <div className="platform-badge">
            <Search size={16} style={{ color: accentColor }} />
            <span>{badge}</span>
          </div>

          <h3 className="text-3xl font-bold leading-snug text-indigo-950 md:text-4xl">{title}</h3>

          {description ? <p className="max-w-2xl text-base leading-relaxed text-slate-600">{description}</p> : null}

          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <input
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="brand-input flex-1"
            />
            <button
              type="button"
              onClick={onSubmit}
              className="platform-cta inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-sm font-semibold text-white shadow-brand-accent transition hover:brightness-105 active:scale-[0.99]"
            >
              {buttonLabel}
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            {features.map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden w-full max-w-sm lg:block">
          <div className="platform-side-card space-y-5 p-6">
            <p className="text-sm font-semibold text-indigo-900">Nhận báo giá chi tiết qua Zalo</p>
            <ul className="space-y-3">
              {zaloItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://zalo.me/0937417982"
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-900 to-violet-600 px-4 py-3.5 text-sm font-semibold text-white shadow-brand-accent transition hover:brightness-105"
            >
              Nhận báo giá qua Zalo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
