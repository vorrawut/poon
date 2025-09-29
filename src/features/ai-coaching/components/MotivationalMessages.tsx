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

// Motivational Message Types
export interface MotivationalMessage {
  id: string;
  type:
    | "daily"
    | "milestone"
    | "encouragement"
    | "wisdom"
    | "cultural"
    | "celebration";
  title: {
    en: string;
    th: string;
  };
  content: {
    en: string;
    th: string;
  };
  author?: {
    en: string;
    th: string;
  };
  category:
    | "savings"
    | "goals"
    | "mindset"
    | "cultural"
    | "success"
    | "discipline";
  mood: "inspiring" | "calming" | "energizing" | "reflective" | "celebratory";
  culturalContext?: {
    en: string;
    th: string;
  };
  actionPrompt?: {
    en: string;
    th: string;
  };
  tags: string[];
  displayDuration: number; // seconds
  priority: "high" | "medium" | "low";
}

export interface MotivationalMessagesProps {
  messages?: MotivationalMessage[];
  currentContext?: {
    userMood: "motivated" | "discouraged" | "neutral" | "celebrating";
    recentActivity: "goal_achieved" | "setback" | "progress" | "starting";
    timeOfDay: "morning" | "afternoon" | "evening" | "night";
  };
  autoRotate?: boolean;
  rotationInterval?: number; // seconds
  onMessageAction?: (action: string, messageId: string) => void;
  className?: string;
}

