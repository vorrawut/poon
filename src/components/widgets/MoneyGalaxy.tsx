import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FinancialPlanet {
  id: string;
  name: string;
  category: "income" | "expense" | "savings" | "investment";
  amount: number;
  icon: string;
  color: string;
  orbit: number; // Distance from center (1-5)
  angle: number; // Position in orbit (0-360)
  size: number; // Relative size based on amount
  trend: "up" | "down" | "stable";
  monthlyData: number[]; // Historical data for animation
}

interface MoneyGalaxyProps {
  timelinePosition: number; // 0-100%
  selectedRange: "day" | "week" | "month" | "quarter" | "year";
  onPlanetClick: (planet: FinancialPlanet) => void;
  className?: string;
}

export function MoneyGalaxy({
  timelinePosition,
  selectedRange,
  onPlanetClick,
  className = "",
}: MoneyGalaxyProps) {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [galaxyRotation, setGalaxyRotation] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Mock financial planets data
  const planets: FinancialPlanet[] = [
    {
      id: "salary",
      name: "Salary",
      category: "income",
      amount: 85000,
      icon: "💼",
      color: "#3B82F6",
      orbit: 2,
      angle: 0,
      size: 80,
      trend: "up",
      monthlyData: [80000, 82000, 85000, 85000, 87000, 85000],
    },
    {
      id: "freelance",
      name: "Freelance",
      category: "income",
      amount: 22000,
      icon: "💻",
      color: "#8B5CF6",
      orbit: 2.5,
      angle: 60,
      size: 45,
      trend: "up",
      monthlyData: [15000, 18000, 20000, 22000, 25000, 22000],
    },
    {
      id: "rent",
      name: "Rent",
      category: "expense",
      amount: 35000,
      icon: "🏠",
      color: "#EF4444",
      orbit: 3,
      angle: 120,
      size: 60,
      trend: "stable",
      monthlyData: [35000, 35000, 35000, 35000, 35000, 35000],
    },
    {
      id: "food",
      name: "Food",
      category: "expense",
      amount: 12000,
      icon: "🍔",
      color: "#F59E0B",
      orbit: 3.5,
      angle: 180,
      size: 35,
      trend: "down",
      monthlyData: [15000, 14000, 13000, 12000, 11000, 12000],
    },
    {
      id: "investments",
      name: "Investments",
      category: "investment",
      amount: 25000,
      icon: "📈",
      color: "#10B981",
      orbit: 4,
      angle: 240,
      size: 50,
      trend: "up",
      monthlyData: [20000, 21000, 23000, 25000, 27000, 25000],
    },
    {
      id: "savings",
      name: "Savings",
      category: "savings",
      amount: 18000,
      icon: "💰",
      color: "#06B6D4",
      orbit: 4.5,
      angle: 300,
      size: 40,
      trend: "up",
      monthlyData: [15000, 16000, 17000, 18000, 19000, 18000],
    },
  ];

  // Animate galaxy rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setGalaxyRotation((prev) => (prev + 0.5) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Calculate planet position based on timeline
  const getPlanetData = (planet: FinancialPlanet) => {
    const timeIndex = Math.floor(
      (timelinePosition / 100) * (planet.monthlyData.length - 1),
    );
    const amount = planet.monthlyData[timeIndex] || planet.amount;
    const size = Math.max(20, (amount / 100000) * 80);

    return { ...planet, amount, size };
  };

  const getPlanetPosition = (planet: FinancialPlanet) => {
    const centerX = 200;
    const centerY = 200;
    const orbitRadius = planet.orbit * 40 * zoomLevel;
    const totalAngle = planet.angle + galaxyRotation + timelinePosition * 2;

    const x = centerX + orbitRadius * Math.cos((totalAngle * Math.PI) / 180);
    const y = centerY + orbitRadius * Math.sin((totalAngle * Math.PI) / 180);

    return { x, y };
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "#10B981";
      case "down":
        return "#EF4444";
      case "stable":
        return "#6B7280";
      default:
        return "#6B7280";
    }
  };

  const getBackgroundGradient = () => {
    // Change background based on timeline position
    const colors = [
      "from-red-900/30 to-orange-900/30", // Past deficit
      "from-yellow-900/30 to-green-900/30", // Transition
      "from-green-900/30 to-blue-900/30", // Current surplus
      "from-blue-900/30 to-purple-900/30", // Future growth
    ];

    const colorIndex = Math.floor(
      (timelinePosition / 100) * (colors.length - 1),
    );
    return colors[colorIndex] || colors[0];
  };

  return (
    <div className={`relative ${className}`}>
      {/* Galaxy Container */}
      <motion.div
        className={`relative w-full h-96 rounded-2xl overflow-hidden bg-gradient-to-br ${getBackgroundGradient()} border border-white/10`}
        animate={{
          background: getBackgroundGradient(),
        }}
        transition={{ duration: 1 }}
      >
        {/* Stars Background */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
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

        {/* Central Sun (Net Worth) */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: galaxyRotation,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity },
          }}
        >
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
            <span className="text-2xl">☀️</span>
            <div className="absolute inset-0 rounded-full bg-yellow-400/30 animate-ping" />
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <div className="text-sm font-bold text-white">Net Worth</div>
            <div className="text-xs text-white/70">
              ฿{(125000).toLocaleString()}
            </div>
          </div>
        </motion.div>

        {/* Orbit Rings */}
        {[1, 2, 3, 4, 5].map((orbit) => (
          <motion.div
            key={orbit}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full"
            style={{
              width: `${orbit * 80 * zoomLevel}px`,
              height: `${orbit * 80 * zoomLevel}px`,
            }}
            animate={{ rotate: galaxyRotation / orbit }}
            transition={{
              duration: 20 / orbit,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Financial Planets */}
        <AnimatePresence>
          {planets.map((planet) => {
            const planetData = getPlanetData(planet);
            const position = getPlanetPosition(planetData);

            return (
              <motion.div
                key={planet.id}
                className="absolute cursor-pointer"
                style={{
                  left: position.x,
                  top: position.y,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: selectedPlanet === planet.id ? 1.3 : 1,
                  x: position.x - 200,
                  y: position.y - 200,
                }}
                exit={{ opacity: 0, scale: 0 }}
                whileHover={{ scale: 1.2, z: 10 }}
                onClick={() => {
                  setSelectedPlanet(
                    selectedPlanet === planet.id ? null : planet.id,
                  );
                  onPlanetClick(planetData);
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Planet Body */}
                <div
                  className="relative rounded-full flex items-center justify-center shadow-lg border-2"
                  style={{
                    width: `${planetData.size}px`,
                    height: `${planetData.size}px`,
                    backgroundColor: planet.color,
                    borderColor: getTrendColor(planet.trend),
                  }}
                >
                  <span className="text-lg">{planet.icon}</span>

                  {/* Trend Indicator */}
                  <div
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                    style={{ backgroundColor: getTrendColor(planet.trend) }}
                  />

                  {/* Glow Effect */}
                  <div
                    className="absolute inset-0 rounded-full opacity-30 animate-pulse"
                    style={{ backgroundColor: planet.color }}
                  />
                </div>

                {/* Planet Info */}
                <AnimatePresence>
                  {selectedPlanet === planet.id && (
                    <motion.div
                      className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-lg p-3 min-w-32 text-center border border-white/20"
                      initial={{ opacity: 0, y: -10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.8 }}
                    >
                      <div className="text-sm font-bold text-white">
                        {planet.name}
                      </div>
                      <div className="text-xs text-white/70 capitalize">
                        {planet.category}
                      </div>
                      <div
                        className="text-sm font-bold"
                        style={{ color: planet.color }}
                      >
                        ฿{planetData.amount.toLocaleString()}
                      </div>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: getTrendColor(planet.trend),
                          }}
                        />
                        <span className="text-xs text-white/60 capitalize">
                          {planet.trend}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Galaxy Controls */}
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.button
            onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.2))}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🔍-
          </motion.button>
          <motion.button
            onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.2))}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🔍+
          </motion.button>
        </div>

        {/* Time Period Indicator */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-2">
          <div className="text-sm font-bold text-white">
            {selectedRange === "month"
              ? "Monthly View"
              : selectedRange === "quarter"
                ? "Quarterly View"
                : selectedRange === "year"
                  ? "Yearly View"
                  : "Daily View"}
          </div>
          <div className="text-xs text-white/70">
            Timeline: {timelinePosition.toFixed(0)}%
          </div>
        </div>
      </motion.div>

      {/* Galaxy Legend */}
      <motion.div
        className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {["income", "expense", "savings", "investment"].map((category) => {
          const categoryPlanets = planets.filter(
            (p) => p.category === category,
          );
          const totalAmount = categoryPlanets.reduce(
            (sum, p) => sum + getPlanetData(p).amount,
            0,
          );

          const categoryColors = {
            income: "#3B82F6",
            expense: "#EF4444",
            savings: "#06B6D4",
            investment: "#10B981",
          };

          return (
            <motion.div
              key={category}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10"
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div
                className="w-4 h-4 rounded-full mx-auto mb-2"
                style={{
                  backgroundColor:
                    categoryColors[category as keyof typeof categoryColors],
                }}
              />
              <div className="text-sm font-bold text-white capitalize">
                {category}
              </div>
              <div className="text-xs text-white/70">
                ฿{totalAmount.toLocaleString()}
              </div>
              <div className="text-xs text-white/50">
                {categoryPlanets.length} items
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
