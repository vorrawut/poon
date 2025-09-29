import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import {
  XMarkIcon,
  FireIcon,
  ClockIcon,
  TrophyIcon,
  ChartBarIcon,
  CalendarIcon,
  BanknotesIcon,
  RocketLaunchIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import {
  ThemeAwareText,
  ThemeAwareButton,
  ThemeAwareHeading,
  useTheme,
} from "../../../core";
import { cn } from "../../../libs/utils";
import type { EnhancedGoal } from "./EnhancedGoalTracker";

interface MissionDetailViewProps {
  goal: EnhancedGoal;
  onClose: () => void;
  onContribute?: (amount: number) => void;
  onUpdate?: (updates: Partial<EnhancedGoal>) => void;
  className?: string;
}

// 3D Rocket Component
function MissionRocket({
  progress,
  stage,
  color,
}: {
  progress: number;
  stage: string;
  color: string;
}) {
  const rocketRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (rocketRef.current) {
      // Gentle floating animation
      rocketRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      rocketRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }

    if (flameRef.current && (stage === "ignition" || stage === "launched")) {
      // Flame animation
      flameRef.current.scale.y =
        1 + Math.sin(state.clock.elapsedTime * 10) * 0.3;
      flameRef.current.scale.x =
        1 + Math.sin(state.clock.elapsedTime * 8) * 0.2;
    }
  });

  const rocketHeight = 2 + (progress / 100) * 1; // Rocket grows with progress

  return (
    <group ref={rocketRef}>
      {/* Rocket Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.3, rocketHeight, 8]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Rocket Nose Cone */}
      <mesh position={[0, rocketHeight / 2 + 0.3, 0]}>
        <coneGeometry args={[0.2, 0.6, 8]} />
        <meshPhysicalMaterial color="#FF6B6B" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Rocket Fins */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 2) * 0.4,
            -rocketHeight / 2 - 0.2,
            Math.sin((i * Math.PI) / 2) * 0.4,
          ]}
          rotation={[0, (i * Math.PI) / 2, 0]}
        >
          <boxGeometry args={[0.1, 0.4, 0.6]} />
          <meshPhysicalMaterial
            color="#4ECDC4"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Rocket Flame (for ignition/launched stages) */}
      {(stage === "ignition" || stage === "launched") && (
        <group ref={flameRef} position={[0, -rocketHeight / 2 - 0.5, 0]}>
          <mesh>
            <coneGeometry args={[0.15, 0.8, 6]} />
            <meshBasicMaterial color="#FF4500" transparent opacity={0.8} />
          </mesh>
          <mesh position={[0, -0.2, 0]}>
            <coneGeometry args={[0.1, 0.4, 6]} />
            <meshBasicMaterial color="#FFD700" transparent opacity={0.9} />
          </mesh>
        </group>
      )}

      {/* Progress Rings */}
      {[25, 50, 75, 100].map((milestone, index) => (
        <mesh
          key={milestone}
          position={[0, -rocketHeight / 2 - 2 - index * 0.5, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.8, 1, 16]} />
          <meshBasicMaterial
            color={progress >= milestone ? "#10B981" : "#374151"}
            transparent
            opacity={progress >= milestone ? 0.8 : 0.3}
          />
        </mesh>
      ))}

      {/* Destination Star */}
      <mesh position={[0, rocketHeight / 2 + 3, 0]}>
        <sphereGeometry args={[0.3, 8, 6]} />
        <meshBasicMaterial color={progress >= 100 ? "#FFD700" : "#FFA500"} />
      </mesh>
    </group>
  );
}

// 3D Scene Component
function MissionScene({ goal }: { goal: EnhancedGoal }) {
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const getRocketStage = (progress: number) => {
    if (progress >= 100) return "launched";
    if (progress >= 75) return "ignition";
    if (progress >= 50) return "fueling";
    if (progress >= 25) return "assembly";
    return "planning";
  };

  const stage = getRocketStage(progress);
  const categoryColors = {
    emergency: "#EF4444",
    travel: "#3B82F6",
    house: "#10B981",
    car: "#F59E0B",
    investment: "#8B5CF6",
    education: "#EC4899",
    other: "#6B7280",
  };

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} color="#4ECDC4" intensity={0.5} />

      <MissionRocket
        progress={progress}
        stage={stage}
        color={categoryColors[goal.category]}
      />

      <Stars
        radius={50}
        depth={50}
        count={200}
        factor={2}
        saturation={0}
        fade
      />

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={3}
        maxDistance={15}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
      />
    </>
  );
}

