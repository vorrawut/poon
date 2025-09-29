import type { AIInsight } from "../components/AIInsightCard";

interface FinancialData {
  netWorth: number;
  monthlyIncome: number;
  monthlySpending: number;
  savings: number;
  goals: Array<{
    id: string;
    target: number;
    current: number;
    deadline: string;
    category: string;
  }>;
  spendingByCategory: Record<string, number>;
  previousMonthData?: {
    spending: number;
    income: number;
    savings: number;
  };
}

class AIInsightsService {
  private insights: AIInsight[] = [];

  /**
   * Generate AI insights based on user's financial data
   */
  async generateInsights(data: FinancialData): Promise<AIInsight[]> {
    this.insights = [];

    // Analyze different aspects of financial health
    this.analyzeSpendingPatterns(data);
    this.analyzeSavingsOpportunities(data);
    this.analyzeGoalProgress(data);
    this.analyzeFinancialHealth(data);
    this.generatePredictions(data);
    this.identifyOptimizations(data);

    // Sort by impact and confidence
    return this.insights.sort((a, b) => {
      const impactWeight = { high: 3, medium: 2, low: 1 };
      const aScore = impactWeight[a.impact] * (a.confidence / 100);
      const bScore = impactWeight[b.impact] * (b.confidence / 100);
      return bScore - aScore;
    });
  }

  /**
   * Analyze spending patterns and identify trends
   */
  private analyzeSpendingPatterns(data: FinancialData): void {
    const { spendingByCategory, previousMonthData, monthlySpending } = data;

    // Check for overspending in categories
    Object.entries(spendingByCategory).forEach(([category, amount]) => {
      const percentage = (amount / monthlySpending) * 100;

      // High spending in specific categories
      if (percentage > 30 && category !== "Housing") {
        this.addInsight({
          id: `overspending-${category}`,
          type: "warning",
          title: `High ${category} Spending`,
          description: `You're spending ${percentage.toFixed(1)}% of your budget on ${category.toLowerCase()}. Consider reviewing these expenses to optimize your budget.`,
          impact: percentage > 40 ? "high" : "medium",
          confidence: 85,
          actionable: true,
          action: {
            label: `Review ${category} Expenses`,
            onClick: () => console.log(`Navigate to ${category} breakdown`),
          },
          data: {
            amount,
            percentage: percentage - 25, // Compared to recommended 25%
            category,
          },
        });
      }
    });

    // Month-over-month spending changes
    if (previousMonthData) {
      const spendingChange = monthlySpending - previousMonthData.spending;
      const changePercentage =
        (spendingChange / previousMonthData.spending) * 100;

      if (Math.abs(changePercentage) > 15) {
        this.addInsight({
          id: "spending-trend",
          type: changePercentage > 0 ? "warning" : "achievement",
          title:
            changePercentage > 0 ? "Spending Increased" : "Spending Reduced",
          description:
            changePercentage > 0
              ? `Your spending increased by ${changePercentage.toFixed(1)}% this month. Let's identify what drove this change.`
              : `Great job! You reduced spending by ${Math.abs(changePercentage).toFixed(1)}% this month. Keep up the good work!`,
          impact: Math.abs(changePercentage) > 25 ? "high" : "medium",
          confidence: 90,
          actionable: true,
          action: {
            label:
              changePercentage > 0 ? "Analyze Increase" : "Maintain Momentum",
            onClick: () => console.log("Navigate to spending analysis"),
          },
          data: {
            amount: Math.abs(spendingChange),
            percentage: changePercentage,
          },
        });
      }
    }
  }

  /**
   * Identify savings opportunities
   */
  private analyzeSavingsOpportunities(data: FinancialData): void {
    const { monthlyIncome, savings, spendingByCategory } = data;
    const savingsRate = (savings / monthlyIncome) * 100;

    // Low savings rate
    if (savingsRate < 20) {
      this.addInsight({
        id: "low-savings-rate",
        type: "opportunity",
        title: "Boost Your Savings Rate",
        description: `You're saving ${savingsRate.toFixed(1)}% of your income. Financial experts recommend saving at least 20%. Small changes can make a big difference!`,
        impact: "high",
        confidence: 95,
        actionable: true,
        action: {
          label: "Find Savings Opportunities",
          onClick: () => console.log("Navigate to savings optimizer"),
        },
        data: {
          percentage: savingsRate,
          amount: monthlyIncome * 0.2 - savings, // Amount needed to reach 20%
        },
      });
    }

    // Subscription optimization
    const subscriptionSpending =
      spendingByCategory["Subscriptions & Memberships"] || 0;
    if (subscriptionSpending > monthlyIncome * 0.05) {
      // More than 5% on subscriptions
      this.addInsight({
        id: "subscription-optimization",
        type: "tip",
        title: "Review Your Subscriptions",
        description: `You're spending ฿${subscriptionSpending.toLocaleString()} monthly on subscriptions. Review and cancel unused services to save money.`,
        impact: "medium",
        confidence: 80,
        actionable: true,
        action: {
          label: "Audit Subscriptions",
          onClick: () => console.log("Navigate to subscription manager"),
        },
        data: {
          amount: subscriptionSpending,
          percentage: (subscriptionSpending / monthlyIncome) * 100,
        },
      });
    }
  }

