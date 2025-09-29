import type { ThaiNumberFormat, BuddhistDate } from "../types";

// Thai Number Formatting Service
export class ThaiLocalizationService {
  private static instance: ThaiLocalizationService;

  private numberFormat: ThaiNumberFormat = {
    groupSeparator: ",",
    decimalSeparator: ".",
    currencySymbol: "฿",
    currencyPosition: "before",
    thousandUnit: {
      en: "K",
      th: "พัน",
    },
    millionUnit: {
      en: "M",
      th: "ล้าน",
    },
  };

  public static getInstance(): ThaiLocalizationService {
    if (!ThaiLocalizationService.instance) {
      ThaiLocalizationService.instance = new ThaiLocalizationService();
    }
    return ThaiLocalizationService.instance;
  }

  // Format currency in Thai Baht
  formatCurrency(
    amount: number,
    language: "en" | "th" = "en",
    compact: boolean = false,
  ): string {
    const { currencySymbol, currencyPosition } = this.numberFormat;

    if (compact) {
      return this.formatCompactCurrency(amount, language);
    }

    // Format number with Thai separators
    const formattedNumber = this.formatNumber(amount, 2);

    if (currencyPosition === "before") {
      return `${currencySymbol}${formattedNumber}`;
    } else {
      return `${formattedNumber} ${currencySymbol}`;
    }
  }

  // Format compact currency (e.g., ฿1.2M instead of ฿1,200,000)
  formatCompactCurrency(amount: number, language: "en" | "th" = "en"): string {
    const { currencySymbol, thousandUnit, millionUnit } = this.numberFormat;

    if (amount >= 1000000) {
      const millions = amount / 1000000;
      const unit = millionUnit[language];
      return `${currencySymbol}${millions.toFixed(1)}${unit}`;
    } else if (amount >= 1000) {
      const thousands = amount / 1000;
      const unit = thousandUnit[language];
      return `${currencySymbol}${thousands.toFixed(1)}${unit}`;
    } else {
      return `${currencySymbol}${amount.toFixed(0)}`;
    }
  }

  // Format regular numbers with Thai separators
  formatNumber(amount: number, decimals: number = 0): string {
    const options: Intl.NumberFormatOptions = {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: true,
    };

    // Use Thai locale for number formatting
    const formatted = new Intl.NumberFormat("th-TH", options).format(amount);

    // Replace default separators with Thai preferences if needed
    return formatted;
  }

  // Convert Gregorian date to Buddhist Era
  gregorianToBuddhist(gregorianYear: number): number {
    return gregorianYear + 543;
  }

  // Convert Buddhist Era to Gregorian date
  buddhistToGregorian(buddhistYear: number): number {
    return buddhistYear - 543;
  }

  // Format date in Buddhist Era
  formatBuddhistDate(date: Date, language: "en" | "th" = "en"): string {
    const buddhistYear = this.gregorianToBuddhist(date.getFullYear());
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const monthNames = {
      en: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      th: [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ],
    };

    if (language === "th") {
      return `${day} ${monthNames.th[month - 1]} พ.ศ. ${buddhistYear}`;
    } else {
      return `${day} ${monthNames.en[month - 1]} ${buddhistYear} BE`;
    }
  }

  // Get Buddhist date object
  getBuddhistDate(date: Date): BuddhistDate {
    const buddhistYear = this.gregorianToBuddhist(date.getFullYear());
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const monthNames = {
      en: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      th: [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ],
    };

    return {
      buddhistYear,
      gregorianYear: date.getFullYear(),
      month,
      day,
      monthName: {
        en: monthNames.en[month - 1],
        th: monthNames.th[month - 1],
      },
    };
  }

  // Format percentage in Thai style
  formatPercentage(value: number, language: "en" | "th" = "en"): string {
    const formatted = this.formatNumber(value, 1);
    return language === "th" ? `${formatted}%` : `${formatted}%`;
  }

  // Thai-specific time formatting
  formatThaiTime(date: Date, language: "en" | "th" = "en"): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (language === "th") {
      const thaiHours = hours.toString().padStart(2, "0");
      const thaiMinutes = minutes.toString().padStart(2, "0");
      return `${thaiHours}:${thaiMinutes} น.`;
    } else {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
  }

  // Get day of week in Thai
  getThaiDayOfWeek(date: Date, language: "en" | "th" = "en"): string {
    const dayNames = {
      en: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      th: [
        "วันอาทิตย์",
        "วันจันทร์",
        "วันอังคาร",
        "วันพุธ",
        "วันพฤหัสบดี",
        "วันศุกร์",
        "วันเสาร์",
      ],
    };

    return dayNames[language][date.getDay()];
  }

  // Format duration in Thai
  formatDuration(days: number, language: "en" | "th" = "en"): string {
    if (language === "th") {
      if (days === 1) return "1 วัน";
      if (days < 30) return `${days} วัน`;
      if (days < 365) {
        const months = Math.floor(days / 30);
        return `${months} เดือน`;
      } else {
        const years = Math.floor(days / 365);
        return `${years} ปี`;
      }
    } else {
      if (days === 1) return "1 day";
      if (days < 30) return `${days} days`;
      if (days < 365) {
        const months = Math.floor(days / 30);
        return `${months} month${months > 1 ? "s" : ""}`;
      } else {
        const years = Math.floor(days / 365);
        return `${years} year${years > 1 ? "s" : ""}`;
      }
    }
  }
}

// Export singleton instance
export const thaiLocalization = ThaiLocalizationService.getInstance();

// Export helper functions
export function formatThaiCurrency(
  amount: number,
  language: "en" | "th" = "en",
  compact: boolean = false,
): string {
  return thaiLocalization.formatCurrency(amount, language, compact);
}

export function formatThaiNumber(amount: number, decimals: number = 0): string {
  return thaiLocalization.formatNumber(amount, decimals);
}

export function formatBuddhistDate(
  date: Date,
  language: "en" | "th" = "en",
): string {
  return thaiLocalization.formatBuddhistDate(date, language);
}
