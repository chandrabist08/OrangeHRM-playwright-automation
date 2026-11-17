import type { Page } from '@playwright/test';
import { ROUTES } from '../../../configs/app/routes.js'; // central route map — no hardcoded URLs in tests

// Contract: what navigation helpers a test can use
export interface NavigationHelpers {
  goTo(route: string): Promise<void>;      // navigate using a named route key (e.g. 'home')
  goToUrl(url: string): Promise<void>;     // navigate using a raw URL (use sparingly)
  waitForNavigation(): Promise<void>;      // wait until all network activity settles
  getCurrentPath(): string;                // returns the current URL pathname (e.g. '/dashboard')
}

// Factory: accepts a Playwright page and returns all navigation helpers bound to it
export function createNavigationHelpers(page: Page): NavigationHelpers {
  return {
    // Look up the route key in ROUTES; fall back to treating the value as a raw URL
    async goTo(route: string) {
      await page.goto(((ROUTES as Record<string, unknown>)[route] as string) ?? route);
    },

    // Navigate directly to a full URL — useful for dynamic or external URLs
    async goToUrl(url) {
      await page.goto(url);
    },

    // Wait for the page to fully settle (no pending network requests)
    async waitForNavigation() {
      await page.waitForLoadState('networkidle');
    },

    // Extract just the path from the current URL; falls back to full URL if parsing fails
    getCurrentPath() {
      try {
        return new URL(page.url()).pathname;
      } catch {
        return page.url();
      }
    },
  };
}
