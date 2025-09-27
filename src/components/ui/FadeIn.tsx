import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  trigger?: boolean;
  once?: boolean;
}

export function FadeIn({
  children,
  className = "",
  direction = "up",
  distance = 30,
  duration = 0.8,
  delay = 0,
  trigger = true,
  once = true,
}: FadeInProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!elementRef.current || !trigger || (once && hasAnimatedRef.current))
      return;

    const element = elementRef.current;

    // Set initial styles
    const initialStyles: gsap.TweenVars = {
      opacity: 0,
    };

    const animationStyles: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: "power2.out",
    };

    // Add directional movement
    switch (direction) {
      case "up":
        initialStyles.y = distance;
        animationStyles.y = 0;
        break;
      case "down":
        initialStyles.y = -distance;
        animationStyles.y = 0;
        break;
      case "left":
        initialStyles.x = distance;
        animationStyles.x = 0;
        break;
      case "right":
        initialStyles.x = -distance;
        animationStyles.x = 0;
        break;
      default:
        // No directional movement
        break;
    }

    // Set initial state
    gsap.set(element, initialStyles);

    // Animate to final state
    const animation = gsap.to(element, animationStyles);

    hasAnimatedRef.current = true;

    return () => {
      animation.kill();
    };
  }, [direction, distance, duration, delay, trigger, once]);

  return (
    <div ref={elementRef} className={`fade-in ${className}`}>
      {children}
    </div>
  );
}
