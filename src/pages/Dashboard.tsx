import { useState } from "react";
import { SplitText, FadeIn } from "../components/ui";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { NetWorthWidget } from "../features/networth";
import { AccountsOverviewWidget } from "../features/accounts";
import { QuickActionsWidget } from "../features/quickactions";
import { RecentTransactionsWidget } from "../features/transactions";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  const handleQuickAction = (action: string, data?: unknown) => {
    console.log("Quick action:", action, data);
    // Handle navigation or modal opening based on action
    switch (action) {
      case "add_transaction":
        // Open add transaction modal
        break;
      case "link_account":
        // Start account linking flow
        break;
      case "view_analytics":
        // Navigate to analytics page
        break;
      case "import_csv":
        // Open CSV import modal
        break;
      case "view_accounts":
        // Navigate to accounts page with optional filter
        break;
      case "view_details":
        // Open detailed net worth view
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header with Time Range Selector */}
      <FadeIn
        direction="down"
        delay={0.1}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <SplitText className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back!
          </SplitText>
          <p className="text-gray-600">Here's your financial overview</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <CalendarDaysIcon className="h-5 w-5 text-gray-500" />
          <div className="flex rounded-lg bg-gray-100 p-1">
            {["7d", "30d", "90d"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as "7d" | "30d" | "90d")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  timeRange === range
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {range === "7d"
                  ? "7 days"
                  : range === "30d"
                    ? "30 days"
                    : "90 days"}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Net Worth Hero Section */}
      <NetWorthWidget timeRange={timeRange} onQuickAction={handleQuickAction} />

      {/* Accounts Overview */}
      <AccountsOverviewWidget onAccountAction={handleQuickAction} />

      {/* Grid Layout for Additional Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <QuickActionsWidget
          category="transaction"
          title="Quick Actions"
          description="Most used actions"
          config={{
            layout: "grid",
            showLabels: true,
            maxActions: 4,
            showShortcuts: true,
          }}
          className="lg:col-span-1"
        />

        {/* Recent Transactions */}
        <RecentTransactionsWidget
          className="lg:col-span-2"
          limit={5}
          onTransactionClick={(transaction) =>
            handleQuickAction("view_transaction", transaction)
          }
          onViewAllClick={() => handleQuickAction("view_transactions")}
        />
      </div>

      {/* Additional Feature Widgets Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Preview Placeholder */}
        <FadeIn direction="right" delay={0.8}>
          <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Portfolio Holdings
                </h3>
                <button
                  onClick={() => handleQuickAction("view_portfolio")}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Portfolio
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center py-12 text-gray-500">
                <p>Portfolio widget coming soon...</p>
                <p className="text-sm mt-2">
                  This will be implemented in the Portfolio feature module
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Analytics Preview Placeholder */}
        <FadeIn direction="left" delay={1.0}>
          <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Spending Insights
                </h3>
                <button
                  onClick={() => handleQuickAction("view_analytics")}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Analytics
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center py-12 text-gray-500">
                <p>Analytics widget coming soon...</p>
                <p className="text-sm mt-2">
                  This will be implemented in the Analytics feature module
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* AI Insights Placeholder */}
      <FadeIn direction="up" delay={1.2}>
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              AI Financial Insights
            </h3>
            <p className="text-gray-600 mb-4">
              Personalized insights and recommendations based on your spending
              patterns
            </p>
            <div className="inline-flex items-center space-x-2 text-purple-600 bg-purple-100 px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">Coming Soon</span>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
