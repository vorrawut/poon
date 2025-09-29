import { motion } from "framer-motion";
import { cn } from "../../libs/utils";
import { useTheme } from "../../hooks/useTheme";
import { useAccessibility } from "../../hooks/useAccessibility";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const { isPlayMode, themeMode } = useTheme();
  const { accessibilityMode } = useAccessibility();

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const reduceMotion = accessibilityMode === "elder";

  return (
    <motion.div
      className={cn(
        "relative inline-block",
        sizeClasses[size],
        className
      )}
      animate={reduceMotion ? {} : { rotate: 360 }}
      transition={
        reduceMotion
          ? {}
          : {
              duration: isPlayMode ? 2 : 1,
              repeat: Infinity,
              ease: "linear",
            }
      }
    >
      {isPlayMode ? (
        // Cosmic loading spinner
        <div className="relative w-full h-full">
          {/* Outer ring */}
          <div
            className={cn(
              "absolute inset-0 rounded-full border-2 border-transparent",
              themeMode === "dark"
                ? "border-t-purple-400 border-r-blue-400"
                : "border-t-purple-600 border-r-blue-600",
              "animate-spin"
            )}
          />
          {/* Inner ring */}
          <div
            className={cn(
              "absolute inset-2 rounded-full border-2 border-transparent",
              themeMode === "dark"
                ? "border-b-pink-400 border-l-cyan-400"
                : "border-b-pink-600 border-l-cyan-600",
              "animate-spin",
              "animation-direction: reverse"
            )}
          />
          {/* Center dot */}
          <div
            className={cn(
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
              "w-1 h-1 rounded-full",
              themeMode === "dark" ? "bg-white" : "bg-gray-900",
              "animate-pulse"
            )}
          />
        </div>
      ) : (
        // Clarity mode simple spinner
        <div
          className={cn(
            "w-full h-full rounded-full border-2 border-transparent",
            "border-t-[var(--color-primary-500)] animate-spin"
          )}
        />
      )}
    </motion.div>
  );
}

interface UniverseLoadingProps {
  className?: string;
  message?: string;
}

