import type {
  Account,
  Transaction,
  Asset,
  Portfolio,
  PortfolioPosition,
  PriceData,
} from "../../src/types";
import { subDays, format } from "date-fns";

// Mock user data
export const mockUser = {
  id: "user-1",
  email: "demo@example.com",
  name: "Demo User",
  mfa_enabled: true,
  created_at: "2024-01-15T00:00:00Z",
};

// Mock accounts data
export const mockAccounts: Account[] = [
  {
    id: "acc-1",
    user_id: "user-1",
    provider: "plaid",
    provider_account_id: "plaid-acc-1",
    name: "Chase Checking",
    type: "checking",
    currency: "USD",
    last_sync_at: new Date().toISOString(),
    current_balance: 8750.25,
    is_active: true,
  },
  {
    id: "acc-2",
    user_id: "user-1",
    provider: "plaid",
    provider_account_id: "plaid-acc-2",
    name: "Chase Savings",
    type: "savings",
    currency: "USD",
    last_sync_at: new Date().toISOString(),
    current_balance: 25430.8,
    is_active: true,
  },
  {
    id: "acc-3",
    user_id: "user-1",
    provider: "manual",
    name: "E*TRADE Investment",
    type: "investment",
    currency: "USD",
    last_sync_at: subDays(new Date(), 1).toISOString(),
    current_balance: 47850.32,
    is_active: true,
  },
  {
    id: "acc-4",
    user_id: "user-1",
    provider: "manual",
    name: "Company 401k",
    type: "investment",
    currency: "USD",
    last_sync_at: subDays(new Date(), 7).toISOString(),
    current_balance: 89420.5,
    is_active: true,
  },
  {
    id: "acc-5",
    user_id: "user-1",
    provider: "manual",
    name: "Life Insurance Policy",
    type: "insurance",
    currency: "USD",
    current_balance: 15000.0,
    is_active: true,
    metadata: {
      policy_number: "LIF-789456123",
      provider_name: "MetLife",
    },
  },
  {
    id: "acc-6",
    user_id: "user-1",
    provider: "manual",
    name: "Company Cash",
    type: "company",
    currency: "USD",
    current_balance: 12340.75,
    is_active: true,
  },
];

