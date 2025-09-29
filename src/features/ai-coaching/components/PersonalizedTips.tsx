import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareButton,
  ThemeAwareHeading,
} from "../../../core";
import { useTranslation } from "../../../libs/i18n";
import { cn } from "../../../libs/utils";

// Personalized Tip Types
export interface PersonalizedTip {
  id: string;
  title: {
    en: string;
    th: string;
  };
  content: {
    en: string;
    th: string;
  };
  category:
    | "spending"
    | "saving"
    | "goals"
    | "cultural"
    | "investment"
    | "budgeting";
  priority: "high" | "medium" | "low";
  impact: "high" | "medium" | "low";
  difficulty: "easy" | "medium" | "hard";
  timeframe: "immediate" | "short_term" | "long_term"; // immediate, 1-3 months, 6+ months
  personalizedFor: {
    spendingPattern: string;
    goalType: string;
    culturalProfile: string;
    riskTolerance: string;
  };
  estimatedSavings: {
    amount: number;
    timeframe: string;
  };
  actionSteps: {
    en: string[];
    th: string[];
  };
  culturalContext?: {
    en: string;
    th: string;
  };
  confidence: number; // AI confidence score 0-100
  isImplemented: boolean;
  implementedAt?: string;
  effectiveness?: number; // 0-100 based on user feedback
  relatedGoals: string[];
  tags: string[];
}

export interface PersonalizedTipsProps {
  tips?: PersonalizedTip[];
  userProfile?: {
    spendingHabits: string[];
    currentGoals: string[];
    culturalPreferences: string[];
    riskProfile: string;
  };
  onImplementTip?: (tipId: string) => void;
  onDismissTip?: (tipId: string) => void;
  onRateTip?: (tipId: string, rating: number) => void;
  className?: string;
}

