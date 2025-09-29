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
    { id: "coaching" as const, label: "AI Coaching" },
    { id: "tips" as const, label: "Personalized Tips" },
    { id: "progress" as const, label: "Progress Tracking" },
    { id: "motivation" as const, label: "Motivation" },
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
          <AccessibleHeading level="h2">AI Coaching Feature</AccessibleHeading>
          <AccessibleText color="secondary" className="mt-2">
            Intelligent financial coaching with cultural awareness and
            personalized recommendations.
          </AccessibleText>
          <div className="mt-6 space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <AccessibleText className="font-medium text-blue-900">
                🎯 Personalized Financial Tips
              </AccessibleText>
              <AccessibleText className="text-blue-700 mt-1">
                Get AI-powered recommendations tailored to your spending
                patterns and goals.
              </AccessibleText>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <AccessibleText className="font-medium text-green-900">
                📊 Progress Tracking
              </AccessibleText>
              <AccessibleText className="text-green-700 mt-1">
                Monitor your financial journey with intelligent insights and
                celebrations.
              </AccessibleText>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <AccessibleText className="font-medium text-purple-900">
                🇹🇭 Cultural Awareness
              </AccessibleText>
              <AccessibleText className="text-purple-700 mt-1">
                Coaching adapted for Thai cultural financial behaviors and
                practices.
              </AccessibleText>
            </div>
          </div>
        </div>
      </AccessibleCard>
    </div>
  );
}
