import type { EnhancedAIInsight } from "../../../src/features/ai-insights/components/EnhancedAIInsightCard";

// Enhanced mock AI insights with more sophisticated data
export const mockEnhancedAIInsights: EnhancedAIInsight[] = [
  {
    id: "insight-001",
    type: "opportunity",
    title: "High-Yield Savings Opportunity",
    message: "With current interest rates at 4.5%, moving your ฿150,000 emergency fund to a high-yield account could earn you an extra ฿4,500 annually compared to your current 1% savings account.",
    impact: "medium",
    confidence: "high",
    category: "saving",
    priority: 8,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    isPersonalized: true,
    tags: ["interest-rates", "optimization", "emergency-fund"],
    data: {
      amount: 4500,
      percentage: 4.5,
      comparison: "vs 1% current rate",
    },
    actionLabel: "Compare High-Yield Accounts",
    onAction: () => console.log("Navigate to savings account comparison"),
  },
  {
    id: "insight-002",
    type: "warning",
    title: "Dining Out Spending Surge",
    message: "Your restaurant expenses increased by 35% this month to ฿8,500. This represents 12% of your monthly income. Consider meal planning to reduce costs.",
    impact: "high",
    confidence: "high",
    category: "spending",
    priority: 9,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    isPersonalized: true,
    tags: ["dining", "trend-analysis", "budgeting"],
    data: {
      amount: 8500,
      percentage: 35,
      trend: "up",
    },
    actionLabel: "Create Dining Budget",
    onAction: () => console.log("Navigate to dining budget setup"),
  },
  {
    id: "insight-003",
    type: "achievement",
    title: "Emergency Fund Goal Achieved! 🎉",
    message: "Congratulations! You've successfully built your 6-month emergency fund of ฿180,000. This puts you ahead of 70% of people your age in financial security.",
    impact: "high",
    confidence: "high",
    category: "goals",
    priority: 10,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    isPersonalized: true,
    tags: ["emergency-fund", "achievement", "milestone"],
    data: {
      amount: 180000,
      percentage: 100,
    },
    actionLabel: "Set Next Financial Goal",
    onAction: () => console.log("Navigate to goal creation"),
  },
  {
    id: "insight-004",
    type: "cultural",
    title: "เตรียมพร้อมสงกรานต์ 🌊",
    message: "อีก 45 วันจะถึงเทศกาลสงกรานต์! ตั้งงบประมาณ ฿15,000 สำหรับการเดินทาง ของขวัญ และกิจกรรมต่างๆ เพื่อไม่ให้กระทบงบรายเดือน",
    impact: "medium",
    confidence: "high",
    category: "budgeting",
    priority: 6,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Expires in 30 days
    isPersonalized: true,
    tags: ["songkran", "festival", "thai-culture"],
    data: {
      amount: 15000,
      timeline: "45 days",
    },
    actionLabel: "ตั้งงบสงกรานต์",
    onAction: () => console.log("Create Songkran budget"),
  },
  {
    id: "insight-005",
    type: "prediction",
    title: "Annual Savings Forecast",
    message: "At your current savings rate of ฿12,000 monthly, you're projected to save ฿144,000 this year. This represents a 15% increase in your net worth.",
    impact: "medium",
    confidence: "high",
    category: "saving",
    priority: 5,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    isPersonalized: true,
    tags: ["projection", "savings", "net-worth"],
    data: {
      amount: 144000,
      percentage: 15,
      timeline: "12 months",
    },
  },
  {
    id: "insight-006",
    type: "optimization",
    title: "Subscription Audit Needed",
    message: "You're spending ฿2,850 monthly on subscriptions (4% of income). Review Netflix, Spotify, and 6 other services. Canceling unused ones could save ฿800/month.",
    impact: "medium",
    confidence: "high",
    category: "spending",
    priority: 7,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    isPersonalized: true,
    tags: ["subscriptions", "optimization", "recurring-costs"],
    data: {
      amount: 800,
      percentage: 4,
    },
    actionLabel: "Audit Subscriptions",
    onAction: () => console.log("Navigate to subscription manager"),
  },
  {
    id: "insight-007",
    type: "risk_alert",
    title: "Inflation Impact Alert",
    message: "Current inflation at 3.8% is eroding your purchasing power. Your cash savings are losing ฿456 monthly in real value. Consider inflation-protected investments.",
    impact: "high",
    confidence: "medium",
    category: "investing",
    priority: 8,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    isPersonalized: true,
    tags: ["inflation", "market-conditions", "purchasing-power"],
    data: {
      amount: 456,
      percentage: 3.8,
    },
    actionLabel: "Explore Investment Options",
    onAction: () => console.log("Navigate to investment recommendations"),
  },
  {
    id: "insight-008",
    type: "pattern",
    title: "Weekend Spending Pattern",
    message: "Analysis shows you spend 40% more on weekends (avg ฿1,200/day vs ฿850 weekdays). Weekend meal planning could reduce this by ฿2,000 monthly.",
    impact: "medium",
    confidence: "high",
    category: "spending",
    priority: 6,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    isPersonalized: true,
    tags: ["weekend-spending", "pattern-analysis", "meal-planning"],
    data: {
      amount: 2000,
      percentage: 40,
      comparison: "weekend vs weekday",
    },
    actionLabel: "Plan Weekend Budget",
  },
  {
    id: "insight-009",
    type: "goal_suggestion",
    title: "House Down Payment Goal",
    message: "Based on your income and savings rate, you could save for a 20% down payment (฿600,000) on a ฿3M home in 3.5 years with ฿14,500 monthly savings.",
    impact: "high",
    confidence: "high",
    category: "goals",
    priority: 7,
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9 days ago
    isPersonalized: true,
    tags: ["house", "down-payment", "long-term-goal"],
    data: {
      amount: 600000,
      timeline: "3.5 years",
      percentage: 20,
    },
    actionLabel: "Create House Fund Goal",
    onAction: () => console.log("Create house down payment goal"),
  },
  {
    id: "insight-010",
    type: "tip",
    title: "Credit Card Rewards Optimization",
    message: "Based on your ฿45,000 monthly spending, switching to a cashback card could earn you ฿675 monthly (1.5% back). That's ฿8,100 annually in free money!",
    impact: "low",
    confidence: "medium",
    category: "spending",
    priority: 4,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    isPersonalized: true,
    tags: ["cashback", "credit-cards", "rewards"],
    data: {
      amount: 8100,
      percentage: 1.5,
    },
    actionLabel: "Compare Credit Cards",
  },
  {
    id: "insight-011",
    type: "cultural",
    title: "การทำบุญที่สมดุล 🙏",
    message: "คุณใช้จ่ายเพื่อการทำบุญ 6.2% ของรายได้ (฿4,650/เดือน) ซึ่งแสดงถึงจิตใจที่ดีงาม แต่อย่าลืมดูแลความมั่นคงทางการเงินของตัวเองด้วย",
    impact: "low",
    confidence: "high",
    category: "spending",
    priority: 4,
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000), // 11 days ago
    isPersonalized: true,
    tags: ["merit-making", "donations", "thai-culture", "balance"],
    data: {
      amount: 4650,
      percentage: 6.2,
    },
  },
  {
    id: "insight-012",
    type: "warning",
    title: "Retirement Savings Behind Target",
    message: "At age 32, you should ideally have saved 16x your annual income (฿1.44M) for retirement. You currently have 8x. Consider increasing contributions by ฿5,000/month.",
    impact: "high",
    confidence: "high",
    category: "saving",
    priority: 8,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
    isPersonalized: true,
    tags: ["retirement", "age-based-planning", "long-term"],
    data: {
      amount: 720000, // Gap to close
      percentage: 50, // Currently at 50% of target
    },
    actionLabel: "Plan Retirement Savings",
    onAction: () => console.log("Navigate to retirement planning"),
  },
  {
    id: "insight-013",
    type: "opportunity",
    title: "Tax-Advantaged Savings",
    message: "You're not maximizing your RMF/SSF tax benefits. Contributing ฿200,000 annually could save you ฿60,000 in taxes while building retirement wealth.",
    impact: "high",
    confidence: "high",
    category: "investing",
    priority: 7,
    createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000), // 13 days ago
    isPersonalized: true,
    tags: ["tax-savings", "rmf", "ssf", "retirement"],
    data: {
      amount: 60000, // Tax savings
      percentage: 30, // Tax rate
    },
    actionLabel: "Explore Tax-Advantaged Funds",
    onAction: () => console.log("Navigate to RMF/SSF options"),
  },
  {
    id: "insight-014",
    type: "pattern",
    title: "Payday Spending Spike",
    message: "You spend 60% more in the 3 days after payday (฿2,100/day vs ฿1,300 average). This 'payday effect' costs you ฿2,400 monthly in impulse purchases.",
    impact: "medium",
    confidence: "high",
    category: "spending",
    priority: 6,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    isPersonalized: true,
    tags: ["payday-effect", "impulse-spending", "behavioral-finance"],
    data: {
      amount: 2400,
      percentage: 60,
      timeline: "3 days post-payday",
    },
    actionLabel: "Set Payday Spending Rules",
  },
  {
    id: "insight-015",
    type: "achievement",
    title: "Debt-Free Milestone! 🎉",
    message: "Amazing! You've paid off your credit card debt 6 months ahead of schedule. The ฿3,500 monthly payment can now go directly to your investment goals.",
    impact: "high",
    confidence: "high",
    category: "goals",
    priority: 9,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    isPersonalized: true,
    tags: ["debt-free", "milestone", "cash-flow"],
    data: {
      amount: 3500, // Monthly cash flow freed up
      timeline: "6 months early",
    },
    actionLabel: "Redirect to Investments",
    onAction: () => console.log("Navigate to investment allocation"),
  },
];

