import { useState } from "react";
import { motion } from "framer-motion";
import { SplitText, FadeIn, TimeRangeSelector } from "../../../components/ui";
import {
  ThemeAwareHeading,
  ThemeAwareText,
  ThemeAwareButton,
  ThemeAwareQuickAction,
  ThemeAwareGrid,
  useTheme,
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
  const { isPlayMode } = useTheme();

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
    <div className="min-h-screen relative overflow-hidden bg-[var(--color-bg-primary)]">
      {isPlayMode && <UniverseBackground starCount={30} />}

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10">
        {/* Hero Header */}
        <FadeIn
          direction="down"
          delay={0.1}
          className="text-center py-8 sm:py-12"
        >
          <div className="mb-6">
            <ThemeAwareHeading
              level="h1"
              className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              gradient={isPlayMode}
            >
              <motion.span
                className="inline-block mr-4"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                👋
              </motion.span>
              <SplitText className="inline">Welcome back!</SplitText>
            </ThemeAwareHeading>
            <ThemeAwareText
              color="secondary"
              className="mb-8 max-w-2xl mx-auto text-base sm:text-lg"
            >
              {isPlayMode
                ? "Navigate your financial universe — where every dollar has its place in your wealth galaxy!"
                : "Here's your money in plain English. Everything you need to know, nothing you don't."}
            </ThemeAwareText>
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
            <div className="bg-[var(--color-surface-primary)] rounded-[var(--border-radius)] shadow-lg border border-[var(--color-border-primary)] overflow-hidden">
              <div
                className={`px-6 sm:px-8 py-6 border-b border-[var(--color-border-primary)] ${
                  isPlayMode
                    ? "bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-accent-500)]/10"
                    : "bg-[var(--color-surface-secondary)]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center">
                    <ThemeAwareHeading
                      level="h2"
                      className="mr-3 text-xl sm:text-2xl"
                      gradient={isPlayMode}
                    >
                      📋 Recent Activity
                    </ThemeAwareHeading>
                  </div>
                  <ThemeAwareButton
                    variant={isPlayMode ? "cosmic" : "primary"}
                    onClick={() => handleQuickAction("view_transactions")}
                    glow={isPlayMode}
                    className="text-sm sm:text-base"
                  >
                    See All Activity
                  </ThemeAwareButton>
                </div>
                <ThemeAwareText
                  color="secondary"
                  className="mt-2 text-sm sm:text-base"
                >
                  Your latest money movements
                </ThemeAwareText>
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
            <div className="bg-[var(--color-surface-primary)] rounded-[var(--border-radius)] shadow-lg border border-[var(--color-border-primary)] overflow-hidden">
              <div
                className={`px-6 sm:px-8 py-6 border-b border-[var(--color-border-primary)] ${
                  isPlayMode
                    ? "bg-gradient-to-r from-[var(--color-accent-500)]/10 to-[var(--color-primary-500)]/10"
                    : "bg-[var(--color-surface-secondary)]"
                }`}
              >
                <div className="text-center">
                  <ThemeAwareHeading
                    level="h2"
                    className="mb-2 text-xl sm:text-2xl"
                    gradient={isPlayMode}
                  >
                    ⚡ Quick Actions
                  </ThemeAwareHeading>
                  <ThemeAwareText
                    color="secondary"
                    className="text-sm sm:text-base"
                  >
                    Common things you might want to do
                  </ThemeAwareText>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <ThemeAwareGrid cols={4} gap="md">
                  <ThemeAwareQuickAction
                    icon="➕"
                    title="Add Transaction"
                    description="Record a purchase or payment"
                    color="green"
                    onClick={() => handleQuickAction("add_transaction")}
                  />

                  <ThemeAwareQuickAction
                    icon="🔗"
                    title="Link Account"
                    description="Connect a new bank account"
                    color="blue"
                    onClick={() => handleQuickAction("link_account")}
                  />

                  <ThemeAwareQuickAction
                    icon="📄"
                    title="Import Data"
                    description="Upload transactions from file"
                    color="purple"
                    onClick={() => handleQuickAction("import_csv")}
                  />

                  <ThemeAwareQuickAction
                    icon="📊"
                    title="View Reports"
                    description="See spending patterns"
                    color="orange"
                    onClick={() => handleQuickAction("view_analytics")}
                  />
                </ThemeAwareGrid>
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
            <ThemeAwareHeading
              level="h3"
              className="mb-4 text-xl sm:text-2xl"
              gradient={isPlayMode}
            >
              You're doing great with your money!
            </ThemeAwareHeading>
            <ThemeAwareText
              color="secondary"
              className="mb-6 max-w-2xl mx-auto text-sm sm:text-base"
            >
              Keep track of your finances, and watch your wealth grow over time.
              Remember, every dollar saved is a dollar earned!
            </ThemeAwareText>
            <ThemeAwareText className="text-xs sm:text-sm" color="secondary">
              💡 Tip: Check your dashboard regularly to stay on top of your
              financial health
            </ThemeAwareText>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
