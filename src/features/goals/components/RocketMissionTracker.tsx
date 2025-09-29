import { useState, useRef, useEffect } from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  StarIcon,
  RocketLaunchIcon,
  FireIcon,
  CheckCircleIcon,
  ClockIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareButton,
  useTheme,
} from "../../../core";
import { cn } from "../../../libs/utils";

interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  deadline: string;
  category: string;
  color?: string;
  isCompleted?: boolean;
}

interface RocketMissionTrackerProps {
  goal: Goal;
  className?: string;
  onAddFunds?: (goalId: string, amount: number) => void;
  onComplete?: (goalId: string) => void;
}

// 3D Rocket Component
function Rocket3D({
  progress,
  isCompleted,
}: {
  progress: number;
  isCompleted: boolean;
}) {
  const rocketRef = useRef<THREE.Group>(null);
  const { themeMode } = useTheme();

  useFrame((state) => {
    if (rocketRef.current) {
      // Gentle floating animation
      rocketRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      // Slight rotation based on progress
      rocketRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.05;

      // Scale based on completion
      const scale = isCompleted ? 1.2 : 1;
      rocketRef.current.scale.setScalar(scale);
    }
  });

  const rocketColor = isCompleted
    ? "#10B981"
    : themeMode === "dark"
      ? "#8B5CF6"
      : "#6366F1";

  return (
    <group ref={rocketRef}>
      {/* Rocket Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 1, 8]} />
        <meshStandardMaterial
          color={rocketColor}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Rocket Nose */}
      <mesh position={[0, 0.6, 0]}>
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshStandardMaterial
          color={rocketColor}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Rocket Fins */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 2) * 0.25,
            -0.3,
            Math.sin((i * Math.PI) / 2) * 0.25,
          ]}
          rotation={[0, (i * Math.PI) / 2, 0]}
        >
          <boxGeometry args={[0.1, 0.3, 0.05]} />
          <meshStandardMaterial color={rocketColor} />
        </mesh>
      ))}

      {/* Exhaust Fire (when in progress) */}
      {!isCompleted && progress > 0 && (
        <mesh position={[0, -0.8, 0]}>
          <coneGeometry args={[0.1, 0.4, 6]} />
          <meshBasicMaterial color="#FF6B35" transparent opacity={0.8} />
        </mesh>
      )}

      {/* Completion Glow */}
      {isCompleted && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshBasicMaterial color="#10B981" transparent opacity={0.1} />
        </mesh>
      )}
    </group>
  );
}

// Star Target Component
function StarTarget({ isCompleted }: { isCompleted: boolean }) {
  const starRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (starRef.current) {
      starRef.current.rotation.y = state.clock.elapsedTime * 0.5;

      if (isCompleted) {
        // Pulsing animation for completed goals
        const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 1;
        starRef.current.scale.setScalar(pulse);
      }
    }
  });

  const starColor = isCompleted ? "#FFD700" : "#FCD34D";

  return (
    <group ref={starRef} position={[0, 3, 0]}>
      {/* Star Shape (simplified as octahedron) */}
      <mesh>
        <octahedronGeometry args={[0.3]} />
        <meshStandardMaterial
          color={starColor}
          emissive={starColor}
          emissiveIntensity={isCompleted ? 0.3 : 0.1}
        />
      </mesh>

      {/* Star Glow */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial
          color={starColor}
          transparent
          opacity={isCompleted ? 0.2 : 0.1}
        />
      </mesh>
    </group>
  );
}

// Progress Trail Component
function ProgressTrail({ progress }: { progress: number }) {
  const trailRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (trailRef.current) {
      trailRef.current.children.forEach((child, index) => {
        const delay = index * 0.1;
        const opacity = Math.sin(Date.now() * 0.003 + delay) * 0.3 + 0.7;
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshBasicMaterial
        ) {
          child.material.opacity = opacity * (progress / 100);
        }
      });
    }
  });

  const trailPoints = Array.from({ length: 10 }, (_, i) => {
    const t = (i / 9) * (progress / 100);
    return {
      x: 0,
      y: t * 3,
      z: 0,
    };
  });

  return (
    <group ref={trailRef}>
      {trailPoints.map((point, index) => (
        <mesh key={index} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.02]} />
          <meshBasicMaterial color="#8B5CF6" transparent />
        </mesh>
      ))}
    </group>
  );
}