// Mock financial profile for testing
export const mockFinancialProfile = {
  netWorth: 960000,
  monthlyIncome: 75000,
  monthlySpending: 45000,
  savings: 180000,
  age: 32,
  location: "Bangkok",
  goals: [
    {
      id: "goal-1",
      target: 600000,
      current: 120000,
      deadline: "2027-12-31",
      category: "House Down Payment",
    },
    {
      id: "goal-2",
      target: 50000,
      current: 35000,
      deadline: "2024-06-30",
      category: "Vacation",
    },
  ],
  spendingByCategory: {
    "Food & Dining": 12000,
    "Transportation": 8000,
    "Shopping": 6000,
    "Subscriptions": 2850,
    "Healthcare": 3000,
    "Entertainment": 4500,
    "Donations": 4650,
    "Utilities": 3500,
    "Other": 4500,
  },
  previousMonthData: {
    spending: 42000,
    income: 75000,
    savings: 15000,
  },
  riskTolerance: "medium" as const,
  investmentExperience: "intermediate" as const,
  culturalContext: "thai" as const,
};

// Mock spending patterns
export const mockEnhancedSpendingPatterns = [
  {
    category: "Food & Dining",
    trend: "increasing" as const,
    amount: 12000,
    frequency: "daily" as const,
    seasonality: false,
    anomalies: [
      {
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        amount: 2500,
        reason: "Company dinner",
      },
    ],
  },
  {
    category: "Transportation",
    trend: "stable" as const,
    amount: 8000,
    frequency: "daily" as const,
    seasonality: false,
    anomalies: [],
  },
  {
    category: "Entertainment",
    trend: "volatile" as const,
    amount: 4500,
    frequency: "weekly" as const,
    seasonality: true,
    anomalies: [
      {
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        amount: 3500,
        reason: "Concert tickets",
      },
      {
        date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        amount: 1800,
        reason: "Movie night with friends",
      },
    ],
  },
];

// Mock market context
export const mockMarketContext = {
  inflation: 3.8,
  interestRates: 4.5,
  stockMarketTrend: "bull" as const,
  economicIndicators: {
    gdpGrowth: 2.8,
    unemployment: 1.2,
    consumerConfidence: 78,
  },
};
