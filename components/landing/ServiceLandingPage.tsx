"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
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
  Target,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import { SubPageLayout } from "@/components/shared/SubPageLayout";
import { ConsultModal } from "@/components/shared/ConsultModal";
import { WebsiteOperationSection } from "@/components/shared/WebsiteOperationSection";
import { WebsiteOperationComparisonTable } from "@/components/website/WebsiteOperationComparisonTable";
import { DomainCarousel } from "@/components/landing/DomainCarousel";
import { PackageCarousel } from "@/components/shared/PackageCarousel";
import { PricingTierCard } from "@/components/shared/PricingTierCard";
import { useAdmin } from "@/lib/AdminContext";
import {
  FANPAGE_ADS_PACKAGES,
  FANPAGE_BUILD_PACKAGES,
  FANPAGE_CARE_PACKAGES,
  GOOGLE_MAPS_ADS_PACKAGES,
  GOOGLE_MAPS_PACKAGES,
  WEBSITE_ADS_PACKAGES,
  WEBSITE_BUILD_PACKAGES,
  WEBSITE_CARE_PACKAGES,
} from "@/lib/service-pricing";
import {
  getServiceLandingNav,
  getServiceLandingConfig,
  type LandingIconName,
  type LandingSection,
  type ServiceLandingConfig,
} from "@/lib/service-landing-config";
import { DeepTechAtmosphere } from "@/components/shared/DeepTechAtmosphere";
import { getTelHref, resolveHotline } from "@/lib/site-contact";
import { fadeUpChild, staggerIntro, VIEWPORT_ONCE } from "@/lib/motion-presets";

const AMBER = "#C4955A";
const serif = { fontFamily: '"Cormorant Garamond", Georgia, serif' } as const;
const card =
  "rounded-2xl border border-violet-400/15 bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:border-violet-300/35 hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(139,124,246,0.1)]";

function SectionHeading({
  label,
  title,
  subtitle,
}: {
  label?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10 space-y-3 text-center md:mb-12">
      {label && (
        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-violet-300/75">
          {label}
        </span>
      )}
      <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl lg:text-4xl" style={serif}>
        {title}
      </h2>
      {subtitle && <p className="mx-auto max-w-2xl text-sm text-white/45 md:text-base">{subtitle}</p>}
      <div
        className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-violet-400/50 to-transparent"
        aria-hidden
      />
    </div>
  );
}

