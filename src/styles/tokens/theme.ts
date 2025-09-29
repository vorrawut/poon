/**
 * 🌌 ULTIMATE THEME SYSTEM
 *
 * This is the core theme system that powers the entire application.
 * It supports:
 * - Play Mode (Space/Galaxy theme) vs Clarity Mode (Minimalist/Data-focused)
 * - Dark/Light variants for each mode
 * - Accessibility modes (Standard/Elder/Youth)
 * - Adaptive mood based on financial health
 *
 * Architecture inspired by:
 * - Apple's design elegance
 * - Spotify's personalization
 * - Tesla's futurism
 * - Blizzard's immersive engagement
 */

export type ThemeMode = "light" | "dark";
export type ViewMode = "play" | "clarity";
export type AccessibilityMode = "standard" | "elder" | "youth";
export type AdaptiveMood = "growth" | "neutral" | "warning" | "danger";

// 🎨 CORE COLOR PALETTES
export const colorPalettes = {
  // Play Mode - Space/Galaxy Theme
  play: {
    light: {
      // Cosmic Light - Soft space colors with light backgrounds
      primary: {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9", // Main cosmic blue
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
      },
      secondary: {
        50: "#faf5ff",
        100: "#f3e8ff",
        200: "#e9d5ff",
        300: "#d8b4fe",
        400: "#c084fc",
        500: "#a855f7", // Nebula purple
        600: "#9333ea",
        700: "#7c3aed",
        800: "#6b21a8",
        900: "#581c87",
      },
      accent: {
        50: "#ecfdf5",
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981", // Stellar green
        600: "#059669",
        700: "#047857",
        800: "#065f46",
        900: "#064e3b",
      },
      background: {
        primary: "#fafbfc", // Soft cosmic white
        secondary: "#f1f5f9",
        tertiary: "#e2e8f0",
        overlay: "rgba(15, 23, 42, 0.1)",
      },
      surface: {
        primary: "#ffffff",
        secondary: "#f8fafc",
        tertiary: "#f1f5f9",
        elevated: "#ffffff",
        glass: "rgba(255, 255, 255, 0.8)",
      },
      text: {
        primary: "#0f172a",
        secondary: "#475569",
        tertiary: "#64748b",
        inverse: "#ffffff",
        accent: "#0ea5e9",
      },
      border: {
        primary: "#e2e8f0",
        secondary: "#cbd5e1",
        accent: "#0ea5e9",
        glow: "rgba(14, 165, 233, 0.3)",
      },
    },
    dark: {
      // Deep Space - Rich cosmic colors with dark backgrounds
      primary: {
        50: "#0c1120",
        100: "#111827",
        200: "#1f2937",
        300: "#374151",
        400: "#4b5563",
        500: "#6366f1", // Bright cosmic blue
        600: "#4f46e5",
        700: "#4338ca",
        800: "#3730a3",
        900: "#312e81",
      },
      secondary: {
        50: "#0f0a1a",
        100: "#1e1b3a",
        200: "#2d2a5a",
        300: "#3c3a7a",
        400: "#4b4a9a",
        500: "#8b5cf6", // Bright nebula purple
        600: "#7c3aed",
        700: "#6d28d9",
        800: "#5b21b6",
        900: "#4c1d95",
      },
      accent: {
        50: "#0a1f1a",
        100: "#0f2f2a",
        200: "#1a4f3a",
        300: "#2a6f4a",
        400: "#3a8f5a",
        500: "#22c55e", // Bright stellar green
        600: "#16a34a",
        700: "#15803d",
        800: "#166534",
        900: "#14532d",
      },
      background: {
        primary: "#0f172a", // Deep space navy
        secondary: "#1e293b",
        tertiary: "#334155",
        overlay: "rgba(0, 0, 0, 0.8)",
      },
      surface: {
        primary: "#1e293b",
        secondary: "#334155",
        tertiary: "#475569",
        elevated: "#2d3748",
        glass: "rgba(30, 41, 59, 0.8)",
      },
      text: {
        primary: "#f8fafc",
        secondary: "#cbd5e1",
        tertiary: "#94a3b8",
        inverse: "#0f172a",
        accent: "#6366f1",
      },
      border: {
        primary: "#334155",
        secondary: "#475569",
        accent: "#6366f1",
        glow: "rgba(99, 102, 241, 0.5)",
      },
    },
  },

  // Clarity Mode - Minimalist/Data-focused Theme
  clarity: {
    light: {
      // Clean Light - Professional and readable
      primary: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6", // Professional blue
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
      },
      secondary: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b", // Neutral gray
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
      },
      accent: {
        50: "#f0fdf4",
        100: "#dcfce7",
        200: "#bbf7d0",
        300: "#86efac",
        400: "#4ade80",
        500: "#22c55e", // Success green
        600: "#16a34a",
        700: "#15803d",
        800: "#166534",
        900: "#14532d",
      },
      background: {
        primary: "#ffffff",
        secondary: "#f8fafc",
        tertiary: "#f1f5f9",
        overlay: "rgba(0, 0, 0, 0.05)",
      },
      surface: {
        primary: "#ffffff",
        secondary: "#f8fafc",
        tertiary: "#f1f5f9",
        elevated: "#ffffff",
        glass: "rgba(255, 255, 255, 0.95)",
      },
      text: {
        primary: "#0f172a",
        secondary: "#475569",
        tertiary: "#64748b",
        inverse: "#ffffff",
        accent: "#3b82f6",
      },
      border: {
        primary: "#e2e8f0",
        secondary: "#cbd5e1",
        accent: "#3b82f6",
        glow: "rgba(59, 130, 246, 0.2)",
      },
    },
    dark: {
      // Clean Dark - Professional dark mode
      primary: {
        50: "#0f172a",
        100: "#1e293b",
        200: "#334155",
        300: "#475569",
        400: "#64748b",
        500: "#3b82f6", // Professional blue
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
      },
      secondary: {
        50: "#0f172a",
        100: "#1e293b",
        200: "#334155",
        300: "#475569",
        400: "#64748b",
        500: "#94a3b8", // Light gray
        600: "#cbd5e1",
        700: "#e2e8f0",
        800: "#f1f5f9",
        900: "#f8fafc",
      },
      accent: {
        50: "#0a1f1a",
        100: "#0f2f2a",
        200: "#1a4f3a",
        300: "#2a6f4a",
        400: "#3a8f5a",
        500: "#22c55e", // Success green
        600: "#16a34a",
        700: "#15803d",
        800: "#166534",
        900: "#14532d",
      },
      background: {
        primary: "#0f172a",
        secondary: "#1e293b",
        tertiary: "#334155",
        overlay: "rgba(0, 0, 0, 0.8)",
      },
      surface: {
        primary: "#1e293b",
        secondary: "#334155",
        tertiary: "#475569",
        elevated: "#2d3748",
        glass: "rgba(30, 41, 59, 0.95)",
      },
      text: {
        primary: "#f8fafc",
        secondary: "#cbd5e1",
        tertiary: "#94a3b8",
        inverse: "#0f172a",
        accent: "#3b82f6",
      },
      border: {
        primary: "#334155",
        secondary: "#475569",
        accent: "#3b82f6",
        glow: "rgba(59, 130, 246, 0.3)",
      },
    },
  },
} as const;

