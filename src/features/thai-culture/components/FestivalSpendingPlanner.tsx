import { useState } from "react";
import { motion } from "framer-motion";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareButton,
  ThemeAwareHeading,
} from "../../../core";
import { useTranslation } from "../../../libs/i18n";
import { cn } from "../../../libs/utils";
import {
  mockFestivals,
  type ThaiFestival,
} from "../../../../mockData/features/thai-culture";

export interface FestivalSpendingPlannerProps {
  festivals?: ThaiFestival[];
  onPlanUpdate?: (festivalId: string, plan: Record<string, number>) => void;
  className?: string;
}

// Re-export the type for other components
export type { ThaiFestival } from "../../../../mockData/features/thai-culture";

export function FestivalSpendingPlanner({
  festivals = mockFestivals,
  onPlanUpdate: _onPlanUpdate,
  className,
}: FestivalSpendingPlannerProps) {
  const { t } = useTranslation();
  const [selectedFestival, setSelectedFestival] = useState<ThaiFestival | null>(
    null,
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case "national":
        return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20";
      case "high":
        return "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20";
      case "low":
        return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
      default:
        return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  const getDaysUntilFestival = (dateString: string) => {
    const festivalDate = new Date(dateString);
    const today = new Date();
    const diffTime = festivalDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center">
        <ThemeAwareHeading level="h2" className="mb-2">
          {t("features.thaiCulture.festivals")}
        </ThemeAwareHeading>
        <ThemeAwareText color="secondary">
          Plan and budget for Thai cultural festivals
        </ThemeAwareText>
      </div>

      {/* Festivals List */}
      <div className="space-y-4">
        {festivals.map((festival, index) => {
          const daysUntil = getDaysUntilFestival(festival.date);
          const isUpcoming = daysUntil > 0;

          return (
            <motion.div
              key={festival.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ThemeAwareCard
                variant="elevated"
                padding="lg"
                hover
                className="cursor-pointer"
                onClick={() => setSelectedFestival(festival)}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">🎊</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <ThemeAwareHeading level="h3" className="truncate">
                        {festival.name.en}
                      </ThemeAwareHeading>
                      <span
                        className={cn(
                          "text-xs font-medium px-2 py-1 rounded-full",
                          getSignificanceColor(festival.significance),
                        )}
                      >
                        {festival.significance}
                      </span>
                    </div>

                    <ThemeAwareText color="secondary" className="mb-2">
                      {festival.name.th} • {festival.duration} days
                    </ThemeAwareText>

                    <div className="flex items-center justify-between mb-3">
                      <ThemeAwareText>
                        {new Date(festival.date).toLocaleDateString("th-TH")}
                      </ThemeAwareText>

                      {isUpcoming && (
                        <ThemeAwareText
                          variant="caption"
                          className={cn(
                            "px-2 py-1 rounded-full",
                            daysUntil <= 30
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800",
                          )}
                        >
                          {daysUntil} days to go
                        </ThemeAwareText>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <ThemeAwareText variant="caption" color="secondary">
                          Estimated Cost
                        </ThemeAwareText>
                        <ThemeAwareText className="font-semibold">
                          {formatCurrency(festival.totalEstimatedCost)}
                        </ThemeAwareText>
                      </div>
                      <div>
                        <ThemeAwareText variant="caption" color="secondary">
                          Categories
                        </ThemeAwareText>
                        <ThemeAwareText className="font-semibold">
                          {festival.categories.length} categories
                        </ThemeAwareText>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <ThemeAwareText variant="caption" className="italic">
                        {festival.culturalImportance.en}
                      </ThemeAwareText>
                    </div>
                  </div>
                </div>
              </ThemeAwareCard>
            </motion.div>
          );
        })}
      </div>

      {/* Festival Detail Modal */}
      {selectedFestival && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedFestival(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <ThemeAwareHeading level="h2">
                    {selectedFestival.name.en}
                  </ThemeAwareHeading>
                  <ThemeAwareText color="secondary">
                    {selectedFestival.name.th}
                  </ThemeAwareText>
                </div>
                <ThemeAwareButton
                  variant="ghost"
                  onClick={() => setSelectedFestival(null)}
                >
                  ✕
                </ThemeAwareButton>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Festival Info */}
                <div className="space-y-4">
                  <div>
                    <ThemeAwareText className="font-medium mb-2">
                      Cultural Importance
                    </ThemeAwareText>
                    <ThemeAwareText>
                      {selectedFestival.culturalImportance.en}
                    </ThemeAwareText>
                    <ThemeAwareText className="mt-2 text-sm italic">
                      {selectedFestival.culturalImportance.th}
                    </ThemeAwareText>
                  </div>

                  <div>
                    <ThemeAwareText className="font-medium mb-2">
                      Modern Adaptations
                    </ThemeAwareText>
                    <div className="flex flex-wrap gap-2">
                      {selectedFestival.modernAdaptations.map(
                        (adaptation, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm"
                          >
                            {adaptation}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <ThemeAwareText className="font-medium mb-2">
                      Budgeting Advice
                    </ThemeAwareText>
                    <ul className="space-y-1">
                      {selectedFestival.budgetingAdvice.en.map(
                        (advice, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <span className="text-blue-500">•</span>
                            <ThemeAwareText variant="caption">
                              {advice}
                            </ThemeAwareText>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>

                {/* Spending Categories */}
                <div className="space-y-4">
                  <ThemeAwareText className="font-medium">
                    Spending Breakdown
                  </ThemeAwareText>

                  {selectedFestival.categories.map((category, index) => (
                    <ThemeAwareCard key={index} variant="outlined" padding="md">
                      <div className="flex items-center justify-between mb-2">
                        <ThemeAwareText className="font-medium">
                          {category.category}
                        </ThemeAwareText>
                        <ThemeAwareText className="font-semibold">
                          {formatCurrency(category.estimatedCost)}
                        </ThemeAwareText>
                      </div>

                      <ThemeAwareText
                        variant="caption"
                        color="secondary"
                        className="mb-2"
                      >
                        {category.description.en}
                      </ThemeAwareText>

                      <div className="space-y-1">
                        <ThemeAwareText
                          variant="caption"
                          className="font-medium"
                        >
                          Tips:
                        </ThemeAwareText>
                        {category.tips.en.slice(0, 2).map((tip, tipIndex) => (
                          <ThemeAwareText
                            key={tipIndex}
                            variant="caption"
                            className="block"
                          >
                            • {tip}
                          </ThemeAwareText>
                        ))}
                      </div>
                    </ThemeAwareCard>
                  ))}

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                    <ThemeAwareText className="font-medium">
                      Total Estimated Cost:{" "}
                      {formatCurrency(selectedFestival.totalEstimatedCost)}
                    </ThemeAwareText>
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
