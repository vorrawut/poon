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

// AI Coach Types
export interface AICoachPersonality {
  id: string;
  name: {
    en: string;
    th: string;
  };
  avatar: string;
  description: {
    en: string;
    th: string;
  };
  specialty: "savings" | "goals" | "cultural" | "investment" | "general";
  tone: "encouraging" | "analytical" | "wise" | "friendly" | "professional";
  culturalFocus: "thai" | "international" | "mixed";
}

export interface AICoachMessage {
  id: string;
  type:
    | "greeting"
    | "insight"
    | "recommendation"
    | "celebration"
    | "warning"
    | "question";
  content: {
    en: string;
    th: string;
  };
  priority: "high" | "medium" | "low";
  category: "spending" | "saving" | "goals" | "cultural" | "social";
  timestamp: string;
  actionable: boolean;
  actions?: {
    label: { en: string; th: string };
    action: string;
  }[];
  confidence: number; // 0-100
  personalized: boolean;
}

export interface AICoachAvatarProps {
  personality?: AICoachPersonality;
  currentMessage?: AICoachMessage;
  isTyping?: boolean;
  onPersonalityChange?: (personality: AICoachPersonality) => void;
  onMessageAction?: (action: string) => void;
  onStartConversation?: () => void;
  className?: string;
}

// AI Coach Personalities
const coachPersonalities: AICoachPersonality[] = [
  {
    id: "thai_wisdom_master",
    name: {
      en: "Master Somchai",
      th: "อาจารย์สมชาย",
    },
    avatar: "🧙‍♂️",
    description: {
      en: "Wise Thai financial mentor who combines traditional wisdom with modern strategies",
      th: "ที่ปรึกษาทางการเงินไทยผู้ชาญฉลาดที่ผสมผสานปัญญาดั้งเดิมกับกลยุทธ์สมัยใหม่",
    },
    specialty: "cultural",
    tone: "wise",
    culturalFocus: "thai",
  },
  {
    id: "savings_ninja",
    name: {
      en: "Ninja Saver",
      th: "นินจานักออม",
    },
    avatar: "🥷",
    description: {
      en: "Energetic savings expert who helps you find creative ways to save money",
      th: "ผู้เชี่ยวชาญการออมเงินที่มีพลังและช่วยคุณหาวิธีการออมเงินอย่างสร้างสงค์",
    },
    specialty: "savings",
    tone: "encouraging",
    culturalFocus: "mixed",
  },
  {
    id: "goal_guardian",
    name: {
      en: "Goal Guardian",
      th: "ผู้พิทักษ์เป้าหมาย",
    },
    avatar: "🛡️",
    description: {
      en: "Dedicated goal achievement specialist who keeps you on track",
      th: "ผู้เชี่ยวชาญด้านการบรรลุเป้าหมายที่ทุ่มเทและช่วยให้คุณอยู่ในเส้นทางที่ถูกต้อง",
    },
    specialty: "goals",
    tone: "professional",
    culturalFocus: "international",
  },
  {
    id: "friendly_advisor",
    name: {
      en: "Alex Assistant",
      th: "อเล็กซ์ ผู้ช่วย",
    },
    avatar: "🤖",
    description: {
      en: "Friendly AI companion for everyday financial guidance and support",
      th: "เพื่อนคู่ใจ AI ที่เป็นมิตรสำหรับคำแนะนำและการสนับสนุนทางการเงินในชีวิตประจำวัน",
    },
    specialty: "general",
    tone: "friendly",
    culturalFocus: "mixed",
  },
  {
    id: "investment_analyst",
    name: {
      en: "Investment Guru",
      th: "กูรูการลงทุน",
    },
    avatar: "📈",
    description: {
      en: "Analytical investment expert focused on growing your wealth strategically",
      th: "ผู้เชี่ยวชาญการลงทุนเชิงวิเคราะห์ที่มุ่งเน้นการเติบโตของความมั่งคั่งอย่างมีกลยุทธ์",
    },
    specialty: "investment",
    tone: "analytical",
    culturalFocus: "international",
  },
];

