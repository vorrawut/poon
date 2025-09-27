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

export function AccountsPage() {
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
      case "view_transaction":
        // Open transaction detail modal/page
        break;
      case "view_transactions":
        // Navigate to transactions page
        break;
      case "view_portfolio":
        // Navigate to portfolio page
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Debug components - remove in production */}
      <div className="max-w-7xl mx-auto p-4 space-y-4">
        <EnvironmentDebugger />
        <MockDataDisplay />
        <DirectServiceTest />
        <ServiceTester />
      </div>

      {/* Main Accounts Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Hero Header */}
        <FadeIn direction="down" delay={0.1} className="text-center py-12">
          <div className="mb-6">
            <SplitText className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              🏦 Your Accounts
            </SplitText>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Complete overview of all your financial accounts in one place. 
              Track everything from checking to investments.
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

        {/* Accounts Overview - Featured prominently */}
        <div className="mb-12">
          <EnhancedAccountsWidget onAccountAction={handleQuickAction} />
        </div>

        {/* Net Worth Section - Secondary but important */}
        <div className="mb-12">
          <EnhancedNetWorthWidget
            timeRange={timeRange}
            onQuickAction={handleQuickAction}
          />
        </div>

        {/* Account Activity Section */}
        <div className="mb-12">
          <FadeIn direction="up" delay={0.6}>
            <div className="bg-white rounded-2xl shadow-card border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-8 py-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <h2 className="text-2xl font-bold text-gray-900 mr-3">
                      💳 Account Activity
                    </h2>
                  </div>
                  <button
                    onClick={() => handleQuickAction("view_transactions")}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    See All Transactions
                  </button>
                </div>
                <p className="text-gray-600 text-lg mt-2">
                  Recent transactions across all your accounts
                </p>
              </div>

              <div className="p-8">
                <RecentTransactionsWidget
                  limit={8}
                  onTransactionClick={(transaction) =>
                    handleQuickAction("view_transaction", transaction)
                  }
                  onViewAllClick={() => handleQuickAction("view_transactions")}
                />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Account Management Actions */}
        <div className="mb-12">
          <FadeIn direction="up" delay={0.8}>
            <div className="bg-white rounded-2xl shadow-card border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    ⚙️ Account Management
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Manage your accounts and financial connections
                  </p>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <button
                    onClick={() => handleQuickAction("link_account")}
                    className="bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-xl p-6 text-center transition-all hover:scale-105"
                  >
                    <div className="text-4xl mb-3">🔗</div>
                    <div className="font-semibold text-blue-800 mb-1">
                      Connect New Account
                    </div>
                    <div className="text-sm text-blue-600">
                      Link banks, credit cards, and investments
                    </div>
                  </button>

                  <button
                    onClick={() => handleQuickAction("import_csv")}
                    className="bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-xl p-6 text-center transition-all hover:scale-105"
                  >
                    <div className="text-4xl mb-3">📁</div>
                    <div className="font-semibold text-purple-800 mb-1">
                      Import Statements
                    </div>
                    <div className="text-sm text-purple-600">
                      Upload CSV files from your bank
                    </div>
                  </button>

                  <button
                    onClick={() => handleQuickAction("add_transaction")}
                    className="bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-xl p-6 text-center transition-all hover:scale-105"
                  >
                    <div className="text-4xl mb-3">➕</div>
                    <div className="font-semibold text-green-800 mb-1">
                      Manual Transaction
                    </div>
                    <div className="text-sm text-green-600">
                      Add transactions manually
                    </div>
                  </button>

                  <button
                    onClick={() => handleQuickAction("view_analytics")}
                    className="bg-orange-50 hover:bg-orange-100 border-2 border-orange-200 rounded-xl p-6 text-center transition-all hover:scale-105"
                  >
                    <div className="text-4xl mb-3">📊</div>
                    <div className="font-semibold text-orange-800 mb-1">
                      Account Reports
                    </div>
                    <div className="text-sm text-orange-600">
                      Detailed account analytics
                    </div>
                  </button>

                  <button
                    onClick={() => handleQuickAction("sync_accounts")}
                    className="bg-teal-50 hover:bg-teal-100 border-2 border-teal-200 rounded-xl p-6 text-center transition-all hover:scale-105"
                  >
                    <div className="text-4xl mb-3">🔄</div>
                    <div className="font-semibold text-teal-800 mb-1">
                      Sync All Accounts
                    </div>
                    <div className="text-sm text-teal-600">
                      Update all connected accounts
                    </div>
                  </button>

                  <button
                    onClick={() => handleQuickAction("account_settings")}
                    className="bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-xl p-6 text-center transition-all hover:scale-105"
                  >
                    <div className="text-4xl mb-3">⚙️</div>
                    <div className="font-semibold text-gray-800 mb-1">
                      Account Settings
                    </div>
                    <div className="text-sm text-gray-600">
                      Manage account preferences
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Security & Trust Footer */}
        <FadeIn direction="up" delay={1.0}>
          <div className="text-center bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Your data is safe and secure
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Bank-level encryption protects all your account information. 
              We never store your login credentials, only read-only access to account balances and transactions.
            </p>
            <div className="text-sm text-gray-500">
              🔐 256-bit SSL encryption • 🛡️ SOC 2 compliant • 🔒 Read-only access
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
