"use client";

import { useEffect } from "react";
import { useAdmin } from "@/lib/AdminContext";

export function SoftUISounds() {
  const { settings } = useAdmin();

  useEffect(() => {
    if (!settings.softSoundsEnabled) return;

    const onPointerDown = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (!target.closest("button, a, [role='button']")) return;
      try {
        const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(740, ctx.currentTime);
        gain.gain.setValueAtTime(settings.softSoundsVolume ?? 0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.09);
      } catch {
        // no-op
      }
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [settings.softSoundsEnabled, settings.softSoundsVolume]);

  return null;
}