// Mock Personalized Tips Data
const mockPersonalizedTips: PersonalizedTip[] = [
  {
    id: "reduce_food_delivery",
    title: {
      en: "Reduce Food Delivery Spending",
      th: "ลดการใช้จ่ายสำหรับสั่งอาหาร",
    },
    content: {
      en: "You spend ฿8,500/month on food delivery. Cooking at home 3 days a week could save you ฿3,400 monthly while maintaining convenience.",
      th: "คุณใช้จ่าย ฿8,500/เดือน สำหรับสั่งอาหาร การทำอาหารเองที่บ้าน 3 วันต่อสัปดาห์สามารถประหยัดได้ ฿3,400 ต่อเดือนโดยยังคงความสะดวก",
    },
    category: "spending",
    priority: "high",
    impact: "high",
    difficulty: "medium",
    timeframe: "immediate",
    personalizedFor: {
      spendingPattern: "high_food_delivery",
      goalType: "emergency_fund",
      culturalProfile: "urban_professional",
      riskTolerance: "moderate",
    },
    estimatedSavings: {
      amount: 3400,
      timeframe: "monthly",
    },
    actionSteps: {
      en: [
        "Plan meals for 3 days each week",
        "Buy groceries on weekends",
        "Prep ingredients in advance",
        "Keep 2 backup meal options",
        "Use meal delivery for busy days only",
      ],
      th: [
        "วางแผนอาหาร 3 วันต่อสัปดาห์",
        "ซื้อของชำในวันหยุดสุดสัปดาห์",
        "เตรียมวัตถุดิบล่วงหน้า",
        "เก็บอาหารสำรอง 2 อย่าง",
        "ใช้บริการส่งอาหารเฉพาะวันที่ยุ่งเท่านั้น",
      ],
    },
    confidence: 87,
    isImplemented: false,
    relatedGoals: ["emergency_fund", "health_goals"],
    tags: ["food", "spending", "habits", "cooking"],
  },
  {
    id: "cultural_merit_budget",
    title: {
      en: "Optimize Merit Making Budget",
      th: "เพิ่มประสิทธิภาพงบการทำบุญ",
    },
    content: {
      en: "Your merit making shows strong กตัญญู values! Consider setting a fixed 5% monthly allocation (฿2,500) for consistent giving while maintaining financial goals.",
      th: "การทำบุญของคุณแสดงคุณค่าความกตัญญูที่แข็งแกร่ง! ลองพิจารณาจัดสรรงบประจำเดือน 5% (฿2,500) เพื่อการให้อย่างสม่ำเสมอและรักษาเป้าหมายทางการเงิน",
    },
    category: "cultural",
    priority: "medium",
    impact: "medium",
    difficulty: "easy",
    timeframe: "immediate",
    personalizedFor: {
      spendingPattern: "irregular_donations",
      goalType: "cultural_values",
      culturalProfile: "traditional_thai",
      riskTolerance: "conservative",
    },
    estimatedSavings: {
      amount: 800,
      timeframe: "monthly",
    },
    actionSteps: {
      en: [
        "Set up automatic transfer of ฿2,500 to merit fund",
        "Allocate 60% for temple donations",
        "Reserve 25% for charity organizations",
        "Keep 15% for special occasions",
        "Track impact and adjust quarterly",
      ],
      th: [
        "ตั้งการโอนอัตโนมัติ ฿2,500 เข้ากองทุนทำบุญ",
        "จัดสรร 60% สำหรับการบริจาควัด",
        "สำรอง 25% สำหรับองค์กรการกุศล",
        "เก็บ 15% สำหรับโอกาสพิเศษ",
        "ติดตามผลกระทบและปรับทุกไตรมาส",
      ],
    },
    culturalContext: {
      en: "Balanced giving honors Thai values while building financial security",
      th: "การให้อย่างสมดุลเป็นเกียรติแก่คุณค่าไทยและสร้างความมั่นคงทางการเงิน",
    },
    confidence: 92,
    isImplemented: false,
    relatedGoals: ["cultural_values", "monthly_budget"],
    tags: ["culture", "merit", "budgeting", "thai_values"],
  },
  {
    id: "goal_acceleration",
    title: {
      en: "Accelerate Emergency Fund Goal",
      th: "เร่งเป้าหมายกองทุนฉุกเฉิน",
    },
    content: {
      en: "You're 67% to your ฿100K emergency fund! By redirecting your subscription savings (฿1,200/month), you can reach this goal 4 months earlier.",
      th: "คุณทำได้แล้ว 67% ของเป้าหมายกองทุนฉุกเฉิน ฿100K! โดยการนำเงินประหยัดจากการยกเลิกสมาชิก (฿1,200/เดือน) มาใช้ คุณสามารถบรรลุเป้าหมายนี้เร็วขึ้น 4 เดือน",
    },
    category: "goals",
    priority: "high",
    impact: "high",
    difficulty: "easy",
    timeframe: "short_term",
    personalizedFor: {
      spendingPattern: "multiple_subscriptions",
      goalType: "emergency_fund",
      culturalProfile: "security_focused",
      riskTolerance: "conservative",
    },
    estimatedSavings: {
      amount: 1200,
      timeframe: "monthly",
    },
    actionSteps: {
      en: [
        "Review all subscription services",
        "Cancel unused or duplicate subscriptions",
        "Negotiate better rates for essential services",
        "Set up automatic transfer to emergency fund",
        "Track progress weekly",
      ],
      th: [
        "ทบทวนบริการสมาชิกทั้งหมด",
        "ยกเลิกบริการที่ไม่ใช้หรือซ้ำซ้อน",
        "ต่อรองราคาที่ดีกว่าสำหรับบริการที่จำเป็น",
        "ตั้งการโอนอัตโนมัติเข้ากองทุนฉุกเฉิน",
        "ติดตามความก้าวหน้าทุกสัปดาห์",
      ],
    },
    confidence: 94,
    isImplemented: false,
    relatedGoals: ["emergency_fund"],
    tags: ["goals", "subscriptions", "savings", "acceleration"],
  },
  {
    id: "investment_start",
    title: {
      en: "Start Your Investment Journey",
      th: "เริ่มต้นการเดินทางการลงทุน",
    },
    content: {
      en: "With ฿50K in savings, you're ready to start investing! Consider allocating ฿5,000/month to low-risk index funds for long-term growth.",
      th: "ด้วยเงินออม ฿50K คุณพร้อมเริ่มลงทุนแล้ว! ลองพิจารณาจัดสรร ฿5,000/เดือน ในกองทุนดัชนีความเสี่ยงต่ำเพื่อการเติบโตระยะยาว",
    },
    category: "investment",
    priority: "medium",
    impact: "high",
    difficulty: "medium",
    timeframe: "long_term",
    personalizedFor: {
      spendingPattern: "stable_income",
      goalType: "wealth_building",
      culturalProfile: "growth_oriented",
      riskTolerance: "moderate",
    },
    estimatedSavings: {
      amount: 150000,
      timeframe: "yearly_growth",
    },
    actionSteps: {
      en: [
        "Research reputable brokerages in Thailand",
        "Open investment account",
        "Start with SET50 or broad market ETFs",
        "Set up monthly automatic investment",
        "Review and rebalance quarterly",
      ],
      th: [
        "ศึกษาบริษัทหลักทรัพย์ที่มีชื่อเสียงในไทย",
        "เปิดบัญชีลงทุน",
        "เริ่มต้นด้วย SET50 หรือ ETF ตลาดกว้าง",
        "ตั้งการลงทุนอัตโนมัติรายเดือน",
        "ทบทวนและปรับสมดุลทุกไตรมาส",
      ],
    },
    confidence: 89,
    isImplemented: false,
    relatedGoals: ["wealth_building", "retirement"],
    tags: ["investment", "etf", "long_term", "growth"],
  },
  {
    id: "budget_automation",
    title: {
      en: "Automate Your Budget",
      th: "ทำงบประมาณอัตโนมัติ",
    },
    content: {
      en: "Manual budgeting takes you 3 hours monthly. Set up automatic transfers to reach your goals effortlessly and save time for what matters.",
      th: "การทำงบประมาณด้วยตนเองใช้เวลา 3 ชั่วโมงต่อเดือน ตั้งการโอนอัตโนมัติเพื่อบรรลุเป้าหมายได้อย่างง่ายดายและประหยัดเวลาสำหรับสิ่งที่สำคัญ",
    },
    category: "budgeting",
    priority: "low",
    impact: "medium",
    difficulty: "easy",
    timeframe: "immediate",
    personalizedFor: {
      spendingPattern: "manual_budgeting",
      goalType: "efficiency",
      culturalProfile: "time_conscious",
      riskTolerance: "moderate",
    },
    estimatedSavings: {
      amount: 0,
      timeframe: "time_savings",
    },
    actionSteps: {
      en: [
        "Set up automatic savings transfers",
        "Schedule bill payments",
        "Create spending account allocations",
        "Set up goal-based automatic transfers",
        "Review and adjust monthly",
      ],
      th: [
        "ตั้งการโอนเงินออมอัตโนมัติ",
        "กำหนดตารางจ่ายบิล",
        "สร้างการจัดสรรบัญชีรายจ่าย",
        "ตั้งการโอนอัตโนมัติตามเป้าหมาย",
        "ทบทวนและปรับทุกเดือน",
      ],
    },
    confidence: 85,
    isImplemented: false,
    relatedGoals: ["efficiency", "all_goals"],
    tags: ["automation", "budgeting", "efficiency", "time_saving"],
  },
];

