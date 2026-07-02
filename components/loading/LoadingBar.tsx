"use client";

import { easeOutCubic, sceneProgress } from "@/lib/loading-experience/timeline";

type LoadingBarProps = {
  elapsed: number;
  scene: {
    loadingBarStart: number;
    complete: number;
  };
};

export function LoadingBar({ elapsed, scene }: LoadingBarProps) {
  const barP = sceneProgress(elapsed, scene.loadingBarStart, scene.complete);
  const visible = elapsed >= scene.loadingBarStart - 40;

  if (!visible) return null;

  const width = easeOutCubic(barP) * 100;

  return (
    <div
      className="relative z-[3] mt-8 w-40 sm:w-48"
      style={{
        opacity: easeOutCubic(Math.min(1, barP * 4)),
        willChange: "opacity",
      }}
    >
      <div className="h-px overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full origin-left rounded-full bg-gradient-to-r from-violet-300/80 via-white/90 to-violet-200/70"
          style={{
            transform: `scaleX(${width / 100})`,
            willChange: "transform",
          }}
        />
      </div>
    </div>
  );
}
