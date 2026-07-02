"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOutCubic, sceneProgress } from "@/lib/loading-experience/timeline";

type LogoAnimationProps = {
  elapsed: number;
  logoSrc: string;
  scene: {
    logoRevealStart: number;
    logoRevealEnd: number;
  };
};

export function LogoAnimation({ elapsed, logoSrc, scene }: LogoAnimationProps) {
  const reducedMotion = useReducedMotion();

  const logoPhase = scene.logoRevealEnd - scene.logoRevealStart;
  const revealMs = logoPhase * 0.53;
  const pulseMs = logoPhase * 0.87;
  const sweepMs = logoPhase * 0.8;

  const revealP = sceneProgress(elapsed, scene.logoRevealStart, scene.logoRevealStart + revealMs);
  const visible = elapsed >= scene.logoRevealStart - 40;

  if (!visible) return null;

  const opacity = easeOutCubic(revealP);
  const pulsePhase = Math.max(0, elapsed - scene.logoRevealStart - revealMs);
  const pulseT = Math.min(1, pulsePhase / pulseMs);

  let scale = 0.95 + easeOutCubic(revealP) * 0.05;
  if (pulseT > 0 && !reducedMotion) {
    if (pulseT < 0.45) scale = 1 + pulseT * 0.044;
    else if (pulseT < 0.75) scale = 1.02 - (pulseT - 0.45) * 0.067;
    else scale = 1;
  } else if (pulseT > 0) {
    scale = 1;
  }

  const sweepStart = scene.logoRevealStart + revealMs + pulseMs * 0.35;
  const sweepP = sceneProgress(elapsed, sweepStart, sweepStart + sweepMs);
  const glowFade = sceneProgress(elapsed, sweepStart + sweepMs * 0.42, scene.logoRevealEnd);

  return (
    <motion.div
      className="relative z-[3] flex items-center justify-center"
      style={{
        opacity,
        scale,
        willChange: "transform, opacity",
      }}
      transition={{ duration: 0 }}
    >
      <div
        className="relative h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28"
        style={{
          filter: `drop-shadow(0 0 ${18 - glowFade * 10}px rgba(124, 58, 237, ${0.45 - glowFade * 0.35}))`,
        }}
      >
        <img
          src={logoSrc}
          alt="Bứt Phá Marketing"
          className="h-full w-full rounded-full border border-white/30 object-cover"
          draggable={false}
        />
        {!reducedMotion && sweepP > 0 && sweepP < 1 && (
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
            aria-hidden
          >
            <div
              className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/45 to-transparent"
              style={{
                transform: `translateX(${-120 + sweepP * 240}%) skewX(-12deg)`,
                opacity: 1 - glowFade,
                willChange: "transform",
              }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
