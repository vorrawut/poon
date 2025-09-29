/**
 * 🌌 THEME-AWARE TEXT COMPONENTS
 *
 * Enhanced text components that integrate with the ultimate theme system.
 * These components automatically adapt to:
 * - Play/Clarity modes
 * - Dark/Light themes
 * - Accessibility modes (Standard/Elder/Youth)
 * - Adaptive mood based on financial health
 */

import React from "react";
import { motion } from "framer-motion";
import { useThemeMotion } from "../../hooks/useThemeMotion";
import { useAccessibility } from "../../hooks/useAccessibility";
import { cn } from "../../libs/utils";

// Base text component props
interface BaseTextProps {
  children: React.ReactNode;
  className?: string;
  color?: "primary" | "secondary" | "tertiary" | "accent" | "inverse" | "mood";
  variant?: "body" | "caption" | "small" | "large";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
  gradient?: boolean;
  glow?: boolean;
  animated?: boolean;
  as?: React.ElementType;
}

// Enhanced Accessible Text Component
export function ThemeAwareText({
  children,
  className,
  color = "primary",
  variant = "body",
  weight = "normal",
  align = "left",
  gradient = false,
  glow = false,
  animated = false,
  as: Component = "p",
  ...props
}: BaseTextProps & React.ComponentProps<"p">) {
  const { accessibilityMode, isPlayMode } = useAccessibility();
  const motionSettings = useThemeMotion();

  // Get color classes based on theme and mode
  const getColorClasses = () => {
    switch (color) {
      case "primary":
        return "text-[var(--color-text-primary)]";
      case "secondary":
        return "text-[var(--color-text-secondary)]";
      case "tertiary":
        return "text-[var(--color-text-tertiary)]";
      case "accent":
        return "text-[var(--color-text-accent)]";
      case "inverse":
        return "text-[var(--color-text-inverse)]";
      case "mood":
        return "text-[var(--color-mood-primary)]";
      default:
        return "text-[var(--color-text-primary)]";
    }
  };

  // Get variant classes
  const getVariantClasses = () => {
    const baseFontSize = `text-[var(--font-size-body)]`;

    switch (variant) {
      case "caption":
        return `${baseFontSize} text-sm opacity-75`;
      case "small":
        return `${baseFontSize} text-sm`;
      case "large":
        return `${baseFontSize} text-lg`;
      case "body":
      default:
        return baseFontSize;
    }
  };

  // Get weight classes
  const getWeightClasses = () => {
    switch (weight) {
      case "light":
        return "font-light";
      case "medium":
        return "font-medium";
      case "semibold":
        return "font-semibold";
      case "bold":
        return "font-bold";
      case "normal":
      default:
        return "font-normal";
    }
  };

  // Get alignment classes
  const getAlignClasses = () => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      case "left":
      default:
        return "text-left";
    }
  };

  // Get special effect classes
  const getEffectClasses = () => {
    let classes = "";

    if (gradient && isPlayMode) {
      classes +=
        " bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-accent-400)] bg-clip-text text-transparent";
    }

    if (glow && isPlayMode) {
      classes += " drop-shadow-[0_0_8px_var(--color-mood-glow)]";
    }

    return classes;
  };

  const textClasses = cn(
    // Base styles
    "transition-colors duration-[var(--motion-duration-normal)]",

    // Responsive and accessibility
    getVariantClasses(),
    getColorClasses(),
    getWeightClasses(),
    getAlignClasses(),
    getEffectClasses(),

    // Play mode specific styles
    isPlayMode && "font-[var(--font-family-secondary)]",

    // Accessibility enhancements
    accessibilityMode === "elder" && "leading-relaxed tracking-wide",
    accessibilityMode === "youth" && "leading-tight tracking-normal",

    className,
  );

  if (animated && !motionSettings.reduceMotion) {
    return (
      <motion.div
        initial={motionSettings.fadeIn.initial}
        animate={motionSettings.fadeIn.animate}
        exit={motionSettings.fadeIn.exit}
        transition={motionSettings.fadeIn.transition}
      >
        <Component className={textClasses} {...props}>
          {children}
        </Component>
      </motion.div>
    );
  }

  return (
    <Component className={textClasses} {...props}>
      {children}
    </Component>
  );
}

// Enhanced Heading Component
interface HeadingProps extends BaseTextProps {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  cosmic?: boolean; // Special cosmic styling for Play mode
}

