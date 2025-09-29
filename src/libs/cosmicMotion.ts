/**
 * 🌌 COSMIC MOTION SYSTEM
 *
 * Advanced animation system for Play Mode that creates immersive cosmic experiences.
 * Features orbital motions, particle effects, and space-themed transitions.
 */

import type { Variants } from "framer-motion";

// 🌟 COSMIC ANIMATION VARIANTS

// Orbital entrance animation (planets entering orbit)
export const orbitalEntrance: Variants = {
  initial: {
    opacity: 0,
    scale: 0.3,
    rotateY: -90,
    x: -200,
    y: 100,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.3,
    rotateY: 90,
    x: 200,
    y: -100,
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

// Floating animation (gentle cosmic drift)
export const cosmicFloat: Variants = {
  animate: {
    y: [0, -10, 0],
    rotateZ: [0, 1, 0, -1, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Pulsing glow animation
export const cosmicPulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Starfield twinkle animation
export const starTwinkle: Variants = {
  animate: {
    opacity: [0.3, 1, 0.3],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: Math.random() * 2 + 1, // Random duration between 1-3s
      repeat: Infinity,
      ease: "easeInOut",
      delay: Math.random() * 2, // Random delay up to 2s
    },
  },
};

// Warp speed transition
export const warpTransition: Variants = {
  initial: {
    opacity: 0,
    scale: 0.1,
    rotateZ: -180,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotateZ: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      duration: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 2,
    rotateZ: 180,
    transition: {
      duration: 0.6,
      ease: [0.68, -0.55, 0.265, 1.55],
    },
  },
};

// Rocket launch animation
export const rocketLaunch: Variants = {
  initial: {
    y: 100,
    opacity: 0,
    rotateZ: -10,
  },
  animate: {
    y: 0,
    opacity: 1,
    rotateZ: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 12,
      duration: 1.5,
    },
  },
  hover: {
    y: -5,
    rotateZ: 2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

// Nebula swirl animation
export const nebulaSwirl: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Planet rotation animation
export const planetRotation: Variants = {
  animate: {
    rotateY: 360,
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Shooting star animation
export const shootingStar: Variants = {
  initial: {
    x: -100,
    y: -50,
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    x: 300,
    y: 100,
    opacity: [0, 1, 1, 0],
    scale: [0.5, 1, 1, 0.5],
    transition: {
      duration: 2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Cosmic card hover animation
export const cosmicCardHover: Variants = {
  hover: {
    scale: 1.05,
    rotateY: 5,
    rotateX: 5,
    z: 50,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  tap: {
    scale: 0.95,
    rotateY: -2,
    rotateX: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
};

// Galaxy spiral animation
export const galaxySpiral: Variants = {
  animate: {
    rotate: 360,
    scale: [1, 1.1, 1],
    transition: {
      rotate: {
        duration: 30,
        repeat: Infinity,
        ease: "linear",
      },
      scale: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
};

// 🎭 MOTION UTILITIES

// Create staggered children animation
export function createStaggeredChildren(staggerDelay: number = 0.1) {
  return {
    animate: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
    exit: {
      transition: {
        staggerChildren: staggerDelay,
        staggerDirection: -1,
      },
    },
  };
}

// Create orbital path animation
export function createOrbitalPath(
  duration: number = 10,
  clockwise: boolean = true,
) {
  const direction = clockwise ? 1 : -1;

  return {
    animate: {
      rotate: 360 * direction,
      transition: {
        duration,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };
}

// Create particle system animation
export function createParticleSystem(particleCount: number = 20) {
  return Array.from({ length: particleCount }, (_, i) => ({
    initial: {
      opacity: 0,
      scale: 0,
      x: Math.random() * 400 - 200,
      y: Math.random() * 400 - 200,
    },
    animate: {
      opacity: [0, 1, 0],
      scale: [0, Math.random() * 0.5 + 0.5, 0],
      x: Math.random() * 600 - 300,
      y: Math.random() * 600 - 300,
      transition: {
        duration: Math.random() * 3 + 2,
        repeat: Infinity,
        delay: i * 0.1,
        ease: "easeInOut",
      },
    },
  }));
}

// Create cosmic background animation
export const cosmicBackground: Variants = {
  animate: {
    background: [
      "radial-gradient(ellipse at 20% 50%, #1e3a8a 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, #7c3aed 0%, transparent 50%), radial-gradient(ellipse at 40% 80%, #059669 0%, transparent 50%)",
      "radial-gradient(ellipse at 60% 30%, #1e3a8a 0%, transparent 50%), radial-gradient(ellipse at 20% 70%, #7c3aed 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, #059669 0%, transparent 50%)",
      "radial-gradient(ellipse at 40% 70%, #1e3a8a 0%, transparent 50%), radial-gradient(ellipse at 70% 40%, #7c3aed 0%, transparent 50%), radial-gradient(ellipse at 30% 20%, #059669 0%, transparent 50%)",
    ],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// 🌟 PRESET ANIMATION COMBINATIONS

// Dashboard widget entrance
export const dashboardWidgetEntrance = {
  container: createStaggeredChildren(0.15),
  item: orbitalEntrance,
  hover: cosmicCardHover,
  float: cosmicFloat,
};

// Navigation menu animations
export const cosmicNavigation = {
  container: createStaggeredChildren(0.08),
  item: {
    initial: { opacity: 0, x: -50, rotateY: -45 },
    animate: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      scale: 1.1,
      x: 10,
      rotateY: 10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
      },
    },
  },
};

// Modal animations
export const cosmicModal = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  content: {
    initial: {
      opacity: 0,
      scale: 0.3,
      rotateY: -45,
      y: 100,
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.8,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.3,
      rotateY: 45,
      y: -100,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  },
};

// Page transition animations
export const cosmicPageTransition = {
  initial: {
    opacity: 0,
    scale: 0.8,
    rotateX: -15,
    y: 50,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    y: 0,
  },
  transition: {
    type: "spring",
    stiffness: 100,
    damping: 15,
  },
  exit: {
    opacity: 0,
    scale: 1.2,
    rotateX: 15,
    y: -50,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

// 🎨 THEME-AWARE MOTION FACTORY

export function createThemeAwareMotion(
  isPlayMode: boolean,
  accessibilityMode: "standard" | "elder" | "youth",
  reduceMotion: boolean = false,
) {
  if (reduceMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
    };
  }

  if (!isPlayMode) {
    // Clarity mode - subtle, professional animations
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: {
        duration: accessibilityMode === "elder" ? 0.6 : 0.3,
        ease: [0.42, 0, 0.58, 1],
      },
    };
  }

  // Play mode - cosmic animations
  const duration =
    accessibilityMode === "elder"
      ? 1.5
      : accessibilityMode === "youth"
        ? 0.8
        : 1.2;

  return {
    initial: orbitalEntrance.initial,
    animate: orbitalEntrance.animate,
    exit: orbitalEntrance.exit,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration,
    },
  };
}

export default {
  // Basic animations
  orbitalEntrance,
  cosmicFloat,
  cosmicPulse,
  starTwinkle,
  warpTransition,
  rocketLaunch,
  nebulaSwirl,
  planetRotation,
  shootingStar,
  cosmicCardHover,
  galaxySpiral,
  cosmicBackground,

  // Preset combinations
  dashboardWidgetEntrance,
  cosmicNavigation,
  cosmicModal,
  cosmicPageTransition,

  // Utilities
  createStaggeredChildren,
  createOrbitalPath,
  createParticleSystem,
  createThemeAwareMotion,
};
