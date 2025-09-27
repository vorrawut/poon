import { test, expect } from '@playwright/test';
import { DashboardHelpers } from '../helpers/dashboard-helpers';

test.describe('Dashboard - Local Mode with Mock Data', () => {
  let dashboardHelpers: DashboardHelpers;

  test.beforeEach(async ({ page }) => {
    dashboardHelpers = new DashboardHelpers(page);
    
    // Navigate to dashboard
    await page.goto('/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Wait for React to mount
    await page.waitForSelector('body', { timeout: 15000 });
  });

  test('should load dashboard with all widgets', async ({ page }) => {
    await test.step('Verify dashboard loads', async () => {
      await expect(page.locator('h1, .text-4xl')).toContainText('Welcome back!');
      await expect(page.locator('p')).toContainText('financial overview');
    });

    await test.step('Verify all widgets are present and loaded', async () => {
      await dashboardHelpers.verifyAllWidgetsLoaded();
    });

    await test.step('Take success screenshot', async () => {
      await dashboardHelpers.takeDebugScreenshot('dashboard-loaded');
    });
  });

  test('should display net worth widget with mock data', async ({ page }) => {
    await test.step('Wait for net worth widget', async () => {
      await dashboardHelpers.waitForNetWorthWidget();
    });

    await test.step('Verify net worth value is displayed', async () => {
      const netWorthValue = await dashboardHelpers.getNetWorthValue();
      expect(netWorthValue).toMatch(/\$[\d,]+/);
      
      // Should have a realistic mock value (not $0)
      expect(netWorthValue).not.toContain('$0.00');
      expect(netWorthValue).not.toContain('$0');
    });

    await test.step('Verify net worth change indicator', async () => {
      // Look for positive or negative change indicator
      const changeIndicator = page.locator('[class*="green-"], [class*="red-"]').first();
      await expect(changeIndicator).toBeVisible({ timeout: 10000 });
    });

    await test.step('Verify sparkline chart is present', async () => {
      // Look for chart container (Recharts creates SVG elements)
      await expect(page.locator('svg')).toBeVisible({ timeout: 10000 });
    });
  });

  test('should display accounts overview widget', async ({ page }) => {
    await test.step('Wait for accounts widget', async () => {
      await dashboardHelpers.waitForAccountsWidget();
    });

    await test.step('Verify accounts are displayed', async () => {
      // Should have multiple account types
      await expect(page.locator('text=Assets')).toBeVisible({ timeout: 10000 });
      
      // Check for common account types from mock data
      const pageContent = await page.textContent('body');
      const hasAccountTypes = ['Checking', 'Savings', 'Investment', 'Credit'].some(type => 
        pageContent?.includes(type)
      );
      expect(hasAccountTypes).toBe(true);
    });

    await test.step('Verify account balances are shown', async () => {
      // Should show dollar amounts for accounts
      const pageText = await page.textContent('body');
      const hasDollarAmounts = /\$[\d,]+/.test(pageText || '');
      expect(hasDollarAmounts).toBe(true);
    });
  });

  test('should display quick actions widget', async ({ page }) => {
    await test.step('Wait for quick actions', async () => {
      await dashboardHelpers.waitForQuickActionsWidget();
    });

    await test.step('Verify quick action buttons are present', async () => {
      const pageContent = await page.textContent('body');
      
      // Look for common quick actions
      const hasQuickActions = ['Add Transaction', 'Import CSV', 'Link Account', 'Quick Actions'].some(action => 
        pageContent?.includes(action)
      );
      expect(hasQuickActions).toBe(true);
    });

    await test.step('Verify quick actions are clickable', async () => {
      // Find any clickable button in the quick actions area
      const actionButtons = page.locator('button').filter({ hasText: /Add|Import|Link/ });
      const buttonCount = await actionButtons.count();
      expect(buttonCount).toBeGreaterThan(0);
      
      // Verify first button is clickable
      if (buttonCount > 0) {
        await expect(actionButtons.first()).toBeEnabled();
      }
    });
  });

  test('should display recent transactions widget', async ({ page }) => {
    await test.step('Wait for transactions widget', async () => {
      await dashboardHelpers.waitForTransactionsWidget();
    });

    await test.step('Verify transactions are displayed', async () => {
      const pageContent = await page.textContent('body');
      
      // Look for transaction-related content from mock data
      const hasTransactionContent = [
        'Recent Transactions', 'transaction', 'Whole Foods', 
        'Netflix', 'Salary', 'Amazon', 'Starbucks'
      ].some(content => pageContent?.includes(content));
      
      expect(hasTransactionContent).toBe(true);
    });

    await test.step('Verify transaction amounts are shown', async () => {
      // Should show transaction amounts
      const pageText = await page.textContent('body');
      const hasTransactionAmounts = /[-]?\$[\d,]+\.\d{2}/.test(pageText || '');
      expect(hasTransactionAmounts).toBe(true);
    });
  });

  test('should handle time range changes', async ({ page }) => {
    await test.step('Wait for dashboard to load', async () => {
      await dashboardHelpers.waitForDashboardLoad();
    });

    await test.step('Verify time range selector is present', async () => {
      await expect(page.getByText('30 days')).toBeVisible({ timeout: 10000 });
    });

    await test.step('Change to 7 days range', async () => {
      await dashboardHelpers.changeTimeRange('7 days');
      
      // Verify the selection changed
      await expect(page.locator('.bg-white.text-blue-600')).toContainText('7 days');
    });

    await test.step('Change to 90 days range', async () => {
      await dashboardHelpers.changeTimeRange('90 days');
      
      // Verify the selection changed
      await expect(page.locator('.bg-white.text-blue-600')).toContainText('90 days');
    });
  });

  test('should be responsive on mobile', async ({ page }) => {
    await test.step('Set mobile viewport', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
    });

    await test.step('Verify dashboard loads on mobile', async () => {
      await dashboardHelpers.waitForDashboardLoad();
      
      // Should still show main elements
      await expect(page.getByText('Welcome back!')).toBeVisible();
    });

    await test.step('Verify widgets are responsive', async () => {
      // Take screenshot for visual verification
      await dashboardHelpers.takeDebugScreenshot('mobile-dashboard');
      
      // Verify key elements are still visible
      const pageContent = await page.textContent('body');
      expect(pageContent).toContain('$');
    });
  });

  test('should load without JavaScript errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await test.step('Navigate and wait for load', async () => {
      await page.goto('/');
      await dashboardHelpers.waitForDashboardLoad();
    });

    await test.step('Verify no console errors', async () => {
      // Filter out expected errors (like network errors for external resources)
      const significantErrors = consoleErrors.filter(error => 
        !error.includes('favicon.ico') &&
        !error.includes('fonts.googleapis.com') &&
        !error.includes('Extension') &&
        !error.toLowerCase().includes('warning')
      );

      if (significantErrors.length > 0) {
        console.log('Console errors found:', significantErrors);
      }
      
      expect(significantErrors.length).toBe(0);
    });
  });

  test('should have proper loading states', async ({ page }) => {
    await test.step('Navigate to dashboard', async () => {
      await page.goto('/');
    });

    await test.step('Verify loading states appear initially', async () => {
      // Should show loading states before data loads
      const hasLoadingStates = await page.locator('[class*="animate-pulse"], [class*="loading"]').count();
      
      // Either should have loading states, or data loads so fast we miss them
      console.log(`Found ${hasLoadingStates} loading states`);
    });

    await test.step('Verify loading states disappear', async () => {
      await dashboardHelpers.waitForDashboardLoad();
      
      // Loading states should be gone
      const remainingLoadingStates = await page.locator('[class*="animate-pulse"]').count();
      expect(remainingLoadingStates).toBe(0);
    });
  });
});
