// Time Capsule Mock Data
export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: Date;
  amount?: number;
  category: "income" | "savings" | "investment" | "achievement" | "goal";
  icon: string;
  color: string;
  isLocked: boolean;
  unlockDate?: Date;
  rarity: "common" | "rare" | "epic" | "legendary";
  memories: string[];
  futureValue?: number;
}

export const mockMilestones: Milestone[] = [
  {
    id: "first-paycheck",
    title: "First Paycheck 💼",
    description:
      "Received your very first salary payment - the beginning of your financial journey!",
    date: new Date("2024-01-15"),
    amount: 85000,
    category: "income",
    icon: "💼",
    color: "#3B82F6",
    isLocked: false,
    rarity: "legendary",
    memories: [
      "Felt incredible to see that first deposit",
      "Celebrated with a nice dinner",
      "Started planning your financial future",
    ],
  },
  {
    id: "emergency-fund",
    title: "Emergency Fund Complete 🛡️",
    description:
      "Built a solid 6-month emergency fund - financial security achieved!",
    date: new Date("2024-03-20"),
    amount: 300000,
    category: "savings",
    icon: "🛡️",
    color: "#10B981",
    isLocked: false,
    rarity: "epic",
    memories: [
      "Slept better knowing you're protected",
      "Felt proud of your discipline",
      "Ready for any unexpected expenses",
    ],
  },
  {
    id: "first-investment",
    title: "First Investment 📈",
    description: "Made your first stock market investment - welcome to the investor club!",
    date: new Date("2024-05-10"),
    amount: 50000,
    category: "investment",
    icon: "📈",
    color: "#8B5CF6",
    isLocked: false,
    rarity: "rare",
    memories: [
      "Nervous but excited about the future",
      "Researched for weeks before deciding",
      "Felt like a real investor",
    ],
  },
  {
    id: "debt-free",
    title: "Debt Free 🎉",
    description: "Paid off all your credit card debt - financial freedom achieved!",
    date: new Date("2024-07-25"),
    amount: 120000,
    category: "achievement",
    icon: "🎉",
    color: "#F59E0B",
    isLocked: false,
    rarity: "epic",
    memories: [
      "Felt a huge weight lifted off your shoulders",
      "Celebrated with friends and family",
      "Ready to focus on building wealth",
    ],
  },
  {
    id: "savings-goal",
    title: "Vacation Fund Complete ✈️",
    description: "Saved enough for that dream vacation to Japan!",
    date: new Date("2024-09-15"),
    amount: 80000,
    category: "goal",
    icon: "✈️",
    color: "#EF4444",
    isLocked: false,
    rarity: "rare",
    memories: [
      "Months of careful budgeting paid off",
      "Already planning the itinerary",
      "Proud of your discipline and focus",
    ],
  },
  {
    id: "promotion-bonus",
    title: "Promotion Bonus 🚀",
    description: "Received a significant bonus after your promotion!",
    date: new Date("2024-11-01"),
    amount: 150000,
    category: "income",
    icon: "🚀",
    color: "#06D6A0",
    isLocked: false,
    rarity: "legendary",
    memories: [
      "Hard work finally recognized",
      "Felt validated and appreciated",
      "Immediately allocated to investments",
    ],
  },
  {
    id: "crypto-gains",
    title: "Crypto Success 🪙",
    description: "Your cryptocurrency investment paid off handsomely!",
    date: new Date("2024-12-10"),
    amount: 75000,
    category: "investment",
    icon: "🪙",
    color: "#FFD60A",
    isLocked: true, // Future milestone
    unlockDate: new Date("2024-12-10"),
    rarity: "epic",
    memories: [
      "Patience and research paid off",
      "Learned valuable lessons about volatility",
      "Diversified portfolio strategy worked",
    ],
    futureValue: 150000,
  },
];

export const mockTimelineStats = {
  totalMilestones: mockMilestones.length,
  unlockedMilestones: mockMilestones.filter(m => !m.isLocked).length,
  totalValue: mockMilestones.reduce((sum, m) => sum + (m.amount || 0), 0),
  rarityBreakdown: {
    common: mockMilestones.filter(m => m.rarity === "common").length,
    rare: mockMilestones.filter(m => m.rarity === "rare").length,
    epic: mockMilestones.filter(m => m.rarity === "epic").length,
    legendary: mockMilestones.filter(m => m.rarity === "legendary").length,
  },
  categoryBreakdown: {
    income: mockMilestones.filter(m => m.category === "income").length,
    savings: mockMilestones.filter(m => m.category === "savings").length,
    investment: mockMilestones.filter(m => m.category === "investment").length,
    achievement: mockMilestones.filter(m => m.category === "achievement").length,
    goal: mockMilestones.filter(m => m.category === "goal").length,
  },
};

export default {
  mockMilestones,
  mockTimelineStats,
};