export function MissionDetailView({
  goal,
  onClose,
  onContribute,
  onUpdate: _onUpdate,
  className,
}: MissionDetailViewProps) {
  const { isPlayMode } = useTheme();
  const [contributeAmount, setContributeAmount] = useState<string>("");
  const [showContributeForm, setShowContributeForm] = useState(false);

  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.currentAmount;
  const daysRemaining = Math.ceil(
    (new Date(goal.deadline).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );

  // Calculate monthly target to reach goal
  const monthsRemaining = Math.max(1, daysRemaining / 30);
  const monthlyTargetToReachGoal = remaining / monthsRemaining;

  const handleContribute = () => {
    const amount = parseFloat(contributeAmount);
    if (amount > 0 && onContribute) {
      onContribute(amount);
      setContributeAmount("");
      setShowContributeForm(false);
    }
  };

  const categoryConfig = {
    emergency: { icon: "🛡️", color: "#EF4444", name: "Emergency Fund" },
    travel: { icon: "✈️", color: "#3B82F6", name: "Travel" },
    house: { icon: "🏠", color: "#10B981", name: "House" },
    car: { icon: "🚗", color: "#F59E0B", name: "Car" },
    investment: { icon: "📈", color: "#8B5CF6", name: "Investment" },
    education: { icon: "🎓", color: "#EC4899", name: "Education" },
    other: { icon: "🎯", color: "#6B7280", name: "Other" },
  };

  const config = categoryConfig[goal.category];

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        isPlayMode ? "bg-black/70" : "bg-black/50",
        "backdrop-blur-sm",
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={cn(
          "relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl",
          "bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)]",
          "shadow-2xl",
          className,
        )}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border-secondary)]">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{config.icon}</div>
            <div>
              <ThemeAwareHeading level="h2" className="text-2xl font-bold">
                {goal.name}
              </ThemeAwareHeading>
              <ThemeAwareText color="secondary">
                {config.name} • {progress.toFixed(1)}% Complete
              </ThemeAwareText>
            </div>
          </div>

          <ThemeAwareButton
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <XMarkIcon className="w-6 h-6" />
          </ThemeAwareButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(90vh-120px)]">
          {/* 3D Mission Visualization */}
          <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
            {isPlayMode ? (
              <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <MissionScene goal={goal} />
              </Canvas>
            ) : (
              // 2D Fallback for Clarity Mode
              <div className="flex items-center justify-center h-full p-8">
                <div className="text-center space-y-4">
                  <motion.div
                    className="text-8xl"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    🚀
                  </motion.div>
                  <ThemeAwareHeading level="h3" className="text-white text-xl">
                    Mission Progress: {progress.toFixed(0)}%
                  </ThemeAwareHeading>
                  <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden mx-auto">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: config.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 2 }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Mission Status Overlay */}
            <div className="absolute top-4 left-4 right-4">
              <div className="flex justify-between items-start">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
                  <div className="text-sm opacity-80">Mission Status</div>
                  <div className="text-lg font-bold">
                    {progress >= 100
                      ? "🚀 Launched!"
                      : progress >= 75
                        ? "🔥 Ignition Phase"
                        : progress >= 50
                          ? "⛽ Fueling Up"
                          : progress >= 25
                            ? "🔧 Assembly"
                            : "📋 Planning"}
                  </div>
                </div>

                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-right">
                  <div className="text-sm opacity-80">Progress</div>
                  <div className="text-2xl font-bold">
                    {progress.toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Details */}
          <div className="p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Progress Overview */}
              <div>
                <ThemeAwareHeading
                  level="h3"
                  className="text-lg font-semibold mb-4"
                >
                  Mission Overview
                </ThemeAwareHeading>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-4 rounded-lg bg-[var(--color-surface-secondary)]">
                    <div className="text-2xl font-bold text-green-500">
                      ฿{goal.currentAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Current Amount</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-[var(--color-surface-secondary)]">
                    <div
                      className="text-2xl font-bold"
                      style={{ color: config.color }}
                    >
                      ฿{goal.targetAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Target Amount</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: config.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 1.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Mission Stats */}
              <div>
                <ThemeAwareHeading
                  level="h3"
                  className="text-lg font-semibold mb-4"
                >
                  Mission Statistics
                </ThemeAwareHeading>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-secondary)]">
                    <div className="flex items-center gap-3">
                      <BanknotesIcon className="w-5 h-5 text-red-500" />
                      <span>Remaining Amount</span>
                    </div>
                    <span className="font-semibold">
                      ฿{remaining.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-secondary)]">
                    <div className="flex items-center gap-3">
                      <ClockIcon className="w-5 h-5 text-blue-500" />
                      <span>Days Remaining</span>
                    </div>
                    <span
                      className={cn(
                        "font-semibold",
                        daysRemaining < 30
                          ? "text-red-500"
                          : daysRemaining < 90
                            ? "text-yellow-500"
                            : "text-green-500",
                      )}
                    >
                      {daysRemaining > 0 ? `${daysRemaining} days` : "Overdue"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-secondary)]">
                    <div className="flex items-center gap-3">
                      <ChartBarIcon className="w-5 h-5 text-purple-500" />
                      <span>Monthly Target</span>
                    </div>
                    <span className="font-semibold">
                      ฿{monthlyTargetToReachGoal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-secondary)]">
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="w-5 h-5 text-green-500" />
                      <span>Deadline</span>
                    </div>
                    <span className="font-semibold">
                      {new Date(goal.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Milestones */}
              {goal.milestones.length > 0 && (
                <div>
                  <ThemeAwareHeading
                    level="h3"
                    className="text-lg font-semibold mb-4"
                  >
                    Mission Milestones
                  </ThemeAwareHeading>

                  <div className="space-y-2">
                    {goal.milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg",
                          milestone.isCompleted
                            ? "bg-green-500/10 border border-green-500/20"
                            : "bg-[var(--color-surface-secondary)]",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {milestone.isCompleted ? (
                            <TrophyIcon className="w-5 h-5 text-green-500" />
                          ) : (
                            <StarIcon className="w-5 h-5 text-gray-400" />
                          )}
                          <span
                            className={
                              milestone.isCompleted
                                ? "text-green-600 dark:text-green-400"
                                : ""
                            }
                          >
                            {milestone.name}
                          </span>
                        </div>
                        <span className="text-sm font-medium">
                          ฿{milestone.targetAmount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <AnimatePresence>
                  {!showContributeForm ? (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-3"
                    >
                      <ThemeAwareButton
                        variant={isPlayMode ? "cosmic" : "primary"}
                        onClick={() => setShowContributeForm(true)}
                        className="w-full"
                        glow={isPlayMode}
                      >
                        <FireIcon className="w-5 h-5 mr-2" />
                        Add Fuel to Mission
                      </ThemeAwareButton>

                      <div className="grid grid-cols-3 gap-2">
                        {[1000, 5000, 10000].map((amount) => (
                          <ThemeAwareButton
                            key={amount}
                            variant="outline"
                            size="sm"
                            onClick={() => onContribute?.(amount)}
                          >
                            +฿{amount.toLocaleString()}
                          </ThemeAwareButton>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-3"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Contribution Amount
                        </label>
                        <input
                          type="number"
                          value={contributeAmount}
                          onChange={(e) => setContributeAmount(e.target.value)}
                          placeholder="Enter amount..."
                          className="w-full p-3 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] text-[var(--color-text-primary)]"
                          autoFocus
                        />
                      </div>

                      <div className="flex gap-2">
                        <ThemeAwareButton
                          variant={isPlayMode ? "cosmic" : "primary"}
                          onClick={handleContribute}
                          disabled={
                            !contributeAmount ||
                            parseFloat(contributeAmount) <= 0
                          }
                          className="flex-1"
                          glow={isPlayMode}
                        >
                          <RocketLaunchIcon className="w-4 h-4 mr-2" />
                          Contribute
                        </ThemeAwareButton>
                        <ThemeAwareButton
                          variant="outline"
                          onClick={() => {
                            setShowContributeForm(false);
                            setContributeAmount("");
                          }}
                        >
                          Cancel
                        </ThemeAwareButton>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
