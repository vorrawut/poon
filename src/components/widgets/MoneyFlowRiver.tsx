import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlowStream {
  id: string;
  name: string;
  type: "income" | "expense";
  amount: number;
  icon: string;
  color: string;
  path: string; // SVG path for the flow
  particles: FlowParticle[];
}

interface FlowParticle {
  id: string;
  x: number;
  y: number;
  speed: number;
  size: number;
  color: string;
}

interface MoneyFlowRiverProps {
  timelinePosition: number;
  selectedRange: "day" | "week" | "month" | "quarter" | "year";
  onStreamClick: (stream: FlowStream) => void;
  className?: string;
}

export function MoneyFlowRiver({
  timelinePosition,
  selectedRange: _selectedRange,
  onStreamClick,
  className = "",
}: MoneyFlowRiverProps) {
  const [flowAnimation, setFlowAnimation] = useState(true);
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [particles, setParticles] = useState<FlowParticle[]>([]);

  // Mock flow data
  const incomeStreams: FlowStream[] = [
    {
      id: "salary",
      name: "Salary",
      type: "income",
      amount: 85000,
      icon: "💼",
      color: "#3B82F6",
      path: "M 50 50 Q 200 100 350 150",
      particles: [],
    },
    {
      id: "freelance",
      name: "Freelance",
      type: "income",
      amount: 22000,
      icon: "💻",
      color: "#8B5CF6",
      path: "M 100 50 Q 200 80 350 150",
      particles: [],
    },
    {
      id: "investments",
      name: "Investment Returns",
      type: "income",
      amount: 8500,
      icon: "📈",
      color: "#10B981",
      path: "M 150 50 Q 200 60 350 150",
      particles: [],
    },
  ];

  const expenseStreams: FlowStream[] = [
    {
      id: "rent",
      name: "Rent",
      type: "expense",
      amount: 35000,
      icon: "🏠",
      color: "#EF4444",
      path: "M 350 200 Q 200 250 50 300",
      particles: [],
    },
    {
      id: "food",
      name: "Food & Dining",
      type: "expense",
      amount: 12000,
      icon: "🍔",
      color: "#F59E0B",
      path: "M 350 200 Q 200 280 100 300",
      particles: [],
    },
    {
      id: "transport",
      name: "Transportation",
      type: "expense",
      amount: 8500,
      icon: "🚗",
      color: "#EC4899",
      path: "M 350 200 Q 200 310 150 300",
      particles: [],
    },
    {
      id: "entertainment",
      name: "Entertainment",
      type: "expense",
      amount: 6000,
      icon: "🎬",
      color: "#8B5CF6",
      path: "M 350 200 Q 200 340 200 300",
      particles: [],
    },
  ];

  const allStreams = [...incomeStreams, ...expenseStreams];

  // Generate flowing particles
  useEffect(() => {
    if (!flowAnimation) return;

    const generateParticles = () => {
      const newParticles: FlowParticle[] = [];

      allStreams.forEach((stream) => {
        const particleCount = Math.max(1, Math.floor(stream.amount / 10000));

        for (let i = 0; i < particleCount; i++) {
          newParticles.push({
            id: `${stream.id}-${i}`,
            x:
              stream.type === "income"
                ? Math.random() * 200 + 50
                : Math.random() * 200 + 350,
            y:
              stream.type === "income"
                ? Math.random() * 50 + 50
                : Math.random() * 50 + 250,
            speed: 0.5 + Math.random() * 1.5,
            size: 2 + Math.random() * 4,
            color: stream.color,
          });
        }
      });

      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 2000);

    return () => clearInterval(interval);
  }, [flowAnimation, timelinePosition]);

  // Animate particles
  useEffect(() => {
    if (!flowAnimation) return;

    const animateParticles = () => {
      setParticles((prev) =>
        prev
          .map((particle) => {
            let newX = particle.x;
            let newY = particle.y;

            // Move towards center (river junction)
            const centerX = 350;
            const centerY = 175;

            const dx = centerX - particle.x;
            const dy = centerY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 5) {
              newX += (dx / distance) * particle.speed;
              newY += (dy / distance) * particle.speed;
            }

            return { ...particle, x: newX, y: newY };
          })
          .filter((particle) => {
            // Remove particles that reached the center
            const centerX = 350;
            const centerY = 175;
            const distance = Math.sqrt(
              (centerX - particle.x) ** 2 + (centerY - particle.y) ** 2,
            );
            return distance > 10;
          }),
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, [flowAnimation]);

  const getStreamWidth = (amount: number) => {
    return Math.max(8, Math.min(40, (amount / 100000) * 40));
  };

  const formatCurrency = (amount: number) => {
    return `฿${amount.toLocaleString()}`;
  };

  const totalIncome = incomeStreams.reduce(
    (sum, stream) => sum + stream.amount,
    0,
  );
  const totalExpenses = expenseStreams.reduce(
    (sum, stream) => sum + stream.amount,
    0,
  );
  const netFlow = totalIncome - totalExpenses;

  return (
    <div className={`relative ${className}`}>
      {/* River Container */}
      <motion.div
        className="relative w-full h-96 bg-gradient-to-br from-blue-900/20 to-green-900/20 rounded-2xl overflow-hidden border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Background Flow Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 400 400">
            <defs>
              <pattern
                id="flowPattern"
                patternUnits="userSpaceOnUse"
                width="40"
                height="40"
              >
                <circle cx="20" cy="20" r="1" fill="white" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#flowPattern)" />
          </svg>
        </div>

        {/* Main SVG for Flow Paths */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 700 400"
          className="absolute inset-0"
        >
          <defs>
            <linearGradient
              id="incomeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient
              id="expenseGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Income Streams */}
          {incomeStreams.map((stream, index) => (
            <g key={stream.id}>
              <motion.path
                d={`M ${100 + index * 80} 50 Q 350 100 350 175`}
                stroke={stream.color}
                strokeWidth={getStreamWidth(stream.amount)}
                fill="none"
                strokeLinecap="round"
                opacity={selectedStream === stream.id ? 1 : 0.7}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: index * 0.3 }}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedStream(
                    selectedStream === stream.id ? null : stream.id,
                  );
                  onStreamClick(stream);
                }}
              />

              {/* Flow Animation */}
              {flowAnimation && (
                <motion.circle r="3" fill={stream.color} opacity="0.8">
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    path={`M ${100 + index * 80} 50 Q 350 100 350 175`}
                  />
                </motion.circle>
              )}
            </g>
          ))}

          {/* Expense Streams */}
          {expenseStreams.map((stream, index) => (
            <g key={stream.id}>
              <motion.path
                d={`M 350 225 Q 350 300 ${100 + index * 120} 350`}
                stroke={stream.color}
                strokeWidth={getStreamWidth(stream.amount)}
                fill="none"
                strokeLinecap="round"
                opacity={selectedStream === stream.id ? 1 : 0.7}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: index * 0.3 + 1 }}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedStream(
                    selectedStream === stream.id ? null : stream.id,
                  );
                  onStreamClick(stream);
                }}
              />

              {/* Flow Animation */}
              {flowAnimation && (
                <motion.circle r="3" fill={stream.color} opacity="0.8">
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    path={`M 350 225 Q 350 300 ${100 + index * 120} 350`}
                  />
                </motion.circle>
              )}
            </g>
          ))}

          {/* Central Junction */}
          <motion.circle
            cx="350"
            cy="200"
            r="25"
            fill={netFlow >= 0 ? "#10B981" : "#EF4444"}
            opacity="0.8"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Net Flow Indicator */}
          <text
            x="350"
            y="205"
            textAnchor="middle"
            fill="white"
            fontSize="12"
            fontWeight="bold"
          >
            {netFlow >= 0 ? "💰" : "⚠️"}
          </text>
        </svg>

        {/* Floating Particles */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: particle.x,
                top: particle.y,
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </AnimatePresence>

        {/* Income Sources (Top) */}
        <div className="absolute top-4 left-4 right-4">
          <div className="flex justify-center gap-4">
            {incomeStreams.map((stream, index) => (
              <motion.div
                key={stream.id}
                className={`bg-white/10 backdrop-blur-sm rounded-lg p-3 cursor-pointer border ${
                  selectedStream === stream.id
                    ? "border-white/40"
                    : "border-white/20"
                }`}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
                onClick={() => {
                  setSelectedStream(
                    selectedStream === stream.id ? null : stream.id,
                  );
                  onStreamClick(stream);
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-center">
                  <div className="text-xl mb-1">{stream.icon}</div>
                  <div className="text-sm font-medium text-white">
                    {stream.name}
                  </div>
                  <div
                    className="text-xs font-bold"
                    style={{ color: stream.color }}
                  >
                    {formatCurrency(stream.amount)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Central Net Flow Display */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className={`bg-black/60 backdrop-blur-sm rounded-xl p-4 text-center border-2 ${
              netFlow >= 0 ? "border-green-400" : "border-red-400"
            }`}
            animate={{
              scale: [1, 1.02, 1],
              borderColor: netFlow >= 0 ? "#10B981" : "#EF4444",
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-2xl mb-1">{netFlow >= 0 ? "💎" : "⚠️"}</div>
            <div className="text-sm font-medium text-white">Net Flow</div>
            <div
              className={`text-lg font-bold ${netFlow >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {netFlow >= 0 ? "+" : ""}
              {formatCurrency(netFlow)}
            </div>
            <div className="text-xs text-white/70">
              {netFlow >= 0 ? "Surplus" : "Deficit"}
            </div>
          </motion.div>
        </div>

        {/* Expense Categories (Bottom) */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-center gap-3">
            {expenseStreams.map((stream, index) => (
              <motion.div
                key={stream.id}
                className={`bg-white/10 backdrop-blur-sm rounded-lg p-2 cursor-pointer border ${
                  selectedStream === stream.id
                    ? "border-white/40"
                    : "border-white/20"
                }`}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
                onClick={() => {
                  setSelectedStream(
                    selectedStream === stream.id ? null : stream.id,
                  );
                  onStreamClick(stream);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <div className="text-center">
                  <div className="text-lg mb-1">{stream.icon}</div>
                  <div className="text-xs font-medium text-white">
                    {stream.name}
                  </div>
                  <div
                    className="text-xs font-bold"
                    style={{ color: stream.color }}
                  >
                    -{formatCurrency(stream.amount)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Flow Controls */}
        <div className="absolute top-4 right-4">
          <motion.button
            onClick={() => setFlowAnimation(!flowAnimation)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              flowAnimation
                ? "bg-green-500/20 text-green-400 border border-green-400/30"
                : "bg-red-500/20 text-red-400 border border-red-400/30"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {flowAnimation ? "⏸️ Pause Flow" : "▶️ Start Flow"}
          </motion.button>
        </div>
      </motion.div>

      {/* Flow Summary */}
      <motion.div
        className="mt-4 grid grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">💰</div>
          <div className="text-sm font-medium text-white">Total Income</div>
          <div className="text-lg font-bold text-green-400">
            {formatCurrency(totalIncome)}
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">💸</div>
          <div className="text-sm font-medium text-white">Total Expenses</div>
          <div className="text-lg font-bold text-red-400">
            {formatCurrency(totalExpenses)}
          </div>
        </div>

        <div
          className={`${netFlow >= 0 ? "bg-blue-500/10 border-blue-500/30" : "bg-orange-500/10 border-orange-500/30"} border rounded-xl p-4 text-center`}
        >
          <div className="text-2xl mb-2">{netFlow >= 0 ? "💎" : "⚠️"}</div>
          <div className="text-sm font-medium text-white">Net Balance</div>
          <div
            className={`text-lg font-bold ${netFlow >= 0 ? "text-blue-400" : "text-orange-400"}`}
          >
            {netFlow >= 0 ? "+" : ""}
            {formatCurrency(netFlow)}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
