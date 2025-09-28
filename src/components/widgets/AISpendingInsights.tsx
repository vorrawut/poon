import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  TrendingUp,
  AlertTriangle,
  Target,
  Lightbulb,
  Sparkles,
  Brain,
  Zap,
  Star,
  MessageCircle,
  BarChart3,
} from "lucide-react";

interface SpendingInsight {
  id: string;
  type: "story" | "trend" | "alert" | "tip" | "prediction" | "comparison";
  title: string;
  message: string;
  category?: string;
  severity: "info" | "warning" | "critical" | "positive";
  confidence: number; // 0-100
  actionable: boolean;
  action?: string;
  impact?: string;
  icon: string;
  color: string;
  timestamp: Date;
}

interface AISpendingInsightsProps {
  spendingData: any[];
  className?: string;
}

export function AISpendingInsights({
  spendingData: _spendingData,
  className = "",
}: AISpendingInsightsProps) {
  const [insightType, setInsightType] = useState<
    "all" | "stories" | "alerts" | "tips"
  >("all");
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock AI-generated insights
  const mockInsights: SpendingInsight[] = [
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
      action: "Set a shopping budget for next month",
      impact: "Prevent overspending on impulse purchases",
      icon: "🛍️",
      color: "#EC4899",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: "alert-1",
      type: "alert",
      title: "Budget Breach: Entertainment",
      message:
        "You've exceeded your entertainment budget by 23% (฿1,380). Concert tickets and movie outings were the main contributors. You still have 8 days left in the month.",
      category: "Entertainment",
      severity: "critical",
      confidence: 100,
      actionable: true,
      action: "Consider free entertainment options",
      impact: "Stay within budget for remaining days",
      icon: "🎬",
      color: "#EF4444",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    },
    {
      id: "tip-1",
      type: "tip",
      title: "Transport Optimization",
      message:
        "You could save ฿800/month by using BTS instead of Grab for your regular commute. Your most frequent route (home to office) costs ฿120 via Grab vs ฿42 via BTS.",
      category: "Transportation",
      severity: "positive",
      confidence: 92,
      actionable: true,
      action: "Use BTS for daily commute",
      impact: "Save ฿9,600 annually",
      icon: "🚇",
      color: "#10B981",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
    {
      id: "prediction-1",
      type: "prediction",
      title: "Monthly Spending Forecast",
      message:
        "Based on your current spending pattern, you're projected to spend ฿48,200 this month - ฿1,800 over your ฿46,400 budget. The overage is mainly from dining out and shopping.",
      severity: "warning",
      confidence: 85,
      actionable: true,
      action: "Reduce dining out by 3 meals",
      impact: "Stay within monthly budget",
      icon: "🔮",
      color: "#8B5CF6",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    },
    {
      id: "comparison-1",
      type: "comparison",
      title: "Peer Comparison Insight",
      message:
        "Compared to similar income earners in Bangkok, you spend 15% more on food delivery but 25% less on transportation. Your grocery spending is right on average.",
      severity: "info",
      confidence: 78,
      actionable: true,
      action: "Cook more meals at home",
      impact: "Align with peer spending patterns",
      icon: "👥",
      color: "#06B6D4",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    },
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "story":
        return <MessageCircle className="w-5 h-5" />;
      case "trend":
        return <TrendingUp className="w-5 h-5" />;
      case "alert":
        return <AlertTriangle className="w-5 h-5" />;
      case "tip":
        return <Lightbulb className="w-5 h-5" />;
      case "prediction":
        return <Brain className="w-5 h-5" />;
      case "comparison":
        return <BarChart3 className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "#EF4444";
      case "warning":
        return "#F59E0B";
      case "positive":
        return "#10B981";
      default:
        return "#6B7280";
    }
  };

  const filteredInsights = mockInsights.filter((insight) => {
    if (insightType === "all") return true;
    if (insightType === "stories") return insight.type === "story";
    if (insightType === "alerts")
      return insight.severity === "critical" || insight.severity === "warning";
    if (insightType === "tips")
      return insight.type === "tip" || insight.type === "prediction";
    return true;
  });

  const generateNewInsights = async () => {
    setIsGenerating(true);
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">
              AI Spending Coach
            </h3>
            <p className="text-white/70">
              Personalized insights and recommendations
            </p>
          </div>
        </div>

        <motion.button
          onClick={generateNewInsights}
          disabled={isGenerating}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isGenerating ? (
            <>
              <motion.div
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Analyzing...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              New Insights
            </>
          )}
        </motion.button>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-white/10 rounded-xl p-1 mb-6 max-w-md">
        {(["all", "stories", "alerts", "tips"] as const).map((type) => (
          <motion.button
            key={type}
            onClick={() => setInsightType(type)}
            className={`flex-1 px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
              insightType === type
                ? "bg-white/20 text-white"
                : "text-white/70 hover:text-white"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Insights Grid */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              layout
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Insight Icon */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                    style={{ backgroundColor: insight.color + "20" }}
                  >
                    {insight.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-white font-bold text-lg">
                        {insight.title}
                      </h4>

                      {/* Type Badge */}
                      <div
                        className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor:
                            getSeverityColor(insight.severity) + "20",
                          color: getSeverityColor(insight.severity),
                        }}
                      >
                        {getInsightIcon(insight.type)}
                        {insight.type.toUpperCase()}
                      </div>

                      {/* Confidence Score */}
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <Star className="w-3 h-3" />
                        {insight.confidence}%
                      </div>
                    </div>

                    {/* Category */}
                    {insight.category && (
                      <div className="text-white/60 text-sm mb-3">
                        {insight.category}
                      </div>
                    )}

                    {/* Message */}
                    <div className="text-white/90 mb-4 leading-relaxed">
                      {insight.message}
                    </div>

                    {/* Action Section */}
                    {insight.actionable && (
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex items-start gap-3">
                          <Target className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="text-white font-medium mb-1">
                              Recommended Action
                            </div>
                            <div className="text-white/80 text-sm mb-2">
                              {insight.action}
                            </div>
                            {insight.impact && (
                              <div className="text-green-400 text-sm font-medium">
                                💡 {insight.impact}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Timestamp */}
                    <div className="text-white/50 text-xs mt-4">
                      {insight.timestamp.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total Insights",
            value: mockInsights.length,
            icon: "🧠",
            color: "#8B5CF6",
          },
          {
            label: "Action Items",
            value: mockInsights.filter((i) => i.actionable).length,
            icon: "🎯",
            color: "#10B981",
          },
          {
            label: "Alerts",
            value: mockInsights.filter((i) => i.severity === "critical").length,
            icon: "⚠️",
            color: "#EF4444",
          },
          {
            label: "Avg Confidence",
            value: `${Math.round(
              mockInsights.reduce((sum, i) => sum + i.confidence, 0) /
                mockInsights.length,
            )}%`,
            icon: "⭐",
            color: "#F59E0B",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white/5 rounded-xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-white font-bold text-lg">{stat.value}</div>
            <div className="text-white/60 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* AI Learning Notice */}
      <motion.div
        className="mt-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-4 border border-blue-500/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-3">
          <Brain className="w-5 h-5 text-blue-400" />
          <div className="text-white/80 text-sm">
            <strong>AI Learning:</strong> Insights improve as you use the app
            more. The AI learns your spending patterns, preferences, and goals
            to provide increasingly personalized recommendations.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
