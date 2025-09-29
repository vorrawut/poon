import type { SpendingPattern } from "../../../src/features/ai-insights/components/SpendingPatternAnalyzer";

export const mockSpendingPatterns: SpendingPattern[] = [
  {
    id: "pattern-001",
    type: "trend",
    title: "Rising Food Delivery Costs",
    description: "Your food delivery expenses have increased by 45% over the past 3 months, averaging ฿8,500 monthly. This trend coincides with working from home patterns.",
    confidence: 92,
    impact: "high",
    frequency: "daily",
    category: "Food & Dining",
    amount: 8500,
    change: 45,
    suggestions: [
      "Set a monthly food delivery budget of ฿6,000",
      "Try meal prep on Sundays to reduce weekday ordering",
      "Use delivery apps only on weekends",
      "Explore cooking classes to make home cooking more enjoyable"
    ],
    data: {
      timeline: [
        { date: "2024-09", amount: 5800 },
        { date: "2024-10", amount: 7200 },
        { date: "2024-11", amount: 8100 },
        { date: "2024-12", amount: 8500 }
      ],
      categories: [
        { name: "Thai Food", percentage: 35, amount: 2975 },
        { name: "Western Food", percentage: 28, amount: 2380 },
        { name: "Japanese Food", percentage: 20, amount: 1700 },
        { name: "Coffee & Drinks", percentage: 17, amount: 1445 }
      ],
      triggers: ["Working from home", "Rainy weather", "Late work hours"],
      predictedNext: { date: "2025-01", amount: 9200 }
    }
  },
  {
    id: "pattern-002",
    type: "recurring",
    title: "Monthly Subscription Creep",
    description: "You have 12 active subscriptions totaling ฿3,450/month. 4 subscriptions haven't been used in the last 60 days, wasting ฿890/month.",
    confidence: 98,
    impact: "medium",
    frequency: "monthly",
    category: "Digital Services",
    amount: 3450,
    change: 15,
    suggestions: [
      "Cancel unused Netflix and Spotify premium accounts (฿520/month savings)",
      "Downgrade Adobe Creative Suite to Photography plan (฿300/month savings)",
      "Use annual billing for active subscriptions (10-15% discount)",
      "Set calendar reminders to review subscriptions quarterly"
    ],
    data: {
      timeline: [
        { date: "2024-09", amount: 2890 },
        { date: "2024-10", amount: 3100 },
        { date: "2024-11", amount: 3350 },
        { date: "2024-12", amount: 3450 }
      ],
      categories: [
        { name: "Streaming", percentage: 42, amount: 1449 },
        { name: "Software", percentage: 31, amount: 1070 },
        { name: "Cloud Storage", percentage: 15, amount: 518 },
        { name: "News & Magazines", percentage: 12, amount: 414 }
      ],
      triggers: ["Free trial conversions", "Promotional offers", "Feature upgrades"]
    }
  },
  {
    id: "pattern-003",
    type: "anomaly",
    title: "Weekend Shopping Spikes",
    description: "Your shopping expenses spike 320% on weekends compared to weekdays, with Saturday being the highest at ฿4,200 average per day.",
    confidence: 87,
    impact: "high",
    frequency: "weekly",
    category: "Shopping & Retail",
    amount: 16800,
    change: 28,
    suggestions: [
      "Create a shopping list before weekend trips",
      "Set a weekend spending limit of ฿2,500",
      "Try online shopping with 24-hour delay before purchasing",
      "Find free weekend activities to reduce shopping temptation"
    ],
    data: {
      timeline: [
        { date: "Week 1", amount: 12500 },
        { date: "Week 2", amount: 15800 },
        { date: "Week 3", amount: 18200 },
        { date: "Week 4", amount: 16800 }
      ],
      categories: [
        { name: "Clothing", percentage: 45, amount: 7560 },
        { name: "Electronics", percentage: 28, amount: 4704 },
        { name: "Home & Garden", percentage: 18, amount: 3024 },
        { name: "Books & Hobbies", percentage: 9, amount: 1512 }
      ],
      triggers: ["Weekend mood", "Sales and promotions", "Social shopping with friends"]
    }
  },
  {
    id: "pattern-004",
    type: "seasonal",
    title: "Holiday Season Spending Surge",
    description: "December spending is 180% higher than average months due to gifts, travel, and celebrations. This pattern repeats annually with 95% consistency.",
    confidence: 95,
    impact: "high",
    frequency: "yearly",
    category: "Gifts & Celebrations",
    amount: 45000,
    change: 180,
    suggestions: [
      "Start a holiday savings fund in January (฿3,750/month)",
      "Set gift budgets per person before shopping",
      "Consider experiences over material gifts",
      "Book travel and accommodations early for better rates"
    ],
    data: {
      timeline: [
        { date: "2024-01", amount: 15000 },
        { date: "2024-06", amount: 16000 },
        { date: "2024-09", amount: 18000 },
        { date: "2024-12", amount: 45000 }
      ],
      categories: [
        { name: "Gifts", percentage: 40, amount: 18000 },
        { name: "Travel", percentage: 35, amount: 15750 },
        { name: "Dining Out", percentage: 15, amount: 6750 },
        { name: "Decorations", percentage: 10, amount: 4500 }
      ],
      triggers: ["Holiday celebrations", "Family gatherings", "Year-end bonuses"],
      predictedNext: { date: "2025-12", amount: 48000 }
    }
  },
  {
    id: "pattern-005",
    type: "behavioral",
    title: "Stress-Induced Spending",
    description: "Your spending increases by 65% during high-stress periods (work deadlines, personal events). Retail therapy purchases average ฿2,800 per stress event.",
    confidence: 78,
    impact: "medium",
    frequency: "monthly",
    category: "Impulse Purchases",
    amount: 8400,
    change: 65,
    suggestions: [
      "Identify stress triggers and plan healthy alternatives",
      "Implement a 24-hour cooling-off period for non-essential purchases",
      "Keep a stress spending journal to increase awareness",
      "Set up automatic transfers to savings during high-income periods"
    ],
    data: {
      timeline: [
        { date: "High Stress Week", amount: 8400 },
        { date: "Normal Week", amount: 3200 },
        { date: "Low Stress Week", amount: 2100 }
      ],
      categories: [
        { name: "Comfort Shopping", percentage: 55, amount: 4620 },
        { name: "Dining Out", percentage: 30, amount: 2520 },
        { name: "Entertainment", percentage: 15, amount: 1260 }
      ],
      triggers: ["Work deadlines", "Relationship issues", "Health concerns", "Financial worry"]
    }
  },
  {
    id: "pattern-006",
    type: "trend",
    title: "Rising Transportation Costs",
    description: "Fuel and transportation expenses have steadily increased by 25% over 6 months due to rising fuel prices and increased travel frequency.",
    confidence: 91,
    impact: "medium",
    frequency: "monthly",
    category: "Transportation",
    amount: 5200,
    change: 25,
    suggestions: [
      "Consider carpooling or public transport for regular commutes",
      "Combine errands into single trips to reduce fuel consumption",
      "Explore remote work options to reduce commuting",
      "Look into fuel-efficient vehicle options for next purchase"
    ],
    data: {
      timeline: [
        { date: "2024-07", amount: 4100 },
        { date: "2024-09", amount: 4600 },
        { date: "2024-11", amount: 5000 },
        { date: "2024-12", amount: 5200 }
      ],
      categories: [
        { name: "Fuel", percentage: 60, amount: 3120 },
        { name: "Public Transport", percentage: 25, amount: 1300 },
        { name: "Ride-sharing", percentage: 10, amount: 520 },
        { name: "Parking", percentage: 5, amount: 260 }
      ],
      predictedNext: { date: "2025-01", amount: 5400 }
    }
  }
];

export const mockSpendingPatternSummary = {
  totalPatterns: mockSpendingPatterns.length,
  highImpactPatterns: mockSpendingPatterns.filter(p => p.impact === 'high').length,
  averageConfidence: Math.round(
    mockSpendingPatterns.reduce((sum, p) => sum + p.confidence, 0) / mockSpendingPatterns.length
  ),
  potentialMonthlySavings: mockSpendingPatterns.reduce((sum, p) => {
    return sum + (p.change < 0 ? 0 : Math.round(p.amount * 0.15)); // 15% potential savings
  }, 0),
  topCategories: [
    "Food & Dining",
    "Shopping & Retail", 
    "Digital Services",
    "Transportation",
    "Gifts & Celebrations"
  ]
};
