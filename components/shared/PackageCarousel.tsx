"use client";

import { Children, useCallback, useRef, type ReactNode } from "react";
import { CarouselNavButton } from "@/components/shared/CarouselNavButton";

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
    ? `package-carousel package-carousel--scroll flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${DESKTOP_GRID[desktopCols]} md:overflow-visible md:snap-none`
    : `package-carousel package-carousel--grid grid ${mobileGridCols} gap-2 ${DESKTOP_GRID[desktopCols]}`;

  return (
    <div className={`package-carousel-shell ${className}`}>
      <div className={`relative ${scrollable ? "md:static" : ""}`}>
        {scrollable && (
          <>
            <CarouselNavButton
              direction="left"
              accent={accent}
              onClick={() => scroll("left")}
              className="absolute left-0 top-[42%] z-10 -translate-y-1/2 md:hidden"
              size="sm"
            />
            <CarouselNavButton
              direction="right"
              accent={accent}
              onClick={() => scroll("right")}
              className="absolute right-0 top-[42%] z-10 -translate-y-1/2 md:hidden"
              size="sm"
            />
          </>
        )}

        <div
          ref={scrollRef}
          className={`${trackClass}${scrollable ? " px-9 md:px-0" : ""}`}
          style={scrollable ? { WebkitOverflowScrolling: "touch", touchAction: "pan-x" } : undefined}
        >
          {items.map((child, i) => (
            <div key={i} data-package-card className="package-carousel__item min-w-0">
              {child}
            </div>
          ))}
        </div>
      </div>

      {scrollable && (
        <div className="mt-3 flex items-center justify-center gap-3 md:hidden">
          <CarouselNavButton direction="left" accent={accent} onClick={() => scroll("left")} size="sm" />
          <p className="text-[10px] font-medium text-slate-500">Vuốt ngang · {itemCount} gói</p>
          <CarouselNavButton direction="right" accent={accent} onClick={() => scroll("right")} size="sm" />
        </div>
      )}
    </div>
  );
}
