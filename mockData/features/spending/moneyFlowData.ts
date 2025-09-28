// Money Flow Mock Data - Ultimate Money Flow Experience

export const mockIncomeStreams = [
  {
    id: "salary",
    name: "Software Engineer",
    amount: 8500,
    color: "#3B82F6",
    icon: "💼",
    type: "recurring" as const,
    frequency: "Monthly",
  },
  {
    id: "freelance",
    name: "Side Projects",
    amount: 2200,
    color: "#8B5CF6",
    icon: "💻",
    type: "recurring" as const,
    frequency: "Weekly",
  },
  {
    id: "investment",
    name: "Dividends",
    amount: 450,
    color: "#10B981",
    icon: "📈",
    type: "recurring" as const,
    frequency: "Quarterly",
  },
  {
    id: "bonus",
    name: "Performance Bonus",
    amount: 1500,
    color: "#F59E0B",
    icon: "🎁",
    type: "one-time" as const,
    frequency: "One-time",
  },
];

export const mockSpendingCategories = [
  {
    id: "necessities",
    name: "Necessities",
    amount: 4200,
    color: "#EF4444",
    icon: "🏠",
    type: "necessity" as const,
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    amount: 2800,
    color: "#F59E0B",
    icon: "🎬",
    type: "lifestyle" as const,
  },
  {
    id: "investment",
    name: "Investments",
    amount: 2000,
    color: "#10B981",
    icon: "💎",
    type: "investment" as const,
  },
  {
    id: "fun",
    name: "Fun & Entertainment",
    amount: 1200,
    color: "#8B5CF6",
    icon: "🎉",
    type: "lifestyle" as const,
  },
  {
    id: "transport",
    name: "Transportation",
    amount: 680,
    color: "#06B6D4",
    icon: "🚗",
    type: "necessity" as const,
  },
];

export const mockIncomeDetails = [
  {
    id: "salary",
    name: "Software Engineer Salary",
    amount: 8500,
    type: "salary" as const,
    frequency: "monthly" as const,
    nextPayment: "2024-10-15",
    color: "#3B82F6",
    icon: "💼",
    growth: 12,
    isRecurring: true,
  },
  {
    id: "freelance",
    name: "Freelance Development",
    amount: 2200,
    type: "freelance" as const,
    frequency: "weekly" as const,
    nextPayment: "2024-09-30",
    color: "#8B5CF6",
    icon: "💻",
    growth: 25,
    isRecurring: true,
  },
  {
    id: "investment",
    name: "Investment Dividends",
    amount: 450,
    type: "investment" as const,
    frequency: "quarterly" as const,
    nextPayment: "2024-12-15",
    color: "#10B981",
    icon: "📈",
    growth: 8,
    isRecurring: true,
  },
  {
    id: "bonus",
    name: "Performance Bonus",
    amount: 1500,
    type: "bonus" as const,
    frequency: "yearly" as const,
    nextPayment: "2024-12-31",
    color: "#F59E0B",
    icon: "🎁",
    growth: 0,
    isRecurring: false,
  },
];

export const mockBadges = [
  {
    id: "saver",
    name: "Super Saver",
    description: "Saved 30% of income this month",
    icon: "💰",
    color: "#10B981",
    earned: true,
    rarity: "rare" as const,
  },
  {
    id: "investor",
    name: "Smart Investor",
    description: "Invested 20% of income consistently",
    icon: "📈",
    color: "#3B82F6",
    earned: true,
    rarity: "epic" as const,
  },
  {
    id: "budgeter",
    name: "Budget Master",
    description: "Stayed under budget for 3 months",
    icon: "🎯",
    color: "#8B5CF6",
    earned: false,
    progress: 67,
    rarity: "legendary" as const,
  },
];

export const mockStreaks = [
  {
    id: "saving",
    name: "Saving Streak",
    count: 45,
    icon: "💰",
    color: "#10B981",
    description: "Days of consistent saving",
  },
  {
    id: "budget",
    name: "Budget Streak",
    count: 23,
    icon: "🎯",
    color: "#3B82F6",
    description: "Days under budget",
  },
  {
    id: "investment",
    name: "Investment Streak",
    count: 12,
    icon: "📈",
    color: "#8B5CF6",
    description: "Weeks of regular investing",
  },
];

