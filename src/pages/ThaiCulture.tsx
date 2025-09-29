import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "../components/ui";
import { ThemeAwareHeading, ThemeAwareText, useTheme } from "../core";
import {
  ThaiCalendarIntegration,
  FamilyObligationTracker,
  MeritMakingBudget,
} from "../features/thai-culture";
import { UniverseBackground } from "../components/widgets";
import { useUIStore } from "../store/useUIStore";
import { useTranslation } from "../libs/i18n";

export function ThaiCulture() {
  const { viewMode, accessibilityMode } = useUIStore();
  const { isPlayMode } = useTheme();
  const [activeTab, setActiveTab] = useState<"calendar" | "family" | "merit">(
    "calendar",
  );
  const { t } = useTranslation();

  const tabs = [
    {
      id: "calendar" as const,
      name: t("features.thaiCulture.tabs.calendar.name"),
      icon: "📅",
      description: t("features.thaiCulture.tabs.calendar.description"),
    },
    {
      id: "family" as const,
      name: t("features.thaiCulture.tabs.family.name"),
      icon: "👨‍👩‍👧‍👦",
      description: t("features.thaiCulture.tabs.family.description"),
    },
    {
      id: "merit" as const,
      name: t("features.thaiCulture.tabs.merit.name"),
      icon: "🙏",
      description: t("features.thaiCulture.tabs.merit.description"),
    },
  ];

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${
        viewMode === "play"
          ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
          : "bg-gradient-to-br from-indigo-50 to-purple-50"
      }`}
    >
      {viewMode === "play" && <UniverseBackground starCount={50} />}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 pb-20 sm:pb-24 pt-20 sm:pt-24 lg:pt-32 relative z-10">
        {/* Header */}
        <FadeIn direction="down" delay={0.1} className="text-center mb-12">
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-6">
              <motion.div
                className="text-5xl md:text-7xl"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🇹🇭
              </motion.div>
              <ThemeAwareHeading
                level="h1"
                className="mb-4"
                gradient={isPlayMode}
              >
                {t("features.thaiCulture.title")}
              </ThemeAwareHeading>
              <motion.div
                className="text-5xl md:text-7xl"
                animate={{
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                🙏
              </motion.div>
            </div>

            <ThemeAwareText
              color="secondary"
              className="mb-8 max-w-4xl mx-auto px-4"
            >
              {accessibilityMode === "elder"
                ? t("features.thaiCulture.description.elder")
                : accessibilityMode === "youth"
                  ? t("features.thaiCulture.description.youth")
                  : viewMode === "play"
                    ? t("features.thaiCulture.description.play")
                    : t("features.thaiCulture.description.clarity")}
            </ThemeAwareText>
          </div>
        </FadeIn>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-6 py-4 rounded-xl transition-all duration-300 text-left
                ${
                  activeTab === tab.id
                    ? isPlayMode
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "bg-blue-500 text-white shadow-lg"
                    : isPlayMode
                      ? "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }
                ${isPlayMode && "backdrop-blur-sm"}
              `}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{tab.icon}</span>
                <div>
                  <div className="font-medium">{tab.name}</div>
                  <div
                    className={`text-sm ${
                      activeTab === tab.id ? "opacity-90" : "opacity-70"
                    }`}
                  >
                    {tab.description}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "calendar" && (
            <ThaiCalendarIntegration
              onEventSelect={(event) => {
                console.log("Event selected:", event);
              }}
            />
          )}

          {activeTab === "family" && (
            <FamilyObligationTracker
              onObligationUpdate={(obligation) => {
                console.log("Family obligation updated:", obligation);
              }}
            />
          )}

          {activeTab === "merit" && (
            <MeritMakingBudget
              onBudgetUpdate={(budget) => {
                console.log("Merit making budget updated:", budget);
              }}
            />
          )}
        </motion.div>

        {/* Cultural Wisdom Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <div
            className={`
            p-8 rounded-2xl text-center
            ${
              isPlayMode
                ? "bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border border-yellow-400/30"
                : "bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200"
            }
          `}
          >
            <div className="text-4xl mb-4">🧠</div>
            <ThemeAwareHeading level="h2" className="mb-4">
              {t("features.thaiCulture.wisdom.title")}
            </ThemeAwareHeading>
            <ThemeAwareText className="max-w-3xl mx-auto">
              {t("features.thaiCulture.wisdom.principles")}
            </ThemeAwareText>
            <ThemeAwareText color="secondary" className="mt-4 italic">
              {t("features.thaiCulture.subtitle")}
            </ThemeAwareText>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
