/**
 * 🌌 THEME MOTION HOOK
 *
 * Provides theme-aware motion settings and Framer Motion variants
 */

import { useTheme } from "./useTheme";

export function useThemeMotion() {
  const theme = useTheme();

  return {
    transition: {
      duration: theme.motion.duration.normal,
      ease: theme.motion.easing,
    },

    // Framer Motion variants
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: {
        duration: theme.motion.duration.fast,
        ease: theme.motion.easing,
      },
    },

    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: {
        duration: theme.motion.duration.normal,
        ease: theme.motion.easing,
      },
    },

    cosmic: theme.isPlayMode
      ? {
          initial: { opacity: 0, scale: 0.8, rotateY: -15 },
          animate: { opacity: 1, scale: 1, rotateY: 0 },
          exit: { opacity: 0, scale: 0.8, rotateY: 15 },
          transition: {
            duration: theme.motion.duration.slow,
            ease: theme.motion.easing,
          },
        }
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: {
            duration: theme.motion.duration.fast,
            ease: theme.motion.easing,
          },
        },

    // Disable animations for elder mode
    reduceMotion: theme.accessibilityMode === "elder",
  };
}
