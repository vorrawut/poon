import { useEffect } from 'react';
import { useAccountStore } from '../store/useAccountStore';
import { useTransactionStore } from '../store/useTransactionStore';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { AnimatedNumber, SplitText, FadeIn, AnimatedList } from '../components/ui';
import { formatCurrency, formatDate } from '../lib/utils';
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  EyeIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

export function Dashboard() {
  const { dashboardMetrics, fetchAccounts } = useAccountStore();
  const { transactions, fetchTransactions } = useTransactionStore();
  const { assets, fetchAssets } = usePortfolioStore();

  useEffect(() => {
    // Load initial data
    fetchAccounts();
    fetchTransactions();
    fetchAssets();
  }, [fetchAccounts, fetchTransactions, fetchAssets]);

  const recentTransactions = transactions.slice(0, 5);
  const topAssets = assets.slice(0, 4);

  const netWorthChangeIsPositive = dashboardMetrics.netWorthChange >= 0;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <FadeIn direction="down" className="mb-8">
        <div className="text-center">
          <SplitText 
            animationType="slideUp"
            className="text-4xl font-bold text-gray-900 mb-2"
          >
            Welcome back!
          </SplitText>
          <p className="text-gray-600">Here's your financial overview</p>
        </div>
      </FadeIn>

      {/* Net Worth Section */}
      <FadeIn direction="up" delay={0.2} className="mb-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 p-8 text-white shadow-elegant">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white/90 text-lg font-medium mb-3">
                  Total Net Worth
                </h2>
                <div className="flex items-baseline space-x-4">
                  <AnimatedNumber
                    value={dashboardMetrics.totalNetWorth}
                    format="currency"
                    className="text-5xl font-bold text-white tracking-tight"
                    duration={1.5}
                    delay={0.5}
                  />
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                    netWorthChangeIsPositive 
                      ? 'bg-green-500/20 text-green-100' 
                      : 'bg-red-500/20 text-red-100'
                  }`}>
                    {netWorthChangeIsPositive ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    )}
                    <AnimatedNumber
                      value={Math.abs(dashboardMetrics.netWorthChange)}
                      format="currency"
                      delay={1.0}
                    />
                    <span>
                      ({dashboardMetrics.netWorthChangePercent > 0 ? '+' : ''}
                      <AnimatedNumber
                        value={dashboardMetrics.netWorthChangePercent}
                        format="percent"
                        decimals={1}
                        delay={1.2}
                      />)
                    </span>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-colors flex items-center space-x-2">
                <EyeIcon className="h-4 w-4" />
                <span>View Details</span>
              </button>
            </div>
          </div>
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl"></div>
        </div>
      </FadeIn>

      {/* Overview Cards */}
      <AnimatedList 
        animationType="slideUp" 
        stagger={0.1} 
        delay={0.4}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-white rounded-xl p-6 shadow-card hover:shadow-elegant transition-shadow border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Assets</p>
              <AnimatedNumber
                value={dashboardMetrics.totalAssets}
                format="currency"
                className="text-2xl font-bold text-gray-900"
                delay={0.8}
              />
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
              <ArrowUpIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-card hover:shadow-elegant transition-shadow border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Monthly Income</p>
              <AnimatedNumber
                value={dashboardMetrics.monthlyIncome}
                format="currency"
                className="text-2xl font-bold text-gray-900"
                delay={1.0}
              />
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-card hover:shadow-elegant transition-shadow border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Monthly Expenses</p>
              <AnimatedNumber
                value={dashboardMetrics.monthlyExpenses}
                format="currency"
                className="text-2xl font-bold text-gray-900"
                delay={1.2}
              />
            </div>
            <div className="h-12 w-12 bg-red-100 rounded-xl flex items-center justify-center">
              <ArrowDownIcon className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-card hover:shadow-elegant transition-shadow border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Savings Rate</p>
              <AnimatedNumber
                value={dashboardMetrics.savingsRate}
                format="percent"
                className="text-2xl font-bold text-gray-900"
                delay={1.4}
              />
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </AnimatedList>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <FadeIn direction="left" delay={0.6}>
          <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              <AnimatedList animationType="slideUp" stagger={0.1} className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                        transaction.type === 'credit' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <ArrowUpIcon className="h-5 w-5" />
                        ) : (
                          <ArrowDownIcon className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {transaction.merchant || transaction.description}
                        </p>
                        <p className="text-sm text-gray-500">{transaction.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold text-sm ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(transaction.posted_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </AnimatedList>
            </div>
          </div>
        </FadeIn>

        {/* Top Assets */}
        <FadeIn direction="right" delay={0.8}>
          <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Top Holdings</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View Portfolio
                </button>
              </div>
            </div>
            <div className="p-6">
              <AnimatedList animationType="slideUp" stagger={0.1} className="space-y-4">
                {topAssets.map((asset) => (
                  <div key={asset.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {asset.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{asset.symbol}</p>
                        <p className="text-sm text-gray-500">{asset.quantity} shares</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-sm">
                        {formatCurrency(asset.market_value || 0)}
                      </p>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        (asset.change_percent || 0) >= 0 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {(asset.change_percent || 0) >= 0 ? '+' : ''}
                        {(asset.change_percent || 0).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </AnimatedList>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Quick Actions */}
      <FadeIn direction="up" delay={1.0} className="mt-8">
        <div className="bg-white rounded-xl shadow-card border border-gray-100 p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group">
              <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-3 group-hover:scale-105 transition-transform">
                <PlusIcon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-gray-900">Add Transaction</span>
            </button>
            
            <button className="flex flex-col items-center p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors group">
              <div className="h-12 w-12 bg-green-600 rounded-xl flex items-center justify-center text-white mb-3 group-hover:scale-105 transition-transform">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">Link Account</span>
            </button>
            
            <button className="flex flex-col items-center p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors group">
              <div className="h-12 w-12 bg-purple-600 rounded-xl flex items-center justify-center text-white mb-3 group-hover:scale-105 transition-transform">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">Import CSV</span>
            </button>
            
            <button className="flex flex-col items-center p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors group">
              <div className="h-12 w-12 bg-orange-600 rounded-xl flex items-center justify-center text-white mb-3 group-hover:scale-105 transition-transform">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">Add Investment</span>
            </button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
