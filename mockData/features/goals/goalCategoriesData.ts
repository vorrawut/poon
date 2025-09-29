// Goal Categories Data
export interface GoalCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface GoalPriority {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface GoalTemplate {
  id: string;
  name: string;
  description: string;
  category: "emergency" | "travel" | "house" | "car" | "investment" | "education" | "other";
  icon: string;
  targetAmount: number;
  suggestedTimeframe: number; // months
  priority: "low" | "medium" | "high";
  tags: string[];
  tips: string[];
}

export const categoryOptions: GoalCategory[] = [
  {
    id: "emergency",
    name: "Emergency Fund",
    icon: "🛡️",
    color: "#EF4444",
    description: "Build your financial safety net",
  },
  {
    id: "travel",
    name: "Travel",
    icon: "✈️",
    color: "#3B82F6",
    description: "Explore the world",
  },
  {
    id: "house",
    name: "House",
    icon: "🏠",
    color: "#10B981",
    description: "Your dream home",
  },
  {
    id: "car",
    name: "Car",
    icon: "🚗",
    color: "#F59E0B",
    description: "Transportation goals",
  },
  {
    id: "investment",
    name: "Investment",
    icon: "📈",
    color: "#8B5CF6",
    description: "Build your wealth",
  },
  {
    id: "education",
    name: "Education",
    icon: "🎓",
    color: "#EC4899",
    description: "Invest in knowledge",
  },
  {
    id: "other",
    name: "Other",
    icon: "🎯",
    color: "#6B7280",
    description: "Custom goals",
  },
];

export const priorityOptions: GoalPriority[] = [
  {
    id: "low",
    name: "Low Priority",
    icon: "⭐",
    color: "#6B7280",
    description: "Nice to have, flexible timeline",
  },
  {
    id: "medium",
    name: "Medium Priority",
    icon: "⭐⭐",
    color: "#F59E0B",
    description: "Important, moderate urgency",
  },
  {
    id: "high",
    name: "High Priority",
    icon: "⭐⭐⭐",
    color: "#EF4444",
    description: "Critical, urgent timeline",
  },
];

export const goalTemplates: GoalTemplate[] = [
  {
    id: "emergency_3months",
    name: "3-Month Emergency Fund",
    description: "Cover 3 months of expenses for unexpected situations",
    category: "emergency",
    icon: "🛡️",
    targetAmount: 150000, // ฿150,000
    suggestedTimeframe: 12,
    priority: "high",
    tags: ["emergency", "security", "essential"],
    tips: [
      "Start with ฿10,000 as your first milestone",
      "Automate savings of 20% of income",
      "Keep in high-yield savings account",
    ],
  },
  {
    id: "japan_trip",
    name: "Japan Vacation",
    description: "7-day trip to Japan including flights, accommodation, and activities",
    category: "travel",
    icon: "🗾",
    targetAmount: 80000, // ฿80,000
    suggestedTimeframe: 8,
    priority: "medium",
    tags: ["travel", "vacation", "japan"],
    tips: [
      "Book flights 3 months in advance for better rates",
      "Consider traveling during shoulder season",
      "Budget ฿5,000 per day for expenses",
    ],
  },
  {
    id: "condo_downpayment",
    name: "Condo Down Payment",
    description: "20% down payment for a 3-million baht condominium",
    category: "house",
    icon: "🏢",
    targetAmount: 600000, // ฿600,000
    suggestedTimeframe: 36,
    priority: "high",
    tags: ["property", "investment", "home"],
    tips: [
      "Research locations with good growth potential",
      "Factor in additional costs (transfer fees, etc.)",
      "Consider government first-home buyer programs",
    ],
  },
  {
    id: "car_honda_city",
    name: "Honda City",
    description: "New Honda City with full insurance and registration",
    category: "car",
    icon: "🚙",
    targetAmount: 200000, // ฿200,000 down payment
    suggestedTimeframe: 18,
    priority: "medium",
    tags: ["transportation", "car", "honda"],
    tips: [
      "Compare financing options from banks and dealers",
      "Factor in insurance, tax, and maintenance costs",
      "Consider certified pre-owned for better value",
    ],
  },
  {
    id: "investment_portfolio",
    name: "Investment Portfolio",
    description: "Diversified portfolio for long-term wealth building",
    category: "investment",
    icon: "💼",
    targetAmount: 100000, // ฿100,000 initial investment
    suggestedTimeframe: 6,
    priority: "medium",
    tags: ["investment", "wealth", "portfolio"],
    tips: [
      "Start with low-cost index funds",
      "Diversify across asset classes",
      "Invest regularly regardless of market conditions",
    ],
  },
  {
    id: "mba_degree",
    name: "MBA Degree",
    description: "Master's in Business Administration from top university",
    category: "education",
    icon: "👨‍🎓",
    targetAmount: 500000, // ฿500,000
    suggestedTimeframe: 24,
    priority: "medium",
    tags: ["education", "mba", "career"],
    tips: [
      "Research scholarship opportunities",
      "Consider part-time programs if working",
      "Factor in opportunity cost of time",
    ],
  },
];
