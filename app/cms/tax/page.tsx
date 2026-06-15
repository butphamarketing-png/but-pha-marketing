import Link from "next/link";
import { TaxObligationsPanel } from "@/components/cms/TaxObligationsPanel";

export const metadata = {
  title: "Trách nhiệm thuế | CMS",
  robots: { index: false, follow: false },
};

export default function CmsTaxPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19]">
      <div className="border-b border-white/10 bg-[#111827]">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-3 px-4 py-2.5 sm:px-6">
          <Link
            href="/cms"
            className="text-xs font-semibold text-violet-300 hover:text-violet-200 hover:underline"
          >
            ← CMS Dashboard
          </Link>
          <span className="text-xs text-gray-500">|</span>
          <span className="text-xs font-bold text-white">Trách nhiệm thuế</span>
          <span className="text-xs text-gray-500">TNHH · GTGT quý</span>
          <Link
            href="/cms/tax/ctv"
            className="text-xs font-semibold text-amber-300 hover:text-amber-200 hover:underline"
          >
            TNCN CTV
          </Link>
          <span className="text-xs text-gray-500">·</span>
          <Link
            href="/cms/tax/tndn"
            className="text-xs font-semibold text-indigo-300 hover:text-indigo-200 hover:underline"
          >
            TNDN tạm nộp
          </Link>
          <span className="text-xs text-gray-500">·</span>
          <Link
            href="/cms/tax/hddt"
            className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 hover:underline"
          >
            HĐĐT →
          </Link>
        </div>
      </div>
      <TaxObligationsPanel />
    </div>
  );
}
