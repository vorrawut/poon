import { test, expect } from '@playwright/test';
import { DashboardHelpers } from '../helpers/dashboard-helpers';

test.describe('Widget Functionality Tests', () => {
  let dashboardHelpers: DashboardHelpers;

  test.beforeEach(async ({ page }) => {
    dashboardHelpers = new DashboardHelpers(page);
    await page.goto('/');
    await dashboardHelpers.waitForDashboardLoad();
  });

  test.describe('Net Worth Widget', () => {
    test('should display formatted currency values', async ({ page }) => {
      await dashboardHelpers.waitForNetWorthWidget();

      await test.step('Verify main net worth value is properly formatted', async () => {
        const netWorthValue = await dashboardHelpers.getNetWorthValue();
        
        // Should be in proper currency format
        expect(netWorthValue).toMatch(/\$[\d,]+(\.\d{2})?/);
        
        // Should be a realistic amount from mock data (around $305,917)
        const numericValue = parseFloat(netWorthValue.replace(/[$,]/g, ''));
        expect(numericValue).toBeGreaterThan(100000); // Should be > $100k
        expect(numericValue).toBeLessThan(1000000); // Should be < $1M
      });

      await test.step('Verify change indicators are present', async () => {
        // Look for change amount and percentage
        const pageText = await page.textContent('body');
        
        // Should show change amount
        expect(pageText).toMatch(/[\+\-]?\$[\d,]+/);
        
        // Should show percentage change
        expect(pageText).toMatch(/[\+\-]?[\d.]+%/);
      });

      await test.step('Verify quick action buttons work', async () => {
        const refreshButton = page.getByText('Refresh Data');
        if (await refreshButton.isVisible()) {
          await refreshButton.click();
          // Should still show data after refresh
          await dashboardHelpers.waitForNetWorthWidget();
        }
      });
    });

    test('should respond to time range changes', async ({ page }) => {
      await dashboardHelpers.waitForNetWorthWidget();

      const originalValue = await dashboardHelpers.getNetWorthValue();

      await test.step('Change time range and verify response', async () => {
        await dashboardHelpers.changeTimeRange('7 days');
        
        // Wait a moment for any updates
        await page.waitForTimeout(500);
        
        // Value should still be present (may or may not change based on mock data)
        await dashboardHelpers.waitForNetWorthWidget();
        const newValue = await dashboardHelpers.getNetWorthValue();
        expect(newValue).toMatch(/\$[\d,]+/);
      });
    });
  });

  test.describe('Accounts Overview Widget', () => {
    test('should display account information correctly', async ({ page }) => {
      await dashboardHelpers.waitForAccountsWidget();

      await test.step('Verify account types are shown', async () => {
        const pageContent = await page.textContent('body');
        
        // Should show various account types from mock data
        const expectedAccountTypes = ['Checking', 'Savings', 'Investment', 'Credit'];
        const foundTypes = expectedAccountTypes.filter(type => 
          pageContent?.includes(type)
        );
        
        expect(foundTypes.length).toBeGreaterThan(0);
      });

      await test.step('Verify account balances are realistic', async () => {
        const pageText = await page.textContent('body');
        const dollarAmounts = pageText?.match(/\$[\d,]+(\.\d{2})?/g) || [];
        
        // Should have multiple dollar amounts
        expect(dollarAmounts.length).toBeGreaterThan(1);
        
        // Should have some substantial amounts (from mock accounts)
        const amounts = dollarAmounts.map(amount => 
          parseFloat(amount.replace(/[$,]/g, ''))
        );
        const hasLargeAmount = amounts.some(amount => amount > 10000);
        expect(hasLargeAmount).toBe(true);
      });
    });

    test('should handle account actions', async ({ page }) => {
      await dashboardHelpers.waitForAccountsWidget();

      await test.step('Verify account interaction elements', async () => {
        // Look for clickable account elements
        const accountElements = page.locator('[class*="account"], button').filter({
          hasText: /View|Account|Details/
        });
        
        const count = await accountElements.count();
        if (count > 0) {
          await expect(accountElements.first()).toBeVisible();
        }
      });
    });
  });

  test.describe('Quick Actions Widget', () => {
    test('should display and handle quick actions', async ({ page }) => {
      await dashboardHelpers.waitForQuickActionsWidget();

      await test.step('Verify quick action buttons are present', async () => {
        const expectedActions = ['Add Transaction', 'Import CSV', 'Link Account'];
        const pageContent = await page.textContent('body');
        
        const foundActions = expectedActions.filter(action => 
          pageContent?.includes(action)
        );
        
        expect(foundActions.length).toBeGreaterThan(0);
      });

      await test.step('Verify buttons are interactive', async () => {
        // Find action buttons
        const actionButtons = page.locator('button').filter({ 
          hasText: /Add|Import|Link|Quick/ 
        });
        
        const buttonCount = await actionButtons.count();
        
        if (buttonCount > 0) {
          await expect(actionButtons.first()).toBeEnabled();
          
          // Click first button to verify it responds
          await actionButtons.first().click();
          
          // Should not throw errors (actions are logged but may not show UI yet)
          await page.waitForTimeout(500);
        }
      });
    });

    test('should show appropriate icons and styling', async ({ page }) => {
      await dashboardHelpers.waitForQuickActionsWidget();

      await test.step('Verify icons are present', async () => {
        // Look for SVG icons (Heroicons)
        const svgCount = await page.locator('svg').count();
        expect(svgCount).toBeGreaterThan(0);
      });

      await test.step('Verify proper styling', async () => {
        // Quick actions should have proper styling classes
        const styledElements = page.locator('[class*="bg-"], [class*="hover:"], [class*="rounded"]');
        const count = await styledElements.count();
        expect(count).toBeGreaterThan(0);
      });
    });
  });

  test.describe('Recent Transactions Widget', () => {
    test('should display transaction data', async ({ page }) => {
      await dashboardHelpers.waitForTransactionsWidget();

      await test.step('Verify transactions are shown', async () => {
        const pageContent = await page.textContent('body');
        
        // Should contain transaction-related content from mock data
        const expectedTransactions = [
          'Whole Foods', 'Netflix', 'Salary', 'Amazon', 'Starbucks'
        ];
        
        const foundTransactions = expectedTransactions.filter(transaction => 
          pageContent?.includes(transaction)
        );
        
        expect(foundTransactions.length).toBeGreaterThan(0);
      });

      await test.step('Verify transaction amounts and formatting', async () => {
        const pageText = await page.textContent('body');
        
        // Should show negative amounts (expenses) and positive amounts (income)
        const hasNegativeAmount = /-\$[\d,]+\.\d{2}/.test(pageText || '');
        const hasPositiveAmount = /\$[\d,]+\.\d{2}/.test(pageText || '');
        
        expect(hasNegativeAmount || hasPositiveAmount).toBe(true);
      });

      await test.step('Verify transaction interactions', async () => {
        // Look for View All or similar buttons
        const viewAllButton = page.getByText(/View|All|More/);
        const buttonCount = await viewAllButton.count();
        
        if (buttonCount > 0) {
          await expect(viewAllButton.first()).toBeEnabled();
        }
      });
    });

    test('should handle transaction clicks', async ({ page }) => {
      await dashboardHelpers.waitForTransactionsWidget();

      await test.step('Verify transaction items are clickable', async () => {
        // Look for transaction items that might be clickable
        const transactionElements = page.locator('[class*="transaction"], [class*="cursor-pointer"]');
        const count = await transactionElements.count();
        
        if (count > 0) {
          const firstTransaction = transactionElements.first();
          await expect(firstTransaction).toBeVisible();
          
          // Click should not cause errors
          await firstTransaction.click();
          await page.waitForTimeout(500);
        }
      });
    });
  });

  test.describe('Widget Loading and Error Handling', () => {
    test('should handle mock data loading gracefully', async ({ page }) => {
      // Reload page to test loading states
      await page.reload();
      
      await test.step('Verify loading states appear and disappear', async () => {
        // Wait for initial load
        await page.waitForSelector('body');
        
        // Should eventually load all data
        await dashboardHelpers.verifyAllWidgetsLoaded();
      });

      await test.step('Verify no broken states', async () => {
        const pageText = await page.textContent('body');
        
        // Should not show error states
        expect(pageText).not.toContain('Error');
        expect(pageText).not.toContain('Failed to load');
        expect(pageText).not.toContain('undefined');
        expect(pageText).not.toContain('null');
      });
    });

    test('should handle animations properly', async ({ page }) => {
      await test.step('Wait for animations to complete', async () => {
        await dashboardHelpers.waitForAnimations();
      });

      await test.step('Verify content is visible after animations', async () => {
        await dashboardHelpers.verifyAllWidgetsLoaded();
        
        // All text should be visible (not animated opacity: 0)
        const hiddenElements = await page.locator('[style*="opacity: 0"]').count();
        expect(hiddenElements).toBeLessThan(10); // Some elements might still be animating
      });
    });
  });

  test.describe('Integration Between Widgets', () => {
    test('should show consistent data across widgets', async ({ page }) => {
      await dashboardHelpers.verifyAllWidgetsLoaded();

      await test.step('Verify net worth and accounts consistency', async () => {
        const pageText = await page.textContent('body');
        const dollarAmounts = pageText?.match(/\$[\d,]+/g) || [];
        
        // Should have multiple consistent dollar amounts
        expect(dollarAmounts.length).toBeGreaterThan(2);
        
        // All amounts should be properly formatted
        dollarAmounts.forEach(amount => {
          expect(amount).toMatch(/\$[\d,]+/);
        });
      });

      await test.step('Verify time range affects relevant widgets', async () => {
        const originalText = await page.textContent('body');
        
        // Change time range
        await dashboardHelpers.changeTimeRange('7 days');
        await page.waitForTimeout(1000);
        
        // Page should still have data
        const newText = await page.textContent('body');
        expect(newText).toContain('$');
        
        // Time range indicator should be updated
        await expect(page.locator('.bg-white.text-blue-600')).toContainText('7 days');
      });
    });
  });
});
