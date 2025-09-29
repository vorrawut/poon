import type { EnhancedGoal } from "../../../src/features/goals/components/EnhancedGoalTracker";

// Enhanced mock goals with comprehensive mission data
export const mockEnhancedGoals: EnhancedGoal[] = [
  {
    id: "goal-001",
    name: "Emergency Fund Mission",
    description: "Build a 6-month emergency fund for financial security and peace of mind",
    targetAmount: 180000,
    currentAmount: 135000,
    deadline: "2024-08-31",
    category: "emergency",
    priority: "critical",
    icon: "🛡️",
    color: "#EF4444",
    createdAt: new Date("2024-01-15"),
    lastContribution: new Date("2024-12-20"),
    monthlyTarget: 15000,
    isCompleted: false,
    milestones: [
      {
        id: "milestone-001-1",
        name: "First Month Coverage",
        targetAmount: 30000,
        isCompleted: true,
        completedAt: new Date("2024-02-15"),
      },
      {
        id: "milestone-001-2",
        name: "Three Months Coverage",
        targetAmount: 90000,
        isCompleted: true,
        completedAt: new Date("2024-05-20"),
      },
      {
        id: "milestone-001-3",
        name: "Six Months Coverage",
        targetAmount: 180000,
        isCompleted: false,
      },
    ],
    tags: ["security", "emergency", "priority", "financial-health"],
  },
  {
    id: "goal-002",
    name: "Japan Adventure Mission",
    description: "Dream trip to Japan including flights, accommodation, and experiences",
    targetAmount: 120000,
    currentAmount: 85000,
    deadline: "2024-10-15",
    category: "travel",
    priority: "high",
    icon: "🗾",
    color: "#3B82F6",
    createdAt: new Date("2024-03-01"),
    lastContribution: new Date("2024-12-18"),
    monthlyTarget: 12000,
    isCompleted: false,
    milestones: [
      {
        id: "milestone-002-1",
        name: "Flight Tickets",
        targetAmount: 40000,
        isCompleted: true,
        completedAt: new Date("2024-07-10"),
      },
      {
        id: "milestone-002-2",
        name: "Accommodation Fund",
        targetAmount: 80000,
        isCompleted: true,
        completedAt: new Date("2024-11-15"),
      },
      {
        id: "milestone-002-3",
        name: "Experience & Food Budget",
        targetAmount: 120000,
        isCompleted: false,
      },
    ],
    tags: ["travel", "japan", "vacation", "experience"],
  },
  {
    id: "goal-003",
    name: "Dream House Down Payment",
    description: "Save for 20% down payment on a 3-bedroom house in Bangkok",
    targetAmount: 600000,
    currentAmount: 180000,
    deadline: "2026-12-31",
    category: "house",
    priority: "high",
    icon: "🏡",
    color: "#10B981",
    createdAt: new Date("2024-01-01"),
    lastContribution: new Date("2024-12-22"),
    monthlyTarget: 20000,
    isCompleted: false,
    milestones: [
      {
        id: "milestone-003-1",
        name: "Initial Savings",
        targetAmount: 100000,
        isCompleted: true,
        completedAt: new Date("2024-06-30"),
      },
      {
        id: "milestone-003-2",
        name: "Halfway Point",
        targetAmount: 300000,
        isCompleted: false,
      },
      {
        id: "milestone-003-3",
        name: "Final Target",
        targetAmount: 600000,
        isCompleted: false,
      },
    ],
    tags: ["house", "property", "investment", "long-term"],
  },
  {
    id: "goal-004",
    name: "Tesla Model 3 Mission",
    description: "Save for a brand new Tesla Model 3 - sustainable transportation goal",
    targetAmount: 1800000,
    currentAmount: 450000,
    deadline: "2025-06-30",
    category: "car",
    priority: "medium",
    icon: "⚡",
    color: "#F59E0B",
    createdAt: new Date("2024-02-01"),
    lastContribution: new Date("2024-12-15"),
    monthlyTarget: 75000,
    isCompleted: false,
    milestones: [
      {
        id: "milestone-004-1",
        name: "Initial Down Payment",
        targetAmount: 360000,
        isCompleted: true,
        completedAt: new Date("2024-08-15"),
      },
      {
        id: "milestone-004-2",
        name: "Half Way There",
        targetAmount: 900000,
        isCompleted: false,
      },
      {
        id: "milestone-004-3",
        name: "Full Purchase Amount",
        targetAmount: 1800000,
        isCompleted: false,
      },
    ],
    tags: ["car", "tesla", "electric", "sustainable", "technology"],
  },
  {
    id: "goal-005",
    name: "Investment Portfolio Launch",
    description: "Build a diversified investment portfolio for long-term wealth building",
    targetAmount: 500000,
    currentAmount: 125000,
    deadline: "2025-12-31",
    category: "investment",
    priority: "high",
    icon: "📊",
    color: "#8B5CF6",
    createdAt: new Date("2024-04-01"),
    lastContribution: new Date("2024-12-21"),
    monthlyTarget: 25000,
    isCompleted: false,
    milestones: [
      {
        id: "milestone-005-1",
        name: "Emergency Fund Complete",
        targetAmount: 100000,
        isCompleted: true,
        completedAt: new Date("2024-09-30"),
      },
      {
        id: "milestone-005-2",
        name: "Diversified Portfolio",
        targetAmount: 300000,
        isCompleted: false,
      },
      {
        id: "milestone-005-3",
        name: "Target Portfolio Size",
        targetAmount: 500000,
        isCompleted: false,
      },
    ],
    tags: ["investment", "portfolio", "wealth", "long-term", "financial-freedom"],
  },
  {
    id: "goal-006",
    name: "MBA Education Fund",
    description: "Save for Master's degree in Business Administration at top university",
    targetAmount: 800000,
    currentAmount: 200000,
    deadline: "2025-08-31",
    category: "education",
    priority: "medium",
    icon: "🎓",
    color: "#EC4899",
    createdAt: new Date("2024-05-01"),
    lastContribution: new Date("2024-12-19"),
    monthlyTarget: 50000,
    isCompleted: false,
    milestones: [
      {
        id: "milestone-006-1",
        name: "Application Fees & Tests",
        targetAmount: 50000,
        isCompleted: true,
        completedAt: new Date("2024-08-31"),
      },
      {
        id: "milestone-006-2",
        name: "First Year Tuition",
        targetAmount: 400000,
        isCompleted: false,
      },
      {
        id: "milestone-006-3",
        name: "Complete Program Fund",
        targetAmount: 800000,
        isCompleted: false,
      },
    ],
    tags: ["education", "mba", "career", "investment", "future"],
  },
  {
    id: "goal-007",
    name: "Wedding Dream Mission",
    description: "Perfect wedding celebration with family and friends",
    targetAmount: 300000,
    currentAmount: 300000,
    deadline: "2024-12-31",
    category: "other",
    priority: "high",
    icon: "💒",
    color: "#F472B6",
    createdAt: new Date("2024-01-01"),
    lastContribution: new Date("2024-11-30"),
    monthlyTarget: 25000,
    isCompleted: true,
    milestones: [
      {
        id: "milestone-007-1",
        name: "Venue & Catering",
        targetAmount: 150000,
        isCompleted: true,
        completedAt: new Date("2024-06-15"),
      },
      {
        id: "milestone-007-2",
        name: "Photography & Decoration",
        targetAmount: 225000,
        isCompleted: true,
        completedAt: new Date("2024-09-30"),
      },
      {
        id: "milestone-007-3",
        name: "Complete Wedding Fund",
        targetAmount: 300000,
        isCompleted: true,
        completedAt: new Date("2024-11-30"),
      },
    ],
    tags: ["wedding", "celebration", "family", "milestone", "completed"],
  },
  {
    id: "goal-008",
    name: "Startup Business Launch",
    description: "Capital for launching a tech startup focused on fintech solutions",
    targetAmount: 1000000,
    currentAmount: 150000,
    deadline: "2025-03-31",
    category: "investment",
    priority: "critical",
    icon: "🚀",
    color: "#06B6D4",
    createdAt: new Date("2024-06-01"),
    lastContribution: new Date("2024-12-23"),
    monthlyTarget: 100000,
    isCompleted: false,
    milestones: [
      {
        id: "milestone-008-1",
        name: "MVP Development",
        targetAmount: 200000,
        isCompleted: false,
      },
      {
        id: "milestone-008-2",
        name: "Market Launch",
        targetAmount: 500000,
        isCompleted: false,
      },
      {
        id: "milestone-008-3",
        name: "Scale & Growth",
        targetAmount: 1000000,
        isCompleted: false,
      },
    ],
    tags: ["startup", "business", "entrepreneurship", "fintech", "innovation"],
  },
];

