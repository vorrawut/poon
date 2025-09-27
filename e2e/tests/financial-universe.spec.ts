import { test, expect } from '@playwright/test';

test.describe('Financial Universe', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the dashboard which contains the Financial Universe
    await page.goto('http://localhost:5173/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Wait for the Financial Universe components to be visible
    await page.waitForSelector('text=Your Financial Universe', { timeout: 10000 });
  });

  test.describe('Page Loading and Rendering', () => {
    test('displays the Financial Universe header', async ({ page }) => {
      // Check for the main universe title
      await expect(page.locator('text=Your Financial Universe')).toBeVisible();
      
      // Check for the welcome message
      await expect(page.locator('text=Welcome to your personal galaxy of wealth!')).toBeVisible();
    });

    test('renders all three main components', async ({ page }) => {
      // Planet of Wealth
      await expect(page.locator('text=🌍 Planet of Wealth').first()).toBeVisible();
      
      // Moon of Spending
      await expect(page.locator('text=🌙 Moon of Spending').first()).toBeVisible();
      
      // Goals Constellation
      await expect(page.locator('text=⭐ Your Goal Constellation').first()).toBeVisible();
    });

    test('displays universe status section', async ({ page }) => {
      await expect(page.locator('text=🌌 Universe Status')).toBeVisible();
      await expect(page.locator('text=Planet Mass')).toBeVisible();
      await expect(page.locator('text=Moon Cycle')).toBeVisible();
      await expect(page.locator('text=Burning Stars')).toBeVisible();
      await expect(page.locator('text=Ignited Stars')).toBeVisible();
    });

    test('shows inspirational message', async ({ page }) => {
      await expect(page.locator('text=Your Financial Galaxy is Growing!')).toBeVisible();
      await expect(page.locator('text=Like the universe itself, your wealth is expanding')).toBeVisible();
    });
  });

  test.describe('Planet of Wealth Component', () => {
    test('displays net worth data', async ({ page }) => {
      // Check for net worth value (should be formatted as $306K based on mock data)
      await expect(page.locator('text=$306K')).toBeVisible();
      
      // Check for growth indicator
      await expect(page.locator('text=growth').or(page.locator('text=decline'))).toBeVisible();
    });

    test('shows growth/decline indicators', async ({ page }) => {
      // Should show either 📈 or 📉
      const growthIndicator = page.locator('text=📈').or(page.locator('text=📉'));
      await expect(growthIndicator).toBeVisible();
    });
  });

  test.describe('Moon of Spending Component', () => {
    test('displays spending data', async ({ page }) => {
      // Check for spending amount
      await expect(page.locator('text=$3K')).toBeVisible();
      
      // Check for spending categories
      await expect(page.locator('text=Food')).toBeVisible();
      await expect(page.locator('text=Transport')).toBeVisible();
    });

    test('shows spending change indicators', async ({ page }) => {
      // Should show either ⬆️ or ⬇️ for spending change
      const spendingIndicator = page.locator('text=⬆️').or(page.locator('text=⬇️'));
      await expect(spendingIndicator).toBeVisible();
    });
  });

  test.describe('Goals as Stars Component', () => {
    test('displays goals statistics', async ({ page }) => {
      // Check for total goals count
      await expect(page.locator('text=Total Goals').locator('..').locator('text=5')).toBeVisible();
      
      // Check for completed goals
      await expect(page.locator('text=Completed').locator('..').locator('text=1')).toBeVisible();
      
      // Check for total saved amount
      await expect(page.locator('text=Total Saved').locator('..').locator('text=$43K')).toBeVisible();
    });

    test('shows goal progress information', async ({ page }) => {
      await expect(page.locator('text=Each star represents a financial goal').first()).toBeVisible();
      await expect(page.locator('text=When you reach a goal, your star ignites!').first()).toBeVisible();
    });
  });

  test.describe('Navigation and Interactions', () => {
    test('displays navigation buttons', async ({ page }) => {
      await expect(page.locator('text=Quick Actions')).toBeVisible();
      await expect(page.locator('text=Detailed View')).toBeVisible();
      await expect(page.locator('text=Analytics')).toBeVisible();
      await expect(page.locator('text=Settings')).toBeVisible();
    });

    test('navigation buttons are clickable', async ({ page }) => {
      // Test Quick Actions button
      const quickActionsButton = page.locator('button:has-text("Quick Actions")').first();
      await expect(quickActionsButton).toBeEnabled();
      
      // Test Detailed View button
      const detailedViewButton = page.locator('button:has-text("Detailed View")').first();
      await expect(detailedViewButton).toBeEnabled();
      
      // Test Analytics button
      const analyticsButton = page.locator('button:has-text("Analytics")').first();
      await expect(analyticsButton).toBeEnabled();
      
      // Test Settings button
      const settingsButton = page.locator('button:has-text("Settings")').first();
      await expect(settingsButton).toBeEnabled();
    });

    test('clicking navigation buttons triggers interactions', async ({ page }) => {
      // Click Detailed View button and verify it's clickable
      const detailedViewButton = page.locator('button:has-text("Detailed View")').first();
      await detailedViewButton.click();
      
      // The button should remain visible after click (no navigation away from universe)
      await expect(detailedViewButton).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('displays properly on desktop', async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1200, height: 800 });
      
      // Verify desktop layout
      await expect(page.locator('text=Your Financial Universe')).toBeVisible();
      
      // On desktop, components should be in a horizontal layout
      const planetComponent = page.locator('text=🌍 Planet of Wealth');
      const moonComponent = page.locator('text=🌙 Moon of Spending');
      
      await expect(planetComponent).toBeVisible();
      await expect(moonComponent).toBeVisible();
    });

    test('displays properly on tablet', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      
      // Verify components are still visible
      await expect(page.locator('text=Your Financial Universe')).toBeVisible();
      await expect(page.locator('text=🌍 Planet of Wealth')).toBeVisible();
      await expect(page.locator('text=🌙 Moon of Spending')).toBeVisible();
    });

    test('displays properly on mobile', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Verify all main components are still accessible
      await expect(page.locator('text=Your Financial Universe')).toBeVisible();
      await expect(page.locator('text=🌍 Planet of Wealth')).toBeVisible();
      await expect(page.locator('text=🌙 Moon of Spending')).toBeVisible();
      await expect(page.locator('text=⭐ Your Goal Constellation')).toBeVisible();
    });
  });

  test.describe('Visual Elements and Animations', () => {
    test('background elements are present', async ({ page }) => {
      // The background should have the universe gradient
      const universeContainer = page.locator('.bg-gradient-to-b.from-slate-900.to-purple-900');
      await expect(universeContainer).toBeVisible();
    });

    test('emoji elements are displayed', async ({ page }) => {
      // Check for various emoji elements
      await expect(page.locator('text=🌍')).toBeVisible();
      await expect(page.locator('text=🌙')).toBeVisible();
      await expect(page.locator('text=⭐')).toBeVisible();
      await expect(page.locator('text=🌌')).toBeVisible();
      await expect(page.locator('text=✨')).toBeVisible();
    });
  });

  test.describe('Data Display Accuracy', () => {
    test('displays formatted financial data correctly', async ({ page }) => {
      // Check that amounts are properly formatted
      await expect(page.locator('text=$306K')).toBeVisible(); // Net worth
      await expect(page.locator('text=$3K')).toBeVisible(); // Monthly spending
      await expect(page.locator('text=$43K')).toBeVisible(); // Total saved
    });

    test('shows progress indicators', async ({ page }) => {
      // Look for percentage or change indicators
      const changeText = page.locator('text=increase').or(page.locator('text=decrease')).or(page.locator('text=growth'));
      await expect(changeText).toBeVisible();
    });
  });

  test.describe('Loading States', () => {
    test('handles loading state gracefully', async ({ page }) => {
      // Refresh the page to potentially catch loading state
      await page.reload();
      
      // Should eventually show the universe content
      await expect(page.locator('text=Your Financial Universe')).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Error Handling', () => {
    test('page loads without JavaScript errors', async ({ page }) => {
      const errors: string[] = [];
      
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      // Navigate and interact with the page
      await page.reload();
      await page.waitForSelector('text=Your Financial Universe', { timeout: 10000 });
      
      // Click some buttons to trigger interactions
      if (await page.locator('button:has-text("Quick Actions")').isVisible()) {
        await page.locator('button:has-text("Quick Actions")').click();
      }
      
      // Should not have critical console errors
      const criticalErrors = errors.filter(error => 
        !error.includes('favicon') && 
        !error.includes('DevTools') &&
        !error.includes('chrome-extension')
      );
      
      expect(criticalErrors).toHaveLength(0);
    });
  });

  test.describe('Accessibility', () => {
    test('has proper heading structure', async ({ page }) => {
      // Check for proper heading hierarchy
      await expect(page.locator('h1, h2, h3, h4, h5, h6').first()).toBeVisible();
    });

    test('buttons have accessible names', async ({ page }) => {
      // All buttons should have text or aria-labels
      const buttons = page.locator('button');
      const buttonCount = await buttons.count();
      
      for (let i = 0; i < buttonCount; i++) {
        const button = buttons.nth(i);
        const isVisible = await button.isVisible();
        
        if (isVisible) {
          const hasText = await button.textContent();
          const hasAriaLabel = await button.getAttribute('aria-label');
          
          expect(hasText || hasAriaLabel).toBeTruthy();
        }
      }
    });
  });
});

// Additional test for the UniverseDashboard page specifically
test.describe('Universe Dashboard Page', () => {
  test('UniverseDashboard route works correctly', async ({ page }) => {
    // If UniverseDashboard is available as a separate route
    // This test assumes it might be added to routing in the future
    
    await page.goto('http://localhost:5173/');
    
    // For now, just verify the universe components are accessible
    await expect(page.locator('text=Your Financial Universe')).toBeVisible({ timeout: 10000 });
  });
});