  /**
   * Analyze goal progress and provide recommendations
   */
  private analyzeGoalProgress(data: FinancialData): void {
    const { goals } = data;

    goals.forEach((goal) => {
      const progress = (goal.current / goal.target) * 100;
      const remaining = goal.target - goal.current;
      const deadline = new Date(goal.deadline);
      const monthsLeft = Math.max(
        1,
        Math.ceil(
          (deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30),
        ),
      );
      const monthlyRequired = remaining / monthsLeft;

      // Goal behind schedule
      if (progress < 50 && monthsLeft < 6) {
        this.addInsight({
          id: `goal-behind-${goal.id}`,
          type: "warning",
          title: `${goal.category} Goal Behind Schedule`,
          description: `You need to save ฿${monthlyRequired.toLocaleString()} monthly to reach your ${goal.category.toLowerCase()} goal on time. Consider adjusting your budget or timeline.`,
          impact: "high",
          confidence: 90,
          actionable: true,
          action: {
            label: "Optimize Goal Plan",
            onClick: () => console.log(`Navigate to goal ${goal.id}`),
          },
          data: {
            amount: monthlyRequired,
            percentage: progress,
            timeline: `${monthsLeft} months left`,
          },
        });
      }

      // Goal on track
      if (progress >= 75) {
        this.addInsight({
          id: `goal-success-${goal.id}`,
          type: "achievement",
          title: `${goal.category} Goal Almost Complete!`,
          description: `You're ${progress.toFixed(1)}% of the way to your ${goal.category.toLowerCase()} goal. Just ฿${remaining.toLocaleString()} to go!`,
          impact: "medium",
          confidence: 95,
          actionable: true,
          action: {
            label: "Final Push",
            onClick: () => console.log(`Navigate to goal ${goal.id}`),
          },
          data: {
            amount: remaining,
            percentage: progress,
          },
        });
      }
    });
  }

  /**
   * Analyze overall financial health
   */
  private analyzeFinancialHealth(data: FinancialData): void {
    const { monthlyIncome, monthlySpending, netWorth } = data;
    const expenseRatio = (monthlySpending / monthlyIncome) * 100;

    // High expense ratio
    if (expenseRatio > 80) {
      this.addInsight({
        id: "high-expense-ratio",
        type: "warning",
        title: "High Expense Ratio",
        description: `You're spending ${expenseRatio.toFixed(1)}% of your income. This leaves little room for savings and emergencies. Consider reducing expenses or increasing income.`,
        impact: "high",
        confidence: 95,
        actionable: true,
        action: {
          label: "Create Action Plan",
          onClick: () => console.log("Navigate to budget optimizer"),
        },
        data: {
          percentage: expenseRatio,
          amount: monthlySpending - monthlyIncome * 0.7, // Amount over 70%
        },
      });
    }

    // Emergency fund assessment
    const emergencyFundMonths = netWorth / monthlySpending;
    if (emergencyFundMonths < 3) {
      this.addInsight({
        id: "emergency-fund",
        type: "tip",
        title: "Build Emergency Fund",
        description: `Your emergency fund covers ${emergencyFundMonths.toFixed(1)} months of expenses. Aim for 3-6 months to protect against unexpected events.`,
        impact: "high",
        confidence: 90,
        actionable: true,
        action: {
          label: "Start Emergency Fund",
          onClick: () => console.log("Create emergency fund goal"),
        },
        data: {
          amount: monthlySpending * 3 - netWorth,
          timeline: "3-6 months recommended",
        },
      });
    }
  }

  /**
   * Generate predictive insights
   */
  private generatePredictions(data: FinancialData): void {
    const { monthlyIncome, monthlySpending } = data;
    const monthlySavings = monthlyIncome - monthlySpending;

    // Savings projection
    if (monthlySavings > 0) {
      const yearlyProjection = monthlySavings * 12;
      this.addInsight({
        id: "savings-projection",
        type: "prediction",
        title: "Annual Savings Forecast",
        description: `At your current pace, you'll save ฿${yearlyProjection.toLocaleString()} this year. That's ${((monthlySavings / monthlyIncome) * 100).toFixed(1)}% of your income!`,
        impact: "medium",
        confidence: 75,
        actionable: false,
        data: {
          amount: yearlyProjection,
          percentage: (monthlySavings / monthlyIncome) * 100,
          timeline: "12 months",
        },
      });
    }

    // Spending trend prediction
    const spendingTrend = this.calculateSpendingTrend(data);
    if (Math.abs(spendingTrend) > 5) {
      this.addInsight({
        id: "spending-trend-prediction",
        type: "prediction",
        title:
          spendingTrend > 0
            ? "Spending Trend Rising"
            : "Spending Trend Falling",
        description: `Based on recent patterns, your spending is trending ${spendingTrend > 0 ? "upward" : "downward"} by ${Math.abs(spendingTrend).toFixed(1)}% monthly.`,
        impact: Math.abs(spendingTrend) > 10 ? "high" : "medium",
        confidence: 70,
        actionable: spendingTrend > 0,
        action:
          spendingTrend > 0
            ? {
                label: "Review Spending Trend",
                onClick: () => console.log("Navigate to spending trends"),
              }
            : undefined,
        data: {
          percentage: spendingTrend,
        },
      });
    }
  }

