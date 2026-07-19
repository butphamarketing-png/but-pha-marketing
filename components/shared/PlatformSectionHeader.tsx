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
    <div className={`flex flex-col gap-2 ${alignClass}`}>
      <div className={`flex flex-col gap-1.5 ${align === "center" ? "items-center" : "items-start"}`}>
        <div className="h-0.5 w-8 rounded-full" style={{ backgroundColor: accentColor || "#6D5CE6" }} />
        <span className="text-[11px] font-medium text-white/40">{label}</span>
      </div>
      <h2 className="text-xl font-semibold tracking-tight text-white sm:text-[1.35rem]">{title}</h2>
      {subtitle ? <div className="max-w-2xl text-sm text-white/45">{subtitle}</div> : null}
    </div>
  );
}
