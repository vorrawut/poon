import { type Account, type AccountSyncResult, type AccountsOverview, type AccountType } from '../types';

class AccountsService {
  private baseUrl = '/api/accounts';

  async fetchAccounts(): Promise<Account[]> {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.map(this.transformAccountResponse);
    } catch (error) {
      console.warn('Using mock accounts data:', error);
      return this.getMockAccounts();
    }
  }

  async fetchAccountsOverview(): Promise<AccountsOverview> {
    const accounts = await this.fetchAccounts();
    
    const totalAssets = accounts
      .filter(acc => ['checking', 'savings', 'investment'].includes(acc.type))
      .reduce((sum, acc) => sum + Math.max(0, acc.balance), 0);
    
    const totalLiabilities = accounts
      .filter(acc => ['credit', 'loan', 'mortgage'].includes(acc.type))
      .reduce((sum, acc) => sum + Math.max(0, -acc.balance), 0);
    
    const accountsByType = accounts.reduce((grouped, account) => {
      if (!grouped[account.type]) {
        grouped[account.type] = [];
      }
      grouped[account.type].push(account);
      return grouped;
    }, {} as Record<AccountType, Account[]>);

    return {
      totalBalance: totalAssets - totalLiabilities,
      totalAssets,
      totalLiabilities,
      accountsByType,
      lastSyncAt: new Date(),
    };
  }

  async syncAccount(accountId: string): Promise<AccountSyncResult> {
    try {
      const response = await fetch(`${this.baseUrl}/${accountId}/sync`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        accountId,
        success: data.success,
        lastSyncAt: new Date(data.last_sync_at),
        error: data.error,
        newTransactions: data.new_transactions || 0,
      };
    } catch (error) {
      return {
        accountId,
        success: false,
        lastSyncAt: new Date(),
        error: error instanceof Error ? error.message : 'Sync failed',
        newTransactions: 0,
      };
    }
  }

  async syncAllAccounts(): Promise<AccountSyncResult[]> {
    const accounts = await this.fetchAccounts();
    const syncPromises = accounts
      .filter(acc => !acc.isManual)
      .map(acc => this.syncAccount(acc.id));
    
    return Promise.all(syncPromises);
  }

  private transformAccountResponse(data: any): Account {
    return {
      id: data.id,
      name: data.name || `${data.provider} ${data.type}`,
      type: data.type,
      provider: data.provider || 'Manual',
      providerAccountId: data.provider_account_id,
      balance: parseFloat(data.balance) || 0,
      currency: data.currency || 'USD',
      lastSyncAt: data.last_sync_at ? new Date(data.last_sync_at) : undefined,
      status: data.status || 'active',
      syncStatus: data.sync_status || (data.provider ? 'synced' : 'manual'),
      isManual: !data.provider || data.provider === 'Manual',
      metadata: data.metadata,
    };
  }

  private getMockAccounts(): Account[] {
    return [
      {
        id: '1',
        name: 'Chase Checking',
        type: 'checking',
        provider: 'Chase',
        balance: 15420.50,
        currency: 'USD',
        lastSyncAt: new Date(),
        status: 'active',
        syncStatus: 'synced',
        isManual: false,
      },
      {
        id: '2',
        name: 'Ally High Yield Savings',
        type: 'savings',
        provider: 'Ally Bank',
        balance: 45000.00,
        currency: 'USD',
        lastSyncAt: new Date(),
        status: 'active',
        syncStatus: 'synced',
        isManual: false,
        metadata: { interestRate: 4.25 },
      },
      {
        id: '3',
        name: 'Fidelity 401k',
        type: 'investment',
        provider: 'Fidelity',
        balance: 78500.00,
        currency: 'USD',
        lastSyncAt: new Date(),
        status: 'active',
        syncStatus: 'synced',
        isManual: false,
      },
      {
        id: '4',
        name: 'Company Cash',
        type: 'checking',
        provider: 'Manual',
        balance: 25000.00,
        currency: 'USD',
        status: 'active',
        syncStatus: 'manual',
        isManual: true,
      },
    ];
  }
}

export const accountsService = new AccountsService();
