// AI Coaching Mock Data

export interface PersonalizedTip {
  id: string;
  type: "spending" | "saving" | "investing" | "budgeting" | "cultural";
  title: {
    en: string;
    th: string;
  };
  content: {
    en: string;
    th: string;
  };
  priority: "low" | "medium" | "high";
  category: string;
  confidence: number; // 0-100
  actionable: boolean;
  estimatedImpact: {
    timeframe: "immediate" | "short_term" | "long_term";
    amount: number;
    description: {
      en: string;
      th: string;
    };
  };
  culturalContext?: {
    en: string;
    th: string;
  };
  createdAt: Date;
  isRead: boolean;
  isImplemented?: boolean;
}

export interface MotivationalMessage {
  id: string;
  type: "encouraging" | "celebratory" | "motivational" | "educational";
  title: {
    en: string;
    th: string;
  };
  message: {
    en: string;
    th: string;
  };
  mood: "positive" | "neutral" | "inspiring";
  context: "goal_progress" | "spending_pattern" | "achievement" | "daily_check_in";
  personalizedFor: string; // user context
  culturalWisdom?: {
    en: string;
    th: string;
  };
  actionSuggestion?: {
    en: string;
    th: string;
  };
  timestamp: Date;
}

// Mock Data
export const mockPersonalizedTips: PersonalizedTip[] = [
  {
    id: "tip-1",
    type: "spending",
    title: {
      en: "Reduce Coffee Shop Visits",
      th: "ลดการไปร้านกาแฟ"
    },
    content: {
      en: "You've spent 2,400 baht on coffee this month. Making coffee at home could save you 1,800 baht monthly.",
      th: "คุณใช้จ่ายกับกาแฟ 2,400 บาทในเดือนนี้ การชงกาแฟที่บ้านจะช่วยประหยัดได้ 1,800 บาทต่อเดือน"
    },
    priority: "medium",
    category: "Food & Beverages",
    confidence: 85,
    actionable: true,
    estimatedImpact: {
      timeframe: "short_term",
      amount: 1800,
      description: {
        en: "Monthly savings by brewing coffee at home",
        th: "การประหยัดรายเดือนจากการชงกาแฟที่บ้าน"
      }
    },
    culturalContext: {
      en: "Consider traditional Thai iced coffee recipes for variety",
      th: "ลองสูตรกาแฟเย็นไทยแบบดั้งเดิมเพื่อความหลากหลาย"
    },
    createdAt: new Date("2024-12-14T10:00:00Z"),
    isRead: false
  },
  {
    id: "tip-2", 
    type: "saving",
    title: {
      en: "Automate Your Savings",
      th: "ทำการออมเงินอัตโนมัติ"
    },
    content: {
      en: "Set up automatic transfers of 3,000 baht to your savings account every payday to reach your emergency fund goal faster.",
      th: "ตั้งการโอนเงินอัตโนมัติ 3,000 บาทไปยังบัญชีออมทรัพย์ทุกวันจ่ายเงินเดือนเพื่อให้ถึงเป้าหมายกองทุนฉุกเฉินเร็วขึ้น"
    },
    priority: "high",
    category: "Emergency Fund",
    confidence: 92,
    actionable: true,
    estimatedImpact: {
      timeframe: "long_term",
      amount: 36000,
      description: {
        en: "Annual automated savings",
        th: "การออมอัตโนมัติรายปี"
      }
    },
    createdAt: new Date("2024-12-13T14:30:00Z"),
    isRead: true
  },
  {
    id: "tip-3",
    type: "cultural",
    title: {
      en: "Songkran Festival Budget Planning",
      th: "การวางแผนงบประมาณเทศกาลสงกรานต์"
    },
    content: {
      en: "Songkran is approaching in 4 months. Based on your spending patterns, consider saving 1,250 baht monthly to have 5,000 baht ready for the festival.",
      th: "สงกรานต์ใกล้เข้ามาแล้วใน 4 เดือน ตามรูปแบบการใช้จ่ายของคุณ ควรออมเงิน 1,250 บาทต่อเดือนเพื่อให้มี 5,000 บาทพร้อมสำหรับเทศกาล"
    },
    priority: "medium",
    category: "Cultural Events",
    confidence: 78,
    actionable: true,
    estimatedImpact: {
      timeframe: "short_term",
      amount: 5000,
      description: {
        en: "Festival budget preparation",
        th: "การเตรียมงบประมาณเทศกาล"
      }
    },
    culturalContext: {
      en: "Traditional Thai New Year celebration requires budget for travel, gifts, and temple offerings",
      th: "การเฉลิมฉลองปีใหม่ไทยแบบดั้งเดิมต้องใช้งบประมาณสำหรับการเดินทาง ของขวัญ และการถวายวัด"
    },
    createdAt: new Date("2024-12-12T16:45:00Z"),
    isRead: false
  }
];

