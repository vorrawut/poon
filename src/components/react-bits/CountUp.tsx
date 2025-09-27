import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export default function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = ",",
  prefix = "",
  suffix = "",
  decimals,
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? to : from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  });

  const isInView = useInView(ref, { once: true, margin: "0px" });

  const getDecimalPlaces = (num: number): number => {
    if (decimals !== undefined) return decimals;

    const str = num.toString();
    if (str.includes(".")) {
      const decimalPart = str.split(".")[1];
      if (parseInt(decimalPart) !== 0) {
        return decimalPart.length;
      }
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = `${prefix}${String(direction === "down" ? to : from)}${suffix}`;
    }
  }, [from, to, direction, prefix, suffix]);

  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === "function") {
        onStart();
      }

      const timeoutId = setTimeout(() => {
        motionValue.set(direction === "down" ? from : to);
      }, delay * 1000);

      const durationTimeoutId = setTimeout(
        () => {
          if (typeof onEnd === "function") {
            onEnd();
          }
        },
        delay * 1000 + duration * 1000,
      );

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [
    isInView,
    startWhen,
    motionValue,
    direction,
    from,
    to,
    delay,
    onStart,
    onEnd,
    duration,
  ]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const hasDecimals = maxDecimals > 0;

        const options: Intl.NumberFormatOptions = {
          useGrouping: !!separator,
          minimumFractionDigits: hasDecimals ? maxDecimals : 0,
          maximumFractionDigits: hasDecimals ? maxDecimals : 0,
        };

        const formattedNumber = Intl.NumberFormat("en-US", options).format(
          latest,
        );
        const finalNumber =
          separator && separator !== ","
            ? formattedNumber.replace(/,/g, separator)
            : formattedNumber;

        ref.current.textContent = `${prefix}${finalNumber}${suffix}`;
      }
    });

    return () => unsubscribe();
  }, [springValue, separator, maxDecimals, prefix, suffix]);

  return <span className={className} ref={ref} />;
}

// Utility component for currency formatting
export function CurrencyCountUp({
  amount,
  currency = "USD",
  locale = "en-US",
  ...props
}: {
  amount: number;
  currency?: string;
  locale?: string;
} & Omit<CountUpProps, "to" | "prefix" | "suffix">) {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Extract currency symbol and format
  const parts = formatter.formatToParts(amount);
  const currencySymbol =
    parts.find((part) => part.type === "currency")?.value || "$";

  return (
    <CountUp to={amount} prefix={currencySymbol} separator="," {...props} />
  );
}

// Utility component for percentage formatting
export function PercentageCountUp({
  percentage,
  showSign = false,
  ...props
}: {
  percentage: number;
  showSign?: boolean;
} & Omit<CountUpProps, "to" | "suffix">) {
  const sign = showSign && percentage > 0 ? "+" : "";

  return (
    <CountUp to={percentage} prefix={sign} suffix="%" decimals={1} {...props} />
  );
}
