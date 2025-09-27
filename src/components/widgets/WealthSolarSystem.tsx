import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Asset {
  id: string;
  name: string;
  value: number;
  performance: number;
  allocation: number;
  color: string;
  icon: string;
  orbit: number;
  size: number;
  description: string;
}

interface WealthSolarSystemProps {
  assets: Asset[];
  totalValue: number;
  className?: string;
}

export function WealthSolarSystem({ assets, totalValue, className = "" }: WealthSolarSystemProps) {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className={`relative w-full h-[900px] flex items-center justify-center overflow-visible ${className}`}>
      {/* Central Sun (Portfolio Value) */}
      <motion.div
        className="absolute z-20 flex flex-col items-center justify-center"
        animate={{ 
          boxShadow: [
            "0 0 80px rgba(255, 215, 0, 0.4)",
            "0 0 120px rgba(255, 215, 0, 0.6)",
            "0 0 80px rgba(255, 215, 0, 0.4)"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="w-40 h-40 bg-gradient-to-br from-yellow-300 via-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-5xl shadow-2xl">
          ☀️
        </div>
        <div className="mt-6 text-center">
          <div className="text-3xl font-bold text-white">{formatCurrency(totalValue)}</div>
          <div className="text-white/70 text-sm">Portfolio Sun</div>
        </div>
      </motion.div>

      {/* Orbiting Asset Planets */}
      {assets.map((asset, index) => {
        const angle = (index / assets.length) * 2 * Math.PI;
        const x = Math.cos(angle) * asset.orbit;
        const y = Math.sin(angle) * asset.orbit;
        
        return (
          <motion.div
            key={asset.id}
            className="absolute cursor-pointer"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 25 + index * 8,
              repeat: Infinity,
              ease: "linear",
            }}
            whileHover={{ scale: 1.3 }}
            onClick={() => setSelectedAsset(selectedAsset === asset.id ? null : asset.id)}
          >
            <motion.div
              className="relative flex flex-col items-center"
              style={{ transform: `translate(-50%, -50%)` }}
            >
              {/* Planet with Performance Glow */}
              <motion.div
                className={`rounded-full flex items-center justify-center text-3xl shadow-xl border-4 ${
                  asset.performance >= 0 ? 'border-green-400/60' : 'border-red-400/60'
                }`}
                style={{
                  width: asset.size,
                  height: asset.size,
                  backgroundColor: asset.color,
                  boxShadow: `0 0 30px ${asset.color}60`,
                }}
                animate={asset.performance >= 0 ? {
                  boxShadow: [
                    `0 0 30px ${asset.color}60`,
                    `0 0 50px ${asset.color}80`,
                    `0 0 30px ${asset.color}60`
                  ]
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {asset.icon}
              </motion.div>
              
              {/* Planet Info */}
              <div className="mt-3 text-center">
                <div className="text-lg font-bold text-white">{formatCurrency(asset.value)}</div>
                <div className="text-xs text-white/70 max-w-20 truncate">{asset.name}</div>
                <div className={`text-sm font-bold ${asset.performance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {asset.performance >= 0 ? '+' : ''}{asset.performance}%
                </div>
                <div className="text-xs text-white/60">{asset.allocation}% allocation</div>
              </div>

              {/* Orbit Trail */}
              <div
                className="absolute border border-dashed border-white/15 rounded-full pointer-events-none"
                style={{
                  width: asset.orbit * 2,
                  height: asset.orbit * 2,
                  left: `calc(-50% - ${asset.orbit - asset.size/2}px)`,
                  top: `calc(-50% - ${asset.orbit - asset.size/2}px)`,
                }}
              />

              {/* Asset Detail Panel */}
              <AnimatePresence>
                {selectedAsset === asset.id && (
                  <motion.div
                    className="absolute top-full mt-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 min-w-64 z-30"
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{asset.icon}</div>
                      <div>
                        <h3 className="text-white font-bold">{asset.name}</h3>
                        <p className="text-white/70 text-sm">{asset.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/70">Current Value:</span>
                        <span className="text-white font-bold">{formatCurrency(asset.value)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Performance:</span>
                        <span className={`font-bold ${asset.performance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {asset.performance >= 0 ? '+' : ''}{asset.performance}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Allocation:</span>
                        <span className="text-blue-400 font-bold">{asset.allocation}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Growth:</span>
                        <span className={`font-bold ${asset.performance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatCurrency(asset.value * asset.performance / 100)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
