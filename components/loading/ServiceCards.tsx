"use client";

import { easeOutCubic, sceneProgress } from "@/lib/loading-experience/timeline";
import { ServiceIconCard } from "./cards/ServiceIconCard";
import { SERVICE_CARD_LAYOUTS } from "./service-card-layouts";

const OUTER_SPREAD = 1.45;

const PLATFORMS = [
  {
    id: "website",
    label: "Website",
    icon: "/loading/icons/website.png",
    accentClass: "from-violet-500 to-indigo-400",
    glowClass: "bg-violet-500/50",
    widthClass: "w-[min(38vw,160px)] sm:w-[min(32vw,180px)]",
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: "/loading/icons/facebook.png",
    accentClass: "from-[#1877F2] to-[#42A5F5]",
    glowClass: "bg-blue-500/50",
    featured: true,
    widthClass: "w-[min(44vw,190px)] sm:w-[min(36vw,210px)]",
  },
  {
    id: "maps",
    label: "Google Maps",
    icon: "/loading/icons/maps.png",
    accentClass: "from-emerald-500 to-sky-400",
    glowClass: "bg-emerald-500/45",
    widthClass: "w-[min(38vw,160px)] sm:w-[min(32vw,180px)]",
  },
];

type ServiceCardsProps = {
  elapsed: number;
  reducedMotion: boolean;
  scene: {
    cardsEnterEnd: number;
    convergenceStart: number;
    convergenceEnd: number;
    logoRevealStart: number;
  };
};

export function ServiceCards({ elapsed, reducedMotion, scene }: ServiceCardsProps) {
  const visible = elapsed < scene.logoRevealStart + 80;
  if (!visible) return null;

  const convergeP =
    elapsed < scene.convergenceStart
      ? 0
      : easeOutCubic(
          Math.min(1, (elapsed - scene.convergenceStart) / (scene.convergenceEnd - scene.convergenceStart)),
        );

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      {PLATFORMS.map((platform, index) => {
        const layout = SERVICE_CARD_LAYOUTS[index];
        if (!layout) return null;

        const cardEnterP = sceneProgress(elapsed, 0, scene.cardsEnterEnd);
        if (cardEnterP <= 0) return null;

        const floatY = reducedMotion ? 0 : Math.sin(elapsed * 0.0016 + index * 1.15) * 6;
        const floatX = reducedMotion ? 0 : Math.cos(elapsed * 0.0012 + index) * 3;

        const arriveSpread = OUTER_SPREAD - easeOutCubic(cardEnterP) * (OUTER_SPREAD - 1);
        const spreadFactor = arriveSpread * (1 - convergeP);
        const xVw = layout.xVw * spreadFactor;
        const yVh = layout.yVh * spreadFactor;

        const layoutScale = layout.scale ?? 1;
        const enterScale = (0.84 + easeOutCubic(cardEnterP) * 0.16) * layoutScale;
        const convergeScale = 1 - convergeP * 0.88;
        const convergeOpacity = 1 - convergeP * 0.98;
        const glowBoost =
          elapsed >= scene.convergenceStart ? Math.min(1, (elapsed - scene.convergenceStart) / 520) : 0;

        return (
          <div
            key={platform.id}
            className={`absolute left-1/2 top-1/2 ${platform.widthClass}`}
            style={{
              transform: `translate(calc(-50% + ${xVw}vw + ${floatX}px), calc(-50% + ${yVh}vh + ${floatY}px)) scale(${enterScale * convergeScale})`,
              opacity: easeOutCubic(cardEnterP) * convergeOpacity,
              willChange: "transform, opacity",
              filter: glowBoost > 0 ? `brightness(${1 + glowBoost * 0.1})` : undefined,
            }}
          >
            <ServiceIconCard
              label={platform.label}
              icon={platform.icon}
              accentClass={platform.accentClass}
              glowClass={platform.glowClass}
              featured={platform.featured}
            />
          </div>
        );
      })}
    </div>
  );
}

export { SERVICE_CARD_LAYOUTS } from "./service-card-layouts";
export type { ServiceCardLayout } from "./service-card-layouts";