export function UniverseLoading({ 
  className,
  message = "Loading your financial universe..."
}: UniverseLoadingProps) {
  const { isPlayMode, themeMode } = useTheme();
  const { accessibilityMode } = useAccessibility();

  const reduceMotion = accessibilityMode === "elder";

  if (isPlayMode) {
    return (
      <div
        className={cn(
          "relative w-full h-full min-h-screen overflow-hidden", // Full page height
          // Enhanced cosmic background with multiple layers
          themeMode === "dark"
            ? "bg-gradient-to-br from-slate-900 via-purple-900/90 to-indigo-900"
            : "bg-gradient-to-br from-blue-50 via-purple-50/90 to-indigo-100",
          className
        )}
      >
        {/* Animated cosmic background layers */}
        {!reduceMotion && (
          <>
            {/* Large floating nebula clouds */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`nebula-${i}`}
                className={cn(
                  "absolute rounded-full blur-3xl",
                  themeMode === "dark" 
                    ? "bg-gradient-to-r from-purple-500/10 via-pink-500/15 to-blue-500/10"
                    : "bg-gradient-to-r from-purple-300/20 via-pink-300/25 to-blue-300/20"
                )}
                style={{
                  width: `${200 + Math.random() * 300}px`,
                  height: `${200 + Math.random() * 300}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, 50, -30, 0],
                  y: [0, -30, 40, 0],
                  opacity: [0.3, 0.6, 0.4, 0.3],
                  scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}

            {/* Twinkling stars */}
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className={cn(
                  "absolute rounded-full",
                  themeMode === "dark" ? "bg-white" : "bg-purple-600"
                )}
                style={{
                  width: `${1 + Math.random() * 3}px`,
                  height: `${1 + Math.random() * 3}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}

            {/* Shooting stars */}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`shooting-${i}`}
                className={cn(
                  "absolute h-0.5 rounded-full",
                  themeMode === "dark" 
                    ? "bg-gradient-to-r from-transparent via-white to-transparent"
                    : "bg-gradient-to-r from-transparent via-purple-600 to-transparent"
                )}
                style={{
                  width: "80px",
                  left: "-80px",
                  top: `${Math.random() * 50}%`,
                }}
                animate={{
                  x: ["0px", "calc(100% + 160px)"],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 4 + Math.random() * 2,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}

        {/* Main content with enhanced layout */}
        <div className="flex flex-col items-center justify-center h-full relative z-10 px-8">
          <motion.div
            className="text-center max-w-2xl"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Enhanced cosmic loading animation */}
            <motion.div
              className="relative mb-12 mx-auto w-32 h-32 md:w-40 md:h-40"
              animate={reduceMotion ? {} : { rotate: 360 }}
              transition={
                reduceMotion
                  ? {}
                  : {
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear",
                    }
              }
            >
              {/* Outer orbital ring */}
              <motion.div
                className={cn(
                  "absolute inset-0 rounded-full border-2 border-transparent",
                  themeMode === "dark"
                    ? "border-t-purple-400 border-r-blue-400"
                    : "border-t-purple-600 border-r-blue-600"
                )}
                animate={reduceMotion ? {} : { rotate: -360 }}
                transition={
                  reduceMotion
                    ? {}
                    : {
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                      }
                }
              />
              
              {/* Middle ring */}
              <motion.div
                className={cn(
                  "absolute inset-4 rounded-full border-2 border-transparent",
                  themeMode === "dark"
                    ? "border-b-pink-400 border-l-cyan-400"
                    : "border-b-pink-600 border-l-cyan-600"
                )}
                animate={reduceMotion ? {} : { rotate: 360 }}
                transition={
                  reduceMotion
                    ? {}
                    : {
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }
                }
              />

              {/* Inner ring */}
              <motion.div
                className={cn(
                  "absolute inset-8 rounded-full border border-transparent",
                  themeMode === "dark"
                    ? "border-t-yellow-400 border-b-green-400"
                    : "border-t-yellow-600 border-b-green-600"
                )}
                animate={reduceMotion ? {} : { rotate: -360 }}
                transition={
                  reduceMotion
                    ? {}
                    : {
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }
                }
              />

              {/* Center galaxy with enhanced glow */}
              <motion.div
                className={cn(
                  "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                  "text-6xl md:text-7xl filter",
                  themeMode === "dark" ? "drop-shadow-[0_0_20px_rgba(147,51,234,0.5)]" : "drop-shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                )}
                animate={
                  reduceMotion
                    ? {}
                    : {
                        scale: [1, 1.3, 1],
                        opacity: [0.8, 1, 0.8],
                        rotate: [0, 180, 360],
                      }
                }
                transition={
                  reduceMotion
                    ? {}
                    : {
                        duration: 4,
                        repeat: Infinity,
                      }
                }
              >
                🌌
              </motion.div>

              {/* Orbiting planets */}
              {!reduceMotion && Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={`planet-${i}`}
                  className="absolute text-lg"
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <motion.div
                    className="relative"
                    style={{
                      transform: `translate(-50%, -50%) translateX(${60 + i * 15}px)`,
                    }}
                    animate={{
                      rotate: -360,
                    }}
                    transition={{
                      duration: 8 + i * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    {["💰", "📈", "🎯", "⭐"][i]}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced loading text */}
            <motion.div
              className={cn(
                "text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent",
                themeMode === "dark" 
                  ? "from-purple-400 via-pink-400 to-blue-400"
                  : "from-purple-600 via-pink-600 to-blue-600"
              )}
              animate={
                reduceMotion
                  ? {}
                  : {
                      opacity: [0.8, 1, 0.8],
                    }
              }
              transition={
                reduceMotion
                  ? {}
                  : {
                      duration: 3,
                      repeat: Infinity,
                    }
              }
            >
              {message}
            </motion.div>

            {/* Subtitle */}
            <motion.div
              className={cn(
                "text-lg md:text-xl mb-8 font-medium",
                themeMode === "dark" ? "text-purple-200" : "text-purple-800"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Preparing your cosmic financial journey...
            </motion.div>

            {/* Enhanced progress indicator */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className={cn(
                    "w-3 h-3 rounded-full",
                    themeMode === "dark" ? "bg-purple-400" : "bg-purple-600"
                  )}
                  animate={
                    reduceMotion
                      ? {}
                      : {
                          scale: [1, 2, 1],
                          opacity: [0.3, 1, 0.3],
                        }
                  }
                  transition={
                    reduceMotion
                      ? {}
                      : {
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }
                  }
                />
              ))}
            </div>

            {/* Loading percentage (simulated) */}
            <motion.div
              className={cn(
                "text-sm font-mono",
                themeMode === "dark" ? "text-purple-300" : "text-purple-700"
              )}
              animate={
                reduceMotion
                  ? {}
                  : {
                      opacity: [0.5, 1, 0.5],
                    }
              }
              transition={
                reduceMotion
                  ? {}
                  : {
                      duration: 1.5,
                      repeat: Infinity,
                    }
              }
            >
              Initializing financial data streams...
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Clarity mode loading - Enhanced page content experience
  return (
    <div
      className={cn(
        "relative w-full h-full min-h-screen flex flex-col items-center justify-center",
        "bg-[var(--color-bg-primary)]",
        className
      )}
    >
      <motion.div
        className="text-center max-w-lg px-8"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Enhanced loading spinner */}
        <div className="relative mb-8">
          <LoadingSpinner size="xl" className="mx-auto" />
          
          {/* Progress ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--color-primary-500)]"
            animate={reduceMotion ? {} : { rotate: 360 }}
            transition={
              reduceMotion
                ? {}
                : {
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }
            }
          />
        </div>
        
        {/* Main loading message */}
        <motion.div
          className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-4"
          animate={
            reduceMotion
              ? {}
              : {
                  opacity: [0.8, 1, 0.8],
                }
          }
          transition={
            reduceMotion
              ? {}
              : {
                  duration: 2.5,
                  repeat: Infinity,
                }
          }
        >
          {message}
        </motion.div>
        
        {/* Subtitle */}
        <motion.div
          className="text-lg text-[var(--color-text-secondary)] mb-8 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Preparing your financial data...
        </motion.div>

        {/* Progress dots */}
        <div className="flex justify-center items-center space-x-3 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-[var(--color-primary-500)]"
              animate={
                reduceMotion
                  ? {}
                  : {
                      scale: [1, 1.8, 1],
                      opacity: [0.4, 1, 0.4],
                    }
              }
              transition={
                reduceMotion
                  ? {}
                  : {
                      duration: 1.8,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }
              }
            />
          ))}
        </div>

        {/* Status text */}
        <motion.div
          className="text-sm font-mono text-[var(--color-text-tertiary)]"
          animate={
            reduceMotion
              ? {}
              : {
                  opacity: [0.6, 1, 0.6],
                }
          }
          transition={
            reduceMotion
              ? {}
              : {
                  duration: 2,
                  repeat: Infinity,
                }
          }
        >
          Loading components and data...
        </motion.div>
      </motion.div>

    </div>
  );
}

interface SkeletonProps {
  className?: string;
  variant?: "text" | "rectangular" | "circular";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ 
  className, 
  variant = "rectangular",
  width,
  height 
}: SkeletonProps) {
  const { isPlayMode, themeMode } = useTheme();

  const baseClasses = cn(
    "animate-pulse",
    isPlayMode && themeMode === "dark"
      ? "bg-gradient-to-r from-purple-900/30 via-purple-800/50 to-purple-900/30"
      : isPlayMode && themeMode === "light"
      ? "bg-gradient-to-r from-purple-100/50 via-purple-200/70 to-purple-100/50"
      : "bg-[var(--color-surface-secondary)]",
    {
      "rounded-full": variant === "circular",
      "rounded-md": variant === "rectangular",
      "rounded": variant === "text",
      "h-4": variant === "text" && !height,
    },
    className
  );

  const style = {
    width: width || (variant === "circular" ? "40px" : "100%"),
    height: height || (variant === "circular" ? "40px" : undefined),
  };

  return <div className={baseClasses} style={style} />;
}

interface CardSkeletonProps {
  className?: string;
  showAvatar?: boolean;
  lines?: number;
}

export function CardSkeleton({ 
  className, 
  showAvatar = false, 
  lines = 3 
}: CardSkeletonProps) {
  return (
    <div className={cn("p-6 space-y-4", className)}>
      {showAvatar && (
        <div className="flex items-center space-x-4">
          <Skeleton variant="circular" width={40} height={40} />
          <div className="space-y-2 flex-1">
            <Skeleton height={16} width="60%" />
            <Skeleton height={12} width="40%" />
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            height={12}
            width={i === lines - 1 ? "70%" : "100%"}
          />
        ))}
      </div>
    </div>
  );
}
