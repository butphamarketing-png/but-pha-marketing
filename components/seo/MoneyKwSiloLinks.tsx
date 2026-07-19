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
    <section className="border-t border-white/10 pt-6">
      <h2 className="text-base font-semibold text-white">{title}</h2>
      <p className="mt-1 text-sm text-white/40">{subtitle}</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <li key={t.id} className="border border-white/10 bg-[#0e1018] px-3 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
              {t.keyword}
            </p>
            <Link
              href={t.primaryPath}
              className="mt-1.5 block text-sm font-medium text-white underline-offset-2 hover:text-white/90 hover:underline"
            >
              {t.primaryLabel}
            </Link>
            <Link
              href={t.secondaryPath}
              className="mt-1 block text-xs font-medium text-white/40 underline-offset-2 hover:text-white/60 hover:underline"
            >
              {t.secondaryLabel}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
