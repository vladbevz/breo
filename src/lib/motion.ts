import type { Variants } from "framer-motion";

export const EASE_SIGNATURE = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const;

// `useReducedMotion()` returns null until it resolves the media query after
// mount, so the first render can commit a clip-path "hidden" keyframe before
// we know reduced motion is on. Explicitly keeping clip-path fully open in
// both reduced-motion keyframes prevents it from getting stuck mid-wipe when
// the variants swap between renders.
const OPEN_CLIP = "inset(0% 0% 0% 0%)";

export function getHeroContainerVariants(shouldReduceMotion: boolean): Variants {
  return {
    hidden: {},
    visible: {
      transition: shouldReduceMotion
        ? { staggerChildren: 0.08 }
        : { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };
}

export function getHeroLineVariants(shouldReduceMotion: boolean): Variants {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 0, clipPath: OPEN_CLIP },
      visible: {
        opacity: 1,
        clipPath: OPEN_CLIP,
        transition: { duration: 0.3, ease: EASE_OUT_SOFT },
      },
    };
  }
  return {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: {
      clipPath: "inset(0 0% 0 0)",
      transition: { duration: 0.8, ease: EASE_SIGNATURE },
    },
  };
}

export function getHeroActionsVariants(shouldReduceMotion: boolean): Variants {
  return {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.5,
        ease: EASE_OUT_SOFT,
      },
    },
  };
}

export function getHeroMarkVariants(shouldReduceMotion: boolean): Variants {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 0, clipPath: OPEN_CLIP },
      visible: {
        opacity: 1,
        clipPath: OPEN_CLIP,
        transition: { duration: 0.3, ease: EASE_OUT_SOFT, delay: 0.1 },
      },
    };
  }
  return {
    hidden: { clipPath: "inset(0 0 0 100%)" },
    visible: {
      clipPath: "inset(0 0 0 0%)",
      transition: { duration: 0.9, ease: EASE_SIGNATURE, delay: 0.25 },
    },
  };
}