export const mockMessages: MotivationalMessage[] = [
  {
    id: "msg-1",
    type: "encouraging",
    title: {
      en: "You're Doing Great!",
      th: "คุณทำได้ดีมาก!"
    },
    message: {
      en: "You've consistently saved money for 15 days straight. Your dedication to your financial goals is inspiring!",
      th: "คุณออมเงินอย่างสม่ำเสมอมา 15 วันติดต่อกัน ความมุ่งมั่นต่อเป้าหมายทางการเงินของคุณเป็นแรงบันดาลใจ!"
    },
    mood: "positive",
    context: "goal_progress",
    personalizedFor: "15-day savings streak",
    culturalWisdom: {
      en: "As Thai wisdom says: 'Drop by drop fills the pot' - น้ำหยดเป็นแก้ว",
      th: "ตามภูมิปัญญาไทยที่ว่า 'น้ำหยดเป็นแก้ว' - การออมเงินเล็กน้อยแต่สม่ำเสมอจะกลายเป็นจำนวนมาก"
    },
    actionSuggestion: {
      en: "Keep this momentum going! Consider increasing your daily savings by just 50 baht.",
      th: "รักษาจังหวะนี้ไว้! ลองเพิ่มการออมรายวันเพียง 50 บาท"
    },
    timestamp: new Date("2024-12-15T09:00:00Z")
  },
  {
    id: "msg-2",
    type: "celebratory",
    title: {
      en: "Milestone Achievement! 🎉",
      th: "ความสำเร็จสำคัญ! 🎉"
    },
    message: {
      en: "Congratulations! You've reached 50% of your emergency fund goal. You're halfway to financial security!",
      th: "ขอแสดงความยินดี! คุณถึง 50% ของเป้าหมายกองทุนฉุกเฉินแล้ว คุณอยู่ครึ่งทางสู่ความมั่นคงทางการเงิน!"
    },
    mood: "inspiring",
    context: "achievement",
    personalizedFor: "emergency fund milestone",
    culturalWisdom: {
      en: "Thai saying: 'Patience brings success' - ความอดทนนำมาซึ่งความสำเร็จ",
      th: "คำกล่าวไทย: 'ความอดทนนำมาซึ่งความสำเร็จ'"
    },
    actionSuggestion: {
      en: "You're on the right track! The second half will feel easier now that you have the habit.",
      th: "คุณอยู่ในทางที่ถูกต้อง! ครึ่งหลังจะรู้สึกง่ายขึ้นเมื่อคุณมีนิสัยแล้ว"
    },
    timestamp: new Date("2024-12-14T18:30:00Z")
  },
  {
    id: "msg-3",
    type: "motivational",
    title: {
      en: "Weekly Financial Wisdom",
      th: "ภูมิปัญญาการเงินประจำสัปดาห์"
    },
    message: {
      en: "Remember: every small step counts. Your future self will thank you for the financial discipline you're building today.",
      th: "จำไว้ว่า: ทุกก้าวเล็กๆ มีความหมาย ตัวคุณในอนาคตจะขขอบคุณสำหรับวินัยทางการเงินที่คุณกำลังสร้างในวันนี้"
    },
    mood: "inspiring",
    context: "daily_check_in",
    personalizedFor: "weekly motivation",
    culturalWisdom: {
      en: "Thai wisdom: 'Today's sweat is tomorrow's comfort' - เหงื่อวันนี้คือความสุขวันพรุ่งนี้",
      th: "ภูมิปัญญาไทย: 'เหงื่อวันนี้คือความสุขวันพรุ่งนี้'"
    },
    timestamp: new Date("2024-12-15T07:00:00Z")
  }
];
