import { useEffect } from 'react';
import { useAccountStore } from '../store/useAccountStore';
import { useTransactionStore } from '../store/useTransactionStore';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { mockAccounts, mockTransactions, mockAssets } from '../mock/data';

export function useInitializeData() {
  const setAccounts = useAccountStore(state => state.setAccounts);
  const setTransactions = useTransactionStore(state => state.setTransactions);
  const setAssets = usePortfolioStore(state => state.setAssets);

  useEffect(() => {
    // Initialize stores with mock data
    setAccounts(mockAccounts);
    setTransactions(mockTransactions);
    setAssets(mockAssets);
  }, [setAccounts, setTransactions, setAssets]);
}
