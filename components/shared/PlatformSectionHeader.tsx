"use client";

import type { ReactNode } from "react";

type PlatformSectionHeaderProps = {
  accentColor: string;
  label: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
};

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
        <div className="h-1 w-12 rounded-full" style={{ backgroundColor: accentColor }} />
        <span className="text-xs font-semibold tracking-wide text-slate-500">{label}</span>
      </div>
      <h2 className="text-3xl font-bold leading-tight tracking-tight text-indigo-950 md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle ? <div className="max-w-2xl text-sm text-slate-600">{subtitle}</div> : null}
    </div>
  );
}
