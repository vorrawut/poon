import { useState } from "react";
import { motion } from "framer-motion";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareButton,
  ThemeAwareHeading,
} from "../../../core";
import { cn } from "../../../libs/utils";
import {
  mockPersonalizedTips,
  type PersonalizedTip,
} from "../../../../mockData/features/ai-coaching";

export interface PersonalizedTipsProps {
  tips?: PersonalizedTip[];
  onTipAction?: (tipId: string, action: "dismiss" | "apply") => void;
  className?: string;
}

// Re-export the type for other components
export type { PersonalizedTip } from "../../../../mockData/features/ai-coaching";

export function PersonalizedTips({
  tips = mockPersonalizedTips,
  onTipAction: _onTipAction,
  className,
}: PersonalizedTipsProps) {
  const [selectedTip, setSelectedTip] = useState<PersonalizedTip | null>(null);

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
      case "spending":
        return "💳";
      case "saving":
        return "💰";
      case "investing":
        return "📈";
      case "budgeting":
        return "📊";
      case "cultural":
        return "🏛️";
      default:
        return "💡";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center">
        <ThemeAwareHeading level="h3" className="mb-2">
          Personalized Tips
        </ThemeAwareHeading>
        <ThemeAwareText color="secondary">
          AI-powered recommendations just for you
        </ThemeAwareText>
      </div>

      {/* Tips List */}
      <div className="space-y-4">
        {tips
          .filter((tip) => !tip.isRead)
          .map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ThemeAwareCard
                variant="elevated"
                padding="lg"
                hover
                className="cursor-pointer"
                onClick={() => setSelectedTip(tip)}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{getTypeIcon(tip.type)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <ThemeAwareHeading level="h4" className="truncate">
                        {tip.title.en}
                      </ThemeAwareHeading>
                      <div className="flex items-center space-x-2">
                        <span
                          className={cn(
                            "text-xs font-medium px-2 py-1 rounded-full",
                            getPriorityColor(tip.priority),
                          )}
                        >
                          {tip.priority}
                        </span>
                        <ThemeAwareText variant="caption" color="secondary">
                          {tip.confidence}% confident
                        </ThemeAwareText>
                      </div>
                    </div>

                    <ThemeAwareText className="mb-3">
                      {tip.content.en}
                    </ThemeAwareText>

                    <div className="flex items-center justify-between mb-3">
                      <ThemeAwareText variant="caption" color="secondary">
                        Category: {tip.category}
                      </ThemeAwareText>
                      <ThemeAwareText variant="caption" color="secondary">
                        {new Date(tip.createdAt).toLocaleDateString("th-TH")}
                      </ThemeAwareText>
                    </div>

                    {tip.estimatedImpact && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between">
                          <ThemeAwareText
                            variant="caption"
                            className="font-medium"
                          >
                            Potential Impact ({tip.estimatedImpact.timeframe})
                          </ThemeAwareText>
                          <ThemeAwareText
                            variant="caption"
                            className="font-semibold text-blue-600"
                          >
                            {formatCurrency(tip.estimatedImpact.amount)}
                          </ThemeAwareText>
                        </div>
                        <ThemeAwareText variant="caption" color="secondary">
                          {tip.estimatedImpact.description.en}
                        </ThemeAwareText>
                      </div>
                    )}

                    {tip.culturalContext && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 mb-3">
                        <ThemeAwareText variant="caption" className="italic">
                          💡 {tip.culturalContext.en}
                        </ThemeAwareText>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <ThemeAwareButton
                        variant="primary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          _onTipAction?.(tip.id, "apply");
                        }}
                      >
                        Apply Tip
                      </ThemeAwareButton>
                      <ThemeAwareButton
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          _onTipAction?.(tip.id, "dismiss");
                        }}
                      >
                        Dismiss
                      </ThemeAwareButton>
                    </div>
                  </div>
                </div>
              </ThemeAwareCard>
            </motion.div>
          ))}
      </div>

      {/* Empty State */}
      {tips.filter((tip) => !tip.isRead).length === 0 && (
        <ThemeAwareCard variant="outlined" padding="lg">
          <div className="text-center">
            <div className="text-4xl mb-2">🎯</div>
            <ThemeAwareText color="secondary">
              No new tips available. Check back later for more personalized
              recommendations!
            </ThemeAwareText>
          </div>
        </ThemeAwareCard>
      )}

      {/* Tip Detail Modal */}
      {selectedTip && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTip(null)}
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
                    {getTypeIcon(selectedTip.type)}
                  </span>
                  <div>
                    <ThemeAwareHeading level="h2">
                      {selectedTip.title.en}
                    </ThemeAwareHeading>
                    <ThemeAwareText color="secondary">
                      {selectedTip.title.th}
                    </ThemeAwareText>
                  </div>
                </div>
                <ThemeAwareButton
                  variant="ghost"
                  onClick={() => setSelectedTip(null)}
                >
                  ✕
                </ThemeAwareButton>
              </div>

              <div className="space-y-4">
                <div>
                  <ThemeAwareText className="font-medium mb-2">
                    Recommendation
                  </ThemeAwareText>
                  <ThemeAwareText>{selectedTip.content.en}</ThemeAwareText>
                  <ThemeAwareText className="mt-2 text-sm italic">
                    {selectedTip.content.th}
                  </ThemeAwareText>
                </div>

                {selectedTip.estimatedImpact && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <ThemeAwareText className="font-medium mb-2">
                      Estimated Impact
                    </ThemeAwareText>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <ThemeAwareText variant="caption" color="secondary">
                          Amount
                        </ThemeAwareText>
                        <ThemeAwareText className="font-semibold">
                          {formatCurrency(selectedTip.estimatedImpact.amount)}
                        </ThemeAwareText>
                      </div>
                      <div>
                        <ThemeAwareText variant="caption" color="secondary">
                          Timeframe
                        </ThemeAwareText>
                        <ThemeAwareText className="font-semibold">
                          {selectedTip.estimatedImpact.timeframe}
                        </ThemeAwareText>
                      </div>
                    </div>
                    <ThemeAwareText className="mt-2">
                      {selectedTip.estimatedImpact.description.en}
                    </ThemeAwareText>
                  </div>
                )}

                {selectedTip.culturalContext && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                    <ThemeAwareText className="font-medium mb-2">
                      Cultural Context
                    </ThemeAwareText>
                    <ThemeAwareText>
                      {selectedTip.culturalContext.en}
                    </ThemeAwareText>
                    <ThemeAwareText className="mt-2 text-sm italic">
                      {selectedTip.culturalContext.th}
                    </ThemeAwareText>
                  </div>
                )}

                <div className="flex justify-center space-x-4">
                  <ThemeAwareButton
                    variant="primary"
                    onClick={() => {
                      _onTipAction?.(selectedTip.id, "apply");
                      setSelectedTip(null);
                    }}
                  >
                    Apply This Tip
                  </ThemeAwareButton>
                  <ThemeAwareButton
                    variant="outline"
                    onClick={() => {
                      _onTipAction?.(selectedTip.id, "dismiss");
                      setSelectedTip(null);
                    }}
                  >
                    Not Interested
                  </ThemeAwareButton>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
