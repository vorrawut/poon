import { motion } from "framer-motion";

interface RiskGaugeProps {
  riskLevel: "Low" | "Medium" | "High";
  volatility: number;
  diversificationImpact: string;
  className?: string;
  viewMode?: "play" | "clarity";
}

export function RiskGauge({ 
  riskLevel, 
  volatility, 
  diversificationImpact, 
  className = "",
  viewMode = "play" 
}: RiskGaugeProps) {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low": return "#10B981";
      case "medium": return "#F59E0B";
      case "high": return "#EF4444";
      default: return "#6B7280";
    }
  };

  const getRiskEmoji = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low": return "🟢";
      case "medium": return "🟡";
      case "high": return "🔴";
      default: return "⚪";
    }
  };

  const getRiskScore = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low": return 25;
      case "medium": return 60;
      case "high": return 90;
      default: return 50;
    }
  };

  const riskScore = getRiskScore(riskLevel);
  const riskColor = getRiskColor(riskLevel);

  // Calculate the arc path for the gauge
  const radius = 80;
  const strokeWidth = 12;
  const center = 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference * 0.75; // 3/4 circle
  const strokeDashoffset = strokeDasharray - (strokeDasharray * riskScore) / 100;

  return (
    <div className={`${className}`}>
      <div className="relative flex flex-col items-center">
        {/* SVG Gauge */}
        <div className="relative">
          <svg width="200" height="140" className="transform -rotate-90">
            {/* Background Arc */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={viewMode === "play" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDasharray * 0.25}
              strokeLinecap="round"
            />
            
            {/* Risk Level Arc */}
            <motion.circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={riskColor}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              initial={{ strokeDashoffset: strokeDasharray }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{
                filter: `drop-shadow(0 0 8px ${riskColor}40)`,
              }}
            />

            {/* Gradient Definition */}
            <defs>
              <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              className="text-4xl mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {getRiskEmoji(riskLevel)}
            </motion.div>
            <div className={`text-xl font-bold`} style={{ color: riskColor }}>
              {riskLevel}
            </div>
            <div className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}>
              Risk Level
            </div>
          </div>

          {/* Risk Score Indicator */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className={`px-2 py-1 rounded-full text-xs font-bold ${
              viewMode === "play" ? "bg-white/10 text-white" : "bg-gray-100 text-gray-800"
            }`}>
              {riskScore}/100
            </div>
          </div>
        </div>

        {/* Risk Metrics */}
        <div className="mt-6 w-full space-y-4">
          {/* Volatility Meter */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm font-medium ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
                📊 Volatility
              </span>
              <span className={`text-sm font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
                {(volatility * 100).toFixed(0)}%
              </span>
            </div>
            <div className={`w-full h-2 rounded-full ${
              viewMode === "play" ? "bg-white/10" : "bg-gray-200"
            }`}>
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: riskColor }}
                initial={{ width: 0 }}
                animate={{ width: `${volatility * 100}%` }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </div>
          </div>

          {/* Diversification Impact */}
          <div className={`p-3 rounded-lg ${
            viewMode === "play" ? "bg-white/5" : "bg-gray-50"
          }`}>
            <div className="flex items-start gap-2">
              <span className="text-yellow-500 text-sm">⚠️</span>
              <div>
                <div className={`font-semibold text-sm ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
                  Portfolio Impact
                </div>
                <div className={`text-xs mt-1 ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}>
                  {diversificationImpact}
                </div>
              </div>
            </div>
          </div>

          {/* Risk Level Guide */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-1"></div>
              <div className={viewMode === "play" ? "text-white/70" : "text-gray-600"}>
                Low Risk
              </div>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mx-auto mb-1"></div>
              <div className={viewMode === "play" ? "text-white/70" : "text-gray-600"}>
                Medium
              </div>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 bg-red-400 rounded-full mx-auto mb-1"></div>
              <div className={viewMode === "play" ? "text-white/70" : "text-gray-600"}>
                High Risk
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
