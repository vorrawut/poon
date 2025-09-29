import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ThemeAwareCard, 
  ThemeAwareText, 
  ThemeAwareButton,
  ThemeAwareHeading
} from "../../../core";
import { useTranslation } from "../../../libs/i18n";
import { cn } from "../../../libs/utils";

// User Profile Types
export interface UserAchievement {
  id: string;
  name: {
    en: string;
    th: string;
  };
  description: {
    en: string;
    th: string;
  };
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  category: "savings" | "goals" | "cultural" | "social" | "streak" | "special";
  earnedAt: string;
  progress?: {
    current: number;
    target: number;
  };
  isUnlocked: boolean;
  shareCount: number;
}

export interface UserStats {
  level: number;
  experience: number;
  experienceToNext: number;
  totalGoalsCompleted: number;
  totalSaved: number;
  streakDays: number;
  culturalScore: number;
  socialRank: number;
  joinedDate: string;
  lastActive: string;
}

export interface UserSocialProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  location: string;
  isPublic: boolean;
  stats: UserStats;
  achievements: UserAchievement[];
  badges: string[];
  friends: number;
  followers: number;
  following: number;
}

export interface UserProfileProps {
  profile?: UserSocialProfile;
  isOwnProfile?: boolean;
  onEditProfile?: () => void;
  onShareAchievement?: (achievement: UserAchievement) => void;
  onAddFriend?: () => void;
  className?: string;
}

// Mock User Profile Data
const mockUserProfile: UserSocialProfile = {
  id: "user123",
  username: "financial_ninja_th",
  displayName: "Alex นักออม",
  avatar: "🚀",
  bio: "Building wealth the Thai way! 🇹🇭 Saving for family, making merit, achieving dreams ✨",
  location: "Bangkok, Thailand",
  isPublic: true,
  stats: {
    level: 12,
    experience: 2850,
    experienceToNext: 1150,
    totalGoalsCompleted: 8,
    totalSaved: 285000,
    streakDays: 45,
    culturalScore: 85,
    socialRank: 156,
    joinedDate: "2024-06-15",
    lastActive: "2024-12-30"
  },
  achievements: [
    {
      id: "first_goal",
      name: { en: "First Goal Achieved", th: "บรรลุเป้าหมายแรก" },
      description: { en: "Completed your first savings goal", th: "ทำเป้าหมายการออมแรกสำเร็จ" },
      icon: "🎯",
      rarity: "common",
      category: "goals",
      earnedAt: "2024-07-20",
      isUnlocked: true,
      shareCount: 12
    },
    {
      id: "cultural_master",
      name: { en: "Cultural Master", th: "เซียนวัฒนธรรม" },
      description: { en: "Achieved 80+ cultural score", th: "ได้คะแนนวัฒนธรรม 80+ คะแนน" },
      icon: "🙏",
      rarity: "epic",
      category: "cultural",
      earnedAt: "2024-11-15",
      isUnlocked: true,
      shareCount: 28
    },
    {
      id: "streak_master",
      name: { en: "Streak Master", th: "นักสร้างสถิติ" },
      description: { en: "30-day logging streak", th: "บันทึกข้อมูลต่อเนื่อง 30 วัน" },
      icon: "🔥",
      rarity: "rare",
      category: "streak",
      earnedAt: "2024-12-01",
      isUnlocked: true,
      shareCount: 15
    },
    {
      id: "merit_maker",
      name: { en: "Merit Maker", th: "นักทำบุญ" },
      description: { en: "Donated to temples 10 times", th: "บริจาควัด 10 ครั้ง" },
      icon: "🏛️",
      rarity: "rare",
      category: "cultural",
      earnedAt: "2024-10-08",
      isUnlocked: true,
      shareCount: 22
    },
    {
      id: "social_butterfly",
      name: { en: "Social Butterfly", th: "นักสังคม" },
      description: { en: "Connected with 10 friends", th: "เชื่อมต่อกับเพื่อน 10 คน" },
      icon: "🦋",
      rarity: "common",
      category: "social",
      earnedAt: "2024-09-12",
      isUnlocked: true,
      shareCount: 8
    },
    {
      id: "savings_legend",
      name: { en: "Savings Legend", th: "ตำนานนักออม" },
      description: { en: "Saved over ฿250,000", th: "ออมเงินได้กว่า ฿250,000" },
      icon: "💎",
      rarity: "legendary",
      category: "savings",
      earnedAt: "2024-12-20",
      isUnlocked: true,
      shareCount: 45
    }
  ],
  badges: ["🎯", "🙏", "🔥", "💎", "🏛️", "🦋"],
  friends: 24,
  followers: 156,
  following: 89
};

