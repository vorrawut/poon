import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  format?: 'currency' | 'decimal' | 'percent';
  currency?: string;
  decimals?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  delay?: number;
}

export function AnimatedNumber({
  value,
  duration = 1.2,
  format = 'decimal',
  currency = 'USD',
  decimals = 2,
  className = '',
  prefix = '',
  suffix = '',
  delay = 0,
}: AnimatedNumberProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const currentValueRef = useRef(0);

  useEffect(() => {
    if (!numberRef.current) return;

    const element = numberRef.current;
    const startValue = currentValueRef.current;
    const endValue = value;

    // Create animation object for GSAP to animate
    const animationObject = { value: startValue };

    const animation = gsap.to(animationObject, {
      value: endValue,
      duration,
      delay,
      ease: 'power2.out',
      onUpdate: () => {
        const currentValue = animationObject.value;
        currentValueRef.current = currentValue;
        
        let formattedValue: string;
        
        switch (format) {
          case 'currency':
            formattedValue = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency,
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }).format(currentValue);
            break;
          case 'percent':
            formattedValue = new Intl.NumberFormat('en-US', {
              style: 'percent',
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }).format(currentValue / 100);
            break;
          default:
            formattedValue = new Intl.NumberFormat('en-US', {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }).format(currentValue);
        }
        
        element.textContent = `${prefix}${formattedValue}${suffix}`;
      },
    });

    return () => {
      animation.kill();
    };
  }, [value, duration, format, currency, decimals, prefix, suffix, delay]);

  return (
    <span 
      ref={numberRef} 
      className={`animate-count font-mono ${className}`}
      aria-label={`${prefix}${value.toLocaleString()}${suffix}`}
    >
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
}
