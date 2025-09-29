import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CreditCardIcon,
  BanknotesIcon,
  HomeIcon,
  HeartIcon,
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

export interface FinancialRisk {
  id: string;
  category:
    | "debt"
    | "emergency"
    | "investment"
    | "insurance"
    | "income"
    | "spending";
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  probability: number; // 0-100
  impact: number; // 0-100 (financial impact if risk materializes)
  currentStatus: "protected" | "at-risk" | "vulnerable" | "critical";
  recommendations: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  metrics: {
    currentValue?: number;
    recommendedValue?: number;
    unit?: string;
    benchmark?: number;
  };
}

export interface FinancialHealthScore {
  overall: number; // 0-100
  categories: {
    emergency: number;
    debt: number;
    savings: number;
    investment: number;
    insurance: number;
    income: number;
  };
  trend: "improving" | "stable" | "declining";
  monthlyChange: number;
}

interface RiskAssessmentProps {
  risks: FinancialRisk[];
  healthScore: FinancialHealthScore;
  className?: string;
  onRiskAction?: (riskId: string, action: string) => void;
}

export function RiskAssessment({
  risks,
  healthScore,
  className,
  onRiskAction,
}: RiskAssessmentProps) {
  const { isPlayMode, themeMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedRisk, setSelectedRisk] = useState<FinancialRisk | null>(null);

  const getRiskIcon = (category: FinancialRisk["category"]) => {
    const iconClass = "h-5 w-5";
    switch (category) {
      case "debt":
        return <CreditCardIcon className={iconClass} />;
      case "emergency":
        return <ShieldCheckIcon className={iconClass} />;
      case "investment":
        return <ChartBarIcon className={iconClass} />;
      case "insurance":
        return <HeartIcon className={iconClass} />;
      case "income":
        return <BanknotesIcon className={iconClass} />;
      case "spending":
        return <HomeIcon className={iconClass} />;
      default:
        return <ExclamationTriangleIcon className={iconClass} />;
    }
  };

  const getSeverityColor = (severity: FinancialRisk["severity"]) => {
    if (isPlayMode) {
      switch (severity) {
        case "critical":
          return "text-red-400 border-red-500/50 bg-gradient-to-r from-red-500/20 to-transparent";
        case "high":
          return "text-orange-400 border-orange-500/50 bg-gradient-to-r from-orange-500/20 to-transparent";
        case "medium":
          return "text-yellow-400 border-yellow-500/50 bg-gradient-to-r from-yellow-500/20 to-transparent";
        case "low":
          return "text-green-400 border-green-500/50 bg-gradient-to-r from-green-500/20 to-transparent";
      }
    } else {
      switch (severity) {
        case "critical":
          return "text-red-700 border-red-200 bg-red-50";
        case "high":
          return "text-orange-700 border-orange-200 bg-orange-50";
        case "medium":
          return "text-yellow-700 border-yellow-200 bg-yellow-50";
        case "low":
          return "text-green-700 border-green-200 bg-green-50";
      }
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    if (score >= 40) return "text-orange-600";
    return "text-red-600";
  };

  const getHealthScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Attention";
  };

  const filteredRisks = useMemo(() => {
    if (selectedCategory === "all") return risks;
    return risks.filter((risk) => risk.category === selectedCategory);
  }, [risks, selectedCategory]);

  const criticalRisks = risks.filter(
    (risk) => risk.severity === "critical",
  ).length;
  const highRisks = risks.filter((risk) => risk.severity === "high").length;
  const averageRiskScore =
    risks.reduce(
      (sum, risk) => sum + (risk.probability * risk.impact) / 100,
      0,
    ) / risks.length;

  const categories = [
    "all",
    "debt",
    "emergency",
    "investment",
    "insurance",
    "income",
    "spending",
  ];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <ThemeAwareHeading level="h2" className="text-xl font-bold mb-2">
            {isPlayMode
              ? "🛡️ Financial Shield Analysis"
              : "Financial Risk Assessment"}
          </ThemeAwareHeading>
          <ThemeAwareText color="secondary" className="text-sm">
            AI-powered analysis of your financial vulnerabilities and protection
            strategies
          </ThemeAwareText>
        </div>
      </div>

      {/* Health Score Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-1"
        >
          <ThemeAwareCard className="p-6 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              {/* Circular Progress */}
              <svg
                className="w-32 h-32 transform -rotate-90"
                viewBox="0 0 120 120"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke={themeMode === "dark" ? "#374151" : "#E5E7EB"}
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="url(#healthGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(healthScore.overall / 100) * 314} 314`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient
                    id="healthGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="50%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className={cn(
                      "text-3xl font-bold",
                      getHealthScoreColor(healthScore.overall),
                    )}
                  >
                    {healthScore.overall}
                  </div>
                  <div className="text-xs opacity-75">Health Score</div>
                </div>
              </div>
            </div>

            <div
              className={cn(
                "text-lg font-semibold mb-2",
                getHealthScoreColor(healthScore.overall),
              )}
            >
              {getHealthScoreLabel(healthScore.overall)}
            </div>

            <div className="flex items-center justify-center gap-2 text-sm">
              <span
                className={cn(
                  healthScore.trend === "improving"
                    ? "text-green-600"
                    : healthScore.trend === "declining"
                      ? "text-red-600"
                      : "text-gray-600",
                )}
              >
                {healthScore.trend === "improving"
                  ? "↗️"
                  : healthScore.trend === "declining"
                    ? "↘️"
                    : "➡️"}
              </span>
              <span className="capitalize">{healthScore.trend}</span>
              <span className="opacity-75">
                ({healthScore.monthlyChange > 0 ? "+" : ""}
                {healthScore.monthlyChange})
              </span>
            </div>
          </ThemeAwareCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <ThemeAwareCard className="p-6">
            <h3 className="font-semibold mb-4">Category Breakdown</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(healthScore.categories).map(
                ([category, score]) => (
                  <div key={category} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      {getRiskIcon(category as FinancialRisk["category"])}
                    </div>
                    <div
                      className={cn(
                        "text-lg font-bold",
                        getHealthScoreColor(score),
                      )}
                    >
                      {score}
                    </div>
                    <div className="text-xs opacity-75 capitalize">
                      {category}
                    </div>
                  </div>
                ),
              )}
            </div>
          </ThemeAwareCard>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Critical Risks",
            value: criticalRisks,
            color: "text-red-600",
          },
          { label: "High Risks", value: highRisks, color: "text-orange-600" },
          { label: "Total Risks", value: risks.length, color: "text-blue-600" },
          {
            label: "Risk Score",
            value: Math.round(averageRiskScore),
            color: "text-purple-600",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ThemeAwareCard className="p-4 text-center">
              <div className={cn("text-2xl font-bold", stat.color)}>
                {stat.value}
              </div>
              <ThemeAwareText color="secondary" className="text-xs">
                {stat.label}
              </ThemeAwareText>
            </ThemeAwareCard>
          </motion.div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <ThemeAwareButton
            key={category}
            variant={selectedCategory === category ? "primary" : "ghost"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category === "all" ? "All Risks" : category}
          </ThemeAwareButton>
        ))}
      </div>

      {/* Risk Cards */}
      <div className="space-y-4">
        {filteredRisks.map((risk, index) => (
          <motion.div
            key={risk.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ThemeAwareCard
              className={cn(
                "p-6 cursor-pointer transition-all duration-300 hover:shadow-lg border-l-4",
                getSeverityColor(risk.severity),
                selectedRisk?.id === risk.id && "ring-2 ring-primary-500",
              )}
              onClick={() =>
                setSelectedRisk(selectedRisk?.id === risk.id ? null : risk)
              }
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
                    {getRiskIcon(risk.category)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{risk.title}</h3>
                    <div className="flex items-center gap-2 text-sm opacity-75">
                      <span className="capitalize">{risk.category}</span>
                      <span>•</span>
                      <span className="capitalize">{risk.currentStatus}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium mb-2",
                      risk.severity === "critical"
                        ? "bg-red-100 text-red-800"
                        : risk.severity === "high"
                          ? "bg-orange-100 text-orange-800"
                          : risk.severity === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800",
                    )}
                  >
                    {risk.severity.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {risk.probability}% probability
                  </div>
                </div>
              </div>

              <ThemeAwareText className="mb-4">
                {risk.description}
              </ThemeAwareText>

              {/* Risk Metrics */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-sm font-medium">Impact</div>
                    <div
                      className={cn(
                        "text-lg font-bold",
                        risk.impact > 70
                          ? "text-red-600"
                          : risk.impact > 40
                            ? "text-orange-600"
                            : "text-green-600",
                      )}
                    >
                      {risk.impact}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">Risk Score</div>
                    <div className="text-lg font-bold text-purple-600">
                      {Math.round((risk.probability * risk.impact) / 100)}
                    </div>
                  </div>
                </div>

                {risk.metrics.currentValue !== undefined && (
                  <div className="text-right">
                    <div className="text-sm font-medium">Current</div>
                    <div className="text-lg font-bold">
                      {risk.metrics.currentValue.toLocaleString()}
                      {risk.metrics.unit}
                    </div>
                    {risk.metrics.recommendedValue && (
                      <div className="text-xs text-gray-600">
                        Target: {risk.metrics.recommendedValue.toLocaleString()}
                        {risk.metrics.unit}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Expanded Details */}
              {selectedRisk?.id === risk.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-200/20 pt-4 mt-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h5 className="font-medium text-red-700 mb-2">
                        Immediate Actions:
                      </h5>
                      <ul className="space-y-1">
                        {risk.recommendations.immediate.map((action, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span className="text-red-500 mt-1">•</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-medium text-orange-700 mb-2">
                        Short-term (1-3 months):
                      </h5>
                      <ul className="space-y-1">
                        {risk.recommendations.shortTerm.map((action, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span className="text-orange-500 mt-1">•</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-medium text-green-700 mb-2">
                        Long-term (3+ months):
                      </h5>
                      <ul className="space-y-1">
                        {risk.recommendations.longTerm.map((action, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span className="text-green-500 mt-1">•</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200/20">
                    <ThemeAwareButton
                      size="sm"
                      onClick={() => onRiskAction?.(risk.id, "create-plan")}
                    >
                      Create Action Plan
                    </ThemeAwareButton>
                    <ThemeAwareButton
                      variant="ghost"
                      size="sm"
                      onClick={() => onRiskAction?.(risk.id, "dismiss")}
                    >
                      Dismiss Risk
                    </ThemeAwareButton>
                    <ThemeAwareButton
                      variant="ghost"
                      size="sm"
                      onClick={() => onRiskAction?.(risk.id, "learn-more")}
                    >
                      Learn More
                    </ThemeAwareButton>
                  </div>
                </motion.div>
              )}
            </ThemeAwareCard>
          </motion.div>
        ))}
      </div>

      {filteredRisks.length === 0 && (
        <ThemeAwareCard className="p-8 text-center">
          <ShieldCheckIcon className="h-12 w-12 mx-auto mb-4 text-green-500" />
          <ThemeAwareText className="text-lg mb-2">
            No {selectedCategory !== "all" ? selectedCategory : ""} risks
            detected
          </ThemeAwareText>
          <ThemeAwareText color="secondary">
            Your financial position looks strong in this area. Keep up the good
            work!
          </ThemeAwareText>
        </ThemeAwareCard>
      )}
    </div>
  );
}

// Utility functions moved to ../utils/riskAssessmentUtils.ts to fix React Fast Refresh warnings
