import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Smartphone, Banknote, Building2, TrendingUp, AlertTriangle } from "lucide-react";

interface PaymentMethod {
  id: string;
  name: string;
  type: "credit" | "debit" | "ewallet" | "cash" | "bank";
  amount: number;
  transactions: number;
  avgTransaction: number;
  color: string;
  icon: string;
  trend: "up" | "down" | "stable";
  trendPercent: number;
  lastUsed: Date;
}

interface PaymentMethodRadarProps {
  paymentMethods: PaymentMethod[];
  className?: string;
}

export function PaymentMethodRadar({
  paymentMethods,
  className = "",
}: PaymentMethodRadarProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [radarSweep, setRadarSweep] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  // Radar sweep animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarSweep(prev => (prev + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const totalAmount = paymentMethods.reduce((sum, method) => sum + method.amount, 0);
  const maxAmount = Math.max(...paymentMethods.map(method => method.amount));

  const getMethodIcon = (type: string) => {
    switch (type) {
      case "credit":
      case "debit":
        return <CreditCard className="w-5 h-5" />;
      case "ewallet":
        return <Smartphone className="w-5 h-5" />;
      case "cash":
        return <Banknote className="w-5 h-5" />;
      case "bank":
        return <Building2 className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  const getRadarPosition = (index: number, radius: number) => {
    const angle = (index * (360 / paymentMethods.length)) * (Math.PI / 180);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  const getSignalStrength = (amount: number) => {
    return (amount / maxAmount) * 100;
  };

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Payment Radar</h3>
          <p className="text-white/70">Track spending across all payment methods</p>
        </div>
        
        <motion.button
          onClick={() => setShowComparison(!showComparison)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showComparison ? "Hide Comparison" : "Compare Methods"}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Display */}
        <div className="relative">
          <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-2xl p-8 border border-white/10 relative overflow-hidden">
            {/* Radar Background */}
            <div className="relative w-80 h-80 mx-auto">
              {/* Radar Circles */}
              {[1, 2, 3, 4].map((ring) => (
                <div
                  key={ring}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-green-500/30 rounded-full"
                  style={{
                    width: `${ring * 20}%`,
                    height: `${ring * 20}%`,
                  }}
                />
              ))}

              {/* Radar Grid Lines */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-green-500/30" />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-green-500/30" />
              <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 border border-green-500/20 rounded-full" />

              {/* Radar Sweep */}
              <motion.div
                className="absolute top-1/2 left-1/2 origin-bottom w-px h-40 bg-gradient-to-t from-green-400 to-transparent"
                style={{
                  transformOrigin: "bottom center",
                  transform: `translate(-50%, -100%) rotate(${radarSweep}deg)`,
                }}
              />

              {/* Payment Method Blips */}
              {paymentMethods.map((method, index) => {
                const position = getRadarPosition(index, 120);
                const signalStrength = getSignalStrength(method.amount);
                const isSelected = selectedMethod === method.id;

                return (
                  <motion.div
                    key={method.id}
                    className="absolute top-1/2 left-1/2 cursor-pointer"
                    style={{
                      transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
                    }}
                    whileHover={{ scale: 1.3 }}
                    onClick={() => setSelectedMethod(isSelected ? null : method.id)}
                  >
                    {/* Signal Pulse */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: method.color }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.8, 0.3, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />

                    {/* Method Blip */}
                    <div
                      className="relative w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs"
                      style={{ 
                        backgroundColor: method.color,
                        boxShadow: `0 0 20px ${method.color}60`
                      }}
                    >
                      {method.icon}
                    </div>

                    {/* Signal Strength Indicator */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                      <div className="w-12 h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: method.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${signalStrength}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                    </div>

                    {/* Method Info Popup */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-md rounded-xl p-4 border border-white/20 min-w-48 z-10"
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        >
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <div style={{ color: method.color }}>
                                {getMethodIcon(method.type)}
                              </div>
                              <div className="text-white font-bold">{method.name}</div>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <div className="text-white/80">
                                Total: ฿{method.amount.toLocaleString()}
                              </div>
                              <div className="text-white/80">
                                Transactions: {method.transactions}
                              </div>
                              <div className="text-white/80">
                                Avg: ฿{method.avgTransaction.toLocaleString()}
                              </div>
                              <div className="flex items-center justify-center gap-1">
                                {method.trend === "up" && <TrendingUp className="w-3 h-3 text-red-400" />}
                                {method.trend === "down" && <TrendingUp className="w-3 h-3 text-green-400 rotate-180" />}
                                <span className={`text-xs ${
                                  method.trend === "up" ? "text-red-400" : 
                                  method.trend === "down" ? "text-green-400" : "text-white/60"
                                }`}>
                                  {method.trend === "stable" ? "Stable" : `${method.trendPercent}%`}
                                </span>
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

              {/* Center Display */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white text-xl">💳</span>
                </div>
                <div className="text-white font-bold text-lg">
                  ฿{totalAmount.toLocaleString()}
                </div>
                <div className="text-white/60 text-xs">Total Spent</div>
              </div>
            </div>

            {/* Radar Status */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-green-400 text-sm font-medium">SCANNING</span>
            </div>
          </div>
        </div>

        {/* Payment Method Stats */}
        <div className="space-y-4">
          {paymentMethods.map((method, index) => {
            const percentage = (method.amount / totalAmount) * 100;
            
            return (
              <motion.div
                key={method.id}
                className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border transition-all cursor-pointer ${
                  selectedMethod === method.id 
                    ? "border-white/30 bg-white/10" 
                    : "border-white/10 hover:border-white/20"
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedMethod(selectedMethod === method.id ? null : method.id)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: method.color + "20" }}
                    >
                      <div style={{ color: method.color }}>
                        {getMethodIcon(method.type)}
                      </div>
                    </div>
                    <div>
                      <div className="text-white font-medium">{method.name}</div>
                      <div className="text-white/60 text-sm">{method.type.toUpperCase()}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-white font-bold">
                      ฿{method.amount.toLocaleString()}
                    </div>
                    <div className="text-white/60 text-sm">
                      {percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-2 mb-3">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: method.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>

                {/* Method Details */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-white/60">Transactions</div>
                    <div className="text-white font-medium">{method.transactions}</div>
                  </div>
                  <div>
                    <div className="text-white/60">Avg Amount</div>
                    <div className="text-white font-medium">฿{method.avgTransaction.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-white/60">Trend</div>
                    <div className={`font-medium flex items-center gap-1 ${
                      method.trend === "up" ? "text-red-400" : 
                      method.trend === "down" ? "text-green-400" : "text-white"
                    }`}>
                      {method.trend === "up" && <TrendingUp className="w-3 h-3" />}
                      {method.trend === "down" && <TrendingUp className="w-3 h-3 rotate-180" />}
                      {method.trend === "stable" ? "Stable" : `${method.trendPercent}%`}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Comparison Mode */}
      <AnimatePresence>
        {showComparison && (
          <motion.div
            className="mt-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h4 className="text-xl font-bold text-white mb-4">Payment Method Analysis</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "Most Used",
                  method: paymentMethods.reduce((max, method) => 
                    method.transactions > max.transactions ? method : max
                  ),
                  icon: "🏆",
                  color: "#F59E0B"
                },
                {
                  title: "Highest Spending",
                  method: paymentMethods.reduce((max, method) => 
                    method.amount > max.amount ? method : max
                  ),
                  icon: "💰",
                  color: "#EF4444"
                },
                {
                  title: "Largest Transactions",
                  method: paymentMethods.reduce((max, method) => 
                    method.avgTransaction > max.avgTransaction ? method : max
                  ),
                  icon: "📊",
                  color: "#8B5CF6"
                },
                {
                  title: "Growing Fast",
                  method: paymentMethods
                    .filter(m => m.trend === "up")
                    .reduce((max, method) => 
                      method.trendPercent > max.trendPercent ? method : max, 
                      paymentMethods.find(m => m.trend === "up") || paymentMethods[0]
                    ),
                  icon: "🚀",
                  color: "#10B981"
                }
              ].map((insight, index) => (
                <motion.div
                  key={insight.title}
                  className="bg-white/5 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-2xl mb-2">{insight.icon}</div>
                  <div className="text-white font-bold text-sm mb-1">{insight.title}</div>
                  <div className="text-white/80 text-xs">{insight.method.name}</div>
                </motion.div>
              ))}
            </div>

            {/* Smart Alerts */}
            <div className="mt-6 space-y-3">
              <h5 className="text-white font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                Smart Alerts
              </h5>
              
              {paymentMethods
                .filter(method => method.trend === "up" && method.trendPercent > 20)
                .map((method, index) => (
                  <motion.div
                    key={method.id}
                    className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-yellow-400 text-sm">
                      <strong>{method.name}</strong> spending increased by {method.trendPercent}% this month. 
                      Consider reviewing recent transactions.
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
