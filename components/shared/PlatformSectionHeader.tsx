"use client";

import type { ReactNode } from "react";

type PlatformSectionHeaderProps = {
  accentColor: string;
  label: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
};

const serif = { fontFamily: '"Cormorant Garamond", Georgia, serif' } as const;

export function PlatformSectionHeader({
  accentColor,
  label,
  title,
  subtitle,
  align = "center",
}: PlatformSectionHeaderProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-4 ${alignClass}`}>
      <div className={`flex flex-col gap-3 ${align === "center" ? "items-center" : "items-start"}`}>
        <div className="h-1 w-12 rounded-full" style={{ backgroundColor: accentColor || "#C4955A" }} />
        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-violet-300/75">{label}</span>
      </div>
      <h2
        className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl"
        style={serif}
      >
        {title}
      </h2>
      {subtitle ? <div className="max-w-2xl text-sm text-white/45">{subtitle}</div> : null}
    </div>
  );
}
