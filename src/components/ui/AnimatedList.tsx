import React, {
  useEffect,
  useRef,
  Children,
  cloneElement,
  type ReactElement,
} from "react";
import { gsap } from "gsap";

interface AnimatedListProps {
  children: React.ReactNode;
  className?: string;
  animationType?: "fadeIn" | "slideUp" | "slideLeft" | "scaleIn";
  duration?: number;
  stagger?: number;
  delay?: number;
  trigger?: boolean;
}

export function AnimatedList({
  children,
  className = "",
  animationType = "slideUp",
  duration = 0.6,
  stagger = 0.1,
  delay = 0,
  trigger = true,
}: AnimatedListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!listRef.current || !trigger) return;

    const items = itemsRef.current.filter(Boolean);
    if (items.length === 0) return;

    // Set initial styles based on animation type
    const initialStyles: gsap.TweenVars = { opacity: 0 };
    const animationStyles: gsap.TweenVars = { opacity: 1 };

    switch (animationType) {
      case "slideUp":
        initialStyles.y = 30;
        animationStyles.y = 0;
        break;
      case "slideLeft":
        initialStyles.x = 30;
        animationStyles.x = 0;
        break;
      case "scaleIn":
        initialStyles.scale = 0.8;
        animationStyles.scale = 1;
        break;
      default:
        // fadeIn is default
        break;
    }

    // Set initial styles
    gsap.set(items, initialStyles);

    // Animate items
    const timeline = gsap.timeline({ delay });
    timeline.to(items, {
      ...animationStyles,
      duration,
      ease: "power2.out",
      stagger,
    });

    return () => {
      timeline.kill();
    };
  }, [children, animationType, duration, stagger, delay, trigger]);

  // Add refs to children
  const childrenWithRefs = Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return cloneElement(
        child as ReactElement,
        {
          key: index,
        } as React.Attributes,
      );
    }
    return child;
  });

  return (
    <div ref={listRef} className={`animated-list ${className}`}>
      {childrenWithRefs}
    </div>
  );
}
