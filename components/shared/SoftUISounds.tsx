"use client";

import { useEffect } from "react";
import { useAdmin } from "@/lib/AdminContext";
import { ensureUiAudio, playUiClickSound } from "@/lib/ui-sounds";

/** Click mềm toàn site — button / link / chip / tab */
export function SoftUISounds() {
  const { settings } = useAdmin();

  useEffect(() => {
    if (settings.softSoundsEnabled === false) return;

    ensureUiAudio();
    const vol = Math.min(0.12, Math.max(0.04, (settings.softSoundsVolume ?? 0.05) * 1.15));

    const onPointerDown = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (
        !target.closest(
          "button, a, [role='button'], [role='tab'], input, textarea, select, summary, label",
        )
      ) {
        return;
      }
      // Tránh double-fire từ nested button
      playUiClickSound(vol);
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [settings.softSoundsEnabled, settings.softSoundsVolume]);

  return null;
}
