import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SplitTextProps {
  children?: string;
  text?: string;
  className?: string;
  animationType?: "fadeIn" | "slideUp" | "slideDown" | "scaleIn" | "rotateIn";
  duration?: number;
  stagger?: number;
  delay?: number;
  split?: "chars" | "words" | "lines";
  trigger?: boolean;
}

export function SplitText({
  children,
  text,
  className = "",
  animationType = "fadeIn",
  duration = 0.8,
  stagger = 0.05,
  delay = 0,
  split = "chars",
  trigger = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContent = text || children || "";

  useEffect(() => {
    if (!containerRef.current || !trigger) return;

    const container = containerRef.current;

    // Clear previous content
    container.innerHTML = "";

    // Split text based on type
    const elements: HTMLElement[] = [];

    if (split === "chars") {
      const chars = textContent.split("");
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char; // Use non-breaking space
        span.style.display = "inline-block";
        span.style.opacity = "0";
        container.appendChild(span);
        elements.push(span);
      });
    } else if (split === "words") {
      const words = textContent.split(" ");
      words.forEach((word, index) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        if (index < words.length - 1) {
          span.style.marginRight = "0.25rem";
        }
        container.appendChild(span);
        elements.push(span);
      });
    } else if (split === "lines") {
      // For simplicity, treat lines as words for now
      const words = textContent.split(" ");
      words.forEach((word, index) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        if (index < words.length - 1) {
          span.style.marginRight = "0.25rem";
        }
        container.appendChild(span);
        elements.push(span);
      });
    }

    // Set initial styles based on animation type
    const initialStyles: gsap.TweenVars = { opacity: 0 };
    const animationStyles: gsap.TweenVars = { opacity: 1 };

    switch (animationType) {
      case "slideUp":
        initialStyles.y = 20;
        animationStyles.y = 0;
        break;
      case "slideDown":
        initialStyles.y = -20;
        animationStyles.y = 0;
        break;
      case "scaleIn":
        initialStyles.scale = 0;
        animationStyles.scale = 1;
        break;
      case "rotateIn":
        initialStyles.rotation = -180;
        animationStyles.rotation = 0;
        break;
      default:
        // fadeIn is default
        break;
    }

    // Set initial styles
    gsap.set(elements, initialStyles);

    // Animate elements
    const timeline = gsap.timeline({ delay });
    timeline.to(elements, {
      ...animationStyles,
      duration,
      ease: "power2.out",
      stagger,
    });

    return () => {
      timeline.kill();
    };
  }, [textContent, animationType, duration, stagger, delay, split, trigger]);

  return (
    <div
      ref={containerRef}
      className={`split-text ${className}`}
      aria-label={textContent}
    />
  );
}
