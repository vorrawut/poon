import { useState } from "react";
import { SplitText, FadeIn, TimeRangeSelector } from "../components/ui";
import { EnhancedNetWorthWidget } from "../features/networth/components/EnhancedNetWorthWidget";
import { EnhancedAccountsWidget } from "../features/accounts/components/EnhancedAccountsWidget";
import { RecentTransactionsWidget } from "../features/transactions";
// Debug components - remove in production
import { EnvironmentDebugger } from "../components/EnvironmentDebugger";
import { ServiceTester } from "../components/ServiceTester";
import { DirectServiceTest } from "../components/DirectServiceTest";
import { MockDataDisplay } from "../components/MockDataDisplay";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Debug components - remove in production */}
      <div className="max-w-7xl mx-auto p-4 space-y-4">
        <EnvironmentDebugger />
        <MockDataDisplay />
        <DirectServiceTest />
        <ServiceTester />
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Hero Header */}
        <FadeIn direction="down" delay={0.1} className="text-center py-12">
          <div className="mb-6">
            <SplitText className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              👋 Welcome back!
            </SplitText>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Here's your money in plain English. Everything you need to know,
              nothing you don't.
            </p>
          </div>

          {/* Big, Touch-Friendly Time Selector */}
          <TimeRangeSelector
            value={timeRange}
            onChange={setTimeRange}
            size="lg"
            className="mb-8"
          />
        </FadeIn>

        {/* Net Worth Hero Section - The Star of the Show */}
        <div className="mb-12">
          <EnhancedNetWorthWidget
            timeRange={timeRange}
            onQuickAction={handleQuickAction}
          />
        </div>

        {/* Accounts Overview - Clear and Simple */}
        <div className="mb-12">
          <EnhancedAccountsWidget onAccountAction={handleQuickAction} />
        </div>

        {/* Recent Activity Section - Simple and Clear */}
        <div className="mb-12">
          <FadeIn direction="up" delay={0.6}>
            <div className="bg-white rounded-2xl shadow-card border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-8 py-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <h2 className="text-2xl font-bold text-gray-900 mr-3">
                      📋 Recent Activity
                    </h2>
                  </div>
                  <button
                    onClick={() => handleQuickAction("view_transactions")}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    See All Activity
                  </button>
                </div>
                <p className="text-gray-600 text-lg mt-2">
                  Your latest money movements
                </p>
              </div>

              <div className="p-8">
                <RecentTransactionsWidget
                  limit={5}
                  onTransactionClick={(transaction) =>
                    handleQuickAction("view_transaction", transaction)
                  }
                  onViewAllClick={() => handleQuickAction("view_transactions")}
                />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Quick Action Center - Big Buttons for Easy Access */}
        <div className="mb-12">
          <FadeIn direction="up" delay={0.8}>
            <div className="bg-white rounded-2xl shadow-card border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-6 border-b border-gray-200">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    ⚡ Quick Actions
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Common things you might want to do
                  </p>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <button
                    onClick={() => handleQuickAction("add_transaction")}
                    className="bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-xl p-6 text-center transition-all hover:scale-105"
                  >
                    <div className="text-4xl mb-3">➕</div>
                    <div className="font-semibold text-green-800 mb-1">
                      Add Transaction
                    </div>
                    <div className="text-sm text-green-600">
                      Record a purchase or payment
                    </div>
                  </button>

                  <button
                    onClick={() => handleQuickAction("link_account")}
                    className="bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-xl p-6 text-center transition-all hover:scale-105"
                  >
                    <div className="text-4xl mb-3">🔗</div>
                    <div className="font-semibold text-blue-800 mb-1">
                      Link Account
                    </div>
                    <div className="text-sm text-blue-600">
                      Connect a new bank account
                    </div>
                  </button>

                  <button
                    onClick={() => handleQuickAction("import_csv")}
                    className="bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-xl p-6 text-center transition-all hover:scale-105"
                  >
                    <div className="text-4xl mb-3">📄</div>
                    <div className="font-semibold text-purple-800 mb-1">
                      Import Data
                    </div>
                    <div className="text-sm text-purple-600">
                      Upload transactions from file
                    </div>
                  </button>

                  <button
                    onClick={() => handleQuickAction("view_analytics")}
                    className="bg-orange-50 hover:bg-orange-100 border-2 border-orange-200 rounded-xl p-6 text-center transition-all hover:scale-105"
                  >
                    <div className="text-4xl mb-3">📊</div>
                    <div className="font-semibold text-orange-800 mb-1">
                      View Reports
                    </div>
                    <div className="text-sm text-orange-600">
                      See spending patterns
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Encouraging Footer Message */}
        <FadeIn direction="up" delay={1.0}>
          <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              You're doing great with your money!
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Keep track of your finances, and watch your wealth grow over time.
              Remember, every dollar saved is a dollar earned!
            </p>
            <div className="text-sm text-gray-500">
              💡 Tip: Check your dashboard regularly to stay on top of your
              financial health
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
