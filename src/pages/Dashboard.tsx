import { useEffect } from 'react';
import { useAccountStore } from '../store/useAccountStore';
import { useTransactionStore } from '../store/useTransactionStore';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { AnimatedNumber, SplitText, FadeIn, AnimatedList } from '../components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
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
        <Card variant="elevated" className="bg-gradient-to-br from-primary-500 to-primary-600 text-white border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white/90 text-lg font-medium">
                  Total Net Worth
                </CardTitle>
                <div className="flex items-baseline space-x-4 mt-2">
                  <AnimatedNumber
                    value={dashboardMetrics.totalNetWorth}
                    format="currency"
                    className="text-4xl font-bold text-white"
                    duration={1.5}
                    delay={0.5}
                  />
                  <div className={`flex items-center space-x-1 text-sm ${
                    netWorthChangeIsPositive ? 'text-green-200' : 'text-red-200'
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
              <Button variant="secondary" size="sm" className="text-primary-600">
                <EyeIcon className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          </CardHeader>
        </Card>
      </FadeIn>

      {/* Overview Cards */}
      <AnimatedList 
        animationType="slideUp" 
        stagger={0.1} 
        delay={0.4}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Assets</p>
                <AnimatedNumber
                  value={dashboardMetrics.totalAssets}
                  format="currency"
                  className="text-2xl font-bold text-gray-900"
                  delay={0.8}
                />
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                <ArrowUpIcon className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Monthly Income</p>
                <AnimatedNumber
                  value={dashboardMetrics.monthlyIncome}
                  format="currency"
                  className="text-2xl font-bold text-gray-900"
                  delay={1.0}
                />
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Monthly Expenses</p>
                <AnimatedNumber
                  value={dashboardMetrics.monthlyExpenses}
                  format="currency"
                  className="text-2xl font-bold text-gray-900"
                  delay={1.2}
                />
              </div>
              <div className="h-8 w-8 bg-red-100 rounded-lg flex items-center justify-center">
                <ArrowDownIcon className="h-4 w-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Savings Rate</p>
                <AnimatedNumber
                  value={dashboardMetrics.savingsRate}
                  format="percent"
                  className="text-2xl font-bold text-gray-900"
                  delay={1.4}
                />
              </div>
              <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedList>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <FadeIn direction="left" delay={0.6}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <AnimatedList animationType="slideUp" stagger={0.1} className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'credit' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <ArrowUpIcon className="h-5 w-5" />
                        ) : (
                          <ArrowDownIcon className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {transaction.merchant || transaction.description}
                        </p>
                        <p className="text-sm text-gray-500">{transaction.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(transaction.posted_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </AnimatedList>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Top Assets */}
        <FadeIn direction="right" delay={0.8}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Top Holdings</CardTitle>
                <Button variant="ghost" size="sm">
                  View Portfolio
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <AnimatedList animationType="slideUp" stagger={0.1} className="space-y-3">
                {topAssets.map((asset) => (
                  <div key={asset.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {asset.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{asset.symbol}</p>
                        <p className="text-sm text-gray-500">{asset.quantity} shares</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(asset.market_value || 0)}
                      </p>
                      <p className={`text-sm ${
                        (asset.change_percent || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {(asset.change_percent || 0) >= 0 ? '+' : ''}
                        {(asset.change_percent || 0).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </AnimatedList>
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      {/* Quick Actions */}
      <FadeIn direction="up" delay={1.0} className="mt-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="primary">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Transaction
                </Button>
                <Button variant="outline">
                  Link Bank Account
                </Button>
                <Button variant="outline">
                  Import CSV
                </Button>
                <Button variant="outline">
                  Add Investment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
