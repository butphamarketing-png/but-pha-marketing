"use client";

import { easeOutCubic, sceneProgress } from "@/lib/loading-experience/timeline";
import type { ServiceCardLayout } from "./service-card-layouts";

type DigitalLinesProps = {
  elapsed: number;
  reducedMotion: boolean;
  layouts: ServiceCardLayout[];
  scene: {
    convergenceStart: number;
    convergenceEnd: number;
  };
};

export function DigitalLines({ elapsed, reducedMotion, layouts, scene }: DigitalLinesProps) {
  if (reducedMotion) return null;

  const lineP = sceneProgress(elapsed, scene.convergenceStart, scene.convergenceStart + 480);
  const convergeP = sceneProgress(elapsed, scene.convergenceStart + 180, scene.convergenceEnd);
  const opacity = elapsed >= scene.convergenceStart ? Math.max(0, 1 - convergeP * 0.92) : 0;

  if (opacity <= 0.02 || lineP <= 0) return null;

  const cx = 50;
  const cy = 50;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
      style={{ opacity, willChange: "opacity" }}
    >
      <defs>
        <linearGradient id="loading-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(167, 139, 250, 0.2)" />
          <stop offset="50%" stopColor="rgba(221, 214, 254, 0.9)" />
          <stop offset="100%" stopColor="rgba(124, 58, 237, 0.35)" />
        </linearGradient>
      </defs>
      {layouts.map((layout) => {
        const x1 = layout.nx + (cx - layout.nx) * convergeP;
        const y1 = layout.ny + (cy - layout.ny) * convergeP;

        return (
          <line
            key={layout.id}
            x1={x1}
            y1={y1}
            x2={cx}
            y2={cy}
            stroke="url(#loading-line-grad)"
            strokeWidth={0.35}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            strokeDasharray={40}
            strokeDashoffset={40 * (1 - easeOutCubic(lineP))}
            style={{ filter: "drop-shadow(0 0 4px rgba(124,58,237,0.5))" }}
          />
        );
      })}
    </svg>
  );
}
