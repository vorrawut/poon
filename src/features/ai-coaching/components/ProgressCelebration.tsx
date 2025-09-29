import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareButton,
  ThemeAwareHeading,
} from "../../../core";
import { useTranslation } from "../../../libs/i18n";
import { cn } from "../../../libs/utils";

// Progress Celebration Types
export interface Achievement {
  id: string;
  type:
    | "milestone"
    | "streak"
    | "goal_completed"
    | "improvement"
    | "cultural"
    | "social";
  title: {
    en: string;
    th: string;
  };
  description: {
    en: string;
    th: string;
  };
  icon: string;
  value: number;
  unit: string;
  celebrationMessage: {
    en: string;
    th: string;
  };
  motivationalQuote: {
    en: string;
    th: string;
  };
  culturalContext?: {
    en: string;
    th: string;
  };
  shareMessage: {
    en: string;
    th: string;
  };
  rewards: {
    xp: number;
    badge?: string;
    title?: string;
  };
  achievedAt: string;
  nextMilestone?: {
    target: number;
    unit: string;
    timeEstimate: string;
  };
}

export interface ProgressUpdate {
  id: string;
  category: "savings" | "spending" | "goals" | "cultural" | "investment";
  metric: string;
  previousValue: number;
  currentValue: number;
  improvement: number;
  improvementPercentage: number;
  timeframe: string;
  isPositive: boolean;
  significance: "minor" | "notable" | "major" | "exceptional";
}

export interface ProgressCelebrationProps {
  achievements?: Achievement[];
  progressUpdates?: ProgressUpdate[];
  onShare?: (achievement: Achievement) => void;
  onSetNextGoal?: (achievement: Achievement) => void;
  onCelebrate?: (achievement: Achievement) => void;
  className?: string;
}

