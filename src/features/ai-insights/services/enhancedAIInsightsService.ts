import type { EnhancedAIInsight } from "../components/EnhancedAIInsightCard";

interface FinancialProfile {
  netWorth: number;
  monthlyIncome: number;
  monthlySpending: number;
  savings: number;
  age: number;
  location: string;
  goals: Array<{
    id: string;
    target: number;
    current: number;
    deadline: string;
    category: string;
  }>;
  spendingByCategory: Record<string, number>;
  previousMonthData: {
    spending: number;
    income: number;
    savings: number;
  };
  riskTolerance: "low" | "medium" | "high";
  investmentExperience: "beginner" | "intermediate" | "advanced";
  culturalContext: "thai" | "international";
}

interface SpendingPattern {
  category: string;
  trend: "increasing" | "decreasing" | "stable" | "volatile";
  amount: number;
  frequency: "daily" | "weekly" | "monthly" | "irregular";
  seasonality: boolean;
  anomalies: Array<{
    date: Date;
    amount: number;
    reason?: string;
  }>;
}

interface MarketContext {
  inflation: number;
  interestRates: number;
  stockMarketTrend: "bull" | "bear" | "sideways";
  economicIndicators: {
    gdpGrowth: number;
    unemployment: number;
    consumerConfidence: number;
  };
}

class EnhancedAIInsightsService {
  private insights: EnhancedAIInsight[] = [];
  private insightCounter = 0;

  /**
   * Generate comprehensive AI insights based on user's financial profile
   */
  public async generateEnhancedInsights(
    profile: FinancialProfile,
    patterns: SpendingPattern[],
    marketContext?: MarketContext,
  ): Promise<EnhancedAIInsight[]> {
    this.insights = [];
    this.insightCounter = 0;

    // Generate different types of insights
    await Promise.all([
      this.analyzeSpendingPatterns(profile, patterns),
      this.analyzeSavingsOpportunities(profile),
      this.analyzeGoalProgress(profile),
      this.generatePredictiveInsights(profile, marketContext),
      this.generateCulturalInsights(profile),
      this.analyzeRiskFactors(profile),
      this.generateOptimizationSuggestions(profile),
      this.detectAnomalies(profile, patterns),
    ]);

    // Sort by priority and return top insights
    return this.insights.sort((a, b) => b.priority - a.priority).slice(0, 20); // Limit to top 20 insights
  }

  /**
   * Analyze spending patterns and generate insights
   */
  private async analyzeSpendingPatterns(
    profile: FinancialProfile,
    patterns: SpendingPattern[],
  ): Promise<void> {
    for (const pattern of patterns) {
      // Increasing spending pattern
      if (
        pattern.trend === "increasing" &&
        pattern.amount > profile.monthlyIncome * 0.1
      ) {
        this.addInsight({
          type: "warning",
          title: `${pattern.category} Spending Rising`,
          message: `Your ${pattern.category.toLowerCase()} expenses have increased by ${(((pattern.amount - profile.previousMonthData.spending * 0.2) / (profile.previousMonthData.spending * 0.2)) * 100).toFixed(0)}% this month. Consider reviewing your habits in this category.`,
          impact:
            pattern.amount > profile.monthlyIncome * 0.2 ? "high" : "medium",
          confidence: "high",
          category: "spending",
          priority: 7,
          data: {
            amount: pattern.amount,
            percentage: (pattern.amount / profile.monthlySpending) * 100,
            trend: "up",
          },
          tags: [pattern.category.toLowerCase(), "trend-analysis"],
          actionLabel: `Review ${pattern.category} Expenses`,
          onAction: () =>
            console.log(`Navigate to ${pattern.category} breakdown`),
        });
      }

      // Volatile spending pattern
      if (pattern.trend === "volatile" && pattern.anomalies.length > 2) {
        this.addInsight({
          type: "pattern",
          title: `Irregular ${pattern.category} Spending`,
          message: `Your ${pattern.category.toLowerCase()} spending shows high volatility with ${pattern.anomalies.length} unusual transactions this month. Consider setting a monthly budget for better control.`,
          impact: "medium",
          confidence: "high",
          category: "budgeting",
          priority: 6,
          data: {
            amount: pattern.amount,
            timeline: "This month",
          },
          tags: [pattern.category.toLowerCase(), "volatility", "budgeting"],
          actionLabel: `Set ${pattern.category} Budget`,
        });
      }

      // Seasonal spending insight
      if (pattern.seasonality) {
        this.addInsight({
          type: "tip",
          title: `Seasonal ${pattern.category} Planning`,
          message: `Based on your history, ${pattern.category.toLowerCase()} expenses typically increase during this period. Consider setting aside extra funds to manage this seasonal variation.`,
          impact: "low",
          confidence: "medium",
          category: "budgeting",
          priority: 4,
          tags: [pattern.category.toLowerCase(), "seasonal", "planning"],
        });
      }
    }
  }

