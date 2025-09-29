// AI Coaching Page - Intelligent financial coaching dashboard
// @TODO: See TODO.md - AI INTELLIGENCE & COACHING section for complete implementation

import { useState } from "react";
import { useTranslation } from "../libs/i18n";
import { useUIStore } from "../store/useUIStore";
import {
  AccessibleHeading,
  AccessibleCard,
  AccessibleButton,
  AccessibleText,
} from "../core";

export function AICoaching() {
  const { t } = useTranslation();
  const { viewMode } = useUIStore();
  const isPlayMode = viewMode === "play";
  const [activeTab, setActiveTab] = useState<
    "coaching" | "tips" | "progress" | "motivation"
  >("coaching");

  const tabs = [
    { id: "coaching" as const, label: t("features.aiCoaching.tabs.coaching") },
    { id: "tips" as const, label: t("features.aiCoaching.tabs.tips") },
    { id: "progress" as const, label: t("features.aiCoaching.tabs.progress") },
    {
      id: "motivation" as const,
      label: t("features.aiCoaching.tabs.motivation"),
    },
  ];

  return (
    <div className="p-4 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <AccessibleHeading level="h1" gradient={isPlayMode}>
          {t("common.navigation.aiCoaching")}
        </AccessibleHeading>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <AccessibleButton
              key={tab.id}
              variant={activeTab === tab.id ? "primary" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </AccessibleButton>
          ))}
        </div>
      </div>

      {/* Content */}
      <AccessibleCard variant="elevated" padding="lg">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🤖</div>
          <AccessibleHeading level="h2">
            {t("features.aiCoaching.features.title")}
          </AccessibleHeading>
          <AccessibleText color="secondary" className="mt-2">
            {t("features.aiCoaching.features.description")}
          </AccessibleText>
          <div className="mt-6 space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <AccessibleText className="font-medium text-blue-900">
                {t("features.aiCoaching.features.personalizedTips.title")}
              </AccessibleText>
              <AccessibleText className="text-blue-700 mt-1">
                {t("features.aiCoaching.features.personalizedTips.description")}
              </AccessibleText>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <AccessibleText className="font-medium text-green-900">
                {t("features.aiCoaching.features.progressTracking.title")}
              </AccessibleText>
              <AccessibleText className="text-green-700 mt-1">
                {t("features.aiCoaching.features.progressTracking.description")}
              </AccessibleText>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <AccessibleText className="font-medium text-purple-900">
                {t("features.aiCoaching.features.culturalAwareness.title")}
              </AccessibleText>
              <AccessibleText className="text-purple-700 mt-1">
                {t(
                  "features.aiCoaching.features.culturalAwareness.description",
                )}
              </AccessibleText>
            </div>
          </div>
        </div>
      </AccessibleCard>
    </div>
  );
}
