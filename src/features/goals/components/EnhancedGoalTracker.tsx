import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RocketLaunchIcon,
  FireIcon,
  ClockIcon,
  PlusIcon,
  ChartBarIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareButton,
  ThemeAwareHeading,
  useTheme,
} from "../../../core";
import { cn } from "../../../libs/utils";

export interface EnhancedGoal {
  id: string;
  name: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category:
    | "emergency"
    | "travel"
    | "house"
    | "car"
    | "investment"
    | "education"
    | "other";
  priority: "low" | "medium" | "high" | "critical";
  icon?: string;
  color?: string;
  createdAt: Date;
  lastContribution?: Date;
  monthlyTarget?: number;
  isCompleted: boolean;
  milestones: Array<{
    id: string;
    name: string;
    targetAmount: number;
    isCompleted: boolean;
    completedAt?: Date;
  }>;
  tags: string[];
}

interface EnhancedGoalTrackerProps {
  goals: EnhancedGoal[];
  onGoalCreate?: (
    goal: Omit<EnhancedGoal, "id" | "createdAt" | "isCompleted">,
  ) => void;
  onGoalUpdate?: (goalId: string, updates: Partial<EnhancedGoal>) => void;
  onGoalDelete?: (goalId: string) => void;
  onContribute?: (goalId: string, amount: number) => void;
  onGoalSelect?: (goal: EnhancedGoal) => void;
  className?: string;
  showCreateButton?: boolean;
}

const categoryConfig = {
  emergency: {
    icon: "🛡️",
    color: "#EF4444",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    name: "Emergency Fund",
  },
  travel: {
    icon: "✈️",
    color: "#3B82F6",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    name: "Travel",
  },
  house: {
    icon: "🏠",
    color: "#10B981",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    name: "House",
  },
  car: {
    icon: "🚗",
    color: "#F59E0B",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    name: "Car",
  },
  investment: {
    icon: "📈",
    color: "#8B5CF6",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    name: "Investment",
  },
  education: {
    icon: "🎓",
    color: "#EC4899",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
    name: "Education",
  },
  other: {
    icon: "🎯",
    color: "#6B7280",
    bgColor: "bg-gray-500/10",
    borderColor: "border-gray-500/20",
    name: "Other",
  },
};

const priorityConfig = {
  low: { color: "#6B7280", name: "Low" },
  medium: { color: "#F59E0B", name: "Medium" },
  high: { color: "#EF4444", name: "High" },
  critical: { color: "#DC2626", name: "Critical" },
};

