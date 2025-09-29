import { useState } from "react";
import { motion } from "framer-motion";
import {
  RocketLaunchIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  LightBulbIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareHeading,
  ThemeAwareButton,
  useTheme,
} from "../../../core";
import { cn } from "../../../libs/utils";
// import { useTranslation } from "../../../libs/i18n";

export interface GoalOptimization {
  goalId: string;
  goalName: string;
  currentTarget: number;
  currentSavings: number;
  currentMonthlyContribution: number;
  currentTimeline: number; // months
  optimizations: {
    type: "timeline" | "amount" | "strategy" | "risk";
    title: string;
    description: string;
    impact: "low" | "medium" | "high";
    confidence: number;
    recommendation: {
      newMonthlyContribution?: number;
      newTimeline?: number;
      newTarget?: number;
      strategy?: string;
      riskLevel?: "conservative" | "moderate" | "aggressive";
    };
    benefits: string[];
    tradeoffs: string[];
    implementation: string[];
  }[];
  predictedOutcomes: {
    scenario: "conservative" | "realistic" | "optimistic";
    probability: number;
    timeline: number;
    finalAmount: number;
    monthlyRequired: number;
  }[];
  riskAssessment: {
    level: "low" | "medium" | "high";
    factors: string[];
    mitigation: string[];
  };
}

interface GoalOptimizerProps {
  optimizations: GoalOptimization[];
  className?: string;
  onOptimizationApply?: (
    goalId: string,
    optimization: GoalOptimization["optimizations"][0],
  ) => void;
}

