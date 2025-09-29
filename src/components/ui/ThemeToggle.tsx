/**
 * 🌌 ULTIMATE THEME TOGGLE
 *
 * A comprehensive theme toggle component that allows users to switch between:
 * - Play/Clarity view modes
 * - Dark/Light theme variants
 * - Accessibility modes
 *
 * Features cosmic animations and smooth transitions.
 */

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { useAccessibility } from "../../hooks/useAccessibility";
import { cn } from "../../libs/utils";

// Theme Toggle Button Component
export function ThemeToggle({ className }: { className?: string }) {
  const { themeMode, toggleTheme, isPlayMode } = useTheme();
  const { accessibilityMode } = useAccessibility();

  const isDark = themeMode === "dark";

  return (
    <motion.button
      className={cn(
        "relative inline-flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300",
        isDark
          ? "border-yellow-400/30 bg-slate-800 text-yellow-400 hover:border-yellow-400/50 hover:bg-slate-700"
          : "border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:bg-slate-50",
        isPlayMode && "shadow-[0_0_20px_var(--color-mood-glow)]",
        accessibilityMode === "elder" && "h-14 w-14",
        className,
      )}
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
            className="flex items-center justify-center"
          >
            🌙
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
            className="flex items-center justify-center"
          >
            ☀️
          </motion.div>
        )}
      </AnimatePresence>

      {isPlayMode && (
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 20px rgba(99, 102, 241, 0.3)",
              "0 0 30px rgba(99, 102, 241, 0.5)",
              "0 0 20px rgba(99, 102, 241, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.button>
  );
}

// Note: ViewModeToggle is now handled by the existing DualLensToggle component
// Import and use DualLensToggle instead of this component

// Accessibility Mode Selector
export function AccessibilityModeSelector({
  className,
}: {
  className?: string;
}) {
  const { accessibilityMode, setAccessibilityMode } = useTheme();
  const { isPlayMode } = useAccessibility();

  const modes = [
    {
      key: "youth" as const,
      label: "Youth",
      icon: "⚡",
      description: "Compact & Fast",
    },
    {
      key: "standard" as const,
      label: "Standard",
      icon: "👤",
      description: "Balanced",
    },
    {
      key: "elder" as const,
      label: "Elder",
      icon: "👴",
      description: "Large & Clear",
    },
  ];

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label className="text-sm font-medium text-[var(--color-text-secondary)]">
        Accessibility Mode
      </label>
      <div className="flex gap-2">
        {modes.map((mode) => (
          <motion.button
            key={mode.key}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg border-2 p-3 text-center transition-all duration-200",
              accessibilityMode === mode.key
                ? isPlayMode
                  ? "border-purple-400 bg-purple-500/10 text-purple-600"
                  : "border-blue-400 bg-blue-50 text-blue-600"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50",
              accessibilityMode === "elder" && "p-4",
            )}
            onClick={() => setAccessibilityMode(mode.key)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`Switch to ${mode.label} accessibility mode`}
          >
            <span className="text-lg">{mode.icon}</span>
            <span className="text-xs font-medium">{mode.label}</span>
            <span className="text-xs opacity-75">{mode.description}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Combined Theme Control Panel
export function ThemeControlPanel({ className }: { className?: string }) {
  const { isPlayMode } = useAccessibility();

  return (
    <motion.div
      className={cn(
        "flex flex-col gap-6 rounded-lg border p-6",
        isPlayMode
          ? "border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50"
          : "border-slate-200 bg-white",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
          Theme Settings
        </h3>
        <div className="flex gap-2">
          <ThemeToggle />
        </div>
      </div>

      <AccessibilityModeSelector />

      {isPlayMode && (
        <motion.div
          className="rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 p-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="flex items-center gap-2 text-purple-700">
            <span>🚀</span>
            <span className="text-sm font-medium">
              Play Mode Active - Experience the cosmic financial universe!
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// Quick Theme Actions (for header/toolbar)
export function QuickThemeActions({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <ThemeToggle />
    </div>
  );
}