export function EnhancedGoalTracker({
  goals,
  onGoalCreate,
  onGoalUpdate: _onGoalUpdate,
  onGoalDelete: _onGoalDelete,
  onContribute,
  onGoalSelect,
  className,
  showCreateButton = true,
}: EnhancedGoalTrackerProps) {
  const { isPlayMode } = useTheme();
  const [_, _setSelectedGoal] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "missions">(
    "missions",
  );
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<
    "priority" | "progress" | "deadline" | "amount"
  >("priority");

  // Calculate goal statistics
  const goalStats = {
    total: goals.length,
    completed: goals.filter((g) => g.isCompleted).length,
    inProgress: goals.filter((g) => !g.isCompleted).length,
    totalTarget: goals.reduce((sum, g) => sum + g.targetAmount, 0),
    totalSaved: goals.reduce((sum, g) => sum + g.currentAmount, 0),
    overallProgress:
      goals.length > 0
        ? (goals.reduce((sum, g) => sum + g.currentAmount, 0) /
            goals.reduce((sum, g) => sum + g.targetAmount, 0)) *
          100
        : 0,
  };

  // Filter and sort goals
  const processedGoals = goals
    .filter(
      (goal) => filterCategory === "all" || goal.category === filterCategory,
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "progress":
          const progressA = (a.currentAmount / a.targetAmount) * 100;
          const progressB = (b.currentAmount / b.targetAmount) * 100;
          return progressB - progressA;
        case "deadline":
          return (
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          );
        case "amount":
          return b.targetAmount - a.targetAmount;
        default:
          return 0;
      }
    });

  // Calculate days remaining for a goal
  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Get rocket stage based on progress
  const getRocketStage = (progress: number) => {
    if (progress >= 100) return "launched"; // 🚀 Launched!
    if (progress >= 75) return "ignition"; // 🔥 Ignition phase
    if (progress >= 50) return "fueling"; // ⛽ Fueling up
    if (progress >= 25) return "assembly"; // 🔧 Assembly
    return "planning"; // 📋 Planning
  };

  const getRocketEmoji = (stage: string) => {
    switch (stage) {
      case "launched":
        return "🚀";
      case "ignition":
        return "🔥";
      case "fueling":
        return "⛽";
      case "assembly":
        return "🔧";
      default:
        return "📋";
    }
  };

  if (goals.length === 0) {
    return (
      <ThemeAwareCard className={cn("text-center p-8", className)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="text-6xl">🚀</div>
          <ThemeAwareHeading level="h3" className="text-2xl">
            Ready for Launch?
          </ThemeAwareHeading>
          <ThemeAwareText color="secondary" className="max-w-md mx-auto">
            Your financial mission control is ready! Create your first goal and
            watch your rocket soar towards your dreams.
          </ThemeAwareText>
          {showCreateButton && onGoalCreate && (
            <ThemeAwareButton
              variant={isPlayMode ? "cosmic" : "primary"}
              size="lg"
              onClick={() => console.log("Open goal creation modal")}
              className="mt-4"
              glow={isPlayMode}
            >
              <RocketLaunchIcon className="w-5 h-5 mr-2" />
              Launch Your First Mission
            </ThemeAwareButton>
          )}
        </motion.div>
      </ThemeAwareCard>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header with Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <ThemeAwareHeading
            level="h2"
            className="text-2xl sm:text-3xl font-bold mb-2"
            gradient={isPlayMode}
          >
            <RocketLaunchIcon className="inline-block w-8 h-8 mr-2" />
            Mission Control Center
          </ThemeAwareHeading>
          <ThemeAwareText color="secondary">
            Track your financial missions and watch your rockets soar!
          </ThemeAwareText>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              {goalStats.total}
            </div>
            <div className="text-xs text-gray-500">Total Missions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">
              {goalStats.completed}
            </div>
            <div className="text-xs text-gray-500">Launched</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">
              {goalStats.inProgress}
            </div>
            <div className="text-xs text-gray-500">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500">
              {goalStats.overallProgress.toFixed(0)}%
            </div>
            <div className="text-xs text-gray-500">Overall Progress</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {/* View Mode Toggle */}
          <div className="flex rounded-lg border border-[var(--color-border-primary)] overflow-hidden">
            {["missions", "grid", "list"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors",
                  viewMode === mode
                    ? "bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
                )}
              >
                {mode === "missions" ? "🚀" : mode === "grid" ? "⊞" : "☰"}{" "}
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] text-sm"
          >
            <option value="all">All Categories</option>
            {Object.entries(categoryConfig).map(([key, config]) => (
              <option key={key} value={key}>
                {config.icon} {config.name}
              </option>
            ))}
          </select>

          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] text-sm"
          >
            <option value="priority">Sort by Priority</option>
            <option value="progress">Sort by Progress</option>
            <option value="deadline">Sort by Deadline</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>

        {/* Create Goal Button */}
        {showCreateButton && onGoalCreate && (
          <ThemeAwareButton
            variant={isPlayMode ? "cosmic" : "primary"}
            onClick={() => console.log("Open goal creation modal")}
            glow={isPlayMode}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            New Mission
          </ThemeAwareButton>
        )}
      </div>

      {/* Goals Display */}
      <div
        className={cn(
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            : viewMode === "list"
              ? "space-y-4"
              : "space-y-8", // missions view
        )}
      >
        <AnimatePresence mode="popLayout">
          {processedGoals.map((goal, index) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const daysRemaining = getDaysRemaining(goal.deadline);
            const rocketStage = getRocketStage(progress);
            const config = categoryConfig[goal.category];

            return (
              <motion.div
                key={goal.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {viewMode === "missions" ? (
                  // Mission View - Rocket Theme
                  <ThemeAwareCard
                    className={cn(
                      "relative overflow-hidden p-6",
                      config.bgColor,
                      config.borderColor,
                      "border-2",
                      isPlayMode && "shadow-lg backdrop-blur-sm",
                      goal.isCompleted && "ring-2 ring-green-500/50",
                    )}
                    animated={isPlayMode}
                  >
                    {/* Cosmic Background Effect */}
                    {isPlayMode && (
                      <div
                        className="absolute inset-0 opacity-5"
                        style={{
                          background: `radial-gradient(circle at 80% 20%, ${config.color}40 0%, transparent 50%)`,
                        }}
                      />
                    )}

                    <div className="relative z-10">
                      {/* Mission Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <motion.div
                            className="text-4xl"
                            animate={
                              rocketStage === "launched"
                                ? {
                                    y: [-5, -15, -5],
                                    rotate: [0, 5, -5, 0],
                                  }
                                : rocketStage === "ignition"
                                  ? {
                                      scale: [1, 1.1, 1],
                                    }
                                  : {}
                            }
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {getRocketEmoji(rocketStage)}
                          </motion.div>
                          <div>
                            <ThemeAwareHeading
                              level="h3"
                              className="text-xl font-bold"
                            >
                              {goal.name}
                            </ThemeAwareHeading>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm">
                                {config.icon} {config.name}
                              </span>
                              <span
                                className="px-2 py-1 text-xs font-medium rounded-full"
                                style={{
                                  backgroundColor: `${priorityConfig[goal.priority].color}20`,
                                  color: priorityConfig[goal.priority].color,
                                }}
                              >
                                {priorityConfig[goal.priority].name}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Mission Status */}
                        <div className="text-right">
                          <div
                            className="text-2xl font-bold"
                            style={{ color: config.color }}
                          >
                            {progress.toFixed(0)}%
                          </div>
                          <div className="text-xs text-gray-500">
                            {rocketStage.charAt(0).toUpperCase() +
                              rocketStage.slice(1)}
                          </div>
                        </div>
                      </div>

                      {/* Progress Visualization */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>฿{goal.currentAmount.toLocaleString()}</span>
                          <span>฿{goal.targetAmount.toLocaleString()}</span>
                        </div>

                        {/* Rocket Progress Track */}
                        <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${config.color}80, ${config.color})`,
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />

                          {/* Rocket on Track */}
                          <motion.div
                            className="absolute top-1/2 transform -translate-y-1/2 text-lg"
                            style={{ left: `${Math.min(progress, 95)}%` }}
                            animate={
                              rocketStage === "ignition"
                                ? {
                                    x: [0, 2, 0],
                                  }
                                : {}
                            }
                            transition={{ duration: 0.5, repeat: Infinity }}
                          >
                            🚀
                          </motion.div>
                        </div>
                      </div>

                      {/* Mission Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="flex items-center gap-1 text-gray-500 mb-1">
                            <ClockIcon className="w-4 h-4" />
                            Deadline
                          </div>
                          <div
                            className={cn(
                              "font-medium",
                              daysRemaining < 30
                                ? "text-red-500"
                                : daysRemaining < 90
                                  ? "text-yellow-500"
                                  : "text-green-500",
                            )}
                          >
                            {daysRemaining > 0
                              ? `${daysRemaining} days`
                              : "Overdue"}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-gray-500 mb-1">
                            <BoltIcon className="w-4 h-4" />
                            Remaining
                          </div>
                          <div className="font-medium">
                            ฿
                            {(
                              goal.targetAmount - goal.currentAmount
                            ).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Mission Actions */}
                      <div className="flex gap-2 mt-4">
                        <ThemeAwareButton
                          variant="outline"
                          size="sm"
                          onClick={() => onContribute?.(goal.id, 1000)}
                          className="flex-1"
                        >
                          <FireIcon className="w-4 h-4 mr-1" />
                          Add Fuel
                        </ThemeAwareButton>
                        <ThemeAwareButton
                          variant="ghost"
                          size="sm"
                          onClick={() => onGoalSelect?.(goal)}
                        >
                          <ChartBarIcon className="w-4 h-4" />
                        </ThemeAwareButton>
                      </div>

                      {/* Completion Celebration */}
                      {goal.isCompleted && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center bg-green-500/10 backdrop-blur-sm rounded-lg"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <div className="text-center">
                            <motion.div
                              className="text-6xl mb-2"
                              animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1],
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              🎉
                            </motion.div>
                            <ThemeAwareText
                              weight="bold"
                              className="text-green-600"
                            >
                              Mission Accomplished!
                            </ThemeAwareText>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </ThemeAwareCard>
                ) : (
                  // Grid/List View - Simplified
                  <ThemeAwareCard className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{config.icon}</div>
                        <div>
                          <ThemeAwareText weight="bold">
                            {goal.name}
                          </ThemeAwareText>
                          <ThemeAwareText color="secondary" className="text-sm">
                            {progress.toFixed(0)}% • ฿
                            {goal.currentAmount.toLocaleString()} / ฿
                            {goal.targetAmount.toLocaleString()}
                          </ThemeAwareText>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className="text-sm font-medium"
                          style={{ color: config.color }}
                        >
                          {daysRemaining > 0 ? `${daysRemaining}d` : "Overdue"}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(progress, 100)}%`,
                            backgroundColor: config.color,
                          }}
                        />
                      </div>
                    </div>
                  </ThemeAwareCard>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State for Filtered Results */}
      {processedGoals.length === 0 && goals.length > 0 && (
        <ThemeAwareCard className="text-center p-8">
          <div className="text-4xl mb-4">🔍</div>
          <ThemeAwareHeading level="h3" className="text-xl mb-2">
            No Missions Found
          </ThemeAwareHeading>
          <ThemeAwareText color="secondary">
            Try adjusting your filters to see more missions.
          </ThemeAwareText>
          <ThemeAwareButton
            variant="outline"
            onClick={() => {
              setFilterCategory("all");
              setSortBy("priority");
            }}
            className="mt-4"
          >
            Clear Filters
          </ThemeAwareButton>
        </ThemeAwareCard>
      )}
    </div>
  );
}
