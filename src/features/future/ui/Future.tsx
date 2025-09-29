import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "../../../components/ui";
import {
  ThemeAwareHeading,
  ThemeAwareText,
  useTheme,
} from "../../../core";
import {
  EnhancedGoalTracker,
  MissionDetailView as Enhanced3DMissionDetailView,
  type EnhancedGoal,
} from "../../goals";
import {
  UniverseBackground,
} from "../../../components/widgets";
import {
  mockEnhancedGoals,
} from "../../../../mockData/features/goals";

import { useUIStore } from "../../../store/useUIStore";

export function Future() {
  const { viewMode, accessibilityMode } = useUIStore();
  const { isPlayMode } = useTheme();
  const [selectedGoal, setSelectedGoal] = useState<EnhancedGoal | null>(null);
  const [goals, setGoals] = useState<EnhancedGoal[]>([]);

  // Initialize goals with enhanced data
  useEffect(() => {
    setGoals(mockEnhancedGoals);
  }, []);

  const handleGoalCreate = (newGoal: Omit<EnhancedGoal, "id" | "createdAt" | "isCompleted">) => {
    const goal: EnhancedGoal = {
      ...newGoal,
      id: `goal-${Date.now()}`,
      createdAt: new Date(),
      isCompleted: false,
    };
    setGoals((prev) => [...prev, goal]);
  };

  const handleContribute = (goalId: string, amount: number) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              currentAmount: Math.min(goal.currentAmount + amount, goal.targetAmount),
              lastContribution: new Date(),
              isCompleted: goal.currentAmount + amount >= goal.targetAmount,
            }
          : goal
      )
    );
  };

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${
        viewMode === "play"
          ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
          : "bg-gradient-to-br from-indigo-50 to-purple-50"
      }`}
    >
      {viewMode === "play" && <UniverseBackground starCount={60} />}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 pb-20 sm:pb-24 pt-20 sm:pt-24 lg:pt-32 relative z-10">
        {/* Ultimate Hero Section */}
        <FadeIn direction="down" delay={0.1} className="text-center mb-12">
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-6">
              <motion.div
                className="text-5xl md:text-7xl"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🚀
              </motion.div>
              <ThemeAwareHeading level="h1" className="mb-4" gradient={isPlayMode}>
                Future Missions
              </ThemeAwareHeading>
              <motion.div
                className="text-5xl md:text-7xl"
                animate={{
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                ⭐
              </motion.div>
            </div>

            <ThemeAwareText
              color="secondary"
              className="mb-8 max-w-4xl mx-auto px-4"
            >
              {accessibilityMode === "elder"
                ? "Track your financial goals with clear, simple progress indicators and helpful guidance."
                : accessibilityMode === "youth"
                  ? "Level up your money game! 🎮 Set epic financial quests and unlock achievements as you build your future empire! 💰✨"
                  : viewMode === "play"
                    ? "Navigate your financial universe — where every goal becomes a space mission in your personal galaxy! 🌌"
                    : "Your financial goals made simple. Track progress, set targets, and achieve your dreams with clear, actionable steps."}
            </ThemeAwareText>
          </div>
        </FadeIn>

        {/* Enhanced Goal Tracker or 3D Detail View */}
        {selectedGoal ? (
          <Enhanced3DMissionDetailView
            goal={selectedGoal}
            onClose={() => setSelectedGoal(null)}
            onContribute={(amount: number) => handleContribute(selectedGoal.id, amount)}
          />
        ) : (
          <EnhancedGoalTracker
            goals={goals}
            onGoalCreate={handleGoalCreate}
            onContribute={handleContribute}
            showCreateButton={true}
          />
        )}

        {/* AI Co-Pilot - TODO: Update to work with EnhancedGoal type */}
        {/* <AICoPilot /> */}
      </div>
    </div>
  );
}