// Mock Achievement Data
const mockAchievements: Achievement[] = [
  {
    id: "emergency_fund_50k",
    type: "milestone",
    title: {
      en: "Emergency Fund Milestone",
      th: "เป้าหมายกองทุนฉุกเฉิน",
    },
    description: {
      en: "Reached ฿50,000 in your emergency fund",
      th: "บรรลุเป้าหมายกองทุนฉุกเฉิน ฿50,000",
    },
    icon: "🛡️",
    value: 50000,
    unit: "THB",
    celebrationMessage: {
      en: "Outstanding! You've built a solid financial safety net! 🎉",
      th: "ยอดเยี่ยม! คุณสร้างตาข่ายนิรภัยทางการเงินที่แข็งแกร่งแล้ว! 🎉",
    },
    motivationalQuote: {
      en: "Financial security is not about having money, it's about having options. You now have more options! 💪",
      th: "ความมั่นคงทางการเงินไม่ใช่เรื่องของการมีเงิน แต่เป็นเรื่องของการมีทางเลือก ตอนนี้คุณมีทางเลือกมากขึ้นแล้ว! 💪",
    },
    shareMessage: {
      en: "Just hit ฿50K in my emergency fund! Building financial security one step at a time 🛡️ #FinancialGoals #EmergencyFund",
      th: "เพิ่งครบ ฿50K ในกองทุนฉุกเฉิน! สร้างความมั่นคงทางการเงินทีละก้าว 🛡️ #เป้าหมายการเงิน #กองทุนฉุกเฉิน",
    },
    rewards: {
      xp: 500,
      badge: "🛡️",
      title: "Security Builder",
    },
    achievedAt: new Date().toISOString(),
    nextMilestone: {
      target: 100000,
      unit: "THB",
      timeEstimate: "8 months",
    },
  },
  {
    id: "merit_making_streak",
    type: "cultural",
    title: {
      en: "Merit Making Champion",
      th: "แชมป์การทำบุญ",
    },
    description: {
      en: "Made merit for 30 consecutive days",
      th: "ทำบุญต่อเนื่อง 30 วัน",
    },
    icon: "🙏",
    value: 30,
    unit: "days",
    celebrationMessage: {
      en: "Your dedication to กตัญญู is truly inspiring! 🌟",
      th: "ความทุ่มเทของคุณต่อความกตัญญูช่างน่าประทับใจ! 🌟",
    },
    motivationalQuote: {
      en: "The merit you make today creates the prosperity of tomorrow. Your consistent giving shows true wisdom. 🙏",
      th: "บุญที่คุณทำวันนี้สร้างความเจริญรุ่งเรืองของวันพรุ่งนี้ การให้อย่างสม่ำเสมอแสดงถึงปัญญาที่แท้จริง 🙏",
    },
    culturalContext: {
      en: "In Thai culture, consistent merit-making reflects deep กตัญญู (gratitude) values",
      th: "ในวัฒนธรรมไทย การทำบุญอย่างสม่ำเสมอสะท้อนคุณค่าความกตัญญูอันลึกซึ้ง",
    },
    shareMessage: {
      en: "30 days of consistent merit-making! 🙏 Honoring Thai values while building good karma #MeritMaking #ThaiValues #กตัญญู",
      th: "ทำบุญต่อเนื่อง 30 วัน! 🙏 เคารพคุณค่าไทยและสร้างกรรมดี #การทำบุญ #คุณค่าไทย #กตัญญู",
    },
    rewards: {
      xp: 300,
      badge: "🏮",
      title: "Cultural Guardian",
    },
    achievedAt: new Date().toISOString(),
    nextMilestone: {
      target: 60,
      unit: "days",
      timeEstimate: "1 month",
    },
  },
  {
    id: "investment_first_step",
    type: "goal_completed",
    title: {
      en: "Investment Journey Begins",
      th: "เริ่มต้นการเดินทางการลงทุน",
    },
    description: {
      en: "Made your first investment of ฿10,000",
      th: "ลงทุนครั้งแรก ฿10,000",
    },
    icon: "📈",
    value: 10000,
    unit: "THB",
    celebrationMessage: {
      en: "Welcome to the world of investing! Your money is now working for you! 🚀",
      th: "ยินดีต้อนรับสู่โลกแห่งการลงทุน! ตอนนี้เงินของคุณทำงานให้คุณแล้ว! 🚀",
    },
    motivationalQuote: {
      en: "The best time to plant a tree was 20 years ago. The second best time is now. You just planted your investment tree! 🌱",
      th: "เวลาที่ดีที่สุดในการปลูกต้นไม้คือ 20 ปีที่แล้ว เวลาดีที่สุดอันดับสองคือตอนนี้ คุณเพิ่งปลูกต้นไม้การลงทุนของคุณ! 🌱",
    },
    shareMessage: {
      en: "Just made my first investment! 📈 Starting my wealth-building journey with ฿10,000 #Investing #WealthBuilding #FirstInvestment",
      th: "เพิ่งลงทุนครั้งแรก! 📈 เริ่มต้นการเดินทางสร้างความมั่งคั่งด้วย ฿10,000 #การลงทุน #สร้างความมั่งคั่ง #ลงทุนครั้งแรก",
    },
    rewards: {
      xp: 400,
      badge: "📊",
      title: "Investor",
    },
    achievedAt: new Date().toISOString(),
    nextMilestone: {
      target: 50000,
      unit: "THB",
      timeEstimate: "6 months",
    },
  },
  {
    id: "spending_reduction",
    type: "improvement",
    title: {
      en: "Spending Optimization Master",
      th: "เซียนเพิ่มประสิทธิภาพการใช้จ่าย",
    },
    description: {
      en: "Reduced monthly spending by ฿5,200",
      th: "ลดการใช้จ่ายรายเดือน ฿5,200",
    },
    icon: "💰",
    value: 5200,
    unit: "THB",
    celebrationMessage: {
      en: "Incredible discipline! You're a spending optimization expert! 🎯",
      th: "วินัยที่น่าทึ่ง! คุณเป็นผู้เชี่ยวชาญการเพิ่มประสิทธิภาพการใช้จ่าย! 🎯",
    },
    motivationalQuote: {
      en: "It's not about how much you earn, it's about how much you keep. You're keeping more! 💪",
      th: "ไม่ใช่เรื่องของการหาเงินได้เท่าไหร่ แต่เป็นเรื่องของการเก็บเงินได้เท่าไหร่ คุณเก็บได้มากขึ้นแล้ว! 💪",
    },
    shareMessage: {
      en: "Cut my monthly spending by ฿5,200! 💰 Every baht saved is a baht earned #SmartSpending #FinancialDiscipline",
      th: "ลดการใช้จ่ายรายเดือน ฿5,200! 💰 ทุกบาทที่ประหยัดคือบาทที่หาได้ #การใช้จ่ายอย่างฉลาด #วินัยทางการเงิน",
    },
    rewards: {
      xp: 350,
      badge: "💎",
      title: "Spending Master",
    },
    achievedAt: new Date().toISOString(),
  },
];

