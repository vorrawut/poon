import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { AnimatedNumber } from "../components/ui/AnimatedNumber";

describe("AnimatedNumber", () => {
  it("renders with default currency format", () => {
    const { container } = render(
      <AnimatedNumber value={1234.56} format="currency" />,
    );

    const element = container.querySelector("span");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("animate-count");
    expect(element).toHaveClass("font-mono");
  });

  it("renders with percent format", () => {
    const { container } = render(
      <AnimatedNumber value={25.5} format="percent" />,
    );

    const element = container.querySelector("span");
    expect(element).toBeInTheDocument();
  });

  it("accepts custom className", () => {
    const { container } = render(
      <AnimatedNumber value={100} className="text-lg text-blue-500" />,
    );

    const element = container.querySelector("span");
    expect(element).toHaveClass("text-lg");
    expect(element).toHaveClass("text-blue-500");
  });

  it("displays prefix and suffix", () => {
    render(
      <AnimatedNumber value={50} prefix="$" suffix=" USD" format="decimal" />,
    );

    // The aria-label should contain the prefix and suffix
    const element = document.querySelector('[aria-label="$50 USD"]');
    expect(element).toBeInTheDocument();
  });
});
