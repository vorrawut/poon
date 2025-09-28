import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Target,
  Sparkles,
} from "lucide-react";

interface FinancialStory {
  id: string;
  title: string;
  period: string;
  summary: string;
  insights: string[];
  predictions: string[];
  achievements: string[];
  warnings: string[];
  mood: "positive" | "neutral" | "warning" | "celebration";
  confidence: number; // 0-100%
}

interface AIFinancialHistorianProps {
  timelinePosition: number;
  selectedRange: "day" | "week" | "month" | "quarter" | "year";
  className?: string;
}

export function AIFinancialHistorian({
  timelinePosition,
  selectedRange: _selectedRange,
  className = "",
}: AIFinancialHistorianProps) {
  const [currentStory, setCurrentStory] = useState<FinancialStory | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyMode, setStoryMode] = useState<
    "current" | "prediction" | "comparison"
  >("current");
  const [narrativeSpeed, setNarrativeSpeed] = useState<
    "slow" | "normal" | "fast"
  >("normal");

  // Mock AI-generated stories based on timeline position
  const generateStory = (position: number, range: string): FinancialStory => {
    const stories: FinancialStory[] = [
      {
        id: "early-career",
        title: "The Foundation Phase",
        period: "Jan 2024 - Mar 2024",
        summary:
          "You started building your financial foundation with consistent income and controlled spending. Your salary of ฿85,000 provided stability while you explored freelance opportunities.",
        insights: [
          "Your spending was 23% below average for your income bracket",
          "Food expenses decreased by 15% as you developed better habits",
          "Investment allocation increased from 5% to 12% of income",
        ],
        predictions: [
          "If current trends continue, you'll save ฿180,000 by year-end",
          "Your investment portfolio could grow to ฿250,000 in 12 months",
          "Freelance income has potential to reach ฿35,000/month",
        ],
        achievements: [
          "First month with positive cash flow",
          "Established emergency fund",
          "Reduced dining out by 40%",
        ],
        warnings: [
          "Entertainment spending spiked 25% in March",
          "No retirement contributions detected",
        ],
        mood: "positive",
        confidence: 87,
      },
      {
        id: "growth-phase",
        title: "The Acceleration Period",
        period: "Apr 2024 - Jun 2024",
        summary:
          "A remarkable quarter of financial growth! Your freelance income doubled while maintaining disciplined spending. This period marked your transition from saver to investor.",
        insights: [
          "Freelance income grew 120% quarter-over-quarter",
          "Investment returns contributed ฿8,500 to total income",
          "Rent-to-income ratio improved to an optimal 28%",
        ],
        predictions: [
          "You're on track to achieve financial independence 3 years earlier",
          "Investment portfolio diversification will reduce risk by 15%",
          "Potential to increase savings rate to 35% by Q4",
        ],
        achievements: [
          "Highest monthly savings ever: ฿45,000",
          "First investment dividend received",
          "Debt-to-income ratio below 10%",
        ],
        warnings: [
          "Transportation costs increased 18%",
          "No health insurance coverage detected",
        ],
        mood: "celebration",
        confidence: 92,
      },
      {
        id: "optimization-phase",
        title: "The Refinement Era",
        period: "Jul 2024 - Sep 2024",
        summary:
          "You've entered a sophisticated phase of financial management. Every baht is optimized, and your money works harder for you than ever before.",
        insights: [
          "Achieved perfect 50/30/20 budget allocation",
          "Investment returns now cover 15% of monthly expenses",
          "Spending efficiency improved by 22% through smart choices",
        ],
        predictions: [
          "Net worth will cross ฿1M milestone in 8 months",
          "Passive income could replace 25% of salary by 2025",
          "Current trajectory leads to early retirement at 45",
        ],
        achievements: [
          "Six consecutive months of 30%+ savings rate",
          "Investment portfolio outperformed market by 12%",
          "Zero high-interest debt remaining",
        ],
        warnings: [
          "Lifestyle inflation creeping in entertainment category",
          "Emergency fund below 6-month target",
        ],
        mood: "positive",
        confidence: 95,
      },
    ];

    const storyIndex = Math.floor((position / 100) * (stories.length - 1));
    return stories[storyIndex] || stories[0];
  };

  // Generate story based on timeline position
  useEffect(() => {
    setIsGenerating(true);

    const timer = setTimeout(() => {
      const story = generateStory(timelinePosition, selectedRange);
      setCurrentStory(story);
      setIsGenerating(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timelinePosition, selectedRange]);

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "positive":
        return "#10B981";
      case "celebration":
        return "#F59E0B";
      case "warning":
        return "#EF4444";
      case "neutral":
        return "#6B7280";
      default:
        return "#6B7280";
    }
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case "positive":
        return "📈";
      case "celebration":
        return "🎉";
      case "warning":
        return "⚠️";
      case "neutral":
        return "📊";
      default:
        return "📊";
    }
  };

  const getSpeedDelay = () => {
    switch (narrativeSpeed) {
      case "slow":
        return 100;
      case "normal":
        return 50;
      case "fast":
        return 20;
      default:
        return 50;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* AI Historian Header */}
      <motion.div
        className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity },
              }}
            >
              <Brain className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                AI Financial Historian
              </h2>
              <p className="text-white/70 text-sm">
                Your personal money story narrator
              </p>
            </div>
          </div>

          {/* Story Mode Selector */}
          <div className="flex gap-2">
            {[
              { id: "current", label: "Current", icon: "📖" },
              { id: "prediction", label: "Future", icon: "🔮" },
              { id: "comparison", label: "Compare", icon: "⚖️" },
            ].map((mode) => (
              <motion.button
                key={mode.id}
                onClick={() => setStoryMode(mode.id as any)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  storyMode === mode.id
                    ? "bg-white/20 text-white border border-white/30"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-1">{mode.icon}</span>
                {mode.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Narrative Speed Control */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm text-white/70">Narrative Speed:</span>
          <div className="flex gap-2">
            {[
              { id: "slow", label: "🐢 Slow" },
              { id: "normal", label: "🚶 Normal" },
              { id: "fast", label: "🏃 Fast" },
            ].map((speed) => (
              <motion.button
                key={speed.id}
                onClick={() => setNarrativeSpeed(speed.id as any)}
                className={`px-2 py-1 rounded text-xs ${
                  narrativeSpeed === speed.id
                    ? "bg-white/20 text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {speed.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Story Content */}
      <AnimatePresence mode="wait">
        {isGenerating ? (
          <motion.div
            key="generating"
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              🧠
            </motion.div>
            <div className="text-xl font-bold text-white mb-2">
              AI is analyzing your financial story...
            </div>
            <div className="text-white/70">
              Processing {timelinePosition.toFixed(0)}% of timeline data
            </div>

            <div className="mt-4 flex justify-center">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-purple-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ) : currentStory ? (
          <motion.div
            key="story"
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Story Header */}
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              style={{ borderColor: getMoodColor(currentStory.mood) + "40" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">
                    {getMoodIcon(currentStory.mood)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {currentStory.title}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {currentStory.period}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-white/70">AI Confidence</div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-400 to-blue-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${currentStory.confidence}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <span className="text-sm font-bold text-white">
                      {currentStory.confidence}%
                    </span>
                  </div>
                </div>
              </div>

              <motion.p
                className="text-white/90 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {currentStory.summary}
              </motion.p>
            </motion.div>

            {/* Story Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Insights */}
              <motion.div
                className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-5 border border-blue-500/30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <h4 className="font-bold text-white">Key Insights</h4>
                </div>
                <div className="space-y-3">
                  {currentStory.insights.map((insight, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-2 text-sm text-white/80"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.6 + (index * getSpeedDelay()) / 1000,
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>{insight}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Predictions */}
              <motion.div
                className="bg-purple-500/10 backdrop-blur-sm rounded-xl p-5 border border-purple-500/30"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-purple-400" />
                  <h4 className="font-bold text-white">Future Predictions</h4>
                </div>
                <div className="space-y-3">
                  {currentStory.predictions.map((prediction, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-2 text-sm text-white/80"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.7 + (index * getSpeedDelay()) / 1000,
                      }}
                    >
                      <div className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0">
                        🔮
                      </div>
                      <span>{prediction}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div
                className="bg-green-500/10 backdrop-blur-sm rounded-xl p-5 border border-green-500/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-green-400">🏆</div>
                  <h4 className="font-bold text-white">
                    Achievements Unlocked
                  </h4>
                </div>
                <div className="space-y-3">
                  {currentStory.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-2 text-sm text-white/80"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.8 + (index * getSpeedDelay()) / 1000,
                      }}
                    >
                      <div className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0">
                        ✨
                      </div>
                      <span>{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Warnings */}
              {currentStory.warnings.length > 0 && (
                <motion.div
                  className="bg-orange-500/10 backdrop-blur-sm rounded-xl p-5 border border-orange-500/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                    <h4 className="font-bold text-white">Areas to Watch</h4>
                  </div>
                  <div className="space-y-3">
                    {currentStory.warnings.map((warning, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-2 text-sm text-white/80"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.9 + (index * getSpeedDelay()) / 1000,
                        }}
                      >
                        <div className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0">
                          ⚠️
                        </div>
                        <span>{warning}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Story Actions */}
            <motion.div
              className="flex justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📖 Read Full Report
              </motion.button>
              <motion.button
                className="px-6 py-3 bg-white/10 text-white rounded-xl font-medium border border-white/20"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                🔊 Listen to Story
              </motion.button>
              <motion.button
                className="px-6 py-3 bg-white/10 text-white rounded-xl font-medium border border-white/20"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                📤 Share Story
              </motion.button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
