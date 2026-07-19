"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export function CarouselNavButton({
  direction,
  accent,
  onClick,
  className = "",
  size = "md",
}: {
  direction: "left" | "right";
  accent: string;
  onClick: () => void;
  className?: string;
  size?: "sm" | "md";
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  const sizeClass = size === "sm" ? "h-8 w-8" : "h-10 w-10 md:h-11 md:w-11";
  const iconSize = size === "sm" ? 18 : 20;

  return (
    <button
      type="button"
      aria-label={direction === "left" ? "Xem trước" : "Xem tiếp"}
      onClick={onClick}
      className={`carousel-nav-btn flex shrink-0 items-center justify-center rounded-full border border-violet-400/25 bg-[#14101f]/95 text-violet-100 shadow-md backdrop-blur-sm transition-all hover:scale-105 hover:border-violet-400/40 active:scale-95 ${sizeClass} ${className}`}
      style={{ color: accent, ["--carousel-accent" as string]: accent }}
    >
      <Icon size={iconSize} />
    </button>
  );
}
