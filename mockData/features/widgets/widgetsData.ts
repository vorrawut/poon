// Widgets Mock Data - Future Missions, Achievements, and Gamification

export interface Mission {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: string;
  theme: string;
  icon: string;
  color: string;
  priority: string;
  isCompleted: boolean;
  createdAt: Date;
  transactions: any[];
  notes: string[];
  milestones: {
    percentage: number;
    label: string;
    achieved: boolean;
    achievedDate?: Date;
  }[];
}

export const mockFutureMissions: Mission[] = [
  {
    id: "japan-trip",
    name: "Travel to Japan 🗾",
    description: "Dream vacation to explore Tokyo, Kyoto, and Mount Fuji",
    targetAmount: 150000,
    currentAmount: 87500,
    deadline: new Date("2025-03-15"),
    category: "travel",
    theme: "rocket",
    icon: "🗾",
    color: "#FF6B6B",
    priority: "high",
    isCompleted: false,
    createdAt: new Date("2024-01-15"),
    transactions: [],
    notes: ["Save ฿10,000 per month", "Book flights by December"],
    milestones: [
      {
        percentage: 25,
        label: "Launch",
        achieved: true,
        achievedDate: new Date("2024-03-01"),
      },
      {
        percentage: 50,
        label: "In Orbit",
        achieved: true,
        achievedDate: new Date("2024-06-15"),
      },
      { percentage: 75, label: "Deep Space", achieved: false },
      { percentage: 100, label: "Arrival", achieved: false },
    ],
  },
  {
    id: "emergency-fund",
    name: "Emergency Fund 🛡️",
    description: "6 months of expenses for financial security",
    targetAmount: 300000,
    currentAmount: 195000,
    deadline: new Date("2025-06-01"),
    category: "emergency",
    theme: "station",
    icon: "🛡️",
    color: "#4ECDC4",
    priority: "critical",
    isCompleted: false,
    createdAt: new Date("2024-02-01"),
    transactions: [],
    notes: ["Auto-save ฿15,000 monthly", "High-yield savings account"],
    milestones: [
      { percentage: 25, label: "Foundation", achieved: true, achievedDate: new Date("2024-04-01") },
      { percentage: 50, label: "Structure", achieved: true, achievedDate: new Date("2024-07-01") },
      { percentage: 75, label: "Systems", achieved: false },
      { percentage: 100, label: "Complete", achieved: false },
    ],
  },
  {
    id: "house-downpayment",
    name: "Dream House 🏠",
    description: "Down payment for our first home",
    targetAmount: 800000,
    currentAmount: 320000,
    deadline: new Date("2026-12-31"),
    category: "housing",
    theme: "planet",
    icon: "🏠",
    color: "#45B7D1",
    priority: "medium",
    isCompleted: false,
    createdAt: new Date("2024-01-01"),
    transactions: [],
    notes: ["Research neighborhoods", "Pre-approval by 2025"],
    milestones: [
      { percentage: 25, label: "Orbit", achieved: true, achievedDate: new Date("2024-05-01") },
      { percentage: 50, label: "Atmosphere", achieved: false },
      { percentage: 75, label: "Surface", achieved: false },
      { percentage: 100, label: "Landing", achieved: false },
    ],
  },
];

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export const mockSpendingAchievements: Achievement[] = [
  {
    id: "budget_master",
    title: "Budget Master",
    description: "Stay under budget for 30 consecutive days",
    icon: "🎯",
    earned: true,
    rarity: "epic",
  },
  {
    id: "savings_streak",
    title: "Savings Streak",
    description: "Save money for 7 days in a row",
    icon: "💰",
    earned: true,
    rarity: "rare",
  },
  {
    id: "investment_guru",
    title: "Investment Guru",
    description: "Make 10 investment transactions",
    icon: "📈",
    earned: false,
    progress: 70,
    rarity: "legendary",
  },
  {
    id: "frugal_hero",
    title: "Frugal Hero",
    description: "Reduce spending by 20% in a month",
    icon: "🦸",
    earned: false,
    progress: 45,
    rarity: "rare",
  },
];

