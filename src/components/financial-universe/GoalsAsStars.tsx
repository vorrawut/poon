import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  category: string;
  deadline?: Date;
  isCompleted: boolean;
}

interface GoalsAsStarsProps {
  goals: Goal[];
  className?: string;
}

export function GoalsAsStars({ goals, className = '' }: GoalsAsStarsProps) {
  const [celebratingGoal, setCelebratingGoal] = useState<string | null>(null);

  useEffect(() => {
    // Check for newly completed goals to trigger celebration
    const completedGoal = goals.find(goal => 
      goal.isCompleted && celebratingGoal !== goal.id
    );
    
    if (completedGoal) {
      setCelebratingGoal(completedGoal.id);
      // Clear celebration after 3 seconds
      setTimeout(() => setCelebratingGoal(null), 3000);
    }
  }, [goals, celebratingGoal]);

  const getStarBrightness = (goal: Goal) => {
    if (goal.isCompleted) return 1;
    const progress = Math.min(goal.currentAmount / goal.targetAmount, 0.95);
    return Math.max(progress, 0.1); // Minimum 10% brightness
  };

  const getStarSize = (goal: Goal) => {
    const brightness = getStarBrightness(goal);
    const baseSize = 8;
    const maxSize = 20;
    return baseSize + (brightness * (maxSize - baseSize));
  };

  const getStarColor = (goal: Goal, brightness: number) => {
    if (goal.isCompleted) {
      return '#FFD700'; // Gold for completed
    }
    if (brightness > 0.8) {
      return '#F59E0B'; // Amber for almost there
    }
    if (brightness > 0.5) {
      return '#3B82F6'; // Blue for good progress
    }
    return '#94A3B8'; // Gray for early progress
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  const getConstellationPositions = (index: number, total: number) => {
    // Arrange stars in a natural constellation pattern
    const angle = (index / total) * 2 * Math.PI + (Math.random() - 0.5) * 0.5;
    const radius = 120 + (Math.random() - 0.5) * 60;
    
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <div className={`relative ${className}`}>
      {/* Background Galaxy */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent" />
      </div>

      {/* Stars Constellation */}
      <div className="relative w-full h-96 flex items-center justify-center">
        <div className="relative">
          {/* Center Point */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/30 rounded-full transform -translate-x-1/2 -translate-y-1/2" />

          {/* Goal Stars */}
          {goals.map((goal, index) => {
            const brightness = getStarBrightness(goal);
            const size = getStarSize(goal);
            const color = getStarColor(goal, brightness);
            const position = getConstellationPositions(index, goals.length);
            const isCompleted = goal.isCompleted;
            const isCelebrating = celebratingGoal === goal.id;

            return (
              <motion.div
                key={goal.id}
                className="absolute"
                style={{
                  left: `calc(50% + ${position.x}px)`,
                  top: `calc(50% + ${position.y}px)`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                {/* Main Star */}
                <motion.div
                  className="relative group cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  animate={isCelebrating ? {
                    scale: [1, 1.5, 1],
                    rotate: [0, 180, 360],
                  } : {}}
                  transition={isCelebrating ? {
                    duration: 1,
                    repeat: 3,
                  } : {}}
                >
                  {/* Star Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-sm"
                    style={{
                      width: size * 2,
                      height: size * 2,
                      backgroundColor: color,
                      opacity: brightness * 0.6,
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={isCompleted ? {
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 1, 0.6],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Star Core */}
                  <motion.div
                    className="relative rounded-full"
                    style={{
                      width: size,
                      height: size,
                      backgroundColor: color,
                      boxShadow: `0 0 ${size}px ${color}40`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={isCompleted ? {
                      boxShadow: [
                        `0 0 ${size}px ${color}40`,
                        `0 0 ${size * 2}px ${color}80`,
                        `0 0 ${size}px ${color}40`,
                      ],
                    } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />

                  {/* Star Points (for completed goals) */}
                  {isCompleted && (
                    <motion.div
                      className="absolute inset-0"
                      style={{ transform: 'translate(-50%, -50%)' }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                        <div
                          key={angle}
                          className="absolute w-1 bg-white/80 rounded-full"
                          style={{
                            height: size * 0.8,
                            left: '50%',
                            top: '50%',
                            transformOrigin: 'center',
                            transform: `rotate(${angle}deg) translateY(-${size * 0.4}px) translateX(-0.5px)`,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}

                  {/* Celebration Particles */}
                  <AnimatePresence>
                    {isCelebrating && (
                      <div className="absolute inset-0">
                        {[...Array(12)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                            style={{
                              left: '50%',
                              top: '50%',
                            }}
                            initial={{ opacity: 1, scale: 0 }}
                            animate={{
                              x: Math.cos(i * 30 * Math.PI / 180) * 50,
                              y: Math.sin(i * 30 * Math.PI / 180) * 50,
                              opacity: 0,
                              scale: 2,
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 1,
                              ease: "easeOut"
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </AnimatePresence>

                  {/* Goal Tooltip */}
                  <motion.div
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 pointer-events-none z-10"
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-black/80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap backdrop-blur-sm">
                      <div className="font-semibold">{goal.name}</div>
                      <div className="text-xs opacity-80">
                        {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                      </div>
                      <div className="text-xs opacity-80">
                        {(brightness * 100).toFixed(0)}% complete
                      </div>
                      {isCompleted && (
                        <div className="text-xs text-yellow-300">✨ Goal Achieved!</div>
                      )}
                    </div>
                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black/80" />
                  </motion.div>
                </motion.div>

                {/* Connection Lines (optional - creates constellation effect) */}
                {index > 0 && (
                  <svg
                    className="absolute pointer-events-none"
                    style={{
                      left: `${-position.x}px`,
                      top: `${-position.y}px`,
                      width: Math.abs(position.x),
                      height: Math.abs(position.y),
                    }}
                  >
                    <motion.line
                      x1={Math.abs(position.x)}
                      y1={Math.abs(position.y)}
                      x2={0}
                      y2={0}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                      strokeDasharray="2,4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.3 }}
                      transition={{ duration: 1, delay: index * 0.3 }}
                    />
                  </svg>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Goals Legend */}
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <h3 className="text-2xl font-bold text-white mb-4">
          ⭐ Your Goal Constellation
        </h3>
        <p className="text-white/70 max-w-md mx-auto text-sm">
          Each star represents a financial goal. Brighter stars are closer to completion. 
          When you reach a goal, your star ignites! ✨
        </p>
        
        {/* Progress Summary */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-2xl font-bold text-white">{goals.length}</div>
            <div className="text-xs text-white/70">Total Goals</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-2xl font-bold text-yellow-300">
              {goals.filter(g => g.isCompleted).length}
            </div>
            <div className="text-xs text-white/70">Completed</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-2xl font-bold text-blue-300">
              {goals.filter(g => !g.isCompleted && getStarBrightness(g) > 0.5).length}
            </div>
            <div className="text-xs text-white/70">Close to Goal</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-2xl font-bold text-green-300">
              {formatCurrency(goals.reduce((sum, g) => sum + g.currentAmount, 0))}
            </div>
            <div className="text-xs text-white/70">Total Saved</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