// Tip Card Component
function TipCard({
  tip,
  onImplement,
  onDismiss,
  onRate,
  isExpanded = false,
  onToggleExpand,
}: {
  tip: PersonalizedTip;
  onImplement?: () => void;
  onDismiss?: () => void;
  onRate?: (rating: number) => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}) {
  const { language } = useTranslation();
  const [userRating, setUserRating] = useState<number | null>(null);

  const categoryColors = {
    spending: "#EF4444",
    saving: "#10B981",
    goals: "#3B82F6",
    cultural: "#F59E0B",
    investment: "#8B5CF6",
    budgeting: "#EC4899",
  };

  const priorityIcons = {
    high: "🚨",
    medium: "💡",
    low: "ℹ️",
  };

  const impactColors = {
    high: "#10B981",
    medium: "#F59E0B",
    low: "#6B7280",
  };

  const difficultyIcons = {
    easy: "😊",
    medium: "🤔",
    hard: "💪",
  };

  const timeframeIcons = {
    immediate: "⚡",
    short_term: "📅",
    long_term: "🎯",
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
    onRate?.(rating);
  };

  return (
    <motion.div
      className={cn(
        "cursor-pointer transition-all duration-300",
        isExpanded && "scale-102",
      )}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onToggleExpand}
    >
      <ThemeAwareCard
        className={cn(
          "p-6 border-2 transition-all duration-300",
          isExpanded
            ? "border-purple-500 shadow-lg shadow-purple-500/20"
            : "border-transparent",
          tip.isImplemented && "bg-green-500/5 border-green-500/20",
        )}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <div
              className="text-2xl p-2 rounded-full"
              style={{
                backgroundColor: `${categoryColors[tip.category]}20`,
                color: categoryColors[tip.category],
              }}
            >
              {priorityIcons[tip.priority]}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">
                {language === "th" ? tip.title.th : tip.title.en}
              </h3>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span
                  className="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  style={{
                    backgroundColor: `${categoryColors[tip.category]}20`,
                    color: categoryColors[tip.category],
                  }}
                >
                  {tip.category}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  {difficultyIcons[tip.difficulty]} {tip.difficulty}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  {timeframeIcons[tip.timeframe]}{" "}
                  {tip.timeframe.replace("_", " ")}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span
                  className="text-xs font-medium"
                  style={{ color: impactColors[tip.impact] }}
                >
                  {tip.impact} impact
                </span>
              </div>
              <ThemeAwareText className="text-base leading-relaxed">
                {language === "th" ? tip.content.th : tip.content.en}
              </ThemeAwareText>
            </div>
          </div>

          <div className="text-right ml-4">
            <div className="text-lg font-bold text-green-400">
              {tip.estimatedSavings.amount > 0 ? (
                <>฿{tip.estimatedSavings.amount.toLocaleString()}</>
              ) : (
                "⏰ Time"
              )}
            </div>
            <div className="text-xs text-gray-400">
              {tip.estimatedSavings.timeframe}
            </div>
            <div className="text-xs text-purple-400 mt-1">
              {tip.confidence}% confident
            </div>
          </div>
        </div>

        {/* Cultural Context */}
        {tip.culturalContext && (
          <div className="mb-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
            <div className="text-sm text-amber-300 flex items-center gap-2">
              <span>🇹🇭</span>
              <span>
                {language === "th"
                  ? tip.culturalContext.th
                  : tip.culturalContext.en}
              </span>
            </div>
          </div>
        )}

        {/* Action Steps (Expanded) */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-700"
          >
            <h4 className="font-semibold text-purple-300 mb-3">
              📋 Action Steps:
            </h4>
            <ul className="space-y-2 mb-4">
              {(language === "th"
                ? tip.actionSteps.th
                : tip.actionSteps.en
              ).map((step, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-purple-400 mt-1 text-xs">
                    {idx + 1}.
                  </span>
                  <span className="text-gray-300">{step}</span>
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {tip.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-700 text-xs rounded-full text-gray-300"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Rating */}
            {!tip.isImplemented && (
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-gray-400 mb-2">
                  Rate this tip:
                </h5>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRating(rating);
                      }}
                      className={cn(
                        "text-lg transition-colors",
                        userRating && rating <= userRating
                          ? "text-yellow-400"
                          : "text-gray-600 hover:text-yellow-400",
                      )}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          {!tip.isImplemented ? (
            <>
              <ThemeAwareButton
                variant="primary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onImplement?.();
                }}
                className="flex-1"
              >
                ✅ Implement This Tip
              </ThemeAwareButton>
              <ThemeAwareButton
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDismiss?.();
                }}
              >
                ❌ Dismiss
              </ThemeAwareButton>
            </>
          ) : (
            <div className="flex items-center justify-center gap-2 py-2 text-green-400">
              <span>✅</span>
              <span className="text-sm font-medium">Implemented!</span>
              {tip.effectiveness && (
                <span className="text-xs text-gray-400">
                  ({tip.effectiveness}% effective)
                </span>
              )}
            </div>
          )}
        </div>

        {/* Confidence Bar */}
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">AI Confidence:</span>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                  style={{ width: `${tip.confidence}%` }}
                />
              </div>
              <span className="text-purple-400 font-medium">
                {tip.confidence}%
              </span>
            </div>
          </div>
        </div>
      </ThemeAwareCard>
    </motion.div>
  );
}

