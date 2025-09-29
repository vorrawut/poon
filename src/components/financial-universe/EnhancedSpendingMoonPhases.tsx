import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Text, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareButton,
  useTheme,
} from "../../core";
import { useTranslation } from "../../libs/i18n";
import { cn } from "../../libs/utils";

interface EnhancedSpendingMoonPhasesProps {
  monthlySpending: number;
  previousMonthSpending?: number;
  spendingChange: number;
  spendingPattern: "increasing" | "decreasing" | "stable" | "volatile";
  spendingHistory?: Array<{
    month: string;
    amount: number;
    phase: string;
  }>;
  categories?: Array<{
    name: string;
    amount: number;
    percentage: number;
  }>;
  className?: string;
}

// 3D Moon Component with realistic lunar phases
function Moon3D({
  phase,
  size = 1.5,
  glowIntensity = 0.3,
  spendingIntensity = 0.5,
}: {
  phase: string;
  size?: number;
  glowIntensity?: number;
  spendingIntensity?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const { themeMode } = useTheme();

  // Calculate moon illumination based on phase
  const getPhaseRotation = (phase: string): number => {
    const phases = {
      new: 0,
      "waxing-crescent": Math.PI * 0.25,
      "first-quarter": Math.PI * 0.5,
      "waxing-gibbous": Math.PI * 0.75,
      full: Math.PI,
      "waning-gibbous": Math.PI * 1.25,
      "last-quarter": Math.PI * 1.5,
      "waning-crescent": Math.PI * 1.75,
    };
    return phases[phase as keyof typeof phases] || 0;
  };

  // Get moon color based on spending intensity
  const getMoonMaterial = () => {
    const baseColor = themeMode === "dark" ? "#E5E7EB" : "#F3F4F6";
    const spendingColor =
      spendingIntensity > 0.7
        ? "#EF4444"
        : spendingIntensity > 0.5
          ? "#F59E0B"
          : spendingIntensity > 0.3
            ? "#3B82F6"
            : "#10B981";

    // Blend base color with spending intensity color
    return {
      color: baseColor,
      emissive: spendingColor,
      emissiveIntensity: glowIntensity * spendingIntensity,
    };
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      // Gentle rotation based on spending activity
      const rotationSpeed = 0.002 + spendingIntensity * 0.003;
      meshRef.current.rotation.y += rotationSpeed;

      // Floating motion with spending-based intensity
      const floatIntensity = 0.1 + spendingIntensity * 0.1;
      meshRef.current.position.y = Math.sin(time * 0.8) * floatIntensity;

      // Phase-based pulsing
      const pulseMagnitude = 0.05 + spendingIntensity * 0.05;
      const pulseSpeed = 1.5 + spendingIntensity * 0.5;
      const pulse = 1 + Math.sin(time * pulseSpeed) * pulseMagnitude;
      meshRef.current.scale.setScalar(pulse);
    }

    if (atmosphereRef.current) {
      // Atmospheric glow animation
      const glowPulse = 1 + Math.sin(time * 2) * 0.2;
      atmosphereRef.current.scale.setScalar(glowPulse);
      atmosphereRef.current.rotation.y -= 0.001;
    }
  });

  const phaseRotation = getPhaseRotation(phase);
  const moonMaterial = getMoonMaterial();

  return (
    <group>
      {/* Main Moon Body */}
      <Sphere ref={meshRef} args={[size, 64, 64]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color={moonMaterial.color}
          roughness={0.8}
          metalness={0.1}
          clearcoat={0.4}
          clearcoatRoughness={0.1}
          emissive={moonMaterial.emissive}
          emissiveIntensity={moonMaterial.emissiveIntensity}
        />
      </Sphere>

      {/* Phase Shadow - creates the lunar phase effect */}
      <Sphere
        args={[size * 1.005, 64, 64]}
        position={[0, 0, 0]}
        rotation={[0, phaseRotation, 0]}
      >
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.9}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Atmospheric Glow */}
      <Sphere
        ref={atmosphereRef}
        args={[size * 1.3, 32, 32]}
        position={[0, 0, 0]}
      >
        <meshBasicMaterial
          color={moonMaterial.emissive}
          transparent
          opacity={0.1 + spendingIntensity * 0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Spending Intensity Particles */}
      {spendingIntensity > 0.6 && (
        <group>
          {Array.from({ length: Math.floor(spendingIntensity * 20) }).map(
            (_, i) => (
              <Sphere
                key={i}
                args={[0.02, 8, 8]}
                position={[
                  (Math.random() - 0.5) * size * 3,
                  (Math.random() - 0.5) * size * 3,
                  (Math.random() - 0.5) * size * 3,
                ]}
              >
                <meshBasicMaterial
                  color={moonMaterial.emissive}
                  transparent
                  opacity={0.6}
                />
              </Sphere>
            ),
          )}
        </group>
      )}

      {/* Phase Name Text */}
      <Text
        position={[0, -size - 1, 0]}
        fontSize={0.25}
        color={themeMode === "dark" ? "#E5E7EB" : "#374151"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor={themeMode === "dark" ? "#000000" : "#FFFFFF"}
      >
        {phase.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
      </Text>
    </group>
  );
}

