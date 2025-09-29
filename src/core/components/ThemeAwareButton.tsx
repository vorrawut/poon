/**
 * 🌌 THEME-AWARE BUTTON COMPONENTS
 *
 * Enhanced button components that integrate with the ultimate theme system.
 * Features cosmic animations for Play mode and clean interactions for Clarity mode.
 */

import React from "react";
import { motion } from "framer-motion";
import { useThemeMotion } from "../../hooks/useThemeMotion";
import { useAccessibility } from "../../hooks/useAccessibility";
import { cn } from "../../libs/utils";

// Base button props
interface BaseButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cosmic" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  glow?: boolean;
  pulse?: boolean;
  cosmic?: boolean; // Special cosmic effects for Play mode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// Enhanced Accessible Button Component
export function ThemeAwareButton({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  glow = false,
  pulse = false,
  cosmic = false,
  onClick,
  ...props
}: BaseButtonProps & React.ComponentProps<"button">) {
  const { accessibilityMode, isPlayMode } = useAccessibility();
  const motionSettings = useThemeMotion();

  // Get variant styles
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return isPlayMode
          ? "bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-accent-500)] text-[var(--color-text-inverse)] border-transparent hover:from-[var(--color-primary-400)] hover:to-[var(--color-accent-400)] shadow-[0_0_20px_var(--color-primary-500)]/30"
          : "bg-[var(--color-primary-500)] text-[var(--color-text-inverse)] border-transparent hover:bg-[var(--color-primary-600)] shadow-lg";

      case "secondary":
        return isPlayMode
          ? "bg-gradient-to-r from-[var(--color-secondary-500)] to-[var(--color-secondary-600)] text-[var(--color-text-inverse)] border-transparent hover:from-[var(--color-secondary-400)] hover:to-[var(--color-secondary-500)] shadow-[0_0_15px_var(--color-secondary-500)]/20"
          : "bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] border-[var(--color-border-primary)] hover:bg-[var(--color-surface-tertiary)]";

      case "outline":
        return "bg-transparent text-[var(--color-text-primary)] border-[var(--color-border-accent)] hover:bg-[var(--color-surface-secondary)] hover:border-[var(--color-primary-500)]";

      case "ghost":
        return "bg-transparent text-[var(--color-text-secondary)] border-transparent hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]";

      case "cosmic":
        return isPlayMode
          ? "bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white border-transparent hover:from-purple-500 hover:via-blue-500 hover:to-teal-500 shadow-[0_0_30px_rgba(139,92,246,0.5)] animate-pulse"
          : "bg-[var(--color-primary-500)] text-[var(--color-text-inverse)] border-transparent hover:bg-[var(--color-primary-600)]";

      case "danger":
        return "bg-red-500 text-white border-transparent hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.3)]";

      default:
        return "bg-[var(--color-primary-500)] text-[var(--color-text-inverse)] border-transparent hover:bg-[var(--color-primary-600)]";
    }
  };

  // Get size classes
  const getSizeClasses = () => {
    const basePadding =
      accessibilityMode === "elder"
        ? "px-8 py-4"
        : accessibilityMode === "youth"
          ? "px-4 py-2"
          : "px-6 py-3";

    switch (size) {
      case "sm":
        return `${basePadding} text-[var(--font-size-button)] text-sm min-h-[36px]`;
      case "lg":
        return `${basePadding} text-[var(--font-size-button)] text-lg min-h-[52px]`;
      case "xl":
        return `${basePadding} text-[var(--font-size-button)] text-xl min-h-[60px]`;
      case "md":
      default:
        return `${basePadding} text-[var(--font-size-button)] min-h-[44px]`;
    }
  };

  // Get special effect classes
  const getEffectClasses = () => {
    let classes = "";

    if (glow && isPlayMode) {
      classes += " drop-shadow-[0_0_12px_var(--color-mood-glow)]";
    }

    if (pulse && isPlayMode) {
      classes += " animate-pulse";
    }

    if (cosmic && isPlayMode) {
      classes +=
        " relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700";
    }

    return classes;
  };

  const buttonClasses = cn(
    // Base styles
    "relative inline-flex items-center justify-center font-medium rounded-[var(--border-radius)] border transition-all duration-[var(--motion-duration-normal)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",

    // Variant styles
    getVariantClasses(),

    // Size styles
    getSizeClasses(),

    // Width
    fullWidth && "w-full",

    // Special effects
    getEffectClasses(),

    // Accessibility enhancements
    accessibilityMode === "elder" && "text-lg font-semibold tracking-wide",
    accessibilityMode === "youth" && "text-sm font-medium",

    // Play mode specific styles
    isPlayMode && "font-[var(--font-family-secondary)] tracking-wider",

    className,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    onClick?.(event);
  };

  if (!motionSettings.reduceMotion) {
    return (
      <motion.button
        className={buttonClasses}
        onClick={handleClick}
        disabled={disabled || loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={motionSettings.transition}
        {...(props as any)}
      >
        {loading && (
          <motion.div
            className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        {children}
      </motion.button>
    );
  }

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}

// Icon Button Component
interface IconButtonProps extends BaseButtonProps {
  icon?: React.ReactNode;
  "aria-label": string;
}

export function ThemeAwareIconButton({
  children,
  icon,
  className,
  size = "md",
  variant = "ghost",
  ...props
}: IconButtonProps) {
  const { accessibilityMode } = useAccessibility();

  // Get icon size classes
  const getIconSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-8 h-8 p-1";
      case "lg":
        return "w-12 h-12 p-3";
      case "xl":
        return "w-16 h-16 p-4";
      case "md":
      default:
        return "w-10 h-10 p-2";
    }
  };

  return (
    <ThemeAwareButton
      className={cn(
        "rounded-full",
        getIconSizeClasses(),
        accessibilityMode === "elder" && "w-12 h-12 p-3",
        className,
      )}
      variant={variant}
      size={size}
      {...props}
    >
      {icon || children}
    </ThemeAwareButton>
  );
}