export function GoalOptimizer({
  optimizations,
  className,
  onOptimizationApply,
}: GoalOptimizerProps) {
  const { isPlayMode } = useTheme();
  const [selectedGoal, setSelectedGoal] = useState<GoalOptimization | null>(
    null,
  );
  const [selectedScenario, setSelectedScenario] = useState<
    "conservative" | "realistic" | "optimistic"
  >("realistic");

  const getOptimizationIcon = (
    type: GoalOptimization["optimizations"][0]["type"],
  ) => {
    const iconClass = "h-5 w-5";
    switch (type) {
      case "timeline":
        return <ClockIcon className={iconClass} />;
      case "amount":
        return <CurrencyDollarIcon className={iconClass} />;
      case "strategy":
        return <LightBulbIcon className={iconClass} />;
      case "risk":
        return <ExclamationTriangleIcon className={iconClass} />;
      default:
        return <ChartBarIcon className={iconClass} />;
    }
  };

  const getOptimizationColor = (
    impact: GoalOptimization["optimizations"][0]["impact"],
  ) => {
    if (isPlayMode) {
      switch (impact) {
        case "high":
          return "border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-500/10 to-transparent";
        case "medium":
          return "border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-500/10 to-transparent";
        case "low":
          return "border-l-4 border-l-green-500 bg-gradient-to-r from-green-500/10 to-transparent";
      }
    } else {
      switch (impact) {
        case "high":
          return "border-l-4 border-l-red-500 bg-red-50/50";
        case "medium":
          return "border-l-4 border-l-orange-500 bg-orange-50/50";
        case "low":
          return "border-l-4 border-l-blue-500 bg-blue-50/50";
      }
    }
  };

  // Utility function for timeline improvement calculation
  // const formatTimelineImprovement = (current: number, optimized: number) => {
  //   const improvement = current - optimized;
  //   if (improvement > 0) {
  //     return `${improvement} months faster`;
  //   } else if (improvement < 0) {
  //     return `${Math.abs(improvement)} months longer`;
  //   }
  //   return "No change";
  // };

  const calculateCompletionProbability = (goal: GoalOptimization) => {
    const currentProgress = (goal.currentSavings / goal.currentTarget) * 100;
    const monthlyRate =
      (goal.currentMonthlyContribution / goal.currentTarget) * 100;

    // Simple probability calculation based on current progress and monthly rate
    const baseProbability = Math.min(90, currentProgress + monthlyRate * 12);
    return Math.max(10, baseProbability);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <ThemeAwareHeading level="h2" className="text-xl font-bold mb-2">
            {isPlayMode
              ? "🚀 Goal Mission Optimizer"
              : "Goal Optimization Center"}
          </ThemeAwareHeading>
          <ThemeAwareText color="secondary" className="text-sm">
            AI-powered recommendations to achieve your goals faster and more
            efficiently
          </ThemeAwareText>
        </div>
      </div>

      {/* Goal Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {optimizations.map((goal) => {
          const completionProbability = calculateCompletionProbability(goal);
          const highImpactOptimizations = goal.optimizations.filter(
            (o) => o.impact === "high",
          ).length;

          return (
            <motion.div
              key={goal.goalId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <ThemeAwareCard
                className={cn(
                  "p-4 cursor-pointer transition-all duration-300",
                  selectedGoal?.goalId === goal.goalId
                    ? "ring-2 ring-primary-500 shadow-lg"
                    : "hover:shadow-md",
                )}
                onClick={() => setSelectedGoal(goal)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <RocketLaunchIcon className="h-5 w-5 text-primary-500" />
                    <h3 className="font-semibold">{goal.goalName}</h3>
                  </div>
                  {highImpactOptimizations > 0 && (
                    <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      {highImpactOptimizations} high impact
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Progress:</span>
                    <span className="font-medium">
                      ฿{goal.currentSavings.toLocaleString()} / ฿
                      {goal.currentTarget.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Timeline:</span>
                    <span className="font-medium">
                      {goal.currentTimeline} months
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Success Rate:</span>
                    <span
                      className={cn(
                        "font-medium",
                        completionProbability > 70
                          ? "text-green-600"
                          : completionProbability > 40
                            ? "text-yellow-600"
                            : "text-red-600",
                      )}
                    >
                      {completionProbability.toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200/20">
                  <div className="text-xs text-gray-600">
                    {goal.optimizations.length} optimization
                    {goal.optimizations.length !== 1 ? "s" : ""} available
                  </div>
                </div>
              </ThemeAwareCard>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Goal Details */}
      {selectedGoal && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Scenario Predictions */}
          <ThemeAwareCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <ChartBarIcon className="h-5 w-5" />
                Outcome Predictions
              </h3>
              <div className="flex gap-2">
                {(["conservative", "realistic", "optimistic"] as const).map(
                  (scenario) => (
                    <ThemeAwareButton
                      key={scenario}
                      variant={
                        selectedScenario === scenario ? "primary" : "ghost"
                      }
                      size="sm"
                      onClick={() => setSelectedScenario(scenario)}
                      className="capitalize"
                    >
                      {scenario}
                    </ThemeAwareButton>
                  ),
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedGoal.predictedOutcomes.map((outcome) => (
                <div
                  key={outcome.scenario}
                  className={cn(
                    "p-4 rounded-lg border-2 transition-all",
                    selectedScenario === outcome.scenario
                      ? "border-primary-500 bg-primary-50/50"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                >
                  <div className="text-center">
                    <div className="text-lg font-bold capitalize mb-2">
                      {outcome.scenario}
                    </div>
                    <div className="text-2xl font-bold text-primary-600 mb-1">
                      {outcome.timeline} months
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      {outcome.probability}% probability
                    </div>
                    <div className="space-y-1 text-xs">
                      <div>Final: ฿{outcome.finalAmount.toLocaleString()}</div>
                      <div>
                        Monthly: ฿{outcome.monthlyRequired.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ThemeAwareCard>

          {/* Optimizations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              AI Optimization Recommendations
            </h3>
            {selectedGoal.optimizations.map((optimization, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ThemeAwareCard
                  className={cn(
                    "p-6",
                    getOptimizationColor(optimization.impact),
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          isPlayMode
                            ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20"
                            : "bg-gray-100",
                        )}
                      >
                        {getOptimizationIcon(optimization.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">
                          {optimization.title}
                        </h4>
                        <div className="flex items-center gap-2 text-sm opacity-75">
                          <span className="capitalize">
                            {optimization.type}
                          </span>
                          <span>•</span>
                          <span>{optimization.confidence}% confidence</span>
                          <span>•</span>
                          <div
                            className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium",
                              optimization.impact === "high"
                                ? "bg-red-100 text-red-800"
                                : optimization.impact === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800",
                            )}
                          >
                            {optimization.impact.toUpperCase()} IMPACT
                          </div>
                        </div>
                      </div>
                    </div>

                    <ThemeAwareButton
                      onClick={() =>
                        onOptimizationApply?.(selectedGoal.goalId, optimization)
                      }
                      className="shrink-0"
                    >
                      Apply Changes
                    </ThemeAwareButton>
                  </div>

                  <ThemeAwareText className="mb-4">
                    {optimization.description}
                  </ThemeAwareText>

                  {/* Recommendation Details */}
                  {optimization.recommendation && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <h5 className="font-medium text-green-700">
                          Benefits:
                        </h5>
                        <ul className="space-y-1">
                          {optimization.benefits.map((benefit, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-medium text-orange-700">
                          Considerations:
                        </h5>
                        <ul className="space-y-1">
                          {optimization.tradeoffs.map((tradeoff, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm"
                            >
                              <ExclamationTriangleIcon className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                              <span>{tradeoff}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Implementation Steps */}
                  <div className="pt-4 border-t border-gray-200/20">
                    <h5 className="font-medium mb-2">Implementation Steps:</h5>
                    <ol className="space-y-1">
                      {optimization.implementation.map((step, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className="bg-primary-100 text-primary-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </ThemeAwareCard>
              </motion.div>
            ))}
          </div>

          {/* Risk Assessment */}
          <ThemeAwareCard className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ExclamationTriangleIcon className="h-5 w-5" />
              Risk Assessment
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-medium">Risk Level:</span>
                  <div
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      selectedGoal.riskAssessment.level === "high"
                        ? "bg-red-100 text-red-800"
                        : selectedGoal.riskAssessment.level === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800",
                    )}
                  >
                    {selectedGoal.riskAssessment.level.toUpperCase()}
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium">Risk Factors:</h5>
                  <ul className="space-y-1">
                    {selectedGoal.riskAssessment.factors.map((factor, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium">Mitigation Strategies:</h5>
                <ul className="space-y-1">
                  {selectedGoal.riskAssessment.mitigation.map(
                    (strategy, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{strategy}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </ThemeAwareCard>
        </motion.div>
      )}
    </div>
  );
}

// Utility functions moved to ../utils/goalOptimizerUtils.ts to fix React Fast Refresh warnings
