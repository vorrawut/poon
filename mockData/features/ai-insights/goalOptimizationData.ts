import type { GoalOptimization } from "../../../src/features/ai-insights/components/GoalOptimizer";

export const mockGoalOptimizations: GoalOptimization[] = [
  {
    goalId: "goal-001",
    goalName: "Emergency Fund (6 months)",
    currentTarget: 180000,
    currentSavings: 75000,
    currentMonthlyContribution: 8000,
    currentTimeline: 14, // months
    optimizations: [
      {
        type: "timeline",
        title: "Accelerate Timeline by 4 Months",
        description: "By increasing your monthly contribution to ฿12,000 and redirecting subscription savings, you could reach your emergency fund goal 4 months earlier.",
        impact: "high",
        confidence: 89,
        recommendation: {
          newMonthlyContribution: 12000,
          newTimeline: 10,
        },
        benefits: [
          "Reach financial security 4 months sooner",
          "Save ฿1,200 in potential interest charges",
          "Build stronger saving discipline",
          "Reduce financial stress earlier"
        ],
        tradeoffs: [
          "Less money available for discretionary spending",
          "Requires cutting subscription services by ฿890/month",
          "May need to reduce dining out budget"
        ],
        implementation: [
          "Cancel unused subscriptions (Netflix, Spotify Premium) - saves ฿520/month",
          "Reduce food delivery budget from ฿8,500 to ฿6,000/month",
          "Set up automatic transfer of ฿12,000 on salary day",
          "Move emergency fund to high-yield savings account (4.5% APY)"
        ]
      },
      {
        type: "strategy",
        title: "High-Yield Account Optimization",
        description: "Moving your emergency fund to a high-yield savings account earning 4.5% instead of 1% could generate an additional ฿2,625 annually while maintaining liquidity.",
        impact: "medium",
        confidence: 95,
        recommendation: {
          strategy: "High-yield savings with 4.5% APY",
        },
        benefits: [
          "Extra ฿2,625 annual earnings with same effort",
          "Compound growth accelerates goal achievement",
          "Maintains full liquidity for emergencies",
          "FDIC insured up to ฿1,000,000"
        ],
        tradeoffs: [
          "May require opening new bank account",
          "Potential transfer delays (1-2 business days)",
          "Rate subject to change with market conditions"
        ],
        implementation: [
          "Research top-rated high-yield savings accounts",
          "Open account with highest stable rate (currently 4.5%)",
          "Set up automatic monthly transfers",
          "Keep ฿10,000 in checking for immediate access"
        ]
      }
    ],
    predictedOutcomes: [
      {
        scenario: "conservative",
        probability: 85,
        timeline: 15,
        finalAmount: 185000,
        monthlyRequired: 8000
      },
      {
        scenario: "realistic",
        probability: 70,
        timeline: 12,
        finalAmount: 180000,
        monthlyRequired: 10000
      },
      {
        scenario: "optimistic",
        probability: 45,
        timeline: 9,
        finalAmount: 180000,
        monthlyRequired: 13500
      }
    ],
    riskAssessment: {
      level: "low",
      factors: [
        "Stable monthly income reduces contribution risk",
        "Emergency fund is conservative investment",
        "High liquidity requirement limits growth options"
      ],
      mitigation: [
        "Maintain current job performance for income stability",
        "Keep emergency fund separate from investment accounts",
        "Review and adjust contributions quarterly"
      ]
    }
  },
  {
    goalId: "goal-002", 
    goalName: "New Car Purchase",
    currentTarget: 800000,
    currentSavings: 120000,
    currentMonthlyContribution: 15000,
    currentTimeline: 46, // months
    optimizations: [
      {
        type: "amount",
        title: "Reduce Target with Smart Car Choice",
        description: "Consider a certified pre-owned vehicle (2-3 years old) to reduce your target by ฿200,000 while getting similar features and reliability.",
        impact: "high",
        confidence: 82,
        recommendation: {
          newTarget: 600000,
          newTimeline: 32,
        },
        benefits: [
          "Achieve goal 14 months earlier",
          "Save ฿200,000 on depreciation costs",
          "Lower insurance and registration fees",
          "Still get modern safety and tech features"
        ],
        tradeoffs: [
          "Vehicle may have 20,000-40,000 km already",
          "Shorter warranty period remaining",
          "Limited color and option choices",
          "Potentially higher maintenance costs after warranty"
        ],
        implementation: [
          "Research certified pre-owned programs from Honda, Toyota, Mazda",
          "Get pre-approved for financing to understand total costs",
          "Budget additional ฿5,000 for extended warranty",
          "Schedule inspections with trusted mechanic"
        ]
      },
      {
        type: "strategy",
        title: "Investment Growth Strategy",
        description: "Invest 70% of your car fund in conservative index funds while saving. Historical returns could reduce your required savings by 15-20%.",
        impact: "medium",
        confidence: 65,
        recommendation: {
          strategy: "70% conservative index funds, 30% high-yield savings",
          riskLevel: "moderate",
        },
        benefits: [
          "Potential 6-8% annual returns vs 4.5% savings",
          "Could reduce monthly contributions to ฿12,000",
          "Learn investment skills for future goals",
          "Tax-advantaged growth in investment accounts"
        ],
        tradeoffs: [
          "Market volatility could delay purchase",
          "Requires active monitoring and rebalancing",
          "Potential capital gains taxes on profits",
          "Risk of losing money in market downturns"
        ],
        implementation: [
          "Open investment account with low-cost broker",
          "Choose broad market index funds (SET50, global equity)",
          "Set up automatic monthly investments",
          "Plan to move to savings 6 months before purchase"
        ]
      }
    ],
    predictedOutcomes: [
      {
        scenario: "conservative",
        probability: 90,
        timeline: 48,
        finalAmount: 800000,
        monthlyRequired: 15000
      },
      {
        scenario: "realistic", 
        probability: 75,
        timeline: 42,
        finalAmount: 800000,
        monthlyRequired: 16500
      },
      {
        scenario: "optimistic",
        probability: 55,
        timeline: 36,
        finalAmount: 800000,
        monthlyRequired: 19000
      }
    ],
    riskAssessment: {
      level: "medium",
      factors: [
        "Car prices subject to market fluctuations",
        "Income stability affects large purchase timing",
        "Interest rates impact financing options",
        "Investment strategy adds market risk"
      ],
      mitigation: [
        "Monitor car market trends and timing",
        "Maintain stable employment",
        "Keep financing options open",
        "Have backup transportation plan"
      ]
    }
  },
  {
    goalId: "goal-003",
    goalName: "Thailand Travel Adventure",
    currentTarget: 120000,
    currentSavings: 35000,
    currentMonthlyContribution: 5000,
    currentTimeline: 17, // months
    optimizations: [
      {
        type: "timeline",
        title: "Early Bird Booking Savings",
        description: "Book your trip 6 months in advance to save 25-40% on flights and hotels, allowing you to reach your goal faster with lower target amount.",
        impact: "medium",
        confidence: 88,
        recommendation: {
          newTarget: 95000,
          newTimeline: 12,
          newMonthlyContribution: 5000,
        },
        benefits: [
          "Save ฿25,000 through early booking discounts",
          "Better selection of flights and accommodations",
          "Achieve goal 5 months earlier",
          "Lock in current prices against inflation"
        ],
        tradeoffs: [
          "Less flexibility to change travel dates",
          "Risk of plans changing due to unforeseen circumstances",
          "Cancellation fees if trip needs to be postponed"
        ],
        implementation: [
          "Research destinations and create detailed itinerary",
          "Compare prices across booking platforms",
          "Purchase travel insurance for trip protection",
          "Set calendar reminders for optimal booking windows"
        ]
      },
      {
        type: "strategy",
        title: "Travel Rewards Credit Card",
        description: "Use a travel rewards credit card for daily expenses to earn points toward flights and hotels, potentially covering 30-40% of trip costs.",
        impact: "high",
        confidence: 79,
        recommendation: {
          strategy: "Travel rewards credit card + points optimization",
        },
        benefits: [
          "Earn 2-5x points on travel and dining purchases",
          "Welcome bonus could cover ฿15,000-25,000 of trip costs",
          "Airport lounge access and travel perks",
          "No foreign transaction fees during travel"
        ],
        tradeoffs: [
          "Requires excellent credit score for best cards",
          "Annual fees of ฿3,000-8,000",
          "Must pay off balance monthly to avoid interest",
          "Points may have expiration dates"
        ],
        implementation: [
          "Research travel credit cards with best Thailand redemption rates",
          "Apply 3-4 months before booking to earn welcome bonus",
          "Use card for all eligible purchases but pay off monthly",
          "Track points and plan redemptions strategically"
        ]
      }
    ],
    predictedOutcomes: [
      {
        scenario: "conservative",
        probability: 95,
        timeline: 18,
        finalAmount: 120000,
        monthlyRequired: 5000
      },
      {
        scenario: "realistic",
        probability: 85,
        timeline: 15,
        finalAmount: 120000,
        monthlyRequired: 5700
      },
      {
        scenario: "optimistic",
        probability: 70,
        timeline: 12,
        finalAmount: 95000,
        monthlyRequired: 5000
      }
    ],
    riskAssessment: {
      level: "low",
      factors: [
        "Travel costs can fluctuate with seasons and events",
        "Currency exchange rates affect international purchasing power",
        "Health and safety conditions may impact travel plans"
      ],
      mitigation: [
        "Build 10-15% buffer into travel budget",
        "Monitor exchange rates and consider hedging strategies",
        "Purchase comprehensive travel insurance",
        "Have flexible booking options where possible"
      ]
    }
  }
];

export const mockGoalOptimizationSummary = {
  totalGoals: mockGoalOptimizations.length,
  highImpactOptimizations: mockGoalOptimizations.reduce((sum, goal) => 
    sum + goal.optimizations.filter(opt => opt.impact === 'high').length, 0
  ),
  averageTimelineImprovement: 6.3, // months
  totalPotentialSavings: 285000, // baht across all optimizations
  successProbabilityIncrease: 23 // percentage points
};
