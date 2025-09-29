// Thai Festival Spending Data
export interface ThaiFestival {
  id: string;
  name: {
    en: string;
    th: string;
  };
  date: string;
  duration: number; // days
  significance: "low" | "medium" | "high" | "national";
  categories: {
    category: string;
    estimatedCost: number;
    description: {
      en: string;
      th: string;
    };
    tips: {
      en: string[];
      th: string[];
    };
  }[];
  totalEstimatedCost: number;
  culturalImportance: {
    en: string;
    th: string;
  };
  modernAdaptations: string[];
  budgetingAdvice: {
    en: string[];
    th: string[];
  };
}

export const mockFestivals: ThaiFestival[] = [
  {
    id: "songkran-2025",
    name: {
      en: "Songkran (Thai New Year)",
      th: "สงกรานต์ (วันปีใหม่ไทย)"
    },
    date: "2025-04-13",
    duration: 3,
    significance: "national",
    categories: [
      {
        category: "Travel",
        estimatedCost: 2500,
        description: {
          en: "Transportation to hometown and family visits",
          th: "การเดินทางกลับบ้านและเยี่ยมครอบครัว"
        },
        tips: {
          en: ["Book early for better prices", "Consider carpooling", "Use public transport"],
          th: ["จองล่วงหน้าเพื่อราคาดี", "พิจารณาการแบ่งรถ", "ใช้การขนส่งสาธารณะ"]
        }
      },
      {
        category: "Gifts & Offerings",
        estimatedCost: 1500,
        description: {
          en: "Presents for family and temple offerings",
          th: "ของขวัญสำหรับครอบครัวและการถวายวัด"
        },
        tips: {
          en: ["Choose meaningful over expensive", "Make homemade gifts", "Pool resources with siblings"],
          th: ["เลือกของที่มีความหมายมากกว่าแพง", "ทำของขวัญเอง", "รวมทรัพยากรกับพี่น้อง"]
        }
      },
      {
        category: "Food & Entertainment",
        estimatedCost: 1000,
        description: {
          en: "Festival meals and water festival activities",
          th: "อาหารเทศกาลและกิจกรรมเทศกาลน้ำ"
        },
        tips: {
          en: ["Cook together as family", "Attend free public events", "Limit expensive restaurants"],
          th: ["ทำอาหารร่วมกันเป็นครอบครัว", "เข้าร่วมกิจกรรมสาธารณะฟรี", "จำกัดร้านอาหารราคาแพง"]
        }
      }
    ],
    totalEstimatedCost: 5000,
    culturalImportance: {
      en: "Most important Thai festival celebrating new beginnings and family unity",
      th: "เทศกาลไทยที่สำคัญที่สุดในการเฉลิมฉลองจุดเริ่มต้นใหม่และความสามัคคีในครอบครัว"
    },
    modernAdaptations: ["Water gun festivals", "Hotel pool parties", "Cultural tourism"],
    budgetingAdvice: {
      en: [
        "Start saving 3 months before",
        "Set a festival budget limit",
        "Focus on experiences over material things",
        "Plan activities that bring family together"
      ],
      th: [
        "เริ่มออมเงิน 3 เดือนก่อน",
        "กำหนดงบประมาณเทศกาล",
        "เน้นประสบการณ์มากกว่าสิ่งของ",
        "วางแผนกิจกรรมที่ทำให้ครอบครัวมารวมตัวกัน"
      ]
    }
  },
  {
    id: "loy-krathong-2025",
    name: {
      en: "Loy Krathong",
      th: "ลอยกระทง"
    },
    date: "2025-11-12",
    duration: 1,
    significance: "high",
    categories: [
      {
        category: "Krathong Materials",
        estimatedCost: 300,
        description: {
          en: "Materials to make traditional floating baskets",
          th: "วัสดุทำกระทงแบบดั้งเดิม"
        },
        tips: {
          en: ["Use eco-friendly materials", "Make with family", "Buy materials early"],
          th: ["ใช้วัสดุที่เป็นมิตรกับสิ่งแวดล้อม", "ทำกับครอบครัว", "ซื้อวัสดุล่วงหน้า"]
        }
      },
      {
        category: "Food & Celebrations",
        estimatedCost: 800,
        description: {
          en: "Special meals and festival treats",
          th: "อาหารพิเศษและขนมเทศกาล"
        },
        tips: {
          en: ["Share meals with neighbors", "Make traditional desserts", "Attend temple events"],
          th: ["แบ่งปันอาหารกับเพื่อนบ้าน", "ทำขนมไทยแบบดั้งเดิม", "เข้าร่วมกิจกรรมที่วัด"]
        }
      }
    ],
    totalEstimatedCost: 1100,
    culturalImportance: {
      en: "Festival of lights symbolizing letting go of negativity and making wishes",
      th: "เทศกาลแสงไฟที่สื่อถึงการปล่อยวางสิ่งไม่ดีและการอธิษฐาน"
    },
    modernAdaptations: ["LED candles", "Biodegradable materials", "Instagram-worthy krathongs"],
    budgetingAdvice: {
      en: [
        "Make your own krathong to save money",
        "Use natural, free materials from nature",
        "Join community events instead of expensive private ones",
        "Focus on the spiritual meaning over elaborate decorations"
      ],
      th: [
        "ทำกระทงเองเพื่อประหยัดเงิน",
        "ใช้วัสดุธรรมชาติฟรีจากธรรมชาติ",
        "เข้าร่วมกิจกรรมชุมชนแทนงานเอกชนที่แพง",
        "เน้นความหมายทางจิตวิญญาณมากกว่าการตกแต่งที่หรูหรา"
      ]
    }
  }
];
