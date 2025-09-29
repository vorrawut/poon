// Enhanced spending moon phases mock data
export const mockSpendingMoonData = {
  monthlySpending: 45000,
  previousMonthSpending: 38000,
  spendingChange: 7000, // +18.4%
  spendingPattern: "increasing" as const,
  
  spendingHistory: [
    { month: "Jul 2024", amount: 32000, phase: "waning-crescent" },
    { month: "Aug 2024", amount: 35000, phase: "first-quarter" },
    { month: "Sep 2024", amount: 41000, phase: "waxing-crescent" },
    { month: "Oct 2024", amount: 38000, phase: "first-quarter" },
    { month: "Nov 2024", amount: 42000, phase: "waxing-crescent" },
    { month: "Dec 2024", amount: 45000, phase: "waxing-gibbous" },
  ],
  
  categories: [
    { name: "Food & Dining", amount: 12500, percentage: 28 },
    { name: "Transportation", amount: 8500, percentage: 19 },
    { name: "Shopping", amount: 7200, percentage: 16 },
    { name: "Entertainment", amount: 5800, percentage: 13 },
    { name: "Utilities", amount: 4200, percentage: 9 },
    { name: "Healthcare", amount: 3500, percentage: 8 },
    { name: "Others", amount: 3300, percentage: 7 },
  ],

  insights: {
    currentPhase: "waxing-gibbous",
    phaseDescription: "High spending period - review your expenses carefully",
    recommendation: "Identify non-essential expenses that can be reduced",
    spendingScore: 65, // Out of 100
    trend: "increasing",
    nextPhaseProjection: {
      phase: "full",
      projectedAmount: 52000,
      confidence: 78,
      timeframe: "Next month if current trend continues"
    }
  },

  weeklyBreakdown: [
    { week: "Week 1", amount: 8500, phase: "waxing-crescent" },
    { week: "Week 2", amount: 11200, phase: "first-quarter" },
    { week: "Week 3", amount: 13800, phase: "waxing-gibbous" },
    { week: "Week 4", amount: 11500, phase: "waxing-gibbous" },
  ],

  comparisonData: {
    avgPeersSpending: 42000,
    percentileRank: 72, // User spends more than 72% of peers
    benchmarkCategories: [
      { category: "Food & Dining", userAmount: 12500, avgAmount: 9500, status: "above" },
      { category: "Transportation", userAmount: 8500, avgAmount: 8200, status: "similar" },
      { category: "Shopping", userAmount: 7200, avgAmount: 5800, status: "above" },
      { category: "Entertainment", userAmount: 5800, avgAmount: 4200, status: "above" },
    ]
  }
};

export const mockMoonPhaseTransitions = [
  {
    fromPhase: "waning-crescent",
    toPhase: "new",
    duration: "3-5 days",
    spendingChange: -15,
    description: "Entering minimal spending phase"
  },
  {
    fromPhase: "new",
    toPhase: "waxing-crescent", 
    duration: "5-7 days",
    spendingChange: 8,
    description: "Spending beginning to increase"
  },
  {
    fromPhase: "waxing-crescent",
    toPhase: "first-quarter",
    duration: "7-10 days", 
    spendingChange: 12,
    description: "Reaching balanced spending"
  },
  {
    fromPhase: "first-quarter",
    toPhase: "waxing-gibbous",
    duration: "5-8 days",
    spendingChange: 18,
    description: "Moving toward high spending"
  },
  {
    fromPhase: "waxing-gibbous", 
    toPhase: "full",
    duration: "3-5 days",
    spendingChange: 25,
    description: "Approaching peak spending"
  }
];

// Thai cultural spending phases (Buddhist calendar integration)
export const mockThaiCulturalPhases = {
  vesakhaBucha: {
    phase: "waxing-gibbous",
    expectedIncrease: 35,
    categories: ["Merit Making", "Food Offerings", "Temple Donations"],
    culturalNote: "Increased spending for religious observances"
  },
  songkran: {
    phase: "full", 
    expectedIncrease: 55,
    categories: ["Travel", "Gifts", "Food & Celebrations"],
    culturalNote: "Peak holiday spending period"
  },
  lentBuddhist: {
    phase: "waning-crescent",
    expectedIncrease: -20,
    categories: ["Reduced Entertainment", "Simple Living"],
    culturalNote: "Traditional period of restraint and mindfulness"
  },
  newYear: {
    phase: "full",
    expectedIncrease: 60,
    categories: ["Gifts", "Travel", "Celebrations", "New Year Resolutions"],
    culturalNote: "Highest spending period of the year"
  }
};
