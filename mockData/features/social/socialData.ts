// Social Features Mock Data

export interface LeaderboardEntry {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  score: number;
  rank: number;
  badge: string;
  achievements: number;
  goalCompletionRate: number;
  isCurrentUser?: boolean;
}

export interface Friend {
  id: string;
  username: string;
  avatar: string;
  status: "online" | "offline" | "away";
  mutualGoals: number;
  joinedDate: string;
  lastActive: string;
}

export interface CommunityChallenge {
  id: string;
  title: {
    en: string;
    th: string;
  };
  description: {
    en: string;
    th: string;
  };
  type: "savings" | "spending" | "goals" | "habits";
  difficulty: "easy" | "medium" | "hard";
  duration: number; // days
  participants: number;
  maxParticipants: number;
  reward: {
    type: "badge" | "points" | "achievement";
    value: string;
    description: {
      en: string;
      th: string;
    };
  };
  startDate: string;
  endDate: string;
  isActive: boolean;
  userParticipating: boolean;
  progress?: number;
  isJoined?: boolean;
  status?: "active" | "completed" | "upcoming";
  target?: number;
}

export interface Achievement {
  id: string;
  title: {
    en: string;
    th: string;
  };
  description: {
    en: string;
    th: string;
  };
  icon: string;
  rarity: "common" | "uncommon" | "rare" | "legendary";
  category: "goals" | "savings" | "spending" | "social" | "cultural";
  unlockedAt: Date;
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
  nextMilestone?: string;
  achievedAt?: string;
}

export interface ProgressUpdate {
  id: string;
  userId: string;
  type: "goal_completed" | "milestone_reached" | "streak_achieved" | "challenge_won";
  title: {
    en: string;
    th: string;
  };
  description: {
    en: string;
    th: string;
  };
  value: number;
  unit: string;
  timestamp: Date;
  celebrationLevel: "small" | "medium" | "large";
}

// Mock Data
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: "user-1",
    userId: "user-1",
    username: "SavingNinja",
    avatar: "🥷",
    score: 2450,
    rank: 1,
    badge: "💎",
    achievements: 15,
    goalCompletionRate: 92
  },
  {
    id: "user-2", 
    userId: "user-2",
    username: "GoalMaster",
    avatar: "🎯",
    score: 2180,
    rank: 2,
    badge: "🏆",
    achievements: 12,
    goalCompletionRate: 88
  },
  {
    id: "user-3",
    userId: "user-3", 
    username: "BudgetBoss",
    avatar: "👑",
    score: 1950,
    rank: 3,
    badge: "🥇",
    achievements: 10,
    goalCompletionRate: 85
  }
];

export const mockFriends: Friend[] = [
  {
    id: "friend-1",
    username: "AliceInvestor",
    avatar: "👩‍💼",
    status: "online",
    mutualGoals: 3,
    joinedDate: "2024-01-15",
    lastActive: "2024-12-15T10:30:00Z"
  },
  {
    id: "friend-2",
    username: "BobSaver",
    avatar: "👨‍💻", 
    status: "offline",
    mutualGoals: 1,
    joinedDate: "2024-03-20",
    lastActive: "2024-12-14T18:45:00Z"
  }
];

export const mockSuggestions: Friend[] = [
  {
    id: "suggestion-1",
    username: "CarolTrader",
    avatar: "📈",
    status: "away",
    mutualGoals: 0,
    joinedDate: "2024-11-01",
    lastActive: "2024-12-15T09:15:00Z"
  }
];

export const mockChallenges: CommunityChallenge[] = [
  {
    id: "challenge-1",
    title: {
      en: "30-Day Savings Sprint",
      th: "การออมเงิน 30 วัน"
    },
    description: {
      en: "Save at least 1000 baht every day for 30 days straight",
      th: "ออมเงินอย่างน้อย 1000 บาททุกวันเป็นเวลา 30 วันติดต่อกัน"
    },
    type: "savings",
    difficulty: "medium",
    duration: 30,
    participants: 156,
    maxParticipants: 200,
    reward: {
      type: "badge",
      value: "🏃‍♂️💰",
      description: {
        en: "Savings Sprinter Badge",
        th: "ตราการออมเงินแบบวิ่ง"
      }
    },
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    isActive: true,
    userParticipating: true,
    progress: 65
  },
  {
    id: "challenge-2",
    title: {
      en: "No Impulse Buying Week",
      th: "สัปดาห์ไม่ซื้อของกะทันหัน"
    },
    description: {
      en: "Avoid all impulse purchases for 7 consecutive days",
      th: "หลีกเลี่ยงการซื้อของกะทันหันทั้งหมดเป็นเวลา 7 วันติดต่อกัน"
    },
    type: "spending",
    difficulty: "easy",
    duration: 7,
    participants: 89,
    maxParticipants: 150,
    reward: {
      type: "points",
      value: "500",
      description: {
        en: "500 Mindful Spending Points",
        th: "500 แต้มการใช้จ่ายอย่างมีสติ"
      }
    },
    startDate: "2024-12-16",
    endDate: "2024-12-23",
    isActive: true,
    userParticipating: false
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: "achievement-1",
    title: {
      en: "First Goal Completed",
      th: "เป้าหมายแรกสำเร็จ"
    },
    description: {
      en: "Successfully completed your very first financial goal",
      th: "ทำเป้าหมายทางการเงินแรกสำเร็จ"
    },
    icon: "🎯",
    rarity: "common",
    category: "goals",
    unlockedAt: new Date("2024-11-15"),
    progress: 1,
    maxProgress: 1,
    isUnlocked: true
  },
  {
    id: "achievement-2",
    title: {
      en: "Savings Streak Master",
      th: "เซียนการออมเงินต่อเนื่อง"
    },
    description: {
      en: "Maintained a 30-day savings streak",
      th: "รักษาการออมเงินต่อเนื่อง 30 วัน"
    },
    icon: "🔥",
    rarity: "rare",
    category: "savings",
    unlockedAt: new Date("2024-12-10"),
    progress: 30,
    maxProgress: 30,
    isUnlocked: true
  }
];

export const mockProgressUpdates: ProgressUpdate[] = [
  {
    id: "update-1",
    userId: "current-user",
    type: "goal_completed",
    title: {
      en: "Emergency Fund Goal Completed!",
      th: "เป้าหมายกองทุนฉุกเฉินสำเร็จแล้ว!"
    },
    description: {
      en: "You've successfully saved 50,000 baht for emergencies",
      th: "คุณออมเงินสำหรับเหตุฉุกเฉินได้ 50,000 บาทแล้ว"
    },
    value: 50000,
    unit: "baht",
    timestamp: new Date("2024-12-14T15:30:00Z"),
    celebrationLevel: "large"
  },
  {
    id: "update-2",
    userId: "current-user",
    type: "milestone_reached",
    title: {
      en: "Halfway to Dream Vacation!",
      th: "ครึ่งทางสู่การเดินทางในฝัน!"
    },
    description: {
      en: "You've saved 25,000 baht towards your 50,000 baht vacation goal",
      th: "คุณออมเงินได้ 25,000 บาทจากเป้าหมาย 50,000 บาทสำหรับการเดินทาง"
    },
    value: 25000,
    unit: "baht",
    timestamp: new Date("2024-12-13T09:15:00Z"),
    celebrationLevel: "medium"
  }
];
