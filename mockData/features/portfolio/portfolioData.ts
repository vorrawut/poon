// Portfolio Mock Data - Wealth Universe Assets 🌍

export const mockPortfolioAssets = [
  {
    id: "cash",
    name: "Cash & Savings",
    value: 125000,
    performance: 2.5,
    allocation: 25,
    color: "#10B981",
    icon: "💰",
    orbit: 140,
    size: 55,
    description: "Emergency funds and high-yield savings",
  },
  {
    id: "stocks",
    name: "Stock Portfolio",
    value: 280000,
    performance: 15.2,
    allocation: 45,
    color: "#3B82F6",
    icon: "📈",
    orbit: 200,
    size: 85,
    description: "Individual stocks and ETFs",
  },
  {
    id: "funds",
    name: "Mutual Funds",
    value: 150000,
    performance: 8.7,
    allocation: 20,
    color: "#8B5CF6",
    icon: "🏦",
    orbit: 260,
    size: 65,
    description: "Diversified mutual fund portfolio",
  },
  {
    id: "crypto",
    name: "Cryptocurrency",
    value: 45000,
    performance: -12.3,
    allocation: 5,
    color: "#F59E0B",
    icon: "₿",
    orbit: 320,
    size: 40,
    description: "Bitcoin, Ethereum, and altcoins",
  },
  {
    id: "property",
    name: "Real Estate",
    value: 85000,
    performance: 6.8,
    allocation: 5,
    color: "#EF4444",
    icon: "🏠",
    orbit: 380,
    size: 45,
    description: "REITs and property investments",
  },
];

export const mockTimelineEvents = [
  { year: 2018, event: "Started investing", icon: "🎓", amount: 5000 },
  { year: 2020, event: "First $50K milestone", icon: "🎯", amount: 50000 },
  { year: 2021, event: "Tech stocks exploded", icon: "🚀", amount: 150000 },
  { year: 2023, event: "Diversified portfolio", icon: "🌈", amount: 400000 },
  { year: 2024, event: "Real estate investment", icon: "🏠", amount: 685000 },
  {
    year: 2026,
    event: "Projected: $1M milestone",
    icon: "💎",
    amount: 1000000,
    projected: true,
  },
];

export const mockPortfolioHighlights = [
  {
    id: "1",
    title: "Portfolio Superstar",
    message:
      "Your stock portfolio is crushing it with +15.2% growth! You're outperforming 78% of similar investors this quarter.",
    icon: "🚀",
    type: "success" as const,
  },
  {
    id: "2",
    title: "Diversification Win",
    message:
      "Your portfolio balance is looking healthy! 45% stocks, 25% cash, 20% funds. Perfect risk distribution for your age group.",
    icon: "🎯",
    type: "info" as const,
  },
  {
    id: "3",
    title: "Crypto Reality Check",
    message:
      "Crypto took a -12.3% hit this month, but it's only 5% of your portfolio. Your diversification strategy is protecting you!",
    icon: "⚠️",
    type: "insight" as const,
  },
  {
    id: "4",
    title: "Smart Rebalancing",
    message:
      "Consider moving some gains from stocks to real estate. Your property allocation is only 5% — there's room to grow!",
    icon: "💡",
    type: "warning" as const,
  },
  {
    id: "5",
    title: "Milestone Alert",
    message:
      "You're $15K away from the $700K milestone! At current growth rate, you'll hit it in just 3 months. Keep it up!",
    icon: "🎉",
    type: "celebration" as const,
  },
];
