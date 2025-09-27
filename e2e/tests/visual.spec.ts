import { test, expect } from '@playwright/test';
import { DashboardHelpers } from '../helpers/dashboard-helpers';

test.describe('Visual Regression Tests', () => {
  let dashboardHelpers: DashboardHelpers;

  test.beforeEach(async ({ page }) => {
    dashboardHelpers = new DashboardHelpers(page);
    await page.goto('/');
    await dashboardHelpers.waitForDashboardLoad();
    await dashboardHelpers.waitForAnimations();
  });

  test('should match dashboard visual baseline', async ({ page }) => {
    await test.step('Take full dashboard screenshot', async () => {
      // Ensure consistent viewport
      await page.setViewportSize({ width: 1280, height: 720 });
      
      // Wait for all content to be stable
      await dashboardHelpers.verifyAllWidgetsLoaded();
      await page.waitForTimeout(2000); // Extra stability wait
      
      // Take screenshot
      await expect(page).toHaveScreenshot('dashboard-full.png', {
        fullPage: true,
        animations: 'disabled',
      });
    });
  });

  test('should match individual widget screenshots', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    
    await test.step('Net Worth Widget Screenshot', async () => {
      const netWorthWidget = page.locator('.rounded-2xl.bg-gradient-to-br').first();
      await expect(netWorthWidget).toBeVisible();
      await expect(netWorthWidget).toHaveScreenshot('networth-widget.png', {
        animations: 'disabled',
      });
    });

    await test.step('Accounts Widget Screenshot', async () => {
      // Find accounts widget container
      const accountsWidget = page.locator('h3:has-text("Accounts")').locator('..').locator('..');
      if (await accountsWidget.count() > 0) {
        await expect(accountsWidget).toHaveScreenshot('accounts-widget.png', {
          animations: 'disabled',
        });
      }
    });

    await test.step('Quick Actions Widget Screenshot', async () => {
      // Find quick actions widget
      const quickActionsWidget = page.locator('h3:has-text("Quick Actions")').locator('..').locator('..');
      if (await quickActionsWidget.count() > 0) {
        await expect(quickActionsWidget).toHaveScreenshot('quickactions-widget.png', {
          animations: 'disabled',
        });
      }
    });
  });

  test('should match mobile dashboard view', async ({ page }) => {
    await test.step('Set mobile viewport and screenshot', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Wait for responsive layout to settle
      await dashboardHelpers.waitForDashboardLoad();
      await page.waitForTimeout(1000);
      
      await expect(page).toHaveScreenshot('dashboard-mobile.png', {
        fullPage: true,
        animations: 'disabled',
      });
    });
  });

  test('should match tablet dashboard view', async ({ page }) => {
    await test.step('Set tablet viewport and screenshot', async () => {
      await page.setViewportSize({ width: 768, height: 1024 });
      
      // Wait for responsive layout to settle
      await dashboardHelpers.waitForDashboardLoad();
      await page.waitForTimeout(1000);
      
      await expect(page).toHaveScreenshot('dashboard-tablet.png', {
        fullPage: true,
        animations: 'disabled',
      });
    });
  });

  test('should match different time range states', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    await test.step('7 days view screenshot', async () => {
      await dashboardHelpers.changeTimeRange('7 days');
      await page.waitForTimeout(1000);
      
      await expect(page).toHaveScreenshot('dashboard-7days.png', {
        fullPage: true,
        animations: 'disabled',
      });
    });

    await test.step('90 days view screenshot', async () => {
      await dashboardHelpers.changeTimeRange('90 days');
      await page.waitForTimeout(1000);
      
      await expect(page).toHaveScreenshot('dashboard-90days.png', {
        fullPage: true,
        animations: 'disabled',
      });
    });
  });

  test('should match dark theme if available', async ({ page }) => {
    // Check if dark theme is available and test it
    const darkToggle = page.locator('[class*="dark"], [data-theme="dark"]');
    
    if (await darkToggle.count() > 0) {
      await test.step('Enable dark theme and screenshot', async () => {
        await darkToggle.first().click();
        await page.waitForTimeout(1000);
        
        await expect(page).toHaveScreenshot('dashboard-dark.png', {
          fullPage: true,
          animations: 'disabled',
        });
      });
    } else {
      test.skip('Dark theme not available');
    }
  });
});