// Mock transactions data
export const mockTransactions: Transaction[] = [
  // Recent transactions
  {
    id: "txn-1",
    user_id: "user-1",
    account_id: "acc-1",
    posted_at: format(subDays(new Date(), 1), "yyyy-MM-dd"),
    amount: 4.75,
    type: "debit",
    category: "Food & Dining",
    subcategory: "Coffee Shops",
    merchant: "Starbucks",
    description: "STARBUCKS STORE #12345",
    imported_from: "plaid",
    tags: ["coffee", "morning"],
  },
  {
    id: "txn-2",
    user_id: "user-1",
    account_id: "acc-1",
    posted_at: format(subDays(new Date(), 1), "yyyy-MM-dd"),
    amount: 45.8,
    type: "debit",
    category: "Gas & Fuel",
    merchant: "Shell",
    description: "SHELL GAS STATION",
    imported_from: "plaid",
    tags: ["gas", "car"],
  },
  {
    id: "txn-3",
    user_id: "user-1",
    account_id: "acc-1",
    posted_at: format(subDays(new Date(), 2), "yyyy-MM-dd"),
    amount: 3200.0,
    type: "credit",
    category: "Income",
    subcategory: "Salary",
    description: "COMPANY PAYROLL DEPOSIT",
    imported_from: "plaid",
    tags: ["salary", "income"],
  },
  {
    id: "txn-4",
    user_id: "user-1",
    account_id: "acc-1",
    posted_at: format(subDays(new Date(), 2), "yyyy-MM-dd"),
    amount: 125.5,
    type: "debit",
    category: "Food & Dining",
    subcategory: "Groceries",
    merchant: "Whole Foods",
    description: "WHOLE FOODS MARKET",
    imported_from: "plaid",
    tags: ["groceries", "food"],
  },
  {
    id: "txn-5",
    user_id: "user-1",
    account_id: "acc-1",
    posted_at: format(subDays(new Date(), 3), "yyyy-MM-dd"),
    amount: 1200.0,
    type: "debit",
    category: "Housing",
    subcategory: "Rent",
    merchant: "PROPERTY MANAGEMENT CO",
    description: "MONTHLY RENT PAYMENT",
    imported_from: "plaid",
    tags: ["rent", "housing"],
  },
  {
    id: "txn-6",
    user_id: "user-1",
    account_id: "acc-1",
    posted_at: format(subDays(new Date(), 4), "yyyy-MM-dd"),
    amount: 89.99,
    type: "debit",
    category: "Shopping",
    subcategory: "Online",
    merchant: "Amazon",
    description: "AMAZON.COM ORDER",
    imported_from: "plaid",
    tags: ["amazon", "shopping"],
  },
  // More historical data
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `txn-${i + 7}`,
    user_id: "user-1",
    account_id: Math.random() > 0.7 ? "acc-2" : "acc-1",
    posted_at: format(
      subDays(new Date(), Math.floor(Math.random() * 90) + 5),
      "yyyy-MM-dd",
    ),
    amount: Math.round((Math.random() * 300 + 10) * 100) / 100,
    type: Math.random() > 0.8 ? "credit" : ("debit" as "credit" | "debit"),
    category: [
      "Food & Dining",
      "Shopping",
      "Gas & Fuel",
      "Entertainment",
      "Health & Medical",
      "Utilities",
      "Travel",
    ][Math.floor(Math.random() * 7)],
    merchant: [
      "Amazon",
      "Target",
      "Walmart",
      "Shell",
      "Starbucks",
      "Netflix",
      "Spotify",
    ][Math.floor(Math.random() * 7)],
    description: `Transaction ${i + 7}`,
    imported_from: "plaid" as const,
    tags: [],
  })),
];

// Mock assets data
export const mockAssets: Asset[] = [
  {
    id: "asset-1",
    user_id: "user-1",
    account_id: "acc-3",
    asset_type: "stock",
    symbol: "AAPL",
    name: "Apple Inc.",
    quantity: 50,
    avg_price: 145.2,
    current_price: 175.1,
    market_value: 8755.0,
    change_amount: 1495.0,
    change_percent: 20.58,
  },
  {
    id: "asset-2",
    user_id: "user-1",
    account_id: "acc-3",
    asset_type: "stock",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    quantity: 25,
    avg_price: 120.5,
    current_price: 138.2,
    market_value: 3455.0,
    change_amount: 442.5,
    change_percent: 14.69,
  },
  {
    id: "asset-3",
    user_id: "user-1",
    account_id: "acc-3",
    asset_type: "etf",
    symbol: "SPY",
    name: "SPDR S&P 500 ETF Trust",
    quantity: 100,
    avg_price: 410.3,
    current_price: 445.8,
    market_value: 44580.0,
    change_amount: 3550.0,
    change_percent: 8.65,
  },
  {
    id: "asset-4",
    user_id: "user-1",
    account_id: "acc-4",
    asset_type: "mutual_fund",
    symbol: "VTIAX",
    name: "Vanguard Total International Stock Index Fund",
    quantity: 1500,
    avg_price: 28.9,
    current_price: 31.2,
    market_value: 46800.0,
    change_amount: 3450.0,
    change_percent: 7.96,
  },
];

// Mock portfolio data
export const mockPortfolios: Portfolio[] = [
  {
    id: "portfolio-1",
    user_id: "user-1",
    name: "Investment Portfolio",
    total_value: 103590.0,
    total_cost: 96137.5,
    total_gain_loss: 7452.5,
    total_gain_loss_percent: 7.75,
    created_at: "2024-01-15T00:00:00Z",
  },
];

