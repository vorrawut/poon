// Spending Gamification Mock Data
export interface Achievement {
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
  category: "budget" | "saving" | "spending" | "streak";
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  reward: string;
  deadline: Date;
  difficulty: "easy" | "medium" | "hard";
  icon: string;
  color: string;
  active: boolean;
}

export interface StreakData {
  current: number;
  longest: number;
  thisMonth: number;
  level: number;
  nextLevelAt: number;
}

export const mockAchievements: Achievement[] = [
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
    id: "spending-tracker",
    title: "Spending Tracker",
    description: "Log expenses for 7 consecutive days",
    icon: "📊",
    color: "#10B981",
    progress: 7,
    maxProgress: 7,
    unlocked: true,
    unlockedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    rarity: "common",
    category: "spending",
  },
  {
    id: "savings-master",
    title: "Savings Master",
    description: "Save 20% of income for one month",
    icon: "💎",
    color: "#F59E0B",
    progress: 18,
    maxProgress: 20,
    unlocked: false,
    rarity: "legendary",
    category: "saving",
  },
  {
    id: "streak-champion",
    title: "Streak Champion",
    description: "Maintain a 30-day spending streak",
    icon: "🔥",
    color: "#FF6B35",
    progress: 25,
    maxProgress: 30,
    unlocked: false,
    rarity: "epic",
    category: "streak",
  },
];

export const mockChallenges: Challenge[] = [
  {
    id: "no-coffee-week",
    title: "No Coffee Shop Week",
    description: "Avoid coffee shop purchases for 7 days",
    target: 7,
    current: 4,
    reward: "฿500 bonus to savings",
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    difficulty: "medium",
    icon: "☕",
    color: "#8B4513",
    active: true,
  },
  {
    id: "meal-prep-master",
    title: "Meal Prep Master",
    description: "Cook at home for 5 out of 7 days",
    target: 5,
    current: 3,
    reward: "Cooking Badge + ฿300",
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    difficulty: "easy",
    icon: "🍳",
    color: "#FF6B6B",
    active: true,
  },
  {
    id: "transport-saver",
    title: "Transport Saver",
    description: "Use public transport instead of ride-sharing 10 times",
    target: 10,
    current: 7,
    reward: "Eco Warrior Badge",
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    difficulty: "hard",
    icon: "🚌",
    color: "#4ECDC4",
    active: true,
  },
];

export const mockStreakData: StreakData = {
  current: 15,
  longest: 42,
  thisMonth: 15,
  level: 3,
  nextLevelAt: 30,
};

export const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "#9CA3AF";
    case "rare":
      return "#3B82F6";
    case "epic":
      return "#8B5CF6";
    case "legendary":
      return "#F59E0B";
    default:
      return "#9CA3AF";
  }
};

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "#10B981";
    case "medium":
      return "#F59E0B";
    case "hard":
      return "#EF4444";
    default:
      return "#9CA3AF";
  }
};

export const getProgressPercentage = (current: number, max: number) => {
  return Math.min((current / max) * 100, 100);
};

export default {
  mockAchievements,
  mockChallenges,
  mockStreakData,
  getRarityColor,
  getDifficultyColor,
  getProgressPercentage,
};
