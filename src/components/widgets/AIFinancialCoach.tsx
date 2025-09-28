import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface CoachingInsight {
  id: string;
  type: "prediction" | "recommendation" | "warning" | "celebration" | "tip";
  title: string;
  message: string;
  impact: "high" | "medium" | "low";
  category: "spending" | "saving" | "investing" | "budgeting" | "goals";
  actionable: boolean;
  actions?: Array<{
    label: string;
    type: "primary" | "secondary";
    action: () => void;
  }>;
  data?: {
    currentValue?: number;
    targetValue?: number;
    timeframe?: string;
    percentage?: number;
  };
}

interface AIFinancialCoachProps {
  insights: CoachingInsight[];
  userProfile: {
    name: string;
    age: number;
    riskTolerance: "conservative" | "moderate" | "aggressive";
    primaryGoals: string[];
    monthlyIncome: number;
    monthlyExpenses: number;
  };
  viewMode?: "play" | "clarity";
  accessibilityMode?: "elder" | "youth" | "standard";
  className?: string;
}

export function AIFinancialCoach({
  insights,
  userProfile,
  viewMode = "play",
  accessibilityMode = "standard",
  className = "",
}: AIFinancialCoachProps) {
  const [activeInsight, setActiveInsight] = useState<string | null>(null);
  const [chatMode, setChatMode] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    Array<{
      id: string;
      type: "user" | "ai";
      message: string;
      timestamp: Date;
    }>
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "prediction":
        return "🔮";
      case "recommendation":
        return "💡";
      case "warning":
        return "⚠️";
      case "celebration":
        return "🎉";
      case "tip":
        return "💭";
      default:
        return "🤖";
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      message: message.trim(),
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai" as const,
        message: aiResponse,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("save") || lowerMessage.includes("saving")) {
      return `Great question about saving! Based on your current income of ${formatCurrency(userProfile.monthlyIncome)}, I recommend following the 50/30/20 rule. You're currently saving ${formatCurrency(userProfile.monthlyIncome - userProfile.monthlyExpenses)} per month, which is fantastic! Consider automating your savings to make it even easier.`;
    } else if (
      lowerMessage.includes("invest") ||
      lowerMessage.includes("investment")
    ) {
      return `For someone with ${userProfile.riskTolerance} risk tolerance like you, I'd suggest starting with index funds if you're new to investing. Given your age of ${userProfile.age}, you have time for growth. Consider allocating 10-15% of your income to investments initially.`;
    } else if (
      lowerMessage.includes("budget") ||
      lowerMessage.includes("spending")
    ) {
      return `Looking at your spending patterns, you're doing well! Your monthly expenses of ${formatCurrency(userProfile.monthlyExpenses)} leave you with a healthy surplus. I notice you could optimize your discretionary spending by about 10% to boost your savings rate even more.`;
    } else if (
      lowerMessage.includes("goal") ||
      lowerMessage.includes("target")
    ) {
      return `Your primary goals of ${userProfile.primaryGoals.join(", ")} are achievable! Based on your current savings rate, you're on track to meet most of them. Let's create a timeline and break them down into smaller, actionable steps.`;
    } else {
      return `Thanks for your question! As your AI financial coach, I'm here to help you make smart money decisions. Based on your profile, you're doing great with a ${formatCurrency(userProfile.monthlyIncome - userProfile.monthlyExpenses)} monthly surplus. What specific area would you like to focus on: saving, investing, budgeting, or goal planning?`;
    }
  };

  // Auto-greet user
  useEffect(() => {
    if (chatMessages.length === 0) {
      const welcomeMessage = {
        id: "welcome",
        type: "ai" as const,
        message: `Hi ${userProfile.name}! 👋 I'm your AI financial coach. I've been analyzing your money patterns and I'm impressed - you're saving ${formatCurrency(userProfile.monthlyIncome - userProfile.monthlyExpenses)} per month! What would you like to work on today?`,
        timestamp: new Date(),
      };
      setChatMessages([welcomeMessage]);
    }
  }, []);

  const fontSize =
    accessibilityMode === "elder"
      ? "text-lg"
      : accessibilityMode === "youth"
        ? "text-sm"
        : "text-base";
  const spacing = accessibilityMode === "elder" ? "p-6" : "p-4";

  return (
    <div className={`${className}`}>
      <div
        className={`rounded-2xl border ${spacing} ${
          viewMode === "play"
            ? "bg-white/10 backdrop-blur-sm border-white/20"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              className="text-3xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🤖
            </motion.div>
            <div>
              <h3
                className={`text-xl font-bold ${fontSize} ${
                  viewMode === "play" ? "text-white" : "text-gray-900"
                }`}
              >
                AI Financial Coach
              </h3>
              <p
                className={`text-sm ${
                  viewMode === "play" ? "text-white/70" : "text-gray-600"
                }`}
              >
                Your personal money mentor
              </p>
            </div>
          </div>

          <button
            onClick={() => setChatMode(!chatMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
              chatMode
                ? "bg-blue-500 text-white"
                : viewMode === "play"
                  ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            <MessageCircle size={16} />
            {chatMode ? "Close Chat" : "Chat with AI"}
          </button>
        </div>

        {/* Chat Mode */}
        <AnimatePresence>
          {chatMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div
                className={`rounded-xl border h-60 sm:h-80 flex flex-col ${
                  viewMode === "play"
                    ? "bg-white/5 border-white/10"
                    : "bg-gray-50 border-gray-100"
                }`}
              >
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${fontSize} ${
                          msg.type === "user"
                            ? "bg-blue-500 text-white"
                            : viewMode === "play"
                              ? "bg-white/10 text-white"
                              : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        {msg.message}
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          viewMode === "play"
                            ? "bg-white/10 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <motion.div
                          className="flex gap-1"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <div className="w-2 h-2 bg-current rounded-full" />
                          <div className="w-2 h-2 bg-current rounded-full" />
                          <div className="w-2 h-2 bg-current rounded-full" />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && sendMessage(inputMessage)
                      }
                      placeholder="Ask me anything about your finances..."
                      className={`flex-1 px-4 py-2 rounded-xl border ${fontSize} ${
                        viewMode === "play"
                          ? "bg-white/10 border-white/20 text-white placeholder-white/50"
                          : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    <button
                      onClick={() => sendMessage(inputMessage)}
                      disabled={!inputMessage.trim()}
                      className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {insights.slice(0, 4).map((insight, index) => (
            <motion.div
              key={insight.id}
              className={`p-4 rounded-xl cursor-pointer border transition-all ${
                activeInsight === insight.id
                  ? viewMode === "play"
                    ? "bg-white/15 border-white/30"
                    : "bg-blue-50 border-blue-200"
                  : viewMode === "play"
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-gray-50 border-gray-100 hover:bg-gray-100"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() =>
                setActiveInsight(
                  activeInsight === insight.id ? null : insight.id,
                )
              }
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{getInsightIcon(insight.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4
                      className={`font-semibold ${fontSize} ${
                        viewMode === "play" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {insight.title}
                    </h4>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        insight.impact === "high"
                          ? "bg-red-100 text-red-800"
                          : insight.impact === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {insight.impact}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${
                      viewMode === "play" ? "text-white/80" : "text-gray-700"
                    }`}
                  >
                    {insight.message}
                  </p>

                  {/* Data Visualization */}
                  {insight.data && (
                    <div className="mt-3">
                      {insight.data.percentage !== undefined && (
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex-1 h-2 rounded-full ${
                              viewMode === "play"
                                ? "bg-white/20"
                                : "bg-gray-200"
                            }`}
                          >
                            <div
                              className="h-full rounded-full bg-blue-500"
                              style={{ width: `${insight.data.percentage}%` }}
                            />
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              viewMode === "play"
                                ? "text-white"
                                : "text-gray-900"
                            }`}
                          >
                            {insight.data.percentage}%
                          </span>
                        </div>
                      )}

                      {insight.data.currentValue &&
                        insight.data.targetValue && (
                          <div className="text-sm mt-2">
                            <span
                              className={
                                viewMode === "play"
                                  ? "text-white/70"
                                  : "text-gray-600"
                              }
                            >
                              Progress:{" "}
                              {formatCurrency(insight.data.currentValue)} /{" "}
                              {formatCurrency(insight.data.targetValue)}
                            </span>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              </div>

              {/* Expanded Actions */}
              <AnimatePresence>
                {activeInsight === insight.id &&
                  insight.actionable &&
                  insight.actions && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-white/10"
                    >
                      <div className="flex gap-2">
                        {insight.actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              action.action();
                            }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              action.type === "primary"
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : viewMode === "play"
                                  ? "bg-white/10 text-white hover:bg-white/20"
                                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                            }`}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              icon: "💰",
              label: "Optimize Savings",
              action: () => console.log("Optimize savings"),
            },
            {
              icon: "📈",
              label: "Investment Tips",
              action: () => console.log("Investment tips"),
            },
            {
              icon: "🎯",
              label: "Set New Goal",
              action: () => console.log("Set goal"),
            },
            {
              icon: "📊",
              label: "Budget Review",
              action: () => console.log("Budget review"),
            },
          ].map((quickAction, index) => (
            <motion.button
              key={index}
              onClick={quickAction.action}
              className={`p-3 rounded-xl border transition-all ${
                viewMode === "play"
                  ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                  : "bg-gray-50 border-gray-100 text-gray-900 hover:bg-gray-100"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-xl mb-1">{quickAction.icon}</div>
              <div className={`text-xs font-medium ${fontSize}`}>
                {quickAction.label}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Coach Summary */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="text-center">
            <div className="text-2xl mb-2">🎯</div>
            <h4
              className={`font-bold mb-2 ${fontSize} ${
                viewMode === "play" ? "text-white" : "text-gray-900"
              }`}
            >
              Your Financial Health Score: 85/100
            </h4>
            <p
              className={`text-sm ${
                viewMode === "play" ? "text-white/70" : "text-gray-600"
              }`}
            >
              You're doing great! Keep up the momentum and you'll reach your
              goals ahead of schedule.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