// 🌈 ADAPTIVE MOOD COLORS
export const adaptiveMoodColors = {
  growth: {
    primary: "#22c55e",
    secondary: "#16a34a",
    glow: "rgba(34, 197, 94, 0.3)",
    background: "rgba(34, 197, 94, 0.05)",
  },
  neutral: {
    primary: "#6366f1",
    secondary: "#4f46e5",
    glow: "rgba(99, 102, 241, 0.3)",
    background: "rgba(99, 102, 241, 0.05)",
  },
  warning: {
    primary: "#f59e0b",
    secondary: "#d97706",
    glow: "rgba(245, 158, 11, 0.3)",
    background: "rgba(245, 158, 11, 0.05)",
  },
  danger: {
    primary: "#ef4444",
    secondary: "#dc2626",
    glow: "rgba(239, 68, 68, 0.3)",
    background: "rgba(239, 68, 68, 0.05)",
  },
} as const;

// 📏 SPACING SYSTEM
export const spacing = {
  // Base 8px system
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "3rem", // 48px
  "3xl": "4rem", // 64px
  "4xl": "6rem", // 96px
  "5xl": "8rem", // 128px

  // Accessibility-aware spacing
  accessibility: {
    standard: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
    },
    elder: {
      xs: "0.5rem",
      sm: "0.75rem",
      md: "1.5rem",
      lg: "2rem",
      xl: "3rem",
    },
    youth: {
      xs: "0.125rem",
      sm: "0.25rem",
      md: "0.75rem",
      lg: "1rem",
      xl: "1.5rem",
    },
  },
} as const;

// 🎭 TYPOGRAPHY SYSTEM
export const typography = {
  fontFamily: {
    primary: ["Inter", "system-ui", "sans-serif"],
    secondary: ["Orbitron", "monospace"], // For Play Mode sci-fi elements
    mono: ["JetBrains Mono", "monospace"],
  },

  fontSize: {
    // Base sizes
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
    "7xl": "4.5rem", // 72px

    // Accessibility-aware sizes
    accessibility: {
      standard: {
        body: "1rem",
        heading: "1.5rem",
        button: "1rem",
        caption: "0.875rem",
      },
      elder: {
        body: "1.25rem",
        heading: "2rem",
        button: "1.25rem",
        caption: "1rem",
      },
      youth: {
        body: "0.875rem",
        heading: "1.25rem",
        button: "0.875rem",
        caption: "0.75rem",
      },
    },
  },

  fontWeight: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },

  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
} as const;