// Goal categories with enhanced metadata
export const goalCategories = {
  emergency: {
    name: "Emergency Fund",
    icon: "🛡️",
    color: "#EF4444",
    description: "Financial safety net for unexpected expenses",
    recommendedAmount: "6 months of expenses",
    priority: "critical",
  },
  travel: {
    name: "Travel & Experiences",
    icon: "✈️",
    color: "#3B82F6",
    description: "Adventures, vacations, and memorable experiences",
    recommendedAmount: "Based on destination and duration",
    priority: "medium",
  },
  house: {
    name: "Home & Property",
    icon: "🏠",
    color: "#10B981",
    description: "Down payment, home improvements, or property investment",
    recommendedAmount: "20% of property value",
    priority: "high",
  },
  car: {
    name: "Transportation",
    icon: "🚗",
    color: "#F59E0B",
    description: "Vehicle purchase, maintenance, or upgrades",
    recommendedAmount: "Based on vehicle type and financing",
    priority: "medium",
  },
  investment: {
    name: "Investment & Wealth",
    icon: "📈",
    color: "#8B5CF6",
    description: "Building long-term wealth through investments",
    recommendedAmount: "10-20% of income",
    priority: "high",
  },
  education: {
    name: "Education & Skills",
    icon: "🎓",
    color: "#EC4899",
    description: "Courses, degrees, certifications, and skill development",
    recommendedAmount: "Based on program cost",
    priority: "medium",
  },
  other: {
    name: "Other Goals",
    icon: "🎯",
    color: "#6B7280",
    description: "Custom goals and unique financial objectives",
    recommendedAmount: "Varies by goal",
    priority: "low",
  },
};

