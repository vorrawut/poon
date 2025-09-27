import { create } from "zustand";
import type {
  Transaction,
  FilterState,
  SpendingTrend,
  CategorySpending,
} from "../types";
import { startOfMonth, endOfMonth, format, parseISO } from "date-fns";

interface TransactionState {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  filters: FilterState;
  spendingTrends: SpendingTrend[];
  categoryBreakdown: CategorySpending[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  applyFilters: () => void;
  calculateSpendingTrends: () => void;
  calculateCategoryBreakdown: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Async actions
  fetchTransactions: (accountId?: string) => Promise<void>;
  importTransactions: (
    accountId: string,
    transactions: Partial<Transaction>[],
  ) => Promise<void>;
}

const defaultFilters: FilterState = {
  dateRange: {
    from: format(startOfMonth(new Date()), "yyyy-MM-dd"),
    to: format(endOfMonth(new Date()), "yyyy-MM-dd"),
    preset: "month",
  },
  accounts: [],
  categories: [],
};

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  filteredTransactions: [],
  filters: defaultFilters,
  spendingTrends: [],
  categoryBreakdown: [],
  isLoading: false,
  error: null,

  setTransactions: (transactions) => {
    set({ transactions });
    get().applyFilters();
    get().calculateSpendingTrends();
    get().calculateCategoryBreakdown();
  },

  addTransaction: (transaction) => {
    set((state) => ({ transactions: [...state.transactions, transaction] }));
    get().applyFilters();
    get().calculateSpendingTrends();
    get().calculateCategoryBreakdown();
  },

  updateTransaction: (id, updates) => {
    set((state) => ({
      transactions: state.transactions.map((transaction) =>
        transaction.id === id ? { ...transaction, ...updates } : transaction,
      ),
    }));
    get().applyFilters();
    get().calculateSpendingTrends();
    get().calculateCategoryBreakdown();
  },

  deleteTransaction: (id) => {
    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => transaction.id !== id,
      ),
    }));
    get().applyFilters();
    get().calculateSpendingTrends();
    get().calculateCategoryBreakdown();
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
    get().applyFilters();
    get().calculateSpendingTrends();
    get().calculateCategoryBreakdown();
  },

  applyFilters: () => {
    const { transactions, filters } = get();

    let filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.posted_at);
      const fromDate = new Date(filters.dateRange.from);
      const toDate = new Date(filters.dateRange.to);

      // Date range filter
      if (transactionDate < fromDate || transactionDate > toDate) {
        return false;
      }

      // Account filter
      if (
        filters.accounts.length > 0 &&
        !filters.accounts.includes(transaction.account_id)
      ) {
        return false;
      }

      // Category filter
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(transaction.category)
      ) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          transaction.description.toLowerCase().includes(searchLower) ||
          transaction.merchant?.toLowerCase().includes(searchLower) ||
          transaction.category.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });

    // Sort by date, newest first
    filtered = filtered.sort(
      (a, b) =>
        new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime(),
    );

    set({ filteredTransactions: filtered });
  },

  calculateSpendingTrends: () => {
    const { filteredTransactions } = get();

    // Group transactions by month
    const monthlyData: {
      [key: string]: {
        income: number;
        expenses: number;
        transactions: Transaction[];
      };
    } = {};

    filteredTransactions.forEach((transaction) => {
      const month = format(parseISO(transaction.posted_at), "yyyy-MM");

      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expenses: 0, transactions: [] };
      }

      monthlyData[month].transactions.push(transaction);

      if (transaction.type === "credit" && transaction.amount > 0) {
        monthlyData[month].income += transaction.amount;
      } else if (transaction.type === "debit" && transaction.amount > 0) {
        monthlyData[month].expenses += transaction.amount;
      }
    });

    // Convert to spending trends
    const trends = Object.entries(monthlyData)
      .map(([period, data]) => {
        const categoryData: {
          [key: string]: { amount: number; count: number };
        } = {};

        data.transactions.forEach((transaction) => {
          if (!categoryData[transaction.category]) {
            categoryData[transaction.category] = { amount: 0, count: 0 };
          }

          categoryData[transaction.category].amount += Math.abs(
            transaction.amount,
          );
          categoryData[transaction.category].count += 1;
        });

        const totalSpending = data.expenses;
        const categories = Object.entries(categoryData).map(
          ([category, info]) => ({
            category,
            amount: info.amount,
            count: info.count,
            percent:
              totalSpending > 0 ? (info.amount / totalSpending) * 100 : 0,
          }),
        );

        return {
          period,
          income: data.income,
          expenses: data.expenses,
          net: data.income - data.expenses,
          categories: categories.sort((a, b) => b.amount - a.amount),
        };
      })
      .sort((a, b) => a.period.localeCompare(b.period));

    set({ spendingTrends: trends });
  },

  calculateCategoryBreakdown: () => {
    const { filteredTransactions } = get();

    const categoryData: {
      [key: string]: {
        amount: number;
        count: number;
        subcategories: { [key: string]: { amount: number; count: number } };
      };
    } = {};
    let totalSpending = 0;

    filteredTransactions
      .filter((t) => t.type === "debit" && t.amount > 0)
      .forEach((transaction) => {
        const category = transaction.category;
        const subcategory = transaction.subcategory || "Other";

        if (!categoryData[category]) {
          categoryData[category] = { amount: 0, count: 0, subcategories: {} };
        }

        if (!categoryData[category].subcategories[subcategory]) {
          categoryData[category].subcategories[subcategory] = {
            amount: 0,
            count: 0,
          };
        }

        categoryData[category].amount += transaction.amount;
        categoryData[category].count += 1;
        categoryData[category].subcategories[subcategory].amount +=
          transaction.amount;
        categoryData[category].subcategories[subcategory].count += 1;

        totalSpending += transaction.amount;
      });

    const breakdown = Object.entries(categoryData)
      .map(([category, data]) => ({
        category,
        amount: data.amount,
        count: data.count,
        percent: totalSpending > 0 ? (data.amount / totalSpending) * 100 : 0,
        subcategories: Object.entries(data.subcategories)
          .map(([name, subData]) => ({
            name,
            amount: subData.amount,
            count: subData.count,
          }))
          .sort((a, b) => b.amount - a.amount),
      }))
      .sort((a, b) => b.amount - a.amount);

    set({ categoryBreakdown: breakdown });
  },

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  fetchTransactions: async (accountId) => {
    set({ isLoading: true, error: null });

    try {
      const params = new URLSearchParams();
      if (accountId) params.append("account_id", accountId);

      const response = await fetch(`/api/transactions?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch transactions");

      const data = await response.json();
      get().setTransactions(data.transactions);
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch transactions",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  importTransactions: async (accountId, transactions) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch("/api/transactions/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ account_id: accountId, transactions }),
      });

      if (!response.ok) throw new Error("Failed to import transactions");

      const result = await response.json();

      // Refresh transactions
      await get().fetchTransactions();

      return result;
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to import transactions",
      });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
