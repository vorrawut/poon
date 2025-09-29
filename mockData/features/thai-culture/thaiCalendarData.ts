// Thai Cultural Events Data
export interface ThaiCulturalEvent {
  id: string;
  name: string;
  nameEn: string;
  nameTh: string;
  date: string;
  type: "religious" | "national" | "cultural" | "seasonal";
  significance: "high" | "medium" | "low";
  financialImpact: {
    spendingIncrease: number; // percentage
    categories: string[];
    budgetRecommendation: string;
  };
  traditions: string[];
  modernPractices: string[];
  icon: string;
  color: string;
  description: {
    en: string;
    th: string;
  };
}

export const mockThaiEvents: ThaiCulturalEvent[] = [
  {
    id: "songkran-2025",
    name: "สงกรานต์",
    nameEn: "Songkran Festival",
    nameTh: "เทศกาลสงกรานต์",
    date: "2025-04-13",
    type: "cultural",
    significance: "high",
    financialImpact: {
      spendingIncrease: 40,
      categories: ["Food & Dining", "Travel", "Gifts", "Entertainment"],
      budgetRecommendation: "Set aside 15% extra budget for festival expenses"
    },
    traditions: ["Water splashing", "Visiting temples", "Family gatherings"],
    modernPractices: ["Water gun fights", "Pool parties", "Cultural shows"],
    icon: "💧",
    color: "#3B82F6",
    description: {
      en: "Thai New Year celebration with water festivals and family reunions",
      th: "การเฉลิมฉลองปีใหม่ไทยด้วยเทศกาลน้ำและการชุมนุมครอบครัว"
    }
  },
  {
    id: "loy-krathong-2025",
    name: "ลอยกระทง",
    nameEn: "Loy Krathong",
    nameTh: "เทศกาลลอยกระทง",
    date: "2025-11-12",
    type: "cultural",
    significance: "high",
    financialImpact: {
      spendingIncrease: 25,
      categories: ["Decorations", "Food & Dining", "Transportation"],
      budgetRecommendation: "Budget for krathong materials and special meals"
    },
    traditions: ["Floating krathong", "Candle lighting", "Making wishes"],
    modernPractices: ["LED candles", "Eco-friendly materials", "Photography"],
    icon: "🪔",
    color: "#F59E0B",
    description: {
      en: "Festival of lights where people float decorated baskets on water",
      th: "เทศกาลแสงสีที่ผู้คนลอยกระทงที่ตกแต่งแล้วลงน้ำ"
    }
  },
  {
    id: "vesak-day-2025",
    name: "วันวิสาขบูชา",
    nameEn: "Vesak Day",
    nameTh: "วันวิสาขบูชา",
    date: "2025-05-12",
    type: "religious",
    significance: "high",
    financialImpact: {
      spendingIncrease: 20,
      categories: ["Temple Donations", "Food & Dining", "Transportation"],
      budgetRecommendation: "Allocate funds for temple visits and merit-making"
    },
    traditions: ["Temple visits", "Merit making", "Meditation"],
    modernPractices: ["Online dharma talks", "Virtual temple visits"],
    icon: "🙏",
    color: "#8B5CF6",
    description: {
      en: "Buddhist holy day commemorating the birth, enlightenment, and death of Buddha",
      th: "วันศักดิ์สิทธิ์ทางพุทธศาสนาระลึกถึงการประสูติ ตรัสรู้ และปรินิพพานของพระพุทธเจ้า"
    }
  },
  {
    id: "makha-bucha-2025",
    name: "วันมาฆบูชา",
    nameEn: "Makha Bucha Day",
    nameTh: "วันมาฆบูชา",
    date: "2025-02-12",
    type: "religious",
    significance: "high",
    financialImpact: {
      spendingIncrease: 15,
      categories: ["Temple Donations", "Candles & Incense"],
      budgetRecommendation: "Small budget for candles and temple offerings"
    },
    traditions: ["Candlelight processions", "Temple visits", "Merit making"],
    modernPractices: ["LED candles for processions", "Online ceremonies"],
    icon: "🕯️",
    color: "#EF4444",
    description: {
      en: "Buddhist holy day with candlelight processions around temples",
      th: "วันศักดิ์สิทธิ์ทางพุทธศาสนาที่มีขบวนแห่เทียนรอบวัด"
    }
  }
];
