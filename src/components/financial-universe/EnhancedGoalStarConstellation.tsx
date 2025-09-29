import { useState, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Text, OrbitControls, Stars, Line } from "@react-three/drei";
import * as THREE from "three";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareButton,
  useTheme,
} from "../../core";
// import { useTranslation } from "../../libs/i18n";
import { cn } from "../../libs/utils";

export interface EnhancedGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  category: string;
  icon: string;
  color: string;
  priority: "low" | "medium" | "high";
  constellation?: string; // Group goals into constellations
  position?: [number, number, number]; // 3D position in space
  connections?: string[]; // IDs of connected goals
  milestones?: Array<{
    id: string;
    name: string;
    amount: number;
    completed: boolean;
    date?: string;
  }>;
  insights?: {
    timeToCompletion: number; // months
    monthlyRequired: number;
    achievementProbability: number; // 0-100
    riskLevel: "low" | "medium" | "high";
    recommendations: string[];
  };
}

interface EnhancedGoalStarConstellationProps {
  goals: EnhancedGoal[];
  onGoalClick?: (goal: EnhancedGoal) => void;
  onGoalHover?: (goal: EnhancedGoal | null) => void;
  className?: string;
  interactive?: boolean;
  showConnections?: boolean;
  animateIgnition?: boolean;
}

// 3D Star Component representing a financial goal
function GoalStar({
  goal,
  position,
  isSelected,
  isHovered,
  onClick,
  onHover,
}: {
  goal: EnhancedGoal;
  position: [number, number, number];
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { themeMode } = useTheme();

  const progress = (goal.current / goal.target) * 100;

  // Calculate star properties based on goal progress
  const starProperties = useMemo(() => {
    const baseSize =
      goal.priority === "high" ? 0.15 : goal.priority === "medium" ? 0.12 : 0.1;
    const progressMultiplier = 1 + (progress / 100) * 0.8;
    const size = baseSize * progressMultiplier;

    let brightness = 0.3;
    let emissiveIntensity = 0.2;
    let glowSize = 1.5;

    if (progress >= 100) {
      brightness = 1.0;
      emissiveIntensity = 0.8;
      glowSize = 2.5;
    } else if (progress >= 75) {
      brightness = 0.8;
      emissiveIntensity = 0.6;
      glowSize = 2.0;
    } else if (progress >= 50) {
      brightness = 0.6;
      emissiveIntensity = 0.4;
      glowSize = 1.7;
    } else if (progress >= 25) {
      brightness = 0.4;
      emissiveIntensity = 0.3;
      glowSize = 1.5;
    }

    return { size, brightness, emissiveIntensity, glowSize };
  }, [progress, goal.priority]);

  const starColor = new THREE.Color(goal.color);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      // Gentle pulsing based on progress
      const pulseSpeed = progress >= 100 ? 3 : progress >= 50 ? 2 : 1;
      const pulseIntensity = progress >= 100 ? 0.3 : 0.1;
      const pulse = 1 + Math.sin(time * pulseSpeed) * pulseIntensity;
      meshRef.current.scale.setScalar(pulse);

      // Rotation for completed goals (ignited stars)
      if (progress >= 100) {
        meshRef.current.rotation.y += 0.02;
        meshRef.current.rotation.z += 0.01;
      }

      // Hover and selection effects
      if (isSelected || isHovered) {
        const hoverPulse = 1 + Math.sin(time * 4) * 0.2;
        meshRef.current.scale.setScalar(pulse * hoverPulse);
      }
    }

    if (glowRef.current) {
      // Glow animation
      const glowPulse = 1 + Math.sin(time * 1.5) * 0.2;
      glowRef.current.scale.setScalar(glowPulse);

      // Enhanced glow for completed goals
      if (progress >= 100) {
        const ignitedGlow = 1 + Math.sin(time * 2) * 0.4;
        glowRef.current.scale.setScalar(ignitedGlow);
      }
    }
  });

  return (
    <group position={position}>
      {/* Main Star */}
      <Sphere
        ref={meshRef}
        args={[starProperties.size, 16, 16]}
        onClick={onClick}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
      >
        <meshStandardMaterial
          color={starColor}
          emissive={starColor}
          emissiveIntensity={starProperties.emissiveIntensity}
          metalness={0.1}
          roughness={0.3}
        />
      </Sphere>

      {/* Glow Effect */}
      <Sphere
        ref={glowRef}
        args={[starProperties.size * starProperties.glowSize, 16, 16]}
      >
        <meshBasicMaterial
          color={starColor}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Ignition Effect for Completed Goals */}
      {progress >= 100 && (
        <group>
          {/* Particle burst effect */}
          {Array.from({ length: 8 }).map((_, i) => (
            <Sphere
              key={i}
              args={[0.02, 8, 8]}
              position={[
                Math.cos((i / 8) * Math.PI * 2) * 0.3,
                Math.sin((i / 8) * Math.PI * 2) * 0.3,
                (Math.random() - 0.5) * 0.2,
              ]}
            >
              <meshBasicMaterial color={starColor} transparent opacity={0.6} />
            </Sphere>
          ))}

          {/* Achievement ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[starProperties.size * 2, 0.01, 8, 32]} />
            <meshBasicMaterial color={starColor} transparent opacity={0.4} />
          </mesh>
        </group>
      )}

      {/* Goal Label */}
      {(isSelected || isHovered) && (
        <Text
          position={[0, starProperties.size + 0.3, 0]}
          fontSize={0.1}
          color={themeMode === "dark" ? "#FFFFFF" : "#000000"}
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.01}
          outlineColor={themeMode === "dark" ? "#000000" : "#FFFFFF"}
        >
          {goal.name}
        </Text>
      )}

      {/* Progress indicator */}
      {(isSelected || isHovered) && (
        <Text
          position={[0, -starProperties.size - 0.3, 0]}
          fontSize={0.08}
          color={
            progress >= 100 ? "#10B981" : progress >= 50 ? "#F59E0B" : "#6B7280"
          }
          anchorX="center"
          anchorY="top"
          outlineWidth={0.01}
          outlineColor={themeMode === "dark" ? "#000000" : "#FFFFFF"}
        >
          {progress.toFixed(0)}%
        </Text>
      )}
    </group>
  );
}

