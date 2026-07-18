import Link from "next/link";
import { MONEY_KW_TARGETS } from "@/lib/money-kw-targets";

type MoneyKwSiloLinksProps = {
  /** Ẩn ô trùng trang hiện tại */
  excludePath?: string;
  title?: string;
  subtitle?: string;
};

const serif = { fontFamily: '"Cormorant Garamond", Georgia, serif' } as const;

export function MoneyKwSiloLinks({
  excludePath,
  title = "Cụm từ khóa money (internal silo)",
  subtitle = "Mỗi intent một URL đích — liên kết chéo để truyền authority, không tranh keyword.",
}: MoneyKwSiloLinksProps) {
  const items = MONEY_KW_TARGETS.filter(
    (t) => t.primaryPath !== excludePath && t.secondaryPath !== excludePath,
  );

  return (
    <section className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-white" style={serif}>
        {title}
      </h2>
      <p className="mt-2 text-sm text-white/45">{subtitle}</p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <li key={t.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-200/70">
              {t.keyword}
            </p>
            <Link
              href={t.primaryPath}
              className="mt-2 block text-sm font-medium text-white underline-offset-2 hover:text-amber-100 hover:underline"
            >
              {t.primaryLabel}
            </Link>
            <Link
              href={t.secondaryPath}
              className="mt-1 block text-xs font-medium text-white/40 underline-offset-2 hover:text-amber-200/70 hover:underline"
            >
              {t.secondaryLabel}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
