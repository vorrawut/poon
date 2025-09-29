// AI Insights Mock Data
export const mockFinancialInsights = {
  monthlyIncome: 80000,
  previousMonthIncome: 75000,
  monthlySpending: 52000,
  previousMonthSpending: 48000,
  savingsRate: 35, // percentage
  emergencyFundMonths: 2.5,
  debtToIncomeRatio: 15, // percentage
  spendingByCategory: {
    "Housing": 15000,
    "Food & Drink": 12000,
    "Transportation": 8000,
    "Shopping": 6000,
    "Entertainment & Leisure": 4000,
    "Bills & Services": 3500,
    "Health & Fitness": 2000,
    "Subscriptions & Memberships": 1500,
  },
  goals: [
    {
      id: "emergency-fund",
      name: "Emergency Fund",
      target: 150000,
      current: 75000,
      deadline: "2025-06-30",
      category: "Safety Net",
    },
    {
      id: "vacation-japan",
      name: "Japan Vacation",
      target: 80000,
      current: 45000,
      deadline: "2025-04-15",
      category: "Travel",
    },
    {
      id: "new-laptop",
      name: "MacBook Pro",
      target: 65000,
      current: 32000,
      deadline: "2025-03-01",
      category: "Technology",
    },
  ],
};

// Thai Cultural Financial Data
export const mockThaiCulturalData = {
  upcomingFestivals: [
    {
      name: "Songkran",
      date: "2025-04-13",
      estimatedCost: 5000,
      description: "Thai New Year celebration",
      categories: ["Travel", "Food & Drink", "Gifts & Donations"],
    },
    {
      name: "Loy Krathong",
      date: "2025-11-05",
      estimatedCost: 2000,
      description: "Festival of Lights",
      categories: ["Entertainment & Leisure", "Food & Drink"],
    },
    {
      name: "Chinese New Year",
      date: "2025-01-29",
      estimatedCost: 3000,
      description: "Lunar New Year celebration",
      categories: ["Food & Drink", "Gifts & Donations", "Shopping"],
    },
  ],
  meritMakingBudget: {
    recommended: 1600, // 2% of 80k income
    current: 800,
    frequency: "monthly",
    venues: ["Temple", "Charity", "Community"],
  },
  familyObligations: {
    monthlySupport: 8000,
    specialOccasions: 15000, // per year average
    categories: ["Family Support", "Religious Giving", "Community Events"],
  },
};

// Sample AI Insights for Demo
export const mockAIInsights = [
  {
    id: "high-food-spending",
    type: "warning" as const,
    title: "High Food & Drink Spending",
    description: "You're spending 23% of your budget on food and drinks. Consider meal planning or cooking more at home to optimize your budget.",
    impact: "medium" as const,
    confidence: 85,
    actionable: true,
    action: {
      label: "Review Food Expenses",
      onClick: () => console.log("Navigate to food category"),
    },
    data: {
      amount: 12000,
      percentage: 8, // 8% over recommended 15%
      category: "Food & Drink",
    },
  },
  {
    id: "savings-opportunity",
    type: "opportunity" as const,
    title: "Boost Your Savings Rate",
    description: "You're saving 35% of your income - excellent! You could reach your emergency fund goal 2 months earlier by saving just ฿2,000 more monthly.",
    impact: "high" as const,
    confidence: 90,
    actionable: true,
    action: {
      label: "Optimize Savings Plan",
      onClick: () => console.log("Navigate to savings optimizer"),
    },
    data: {
      amount: 2000,
      percentage: 35,
      timeline: "2 months earlier",
    },
  },
  {
    id: "subscription-review",
    type: "tip" as const,
    title: "Review Your Subscriptions",
    description: "You're spending ฿1,500 monthly on subscriptions. Review and cancel unused services to save money.",
    impact: "low" as const,
    confidence: 75,
    actionable: true,
    action: {
      label: "Audit Subscriptions",
      onClick: () => console.log("Navigate to subscription manager"),
    },
    data: {
      amount: 1500,
      percentage: 1.9, // of total income
    },
  },
  {
    id: "goal-progress",
    type: "achievement" as const,
    title: "Japan Trip Goal Progress",
    description: "You're 56% of the way to your Japan vacation goal! Just ฿35,000 to go. Keep up the great work!",
    impact: "medium" as const,
    confidence: 95,
    actionable: true,
    action: {
      label: "View Goal Details",
      onClick: () => console.log("Navigate to Japan trip goal"),
    },
    data: {
      amount: 35000,
      percentage: 56,
    },
  },
  {
    id: "songkran-preparation",
    type: "tip" as const,
    title: "Prepare for Songkran",
    description: "Songkran is coming up in 4 months. Consider setting aside ฿5,000 for celebrations and travel.",
    impact: "medium" as const,
    confidence: 80,
    actionable: true,
    action: {
      label: "Create Festival Budget",
      onClick: () => console.log("Create Songkran budget goal"),
    },
    data: {
      amount: 5000,
      timeline: "4 months",
    },
  },
  {
    id: "merit-making-suggestion",
    type: "tip" as const,
    title: "Consider Merit-Making Budget",
    description: "Setting aside ฿1,600 monthly for merit-making and charitable giving can bring both spiritual fulfillment and tax benefits.",
    impact: "low" as const,
    confidence: 60,
    actionable: true,
    action: {
      label: "Set Donation Budget",
      onClick: () => console.log("Create merit-making budget"),
    },
    data: {
      amount: 1600,
      percentage: 2,
    },
  },
];

export default {
  mockFinancialInsights,
  mockThaiCulturalData,
  mockAIInsights,
};
