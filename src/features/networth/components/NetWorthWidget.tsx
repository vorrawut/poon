import { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import { AnimatedNumber, FadeIn } from '../../../components/ui';
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  CalendarDaysIcon,
  EyeIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { useNetWorth, useNetWorthTrend } from '../hooks/useNetWorth';
import { TIME_RANGES } from '../services/dataGenerators';
import { type TimeRange } from '../types';

interface NetWorthWidgetProps {
  className?: string;
  showQuickActions?: boolean;
  onQuickAction?: (action: string) => void;
}

export function NetWorthWidget({ 
  className = '', 
  showQuickActions = true,
  onQuickAction 
}: NetWorthWidgetProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange['value']>('30d');
  const { netWorthData, loading, error, refreshNetWorth } = useNetWorth();
  const { trendData, growth, growthPercent } = useNetWorthTrend(selectedTimeRange);

  if (loading) {
    return (
      <div className={`animate-pulse bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl h-64 ${className}`}>
        <div className="p-8">
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-gray-300 rounded w-2/3 mb-6"></div>
          <div className="h-16 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-2xl p-8 ${className}`}>
        <div className="text-red-600 font-medium mb-2">Failed to load net worth data</div>
        <div className="text-red-500 text-sm mb-4">{error}</div>
        <button 
          onClick={refreshNetWorth}
          className="text-red-600 hover:text-red-700 font-medium text-sm"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!netWorthData) return null;

  const netWorthChangeIsPositive = netWorthData.netWorthChange >= 0;
  const currentTimeRange = TIME_RANGES.find(r => r.value === selectedTimeRange);

  const CustomTooltip = ({ active, payload, label: _label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/20">
          <p className="text-gray-600 text-sm">{payload[0].payload.formattedDate}</p>
          <p className="text-white font-semibold">
            ${payload[0].value?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <FadeIn direction="up" delay={0.2} className={className}>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white shadow-elegant">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        
        <div className="relative z-10 p-8">
          {/* Header with Time Range Selector */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-white/90 text-lg font-medium">Total Net Worth</h2>
                <button 
                  onClick={refreshNetWorth}
                  className="text-white/60 hover:text-white/80 transition-colors"
                  title="Refresh data"
                >
                  <ArrowPathIcon className="h-4 w-4" />
                </button>
              </div>
              <p className="text-white/60 text-sm">
                Last updated: {netWorthData.lastUpdated.toLocaleTimeString()}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <CalendarDaysIcon className="h-4 w-4 text-white/60" />
              <div className="flex rounded-lg bg-white/10 backdrop-blur-sm p-1">
                {TIME_RANGES.slice(0, 3).map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setSelectedTimeRange(range.value)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      selectedTimeRange === range.value 
                        ? 'bg-white/20 text-white shadow-sm' 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Net Worth Display */}
            <div className="lg:col-span-2">
              <div className="flex items-baseline space-x-4 mb-6">
                <AnimatedNumber
                  value={netWorthData.totalNetWorth}
                  format="currency"
                  className="text-5xl font-bold text-white tracking-tight"
                  duration={1.5}
                  delay={0.5}
                />
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm ${
                  netWorthChangeIsPositive 
                    ? 'bg-green-500/20 text-green-100 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-100 border border-red-500/30'
                }`}>
                  {netWorthChangeIsPositive ? (
                    <ArrowTrendingUpIcon className="h-4 w-4" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-4 w-4" />
                  )}
                  <AnimatedNumber
                    value={Math.abs(netWorthData.netWorthChange)}
                    format="currency"
                    delay={1.0}
                  />
                  <span>
                    ({netWorthData.netWorthChangePercent > 0 ? '+' : ''}
                    <AnimatedNumber
                      value={netWorthData.netWorthChangePercent}
                      format="percent"
                      decimals={1}
                      delay={1.2}
                    />)
                  </span>
                </div>
              </div>
              
              {/* Trend Info */}
              <div className="flex items-center space-x-4 mb-4 text-white/80 text-sm">
                <span>Trend over {currentTimeRange?.label}:</span>
                <div className="flex items-center space-x-1">
                  {growth >= 0 ? (
                    <ArrowTrendingUpIcon className="h-3 w-3 text-green-300" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-3 w-3 text-red-300" />
                  )}
                  <span className={growth >= 0 ? 'text-green-300' : 'text-red-300'}>
                    {growth >= 0 ? '+' : ''}${growth.toLocaleString()} ({growthPercent.toFixed(1)}%)
                  </span>
                </div>
              </div>
              
              {/* Sparkline Chart */}
              <div className="h-20 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="rgba(255, 255, 255, 0.9)" 
                      strokeWidth={2}
                      dot={false}
                      strokeDasharray={growth >= 0 ? "0" : "5,5"}
                    />
                    <Tooltip content={<CustomTooltip />} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Breakdown or Quick Actions */}
            <div className="flex flex-col justify-center space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h3 className="text-white/90 font-medium mb-3">Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Cash & Banking</span>
                    <span className="text-white font-medium">
                      ${netWorthData.breakdown.cash.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Investments</span>
                    <span className="text-white font-medium">
                      ${netWorthData.breakdown.investments.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Real Estate</span>
                    <span className="text-white font-medium">
                      ${netWorthData.breakdown.realEstate.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Other</span>
                    <span className="text-white font-medium">
                      ${netWorthData.breakdown.other.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              {showQuickActions && (
                <button 
                  onClick={() => onQuickAction?.('view_details')}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-200 group"
                >
                  <EyeIcon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">View Details</span>
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl"></div>
      </div>
    </FadeIn>
  );
}
