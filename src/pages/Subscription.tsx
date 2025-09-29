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
      name: "Free",
      price: 0,
      features: [
        "Basic financial tracking",
        "3 goals",
        "Manual entry",
        "Basic insights",
      ],
      description: "Perfect for getting started with financial management",
    },
    {
      id: "premium",
      name: "Premium",
      price: selectedPlan === "monthly" ? 299 : 2990,
      features: [
        "Unlimited goals",
        "Advanced AI insights",
        "Investment tracking",
        "Priority support",
      ],
      description: "Advanced features for serious financial planning",
      popular: true,
    },
    {
      id: "family",
      name: "Family",
      price: selectedPlan === "monthly" ? 499 : 4990,
      features: [
        "All Premium features",
        "Up to 5 family members",
        "Family dashboard",
        "Shared goals",
      ],
      description: "Perfect for families managing finances together",
    },
  ];

  return (
    <div className="p-4 space-y-6 max-w-7xl mx-auto">
      <div className="text-center space-y-4">
        <AccessibleHeading level="h1" gradient={isPlayMode}>
          {t("common.navigation.subscription")}
        </AccessibleHeading>
        <AccessibleText color="secondary" className="max-w-2xl mx-auto">
          Choose the perfect plan for your financial journey. Upgrade anytime to
          unlock premium features.
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
            Monthly
          </AccessibleButton>
          <AccessibleButton
            variant={selectedPlan === "yearly" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setSelectedPlan("yearly")}
          >
            Yearly (Save 17%)
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
                  Most Popular
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
                    "Free"
                  ) : (
                    <>
                      ฿{plan.price.toLocaleString()}
                      <span className="text-lg font-normal text-gray-600">
                        /{selectedPlan === "monthly" ? "month" : "year"}
                      </span>
                    </>
                  )}
                </div>
                {selectedPlan === "yearly" && plan.id !== "free" && (
                  <AccessibleText color="secondary" variant="caption">
                    Save ฿
                    {((plan.price / 10) * 12 - plan.price).toLocaleString()} per
                    year!
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
                  {plan.id === "free" ? "Current Plan" : `Choose ${plan.name}`}
                </AccessibleButton>
              </div>
            </div>
          </AccessibleCard>
        ))}
      </div>

      {/* Features Comparison */}
      <AccessibleCard variant="elevated" padding="lg">
        <AccessibleHeading level="h2" className="text-center mb-6">
          Feature Comparison
        </AccessibleHeading>

        <div className="space-y-4">
          {[
            {
              name: "Financial Goals",
              free: "3",
              premium: "Unlimited",
              family: "Unlimited",
            },
            {
              name: "AI Insights",
              free: "Basic",
              premium: "Advanced",
              family: "Advanced",
            },
            {
              name: "Investment Tracking",
              free: "✕",
              premium: "✓",
              family: "✓",
            },
            { name: "Family Members", free: "1", premium: "1", family: "5" },
            { name: "Priority Support", free: "✕", premium: "✓", family: "✓" },
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
