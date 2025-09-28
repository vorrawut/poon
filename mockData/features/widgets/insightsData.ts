// AI Spending Insights Mock Data

interface SpendingInsight {
  id: string;
  type: "story" | "trend" | "prediction" | "recommendation" | "alert" | "tip" | "comparison";
  title: string;
  message: string;
  category?: string;
  severity: "info" | "warning" | "success" | "error" | "critical" | "positive";
  confidence: number;
  actionable: boolean;
  action?: string;
  impact?: string;
  icon: string;
  color: string;
  timestamp: Date;
}

export const mockSpendingInsights: SpendingInsight[] = [
  {
    id: "story-1",
    type: "story",
    title: "Your Coffee Story This Month",
    message:
      "You've spent ฿2,340 on coffee this month across 18 visits. That's equivalent to a round-trip flight to Chiang Mai! Your favorite spot is Starbucks (12 visits), followed by local cafes. You tend to spend more on weekends (฿180 avg) vs weekdays (฿120 avg).",
    category: "Food & Drink",
    severity: "info",
    confidence: 95,
    actionable: true,
    action: "Try brewing coffee at home 2 days a week",
    impact: "Could save ฿960/month (฿11,520/year)",
    icon: "☕",
    color: "#8B4513",
    timestamp: new Date(),
  },
  {
    id: "trend-1",
    type: "trend",
    title: "Shopping Surge Alert",
    message:
      "Your shopping spending increased 47% this month compared to last month. The biggest jump was in electronics (฿4,500) and clothing (฿2,800). This coincides with the mid-year sales season.",
    category: "Shopping",
    severity: "warning",
    confidence: 88,
    actionable: true,
    action: "Set a monthly shopping limit",
    impact: "Prevent overspending on impulse purchases",
    icon: "🛍️",
    color: "#F59E0B",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "prediction-1",
    type: "prediction",
    title: "Monthly Budget Forecast",
    message:
      "Based on your current spending pattern, you're on track to exceed your monthly budget by ฿1,200. Your transportation costs are 23% higher than usual due to increased ride-sharing usage.",
    category: "Budget",
    severity: "warning",
    confidence: 82,
    actionable: true,
    action: "Use public transport 3 more days this month",
    impact: "Stay within budget and save ฿800",
    icon: "🔮",
    color: "#8B5CF6",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: "recommendation-1",
    type: "recommendation",
    title: "Subscription Optimization",
    message:
      "You have 3 streaming services but only used 1 in the past month. Netflix (used 15 times), Disney+ (unused), Apple TV+ (used once). Consider consolidating to save money.",
    category: "Subscriptions",
    severity: "info",
    confidence: 96,
    actionable: true,
    action: "Cancel unused subscriptions",
    impact: "Save ฿568/month (฿6,816/year)",
    icon: "📺",
    color: "#EF4444",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    id: "alert-1",
    type: "alert",
    title: "Unusual Spending Detected",
    message:
      "You spent ฿3,200 on dining out yesterday, which is 4x your daily average. This was at 'Luxury Restaurant Bangkok' - was this a special occasion?",
    category: "Food & Drink",
    severity: "warning",
    confidence: 99,
    actionable: false,
    icon: "🚨",
    color: "#EF4444",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
  {
    id: "story-2",
    type: "story",
    title: "Your Fitness Journey",
    message:
      "Great news! You've been consistent with your gym membership this month - 12 visits so far. Your health spending (gym + supplements) is ฿2,100, but you're building healthy habits. Keep it up!",
    category: "Health & Fitness",
    severity: "success",
    confidence: 94,
    actionable: false,
    icon: "💪",
    color: "#10B981",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: "trend-2",
    type: "trend",
    title: "Weekend Spending Pattern",
    message:
      "Your weekend spending is consistently 60% higher than weekdays. Saturdays average ฿1,200 vs ฿450 on weekdays. Entertainment and dining are the main drivers.",
    category: "Lifestyle",
    severity: "info",
    confidence: 91,
    actionable: true,
    action: "Plan weekend activities with a budget",
    impact: "Better control over discretionary spending",
    icon: "📅",
    color: "#3B82F6",
    timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000),
  },
  {
    id: "prediction-2",
    type: "prediction",
    title: "Year-End Savings Projection",
    message:
      "At your current savings rate of ฿8,500/month, you'll have ฿102,000 saved by year-end. You're 15% ahead of your target! Consider increasing your emergency fund or investment contributions.",
    category: "Savings",
    severity: "success",
    confidence: 87,
    actionable: true,
    action: "Increase investment contributions",
    impact: "Accelerate wealth building",
    icon: "📈",
    color: "#10B981",
    timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
  },
];

// Export types for use in components
export type { SpendingInsight };
