import type { EnhancedGoal } from "../../../src/components/financial-universe/EnhancedGoalStarConstellation";

// Enhanced goal star constellation mock data
export const mockGoalStarData: EnhancedGoal[] = [
  {
    id: "goal-1",
    name: "Emergency Fund",
    target: 150000,
    current: 125000,
    deadline: "2025-06-30",
    category: "security",
    icon: "🛡️",
    color: "#10B981", // Green
    priority: "high",
    constellation: "financial-security",
    position: [-2, 1, 0],
    connections: ["goal-2"],
    milestones: [
      { id: "m1", name: "First ฿50K", amount: 50000, completed: true, date: "2024-08-15" },
      { id: "m2", name: "Halfway Mark", amount: 75000, completed: true, date: "2024-10-20" },
      { id: "m3", name: "Almost There", amount: 125000, completed: true, date: "2024-12-10" },
      { id: "m4", name: "Full Fund", amount: 150000, completed: false },
    ],
    insights: {
      timeToCompletion: 3,
      monthlyRequired: 8333,
      achievementProbability: 92,
      riskLevel: 'low',
      recommendations: [
        "You're almost there! Just ฿25K more to complete your emergency fund",
        "Consider setting up automatic transfers to maintain momentum",
        "Great progress - you're ahead of 78% of people your age"
      ]
    }
  },
  {
    id: "goal-2", 
    name: "House Down Payment",
    target: 800000,
    current: 320000,
    deadline: "2026-12-31",
    category: "property",
    icon: "🏠",
    color: "#3B82F6", // Blue
    priority: "high",
    constellation: "financial-security",
    position: [0, 2, -1],
    connections: ["goal-1", "goal-3"],
    milestones: [
      { id: "m1", name: "First ฿100K", amount: 100000, completed: true, date: "2024-03-15" },
      { id: "m2", name: "Quarter Way", amount: 200000, completed: true, date: "2024-07-20" },
      { id: "m3", name: "Current Progress", amount: 320000, completed: true, date: "2024-12-01" },
      { id: "m4", name: "Halfway Mark", amount: 400000, completed: false },
      { id: "m5", name: "Three Quarters", amount: 600000, completed: false },
      { id: "m6", name: "Full Down Payment", amount: 800000, completed: false },
    ],
    insights: {
      timeToCompletion: 18,
      monthlyRequired: 26667,
      achievementProbability: 75,
      riskLevel: 'medium',
      recommendations: [
        "Consider increasing monthly contributions by ฿5K to reach goal 3 months earlier",
        "Look into high-yield savings accounts for better returns",
        "Track property market trends to optimize timing"
      ]
    }
  },
  {
    id: "goal-3",
    name: "New Car",
    target: 450000,
    current: 180000,
    deadline: "2025-08-31",
    category: "transportation",
    icon: "🚗",
    color: "#F59E0B", // Amber
    priority: "medium",
    constellation: "lifestyle",
    position: [2, 0, 1],
    connections: ["goal-2", "goal-4"],
    milestones: [
      { id: "m1", name: "Initial Savings", amount: 50000, completed: true, date: "2024-05-10" },
      { id: "m2", name: "First Quarter", amount: 112500, completed: true, date: "2024-08-25" },
      { id: "m3", name: "Current Progress", amount: 180000, completed: true, date: "2024-11-30" },
      { id: "m4", name: "Halfway Point", amount: 225000, completed: false },
      { id: "m5", name: "Final Push", amount: 450000, completed: false },
    ],
    insights: {
      timeToCompletion: 8,
      monthlyRequired: 33750,
      achievementProbability: 68,
      riskLevel: 'medium',
      recommendations: [
        "You're 40% of the way there - great progress!",
        "Consider certified pre-owned vehicles to reduce target amount",
        "Time to start researching specific models and financing options"
      ]
    }
  },
  {
    id: "goal-4",
    name: "Japan Vacation",
    target: 80000,
    current: 65000,
    deadline: "2025-04-01",
    category: "travel",
    icon: "🗾",
    color: "#EF4444", // Red
    priority: "medium",
    constellation: "lifestyle", 
    position: [1, -1, 2],
    connections: ["goal-3"],
    milestones: [
      { id: "m1", name: "Flight Budget", amount: 25000, completed: true, date: "2024-09-15" },
      { id: "m2", name: "Accommodation", amount: 45000, completed: true, date: "2024-10-30" },
      { id: "m3", name: "Activities & Food", amount: 65000, completed: true, date: "2024-12-05" },
      { id: "m4", name: "Shopping Buffer", amount: 80000, completed: false },
    ],
    insights: {
      timeToCompletion: 2,
      monthlyRequired: 7500,
      achievementProbability: 95,
      riskLevel: 'low',
      recommendations: [
        "Almost ready for your trip! Just ฿15K more needed",
        "Start booking accommodations to lock in good rates",
        "Consider travel insurance for peace of mind"
      ]
    }
  },
  {
    id: "goal-5",
    name: "Investment Portfolio",
    target: 500000,
    current: 85000,
    deadline: "2027-12-31",
    category: "investment",
    icon: "📈",
    color: "#8B5CF6", // Purple
    priority: "high",
    constellation: "wealth-building",
    position: [-1, -2, 0],
    connections: ["goal-6"],
    milestones: [
      { id: "m1", name: "First Investment", amount: 25000, completed: true, date: "2024-06-01" },
      { id: "m2", name: "Portfolio Diversified", amount: 85000, completed: true, date: "2024-12-01" },
      { id: "m3", name: "First ฿100K", amount: 100000, completed: false },
      { id: "m4", name: "Quarter Million", amount: 250000, completed: false },
      { id: "m5", name: "Half Million", amount: 500000, completed: false },
    ],
    insights: {
      timeToCompletion: 36,
      monthlyRequired: 11528,
      achievementProbability: 82,
      riskLevel: 'medium',
      recommendations: [
        "Excellent start with 17% progress in 6 months",
        "Consider dollar-cost averaging for consistent growth",
        "Diversify across Thai and international markets"
      ]
    }
  },
  {
    id: "goal-6",
    name: "Retirement Fund",
    target: 2000000,
    current: 125000,
    deadline: "2040-12-31",
    category: "retirement",
    icon: "🌅",
    color: "#06B6D4", // Cyan
    priority: "high",
    constellation: "wealth-building",
    position: [-3, 0, -1],
    connections: ["goal-5"],
    milestones: [
      { id: "m1", name: "First ฿100K", amount: 100000, completed: true, date: "2024-11-01" },
      { id: "m2", name: "Current Progress", amount: 125000, completed: true, date: "2024-12-15" },
      { id: "m3", name: "Quarter Million", amount: 500000, completed: false },
      { id: "m4", name: "Half Million", amount: 1000000, completed: false },
      { id: "m5", name: "Two Million", amount: 2000000, completed: false },
    ],
    insights: {
      timeToCompletion: 192, // 16 years
      monthlyRequired: 9766,
      achievementProbability: 88,
      riskLevel: 'low',
      recommendations: [
        "Great early start on retirement planning!",
        "Take advantage of company matching if available",
        "Consider increasing contributions by 1% annually"
      ]
    }
  },
  {
    id: "goal-7",
    name: "Wedding Fund",
    target: 300000,
    current: 45000,
    deadline: "2026-02-14",
    category: "life-events",
    icon: "💒",
    color: "#EC4899", // Pink
    priority: "medium",
    constellation: "life-milestones",
    position: [0, -3, 1],
    milestones: [
      { id: "m1", name: "Venue Deposit", amount: 50000, completed: false },
      { id: "m2", name: "Photography", amount: 100000, completed: false },
      { id: "m3", name: "Catering Budget", amount: 200000, completed: false },
      { id: "m4", name: "Full Wedding", amount: 300000, completed: false },
    ],
    insights: {
      timeToCompletion: 14,
      monthlyRequired: 18214,
      achievementProbability: 70,
      riskLevel: 'medium',
      recommendations: [
        "Consider starting a dedicated wedding savings account",
        "Look into seasonal venue discounts",
        "Create a detailed budget breakdown by category"
      ]
    }
  },
  {
    id: "goal-8",
    name: "Education Fund",
    target: 600000,
    current: 0,
    deadline: "2030-06-30",
    category: "education",
    icon: "🎓",
    color: "#14B8A6", // Teal
    priority: "low",
    constellation: "future-planning",
    position: [3, 1, -2],
    milestones: [
      { id: "m1", name: "Start Saving", amount: 50000, completed: false },
      { id: "m2", name: "First Year Covered", amount: 150000, completed: false },
      { id: "m3", name: "Halfway There", amount: 300000, completed: false },
      { id: "m4", name: "Full Education Fund", amount: 600000, completed: false },
    ],
    insights: {
      timeToCompletion: 66, // 5.5 years
      monthlyRequired: 9091,
      achievementProbability: 65,
      riskLevel: 'medium',
      recommendations: [
        "Start early to take advantage of compound growth",
        "Research education savings plans with tax benefits",
        "Consider international education costs in planning"
      ]
    }
  }
];

