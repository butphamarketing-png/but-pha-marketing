"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  FileText,
  Globe,
  LayoutTemplate,
  MapPin,
  Megaphone,
  Phone,
  Rocket,
  Server,
  Shield,
  Sparkles,
  Target,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { ConsultModal } from "@/components/shared/ConsultModal";
import { ConsultationModal } from "@/components/shared/PlatformPage";
import { WebsiteOperationSection } from "@/components/shared/WebsiteOperationSection";
import { WebsiteOperationComparisonTable } from "@/components/website/WebsiteOperationComparisonTable";
import { DomainCarousel } from "@/components/landing/DomainCarousel";
import { PackageCarousel } from "@/components/shared/PackageCarousel";
import { useAdmin } from "@/lib/AdminContext";
import {
  FANPAGE_ADS_PACKAGES,
  FANPAGE_BUILD_PACKAGES,
  FANPAGE_CARE_PACKAGES,
  formatPriceVnd,
  GOOGLE_MAPS_ADS_PACKAGES,
  GOOGLE_MAPS_PACKAGES,
  WEBSITE_BUILD_PACKAGES,
  WEBSITE_CARE_PACKAGES,
} from "@/lib/service-pricing";
import {
  getServiceLandingNav,
  getServiceLandingConfig,
  type LandingPlatformKey,
  type LandingIconName,
  type LandingSection,
  type ServiceLandingConfig,
} from "@/lib/service-landing-config";
import { getTelHref, resolveHotline } from "@/lib/site-contact";
import { fadeUpChild, staggerIntro, VIEWPORT_ONCE } from "@/lib/motion-presets";

const WEBSITE_ADS_PACKAGES = [
  {
    id: "web-ads-under-10",
    name: "Ngân sách dưới 10.000.000đ",
    price: 1_000_000,
    works: [
      "Thiết lập chiến dịch Google / Meta",
      "Landing page & pixel tracking",
      "Nghiên cứu từ khóa mục tiêu",
      "Theo dõi & tối ưu hàng tuần",
      "Báo cáo hiệu quả",
    ],
  },
  {
    id: "web-ads-over-10",
    name: "Ngân sách trên 10.000.000đ",
    price: 2_000_000,
    works: [
      "Tối ưu chiến dịch chuyên sâu",
      "A/B test landing & creative",
      "Remarketing đa kênh",
      "Tối ưu CPA / ROAS",
      "Báo cáo & đề xuất chiến lược",
    ],
  },
] as const;

function platformKeyForModal(key: LandingPlatformKey) {
  if (key === "googlemaps") return "google-maps";
  return key;
}

type CheckoutState = {
  name: string;
  price: string;
  color: string;
  tabLabel: string;
} | null;

function SectionHeading({
  label,
  title,
  subtitle,
  accent,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  accent: string;
}) {
  return (
    <div className="mb-10 space-y-3 text-center md:mb-12 landing-section-heading" style={{ ["--landing-accent" as string]: accent }}>
      {label && (
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: accent }}>
          {label}
        </span>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-indigo-950 md:text-3xl lg:text-4xl">{title}</h2>
      {subtitle && <p className="mx-auto max-w-2xl text-sm text-slate-600 md:text-base">{subtitle}</p>}
    </div>
  );
}

