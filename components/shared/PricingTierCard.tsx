"use client";

import Link from "next/link";
import { Check, MessageSquare, Sparkles, type LucideIcon } from "lucide-react";
import { useAdmin } from "@/lib/AdminContext";
import { BANGGIA_CTA_LABEL, PUBLIC_HIDE_PRICES, ZALO_CTA_LABEL } from "@/lib/public-pricing-display";
import { BANGGIA_PUBLIC_PATH, buildZaloPackageUrl } from "@/lib/site-contact";

export type PricingCompareItem = { label: string; value: string };

type PricingTierCardProps = {
  accent: string;
  title: string;
  price?: string;
  priceNote?: string;
  hidePrice?: boolean;
  sectionLabel?: string;
  features?: readonly string[];
  compareItems?: readonly PricingCompareItem[];
  featured?: boolean;
  featuredLabel?: string;
  icon?: LucideIcon;
  ctaLabel?: string;
  onCta?: () => void;
  onSecondaryCta?: () => void;
  variant?: "default" | "ads";
};

export function PricingTierCard({
  accent,
  title,
  price,
  priceNote,
  hidePrice = PUBLIC_HIDE_PRICES,
  sectionLabel,
  features = [],
  compareItems,
  featured,
  featuredLabel = "Phổ biến",
  icon: Icon,
  ctaLabel,
  onCta,
  onSecondaryCta,
  variant = "default",
}: PricingTierCardProps) {
  const { settings } = useAdmin();
  const zaloHref = buildZaloPackageUrl(title, sectionLabel, settings?.hotline);
  const showPublicCtas = hidePrice || !price;

  return (
    <div
      className={`platform-pricing-card pricing-card-vns flex flex-col p-0 ${featured ? "platform-pricing-card--featured pricing-card-vns--featured" : ""}`}
      style={{
        ["--tier-accent" as string]: accent,
        ...(featured ? ({ ["--tw-ring-color" as string]: `${accent}45` } as React.CSSProperties) : {}),
      }}
    >
      <div
        className="pricing-card-vns__header"
        style={{ background: `linear-gradient(135deg, #1e3a8a 0%, ${accent} 100%)` }}
      >
        {featured && (
          <div className="pricing-card-vns__badge">
            <Sparkles size={11} /> {featuredLabel}
          </div>
        )}
        {Icon && variant === "default" && (
          <div className="pricing-card-vns__header-icon">
            <Icon size={20} strokeWidth={2.2} />
          </div>
        )}
        <h3>{title}</h3>
      </div>

      <div className="pricing-card-vns__body flex flex-1 flex-col">
        {variant === "ads" && Icon && (
          <div className="mb-4 flex justify-center">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
              style={{ backgroundColor: accent, boxShadow: `0 10px 30px ${accent}35` }}
            >
              <Icon size={28} />
            </div>
          </div>
        )}

        {variant === "default" && Icon && !compareItems && (
          <div className="mb-4 flex justify-center md:hidden">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={
                featured
                  ? { backgroundColor: accent, color: "#fff" }
                  : { backgroundColor: `${accent}15`, color: accent }
              }
            >
              <Icon size={24} />
            </div>
          </div>
        )}

        {showPublicCtas ? (
          <div className={`${variant === "ads" ? "mb-5" : "mb-4"} text-center`}>
            <p className="text-sm font-semibold text-slate-600">Liên hệ Zalo để nhận báo giá</p>
            <Link
              href={BANGGIA_PUBLIC_PATH}
              className="mt-2 inline-flex text-xs font-semibold underline underline-offset-4 transition hover:opacity-80"
              style={{ color: accent }}
            >
              Hoặc xem bảng giá đầy đủ →
            </Link>
          </div>
        ) : (
          price && (
            <div className={`pricing-card-vns__price ${variant === "ads" ? "mb-5" : "mb-4"} text-center`}>
              <p className="text-2xl font-bold md:text-3xl" style={{ color: accent }}>
                {price}
              </p>
              {priceNote && <p className="mt-1 text-xs font-medium text-slate-500">{priceNote}</p>}
            </div>
          )
        )}

        {compareItems && compareItems.length > 0 ? (
          <ul className="pricing-card-vns__compare mb-5 flex-1">
            {compareItems.map((item) => (
              <li key={item.label}>
                <span className="pricing-card-vns__compare-label">{item.label}</span>
                <span className="pricing-card-vns__compare-value">{item.value}</span>
              </li>
            ))}
          </ul>
        ) : (
          features.length > 0 && (
            <ul className="pricing-card-vns__features mb-5 flex-1 space-y-2.5">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check size={16} className="mt-0.5 shrink-0" style={{ color: accent }} />
                  {feature}
                </li>
              ))}
            </ul>
          )
        )}

        <div className="pricing-card-vns__actions mt-auto flex flex-col gap-2.5 pt-1">
          {showPublicCtas ? (
            <>
              <a
                href={zaloHref}
                target="_blank"
                rel="noreferrer"
                className="pricing-card-vns__cta flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-semibold text-white shadow-lg transition hover:brightness-105"
                style={{ background: "linear-gradient(135deg, #0068FF, #0047B3)" }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
                  alt=""
                  className="h-4 w-4"
                  aria-hidden
                />
                {ctaLabel || ZALO_CTA_LABEL}
              </a>
              <Link
                href={BANGGIA_PUBLIC_PATH}
                className="flex w-full items-center justify-center rounded-2xl border border-indigo-200 bg-white py-3 text-xs font-semibold text-indigo-950 transition hover:border-indigo-300 hover:bg-indigo-50"
              >
                {BANGGIA_CTA_LABEL}
              </Link>
            </>
          ) : (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onCta}
                className="pricing-card-vns__cta flex-1 rounded-2xl py-3.5 text-xs font-semibold text-white shadow-lg transition hover:brightness-105"
                style={{ background: `linear-gradient(135deg, #312E81, ${accent})` }}
              >
                {ctaLabel}
              </button>
              {onSecondaryCta && (
                <button
                  type="button"
                  onClick={onSecondaryCta}
                  className="brand-btn-secondary pricing-card-vns__secondary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl p-0"
                >
                  <MessageSquare size={18} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
