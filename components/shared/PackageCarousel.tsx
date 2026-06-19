"use client";

import { Children, type ReactNode } from "react";

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
  itemCount: _itemCount,
  desktopCols = 3,
  children,
  className = "",
}: PackageCarouselProps) {
  const items = Children.toArray(children);

  return (
    <div className={`package-carousel-shell ${className}`} style={{ ["--package-accent" as string]: accent }}>
      <div className={`package-carousel package-carousel--stack grid grid-cols-1 gap-4 sm:gap-5 ${DESKTOP_GRID[desktopCols]}`}>
        {items.map((child, i) => (
          <div key={i} data-package-card className="package-carousel__item min-w-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
