import { useState, useEffect, useCallback } from "react";
import {
  thaiCultureService,
  getCulturalSpendingInsights,
} from "../services/thaiCultureService";
import type { ThaiCulturalEvent } from "../components/ThaiCalendarIntegration";
import type { FamilyObligation } from "../components/FamilyObligationTracker";
import type { MeritMakingActivity } from "../components/MeritMakingBudget";
import type { ThaiFestival } from "../components/FestivalSpendingPlanner";

export interface ThaiCultureData {
  events: ThaiCulturalEvent[];
  obligations: FamilyObligation[];
  meritActivities: MeritMakingActivity[];
  festivals: ThaiFestival[];
  recommendations: {
    familyObligations: {
      recommended: number;
      minimum: number;
      maximum: number;
      breakdown: Record<string, number>;
    };
    meritMaking: {
      recommended: number;
      breakdown: Record<string, number>;
    };
    festivals: Record<string, number>;
    totalRecommended: number;
  } | null;
  insights: {
    insights: Array<{
      type: "positive" | "warning" | "suggestion";
      message: { en: string; th: string };
    }>;
    culturalScore: number;
  } | null;
}

export interface UseThaiCultureOptions {
  monthlyIncome?: number;
  familyProfile?: {
    size: number;
    hasElderlyParents: boolean;
    religiosity: "low" | "medium" | "high";
  };
  spendingData?: Record<string, number>;
  autoLoad?: boolean;
}

export function useThaiCulture(options: UseThaiCultureOptions = {}) {
  const {
    monthlyIncome = 50000,
    familyProfile = {
      size: 3,
      hasElderlyParents: true,
      religiosity: "medium",
    },
    spendingData = {},
    autoLoad = true,
  } = options;

  const [data, setData] = useState<ThaiCultureData>({
    events: [],
    obligations: [],
    meritActivities: [],
    festivals: [],
    recommendations: null,
    insights: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load Thai culture data
  const loadThaiCultureData = useCallback(async () => {
    if (!autoLoad) return;

    setLoading(true);
    setError(null);

    try {
      // Load all cultural data
      const [events, obligations, meritActivities, festivals] =
        await Promise.all([
          thaiCultureService.getUpcomingEvents(),
          thaiCultureService.getFamilyObligations(),
          thaiCultureService.getMeritMakingActivities(),
          thaiCultureService.getFestivals(),
        ]);

      // Get financial recommendations
      const recommendations =
        await thaiCultureService.getCulturalFinancialRecommendations(
          monthlyIncome,
          familyProfile,
        );

      // Generate cultural insights
      const insights = getCulturalSpendingInsights(spendingData, monthlyIncome);

      setData({
        events,
        obligations,
        meritActivities,
        festivals,
        recommendations,
        insights,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load Thai culture data",
      );
    } finally {
      setLoading(false);
    }
  }, [autoLoad, monthlyIncome, familyProfile, spendingData]);

  // Update recommendations when income or family profile changes
  const updateRecommendations = async (
    newIncome: number,
    newFamilyProfile: typeof familyProfile,
  ) => {
    try {
      const recommendations =
        await thaiCultureService.getCulturalFinancialRecommendations(
          newIncome,
          newFamilyProfile,
        );

      setData((prev) => ({
        ...prev,
        recommendations,
      }));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update recommendations",
      );
    }
  };

  // Update insights when spending data changes
  const updateInsights = useCallback(
    (newSpendingData: Record<string, number>) => {
      const insights = getCulturalSpendingInsights(
        newSpendingData,
        monthlyIncome,
      );
      setData((prev) => ({
        ...prev,
        insights,
      }));
    },
    [monthlyIncome],
  );

  // Get current Buddhist year
  const getCurrentBuddhistYear = () => {
    return new Date().getFullYear() + 543;
  };

  // Check if today is a significant cultural day
  const getTodaysCulturalSignificance = () => {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    return data.events.find(
      (event) => event.date === todayString && event.significance === "high",
    );
  };

  // Get upcoming events within specified days
  const getUpcomingEvents = (days: number = 30) => {
    const today = new Date();
    const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);

    return data.events
      .filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= futureDate;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  // Get overdue family obligations
  const getOverdueObligations = () => {
    const today = new Date();

    return data.obligations.filter((obligation) => {
      if (!obligation.nextDueDate || !obligation.isActive) return false;
      return new Date(obligation.nextDueDate) < today;
    });
  };

  // Calculate total cultural spending percentage
  const getCulturalSpendingPercentage = () => {
    if (!data.recommendations) return 0;

    const totalCultural =
      data.recommendations.familyObligations.recommended +
      data.recommendations.meritMaking.recommended;

    return (totalCultural / monthlyIncome) * 100;
  };

  // Get cultural score interpretation
  const getCulturalScoreInterpretation = () => {
    if (!data.insights) return null;

    const score = data.insights.culturalScore;

    if (score >= 80) {
      return {
        level: "excellent" as const,
        message: {
          en: "Excellent cultural adherence! You are following Thai values beautifully.",
          th: "การยึดมั่นในวัฒนธรรมดีเยี่ยม! คุณปฏิบัติตามค่านิยมไทยอย่างสวยงาม",
        },
      };
    } else if (score >= 60) {
      return {
        level: "good" as const,
        message: {
          en: "Good cultural balance. Consider small improvements in some areas.",
          th: "สมดุลทางวัฒนธรรมดี ควรพิจารณาปรับปรุงเล็กน้อยในบางด้าน",
        },
      };
    } else if (score >= 40) {
      return {
        level: "moderate" as const,
        message: {
          en: "Moderate cultural alignment. Room for improvement in traditional practices.",
          th: "การปฏิบัติตามวัฒนธรรมปานกลาง มีที่ปรับปรุงในการปฏิบัติตามประเพณี",
        },
      };
    } else {
      return {
        level: "low" as const,
        message: {
          en: "Consider incorporating more Thai cultural practices into your financial planning.",
          th: "ควรพิจารณานำการปฏิบัติทางวัฒนธรรมไทยเข้ามาในการวางแผนการเงิน",
        },
      };
    }
  };

  // Load data on mount or when dependencies change
  useEffect(() => {
    loadThaiCultureData();
  }, [
    loadThaiCultureData,
    monthlyIncome,
    familyProfile.size,
    familyProfile.hasElderlyParents,
    familyProfile.religiosity,
  ]);

  // Update insights when spending data changes
  useEffect(() => {
    if (Object.keys(spendingData).length > 0) {
      updateInsights(spendingData);
    }
  }, [updateInsights, spendingData, monthlyIncome]);

  return {
    // Data
    ...data,

    // Loading states
    loading,
    error,

    // Actions
    loadThaiCultureData,
    updateRecommendations,
    updateInsights,

    // Computed values
    getCurrentBuddhistYear,
    getTodaysCulturalSignificance,
    getUpcomingEvents,
    getOverdueObligations,
    getCulturalSpendingPercentage,
    getCulturalScoreInterpretation,

    // Refresh function
    refresh: loadThaiCultureData,
  };
}
