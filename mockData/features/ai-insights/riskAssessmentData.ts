import type { FinancialRisk, FinancialHealthScore } from "../../../src/features/ai-insights/components/RiskAssessment";

export const mockFinancialRisks: FinancialRisk[] = [
  {
    id: "risk-001",
    category: "emergency",
    title: "Insufficient Emergency Fund",
    description: "Your current emergency fund of ฿75,000 covers only 2.5 months of expenses. Financial experts recommend 6 months of expenses (฿180,000) for optimal protection.",
    severity: "high",
    probability: 75,
    impact: 85,
    currentStatus: "at-risk",
    recommendations: {
      immediate: [
        "Stop all non-essential spending until emergency fund reaches ฿90,000",
        "Move emergency fund to high-yield savings account (4.5% APY)",
        "Set up automatic transfer of ฿8,000 monthly to emergency fund"
      ],
      shortTerm: [
        "Increase emergency fund to 4 months of expenses (฿120,000)",
        "Cancel unused subscriptions to free up ฿890/month",
        "Consider part-time income source for faster accumulation"
      ],
      longTerm: [
        "Build full 6-month emergency fund (฿180,000)",
        "Keep emergency fund separate from other savings goals",
        "Review and adjust target annually based on expense changes"
      ]
    },
    metrics: {
      currentValue: 75000,
      recommendedValue: 180000,
      unit: "฿",
      benchmark: 180000
    }
  },
  {
    id: "risk-002",
    category: "debt",
    title: "High Credit Card Utilization",
    description: "Your credit card utilization is at 78% across 3 cards, negatively impacting your credit score and creating high interest charges of ฿2,400/month.",
    severity: "critical",
    probability: 95,
    impact: 90,
    currentStatus: "critical",
    recommendations: {
      immediate: [
        "Pay minimum ฿15,000 toward highest interest card this month",
        "Stop using credit cards for new purchases",
        "Contact credit card companies to negotiate payment plans"
      ],
      shortTerm: [
        "Use debt avalanche method - pay minimums on all cards, extra on highest rate",
        "Consider balance transfer to 0% APR card if qualified",
        "Reduce utilization below 30% within 3 months"
      ],
      longTerm: [
        "Pay off all credit card debt within 18 months",
        "Keep utilization below 10% for optimal credit score",
        "Build habit of paying off full balance monthly"
      ]
    },
    metrics: {
      currentValue: 78,
      recommendedValue: 10,
      unit: "%",
      benchmark: 30
    }
  },
  {
    id: "risk-003",
    category: "insurance",
    title: "Inadequate Health Insurance Coverage",
    description: "Your current health insurance has a ฿50,000 deductible and 70% coverage. A major medical event could result in ฿200,000+ out-of-pocket expenses.",
    severity: "high",
    probability: 25,
    impact: 95,
    currentStatus: "vulnerable",
    recommendations: {
      immediate: [
        "Review current policy details and coverage limits",
        "Research supplemental insurance options",
        "Build health savings account with ฿25,000 initial funding"
      ],
      shortTerm: [
        "Compare health insurance plans during next enrollment period",
        "Consider upgrading to plan with ฿20,000 deductible and 80% coverage",
        "Add critical illness coverage for major medical events"
      ],
      longTerm: [
        "Maintain comprehensive health coverage throughout career",
        "Build dedicated health emergency fund of ฿100,000",
        "Consider long-term care insurance after age 40"
      ]
    },
    metrics: {
      currentValue: 70,
      recommendedValue: 90,
      unit: "% coverage",
      benchmark: 80
    }
  },
  {
    id: "risk-004",
    category: "income",
    title: "Single Income Source Dependency",
    description: "100% of your income comes from one employer with no backup income streams. Job loss could immediately eliminate all income for extended periods.",
    severity: "medium",
    probability: 15,
    impact: 100,
    currentStatus: "at-risk",
    recommendations: {
      immediate: [
        "Update resume and LinkedIn profile",
        "Network with industry contacts and maintain relationships",
        "Document all skills and achievements for quick job search"
      ],
      shortTerm: [
        "Develop marketable side skill (freelance writing, consulting, tutoring)",
        "Create passive income stream (rental property, dividends, online course)",
        "Build professional network in your industry"
      ],
      longTerm: [
        "Establish 2-3 income sources with at least 20% from non-employment",
        "Build reputation and client base for potential freelance transition",
        "Consider starting small business in area of expertise"
      ]
    },
    metrics: {
      currentValue: 1,
      recommendedValue: 3,
      unit: " income sources",
      benchmark: 2
    }
  },
  {
    id: "risk-005",
    category: "investment",
    title: "Lack of Investment Diversification",
    description: "85% of your investments are in Thai stocks with heavy concentration in technology sector. Market downturns could severely impact your portfolio.",
    severity: "medium",
    probability: 40,
    impact: 70,
    currentStatus: "at-risk",
    recommendations: {
      immediate: [
        "Rebalance portfolio to reduce technology sector exposure to 25%",
        "Research international index funds for geographic diversification",
        "Set stop-loss orders on individual stock positions"
      ],
      shortTerm: [
        "Allocate 40% to international markets (US, Europe, emerging markets)",
        "Add bond allocation of 20% for stability",
        "Include real estate investment trusts (REITs) for property exposure"
      ],
      longTerm: [
        "Maintain diversified portfolio across asset classes and geographies",
        "Rebalance quarterly to maintain target allocations",
        "Increase bond allocation as you approach retirement age"
      ]
    },
    metrics: {
      currentValue: 15,
      recommendedValue: 60,
      unit: "% diversification score",
      benchmark: 50
    }
  },
  {
    id: "risk-006",
    category: "spending",
    title: "Lifestyle Inflation Risk",
    description: "Your expenses have increased by 35% over the past year while income grew only 12%. This unsustainable trend could eliminate your ability to save and invest.",
    severity: "medium",
    probability: 80,
    impact: 60,
    currentStatus: "at-risk",
    recommendations: {
      immediate: [
        "Track all expenses for next 30 days to identify spending patterns",
        "Implement 50/30/20 budget rule (needs/wants/savings)",
        "Cancel or downgrade 3 highest non-essential expenses"
      ],
      shortTerm: [
        "Reduce discretionary spending by 20% over next 3 months",
        "Automate savings to occur before discretionary spending",
        "Find lower-cost alternatives for regular expenses"
      ],
      longTerm: [
        "Maintain expenses growth below income growth rate",
        "Review and optimize major expenses annually",
        "Build systems to prevent lifestyle inflation with future raises"
      ]
    },
    metrics: {
      currentValue: 35,
      recommendedValue: 10,
      unit: "% expense growth",
      benchmark: 15
    }
  }
];

export const mockFinancialHealthScore: FinancialHealthScore = {
  overall: 68,
  categories: {
    emergency: 42, // Low due to insufficient emergency fund
    debt: 35,      // Poor due to high credit card utilization
    savings: 78,   // Good savings rate
    investment: 65, // Decent but needs diversification
    insurance: 55,  // Adequate but could be better
    income: 85     // Strong current income
  },
  trend: "stable",
  monthlyChange: -2 // Slight decline due to increased spending
};

export const mockRiskAssessmentSummary = {
  totalRisks: mockFinancialRisks.length,
  criticalRisks: mockFinancialRisks.filter(r => r.severity === 'critical').length,
  highRisks: mockFinancialRisks.filter(r => r.severity === 'high').length,
  averageRiskScore: Math.round(
    mockFinancialRisks.reduce((sum, risk) => sum + (risk.probability * risk.impact / 100), 0) / mockFinancialRisks.length
  ),
  improvementPotential: 32, // Points that could be gained by addressing all risks
  timeToSecure: 18 // Months to address all major risks
};