// 3D Scene Component
function MoonScene({
  phase,
  spendingIntensity,
}: {
  phase: string;
  spendingIntensity: number;
}) {
  const { themeMode } = useTheme();

  return (
    <>
      {/* Enhanced Lighting Setup */}
      <ambientLight
        intensity={0.3}
        color={themeMode === "dark" ? "#1e1b4b" : "#f8fafc"}
      />

      {/* Main directional light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        color="#ffffff"
        castShadow
      />

      {/* Colored accent lights based on spending */}
      <pointLight
        position={[-8, 5, -3]}
        intensity={0.4}
        color={spendingIntensity > 0.7 ? "#ef4444" : "#6366f1"}
      />

      <pointLight position={[8, -5, 3]} intensity={0.3} color="#8b5cf6" />

      {/* Enhanced Moon */}
      <Moon3D
        phase={phase}
        size={1.8}
        glowIntensity={0.4 + spendingIntensity * 0.2}
        spendingIntensity={spendingIntensity}
      />

      {/* Dynamic Star Field */}
      <Stars
        radius={120}
        depth={60}
        count={1500}
        factor={5}
        saturation={0}
        fade
        speed={0.2 + spendingIntensity * 0.3}
      />

      {/* Orbital Ring for High Spending */}
      {spendingIntensity > 0.8 && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3, 0.02, 16, 100]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={0.4} />
        </mesh>
      )}

      {/* Interactive Camera Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        zoomSpeed={0.6}
        rotateSpeed={0.4}
        maxDistance={10}
        minDistance={2.5}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export function EnhancedSpendingMoonPhases({
  monthlySpending,
  previousMonthSpending: _previousMonthSpending,
  spendingChange,
  spendingPattern,
  spendingHistory = [],
  categories = [],
  className = "",
}: EnhancedSpendingMoonPhasesProps) {
  const { isPlayMode, themeMode } = useTheme();
  const { t } = useTranslation();
  // const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<
    "current" | "history" | "categories"
  >("current");

  // Enhanced moon phase calculation with more nuanced logic
  const getMoonPhase = () => {
    // const spendingLevel = monthlySpending / 50000; // Normalize to typical monthly spending
    // const changeIntensity = Math.abs(spendingChange);

    // More sophisticated phase calculation
    if (spendingChange > 30) return "full"; // Peak spending
    if (spendingChange > 15) return "waxing-gibbous"; // High increasing
    if (spendingChange > 5) return "waxing-crescent"; // Moderate increasing
    if (spendingChange > -5) return "first-quarter"; // Stable
    if (spendingChange > -15) return "waning-crescent"; // Moderate decreasing
    if (spendingChange > -30) return "last-quarter"; // High decreasing
    return "new"; // Minimal spending
  };

  const moonPhase = getMoonPhase();

  // Calculate spending intensity for visual effects
  const spendingIntensity = useMemo(() => {
    const maxSpending = 100000; // Maximum expected monthly spending
    return Math.min(monthlySpending / maxSpending, 1);
  }, [monthlySpending]);

  // Enhanced moon phase configurations
  const moonPhases = {
    new: {
      emoji: "🌑",
      name: t("features.financialUniverse.moonPhases.phases.newMoon.name"),
      description: t(
        "features.financialUniverse.moonPhases.phases.newMoon.description",
      ),
      color: "#1F2937",
      insight: "Excellent spending control - perfect time to boost savings!",
      recommendation:
        "Consider increasing your investment contributions while spending is low.",
    },
    "waxing-crescent": {
      emoji: "🌒",
      name: t(
        "features.financialUniverse.moonPhases.phases.waxingCrescent.name",
      ),
      description: t(
        "features.financialUniverse.moonPhases.phases.waxingCrescent.description",
      ),
      color: "#374151",
      insight: "Spending is starting to increase - monitor carefully.",
      recommendation: "Review upcoming expenses and set spending alerts.",
    },
    "first-quarter": {
      emoji: "🌓",
      name: t("features.financialUniverse.moonPhases.phases.firstQuarter.name"),
      description: t(
        "features.financialUniverse.moonPhases.phases.firstQuarter.description",
      ),
      color: "#6B7280",
      insight: "Balanced spending phase - maintain current habits.",
      recommendation:
        "This is a stable period - good time for budget optimization.",
    },
    "waxing-gibbous": {
      emoji: "🌔",
      name: t(
        "features.financialUniverse.moonPhases.phases.waxingGibbous.name",
      ),
      description: t(
        "features.financialUniverse.moonPhases.phases.waxingGibbous.description",
      ),
      color: "#9CA3AF",
      insight: "High spending period - review your expenses carefully.",
      recommendation: "Identify non-essential expenses that can be reduced.",
    },
    full: {
      emoji: "🌕",
      name: t("features.financialUniverse.moonPhases.phases.fullMoon.name"),
      description: t(
        "features.financialUniverse.moonPhases.phases.fullMoon.description",
      ),
      color: "#F3F4F6",
      insight: "Peak spending alert - immediate budget review needed!",
      recommendation:
        "Pause non-essential purchases and create an action plan.",
    },
    "waning-gibbous": {
      emoji: "🌖",
      name: t(
        "features.financialUniverse.moonPhases.phases.waningGibbous.name",
      ),
      description: t(
        "features.financialUniverse.moonPhases.phases.waningGibbous.description",
      ),
      color: "#D1D5DB",
      insight: "Spending is decreasing - great progress!",
      recommendation: "Keep up the momentum and redirect savings to goals.",
    },
    "last-quarter": {
      emoji: "🌗",
      name: t("features.financialUniverse.moonPhases.phases.lastQuarter.name"),
      description: t(
        "features.financialUniverse.moonPhases.phases.lastQuarter.description",
      ),
      color: "#9CA3AF",
      insight: "Moderate spending - continue optimizing.",
      recommendation: "Fine-tune your budget categories for better control.",
    },
    "waning-crescent": {
      emoji: "🌘",
      name: t(
        "features.financialUniverse.moonPhases.phases.waningCrescent.name",
      ),
      description: t(
        "features.financialUniverse.moonPhases.phases.waningCrescent.description",
      ),
      color: "#6B7280",
      insight: "Low spending phase - excellent financial control!",
      recommendation:
        "Perfect time to increase savings and investment contributions.",
    },
  };

  const currentPhaseData = moonPhases[moonPhase as keyof typeof moonPhases];

  if (!isPlayMode) {
    // Clarity mode - enhanced professional dashboard
    return (
      <ThemeAwareCard className={cn("p-6", className)}>
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="text-6xl mb-3">{currentPhaseData.emoji}</div>
            <h3 className="text-xl font-bold mb-2">{currentPhaseData.name}</h3>
            <ThemeAwareText color="secondary" className="text-sm">
              {currentPhaseData.description}
            </ThemeAwareText>
          </div>

          {/* Spending Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="text-2xl font-bold">
                ฿{monthlySpending.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Current Month</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div
                className={cn(
                  "text-2xl font-bold",
                  spendingChange >= 0 ? "text-red-600" : "text-green-600",
                )}
              >
                {spendingChange >= 0 ? "+" : ""}฿
                {Math.abs(spendingChange).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                {t("features.financialUniverse.moonPhases.comparison")}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              💡 AI Insight
            </h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
              {currentPhaseData.insight}
            </p>
            <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
              {currentPhaseData.recommendation}
            </p>
          </div>
        </div>
      </ThemeAwareCard>
    );
  }

  // Play mode - immersive 3D lunar experience
  return (
    <div className={cn("space-y-6", className)}>
      {/* View Mode Selector */}
      <div className="flex justify-center gap-2">
        {(["current", "history", "categories"] as const).map((mode) => (
          <ThemeAwareButton
            key={mode}
            variant={viewMode === mode ? "primary" : "ghost"}
            size="sm"
            onClick={() => setViewMode(mode)}
            className="capitalize"
          >
            {mode}
          </ThemeAwareButton>
        ))}
      </div>

      {/* 3D Moon Visualization */}
      <motion.div
        className="relative aspect-square max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{
            background: `radial-gradient(circle, ${
              themeMode === "dark"
                ? "rgba(15, 23, 42, 0.8) 0%, rgba(2, 6, 23, 1) 100%"
                : "rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 1) 100%"
            })`,
          }}
        >
          <MoonScene phase={moonPhase} spendingIntensity={spendingIntensity} />
        </Canvas>

        {/* Interactive Overlay */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 rounded-lg p-4 backdrop-blur-md bg-black/30 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center text-white">
            <h3 className="font-bold text-lg mb-2">{currentPhaseData.name}</h3>
            <div className="text-2xl font-bold mb-1">
              ฿{monthlySpending.toLocaleString()}
            </div>
            <div
              className={cn(
                "text-sm font-medium",
                spendingChange >= 0 ? "text-red-400" : "text-green-400",
              )}
            >
              {spendingChange >= 0 ? "+" : ""}฿
              {Math.abs(spendingChange).toLocaleString()}{" "}
              {t("features.financialUniverse.moonPhases.comparison")}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Phase Insights Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <ThemeAwareCard className="p-6">
            {viewMode === "current" && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  🌙 Current Phase Analysis
                </h4>
                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                  <p className="text-sm mb-3">{currentPhaseData.insight}</p>
                  <p className="text-sm font-medium text-purple-300">
                    💡 {currentPhaseData.recommendation}
                  </p>
                </div>

                {/* Spending Pattern Indicator */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                  <span className="text-sm">Spending Pattern:</span>
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium capitalize",
                      spendingPattern === "increasing"
                        ? "bg-red-500/20 text-red-300"
                        : spendingPattern === "decreasing"
                          ? "bg-green-500/20 text-green-300"
                          : spendingPattern === "volatile"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-blue-500/20 text-blue-300",
                    )}
                  >
                    {spendingPattern}
                  </span>
                </div>
              </div>
            )}

            {viewMode === "history" && spendingHistory.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">📈 Spending History</h4>
                <div className="space-y-2">
                  {spendingHistory.slice(-6).map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30"
                    >
                      <span className="text-sm">{entry.month}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm">
                          ฿{entry.amount.toLocaleString()}
                        </span>
                        <span className="text-lg">
                          {
                            moonPhases[entry.phase as keyof typeof moonPhases]
                              ?.emoji
                          }
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {viewMode === "categories" && categories.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">
                  🏷️ Spending Categories
                </h4>
                <div className="space-y-3">
                  {categories.slice(0, 5).map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{category.name}</span>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            ฿{category.amount.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-400">
                            {category.percentage}%
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ThemeAwareCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
