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

// Community Challenge Types
export interface ChallengeParticipant {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  progress: number;
  rank: number;
  joinedAt: string;
  lastUpdate: string;
  isCurrentUser?: boolean;
}

export interface ChallengeReward {
  rank: number;
  reward: {
    type: "badge" | "xp" | "title" | "special";
    value: string | number;
    name: {
      en: string;
      th: string;
    };
    icon: string;
  };
}

export interface CommunityChallenge {
  id: string;
  name: {
    en: string;
    th: string;
  };
  description: {
    en: string;
    th: string;
  };
  type: "savings" | "goals" | "cultural" | "social" | "streak";
  difficulty: "easy" | "medium" | "hard" | "extreme";
  duration: {
    startDate: string;
    endDate: string;
    durationDays: number;
  };
  target: {
    metric: string;
    value: number;
    unit: string;
  };
  participants: ChallengeParticipant[];
  maxParticipants: number;
  rewards: ChallengeReward[];
  icon: string;
  color: string;
  status: "upcoming" | "active" | "completed";
  isJoined: boolean;
  category: "individual" | "team" | "community";
  rules: {
    en: string[];
    th: string[];
  };
  tips: {
    en: string[];
    th: string[];
  };
}

export interface CommunityChallengeProps {
  challenges?: CommunityChallenge[];
  onJoinChallenge?: (challengeId: string) => void;
  onLeaveChallenge?: (challengeId: string) => void;
  onUpdateProgress?: (challengeId: string, progress: number) => void;
  className?: string;
}

