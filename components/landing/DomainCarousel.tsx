"use client";

import { useCallback, useRef, useState } from "react";
import { Check, Globe } from "lucide-react";
import { CarouselNavButton } from "@/components/shared/CarouselNavButton";
import { DomainSelectionModal } from "@/components/shared/DomainSelectionModal";
import { DOMAIN_CATALOG } from "@/lib/domain-catalog";

function NavButton({
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
  return (
    <CarouselNavButton direction={direction} accent={accent} onClick={onClick} className={className} size="sm" />
  );
}

export function DomainCarousel({ accent }: { accent: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-domain-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.85;
    el.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="relative mx-auto max-w-6xl">
        <div className="relative sm:px-14">
          <NavButton
            direction="left"
            accent={accent}
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 sm:flex"
          />
          <NavButton
            direction="right"
            accent={accent}
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 sm:flex"
          />

          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}
          >
            {DOMAIN_CATALOG.map((domain) => (
              <article
                key={domain.id}
                data-domain-card
                className="platform-pricing-card landing-interactive-card w-[min(88vw,340px)] shrink-0 snap-center p-8 sm:w-[320px]"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-md text-white"
                    style={{ backgroundColor: accent }}
                  >
                    <Globe size={22} />
                  </div>
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide"
                    style={{ backgroundColor: `${accent}12`, color: accent }}
                  >
                    {domain.categoryLabel}
                  </span>
                </div>

                <h3 className="mb-1 text-xl font-semibold text-white">{domain.name}</h3>
                <p className="mb-5 min-h-[40px] text-sm leading-relaxed text-white/45">{domain.tagline}</p>

                <ul className="mb-5 space-y-2.5 border-y border-white/[0.08] py-3">
                  {domain.works.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/65">
                      <Check size={16} className="mt-0.5 shrink-0 text-violet-300/70" />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="w-full rounded-md bg-[#6D5CE6] py-2.5 text-xs font-medium text-white transition hover:bg-[#5B4BD4]"
                >
                  Tra cứu &amp; đăng ký
                </button>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-3 sm:hidden">
          <NavButton direction="left" accent={accent} onClick={() => scroll("left")} />
          <p className="text-xs font-medium text-white/40">Vuốt ngang hoặc bấm mũi tên</p>
          <NavButton direction="right" accent={accent} onClick={() => scroll("right")} />
        </div>

        <p className="mt-6 text-center text-xs text-white/35">
          Báo giá chi tiết theo từng đuôi tên miền — liên hệ tư vấn miễn phí.
        </p>
      </div>

      <DomainSelectionModal isOpen={showModal} onClose={() => setShowModal(false)} primaryColor={accent} />
    </>
  );
}
