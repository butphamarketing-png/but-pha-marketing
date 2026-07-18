"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  LOADING_EXIT_MS,
  SCENE,
  SCENE_REDUCED,
} from "@/lib/loading-experience/timeline";
import { useLoadingTimeline } from "@/lib/loading-experience/useLoadingTimeline";
import { CompanyName } from "./CompanyName";
import { LoadingBar } from "./LoadingBar";
import { LogoAnimation } from "./LogoAnimation";

type LoadingScreenProps = {
  logoSrc: string;
  onComplete: () => void;
};

export function LoadingScreen({ logoSrc, onComplete }: LoadingScreenProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const scene = reducedMotion ? SCENE_REDUCED : SCENE;
  const [active, setActive] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    setActive(true);
    // Unlock audio sớm trong loading
    void import("@/lib/type-click-sound").then((m) => m.ensureTypeClickAudio());
  }, []);

  const { elapsed, duration } = useLoadingTimeline(reducedMotion, active);

  const finished = active && elapsed >= duration;
  const showBrandStack = elapsed >= scene.logoRevealStart;

  const finishOnce = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onComplete();
  };

  // Không chỉ dựa onExitComplete (đôi khi không fire) — luôn hoàn tất sau exit
  useEffect(() => {
    if (!finished) return undefined;
    const t = window.setTimeout(finishOnce, LOADING_EXIT_MS + 40);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- finishOnce ổn định qua doneRef
  }, [finished]);

  useEffect(() => {
    if (!active) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  if (!active) return null;

  return (
    <AnimatePresence mode="wait" onExitComplete={finishOnce}>
      {!finished && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[200] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: LOADING_EXIT_MS / 1000, ease: [0.16, 1, 0.3, 1] }}
          aria-busy="true"
          aria-label="Đang tải Bứt Phá Marketing"
        >
          <img
            src="/loading/tech-purple-bg.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-indigo-950/25" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 50% 48%, rgba(124, 58, 237, 0.12) 0%, transparent 68%)",
            }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {showBrandStack && (
              <>
                <LogoAnimation elapsed={elapsed} logoSrc={logoSrc} scene={scene} />
                <CompanyName elapsed={elapsed} scene={scene} />
                <LoadingBar elapsed={elapsed} scene={scene} />
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