// Mock Community Challenges
const mockChallenges: CommunityChallenge[] = [
  {
    id: "january-savings-sprint",
    name: {
      en: "January Savings Sprint",
      th: "แข่งออมเงินมกราคม",
    },
    description: {
      en: "Save ฿10,000 in January 2025! Join fellow savers in this month-long challenge.",
      th: "ออมเงิน ฿10,000 ในเดือนมกราคม 2025! ร่วมกับเพื่อนนักออมในความท้าทายตลอดเดือน",
    },
    type: "savings",
    difficulty: "medium",
    duration: {
      startDate: "2025-01-01",
      endDate: "2025-01-31",
      durationDays: 31,
    },
    target: {
      metric: "savings_amount",
      value: 10000,
      unit: "THB",
    },
    participants: [
      {
        id: "user1",
        username: "savings_ninja",
        displayName: "Ninja นักออม",
        avatar: "🥷",
        progress: 8500,
        rank: 1,
        joinedAt: "2025-01-01",
        lastUpdate: "2025-01-15",
      },
      {
        id: "user2",
        username: "money_master",
        displayName: "Master เงิน",
        avatar: "🧙‍♂️",
        progress: 7200,
        rank: 2,
        joinedAt: "2025-01-01",
        lastUpdate: "2025-01-14",
      },
      {
        id: "current_user",
        username: "financial_ninja_th",
        displayName: "Alex นักออม",
        avatar: "🚀",
        progress: 6800,
        rank: 3,
        joinedAt: "2025-01-02",
        lastUpdate: "2025-01-15",
        isCurrentUser: true,
      },
    ],
    maxParticipants: 100,
    rewards: [
      {
        rank: 1,
        reward: {
          type: "badge",
          value: "savings_champion",
          name: { en: "Savings Champion", th: "แชมป์นักออม" },
          icon: "🏆",
        },
      },
      {
        rank: 2,
        reward: {
          type: "badge",
          value: "savings_master",
          name: { en: "Savings Master", th: "ปรมาจารย์นักออม" },
          icon: "🥈",
        },
      },
      {
        rank: 3,
        reward: {
          type: "xp",
          value: 500,
          name: { en: "500 XP Bonus", th: "โบนัส 500 XP" },
          icon: "⭐",
        },
      },
    ],
    icon: "💰",
    color: "#10B981",
    status: "active",
    isJoined: true,
    category: "community",
    rules: {
      en: [
        "Save at least ฿10,000 during January 2025",
        "Log your progress weekly",
        "No cheating or fake entries",
        "Be supportive to other participants",
      ],
      th: [
        "ออมเงินอย่างน้อย ฿10,000 ในช่วงมกราคม 2025",
        "บันทึกความก้าวหน้าทุกสัปดาห์",
        "ไม่โกงหรือใส่ข้อมูลเท็จ",
        "ให้กำลังใจผู้เข้าร่วมคนอื่นๆ",
      ],
    },
    tips: {
      en: [
        "Set up automatic transfers to savings",
        "Cut unnecessary subscriptions",
        "Use the 50/30/20 budgeting rule",
        "Track daily expenses",
      ],
      th: [
        "ตั้งการโอนเงินออมอัตโนมัติ",
        "ตัดค่าใช้จ่ายที่ไม่จำเป็น",
        "ใช้กฎการจัดสรรเงิน 50/30/20",
        "ติดตามค่าใช้จ่ายรายวัน",
      ],
    },
  },
  {
    id: "cultural-merit-month",
    name: {
      en: "Cultural Merit Month",
      th: "เดือนทำบุญวัฒนธรรม",
    },
    description: {
      en: "Make merit 15 times this month! Temple visits, charity, and good deeds count.",
      th: "ทำบุญ 15 ครั้งในเดือนนี้! นับรวมไปวัด การกุศล และการทำความดี",
    },
    type: "cultural",
    difficulty: "easy",
    duration: {
      startDate: "2025-01-01",
      endDate: "2025-01-31",
      durationDays: 31,
    },
    target: {
      metric: "merit_actions",
      value: 15,
      unit: "actions",
    },
    participants: [
      {
        id: "user3",
        username: "merit_maker",
        displayName: "นักทำบุญ",
        avatar: "🙏",
        progress: 12,
        rank: 1,
        joinedAt: "2025-01-01",
        lastUpdate: "2025-01-14",
      },
      {
        id: "current_user",
        username: "financial_ninja_th",
        displayName: "Alex นักออม",
        avatar: "🚀",
        progress: 8,
        rank: 2,
        joinedAt: "2025-01-03",
        lastUpdate: "2025-01-13",
        isCurrentUser: true,
      },
    ],
    maxParticipants: 50,
    rewards: [
      {
        rank: 1,
        reward: {
          type: "title",
          value: "merit_master",
          name: { en: "Merit Master", th: "อาจารย์ทำบุญ" },
          icon: "🏮",
        },
      },
    ],
    icon: "🙏",
    color: "#F59E0B",
    status: "active",
    isJoined: true,
    category: "community",
    rules: {
      en: [
        "Complete 15 merit-making actions",
        "Document each action with photo/note",
        "Actions must be genuine and meaningful",
        "Share your experiences with the community",
      ],
      th: [
        "ทำกิจกรรมทำบุญ 15 ครั้ง",
        "บันทึกแต่ละครั้งด้วยรูปภาพ/บันทึก",
        "กิจกรรมต้องแท้จริงและมีความหมาย",
        "แบ่งปันประสบการณ์กับชุมชน",
      ],
    },
    tips: {
      en: [
        "Visit local temples regularly",
        "Donate to charities",
        "Help elderly neighbors",
        "Participate in community service",
      ],
      th: [
        "ไปวัดประจำอย่างสม่ำเสมอ",
        "บริจาคให้องค์กรการกุศล",
        "ช่วยเหลือผู้สูงอายุในชุมชน",
        "เข้าร่วมกิจกรรมสาธารณประโยชน์",
      ],
    },
  },
  {
    id: "goal-crusher-february",
    name: {
      en: "Goal Crusher February",
      th: "พิชิตเป้าหมายกุมภาพันธ์",
    },
    description: {
      en: "Complete 3 financial goals in February! Big or small, every goal counts.",
      th: "ทำเป้าหมายทางการเงิน 3 เป้าหมายให้สำเร็จในกุมภาพันธ์! ใหญ่หรือเล็ก ทุกเป้าหมายมีค่า",
    },
    type: "goals",
    difficulty: "hard",
    duration: {
      startDate: "2025-02-01",
      endDate: "2025-02-28",
      durationDays: 28,
    },
    target: {
      metric: "goals_completed",
      value: 3,
      unit: "goals",
    },
    participants: [],
    maxParticipants: 75,
    rewards: [
      {
        rank: 1,
        reward: {
          type: "special",
          value: "goal_crusher_badge",
          name: { en: "Goal Crusher Badge", th: "เหรียญพิชิตเป้าหมาย" },
          icon: "🎯",
        },
      },
    ],
    icon: "🎯",
    color: "#EF4444",
    status: "upcoming",
    isJoined: false,
    category: "individual",
    rules: {
      en: [
        "Complete exactly 3 financial goals",
        "Goals must be created before February 1st",
        "Document your achievement process",
        "Share success strategies with others",
      ],
      th: [
        "ทำเป้าหมายทางการเงิน 3 เป้าหมายให้สำเร็จ",
        "เป้าหมายต้องสร้างก่อน 1 กุมภาพันธ์",
        "บันทึกกระบวนการความสำเร็จ",
        "แบ่งปันกลยุทธ์ความสำเร็จกับคนอื่น",
      ],
    },
    tips: {
      en: [
        "Break large goals into smaller tasks",
        "Set realistic deadlines",
        "Track progress daily",
        "Celebrate small wins",
      ],
      th: [
        "แบ่งเป้าหมายใหญ่เป็นงานย่อย",
        "กำหนดเวลาที่เป็นไปได้",
        "ติดตามความก้าวหน้าทุกวัน",
        "ฉลองชัยชนะเล็กๆ",
      ],
    },
  },
];

