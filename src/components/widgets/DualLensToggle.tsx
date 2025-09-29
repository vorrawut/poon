import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { useAccessibility } from "../../hooks/useAccessibility";
import { cn } from "../../libs/utils";

interface DualLensToggleProps {
  viewMode?: "play" | "clarity"; // Make optional to use theme context
  onToggle?: (mode: "play" | "clarity") => void; // Make optional to use theme context
  className?: string;
  sidebar?: boolean;
}

export function DualLensToggle({
  viewMode: propViewMode,
  onToggle: propOnToggle,
  className = "",
  sidebar = false,
}: DualLensToggleProps) {
  // Use theme context if props not provided
  const theme = useTheme();
  const { accessibilityMode, isPlayMode } = useAccessibility();

  const viewMode = propViewMode ?? theme.viewMode;
  const onToggle =
    propOnToggle ??
    ((mode: "play" | "clarity") => {
      if (mode !== theme.viewMode) {
        theme.toggleViewMode();
      }
    });
  if (sidebar) {
    return (
      <div
        className={cn(
          "flex rounded-[var(--border-radius)] p-1 transition-all duration-[var(--motion-duration-normal)]",
          isPlayMode
            ? "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200/50 dark:border-purple-700/50"
            : "bg-[var(--color-surface-secondary)] border border-[var(--color-border-primary)]",
          accessibilityMode === "elder" && "p-2",
          className,
        )}
      >
        <motion.button
          onClick={() => onToggle("play")}
          className={cn(
            "flex-1 rounded-md text-sm font-medium transition-all duration-[var(--motion-duration-normal)]",
            accessibilityMode === "elder" ? "px-4 py-3 text-base" : "px-3 py-2",
            viewMode === "play"
              ? isPlayMode
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                : "bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] shadow-sm border border-[var(--color-border-accent)]"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-tertiary)]",
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center justify-center gap-2">
            🚀{" "}
            <span
              className={
                accessibilityMode === "elder" ? "text-base" : "text-sm"
              }
            >
              Play
            </span>
          </span>
        </motion.button>
        <motion.button
          onClick={() => onToggle("clarity")}
          className={cn(
            "flex-1 rounded-md text-sm font-medium transition-all duration-[var(--motion-duration-normal)]",
            accessibilityMode === "elder" ? "px-4 py-3 text-base" : "px-3 py-2",
            viewMode === "clarity"
              ? "bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] shadow-sm border border-[var(--color-border-accent)]"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-tertiary)]",
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center justify-center gap-2">
            📊{" "}
            <span
              className={
                accessibilityMode === "elder" ? "text-base" : "text-sm"
              }
            >
              Clarity
            </span>
          </span>
        </motion.button>
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        "fixed z-[var(--z-modal)] transition-all duration-[var(--motion-duration-normal)]",
        "top-6 left-4 sm:left-6 lg:left-20",
        accessibilityMode === "elder" && "top-8 left-6 sm:left-8",
        className,
      )}
      initial={{ opacity: 0, x: -50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        delay: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      <div
        className={cn(
          "backdrop-blur-xl rounded-full border transition-all duration-[var(--motion-duration-normal)]",
          isPlayMode
            ? "bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-400/30 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
            : "bg-[var(--color-surface-glass)] border-[var(--color-border-primary)]/30 shadow-lg",
          accessibilityMode === "elder" ? "p-1.5" : "p-0.5 sm:p-1",
        )}
      >
        <motion.button
          onClick={() => onToggle("play")}
          className={cn(
            "rounded-full font-medium transition-all duration-[var(--motion-duration-normal)]",
            accessibilityMode === "elder"
              ? "px-6 py-3 text-base"
              : "px-1.5 sm:px-4 py-0.5 sm:py-2 text-xs sm:text-sm",
            viewMode === "play"
              ? isPlayMode
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                : "bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] shadow-sm"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]/50",
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="hidden sm:inline flex items-center gap-2">
            🚀 <span>Play Mode</span>
          </span>
          <span className="sm:hidden">🚀</span>
        </motion.button>
        <motion.button
          onClick={() => onToggle("clarity")}
          className={cn(
            "rounded-full font-medium transition-all duration-[var(--motion-duration-normal)]",
            accessibilityMode === "elder"
              ? "px-6 py-3 text-base"
              : "px-1.5 sm:px-4 py-0.5 sm:py-2 text-xs sm:text-sm",
            viewMode === "clarity"
              ? "bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] shadow-sm"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]/50",
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="hidden sm:inline flex items-center gap-2">
            📊 <span>Clarity Mode</span>
          </span>
          <span className="sm:hidden">📊</span>
        </motion.button>
      </div>

      {/* Cosmic glow effect for play mode */}
      {isPlayMode && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{
            boxShadow: [
              "0 0 20px rgba(139, 92, 246, 0.3)",
              "0 0 40px rgba(139, 92, 246, 0.5)",
              "0 0 20px rgba(139, 92, 246, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  );
}
