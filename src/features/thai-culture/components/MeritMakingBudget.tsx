import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareButton,
  ThemeAwareHeading,
} from "../../../core";
import { cn } from "../../../libs/utils";
import {
  mockMeritActivities,
  type MeritMakingActivity,
} from "../../../../mockData/features/thai-culture";

export interface MeritMakingBudgetProps {
  activities?: MeritMakingActivity[];
  monthlyBudget?: number;
  onBudgetUpdate?: (budget: number) => void;
  className?: string;
}

// Re-export the type for other components
export type { MeritMakingActivity } from "../../../../mockData/features/thai-culture";

export function MeritMakingBudget({
  activities = mockMeritActivities,
  monthlyBudget = 5000,
  onBudgetUpdate: _onBudgetUpdate,
  className,
}: MeritMakingBudgetProps) {
  const [selectedActivity, setSelectedActivity] =
    useState<MeritMakingActivity | null>(null);
  const [customAmounts] = useState<Record<string, number>>({});

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalPlannedSpending = useMemo(() => {
    return activities.reduce((total, activity) => {
      const amount =
        customAmounts[activity.id] || activity.suggestedAmount.recommended;
      const multiplier =
        activity.frequency === "daily"
          ? 30
          : activity.frequency === "weekly"
            ? 4
            : activity.frequency === "monthly"
              ? 1
              : 1;
      return total + amount * multiplier;
    }, 0);
  }, [activities, customAmounts]);

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency) {
      case "daily":
        return "📅";
      case "weekly":
        return "🗓️";
      case "monthly":
        return "📆";
      case "special_occasions":
        return "🎊";
      case "annual":
        return "🗓️";
      default:
        return "⏰";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "temple_donation":
        return "🏛️";
      case "monk_offering":
        return "🧡";
      case "charity":
        return "💝";
      case "ceremony":
        return "🎭";
      case "volunteer":
        return "🤝";
      default:
        return "🙏";
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center">
        <ThemeAwareHeading level="h2" className="mb-2">
          Merit Making Budget
        </ThemeAwareHeading>
        <ThemeAwareText color="secondary">
          การทำบุญ - Merit Making for Spiritual Growth
        </ThemeAwareText>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ThemeAwareCard variant="elevated" padding="md">
          <div className="text-center">
            <ThemeAwareText
              variant="caption"
              color="secondary"
              className="mb-1"
            >
              Monthly Budget
            </ThemeAwareText>
            <ThemeAwareText className="text-2xl font-bold">
              {formatCurrency(monthlyBudget)}
            </ThemeAwareText>
          </div>
        </ThemeAwareCard>

        <ThemeAwareCard variant="elevated" padding="md">
          <div className="text-center">
            <ThemeAwareText
              variant="caption"
              color="secondary"
              className="mb-1"
            >
              Planned Spending
            </ThemeAwareText>
            <ThemeAwareText className="text-2xl font-bold">
              {formatCurrency(totalPlannedSpending)}
            </ThemeAwareText>
          </div>
        </ThemeAwareCard>

        <ThemeAwareCard variant="elevated" padding="md">
          <div className="text-center">
            <ThemeAwareText
              variant="caption"
              color="secondary"
              className="mb-1"
            >
              Remaining
            </ThemeAwareText>
            <ThemeAwareText
              className={cn(
                "text-2xl font-bold",
                monthlyBudget - totalPlannedSpending >= 0
                  ? "text-green-600"
                  : "text-red-600",
              )}
            >
              {formatCurrency(monthlyBudget - totalPlannedSpending)}
            </ThemeAwareText>
          </div>
        </ThemeAwareCard>
      </div>

      {/* Activities List */}
      <div className="space-y-4">
        <ThemeAwareHeading level="h3">
          Merit Making Activities
        </ThemeAwareHeading>

        {activities.map((activity, index) => {
          const currentAmount =
            customAmounts[activity.id] || activity.suggestedAmount.recommended;
          const multiplier =
            activity.frequency === "daily"
              ? 30
              : activity.frequency === "weekly"
                ? 4
                : activity.frequency === "monthly"
                  ? 1
                  : 1;
          const monthlyTotal = currentAmount * multiplier;

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ThemeAwareCard
                variant="elevated"
                padding="lg"
                hover
                className="cursor-pointer"
                onClick={() => setSelectedActivity(activity)}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">
                    {getTypeIcon(activity.type)}{" "}
                    {getFrequencyIcon(activity.frequency)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <ThemeAwareHeading level="h4" className="truncate">
                        {activity.name.en}
                      </ThemeAwareHeading>
                      <div className="text-right">
                        <ThemeAwareText className="font-semibold">
                          {formatCurrency(currentAmount)} × {multiplier}
                        </ThemeAwareText>
                        <ThemeAwareText variant="caption" color="secondary">
                          = {formatCurrency(monthlyTotal)}/month
                        </ThemeAwareText>
                      </div>
                    </div>

                    <ThemeAwareText color="secondary" className="mb-2">
                      {activity.name.th} • {activity.frequency}
                    </ThemeAwareText>

                    <div className="mb-3">
                      <ThemeAwareText variant="caption" className="italic">
                        {activity.spiritualBenefit.en}
                      </ThemeAwareText>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ThemeAwareText variant="caption" color="secondary">
                          Suggested:{" "}
                          {formatCurrency(activity.suggestedAmount.min)} -{" "}
                          {formatCurrency(activity.suggestedAmount.max)}
                        </ThemeAwareText>
                      </div>

                      <div
                        className={cn(
                          "w-3 h-3 rounded-full",
                          activity.isActive ? "bg-green-500" : "bg-gray-300",
                        )}
                      />
                    </div>
                  </div>
                </div>
              </ThemeAwareCard>
            </motion.div>
          );
        })}
      </div>

      {/* Budget Adjustment */}
      <ThemeAwareCard variant="outlined" padding="lg">
        <ThemeAwareHeading level="h4" className="mb-4">
          Adjust Monthly Merit Budget
        </ThemeAwareHeading>
        <div className="flex items-center space-x-4">
          <ThemeAwareText>Monthly Budget:</ThemeAwareText>
          <input
            type="range"
            min="1000"
            max="20000"
            step="500"
            value={monthlyBudget}
            onChange={(e) => _onBudgetUpdate?.(Number(e.target.value))}
            className="flex-1"
          />
          <ThemeAwareText className="font-semibold min-w-[100px]">
            {formatCurrency(monthlyBudget)}
          </ThemeAwareText>
        </div>
      </ThemeAwareCard>

      {/* Cultural Wisdom */}
      <ThemeAwareCard
        variant="outlined"
        padding="lg"
        className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20"
      >
        <ThemeAwareHeading level="h4" className="mb-3">
          🙏 Buddhist Wisdom on Merit Making
        </ThemeAwareHeading>
        <ThemeAwareText className="mb-2">
          <strong>การทำบุญ (Tham Boon)</strong> - Making merit through generous
          giving
        </ThemeAwareText>
        <ThemeAwareText color="secondary">
          In Buddhist tradition, merit making through donations and good deeds
          creates positive karma and spiritual benefits. The act of giving
          (Dana) is one of the three pillars of Buddhist practice, alongside
          morality (Sila) and mental cultivation (Bhavana).
        </ThemeAwareText>
      </ThemeAwareCard>

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedActivity(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl">
                    {getTypeIcon(selectedActivity.type)}
                  </span>
                  <div>
                    <ThemeAwareHeading level="h2">
                      {selectedActivity.name.en}
                    </ThemeAwareHeading>
                    <ThemeAwareText color="secondary">
                      {selectedActivity.name.th}
                    </ThemeAwareText>
                  </div>
                </div>
                <ThemeAwareButton
                  variant="ghost"
                  onClick={() => setSelectedActivity(null)}
                >
                  ✕
                </ThemeAwareButton>
              </div>

              <div className="space-y-4">
                <div>
                  <ThemeAwareText className="font-medium mb-2">
                    Spiritual Benefit
                  </ThemeAwareText>
                  <ThemeAwareText>
                    {selectedActivity.spiritualBenefit.en}
                  </ThemeAwareText>
                  <ThemeAwareText className="mt-2 text-sm italic">
                    {selectedActivity.spiritualBenefit.th}
                  </ThemeAwareText>
                </div>

                <div>
                  <ThemeAwareText className="font-medium mb-2">
                    Cultural Context
                  </ThemeAwareText>
                  <ThemeAwareText>
                    {selectedActivity.culturalContext.en}
                  </ThemeAwareText>
                  <ThemeAwareText className="mt-2 text-sm italic">
                    {selectedActivity.culturalContext.th}
                  </ThemeAwareText>
                </div>

                <div>
                  <ThemeAwareText className="font-medium mb-2">
                    Best Timing
                  </ThemeAwareText>
                  <div className="flex flex-wrap gap-2">
                    {selectedActivity.bestTiming.map((timing, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                      >
                        {timing}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                  <ThemeAwareText className="font-medium mb-2">
                    Suggested Amount
                  </ThemeAwareText>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <ThemeAwareText variant="caption" color="secondary">
                        Minimum
                      </ThemeAwareText>
                      <ThemeAwareText className="font-semibold">
                        {formatCurrency(selectedActivity.suggestedAmount.min)}
                      </ThemeAwareText>
                    </div>
                    <div>
                      <ThemeAwareText variant="caption" color="secondary">
                        Recommended
                      </ThemeAwareText>
                      <ThemeAwareText className="font-semibold text-blue-600">
                        {formatCurrency(
                          selectedActivity.suggestedAmount.recommended,
                        )}
                      </ThemeAwareText>
                    </div>
                    <div>
                      <ThemeAwareText variant="caption" color="secondary">
                        Maximum
                      </ThemeAwareText>
                      <ThemeAwareText className="font-semibold">
                        {formatCurrency(selectedActivity.suggestedAmount.max)}
                      </ThemeAwareText>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
