// Subscription System Types - Premium features and billing
// @TODO: See TODO.md - PREMIUM FEATURES & MONETIZATION section for complete implementation

export type SubscriptionTier = "free" | "premium" | "family";
export type SubscriptionStatus =
  | "active"
  | "inactive"
  | "cancelled"
  | "past_due"
  | "trialing";
export type BillingInterval = "monthly" | "yearly";
export type PaymentMethod =
  | "stripe"
  | "promptpay"
  | "truemoney"
  | "apple_pay"
  | "google_pay";

export interface SubscriptionPlan {
  id: string;
  tier: SubscriptionTier;
  name: {
    en: string;
    th: string;
  };
  description: {
    en: string;
    th: string;
  };
  pricing: {
    monthly: {
      amount: number;
      currency: string;
      originalAmount?: number; // For showing discounts
    };
    yearly: {
      amount: number;
      currency: string;
      originalAmount?: number;
      monthlyEquivalent: number;
      savings: number; // Amount saved compared to monthly
    };
  };
  features: PlanFeature[];
  limits: PlanLimits;
  isPopular?: boolean;
  trialDays?: number;
  stripePriceIds: {
    monthly: string;
    yearly: string;
  };
}

export interface PlanFeature {
  id: string;
  name: {
    en: string;
    th: string;
  };
  description: {
    en: string;
    th: string;
  };
  included: boolean;
  icon: string;
  category: "core" | "ai" | "social" | "analytics" | "support";
}

export interface PlanLimits {
  maxGoals: number | "unlimited";
  maxAccounts: number | "unlimited";
  maxCategories: number | "unlimited";
  maxFamilyMembers: number;
  aiInsightsPerMonth: number | "unlimited";
  exportFormats: string[];
  dataRetentionMonths: number | "unlimited";
  prioritySupport: boolean;
  advancedAnalytics: boolean;
  customCategories: boolean;
  investmentTracking: boolean;
  taxOptimization: boolean;
  culturalInsights: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  billingInterval: BillingInterval;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  trialStart?: string;
  trialEnd?: string;
  cancelledAt?: string;
  cancelAtPeriodEnd: boolean;
  paymentMethod: PaymentMethod;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  familyMembers?: FamilyMember[];
  usage: SubscriptionUsage;
  createdAt: string;
  updatedAt: string;
}

export interface FamilyMember {
  id: string;
  email: string;
  name: string;
  role: "admin" | "member";
  status: "invited" | "active" | "suspended";
  invitedAt: string;
  joinedAt?: string;
}

export interface SubscriptionUsage {
  currentGoals: number;
  currentAccounts: number;
  currentCategories: number;
  aiInsightsUsed: number;
  lastResetDate: string;
  familyMembersCount: number;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  clientSecret?: string;
  status:
    | "requires_payment_method"
    | "requires_confirmation"
    | "processing"
    | "succeeded"
    | "cancelled";
  metadata: {
    planId: string;
    billingInterval: BillingInterval;
    userId: string;
  };
}

export interface SubscriptionAnalytics {
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  annualRecurringRevenue: number;
  customerLifetimeValue: number;
  churnRate: number;
  conversionRate: number;
  trialToPayedConversion: number;
  upgradeRate: number;
  downgradRate: number;
  cancellationReasons: { [reason: string]: number };
}

export interface PremiumFeatureGate {
  featureId: string;
  requiredTier: SubscriptionTier;
  name: {
    en: string;
    th: string;
  };
  description: {
    en: string;
    th: string;
  };
  upgradeMessage: {
    en: string;
    th: string;
  };
  icon: string;
  category: string;
  isEnabled: boolean;
}