// Achievement Card Component
function AchievementCard({ 
  achievement, 
  onShare,
  isHighlighted = false 
}: { 
  achievement: UserAchievement; 
  onShare?: () => void;
  isHighlighted?: boolean;
}) {
  const { language } = useTranslation();
  
  const rarityColors = {
    common: "#6B7280",
    rare: "#3B82F6", 
    epic: "#8B5CF6",
    legendary: "#F59E0B"
  };

  const rarityGradients = {
    common: "from-gray-500/20 to-gray-600/20",
    rare: "from-blue-500/20 to-blue-600/20",
    epic: "from-purple-500/20 to-purple-600/20", 
    legendary: "from-yellow-500/20 to-orange-600/20"
  };

  return (
    <motion.div
      className={cn(
        "relative cursor-pointer transition-all duration-300",
        isHighlighted && "scale-105"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ThemeAwareCard 
        className={cn(
          "p-4 border-2 transition-all duration-300 bg-gradient-to-br",
          rarityGradients[achievement.rarity],
          isHighlighted ? "border-purple-500 shadow-lg shadow-purple-500/20" : "border-transparent"
        )}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div 
              className="text-3xl p-2 rounded-full border-2"
              style={{ 
                borderColor: rarityColors[achievement.rarity],
                backgroundColor: `${rarityColors[achievement.rarity]}10`
              }}
            >
              {achievement.icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {language === 'th' ? achievement.name.th : achievement.name.en}
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <span 
                  className="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  style={{ 
                    backgroundColor: `${rarityColors[achievement.rarity]}20`,
                    color: rarityColors[achievement.rarity]
                  }}
                >
                  {achievement.rarity}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300 capitalize">
                  {achievement.category}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-400">
              {new Date(achievement.earnedAt).toLocaleDateString()}
            </div>
            <div className="text-xs text-gray-500">
              {achievement.shareCount} shares
            </div>
          </div>
        </div>

        <ThemeAwareText color="secondary" className="text-sm mb-3">
          {language === 'th' ? achievement.description.th : achievement.description.en}
        </ThemeAwareText>

        {achievement.progress && (
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Progress</span>
              <span className="text-white">{achievement.progress.current}/{achievement.progress.target}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(achievement.progress.current / achievement.progress.target) * 100}%`,
                  backgroundColor: rarityColors[achievement.rarity]
                }}
              />
            </div>
          </div>
        )}

        {onShare && (
          <ThemeAwareButton
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onShare();
            }}
            className="w-full mt-2"
          >
            🚀 Share Achievement
          </ThemeAwareButton>
        )}

        {/* Legendary Glow Effect */}
        {achievement.rarity === 'legendary' && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-yellow-400/10 animate-pulse pointer-events-none" />
        )}
      </ThemeAwareCard>
    </motion.div>
  );
}

// User Stats Component
function UserStatsSection({ stats }: { stats: UserStats }) {
  const levelProgress = (stats.experience / (stats.experience + stats.experienceToNext)) * 100;
  
  return (
    <div className="space-y-4">
      {/* Level and Experience */}
      <div className="text-center">
        <div className="text-4xl font-bold text-purple-400 mb-2">
          Level {stats.level}
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
          <div 
            className="h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
        <div className="text-sm text-gray-400">
          {stats.experience.toLocaleString()} / {(stats.experience + stats.experienceToNext).toLocaleString()} XP
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ThemeAwareCard className="p-3 text-center">
          <div className="text-2xl font-bold text-green-400">{stats.totalGoalsCompleted}</div>
          <div className="text-xs text-gray-400">Goals Completed</div>
        </ThemeAwareCard>
        
        <ThemeAwareCard className="p-3 text-center">
          <div className="text-2xl font-bold text-blue-400">
            ฿{(stats.totalSaved / 1000).toFixed(0)}K
          </div>
          <div className="text-xs text-gray-400">Total Saved</div>
        </ThemeAwareCard>
        
        <ThemeAwareCard className="p-3 text-center">
          <div className="text-2xl font-bold text-orange-400">{stats.streakDays}</div>
          <div className="text-xs text-gray-400">Day Streak</div>
        </ThemeAwareCard>
        
        <ThemeAwareCard className="p-3 text-center">
          <div className="text-2xl font-bold text-yellow-400">{stats.culturalScore}</div>
          <div className="text-xs text-gray-400">Cultural Score</div>
        </ThemeAwareCard>
      </div>
    </div>
  );
}

export function UserProfile({
  profile = mockUserProfile,
  isOwnProfile = true,
  onEditProfile,
  onShareAchievement,
  onAddFriend,
  className = "",
}: UserProfileProps) {
  const { language: _language } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<'achievements' | 'stats' | 'activity'>('achievements');
  const [selectedAchievement, _setSelectedAchievement] = useState<string | null>(null);

  // Filter achievements by category
  const achievementsByCategory = useMemo(() => {
    return profile.achievements.filter(a => a.isUnlocked).reduce((acc, achievement) => {
      if (!acc[achievement.category]) {
        acc[achievement.category] = [];
      }
      acc[achievement.category].push(achievement);
      return acc;
    }, {} as Record<string, UserAchievement[]>);
  }, [profile.achievements]);

  // Get recent achievements (last 30 days)
  const recentAchievements = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return profile.achievements
      .filter(a => a.isUnlocked && new Date(a.earnedAt) > thirtyDaysAgo)
      .sort((a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime());
  }, [profile.achievements]);

  const handleAchievementShare = (achievement: UserAchievement) => {
    onShareAchievement?.(achievement);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Profile Header */}
      <ThemeAwareCard className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="text-6xl">{profile.avatar}</div>
            <div>
              <h1 className="text-2xl font-bold">{profile.displayName}</h1>
              <p className="text-gray-400">@{profile.username}</p>
              <p className="text-sm text-gray-500 mt-1">{profile.location}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isOwnProfile ? (
              <ThemeAwareButton variant="primary" onClick={onEditProfile}>
                ✏️ Edit Profile
              </ThemeAwareButton>
            ) : (
              <>
                <ThemeAwareButton variant="primary" onClick={onAddFriend}>
                  👥 Add Friend
                </ThemeAwareButton>
                <ThemeAwareButton variant="ghost">
                  💬 Message
                </ThemeAwareButton>
              </>
            )}
          </div>
        </div>

        <p className="text-gray-300 mb-4">{profile.bio}</p>

        {/* Social Stats */}
        <div className="flex items-center gap-6 text-sm">
          <div>
            <span className="font-semibold text-blue-400">{profile.friends}</span>
            <span className="text-gray-400 ml-1">Friends</span>
          </div>
          <div>
            <span className="font-semibold text-green-400">{profile.followers}</span>
            <span className="text-gray-400 ml-1">Followers</span>
          </div>
          <div>
            <span className="font-semibold text-purple-400">{profile.following}</span>
            <span className="text-gray-400 ml-1">Following</span>
          </div>
          <div>
            <span className="font-semibold text-yellow-400">#{profile.stats.socialRank}</span>
            <span className="text-gray-400 ml-1">Rank</span>
          </div>
        </div>

        {/* Badge Collection */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">Badges</h3>
          <div className="flex gap-2">
            {profile.badges.map((badge, idx) => (
              <div key={idx} className="text-2xl p-1 bg-gray-800 rounded-lg">
                {badge}
              </div>
            ))}
          </div>
        </div>
      </ThemeAwareCard>

      {/* Tab Navigation */}
      <div className="flex gap-2 justify-center">
        {(['achievements', 'stats', 'activity'] as const).map((tab) => (
          <ThemeAwareButton
            key={tab}
            variant={selectedTab === tab ? "primary" : "ghost"}
            onClick={() => setSelectedTab(tab)}
            className="capitalize"
          >
            {tab === 'achievements' ? '🏆 Achievements' :
             tab === 'stats' ? '📊 Stats' : '📱 Activity'}
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
          {selectedTab === 'achievements' && (
            <div className="space-y-6">
              {/* Recent Achievements */}
              {recentAchievements.length > 0 && (
                <div>
                  <ThemeAwareHeading level="h3" className="text-xl font-bold mb-4">
                    🌟 Recent Achievements
                  </ThemeAwareHeading>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recentAchievements.slice(0, 4).map((achievement) => (
                      <AchievementCard
                        key={achievement.id}
                        achievement={achievement}
                        onShare={() => handleAchievementShare(achievement)}
                        isHighlighted={selectedAchievement === achievement.id}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements by Category */}
              {Object.entries(achievementsByCategory).map(([category, achievements]) => (
                <div key={category}>
                  <ThemeAwareHeading level="h3" className="text-lg font-semibold mb-4 capitalize">
                    {category === 'goals' ? '🎯 Goals' :
                     category === 'cultural' ? '🙏 Cultural' :
                     category === 'savings' ? '💰 Savings' :
                     category === 'social' ? '👥 Social' :
                     category === 'streak' ? '🔥 Streaks' : '⭐ Special'} ({achievements.length})
                  </ThemeAwareHeading>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {achievements.map((achievement) => (
                      <AchievementCard
                        key={achievement.id}
                        achievement={achievement}
                        onShare={() => handleAchievementShare(achievement)}
                        isHighlighted={selectedAchievement === achievement.id}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'stats' && (
            <UserStatsSection stats={profile.stats} />
          )}

          {selectedTab === 'activity' && (
            <ThemeAwareCard className="p-6 text-center">
              <div className="text-4xl mb-4">📱</div>
              <ThemeAwareHeading level="h3" className="text-xl font-bold mb-2">
                Activity Feed
              </ThemeAwareHeading>
              <ThemeAwareText color="secondary">
                Coming soon! Track your friends' financial achievements and milestones.
              </ThemeAwareText>
            </ThemeAwareCard>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
