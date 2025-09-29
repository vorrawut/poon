// Subscription Page - Premium features and billing management
// @TODO: See TODO.md - PREMIUM FEATURES & MONETIZATION section for complete implementation

import { useState } from "react";
import { useTranslation } from "../libs/i18n";
import { useUIStore } from "../store/useUIStore";
import {
  AccessibleHeading,
  AccessibleCard,
  AccessibleButton,
  AccessibleText,
} from "../core";

export function Subscription() {
  const { t } = useTranslation();
  const { viewMode } = useUIStore();
  const isPlayMode = viewMode === "play";
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const plans = [
    {
      id: "free",
      name: t("features.subscription.plans.free.name"),
      price: 0,
      features: [
        t("features.subscription.plans.free.features.basicTracking"),
        t("features.subscription.plans.free.features.threeGoals"),
        t("features.subscription.plans.free.features.manualEntry"),
        t("features.subscription.plans.free.features.basicInsights"),
      ],
      description: t("features.subscription.plans.free.description"),
    },
    {
      id: "premium",
      name: t("features.subscription.plans.premium.name"),
      price: selectedPlan === "monthly" ? 299 : 2990,
      features: [
        t("features.subscription.plans.premium.features.unlimitedGoals"),
        t("features.subscription.plans.premium.features.advancedAI"),
        t("features.subscription.plans.premium.features.investmentTracking"),
        t("features.subscription.plans.premium.features.prioritySupport"),
      ],
      description: t("features.subscription.plans.premium.description"),
      popular: true,
    },
    {
      id: "family",
      name: t("features.subscription.plans.family.name"),
      price: selectedPlan === "monthly" ? 499 : 4990,
      features: [
        t("features.subscription.plans.family.features.allPremium"),
        t("features.subscription.plans.family.features.fiveMembers"),
        t("features.subscription.plans.family.features.familyDashboard"),
        t("features.subscription.plans.family.features.sharedGoals"),
      ],
      description: t("features.subscription.plans.family.description"),
    },
  ];

  return (
    <div className="p-4 space-y-6 max-w-7xl mx-auto">
      <div className="text-center space-y-4">
        <AccessibleHeading level="h1" gradient={isPlayMode}>
          {t("features.subscription.title")}
        </AccessibleHeading>
        <AccessibleText color="secondary" className="max-w-2xl mx-auto">
          {t("features.subscription.subtitle")}
        </AccessibleText>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="flex items-center gap-4 p-1 bg-gray-100 rounded-lg">
          <AccessibleButton
            variant={selectedPlan === "monthly" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setSelectedPlan("monthly")}
          >
            {t("features.subscription.monthly")}
          </AccessibleButton>
          <AccessibleButton
            variant={selectedPlan === "yearly" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setSelectedPlan("yearly")}
          >
            {t("features.subscription.yearly")}
          </AccessibleButton>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <AccessibleCard
            key={plan.id}
            variant="elevated"
            padding="lg"
            className={`relative ${
              plan.popular ? "border-blue-500 ring-2 ring-blue-200" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {t("features.subscription.plans.premium.popular")}
                </span>
              </div>
            )}

            <div className="text-center space-y-4">
              <div>
                <AccessibleHeading level="h3">{plan.name}</AccessibleHeading>
                <AccessibleText color="secondary" variant="caption">
                  {plan.description}
                </AccessibleText>
              </div>

              <div className="space-y-2">
                <div className="text-3xl font-bold">
                  {plan.id === "free" ? (
                    t("features.subscription.pricing.free")
                  ) : (
                    <>
                      ฿{plan.price.toLocaleString()}
                      <span className="text-lg font-normal text-gray-600">
                        /
                        {selectedPlan === "monthly"
                          ? t("features.subscription.pricing.month")
                          : t("features.subscription.pricing.year")}
                      </span>
                    </>
                  )}
                </div>
                {selectedPlan === "yearly" && plan.id !== "free" && (
                  <AccessibleText color="secondary" variant="caption">
                    {t("features.subscription.pricing.save")} ฿
                    {((plan.price / 10) * 12 - plan.price).toLocaleString()}{" "}
                    {t("features.subscription.pricing.perYear")}
                  </AccessibleText>
                )}
              </div>

              <div className="space-y-2 text-left">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <AccessibleText variant="caption">{feature}</AccessibleText>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <AccessibleButton
                  variant={plan.popular ? "primary" : "outline"}
                  fullWidth
                  onClick={() => console.log(`Subscribe to ${plan.name}`)}
                >
                  {plan.id === "free"
                    ? t("features.subscription.actions.currentPlan")
                    : `${t("features.subscription.actions.choose")} ${plan.name}`}
                </AccessibleButton>
              </div>
            </div>
          </AccessibleCard>
        ))}
      </div>

      {/* Features Comparison */}
      <AccessibleCard variant="elevated" padding="lg">
        <AccessibleHeading level="h2" className="text-center mb-6">
          {t("features.subscription.comparison.title")}
        </AccessibleHeading>

        <div className="space-y-4">
          {[
            {
              name: t("features.subscription.comparison.features.goals"),
              free: "3",
              premium: t("features.subscription.comparison.values.unlimited"),
              family: t("features.subscription.comparison.values.unlimited"),
            },
            {
              name: t("features.subscription.comparison.features.insights"),
              free: t("features.subscription.comparison.values.basic"),
              premium: t("features.subscription.comparison.values.advanced"),
              family: t("features.subscription.comparison.values.advanced"),
            },
            {
              name: t("features.subscription.comparison.features.investment"),
              free: t("features.subscription.comparison.values.notIncluded"),
              premium: t("features.subscription.comparison.values.included"),
              family: t("features.subscription.comparison.values.included"),
            },
            {
              name: t("features.subscription.comparison.features.members"),
              free: "1",
              premium: "1",
              family: "5",
            },
            {
              name: t("features.subscription.comparison.features.support"),
              free: t("features.subscription.comparison.values.notIncluded"),
              premium: t("features.subscription.comparison.values.included"),
              family: t("features.subscription.comparison.values.included"),
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <AccessibleText className="font-medium">
                {feature.name}
              </AccessibleText>
              <div className="flex items-center gap-8">
                <div className="text-center min-w-[60px]">
                  <AccessibleText variant="caption">
                    {feature.free}
                  </AccessibleText>
                </div>
                <div className="text-center min-w-[60px]">
                  <AccessibleText variant="caption">
                    {feature.premium}
                  </AccessibleText>
                </div>
                <div className="text-center min-w-[60px]">
                  <AccessibleText variant="caption">
                    {feature.family}
                  </AccessibleText>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AccessibleCard>
    </div>
  );
}