// Mock Progress Updates
const mockProgressUpdates: ProgressUpdate[] = [
  {
    id: "savings_growth",
    category: "savings",
    metric: "Monthly Savings",
    previousValue: 12000,
    currentValue: 15500,
    improvement: 3500,
    improvementPercentage: 29.2,
    timeframe: "This month",
    isPositive: true,
    significance: "notable",
  },
  {
    id: "spending_reduction",
    category: "spending",
    metric: "Food Delivery",
    previousValue: 8500,
    currentValue: 6200,
    improvement: -2300,
    improvementPercentage: -27.1,
    timeframe: "This month",
    isPositive: true,
    significance: "major",
  },
  {
    id: "cultural_giving",
    category: "cultural",
    metric: "Merit Making",
    previousValue: 1500,
    currentValue: 2200,
    improvement: 700,
    improvementPercentage: 46.7,
    timeframe: "This month",
    isPositive: true,
    significance: "notable",
  },
];

// Celebration Animation Component
function CelebrationAnimation({
  achievement,
  onComplete,
}: {
  achievement: Achievement;
  onComplete: () => void;
}) {
  const [showFireworks, setShowFireworks] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFireworks(false);
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showFireworks && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onComplete}
        >
          {/* Fireworks Effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                initial={{
                  x: "50vw",
                  y: "50vh",
                  scale: 0,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 80}vw`,
                  y: `${50 + (Math.random() - 0.5) * 80}vh`,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Achievement Card */}
          <motion.div
            initial={{ scale: 0, rotateY: -180 }}
            animate={{ scale: 1, rotateY: 0 }}
            exit={{ scale: 0, rotateY: 180 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative z-10"
          >
            <ThemeAwareCard className="p-8 text-center max-w-md bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-8xl mb-4"
              >
                {achievement.icon}
              </motion.div>

              <ThemeAwareHeading
                level="h2"
                className="text-2xl font-bold mb-4 text-yellow-400"
              >
                🎉 Achievement Unlocked! 🎉
              </ThemeAwareHeading>

              <ThemeAwareHeading
                level="h3"
                className="text-xl font-semibold mb-2"
              >
                {achievement.title.en}
              </ThemeAwareHeading>

              <ThemeAwareText className="text-lg mb-4">
                {achievement.description.en}
              </ThemeAwareText>

              <div className="flex justify-center items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-purple-400">
                    +{achievement.rewards.xp}
                  </span>
                  <span className="text-gray-400">XP</span>
                </div>
                {achievement.rewards.badge && (
                  <div className="flex items-center gap-1">
                    <span className="text-2xl">
                      {achievement.rewards.badge}
                    </span>
                    <span className="text-gray-400">Badge</span>
                  </div>
                )}
              </div>
            </ThemeAwareCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Achievement Card Component
function AchievementCard({
  achievement,
  onShare,
  onSetNextGoal,
  onCelebrate,
}: {
  achievement: Achievement;
  onShare?: () => void;
  onSetNextGoal?: () => void;
  onCelebrate?: () => void;
}) {
  const { language } = useTranslation();

  const typeColors = {
    milestone: "#10B981",
    streak: "#F59E0B",
    goal_completed: "#3B82F6",
    improvement: "#8B5CF6",
    cultural: "#F59E0B",
    social: "#EC4899",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <ThemeAwareCard
        className={cn(
          "p-6 bg-gradient-to-br border-2",
          "from-purple-500/10 to-pink-500/10 border-purple-500/30",
        )}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <motion.div
              className="text-6xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {achievement.icon}
            </motion.div>
            <div>
              <h3 className="text-xl font-bold mb-1">
                {language === "th"
                  ? achievement.title.th
                  : achievement.title.en}
              </h3>
              <p className="text-gray-300 mb-2">
                {language === "th"
                  ? achievement.description.th
                  : achievement.description.en}
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span
                  className="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  style={{
                    backgroundColor: `${typeColors[achievement.type]}20`,
                    color: typeColors[achievement.type],
                  }}
                >
                  {achievement.type.replace("_", " ")}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">
                  {new Date(achievement.achievedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-purple-400">
              {achievement.value.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">{achievement.unit}</div>
          </div>
        </div>

        {/* Celebration Message */}
        <div className="mb-4 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
          <ThemeAwareText className="text-center font-medium text-yellow-300">
            {language === "th"
              ? achievement.celebrationMessage.th
              : achievement.celebrationMessage.en}
          </ThemeAwareText>
        </div>

        {/* Motivational Quote */}
        <div className="mb-4 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
          <ThemeAwareText className="text-center italic text-blue-300">
            "
            {language === "th"
              ? achievement.motivationalQuote.th
              : achievement.motivationalQuote.en}
            "
          </ThemeAwareText>
        </div>

        {/* Cultural Context */}
        {achievement.culturalContext && (
          <div className="mb-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
            <div className="text-sm text-amber-300 flex items-center gap-2">
              <span>🇹🇭</span>
              <span>
                {language === "th"
                  ? achievement.culturalContext.th
                  : achievement.culturalContext.en}
              </span>
            </div>
          </div>
        )}

        {/* Rewards */}
        <div className="mb-4 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
          <h4 className="text-sm font-semibold text-purple-300 mb-2">
            🎁 Rewards Earned:
          </h4>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-purple-400 font-bold">
                +{achievement.rewards.xp}
              </span>
              <span className="text-gray-400">XP</span>
            </div>
            {achievement.rewards.badge && (
              <div className="flex items-center gap-1">
                <span className="text-xl">{achievement.rewards.badge}</span>
                <span className="text-gray-400">Badge</span>
              </div>
            )}
            {achievement.rewards.title && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">👑</span>
                <span className="text-yellow-300">
                  {achievement.rewards.title}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Next Milestone */}
        {achievement.nextMilestone && (
          <div className="mb-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <h4 className="text-sm font-semibold text-green-300 mb-2">
              🎯 Next Milestone:
            </h4>
            <div className="text-sm text-green-300">
              {achievement.nextMilestone.target.toLocaleString()}{" "}
              {achievement.nextMilestone.unit}
              <span className="text-gray-400 ml-2">
                (~{achievement.nextMilestone.timeEstimate})
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <ThemeAwareButton
            variant="primary"
            size="sm"
            onClick={onCelebrate}
            className="flex-1"
          >
            🎉 Celebrate Again!
          </ThemeAwareButton>
          <ThemeAwareButton variant="ghost" size="sm" onClick={onShare}>
            📱 Share
          </ThemeAwareButton>
          {achievement.nextMilestone && (
            <ThemeAwareButton variant="ghost" size="sm" onClick={onSetNextGoal}>
              🎯 Set Goal
            </ThemeAwareButton>
          )}
        </div>
      </ThemeAwareCard>
    </motion.div>
  );
}

// Progress Update Card
function ProgressUpdateCard({ update }: { update: ProgressUpdate }) {
  const categoryColors = {
    savings: "#10B981",
    spending: "#F59E0B",
    goals: "#3B82F6",
    cultural: "#F59E0B",
    investment: "#8B5CF6",
  };

  const significanceIcons = {
    minor: "📈",
    notable: "🚀",
    major: "🌟",
    exceptional: "🎆",
  };

  return (
    <ThemeAwareCard className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="text-2xl p-2 rounded-full"
            style={{
              backgroundColor: `${categoryColors[update.category]}20`,
              color: categoryColors[update.category],
            }}
          >
            {significanceIcons[update.significance]}
          </div>
          <div>
            <h4 className="font-semibold">{update.metric}</h4>
            <p className="text-sm text-gray-400">{update.timeframe}</p>
          </div>
        </div>

        <div className="text-right">
          <div
            className={cn(
              "text-lg font-bold",
              update.isPositive ? "text-green-400" : "text-red-400",
            )}
          >
            {update.isPositive ? "+" : ""}
            {update.improvementPercentage.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-400">
            ฿{Math.abs(update.improvement).toLocaleString()}
          </div>
        </div>
      </div>
    </ThemeAwareCard>
  );
}

export function ProgressCelebration({
  achievements = mockAchievements,
  progressUpdates = mockProgressUpdates,
  onShare,
  onSetNextGoal,
  onCelebrate,
  className = "",
}: ProgressCelebrationProps) {
  const { language: _language } = useTranslation();
  const [showCelebration, setShowCelebration] = useState<Achievement | null>(
    null,
  );
  const [selectedTab, setSelectedTab] = useState<"achievements" | "progress">(
    "achievements",
  );

  const handleCelebrate = (achievement: Achievement) => {
    setShowCelebration(achievement);
    onCelebrate?.(achievement);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Celebration Animation */}
      {showCelebration && (
        <CelebrationAnimation
          achievement={showCelebration}
          onComplete={() => setShowCelebration(null)}
        />
      )}

      {/* Header */}
      <div className="text-center">
        <ThemeAwareHeading
          level="h2"
          className="text-2xl font-bold mb-2 flex items-center justify-center gap-2"
        >
          🎉 Progress & Celebrations
        </ThemeAwareHeading>
        <ThemeAwareText color="secondary" className="text-sm">
          Celebrate your financial wins and track your amazing progress
        </ThemeAwareText>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 justify-center">
        {(["achievements", "progress"] as const).map((tab) => (
          <ThemeAwareButton
            key={tab}
            variant={selectedTab === tab ? "primary" : "ghost"}
            onClick={() => setSelectedTab(tab)}
            className="capitalize"
          >
            {tab === "achievements" ? "🏆 Achievements" : "📊 Progress Updates"}
          </ThemeAwareButton>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {selectedTab === "achievements" && (
            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <AchievementCard
                    achievement={achievement}
                    onShare={() => onShare?.(achievement)}
                    onSetNextGoal={() => onSetNextGoal?.(achievement)}
                    onCelebrate={() => handleCelebrate(achievement)}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {selectedTab === "progress" && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">
                  📈 Recent Progress Updates
                </h3>
                <p className="text-sm text-gray-400">
                  Track your improvements across all financial areas
                </p>
              </div>

              {progressUpdates.map((update, index) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ProgressUpdateCard update={update} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Summary Stats */}
      <ThemeAwareCard className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
        <div className="text-center">
          <h3 className="font-semibold text-purple-300 mb-4">
            🌟 Your Progress Summary
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-yellow-400">
                {achievements.length}
              </div>
              <div className="text-sm text-gray-400">Achievements</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">
                {achievements.reduce((sum, a) => sum + a.rewards.xp, 0)}
              </div>
              <div className="text-sm text-gray-400">Total XP</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">
                {progressUpdates.filter((u) => u.isPositive).length}
              </div>
              <div className="text-sm text-gray-400">Improvements</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">
                {achievements.filter((a) => a.rewards.badge).length}
              </div>
              <div className="text-sm text-gray-400">Badges Earned</div>
            </div>
          </div>
        </div>
      </ThemeAwareCard>
    </div>
  );
}
