import { useState } from "react";

export type SupportedCurrency = "USD" | "EUR" | "GBP" | "THB";

const CURRENCY_STORAGE_KEY = "app-currency";

// Currency symbols and formatting
export const currencyConfig = {
  USD: { symbol: "$", position: "before" as const, decimals: 2 },
  EUR: { symbol: "€", position: "after" as const, decimals: 2 },
  GBP: { symbol: "£", position: "before" as const, decimals: 2 },
  THB: { symbol: "฿", position: "before" as const, decimals: 2 },
};

function getStoredCurrency(): SupportedCurrency {
  if (typeof window === "undefined") return "USD";

  try {
    const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
    if (stored && stored in currencyConfig) {
      return stored as SupportedCurrency;
    }
  } catch (error) {
    console.warn("Failed to read currency from localStorage:", error);
  }

  return "USD";
}

function storeCurrency(currency: SupportedCurrency): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
  } catch (error) {
    console.warn("Failed to store currency in localStorage:", error);
  }
}

export function useCurrency() {
  const [currency, setCurrencyState] = useState<SupportedCurrency>(() =>
    getStoredCurrency(),
  );

  const setCurrency = (newCurrency: SupportedCurrency) => {
    setCurrencyState(newCurrency);
    storeCurrency(newCurrency);
  };

  const formatCurrency = (amount: number, options?: { compact?: boolean }) => {
    const config = currencyConfig[currency];
    const { compact = false } = options || {};

    let formattedAmount: string;

    if (compact && Math.abs(amount) >= 1000) {
      // Format large numbers compactly (1.2K, 1.5M, etc.)
      const formatter = new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
      });
      formattedAmount = formatter.format(amount);
    } else {
      // Standard formatting
      const formatter = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: config.decimals,
        maximumFractionDigits: config.decimals,
      });
      formattedAmount = formatter.format(Math.abs(amount));
    }

    // Add currency symbol
    const result =
      config.position === "before"
        ? `${config.symbol}${formattedAmount}`
        : `${formattedAmount}${config.symbol}`;

    // Add negative sign if needed
    return amount < 0 ? `-${result}` : result;
  };

  return {
    currency,
    setCurrency,
    formatCurrency,
    currencySymbol: currencyConfig[currency].symbol,
  };
}
