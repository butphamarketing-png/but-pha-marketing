/** Motion presets cho /banggia — tôn trọng prefers-reduced-motion ở component */

export const BANGGIA_EASE = [0.16, 1, 0.3, 1] as const;

export const searchListVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035, delayChildren: 0.02 },
  },
};

export const searchItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: BANGGIA_EASE },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.14 },
  },
};

export const searchListInstantVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
};

export const searchItemInstantVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 1, y: 0 },
};

export const tabIconSpring = {
  type: "spring" as const,
  stiffness: 520,
  damping: 26,
};