// Default subscription plans
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    tier: "free",
    name: {
      en: "Free",
      th: "ฟรี",
    },
    description: {
      en: "Perfect for getting started with your financial journey",
      th: "เหมาะสำหรับเริ่มต้นการเดินทางทางการเงิน",
    },
    pricing: {
      monthly: {
        amount: 0,
        currency: "THB",
      },
      yearly: {
        amount: 0,
        currency: "THB",
        monthlyEquivalent: 0,
        savings: 0,
      },
    },
    features: [
      {
        id: "basic_tracking",
        name: {
          en: "Basic Expense Tracking",
          th: "การติดตามค่าใช้จ่ายพื้นฐาน",
        },
        description: {
          en: "Track your daily expenses",
          th: "ติดตามค่าใช้จ่ายประจำวัน",
        },
        included: true,
        icon: "📊",
        category: "core",
      },
      {
        id: "limited_goals",
        name: { en: "3 Financial Goals", th: "เป้าหมายการเงิน 3 รายการ" },
        description: {
          en: "Set up to 3 savings goals",
          th: "ตั้งเป้าหมายการออมได้สูงสุด 3 รายการ",
        },
        included: true,
        icon: "🎯",
        category: "core",
      },
      {
        id: "basic_insights",
        name: { en: "Basic Insights", th: "ข้อมูลเชิงลึกพื้นฐาน" },
        description: {
          en: "Simple spending analysis",
          th: "การวิเคราะห์การใช้จ่ายแบบง่าย",
        },
        included: true,
        icon: "💡",
        category: "ai",
      },
    ],
    limits: {
      maxGoals: 3,
      maxAccounts: 2,
      maxCategories: 10,
      maxFamilyMembers: 0,
      aiInsightsPerMonth: 5,
      exportFormats: ["pdf"],
      dataRetentionMonths: 12,
      prioritySupport: false,
      advancedAnalytics: false,
      customCategories: false,
      investmentTracking: false,
      taxOptimization: false,
      culturalInsights: false,
    },
    stripePriceIds: {
      monthly: "",
      yearly: "",
    },
  },
  {
    id: "premium",
    tier: "premium",
    name: {
      en: "Premium",
      th: "พรีเมี่ยม",
    },
    description: {
      en: "Advanced features for serious financial growth",
      th: "ฟีเจอร์ขั้นสูงสำหรับการเติบโตทางการเงินอย่างจริงจัง",
    },
    pricing: {
      monthly: {
        amount: 299,
        currency: "THB",
      },
      yearly: {
        amount: 2990,
        currency: "THB",
        monthlyEquivalent: 249,
        savings: 598,
      },
    },
    features: [
      {
        id: "unlimited_goals",
        name: { en: "Unlimited Goals", th: "เป้าหมายไม่จำกัด" },
        description: {
          en: "Create as many goals as you want",
          th: "สร้างเป้าหมายได้ไม่จำกัด",
        },
        included: true,
        icon: "🚀",
        category: "core",
      },
      {
        id: "advanced_ai",
        name: { en: "Advanced AI Insights", th: "ข้อมูลเชิงลึก AI ขั้นสูง" },
        description: {
          en: "Personalized recommendations and predictions",
          th: "คำแนะนำและการทำนายแบบส่วนตัว",
        },
        included: true,
        icon: "🤖",
        category: "ai",
      },
      {
        id: "investment_tracking",
        name: { en: "Investment Tracking", th: "ติดตามการลงทุน" },
        description: {
          en: "Monitor your investment portfolio",
          th: "ติดตามพอร์ตการลงทุนของคุณ",
        },
        included: true,
        icon: "📈",
        category: "analytics",
      },
    ],
    limits: {
      maxGoals: "unlimited",
      maxAccounts: "unlimited",
      maxCategories: "unlimited",
      maxFamilyMembers: 0,
      aiInsightsPerMonth: "unlimited",
      exportFormats: ["pdf", "excel", "csv"],
      dataRetentionMonths: "unlimited",
      prioritySupport: true,
      advancedAnalytics: true,
      customCategories: true,
      investmentTracking: true,
      taxOptimization: true,
      culturalInsights: true,
    },
    isPopular: true,
    trialDays: 14,
    stripePriceIds: {
      monthly: "price_premium_monthly",
      yearly: "price_premium_yearly",
    },
  },
  {
    id: "family",
    tier: "family",
    name: {
      en: "Family",
      th: "ครอบครัว",
    },
    description: {
      en: "Perfect for families managing finances together",
      th: "เหมาะสำหรับครอบครัวที่จัดการการเงินร่วมกัน",
    },
    pricing: {
      monthly: {
        amount: 499,
        currency: "THB",
      },
      yearly: {
        amount: 4990,
        currency: "THB",
        monthlyEquivalent: 416,
        savings: 998,
      },
    },
    features: [
      {
        id: "family_sharing",
        name: { en: "Family Sharing (5 members)", th: "แชร์ครอบครัว (5 คน)" },
        description: {
          en: "Share financial goals with family",
          th: "แชร์เป้าหมายการเงินกับครอบครัว",
        },
        included: true,
        icon: "👨‍👩‍👧‍👦",
        category: "social",
      },
      {
        id: "family_dashboard",
        name: { en: "Family Dashboard", th: "แดชบอร์ดครอบครัว" },
        description: {
          en: "Unified view of family finances",
          th: "มุมมองรวมของการเงินครอบครัว",
        },
        included: true,
        icon: "📊",
        category: "core",
      },
      {
        id: "parental_controls",
        name: { en: "Parental Controls", th: "การควบคุมของผู้ปกครอง" },
        description: {
          en: "Manage children's spending",
          th: "จัดการการใช้จ่ายของเด็ก",
        },
        included: true,
        icon: "🔒",
        category: "core",
      },
    ],
    limits: {
      maxGoals: "unlimited",
      maxAccounts: "unlimited",
      maxCategories: "unlimited",
      maxFamilyMembers: 5,
      aiInsightsPerMonth: "unlimited",
      exportFormats: ["pdf", "excel", "csv"],
      dataRetentionMonths: "unlimited",
      prioritySupport: true,
      advancedAnalytics: true,
      customCategories: true,
      investmentTracking: true,
      taxOptimization: true,
      culturalInsights: true,
    },
    trialDays: 14,
    stripePriceIds: {
      monthly: "price_family_monthly",
      yearly: "price_family_yearly",
    },
  },
];

