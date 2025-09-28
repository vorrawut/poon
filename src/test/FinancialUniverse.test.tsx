import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FinancialUniverse } from "../components/financial-universe/FinancialUniverse";
import { useNetWorth } from "../features/networth/hooks/useNetWorth";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      onClick,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      onClick?: () => void;
      [key: string]: unknown;
    }) => (
      <div className={className} onClick={onClick} {...props}>
        {children}
      </div>
    ),
    button: ({
      children,
      className,
      onClick,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      onClick?: () => void;
      [key: string]: unknown;
    }) => (
      <button className={className} onClick={onClick} {...props}>
        {children}
      </button>
    ),
    h1: ({
      children,
      className,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      [key: string]: unknown;
    }) => (
      <h1 className={className} {...props}>
        {children}
      </h1>
    ),
    h3: ({
      children,
      className,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      [key: string]: unknown;
    }) => (
      <h3 className={className} {...props}>
        {children}
      </h3>
    ),
    p: ({
      children,
      className,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      [key: string]: unknown;
    }) => (
      <p className={className} {...props}>
        {children}
      </p>
    ),
    span: ({
      children,
      className,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      [key: string]: unknown;
    }) => (
      <span className={className} {...props}>
        {children}
      </span>
    ),
  },
  useAnimation: () => ({
    start: vi.fn(),
    set: vi.fn(),
  }),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock the useNetWorth hook
vi.mock("../features/networth/hooks/useNetWorth");

// Mock the child components to avoid complex rendering issues
vi.mock("../components/financial-universe/GoalsAsStars", () => ({
  GoalsAsStars: ({ goals }: { goals: any[] }) => (
    <div data-testid="goals-as-stars">
      <h3>⭐ Your Goal Constellation</h3>
      <p>
        Each star represents a financial goal. When you reach a goal, your star
        ignites!
      </p>
      <div>{goals.length}</div>
      <div>Total Goals</div>
      <div>{goals.filter((g) => g.isCompleted).length}</div>
      <div>Completed</div>
      <div>
        {
          goals.filter(
            (g) => !g.isCompleted && g.currentAmount / g.targetAmount > 0.5,
          ).length
        }
      </div>
      <div>Close to Goal</div>
      <div>
        $
        {goals.reduce((sum, g) => sum + g.currentAmount, 0) >= 1000
          ? Math.floor(
              goals.reduce((sum, g) => sum + g.currentAmount, 0) / 1000,
            ) + "K"
          : goals.reduce((sum, g) => sum + g.currentAmount, 0)}
      </div>
      <div>Total Saved</div>
    </div>
  ),
}));

vi.mock("../components/financial-universe/MoonOfSpending", () => ({
  MoonOfSpending: ({ monthlySpending }: { monthlySpending: number }) => (
    <div data-testid="moon-of-spending">
      <h3>🌙 Moon of Spending</h3>
      <div>
        $
        {monthlySpending >= 1000
          ? Math.floor(monthlySpending / 1000) + "K"
          : monthlySpending}
      </div>
      <div>Food</div>
      <div>Transport</div>
      <div>Entertainment</div>
      <div>Shopping</div>
    </div>
  ),
}));

vi.mock("../components/financial-universe/PlanetOfWealth", () => ({
  PlanetOfWealth: ({
    netWorth,
    growth,
  }: {
    netWorth: number;
    growth: number;
  }) => (
    <div data-testid="planet-of-wealth">
      <h3>🌍 Planet of Wealth</h3>
      <div>
        $
        {netWorth >= 1000000
          ? (netWorth / 1000000).toFixed(1) + "M"
          : netWorth >= 1000
            ? Math.floor(netWorth / 1000) + "K"
            : netWorth}
      </div>
      <div>
        {growth >= 0 ? "📈" : "📉"} {growth >= 0 ? "+" : ""}$
        {Math.abs(growth) >= 1000
          ? Math.floor(Math.abs(growth) / 1000) + "K"
          : Math.abs(growth)}{" "}
        {growth >= 0 ? "growth" : "decline"}
      </div>
    </div>
  ),
}));

const mockNetWorthData = {
  totalNetWorth: 305917.21,
  netWorthChange: 8347.23,
  netWorthChangePercent: 2.8,
  previousNetWorth: 297570.98,
  lastUpdated: new Date(),
  breakdown: {
    cash: 81670.5,
    investments: 247050.25,
    realEstate: 0,
    other: -22803.54,
  },
};

