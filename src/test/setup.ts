/// <reference types="vitest/globals" />
import "@testing-library/jest-dom";

// Mock GSAP for tests
vi.mock("gsap", () => ({
  gsap: {
    set: vi.fn(),
    to: vi.fn(() => ({ kill: vi.fn() })),
    fromTo: vi.fn(() => ({ kill: vi.fn() })),
    timeline: vi.fn(() => ({
      to: vi.fn(),
      set: vi.fn(),
      kill: vi.fn(),
    })),
  },
}));

// Mock IntersectionObserver
(global as typeof globalThis).IntersectionObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  root = null;
  rootMargin = "";
  thresholds = [];
  takeRecords() {
    return [];
  }
};

// Mock ResizeObserver
(global as typeof globalThis).ResizeObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};