  /**
   * Identify optimization opportunities
   */
  private identifyOptimizations(data: FinancialData): void {
    const { spendingByCategory, monthlyIncome } = data;

    // Find categories with optimization potential
    const optimizableCategories = Object.entries(spendingByCategory)
      .filter(([category, amount]) => {
        const percentage = (amount / monthlyIncome) * 100;
        return percentage > 10 && category !== "Housing"; // Focus on significant non-housing expenses
      })
      .sort(([, a], [, b]) => b - a) // Sort by amount
      .slice(0, 2); // Top 2 categories

    optimizableCategories.forEach(([category, amount]) => {
      const optimizationPotential = amount * 0.15; // Assume 15% optimization potential

      this.addInsight({
        id: `optimization-${category}`,
        type: "optimization",
        title: `Optimize ${category} Spending`,
        description: `By reducing ${category.toLowerCase()} expenses by just 15%, you could save ฿${optimizationPotential.toLocaleString()} monthly - that's ฿${(optimizationPotential * 12).toLocaleString()} per year!`,
        impact: "medium",
        confidence: 70,
        actionable: true,
        action: {
          label: `Optimize ${category}`,
          onClick: () => console.log(`Navigate to ${category} optimization`),
        },
        data: {
          amount: optimizationPotential,
          percentage: 15,
          category,
        },
      });
    });
  }

  /**
   * Calculate spending trend based on historical data
   */
  private calculateSpendingTrend(data: FinancialData): number {
    // Simplified trend calculation - in real implementation, this would use more historical data
    if (data.previousMonthData) {
      const currentSpending = data.monthlySpending;
      const previousSpending = data.previousMonthData.spending;
      return ((currentSpending - previousSpending) / previousSpending) * 100;
    }
    return 0;
  }

  /**
   * Add insight to the collection
   */
  private addInsight(insight: AIInsight): void {
    this.insights.push(insight);
  }

  /**
   * Generate Thai-specific cultural insights
   */
  generateThaiCulturalInsights(data: FinancialData): AIInsight[] {
    const culturalInsights: AIInsight[] = [];

    // Festival spending preparation
    const currentMonth = new Date().getMonth();
    const upcomingFestivals = this.getUpcomingThaiFestivals(currentMonth);

    if (upcomingFestivals.length > 0) {
      const festival = upcomingFestivals[0];
      culturalInsights.push({
        id: `festival-prep-${festival.name}`,
        type: "tip",
        title: `Prepare for ${festival.name}`,
        description: `${festival.name} is coming up in ${festival.monthsAway} month(s). Consider setting aside ฿${festival.estimatedCost.toLocaleString()} for celebrations and gifts.`,
        impact: "medium",
        confidence: 80,
        actionable: true,
        action: {
          label: "Create Festival Budget",
          onClick: () => console.log(`Create ${festival.name} budget goal`),
        },
        data: {
          amount: festival.estimatedCost,
          timeline: `${festival.monthsAway} month(s)`,
        },
      });
    }

    // Merit-making budget suggestion
    const meritMakingSpending =
      data.spendingByCategory["Gifts & Donations"] || 0;
    if (meritMakingSpending < data.monthlyIncome * 0.02) {
      // Less than 2% on donations
      culturalInsights.push({
        id: "merit-making-suggestion",
        type: "tip",
        title: "Consider Merit-Making Budget",
        description:
          "Setting aside a small amount for merit-making and charitable giving can bring both spiritual fulfillment and tax benefits.",
        impact: "low",
        confidence: 60,
        actionable: true,
        action: {
          label: "Set Donation Budget",
          onClick: () => console.log("Create merit-making budget"),
        },
        data: {
          amount: data.monthlyIncome * 0.02,
          percentage: 2,
        },
      });
    }

    return culturalInsights;
  }

  /**
   * Get upcoming Thai festivals
   */
  private getUpcomingThaiFestivals(currentMonth: number) {
    const festivals = [
      { name: "Songkran", month: 3, estimatedCost: 5000 },
      { name: "Loy Krathong", month: 10, estimatedCost: 2000 },
      { name: "Chinese New Year", month: 1, estimatedCost: 3000 },
    ];

    return festivals
      .map((festival) => ({
        ...festival,
        monthsAway:
          festival.month > currentMonth
            ? festival.month - currentMonth
            : 12 - currentMonth + festival.month,
      }))
      .filter((festival) => festival.monthsAway <= 3)
      .sort((a, b) => a.monthsAway - b.monthsAway);
  }
}

export const aiInsightsService = new AIInsightsService();
