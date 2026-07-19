import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export type SubLandingBreadcrumb = {
  label: string;
  href?: string;
};

export type SubLandingCta = {
  label: string;
  href: string;
  primary?: boolean;
};

export type SubLandingProcessStep = {
  step: string;
  title: string;
  desc: string;
};

export type SubLandingRelatedLink = {
  href: string;
  label: string;
  desc: string;
};

export type SubLandingFaq = {
  q: string;
  a: string;
};

export type SubLandingConfig = {
  breadcrumbs: SubLandingBreadcrumb[];
  eyebrow?: string;
  title: string;
  intro: React.ReactNode;
  ctas?: SubLandingCta[];
  painTitle?: string;
  painIntro?: string;
  painPoints?: string[];
  featuresTitle?: string;
  features?: string[];
  processTitle?: string;
  process?: SubLandingProcessStep[];
  kpiTitle?: string;
  kpis?: React.ReactNode[];
  relatedTitle?: string;
  relatedLinks?: SubLandingRelatedLink[];
  faqs?: SubLandingFaq[];
  ctaBand?: {
    eyebrow?: string;
    title: string;
    subline: string;
    primary: SubLandingCta;
    secondary?: SubLandingCta;
  };
};

const panel = "border border-white/10 bg-[#0e1018] p-5 md:p-6";

export function SubLandingPage({ config }: { config: SubLandingConfig }) {
  return (
    <div className="mx-auto max-w-5xl space-y-8 text-white">
      <nav aria-label="Breadcrumb" className="text-sm text-white/40">
        <ol className="flex flex-wrap items-center gap-1.5">
          {config.breadcrumbs.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden="true" className="text-white/25">
                  /
                </span>
              )}
              {item.href ? (
                <Link href={item.href} className="font-medium text-white/40 hover:text-white/80">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-white/70" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <section className="border-b border-white/[0.06] pb-12">
        {config.eyebrow && (
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
            {config.eyebrow}
          </p>
        )}
        <h1
          className="text-[1.75rem] font-semibold leading-snug tracking-tight text-white sm:text-[2.05rem]"
         
        >
          {config.title}
        </h1>
        <div className="mt-5 max-w-3xl text-base leading-relaxed text-white/45 md:text-lg">{config.intro}</div>
        {config.ctas && config.ctas.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {config.ctas.map((cta) =>
              cta.primary ? (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className="inline-flex items-center gap-2 rounded-md bg-[#6D5CE6] px-4 py-2 text-sm font-medium text-white hover:brightness-105"
                >
                  {cta.label}
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 px-5 py-3 text-sm font-medium text-white/75 hover:border-violet-300/50 hover:text-violet-200"
                >
                  {cta.label}
                </Link>
              ),
            )}
          </div>
        )}
      </section>

      {config.painPoints && config.painPoints.length > 0 && (
        <section className={panel}>
          <h2 className="text-xl font-semibold text-white">
            {config.painTitle || "Vì sao cần giải pháp này?"}
          </h2>
          {config.painIntro && <p className="mt-3 max-w-3xl text-white/45">{config.painIntro}</p>}
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {config.painPoints.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {config.features && config.features.length > 0 && (
        <section className={panel}>
          <h2 className="text-xl font-semibold text-white">
            {config.featuresTitle || "Phạm vi triển khai"}
          </h2>
          <ul className="mt-5 space-y-3">
            {config.features.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-white/70"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400/80" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {config.process && config.process.length > 0 && (
        <section className={panel}>
          <h2 className="text-xl font-semibold text-white">
            {config.processTitle || "Quy trình triển khai"}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {config.process.map((item) => (
              <article key={item.step} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  Bước {item.step}
                </p>
                <h3 className="mt-2 font-medium text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">{item.desc}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {config.kpis && config.kpis.length > 0 && (
        <section className="border border-white/10 bg-[#0e1018] p-5 md:p-6">
          <h2 className="text-xl font-semibold text-emerald-100">
            {config.kpiTitle || "Kết quả kỳ vọng"}
          </h2>
          <ul className="mt-4 space-y-2 text-emerald-100/80">
            {config.kpis.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {config.relatedLinks && config.relatedLinks.length > 0 && (
        <section className={panel}>
          <h2 className="text-xl font-semibold text-white">
            {config.relatedTitle || "Liên kết liên quan"}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {config.relatedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-white/[0.08] p-4 transition hover:border-white/25 hover:bg-white/[0.04]"
              >
                <p className="font-medium text-white">{item.label}</p>
                <p className="mt-1 text-sm text-white/40">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {config.faqs && config.faqs.length > 0 && (
        <section className={panel}>
          <h2 id="faq" className="text-xl font-semibold text-white">
            Câu hỏi thường gặp
          </h2>
          <div className="mt-5 space-y-3">
            {config.faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 open:border-white/15"
              >
                <summary className="cursor-pointer list-none font-medium text-white marker:hidden">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-white/45">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {config.ctaBand && (
        <section className="border border-white/10 bg-[#0e1018] p-5 md:p-6">
          {config.ctaBand.eyebrow && (
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-300/70">
              {config.ctaBand.eyebrow}
            </p>
          )}
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-[1.35rem]">
            {config.ctaBand.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45 md:text-base">
            {config.ctaBand.subline}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={config.ctaBand.primary.href}
              className="inline-flex items-center gap-2 rounded-md bg-[#6D5CE6] px-4 py-2 text-sm font-medium text-white hover:brightness-105"
            >
              {config.ctaBand.primary.label}
              <ArrowRight size={16} />
            </Link>
            {config.ctaBand.secondary && (
              <Link
                href={config.ctaBand.secondary.href}
                className="inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-white/70 hover:border-white/25"
              >
                {config.ctaBand.secondary.label}
              </Link>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
