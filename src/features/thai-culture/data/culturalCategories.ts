import type { ThaiCulturalCategory } from "../types";

// Thai Cultural Financial Categories
// These complement the universal spending categories with Thai-specific contexts
export const THAI_CULTURAL_CATEGORIES: ThaiCulturalCategory[] = [
  {
    id: "merit_making",
    name: {
      en: "Merit Making & Religious",
      th: "ทำบุญและศาสนา",
    },
    description: {
      en: "Temple donations, monk offerings, religious ceremonies, and merit-making activities",
      th: "การบริจาควัด การถวายพระ พิธีกรรมทางศาสนา และกิจกรรมทำบุญ",
    },
    icon: "🙏",
    color: "#F59E0B",
    culturalContext:
      "Central to Thai Buddhist culture - making merit for good karma and spiritual well-being",
    keywords: {
      en: [
        "temple",
        "monk",
        "donation",
        "merit",
        "buddhist",
        "ceremony",
        "offering",
        "wat",
      ],
      th: ["วัด", "พระ", "บริจาค", "บุญ", "พุทธ", "พิธี", "ถวาย", "ทำบุญ"],
    },
    subcategories: [
      {
        id: "temple_donation",
        name: {
          en: "Temple Donations",
          th: "บริจาควัด",
        },
      },
      {
        id: "monk_offerings",
        name: {
          en: "Monk Offerings",
          th: "ถวายพระ",
        },
      },
      {
        id: "religious_ceremonies",
        name: {
          en: "Religious Ceremonies",
          th: "พิธีกรรมทางศาสนา",
        },
      },
      {
        id: "merit_activities",
        name: {
          en: "Merit Activities",
          th: "กิจกรรมทำบุญ",
        },
      },
    ],
  },
  {
    id: "family_obligations",
    name: {
      en: "Family Obligations",
      th: "ภาระครอบครัว",
    },
    description: {
      en: "Support for parents, siblings, extended family - a core Thai cultural value",
      th: "การช่วยเหลือพ่อแม่ พี่น้อง และญาติพี่น้อง - คุณค่าหลักของวัฒนธรรมไทย",
    },
    icon: "👨‍👩‍👧‍👦",
    color: "#EC4899",
    culturalContext:
      "Filial piety (กตัญญูกตเวทิตา) is fundamental in Thai culture",
    keywords: {
      en: [
        "family",
        "parents",
        "support",
        "siblings",
        "relatives",
        "filial",
        "care",
      ],
      th: [
        "ครอบครัว",
        "พ่อแม่",
        "ช่วยเหลือ",
        "พี่น้อง",
        "ญาติ",
        "กตัญญู",
        "ดูแล",
      ],
    },
    subcategories: [
      {
        id: "parents_support",
        name: {
          en: "Parents Support",
          th: "ค่าเลี้ยงดูพ่อแม่",
        },
      },
      {
        id: "siblings_help",
        name: {
          en: "Siblings Help",
          th: "ช่วยเหลือพี่น้อง",
        },
      },
      {
        id: "extended_family",
        name: {
          en: "Extended Family",
          th: "ญาติพี่น้อง",
        },
      },
      {
        id: "education_support",
        name: {
          en: "Education Support",
          th: "ค่าเล่าเรียน",
        },
      },
    ],
  },
  {
    id: "festival_celebrations",
    name: {
      en: "Festival & Celebrations",
      th: "เทศกาลและงานฉลอง",
    },
    description: {
      en: "Songkran, Loy Krathong, New Year, and other Thai festivals with traditional expenses",
      th: "สงกรานต์ ลอยกระทง ปีใหม่ และเทศกาลไทยอื่นๆ พร้อมค่าใช้จ่ายตามประเพณี",
    },
    icon: "🎉",
    color: "#8B5CF6",
    culturalContext:
      "Thai festivals involve specific traditional expenses and gift-giving customs",
    keywords: {
      en: [
        "songkran",
        "loy krathong",
        "festival",
        "celebration",
        "new year",
        "tradition",
      ],
      th: ["สงกรานต์", "ลอยกระทง", "เทศกาล", "ฉลอง", "ปีใหม่", "ประเพณี"],
    },
    subcategories: [
      {
        id: "songkran",
        name: {
          en: "Songkran Festival",
          th: "เทศกาลสงกรานต์",
        },
      },
      {
        id: "loy_krathong",
        name: {
          en: "Loy Krathong",
          th: "ลอยกระทง",
        },
      },
      {
        id: "new_year",
        name: {
          en: "New Year Celebrations",
          th: "งานฉลองปีใหม่",
        },
      },
      {
        id: "traditional_ceremonies",
        name: {
          en: "Traditional Ceremonies",
          th: "พิธีกรรมประเพณี",
        },
      },
    ],
  },
  {
    id: "social_obligations",
    name: {
      en: "Social Obligations",
      th: "ภาระทางสังคม",
    },
    description: {
      en: "Wedding gifts, funeral contributions, community events - important social responsibilities",
      th: "ของขวัญงานแต่ง เงินช่วยงานศพ งานชุมชน - ความรับผิดชอบทางสังคมที่สำคัญ",
    },
    icon: "🤝",
    color: "#06B6D4",
    culturalContext:
      "Social reciprocity (การตอบแทนบุญคุณ) is essential in Thai society",
    keywords: {
      en: [
        "wedding",
        "funeral",
        "community",
        "social",
        "gift",
        "contribution",
        "ceremony",
      ],
      th: [
        "งานแต่ง",
        "งานศพ",
        "ชุมชน",
        "สังคม",
        "ของขวัญ",
        "ช่วยเหลือ",
        "พิธี",
      ],
    },
    subcategories: [
      {
        id: "wedding_gifts",
        name: {
          en: "Wedding Gifts",
          th: "ของขวัญงานแต่ง",
        },
      },
      {
        id: "funeral_contributions",
        name: {
          en: "Funeral Contributions",
          th: "เงินช่วยงานศพ",
        },
      },
      {
        id: "community_events",
        name: {
          en: "Community Events",
          th: "งานชุมชน",
        },
      },
      {
        id: "social_ceremonies",
        name: {
          en: "Social Ceremonies",
          th: "พิธีกรรมทางสังคม",
        },
      },
    ],
  },
  {
    id: "seasonal_expenses",
    name: {
      en: "Seasonal Expenses",
      th: "ค่าใช้จ่ายตามฤดูกาล",
    },
    description: {
      en: "Rainy season preparations, cool season activities, hot season cooling costs",
      th: "การเตรียมตัวสำหรับหน้าฝน กิจกรรมหน้าหนาว ค่าใช้จ่ายหน้าร้อน",
    },
    icon: "🌦️",
    color: "#10B981",
    culturalContext:
      "Thailand's three distinct seasons affect spending patterns significantly",
    keywords: {
      en: ["rainy", "season", "weather", "cooling", "heating", "seasonal"],
      th: ["ฝน", "ฤดูกาล", "อากาศ", "ทำความเย็น", "ทำความร้อน", "ตามฤดู"],
    },
    subcategories: [
      {
        id: "rainy_season",
        name: {
          en: "Rainy Season Prep",
          th: "เตรียมหน้าฝน",
        },
      },
      {
        id: "cool_season",
        name: {
          en: "Cool Season Activities",
          th: "กิจกรรมหน้าหนาว",
        },
      },
      {
        id: "hot_season",
        name: {
          en: "Hot Season Cooling",
          th: "ทำความเย็นหน้าร้อน",
        },
      },
      {
        id: "seasonal_clothing",
        name: {
          en: "Seasonal Clothing",
          th: "เสื้อผ้าตามฤดู",
        },
      },
    ],
  },
];

// Helper function to get category by ID
export function getThaiCulturalCategory(
  id: string,
): ThaiCulturalCategory | undefined {
  return THAI_CULTURAL_CATEGORIES.find((category) => category.id === id);
}

// Helper function to get categories by type
export function getThaiCategoriesByKeyword(
  keyword: string,
  language: "en" | "th" = "en",
): ThaiCulturalCategory[] {
  return THAI_CULTURAL_CATEGORIES.filter((category) =>
    category.keywords[language].some((kw) =>
      kw.toLowerCase().includes(keyword.toLowerCase()),
    ),
  );
}

// Helper function to get localized name
export function getLocalizedCategoryName(
  category: ThaiCulturalCategory,
  language: "en" | "th" = "en",
): string {
  return category.name[language];
}
