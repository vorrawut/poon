// Accounts Mock Data
import type { Account } from "../../../src/features/accounts/types";

export const mockAccounts: Account[] = [
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
    providerAccountId: "vanguard_roth_****4567",
    balance: 67800.0,
    currency: "USD",
    lastSyncAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    status: "active",
    syncStatus: "synced",
    isManual: false,
    metadata: {
      accountNumber: "****4567",
    },
  },
  {
    id: "6",
    name: "Brokerage Account",
    type: "investment",
    provider: "Charles Schwab",
    providerAccountId: "schwab_brokerage_****1122",
    balance: 89200.0,
    currency: "USD",
    lastSyncAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    status: "active",
    syncStatus: "synced",
    isManual: false,
    metadata: {
      accountNumber: "****1122",
    },
  },

  // Credit Accounts
  {
    id: "7",
    name: "Chase Sapphire Preferred",
    type: "credit",
    provider: "Chase Bank",
    providerAccountId: "chase_credit_****3344",
    balance: -2450.75, // Negative balance for credit cards
    currency: "USD",
    lastSyncAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    status: "active",
    syncStatus: "synced",
    isManual: false,
    metadata: {
      accountNumber: "****3344",
      creditLimit: 15000,
      availableCredit: 12549.25,
    },
  },
  {
    id: "8",
    name: "Citi Double Cash",
    type: "credit",
    provider: "Citibank",
    providerAccountId: "citi_credit_****5566",
    balance: -1200.0,
    currency: "USD",
    lastSyncAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    status: "active",
    syncStatus: "synced",
    isManual: false,
    metadata: {
      accountNumber: "****5566",
      creditLimit: 8000,
      availableCredit: 6800.0,
    },
  },

  // Loan Accounts
  {
    id: "9",
    name: "Home Mortgage",
    type: "loan",
    provider: "Wells Fargo",
    providerAccountId: "wells_mortgage_****7788",
    balance: -285000.0, // Negative balance for loans (amount owed)
    currency: "USD",
    lastSyncAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
    status: "active",
    syncStatus: "synced",
    isManual: false,
    metadata: {
      accountNumber: "****7788",
      interestRate: 3.25,
      monthlyPayment: 1850.0,
    },
  },
  {
    id: "10",
    name: "Student Loan",
    type: "loan",
    provider: "Navient",
    providerAccountId: "navient_student_****9900",
    balance: -12500.0,
    currency: "USD",
    lastSyncAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    status: "active",
    syncStatus: "synced",
    isManual: false,
    metadata: {
      accountNumber: "****9900",
      interestRate: 4.5,
      monthlyPayment: 150.0,
    },
  },

  // Manual/Cash Accounts
  {
    id: "11",
    name: "Cash Wallet",
    type: "cash",
    provider: "Manual Entry",
    providerAccountId: "manual_cash_001",
    balance: 450.0,
    currency: "USD",
    lastSyncAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    status: "active",
    syncStatus: "manual",
    isManual: true,
    metadata: {
      note: "Physical cash on hand",
    },
  },
  {
    id: "12",
    name: "Crypto Portfolio",
    type: "investment",
    provider: "Coinbase",
    providerAccountId: "coinbase_****2233",
    balance: 8750.0,
    currency: "USD",
    lastSyncAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: "active",
    syncStatus: "synced",
    isManual: false,
    metadata: {
      accountNumber: "****2233",
      note: "Bitcoin, Ethereum, and other cryptocurrencies",
    },
  },
];
