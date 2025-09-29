/**
 * 🌌 THEME-AWARE LAYOUT COMPONENTS
 *
 * Enhanced layout components that create immersive experiences:
 * - Cosmic cards with starfield backgrounds for Play mode
 * - Clean, minimal cards for Clarity mode
 * - Responsive grids that adapt to accessibility modes
 * - Animated containers with theme-aware transitions
 */

import React from "react";
import { motion } from "framer-motion";
import { useThemeMotion } from "../../hooks/useThemeMotion";
import { useAccessibility } from "../../hooks/useAccessibility";
import { cn } from "../../libs/utils";

// Base layout props
interface BaseLayoutProps {
  children: React.ReactNode;
  className?: string;
}

// Enhanced Card Component
interface CardProps extends BaseLayoutProps {
  variant?: "default" | "elevated" | "outlined" | "glass" | "cosmic";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  hover?: boolean;
  glow?: boolean;
  animated?: boolean;
  onClick?: () => void;
}

export function ThemeAwareCard({
  children,
  className,
  variant = "default",
  padding = "md",
  hover = false,
  glow = false,
  animated = false,
  onClick,
}: CardProps) {
  const { accessibilityMode, isPlayMode } = useAccessibility();
  const motionSettings = useThemeMotion();

  // Get variant styles
  const getVariantClasses = () => {
    switch (variant) {
      case "elevated":
        return isPlayMode
          ? "bg-[var(--color-surface-glass)] backdrop-blur-md border border-[var(--color-border-glow)] shadow-[0_8px_32px_rgba(0,0,0,0.3)] shadow-[var(--color-mood-glow)]"
          : "bg-[var(--color-surface-elevated)] border border-[var(--color-border-primary)] shadow-lg";

      case "outlined":
        return "bg-[var(--color-surface-primary)] border-2 border-[var(--color-border-accent)]";

      case "glass":
        return "bg-[var(--color-surface-glass)] backdrop-blur-md border border-[var(--color-border-glow)]/30";

      case "cosmic":
        return isPlayMode
          ? 'bg-gradient-to-br from-[var(--color-surface-primary)]/80 to-[var(--color-surface-secondary)]/60 backdrop-blur-xl border border-[var(--color-border-glow)] shadow-[0_0_40px_var(--color-mood-glow)] relative overflow-hidden before:absolute before:inset-0 before:bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"%3E%3C/circle%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] before:animate-pulse'
          : "bg-[var(--color-surface-elevated)] border border-[var(--color-border-primary)] shadow-lg";

      case "default":
      default:
        return "bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)]";
    }
  };

  // Get padding classes
  const getPaddingClasses = () => {
    const basePadding =
      accessibilityMode === "elder"
        ? "p-8"
        : accessibilityMode === "youth"
          ? "p-4"
          : "p-6";

    switch (padding) {
      case "none":
        return "";
      case "sm":
        return accessibilityMode === "elder" ? "p-4" : "p-3";
      case "lg":
        return accessibilityMode === "elder" ? "p-10" : "p-8";
      case "xl":
        return accessibilityMode === "elder" ? "p-12" : "p-10";
      case "md":
      default:
        return basePadding;
    }
  };

  // Get special effect classes
  const getEffectClasses = () => {
    let classes = "";

    if (hover) {
      classes += " hover:shadow-lg hover:scale-[1.02] cursor-pointer";
      if (isPlayMode) {
        classes += " hover:shadow-[0_0_30px_var(--color-mood-glow)]";
      }
    }

    if (glow && isPlayMode) {
      classes += " shadow-[0_0_20px_var(--color-mood-glow)]";
    }

    return classes;
  };

  const cardClasses = cn(
    // Base styles
    "rounded-[var(--border-radius)] transition-all duration-[var(--motion-duration-normal)]",

    // Variant styles
    getVariantClasses(),

    // Padding
    getPaddingClasses(),

    // Effects
    getEffectClasses(),

    // Play mode specific styles
    isPlayMode && "relative",

    className,
  );

  if (animated && !motionSettings.reduceMotion) {
    const animationVariant = isPlayMode
      ? motionSettings.cosmic
      : motionSettings.fadeIn;

    return (
      <motion.div
        className={cardClasses}
        onClick={onClick}
        initial={animationVariant.initial}
        animate={animationVariant.animate}
        exit={animationVariant.exit}
        transition={animationVariant.transition}
        whileHover={hover ? { scale: 1.02 } : undefined}
        whileTap={onClick ? { scale: 0.98 } : undefined}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
}

// Section Component
interface SectionProps extends BaseLayoutProps {
  title?: string;
  description?: string;
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  background?: boolean;
}

export function ThemeAwareSection({
  children,
  title,
  description,
  spacing = "lg",
  background = false,
  className,
}: SectionProps) {
  const { accessibilityMode } = useAccessibility();

  // Get spacing classes
  const getSpacingClasses = () => {
    const baseSpacing =
      accessibilityMode === "elder"
        ? "py-12"
        : accessibilityMode === "youth"
          ? "py-6"
          : "py-8";

    switch (spacing) {
      case "none":
        return "";
      case "sm":
        return accessibilityMode === "elder" ? "py-6" : "py-4";
      case "lg":
        return accessibilityMode === "elder" ? "py-16" : "py-12";
      case "xl":
        return accessibilityMode === "elder" ? "py-20" : "py-16";
      case "md":
      default:
        return baseSpacing;
    }
  };

  const sectionClasses = cn(
    getSpacingClasses(),
    background && "bg-[var(--color-bg-secondary)]",
    className,
  );

  return (
    <section className={sectionClasses}>
      {(title || description) && (
        <div className="mb-8">
          {title && (
            <h2 className="text-[var(--font-size-heading)] text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-2">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-[var(--color-text-secondary)] text-lg">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

// Responsive Grid Component
interface GridProps extends BaseLayoutProps {
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  responsive?: boolean;
}

export function ThemeAwareGrid({
  children,
  cols = 3,
  gap = "md",
  responsive = true,
  className,
}: GridProps) {
  const { accessibilityMode } = useAccessibility();

  // Get grid columns classes
  const getGridClasses = () => {
    if (!responsive) {
      return `grid-cols-${cols}`;
    }

    // Responsive grid based on column count
    switch (cols) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      case 5:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
      case 6:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    }
  };

  // Get gap classes
  const getGapClasses = () => {
    const baseGap =
      accessibilityMode === "elder"
        ? "gap-8"
        : accessibilityMode === "youth"
          ? "gap-4"
          : "gap-6";

    switch (gap) {
      case "none":
        return "gap-0";
      case "sm":
        return accessibilityMode === "elder" ? "gap-4" : "gap-3";
      case "lg":
        return accessibilityMode === "elder" ? "gap-10" : "gap-8";
      case "xl":
        return accessibilityMode === "elder" ? "gap-12" : "gap-10";
      case "md":
      default:
        return baseGap;
    }
  };

  const gridClasses = cn("grid", getGridClasses(), getGapClasses(), className);

  return <div className={gridClasses}>{children}</div>;
}

// Flexible Layout Component
interface FlexProps extends BaseLayoutProps {
  direction?: "row" | "col" | "row-reverse" | "col-reverse";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  gap?: "none" | "sm" | "md" | "lg" | "xl";
}

export function ThemeAwareFlex({
  children,
  direction = "row",
  align = "start",
  justify = "start",
  wrap = false,
  gap = "md",
  className,
}: FlexProps) {
  const { accessibilityMode } = useAccessibility();

  // Get direction classes
  const getDirectionClasses = () => {
    switch (direction) {
      case "col":
        return "flex-col";
      case "row-reverse":
        return "flex-row-reverse";
      case "col-reverse":
        return "flex-col-reverse";
      case "row":
      default:
        return "flex-row";
    }
  };

  // Get alignment classes
  const getAlignClasses = () => {
    switch (align) {
      case "center":
        return "items-center";
      case "end":
        return "items-end";
      case "stretch":
        return "items-stretch";
      case "baseline":
        return "items-baseline";
      case "start":
      default:
        return "items-start";
    }
  };

  // Get justify classes
  const getJustifyClasses = () => {
    switch (justify) {
      case "center":
        return "justify-center";
      case "end":
        return "justify-end";
      case "between":
        return "justify-between";
      case "around":
        return "justify-around";
      case "evenly":
        return "justify-evenly";
      case "start":
      default:
        return "justify-start";
    }
  };

  // Get gap classes
  const getGapClasses = () => {
    const baseGap =
      accessibilityMode === "elder"
        ? "gap-8"
        : accessibilityMode === "youth"
          ? "gap-4"
          : "gap-6";

    switch (gap) {
      case "none":
        return "gap-0";
      case "sm":
        return accessibilityMode === "elder" ? "gap-4" : "gap-3";
      case "lg":
        return accessibilityMode === "elder" ? "gap-10" : "gap-8";
      case "xl":
        return accessibilityMode === "elder" ? "gap-12" : "gap-10";
      case "md":
      default:
        return baseGap;
    }
  };

  const flexClasses = cn(
    "flex",
    getDirectionClasses(),
    getAlignClasses(),
    getJustifyClasses(),
    wrap && "flex-wrap",
    getGapClasses(),
    className,
  );

  return <div className={flexClasses}>{children}</div>;
}

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string | React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "default" | "success" | "warning" | "danger";
  className?: string;
}

export function ThemeAwareStatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  color = "default",
  className,
}: StatsCardProps) {
  const { isPlayMode } = useAccessibility();

  // Get color classes
  const getColorClasses = () => {
    switch (color) {
      case "success":
        return "border-green-500/30 bg-green-500/5";
      case "warning":
        return "border-yellow-500/30 bg-yellow-500/5";
      case "danger":
        return "border-red-500/30 bg-red-500/5";
      case "default":
      default:
        return "";
    }
  };

  // Get trend classes
  const getTrendClasses = () => {
    switch (trend) {
      case "up":
        return "text-green-500";
      case "down":
        return "text-red-500";
      case "neutral":
      default:
        return "text-[var(--color-text-tertiary)]";
    }
  };

  return (
    <ThemeAwareCard
      variant={isPlayMode ? "glass" : "elevated"}
      className={cn(getColorClasses(), className)}
      hover
      glow={isPlayMode && color !== "default"}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[var(--color-text-secondary)] text-sm font-medium mb-1">
            {title}
          </p>
          <p className="text-[var(--color-text-primary)] text-2xl font-bold mb-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-[var(--color-text-tertiary)] text-xs">
              {subtitle}
            </p>
          )}
        </div>

        {icon && (
          <div className="text-2xl opacity-60">
            {typeof icon === "string" ? icon : icon}
          </div>
        )}
      </div>

      {(trend || trendValue) && (
        <div
          className={cn("flex items-center mt-3 text-sm", getTrendClasses())}
        >
          {trend === "up" && "↗"}
          {trend === "down" && "↘"}
          {trend === "neutral" && "→"}
          {trendValue && <span className="ml-1">{trendValue}</span>}
        </div>
      )}
    </ThemeAwareCard>
  );
}

// Legacy component exports for backward compatibility
export const AccessibleCard = ThemeAwareCard;
export const AccessibleSection = ThemeAwareSection;
export const AccessibleGrid = ThemeAwareGrid;
export const AccessibleFlex = ThemeAwareFlex;
export const AccessibleStatsCard = ThemeAwareStatsCard;
