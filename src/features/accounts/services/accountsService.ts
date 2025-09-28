import {
  type Account,
  type AccountSyncResult,
  type AccountsOverview,
  type AccountType,
  type AccountStatus,
  type SyncStatus,
} from "../types";
import { config, shouldUseMockData } from "../../../../config/environments";

class AccountsService {
  async fetchAccounts(): Promise<Account[]> {
    console.log("🔍 AccountsService.fetchAccounts called");
    console.log("🔍 Environment:", config.environment);
    console.log("🔍 Should use mock data:", shouldUseMockData());

    // Check if we should use mock data based on environment configuration
    if (shouldUseMockData()) {
      console.log(`🏦 Using mock accounts data (${config.environment} mode)`);
      // Simulate API delay for realistic UX
      await new Promise((resolve) =>
        setTimeout(resolve, config.mockApiDelay * 0.6),
      ); // Slightly faster for accounts
      console.log("🏦 Mock delay completed, generating accounts...");

      const mockData = this.getMockAccounts();
      console.log("🏦 Mock accounts generated:", mockData.length, "accounts");
      return mockData;
    }

    try {
      const apiUrl = `${config.apiBaseUrl}/accounts`;
      console.info(`🌐 Fetching accounts from: ${apiUrl}`);

      // Create timeout signal for fetch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.apiTimeout);

      const response = await fetch(apiUrl, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.info("✅ Accounts data fetched successfully");
      return data.map(this.transformAccountResponse);
    } catch (error) {
      console.warn("⚠️ API failed, falling back to mock accounts data:", error);

      // In production, show error; in development, fallback to mock
      if (config.isProduction) {
        throw error;
      }

      // Fallback to mock data for development/local
      await new Promise((resolve) =>
        setTimeout(resolve, config.mockApiDelay * 0.6),
      );
      return this.getMockAccounts();
    }
  }

  async fetchAccountsOverview(): Promise<AccountsOverview> {
    const accounts = await this.fetchAccounts();

    const totalAssets = accounts
      .filter((acc) => ["checking", "savings", "investment"].includes(acc.type))
      .reduce((sum, acc) => sum + Math.max(0, acc.balance), 0);

    const totalLiabilities = accounts
      .filter((acc) => ["credit", "loan", "mortgage"].includes(acc.type))
      .reduce((sum, acc) => sum + Math.max(0, -acc.balance), 0);

    const accountsByType = accounts.reduce(
      (grouped, account) => {
        if (!grouped[account.type]) {
          grouped[account.type] = [];
        }
        grouped[account.type].push(account);
        return grouped;
      },
      {} as Record<AccountType, Account[]>,
    );

    const netWorth = totalAssets - totalLiabilities;

    return {
      totalBalance: totalAssets, // Total balance is same as total assets
      totalAssets,
      totalLiabilities,
      netWorth,
      accounts, // Include the actual accounts array
      accountsByType,
      lastSyncAt: new Date(),
    };
  }

  async syncAccount(accountId: string): Promise<AccountSyncResult> {
    // Check if we should use mock data based on environment configuration
    if (shouldUseMockData()) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate sync time
      console.info(
        `🔄 Mock sync completed for account: ${accountId} (${config.environment} mode)`,
      );
      return {
        accountId,
        success: true,
        lastSyncAt: new Date(),
        error: undefined,
        newTransactions: Math.floor(Math.random() * 5) + 1, // 1-5 new transactions
      };
    }

    try {
      const apiUrl = `${config.apiBaseUrl}/accounts/${accountId}/sync`;
      console.info(`🌐 Syncing account ${accountId} via: ${apiUrl}`);

      // Create timeout signal for fetch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.apiTimeout);

      const response = await fetch(apiUrl, {
        method: "POST",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.info(`✅ Account ${accountId} synced successfully`);
      return {
        accountId,
        success: data.success,
        lastSyncAt: new Date(data.last_sync_at),
        error: data.error,
        newTransactions: data.new_transactions || 0,
      };
    } catch (error) {
      console.warn(`⚠️ Sync failed for account ${accountId}:`, error);
      return {
        accountId,
        success: false,
        lastSyncAt: new Date(),
        error: error instanceof Error ? error.message : "Sync failed",
        newTransactions: 0,
      };
    }
  }

  async syncAllAccounts(): Promise<AccountSyncResult[]> {
    const accounts = await this.fetchAccounts();
    const syncPromises = accounts
      .filter((acc) => !acc.isManual)
      .map((acc) => this.syncAccount(acc.id));

    return Promise.all(syncPromises);
  }

  private transformAccountResponse(data: Record<string, unknown>): Account {
    return {
      id: data.id as string,
      name: (data.name as string) || `${data.provider} ${data.type}`,
      type: data.type as AccountType,
      provider: (data.provider as string) || "Manual",
      providerAccountId: data.provider_account_id as string | undefined,
      balance: parseFloat((data.balance as string) || "0") || 0,
      currency: (data.currency as string) || "USD",
      lastSyncAt: data.last_sync_at
        ? new Date(data.last_sync_at as string | number | Date)
        : undefined,
      status: (data.status as AccountStatus) || "active",
      syncStatus:
        (data.sync_status as SyncStatus) ||
        (data.provider ? "synced" : "manual"),
      isManual: !data.provider || data.provider === "Manual",
      metadata: data.metadata as Account["metadata"],
    };
  }

  private getMockAccounts(): Account[] {
    return [
      // Banking Accounts
      {
        id: "1",
        name: "Chase Total Checking",
        type: "checking",
        provider: "Chase Bank",
        providerAccountId: "chase_****1234",
        balance: 15420.5,
        currency: "USD",
        lastSyncAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        status: "active",
        syncStatus: "synced",
        isManual: false,
        metadata: {
          accountNumber: "****1234",
          routingNumber: "021000021",
        },
      },
      {
        id: "2",
        name: "Ally Online Savings",
        type: "savings",
        provider: "Ally Bank",
        providerAccountId: "ally_****5678",
        balance: 45000.0,
        currency: "USD",
        lastSyncAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        status: "active",
        syncStatus: "synced",
        isManual: false,
        metadata: {
          accountNumber: "****5678",
          interestRate: 4.25,
        },
      },
      {
        id: "3",
        name: "Emergency Fund",
        type: "savings",
        provider: "Capital One",
        providerAccountId: "capone_****9999",
        balance: 18750.0,
        currency: "USD",
        lastSyncAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        status: "active",
        syncStatus: "synced",
        isManual: false,
        metadata: {
          accountNumber: "****9999",
          interestRate: 4.1,
        },
      },

      // Investment Accounts
      {
        id: "4",
        name: "Fidelity 401(k)",
        type: "investment",
        provider: "Fidelity Investments",
        providerAccountId: "fidelity_401k_****7890",
        balance: 128500.0,
        currency: "USD",
        lastSyncAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        status: "active",
        syncStatus: "synced",
        isManual: false,
        metadata: {
          accountNumber: "****7890",
        },
      },
      {
        id: "5",
        name: "Roth IRA",
        type: "investment",
        provider: "Vanguard",
        providerAccountId: "vanguard_****1111",
        balance: 42300.0,
        currency: "USD",
        lastSyncAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        status: "active",
        syncStatus: "synced",
        isManual: false,
        metadata: {
          accountNumber: "****1111",
        },
      },
      {
        id: "6",
        name: "Robinhood Trading",
        type: "investment",
        provider: "Robinhood",
        providerAccountId: "robinhood_****2222",
        balance: 8750.25,
        currency: "USD",
        lastSyncAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        status: "active",
        syncStatus: "synced",
        isManual: false,
        metadata: {
          accountNumber: "****2222",
        },
      },

      // Credit Accounts
      {
        id: "7",
        name: "Chase Freedom Flex",
        type: "credit",
        provider: "Chase Bank",
        providerAccountId: "chase_cc_****3333",
        balance: -2847.65, // Negative because it's debt
        currency: "USD",
        lastSyncAt: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
        status: "active",
        syncStatus: "synced",
        isManual: false,
        metadata: {
          accountNumber: "****3333",
          creditLimit: 15000,
          minimumPayment: 89.43,
        },
      },
      {
        id: "8",
        name: "American Express Gold",
        type: "credit",
        provider: "American Express",
        providerAccountId: "amex_****4444",
        balance: -1205.89,
        currency: "USD",
        lastSyncAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
        status: "active",
        syncStatus: "synced",
        isManual: false,
        metadata: {
          accountNumber: "****4444",
          creditLimit: 25000,
          minimumPayment: 35.0,
        },
      },

      // Manual Accounts
      {
        id: "9",
        name: "Company Stock Options",
        type: "investment",
        provider: "Manual",
        balance: 67500.0,
        currency: "USD",
        lastSyncAt: undefined,
        status: "active",
        syncStatus: "manual",
        isManual: true,
        metadata: {
          description: "Vested stock options from employer",
        },
      },
      {
        id: "10",
        name: "Cash in Safe",
        type: "checking",
        provider: "Manual",
        balance: 2500.0,
        currency: "USD",
        lastSyncAt: undefined,
        status: "active",
        syncStatus: "manual",
        isManual: true,
        metadata: {
          description: "Emergency cash reserve",
        },
      },
      {
        id: "11",
        name: "Car Loan",
        type: "loan",
        provider: "Toyota Financial",
        providerAccountId: "toyota_****5555",
        balance: -18750.0, // Remaining loan balance
        currency: "USD",
        lastSyncAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        status: "active",
        syncStatus: "synced",
        isManual: false,
        metadata: {
          accountNumber: "****5555",
          minimumPayment: 385.5,
        },
      },
    ];
  }
}

export const accountsService = new AccountsService();
