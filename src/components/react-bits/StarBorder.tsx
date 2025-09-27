import React from "react";

type StarBorderProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
    className?: string;
    children?: React.ReactNode;
    color?: string;
    speed?: React.CSSProperties["animationDuration"];
    thickness?: number;
    intensity?: number;
  };

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  color = "white",
  speed = "6s",
  thickness = 1,
  intensity = 0.7,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "button";

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-2xl ${className}`}
      {...(rest as Record<string, unknown>)}
      style={{
        padding: `${thickness}px`,
        ...(rest as { style?: React.CSSProperties }).style,
      }}
    >
      {/* Animated star/sparkle effects */}
      <div
        className="absolute w-[300%] h-[50%] bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
          opacity: intensity,
        }}
      />
      <div
        className="absolute w-[300%] h-[50%] top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
          opacity: intensity,
        }}
      />

      {/* Additional sparkle layers for more intensity */}
      <div
        className="absolute w-[200%] h-[30%] top-[-5px] right-[-150%] rounded-full animate-star-movement-bottom-slow z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 15%)`,
          animationDuration: `${parseFloat(speed) * 1.5}s`,
          opacity: intensity * 0.5,
        }}
      />
      <div
        className="absolute w-[200%] h-[30%] bottom-[-5px] left-[-150%] rounded-full animate-star-movement-top-slow z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 15%)`,
          animationDuration: `${parseFloat(speed) * 1.5}s`,
          opacity: intensity * 0.5,
        }}
      />

      {/* Content container */}
      <div className="relative z-10">{children}</div>
    </Component>
  );
};

export default StarBorder;

// Enhanced StarBorder for completed goals
export function CompletedGoalStarBorder({
  children,
  ...props
}: Omit<StarBorderProps<"div">, "color" | "speed">) {
  return (
    <StarBorder as="div" color="#FFD700" speed="3s" intensity={1} {...props}>
      {children}
    </StarBorder>
  );
}

// Enhanced StarBorder for active goals
export function ActiveGoalStarBorder({
  children,
  progress = 0,
  ...props
}: Omit<StarBorderProps<"div">, "color" | "intensity"> & {
  progress?: number;
}) {
  const getColor = (progress: number) => {
    if (progress > 0.8) return "#F59E0B"; // Amber
    if (progress > 0.5) return "#3B82F6"; // Blue
    return "#94A3B8"; // Gray
  };

  return (
    <StarBorder
      as="div"
      color={getColor(progress)}
      intensity={Math.max(progress, 0.3)}
      {...props}
    >
      {children}
    </StarBorder>
  );
}
