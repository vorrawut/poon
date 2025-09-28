import {
  type Transaction,
  type TransactionSummary,
  type TransactionType,
  type TransactionCategory,
} from "../types";
import { config, shouldUseMockData } from "../../../../config/environments";

class TransactionsService {
  async fetchTransactions(limit: number = 50): Promise<Transaction[]> {
    // Check if we should use mock data based on environment configuration
    if (shouldUseMockData()) {
      await new Promise((resolve) =>
        setTimeout(resolve, config.mockApiDelay * 0.4),
      ); // Fastest for transactions
      console.info(
        `💳 Using mock transactions data (${config.environment} mode)`,
      );
      return this.getMockTransactions().slice(0, limit);
    }

    try {
      const apiUrl = `${config.apiBaseUrl}/transactions?limit=${limit}`;
      console.info(`🌐 Fetching transactions from: ${apiUrl}`);

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
      console.info("✅ Transactions data fetched successfully");
      return data.map(this.transformTransactionResponse);
    } catch (error) {
      console.warn(
        "⚠️ API failed, falling back to mock transactions data:",
        error,
      );

      // In production, show error; in development, fallback to mock
      if (config.isProduction) {
        throw error;
      }

      // Fallback to mock data for development/local
      await new Promise((resolve) =>
        setTimeout(resolve, config.mockApiDelay * 0.4),
      );
      return this.getMockTransactions().slice(0, limit);
    }
  }

  async fetchTransactionSummary(): Promise<TransactionSummary> {
    const transactions = await this.fetchTransactions(100);

    const totalTransactions = transactions.length;
    const totalSpent = transactions
      .filter((t) => t.type === "debit")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalIncome = transactions
      .filter((t) => t.type === "credit")
      .reduce((sum, t) => sum + t.amount, 0);
    const netCashflow = totalIncome - totalSpent;

    // Find most frequent category
    const categoryCount: Partial<Record<TransactionCategory, number>> = {};
    transactions.forEach((t) => {
      categoryCount[t.category] = (categoryCount[t.category] || 0) + 1;
    });
    const topCategory =
      (Object.entries(categoryCount).sort(
        ([, a], [, b]) => b - a,
      )[0]?.[0] as TransactionCategory) || "other";

    return {
      totalTransactions,
      totalSpent,
      totalIncome,
      netCashflow,
      topCategory,
      recentTransactions: transactions.slice(0, 5),
    };
  }

  private transformTransactionResponse(
    data: Record<string, unknown>,
  ): Transaction {
    return {
      id: data.id as string,
      accountId: data.account_id as string,
      amount: parseFloat((data.amount as string) || "0") || 0,
      type: data.type as TransactionType,
      category: data.category as TransactionCategory,
      merchant: data.merchant as string | undefined,
      description: data.description as string,
      posted_at: new Date(data.posted_at as string | number | Date),
      pending: (data.pending as boolean) || false,
      location: data.location as string | undefined,
      tags: (data.tags as string[]) || [],
    };
  }

