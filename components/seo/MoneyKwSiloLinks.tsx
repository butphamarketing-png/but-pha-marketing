import Link from "next/link";
import { MONEY_KW_TARGETS } from "@/lib/money-kw-targets";

type MoneyKwSiloLinksProps = {
  /** Ẩn ô trùng trang hiện tại */
  excludePath?: string;
  title?: string;
  subtitle?: string;
};

export function MoneyKwSiloLinks({
  excludePath,
  title = "Cụm từ khóa money (internal silo)",
  subtitle = "Mỗi intent một URL đích — liên kết chéo để truyền authority, không tranh keyword.",
}: MoneyKwSiloLinksProps) {
  const items = MONEY_KW_TARGETS.filter(
    (t) => t.primaryPath !== excludePath && t.secondaryPath !== excludePath,
  );

  return (
    <section className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold text-indigo-950">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <li key={t.id} className="rounded-xl border border-indigo-50 bg-indigo-50/20 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">{t.keyword}</p>
            <Link
              href={t.primaryPath}
              className="mt-2 block text-sm font-bold text-indigo-950 underline-offset-2 hover:underline"
            >
              {t.primaryLabel}
            </Link>
            <Link
              href={t.secondaryPath}
              className="mt-1 block text-xs font-medium text-slate-600 underline-offset-2 hover:underline"
            >
              {t.secondaryLabel}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
