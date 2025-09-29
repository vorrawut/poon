import { motion } from "framer-motion";
import { useTheme } from "../../core";

interface EnhancedCosmicBackgroundProps {
  starCount?: number;
  showNebula?: boolean;
  showShootingStars?: boolean;
  className?: string;
}

export function EnhancedCosmicBackground({
  starCount = 150,
  showNebula = true,
  showShootingStars = true,
  className = "",
}: EnhancedCosmicBackgroundProps) {
  const { themeMode } = useTheme();

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Enhanced Star Field */}
      <div className="absolute inset-0">
        {[...Array(starCount)].map((_, i) => {
          const size = Math.random() * 3 + 0.5;
          const brightness = Math.random();
          const animationDuration = 2 + Math.random() * 6;
          const delay = Math.random() * 4;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: themeMode === "dark" ? "#ffffff" : "#1e293b",
                boxShadow:
                  brightness > 0.8
                    ? `0 0 ${size * 2}px rgba(255, 255, 255, 0.8)`
                    : "none",
              }}
              animate={{
                opacity: [brightness * 0.3, brightness, brightness * 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: animationDuration,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Shooting Stars */}
      {showShootingStars && (
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`shooting-${i}`}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
              style={{
                width: "100px",
                top: `${20 + Math.random() * 60}%`,
                left: "-100px",
                transform: "rotate(-30deg)",
              }}
              animate={{
                x: ["0px", "calc(100vw + 200px)"],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 8 + Math.random() * 5,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Enhanced Nebula Clouds */}
      {showNebula && (
        <div className="absolute inset-0">
          {/* Primary Nebula */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: `radial-gradient(circle, 
                ${themeMode === "dark" ? "#8B5CF6" : "#6366F1"}40 0%, 
                ${themeMode === "dark" ? "#3B82F6" : "#8B5CF6"}20 30%, 
                transparent 70%)`,
              top: "10%",
              left: "15%",
              filter: "blur(60px)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360],
            }}
            transition={{
              scale: { duration: 20, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 100, repeat: Infinity, ease: "linear" },
            }}
          />

          {/* Secondary Nebula */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full opacity-15"
            style={{
              background: `radial-gradient(circle, 
                ${themeMode === "dark" ? "#EC4899" : "#F59E0B"}30 0%, 
                ${themeMode === "dark" ? "#F59E0B" : "#EC4899"}15 40%, 
                transparent 70%)`,
              bottom: "20%",
              right: "10%",
              filter: "blur(40px)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [360, 0],
            }}
            transition={{
              scale: { duration: 15, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 80, repeat: Infinity, ease: "linear" },
            }}
          />

          {/* Tertiary Nebula */}
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, 
                ${themeMode === "dark" ? "#10B981" : "#06B6D4"}25 0%, 
                ${themeMode === "dark" ? "#06B6D4" : "#10B981"}12 50%, 
                transparent 70%)`,
              top: "60%",
              left: "60%",
              filter: "blur(50px)",
            }}
            animate={{
              scale: [1, 1.15, 1],
              x: [0, 20, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      )}

      {/* Cosmic Dust Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-1 h-1 rounded-full opacity-30"
            style={{
              backgroundColor: themeMode === "dark" ? "#94A3B8" : "#475569",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Distant Galaxy Glow */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-32 h-32 rounded-full opacity-5"
          style={{
            background: `radial-gradient(circle, white 0%, transparent 70%)`,
            top: "5%",
            right: "5%",
            filter: "blur(20px)",
          }}
          animate={{
            opacity: [0.05, 0.15, 0.05],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
