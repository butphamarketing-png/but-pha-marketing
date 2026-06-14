export const EASE_PREMIUM = [0.25, 0.46, 0.45, 0.94] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const VIEWPORT_ONCE = { once: true, margin: "-48px" as const };

export const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: EASE_OUT },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.45, delay, ease: EASE_OUT },
  }),
};

export const slideLeft = {
  hidden: { opacity: 0, x: -18 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay, ease: EASE_OUT },
  }),
};

export const slideRight = {
  hidden: { opacity: 0, x: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay, ease: EASE_OUT },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.985 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay, ease: EASE_OUT },
  }),
};

export const staggerIntro = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.02 },
  },
};

export const fadeUpChild = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};
