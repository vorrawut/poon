// Subscription Hook - Centralized subscription state management
// @TODO: See TODO.md - PREMIUM FEATURES & MONETIZATION > Subscription System for complete implementation

import { useState, useEffect, useCallback } from "react";
import type {
  SubscriptionPlan,
  UserSubscription,
  PaymentIntent,
  BillingInterval,
  PaymentMethod,
} from "../types/subscriptionTypes";
import {
  subscriptionService,
  checkPremiumFeature,
} from "../services/subscriptionService";

export interface UseSubscriptionOptions {
  userId?: string;
  autoLoad?: boolean;
}

export interface SubscriptionData {
  plans: SubscriptionPlan[];
  currentSubscription: UserSubscription | null;
  currentPlan: SubscriptionPlan | null;
  usageLimits: any;
  billingHistory: any[];
}

export function useSubscription(options: UseSubscriptionOptions = {}) {
  const { userId = "current_user", autoLoad = true } = options;

  const [data, setData] = useState<SubscriptionData>({
    plans: [],
    currentSubscription: null,
    currentPlan: null,
    usageLimits: null,
    billingHistory: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Load subscription data
  const loadSubscriptionData = useCallback(async () => {
    if (!autoLoad) return;

    setLoading(true);
    setError(null);

    try {
      // Load plans and user subscription in parallel
      const [plans, subscription] = await Promise.all([
        subscriptionService.getPlans(),
        subscriptionService.getUserSubscription(userId),
      ]);

      // Find current plan
      const currentPlan = subscription
        ? plans.find((plan) => plan.id === subscription.planId) || null
        : plans.find((plan) => plan.tier === "free") || null;

      // Calculate usage limits if subscription exists
      const usageLimits =
        subscription && currentPlan
          ? subscriptionService.checkUsageLimits(subscription, currentPlan)
          : null;

      // Load billing history
      const billingHistory =
        await subscriptionService.getBillingHistory(userId);

      setData({
        plans,
        currentSubscription: subscription,
        currentPlan,
        usageLimits,
        billingHistory,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load subscription data",
      );
    } finally {
      setLoading(false);
    }
  }, [userId, autoLoad]);

  // Subscribe to a plan
  const subscribe = useCallback(
    async (
      planId: string,
      billingInterval: BillingInterval = "monthly",
      paymentMethod: PaymentMethod = "stripe",
    ): Promise<{
      success: boolean;
      paymentIntent?: PaymentIntent;
      error?: string;
    }> => {
      setPaymentLoading(true);
      setError(null);

      try {
        // Create payment intent
        const paymentIntent = await subscriptionService.createPaymentIntent(
          planId,
          billingInterval,
          paymentMethod,
          userId,
        );

        // In a real app, this would integrate with Stripe or other payment processors
        // For now, we'll simulate successful payment
        if (process.env.NODE_ENV === "development") {
          // Simulate payment processing delay
          await new Promise((resolve) => setTimeout(resolve, 2000));

          // Confirm payment
          await subscriptionService.confirmPayment(paymentIntent.id);

          // Update local data
          await loadSubscriptionData();

          return { success: true, paymentIntent };
        }

        return { success: true, paymentIntent };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create subscription";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setPaymentLoading(false);
      }
    },
    [userId, loadSubscriptionData],
  );

  // Cancel subscription
  const cancelSubscription = useCallback(
    async (
      cancelAtPeriodEnd: boolean = true,
    ): Promise<{ success: boolean; error?: string }> => {
      if (!data.currentSubscription) {
        return { success: false, error: "No active subscription found" };
      }

      setLoading(true);
      setError(null);

      try {
        await subscriptionService.cancelSubscription(
          data.currentSubscription.id,
          cancelAtPeriodEnd,
        );

        // Reload subscription data
        await loadSubscriptionData();

        return { success: true };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to cancel subscription";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [data.currentSubscription, loadSubscriptionData],
  );

  // Reactivate subscription
  const reactivateSubscription = useCallback(async (): Promise<{
    success: boolean;
    error?: string;
  }> => {
    if (!data.currentSubscription) {
      return { success: false, error: "No subscription found" };
    }

    setLoading(true);
    setError(null);

    try {
      await subscriptionService.reactivateSubscription(
        data.currentSubscription.id,
      );

      // Reload subscription data
      await loadSubscriptionData();

      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to reactivate subscription";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [data.currentSubscription, loadSubscriptionData]);

  // Change plan
  const changePlan = useCallback(
    async (
      newPlanId: string,
      billingInterval: BillingInterval,
    ): Promise<{ success: boolean; error?: string }> => {
      if (!data.currentSubscription) {
        return { success: false, error: "No active subscription found" };
      }

      setLoading(true);
      setError(null);

      try {
        await subscriptionService.changePlan(
          data.currentSubscription.id,
          newPlanId,
          billingInterval,
        );

        // Reload subscription data
        await loadSubscriptionData();

        return { success: true };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to change plan";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [data.currentSubscription, loadSubscriptionData],
  );

  // Add family member
  const addFamilyMember = useCallback(
    async (
      email: string,
      name: string,
    ): Promise<{ success: boolean; error?: string }> => {
      if (
        !data.currentSubscription ||
        data.currentSubscription.tier !== "family"
      ) {
        return { success: false, error: "Family plan required" };
      }

      setLoading(true);
      setError(null);

      try {
        await subscriptionService.addFamilyMember(
          data.currentSubscription.id,
          email,
          name,
        );

        // Reload subscription data
        await loadSubscriptionData();

        return { success: true };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to add family member";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [data.currentSubscription, loadSubscriptionData],
  );

  // Remove family member
  const removeFamilyMember = useCallback(
    async (memberId: string): Promise<{ success: boolean; error?: string }> => {
      if (!data.currentSubscription) {
        return { success: false, error: "No active subscription found" };
      }

      setLoading(true);
      setError(null);

      try {
        await subscriptionService.removeFamilyMember(
          data.currentSubscription.id,
          memberId,
        );

        // Reload subscription data
        await loadSubscriptionData();

        return { success: true };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to remove family member";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [data.currentSubscription, loadSubscriptionData],
  );

  // Check if user has access to a premium feature
  const hasFeatureAccess = useCallback(
    (featureId: string): boolean => {
      const userTier = data.currentSubscription?.tier || "free";
      return subscriptionService.hasFeatureAccess(featureId, userTier);
    },
    [data.currentSubscription],
  );

  // Get feature gate information
  const getFeatureGate = useCallback(
    (featureId: string) => {
      const userTier = data.currentSubscription?.tier || "free";
      return checkPremiumFeature(featureId, userTier);
    },
    [data.currentSubscription],
  );

  // Check if usage limit is exceeded
  const isUsageLimitExceeded = useCallback(
    (usageType: string): boolean => {
      if (!data.usageLimits) return false;
      return data.usageLimits[usageType]?.exceeded || false;
    },
    [data.usageLimits],
  );

  // Get days remaining in current period
  const getDaysRemaining = useCallback((): number => {
    if (!data.currentSubscription) return 0;

    const endDate = new Date(data.currentSubscription.currentPeriodEnd);
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return Math.max(0, diffDays);
  }, [data.currentSubscription]);

  // Check if subscription is in trial period
  const isInTrial = useCallback((): boolean => {
    if (!data.currentSubscription || !data.currentSubscription.trialEnd)
      return false;

    const trialEnd = new Date(data.currentSubscription.trialEnd);
    const now = new Date();

    return now < trialEnd;
  }, [data.currentSubscription]);

  // Get trial days remaining
  const getTrialDaysRemaining = useCallback((): number => {
    if (!isInTrial() || !data.currentSubscription?.trialEnd) return 0;

    const trialEnd = new Date(data.currentSubscription.trialEnd);
    const now = new Date();
    const diffTime = trialEnd.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return Math.max(0, diffDays);
  }, [data.currentSubscription, isInTrial]);

  // Update usage (for tracking limits)
  const updateUsage = useCallback(
    async (
      usageType:
        | "goals"
        | "accounts"
        | "categories"
        | "aiInsights"
        | "familyMembers",
      increment: number = 1,
    ): Promise<void> => {
      if (!data.currentSubscription) return;

      try {
        await subscriptionService.updateUsage(
          data.currentSubscription.id,
          usageType,
          increment,
        );

        // Update local usage data
        if (data.usageLimits && data.usageLimits[usageType]) {
          data.usageLimits[usageType].current += increment;
          setData((prevData) => ({
            ...prevData,
            usageLimits: {
              ...prevData.usageLimits,
              [usageType]: {
                ...prevData.usageLimits[usageType],
                current: prevData.usageLimits[usageType].current + increment,
                exceeded:
                  prevData.usageLimits[usageType].limit !== "unlimited" &&
                  prevData.usageLimits[usageType].current + increment >=
                    prevData.usageLimits[usageType].limit,
              },
            },
          }));
        }
      } catch (err) {
        console.error("Failed to update usage:", err);
      }
    },
    [data.currentSubscription, data.usageLimits],
  );

  // Load data on mount
  useEffect(() => {
    loadSubscriptionData();
  }, [loadSubscriptionData]);

  return {
    // Data
    ...data,

    // State
    loading,
    error,
    paymentLoading,

    // Computed values
    isSubscribed:
      !!data.currentSubscription &&
      data.currentSubscription.status === "active",
    isPremium:
      data.currentSubscription?.tier === "premium" ||
      data.currentSubscription?.tier === "family",
    isFamily: data.currentSubscription?.tier === "family",
    daysRemaining: getDaysRemaining(),
    isInTrial: isInTrial(),
    trialDaysRemaining: getTrialDaysRemaining(),

    // Actions
    loadSubscriptionData,
    subscribe,
    cancelSubscription,
    reactivateSubscription,
    changePlan,
    addFamilyMember,
    removeFamilyMember,
    hasFeatureAccess,
    getFeatureGate,
    isUsageLimitExceeded,
    updateUsage,
  };
}
