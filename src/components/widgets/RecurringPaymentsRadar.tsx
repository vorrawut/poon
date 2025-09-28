import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  TrendingUp,
  Zap,
} from "lucide-react";

interface RecurringPayment {
  id: string;
  name: string;
  amount: number;
  frequency: "weekly" | "monthly" | "quarterly" | "yearly";
  nextDue: Date;
  category: string;
  provider: string;
  status: "active" | "cancelled" | "paused";
  autoRenew: boolean;
  icon: string;
  color: string;
  lastCharged: Date;
  yearlyTotal: number;
}

interface RecurringPaymentsRadarProps {
  recurringPayments: RecurringPayment[];
  className?: string;
}

export function RecurringPaymentsRadar({
  recurringPayments,
  className = "",
}: RecurringPaymentsRadarProps) {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [radarSweep, setRadarSweep] = useState(0);
  const [showDueSoon, setShowDueSoon] = useState(false);
  const [viewMode, setViewMode] = useState<"radar" | "list">("radar");

  // Radar sweep animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarSweep((prev) => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Mock data for demonstration
  const mockRecurringPayments: RecurringPayment[] = [
    {
      id: "netflix",
      name: "Netflix",
      amount: 419,
      frequency: "monthly",
      nextDue: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
      category: "Entertainment",
      provider: "Netflix Inc.",
      status: "active",
      autoRenew: true,
      icon: "🎬",
      color: "#E50914",
      lastCharged: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
      yearlyTotal: 5028,
    },
    {
      id: "spotify",
      name: "Spotify Premium",
      amount: 149,
      frequency: "monthly",
      nextDue: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 days
      category: "Entertainment",
      provider: "Spotify AB",
      status: "active",
      autoRenew: true,
      icon: "🎵",
      color: "#1DB954",
      lastCharged: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
      yearlyTotal: 1788,
    },
    {
      id: "gym",
      name: "Fitness First",
      amount: 1200,
      frequency: "monthly",
      nextDue: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      category: "Health",
      provider: "Fitness First",
      status: "active",
      autoRenew: true,
      icon: "💪",
      color: "#FF6B35",
      lastCharged: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000),
      yearlyTotal: 14400,
    },
    {
      id: "insurance",
      name: "Car Insurance",
      amount: 2500,
      frequency: "quarterly",
      nextDue: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days
      category: "Insurance",
      provider: "AIA Thailand",
      status: "active",
      autoRenew: true,
      icon: "🚗",
      color: "#0066CC",
      lastCharged: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      yearlyTotal: 10000,
    },
    {
      id: "apple-music",
      name: "Apple Music",
      amount: 99,
      frequency: "monthly",
      nextDue: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 days
      category: "Entertainment",
      provider: "Apple Inc.",
      status: "cancelled",
      autoRenew: false,
      icon: "🎧",
      color: "#FA233B",
      lastCharged: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000),
      yearlyTotal: 0,
    },
  ];

  const payments =
    recurringPayments.length > 0 ? recurringPayments : mockRecurringPayments;

  const totalMonthly = payments
    .filter((p) => p.status === "active")
    .reduce((sum, payment) => {
      const multiplier = {
        weekly: 4.33,
        monthly: 1,
        quarterly: 1 / 3,
        yearly: 1 / 12,
      };
      return sum + payment.amount * multiplier[payment.frequency];
    }, 0);

  const totalYearly = payments
    .filter((p) => p.status === "active")
    .reduce((sum, payment) => sum + payment.yearlyTotal, 0);

  const getDaysUntilDue = (dueDate: Date) => {
    const now = new Date();
    const diffTime = dueDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getUrgencyLevel = (daysUntilDue: number) => {
    if (daysUntilDue <= 3) return "critical";
    if (daysUntilDue <= 7) return "warning";
    return "normal";
  };

  const getSatellitePosition = (index: number, radius: number) => {
    const angle =
      (index * (360 / payments.length) + radarSweep * 0.5) * (Math.PI / 180);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  const dueSoonPayments = payments.filter(
    (p) => getDaysUntilDue(p.nextDue) <= 7,
  );
  const duplicateServices = payments.filter(
    (p1, index, arr) =>
      arr.findIndex((p2) => p2.category === p1.category && p2.id !== p1.id) !==
      -1,
  );

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Recurring Radar
          </h3>
          <p className="text-white/70">
            Track subscriptions and recurring payments like satellites
          </p>
        </div>

        <div className="flex gap-2">
          <motion.button
            onClick={() => setShowDueSoon(!showDueSoon)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              showDueSoon
                ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Due Soon ({dueSoonPayments.length})
          </motion.button>

          <div className="flex bg-white/10 rounded-lg p-1">
            {(["radar", "list"] as const).map((mode) => (
              <motion.button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === mode
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts */}
      <AnimatePresence>
        {(dueSoonPayments.length > 0 || duplicateServices.length > 0) && (
          <motion.div
            className="mb-6 space-y-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {dueSoonPayments.length > 0 && (
              <motion.div
                className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  <span className="text-orange-400 font-bold">
                    {dueSoonPayments.length} Payment(s) Due Soon
                  </span>
                </div>
                <div className="text-white/80 text-sm">
                  {dueSoonPayments.map((p) => p.name).join(", ")} - Total: ฿
                  {dueSoonPayments
                    .reduce((sum, p) => sum + p.amount, 0)
                    .toLocaleString()}
                </div>
              </motion.div>
            )}

            {duplicateServices.length > 0 && (
              <motion.div
                className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-bold">
                    Potential Duplicates
                  </span>
                </div>
                <div className="text-white/80 text-sm">
                  You have multiple{" "}
                  {duplicateServices[0]?.category.toLowerCase()} subscriptions.
                  Consider consolidating to save money.
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Display */}
        <AnimatePresence mode="wait">
          {viewMode === "radar" ? (
            <motion.div
              key="radar"
              className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-2xl p-8 border border-white/10 relative overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Radar Background */}
              <div className="relative w-80 h-80 mx-auto">
                {/* Radar Circles */}
                {[1, 2, 3, 4].map((ring) => (
                  <div
                    key={ring}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-purple-500/30 rounded-full"
                    style={{
                      width: `${ring * 20}%`,
                      height: `${ring * 20}%`,
                    }}
                  />
                ))}

                {/* Radar Grid Lines */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-purple-500/30" />
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-purple-500/30" />

                {/* Radar Sweep */}
                <motion.div
                  className="absolute top-1/2 left-1/2 origin-bottom w-px h-40 bg-gradient-to-t from-purple-400 to-transparent"
                  style={{
                    transformOrigin: "bottom center",
                    transform: `translate(-50%, -100%) rotate(${radarSweep}deg)`,
                  }}
                />

                {/* Central Hub */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mb-2">
                    <RotateCcw className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-white font-bold text-sm">
                    ฿{totalMonthly.toLocaleString()}
                  </div>
                  <div className="text-white/60 text-xs">Monthly</div>
                </div>

                {/* Payment Satellites */}
                {payments.map((payment, index) => {
                  const position = getSatellitePosition(
                    index,
                    100 + (index % 3) * 20,
                  );
                  const daysUntilDue = getDaysUntilDue(payment.nextDue);
                  const urgency = getUrgencyLevel(daysUntilDue);
                  const isSelected = selectedPayment === payment.id;

                  return (
                    <motion.div
                      key={payment.id}
                      className="absolute top-1/2 left-1/2 cursor-pointer"
                      style={{
                        transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
                      }}
                      whileHover={{ scale: 1.2 }}
                      onClick={() =>
                        setSelectedPayment(isSelected ? null : payment.id)
                      }
                    >
                      {/* Satellite Orbit Trail */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          backgroundColor: payment.color + "40",
                          width: "32px",
                          height: "32px",
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.6, 0.2, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                      />

                      {/* Satellite */}
                      <div
                        className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm ${
                          payment.status === "active"
                            ? "border-white"
                            : "border-gray-500"
                        } ${
                          urgency === "critical"
                            ? "animate-pulse"
                            : urgency === "warning"
                              ? "animate-bounce"
                              : ""
                        }`}
                        style={{
                          backgroundColor: payment.color,
                          boxShadow: `0 0 20px ${payment.color}60`,
                        }}
                      >
                        {payment.icon}
                      </div>

                      {/* Status Indicator */}
                      <div className="absolute -top-1 -right-1">
                        {payment.status === "active" && (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        )}
                        {payment.status === "cancelled" && (
                          <XCircle className="w-3 h-3 text-red-400" />
                        )}
                        {urgency === "critical" && (
                          <AlertTriangle className="w-3 h-3 text-red-400" />
                        )}
                      </div>

                      {/* Payment Info Popup */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            className="absolute -top-32 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-md rounded-xl p-4 border border-white/20 min-w-48 z-10"
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                          >
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="text-lg">{payment.icon}</span>
                                <div className="text-white font-bold">
                                  {payment.name}
                                </div>
                              </div>

                              <div className="space-y-2 text-sm">
                                <div className="text-white/80">
                                  ฿{payment.amount.toLocaleString()} /{" "}
                                  {payment.frequency}
                                </div>
                                <div className="text-white/80">
                                  Due in {daysUntilDue} days
                                </div>
                                <div className="text-white/80">
                                  Yearly: ฿
                                  {payment.yearlyTotal.toLocaleString()}
                                </div>
                                <div
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    payment.status === "active"
                                      ? "bg-green-500/20 text-green-400"
                                      : "bg-red-500/20 text-red-400"
                                  }`}
                                >
                                  {payment.status.toUpperCase()}
                                </div>
                              </div>
                            </div>

                            {/* Tooltip Arrow */}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              {/* Radar Status */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 bg-purple-400 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-purple-400 text-sm font-medium">
                  TRACKING{" "}
                  {payments.filter((p) => p.status === "active").length}{" "}
                  SUBSCRIPTIONS
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {payments.map((payment, index) => {
                const daysUntilDue = getDaysUntilDue(payment.nextDue);
                const urgency = getUrgencyLevel(daysUntilDue);

                return (
                  <motion.div
                    key={payment.id}
                    className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border transition-all ${
                      urgency === "critical"
                        ? "border-red-500/30 bg-red-500/5"
                        : urgency === "warning"
                          ? "border-orange-500/30 bg-orange-500/5"
                          : "border-white/10"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                          style={{ backgroundColor: payment.color + "20" }}
                        >
                          {payment.icon}
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {payment.name}
                          </div>
                          <div className="text-white/60 text-sm">
                            {payment.provider}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-white font-bold">
                          ฿{payment.amount.toLocaleString()}
                        </div>
                        <div className="text-white/60 text-sm">
                          {payment.frequency}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-white/60" />
                          <span className="text-white/80">
                            Due in {daysUntilDue} days
                          </span>
                        </div>
                        <div
                          className={`px-2 py-1 rounded-full text-xs ${
                            payment.status === "active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {payment.status.toUpperCase()}
                        </div>
                      </div>

                      <div className="text-white/60">
                        ฿{payment.yearlyTotal.toLocaleString()}/year
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Summary Stats */}
        <div className="space-y-6">
          {/* Total Spending */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h4 className="text-lg font-bold text-white mb-4">
              Subscription Summary
            </h4>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Monthly Total</span>
                <span className="text-white font-bold text-xl">
                  ฿{totalMonthly.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Yearly Total</span>
                <span className="text-white font-bold text-xl">
                  ฿{totalYearly.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Active Subscriptions</span>
                <span className="text-white font-bold">
                  {payments.filter((p) => p.status === "active").length}
                </span>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h4 className="text-lg font-bold text-white mb-4">By Category</h4>

            <div className="space-y-3">
              {Object.entries(
                payments.reduce(
                  (acc, payment) => {
                    if (!acc[payment.category]) {
                      acc[payment.category] = { total: 0, count: 0 };
                    }
                    if (payment.status === "active") {
                      const multiplier = {
                        weekly: 4.33,
                        monthly: 1,
                        quarterly: 1 / 3,
                        yearly: 1 / 12,
                      };
                      acc[payment.category].total +=
                        payment.amount * multiplier[payment.frequency];
                      acc[payment.category].count++;
                    }
                    return acc;
                  },
                  {} as Record<string, { total: number; count: number }>,
                ),
              )
                .sort(([, a], [, b]) => b.total - a.total)
                .map(([category, data], index) => (
                  <motion.div
                    key={category}
                    className="flex justify-between items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div>
                      <span className="text-white font-medium">{category}</span>
                      <span className="text-white/60 text-sm ml-2">
                        ({data.count} services)
                      </span>
                    </div>
                    <span className="text-white/80">
                      ฿{data.total.toLocaleString()}/mo
                    </span>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Optimization Tips */}
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Optimization Tips
            </h4>

            <div className="space-y-3 text-sm">
              <div className="text-white/80">
                • Cancel unused subscriptions to save ฿
                {payments
                  .filter((p) => p.status === "cancelled")
                  .reduce((sum, p) => sum + p.amount, 0)
                  .toLocaleString()}{" "}
                monthly
              </div>
              <div className="text-white/80">
                • Consider annual plans for 15-20% savings
              </div>
              <div className="text-white/80">
                • Review subscriptions quarterly to avoid price increases
              </div>
              {duplicateServices.length > 0 && (
                <div className="text-yellow-400">
                  • You have duplicate{" "}
                  {duplicateServices[0]?.category.toLowerCase()} services -
                  consolidate to save money
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
