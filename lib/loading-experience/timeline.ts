/** Loading experience timeline (milliseconds) — logo-first, không hiện 3 icon dịch vụ */
export const CARDS_ENTER_MS = 0;
export const CARDS_HOLD_AFTER_VISIBLE_MS = 0;

export const COMPANY_NAME_TIMING = {
  line2Delay: 500,
  line1Duration: 630,
  line2Duration: 530,
  /** Chờ sau khi hiện đủ tên rồi mới vào site */
  holdAfterComplete: 2000,
} as const;

export const COMPANY_NAME_TIMING_REDUCED = {
  line2Delay: 200,
  line1Duration: 333,
  line2Duration: 300,
  holdAfterComplete: 2000,
} as const;

type NameTiming = {
  line2Delay: number;
  line1Duration: number;
  line2Duration: number;
  holdAfterComplete: number;
};

function buildScene(
  companyNameStart: number,
  timing: NameTiming,
  beforeName: {
    cardsEnterEnd: number;
    convergenceStart: number;
    convergenceEnd: number;
    logoRevealStart: number;
    logoRevealEnd: number;
  },
) {
  const companyNameComplete =
    companyNameStart + timing.line2Delay + timing.line2Duration;
  return {
    cardsEnter: 0,
    ...beforeName,
    companyNameStart,
    companyNameComplete,
    loadingBarStart: companyNameComplete,
    complete: companyNameComplete + timing.holdAfterComplete,
  };
}

const LOGO_REVEAL_DURATION_MS = 600;

/** Bỏ giai đoạn card — logo hiện ngay */
const SCENE_BEFORE_NAME = {
  cardsEnterEnd: 0,
  convergenceStart: 0,
  convergenceEnd: 0,
  logoRevealStart: 80,
  logoRevealEnd: 80 + LOGO_REVEAL_DURATION_MS,
} as const;

export const SCENE = buildScene(SCENE_BEFORE_NAME.logoRevealEnd, COMPANY_NAME_TIMING, SCENE_BEFORE_NAME);

const REDUCED_LOGO_REVEAL_DURATION_MS = 300;

const SCENE_REDUCED_BEFORE_NAME = {
  cardsEnterEnd: 0,
  convergenceStart: 0,
  convergenceEnd: 0,
  logoRevealStart: 40,
  logoRevealEnd: 40 + REDUCED_LOGO_REVEAL_DURATION_MS,
} as const;

export const SCENE_REDUCED = buildScene(
  SCENE_REDUCED_BEFORE_NAME.logoRevealEnd,
  COMPANY_NAME_TIMING_REDUCED,
  SCENE_REDUCED_BEFORE_NAME,
);

export const LOADING_DURATION_MS = SCENE.complete;
export const LOADING_REDUCED_DURATION_MS = SCENE_REDUCED.complete;
export const LOADING_EXIT_MS = 520;

export function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

export function sceneProgress(elapsed: number, start: number, end: number) {
  if (elapsed <= start) return 0;
  if (elapsed >= end) return 1;
  return (elapsed - start) / (end - start);
}

/** Smooth ease-out cubic */
export function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