// Mock Motivational Messages
const mockMessages: MotivationalMessage[] = [
  {
    id: "daily_savings_wisdom",
    type: "daily",
    title: {
      en: "Daily Savings Wisdom",
      th: "ปัญญาการออมประจำวัน",
    },
    content: {
      en: "A penny saved is a penny earned. Every small amount you save today builds the foundation for your financial freedom tomorrow.",
      th: "เงินที่ประหยัดได้คือเงินที่หาได้ ทุกจำนวนเล็กๆ ที่คุณออมวันนี้สร้างรากฐานสำหรับอิสรภาพทางการเงินในวันพรุ่งนี้",
    },
    author: {
      en: "Benjamin Franklin",
      th: "เบนจามิน แฟรงคลิน",
    },
    category: "savings",
    mood: "inspiring",
    actionPrompt: {
      en: "Start small - save just ฿50 today!",
      th: "เริ่มเล็กๆ - ออมแค่ ฿50 วันนี้!",
    },
    tags: ["savings", "wisdom", "foundation"],
    displayDuration: 30,
    priority: "medium",
  },
  {
    id: "thai_cultural_wisdom",
    type: "cultural",
    title: {
      en: "Thai Financial Wisdom",
      th: "ปัญญาการเงินแบบไทย",
    },
    content: {
      en: "ปลาใหญ่กินปลาเล็ก - Big fish eat small fish. Build your financial strength gradually, like a river that carves the deepest valleys through patience and persistence.",
      th: "ปลาใหญ่กินปลาเล็ก สร้างความแข็งแกร่งทางการเงินของคุณทีละน้อย เหมือนแม่น้ำที่สลักหุบเขาที่ลึกที่สุดด้วยความอดทนและความพากเพียร",
    },
    category: "cultural",
    mood: "reflective",
    culturalContext: {
      en: "Thai wisdom emphasizes patience and gradual progress in building wealth",
      th: "ปัญญาไทยเน้นความอดทนและความก้าวหน้าทีละน้อยในการสร้างความมั่งคั่ง",
    },
    actionPrompt: {
      en: "Practice patience with your financial goals today",
      th: "ฝึกความอดทนกับเป้าหมายทางการเงินของคุณวันนี้",
    },
    tags: ["cultural", "patience", "thai_wisdom", "gradual_progress"],
    displayDuration: 45,
    priority: "high",
  },
  {
    id: "goal_achievement_celebration",
    type: "celebration",
    title: {
      en: "Victory Celebration!",
      th: "ฉลองชัยชนะ!",
    },
    content: {
      en: "🎉 Incredible! You've just achieved another milestone! Your dedication and discipline are paying off. This is proof that you have what it takes to reach financial freedom!",
      th: "🎉 น่าทึ่ง! คุณเพิ่งบรรลุเป้าหมายอีกครั้ง! ความทุ่มเทและวินัยของคุณกำลังได้รับผล นี่คือหลักฐานที่แสดงว่าคุณมีสิ่งที่จำเป็นเพื่อบรรลุอิสรภาพทางการเงิน!",
    },
    category: "success",
    mood: "celebratory",
    actionPrompt: {
      en: "Share your success and inspire others!",
      th: "แบ่งปันความสำเร็จและสร้างแรงบันดาลใจให้คนอื่น!",
    },
    tags: ["celebration", "achievement", "success", "motivation"],
    displayDuration: 20,
    priority: "high",
  },
  {
    id: "morning_motivation",
    type: "encouragement",
    title: {
      en: "Morning Financial Energy",
      th: "พลังการเงินยามเช้า",
    },
    content: {
      en: "Good morning, financial warrior! 🌅 Today is a new opportunity to make smart money decisions. Every choice you make today shapes your financial future.",
      th: "สวัสดีตอนเช้า นักรบทางการเงิน! 🌅 วันนี้เป็นโอกาสใหม่ในการตัดสินใจเรื่องเงินอย่างชาญฉลาด ทุกทางเลือกที่คุณทำวันนี้หล่อหลอมอนาคตทางการเงินของคุณ",
    },
    category: "mindset",
    mood: "energizing",
    actionPrompt: {
      en: "Set one financial intention for today",
      th: "ตั้งเจตนาทางการเงินหนึ่งข้อสำหรับวันนี้",
    },
    tags: ["morning", "energy", "daily_motivation", "mindset"],
    displayDuration: 25,
    priority: "medium",
  },
  {
    id: "discipline_reminder",
    type: "wisdom",
    title: {
      en: "The Power of Discipline",
      th: "พลังแห่งวินัย",
    },
    content: {
      en: "Discipline is choosing between what you want now and what you want most. Your future self will thank you for the disciplined choices you make today.",
      th: "วินัยคือการเลือกระหว่างสิ่งที่คุณต้องการตอนนี้และสิ่งที่คุณต้องการมากที่สุด ตัวคุณในอนาคตจะขอบคุณสำหรับทางเลือกที่มีวินัยที่คุณทำวันนี้",
    },
    category: "discipline",
    mood: "reflective",
    actionPrompt: {
      en: "Make one disciplined choice right now",
      th: "ทำทางเลือกที่มีวินัยหนึ่งข้อตอนนี้เลย",
    },
    tags: ["discipline", "future_self", "choices", "wisdom"],
    displayDuration: 35,
    priority: "high",
  },
  {
    id: "katanyu_reminder",
    type: "cultural",
    title: {
      en: "Gratitude and Giving",
      th: "กตัญญูและการให้",
    },
    content: {
      en: "กตัญญู (Gratitude) is the foundation of Thai values. When you manage money wisely, you honor those who helped you and create the ability to help others.",
      th: "กตัญญูคือรากฐานของคุณค่าไทย เมื่อคุณจัดการเงินอย่างชาญฉลาด คุณให้เกียรติผู้ที่ช่วยเหลือคุณและสร้างความสามารถในการช่วยเหลือผู้อื่น",
    },
    category: "cultural",
    mood: "reflective",
    culturalContext: {
      en: "Katanyu (กตัญญู) represents gratitude and reciprocity - core Thai values",
      th: "กตัญญู แทนความกตัญญูและการตอบแทน - คุณค่าหลักของคนไทย",
    },
    actionPrompt: {
      en: "Practice gratitude by managing money responsibly",
      th: "ฝึกความกตัญญูโดยการจัดการเงินอย่างรับผิดชอบ",
    },
    tags: ["katanyu", "gratitude", "thai_values", "responsibility"],
    displayDuration: 40,
    priority: "high",
  },
  {
    id: "investment_courage",
    type: "encouragement",
    title: {
      en: "Investment Courage",
      th: "ความกล้าหาญในการลงทุน",
    },
    content: {
      en: "The biggest risk is not taking any risk. Start small, learn continuously, and let your money work for you. Every expert was once a beginner.",
      th: "ความเสี่ยงที่ใหญ่ที่สุดคือการไม่เสี่ยงเลย เริ่มต้นเล็กๆ เรียนรู้อย่างต่อเนื่อง และให้เงินทำงานให้คุณ ผู้เชี่ยวชาญทุกคนเคยเป็นมือใหม่มาก่อน",
    },
    category: "goals",
    mood: "inspiring",
    actionPrompt: {
      en: "Research one investment option today",
      th: "ศึกษาตัวเลือกการลงทุนหนึ่งข้อวันนี้",
    },
    tags: ["investment", "courage", "learning", "growth"],
    displayDuration: 30,
    priority: "medium",
  },
  {
    id: "evening_reflection",
    type: "daily",
    title: {
      en: "Evening Financial Reflection",
      th: "การไตร่ตรองการเงินยามเย็น",
    },
    content: {
      en: "As the day ends, reflect on your financial choices. Did you honor your goals? Every day is a chance to build better money habits. 🌙",
      th: "เมื่อวันสิ้นสุดลง ไตร่ตรองทางเลือกทางการเงินของคุณ คุณให้เกียรติเป้าหมายของคุณหรือไม่? ทุกวันคือโอกาสในการสร้างนิสัยการเงินที่ดีขึ้น 🌙",
    },
    category: "mindset",
    mood: "calming",
    actionPrompt: {
      en: "Review today's spending and plan tomorrow",
      th: "ทบทวนการใช้จ่ายวันนี้และวางแผนวันพรุ่งนี้",
    },
    tags: ["evening", "reflection", "habits", "planning"],
    displayDuration: 35,
    priority: "low",
  },
];

