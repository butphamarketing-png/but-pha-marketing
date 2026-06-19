"use client";

import { useCallback, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Globe } from "lucide-react";
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
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={direction === "left" ? "Xem tên miền trước" : "Xem tên miền tiếp theo"}
      onClick={onClick}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-indigo-100 bg-white text-indigo-950 shadow-md transition hover:scale-105 active:scale-95 ${className}`}
      style={{ color: accent }}
    >
      <Icon size={22} />
    </button>
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
                className="platform-pricing-card w-[min(88vw,340px)] shrink-0 snap-center p-8 sm:w-[320px]"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
                    style={{ backgroundColor: accent, boxShadow: `0 10px 30px ${accent}35` }}
                  >
                    <Globe size={28} />
                  </div>
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide"
                    style={{ backgroundColor: `${accent}12`, color: accent }}
                  >
                    {domain.categoryLabel}
                  </span>
                </div>

                <h3 className="mb-1 text-3xl font-bold text-indigo-950">{domain.name}</h3>
                <p className="mb-6 min-h-[40px] text-sm leading-relaxed text-slate-500">{domain.tagline}</p>

                <ul className="mb-8 space-y-3 border-y border-indigo-100 py-4">
                  {domain.works.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check size={16} className="mt-0.5 shrink-0" style={{ color: accent }} />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="w-full rounded-2xl py-3.5 text-xs font-bold text-white shadow-lg transition hover:brightness-105"
                  style={{ backgroundColor: accent }}
                >
                  Tra cứu &amp; đăng ký
                </button>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-3 sm:hidden">
          <NavButton direction="left" accent={accent} onClick={() => scroll("left")} />
          <p className="text-xs font-medium text-slate-500">Vuốt ngang hoặc bấm mũi tên</p>
          <NavButton direction="right" accent={accent} onClick={() => scroll("right")} />
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Báo giá chi tiết theo từng đuôi tên miền — liên hệ tư vấn miễn phí.
        </p>
      </div>

      <DomainSelectionModal isOpen={showModal} onClose={() => setShowModal(false)} primaryColor={accent} />
    </>
  );
}