export const mockChallenges = [
  {
    id: "no_spend",
    name: "No-Spend Weekend",
    description: "Go a full weekend without spending on non-essentials",
    progress: 75,
    target: 100,
    reward: "🏆 $50 bonus to savings",
    difficulty: "medium" as const,
    timeLeft: "2 days",
  },
  {
    id: "cook_home",
    name: "Home Chef Challenge",
    description: "Cook at home for 7 consecutive days",
    progress: 43,
    target: 100,
    reward: "🍳 Recipe book unlock",
    difficulty: "easy" as const,
    timeLeft: "4 days",
  },
];

export const mockInsights = [
  {
    id: "1",
    title: "Coffee Spending Alert",
    message: "You've spent $127 on coffee this month - 23% more than usual. Consider brewing at home to save $80/month!",
    type: "warning" as const,
    icon: "☕",
    actionable: true,
    savings: 80,
  },
  {
    id: "2",
    title: "Investment Opportunity",
    message: "You have $2,400 sitting in checking. Consider moving $2,000 to your investment account for better returns!",
    type: "opportunity" as const,
    icon: "📈",
    actionable: true,
    potential: 2000,
  },
];

export const mockSpendingWheel = [
  { name: "Housing", value: 1800, color: "#EF4444", icon: "🏠" },
  { name: "Food", value: 800, color: "#F59E0B", icon: "🍕" },
  { name: "Transport", value: 450, color: "#06B6D4", icon: "🚗" },
  { name: "Entertainment", value: 300, color: "#8B5CF6", icon: "🎬" },
  { name: "Shopping", value: 250, color: "#EC4899", icon: "🛍️" },
  { name: "Health", value: 200, color: "#10B981", icon: "🏥" },
  { name: "Utilities", value: 180, color: "#6B7280", icon: "⚡" },
  { name: "Other", value: 120, color: "#9CA3AF", icon: "📦" },
];

export const mockMoneyJars = [
  {
    id: "emergency",
    name: "Emergency Fund",
    current: 15000,
    target: 25000,
    color: "#EF4444",
    icon: "🚨",
    priority: "high" as const,
  },
  {
    id: "vacation",
    name: "Dream Vacation",
    current: 3200,
    target: 8000,
    color: "#06B6D4",
    icon: "✈️",
    priority: "medium" as const,
  },
  {
    id: "house",
    name: "House Down Payment",
    current: 45000,
    target: 80000,
    color: "#10B981",
    icon: "🏠",
    priority: "high" as const,
  },
  {
    id: "car",
    name: "New Car",
    current: 8500,
    target: 15000,
    color: "#8B5CF6",
    icon: "🚗",
    priority: "low" as const,
  },
];

export const mockCoachingInsights = [
  {
    id: "1",
    type: "celebration" as const,
    title: "Amazing Progress! 🎉",
    message: "You've increased your savings rate by 15% this quarter. You're on track to hit your emergency fund goal 3 months early!",
    actionItems: [
      "Consider increasing your investment allocation",
      "Look into high-yield savings for emergency fund",
    ],
  },
  {
    id: "2",
    type: "optimization" as const,
    title: "Smart Optimization Opportunity 💡",
    message: "I noticed you're spending $340/month on subscriptions. Let's review which ones you actually use!",
    actionItems: [
      "Cancel unused streaming services",
      "Switch to annual plans for 20% savings",
      "Use family plans where possible",
    ],
  },
  {
    id: "3",
    type: "warning" as const,
    title: "Spending Pattern Alert ⚠️",
    message: "Your dining out expenses have increased 40% this month. This could impact your savings goals.",
    actionItems: [
      "Set a weekly dining out budget",
      "Try meal prepping on Sundays",
      "Use the 24-hour rule for impulse dining decisions",
    ],
  },
];
