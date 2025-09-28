import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, TrendingUp, DollarSign, Clock } from "lucide-react";

interface IncomeSource {
  id: string;
  name: string;
  amount: number;
  type: "salary" | "freelance" | "business" | "investment" | "other";
  frequency: "monthly" | "weekly" | "bi-weekly" | "yearly" | "one-time";
  nextPayment?: string;
  color: string;
  icon: string;
  growth?: number;
  isRecurring: boolean;
}

interface IncomeBreakdownCardProps {
  incomes: IncomeSource[];
  viewMode?: "play" | "clarity";
  className?: string;
}

export function IncomeBreakdownCard({
  incomes,
  viewMode = "play",
  className = "",
}: IncomeBreakdownCardProps) {
  const [selectedIncome, setSelectedIncome] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const recurringIncome = incomes
    .filter(income => income.isRecurring)
    .reduce((sum, income) => sum + income.amount, 0);
  const oneTimeIncome = totalIncome - recurringIncome;

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  const getFrequencyEmoji = (frequency: string) => {
    switch (frequency) {
      case "monthly": return "📅";
      case "weekly": return "🗓️";
      case "bi-weekly": return "📋";
      case "yearly": return "🎯";
      case "one-time": return "⚡";
      default: return "💰";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "salary": return "text-blue-400";
      case "freelance": return "text-purple-400";
      case "business": return "text-green-400";
      case "investment": return "text-yellow-400";
      default: return "text-gray-400";
    }
  };

  // Generate calendar days with payday highlights
  const generateCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isPayday = incomes.some(income => {
        if (!income.nextPayment) return false;
        const paymentDate = new Date(income.nextPayment);
        return paymentDate.getDate() === day && paymentDate.getMonth() === currentMonth;
      });
      
      const paydayIncomes = incomes.filter(income => {
        if (!income.nextPayment) return false;
        const paymentDate = new Date(income.nextPayment);
        return paymentDate.getDate() === day && paymentDate.getMonth() === currentMonth;
      });
      
      days.push({
        day,
        isPayday,
        paydayIncomes,
        isToday: day === today.getDate()
      });
    }
    
    return days;
  };

  return (
    <div className={`${className}`}>
      <div
        className={`rounded-2xl p-6 border ${
          viewMode === "play"
            ? "bg-white/10 backdrop-blur-sm border-white/20"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              className="text-3xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💰
            </motion.div>
            <div>
              <h3
                className={`text-xl font-bold ${
                  viewMode === "play" ? "text-white" : "text-gray-900"
                }`}
              >
                Income Breakdown
              </h3>
              <p
                className={`text-sm ${
                  viewMode === "play" ? "text-white/70" : "text-gray-600"
                }`}
              >
                Your money sources this month
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
              viewMode === "play"
                ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            <Calendar size={16} />
            Payday Calendar
          </button>
        </div>

        {/* Income Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            className={`p-4 rounded-xl border ${
              viewMode === "play"
                ? "bg-white/5 border-white/10"
                : "bg-gray-50 border-gray-100"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={16} className="text-green-400" />
              <span
                className={`text-sm font-medium ${
                  viewMode === "play" ? "text-white/80" : "text-gray-700"
                }`}
              >
                Total Income
              </span>
            </div>
            <div className="text-2xl font-bold text-green-400">
              {formatCurrency(totalIncome)}
            </div>
          </motion.div>

          <motion.div
            className={`p-4 rounded-xl border ${
              viewMode === "play"
                ? "bg-white/5 border-white/10"
                : "bg-gray-50 border-gray-100"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-blue-400" />
              <span
                className={`text-sm font-medium ${
                  viewMode === "play" ? "text-white/80" : "text-gray-700"
                }`}
              >
                Recurring
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-400">
              {formatCurrency(recurringIncome)}
            </div>
            <div
              className={`text-xs ${
                viewMode === "play" ? "text-white/60" : "text-gray-500"
              }`}
            >
              {((recurringIncome / totalIncome) * 100).toFixed(0)}% of total
            </div>
          </motion.div>

          <motion.div
            className={`p-4 rounded-xl border ${
              viewMode === "play"
                ? "bg-white/5 border-white/10"
                : "bg-gray-50 border-gray-100"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-purple-400" />
              <span
                className={`text-sm font-medium ${
                  viewMode === "play" ? "text-white/80" : "text-gray-700"
                }`}
              >
                One-time
              </span>
            </div>
            <div className="text-2xl font-bold text-purple-400">
              {formatCurrency(oneTimeIncome)}
            </div>
            <div
              className={`text-xs ${
                viewMode === "play" ? "text-white/60" : "text-gray-500"
              }`}
            >
              {((oneTimeIncome / totalIncome) * 100).toFixed(0)}% of total
            </div>
          </motion.div>
        </div>

        {/* Income Sources List */}
        <div className="space-y-3">
          {incomes.map((income, index) => (
            <motion.div
              key={income.id}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedIncome === income.id
                  ? viewMode === "play"
                    ? "bg-white/15 border-white/30"
                    : "bg-blue-50 border-blue-200"
                  : viewMode === "play"
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-gray-50 border-gray-100 hover:bg-gray-100"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              onClick={() =>
                setSelectedIncome(selectedIncome === income.id ? null : income.id)
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                    style={{ backgroundColor: `${income.color}20` }}
                  >
                    {income.icon}
                  </div>
                  <div>
                    <div
                      className={`font-semibold ${
                        viewMode === "play" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {income.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={getTypeColor(income.type)}>
                        {income.type.charAt(0).toUpperCase() + income.type.slice(1)}
                      </span>
                      <span
                        className={`text-sm ${
                          viewMode === "play" ? "text-white/60" : "text-gray-500"
                        }`}
                      >
                        •
                      </span>
                      <span
                        className={`text-sm ${
                          viewMode === "play" ? "text-white/60" : "text-gray-500"
                        }`}
                      >
                        {getFrequencyEmoji(income.frequency)} {income.frequency}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-green-400">
                    {formatCurrency(income.amount)}
                  </div>
                  <div
                    className={`text-sm ${
                      viewMode === "play" ? "text-white/60" : "text-gray-500"
                    }`}
                  >
                    {((income.amount / totalIncome) * 100).toFixed(1)}%
                  </div>
                  {income.growth && (
                    <div
                      className={`text-xs font-medium ${
                        income.growth > 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {income.growth > 0 ? "+" : ""}{income.growth}% growth
                    </div>
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {selectedIncome === income.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-white/10"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div
                          className={`text-sm font-medium mb-1 ${
                            viewMode === "play" ? "text-white/80" : "text-gray-700"
                          }`}
                        >
                          Next Payment
                        </div>
                        <div
                          className={`${
                            viewMode === "play" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {income.nextPayment || "Not scheduled"}
                        </div>
                      </div>
                      <div>
                        <div
                          className={`text-sm font-medium mb-1 ${
                            viewMode === "play" ? "text-white/80" : "text-gray-700"
                          }`}
                        >
                          Status
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              income.isRecurring ? "bg-green-400" : "bg-yellow-400"
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              viewMode === "play" ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {income.isRecurring ? "Active" : "One-time"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Payday Calendar */}
        <AnimatePresence>
          {showCalendar && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-white/10"
            >
              <h4
                className={`text-lg font-bold mb-4 ${
                  viewMode === "play" ? "text-white" : "text-gray-900"
                }`}
              >
                📅 Payday Calendar
              </h4>
              
              <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    className={`text-center text-sm font-medium p-2 ${
                      viewMode === "play" ? "text-white/70" : "text-gray-600"
                    }`}
                  >
                    {day}
                  </div>
                ))}
                
                {generateCalendarDays().map((dayData, index) => (
                  <div
                    key={index}
                    className={`relative aspect-square flex items-center justify-center text-sm rounded-lg transition-all ${
                      !dayData
                        ? ""
                        : dayData.isToday
                          ? "bg-blue-500 text-white font-bold"
                          : dayData.isPayday
                            ? "bg-green-400 text-white font-bold animate-pulse"
                            : viewMode === "play"
                              ? "text-white/80 hover:bg-white/10"
                              : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {dayData?.day}
                    {dayData?.isPayday && (
                      <motion.div
                        className="absolute -top-1 -right-1 text-xs"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        💰
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <p
                  className={`text-sm ${
                    viewMode === "play" ? "text-white/70" : "text-gray-600"
                  }`}
                >
                  💡 Green days are paydays • Blue is today • 💰 indicates income
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