// Constellation groupings for visual organization
export const mockConstellations = {
  "financial-security": {
    name: "Financial Security",
    description: "Essential safety net goals",
    color: "#10B981",
    goals: ["goal-1", "goal-2"]
  },
  "lifestyle": {
    name: "Lifestyle Goals", 
    description: "Quality of life improvements",
    color: "#F59E0B",
    goals: ["goal-3", "goal-4"]
  },
  "wealth-building": {
    name: "Wealth Building",
    description: "Long-term financial growth",
    color: "#8B5CF6", 
    goals: ["goal-5", "goal-6"]
  },
  "life-milestones": {
    name: "Life Milestones",
    description: "Major life events",
    color: "#EC4899",
    goals: ["goal-7"]
  },
  "future-planning": {
    name: "Future Planning",
    description: "Long-term preparation",
    color: "#14B8A6",
    goals: ["goal-8"]
  }
};

// Goal achievement analytics
export const mockGoalAnalytics = {
  totalGoals: 8,
  completedGoals: 0,
  inProgressGoals: 6,
  notStartedGoals: 2,
  totalTargetValue: 4380000,
  totalCurrentValue: 945000,
  overallProgress: 21.6,
  averageMonthlyContribution: 45000,
  projectedCompletionDate: "2027-03-15",
  riskDistribution: {
    low: 3,
    medium: 4,
    high: 1
  },
  categoryBreakdown: {
    security: { count: 1, value: 150000, progress: 83.3 },
    property: { count: 1, value: 800000, progress: 40.0 },
    transportation: { count: 1, value: 450000, progress: 40.0 },
    travel: { count: 1, value: 80000, progress: 81.3 },
    investment: { count: 1, value: 500000, progress: 17.0 },
    retirement: { count: 1, value: 2000000, progress: 6.3 },
    "life-events": { count: 1, value: 300000, progress: 15.0 },
    education: { count: 1, value: 600000, progress: 0.0 }
  },
  monthlyRecommendations: [
    {
      goalId: "goal-4",
      message: "Japan trip is almost funded! Just ฿15K more needed",
      priority: "high",
      action: "increase_contribution"
    },
    {
      goalId: "goal-1", 
      message: "Emergency fund at 83% - excellent progress!",
      priority: "medium",
      action: "maintain_pace"
    },
    {
      goalId: "goal-8",
      message: "Consider starting education fund soon to maximize compound growth",
      priority: "low",
      action: "start_saving"
    }
  ]
};

// Seasonal goal adjustments (Thai cultural integration)
export const mockSeasonalGoalAdjustments = {
  songkran: {
    period: "April",
    affectedGoals: ["goal-4"], // Travel goals
    expectedIncrease: 15,
    recommendation: "Songkran travel season - budget extra for domestic trips"
  },
  vesakhaBucha: {
    period: "May",
    affectedGoals: ["goal-1"], // Merit-making affects emergency fund
    expectedIncrease: 5,
    recommendation: "Merit-making season - small impact on savings goals"
  },
  lentBuddhist: {
    period: "July-October",
    affectedGoals: ["goal-3", "goal-7"], // Reduced lifestyle spending
    expectedDecrease: 10,
    recommendation: "Buddhist Lent - opportunity to accelerate savings"
  },
  newYear: {
    period: "December-January",
    affectedGoals: ["goal-3", "goal-4", "goal-7"], // Holiday spending
    expectedIncrease: 25,
    recommendation: "Holiday season - plan for increased expenses"
  }
};
