// Dashboard Mock Data

// Dashboard Smart Highlights
export const dashboardHighlights = [
  {
    id: "1",
    title: "Monthly Summary",
    message:
      "You spent $3,450 this month, staying 12% under budget! Your disciplined spending is paying off.",
    icon: "🎯",
    type: "success" as const,
  },
  {
    id: "2",
    title: "Net Worth Growth",
    message:
      "Your net worth grew by $8K this month! Investment gains and smart saving are building your wealth.",
    icon: "📈",
    type: "info" as const,
  },
  {
    id: "3",
    title: "Account Alert",
    message:
      "Your checking account balance is getting low. Consider transferring from savings or reviewing recent spending.",
    icon: "⚠️",
    type: "warning" as const,
  },
  {
    id: "4",
    title: "Investment Opportunity",
    message:
      "You have $2,500 sitting in low-yield checking. Consider moving it to your high-yield savings or investment account.",
    icon: "💡",
    type: "suggestion" as const,
  },
  {
    id: "5",
    title: "Goal Progress",
    message:
      "You're 73% towards your emergency fund goal! Just $1,350 more to reach your 6-month target.",
    icon: "🎯",
    type: "progress" as const,
  },
];

// Financial Universe Goals (existing)
export const mockFinancialUniverseGoals = [
  {
    id: "emergency-fund",
    name: "Emergency Fund",
    targetAmount: 50000,
    currentAmount: 36500,
    icon: "🛡️",
    color: "#4ECDC4",
    priority: "high",
    category: "security",
  },
  {
    id: "vacation-fund",
    name: "Dream Vacation",
    targetAmount: 25000,
    currentAmount: 12800,
    icon: "🏝️",
    color: "#FF6B6B",
    priority: "medium",
    category: "lifestyle",
  },
  {
    id: "investment-growth",
    name: "Investment Portfolio",
    targetAmount: 100000,
    currentAmount: 67500,
    icon: "📈",
    color: "#45B7D1",
    priority: "high",
    category: "wealth",
  },
  {
    id: "house-fund",
    name: "House Down Payment",
    targetAmount: 200000,
    currentAmount: 45000,
    icon: "🏠",
    color: "#96CEB4",
    priority: "medium",
    category: "major-purchase",
  },
];

// Spending Data (existing)
export const mockSpendingData = [
  { category: "Housing", amount: 15000, budget: 18000, color: "#FF6B6B" },
  { category: "Food", amount: 8500, budget: 10000, color: "#4ECDC4" },
  { category: "Transportation", amount: 3200, budget: 4000, color: "#45B7D1" },
  { category: "Entertainment", amount: 2800, budget: 3500, color: "#F9CA24" },
  { category: "Shopping", amount: 4200, budget: 3000, color: "#F0932B" },
  { category: "Healthcare", amount: 1500, budget: 2000, color: "#EB4D4B" },
  { category: "Utilities", amount: 2200, budget: 2500, color: "#6C5CE7" },
];