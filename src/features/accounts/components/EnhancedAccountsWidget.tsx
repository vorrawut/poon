import { FadeIn, RatioBar, SyncStatus, InfoTooltip } from '../../../components/ui';
import { useAccountsOverview, useAccountSync } from '../hooks/useAccounts';
import { CheckCircleIcon, CreditCardIcon, BanknotesIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';

interface EnhancedAccountsWidgetProps {
  onAccountAction?: (action: string, accountId?: string) => void;
  className?: string;
}

export function EnhancedAccountsWidget({
  onAccountAction,
  className = ''
}: EnhancedAccountsWidgetProps) {
  const { overview, loading, error, refreshOverview } = useAccountsOverview();
  const { syncAllAccounts, isSyncing } = useAccountSync();

  console.log('🔍 EnhancedAccountsWidget render:', {
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
    console.log('🔍 EnhancedAccountsWidget: Rendering loading state');
    return (
      <FadeIn className={`bg-white rounded-2xl shadow-card border border-gray-200 p-8 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-48 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-32"></div>
            ))}
          </div>
        </div>
      </FadeIn>
    );
  }

  if (error) {
    return (
      <FadeIn className={`bg-red-50 border border-red-200 rounded-2xl p-8 ${className}`}>
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-red-800 mb-2">
            Can't Load Your Accounts
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={refreshOverview}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </FadeIn>
    );
  }

  if (!overview) {
    return (
      <FadeIn className={`bg-gray-50 border border-gray-200 rounded-2xl p-8 ${className}`}>
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">🏦</div>
          <p>No account data available</p>
        </div>
      </FadeIn>
    );
  }

  // Group accounts by type for easier understanding
  const accounts = overview.accounts || [];
  const accountsByType = {
    checking: accounts.filter(acc => acc.type === 'checking'),
    savings: accounts.filter(acc => acc.type === 'savings'),
    investment: accounts.filter(acc => acc.type === 'investment'),
    credit: accounts.filter(acc => acc.type === 'credit'),
    loan: accounts.filter(acc => acc.type === 'loan')
  };


  const getAccountTypeLabel = (type: string) => {
    switch (type) {
      case 'checking': return 'Checking Accounts';
      case 'savings': return 'Savings Accounts';
      case 'investment': return 'Investment Accounts';
      case 'credit': return 'Credit Cards';
      case 'loan': return 'Loans';
      default: return 'Other Accounts';
    }
  };

  const getAccountEmoji = (type: string) => {
    switch (type) {
      case 'checking': return '💳';
      case 'savings': return '💰';
      case 'investment': return '📈';
      case 'credit': return '💳';
      case 'loan': return '🏠';
      default: return '🏦';
    }
  };

  return (
    <FadeIn className={`bg-white rounded-2xl shadow-card border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 px-8 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-gray-900 mr-3">🏦 Your Bank Accounts</h2>
            <InfoTooltip content="This shows all your bank accounts, credit cards, and loans in one place." />
          </div>
          <div className="flex items-center space-x-4">
            <SyncStatus lastSyncAt={overview.lastSyncAt} />
            <button
              onClick={handleSyncAll}
              disabled={isSyncing()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              <span>{isSyncing() ? '⏳' : '🔄'}</span>
              <span>{isSyncing() ? 'Updating...' : 'Update All'}</span>
            </button>
          </div>
        </div>

        {/* Assets vs Liabilities Ratio */}
        <div className="mb-4">
          <RatioBar
            positive={overview.totalAssets}
            negative={-overview.totalLiabilities}
            positiveLabel="💰 What You Own"
            negativeLabel="💳 What You Owe"
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-green-700 mb-1">💰 Your Assets</div>
                <div className="text-2xl font-bold text-green-600">
                  ${overview.totalAssets.toLocaleString()}
                </div>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-red-700 mb-1">💳 Your Debts</div>
                <div className="text-2xl font-bold text-red-600">
                  ${overview.totalLiabilities.toLocaleString()}
                </div>
              </div>
              <CreditCardIcon className="h-8 w-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-blue-700 mb-1">📊 Net Worth</div>
                <div className="text-2xl font-bold text-blue-600">
                  ${overview.netWorth.toLocaleString()}
                </div>
              </div>
              <BuildingLibraryIcon className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Account Groups */}
      <div className="p-8">
        <div className="space-y-8">
          {Object.entries(accountsByType).map(([type, accounts]) => {
            if (accounts.length === 0) return null;

            const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

            return (
              <div key={type} className="border-b border-gray-100 pb-6 last:border-b-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{getAccountEmoji(type)}</span>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {getAccountTypeLabel(type)}
                    </h3>
                    <span className="ml-3 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                      {accounts.length} account{accounts.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {totalBalance >= 0 ? '+' : ''}${Math.abs(totalBalance).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Total Balance</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {accounts.map((account) => (
                    <div
                      key={account.id}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => onAccountAction?.('view_account', account.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 truncate mr-2">
                          {account.name}
                        </h4>
                        {!account.isManual && (
                          <SyncStatus
                            lastSyncAt={account.lastSyncAt}
                            isStale={false}
                            showLabel={false}
                          />
                        )}
                      </div>

                      <div className="text-xl font-bold mb-1 text-gray-900">
                        {account.balance >= 0 ? '+' : ''}${Math.abs(account.balance).toLocaleString()}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{account.provider}</span>
                        {account.metadata?.accountNumber && (
                          <span>****{account.metadata.accountNumber.slice(-4)}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onAccountAction?.('link_account')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <span>🔗</span>
            <span>Link New Account</span>
          </button>
          
          <button
            onClick={() => onAccountAction?.('view_accounts')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>👀</span>
            <span>View All Details</span>
          </button>
          
          <button
            onClick={() => onAccountAction?.('import_csv')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <span>📄</span>
            <span>Import Data</span>
          </button>
        </div>
      </div>
    </FadeIn>
  );
}
