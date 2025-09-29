import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "../components/ui";
import {
  ThemeAwareHeading,
  ThemeAwareText,
  ThemeAwareButton,
  useTheme,
} from "../core";
import {
  ThaiCalendarIntegration,
  FamilyObligationTracker,
  MeritMakingBudget,
} from "../features/thai-culture";
import { UniverseBackground } from "../components/widgets";
import { useUIStore } from "../store/useUIStore";

export function ThaiCulture() {
  const { viewMode, accessibilityMode } = useUIStore();
  const { isPlayMode } = useTheme();
  const [activeTab, setActiveTab] = useState<"calendar" | "family" | "merit">(
    "calendar",
  );
  const [language, setLanguage] = useState<"en" | "th">("en");

  const tabs = [
    {
      id: "calendar" as const,
      name: {
        en: "Thai Calendar",
        th: "ปฏิทินไทย",
      },
      icon: "📅",
      description: {
        en: "Plan for Thai festivals and cultural events",
        th: "วางแผนสำหรับเทศกาลและงานวัฒนธรรมไทย",
      },
    },
    {
      id: "family" as const,
      name: {
        en: "Family Obligations",
        th: "ภาระครอบครัว",
      },
      icon: "👨‍👩‍👧‍👦",
      description: {
        en: "Manage family support and responsibilities",
        th: "จัดการการช่วยเหลือและความรับผิดชอบต่อครอบครัว",
      },
    },
    {
      id: "merit" as const,
      name: {
        en: "Merit Making",
        th: "การทำบุญ",
      },
      icon: "🙏",
      description: {
        en: "Track your Buddhist merit-making activities",
        th: "ติดตามกิจกรรมการทำบุญตามหลักพุทธศาสนา",
      },
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
                {language === "th" ? "วัฒนธรรมไทย" : "Thai Culture"}
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
                ? language === "th"
                  ? "จัดการการเงินตามวัฒนธรรมไทย ด้วยระบบที่เข้าใจง่ายและใช้งานสะดวก"
                  : "Manage your finances according to Thai culture with easy-to-understand and convenient systems"
                : accessibilityMode === "youth"
                  ? language === "th"
                    ? "ปรับแต่งการเงินแบบไทยๆ! 🎮 ทำบุญ ดูแลครอบครัว และวางแปลนเทศกาลอย่างเจ๋ง! 🇹🇭✨"
                    : "Customize Thai-style finances! 🎮 Make merit, care for family, and plan festivals like a pro! 🇹🇭✨"
                  : viewMode === "play"
                    ? language === "th"
                      ? "จัดการการเงินในแบบไทยๆ — ที่ทุกการวางแผนเป็นการเดินทางผ่านจักรวาลวัฒนธรรมของคุณเอง! 🌌"
                      : "Manage your finances the Thai way — where every plan becomes a journey through your personal cultural universe! 🌌"
                    : language === "th"
                      ? "การจัดการการเงินที่เข้าใจวัฒนธรรมไทย วางแผนเทศกาล ดูแลครอบครัว และทำบุญอย่างเป็นระบบ"
                      : "Thai culture-aware financial management. Plan festivals, care for family, and make merit systematically."}
            </ThemeAwareText>

            {/* Language Toggle */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <ThemeAwareButton
                variant={language === "en" ? "primary" : "outline"}
                size="sm"
                onClick={() => setLanguage("en")}
              >
                🇺🇸 English
              </ThemeAwareButton>
              <ThemeAwareButton
                variant={language === "th" ? "primary" : "outline"}
                size="sm"
                onClick={() => setLanguage("th")}
              >
                🇹🇭 ไทย
              </ThemeAwareButton>
            </div>
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
                  <div className="font-medium">{tab.name[language]}</div>
                  <div
                    className={`text-sm ${
                      activeTab === tab.id ? "opacity-90" : "opacity-70"
                    }`}
                  >
                    {tab.description[language]}
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
              language={language}
              onPlanExpense={(holiday, amount) => {
                console.log(
                  "Planning expense for",
                  holiday.name[language],
                  ":",
                  amount,
                );
              }}
            />
          )}

          {activeTab === "family" && (
            <FamilyObligationTracker
              language={language}
              onObligationUpdate={(obligation) => {
                console.log("Family obligation updated:", obligation);
              }}
            />
          )}

          {activeTab === "merit" && (
            <MeritMakingBudget
              language={language}
              onMeritMakingUpdate={(entry) => {
                console.log("Merit making entry updated:", entry);
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
              {language === "th"
                ? "ปัญญาการเงินแบบไทย"
                : "Thai Financial Wisdom"}
            </ThemeAwareHeading>
            <ThemeAwareText className="max-w-3xl mx-auto">
              {language === "th"
                ? '"การออมเงินเป็นเหมือนการสร้างบุญ - ทำเล็กน้อยแต่สม่ำเสมอ จะได้ผลใหญ่ในที่สุด การดูแลครอบครัวและการทำบุญเป็นการลงทุนที่ดีที่สุดสำหรับชีวิต"'
                : '"Saving money is like making merit - small but consistent actions lead to great results. Taking care of family and making merit are the best investments for life."'}
            </ThemeAwareText>
            <ThemeAwareText color="secondary" className="mt-4 italic">
              {language === "th"
                ? "- ปรัชญาการเงินแบบไทย"
                : "- Thai Financial Philosophy"}
            </ThemeAwareText>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
