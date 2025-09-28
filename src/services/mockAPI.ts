// Mock Server - Simulates API endpoints
import {
  mockAccounts,
  mockTransactions,
  mockAssets,
  mockPortfolios,
  mockPortfolioPositions,
  mockPriceData,
  mockCSVData,
} from "../../mockData/common/data";
import type {
  Account,
  Transaction,
  Asset,
  ApiResponse,
  PaginatedResponse,
} from "../types";

// Simulate network delay
const delay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock API endpoints
export class MockAPI {
  // Accounts endpoints
  static async getAccounts(): Promise<ApiResponse<Account[]>> {
    await delay();

    return {
      success: true,
      data: mockAccounts,
      message: "Accounts fetched successfully",
    };
  }

  static async getAccount(accountId: string): Promise<ApiResponse<Account>> {
    await delay();

    const account = mockAccounts.find((acc) => acc.id === accountId);

    if (!account) {
      return {
        success: false,
        data: {} as Account,
        message: "Account not found",
      };
    }

    return {
      success: true,
      data: account,
      message: "Account fetched successfully",
    };
  }

  static async syncAccount(accountId: string): Promise<ApiResponse<Account>> {
    await delay(1000); // Longer delay to simulate sync

    const account = mockAccounts.find((acc) => acc.id === accountId);

    if (!account) {
      return {
        success: false,
        data: {} as Account,
        message: "Account not found",
      };
    }

    // Simulate balance update
    const updatedAccount = {
      ...account,
      current_balance: account.current_balance + (Math.random() - 0.5) * 100,
      last_sync_at: new Date().toISOString(),
    };

    return {
      success: true,
      data: updatedAccount,
      message: "Account synced successfully",
    };
  }

  static async linkBankAccount(
    provider: "plaid" | "saltedge",
    _token: string,
  ): Promise<ApiResponse<Account[]>> {
    await delay(2000); // Longer delay to simulate bank linking

    // Mock new accounts from bank linking
    const newAccounts: Account[] = [
      {
        id: `linked-${Date.now()}`,
        user_id: "user-1",
        provider,
        provider_account_id: `${provider}-${Date.now()}`,
        name: `${provider === "plaid" ? "Chase" : "Bank of America"} Linked Account`,
        type: "checking",
        currency: "USD",
        last_sync_at: new Date().toISOString(),
        current_balance: Math.round(Math.random() * 5000 + 1000),
        is_active: true,
      },
    ];

    return {
      success: true,
      data: newAccounts,
      message: "Bank account linked successfully",
    };
  }