// Sample AI Messages
const sampleMessages: AICoachMessage[] = [
  {
    id: "welcome",
    type: "greeting",
    content: {
      en: "Hello! I'm here to help you achieve your financial goals. Let's start by reviewing your recent progress! 🚀",
      th: "สวัสดี! ผมมาเพื่อช่วยคุณบรรลุเป้าหมายทางการเงิน มาเริ่มต้นด้วยการทบทวนความก้าวหน้าล่าสุดของคุณกันเถอะ! 🚀",
    },
    priority: "medium",
    category: "goals",
    timestamp: new Date().toISOString(),
    actionable: true,
    actions: [
      {
        label: { en: "Review Goals", th: "ทบทวนเป้าหมาย" },
        action: "review_goals",
      },
      {
        label: { en: "Check Savings", th: "ตรวจสอบการออม" },
        action: "check_savings",
      },
    ],
    confidence: 95,
    personalized: false,
  },
  {
    id: "cultural_insight",
    type: "insight",
    content: {
      en: "I noticed you've been making merit regularly! This shows excellent กตัญญู values. Consider setting aside 5% of your income for cultural activities. 🙏",
      th: "ผมสังเกตเห็นว่าคุณทำบุญเป็นประจำ! นี่แสดงให้เห็นคุณค่าความกตัญญูที่ยอดเยี่ยม ลองพิจารณาจัดสรรรายได้ 5% สำหรับกิจกรรมทางวัฒนธรรม 🙏",
    },
    priority: "high",
    category: "cultural",
    timestamp: new Date().toISOString(),
    actionable: true,
    actions: [
      {
        label: { en: "Set Cultural Budget", th: "ตั้งงบวัฒนธรรม" },
        action: "set_cultural_budget",
      },
    ],
    confidence: 88,
    personalized: true,
  },
  {
    id: "savings_tip",
    type: "recommendation",
    content: {
      en: "Great job saving ฿15,000 this month! 🎉 You're 23% ahead of your target. Want to challenge yourself with a bonus goal?",
      th: "เก่งมาก! ออมเงินได้ ฿15,000 ในเดือนนี้! 🎉 คุณทำได้เกินเป้าหมาย 23% อยากท้าทายตัวเองด้วยเป้าหมายโบนัสไหม?",
    },
    priority: "medium",
    category: "saving",
    timestamp: new Date().toISOString(),
    actionable: true,
    actions: [
      {
        label: { en: "Set Bonus Goal", th: "ตั้งเป้าหมายโบนัส" },
        action: "set_bonus_goal",
      },
      {
        label: { en: "Celebrate", th: "ฉลอง" },
        action: "celebrate_achievement",
      },
    ],
    confidence: 92,
    personalized: true,
  },
];

// Typing Animation Component
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 p-3">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-purple-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      <span className="text-sm text-gray-400 ml-2">AI is thinking...</span>
    </div>
  );
}

// Message Bubble Component
function MessageBubble({
  message,
  personality,
  onAction,
}: {
  message: AICoachMessage;
  personality: AICoachPersonality;
  onAction?: (action: string) => void;
}) {
  const { language } = useTranslation();

  const messageTypeColors = {
    greeting: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    insight: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
    recommendation: "from-green-500/20 to-emerald-500/20 border-green-500/30",
    celebration: "from-yellow-500/20 to-orange-500/20 border-yellow-500/30",
    warning: "from-red-500/20 to-pink-500/20 border-red-500/30",
    question: "from-indigo-500/20 to-purple-500/20 border-indigo-500/30",
  };

  const priorityIcons = {
    high: "🚨",
    medium: "💡",
    low: "ℹ️",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="w-full max-w-2xl"
    >
      <ThemeAwareCard
        className={cn(
          "p-4 bg-gradient-to-br border-2",
          messageTypeColors[message.type],
        )}
      >
        {/* Message Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{personality.avatar}</div>
            <div>
              <h4 className="font-semibold">
                {language === "th" ? personality.name.th : personality.name.en}
              </h4>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-400">
                  {priorityIcons[message.priority]} {message.priority}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400 capitalize">
                  {message.category}
                </span>
                {message.personalized && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-purple-400">📍 Personalized</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-gray-400">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
            <div className="text-xs text-green-400">
              {message.confidence}% confident
            </div>
          </div>
        </div>

        {/* Message Content */}
        <div className="mb-4">
          <ThemeAwareText className="text-base leading-relaxed">
            {language === "th" ? message.content.th : message.content.en}
          </ThemeAwareText>
        </div>

        {/* Action Buttons */}
        {message.actionable && message.actions && (
          <div className="flex gap-2 flex-wrap">
            {message.actions.map((action, idx) => (
              <ThemeAwareButton
                key={idx}
                variant="primary"
                size="sm"
                onClick={() => onAction?.(action.action)}
                className="text-sm"
              >
                {language === "th" ? action.label.th : action.label.en}
              </ThemeAwareButton>
            ))}
          </div>
        )}

        {/* Confidence Indicator */}
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">AI Confidence:</span>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500"
                  style={{ width: `${message.confidence}%` }}
                />
              </div>
              <span className="text-green-400 font-medium">
                {message.confidence}%
              </span>
            </div>
          </div>
        </div>
      </ThemeAwareCard>
    </motion.div>
  );
}