// 🎬 MOTION SYSTEM
export const motion = {
  // Duration (in seconds)
  duration: {
    instant: 0,
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8,

    // Mode-specific durations
    play: {
      fast: 0.2,
      normal: 0.4,
      slow: 0.6,
      cosmic: 1.2, // For cosmic animations
    },
    clarity: {
      fast: 0.1,
      normal: 0.2,
      slow: 0.3,
    },

    // Accessibility-aware durations
    accessibility: {
      standard: {
        fast: 0.15,
        normal: 0.3,
        slow: 0.5,
      },
      elder: {
        fast: 0.3,
        normal: 0.6,
        slow: 0.8,
      },
      youth: {
        fast: 0.1,
        normal: 0.2,
        slow: 0.3,
      },
    },
  },

  // Easing curves (cubic-bezier values for Framer Motion)
  easing: {
    linear: [0, 0, 1, 1],
    easeIn: [0.42, 0, 1, 1],
    easeOut: [0, 0, 0.58, 1],
    easeInOut: [0.42, 0, 0.58, 1],

    // Custom easing for different modes
    cosmic: [0.25, 0.46, 0.45, 0.94], // Smooth cosmic motion
    snappy: [0.68, -0.55, 0.265, 1.55], // Bouncy for youth mode
    gentle: [0.25, 0.46, 0.45, 0.94], // Gentle for elder mode
  },

  // Spring configurations
  spring: {
    gentle: { type: "spring", stiffness: 100, damping: 15 },
    bouncy: { type: "spring", stiffness: 400, damping: 17 },
    wobbly: { type: "spring", stiffness: 180, damping: 12 },
    stiff: { type: "spring", stiffness: 400, damping: 30 },
  },
} as const;

// 🌟 EFFECTS SYSTEM
export const effects = {
  // Shadows
  shadow: {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",

    // Mode-specific shadows
    cosmic:
      "0 0 20px rgba(99, 102, 241, 0.3), 0 0 40px rgba(99, 102, 241, 0.1)",
    glow: "0 0 15px rgba(99, 102, 241, 0.5)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  },

  // Gradients
  gradient: {
    // Play Mode gradients
    cosmic: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    nebula: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    starfield: "radial-gradient(ellipse at center, #1e3c72 0%, #2a5298 100%)",

    // Clarity Mode gradients
    subtle: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    clean: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",

    // Adaptive mood gradients
    growth: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    warning: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    danger: "linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)",
  },

  // Border radius
  borderRadius: {
    none: "0",
    sm: "0.125rem",
    base: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",

    // Mode-specific radius
    cosmic: "1rem", // Rounded for space elements
    clarity: "0.375rem", // Clean, minimal
  },

  // Backdrop blur
  backdropBlur: {
    none: "none",
    sm: "blur(4px)",
    base: "blur(8px)",
    md: "blur(12px)",
    lg: "blur(16px)",
    xl: "blur(24px)",
    "2xl": "blur(40px)",
    "3xl": "blur(64px)",
  },
} as const;

// 🎯 Z-INDEX SYSTEM
export const zIndex = {
  base: 0,
  content: 10,
  sticky: 20,
  dropdown: 30,
  overlay: 40,
  modal: 50,
  modalContent: 60,
  toast: 70,
  alert: 80,
  debug: 90,
  max: 100,
} as const;

// 🔧 UTILITY FUNCTIONS
export function getThemeColors(viewMode: ViewMode, themeMode: ThemeMode) {
  return colorPalettes[viewMode][themeMode];
}

export function getAdaptiveMoodColor(mood: AdaptiveMood) {
  return adaptiveMoodColors[mood];
}

export function getAccessibilitySpacing(mode: AccessibilityMode) {
  return spacing.accessibility[mode];
}

export function getAccessibilityFontSize(mode: AccessibilityMode) {
  return typography.fontSize.accessibility[mode];
}

export function getMotionSettings(
  _viewMode: ViewMode,
  accessibilityMode: AccessibilityMode,
) {
  const accessibilityMotion = motion.duration.accessibility[accessibilityMode];

  return {
    duration: accessibilityMotion,
    easing:
      accessibilityMode === "elder"
        ? motion.easing.gentle
        : accessibilityMode === "youth"
          ? motion.easing.snappy
          : motion.easing.easeInOut,
    reduceMotion: accessibilityMode === "elder",
  };
}

// 🎨 THEME CONFIGURATION TYPE
export interface ThemeConfig {
  viewMode: ViewMode;
  themeMode: ThemeMode;
  accessibilityMode: AccessibilityMode;
  adaptiveMood: AdaptiveMood;
  colors: typeof colorPalettes.play.light;
  spacing: typeof spacing.accessibility.standard;
  typography: typeof typography;
  motion: ReturnType<typeof getMotionSettings>;
  effects: typeof effects;
  zIndex: typeof zIndex;
}