  // Transactions endpoints
  static async getTransactions(params?: {
    accountId?: string;
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<PaginatedResponse<Transaction>>> {
    await delay();

    let filteredTransactions = [...mockTransactions];

    // Filter by account
    if (params?.accountId) {
      filteredTransactions = filteredTransactions.filter(
        (txn) => txn.account_id === params.accountId,
      );
    }

    // Filter by date range
    if (params?.from) {
      filteredTransactions = filteredTransactions.filter(
        (txn) => new Date(txn.posted_at) >= new Date(params.from!),
      );
    }

    if (params?.to) {
      filteredTransactions = filteredTransactions.filter(
        (txn) => new Date(txn.posted_at) <= new Date(params.to!),
      );
    }

    // Pagination
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const offset = (page - 1) * limit;
    const paginatedTransactions = filteredTransactions.slice(
      offset,
      offset + limit,
    );

    return {
      success: true,
      data: {
        data: paginatedTransactions,
        total: filteredTransactions.length,
        page,
        limit,
        has_more: offset + limit < filteredTransactions.length,
      },
      message: "Transactions fetched successfully",
    };
  }

  static async importTransactions(
    _accountId: string,
    transactions: Partial<Transaction>[],
  ): Promise<
    ApiResponse<{ imported: number; duplicates: number; errors: number }>
  > {
    await delay(1500);

    // Simulate import processing
    const imported = Math.floor(transactions.length * 0.9);
    const duplicates = Math.floor(transactions.length * 0.05);
    const errors = transactions.length - imported - duplicates;

    return {
      success: true,
      data: { imported, duplicates, errors },
      message: `Successfully imported ${imported} transactions`,
    };
  }

  // Portfolio endpoints
  static async getPortfolios(): Promise<ApiResponse<typeof mockPortfolios>> {
    await delay();

    return {
      success: true,
      data: mockPortfolios,
      message: "Portfolios fetched successfully",
    };
  }

  static async getPortfolioPositions(
    portfolioId: string,
  ): Promise<ApiResponse<typeof mockPortfolioPositions>> {
    await delay();

    const positions = mockPortfolioPositions.filter(
      (pos) => pos.portfolio_id === portfolioId,
    );

    return {
      success: true,
      data: positions,
      message: "Portfolio positions fetched successfully",
    };
  }

  static async getAssets(accountId?: string): Promise<ApiResponse<Asset[]>> {
    await delay();

    let assets = [...mockAssets];

    if (accountId) {
      assets = assets.filter((asset) => asset.account_id === accountId);
    }

    return {
      success: true,
      data: assets,
      message: "Assets fetched successfully",
    };
  }

  static async getPrices(
    symbols: string[],
  ): Promise<ApiResponse<typeof mockPriceData>> {
    await delay(500);

    // Filter price data by requested symbols
    const filteredPrices = Object.entries(mockPriceData)
      .filter(([symbol]) => symbols.includes(symbol))
      .reduce((acc, [symbol, data]) => ({ ...acc, [symbol]: data }), {});

    return {
      success: true,
      data: { prices: Object.values(filteredPrices) } as { prices: unknown[] },
      message: "Prices fetched successfully",
    };
  }

  // CSV Import endpoints
  static async parseCSV(_file: File): Promise<ApiResponse<typeof mockCSVData>> {
    await delay(1000);

    // Simulate CSV parsing
    return {
      success: true,
      data: mockCSVData,
      message: "CSV parsed successfully",
    };
  }

  // Plaid simulation endpoints
  static async createPlaidLinkToken(): Promise<
    ApiResponse<{ link_token: string; expiration: string }>
  > {
    await delay(500);

    return {
      success: true,
      data: {
        link_token: `link-sandbox-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        expiration: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
      },
      message: "Plaid Link token created successfully",
    };
  }

  static async exchangePlaidPublicToken(
    _publicToken: string,
  ): Promise<ApiResponse<{ access_token: string; accounts: Account[] }>> {
    await delay(1000);

    const newAccounts: Account[] = [
      {
        id: `plaid-${Date.now()}-1`,
        user_id: "user-1",
        provider: "plaid",
        provider_account_id: `plaid-account-${Date.now()}-1`,
        name: "Chase Freedom Unlimited",
        type: "checking",
        currency: "USD",
        last_sync_at: new Date().toISOString(),
        current_balance: Math.round(Math.random() * 3000 + 500),
        is_active: true,
      },
      {
        id: `plaid-${Date.now()}-2`,
        user_id: "user-1",
        provider: "plaid",
        provider_account_id: `plaid-account-${Date.now()}-2`,
        name: "Chase Savings",
        type: "savings",
        currency: "USD",
        last_sync_at: new Date().toISOString(),
        current_balance: Math.round(Math.random() * 10000 + 2000),
        is_active: true,
      },
    ];

    return {
      success: true,
      data: {
        access_token: `access-sandbox-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        accounts: newAccounts,
      },
      message: "Plaid public token exchanged successfully",
    };
  }

  // Salt Edge simulation endpoints
  static async createSaltEdgeSession(): Promise<
    ApiResponse<{ session_secret: string; expires_at: string }>
  > {
    await delay(800);

    return {
      success: true,
      data: {
        session_secret: `saltedge-session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
      },
      message: "Salt Edge session created successfully",
    };
  }

  // Dashboard metrics
  static async getDashboardMetrics(): Promise<
    ApiResponse<{
      totalNetWorth: number;
      netWorthChange: number;
      netWorthChangePercent: number;
      totalAssets: number;
      totalLiabilities: number;
      monthlyIncome: number;
      monthlyExpenses: number;
      savingsRate: number;
    }>
  > {
    await delay();

    const totalAssets = mockAccounts
      .filter((acc) => acc.current_balance > 0)
      .reduce((sum, acc) => sum + acc.current_balance, 0);

    const totalLiabilities = mockAccounts
      .filter((acc) => acc.current_balance < 0)
      .reduce((sum, acc) => sum + Math.abs(acc.current_balance), 0);

    const totalNetWorth = totalAssets - totalLiabilities;

    // Mock changes
    const netWorthChange = Math.round((Math.random() - 0.3) * 5000);
    const netWorthChangePercent =
      totalNetWorth > 0 ? (netWorthChange / totalNetWorth) * 100 : 0;

    // Calculate from transactions (simplified)
    const monthlyIncome = mockTransactions
      .filter(
        (txn) =>
          txn.type === "credit" &&
          new Date(txn.posted_at) >
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      )
      .reduce((sum, txn) => sum + txn.amount, 0);

    const monthlyExpenses = mockTransactions
      .filter(
        (txn) =>
          txn.type === "debit" &&
          new Date(txn.posted_at) >
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      )
      .reduce((sum, txn) => sum + txn.amount, 0);

    const savingsRate =
      monthlyIncome > 0
        ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100
        : 0;

    return {
      success: true,
      data: {
        totalNetWorth,
        netWorthChange,
        netWorthChangePercent,
        totalAssets,
        totalLiabilities,
        monthlyIncome,
        monthlyExpenses,
        savingsRate,
      },
      message: "Dashboard metrics calculated successfully",
    };
  }
}

// Setup global fetch mock for development
export const setupMockAPI = () => {
  // Only setup in development mode
  if (import.meta.env.DEV) {
    const originalFetch = window.fetch;

    window.fetch = async (
      input: RequestInfo | URL,
      init?: RequestInit,
    ): Promise<Response> => {
      const url =
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.href
            : input.url;

      // Mock API routes
      if (url.startsWith("/api/")) {
        const path = url.replace("/api", "");
        const method = init?.method || "GET";

        try {
          let mockResponse;

          switch (`${method} ${path}`) {
            case "GET /accounts":
              mockResponse = await MockAPI.getAccounts();
              break;

            case `POST ${path.match(/\/accounts\/([^/]+)\/sync/)?.[0] || ""}`:
              const syncAccountId = path.match(
                /\/accounts\/([^/]+)\/sync/,
              )?.[1];
              if (syncAccountId) {
                mockResponse = await MockAPI.syncAccount(syncAccountId);
              }
              break;

            case "POST /accounts/link":
              const linkBody = init?.body
                ? JSON.parse(init.body as string)
                : {};
              mockResponse = await MockAPI.linkBankAccount(
                linkBody.provider,
                linkBody.token,
              );
              break;

            case "GET /transactions":
              const urlParams = new URLSearchParams(url.split("?")[1] || "");
              const params = {
                accountId: urlParams.get("account_id") || undefined,
                from: urlParams.get("from") || undefined,
                to: urlParams.get("to") || undefined,
                page: parseInt(urlParams.get("page") || "1"),
                limit: parseInt(urlParams.get("limit") || "20"),
              };
              mockResponse = await MockAPI.getTransactions(params);
              break;

            case "POST /transactions/import":
              const importBody = init?.body
                ? JSON.parse(init.body as string)
                : {};
              mockResponse = await MockAPI.importTransactions(
                importBody.account_id,
                importBody.transactions,
              );
              break;

            case "GET /portfolios":
              mockResponse = await MockAPI.getPortfolios();
              break;

            case "GET /assets":
              const assetParams = new URLSearchParams(url.split("?")[1] || "");
              mockResponse = await MockAPI.getAssets(
                assetParams.get("account_id") || undefined,
              );
              break;

            case "POST /prices":
              const priceBody = init?.body
                ? JSON.parse(init.body as string)
                : {};
              mockResponse = await MockAPI.getPrices(priceBody.symbols);
              break;

            case "GET /dashboard/metrics":
              mockResponse = await MockAPI.getDashboardMetrics();
              break;

            case "POST /plaid/link/token/create":
              mockResponse = await MockAPI.createPlaidLinkToken();
              break;

            case "POST /plaid/link/token/exchange":
              const plaidBody = init?.body
                ? JSON.parse(init.body as string)
                : {};
              mockResponse = await MockAPI.exchangePlaidPublicToken(
                plaidBody.public_token,
              );
              break;

            case "POST /saltedge/connect":
              mockResponse = await MockAPI.createSaltEdgeSession();
              break;

            default:
              // Fallback to original fetch
              return originalFetch(input, init);
          }

          return new Response(JSON.stringify(mockResponse), {
            status: mockResponse?.success ? 200 : 400,
            statusText: mockResponse?.success ? "OK" : "Bad Request",
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          return new Response(
            JSON.stringify({
              success: false,
              data: null,
              message: error instanceof Error ? error.message : "Unknown error",
            }),
            {
              status: 500,
              statusText: "Internal Server Error",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
        }
      }

      // Fallback to original fetch for non-API calls
      return originalFetch(input, init);
    };

    console.log("🎭 Mock API setup complete");
  }
};
