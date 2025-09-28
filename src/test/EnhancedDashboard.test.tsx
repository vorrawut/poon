import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../features/dashboard/ui/Dashboard";

// Mock the service modules
vi.mock("../features/networth/services/netWorthService", () => ({
  netWorthService: {
    fetchNetWorth: vi.fn(() =>
      Promise.resolve({
        totalNetWorth: 305917.23,
        netWorthChange: 8347.23,
        netWorthChangePercent: 2.8,
        previousNetWorth: 297570.0,
        lastUpdated: new Date(),
        breakdown: {
          cash: 81670.5,
          investments: 247050.25,
          realEstate: 0,
          other: -22803.54,
        },
      }),
    ),
  },
}));

vi.mock("../features/accounts/services/accountsService", () => ({
  accountsService: {
    fetchAccountsOverview: vi.fn(() =>
      Promise.resolve({
        totalAssets: 328720.75,
        totalLiabilities: 22803.54,
        netWorth: 305917.21,
        accounts: [
          {
            id: "1",
            name: "Chase Total Checking",
            type: "checking",
            provider: "Chase Bank",
            providerAccountId: "chase_****1234",
            balance: 15420.5,
            currency: "USD",
            lastSyncAt: new Date(),
            status: "active",
            syncStatus: "synced",
            isManual: false,
            metadata: { accountNumber: "****1234" },
          },
          {
            id: "2",
            name: "Ally Online Savings",
            type: "savings",
            provider: "Ally Bank",
            providerAccountId: "ally_****5678",
            balance: 45000.0,
            currency: "USD",
            lastSyncAt: new Date(),
            status: "active",
            syncStatus: "synced",
            isManual: false,
            metadata: { accountNumber: "****5678" },
          },
        ],
        accountsByType: {},
        lastSyncAt: new Date(),
      }),
    ),
    syncAllAccounts: vi.fn(() => Promise.resolve([])),
  },
}));

vi.mock("../features/transactions/services/transactionsService", () => ({
  transactionsService: {
    fetchTransactions: vi.fn(() =>
      Promise.resolve([
        {
          id: "t1",
          accountId: "1",
          date: new Date(),
          description: "Whole Foods Market",
          amount: -75.23,
          type: "expense",
          category: "groceries",
          status: "posted",
          merchant: "Whole Foods",
          location: "Austin, TX",
          tags: ["food", "essentials"],
        },
        {
          id: "t2",
          accountId: "1",
          date: new Date(),
          description: "Salary Deposit",
          amount: 3500.0,
          type: "income",
          category: "salary",
          status: "posted",
          merchant: "Employer",
          tags: ["work"],
        },
      ]),
    ),
  },
}));

// Mock environment config
vi.mock("../../config/environments", () => ({
  config: {
    environment: "test",
    isLocal: true,
    mockApiDelay: 0,
    dataSource: "mock",
  },
  shouldUseMockData: () => true,
}));

describe("Enhanced Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders welcome message and description", async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );

    // Check for welcome content via aria-label instead of text content due to split text animation
    expect(screen.getByLabelText("👋 Welcome back!")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Here's your money in plain English. Everything you need to know, nothing you don't.",
      ),
    ).toBeInTheDocument();
  });

  it("shows time range selector", async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );

    // Check for time range buttons
    expect(screen.getByText("Week")).toBeInTheDocument();
    expect(screen.getByText("Month")).toBeInTheDocument();
    expect(screen.getByText("Quarter")).toBeInTheDocument();
  });

  it("displays net worth section when data loads", async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );

    await waitFor(
      () => {
        expect(screen.getByText("💰 Your Money Summary")).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    await waitFor(
      () => {
        expect(screen.getByText("Total Net Worth")).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });

  it("shows accounts overview section when data loads", async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );

    await waitFor(
      () => {
        expect(screen.getByText("🏦 Your Bank Accounts")).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    await waitFor(
      () => {
        expect(screen.getByText("💰 Your Assets")).toBeInTheDocument();
        expect(screen.getByText("💳 Your Debts")).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });

  it("displays recent activity section", async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );

    await waitFor(
      () => {
        expect(screen.getByText("📋 Recent Activity")).toBeInTheDocument();
        expect(
          screen.getByText("Your latest money movements"),
        ).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });

  it("shows quick action buttons", async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );

    await waitFor(
      () => {
        expect(screen.getByText("⚡ Quick Actions")).toBeInTheDocument();
        expect(screen.getByText("Add Transaction")).toBeInTheDocument();
        expect(screen.getByText("Link Account")).toBeInTheDocument();
        expect(screen.getByText("Import Data")).toBeInTheDocument();
        expect(screen.getByText("View Reports")).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });

  it("displays encouraging footer message", async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );

    await waitFor(
      () => {
        expect(
          screen.getByText("You're doing great with your money!"),
        ).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    expect(
      screen.getByText(
        "Keep track of your finances, and watch your wealth grow over time. Remember, every dollar saved is a dollar earned!",
      ),
    ).toBeInTheDocument();
  });

  it("shows debug components in test environment", async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );

    // Debug components should be visible
    expect(screen.getByText("📊 Mock Data Direct Access")).toBeInTheDocument();
    expect(screen.getByText("🧪 Direct Service Test")).toBeInTheDocument();
  });
});
