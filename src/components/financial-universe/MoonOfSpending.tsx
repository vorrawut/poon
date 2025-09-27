import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface MoonOfSpendingProps {
  monthlySpending: number;
  previousMonthSpending: number;
  spendingChange: number;
  topCategories: Array<{ name: string; amount: number; color: string }>;
  className?: string;
}

export function MoonOfSpending({ 
  monthlySpending, 
  previousMonthSpending,
  spendingChange,
  topCategories,
  className = '' 
}: MoonOfSpendingProps) {
  const controls = useAnimation();
  const [isSpendingUp, setIsSpendingUp] = useState(spendingChange > 0);
  const [moonPhase, setMoonPhase] = useState(0.75); // 0 = new moon, 1 = full moon

  // Calculate moon phase based on spending level (more spending = fuller moon)
  useEffect(() => {
    const phase = Math.min(monthlySpending / 10000, 1); // Normalize to 0-1
    setMoonPhase(Math.max(phase, 0.2)); // Minimum 20% visible
  }, [monthlySpending]);

  // Animate moon based on spending changes
  useEffect(() => {
    setIsSpendingUp(spendingChange > 0);
    
    if (spendingChange > 0) {
      // Spending increased - warning glow
      controls.start({
        scale: [1, 1.03, 1],
        boxShadow: [
          '0 0 40px rgba(251, 191, 36, 0.3)',
          '0 0 60px rgba(251, 191, 36, 0.5)',
          '0 0 40px rgba(251, 191, 36, 0.3)',
        ],
        transition: {
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      });
    } else {
      // Spending controlled - gentle glow
      controls.start({
        scale: [1, 1.01, 1],
        boxShadow: [
          '0 0 30px rgba(148, 163, 184, 0.2)',
          '0 0 40px rgba(148, 163, 184, 0.4)',
          '0 0 30px rgba(148, 163, 184, 0.2)',
        ],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      });
    }
  }, [spendingChange, controls]);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const getMoonGradient = () => {
    if (isSpendingUp) {
      return 'from-amber-400 via-orange-500 to-red-500';
    }
    return 'from-slate-300 via-slate-400 to-slate-500';
  };

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Spending Trails (like meteor trails) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {topCategories.slice(0, 3).map((category, i) => (
          <motion.div
            key={category.name}
            className="absolute"
            style={{
              top: `${20 + i * 25}%`,
              right: `${10 + i * 15}%`,
            }}
          >
            <motion.div
              className="w-1 h-8 rounded-full opacity-60"
              style={{ background: category.color }}
              animate={{
                scaleY: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
            <div className="text-xs text-white/70 mt-1 whitespace-nowrap">
              {category.name}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Moon */}
      <motion.div
        className="relative w-32 h-32"
        animate={controls}
      >
        {/* Moon Base */}
        <div className="relative w-full h-full rounded-full bg-slate-600 shadow-2xl overflow-hidden">
          {/* Moon Phase (Illuminated Portion) */}
          <motion.div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${getMoonGradient()}`}
            style={{
              clipPath: `inset(0 ${(1 - moonPhase) * 100}% 0 0)`,
            }}
            animate={{
              clipPath: `inset(0 ${(1 - moonPhase) * 100}% 0 0)`,
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {/* Moon Craters (Spending Categories) */}
          {topCategories.slice(0, 4).map((category, i) => (
            <div
              key={category.name}
              className="absolute rounded-full bg-black/20"
              style={{
                width: `${8 + (category.amount / monthlySpending) * 15}px`,
                height: `${8 + (category.amount / monthlySpending) * 15}px`,
                top: `${20 + i * 20}%`,
                left: `${25 + (i % 2) * 30}%`,
              }}
            />
          ))}

          {/* Moon Glow Inner */}
          <div className={`
            absolute inset-2 rounded-full opacity-30
            ${isSpendingUp 
              ? 'bg-gradient-to-br from-amber-300/40 to-transparent' 
              : 'bg-gradient-to-br from-slate-300/40 to-transparent'
            }
          `} />
        </div>

        {/* Orbital Ring */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className={`
            absolute -top-2 -left-2 -right-2 -bottom-2 
            rounded-full border border-dashed opacity-30
            ${isSpendingUp ? 'border-amber-400' : 'border-slate-400'}
          `} />
        </motion.div>
      </motion.div>

      {/* Moon Label */}
      <motion.div 
        className="mt-4 md:mt-6 text-center px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg md:text-xl font-bold text-white mb-2">
          🌙 Moon of Spending
        </h3>
        <div className="text-2xl md:text-3xl font-bold text-white mb-1">
          {formatCurrency(monthlySpending)}
        </div>
        <div className={`text-sm ${isSpendingUp ? 'text-amber-300' : 'text-slate-300'}`}>
          {isSpendingUp ? '⬆️' : '⬇️'} {spendingChange >= 0 ? '+' : ''}{Math.abs(spendingChange).toFixed(1)}%
          {isSpendingUp ? ' increase' : ' decrease'}
        </div>
      </motion.div>

      {/* Top Spending Categories */}
      <motion.div 
        className="mt-4 grid grid-cols-2 gap-2 max-w-xs mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {topCategories.slice(0, 4).map((category, i) => (
          <motion.div
            key={category.name}
            className="bg-white/10 rounded-lg px-2 md:px-3 py-2 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div 
              className="w-2 h-2 md:w-3 md:h-3 rounded-full mb-1"
              style={{ backgroundColor: category.color }}
            />
            <div className="text-xs text-white/90 font-medium truncate">
              {category.name}
            </div>
            <div className="text-xs text-white/70">
              {formatCurrency(category.amount)}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Spending Particles */}
      {isSpendingUp && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full"
              style={{
                top: '30%',
                left: '50%',
              }}
              animate={{
                x: [0, (Math.cos(i * 60 * Math.PI / 180) * 60)],
                y: [0, (Math.sin(i * 60 * Math.PI / 180) * 60)],
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: Math.random() * 1.5,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
