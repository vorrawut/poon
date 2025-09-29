import { motion } from "framer-motion";
import { ThemeAwareHeading, ThemeAwareText, useTheme } from "../../core";
import { useTranslation } from "../../libs/i18n";

interface Highlight {
  id: string;
  title: string;
  message: string;
  icon: string;
  type: "success" | "info" | "warning" | "celebration" | "insight" | "alert";
}

interface SmartHighlightsProps {
  highlights: Highlight[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const typeStyles = {
  success: "from-green-500/20 to-emerald-600/20 border-green-400/30",
  info: "from-blue-500/20 to-indigo-600/20 border-blue-400/30",
  warning: "from-yellow-500/20 to-orange-600/20 border-yellow-400/30",
  celebration: "from-rose-500/20 to-red-600/20 border-rose-400/30",
  insight: "from-purple-500/20 to-pink-600/20 border-purple-400/30",
  alert: "from-teal-500/20 to-cyan-600/20 border-teal-400/30",
};

export function SmartHighlights({
  highlights,
  title,
  subtitle,
  className = "",
}: SmartHighlightsProps) {
  const { isPlayMode } = useTheme();
  const { t } = useTranslation();

  const displayTitle =
    title || t("features.widgets.smartHighlights.defaultTitle");
  const displaySubtitle =
    subtitle || t("features.widgets.smartHighlights.defaultSubtitle");

  return (
    <motion.div
      className={`${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="text-center mb-12">
        <ThemeAwareHeading
          level="h2"
          className="mb-4 text-2xl sm:text-3xl"
          gradient={isPlayMode}
        >
          <span className="mr-3">🧠</span>
          {displayTitle}
        </ThemeAwareHeading>
        <ThemeAwareText
          color="secondary"
          className="max-w-2xl mx-auto text-base sm:text-lg"
        >
          {displaySubtitle}
        </ThemeAwareText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {highlights.map((highlight, index) => (
          <motion.div
            key={highlight.id}
            className={`bg-gradient-to-br ${typeStyles[highlight.type]} backdrop-blur-sm rounded-xl p-4 sm:p-6 border`}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl sm:text-3xl">{highlight.icon}</div>
              <ThemeAwareHeading
                level="h3"
                className="text-base sm:text-lg font-semibold"
              >
                {highlight.title}
              </ThemeAwareHeading>
            </div>
            <ThemeAwareText className="text-sm sm:text-base opacity-90">
              {highlight.message}
            </ThemeAwareText>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