// Mock portfolio positions
export const mockPortfolioPositions: PortfolioPosition[] = [
  {
    id: "pos-1",
    portfolio_id: "portfolio-1",
    symbol: "SPY",
    name: "SPDR S&P 500 ETF Trust",
    quantity: 100,
    avg_price: 410.3,
    current_price: 445.8,
    market_value: 44580.0,
    gain_loss: 3550.0,
    gain_loss_percent: 8.65,
    weight_percent: 43.04,
  },
  {
    id: "pos-2",
    portfolio_id: "portfolio-1",
    symbol: "VTIAX",
    name: "Vanguard Total International Stock Index Fund",
    quantity: 1500,
    avg_price: 28.9,
    current_price: 31.2,
    market_value: 46800.0,
    gain_loss: 3450.0,
    gain_loss_percent: 7.96,
    weight_percent: 45.18,
  },
  {
    id: "pos-3",
    portfolio_id: "portfolio-1",
    symbol: "AAPL",
    name: "Apple Inc.",
    quantity: 50,
    avg_price: 145.2,
    current_price: 175.1,
    market_value: 8755.0,
    gain_loss: 1495.0,
    gain_loss_percent: 20.58,
    weight_percent: 8.45,
  },
  {
    id: "pos-4",
    portfolio_id: "portfolio-1",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    quantity: 25,
    avg_price: 120.5,
    current_price: 138.2,
    market_value: 3455.0,
    gain_loss: 442.5,
    gain_loss_percent: 14.69,
    weight_percent: 3.33,
  },
];

// Mock price data
export const mockPriceData: { [symbol: string]: PriceData } = {
  AAPL: {
    symbol: "AAPL",
    date: new Date().toISOString().split("T")[0],
    open: 174.2,
    close: 175.1,
    high: 176.5,
    low: 173.8,
    volume: 52000000,
    source: "mock",
  },
  GOOGL: {
    symbol: "GOOGL",
    date: new Date().toISOString().split("T")[0],
    open: 137.5,
    close: 138.2,
    high: 139.1,
    low: 136.9,
    volume: 28000000,
    source: "mock",
  },
  SPY: {
    symbol: "SPY",
    date: new Date().toISOString().split("T")[0],
    open: 444.5,
    close: 445.8,
    high: 447.2,
    low: 443.1,
    volume: 78000000,
    source: "mock",
  },
  VTIAX: {
    symbol: "VTIAX",
    date: new Date().toISOString().split("T")[0],
    open: 31.1,
    close: 31.2,
    high: 31.35,
    low: 30.95,
    source: "mock",
  },
};

// Mock CSV data for import testing
export const mockCSVData = {
  headers: ["Date", "Description", "Amount", "Category", "Type"],
  rows: [
    ["2024-09-25", "Starbucks Coffee", "-4.75", "Food & Dining", "debit"],
    ["2024-09-25", "Shell Gas Station", "-45.80", "Gas & Fuel", "debit"],
    ["2024-09-24", "Salary Deposit", "3200.00", "Income", "credit"],
    ["2024-09-24", "Whole Foods Market", "-125.50", "Groceries", "debit"],
    ["2024-09-23", "Monthly Rent", "-1200.00", "Housing", "debit"],
  ],
  filename: "sample_transactions.csv",
};

// Helper function to get mock data based on type
export const getMockData = (
  type:
    | "accounts"
    | "transactions"
    | "assets"
    | "portfolios"
    | "positions"
    | "prices",
) => {
  switch (type) {
    case "accounts":
      return mockAccounts;
    case "transactions":
      return mockTransactions;
    case "assets":
      return mockAssets;
    case "portfolios":
      return mockPortfolios;
    case "positions":
      return mockPortfolioPositions;
    case "prices":
      return mockPriceData;
    default:
      return [];
  }
};

export * from './navigationData';
