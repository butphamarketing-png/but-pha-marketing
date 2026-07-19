import type { ReactNode } from "react";
import { DEEP_ATMOSPHERE, DEEP_BASE, DEEP_NOISE } from "@/lib/deep-theme";
import { DeepTechAtmosphere } from "@/components/shared/DeepTechAtmosphere";

type DeepPageShellProps = {
  children: ReactNode;
  /** Padding chuẩn cho landing / hub */
  padded?: boolean;
  className?: string;
  /** max-width wrapper — mặc định max-w-5xl khi padded */
  maxWidthClass?: string;
  /** Thêm ảnh nền công nghệ + lưới (trang ngành website) */
  tech?: boolean;
};

/** Nền deep ink + tím nhẹ — không amber glow. */
export function DeepPageShell({
  children,
  padded = false,
  className = "",
  maxWidthClass = "max-w-5xl",
  tech = false,
}: DeepPageShellProps) {
  return (
    <main className={`deep-theme relative min-h-screen overflow-hidden text-white ${className}`.trim()}>
      {tech ? (
        <DeepTechAtmosphere intensity="soft" />
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0" style={{ background: DEEP_BASE }} aria-hidden />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[40vh]"
            style={{ background: DEEP_ATMOSPHERE }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{ backgroundImage: DEEP_NOISE }}
            aria-hidden
          />
        </>
      )}
      {padded ? (
        <div className={`relative z-10 mx-auto ${maxWidthClass} px-4 py-8 md:px-6 md:py-10 lg:px-8`}>{children}</div>
      ) : (
        <div className="relative z-10">{children}</div>
      )}
    </main>
  );
}
