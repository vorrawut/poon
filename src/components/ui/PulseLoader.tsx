import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PulseLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export function PulseLoader({ 
  size = 'md', 
  color = 'currentColor',
  className = '' 
}: PulseLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const dots = containerRef.current.children;
    
    // Create staggered pulse animation
    const timeline = gsap.timeline({ repeat: -1 });
    
    timeline.to(dots, {
      scale: 1.2,
      opacity: 0.8,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 1,
    });

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`flex items-center space-x-1 ${className}`}
      role="status"
      aria-label="Loading"
    >
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={`rounded-full ${sizeClasses[size]}`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