export function ThemeAwareHeading({
  children,
  className,
  level,
  color = "primary",
  weight = "bold",
  gradient = false,
  glow = false,
  cosmic = false,
  animated = false,
  ...props
}: HeadingProps) {
  const { accessibilityMode, isPlayMode } = useAccessibility();
  const motionSettings = useThemeMotion();

  // Get heading size based on level and accessibility mode
  const getHeadingSize = () => {
    const sizes = {
      h1: "text-[var(--font-size-heading)] text-4xl sm:text-5xl md:text-6xl",
      h2: "text-[var(--font-size-heading)] text-3xl sm:text-4xl md:text-5xl",
      h3: "text-[var(--font-size-heading)] text-2xl sm:text-3xl md:text-4xl",
      h4: "text-[var(--font-size-heading)] text-xl sm:text-2xl md:text-3xl",
      h5: "text-[var(--font-size-heading)] text-lg sm:text-xl md:text-2xl",
      h6: "text-[var(--font-size-heading)] text-base sm:text-lg md:text-xl",
    };

    return sizes[level];
  };

  // Get color classes
  const getColorClasses = () => {
    switch (color) {
      case "primary":
        return "text-[var(--color-text-primary)]";
      case "secondary":
        return "text-[var(--color-text-secondary)]";
      case "accent":
        return "text-[var(--color-text-accent)]";
      case "mood":
        return "text-[var(--color-mood-primary)]";
      default:
        return "text-[var(--color-text-primary)]";
    }
  };

  // Get special effect classes
  const getEffectClasses = () => {
    let classes = "";

    if (gradient) {
      if (isPlayMode) {
        classes +=
          " bg-gradient-to-r from-[var(--color-primary-400)] via-[var(--color-secondary-400)] to-[var(--color-accent-400)] bg-clip-text text-transparent";
      } else {
        classes +=
          " bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-accent-600)] bg-clip-text text-transparent";
      }
    }

    if (glow && isPlayMode) {
      classes += " drop-shadow-[0_0_12px_var(--color-mood-glow)]";
    }

    if (cosmic && isPlayMode) {
      classes += " font-[var(--font-family-secondary)] tracking-wider";
    }

    return classes;
  };

  const headingClasses = cn(
    // Base styles
    "transition-all duration-[var(--motion-duration-normal)]",

    // Size and typography
    getHeadingSize(),
    weight === "light" && "font-light",
    weight === "normal" && "font-normal",
    weight === "medium" && "font-medium",
    weight === "semibold" && "font-semibold",
    weight === "bold" && "font-bold",

    // Colors and effects
    !gradient && getColorClasses(),
    getEffectClasses(),

    // Accessibility enhancements
    accessibilityMode === "elder" && "leading-relaxed tracking-wide",
    accessibilityMode === "youth" && "leading-tight tracking-normal",

    className,
  );

  if (animated && !motionSettings.reduceMotion) {
    const animationVariant = isPlayMode
      ? motionSettings.cosmic
      : motionSettings.slideUp;

    return (
      <motion.div
        initial={animationVariant.initial}
        animate={animationVariant.animate}
        exit={animationVariant.exit}
        transition={animationVariant.transition}
      >
        {React.createElement(
          level,
          { className: headingClasses, ...props },
          children,
        )}
      </motion.div>
    );
  }

  return React.createElement(
    level,
    { className: headingClasses, ...props },
    children,
  );
}

// Specialized text components
export function ThemeAwareLabel({
  children,
  required = false,
  className,
  ...props
}: BaseTextProps & { required?: boolean }) {
  return (
    <ThemeAwareText
      as="label"
      variant="small"
      weight="medium"
      color="secondary"
      className={cn("block mb-2", className)}
      {...props}
    >
      {children}
      {required && (
        <span className="text-[var(--color-mood-primary)] ml-1">*</span>
      )}
    </ThemeAwareText>
  );
}

export function ThemeAwareDescription({
  children,
  className,
  ...props
}: BaseTextProps) {
  return (
    <ThemeAwareText
      variant="caption"
      color="tertiary"
      className={cn("mt-1", className)}
      {...props}
    >
      {children}
    </ThemeAwareText>
  );
}

export function ThemeAwareError({
  children,
  className,
  ...props
}: BaseTextProps) {
  const { isPlayMode } = useAccessibility();

  return (
    <ThemeAwareText
      variant="small"
      weight="medium"
      color="mood"
      glow={isPlayMode}
      className={cn("text-red-500 dark:text-red-400 mt-1", className)}
      {...props}
    >
      {children}
    </ThemeAwareText>
  );
}

export function ThemeAwareSuccess({
  children,
  className,
  ...props
}: BaseTextProps) {
  const { isPlayMode } = useAccessibility();

  return (
    <ThemeAwareText
      variant="small"
      weight="medium"
      color="mood"
      glow={isPlayMode}
      className={cn("text-green-500 dark:text-green-400 mt-1", className)}
      {...props}
    >
      {children}
    </ThemeAwareText>
  );
}

// Legacy component exports for backward compatibility
export const AccessibleText = ThemeAwareText;
export const AccessibleHeading = ThemeAwareHeading;
export const AccessibleLabel = ThemeAwareLabel;
export const AccessibleDescription = ThemeAwareDescription;
export const AccessibleError = ThemeAwareError;
export const AccessibleSuccess = ThemeAwareSuccess;
