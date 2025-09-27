import { create } from 'zustand';
import type { Account, DashboardMetrics } from '../types';

interface AccountState {
  accounts: Account[];
  selectedAccount: Account | null;
  isLoading: boolean;
  error: string | null;
  dashboardMetrics: DashboardMetrics;
  
  // Actions
  setAccounts: (accounts: Account[]) => void;
  addAccount: (account: Account) => void;
  updateAccount: (id: string, updates: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
  selectAccount: (account: Account | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  calculateMetrics: () => void;
  
  // Async actions
  fetchAccounts: () => Promise<void>;
  syncAccount: (accountId: string) => Promise<void>;
  linkBankAccount: (provider: 'plaid' | 'saltedge', token: string) => Promise<void>;
}

export const useAccountStore = create<AccountState>((set, get) => ({
  accounts: [],
  selectedAccount: null,
  isLoading: false,
  error: null,
  dashboardMetrics: {
    totalNetWorth: 0,
    netWorthChange: 0,
    netWorthChangePercent: 0,
    totalAssets: 0,
    totalLiabilities: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    savingsRate: 0,
  },

  setAccounts: (accounts) => {
    set({ accounts });
    get().calculateMetrics();
  },

  addAccount: (account) => {
    set((state) => ({ accounts: [...state.accounts, account] }));
    get().calculateMetrics();
  },

  updateAccount: (id, updates) => {
    set((state) => ({
      accounts: state.accounts.map(account =>
        account.id === id ? { ...account, ...updates } : account
      ),
    }));
    get().calculateMetrics();
  },

  deleteAccount: (id) => {
    set((state) => ({
      accounts: state.accounts.filter(account => account.id !== id),
      selectedAccount: state.selectedAccount?.id === id ? null : state.selectedAccount,
    }));
    get().calculateMetrics();
  },

  selectAccount: (account) => set({ selectedAccount: account }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  calculateMetrics: () => {
    const { accounts } = get();
    
    const totalAssets = accounts
      .filter(acc => acc.current_balance > 0)
      .reduce((sum, acc) => sum + acc.current_balance, 0);
    
    const totalLiabilities = accounts
      .filter(acc => acc.current_balance < 0)
      .reduce((sum, acc) => sum + Math.abs(acc.current_balance), 0);
    
    const totalNetWorth = totalAssets - totalLiabilities;
    
    // TODO: Calculate these from transaction data
    const netWorthChange = 0;
    const netWorthChangePercent = 0;
    const monthlyIncome = 0;
    const monthlyExpenses = 0;
    const savingsRate = 0;

    set({
      dashboardMetrics: {
        totalNetWorth,
        netWorthChange,
        netWorthChangePercent,
        totalAssets,
        totalLiabilities,
        monthlyIncome,
        monthlyExpenses,
        savingsRate,
      },
    });
  },

  fetchAccounts: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // In a real app, this would be an API call
      const response = await fetch('/api/accounts');
      if (!response.ok) throw new Error('Failed to fetch accounts');
      
      const data = await response.json();
      get().setAccounts(data.accounts);
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch accounts' });
    } finally {
      set({ isLoading: false });
    }
  },

  syncAccount: async (accountId) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch(`/api/accounts/${accountId}/sync`, {
        method: 'POST',
      });
      
      if (!response.ok) throw new Error('Failed to sync account');
      
      const updatedAccount = await response.json();
      get().updateAccount(accountId, updatedAccount);
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to sync account' });
    } finally {
      set({ isLoading: false });
    }
  },

  linkBankAccount: async (provider, token) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch('/api/accounts/link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ provider, token }),
      });
      
      if (!response.ok) throw new Error('Failed to link bank account');
      
      const newAccounts = await response.json();
      set((state) => ({ 
        accounts: [...state.accounts, ...newAccounts] 
      }));
      get().calculateMetrics();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to link account' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
