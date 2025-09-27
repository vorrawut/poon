import { useState, useEffect } from "react";
import {
  type Account,
  type AccountsOverview,
  type AccountSyncResult,
} from "../types";
import { accountsService } from "../services/accountsService";

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const data = await accountsService.fetchAccounts();
      setAccounts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return {
    accounts,
    loading,
    error,
    refreshAccounts: fetchAccounts,
  };
}

export function useAccountsOverview() {
  const [overview, setOverview] = useState<AccountsOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOverview = async () => {
    try {
      console.log('🔍 useAccountsOverview: Starting fetch, setting loading=true');
      setLoading(true);
      setError(null);
      
      const data = await accountsService.fetchAccountsOverview();
      console.log('🔍 useAccountsOverview: Data received:', data);
      
      setOverview(data);
      console.log('🔍 useAccountsOverview: Data set in state');
    } catch (err) {
      console.error('🔍 useAccountsOverview: Error occurred:', err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch accounts overview",
      );
    } finally {
      console.log('🔍 useAccountsOverview: Setting loading=false');
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🔍 useAccountsOverview effect triggered');
    fetchOverview();
  }, []);

  return {
    overview,
    loading,
    error,
    refreshOverview: fetchOverview,
  };
}

export function useAccountSync() {
  const [syncing, setSyncing] = useState<string[]>([]);
  const [syncResults, setSyncResults] = useState<AccountSyncResult[]>([]);

  const syncAccount = async (accountId: string) => {
    setSyncing((prev) => [...prev, accountId]);

    try {
      const result = await accountsService.syncAccount(accountId);
      setSyncResults((prev) => {
        const filtered = prev.filter((r) => r.accountId !== accountId);
        return [...filtered, result];
      });
      return result;
    } finally {
      setSyncing((prev) => prev.filter((id) => id !== accountId));
    }
  };

  const syncAllAccounts = async () => {
    setSyncing(["all"]);

    try {
      const results = await accountsService.syncAllAccounts();
      setSyncResults(results);
      return results;
    } finally {
      setSyncing([]);
    }
  };

  const isSyncing = (accountId?: string) => {
    return accountId ? syncing.includes(accountId) : syncing.length > 0;
  };

  const getSyncResult = (accountId: string) => {
    return syncResults.find((r) => r.accountId === accountId);
  };

  return {
    syncing,
    syncResults,
    syncAccount,
    syncAllAccounts,
    isSyncing,
    getSyncResult,
  };
}
