import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";
import { mockRecurringPayments } from "../../../mockData/features/widgets";

interface RecurringPayment {
  id: string;
  name: string;
  amount: number;
  frequency: "weekly" | "monthly" | "quarterly" | "yearly";
  nextDue: Date;
  category: string;
  provider: string;
  status: "active" | "paused" | "cancelled";
  autoRenew: boolean;
  icon: string;
  color: string;
  lastCharged: Date;
  yearlyTotal: number;
}

interface RecurringPaymentsRadarProps {
  recurringPayments?: RecurringPayment[];
  className?: string;
}

export function RecurringPaymentsRadar({
  recurringPayments: _recurringPayments = [],
  className = "",
}: RecurringPaymentsRadarProps) {
  const [radarSweep, setRadarSweep] = useState(0);
  const [selectedPayment, setSelectedPayment] =
    useState<RecurringPayment | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRadarSweep((prev) => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Using centralized mock data
  const payments = mockRecurringPayments.map((payment) => ({
    id: payment.id,
    name: payment.name,
    amount: payment.amount,
    frequency: payment.frequency as
      | "weekly"
      | "monthly"
      | "quarterly"
      | "yearly",
    nextDue: new Date(payment.nextPayment),
    category: payment.category,
    provider: payment.name,
    status: payment.isActive ? ("active" as const) : ("inactive" as const),
    autoRenew: payment.canCancel,
    icon: payment.icon,
    color: payment.color,
    lastCharged: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    yearlyTotal: payment.amount * 12,
  }));

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
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#10B981";
      case "paused":
        return "#F59E0B";
      case "cancelled":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "paused":
        return <AlertTriangle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <RotateCcw className="w-4 h-4" />;
    }
  };

  return (
    <div
      className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">
            Recurring Payments Radar 📡
          </h3>
          <p className="text-slate-400 text-sm">
            Monitor your subscription ecosystem
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">
            ฿{totalMonthly.toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">per month</div>
        </div>
      </div>

      {/* Radar Visualization */}
      <div className="relative w-80 h-80 mx-auto mb-6">
        {/* Radar Background */}
        <svg className="w-full h-full" viewBox="0 0 320 320">
          {/* Radar Circles */}
          {[80, 120, 160].map((radius) => (
            <circle
              key={radius}
              cx="160"
              cy="160"
              r={radius}
              fill="none"
              stroke="rgba(148, 163, 184, 0.1)"
              strokeWidth="1"
            />
          ))}

          {/* Radar Lines */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1="160"
              y1="160"
              x2={160 + 160 * Math.cos((angle * Math.PI) / 180)}
              y2={160 + 160 * Math.sin((angle * Math.PI) / 180)}
              stroke="rgba(148, 163, 184, 0.1)"
              strokeWidth="1"
            />
          ))}

          {/* Radar Sweep */}
          <defs>
            <linearGradient
              id="sweepGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.6)" />
            </linearGradient>
          </defs>
          <path
            d={`M 160 160 L ${160 + 160 * Math.cos((radarSweep * Math.PI) / 180)} ${
              160 + 160 * Math.sin((radarSweep * Math.PI) / 180)
            } A 160 160 0 0 1 ${160 + 160 * Math.cos(((radarSweep + 60) * Math.PI) / 180)} ${
              160 + 160 * Math.sin(((radarSweep + 60) * Math.PI) / 180)
            } Z`}
            fill="url(#sweepGradient)"
          />

          {/* Payment Points */}
          {payments.map((payment, index) => {
            const angle = (index * 360) / payments.length;
            const daysUntil = getDaysUntilDue(payment.nextDue);
            const radius = Math.max(
              60,
              Math.min(140, 60 + (30 - daysUntil) * 3),
            );
            const x = 160 + radius * Math.cos((angle * Math.PI) / 180);
            const y = 160 + radius * Math.sin((angle * Math.PI) / 180);

            return (
              <g key={payment.id}>
                <circle
                  cx={x}
                  cy={y}
                  r="8"
                  fill={getStatusColor(payment.status)}
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer hover:r-10 transition-all"
                  onClick={() => setSelectedPayment(payment)}
                />
                <text
                  x={x}
                  y={y + 20}
                  textAnchor="middle"
                  className="text-xs fill-slate-400"
                >
                  {payment.name.split(" ")[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Payment List */}
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {payments.map((payment) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
              selectedPayment?.id === payment.id
                ? "bg-purple-500/20 border-purple-500/50"
                : "bg-slate-700/30 border-slate-600/30 hover:border-slate-500/50"
            }`}
            onClick={() => setSelectedPayment(payment)}
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                style={{ backgroundColor: payment.color + "20" }}
              >
                {payment.icon}
              </div>
              <div>
                <div className="font-medium text-white">{payment.name}</div>
                <div className="text-sm text-slate-400 flex items-center space-x-2">
                  {getStatusIcon(payment.status)}
                  <span>{payment.category}</span>
                  <span>•</span>
                  <span>{payment.frequency}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-white">
                ฿{payment.amount.toLocaleString()}
              </div>
              <div className="text-sm text-slate-400 flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{getDaysUntilDue(payment.nextDue)}d</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-lg font-bold text-green-400">
            {payments.filter((p) => p.status === "active").length}
          </div>
          <div className="text-xs text-slate-400">Active</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-yellow-400">
            {payments.filter((p) => p.status === "paused").length}
          </div>
          <div className="text-xs text-slate-400">Paused</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-400">
            ฿{totalYearly.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400">Yearly Total</div>
        </div>
      </div>
    </div>
  );
}
