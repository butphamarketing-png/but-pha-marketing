"use client";

import { Check, MessageSquare, Sparkles, type LucideIcon } from "lucide-react";

export type PricingCompareItem = { label: string; value: string };

type PricingTierCardProps = {
  accent: string;
  title: string;
  price?: string;
  priceNote?: string;
  features?: readonly string[];
  compareItems?: readonly PricingCompareItem[];
  featured?: boolean;
  featuredLabel?: string;
  icon?: LucideIcon;
  ctaLabel: string;
  onCta: () => void;
  onSecondaryCta?: () => void;
  variant?: "default" | "ads";
};

export function PricingTierCard({
  accent,
  title,
  price,
  priceNote,
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

        {price && (
          <div className={`pricing-card-vns__price ${variant === "ads" ? "mb-5" : "mb-4"} text-center`}>
            <p className="text-2xl font-bold md:text-3xl" style={{ color: accent }}>
              {price}
            </p>
            {priceNote && <p className="mt-1 text-xs font-medium text-slate-500">{priceNote}</p>}
          </div>
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

        <div className="pricing-card-vns__actions mt-auto flex gap-3 pt-1">
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
      </div>
    </div>
  );
}
