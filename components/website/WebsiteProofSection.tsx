import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CaseStudyCard } from "@/components/case-study/CaseStudyCard";
import { getCaseStudyBySlug } from "@/lib/case-studies";

const FEATURED_PROOF_SLUGS = ["nha-khoa-dang-khoa", "kien-truc-sao-khue", "halee-tram"] as const;

const serif = { fontFamily: '"Cormorant Garamond", Georgia, serif' } as const;

export function WebsiteProofSection({ variant = "light" }: { variant?: "light" | "deep" }) {
  const studies = FEATURED_PROOF_SLUGS.map((slug) => getCaseStudyBySlug(slug)).filter(Boolean);
  const deep = variant === "deep";

  if (deep) {
    return (
      <section className="border border-amber-200/15 bg-gradient-to-br from-amber-200/[0.07] to-transparent px-6 py-10 md:px-10 md:py-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/60">Proof thực chiến</p>
        <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl" style={serif}>
          Thiết kế website có số liệu SEO
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/45 md:text-[15px]">
          Website chuẩn kỹ thuật → content cluster theo ngành → internal link silo. Case study GSC thật — không cam kết
          thứ hạng cứng.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-white/65">
          <li>
            Nha Khoa Đăng Khoa: <span className="text-amber-100">15,4K impressions</span> ·{" "}
            <span className="text-amber-100">471 clicks</span> GSC
          </li>
          <li>
            Kiến Trúc Sao Khuê: Fanpage <span className="text-amber-100">83.374 lượt xem</span> / 90 ngày
          </li>
          <li>Halee Trâm: website nail/lash + academy đồng bộ thương hiệu</li>
          <li>
            Quy trình 7 bước —{" "}
            <Link href="/blog/thiet-ke-website" className="text-amber-200/80 underline-offset-2 hover:underline">
              pillar thiết kế website
            </Link>
          </li>
        </ul>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {studies.map((study) => (
            <CaseStudyCard key={study!.slug} study={study!} />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/banggia"
            className="inline-flex items-center gap-2 rounded-full bg-amber-200 px-5 py-2.5 text-sm font-semibold text-[#0b0d12] hover:bg-amber-100"
          >
            Báo giá thiết kế website
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/du-an"
            className="inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/70 hover:border-white/25"
          >
            Xem tất cả case study
          </Link>
          <Link
            href="/blog/chu-de/website"
            className="inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/70 hover:border-white/25"
          >
            Hub chủ đề Website
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/40 p-6 md:p-10">
      <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Proof thực chiến</p>
      <h2 className="mt-2 text-2xl font-bold text-emerald-950 md:text-3xl">Thiết kế website có số liệu SEO</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-emerald-950/90 md:text-base">
        Mô hình triển khai: website chuẩn kỹ thuật → content cluster theo ngành → internal link silo. Dưới đây là case
        study có số liệu Google Search Console — không cam kết thứ hạng cứng.
      </p>
      <ul className="mt-5 grid gap-2 text-sm text-emerald-950 md:grid-cols-2">
        <li>
          Nha Khoa Đăng Khoa: <strong>15,4K impressions</strong> · <strong>471 clicks</strong> GSC
        </li>
        <li>
          Kiến Trúc Sao Khuê: Fanpage <strong>83.374 lượt xem</strong> / 90 ngày
        </li>
        <li>Halee Trâm: website nail/lash + academy đồng bộ thương hiệu</li>
        <li>
          Quy trình 7 bước + checklist bàn giao — xem{" "}
          <Link href="/blog/thiet-ke-website" className="font-semibold underline">
            pillar thiết kế website
          </Link>
        </li>
      </ul>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {studies.map((study) => (
          <CaseStudyCard key={study!.slug} study={study!} />
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/banggia" className="brand-btn-primary">
          Báo giá thiết kế website
          <ArrowRight size={16} />
        </Link>
        <Link href="/du-an" className="brand-btn-secondary">
          Xem tất cả case study
        </Link>
        <Link href="/blog/chu-de/website" className="brand-btn-secondary">
          Hub chủ đề Website
        </Link>
      </div>
    </section>
  );
}