  private getMockTransactions(): Transaction[] {
    const now = new Date();

    return [
      // Recent transactions (last few days)
      {
        id: "t1",
        accountId: "1", // Chase Checking
        amount: 89.47,
        type: "debit" as TransactionType,
        category: "groceries" as TransactionCategory,
        merchant: "Whole Foods Market",
        description: "WHOLE FOODS MKT #12345",
        posted_at: new Date(now.getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
        pending: false,
        location: "Austin, TX",
        tags: ["food", "organic"],
      },
      {
        id: "t2",
        accountId: "7", // Chase Credit Card
        amount: 45.23,
        type: "debit" as TransactionType,
        category: "gas" as TransactionCategory,
        merchant: "Shell",
        description: "SHELL #9876 FUEL",
        posted_at: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
        pending: false,
        location: "Austin, TX",
        tags: ["fuel", "transportation"],
      },
      {
        id: "t3",
        accountId: "1", // Chase Checking
        amount: 5200.0,
        type: "credit" as TransactionType,
        category: "income" as TransactionCategory,
        merchant: "Tech Company Inc",
        description: "PAYROLL DEPOSIT - TECH CO",
        posted_at: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
        pending: false,
        location: "",
        tags: ["salary", "payroll"],
      },
      {
        id: "t4",
        accountId: "8", // Amex Credit Card
        amount: 67.84,
        type: "debit" as TransactionType,
        category: "restaurants" as TransactionCategory,
        merchant: "Chipotle Mexican Grill",
        description: "CHIPOTLE #2345",
        posted_at: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        pending: false,
        location: "Austin, TX",
        tags: ["food", "lunch"],
      },
      {
        id: "t5",
        accountId: "7", // Chase Credit Card
        amount: 129.99,
        type: "debit" as TransactionType,
        category: "shopping" as TransactionCategory,
        merchant: "Amazon",
        description: "AMAZON.COM",
        posted_at: new Date(
          now.getTime() - 1 * 24 * 60 * 60 * 1000 - 2 * 60 * 60 * 1000,
        ), // 1 day 2 hours ago
        pending: false,
        location: "",
        tags: ["online", "electronics"],
      },
      {
        id: "t6",
        accountId: "1", // Chase Checking
        amount: 1200.0,
        type: "debit" as TransactionType,
        category: "utilities" as TransactionCategory,
        merchant: "Austin Energy",
        description: "AUTOPAY - AUSTIN ENERGY",
        posted_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        pending: false,
        location: "Austin, TX",
        tags: ["bills", "electricity"],
      },
      {
        id: "t7",
        accountId: "8", // Amex Credit Card
        amount: 78.5,
        type: "debit" as TransactionType,
        category: "entertainment" as TransactionCategory,
        merchant: "Netflix",
        description: "NETFLIX.COM",
        posted_at: new Date(
          now.getTime() - 2 * 24 * 60 * 60 * 1000 - 5 * 60 * 60 * 1000,
        ), // 2 days 5 hours ago
        pending: false,
        location: "",
        tags: ["subscription", "streaming"],
      },
      {
        id: "t8",
        accountId: "1", // Chase Checking
        amount: 385.5,
        type: "debit" as TransactionType,
        category: "other" as TransactionCategory,
        merchant: "Toyota Financial",
        description: "AUTO LOAN PMT - TOYOTA",
        posted_at: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        pending: false,
        location: "",
        tags: ["loan", "car payment"],
      },
      {
        id: "t9",
        accountId: "7", // Chase Credit Card
        amount: 156.78,
        type: "debit" as TransactionType,
        category: "shopping" as TransactionCategory,
        merchant: "Target",
        description: "TARGET #1234",
        posted_at: new Date(
          now.getTime() - 3 * 24 * 60 * 60 * 1000 - 3 * 60 * 60 * 1000,
        ), // 3 days 3 hours ago
        pending: false,
        location: "Austin, TX",
        tags: ["household", "retail"],
      },
      {
        id: "t10",
        accountId: "2", // Ally Savings
        amount: 2000.0,
        type: "credit" as TransactionType,
        category: "transfer" as TransactionCategory,
        merchant: "Internal Transfer",
        description: "TRANSFER FROM CHECKING",
        posted_at: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        pending: false,
        location: "",
        tags: ["savings", "transfer"],
      },
      {
        id: "t11",
        accountId: "8", // Amex Credit Card
        amount: 234.56,
        type: "debit" as TransactionType,
        category: "travel" as TransactionCategory,
        merchant: "Southwest Airlines",
        description: "SOUTHWEST AIR #5678",
        posted_at: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        pending: false,
        location: "",
        tags: ["flight", "vacation"],
      },
      {
        id: "t12",
        accountId: "7", // Chase Credit Card
        amount: 89.99,
        type: "debit" as TransactionType,
        category: "healthcare" as TransactionCategory,
        merchant: "CVS Pharmacy",
        description: "CVS/PHARMACY #9876",
        posted_at: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
        pending: false,
        location: "Austin, TX",
        tags: ["pharmacy", "medication"],
      },
      {
        id: "t13",
        accountId: "1", // Chase Checking
        amount: 500.0,
        type: "debit" as TransactionType,
        category: "investment" as TransactionCategory,
        merchant: "Vanguard",
        description: "VANGUARD INVESTMENT TRANSFER",
        posted_at: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        pending: false,
        location: "",
        tags: ["retirement", "ira"],
      },
      {
        id: "t14",
        accountId: "8", // Amex Credit Card
        amount: 42.15,
        type: "debit" as TransactionType,
        category: "restaurants" as TransactionCategory,
        merchant: "Starbucks",
        description: "STARBUCKS #3456",
        posted_at: new Date(
          now.getTime() - 7 * 24 * 60 * 60 * 1000 - 4 * 60 * 60 * 1000,
        ), // 7 days 4 hours ago
        pending: false,
        location: "Austin, TX",
        tags: ["coffee", "breakfast"],
      },
      {
        id: "t15",
        accountId: "7", // Chase Credit Card
        amount: 298.43,
        type: "debit" as TransactionType,
        category: "insurance" as TransactionCategory,
        merchant: "State Farm",
        description: "STATE FARM INSURANCE AUTO",
        posted_at: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
        pending: false,
        location: "",
        tags: ["insurance", "auto"],
      },
    ];
  }
}

export const transactionsService = new TransactionsService();
