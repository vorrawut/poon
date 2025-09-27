import { AnimatedList, AnimatedNumber, FadeIn } from "../../../components/ui";
import {
  BanknotesIcon,
  ChartBarIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
  ArrowPathIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useAccountsOverview, useAccountSync } from "../hooks/useAccounts";
import { type AccountType } from "../types";

interface AccountsOverviewWidgetProps {
  className?: string;
  onAccountAction?: (action: string, accountId?: string) => void;
}

export function AccountsOverviewWidget({
  className = "",
  onAccountAction,
}: AccountsOverviewWidgetProps) {
  const { overview, loading, error, refreshOverview } = useAccountsOverview();
  const { syncAllAccounts, isSyncing } = useAccountSync();

  console.log('🔍 AccountsOverviewWidget render:', {
    loading,
    hasData: !!overview,
    error,
    accountCount: overview?.accounts?.length || 0,
    totalAssets: overview?.totalAssets,
    totalLiabilities: overview?.totalLiabilities
  });

  const handleSyncAll = async () => {
    await syncAllAccounts();
    refreshOverview();
  };

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-32"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`bg-red-50 border border-red-200 rounded-xl p-6 ${className}`}
      >
        <div className="text-red-600 font-medium mb-2">
          Failed to load accounts
        </div>
        <div className="text-red-500 text-sm mb-4">{error}</div>
        <button
          onClick={refreshOverview}
          className="text-red-600 hover:text-red-700 font-medium text-sm"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!overview) return null;

  const accountTypeConfig: Record<
    AccountType,
    { icon: React.ComponentType<{ className?: string }>; label: string; color: string }
  > = {
    checking: {
      icon: BanknotesIcon,
      label: "Checking",
      color: "from-green-500 to-emerald-600",
    },
    savings: {
      icon: BuildingLibraryIcon,
      label: "Savings",
      color: "from-blue-500 to-indigo-600",
    },
    investment: {
      icon: ChartBarIcon,
      label: "Investments",
      color: "from-purple-500 to-violet-600",
    },
    credit: {
      icon: CreditCardIcon,
      label: "Credit Cards",
      color: "from-red-500 to-rose-600",
    },
    loan: {
      icon: CreditCardIcon,
      label: "Loans",
      color: "from-orange-500 to-amber-600",
    },
    mortgage: {
      icon: BuildingLibraryIcon,
      label: "Mortgage",
      color: "from-gray-500 to-slate-600",
    },
  };

  const accountTypeCards = Object.entries(overview.accountsByType).map(
    ([type, accounts]) => {
      const config = accountTypeConfig[type as AccountType];
      const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
      const accountCount = accounts.length;

      return {
        type: type as AccountType,
        config,
        totalBalance,
        accountCount,
        accounts,
      };
    },
  );

  return (
    <FadeIn direction="up" delay={0.1} className={className}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Accounts Overview
            </h2>
            <p className="text-gray-600">
              Last synced:{" "}
              {overview.lastSyncAt?.toLocaleTimeString() || "Never"}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSyncAll}
              disabled={isSyncing()}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
            >
              <ArrowPathIcon
                className={`h-4 w-4 ${isSyncing() ? "animate-spin" : ""}`}
              />
              <span>Sync All</span>
            </button>
            <button
              onClick={() => onAccountAction?.("add_account")}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Add Account</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white">
                <BanknotesIcon className="h-6 w-6" />
              </div>
              <div className="text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
                Assets
              </div>
            </div>
            <div className="mb-1">
              <AnimatedNumber
                value={overview.totalAssets}
                format="currency"
                className="text-2xl font-bold text-gray-900"
                delay={0.3}
              />
            </div>
            <p className="text-sm text-gray-600">Total Assets</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center text-white">
                <CreditCardIcon className="h-6 w-6" />
              </div>
              <div className="text-red-600 text-xs font-medium bg-red-50 px-2 py-1 rounded-full">
                Liabilities
              </div>
            </div>
            <div className="mb-1">
              <AnimatedNumber
                value={overview.totalLiabilities}
                format="currency"
                className="text-2xl font-bold text-gray-900"
                delay={0.5}
              />
            </div>
            <p className="text-sm text-gray-600">Total Liabilities</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white">
                <ChartBarIcon className="h-6 w-6" />
              </div>
              <div className="text-blue-600 text-xs font-medium bg-blue-50 px-2 py-1 rounded-full">
                Net Worth
              </div>
            </div>
            <div className="mb-1">
              <AnimatedNumber
                value={overview.totalBalance}
                format="currency"
                className="text-2xl font-bold text-gray-900"
                delay={0.7}
              />
            </div>
            <p className="text-sm text-gray-600">Net Balance</p>
          </div>
        </div>

        {/* Account Type Cards */}
        <AnimatedList
          animationType="slideUp"
          stagger={0.1}
          delay={0.4}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {accountTypeCards.map(
            ({ type, config, totalBalance, accountCount, accounts }) => (
              <div
                key={type}
                className="bg-white rounded-xl p-6 shadow-card hover:shadow-elegant transition-all duration-200 border border-gray-100 cursor-pointer group"
                onClick={() => onAccountAction?.("view_accounts", type)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`h-12 w-12 bg-gradient-to-br ${config.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform`}
                  >
                    <config.icon className="h-6 w-6" />
                  </div>
                  <div className="text-gray-500 text-xs font-medium bg-gray-50 px-2 py-1 rounded-full">
                    {accountCount} {accountCount === 1 ? "account" : "accounts"}
                  </div>
                </div>

                <div className="mb-2">
                  <AnimatedNumber
                    value={Math.abs(totalBalance)}
                    format="currency"
                    className="text-xl font-bold text-gray-900"
                    delay={
                      0.9 +
                      accountTypeCards.indexOf({
                        type,
                        config,
                        totalBalance,
                        accountCount,
                        accounts,
                      }) *
                        0.1
                    }
                  />
                </div>

                <p className="text-sm font-medium text-gray-700 mb-3">
                  {config.label}
                </p>

                <div className="space-y-1">
                  {accounts.slice(0, 2).map((account) => (
                    <div
                      key={account.id}
                      className="flex justify-between text-xs text-gray-600"
                    >
                      <span className="truncate flex-1 mr-2">
                        {account.name}
                      </span>
                      <span className="font-medium">
                        ${Math.abs(account.balance).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  {accounts.length > 2 && (
                    <div className="text-xs text-gray-500 mt-2">
                      +{accounts.length - 2} more accounts
                    </div>
                  )}
                </div>
              </div>
            ),
          )}
        </AnimatedList>
      </div>
    </FadeIn>
  );
}
