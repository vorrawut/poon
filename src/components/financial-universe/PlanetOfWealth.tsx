import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface PlanetOfWealthProps {
  netWorth: number;
  previousNetWorth: number;
  growth: number;
  className?: string;
}

export function PlanetOfWealth({
  netWorth,
  previousNetWorth: _previousNetWorth,
  growth,
  className = "",
}: PlanetOfWealthProps) {
  const controls = useAnimation();
  const [isGrowing, setIsGrowing] = useState(growth >= 0);
  const [planetSize, setPlanetSize] = useState(100);

  // Calculate planet size based on net worth (more wealth = bigger planet)
  useEffect(() => {
    const baseSize = 100;
    const wealthMultiplier =
      Math.log(Math.max(netWorth, 1000)) / Math.log(1000);
    const newSize = baseSize + wealthMultiplier * 20;
    setPlanetSize(Math.min(newSize, 200)); // Cap at 200px
  }, [netWorth]);

  // Animate planet based on growth
  useEffect(() => {
    setIsGrowing(growth >= 0);

    if (growth >= 0) {
      // Growing - pulsing glow animation
      controls.start({
        scale: [1, 1.05, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    } else {
      // Shrinking - gentle warning glow
      controls.start({
        scale: [1, 0.95, 1],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    }
  }, [growth, controls]);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div
      className={`relative flex flex-col items-center p-16 min-w-[350px] min-h-[350px] overflow-visible ${className}`}
    >
      {/* Background Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Planet */}
      <motion.div
        className="relative"
        animate={controls}
        style={{ width: planetSize, height: planetSize }}
      >
        {/* Planet Core */}
        <div
          className={`
            relative w-full h-full rounded-full
            ${
              isGrowing
                ? "bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600"
                : "bg-gradient-to-br from-orange-400 via-red-500 to-orange-600"
            }
            shadow-2xl overflow-hidden
          `}
        >
          {/* Planet Surface Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent opacity-20" />

          {/* Rotating Ring Effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white opacity-30"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Inner Glow */}
          <div
            className={`
            absolute inset-2 rounded-full
            ${
              isGrowing
                ? "bg-gradient-to-br from-emerald-300/40 to-transparent"
                : "bg-gradient-to-br from-orange-300/40 to-transparent"
            }
          `}
          />
        </div>

        {/* Orbital Elements */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: -360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className={`
            absolute -top-1 -left-1 -right-1 -bottom-1 
            rounded-full border border-dashed opacity-50
            ${isGrowing ? "border-emerald-400" : "border-orange-400"}
          `}
          />
        </motion.div>
      </motion.div>

      {/* Planet Label */}
      <motion.div
        className="mt-4 md:mt-6 text-center px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg md:text-2xl font-bold text-white mb-2">
          🌍 Planet of Wealth
        </h3>
        <div className="text-2xl md:text-4xl font-bold text-white mb-1">
          {formatCurrency(netWorth)}
        </div>
        <div
          className={`text-sm md:text-lg ${isGrowing ? "text-emerald-300" : "text-orange-300"}`}
        >
          {isGrowing ? "📈" : "📉"} {growth >= 0 ? "+" : ""}
          {formatCurrency(growth)}
          {isGrowing ? " growth" : " decline"}
        </div>
      </motion.div>

      {/* Growth Particles */}
      {isGrowing && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400 rounded-full"
              style={{
                top: "50%",
                left: "50%",
              }}
              animate={{
                x: [0, Math.cos((i * 45 * Math.PI) / 180) * 80],
                y: [0, Math.sin((i * 45 * Math.PI) / 180) * 80],
                opacity: [1, 0],
                scale: [0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