// Premium feature gates configuration
export const PREMIUM_FEATURES: PremiumFeatureGate[] = [
  {
    featureId: "unlimited_goals",
    requiredTier: "premium",
    name: { en: "Unlimited Goals", th: "เป้าหมายไม่จำกัด" },
    description: {
      en: "Create unlimited financial goals",
      th: "สร้างเป้าหมายการเงินได้ไม่จำกัด",
    },
    upgradeMessage: {
      en: "Upgrade to Premium to create unlimited goals",
      th: "อัปเกรดเป็น Premium เพื่อสร้างเป้าหมายได้ไม่จำกัด",
    },
    icon: "🎯",
    category: "goals",
    isEnabled: true,
  },
  {
    featureId: "advanced_ai_insights",
    requiredTier: "premium",
    name: { en: "Advanced AI Insights", th: "ข้อมูลเชิงลึก AI ขั้นสูง" },
    description: {
      en: "Get personalized AI recommendations",
      th: "รับคำแนะนำ AI แบบส่วนตัว",
    },
    upgradeMessage: {
      en: "Upgrade to Premium for unlimited AI insights",
      th: "อัปเกรดเป็น Premium เพื่อใช้ AI ไม่จำกัด",
    },
    icon: "🤖",
    category: "ai",
    isEnabled: true,
  },
  {
    featureId: "investment_tracking",
    requiredTier: "premium",
    name: { en: "Investment Tracking", th: "ติดตามการลงทุน" },
    description: {
      en: "Monitor your investment portfolio",
      th: "ติดตามพอร์ตการลงทุน",
    },
    upgradeMessage: {
      en: "Upgrade to Premium to track investments",
      th: "อัปเกรดเป็น Premium เพื่อติดตามการลงทุน",
    },
    icon: "📈",
    category: "investments",
    isEnabled: true,
  },
  {
    featureId: "family_sharing",
    requiredTier: "family",
    name: { en: "Family Sharing", th: "แชร์ครอบครัว" },
    description: {
      en: "Share finances with family members",
      th: "แชร์การเงินกับสมาชิกครอบครัว",
    },
    upgradeMessage: {
      en: "Upgrade to Family plan for family sharing",
      th: "อัปเกรดเป็นแพ็คครอบครัวเพื่อแชร์กับครอบครัว",
    },
    icon: "👨‍👩‍👧‍👦",
    category: "family",
    isEnabled: true,
  },
  {
    featureId: "advanced_analytics",
    requiredTier: "premium",
    name: { en: "Advanced Analytics", th: "การวิเคราะห์ขั้นสูง" },
    description: {
      en: "Detailed financial reports and trends",
      th: "รายงานการเงินและแนวโน้มแบบละเอียด",
    },
    upgradeMessage: {
      en: "Upgrade to Premium for advanced analytics",
      th: "อัปเกรดเป็น Premium เพื่อใช้การวิเคราะห์ขั้นสูง",
    },
    icon: "📊",
    category: "analytics",
    isEnabled: true,
  },
  {
    featureId: "priority_support",
    requiredTier: "premium",
    name: { en: "Priority Support", th: "การสนับสนุนลำดับแรก" },
    description: {
      en: "Get priority customer support",
      th: "รับการสนับสนุนลูกค้าลำดับแรก",
    },
    upgradeMessage: {
      en: "Upgrade to Premium for priority support",
      th: "อัปเกรดเป็น Premium เพื่อรับการสนับสนุนลำดับแรก",
    },
    icon: "🎧",
    category: "support",
    isEnabled: true,
  },
];

export default {
  SUBSCRIPTION_PLANS,
  PREMIUM_FEATURES,
};
