import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn, SplitText } from "../components/ui";
import { SmartHighlights, UniverseBackground } from "../components/widgets";
import { useUIStore } from "../store/useUIStore";
import { getAccessibilityClasses } from "../libs/accessibility";
import { useTranslation, useLanguage } from "../libs/i18n";
import { useCurrency } from "../hooks/useCurrency";

// Settings Highlights - will be translated in component
const getSettingsHighlights = (t: (key: string) => string) => [
  {
    id: "1",
    title: t("features.settings.security.status"),
    message: t("features.settings.security.statusMessage"),
    icon: "🔒",
    type: "success" as const,
  },
  {
    id: "2",
    title: t("features.settings.sync.title"),
    message: t("features.settings.sync.message"),
    icon: "🔄",
    type: "info" as const,
  },
  {
    id: "3",
    title: t("features.settings.privacy.title"),
    message: t("features.settings.privacy.message"),
    icon: "🛡️",
    type: "insight" as const,
  },
  {
    id: "4",
    title: t("features.settings.backup.title"),
    message: t("features.settings.backup.message"),
    icon: "💾",
    type: "celebration" as const,
  },
];

export function Settings() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const { theme, viewMode, accessibilityMode, setTheme, setAccessibilityMode } = useUIStore();
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    weekly: true,
    monthly: true,
    alerts: true,
  });
  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    analytics: true,
    marketing: false,
    profilePublic: false,
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrivacyChange = (key: keyof typeof privacy) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency as 'USD' | 'EUR' | 'GBP' | 'THB');
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as 'light' | 'dark' | 'system');
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as 'en' | 'th');
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${
        viewMode === "play"
          ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
          : "bg-gradient-to-br from-indigo-50 to-purple-50"
      }`}
    >
      {viewMode === "play" && <UniverseBackground starCount={25} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10">
        {/* Hero Header */}
        <FadeIn direction="down" delay={0.1} className="text-center py-12">
          <div className="mb-6">
            <div
              className={`text-5xl md:text-6xl font-bold mb-4 ${
                viewMode === "play" ? "text-white" : "text-gray-900"
              }`}
            >
              <motion.span
                className="inline-block mr-4"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ⚙️
              </motion.span>
              <SplitText className="inline">{t("features.settings.title")}</SplitText>
            </div>
            <p
              className={`text-xl mb-8 max-w-2xl mx-auto ${
                viewMode === "play" ? "text-white/80" : "text-gray-600"
              }`}
            >
              {t("features.settings.subtitle")}
            </p>
          </div>
        </FadeIn>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Account & Security */}
          <motion.div
            className={`rounded-2xl p-8 border ${
              viewMode === "play"
                ? "bg-white/10 backdrop-blur-sm border-white/20"
                : "bg-white border-gray-200"
            }`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2
              className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
                viewMode === "play" ? "text-white" : "text-gray-900"
              }`}
            >
              <span className="text-3xl">🔐</span>
              {t("features.settings.security.title")}
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className={`font-semibold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
                  >
                    {t("features.settings.security.twoFactor")}
                  </h3>
                  <p
                    className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
                  >
                    {t("features.settings.security.twoFactorDesc")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 text-sm font-medium">
                    Enabled
                  </span>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className={`font-semibold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
                  >
                    Password Strength
                  </h3>
                  <p
                    className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
                  >
                    Last changed 30 days ago
                  </p>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                  Change Password
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className={`font-semibold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
                  >
                    Login History
                  </h3>
                  <p
                    className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
                  >
                    Monitor account access
                  </p>
                </div>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    viewMode === "play"
                      ? "border-white/30 text-white hover:bg-white/10"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  View History
                </button>
              </div>
            </div>
          </motion.div>

          {/* Accessibility */}
          <motion.div
            className={`rounded-2xl p-8 border ${
              viewMode === "play"
                ? "bg-white/10 backdrop-blur-sm border-white/20"
                : "bg-white border-gray-200"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2
              className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
                viewMode === "play" ? "text-white" : "text-gray-900"
              }`}
            >
              <span className="text-3xl">♿</span>
              Accessibility
            </h2>

            <div className="space-y-6">
              <div>
                <label
                  className={`block font-semibold mb-3 ${
                    viewMode === "play" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Accessibility Mode
                </label>
                <p
                  className={`text-sm mb-4 ${
                    viewMode === "play" ? "text-white/70" : "text-gray-600"
                  }`}
                >
                  Choose the interface style that works best for you
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      mode: "standard" as const,
                      title: "Standard",
                      description: "Balanced design for all users",
                      icon: "👤",
                    },
                    {
                      mode: "elder" as const,
                      title: "Elder Friendly",
                      description:
                        "Larger text, high contrast, slower animations",
                      icon: "👴",
                    },
                    {
                      mode: "youth" as const,
                      title: "Youth Mode",
                      description:
                        "Compact design, vibrant colors, fast animations",
                      icon: "🧒",
                    },
                  ].map((option) => (
                    <button
                      key={option.mode}
                      onClick={() => setAccessibilityMode(option.mode)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        accessibilityMode === option.mode
                          ? viewMode === "play"
                            ? "border-purple-400 bg-purple-500/20"
                            : "border-purple-500 bg-purple-50"
                          : viewMode === "play"
                            ? "border-white/20 bg-white/5 hover:bg-white/10"
                            : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="text-2xl mb-2">{option.icon}</div>
                      <h3
                        className={`font-semibold mb-1 ${
                          viewMode === "play" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {option.title}
                      </h3>
                      <p
                        className={`text-sm ${
                          viewMode === "play"
                            ? "text-white/70"
                            : "text-gray-600"
                        }`}
                      >
                        {option.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accessibility Preview */}
              <div
                className={`p-4 rounded-lg border ${
                  viewMode === "play"
                    ? "border-white/20 bg-white/5"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <h4
                  className={`font-semibold mb-2 ${
                    viewMode === "play" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Preview
                </h4>
                <div
                  className={getAccessibilityClasses(
                    accessibilityMode,
                    viewMode,
                    {
                      fontSize: "text",
                      includeColors: true,
                    },
                  )}
                >
                  <p className="mb-2">
                    This is how text will appear with {accessibilityMode} mode.
                  </p>
                  <button
                    className={`${getAccessibilityClasses(
                      accessibilityMode,
                      viewMode,
                      { fontSize: "button" },
                    )} bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors`}
                  >
                    Sample Button
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            className={`rounded-2xl p-8 border ${
              viewMode === "play"
                ? "bg-white/10 backdrop-blur-sm border-white/20"
                : "bg-white border-gray-200"
            }`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2
              className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
                viewMode === "play" ? "text-white" : "text-gray-900"
              }`}
            >
              <span className="text-3xl">🔔</span>
              Notifications
            </h2>

            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h3
                      className={`font-semibold capitalize ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
                    >
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </h3>
                  </div>
                  <button
                    onClick={() =>
                      handleNotificationChange(
                        key as keyof typeof notifications,
                      )
                    }
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      value ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        value ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    ></div>
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Privacy */}
          <motion.div
            className={`rounded-2xl p-8 border ${
              viewMode === "play"
                ? "bg-white/10 backdrop-blur-sm border-white/20"
                : "bg-white border-gray-200"
            }`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2
              className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
                viewMode === "play" ? "text-white" : "text-gray-900"
              }`}
            >
              <span className="text-3xl">🛡️</span>
              Privacy
            </h2>

            <div className="space-y-4">
              {Object.entries(privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h3
                      className={`font-semibold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
                    >
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </h3>
                  </div>
                  <button
                    onClick={() =>
                      handlePrivacyChange(key as keyof typeof privacy)
                    }
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      value ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        value ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    ></div>
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Preferences */}
          <motion.div
            className={`rounded-2xl p-8 border ${
              viewMode === "play"
                ? "bg-white/10 backdrop-blur-sm border-white/20"
                : "bg-white border-gray-200"
            }`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2
              className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
                viewMode === "play" ? "text-white" : "text-gray-900"
              }`}
            >
              <span className="text-3xl">🎨</span>
              {t("features.settings.preferences")}
            </h2>

            <div className="space-y-6">
              <div>
                <label
                  className={`block font-semibold mb-2 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
                >
                  {t("features.settings.currency")}
                </label>
                <select
                  value={currency}
                  onChange={(e) => handleCurrencyChange(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${
                    viewMode === "play"
                      ? "bg-white/10 border-white/20 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="THB">THB (฿)</option>
                </select>
              </div>

              <div>
                <label
                  className={`block font-semibold mb-2 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
                >
                  {t("features.settings.theme")}
                </label>
                <select
                  value={theme}
                  onChange={(e) => handleThemeChange(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${
                    viewMode === "play"
                      ? "bg-white/10 border-white/20 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="system">{t("common.accessibility.auto")}</option>
                  <option value="light">{t("common.accessibility.lightMode")}</option>
                  <option value="dark">{t("common.accessibility.darkMode")}</option>
                </select>
              </div>

              <div>
                <label
                  className={`block font-semibold mb-2 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
                >
                  {t("features.settings.language")}
                </label>
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${
                    viewMode === "play"
                      ? "bg-white/10 border-white/20 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="en">English</option>
                  <option value="th">ไทย</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Settings Smart Highlights */}
        <SmartHighlights
          highlights={getSettingsHighlights(t)}
          title={t("features.settings.systemStatus")}
          subtitle={t("features.settings.systemStatusDesc")}
          className="mb-12"
        />

        {/* Action Buttons */}
        <FadeIn direction="up" delay={1.0}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="bg-blue-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors">
              Save All Changes
            </button>
            <button
              className={`px-8 py-3 rounded-xl font-medium border transition-colors ${
                viewMode === "play"
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Export Data
            </button>
            <button className="bg-red-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-red-600 transition-colors">
              Delete Account
            </button>
          </div>
        </FadeIn>

        {/* Footer */}
        <FadeIn direction="up" delay={1.2}>
          <div
            className={`text-center rounded-2xl p-8 border ${
              viewMode === "play"
                ? "bg-white/10 backdrop-blur-sm border-white/20 text-white"
                : "bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 text-gray-900"
            }`}
          >
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold mb-4">Your Privacy Matters</h3>
            <p
              className={`text-lg mb-6 max-w-2xl mx-auto ${
                viewMode === "play" ? "text-white/80" : "text-gray-600"
              }`}
            >
              We take your privacy seriously. Your financial data is encrypted,
              secure, and never shared without your explicit consent.
            </p>
            <div
              className={`text-sm ${
                viewMode === "play" ? "text-white/60" : "text-gray-500"
              }`}
            >
              🔐 End-to-end encryption • 🛡️ GDPR compliant • 🔒 Zero-knowledge
              architecture
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
