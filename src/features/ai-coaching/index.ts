// AI Coaching Features - Intelligent financial coaching with cultural awareness
// @TODO: See TODO.md - AI INTELLIGENCE & COACHING section for advanced AI implementation
export { AICoachAvatar } from "./components/AICoachAvatar";
export { PersonalizedTips } from "./components/PersonalizedTips";
export { ProgressCelebration } from "./components/ProgressCelebration";
export { MotivationalMessages } from "./components/MotivationalMessages";

// Types
export type {
  AICoachPersonality,
  AICoachMessage,
  AICoachAvatarProps,
} from "./components/AICoachAvatar";

export type {
  PersonalizedTip,
  PersonalizedTipsProps,
} from "./components/PersonalizedTips";

export type {
  Achievement,
  ProgressUpdate,
  ProgressCelebrationProps,
} from "./components/ProgressCelebration";

export type {
  UserFinancialProfile,
  CoachingAnalytics,
} from "./services/aiCoachingService";

// Hooks and Services
export { useAICoaching } from "./hooks/useAICoaching";
export {
  aiCoachingService,
  aiCoachingEngine,
  messageGenerator,
} from "./services/aiCoachingService";