// Personality Selector
function PersonalitySelector({
  personalities,
  selected,
  onSelect,
}: {
  personalities: AICoachPersonality[];
  selected: string;
  onSelect: (personality: AICoachPersonality) => void;
}) {
  const { language } = useTranslation();

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-center mb-4">
        🤖 Choose Your AI Coach
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {personalities.map((personality) => (
          <motion.div
            key={personality.id}
            className={cn(
              "cursor-pointer transition-all duration-300",
              selected === personality.id && "scale-105",
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(personality)}
          >
            <ThemeAwareCard
              className={cn(
                "p-4 text-center border-2 transition-all duration-300",
                selected === personality.id
                  ? "border-purple-500 shadow-lg shadow-purple-500/20"
                  : "border-transparent hover:border-gray-600",
              )}
            >
              <div className="text-4xl mb-2">{personality.avatar}</div>
              <h4 className="font-semibold mb-1">
                {language === "th" ? personality.name.th : personality.name.en}
              </h4>
              <p className="text-xs text-gray-400 mb-2">
                {language === "th"
                  ? personality.description.th
                  : personality.description.en}
              </p>
              <div className="flex justify-center gap-1 text-xs">
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full capitalize">
                  {personality.specialty}
                </span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full capitalize">
                  {personality.tone}
                </span>
              </div>
              {selected === personality.id && (
                <div className="text-green-400 text-xs mt-2">✓ Selected</div>
              )}
            </ThemeAwareCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function AICoachAvatar({
  personality = coachPersonalities[0],
  currentMessage,
  isTyping = false,
  onPersonalityChange,
  onMessageAction,
  onStartConversation,
  className = "",
}: AICoachAvatarProps) {
  const { language } = useTranslation();
  // const { themeMode } = useTheme();
  const [showPersonalitySelector, setShowPersonalitySelector] = useState(false);
  const [messageHistory, setMessageHistory] = useState<AICoachMessage[]>([]);
  const [currentPersonality, setCurrentPersonality] = useState(personality);

  // Add current message to history when it changes
  useEffect(() => {
    if (
      currentMessage &&
      !messageHistory.find((m) => m.id === currentMessage.id)
    ) {
      setMessageHistory((prev) => [...prev, currentMessage]);
    }
  }, [currentMessage, messageHistory]);

  const handlePersonalityChange = (newPersonality: AICoachPersonality) => {
    setCurrentPersonality(newPersonality);
    setShowPersonalitySelector(false);
    onPersonalityChange?.(newPersonality);
  };

  const handleMessageAction = (action: string) => {
    onMessageAction?.(action);
  };

  const displayMessages = currentMessage
    ? [...messageHistory, currentMessage]
    : messageHistory;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center">
        <ThemeAwareHeading
          level="h2"
          className="text-2xl font-bold mb-2 flex items-center justify-center gap-2"
        >
          🤖 AI Financial Coach
        </ThemeAwareHeading>
        <ThemeAwareText color="secondary" className="text-sm">
          Your intelligent financial companion with cultural awareness
        </ThemeAwareText>
      </div>

      {/* Coach Controls */}
      <div className="flex justify-center gap-2">
        <ThemeAwareButton
          variant="ghost"
          size="sm"
          onClick={() => setShowPersonalitySelector(!showPersonalitySelector)}
        >
          🔄 Change Coach
        </ThemeAwareButton>
        <ThemeAwareButton
          variant="primary"
          size="sm"
          onClick={onStartConversation}
        >
          💬 Start Chat
        </ThemeAwareButton>
      </div>

      {/* Personality Selector */}
      <AnimatePresence>
        {showPersonalitySelector && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PersonalitySelector
              personalities={coachPersonalities}
              selected={currentPersonality.id}
              onSelect={handlePersonalityChange}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {/* Message History */}
        <AnimatePresence>
          {displayMessages.map((message) => (
            <div key={message.id} className="flex justify-start">
              <MessageBubble
                message={message}
                personality={currentPersonality}
                onAction={handleMessageAction}
              />
            </div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800/50 rounded-lg">
              <TypingIndicator />
            </div>
          </div>
        )}

        {/* Welcome State */}
        {displayMessages.length === 0 && !isTyping && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">{currentPersonality.avatar}</div>
            <ThemeAwareHeading level="h3" className="text-xl font-bold mb-2">
              {language === "th"
                ? currentPersonality.name.th
                : currentPersonality.name.en}
            </ThemeAwareHeading>
            <ThemeAwareText color="secondary" className="mb-4">
              {language === "th"
                ? currentPersonality.description.th
                : currentPersonality.description.en}
            </ThemeAwareText>
            <ThemeAwareButton
              variant="primary"
              onClick={() => {
                const welcomeMessage = sampleMessages[0];
                setMessageHistory([welcomeMessage]);
                onStartConversation?.();
              }}
            >
              👋 Say Hello
            </ThemeAwareButton>
          </div>
        )}
      </div>

      {/* Coach Stats */}
      <ThemeAwareCard className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
        <div className="text-center">
          <h3 className="font-semibold text-purple-300 mb-2">
            🧠 AI Coach Intelligence
          </h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-lg font-bold text-blue-400">95%</div>
              <div className="text-gray-400">Accuracy</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-400">1,247</div>
              <div className="text-gray-400">Users Helped</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-400">4.9</div>
              <div className="text-gray-400">Rating</div>
            </div>
          </div>
        </div>
      </ThemeAwareCard>
    </div>
  );
}
