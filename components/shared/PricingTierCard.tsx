"use client";

import Link from "next/link";
import { Check, MessageSquare, type LucideIcon } from "lucide-react";
import { useAdmin } from "@/lib/AdminContext";
import { BANGGIA_PUBLIC_PATH, buildZaloPackageUrl } from "@/lib/site-contact";
import { PUBLIC_HIDE_PRICES, ZALO_CTA_LABEL } from "@/lib/public-pricing-display";

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
  accent: _accent,
  title,
  price,
  priceNote,
  hidePrice = PUBLIC_HIDE_PRICES,
  sectionLabel,
  features = [],
  compareItems,
  featured,
  featuredLabel = "Phổ biến",
  icon: _Icon,
  ctaLabel,
  onCta,
  onSecondaryCta,
  variant: _variant = "default",
}: PricingTierCardProps) {
  const { settings } = useAdmin();
  const zaloHref = buildZaloPackageUrl(title, sectionLabel, settings?.hotline);
  const showPublicCtas = hidePrice || !price;

  return (
    <div
      className={`platform-pricing-card pricing-card-vns flex flex-col p-0 ${featured ? "platform-pricing-card--featured pricing-card-vns--featured" : ""}`}
    >
      <div className="pricing-card-vns__header" style={{ background: "#14161f" }}>
        {featured && <div className="pricing-card-vns__badge">{featuredLabel}</div>}
        <h3>{title}</h3>
      </div>

      <div className="pricing-card-vns__body flex flex-1 flex-col">
        {showPublicCtas ? (
          <div className="mb-3 text-center">
            <p className="text-[13px] font-medium text-slate-500">Liên hệ Zalo để nhận báo giá</p>
            <Link
              href={BANGGIA_PUBLIC_PATH}
              className="mt-1.5 inline-flex text-[12px] font-medium text-white/55 underline underline-offset-4 transition hover:text-white/80"
            >
              Hoặc xem bảng giá đầy đủ →
            </Link>
          </div>
        ) : (
          price && (
            <div className="pricing-card-vns__price mb-3 text-center">
              <p className="text-xl font-medium text-white md:text-2xl">{price}</p>
              {priceNote && <p className="mt-1 text-xs font-medium text-slate-500">{priceNote}</p>}
            </div>
          )
        )}

        {compareItems && compareItems.length > 0 ? (
          <ul className="pricing-card-vns__compare mb-3">
            {compareItems.map((item) => (
              <li key={item.label}>
                <span className="pricing-card-vns__compare-label">{item.label}</span>
                <span className="pricing-card-vns__compare-value">{item.value}</span>
              </li>
            ))}
          </ul>
        ) : (
          features.length > 0 && (
            <ul className="pricing-card-vns__features mb-3 space-y-1.5">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-[13px] text-slate-600">
                  <Check size={14} className="mt-0.5 shrink-0 text-white/40" />
                  {feature}
                </li>
              ))}
            </ul>
          )
        )}

        <div className="pricing-card-vns__actions mt-auto flex flex-col gap-2 pt-1">
          {showPublicCtas ? (
            <a
              href={zaloHref}
              target="_blank"
              rel="noreferrer"
              className="pricing-card-vns__cta flex w-full items-center justify-center gap-2 rounded-md py-2.5 text-[13px] font-medium text-white transition hover:brightness-110"
              style={{ background: "#0068FF" }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
                alt=""
                className="h-4 w-4"
                aria-hidden
              />
              {ctaLabel || ZALO_CTA_LABEL}
            </a>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onCta}
                className="pricing-card-vns__cta flex-1 rounded-md bg-[#6D5CE6] py-2.5 text-[13px] font-medium text-white transition hover:bg-[#5B4BD4]"
              >
                {ctaLabel}
              </button>
              {onSecondaryCta && (
                <button
                  type="button"
                  onClick={onSecondaryCta}
                  className="pricing-card-vns__secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/15 bg-[#14161f] p-0 text-white/70"
                >
                  <MessageSquare size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
