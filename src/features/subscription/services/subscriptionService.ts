// Subscription Service - Premium features and billing management
// @TODO: See TODO.md - PREMIUM FEATURES & MONETIZATION > Subscription System for complete implementation

import type {
  SubscriptionPlan,
  UserSubscription,
  PaymentIntent,
  SubscriptionTier,
  BillingInterval,
  PaymentMethod,
} from "../types/subscriptionTypes";
import {
  SUBSCRIPTION_PLANS,
  PREMIUM_FEATURES,
} from "../types/subscriptionTypes";

export class SubscriptionService {
  private baseURL: string;
  private apiKey: string;

  constructor(baseURL: string = "/api", apiKey: string = "") {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  // Get available subscription plans
  async getPlans(): Promise<SubscriptionPlan[]> {
    try {
      // In development, return mock data
      if (process.env.NODE_ENV === "development") {
        return SUBSCRIPTION_PLANS;
      }

      const response = await fetch(`${this.baseURL}/subscription/plans`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch subscription plans");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
      // Fallback to default plans
      return SUBSCRIPTION_PLANS;
    }
  }

  // Get user's current subscription
  async getUserSubscription(userId: string): Promise<UserSubscription | null> {
    try {
      // Mock implementation for development
      if (process.env.NODE_ENV === "development") {
        return {
          id: "sub_mock_123",
          userId,
          planId: "free",
          tier: "free",
          status: "active",
          billingInterval: "monthly",
          currentPeriodStart: new Date().toISOString(),
          currentPeriodEnd: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          cancelAtPeriodEnd: false,
          paymentMethod: "stripe",
          usage: {
            currentGoals: 2,
            currentAccounts: 1,
            currentCategories: 8,
            aiInsightsUsed: 3,
            lastResetDate: new Date().toISOString(),
            familyMembersCount: 0,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }

      const response = await fetch(
        `${this.baseURL}/subscription/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 404) {
        return null; // No subscription found
      }

      if (!response.ok) {
        throw new Error("Failed to fetch user subscription");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching user subscription:", error);
      return null;
    }
  }

  // Create payment intent for subscription
  async createPaymentIntent(
    planId: string,
    billingInterval: BillingInterval,
    paymentMethod: PaymentMethod,
    userId: string,
  ): Promise<PaymentIntent> {
    try {
      const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId);
      if (!plan) {
        throw new Error("Invalid plan ID");
      }

      const amount =
        billingInterval === "monthly"
          ? plan.pricing.monthly.amount
          : plan.pricing.yearly.amount;

      // Mock implementation for development
      if (process.env.NODE_ENV === "development") {
        return {
          id: `pi_mock_${Date.now()}`,
          amount,
          currency: "THB",
          paymentMethod,
          clientSecret: `pi_mock_${Date.now()}_secret_mock`,
          status: "requires_confirmation",
          metadata: {
            planId,
            billingInterval,
            userId,
          },
        };
      }

      const response = await fetch(
        `${this.baseURL}/subscription/payment-intent`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            planId,
            billingInterval,
            paymentMethod,
            userId,
            amount,
            currency: "THB",
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw error;
    }
  }

  // Confirm payment and create subscription
  async confirmPayment(paymentIntentId: string): Promise<UserSubscription> {
    try {
      // Mock implementation for development
      if (process.env.NODE_ENV === "development") {
        return {
          id: `sub_${Date.now()}`,
          userId: "current_user",
          planId: "premium",
          tier: "premium",
          status: "active",
          billingInterval: "monthly",
          currentPeriodStart: new Date().toISOString(),
          currentPeriodEnd: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          cancelAtPeriodEnd: false,
          paymentMethod: "stripe",
          usage: {
            currentGoals: 0,
            currentAccounts: 0,
            currentCategories: 0,
            aiInsightsUsed: 0,
            lastResetDate: new Date().toISOString(),
            familyMembersCount: 0,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }

      const response = await fetch(
        `${this.baseURL}/subscription/confirm-payment`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentIntentId }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to confirm payment");
      }

      return await response.json();
    } catch (error) {
      console.error("Error confirming payment:", error);
      throw error;
    }
  }

  // Cancel subscription
  async cancelSubscription(
    subscriptionId: string,
    cancelAtPeriodEnd: boolean = true,
  ): Promise<UserSubscription> {
    try {
      const response = await fetch(
        `${this.baseURL}/subscription/${subscriptionId}/cancel`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cancelAtPeriodEnd }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to cancel subscription");
      }

      return await response.json();
    } catch (error) {
      console.error("Error canceling subscription:", error);
      throw error;
    }
  }

  // Reactivate cancelled subscription
  async reactivateSubscription(
    subscriptionId: string,
  ): Promise<UserSubscription> {
    try {
      const response = await fetch(
        `${this.baseURL}/subscription/${subscriptionId}/reactivate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to reactivate subscription");
      }

      return await response.json();
    } catch (error) {
      console.error("Error reactivating subscription:", error);
      throw error;
    }
  }

  // Change subscription plan
  async changePlan(
    subscriptionId: string,
    newPlanId: string,
    billingInterval: BillingInterval,
  ): Promise<UserSubscription> {
    try {
      const response = await fetch(
        `${this.baseURL}/subscription/${subscriptionId}/change-plan`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ planId: newPlanId, billingInterval }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to change subscription plan");
      }

      return await response.json();
    } catch (error) {
      console.error("Error changing subscription plan:", error);
      throw error;
    }
  }

  // Add family member
  async addFamilyMember(
    subscriptionId: string,
    email: string,
    name: string,
  ): Promise<UserSubscription> {
    try {
      const response = await fetch(
        `${this.baseURL}/subscription/${subscriptionId}/family/add`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, name }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to add family member");
      }

      return await response.json();
    } catch (error) {
      console.error("Error adding family member:", error);
      throw error;
    }
  }

  // Remove family member
  async removeFamilyMember(
    subscriptionId: string,
    memberId: string,
  ): Promise<UserSubscription> {
    try {
      const response = await fetch(
        `${this.baseURL}/subscription/${subscriptionId}/family/${memberId}/remove`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to remove family member");
      }

      return await response.json();
    } catch (error) {
      console.error("Error removing family member:", error);
      throw error;
    }
  }

  // Check if user has access to premium feature
  hasFeatureAccess(feature: string, userTier: SubscriptionTier): boolean {
    const featureGate = PREMIUM_FEATURES.find((f) => f.featureId === feature);
    if (!featureGate || !featureGate.isEnabled) {
      return true; // Feature not gated or disabled
    }

    const tierHierarchy: SubscriptionTier[] = ["free", "premium", "family"];
    const userTierIndex = tierHierarchy.indexOf(userTier);
    const requiredTierIndex = tierHierarchy.indexOf(featureGate.requiredTier);

    return userTierIndex >= requiredTierIndex;
  }

  // Get feature gate information
  getFeatureGate(featureId: string) {
    return PREMIUM_FEATURES.find((f) => f.featureId === featureId);
  }

  // Check usage limits
  checkUsageLimits(
    subscription: UserSubscription,
    plan: SubscriptionPlan,
  ): {
    goals: { current: number; limit: number | "unlimited"; exceeded: boolean };
    accounts: {
      current: number;
      limit: number | "unlimited";
      exceeded: boolean;
    };
    categories: {
      current: number;
      limit: number | "unlimited";
      exceeded: boolean;
    };
    aiInsights: {
      current: number;
      limit: number | "unlimited";
      exceeded: boolean;
    };
    familyMembers: { current: number; limit: number; exceeded: boolean };
  } {
    const { usage } = subscription;
    const { limits } = plan;

    return {
      goals: {
        current: usage.currentGoals,
        limit: limits.maxGoals,
        exceeded:
          limits.maxGoals !== "unlimited" &&
          usage.currentGoals >= limits.maxGoals,
      },
      accounts: {
        current: usage.currentAccounts,
        limit: limits.maxAccounts,
        exceeded:
          limits.maxAccounts !== "unlimited" &&
          usage.currentAccounts >= limits.maxAccounts,
      },
      categories: {
        current: usage.currentCategories,
        limit: limits.maxCategories,
        exceeded:
          limits.maxCategories !== "unlimited" &&
          usage.currentCategories >= limits.maxCategories,
      },
      aiInsights: {
        current: usage.aiInsightsUsed,
        limit: limits.aiInsightsPerMonth,
        exceeded:
          limits.aiInsightsPerMonth !== "unlimited" &&
          usage.aiInsightsUsed >= limits.aiInsightsPerMonth,
      },
      familyMembers: {
        current: usage.familyMembersCount,
        limit: limits.maxFamilyMembers,
        exceeded: usage.familyMembersCount >= limits.maxFamilyMembers,
      },
    };
  }

  // Update usage statistics
  async updateUsage(
    subscriptionId: string,
    usageType:
      | "goals"
      | "accounts"
      | "categories"
      | "aiInsights"
      | "familyMembers",
    increment: number = 1,
  ): Promise<void> {
    try {
      await fetch(`${this.baseURL}/subscription/${subscriptionId}/usage`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usageType, increment }),
      });
    } catch (error) {
      console.error("Error updating usage:", error);
    }
  }

  // Get billing history
  async getBillingHistory(userId: string): Promise<any[]> {
    try {
      const response = await fetch(
        `${this.baseURL}/subscription/billing-history/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch billing history");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching billing history:", error);
      return [];
    }
  }

  // Get subscription analytics (admin only)
  async getAnalytics(): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/subscription/analytics`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch subscription analytics");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching subscription analytics:", error);
      return null;
    }
  }
}

// Singleton instance
export const subscriptionService = new SubscriptionService();

// Premium feature checker utility
export function checkPremiumFeature(
  featureId: string,
  userTier: SubscriptionTier,
): {
  hasAccess: boolean;
  featureGate?: any;
  upgradeMessage?: string;
} {
  const hasAccess = subscriptionService.hasFeatureAccess(featureId, userTier);
  const featureGate = subscriptionService.getFeatureGate(featureId);

  return {
    hasAccess,
    featureGate,
    upgradeMessage:
      featureGate?.upgradeMessage.en || "Upgrade to access this feature",
  };
}
