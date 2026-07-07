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

export function SubLandingPage({ config }: { config: SubLandingConfig }) {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
        <ol className="flex flex-wrap items-center gap-1.5">
          {config.breadcrumbs.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden="true" className="text-slate-400">
                  /
                </span>
              )}
              {item.href ? (
                <Link href={item.href} className="font-medium text-indigo-700 hover:text-indigo-900">
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-indigo-950" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <section className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/40 p-8 shadow-sm md:p-12">
        {config.eyebrow && <p className="brand-eyebrow mb-3">{config.eyebrow}</p>}
        <h1 className="text-4xl font-black tracking-tight text-indigo-950 md:text-5xl">{config.title}</h1>
        <div className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">{config.intro}</div>
        {config.ctas && config.ctas.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {config.ctas.map((cta) =>
              cta.primary ? (
                <Link key={cta.href} href={cta.href} className="brand-btn-primary">
                  {cta.label}
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <Link key={cta.href} href={cta.href} className="brand-btn-secondary">
                  {cta.label}
                </Link>
              ),
            )}
          </div>
        )}
      </section>

      {config.painPoints && config.painPoints.length > 0 && (
        <section className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-indigo-950">{config.painTitle || "Vì sao cần giải pháp này?"}</h2>
          {config.painIntro && <p className="mt-3 max-w-3xl text-slate-600">{config.painIntro}</p>}
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {config.painPoints.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {config.features && config.features.length > 0 && (
        <section className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-indigo-950">{config.featuresTitle || "Phạm vi triển khai"}</h2>
          <ul className="mt-5 space-y-3">
            {config.features.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-indigo-50 bg-indigo-50/30 px-4 py-3 text-slate-700"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {config.process && config.process.length > 0 && (
        <section className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-indigo-950">{config.processTitle || "Quy trình triển khai"}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {config.process.map((item) => (
              <article key={item.step} className="rounded-2xl border border-indigo-100 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-violet-600">Bước {item.step}</p>
                <h3 className="mt-2 font-bold text-indigo-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {config.kpis && config.kpis.length > 0 && (
        <section className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-emerald-900">{config.kpiTitle || "Kết quả kỳ vọng"}</h2>
          <ul className="mt-4 space-y-2 text-emerald-950">
            {config.kpis.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {config.relatedLinks && config.relatedLinks.length > 0 && (
        <section className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-indigo-950">{config.relatedTitle || "Liên kết liên quan"}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {config.relatedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-indigo-100 p-4 transition hover:border-violet-300 hover:bg-violet-50/30"
              >
                <p className="font-bold text-indigo-950">{item.label}</p>
                <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {config.faqs && config.faqs.length > 0 && (
        <section className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-indigo-950">Câu hỏi thường gặp</h2>
          <div className="mt-5 space-y-3">
            {config.faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-indigo-100 bg-indigo-50/20 p-5 open:border-violet-200 open:bg-violet-50/30"
              >
                <summary className="cursor-pointer list-none font-bold text-indigo-950 marker:hidden">{item.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {config.ctaBand && (
        <section className="rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 p-8 text-white md:p-10">
          {config.ctaBand.eyebrow && (
            <p className="text-xs font-bold uppercase tracking-wider text-violet-200">{config.ctaBand.eyebrow}</p>
          )}
          <h2 className="mt-2 text-2xl font-black md:text-3xl">{config.ctaBand.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-violet-100 md:text-base">{config.ctaBand.subline}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={config.ctaBand.primary.href}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
            >
              {config.ctaBand.primary.label}
              <ArrowRight size={16} />
            </Link>
            {config.ctaBand.secondary && (
              <Link
                href={config.ctaBand.secondary.href}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
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