function CheckGrid({ items, variant }: { items: string[]; variant: "check" | "cross" | "rocket" }) {
  const Icon = variant === "cross" ? XCircle : variant === "rocket" ? Rocket : CheckCircle2;
  const iconClass =
    variant === "cross" ? "text-rose-400" : variant === "rocket" ? "text-amber-200" : "text-emerald-400";

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className={`flex items-start gap-3 p-4 ${card}`}>
          <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconClass}`} />
          <span className="text-sm font-medium leading-relaxed text-white/70">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function StepsGrid({ steps, columns }: { steps: string[]; columns: 3 | 5 | 6 }) {
  const colClass =
    columns === 6
      ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
      : columns === 5
        ? "sm:grid-cols-2 lg:grid-cols-5"
        : "sm:grid-cols-3";

  return (
    <ol className={`grid gap-4 ${colClass}`}>
      {steps.map((step, i) => (
        <li key={step} className={`p-5 text-center ${card}`}>
          <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-200 text-sm font-bold text-[#0b0d12]">
            {i + 1}
          </span>
          <p className="text-sm font-medium text-white/85">{step}</p>
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

function HeroVisual({ visual }: { visual: ServiceLandingConfig["hero"]["visual"] }) {
  if (visual.type === "none") return null;

  if (visual.type === "image") {
    return (
      <motion.div variants={fadeUpChild} className="relative">
        <div className="absolute -inset-4 rounded-[2rem] bg-amber-200/10 opacity-40 blur-2xl" />
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10">
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
        <div className="flex h-48 w-48 items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.04] md:h-56 md:w-56">
          <Image src={visual.src} alt={visual.alt} width={120} height={120} className="h-24 w-24 object-contain md:h-28 md:w-28" />
        </div>
      </motion.div>
    );
  }

  const icons = visual.icons;
  return (
    <motion.div variants={fadeUpChild} className="grid grid-cols-2 gap-4">
      {icons.map((name) => {
        const Icon = LANDING_ICONS[name];
        return (
          <div
            key={name}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
          >
            <Icon size={32} className="text-amber-200/80" />
          </div>
        );
      })}
    </motion.div>
  );
}

function renderPricingSection(
  section: Extract<LandingSection, { kind: "pricing" }>,
  config: ServiceLandingConfig,
) {
  const chooseLabel = section.chooseLabel;
  const accent = AMBER;
  const sectionLabel = section.title;

  const desktopCols: 2 | 3 | 4 =
    section.pricingKind === "website-build"
      ? 4
      : section.pricingKind === "website-ads" || section.pricingKind === "fanpage-ads" || section.pricingKind === "gm-ads"
        ? 2
        : 3;

  const renderCards = (
    packages: readonly { id: string; name: string; price: number; works: readonly string[]; posts?: number }[],
    opts?: { chooseLabel?: string },
  ) => (
    <PackageCarousel accent={accent} itemCount={packages.length} desktopCols={desktopCols}>
      {packages.map((pkg, i) => {
        const featured = i === 1 && packages.length >= 3;
        const displayName = pkg.posts ? `${pkg.posts} bài / tháng` : pkg.name;

        return (
          <PricingTierCard
            key={pkg.id}
            accent={accent}
            title={displayName}
            sectionLabel={sectionLabel}
            features={pkg.works}
            featured={featured}
            ctaLabel={opts?.chooseLabel ?? chooseLabel}
          />
        );
      })}
    </PackageCarousel>
  );

  switch (section.pricingKind) {
    case "website-operation":
      return (
        <WebsiteOperationSection primaryColor={accent} sectionLabel={sectionLabel} chooseLabel={chooseLabel} />
      );
    case "website-compare":
      return <WebsiteOperationComparisonTable />;
    case "website-build":
      return renderCards(WEBSITE_BUILD_PACKAGES.map((p) => ({ ...p, works: p.works })), { chooseLabel });
    case "website-care":
      return renderCards(
        WEBSITE_CARE_PACKAGES.map((p) => ({
          id: p.id,
          name: `${p.posts} bài/tháng`,
          price: p.price,
          works: p.works,
          posts: p.posts,
        })),
        { chooseLabel },
      );
    case "website-ads":
      return renderCards(WEBSITE_ADS_PACKAGES.map((p) => ({ ...p })), { chooseLabel });
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
        { chooseLabel },
      );
    case "fanpage-ads":
      return renderCards(FANPAGE_ADS_PACKAGES.map((p) => ({ ...p })), { chooseLabel });
    case "gm-build":
      return renderCards(GOOGLE_MAPS_PACKAGES.map((p) => ({ ...p })), { chooseLabel });
    case "gm-ads":
      return renderCards(GOOGLE_MAPS_ADS_PACKAGES.map((p) => ({ ...p })), { chooseLabel });
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

  const hotline = resolveHotline(settings?.hotline);
  const telHref = getTelHref(settings?.hotline);
  const nav = getServiceLandingNav(config);
  const accent = AMBER;
  const heroVisual = config.hero.visual;
  const hasHeroSide = heroVisual.type !== "none";
  const isWebsiteChild = config.slug.startsWith("website/");

  return (
    <SubPageLayout
      platformName={config.platformName}
      primaryColor={accent}
      customSections={nav}
      theme="deep"
    >
      <div className="relative isolate">
        {isWebsiteChild ? <DeepTechAtmosphere intensity="default" /> : null}
        <div
          className="relative z-10 mx-auto max-w-7xl px-4 pb-24"
          style={{ ["--landing-accent" as string]: accent }}
        >
        <section id="hero" className="scroll-mt-24 py-12 md:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={staggerIntro}
            className="relative overflow-hidden rounded-[1.75rem] border border-violet-400/20 bg-white/[0.04] p-6 shadow-[0_0_60px_rgba(139,124,246,0.08)] md:p-10 lg:p-12"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 0% 0%, rgba(139,124,246,0.18), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(196,149,90,0.12), transparent 50%)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.2]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(139,124,246,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(196,149,90,0.15) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage: "linear-gradient(180deg, black, transparent 85%)",
              }}
              aria-hidden
            />
            <div className={`relative grid items-center gap-8 ${hasHeroSide ? "lg:grid-cols-2" : ""}`}>
              <motion.div
                variants={fadeUpChild}
                className={`space-y-5 ${!hasHeroSide ? "mx-auto max-w-3xl text-center" : ""}`}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300/80">
                  {config.hero.eyebrow}
                </p>
                <h1
                  className="text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl"
                  style={serif}
                >
                  {config.hero.title}
                </h1>
                <p
                  className={`text-sm leading-relaxed text-white/50 md:text-base ${!hasHeroSide ? "mx-auto" : "max-w-xl"}`}
                >
                  {config.hero.subtitle}
                </p>
                <ul
                  className={`grid gap-2.5 ${hasHeroSide ? "sm:grid-cols-2" : "sm:grid-cols-2 md:grid-cols-3"}`}
                >
                  {config.hero.bullets.map((item) => (
                    <li
                      key={item}
                      className={`flex items-center gap-2 text-xs font-medium text-white/75 sm:text-sm ${!hasHeroSide ? "justify-center sm:justify-start" : ""}`}
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-violet-300" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className={!hasHeroSide ? "flex justify-center" : ""}>
                  <button
                    type="button"
                    onClick={() => setShowConsult(true)}
                    className="rounded-full bg-gradient-to-r from-amber-200 to-violet-300 px-8 py-4 text-sm font-semibold text-[#0b0d12] shadow-lg shadow-violet-950/25 transition hover:brightness-105 active:scale-[0.99]"
                  >
                    {config.hero.cta.toUpperCase()}
                  </button>
                </div>
              </motion.div>
              {hasHeroSide && <HeroVisual visual={heroVisual} />}
            </div>
          </motion.div>
        </section>

        {config.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24 py-12 md:py-16">
            <SectionHeading
              label={section.label}
              title={section.title}
              subtitle={"subtitle" in section ? section.subtitle : undefined}
            />

            {section.kind === "check-grid" && <CheckGrid items={section.items} variant={section.variant} />}
            {section.kind === "steps" && <StepsGrid steps={section.steps} columns={section.columns ?? 5} />}
            {section.kind === "emoji-grid" && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item) => (
                  <div key={item.text} className={`flex items-start gap-4 p-5 ${card}`}>
                    <span className="text-2xl">{item.icon}</span>
                    <p className="text-sm font-medium text-white/70">{item.text}</p>
                  </div>
                ))}
              </div>
            )}
            {section.kind === "info-cards" && (
              <div className="grid gap-6 md:grid-cols-3">
                {section.cards.map((cardItem) => (
                  <div key={cardItem.title} className={`p-6 ${card}`}>
                    <h3 className="mb-2 text-lg font-medium text-white" style={serif}>
                      {cardItem.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/45">{cardItem.desc}</p>
                  </div>
                ))}
              </div>
            )}
            {section.kind === "pricing" && renderPricingSection(section, config)}
            {section.kind === "faq" && (
              <div className="mx-auto max-w-3xl space-y-3">
                {section.items.map((item, i) => (
                  <div key={item.q} className={`overflow-hidden ${card}`}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-sm font-medium text-white md:text-base">{item.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-white/35 transition ${openFaq === i ? "rotate-180" : ""}`}
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
                          <p className="border-t border-white/[0.06] px-5 py-4 text-sm leading-relaxed text-white/45">
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
          <div className="relative overflow-hidden rounded-[2rem] border border-violet-400/25 bg-gradient-to-br from-[#12141c] via-[#0c0e14] to-[#1a1430] p-8 text-center md:p-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage: "url(/about/about-city-bg-deep.png?v=cta)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 bg-[#0a0914]/75" aria-hidden />
            <div className="relative">
            <Globe className="mx-auto mb-4 h-10 w-10 text-violet-300/80" />
            <h2 className="mb-3 text-2xl font-semibold text-white md:text-3xl" style={serif}>
              {config.cta.title}
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-sm text-white/45 md:text-base">{config.cta.subtitle}</p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowConsult(true)}
                className="rounded-full bg-gradient-to-r from-amber-200 to-violet-300 px-8 py-4 text-sm font-semibold text-[#0b0d12] shadow-lg shadow-violet-950/30 transition hover:brightness-105"
              >
                Liên hệ tư vấn
              </button>
              <a
                href={telHref}
                className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 px-6 py-4 text-sm font-medium text-white/80 transition hover:border-violet-300/50 hover:text-violet-200"
              >
                <Phone size={16} /> {hotline}
              </a>
            </div>
            {config.cta.relatedHref && config.cta.relatedLabel && (
              <p className="mt-6 text-sm text-white/40">
                <Link
                  href={config.cta.relatedHref}
                  className="text-violet-300/80 underline underline-offset-4 hover:text-violet-200"
                >
                  {config.cta.relatedLabel}
                </Link>
              </p>
            )}
            </div>
          </div>
        </section>
      </div>
      </div>

      {showConsult && (
        <ConsultModal isOpen={showConsult} onClose={() => setShowConsult(false)} platformColor={accent} />
      )}
    </SubPageLayout>
  );
}
