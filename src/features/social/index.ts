// Social Features - User profiles, achievement sharing, community challenges
export { UserProfile } from "./components/UserProfile";
export { AchievementShare } from "./components/AchievementShare";
export { CommunityChallenge } from "./components/CommunityChallenge";
export { FriendConnection } from "./components/FriendConnection";
export { LeaderboardWidget } from "./components/LeaderboardWidget";

// Types
export type {
  UserSocialProfile,
  UserAchievement,
  UserStats,
  UserProfileProps,
} from "./components/UserProfile";

export type {
  SocialPlatform,
  ShareTemplate,
  AchievementShareProps,
} from "./components/AchievementShare";

export type {
  CommunityChallenge as ChallengeType,
  ChallengeParticipant,
  ChallengeReward,
  CommunityChallengeProps,
} from "./components/CommunityChallenge";

// Hooks and Services
export { useSocial } from "./hooks/useSocial";
export { socialService } from "./services/socialService";
