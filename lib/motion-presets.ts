export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

export const VIEWPORT_ONCE = { once: true, margin: "-72px" as const };

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE_PREMIUM },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.55, delay, ease: EASE_PREMIUM },
  }),
};

export const slideLeft = {
  hidden: { opacity: 0, x: -36 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, delay, ease: EASE_PREMIUM },
  }),
};

export const slideRight = {
  hidden: { opacity: 0, x: 36 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, delay, ease: EASE_PREMIUM },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: EASE_PREMIUM },
  }),
};

export const staggerIntro = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.04 },
  },
};

export const fadeUpChild = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_PREMIUM },
  },
};
