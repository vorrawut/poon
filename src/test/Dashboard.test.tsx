import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { useAccountStore } from "../store/useAccountStore";
import { useTransactionStore } from "../store/useTransactionStore";
import { usePortfolioStore } from "../store/usePortfolioStore";
import { mockAccounts, mockTransactions, mockAssets } from "../mock/data";

// Mock the stores
vi.mock("../store/useAccountStore");
vi.mock("../store/useTransactionStore");
vi.mock("../store/usePortfolioStore");

const mockUseAccountStore = vi.mocked(useAccountStore);
const mockUseTransactionStore = vi.mocked(useTransactionStore);
const mockUsePortfolioStore = vi.mocked(usePortfolioStore);

describe("Dashboard", () => {
  beforeEach(() => {
    // Reset mocks
    mockUseAccountStore.mockReturnValue({
      accounts: mockAccounts,
      dashboardMetrics: {
        totalNetWorth: 186451.32,
        netWorthChange: 2341.75,
        netWorthChangePercent: 1.27,
        totalAssets: 186451.32,
        totalLiabilities: 0,
        monthlyIncome: 3200.0,
        monthlyExpenses: 1562.04,
        savingsRate: 51.1,
      },
      fetchAccounts: vi.fn(),
    });

    mockUseTransactionStore.mockReturnValue({
      transactions: mockTransactions,
      fetchTransactions: vi.fn(),
    });

    mockUsePortfolioStore.mockReturnValue({
      assets: mockAssets,
      fetchAssets: vi.fn(),
    });
  });

  it("renders welcome message", () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );

    expect(screen.getByLabelText("Welcome back!")).toBeInTheDocument();
  });

  it("displays financial overview text", () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );

    expect(
      screen.getByText("Here's your financial overview"),
    ).toBeInTheDocument();
  });

  it("shows net worth section", () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );

    expect(screen.getByText("Total Net Worth")).toBeInTheDocument();
  });

  it("displays recent transactions section", () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );

    expect(screen.getByText("Recent Transactions")).toBeInTheDocument();
  });

  it("shows top holdings section", () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );

    expect(screen.getByText("Top Holdings")).toBeInTheDocument();
  });

  it("renders quick actions", () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );

    expect(screen.getByText("Quick Actions")).toBeInTheDocument();
    expect(screen.getByText("Add Transaction")).toBeInTheDocument();
    expect(screen.getByText("Link Account")).toBeInTheDocument();
    expect(screen.getByText("Import CSV")).toBeInTheDocument();
  });
});