  /**
   * Analyze savings opportunities
   */
  private async analyzeSavingsOpportunities(
    profile: FinancialProfile,
  ): Promise<void> {
    const savingsRate = (profile.savings / profile.monthlyIncome) * 100;

    // Low savings rate
    if (savingsRate < 20) {
      this.addInsight({
        type: "opportunity",
        title: "Boost Your Savings Rate",
        message: `Your current savings rate is ${savingsRate.toFixed(1)}%. Financial experts recommend saving at least 20% of your income. Small changes in spending can make a big difference!`,
        impact: "high",
        confidence: "high",
        category: "saving",
        priority: 8,
        data: {
          percentage: savingsRate,
          amount: profile.monthlyIncome * 0.2 - profile.savings,
        },
        tags: ["savings-rate", "financial-health"],
        actionLabel: "Create Savings Plan",
        isPersonalized: true,
      });
    }

    // High spending categories
    const sortedCategories = Object.entries(profile.spendingByCategory).sort(
      ([, a], [, b]) => b - a,
    );

    if (sortedCategories.length > 0) {
      const [topCategory, topAmount] = sortedCategories[0];
      if (topAmount > profile.monthlyIncome * 0.25) {
        this.addInsight({
          type: "optimization",
          title: `Optimize ${topCategory} Spending`,
          message: `${topCategory} represents ${((topAmount / profile.monthlySpending) * 100).toFixed(0)}% of your total spending. Even a 10% reduction could save you ฿${(topAmount * 0.1).toLocaleString()} monthly.`,
          impact: "medium",
          confidence: "high",
          category: "spending",
          priority: 6,
          data: {
            amount: topAmount * 0.1,
            percentage: 10,
          },
          tags: [topCategory.toLowerCase(), "optimization"],
          actionLabel: `Analyze ${topCategory}`,
          isPersonalized: true,
        });
      }
    }

    // Emergency fund check
    const emergencyFundTarget = profile.monthlySpending * 6;
    if (profile.savings < emergencyFundTarget) {
      this.addInsight({
        type: "goal_suggestion",
        title: "Build Emergency Fund",
        message: `Your emergency fund should cover 6 months of expenses (฿${emergencyFundTarget.toLocaleString()}). You currently have ${((profile.savings / emergencyFundTarget) * 100).toFixed(0)}% of this target.`,
        impact: "high",
        confidence: "high",
        category: "saving",
        priority: 9,
        data: {
          amount: emergencyFundTarget - profile.savings,
          percentage: (profile.savings / emergencyFundTarget) * 100,
        },
        tags: ["emergency-fund", "financial-security"],
        actionLabel: "Start Emergency Fund Goal",
        isPersonalized: true,
      });
    }
  }

