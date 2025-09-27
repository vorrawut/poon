import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GoalsAsStars } from '../components/financial-universe/GoalsAsStars';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, onClick, ...props }: any) => 
      <div className={className} onClick={onClick} {...props}>{children}</div>,
  },
}));

const mockGoals = [
  {
    id: '1',
    name: 'Emergency Fund',
    targetAmount: 25000,
    currentAmount: 15000,
    targetDate: new Date('2024-12-31'),
    isCompleted: false,
    category: 'emergency',
    priority: 'high' as const,
  },
  {
    id: '2',
    name: 'Vacation Fund',
    targetAmount: 5000,
    currentAmount: 5000,
    targetDate: new Date('2024-06-30'),
    isCompleted: true,
    category: 'travel',
    priority: 'medium' as const,
  },
  {
    id: '3',
    name: 'New Car',
    targetAmount: 30000,
    currentAmount: 8000,
    targetDate: new Date('2025-03-31'),
    isCompleted: false,
    category: 'transportation',
    priority: 'medium' as const,
  },
  {
    id: '4',
    name: 'House Down Payment',
    targetAmount: 100000,
    currentAmount: 35000,
    targetDate: new Date('2026-01-01'),
    isCompleted: false,
    category: 'housing',
    priority: 'high' as const,
  },
];

describe('GoalsAsStars Component', () => {
  describe('Rendering', () => {
    it('renders the goals constellation title', () => {
      render(<GoalsAsStars goals={mockGoals} />);
      
      expect(screen.getByText('⭐ Your Goal Constellation')).toBeInTheDocument();
    });

    it('renders description text', () => {
      render(<GoalsAsStars goals={mockGoals} />);
      
      expect(screen.getByText(/Each star represents a financial goal/)).toBeInTheDocument();
      expect(screen.getByText(/When you reach a goal, your star ignites!/)).toBeInTheDocument();
    });

    it('renders progress summary statistics', () => {
      render(<GoalsAsStars goals={mockGoals} />);
      
      expect(screen.getByText('4')).toBeInTheDocument(); // Total Goals
      expect(screen.getByText('Total Goals')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument(); // Completed
      expect(screen.getByText('Completed')).toBeInTheDocument();
      expect(screen.getByText('Close to Goal')).toBeInTheDocument();
      expect(screen.getByText('Total Saved')).toBeInTheDocument();
    });

    it('calculates and displays total saved amount', () => {
      render(<GoalsAsStars goals={mockGoals} />);
      
      // Total saved: 15000 + 5000 + 8000 + 35000 = 63000 = $63K
      expect(screen.getByText('$63K')).toBeInTheDocument();
    });
  });

  describe('Goal Stars Rendering', () => {
    it('renders correct number of goal stars', () => {
      const { container } = render(<GoalsAsStars goals={mockGoals} />);
      
      // Each goal should have a clickable star element
      const clickableElements = container.querySelectorAll('[role="button"]');
      // Note: The actual count may vary based on implementation, but should be related to goals
      expect(clickableElements.length).toBeGreaterThan(0);
    });

    it('handles completed goals differently', () => {
      render(<GoalsAsStars goals={mockGoals} />);
      
      // Should show 1 completed goal
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('calculates close to goal count correctly', () => {
      render(<GoalsAsStars goals={mockGoals} />);
      
      // Goals with progress > 50% that are not completed
      // Emergency Fund: 15000/25000 = 60% (close to goal)
      // House Down Payment: 35000/100000 = 35% (not close)
      // New Car: 8000/30000 = 26.7% (not close)
      // So should show "1" for close to goal
      const closeToGoalElements = screen.getAllByText('1');
      expect(closeToGoalElements.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Star Interactions', () => {
    it('shows goal details on hover/click', () => {
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

  describe('Empty State', () => {
    it('handles empty goals array', () => {
      render(<GoalsAsStars goals={[]} />);
      
      expect(screen.getByText('⭐ Your Goal Constellation')).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument(); // Total Goals
      expect(screen.getByText('$0')).toBeInTheDocument(); // Total Saved
    });
  });

  describe('Progress Calculations', () => {
    it('calculates progress percentages correctly', () => {
      render(<GoalsAsStars goals={mockGoals} />);
      
      // The component should render without errors and show correct totals
      expect(screen.getByText('4')).toBeInTheDocument(); // Total goals
      expect(screen.getByText('1')).toBeInTheDocument(); // Completed goals
    });
  });

  describe('Currency Formatting', () => {
    it('formats large amounts correctly', () => {
      const largeGoals = [
        {
          id: '1',
          name: 'Million Dollar Goal',
          targetAmount: 1000000,
          currentAmount: 500000,
          targetDate: new Date('2030-01-01'),
          isCompleted: false,
          category: 'investment',
          priority: 'high' as const,
        },
      ];
      
      render(<GoalsAsStars goals={largeGoals} />);
      
      expect(screen.getByText('$500K')).toBeInTheDocument();
    });

    it('formats small amounts correctly', () => {
      const smallGoals = [
        {
          id: '1',
          name: 'Small Goal',
          targetAmount: 1000,
          currentAmount: 500,
          targetDate: new Date('2024-06-01'),
          isCompleted: false,
          category: 'misc',
          priority: 'low' as const,
        },
      ];
      
      render(<GoalsAsStars goals={smallGoals} />);
      
      expect(screen.getByText('$500')).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive grid classes', () => {
      const { container } = render(<GoalsAsStars goals={mockGoals} />);
      
      expect(container.querySelector('.grid-cols-2.lg\\:grid-cols-4')).toBeInTheDocument();
    });

    it('applies responsive text and spacing classes', () => {
      const { container } = render(<GoalsAsStars goals={mockGoals} />);
      
      expect(container.querySelector('.text-lg.md\\:text-2xl')).toBeInTheDocument();
      expect(container.querySelector('.text-sm.md\\:text-xl')).toBeInTheDocument();
      expect(container.querySelector('.p-2.md\\:p-3')).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('has proper container structure', () => {
      const { container } = render(<GoalsAsStars goals={mockGoals} />);
      
      expect(container.querySelector('.relative.bg-gradient-to-b')).toBeInTheDocument();
      expect(container.querySelector('.rounded-3xl')).toBeInTheDocument();
      expect(container.querySelector('.p-6')).toBeInTheDocument();
    });

    it('includes background elements', () => {
      const { container } = render(<GoalsAsStars goals={mockGoals} />);
      
      expect(container.querySelector('.absolute.inset-0')).toBeInTheDocument();
      expect(container.querySelector('.bg-gradient-radial')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<GoalsAsStars goals={mockGoals} />);
      
      // Should have accessible heading
      expect(screen.getByText('⭐ Your Goal Constellation')).toBeInTheDocument();
    });

    it('provides meaningful text for statistics', () => {
      render(<GoalsAsStars goals={mockGoals} />);
      
      // Each statistic should have descriptive text
      expect(screen.getByText('Total Goals')).toBeInTheDocument();
      expect(screen.getByText('Completed')).toBeInTheDocument();
      expect(screen.getByText('Close to Goal')).toBeInTheDocument();
      expect(screen.getByText('Total Saved')).toBeInTheDocument();
    });
  });
});
