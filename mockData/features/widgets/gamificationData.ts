// Spending Gamification Mock Data

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedDate?: Date;
  rarity: "common" | "rare" | "epic" | "legendary";
  category: "budget" | "saving" | "spending" | "investment" | "streak";
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  target: number;
  reward: string;
  deadline: Date;
  difficulty: "easy" | "medium" | "hard";
  category: "daily" | "weekly" | "monthly";
  isCompleted: boolean;
}

export const mockSpendingAchievements: Achievement[] = [
  {
    id: "budget-ninja",
    title: "Budget Ninja",
    description: "Stay under budget for 3 consecutive months",
    icon: "🥷",
    color: "#8B5CF6",
    progress: 2,
    maxProgress: 3,
    unlocked: false,
    rarity: "rare",
    category: "budget",
  },
  {
    id: "subscription-slayer",
    title: "Subscription Slayer",
    description: "Cancel 3 unused subscriptions",
    icon: "⚔️",
    color: "#EF4444",
    progress: 3,
    maxProgress: 3,
    unlocked: true,
    unlockedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    rarity: "epic",
    category: "saving",
  },
  {
    id: "coffee-conqueror",
    title: "Coffee Conqueror",
    description: "Reduce coffee spending by 50% this month",
    icon: "☕",
    color: "#8B4513",
    progress: 7,
    maxProgress: 15,
    unlocked: false,
    rarity: "common",
    category: "spending",
  },
  {
    id: "savings-samurai",
    title: "Savings Samurai",
    description: "Save 20% of income for 6 months",
    icon: "🗾",
    color: "#10B981",
    progress: 4,
    maxProgress: 6,
    unlocked: false,
    rarity: "legendary",
    category: "saving",
  },
  {
    id: "investment-wizard",
    title: "Investment Wizard",
    description: "Make your first investment",
    icon: "🧙‍♂️",
    color: "#6366F1",
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    rarity: "rare",
    category: "investment",
  },
  {
    id: "streak-master",
    title: "Streak Master",
    description: "Track expenses for 30 consecutive days",
    icon: "🔥",
    color: "#F59E0B",
    progress: 23,
    maxProgress: 30,
    unlocked: false,
    rarity: "epic",
    category: "streak",
  },
];

export const mockSpendingChallenges: Challenge[] = [
  {
    id: "no-takeout-week",
    title: "No Takeout Week",
    description: "Cook all meals at home for 7 days",
    icon: "🍳",
    color: "#10B981",
    progress: 3,
    target: 7,
    reward: "฿500 bonus to fun budget",
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    difficulty: "medium",
    category: "weekly",
    isCompleted: false,
  },
  {
    id: "daily-expense-tracker",
    title: "Daily Expense Tracker",
    description: "Log every expense today",
    icon: "📝",
    color: "#3B82F6",
    progress: 8,
    target: 10,
    reward: "Achievement unlock",
    deadline: new Date(Date.now() + 16 * 60 * 60 * 1000),
    difficulty: "easy",
    category: "daily",
    isCompleted: false,
  },
  {
    id: "savings-sprint",
    title: "Savings Sprint",
    description: "Save ฿5,000 this month",
    icon: "💰",
    color: "#F59E0B",
    progress: 3200,
    target: 5000,
    reward: "Legendary badge",
    deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    difficulty: "hard",
    category: "monthly",
    isCompleted: false,
  },
  {
    id: "budget-balance",
    title: "Budget Balance",
    description: "Stay within budget in all categories",
    icon: "⚖️",
    color: "#8B5CF6",
    progress: 4,
    target: 7,
    reward: "Budget Master title",
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    difficulty: "hard",
    category: "weekly",
    isCompleted: false,
  },
];

// Export types for use in components
export type { Achievement, Challenge };
