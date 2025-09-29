import { useEffect, useState } from "react";
import {
  FadeIn,
  BigNumber,
  SyncStatus,
  InfoTooltip,
} from "../../../components/ui";
import {
  AccessibleHeading,
  AccessibleText,
  AccessibleCard,
} from "../../../core";
import { useNetWorth } from "../hooks/useNetWorth";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface EnhancedNetWorthWidgetProps {
  timeRange: "7d" | "30d" | "90d";
  onQuickAction?: (action: string, data?: unknown) => void;
  className?: string;
}

export function EnhancedNetWorthWidget({
  timeRange,
  onQuickAction,
  className = "",
}: EnhancedNetWorthWidgetProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState<
    "7d" | "30d" | "90d"
  >(timeRange);

  useEffect(() => {
    setSelectedTimeRange(timeRange);
  }, [timeRange]);

  const { netWorthData, loading, error, refreshNetWorth } = useNetWorth();

  console.log("🔍 EnhancedNetWorthWidget render:", {
    loading,
    hasData: !!netWorthData,
    error,
    selectedTimeRange,
    netWorthData: netWorthData ? `$${netWorthData.totalNetWorth}` : null,
  });

  if (loading) {
    console.log("🔍 EnhancedNetWorthWidget: Rendering loading state");
    return (
      <FadeIn
        className={`bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 ${className}`}
      >
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
          <div className="h-16 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
        </div>
      </FadeIn>
    );
  }

  if (error) {
    return (
      <FadeIn
        className={`bg-red-50 border border-red-200 rounded-2xl p-8 ${className}`}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-red-800 mb-2">
            Couldn't Load Your Money Information
          </h3>
          <p className="text-red-600 mb-4">
            We're having trouble getting your latest financial data.
          </p>
          <button
            onClick={refreshNetWorth}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </FadeIn>
    );
  }

  if (!netWorthData) {
    return (
      <FadeIn
        className={`bg-gray-50 border border-gray-200 rounded-2xl p-8 ${className}`}
      >
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">💰</div>
          <p>No financial data available</p>
        </div>
      </FadeIn>
    );
  }

  // Prepare pie chart data
  const pieData = [
    {
      name: "💰 Cash",
      value: Math.abs(netWorthData.breakdown.cash),
      color: "#10b981", // green
      description: "Money in your bank accounts",
    },
    {
      name: "📈 Investments",
      value: Math.abs(netWorthData.breakdown.investments),
      color: "#3b82f6", // blue
      description: "401k, IRA, stocks, and other investments",
    },
    {
      name: "💳 Debts",
      value: Math.abs(netWorthData.breakdown.other),
      color: "#ef4444", // red
      description: "Credit cards, loans, and other debts",
    },
  ].filter((item) => item.value > 0);

  const totalAssets =
    netWorthData.breakdown.cash +
    netWorthData.breakdown.investments +
    netWorthData.breakdown.realEstate;
  const totalDebts = Math.abs(netWorthData.breakdown.other);

  return (
    <FadeIn
      className={`bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-elegant border border-blue-200 overflow-hidden ${className}`}
    >
      {/* Header with sync status */}
      <div className="px-8 pt-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-gray-900 mr-3">
              💰 Your Money Summary
            </h2>
            <InfoTooltip content="This shows everything you own minus everything you owe. It's like your financial scorecard!" />
          </div>
          <SyncStatus lastSyncAt={netWorthData.lastUpdated} />
        </div>
        <p className="text-gray-600 text-lg">
          Here's the simple picture of your finances
        </p>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Big Number */}
          <div className="lg:col-span-2">
            <BigNumber
              value={netWorthData.totalNetWorth}
              label="Total Net Worth"
              explanation="This is how much money you'd have if you sold everything and paid off all your debts."
              previousValue={netWorthData.previousNetWorth}
              size="xl"
              showChange={true}
              showTooltip={false}
              className="mb-8"
            />

            {/* Simple breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <AccessibleCard
                variant="elevated"
                className="border border-green-200"
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">💰</span>
                  <AccessibleHeading level="h4" className="text-green-800">
                    What You Own
                  </AccessibleHeading>
                </div>
                <AccessibleHeading level="h3" className="text-green-600 mb-1">
                  ${totalAssets.toLocaleString()}
                </AccessibleHeading>
                <AccessibleText variant="caption" className="text-green-700">
                  Your cash + investments + property
                </AccessibleText>
              </AccessibleCard>

              <AccessibleCard
                variant="elevated"
                className="border border-red-200"
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">💳</span>
                  <AccessibleHeading level="h4" className="text-red-800">
                    What You Owe
                  </AccessibleHeading>
                </div>
                <AccessibleHeading level="h3" className="text-red-600 mb-1">
                  ${totalDebts.toLocaleString()}
                </AccessibleHeading>
                <AccessibleText variant="caption" className="text-red-700">
                  Your credit cards + loans
                </AccessibleText>
              </AccessibleCard>
            </div>
          </div>

          {/* Right: Pie Chart */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 h-full">
              <AccessibleHeading level="h4" className="mb-4 text-center">
                💼 Where Your Money Is
              </AccessibleHeading>

              {pieData.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(props: any) =>
                          `${props.name} ${(props.percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: any, _name: any, props: any) => [
                          `$${value.toLocaleString()}`,
                          props.payload.description,
                        ]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📊</div>
                    <p>No data to display</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onQuickAction?.("view_details")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>📊</span>
            <span>See Full Details</span>
          </button>

          <button
            onClick={() => onQuickAction?.("add_transaction")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <span>➕</span>
            <span>Add Transaction</span>
          </button>

          <button
            onClick={refreshNetWorth}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <span>🔄</span>
            <span>Refresh Data</span>
          </button>
        </div>
      </div>
    </FadeIn>
  );
}