// Quick Action Button (for dashboard actions)
interface QuickActionProps {
  icon: string | React.ReactNode;
  title: string;
  description?: string;
  color?: "blue" | "green" | "purple" | "orange" | "red";
  onClick?: () => void;
  className?: string;
}

export function ThemeAwareQuickAction({
  icon,
  title,
  description,
  color = "blue",
  onClick,
  className,
}: QuickActionProps) {
  const { isPlayMode } = useAccessibility();
  const motionSettings = useThemeMotion();

  // Get color classes
  const getColorClasses = () => {
    const colors = {
      blue: "from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400",
      green:
        "from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400",
      purple:
        "from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400",
      orange:
        "from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400",
      red: "from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400",
    };

    return isPlayMode
      ? `bg-gradient-to-br ${colors[color]} shadow-[0_0_20px_var(--color-mood-glow)]`
      : "bg-[var(--color-surface-primary)] hover:bg-[var(--color-surface-secondary)] border border-[var(--color-border-primary)]";
  };

  const cardClasses = cn(
    "group relative p-6 rounded-[var(--border-radius)] cursor-pointer transition-all duration-[var(--motion-duration-normal)] text-center",
    getColorClasses(),
    isPlayMode && "text-white",
    !isPlayMode && "text-[var(--color-text-primary)]",
    className,
  );

  if (!motionSettings.reduceMotion) {
    return (
      <motion.div
        className={cardClasses}
        onClick={onClick}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        transition={motionSettings.transition}
      >
        <div className="text-3xl mb-3">
          {typeof icon === "string" ? icon : icon}
        </div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        {description && <p className="text-sm opacity-80">{description}</p>}

        {isPlayMode && (
          <div className="absolute inset-0 rounded-[var(--border-radius)] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </motion.div>
    );
  }

  return (
    <div className={cardClasses} onClick={onClick}>
      <div className="text-3xl mb-3">
        {typeof icon === "string" ? icon : icon}
      </div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      {description && <p className="text-sm opacity-80">{description}</p>}
    </div>
  );
}

// Floating Action Button (for mobile)
interface FABProps extends BaseButtonProps {
  icon: React.ReactNode;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export function ThemeAwareFloatingActionButton({
  icon,
  position = "bottom-right",
  className,
  ...props
}: FABProps) {
  const { isPlayMode } = useAccessibility();

  const getPositionClasses = () => {
    switch (position) {
      case "bottom-left":
        return "fixed bottom-6 left-6";
      case "top-right":
        return "fixed top-6 right-6";
      case "top-left":
        return "fixed top-6 left-6";
      case "bottom-right":
      default:
        return "fixed bottom-6 right-6";
    }
  };

  return (
    <ThemeAwareButton
      className={cn(
        "w-14 h-14 rounded-full shadow-lg z-[var(--z-modal)]",
        getPositionClasses(),
        isPlayMode && "shadow-[0_0_30px_var(--color-mood-glow)]",
        className,
      )}
      variant={isPlayMode ? "cosmic" : "primary"}
      cosmic={isPlayMode}
      glow={isPlayMode}
      {...props}
    >
      {icon}
    </ThemeAwareButton>
  );
}

// Legacy component exports for backward compatibility
export const AccessibleButton = ThemeAwareButton;
export const AccessibleIconButton = ThemeAwareIconButton;
export const AccessibleQuickAction = ThemeAwareQuickAction;