// 3D Mission Scene
function MissionScene({
  progress,
  isCompleted,
}: {
  progress: number;
  isCompleted: boolean;
}) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />

      {/* Rocket */}
      <Rocket3D progress={progress} isCompleted={isCompleted} />

      {/* Star Target */}
      <StarTarget isCompleted={isCompleted} />

      {/* Progress Trail */}
      <ProgressTrail progress={progress} />

      {/* Progress Text - Using HTML overlay instead of 3D text to avoid font issues */}
    </>
  );
}

export function RocketMissionTracker({
  goal,
  className,
  onAddFunds,
}: RocketMissionTrackerProps) {
  const { isPlayMode, themeMode } = useTheme();
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [fundAmount, setFundAmount] = useState("");

  const progress = (goal.current / goal.target) * 100;
  const remaining = goal.target - goal.current;
  const isCompleted = goal.isCompleted || progress >= 100;

  // Calculate days remaining
  const deadline = new Date(goal.deadline);
  const today = new Date();
  const daysRemaining = Math.ceil(
    (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  // Progress animation
  const progressAnimation = useAnimation();
  const progressValue = useMotionValue(0);
  const progressWidth = useTransform(progressValue, [0, 100], ["0%", "100%"]);

  useEffect(() => {
    progressValue.set(progress);
    progressAnimation.start({
      width: `${progress}%`,
      transition: { duration: 1.5, ease: "easeOut" },
    });
  }, [progress, progressAnimation, progressValue]);

  const handleAddFunds = () => {
    const amount = parseFloat(fundAmount);
    if (amount > 0 && onAddFunds) {
      onAddFunds(goal.id, amount);
      setFundAmount("");
      setShowAddFunds(false);
    }
  };

  const getMissionStatus = () => {
    if (isCompleted)
      return {
        icon: TrophyIcon,
        text: "Mission Complete!",
        color: "text-green-500",
      };
    if (progress >= 75)
      return {
        icon: RocketLaunchIcon,
        text: "Final Approach",
        color: "text-yellow-500",
      };
    if (progress >= 50)
      return { icon: FireIcon, text: "In Orbit", color: "text-orange-500" };
    if (progress >= 25)
      return {
        icon: RocketLaunchIcon,
        text: "Launched",
        color: "text-blue-500",
      };
    return { icon: StarIcon, text: "Preparing Launch", color: "text-gray-500" };
  };

  const status = getMissionStatus();
  const StatusIcon = status.icon;

  return (
    <ThemeAwareCard className={cn("relative overflow-hidden", className)}>
      {/* 3D Mission Visualization for Play Mode */}
      {isPlayMode && (
        <div className="relative h-64 mb-6">
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            style={{
              background:
                themeMode === "dark"
                  ? "radial-gradient(circle, #1e1b4b 0%, #0f0f23 100%)"
                  : "radial-gradient(circle, #ddd6fe 0%, #e0e7ff 100%)",
            }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <MissionScene progress={progress} isCompleted={isCompleted} />
          </Canvas>

          {/* Progress Overlay */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-bold">
              {progress.toFixed(1)}%
            </div>
          </div>
        </div>
      )}

      {/* Mission Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <StatusIcon className={cn("w-5 h-5", status.color)} />
            <ThemeAwareText className="text-sm font-medium" color="secondary">
              {status.text}
            </ThemeAwareText>
          </div>
          <ThemeAwareText className="text-xl font-bold mb-1" color="primary">
            {goal.title}
          </ThemeAwareText>
          <ThemeAwareText className="text-sm" color="tertiary">
            {goal.description}
          </ThemeAwareText>
        </div>

        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
          </motion.div>
        )}
      </div>

      {/* Progress Section */}
      <div className="mb-6">
        {/* Progress Bar */}
        <div className="relative mb-3">
          <div
            className={cn(
              "h-3 rounded-full overflow-hidden",
              themeMode === "dark" ? "bg-gray-700" : "bg-gray-200",
            )}
          >
            <motion.div
              className={cn(
                "h-full rounded-full",
                isCompleted
                  ? "bg-gradient-to-r from-green-400 to-green-600"
                  : "bg-gradient-to-r from-blue-400 to-purple-600",
              )}
              style={{ width: progressWidth }}
              animate={progressAnimation}
            />
          </div>

          {/* Progress Percentage */}
          <motion.div
            className="absolute -top-8 bg-black/80 text-white text-xs px-2 py-1 rounded"
            style={{
              left: `calc(${progress}% - 20px)`,
              opacity: progress > 5 ? 1 : 0,
            }}
          >
            {progress.toFixed(1)}%
          </motion.div>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <ThemeAwareText className="text-2xl font-bold" color="primary">
              ฿{(goal.current / 1000).toFixed(0)}K
            </ThemeAwareText>
            <ThemeAwareText className="text-xs" color="tertiary">
              Current
            </ThemeAwareText>
          </div>
          <div>
            <ThemeAwareText className="text-2xl font-bold" color="primary">
              ฿{(remaining / 1000).toFixed(0)}K
            </ThemeAwareText>
            <ThemeAwareText className="text-xs" color="tertiary">
              Remaining
            </ThemeAwareText>
          </div>
          <div>
            <ThemeAwareText
              className={cn(
                "text-2xl font-bold",
                daysRemaining < 30
                  ? "text-red-500"
                  : daysRemaining < 90
                    ? "text-yellow-500"
                    : "text-green-500",
              )}
            >
              {daysRemaining}
            </ThemeAwareText>
            <ThemeAwareText className="text-xs" color="tertiary">
              Days Left
            </ThemeAwareText>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {!isCompleted && (
        <div className="space-y-3">
          {!showAddFunds ? (
            <div className="grid grid-cols-2 gap-3">
              <ThemeAwareButton
                variant={isPlayMode ? "cosmic" : "primary"}
                onClick={() => setShowAddFunds(true)}
                className="flex items-center justify-center space-x-2"
              >
                <RocketLaunchIcon className="w-4 h-4" />
                <span>Add Fuel</span>
              </ThemeAwareButton>

              <ThemeAwareButton
                variant="outline"
                onClick={() => console.log("View goal details")}
                className="flex items-center justify-center space-x-2"
              >
                <ClockIcon className="w-4 h-4" />
                <span>Details</span>
              </ThemeAwareButton>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-3"
            >
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  placeholder="Amount to add"
                  className={cn(
                    "flex-1 px-3 py-2 rounded-lg border text-sm",
                    themeMode === "dark"
                      ? "bg-gray-800 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900",
                  )}
                />
                <ThemeAwareButton
                  variant="primary"
                  onClick={handleAddFunds}
                  disabled={!fundAmount || parseFloat(fundAmount) <= 0}
                >
                  Add
                </ThemeAwareButton>
              </div>

              <ThemeAwareButton
                variant="ghost"
                onClick={() => setShowAddFunds(false)}
                className="w-full text-sm"
              >
                Cancel
              </ThemeAwareButton>
            </motion.div>
          )}
        </div>
      )}

      {/* Completion Celebration */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="text-4xl mb-2"
          >
            🎉
          </motion.div>
          <ThemeAwareText className="font-semibold text-green-500">
            Mission Accomplished!
          </ThemeAwareText>
          <ThemeAwareText className="text-sm mt-1" color="tertiary">
            You've reached your {goal.category.toLowerCase()} goal!
          </ThemeAwareText>
        </motion.div>
      )}

      {/* Cosmic Background Effects for Play Mode */}
      {isPlayMode && (
        <>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-400/10 to-transparent rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-xl" />
        </>
      )}
    </ThemeAwareCard>
  );
}
