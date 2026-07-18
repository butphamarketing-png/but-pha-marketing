import Link from "next/link";
import { ZaloConsultCta } from "@/components/blog/ZaloConsultCta";

const serif = { fontFamily: '"Cormorant Garamond", Georgia, serif' } as const;

export function ServiceConversionFooter({ title = "Tư vấn & tài liệu liên quan" }: { title?: string }) {
  return (
    <section className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-8">
      <h2 className="text-xl font-semibold text-white" style={serif}>
        {title}
      </h2>
      <p className="mt-2 text-sm text-white/45">
        Xem thêm hướng dẫn trên{" "}
        <Link href="/blog" className="font-medium text-violet-300/90 underline underline-offset-2 hover:text-violet-200">
          blog
        </Link>
        , case study tại{" "}
        <Link href="/du-an" className="font-medium text-amber-200/80 underline underline-offset-2 hover:text-amber-100">
          dự án tiêu biểu
        </Link>{" "}
        hoặc{" "}
        <Link href="/website" className="font-medium text-violet-300/90 underline underline-offset-2 hover:text-violet-200">
          xem dịch vụ thiết kế website
        </Link>
        .
      </p>
      <div className="mt-4">
        <ZaloConsultCta />
      </div>
    </section>
  );
}