// Message Display Component
function MessageDisplay({
  message,
  onAction,
  isActive = true,
}: {
  message: MotivationalMessage;
  onAction?: (action: string) => void;
  isActive?: boolean;
}) {
  const { language } = useTranslation();

  const moodColors = {
    inspiring: "from-blue-500/20 to-purple-500/20 border-blue-500/30",
    calming: "from-green-500/20 to-teal-500/20 border-green-500/30",
    energizing: "from-orange-500/20 to-red-500/20 border-orange-500/30",
    reflective: "from-purple-500/20 to-indigo-500/20 border-purple-500/30",
    celebratory: "from-yellow-500/20 to-pink-500/20 border-yellow-500/30",
  };

  const moodIcons = {
    inspiring: "🌟",
    calming: "🧘",
    energizing: "⚡",
    reflective: "🤔",
    celebratory: "🎉",
  };

  const categoryIcons = {
    savings: "💰",
    goals: "🎯",
    mindset: "🧠",
    cultural: "🙏",
    success: "🏆",
    discipline: "💪",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{
        opacity: isActive ? 1 : 0.7,
        scale: isActive ? 1 : 0.95,
        y: 0,
      }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="w-full max-w-2xl mx-auto"
    >
      <ThemeAwareCard
        className={cn(
          "p-6 bg-gradient-to-br border-2 transition-all duration-300",
          moodColors[message.mood],
          isActive && "shadow-lg",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{moodIcons[message.mood]}</div>
            <div>
              <h3 className="text-xl font-bold">
                {language === "th" ? message.title.th : message.title.en}
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400 flex items-center gap-1">
                  {categoryIcons[message.category]} {message.category}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400 capitalize">{message.type}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400 capitalize">{message.mood}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                message.priority === "high"
                  ? "bg-red-500/20 text-red-300"
                  : message.priority === "medium"
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-green-500/20 text-green-300",
              )}
            >
              {message.priority} priority
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <ThemeAwareText className="text-lg leading-relaxed">
            {language === "th" ? message.content.th : message.content.en}
          </ThemeAwareText>
        </div>

        {/* Author */}
        {message.author && (
          <div className="mb-4 text-right">
            <ThemeAwareText color="secondary" className="text-sm italic">
              — {language === "th" ? message.author.th : message.author.en}
            </ThemeAwareText>
          </div>
        )}

        {/* Cultural Context */}
        {message.culturalContext && (
          <div className="mb-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
            <div className="text-sm text-amber-300 flex items-center gap-2">
              <span>🇹🇭</span>
              <span>
                {language === "th"
                  ? message.culturalContext.th
                  : message.culturalContext.en}
              </span>
            </div>
          </div>
        )}

        {/* Action Prompt */}
        {message.actionPrompt && (
          <div className="mb-4 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
            <div className="text-center">
              <div className="text-purple-300 font-medium mb-2">
                💡 Take Action:
              </div>
              <div className="text-purple-200">
                {language === "th"
                  ? message.actionPrompt.th
                  : message.actionPrompt.en}
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {message.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-700 text-xs rounded-full text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <ThemeAwareButton
            variant="primary"
            size="sm"
            onClick={() => onAction?.("take_action")}
            className="flex-1"
          >
            ✨ Take Action
          </ThemeAwareButton>
          <ThemeAwareButton
            variant="ghost"
            size="sm"
            onClick={() => onAction?.("save_message")}
          >
            💾 Save
          </ThemeAwareButton>
          <ThemeAwareButton
            variant="ghost"
            size="sm"
            onClick={() => onAction?.("share_message")}
          >
            📱 Share
          </ThemeAwareButton>
        </div>
      </ThemeAwareCard>
    </motion.div>
  );
}

export function MotivationalMessages({
  messages = mockMessages,
  currentContext,
  autoRotate = true,
  rotationInterval = 30,
  onMessageAction,
  className = "",
}: MotivationalMessagesProps) {
  const { language: _language } = useTranslation();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Filter messages based on context
  const contextualMessages = messages.filter((message) => {
    if (!currentContext) return true;

    // Filter by user mood
    if (
      currentContext.userMood === "celebrating" &&
      message.type !== "celebration"
    ) {
      return message.mood === "celebratory";
    }

    if (currentContext.userMood === "discouraged") {
      return message.mood === "inspiring";
    }

    // Filter by time of day
    if (
      currentContext.timeOfDay === "morning" &&
      !message.tags.includes("morning")
    ) {
      return message.mood === "energizing";
    }

    if (
      currentContext.timeOfDay === "evening" &&
      !message.tags.includes("evening")
    ) {
      return message.mood === "calming";
    }

    return true;
  });

  const currentMessage = contextualMessages[currentMessageIndex] || messages[0];

  // Auto-rotate messages
  useEffect(() => {
    if (!autoRotate || isPaused || contextualMessages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) =>
        prev >= contextualMessages.length - 1 ? 0 : prev + 1,
      );
    }, rotationInterval * 1000);

    return () => clearInterval(interval);
  }, [autoRotate, isPaused, rotationInterval, contextualMessages.length]);

  const handleMessageAction = (action: string) => {
    onMessageAction?.(action, currentMessage.id);

    // Handle built-in actions
    if (action === "take_action") {
      // Pause auto-rotation when user takes action
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 10000); // Resume after 10 seconds
    }
  };

  const navigateToMessage = (index: number) => {
    setCurrentMessageIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 15000); // Resume after 15 seconds
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center">
        <ThemeAwareHeading
          level="h2"
          className="text-2xl font-bold mb-2 flex items-center justify-center gap-2"
        >
          💬 Motivational Messages
        </ThemeAwareHeading>
        <ThemeAwareText color="secondary" className="text-sm">
          Daily inspiration and wisdom for your financial journey
        </ThemeAwareText>
      </div>

      {/* Context Info */}
      {currentContext && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 rounded-full text-sm">
            <span>🎯</span>
            <span>
              Personalized for: {currentContext.userMood} mood,{" "}
              {currentContext.timeOfDay}
            </span>
          </div>
        </div>
      )}

      {/* Main Message Display */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <MessageDisplay
            key={currentMessage.id}
            message={currentMessage}
            onAction={handleMessageAction}
            isActive={true}
          />
        </AnimatePresence>

        {/* Progress Indicator */}
        {contextualMessages.length > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {contextualMessages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => navigateToMessage(idx)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  idx === currentMessageIndex
                    ? "bg-purple-500"
                    : "bg-gray-600 hover:bg-gray-500",
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-2">
        <ThemeAwareButton
          variant="ghost"
          size="sm"
          onClick={() =>
            navigateToMessage(
              currentMessageIndex > 0
                ? currentMessageIndex - 1
                : contextualMessages.length - 1,
            )
          }
          disabled={contextualMessages.length <= 1}
        >
          ⬅️ Previous
        </ThemeAwareButton>

        <ThemeAwareButton
          variant="ghost"
          size="sm"
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? "▶️ Resume" : "⏸️ Pause"}
        </ThemeAwareButton>

        <ThemeAwareButton
          variant="ghost"
          size="sm"
          onClick={() =>
            navigateToMessage(
              currentMessageIndex < contextualMessages.length - 1
                ? currentMessageIndex + 1
                : 0,
            )
          }
          disabled={contextualMessages.length <= 1}
        >
          Next ➡️
        </ThemeAwareButton>
      </div>

      {/* Message Stats */}
      <ThemeAwareCard className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
        <div className="text-center">
          <h3 className="font-semibold text-purple-300 mb-2">
            📊 Daily Inspiration Stats
          </h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-lg font-bold text-blue-400">
                {contextualMessages.length}
              </div>
              <div className="text-gray-400">Messages</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-400">
                {contextualMessages.filter((m) => m.priority === "high").length}
              </div>
              <div className="text-gray-400">High Priority</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-400">
                {
                  contextualMessages.filter((m) => m.category === "cultural")
                    .length
                }
              </div>
              <div className="text-gray-400">Cultural</div>
            </div>
          </div>
        </div>
      </ThemeAwareCard>
    </div>
  );
}