  /**
   * Analyze goal progress and provide recommendations
   */
  private async analyzeGoalProgress(profile: FinancialProfile): Promise<void> {
    for (const goal of profile.goals) {
      const progress = (goal.current / goal.target) * 100;
      const remaining = goal.target - goal.current;
      const deadline = new Date(goal.deadline);
      const today = new Date();
      const daysRemaining = Math.ceil(
        (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );
      const monthsRemaining = daysRemaining / 30;

      // Goal behind schedule
      if (progress < 50 && monthsRemaining < 12) {
        const requiredMonthlySavings = remaining / monthsRemaining;
        this.addInsight({
          type: "warning",
          title: `${goal.category} Goal Behind Schedule`,
          message: `To reach your ${goal.category.toLowerCase()} goal on time, you need to save ฿${requiredMonthlySavings.toLocaleString()} monthly. Consider adjusting your timeline or increasing contributions.`,
          impact: "high",
          confidence: "high",
          category: "goals",
          priority: 8,
          data: {
            amount: requiredMonthlySavings,
            timeline: `${monthsRemaining.toFixed(0)} months`,
            percentage: progress,
          },
          tags: [goal.category.toLowerCase(), "goal-tracking"],
          actionLabel: "Adjust Goal Plan",
          isPersonalized: true,
        });
      }

      // Goal on track
      if (progress >= 75 && progress < 100) {
        this.addInsight({
          type: "achievement",
          title: `${goal.category} Goal Almost Complete!`,
          message: `Excellent progress! You're ${progress.toFixed(0)}% towards your ${goal.category.toLowerCase()} goal. Just ฿${remaining.toLocaleString()} more to go!`,
          impact: "medium",
          confidence: "high",
          category: "goals",
          priority: 5,
          data: {
            amount: remaining,
            percentage: progress,
          },
          tags: [goal.category.toLowerCase(), "achievement"],
          isPersonalized: true,
        });
      }

      // Goal completed
      if (progress >= 100) {
        this.addInsight({
          type: "achievement",
          title: `🎉 ${goal.category} Goal Achieved!`,
          message: `Congratulations! You've successfully reached your ${goal.category.toLowerCase()} goal. Time to celebrate and set your next financial milestone!`,
          impact: "high",
          confidence: "high",
          category: "goals",
          priority: 10,
          tags: [goal.category.toLowerCase(), "completed"],
          actionLabel: "Set New Goal",
          isPersonalized: true,
        });
      }
    }
  }

  /**
   * Generate predictive insights based on trends and market context
   */
  private async generatePredictiveInsights(
    profile: FinancialProfile,
    marketContext?: MarketContext,
  ): Promise<void> {
    const monthlySavings = profile.monthlyIncome - profile.monthlySpending;

    // Savings projection
    if (monthlySavings > 0) {
      const yearlyProjection = monthlySavings * 12;
      this.addInsight({
        type: "prediction",
        title: "Annual Savings Forecast",
        message: `At your current pace, you're projected to save ฿${yearlyProjection.toLocaleString()} this year. This represents a ${((yearlyProjection / profile.netWorth) * 100).toFixed(0)}% increase in your net worth.`,
        impact: "medium",
        confidence: "high",
        category: "saving",
        priority: 5,
        data: {
          amount: yearlyProjection,
          percentage: (yearlyProjection / profile.netWorth) * 100,
          timeline: "12 months",
        },
        tags: ["projection", "savings"],
        isPersonalized: true,
      });
    }

    // Market-based insights
    if (marketContext) {
      if (marketContext.inflation > 3) {
        this.addInsight({
          type: "risk_alert",
          title: "Inflation Impact Alert",
          message: `Current inflation at ${marketContext.inflation}% is eroding purchasing power. Consider inflation-protected investments or increasing your savings rate to maintain real wealth.`,
          impact: "high",
          confidence: "medium",
          category: "investing",
          priority: 7,
          data: {
            percentage: marketContext.inflation,
          },
          tags: ["inflation", "market-conditions"],
          actionLabel: "Review Investment Strategy",
        });
      }

      if (marketContext.interestRates > 4 && profile.savings > 100000) {
        this.addInsight({
          type: "opportunity",
          title: "High-Yield Savings Opportunity",
          message: `With interest rates at ${marketContext.interestRates}%, consider moving your savings to high-yield accounts. You could earn an extra ฿${((profile.savings * marketContext.interestRates) / 100 - (profile.savings * 1) / 100).toLocaleString()} annually.`,
          impact: "medium",
          confidence: "high",
          category: "saving",
          priority: 6,
          data: {
            amount:
              (profile.savings * marketContext.interestRates) / 100 -
              (profile.savings * 1) / 100,
            percentage: marketContext.interestRates,
          },
          tags: ["interest-rates", "optimization"],
          actionLabel: "Compare Savings Accounts",
        });
      }
    }
  }

  /**
   * Generate Thai cultural-specific financial insights
   */
  private async generateCulturalInsights(
    profile: FinancialProfile,
  ): Promise<void> {
    if (profile.culturalContext !== "thai") return;

    // Songkran preparation
    const now = new Date();
    const songkran = new Date(now.getFullYear(), 3, 13); // April 13
    const daysToSongkran = Math.ceil(
      (songkran.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (daysToSongkran > 0 && daysToSongkran < 60) {
      this.addInsight({
        type: "cultural",
        title: "เตรียมพร้อมสงกรานต์ 🌊",
        message: `อีก ${daysToSongkran} วันจะถึงเทศกาลสงกรานต์! ลองตั้งงบประมาณพิเศษสำหรับการเดินทาง ของขวัญ และกิจกรรมต่างๆ เพื่อไม่ให้กระทบงบประมาณรายเดือน`,
        impact: "medium",
        confidence: "high",
        category: "budgeting",
        priority: 6,
        data: {
          timeline: `${daysToSongkran} days`,
        },
        tags: ["songkran", "festival", "thai-culture"],
        actionLabel: "ตั้งงบสงกรานต์",
        isPersonalized: true,
      });
    }

    // Merit-making budget
    if (profile.spendingByCategory["Donations"] > 0) {
      const donationPercentage =
        (profile.spendingByCategory["Donations"] / profile.monthlyIncome) * 100;
      if (donationPercentage > 5) {
        this.addInsight({
          type: "cultural",
          title: "การทำบุญที่สมดุล 🙏",
          message: `คุณใช้จ่ายเพื่อการทำบุญ ${donationPercentage.toFixed(1)}% ของรายได้ ซึ่งแสดงถึงจิตใจที่ดีงาม แต่อย่าลืมดูแลความมั่นคงทางการเงินของตัวเองด้วยนะ`,
          impact: "low",
          confidence: "high",
          category: "spending",
          priority: 4,
          data: {
            percentage: donationPercentage,
          },
          tags: ["merit-making", "donations", "thai-culture"],
          isPersonalized: true,
        });
      }
    }

    // Family support insights
    if (profile.age > 25 && profile.monthlyIncome > 30000) {
      this.addInsight({
        type: "cultural",
        title: "การวางแผนเพื่อครอบครัว 👨‍👩‍👧‍👦",
        message: `ในวัฒนธรรมไทย การดูแลครอบครัวเป็นสิ่งสำคัญ ลองพิจารณาตั้งงบประมาณพิเศษสำหรับการดูแลพ่อแม่หรือค่าใช้จ่ายครอบครัวในอนาคต`,
        impact: "medium",
        confidence: "medium",
        category: "budgeting",
        priority: 5,
        tags: ["family-support", "thai-culture", "planning"],
        actionLabel: "วางแผนงบครอบครัว",
        isPersonalized: true,
      });
    }
  }

  /**
   * Analyze risk factors in financial profile
   */
  private async analyzeRiskFactors(profile: FinancialProfile): Promise<void> {
    // High debt-to-income ratio (simulated)
    const assumedDebt = profile.monthlySpending * 0.3; // Assume 30% of spending is debt payments
    const debtToIncomeRatio = (assumedDebt / profile.monthlyIncome) * 100;

    if (debtToIncomeRatio > 30) {
      this.addInsight({
        type: "risk_alert",
        title: "High Debt-to-Income Ratio",
        message: `Your estimated debt payments represent ${debtToIncomeRatio.toFixed(0)}% of your income. Financial advisors recommend keeping this below 30% to maintain financial health.`,
        impact: "high",
        confidence: "medium",
        category: "budgeting",
        priority: 8,
        data: {
          percentage: debtToIncomeRatio,
        },
        tags: ["debt", "risk-management"],
        actionLabel: "Review Debt Strategy",
        isPersonalized: true,
      });
    }

    // Single income source risk
    this.addInsight({
      type: "tip",
      title: "Diversify Income Sources",
      message: `Consider developing additional income streams to reduce financial risk. This could include freelancing, investments, or passive income opportunities.`,
      impact: "medium",
      confidence: "medium",
      category: "general",
      priority: 4,
      tags: ["income-diversification", "risk-management"],
      actionLabel: "Explore Income Options",
    });

    // Age-based retirement planning
    if (
      profile.age > 30 &&
      profile.savings < (profile.monthlyIncome * profile.age) / 2
    ) {
      this.addInsight({
        type: "warning",
        title: "Retirement Savings Behind Target",
        message: `At age ${profile.age}, you should ideally have saved ${profile.age / 2} times your annual income for retirement. Consider increasing your retirement contributions.`,
        impact: "high",
        confidence: "high",
        category: "saving",
        priority: 7,
        data: {
          amount:
            (profile.monthlyIncome * 12 * profile.age) / 2 - profile.savings,
        },
        tags: ["retirement", "age-based-planning"],
        actionLabel: "Plan Retirement Savings",
        isPersonalized: true,
      });
    }
  }

  /**
   * Generate optimization suggestions
   */
  private async generateOptimizationSuggestions(
    profile: FinancialProfile,
  ): Promise<void> {
    // Subscription optimization
    if (
      profile.spendingByCategory["Subscriptions"] >
      profile.monthlyIncome * 0.05
    ) {
      this.addInsight({
        type: "optimization",
        title: "Subscription Audit Needed",
        message: `You're spending ฿${profile.spendingByCategory["Subscriptions"].toLocaleString()} monthly on subscriptions. Review and cancel unused services to free up money for savings or investments.`,
        impact: "medium",
        confidence: "high",
        category: "spending",
        priority: 6,
        data: {
          amount: profile.spendingByCategory["Subscriptions"],
          percentage:
            (profile.spendingByCategory["Subscriptions"] /
              profile.monthlyIncome) *
            100,
        },
        tags: ["subscriptions", "optimization"],
        actionLabel: "Audit Subscriptions",
        isPersonalized: true,
      });
    }

    // Cashback and rewards optimization
    this.addInsight({
      type: "tip",
      title: "Maximize Credit Card Rewards",
      message: `Based on your spending patterns, you could earn an estimated ฿${(profile.monthlySpending * 0.015).toLocaleString()} monthly in cashback with the right credit card strategy.`,
      impact: "low",
      confidence: "medium",
      category: "optimization",
      priority: 3,
      data: {
        amount: profile.monthlySpending * 0.015,
      },
      tags: ["cashback", "credit-cards"],
      actionLabel: "Compare Credit Cards",
    });
  }

  /**
   * Detect spending anomalies
   */
  private async detectAnomalies(
    profile: FinancialProfile,
    patterns: SpendingPattern[],
  ): Promise<void> {
    for (const pattern of patterns) {
      if (pattern.anomalies.length > 0) {
        const largestAnomaly = pattern.anomalies.reduce((max, anomaly) =>
          anomaly.amount > max.amount ? anomaly : max,
        );

        if (largestAnomaly.amount > profile.monthlyIncome * 0.1) {
          this.addInsight({
            type: "warning",
            title: `Unusual ${pattern.category} Expense Detected`,
            message: `We detected an unusually large ${pattern.category.toLowerCase()} expense of ฿${largestAnomaly.amount.toLocaleString()} on ${largestAnomaly.date.toLocaleDateString()}. Make sure this was intentional.`,
            impact: "medium",
            confidence: "high",
            category: "spending",
            priority: 6,
            data: {
              amount: largestAnomaly.amount,
            },
            tags: ["anomaly", pattern.category.toLowerCase()],
            actionLabel: "Review Transaction",
            isPersonalized: true,
          });
        }
      }
    }
  }

  /**
   * Helper method to add insight with auto-generated ID and timestamp
   */
  private addInsight(
    insight: Omit<EnhancedAIInsight, "id" | "createdAt" | "isPersonalized"> & {
      isPersonalized?: boolean;
    },
  ): void {
    this.insights.push({
      ...insight,
      id: `insight-${++this.insightCounter}-${Date.now()}`,
      createdAt: new Date(),
      expiresAt:
        insight.type === "cultural"
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Cultural insights expire in 30 days
          : undefined,
      isPersonalized: insight.isPersonalized ?? false,
    });
  }
}

export const enhancedAIInsightsService = new EnhancedAIInsightsService();
