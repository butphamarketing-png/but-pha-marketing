/** Shared design tokens for /cong-cu tools */
export const toolTokens = {
  panelRadius: "rounded-[1.35rem]",
  headerRadius: "rounded-[1.75rem]",
  previewMinHeight: "min-h-[420px]",
  accentGradient: "bg-gradient-to-r from-indigo-900 to-violet-600",
  accentText: "text-indigo-950",
  mutedText: "text-slate-600",
  borderSoft: "border-indigo-100/90",
  shellBg: "deep-theme",
} as const;

export const PRESET_ANCHOR_VISUAL: Record<string, { x: string; y: string }> = {
  "top-left": { x: "18%", y: "18%" },
  "top-right": { x: "82%", y: "18%" },
  "bottom-left": { x: "18%", y: "82%" },
  "bottom-right": { x: "82%", y: "82%" },
  center: { x: "50%", y: "50%" },
  custom: { x: "50%", y: "50%" },
};

export const ONBOARDING_DRAG_KEY = "bp-watermark-onboarding-drag-v1";
export const REMOVE_BG_LOGO_TRANSFER_KEY = "bp-remove-bg-logo-transfer-v1";
export const REMOVE_BG_IMAGES_TRANSFER_KEY = "bp-remove-bg-images-transfer-v1";
export const ORIENTATION_PRESET_KEY = "bp-watermark-orientation-pair-v1";