export function PersonalizedTips({
  tips = mockPersonalizedTips,
  userProfile: _userProfile,
  onImplementTip,
  onDismissTip,
  onRateTip,
  className = "",
}: PersonalizedTipsProps) {
  const { language: _language } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  // Filter tips
  const filteredTips = useMemo(() => {
    return tips.filter((tip) => {
      const categoryMatch =
        selectedCategory === "all" || tip.category === selectedCategory;
      const priorityMatch =
        selectedPriority === "all" || tip.priority === selectedPriority;
      return categoryMatch && priorityMatch;
    });
  }, [tips, selectedCategory, selectedPriority]);

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const implementedTips = tips.filter((t) => t.isImplemented);
    const totalSavings = implementedTips.reduce(
      (sum, tip) => sum + tip.estimatedSavings.amount,
      0,
    );
    const highPriorityTips = tips.filter(
      (t) => t.priority === "high" && !t.isImplemented,
    );
    const averageConfidence =
      tips.reduce((sum, tip) => sum + tip.confidence, 0) / tips.length;

    return {
      totalTips: tips.length,
      implementedTips: implementedTips.length,
      totalSavings,
      highPriorityTips: highPriorityTips.length,
      averageConfidence: Math.round(averageConfidence),
    };
  }, [tips]);

  const handleTipToggle = (tipId: string) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center">
        <ThemeAwareHeading
          level="h2"
          className="text-2xl font-bold mb-2 flex items-center justify-center gap-2"
        >
          💡 Personalized Tips
        </ThemeAwareHeading>
        <ThemeAwareText color="secondary" className="text-sm">
          AI-powered financial recommendations tailored just for you
        </ThemeAwareText>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ThemeAwareCard className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">
            {summaryStats.totalTips}
          </div>
          <div className="text-sm text-gray-400">Total Tips</div>
        </ThemeAwareCard>

        <ThemeAwareCard className="p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            {summaryStats.implementedTips}
          </div>
          <div className="text-sm text-gray-400">Implemented</div>
        </ThemeAwareCard>

        <ThemeAwareCard className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {summaryStats.highPriorityTips}
          </div>
          <div className="text-sm text-gray-400">High Priority</div>
        </ThemeAwareCard>

        <ThemeAwareCard className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">
            {summaryStats.averageConfidence}%
          </div>
          <div className="text-sm text-gray-400">Avg Confidence</div>
        </ThemeAwareCard>
      </div>

      {/* Savings Impact */}
      {summaryStats.totalSavings > 0 && (
        <ThemeAwareCard className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
          <div className="text-center">
            <h3 className="font-semibold text-green-300 mb-2">
              💰 Total Savings Impact
            </h3>
            <div className="text-3xl font-bold text-green-400 mb-2">
              ฿{summaryStats.totalSavings.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">
              Saved from implemented tips
            </div>
          </div>
        </ThemeAwareCard>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex gap-2">
          <span className="text-sm text-gray-400 self-center">Category:</span>
          {(
            [
              "all",
              "spending",
              "saving",
              "goals",
              "cultural",
              "investment",
            ] as const
          ).map((category) => (
            <ThemeAwareButton
              key={category}
              variant={selectedCategory === category ? "primary" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category === "all" ? "All" : category}
            </ThemeAwareButton>
          ))}
        </div>

        <div className="flex gap-2">
          <span className="text-sm text-gray-400 self-center">Priority:</span>
          {(["all", "high", "medium", "low"] as const).map((priority) => (
            <ThemeAwareButton
              key={priority}
              variant={selectedPriority === priority ? "primary" : "ghost"}
              size="sm"
              onClick={() => setSelectedPriority(priority)}
              className="capitalize"
            >
              {priority === "all" ? "All" : priority}
            </ThemeAwareButton>
          ))}
        </div>
      </div>

      {/* Tips List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredTips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <TipCard
                tip={tip}
                onImplement={() => onImplementTip?.(tip.id)}
                onDismiss={() => onDismissTip?.(tip.id)}
                onRate={(rating) => onRateTip?.(tip.id, rating)}
                isExpanded={expandedTip === tip.id}
                onToggleExpand={() => handleTipToggle(tip.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTips.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">💡</div>
          <ThemeAwareText color="secondary">
            No tips found for the selected filters
          </ThemeAwareText>
        </div>
      )}
    </div>
  );
}