// Challenge Card Component
function ChallengeCard({
  challenge,
  onJoin,
  onLeave,
  onViewDetails,
  isExpanded = false,
}: {
  challenge: CommunityChallenge;
  onJoin?: () => void;
  onLeave?: () => void;
  onViewDetails?: () => void;
  isExpanded?: boolean;
}) {
  const { language } = useTranslation();

  const daysRemaining = useMemo(() => {
    const endDate = new Date(challenge.duration.endDate);
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [challenge.duration.endDate]);

  const progressPercentage = useMemo(() => {
    if (challenge.participants.length === 0) return 0;
    const userParticipant = challenge.participants.find((p) => p.isCurrentUser);
    if (!userParticipant) return 0;
    return (userParticipant.progress / challenge.target.value) * 100;
  }, [challenge.participants, challenge.target.value]);

  const difficultyColors = {
    easy: "#10B981",
    medium: "#F59E0B",
    hard: "#EF4444",
    extreme: "#8B5CF6",
  };

  const statusColors = {
    upcoming: "#6B7280",
    active: "#10B981",
    completed: "#3B82F6",
  };

  return (
    <motion.div
      className={cn(
        "cursor-pointer transition-all duration-300",
        isExpanded && "scale-105",
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onViewDetails}
    >
      <ThemeAwareCard
        className={cn(
          "p-6 border-2 transition-all duration-300 bg-gradient-to-br from-gray-800/20 to-transparent",
          isExpanded
            ? "border-purple-500 shadow-lg shadow-purple-500/20"
            : "border-transparent",
        )}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div
              className="text-4xl p-3 rounded-full border-2"
              style={{
                borderColor: challenge.color,
                backgroundColor: `${challenge.color}15`,
              }}
            >
              {challenge.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">
                {language === "th" ? challenge.name.th : challenge.name.en}
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <span
                  className="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  style={{
                    backgroundColor: `${difficultyColors[challenge.difficulty]}20`,
                    color: difficultyColors[challenge.difficulty],
                  }}
                >
                  {challenge.difficulty}
                </span>
                <span
                  className="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  style={{
                    backgroundColor: `${statusColors[challenge.status]}20`,
                    color: statusColors[challenge.status],
                  }}
                >
                  {challenge.status}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300 capitalize">
                  {challenge.category}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div
              className="text-lg font-bold"
              style={{ color: challenge.color }}
            >
              {challenge.participants.length}/{challenge.maxParticipants}
            </div>
            <div className="text-xs text-gray-400">participants</div>
            {challenge.status === "active" && (
              <div className="text-sm text-yellow-400 mt-1">
                {daysRemaining} days left
              </div>
            )}
          </div>
        </div>

        <ThemeAwareText color="secondary" className="text-sm mb-4">
          {language === "th"
            ? challenge.description.th
            : challenge.description.en}
        </ThemeAwareText>

        {/* Target and Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Target:</span>
            <span className="text-white font-medium">
              {challenge.target.value.toLocaleString()} {challenge.target.unit}
            </span>
          </div>

          {challenge.isJoined && challenge.status === "active" && (
            <>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Your Progress:</span>
                <span className="text-green-400 font-medium">
                  {progressPercentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(progressPercentage, 100)}%`,
                    backgroundColor: challenge.color,
                  }}
                />
              </div>
            </>
          )}
        </div>

        {/* Top Participants Preview */}
        {challenge.participants.length > 0 && (
          <div className="mb-4">
            <div className="text-sm text-gray-400 mb-2">Top Participants:</div>
            <div className="flex gap-2">
              {challenge.participants.slice(0, 3).map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center gap-2 text-xs"
                >
                  <span className="text-lg">{participant.avatar}</span>
                  <div>
                    <div className="font-medium">{participant.displayName}</div>
                    <div className="text-gray-400">#{participant.rank}</div>
                  </div>
                </div>
              ))}
              {challenge.participants.length > 3 && (
                <div className="text-xs text-gray-400 self-center">
                  +{challenge.participants.length - 3} more
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {challenge.status === "upcoming" && !challenge.isJoined && (
            <ThemeAwareButton
              variant="primary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onJoin?.();
              }}
              className="flex-1"
            >
              🚀 Join Challenge
            </ThemeAwareButton>
          )}

          {challenge.status === "active" && challenge.isJoined && (
            <>
              <ThemeAwareButton
                variant="primary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle progress update
                }}
                className="flex-1"
              >
                📈 Update Progress
              </ThemeAwareButton>
              <ThemeAwareButton
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onLeave?.();
                }}
              >
                Leave
              </ThemeAwareButton>
            </>
          )}

          {challenge.status === "active" && !challenge.isJoined && (
            <ThemeAwareButton
              variant="primary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onJoin?.();
              }}
              className="flex-1"
            >
              🚀 Join Now
            </ThemeAwareButton>
          )}

          <ThemeAwareButton
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.();
            }}
          >
            👁️ Details
          </ThemeAwareButton>
        </div>

        {/* Rewards Preview */}
        {challenge.rewards.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="text-sm text-gray-400 mb-2">Rewards:</div>
            <div className="flex gap-2 text-xs">
              {challenge.rewards.slice(0, 3).map((reward) => (
                <div
                  key={reward.rank}
                  className="flex items-center gap-1 px-2 py-1 bg-gray-800 rounded"
                >
                  <span>#{reward.rank}</span>
                  <span>{reward.reward.icon}</span>
                  <span className="text-gray-300">{reward.reward.name.en}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </ThemeAwareCard>
    </motion.div>
  );
}

export function CommunityChallenge({
  challenges = mockChallenges,
  onJoinChallenge,
  onLeaveChallenge,
  onUpdateProgress: _onUpdateProgress,
  className = "",
}: CommunityChallengeProps) {
  // const { language } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(
    null,
  );

  // Filter challenges
  const filteredChallenges = useMemo(() => {
    if (selectedFilter === "all") return challenges;
    if (selectedFilter === "joined")
      return challenges.filter((c) => c.isJoined);
    if (selectedFilter === "available")
      return challenges.filter((c) => !c.isJoined && c.status !== "completed");
    return challenges.filter((c) => c.status === selectedFilter);
  }, [challenges, selectedFilter]);

  // Get user's active challenges
  const activeChallenges = challenges.filter(
    (c) => c.isJoined && c.status === "active",
  );

  const handleChallengeSelect = (challengeId: string) => {
    setSelectedChallenge(
      selectedChallenge === challengeId ? null : challengeId,
    );
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center">
        <ThemeAwareHeading
          level="h2"
          className="text-2xl font-bold mb-2 flex items-center justify-center gap-2"
        >
          🏆 Community Challenges
        </ThemeAwareHeading>
        <ThemeAwareText color="secondary" className="text-sm">
          Join financial challenges with friends and compete for rewards
        </ThemeAwareText>
      </div>

      {/* Active Challenges Summary */}
      {activeChallenges.length > 0 && (
        <ThemeAwareCard className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
          <div className="text-center">
            <h3 className="font-semibold text-green-300 mb-2">
              🚀 Your Active Challenges
            </h3>
            <div className="text-2xl font-bold text-green-400 mb-1">
              {activeChallenges.length}
            </div>
            <div className="text-sm text-gray-400">
              Keep going! You're doing great! 💪
            </div>
          </div>
        </ThemeAwareCard>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap justify-center">
        {(
          [
            "all",
            "joined",
            "available",
            "active",
            "upcoming",
            "completed",
          ] as const
        ).map((filter) => (
          <ThemeAwareButton
            key={filter}
            variant={selectedFilter === filter ? "primary" : "ghost"}
            size="sm"
            onClick={() => setSelectedFilter(filter)}
            className="capitalize"
          >
            {filter === "all"
              ? "All"
              : filter === "joined"
                ? "My Challenges"
                : filter === "available"
                  ? "Available"
                  : filter}
            {filter !== "all" && (
              <span className="ml-1 text-xs">
                (
                {filter === "joined"
                  ? challenges.filter((c) => c.isJoined).length
                  : filter === "available"
                    ? challenges.filter(
                        (c) => !c.isJoined && c.status !== "completed",
                      ).length
                    : challenges.filter((c) => c.status === filter).length}
                )
              </span>
            )}
          </ThemeAwareButton>
        ))}
      </div>

      {/* Challenges List */}
      <div className="space-y-6">
        <AnimatePresence>
          {filteredChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ChallengeCard
                challenge={challenge}
                onJoin={() => onJoinChallenge?.(challenge.id)}
                onLeave={() => onLeaveChallenge?.(challenge.id)}
                onViewDetails={() => handleChallengeSelect(challenge.id)}
                isExpanded={selectedChallenge === challenge.id}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredChallenges.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🏆</div>
          <ThemeAwareText color="secondary">
            No challenges found for the selected filter
          </ThemeAwareText>
        </div>
      )}

      {/* Create Challenge CTA */}
      <ThemeAwareCard className="p-6 text-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
        <div className="text-4xl mb-4">💡</div>
        <ThemeAwareHeading level="h3" className="text-xl font-bold mb-2">
          Want to Create Your Own Challenge?
        </ThemeAwareHeading>
        <ThemeAwareText color="secondary" className="mb-4">
          Start a custom challenge for your friends or the community
        </ThemeAwareText>
        <ThemeAwareButton variant="primary">
          ✨ Create Challenge
        </ThemeAwareButton>
      </ThemeAwareCard>
    </div>
  );
}
