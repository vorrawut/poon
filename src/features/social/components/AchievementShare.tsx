import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ThemeAwareCard,
  ThemeAwareButton,
  ThemeAwareHeading,
} from "../../../core";
import { useTranslation } from "../../../libs/i18n";
import { cn } from "../../../libs/utils";
import type { UserAchievement } from "./UserProfile";

// Social Platform Integration
export interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
  isEnabled: boolean;
  shareUrl?: string;
}

export interface ShareTemplate {
  id: string;
  name: {
    en: string;
    th: string;
  };
  template: {
    en: string;
    th: string;
  };
  style: "celebration" | "humble" | "motivational" | "cultural";
  preview: {
    en: string;
    th: string;
  };
}

export interface AchievementShareProps {
  achievement: UserAchievement;
  userDisplayName: string;
  onShare?: (
    platform: string,
    template: string,
    customMessage?: string,
  ) => void;
  onClose?: () => void;
  isVisible?: boolean;
  className?: string;
}

// Mock Social Platforms
// Import social platforms from centralized mock data
import {
  socialPlatforms,
  shareTemplates,
} from "../../../../mockData/features/social";

// Achievement Preview Card
function AchievementPreviewCard({
  achievement,
  userName,
}: {
  achievement: UserAchievement;
  userName: string;
}) {
  const { language } = useTranslation();
  // const { themeMode } = useTheme();

  const rarityColors = {
    common: "#6B7280",
    rare: "#3B82F6",
    epic: "#8B5CF6",
    legendary: "#F59E0B",
  };

  return (
    <div className="relative">
      <ThemeAwareCard
        className={cn(
          "p-6 bg-gradient-to-br border-2",
          achievement.rarity === "legendary"
            ? "from-yellow-500/10 to-orange-500/10 border-yellow-500/30"
            : achievement.rarity === "epic"
              ? "from-purple-500/10 to-pink-500/10 border-purple-500/30"
              : achievement.rarity === "rare"
                ? "from-blue-500/10 to-cyan-500/10 border-blue-500/30"
                : "from-gray-500/10 to-gray-600/10 border-gray-500/30",
        )}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <div className="text-sm text-gray-400 mb-1">
            Achievement Unlocked!
          </div>
          <div className="text-lg font-semibold">{userName}</div>
        </div>

        {/* Achievement Display */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="text-4xl p-3 rounded-full border-2"
            style={{
              borderColor: rarityColors[achievement.rarity],
              backgroundColor: `${rarityColors[achievement.rarity]}15`,
            }}
          >
            {achievement.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">
              {language === "th" ? achievement.name.th : achievement.name.en}
            </h3>
            <p className="text-gray-300 text-sm">
              {language === "th"
                ? achievement.description.th
                : achievement.description.en}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className="px-2 py-1 rounded-full text-xs font-medium capitalize"
                style={{
                  backgroundColor: `${rarityColors[achievement.rarity]}25`,
                  color: rarityColors[achievement.rarity],
                }}
              >
                {achievement.rarity}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(achievement.earnedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Celebration Effects */}
        <div className="text-center">
          <div className="text-2xl">🎉 ✨ 🎊</div>
          <div className="text-sm text-gray-400 mt-1">
            Shared via Poon Financial App
          </div>
        </div>

        {/* Legendary Sparkle Effect */}
        {achievement.rarity === "legendary" && (
          <>
            <div className="absolute top-2 left-2 text-yellow-400 animate-pulse">
              ✨
            </div>
            <div className="absolute top-2 right-2 text-yellow-400 animate-pulse">
              ✨
            </div>
            <div className="absolute bottom-2 left-2 text-yellow-400 animate-pulse">
              ✨
            </div>
            <div className="absolute bottom-2 right-2 text-yellow-400 animate-pulse">
              ✨
            </div>
          </>
        )}
      </ThemeAwareCard>
    </div>
  );
}

// Template Selection
function TemplateSelector({
  templates,
  selectedTemplate,
  onSelect,
  achievement,
  userName,
}: {
  templates: ShareTemplate[];
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
  achievement: UserAchievement;
  userName: string;
}) {
  const { language } = useTranslation();

  const generateMessage = (template: ShareTemplate) => {
    const baseTemplate =
      language === "th" ? template.template.th : template.template.en;
    const achievementName =
      language === "th" ? achievement.name.th : achievement.name.en;
    const achievementDesc =
      language === "th"
        ? achievement.description.th
        : achievement.description.en;

    return baseTemplate
      .replace("{achievementName}", achievementName)
      .replace("{achievementDesc}", achievementDesc)
      .replace("{userName}", userName);
  };

  return (
    <div className="space-y-3">
      <ThemeAwareHeading level="h4" className="text-lg font-semibold">
        📝 Choose Your Style
      </ThemeAwareHeading>

      {templates.map((template) => (
        <motion.div
          key={template.id}
          className={cn(
            "cursor-pointer transition-all duration-300",
            selectedTemplate === template.id && "scale-105",
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(template.id)}
        >
          <ThemeAwareCard
            className={cn(
              "p-4 border-2 transition-all duration-300",
              selectedTemplate === template.id
                ? "border-purple-500 shadow-lg shadow-purple-500/20"
                : "border-transparent hover:border-gray-600",
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h5 className="font-medium">
                  {language === "th" ? template.name.th : template.name.en}
                </h5>
                <span
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium capitalize mt-1 inline-block",
                    template.style === "celebration"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : template.style === "humble"
                        ? "bg-green-500/20 text-green-300"
                        : template.style === "motivational"
                          ? "bg-red-500/20 text-red-300"
                          : "bg-purple-500/20 text-purple-300",
                  )}
                >
                  {template.style}
                </span>
              </div>
              {selectedTemplate === template.id && (
                <div className="text-green-400">✓</div>
              )}
            </div>

            <div className="text-sm text-gray-300 bg-gray-800/50 p-3 rounded border-l-4 border-gray-600">
              "{generateMessage(template)}"
            </div>
          </ThemeAwareCard>
        </motion.div>
      ))}
    </div>
  );
}

// Platform Selection
function PlatformSelector({
  platforms,
  selectedPlatforms,
  onToggle,
}: {
  platforms: SocialPlatform[];
  selectedPlatforms: string[];
  onToggle: (platformId: string) => void;
}) {
  return (
    <div className="space-y-3">
      <ThemeAwareHeading level="h4" className="text-lg font-semibold">
        📱 Select Platforms
      </ThemeAwareHeading>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {platforms
          .filter((p) => p.isEnabled)
          .map((platform) => (
            <motion.div
              key={platform.id}
              className={cn(
                "cursor-pointer transition-all duration-300",
                selectedPlatforms.includes(platform.id) && "scale-105",
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggle(platform.id)}
            >
              <ThemeAwareCard
                className={cn(
                  "p-4 text-center border-2 transition-all duration-300",
                  selectedPlatforms.includes(platform.id)
                    ? "border-purple-500 shadow-lg shadow-purple-500/20"
                    : "border-transparent hover:border-gray-600",
                )}
              >
                <div className="text-3xl mb-2">{platform.icon}</div>
                <div className="font-medium text-sm">{platform.name}</div>
                {selectedPlatforms.includes(platform.id) && (
                  <div className="text-green-400 text-xs mt-1">✓ Selected</div>
                )}
              </ThemeAwareCard>
            </motion.div>
          ))}
      </div>
    </div>
  );
}

export function AchievementShare({
  achievement,
  userDisplayName,
  onShare,
  onClose,
  isVisible = true,
  className = "",
}: AchievementShareProps) {
  const { language } = useTranslation();
  const [selectedTemplate, setSelectedTemplate] =
    useState<string>("celebration");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "facebook",
  ]);
  const [customMessage, setCustomMessage] = useState<string>("");
  const [step, setStep] = useState<
    "preview" | "template" | "platforms" | "custom"
  >("preview");

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId],
    );
  };

  const handleShare = () => {
    selectedPlatforms.forEach((platformId) => {
      onShare?.(platformId, selectedTemplate, customMessage || undefined);
    });
  };

  const selectedTemplateData = shareTemplates.find(
    (t) => t.id === selectedTemplate,
  );

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={cn(
            "w-full max-w-2xl max-h-[90vh] overflow-y-auto",
            className,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <ThemeAwareCard className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <ThemeAwareHeading level="h2" className="text-2xl font-bold">
                🚀 Share Achievement
              </ThemeAwareHeading>
              <ThemeAwareButton variant="ghost" onClick={onClose}>
                ✕
              </ThemeAwareButton>
            </div>

            {/* Step Navigation */}
            <div className="flex justify-center mb-6">
              <div className="flex gap-2">
                {(["preview", "template", "platforms", "custom"] as const).map(
                  (stepName, idx) => (
                    <ThemeAwareButton
                      key={stepName}
                      variant={step === stepName ? "primary" : "ghost"}
                      size="sm"
                      onClick={() => setStep(stepName)}
                      className="capitalize"
                    >
                      {idx + 1}. {stepName}
                    </ThemeAwareButton>
                  ),
                )}
              </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === "preview" && (
                  <div className="space-y-4">
                    <ThemeAwareHeading
                      level="h3"
                      className="text-xl font-semibold text-center"
                    >
                      📱 Preview Your Share
                    </ThemeAwareHeading>
                    <AchievementPreviewCard
                      achievement={achievement}
                      userName={userDisplayName}
                    />
                    <div className="text-center">
                      <ThemeAwareButton
                        variant="primary"
                        onClick={() => setStep("template")}
                      >
                        Customize Message →
                      </ThemeAwareButton>
                    </div>
                  </div>
                )}

                {step === "template" && (
                  <TemplateSelector
                    templates={shareTemplates}
                    selectedTemplate={selectedTemplate}
                    onSelect={setSelectedTemplate}
                    achievement={achievement}
                    userName={userDisplayName}
                  />
                )}

                {step === "platforms" && (
                  <PlatformSelector
                    platforms={socialPlatforms}
                    selectedPlatforms={selectedPlatforms}
                    onToggle={handlePlatformToggle}
                  />
                )}

                {step === "custom" && (
                  <div className="space-y-4">
                    <ThemeAwareHeading
                      level="h4"
                      className="text-lg font-semibold"
                    >
                      ✏️ Custom Message (Optional)
                    </ThemeAwareHeading>

                    <div className="space-y-3">
                      <div className="text-sm text-gray-400">
                        Default message based on your template:
                      </div>
                      {selectedTemplateData && (
                        <div className="text-sm text-gray-300 bg-gray-800/50 p-3 rounded border-l-4 border-purple-500">
                          {language === "th"
                            ? selectedTemplateData.preview.th
                            : selectedTemplateData.preview.en}
                        </div>
                      )}

                      <textarea
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none"
                        rows={4}
                        placeholder="Write your custom message here (optional)..."
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
              <ThemeAwareButton
                variant="ghost"
                onClick={() => {
                  const steps = [
                    "preview",
                    "template",
                    "platforms",
                    "custom",
                  ] as const;
                  const currentIndex = steps.indexOf(step);
                  if (currentIndex > 0) {
                    setStep(steps[currentIndex - 1]);
                  }
                }}
                disabled={step === "preview"}
              >
                ← Back
              </ThemeAwareButton>

              <div className="flex gap-2">
                {step !== "custom" ? (
                  <ThemeAwareButton
                    variant="primary"
                    onClick={() => {
                      const steps = [
                        "preview",
                        "template",
                        "platforms",
                        "custom",
                      ] as const;
                      const currentIndex = steps.indexOf(step);
                      if (currentIndex < steps.length - 1) {
                        setStep(steps[currentIndex + 1]);
                      }
                    }}
                  >
                    Next →
                  </ThemeAwareButton>
                ) : (
                  <ThemeAwareButton
                    variant="primary"
                    onClick={handleShare}
                    disabled={selectedPlatforms.length === 0}
                  >
                    🚀 Share Now ({selectedPlatforms.length})
                  </ThemeAwareButton>
                )}
              </div>
            </div>
          </ThemeAwareCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
