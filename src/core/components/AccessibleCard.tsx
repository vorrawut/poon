import React from "react";
import { motion } from "framer-motion";
import { useAccessibility, useAccessibilityMotion } from "../../hooks/useAccessibility";

interface AccessibleCardProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined" | "glass";
  padding?: "sm" | "md" | "lg" | "xl";
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

interface AccessibleSectionProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  headerClassName?: string;
}

interface AccessibleStatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

/**
 * Accessibility-aware card component with proper spacing and colors
 */
export function AccessibleCard({
  children,
  variant = "default",
  padding = "md",
  className = "",
  hover = false,
  onClick,
}: AccessibleCardProps) {
  const { getClasses, viewMode, isElderMode } = useAccessibility();
  const motionProps = useAccessibilityMotion();

  const getVariantClasses = () => {
    const baseClasses = "rounded-2xl transition-all";
    
    switch (variant) {
      case "elevated":
        return `${baseClasses} shadow-lg ${viewMode === "play" ? "bg-white/10 backdrop-blur-sm border border-white/20" : "bg-white border border-gray-200"}`;
      case "outlined":
        return `${baseClasses} border-2 ${viewMode === "play" ? "border-white/30 bg-white/5" : "border-gray-300 bg-white"}`;
      case "glass":
        return `${baseClasses} bg-white/10 backdrop-blur-sm border border-white/20`;
      case "default":
      default:
        return `${baseClasses} ${viewMode === "play" ? "bg-white/10 backdrop-blur-sm border border-white/20" : "bg-white border border-gray-200 shadow-sm"}`;
    }
  };

  const getPaddingClasses = () => {
    switch (padding) {
      case "sm":
        return "p-4";
      case "lg":
        return "p-8";
      case "xl":
        return "p-12";
      case "md":
      default:
        return getClasses({ includeSpacing: true });
    }
  };

  const combinedClassName = `
    ${getVariantClasses()}
    ${getPaddingClasses()}
    ${hover ? "cursor-pointer" : ""}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  if (isElderMode || !hover) {
    return (
      <div className={combinedClassName} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={combinedClassName}
      onClick={onClick}
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

/**
 * Accessibility-aware section with optional title and description
 */
export function AccessibleSection({
  children,
  title,
  description,
  className = "",
  headerClassName = "",
}: AccessibleSectionProps) {
  const { getClasses, colors } = useAccessibility();

  return (
    <section className={`${getClasses({ includeSpacing: true })} ${className}`.trim()}>
      {(title || description) && (
        <div className={`mb-6 ${headerClassName}`.trim()}>
          {title && (
            <h2 className={`${getClasses({ fontSize: "heading", headingLevel: "h2" })} font-bold ${colors.text} mb-2`}>
              {title}
            </h2>
          )}
          {description && (
            <p className={`${getClasses({ fontSize: "text" })} ${colors.textSecondary}`}>
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

/**
 * Accessibility-aware stats card with value, trend, and proper typography
 */
export function AccessibleStatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  className = "",
}: AccessibleStatsCardProps) {
  const { getClasses, colors } = useAccessibility();

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-500";
      case "down":
        return "text-red-500";
      case "neutral":
      default:
        return colors.textSecondary;
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return "↗️";
      case "down":
        return "↘️";
      case "neutral":
      default:
        return "➡️";
    }
  };

  return (
    <AccessibleCard variant="elevated" className={className}>
      <div className="text-center">
        {icon && <div className="text-4xl mb-3">{icon}</div>}
        
        <div className={`${getClasses({ fontSize: "heading", headingLevel: "h3" })} font-bold ${colors.text} mb-1`}>
          {value}
        </div>
        
        <div className={`${getClasses({ fontSize: "text" })} ${colors.text} mb-2`}>
          {title}
        </div>
        
        {subtitle && (
          <div className={`${getClasses({ fontSize: "text" })} ${colors.textSecondary} text-sm`}>
            {subtitle}
          </div>
        )}
        
        {trend && trendValue && (
          <div className={`flex items-center justify-center gap-1 mt-2 ${getClasses({ fontSize: "text" })} ${getTrendColor()}`}>
            <span>{getTrendIcon()}</span>
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </AccessibleCard>
  );
}

/**
 * Accessibility-aware grid layout with responsive columns
 */
export function AccessibleGrid({
  children,
  cols = 1,
  gap = "md",
  className = "",
}: {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6;
  gap?: "sm" | "md" | "lg";
  className?: string;
}) {
  const getGridClasses = () => {
    const colsClass = `grid-cols-1 sm:grid-cols-${Math.min(cols, 2)} lg:grid-cols-${cols}`;
    const gapClass = gap === "sm" ? "gap-4" : gap === "lg" ? "gap-8" : "gap-6";
    return `grid ${colsClass} ${gapClass}`;
  };

  return (
    <div className={`${getGridClasses()} ${className}`.trim()}>
      {children}
    </div>
  );
}

/**
 * Accessibility-aware flex layout with responsive direction
 */
export function AccessibleFlex({
  children,
  direction = "row",
  align = "start",
  justify = "start",
  gap = "md",
  wrap = false,
  className = "",
}: {
  children: React.ReactNode;
  direction?: "row" | "col" | "row-reverse" | "col-reverse";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  gap?: "sm" | "md" | "lg";
  wrap?: boolean;
  className?: string;
}) {
  const getFlexClasses = () => {
    const directionClass = `flex-${direction}`;
    const alignClass = `items-${align}`;
    const justifyClass = `justify-${justify}`;
    const gapClass = gap === "sm" ? "gap-2" : gap === "lg" ? "gap-6" : "gap-4";
    const wrapClass = wrap ? "flex-wrap" : "";
    
    return `flex ${directionClass} ${alignClass} ${justifyClass} ${gapClass} ${wrapClass}`.trim();
  };

  return (
    <div className={`${getFlexClasses()} ${className}`.trim()}>
      {children}
    </div>
  );
}