// Goal achievement rewards and celebrations
export const goalAchievementRewards = {
  emergency: {
    title: "Financial Guardian Achieved! 🛡️",
    message: "You've built an incredible safety net! Your future self will thank you for this financial security.",
    celebration: "🎉 Emergency Fund Complete! 🎉",
    nextSuggestion: "Consider investing excess emergency funds in high-yield savings or short-term investments.",
  },
  travel: {
    title: "Adventure Awaits! ✈️",
    message: "Your dream trip is now within reach! Time to book those tickets and create unforgettable memories.",
    celebration: "🌟 Travel Mission Accomplished! 🌟",
    nextSuggestion: "Start planning your next adventure or consider a travel experiences fund.",
  },
  house: {
    title: "Home Sweet Home! 🏡",
    message: "You've reached your down payment goal! Your dream home is closer than ever.",
    celebration: "🏠 Property Mission Complete! 🏠",
    nextSuggestion: "Consider additional funds for closing costs, moving expenses, and home improvements.",
  },
  car: {
    title: "Ready to Roll! 🚗",
    message: "Your vehicle fund is complete! Time to hit the road in style.",
    celebration: "⚡ Transportation Mission Success! ⚡",
    nextSuggestion: "Don't forget to budget for insurance, maintenance, and fuel costs.",
  },
  investment: {
    title: "Wealth Builder Extraordinaire! 📈",
    message: "You've built a solid investment foundation! Your money is now working for you.",
    celebration: "💰 Investment Mission Launched! 💰",
    nextSuggestion: "Consider diversifying further or increasing your monthly investment contributions.",
  },
  education: {
    title: "Knowledge Investor! 🎓",
    message: "Your education fund is ready! Investing in yourself is the best investment you can make.",
    celebration: "📚 Education Mission Funded! 📚",
    nextSuggestion: "Research programs, apply for scholarships, and consider additional skill development funds.",
  },
  other: {
    title: "Goal Crusher! 🎯",
    message: "You've achieved your custom goal! Your dedication and discipline are truly inspiring.",
    celebration: "🌟 Mission Accomplished! 🌟",
    nextSuggestion: "Set your next ambitious goal and continue your financial growth journey.",
  },
};