describe("FinancialUniverse Component", () => {
  const mockOnQuickAction = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNetWorth as any).mockReturnValue({
      netWorthData: mockNetWorthData,
      loading: false,
      error: null,
    });
  });

  describe("Rendering", () => {
    it("renders the main universe header", () => {
      render(<FinancialUniverse onQuickAction={mockOnQuickAction} />);

      expect(screen.getByText("🌍")).toBeInTheDocument();
      expect(screen.getByText("Your Financial Universe")).toBeInTheDocument();
      expect(
        screen.getByText(/Welcome to your personal galaxy of wealth!/),
      ).toBeInTheDocument();
    });

    it("renders the Planet of Wealth component", () => {
      render(<FinancialUniverse onQuickAction={mockOnQuickAction} />);

      // Check that the Planet of Wealth component is rendered
      expect(screen.getAllByText("🌍 Planet of Wealth")).toHaveLength(2);
      expect(screen.getAllByText("$306K")).toHaveLength(1);
      expect(screen.getAllByText(/\+\$8K growth/)).toHaveLength(2);
    });

    it("renders the Moon of Spending component", () => {
      render(<FinancialUniverse onQuickAction={mockOnQuickAction} />);

      expect(screen.getAllByText("🌙 Moon of Spending")).toHaveLength(2); // Desktop and mobile layouts
      expect(screen.getAllByText("$3K")).toHaveLength(2);
    });

    it("renders the Goals as Stars component", () => {
      render(<FinancialUniverse onQuickAction={mockOnQuickAction} />);

      expect(screen.getAllByText("⭐ Your Goal Constellation")).toHaveLength(2); // Desktop and mobile layouts
      expect(
        screen.getAllByText(/Each star represents a financial goal/),
      ).toHaveLength(2);
    });

    it("renders navigation buttons", () => {
      render(<FinancialUniverse onQuickAction={mockOnQuickAction} />);

      expect(screen.getByText("🚀")).toBeInTheDocument();
      expect(screen.getByText("Quick Actions")).toBeInTheDocument();
      expect(screen.getByText("🔭")).toBeInTheDocument();
      expect(screen.getByText("Detailed View")).toBeInTheDocument();
      expect(screen.getByText("📊")).toBeInTheDocument();
      expect(screen.getByText("Analytics")).toBeInTheDocument();
      expect(screen.getByText("⚙️")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    it("renders universe status section", () => {
      render(<FinancialUniverse onQuickAction={mockOnQuickAction} />);

      expect(screen.getByText("🌌 Universe Status")).toBeInTheDocument();
      expect(screen.getByText("Planet Mass")).toBeInTheDocument();
      expect(screen.getByText("Moon Cycle")).toBeInTheDocument();
      expect(screen.getByText("Burning Stars")).toBeInTheDocument();
      expect(screen.getByText("Ignited Stars")).toBeInTheDocument();
    });

    it("renders inspirational message", () => {
      render(<FinancialUniverse onQuickAction={mockOnQuickAction} />);

      expect(
        screen.getByText("Your Financial Galaxy is Growing!"),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Like the universe itself, your wealth is expanding/),
      ).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("calls onQuickAction when Quick Actions button is clicked", () => {
      render(<FinancialUniverse onQuickAction={mockOnQuickAction} />);

      const quickActionsButton = screen.getByRole("button", {
        name: /Quick Actions/,
      });
      fireEvent.click(quickActionsButton);

      expect(mockOnQuickAction).toHaveBeenCalledWith("quick_actions");
    });

    it("calls onQuickAction when Detailed View button is clicked", () => {
      render(<FinancialUniverse onQuickAction={mockOnQuickAction} />);

      const detailedViewButton = screen.getByRole("button", {
        name: /Detailed View/,
      });
      fireEvent.click(detailedViewButton);

      expect(mockOnQuickAction).toHaveBeenCalledWith("detailed_view");
    });

    it("calls onQuickAction when Analytics button is clicked", () => {
      render(<FinancialUniverse onQuickAction={mockOnQuickAction} />);

      const analyticsButton = screen.getByRole("button", { name: /Analytics/ });
      fireEvent.click(analyticsButton);

      expect(mockOnQuickAction).toHaveBeenCalledWith("analytics");
    });

    it("calls onQuickAction when Settings button is clicked", () => {
      render(<FinancialUniverse onQuickAction={mockOnQuickAction} />);

      const settingsButton = screen.getByRole("button", { name: /Settings/ });
      fireEvent.click(settingsButton);

      expect(mockOnQuickAction).toHaveBeenCalledWith("settings");
    });
  });

  describe("Loading State", () => {
    it("renders loading state when net worth data is loading", () => {
      (useNetWorth as any).mockReturnValue({
        netWorthData: null,
        loading: true,
        error: null,
      });

      render(<FinancialUniverse onQuickAction={mockOnQuickAction} />);

      expect(
        screen.getByText("🌌 Loading your financial universe..."),
      ).toBeInTheDocument();
    });
  });

  describe("Error State", () => {
    it("renders error state when net worth data fails to load", () => {
      (useNetWorth as any).mockReturnValue({
        netWorthData: null,
        loading: false,
        error: "Failed to load net worth data",
      });

      render(<FinancialUniverse onQuickAction={mockOnQuickAction} />);

      expect(screen.getByText("Universe Loading Error")).toBeInTheDocument();
      expect(
        screen.getByText("Unable to load your financial data"),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Reload Universe/ }),
      ).toBeInTheDocument();
    });
  });

  describe("Data Display", () => {
    it("displays formatted net worth correctly", () => {
      render(<FinancialUniverse onQuickAction={mockOnQuickAction} />);

      expect(screen.getByText("$306K")).toBeInTheDocument();
    });

    it("shows positive growth with correct formatting", () => {
      render(<FinancialUniverse onQuickAction={mockOnQuickAction} />);

      expect(screen.getAllByText(/\+\$8K growth/)).toHaveLength(2); // Desktop and mobile layouts
    });

    it("displays spending data correctly", () => {
      render(<FinancialUniverse onQuickAction={mockOnQuickAction} />);

      // Check for spending categories - use getAllByText since there might be multiple instances
      expect(screen.getAllByText("Food")).toHaveLength(2); // One in each moon component
      expect(screen.getAllByText("Transport")).toHaveLength(2);
      expect(screen.getAllByText("Entertainment")).toHaveLength(2);
      expect(screen.getAllByText("Shopping")).toHaveLength(2);
    });
  });

  describe("Responsive Behavior", () => {
    it("applies responsive classes correctly", () => {
      const { container } = render(
        <FinancialUniverse onQuickAction={mockOnQuickAction} />,
      );

      // Check for mobile/desktop layout classes
      expect(container.querySelector(".lg\\:hidden")).toBeInTheDocument();
      expect(container.querySelector(".hidden.lg\\:grid")).toBeInTheDocument();
    });

    it("has proper grid layouts for different screen sizes", () => {
      const { container } = render(
        <FinancialUniverse onQuickAction={mockOnQuickAction} />,
      );

      // Check for responsive grid classes
      expect(
        container.querySelector(".grid-cols-1.md\\:grid-cols-2"),
      ).toBeInTheDocument();
      expect(
        container.querySelector(".grid-cols-2.lg\\:grid-cols-4"),
      ).toBeInTheDocument();
    });
  });

  describe("Animation Elements", () => {
    it("renders background stars", () => {
      const { container } = render(
        <FinancialUniverse onQuickAction={mockOnQuickAction} />,
      );

      // Check for star elements
      const stars = container.querySelectorAll(".bg-white.rounded-full");
      expect(stars.length).toBeGreaterThan(0);
    });

    it("renders nebula background elements", () => {
      const { container } = render(
        <FinancialUniverse onQuickAction={mockOnQuickAction} />,
      );

      // Check for nebula background
      expect(
        container.querySelector(".bg-purple-500\\/10"),
      ).toBeInTheDocument();
      expect(container.querySelector(".bg-blue-500\\/10")).toBeInTheDocument();
      expect(container.querySelector(".bg-pink-500\\/10")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper button roles and labels", () => {
      render(<FinancialUniverse onQuickAction={mockOnQuickAction} />);

      expect(
        screen.getByRole("button", { name: /Quick Actions/ }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Detailed View/ }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Analytics/ }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Settings/ }),
      ).toBeInTheDocument();
    });

    it("has proper heading structure", () => {
      render(<FinancialUniverse onQuickAction={mockOnQuickAction} />);

      expect(
        screen.getByRole("heading", { name: /Your Financial Universe/ }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /Universe Status/ }),
      ).toBeInTheDocument();
    });
  });
});
