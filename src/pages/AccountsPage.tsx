import { useState } from "react";
import { motion } from "framer-motion";
import { SplitText, FadeIn, TimeRangeSelector } from "../components/ui";
import { EnhancedNetWorthWidget } from "../features/networth/components/EnhancedNetWorthWidget";
import { EnhancedAccountsWidget } from "../features/accounts/components/EnhancedAccountsWidget";
import { RecentTransactionsWidget } from "../features/transactions";
import {
  SmartHighlights,
  DualLensToggle,
  UniverseBackground,
} from "../components/widgets";
// Debug components - remove in production
import { EnvironmentDebugger } from "../components/EnvironmentDebugger";
import { ServiceTester } from "../components/ServiceTester";
import { DirectServiceTest } from "../components/DirectServiceTest";
import { MockDataDisplay } from "../components/MockDataDisplay";

// Accounts Smart Highlights
const accountsHighlights = [
  {
    id: "1",
    title: "Account Health Check",
    message:
      "All 5 accounts are connected and syncing perfectly! Your financial data is up-to-date across the board.",
    icon: "✅",
    type: "success" as const,
  },
  {
    id: "2",
    title: "Balance Alert",
    message:
      "Your checking account balance is running low at $1,240. Consider transferring from savings or monitoring upcoming bills.",
    icon: "⚠️",
    type: "warning" as const,
  },
  {
    id: "3",
    title: "Investment Growth",
    message:
      "Your investment accounts gained $2,340 this month! Your diversified portfolio is working hard for you.",
    icon: "📈",
    type: "info" as const,
  },
  {
    id: "4",
    title: "Security Update",
    message:
      "Great job! All your accounts have strong security settings enabled. Your financial data is well protected.",
    icon: "🔒",
    type: "insight" as const,
  },
];

export function AccountsPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");
  const [viewMode, setViewMode] = useState<"play" | "clarity">("clarity");

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
    <div
      className={`min-h-screen relative overflow-hidden ${
        viewMode === "play"
          ? "bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900"
          : "bg-gradient-to-br from-emerald-50 to-teal-50"
      }`}
    >
      {viewMode === "play" && <UniverseBackground starCount={40} />}
      <DualLensToggle viewMode={viewMode} onToggle={setViewMode} />

      {/* Debug components - remove in production */}
      <div className="max-w-7xl mx-auto p-4 space-y-4 relative z-10">
        <EnvironmentDebugger />
        <MockDataDisplay />
        <DirectServiceTest />
        <ServiceTester />
      </div>

      {/* Main Accounts Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10">
        {/* Hero Header */}
        <FadeIn direction="down" delay={0.1} className="text-center py-12">
          <div className="mb-6">
            <div
              className={`text-5xl md:text-6xl font-bold mb-4 ${
                viewMode === "play" ? "text-white" : "text-gray-900"
              }`}
            >
              <motion.span
                className="inline-block mr-4"
                animate={{
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🏦
              </motion.span>
              <SplitText className="inline">Your Accounts</SplitText>
            </div>
            <p
              className={`text-xl mb-8 max-w-2xl mx-auto ${
                viewMode === "play" ? "text-white/80" : "text-gray-600"
              }`}
            >
              {viewMode === "play"
                ? "Navigate your account constellation — each account is a star in your financial galaxy!"
                : "Complete overview of all your financial accounts in one place. Track everything from checking to investments."}
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

        {/* Account Smart Highlights */}
        <SmartHighlights
          highlights={accountsHighlights}
          title="Account Intelligence"
          subtitle="Smart insights about your accounts — your personal banking assistant!"
          className="mb-12"
        />

        {/* Security & Trust Footer */}
        <FadeIn direction="up" delay={1.0}>
          <div
            className={`text-center rounded-2xl p-8 border ${
              viewMode === "play"
                ? "bg-white/10 backdrop-blur-sm border-white/20 text-white"
                : "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 text-gray-900"
            }`}
          >
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold mb-4">
              Your data is safe and secure
            </h3>
            <p
              className={`text-lg mb-6 max-w-2xl mx-auto ${
                viewMode === "play" ? "text-white/80" : "text-gray-600"
              }`}
            >
              Bank-level encryption protects all your account information. We
              never store your login credentials, only read-only access to
              account balances and transactions.
            </p>
            <div
              className={`text-sm ${
                viewMode === "play" ? "text-white/60" : "text-gray-500"
              }`}
            >
              🔐 256-bit SSL encryption • 🛡️ SOC 2 compliant • 🔒 Read-only
              access
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
