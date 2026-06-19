"use client";

import { Children, useCallback, useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function CarouselNavButton({
  direction,
  accent,
  onClick,
  className = "",
}: {
  direction: "left" | "right";
  accent: string;
  onClick: () => void;
  className?: string;
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={direction === "left" ? "Xem gói trước" : "Xem gói tiếp theo"}
      onClick={onClick}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-indigo-100 bg-white shadow-md transition hover:scale-105 active:scale-95 md:h-11 md:w-11 ${className}`}
      style={{ color: accent }}
    >
      <Icon size={20} />
    </button>
  );
}

type DesktopCols = 2 | 3 | 4;

const DESKTOP_GRID: Record<DesktopCols, string> = {
  2: "md:grid md:grid-cols-2 md:gap-8",
  3: "md:grid md:grid-cols-3 md:gap-6 lg:gap-8",
  4: "md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-4",
};

type PackageCarouselProps = {
  accent: string;
  itemCount: number;
  desktopCols?: DesktopCols;
  children: ReactNode;
  className?: string;
};

export function PackageCarousel({
  accent,
  itemCount,
  desktopCols = 3,
  children,
  className = "",
}: PackageCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const scrollable = itemCount > 3;
  const mobileGridCols = itemCount === 2 ? "grid-cols-2" : "grid-cols-3";

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-package-card]");
    const gap = 8;
    const step = card ? card.offsetWidth + gap : el.clientWidth / 3;
    el.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
  }, []);

  const trackClass = scrollable
    ? `package-carousel package-carousel--scroll flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${DESKTOP_GRID[desktopCols]} md:overflow-visible md:snap-none`
    : `package-carousel package-carousel--grid grid ${mobileGridCols} gap-2 ${DESKTOP_GRID[desktopCols]}`;

  return (
    <div className={className}>
      {scrollable && (
        <div className="mb-3 flex items-center justify-center gap-3 md:hidden">
          <CarouselNavButton direction="left" accent={accent} onClick={() => scroll("left")} />
          <p className="text-[10px] font-medium text-slate-500">Vuốt ngang hoặc bấm mũi tên</p>
          <CarouselNavButton direction="right" accent={accent} onClick={() => scroll("right")} />
        </div>
      )}

      <div
        ref={scrollRef}
        className={trackClass}
        style={scrollable ? { WebkitOverflowScrolling: "touch", touchAction: "pan-x" } : undefined}
      >
        {items.map((child, i) => (
          <div key={i} data-package-card className="package-carousel__item min-w-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