// Constellation Connection Lines
function ConstellationLines({
  goals,
  connections,
}: {
  goals: EnhancedGoal[];
  connections: Array<{ from: string; to: string }>;
}) {
  const { themeMode } = useTheme();

  return (
    <group>
      {connections.map((connection, index) => {
        const fromGoal = goals.find((g) => g.id === connection.from);
        const toGoal = goals.find((g) => g.id === connection.to);

        if (!fromGoal || !toGoal || !fromGoal.position || !toGoal.position) {
          return null;
        }

        const points = [
          new THREE.Vector3(...fromGoal.position),
          new THREE.Vector3(...toGoal.position),
        ];

        return (
          <Line
            key={index}
            points={points}
            color={themeMode === "dark" ? "#6366F1" : "#8B5CF6"}
            lineWidth={1}
            transparent
            opacity={0.3}
          />
        );
      })}
    </group>
  );
}

// 3D Scene Component
function ConstellationScene({
  goals,
  onGoalClick,
  onGoalHover,
  selectedGoal,
  hoveredGoal,
  showConnections,
}: {
  goals: EnhancedGoal[];
  onGoalClick: (goal: EnhancedGoal) => void;
  onGoalHover: (goal: EnhancedGoal | null) => void;
  selectedGoal: string | null;
  hoveredGoal: string | null;
  showConnections: boolean;
}) {
  const { themeMode } = useTheme();

  // Generate constellation connections
  const connections = useMemo(() => {
    const constellationGroups: { [key: string]: EnhancedGoal[] } = {};
    goals.forEach((goal) => {
      if (goal.constellation) {
        if (!constellationGroups[goal.constellation]) {
          constellationGroups[goal.constellation] = [];
        }
        constellationGroups[goal.constellation].push(goal);
      }
    });

    const connectionLines: Array<{ from: string; to: string }> = [];
    Object.values(constellationGroups).forEach((group) => {
      for (let i = 0; i < group.length - 1; i++) {
        connectionLines.push({
          from: group[i].id,
          to: group[i + 1].id,
        });
      }
    });

    return connectionLines;
  }, [goals]);

  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight
        intensity={0.2}
        color={themeMode === "dark" ? "#1e1b4b" : "#f8fafc"}
      />

      <directionalLight
        position={[10, 10, 5]}
        intensity={0.6}
        color="#ffffff"
      />

      <pointLight position={[-5, 5, 5]} intensity={0.4} color="#6366f1" />

      {/* Goal Stars */}
      {goals.map((goal) => {
        if (!goal.position) return null;

        return (
          <GoalStar
            key={goal.id}
            goal={goal}
            position={goal.position}
            isSelected={selectedGoal === goal.id}
            isHovered={hoveredGoal === goal.id}
            onClick={() => onGoalClick(goal)}
            onHover={(hovered) => onGoalHover(hovered ? goal : null)}
          />
        );
      })}

      {/* Constellation Connection Lines */}
      {showConnections && (
        <ConstellationLines goals={goals} connections={connections} />
      )}

      {/* Background Stars */}
      <Stars
        radius={100}
        depth={50}
        count={1000}
        factor={4}
        saturation={0}
        fade
        speed={0.1}
      />

      {/* Interactive Camera Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        zoomSpeed={0.6}
        rotateSpeed={0.3}
        maxDistance={15}
        minDistance={3}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export function EnhancedGoalStarConstellation({
  goals,
  onGoalClick,
  onGoalHover,
  className = "",
  interactive: _interactive = true,
  showConnections = true,
  animateIgnition: _animateIgnition = true,
}: EnhancedGoalStarConstellationProps) {
  const { isPlayMode, themeMode } = useTheme();
  // const { t } = useTranslation();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [hoveredGoal, setHoveredGoal] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<
    "constellation" | "progress" | "timeline"
  >("constellation");

  // Generate 3D positions for goals if not provided
  const enhancedGoals = useMemo(() => {
    return goals.map((goal, index) => {
      if (goal.position) return goal;

      // Arrange goals in a spherical pattern
      const phi = Math.acos(-1 + (2 * index) / goals.length);
      const theta = Math.sqrt(goals.length * Math.PI) * phi;
      const radius = 4;

      return {
        ...goal,
        position: [
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi),
        ] as [number, number, number],
      };
    });
  }, [goals]);

  const handleGoalClick = useCallback(
    (goal: EnhancedGoal) => {
      setSelectedGoal(goal.id);
      onGoalClick?.(goal);
    },
    [onGoalClick],
  );

  const handleGoalHover = useCallback(
    (goal: EnhancedGoal | null) => {
      setHoveredGoal(goal?.id || null);
      onGoalHover?.(goal);
    },
    [onGoalHover],
  );

  // Goal statistics
  const goalStats = useMemo(() => {
    const completed = goals.filter((g) => g.current / g.target >= 1).length;
    const inProgress = goals.filter(
      (g) => g.current / g.target > 0 && g.current / g.target < 1,
    ).length;
    const notStarted = goals.filter((g) => g.current === 0).length;
    const totalValue = goals.reduce((sum, g) => sum + g.target, 0);
    const currentValue = goals.reduce((sum, g) => sum + g.current, 0);
    const overallProgress =
      goals.length > 0 ? (currentValue / totalValue) * 100 : 0;

    return {
      total: goals.length,
      completed,
      inProgress,
      notStarted,
      overallProgress,
      totalValue,
      currentValue,
    };
  }, [goals]);

  const selectedGoalData = selectedGoal
    ? goals.find((g) => g.id === selectedGoal)
    : null;

  if (!isPlayMode) {
    // Clarity mode - professional goal overview
    return (
      <ThemeAwareCard className={cn("p-6", className)}>
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Goal Constellation</h3>
            <ThemeAwareText color="secondary" className="text-sm">
              {goalStats.total} goals • {goalStats.completed} completed •{" "}
              {goalStats.overallProgress.toFixed(1)}% overall progress
            </ThemeAwareText>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="text-2xl font-bold text-green-600">
                {goalStats.completed}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="text-2xl font-bold text-blue-600">
                {goalStats.inProgress}
              </div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="text-2xl font-bold text-gray-600">
                {goalStats.notStarted}
              </div>
              <div className="text-sm text-gray-600">Not Started</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="text-2xl font-bold text-purple-600">
                ฿{(goalStats.totalValue / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-gray-600">Total Value</div>
            </div>
          </div>

          {/* Goal List */}
          <div className="space-y-3">
            {goals.map((goal) => {
              const progress = (goal.current / goal.target) * 100;
              return (
                <div
                  key={goal.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                  onClick={() => handleGoalClick(goal)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{goal.icon}</div>
                    <div>
                      <h4 className="font-semibold">{goal.name}</h4>
                      <ThemeAwareText color="secondary" className="text-sm">
                        ฿{goal.current.toLocaleString()} / ฿
                        {goal.target.toLocaleString()}
                      </ThemeAwareText>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-lg font-bold"
                      style={{ color: goal.color }}
                    >
                      {progress.toFixed(0)}%
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(progress, 100)}%`,
                          backgroundColor: goal.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ThemeAwareCard>
    );
  }

  // Play mode - immersive 3D constellation
  return (
    <div className={cn("space-y-6", className)}>
      {/* View Mode Selector */}
      <div className="flex justify-center gap-2">
        {(["constellation", "progress", "timeline"] as const).map((mode) => (
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

      {/* 3D Constellation Visualization */}
      <motion.div
        className="relative aspect-square max-w-2xl mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{
            background: `radial-gradient(circle, ${
              themeMode === "dark"
                ? "rgba(15, 23, 42, 0.9) 0%, rgba(2, 6, 23, 1) 100%"
                : "rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 1) 100%"
            })`,
          }}
        >
          <ConstellationScene
            goals={enhancedGoals}
            onGoalClick={handleGoalClick}
            onGoalHover={handleGoalHover}
            selectedGoal={selectedGoal}
            hoveredGoal={hoveredGoal}
            showConnections={showConnections}
          />
        </Canvas>

        {/* Interactive Overlay */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 rounded-lg p-4 backdrop-blur-md bg-black/30 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center text-white">
            <h3 className="font-bold text-lg mb-2">⭐ Goal Constellation</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-green-400 font-bold">
                  {goalStats.completed}
                </div>
                <div>Ignited</div>
              </div>
              <div>
                <div className="text-blue-400 font-bold">
                  {goalStats.inProgress}
                </div>
                <div>Burning</div>
              </div>
              <div>
                <div className="text-gray-400 font-bold">
                  {goalStats.notStarted}
                </div>
                <div>Dormant</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Goal Details Panel */}
      <AnimatePresence mode="wait">
        {selectedGoalData && (
          <motion.div
            key={selectedGoalData.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ThemeAwareCard className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{selectedGoalData.icon}</div>
                    <div>
                      <h4 className="text-xl font-bold">
                        {selectedGoalData.name}
                      </h4>
                      <ThemeAwareText
                        color="secondary"
                        className="text-sm capitalize"
                      >
                        {selectedGoalData.category} •{" "}
                        {selectedGoalData.priority} priority
                      </ThemeAwareText>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-2xl font-bold"
                      style={{ color: selectedGoalData.color }}
                    >
                      {(
                        (selectedGoalData.current / selectedGoalData.target) *
                        100
                      ).toFixed(0)}
                      %
                    </div>
                    <ThemeAwareText color="secondary" className="text-sm">
                      Complete
                    </ThemeAwareText>
                  </div>
                </div>

                {/* Progress Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="text-lg font-bold">
                      ฿{selectedGoalData.current.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Current Amount</div>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="text-lg font-bold">
                      ฿{selectedGoalData.target.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Target Amount</div>
                  </div>
                </div>

                {/* AI Insights */}
                {selectedGoalData.insights && (
                  <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                    <h5 className="font-semibold text-purple-300 mb-2">
                      🔮 AI Insights
                    </h5>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-400">
                          Time to completion:
                        </span>
                        <span className="ml-2 font-medium">
                          {selectedGoalData.insights.timeToCompletion} months
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Monthly required:</span>
                        <span className="ml-2 font-medium">
                          ฿
                          {selectedGoalData.insights.monthlyRequired.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {selectedGoalData.insights.recommendations
                        .slice(0, 2)
                        .map((rec, idx) => (
                          <div key={idx} className="text-sm text-purple-200">
                            💡 {rec}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <ThemeAwareButton size="sm">Edit Goal</ThemeAwareButton>
                  <ThemeAwareButton variant="ghost" size="sm">
                    View Details
                  </ThemeAwareButton>
                </div>
              </div>
            </ThemeAwareCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
