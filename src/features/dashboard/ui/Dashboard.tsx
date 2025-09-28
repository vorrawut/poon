import { useState } from "react";
import { motion } from "framer-motion";
import { SplitText, FadeIn, TimeRangeSelector } from "../../../components/ui";
import {
  AccessibleHeading,
  AccessibleText,
  AccessibleButton,
  AccessibleQuickAction,
  AccessibleGrid,
} from "../../../core";
import { EnhancedNetWorthWidget } from "../../networth/components/EnhancedNetWorthWidget";
import { EnhancedAccountsWidget } from "../../accounts/components/EnhancedAccountsWidget";
import { RecentTransactionsWidget } from "../../transactions";
import {
  SmartHighlights,
  UniverseBackground,
} from "../../../components/widgets";
import { dashboardHighlights } from "../../../../mockData/features/dashboard";

import { useUIStore } from "../../../store/useUIStore";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");
  const { viewMode } = useUIStore();

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
    <div
      className={`min-h-screen relative overflow-hidden ${
        viewMode === "play"
          ? "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
          : "bg-gradient-to-br from-slate-50 to-blue-50"
      }`}
    >
      {viewMode === "play" && <UniverseBackground starCount={30} />}

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10">
        {/* Hero Header */}
        <FadeIn direction="down" delay={0.1} className="text-center py-12">
          <div className="mb-6">
            <AccessibleHeading level="h1" className="mb-4" gradient>
              <motion.span
                className="inline-block mr-4"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                👋
              </motion.span>
              <SplitText className="inline">Welcome back!</SplitText>
            </AccessibleHeading>
            <AccessibleText
              color="secondary"
              className="mb-8 max-w-2xl mx-auto"
            >
              {viewMode === "play"
                ? "Navigate your financial universe — where every dollar has its place in your wealth galaxy!"
                : "Here's your money in plain English. Everything you need to know, nothing you don't."}
            </AccessibleText>
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
                    <AccessibleHeading level="h2" className="mr-3">
                      📋 Recent Activity
                    </AccessibleHeading>
                  </div>
                  <AccessibleButton
                    variant="primary"
                    onClick={() => handleQuickAction("view_transactions")}
                  >
                    See All Activity
                  </AccessibleButton>
                </div>
                <AccessibleText color="secondary" className="mt-2">
                  Your latest money movements
                </AccessibleText>
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
                  <AccessibleHeading level="h2" className="mb-2">
                    ⚡ Quick Actions
                  </AccessibleHeading>
                  <AccessibleText color="secondary">
                    Common things you might want to do
                  </AccessibleText>
                </div>
              </div>

              <div className="p-8">
                <AccessibleGrid cols={4} gap="md">
                  <AccessibleQuickAction
                    icon="➕"
                    title="Add Transaction"
                    description="Record a purchase or payment"
                    color="green"
                    onClick={() => handleQuickAction("add_transaction")}
                  />

                  <AccessibleQuickAction
                    icon="🔗"
                    title="Link Account"
                    description="Connect a new bank account"
                    color="blue"
                    onClick={() => handleQuickAction("link_account")}
                  />

                  <AccessibleQuickAction
                    icon="📄"
                    title="Import Data"
                    description="Upload transactions from file"
                    color="purple"
                    onClick={() => handleQuickAction("import_csv")}
                  />

                  <AccessibleQuickAction
                    icon="📊"
                    title="View Reports"
                    description="See spending patterns"
                    color="orange"
                    onClick={() => handleQuickAction("view_analytics")}
                  />
                </AccessibleGrid>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Smart Highlights - Financial Insights */}
        <SmartHighlights
          highlights={dashboardHighlights}
          title="Your Financial Pulse"
          subtitle="Smart insights about your money — like having a personal finance coach in your pocket!"
          className="mb-12"
        />

        {/* Encouraging Footer Message */}
        <FadeIn direction="up" delay={1.0}>
          <div
            className={`text-center rounded-2xl p-8 border ${
              viewMode === "play"
                ? "bg-white/10 backdrop-blur-sm border-white/20 text-white"
                : "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-gray-900"
            }`}
          >
            <div className="text-4xl mb-4">🎉</div>
            <AccessibleHeading level="h3" className="mb-4">
              You're doing great with your money!
            </AccessibleHeading>
            <AccessibleText
              color="secondary"
              className="mb-6 max-w-2xl mx-auto"
            >
              Keep track of your finances, and watch your wealth grow over time.
              Remember, every dollar saved is a dollar earned!
            </AccessibleText>
            <AccessibleText variant="small" color="secondary">
              💡 Tip: Check your dashboard regularly to stay on top of your
              financial health
            </AccessibleText>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
