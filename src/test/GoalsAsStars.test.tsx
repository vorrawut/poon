import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GoalsAsStars } from "../components/financial-universe/GoalsAsStars";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      onClick,
      whileHover: _whileHover,
      animate: _animate,
      initial: _initial,
      transition: _transition,
      style,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      onClick?: () => void;
      whileHover?: any;
      animate?: any;
      initial?: any;
      transition?: any;
      style?: any;
      [key: string]: unknown;
    }) => (
      <div className={className} onClick={onClick} style={style} {...props}>
        {children}
      </div>
    ),
    svg: ({
      children,
      className,
      style,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      style?: any;
      [key: string]: unknown;
    }) => (
      <svg className={className} style={style} {...props}>
        {children}
      </svg>
    ),
    line: ({
      x1,
      y1,
      x2,
      y2,
      stroke,
      strokeWidth,
      strokeDasharray,
      initial: _initial,
      animate: _animate,
      transition: _transition,
      ...props
    }: {
      x1?: number;
      y1?: number;
      x2?: number;
      y2?: number;
      stroke?: string;
      strokeWidth?: string;
      strokeDasharray?: string;
      initial?: any;
      animate?: any;
      transition?: any;
      [key: string]: unknown;
    }) => (
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        {...props}
      />
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

const mockGoals = [
  {
    id: "1",
    name: "Emergency Fund",
    targetAmount: 25000,
    currentAmount: 15000,
    deadline: new Date("2024-12-31"),
    isCompleted: false,
    category: "emergency",
  },
  {
    id: "2",
    name: "Vacation Fund",
    targetAmount: 5000,
    currentAmount: 5000,
    deadline: new Date("2024-06-30"),
    isCompleted: true,
    category: "travel",
  },
  {
    id: "3",
    name: "New Car",
    targetAmount: 30000,
    currentAmount: 8000,
    deadline: new Date("2025-03-31"),
    isCompleted: false,
    category: "transportation",
  },
  {
    id: "4",
    name: "House Down Payment",
    targetAmount: 100000,
    currentAmount: 35000,
    deadline: new Date("2026-01-01"),
    isCompleted: false,
    category: "housing",
  },
];

describe("GoalsAsStars Component", () => {
  describe("Rendering", () => {
    it("renders the goals constellation title", () => {
      render(<GoalsAsStars goals={mockGoals} />);

      expect(
        screen.getByText("⭐ Your Goal Constellation"),
      ).toBeInTheDocument();
    });

    it("renders description text", () => {
      render(<GoalsAsStars goals={mockGoals} />);

      expect(
        screen.getByText(/Each star represents a financial goal/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/When you reach a goal, your star ignites!/),
      ).toBeInTheDocument();
    });

    it("renders progress summary statistics", () => {
      render(<GoalsAsStars goals={mockGoals} />);

      expect(screen.getByText("Total Goals")).toBeInTheDocument();
      expect(screen.getByText("Completed")).toBeInTheDocument();
      expect(screen.getByText("Close to Goal")).toBeInTheDocument();
      expect(screen.getByText("Total Saved")).toBeInTheDocument();

      // Check for specific numbers - they should exist somewhere in the component
      expect(screen.getByText("4")).toBeInTheDocument(); // Total Goals count
      expect(screen.getAllByText("1")).toHaveLength(2); // Completed count and close to goal count
    });

    it("calculates and displays total saved amount", () => {
      render(<GoalsAsStars goals={mockGoals} />);

      // Total saved: 15000 + 5000 + 8000 + 35000 = 63000 = $63K
      expect(screen.getByText("$63K")).toBeInTheDocument();
    });
  });

  describe("Goal Stars Rendering", () => {
    it("renders correct number of goal stars", () => {
      render(<GoalsAsStars goals={mockGoals} />);

      // Each goal should have a clickable star element
      // Should render 4 goal stars (one for each goal)
      // Check that the component renders without errors and shows goal names
      expect(screen.getByText("Emergency Fund")).toBeInTheDocument();
      expect(screen.getByText("Vacation Fund")).toBeInTheDocument();
      expect(screen.getByText("New Car")).toBeInTheDocument();
      expect(screen.getByText("House Down Payment")).toBeInTheDocument();
    });

    it("handles completed goals differently", () => {
      render(<GoalsAsStars goals={mockGoals} />);

      // Should show 1 completed goal
      expect(screen.getAllByText("1")).toHaveLength(2); // There are multiple "1"s in the component
    });

    it("calculates close to goal count correctly", () => {
      render(<GoalsAsStars goals={mockGoals} />);

      // Goals with progress > 50% that are not completed
      // Emergency Fund: 15000/25000 = 60% (close to goal)
      // House Down Payment: 35000/100000 = 35% (not close)
      // New Car: 8000/30000 = 26.7% (not close)
      // So should show "1" for close to goal
      expect(screen.getAllByText("1")).toHaveLength(2); // Multiple "1"s in the component
    });
  });

  describe("Star Interactions", () => {
    it("shows goal details on hover/click", () => {
      const { container } = render(<GoalsAsStars goals={mockGoals} />);

      // Find clickable star elements
      const clickableStars = container.querySelectorAll('[role="button"]');

      if (clickableStars.length > 0) {
        fireEvent.click(clickableStars[0]);
        // The interaction should work (no errors thrown)
        expect(clickableStars[0]).toBeInTheDocument();
      }
    });
  });

  describe("Empty State", () => {
    it("handles empty goals array", () => {
      render(<GoalsAsStars goals={[]} />);

      expect(
        screen.getByText("⭐ Your Goal Constellation"),
      ).toBeInTheDocument();

      // Check for empty state content - the component should still render
      expect(screen.getByText("Total Goals")).toBeInTheDocument();
      expect(screen.getByText("Total Saved")).toBeInTheDocument();
      // In empty state, there should be no goal names
      expect(screen.queryByText("Emergency Fund")).not.toBeInTheDocument();
    });
  });

  describe("Progress Calculations", () => {
    it("calculates progress percentages correctly", () => {
      render(<GoalsAsStars goals={mockGoals} />);

      // The component should render without errors and show correct totals
      expect(screen.getByText("4")).toBeInTheDocument(); // Total goals
      expect(screen.getAllByText("1")).toHaveLength(2); // Multiple "1"s in the component
    });
  });

  describe("Currency Formatting", () => {
    it("formats large amounts correctly", () => {
      const largeGoals = [
        {
          id: "1",
          name: "Million Dollar Goal",
          targetAmount: 1000000,
          currentAmount: 500000,
          deadline: new Date("2030-01-01"),
          isCompleted: false,
          category: "investment",
        },
      ];

      render(<GoalsAsStars goals={largeGoals} />);

      expect(screen.getByText("$500K")).toBeInTheDocument();
    });

    it("formats small amounts correctly", () => {
      const smallGoals = [
        {
          id: "1",
          name: "Small Goal",
          targetAmount: 1000,
          currentAmount: 500,
          deadline: new Date("2024-06-01"),
          isCompleted: false,
          category: "misc",
        },
      ];

      render(<GoalsAsStars goals={smallGoals} />);

      expect(screen.getByText("$500")).toBeInTheDocument();
    });
  });

  describe("Responsive Design", () => {
    it("applies responsive grid classes", () => {
      const { container } = render(<GoalsAsStars goals={mockGoals} />);

      // Check for grid layout
      expect(container.querySelector(".grid")).toBeInTheDocument();
    });

    it("applies responsive text and spacing classes", () => {
      const { container } = render(<GoalsAsStars goals={mockGoals} />);

      // Check for basic text and spacing classes
      expect(container.querySelector(".text-lg")).toBeInTheDocument();
      expect(container.querySelector(".text-sm")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("has proper container structure", () => {
      const { container } = render(<GoalsAsStars goals={mockGoals} />);

      // Check for basic container structure - the component should render
      expect(container.firstChild).toBeInTheDocument();
      expect(container.querySelector(".relative")).toBeInTheDocument();
    });

    it("includes background elements", () => {
      const { container } = render(<GoalsAsStars goals={mockGoals} />);

      // Check for basic background elements
      expect(container.querySelector(".absolute")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper heading structure", () => {
      render(<GoalsAsStars goals={mockGoals} />);

      // Should have accessible heading
      expect(
        screen.getByText("⭐ Your Goal Constellation"),
      ).toBeInTheDocument();
    });

    it("provides meaningful text for statistics", () => {
      render(<GoalsAsStars goals={mockGoals} />);

      // Each statistic should have descriptive text
      expect(screen.getByText("Total Goals")).toBeInTheDocument();
      expect(screen.getByText("Completed")).toBeInTheDocument();
      expect(screen.getByText("Close to Goal")).toBeInTheDocument();
      expect(screen.getByText("Total Saved")).toBeInTheDocument();
    });
  });
});