export interface Challenge {
  id: string;
  name: string;
  description: string;
  progress: number;
  target: number;
  reward: string;
  difficulty: "easy" | "medium" | "hard";
  timeLeft: string;
}

export const mockSpendingChallenges: Challenge[] = [
  {
    id: "no_coffee",
    name: "Coffee Break Challenge",
    description: "Skip coffee shop visits for a week",
    progress: 85,
    target: 100,
    reward: "🏆 $50 bonus to savings",
    difficulty: "medium",
    timeLeft: "1 day",
  },
  {
    id: "cook_home",
    name: "Home Chef Master",
    description: "Cook all meals at home for 5 days",
    progress: 60,
    target: 100,
    reward: "🍳 Recipe collection unlock",
    difficulty: "easy",
    timeLeft: "2 days",
  },
  {
    id: "transport_save",
    name: "Green Commuter",
    description: "Use public transport for all trips this week",
    progress: 30,
    target: 100,
    reward: "🚌 $100 transport credit",
    difficulty: "hard",
    timeLeft: "4 days",
  },
];

export interface RecurringPayment {
  id: string;
  name: string;
  amount: number;
  frequency: string;
  nextPayment: string;
  category: string;
  color: string;
  icon: string;
  isActive: boolean;
  canCancel: boolean;
}

export const mockRecurringPayments: RecurringPayment[] = [
  {
    id: "netflix",
    name: "Netflix",
    amount: 419,
    frequency: "Monthly",
    nextPayment: "2024-10-15",
    category: "Entertainment",
    color: "#E50914",
    icon: "🎬",
    isActive: true,
    canCancel: true,
  },
  {
    id: "spotify",
    name: "Spotify Premium",
    amount: 149,
    frequency: "Monthly",
    nextPayment: "2024-10-08",
    category: "Entertainment",
    color: "#1DB954",
    icon: "🎵",
    isActive: true,
    canCancel: true,
  },
  {
    id: "gym",
    name: "Fitness Membership",
    amount: 1200,
    frequency: "Monthly",
    nextPayment: "2024-10-01",
    category: "Health",
    color: "#FF6B35",
    icon: "💪",
    isActive: true,
    canCancel: false,
  },
  {
    id: "insurance",
    name: "Health Insurance",
    amount: 3500,
    frequency: "Monthly",
    nextPayment: "2024-10-01",
    category: "Insurance",
    color: "#4A90E2",
    icon: "🛡️",
    isActive: true,
    canCancel: false,
  },
];

export interface SpendingInsight {
  id: string;
  title: string;
  message: string;
  type: "warning" | "opportunity" | "celebration" | "tip";
  icon: string;
  actionable: boolean;
  category?: string;
  amount?: number;
  trend?: "up" | "down" | "stable";
}

export const mockSpendingInsights: SpendingInsight[] = [
  {
    id: "coffee_alert",
    title: "Coffee Spending Spike",
    message: "Your coffee expenses increased by 45% this month. Consider brewing at home to save ฿1,200/month!",
    type: "warning",
    icon: "☕",
    actionable: true,
    category: "Food & Dining",
    amount: 1200,
    trend: "up",
  },
  {
    id: "savings_win",
    title: "Savings Milestone",
    message: "Congratulations! You've saved 25% more than last month. You're on track to reach your emergency fund goal!",
    type: "celebration",
    icon: "🎉",
    actionable: false,
    category: "Savings",
    trend: "up",
  },
  {
    id: "subscription_review",
    title: "Subscription Audit",
    message: "You have 8 active subscriptions totaling ฿2,847/month. Review and cancel unused ones to save money.",
    type: "opportunity",
    icon: "📱",
    actionable: true,
    category: "Subscriptions",
    amount: 2847,
  },
  {
    id: "investment_tip",
    title: "Investment Opportunity",
    message: "You have ฿15,000 in low-yield savings. Consider moving some to investments for better returns.",
    type: "tip",
    icon: "📈",
    actionable: true,
    category: "Investments",
    amount: 15000,
  },
];
