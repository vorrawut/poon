import { motion } from "framer-motion";
import { useTheme } from "../../core";
import { useTranslation } from "../../libs/i18n";

interface SpendingMoonPhasesProps {
  monthlySpending: number;
  previousMonthSpending?: number;
  spendingChange: number;
  spendingPattern: "increasing" | "decreasing" | "stable" | "volatile";
  className?: string;
}

export function SpendingMoonPhases({
  monthlySpending,
  previousMonthSpending: _previousMonthSpending,
  spendingChange,
  spendingPattern: _spendingPattern,
  className = "",
}: SpendingMoonPhasesProps) {
  const { isPlayMode } = useTheme();
  const { t } = useTranslation();

  // Calculate moon phase based on spending pattern
  const getMoonPhase = () => {
    if (spendingChange > 20) return "full"; // High spending
    if (spendingChange > 5) return "waxing-gibbous"; // Increasing spending
    if (spendingChange > -5) return "first-quarter"; // Stable spending
    if (spendingChange > -20) return "waning-crescent"; // Decreasing spending
    return "new"; // Very low spending
  };

  const moonPhase = getMoonPhase();

  // Moon phase configurations
  const moonPhases = {
    new: {
      emoji: "🌑",
      name: t("features.financialUniverse.moonPhases.phases.newMoon.name"),
      description: t(
        "features.financialUniverse.moonPhases.phases.newMoon.description",
      ),
    },
    "waxing-crescent": {
      emoji: "🌒",
      name: t(
        "features.financialUniverse.moonPhases.phases.waxingCrescent.name",
      ),
      description: t(
        "features.financialUniverse.moonPhases.phases.waxingCrescent.description",
      ),
    },
    "first-quarter": {
      emoji: "🌓",
      name: t("features.financialUniverse.moonPhases.phases.firstQuarter.name"),
      description: t(
        "features.financialUniverse.moonPhases.phases.firstQuarter.description",
      ),
    },
    "waxing-gibbous": {
      emoji: "🌔",
      name: t(
        "features.financialUniverse.moonPhases.phases.waxingGibbous.name",
      ),
      description: t(
        "features.financialUniverse.moonPhases.phases.waxingGibbous.description",
      ),
    },
    full: {
      emoji: "🌕",
      name: t("features.financialUniverse.moonPhases.phases.fullMoon.name"),
      description: t(
        "features.financialUniverse.moonPhases.phases.fullMoon.description",
      ),
    },
    "waning-gibbous": {
      emoji: "🌖",
      name: t(
        "features.financialUniverse.moonPhases.phases.waningGibbous.name",
      ),
      description: t(
        "features.financialUniverse.moonPhases.phases.waningGibbous.description",
      ),
    },
    "last-quarter": {
      emoji: "🌗",
      name: t("features.financialUniverse.moonPhases.phases.lastQuarter.name"),
      description: t(
        "features.financialUniverse.moonPhases.phases.lastQuarter.description",
      ),
    },
    "waning-crescent": {
      emoji: "🌘",
      name: t(
        "features.financialUniverse.moonPhases.phases.waningCrescent.name",
      ),
      description: t(
        "features.financialUniverse.moonPhases.phases.waningCrescent.description",
      ),
    },
  };

  const currentPhase = moonPhases[moonPhase];

  // Get moon color based on spending health
  const getMoonColor = () => {
    if (spendingChange > 20) return "#EF4444"; // Red for high spending
    if (spendingChange > 5) return "#F59E0B"; // Orange for increasing
    if (spendingChange > -5) return "#3B82F6"; // Blue for stable
    return "#10B981"; // Green for decreasing
  };

  const moonColor = getMoonColor();

  if (!isPlayMode) {
    // Clarity mode - simple card display
    return (
      <div
        className={`bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-2xl p-6 ${className}`}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">{currentPhase.emoji}</div>
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
            {currentPhase.name}
          </h3>
          <p className="text-[var(--color-text-secondary)] mb-4">
            {currentPhase.description}
          </p>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">
              ฿{monthlySpending.toLocaleString()}
            </div>
            <div
              className={`text-sm font-medium ${spendingChange >= 0 ? "text-red-500" : "text-green-500"}`}
            >
              {spendingChange >= 0 ? "+" : ""}฿
              {Math.abs(spendingChange).toLocaleString()}{" "}
              {t("features.financialUniverse.moonPhases.comparison")}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Play mode - cosmic moon visualization
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="relative w-80 h-80 mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Moon Orbit Ring */}
        <motion.div
          className="absolute inset-0 border-2 border-white/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />

        {/* Moon Glow */}
        <motion.div
          className="absolute inset-8 rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, ${moonColor}40 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main Moon */}
        <motion.div
          className="absolute inset-12 rounded-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${moonColor}80, ${moonColor}40)`,
            border: `2px solid ${moonColor}60`,
            boxShadow: `0 0 40px ${moonColor}40`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {/* Moon Phase Emoji */}
          <motion.div
            className="text-6xl"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {currentPhase.emoji}
          </motion.div>
        </motion.div>

        {/* Spending Meteors */}
        {_spendingPattern === "volatile" && (
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-8 bg-gradient-to-b from-yellow-400 to-transparent rounded-full"
                style={{
                  top: `${20 + i * 20}%`,
                  left: `${10 + i * 30}%`,
                }}
                animate={{
                  x: [0, 100],
                  y: [0, 50],
                  opacity: [0, 1, 0],
                  rotate: [0, 45],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}

        {/* Moon Info Overlay */}
        <motion.div
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-white mb-2">
            {currentPhase.name}
          </h3>
          <p className="text-white/70 text-sm mb-3">
            {currentPhase.description}
          </p>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <div className="text-2xl font-bold text-white">
              ฿{monthlySpending.toLocaleString()}
            </div>
            <div
              className={`text-sm font-medium ${spendingChange >= 0 ? "text-red-300" : "text-green-300"}`}
            >
              {spendingChange >= 0 ? "+" : ""}฿
              {Math.abs(spendingChange).toLocaleString()}{" "}
              {t("features.financialUniverse.moonPhases.comparison")}
            </div>
          </div>
        </motion.div>

        {/* Orbital Particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/40 rounded-full"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: `0 ${120 + i * 10}px`,
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
