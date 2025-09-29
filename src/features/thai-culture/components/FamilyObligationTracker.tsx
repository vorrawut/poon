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
  mockObligations,
  type FamilyObligation,
} from "../../../../mockData/features/thai-culture";

export interface FamilyObligationTrackerProps {
  obligations?: FamilyObligation[];
  onObligationUpdate?: (obligation: FamilyObligation) => void;
  className?: string;
}

// Re-export the type for other components
export type { FamilyObligation } from "../../../../mockData/features/thai-culture";

export function FamilyObligationTracker({
  obligations = mockObligations,
  onObligationUpdate: _onObligationUpdate,
  className,
}: FamilyObligationTrackerProps) {
  const { t } = useTranslation();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20";
      case "low":
        return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
      default:
        return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "monthly_support":
        return "💰";
      case "medical":
        return "🏥";
      case "education":
        return "📚";
      case "ceremony":
        return "🎭";
      case "special_occasion":
        return "🎉";
      default:
        return "👨‍👩‍👧‍👦";
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center">
        <ThemeAwareHeading level="h2" className="mb-2">
          {t("features.thaiCulture.familyObligations")}
        </ThemeAwareHeading>
        <ThemeAwareText color="secondary">
          กตัญญูกตเวทิตา - Gratitude and Responsibility
        </ThemeAwareText>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ThemeAwareCard variant="elevated" padding="md">
          <div className="text-center">
            <ThemeAwareText
              variant="caption"
              color="secondary"
              className="mb-1"
            >
              Total Monthly
            </ThemeAwareText>
            <ThemeAwareText className="text-2xl font-bold">
              {formatCurrency(
                obligations.reduce(
                  (sum, ob) =>
                    ob.frequency === "monthly" ? sum + ob.amount : sum,
                  0,
                ),
              )}
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
              Active Obligations
            </ThemeAwareText>
            <ThemeAwareText className="text-2xl font-bold">
              {obligations.filter((ob) => ob.isActive).length}
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
              High Priority
            </ThemeAwareText>
            <ThemeAwareText className="text-2xl font-bold">
              {obligations.filter((ob) => ob.priority === "high").length}
            </ThemeAwareText>
          </div>
        </ThemeAwareCard>
      </div>

      {/* Obligations List */}
      <div className="space-y-4">
        {obligations.map((obligation, index) => (
          <motion.div
            key={obligation.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ThemeAwareCard
              variant="elevated"
              padding="lg"
              hover
              className="cursor-pointer"
              onClick={() => console.log("View obligation:", obligation.id)}
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{getTypeIcon(obligation.type)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <ThemeAwareHeading level="h3" className="truncate">
                      {obligation.title.en}
                    </ThemeAwareHeading>
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full",
                        getPriorityColor(obligation.priority),
                      )}
                    >
                      {obligation.priority}
                    </span>
                  </div>

                  <ThemeAwareText color="secondary" className="mb-2">
                    {obligation.recipient} • {obligation.frequency}
                  </ThemeAwareText>

                  <div className="flex items-center justify-between">
                    <ThemeAwareText className="font-semibold">
                      {formatCurrency(obligation.amount)}
                    </ThemeAwareText>

                    <div className="flex items-center space-x-2">
                      {obligation.nextDue && (
                        <ThemeAwareText variant="caption" color="secondary">
                          Due:{" "}
                          {new Date(obligation.nextDue).toLocaleDateString(
                            "th-TH",
                          )}
                        </ThemeAwareText>
                      )}
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full",
                          obligation.isActive ? "bg-green-500" : "bg-gray-300",
                        )}
                      />
                    </div>
                  </div>

                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <ThemeAwareText variant="caption" className="italic">
                      {obligation.culturalSignificance.en}
                    </ThemeAwareText>
                  </div>
                </div>
              </div>
            </ThemeAwareCard>
          </motion.div>
        ))}
      </div>

      {/* Add New Obligation Button */}
      <div className="text-center">
        <ThemeAwareButton variant="outline" className="w-full md:w-auto">
          + Add New Obligation
        </ThemeAwareButton>
      </div>

      {/* Cultural Context */}
      <ThemeAwareCard
        variant="outlined"
        padding="lg"
        className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
      >
        <ThemeAwareHeading level="h4" className="mb-3">
          💡 Cultural Wisdom
        </ThemeAwareHeading>
        <ThemeAwareText className="mb-2">
          <strong>กตัญญูกตเวทิตา (Katanyu Katavedita)</strong> - The virtue of
          gratitude and reciprocal kindness
        </ThemeAwareText>
        <ThemeAwareText color="secondary">
          In Thai culture, supporting family members financially is not just an
          obligation but a way to show gratitude for their care and sacrifices.
          This practice strengthens family bonds and creates a support network
          that benefits everyone.
        </ThemeAwareText>
      </ThemeAwareCard>
    </div>
  );
}
