"use client";

import { Check, MessageSquare, Server, Sparkles } from "lucide-react";
import {
  formatPriceVnd,
  WEBSITE_OPERATION_PACKAGES,
  WEBSITE_OPERATION_TIER_META,
  WEBSITE_OPERATION_TIERS,
  type WebsiteOperationTierKey,
} from "@/lib/service-pricing";

type ConsultHandler = (pkgName: string, pkgPrice: string, tabLabel: string) => void;

export function WebsiteOperationSection({
  primaryColor,
  onConsult,
}: {
  primaryColor: string;
  onConsult: ConsultHandler;
}) {
  return (
    <div className="space-y-20">
      {WEBSITE_OPERATION_TIERS.map((tierKey) => (
        <TierGroup
          key={tierKey}
          tierKey={tierKey}
          primaryColor={primaryColor}
          onConsult={onConsult}
        />
      ))}
    </div>
  );
}

function TierGroup({
  tierKey,
  primaryColor,
  onConsult,
}: {
  tierKey: WebsiteOperationTierKey;
  primaryColor: string;
  onConsult: ConsultHandler;
}) {
  const meta = WEBSITE_OPERATION_TIER_META[tierKey];
  const packages = WEBSITE_OPERATION_PACKAGES.filter((p) => p.tier === tierKey);
  const accent = meta.color;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 border-l-4 pl-5" style={{ borderColor: accent }}>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
            style={{ backgroundColor: accent }}
          >
            {meta.label}
          </span>
        </div>
        <p className="max-w-2xl text-sm text-slate-600">{meta.description}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {packages.map((pkg) => {
          const featured = "popular" in pkg && pkg.popular;
          return (
            <div
              key={pkg.id}
              className={`platform-pricing-card ${featured ? "platform-pricing-card--featured" : ""}`}
              style={
                featured
                  ? ({ ["--tw-ring-color" as string]: `${accent}45` } as React.CSSProperties)
                  : undefined
              }
            >
              {featured && (
                <div
                  className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-4 py-1.5 text-[10px] font-semibold text-white shadow-xl"
                  style={{ backgroundColor: accent, boxShadow: `0 10px 30px ${accent}40` }}
                >
                  <Sparkles size={12} /> Phổ biến
                </div>
              )}
              <div className="flex flex-1 flex-col space-y-6">
                <div className="flex justify-center">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={
                      featured
                        ? { backgroundColor: accent, color: "#fff" }
                        : { backgroundColor: `${accent}15`, color: accent }
                    }
                  >
                    <Server size={32} />
                  </div>
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold text-indigo-950">{pkg.name}</h3>
                  <p className="text-3xl font-bold" style={{ color: accent }}>
                    {formatPriceVnd(pkg.price)}
                  </p>
                  <p className="text-xs font-medium text-slate-500">/ năm</p>
                </div>
                <ul className="flex-1 space-y-4">
                  {pkg.works.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-slate-600">
                      <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: accent }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      onConsult(
                        `Vận hành ${pkg.name}`,
                        formatPriceVnd(pkg.price),
                        `Gói vận hành — ${meta.label}`,
                      )
                    }
                    className="flex-1 rounded-2xl py-3.5 text-xs font-semibold text-white shadow-lg transition-all hover:brightness-105"
                    style={{ background: `linear-gradient(135deg, #312E81, ${featured ? accent : primaryColor})` }}
                  >
                    Đăng ký ngay
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onConsult(
                        `Vận hành ${pkg.name}`,
                        formatPriceVnd(pkg.price),
                        `Gói vận hành — ${meta.label}`,
                      )
                    }
                    className="brand-btn-secondary flex h-12 w-12 items-center justify-center rounded-2xl p-0"
                  >
                    <MessageSquare size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