function CheckGrid({ items, variant }: { items: string[]; variant: "check" | "cross" | "rocket" }) {
  const Icon = variant === "cross" ? XCircle : variant === "rocket" ? Rocket : CheckCircle2;
  const iconClass =
    variant === "cross" ? "text-rose-500" : variant === "rocket" ? "text-violet-600" : "text-emerald-600";

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="landing-interactive-card flex items-start gap-3 rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm">
          <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconClass}`} />
          <span className="text-sm font-medium leading-relaxed text-slate-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function StepsGrid({ steps, columns, accent }: { steps: string[]; columns: 3 | 5 | 6; accent: string }) {
  const colClass =
    columns === 6
      ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
      : columns === 5
        ? "sm:grid-cols-2 lg:grid-cols-5"
        : "sm:grid-cols-3";

  return (
    <ol className={`grid gap-4 ${colClass}`}>
      {steps.map((step, i) => (
        <li
          key={step}
          className="landing-interactive-card landing-step-card rounded-2xl border border-indigo-100 bg-white p-5 text-center shadow-sm"
        >
          <span
            className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: accent }}
          >
            {i + 1}
          </span>
          <p className="text-sm font-semibold text-indigo-950">{step}</p>
        </li>
      ))}
    </ol>
  );
}

const LANDING_ICONS: Record<LandingIconName, typeof Server> = {
  Server,
  Shield,
  Zap,
  Globe,
  FileText,
  LayoutTemplate,
  Target,
  Megaphone,
  Users,
  MapPin,
};

function HeroVisual({ visual, accent }: { visual: ServiceLandingConfig["hero"]["visual"]; accent: string }) {
  if (visual.type === "none") return null;

  if (visual.type === "image") {
    return (
      <motion.div variants={fadeUpChild} className="relative">
        <div className="absolute -inset-4 rounded-[2rem] opacity-20 blur-2xl" style={{ backgroundColor: accent }} />
        <div className="landing-visual-card relative overflow-hidden rounded-[1.75rem] border border-indigo-100 shadow-xl">
          <Image
            src={visual.src}
            alt={visual.alt}
            width={640}
            height={480}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      </motion.div>
    );
  }

  if (visual.type === "platform") {
    return (
      <motion.div variants={fadeUpChild} className="flex justify-center lg:justify-end">
        <div
          className="flex h-48 w-48 items-center justify-center rounded-[2rem] border border-indigo-100 bg-white shadow-xl md:h-56 md:w-56"
          style={{ boxShadow: `0 20px 60px ${accent}25` }}
        >
          <Image src={visual.src} alt={visual.alt} width={120} height={120} className="h-24 w-24 object-contain md:h-28 md:w-28" />
        </div>
      </motion.div>
    );
  }

  const icons = visual.icons;
  return (
    <motion.div variants={fadeUpChild} className="grid grid-cols-2 gap-4">
      {icons.map((name, i) => {
        const Icon = LANDING_ICONS[name];
        return (
          <div
            key={name}
            className="landing-icon-tile flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm"
            style={{ backgroundColor: i % 2 === 0 ? `${accent}08` : "#fff" }}
          >
            <Icon size={32} style={{ color: accent }} />
          </div>
        );
      })}
    </motion.div>
  );
}

function renderPricingSection(
  section: Extract<LandingSection, { kind: "pricing" }>,
  config: ServiceLandingConfig,
  onChoose: (name: string, price: string, tabLabel: string) => void,
) {
  const chooseLabel = section.chooseLabel ?? "Chọn gói";
  const accent = config.color;

  const desktopCols: 2 | 3 | 4 =
    section.pricingKind === "website-build" ? 4 : section.pricingKind === "website-ads" || section.pricingKind === "fanpage-ads" || section.pricingKind === "gm-ads" ? 2 : 3;

  const renderCards = (packages: readonly { id: string; name: string; price: number; works: readonly string[]; posts?: number }[], opts?: { hidePrices?: boolean; chooseLabel?: string; periodNote?: string }) => (
    <PackageCarousel accent={accent} itemCount={packages.length} desktopCols={desktopCols}>
      {packages.map((pkg, i) => {
        const featured = i === 1 && packages.length >= 3;
        const displayName = pkg.posts ? `${pkg.posts} bài / tháng` : pkg.name;
        const priceStr = opts?.hidePrices ? "Liên hệ" : formatPriceVnd(pkg.price);
        const label = opts?.chooseLabel ?? chooseLabel;

        return (
          <div
            key={pkg.id}
            className={`platform-pricing-card landing-interactive-card flex flex-col p-8 ${featured ? "platform-pricing-card--featured" : ""}`}
          >
            {featured && (
              <div
                className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-4 py-1.5 text-[10px] font-semibold text-white shadow-xl"
                style={{ backgroundColor: accent }}
              >
                <Sparkles size={12} /> Phổ biến
              </div>
            )}
            <h3 className="mb-2 text-center text-lg font-bold text-indigo-950">{displayName}</h3>
            {!opts?.hidePrices && (
              <div className="mb-6 text-center">
                <p className="text-2xl font-bold" style={{ color: accent }}>
                  {priceStr}
                </p>
                {opts?.periodNote && <p className="text-[10px] font-medium text-slate-500">{opts.periodNote}</p>}
              </div>
            )}
            <ul className="mb-8 flex-1 space-y-3 border-y border-indigo-100 py-4">
              {pkg.works.map((w) => (
                <li key={w} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check size={16} className="mt-0.5 shrink-0" style={{ color: accent }} />
                  {w}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onChoose(displayName, priceStr, label)}
              className="rounded-2xl py-3.5 text-xs font-bold text-white shadow-lg transition hover:brightness-105"
              style={{ backgroundColor: accent }}
            >
              {label}
            </button>
          </div>
        );
      })}
    </PackageCarousel>
  );

  switch (section.pricingKind) {
    case "website-operation":
      return (
        <WebsiteOperationSection
          primaryColor={accent}
          onConsult={onChoose}
          chooseLabel={chooseLabel}
        />
      );
    case "website-compare":
      return <WebsiteOperationComparisonTable />;
    case "website-build":
      return renderCards(
        WEBSITE_BUILD_PACKAGES.map((p) => ({ ...p, works: p.works })),
        { hidePrices: section.hidePrices, chooseLabel },
      );
    case "website-care":
      return renderCards(
        WEBSITE_CARE_PACKAGES.map((p) => ({ id: p.id, name: `${p.posts} bài/tháng`, price: p.price, works: p.works, posts: p.posts })),
        { chooseLabel, periodNote: "/ tháng" },
      );
    case "website-ads":
      return renderCards(WEBSITE_ADS_PACKAGES.map((p) => ({ ...p })), {
        chooseLabel,
        periodNote: "/ tháng (chưa gồm ngân sách ads)",
      });
    case "domain":
      return <DomainCarousel accent={accent} />;
    case "fanpage-build":
      return renderCards(FANPAGE_BUILD_PACKAGES.map((p) => ({ ...p })), { chooseLabel });
    case "fanpage-care":
      return renderCards(
        FANPAGE_CARE_PACKAGES.map((p) => ({
          id: p.id,
          name: `${p.posts} bài/tháng`,
          price: p.price,
          works: p.works,
          posts: p.posts,
        })),
        { chooseLabel, periodNote: "/ tháng" },
      );
    case "fanpage-ads":
      return renderCards(FANPAGE_ADS_PACKAGES.map((p) => ({ ...p })), {
        chooseLabel,
        periodNote: "/ tháng (chưa gồm ngân sách ads)",
      });
    case "gm-build":
      return renderCards(GOOGLE_MAPS_PACKAGES.map((p) => ({ ...p })), { chooseLabel });
    case "gm-ads":
      return renderCards(GOOGLE_MAPS_ADS_PACKAGES.map((p) => ({ ...p })), {
        chooseLabel,
        periodNote: "/ tháng (chưa gồm ngân sách ads)",
      });
    default:
      return null;
  }
}

export function ServiceLandingPage({ slug }: { slug: string }) {
  const config = getServiceLandingConfig(slug);
  if (!config) return null;
  const { settings } = useAdmin();
  const [showConsult, setShowConsult] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [checkoutPkg, setCheckoutPkg] = useState<CheckoutState>(null);

  const hotline = resolveHotline(settings?.hotline);
  const telHref = getTelHref(settings?.hotline);
  const nav = getServiceLandingNav(config);
  const accent = config.color;
  const heroVisual = config.hero.visual;
  const hasHeroSide = heroVisual.type !== "none";

  const openPackageConsult = (pkgName: string, pkgPrice: string, tabLabel: string) => {
    if (pkgPrice === "Liên hệ") {
      setShowConsult(true);
      return;
    }
    setCheckoutPkg({ name: pkgName, price: pkgPrice, color: accent, tabLabel });
  };

  return (
    <SubPageLayout platformName={config.platformName} primaryColor={accent} customSections={nav}>
      <div className="mx-auto max-w-7xl px-4 pb-24" style={{ ["--landing-accent" as string]: accent }}>
        <section id="hero" className="scroll-mt-24 py-12 md:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={staggerIntro}
            className="brand-card landing-hero-card overflow-hidden p-6 md:p-10 lg:p-12"
            style={{ ["--landing-accent" as string]: accent }}
          >
            <div className={`grid items-center gap-8 ${hasHeroSide ? "lg:grid-cols-2" : ""}`}>
              <motion.div variants={fadeUpChild} className={`space-y-5 ${!hasHeroSide ? "mx-auto max-w-3xl text-center" : ""}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500">{config.hero.eyebrow}</p>
                <h1 className="text-xl font-bold leading-snug tracking-tight text-indigo-950 sm:text-2xl md:text-3xl">
                  {config.hero.title}
                </h1>
                <p className={`text-sm leading-relaxed text-slate-600 md:text-base ${!hasHeroSide ? "mx-auto" : "max-w-xl"}`}>
                  {config.hero.subtitle}
                </p>
                <ul className={`grid gap-2.5 ${hasHeroSide ? "sm:grid-cols-2" : "sm:grid-cols-2 md:grid-cols-3"}`}>
                  {config.hero.bullets.map((item) => (
                    <li
                      key={item}
                      className={`flex items-center gap-2 text-xs font-semibold text-slate-700 sm:text-sm ${!hasHeroSide ? "justify-center sm:justify-start" : ""}`}
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className={!hasHeroSide ? "flex justify-center" : ""}>
                  <button
                    type="button"
                    onClick={() => setShowConsult(true)}
                    className="landing-shimmer-btn rounded-2xl px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:brightness-105 active:scale-[0.99]"
                    style={{ background: `linear-gradient(135deg, #312E81, ${accent})` }}
                  >
                    {config.hero.cta.toUpperCase()}
                  </button>
                </div>
              </motion.div>
              {hasHeroSide && <HeroVisual visual={heroVisual} accent={accent} />}
            </div>
          </motion.div>
        </section>

        {config.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24 py-12 md:py-16">
            {section.kind !== "pricing" || section.pricingKind === "website-compare" ? (
              <SectionHeading
                label={section.label}
                title={section.title}
                subtitle={"subtitle" in section ? section.subtitle : undefined}
                accent={accent}
              />
            ) : section.pricingKind !== "website-operation" ? (
              <SectionHeading
                label={section.label}
                title={section.title}
                subtitle={section.subtitle}
                accent={accent}
              />
            ) : (
              <SectionHeading label={section.label} title={section.title} subtitle={section.subtitle} accent={accent} />
            )}

            {section.kind === "check-grid" && <CheckGrid items={section.items} variant={section.variant} />}
            {section.kind === "steps" && (
              <StepsGrid steps={section.steps} columns={section.columns ?? 5} accent={accent} />
            )}
            {section.kind === "emoji-grid" && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item) => (
                  <div
                    key={item.text}
                    className="landing-interactive-card flex items-start gap-4 rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <p className="text-sm font-medium text-slate-700">{item.text}</p>
                  </div>
                ))}
              </div>
            )}
            {section.kind === "info-cards" && (
              <div className="grid gap-6 md:grid-cols-3">
                {section.cards.map((card) => (
                  <div key={card.title} className="landing-interactive-card rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
                    <h3 className="mb-2 text-lg font-bold text-indigo-950">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{card.desc}</p>
                  </div>
                ))}
              </div>
            )}
            {section.kind === "pricing" &&
              renderPricingSection(section, config, openPackageConsult)}
            {section.kind === "faq" && (
              <div className="mx-auto max-w-3xl space-y-3">
                {section.items.map((item, i) => (
                  <div key={item.q} className="landing-interactive-card landing-faq-item overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-sm font-bold text-indigo-950 md:text-base">{item.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-slate-400 transition ${openFaq === i ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="border-t border-indigo-50 px-5 py-4 text-sm leading-relaxed text-slate-600">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        <section id="cta" className="scroll-mt-24 py-12 md:py-16">
          <div
            className="landing-cta-panel overflow-hidden rounded-[2rem] p-8 text-center text-white md:p-12"
            style={{ background: `linear-gradient(135deg, #312E81 0%, ${accent} 100%)`, ["--landing-accent" as string]: accent }}
          >
            <Globe className="mx-auto mb-4 h-10 w-10 opacity-80" />
            <h2 className="mb-3 text-2xl font-bold md:text-3xl">{config.cta.title}</h2>
            <p className="mx-auto mb-8 max-w-xl text-sm opacity-90 md:text-base">{config.cta.subtitle}</p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowConsult(true)}
                className="landing-shimmer-btn rounded-2xl bg-white px-8 py-4 text-sm font-bold shadow-lg transition hover:bg-indigo-50"
                style={{ color: accent }}
              >
                Liên hệ tư vấn
              </button>
              <a
                href={telHref}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/30 px-6 py-4 text-sm font-semibold transition hover:bg-white/10"
              >
                <Phone size={16} /> {hotline}
              </a>
            </div>
            {config.cta.relatedHref && config.cta.relatedLabel && (
              <p className="mt-6 text-sm opacity-80">
                <Link href={config.cta.relatedHref} className="underline underline-offset-4 hover:opacity-100">
                  {config.cta.relatedLabel}
                </Link>
              </p>
            )}
          </div>
        </section>
      </div>

      {showConsult && (
        <ConsultModal isOpen={showConsult} onClose={() => setShowConsult(false)} platformColor={accent} />
      )}
      {checkoutPkg && (
        <ConsultationModal
          pkg={checkoutPkg}
          platformKey={platformKeyForModal(config.platformKey)}
          onClose={() => setCheckoutPkg(null)}
        />
      )}
    </SubPageLayout>
  );
}