// Monthly contribution suggestions based on income and goal priority
export const getMonthlyContributionSuggestion = (
  monthlyIncome: number,
  goalCategory: keyof typeof goalCategories,
  goalPriority: "low" | "medium" | "high" | "critical"
): number => {
  const basePercentages = {
    emergency: 0.15, // 15% of income
    house: 0.20,     // 20% of income
    investment: 0.15, // 15% of income
    car: 0.10,       // 10% of income
    education: 0.08,  // 8% of income
    travel: 0.05,    // 5% of income
    other: 0.03,     // 3% of income
  };

  const priorityMultipliers = {
    low: 0.5,
    medium: 0.8,
    high: 1.0,
    critical: 1.2,
  };

  const baseAmount = monthlyIncome * basePercentages[goalCategory];
  const adjustedAmount = baseAmount * priorityMultipliers[goalPriority];

  return Math.round(adjustedAmount);
};

// Goal progress insights and tips
export const getGoalProgressInsights = (goal: EnhancedGoal) => {
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const daysRemaining = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const monthsRemaining = Math.max(1, daysRemaining / 30);
  const remaining = goal.targetAmount - goal.currentAmount;
  const requiredMonthly = remaining / monthsRemaining;

  const insights = [];

  // Progress-based insights
  if (progress >= 100) {
    insights.push({
      type: "success",
      message: "🎉 Congratulations! You've achieved this goal!",
      action: "Consider setting a new ambitious goal.",
    });
  } else if (progress >= 75) {
    insights.push({
      type: "success",
      message: "🚀 You're in the final stretch! Almost there!",
      action: "Keep up the momentum with consistent contributions.",
    });
  } else if (progress >= 50) {
    insights.push({
      type: "info",
      message: "⛽ Great progress! You're halfway to your goal.",
      action: "Consider increasing contributions if possible.",
    });
  } else if (progress >= 25) {
    insights.push({
      type: "info",
      message: "🔧 Good start! You're building momentum.",
      action: "Stay consistent with your monthly contributions.",
    });
  } else {
    insights.push({
      type: "warning",
      message: "📋 Time to accelerate your savings plan.",
      action: "Consider increasing your monthly contribution amount.",
    });
  }

  // Timeline-based insights
  if (daysRemaining < 0) {
    insights.push({
      type: "error",
      message: "⏰ This goal is past its deadline.",
      action: "Consider extending the deadline or increasing contributions.",
    });
  } else if (daysRemaining < 30) {
    insights.push({
      type: "warning",
      message: `⚡ Only ${daysRemaining} days left!`,
      action: `You need ฿${requiredMonthly.toLocaleString()} to reach your goal.`,
    });
  } else if (requiredMonthly > (goal.monthlyTarget || 0) * 1.5) {
    insights.push({
      type: "warning",
      message: "📈 You may need to increase your monthly savings.",
      action: `Consider saving ฿${requiredMonthly.toLocaleString()} monthly to stay on track.`,
    });
  }

  return insights;
};
