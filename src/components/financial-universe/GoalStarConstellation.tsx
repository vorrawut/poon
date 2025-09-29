import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../core";

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  category: string;
  icon: string;
  color: string;
  priority: "low" | "medium" | "high";
}

interface GoalStarConstellationProps {
  goals: Goal[];
  onGoalClick?: (goal: Goal) => void;
  className?: string;
}

export function GoalStarConstellation({
  goals,
  onGoalClick,
  className = "",
}: GoalStarConstellationProps) {
  const { isPlayMode } = useTheme();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [hoveredGoal, setHoveredGoal] = useState<string | null>(null);

  // Calculate star brightness based on progress
  const getStarBrightness = (goal: Goal) => {
    const progress = (goal.current / goal.target) * 100;
    if (progress >= 100) return "ignited"; // Goal completed - star ignites
    if (progress >= 75) return "bright"; // Close to completion
    if (progress >= 50) return "medium"; // Halfway there
    if (progress >= 25) return "dim"; // Getting started
    return "faint"; // Just beginning
  };

  // Get star size based on priority and progress
  const getStarSize = (goal: Goal) => {
    const progress = (goal.current / goal.target) * 100;
    const baseSize =
      goal.priority === "high" ? 24 : goal.priority === "medium" ? 20 : 16;
    const progressMultiplier = 1 + (progress / 100) * 0.5; // Up to 50% larger when complete
    return baseSize * progressMultiplier;
  };

  // Generate constellation positions
  const getConstellationPositions = (): Array<{
    x: number;
    y: number;
    goal: Goal;
  }> => {
    const positions: Array<{ x: number; y: number; goal: Goal }> = [];
    const centerX = 50;
    const centerY = 50;
    const radius = 35;

    goals.forEach((goal, index) => {
      const angle = (index / goals.length) * 2 * Math.PI;
      const distance = radius + (Math.random() - 0.5) * 10; // Add some randomness
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;

      positions.push({ x, y, goal });
    });

    return positions;
  };

  const starPositions = getConstellationPositions();

  if (!isPlayMode) {
    // Clarity mode - simple grid of goals
    return (
      <div
        className={`bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-2xl p-6 ${className}`}
      >
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 text-center">
          🎯 Your Financial Goals
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {goals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <motion.div
                key={goal.id}
                className="bg-[var(--color-surface-secondary)] rounded-lg p-4 cursor-pointer border border-[var(--color-border-secondary)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onGoalClick?.(goal)}
              >
                <div className="text-2xl mb-2">{goal.icon}</div>
                <div className="text-sm font-medium text-[var(--color-text-primary)] mb-1">
                  {goal.name}
                </div>
                <div className="text-xs text-[var(--color-text-secondary)] mb-2">
                  ฿{goal.current.toLocaleString()} / ฿
                  {goal.target.toLocaleString()}
                </div>
                <div className="w-full bg-[var(--color-bg-tertiary)] rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                  {progress.toFixed(0)}% complete
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Play mode - cosmic constellation
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="relative w-96 h-96 mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Constellation Background */}
        <div className="absolute inset-0 rounded-full border border-white/10 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 backdrop-blur-sm" />

        {/* Constellation Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {starPositions.map((pos, index) => {
            const nextPos = starPositions[(index + 1) % starPositions.length];
            return (
              <motion.line
                key={`line-${index}`}
                x1={`${pos.x}%`}
                y1={`${pos.y}%`}
                x2={`${nextPos.x}%`}
                y2={`${nextPos.y}%`}
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 2, delay: index * 0.1 }}
              />
            );
          })}
        </svg>

        {/* Goal Stars */}
        {starPositions.map(({ x, y, goal }, index) => {
          const brightness = getStarBrightness(goal);
          const size = getStarSize(goal);
          const progress = (goal.current / goal.target) * 100;
          const isHovered = hoveredGoal === goal.id;

          return (
            <motion.div
              key={goal.id}
              className="absolute cursor-pointer"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredGoal(goal.id)}
              onHoverEnd={() => setHoveredGoal(null)}
              onClick={() => {
                setSelectedGoal(selectedGoal === goal.id ? null : goal.id);
                onGoalClick?.(goal);
              }}
            >
              {/* Star Glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  width: size * 2,
                  height: size * 2,
                  background: `radial-gradient(circle, ${goal.color}40 0%, transparent 70%)`,
                  filter: "blur(8px)",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  scale: brightness === "ignited" ? [1, 1.5, 1] : [1, 1.2, 1],
                  opacity:
                    brightness === "ignited" ? [0.6, 1, 0.6] : [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: brightness === "ignited" ? 1.5 : 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Main Star */}
              <motion.div
                className="relative flex items-center justify-center rounded-full"
                style={{
                  width: size,
                  height: size,
                  background:
                    brightness === "ignited"
                      ? `linear-gradient(45deg, ${goal.color}, #FFD700)`
                      : `linear-gradient(45deg, ${goal.color}80, ${goal.color}40)`,
                  border: `2px solid ${brightness === "ignited" ? "#FFD700" : goal.color}`,
                  boxShadow:
                    brightness === "ignited"
                      ? `0 0 20px ${goal.color}, 0 0 40px #FFD700`
                      : `0 0 10px ${goal.color}40`,
                }}
                animate={{
                  scale: isHovered ? 1.2 : 1,
                  rotate: brightness === "ignited" ? [0, 360] : 0,
                }}
                transition={{
                  scale: { duration: 0.2 },
                  rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                }}
              >
                <span
                  className="text-white font-bold"
                  style={{ fontSize: size * 0.4 }}
                >
                  {goal.icon}
                </span>
              </motion.div>

              {/* Progress Ring */}
              <svg
                className="absolute inset-0"
                style={{
                  width: size + 8,
                  height: size + 8,
                  transform: "translate(-4px, -4px)",
                }}
              >
                <circle
                  cx="50%"
                  cy="50%"
                  r={size / 2 + 2}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r={size / 2 + 2}
                  fill="none"
                  stroke={goal.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * (size / 2 + 2)}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * (size / 2 + 2) }}
                  animate={{
                    strokeDashoffset:
                      2 * Math.PI * (size / 2 + 2) * (1 - progress / 100),
                  }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  style={{
                    transform: "rotate(-90deg)",
                    transformOrigin: "center",
                  }}
                />
              </svg>

              {/* Sparkles for completed goals */}
              {brightness === "ignited" && (
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, sparkleIndex) => (
                    <motion.div
                      key={sparkleIndex}
                      className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                      style={{
                        top: "50%",
                        left: "50%",
                        transformOrigin: `0 ${size / 2 + 15}px`,
                      }}
                      animate={{
                        rotate: 360,
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        rotate: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        },
                        scale: {
                          duration: 1,
                          repeat: Infinity,
                          delay: sparkleIndex * 0.2,
                        },
                        opacity: {
                          duration: 1,
                          repeat: Infinity,
                          delay: sparkleIndex * 0.2,
                        },
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Goal Details Popup */}
        <AnimatePresence>
          {selectedGoal && (
            <motion.div
              className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-white/20 min-w-64"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
            >
              {(() => {
                const goal = goals.find((g) => g.id === selectedGoal);
                if (!goal) return null;
                const progress = (goal.current / goal.target) * 100;
                const remaining = goal.target - goal.current;
                const daysUntilDeadline = Math.ceil(
                  (new Date(goal.deadline).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24),
                );

                return (
                  <>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{goal.icon}</span>
                      <div>
                        <h4 className="text-white font-bold">{goal.name}</h4>
                        <p className="text-white/70 text-sm">{goal.category}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-white">
                        <span>Progress:</span>
                        <span>{progress.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Current:</span>
                        <span>฿{goal.current.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Target:</span>
                        <span>฿{goal.target.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Remaining:</span>
                        <span>฿{remaining.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Deadline:</span>
                        <span
                          className={
                            daysUntilDeadline < 30
                              ? "text-red-300"
                              : "text-white"
                          }
                        >
                          {daysUntilDeadline} days
                        </span>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Constellation Info */}
      <motion.div
        className="text-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h3 className="text-2xl font-bold text-white mb-2">
          ⭐ Your Goal Constellation
        </h3>
        <p className="text-white/70 text-sm mb-4">
          Each star represents a financial goal. Brighter stars are closer to
          completion!
        </p>
        <div className="flex justify-center gap-6 text-sm">
          <div className="text-white/60">
            <span className="inline-block w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
            Starting
          </div>
          <div className="text-white/60">
            <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            In Progress
          </div>
          <div className="text-white/60">
            <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
            Nearly There
          </div>
          <div className="text-white/60">
            <span className="inline-block w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mr-2"></span>
            Ignited!
          </div>
        </div>
      </motion.div>
    </div>
  );
}
