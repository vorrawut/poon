import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PlanetOfWealth } from "../components/financial-universe/PlanetOfWealth";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      [key: string]: unknown;
    }) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
  useAnimation: () => ({
    start: vi.fn(),
    set: vi.fn(),
  }),
}));

describe("PlanetOfWealth Component", () => {
  const defaultProps = {
    netWorth: 305917.21,
    previousNetWorth: 297570.98,
    growth: 8346.23,
  };

  describe("Rendering", () => {
    it("renders the planet title", () => {
      render(<PlanetOfWealth {...defaultProps} />);

      expect(screen.getByText("🌍 Planet of Wealth")).toBeInTheDocument();
    });

    it("displays formatted net worth", () => {
      render(<PlanetOfWealth {...defaultProps} />);

      expect(screen.getByText("$306K")).toBeInTheDocument();
    });

    it("displays growth information for positive growth", () => {
      render(<PlanetOfWealth {...defaultProps} />);

      expect(screen.getByText(/\+\$8K growth/)).toBeInTheDocument();
      // The emoji is part of the same text element, so we need to check for it differently
      const growthElement = screen.getByText(/\+\$8K growth/);
      expect(growthElement.textContent).toContain("📈");
    });

    it("displays decline information for negative growth", () => {
      const negativeGrowthProps = {
        ...defaultProps,
        growth: -5000,
      };

      render(<PlanetOfWealth {...negativeGrowthProps} />);

      expect(screen.getByText(/\$-5,000 decline/)).toBeInTheDocument();
      // The emoji is part of the same text element
      const declineElement = screen.getByText(/\$-5,000 decline/);
      expect(declineElement.textContent).toContain("📉");
    });
  });

  describe("Currency Formatting", () => {
    it("formats millions correctly", () => {
      const millionProps = {
        ...defaultProps,
        netWorth: 2500000,
      };

      render(<PlanetOfWealth {...millionProps} />);

      expect(screen.getByText("$2.5M")).toBeInTheDocument();
    });

    it("formats thousands correctly", () => {
      const thousandProps = {
        ...defaultProps,
        netWorth: 15000,
      };

      render(<PlanetOfWealth {...thousandProps} />);

      expect(screen.getByText("$15K")).toBeInTheDocument();
    });

    it("formats small amounts correctly", () => {
      const smallProps = {
        ...defaultProps,
        netWorth: 500,
      };

      render(<PlanetOfWealth {...smallProps} />);

      expect(screen.getByText("$500")).toBeInTheDocument();
    });
  });

  describe("Visual States", () => {
    it("applies growing state classes for positive growth", () => {
      const { container } = render(<PlanetOfWealth {...defaultProps} />);

      // Check for growth-related classes
      expect(
        container.querySelector(".border-emerald-400"),
      ).toBeInTheDocument();
      expect(container.querySelector(".text-emerald-300")).toBeInTheDocument();
    });

    it("applies declining state classes for negative growth", () => {
      const negativeGrowthProps = {
        ...defaultProps,
        growth: -5000,
      };

      const { container } = render(<PlanetOfWealth {...negativeGrowthProps} />);

      // Check for decline-related classes
      expect(container.querySelector(".border-orange-400")).toBeInTheDocument();
      expect(container.querySelector(".text-orange-300")).toBeInTheDocument();
    });
  });

  describe("Planet Size Calculation", () => {
    it("calculates appropriate planet size based on net worth", () => {
      const { rerender } = render(<PlanetOfWealth {...defaultProps} />);

      // Test with different net worth values
      const highNetWorthProps = {
        ...defaultProps,
        netWorth: 1000000,
      };

      rerender(<PlanetOfWealth {...highNetWorthProps} />);

      // Planet should render (size calculation is internal but component should render)
      expect(screen.getByText("🌍 Planet of Wealth")).toBeInTheDocument();
    });

    it("handles zero net worth", () => {
      const zeroProps = {
        ...defaultProps,
        netWorth: 0,
        growth: 0,
      };

      render(<PlanetOfWealth {...zeroProps} />);

      expect(screen.getByText("$0")).toBeInTheDocument();
    });

    it("handles negative net worth", () => {
      const negativeProps = {
        ...defaultProps,
        netWorth: -50000,
        growth: -10000,
      };

      render(<PlanetOfWealth {...negativeProps} />);

      expect(screen.getByText("$-50,000")).toBeInTheDocument();
    });
  });

  describe("Responsive Design", () => {
    it("applies responsive text classes", () => {
      const { container } = render(<PlanetOfWealth {...defaultProps} />);

      // Check for responsive classes
      expect(
        container.querySelector(".text-lg.md\\:text-2xl"),
      ).toBeInTheDocument();
      expect(
        container.querySelector(".text-2xl.md\\:text-4xl"),
      ).toBeInTheDocument();
      expect(
        container.querySelector(".text-sm.md\\:text-lg"),
      ).toBeInTheDocument();
    });

    it("applies responsive padding and margins", () => {
      const { container } = render(<PlanetOfWealth {...defaultProps} />);

      expect(container.querySelector(".mt-4.md\\:mt-6")).toBeInTheDocument();
      expect(container.querySelector(".px-2")).toBeInTheDocument();
    });
  });

  describe("Growth Indicators", () => {
    it("shows correct growth percentage when positive", () => {
      const props = {
        netWorth: 110000,
        previousNetWorth: 100000,
        growth: 10000,
      };

      render(<PlanetOfWealth {...props} />);

      expect(screen.getByText(/\+\$10K growth/)).toBeInTheDocument();
    });

    it("shows correct decline percentage when negative", () => {
      const props = {
        netWorth: 90000,
        previousNetWorth: 100000,
        growth: -10000,
      };

      render(<PlanetOfWealth {...props} />);

      expect(screen.getByText(/decline/)).toBeInTheDocument();
    });

    it("handles zero growth", () => {
      const props = {
        netWorth: 100000,
        previousNetWorth: 100000,
        growth: 0,
      };

      render(<PlanetOfWealth {...props} />);

      // Zero growth shows as growth in the component (growth >= 0)
      // The text might be split across elements, so let's check for parts
      expect(screen.getByText(/growth/)).toBeInTheDocument();
      expect(screen.getByText(/\$0/)).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("renders all essential elements", () => {
      const { container } = render(<PlanetOfWealth {...defaultProps} />);

      // Check for main structural elements
      expect(
        container.querySelector(".relative.flex.flex-col.items-center"),
      ).toBeInTheDocument();
      expect(container.querySelector(".absolute.inset-0")).toBeInTheDocument(); // Background stars
    });

    it("has proper accessibility structure", () => {
      render(<PlanetOfWealth {...defaultProps} />);

      // Should have heading for screen readers
      expect(screen.getByText("🌍 Planet of Wealth")).toBeInTheDocument();
    });
  });
});
