import type { Page } from '@playwright/test';
import { ROUTES } from '../../../configs/app/routes.js';
import { LOGIN_UI } from '../../../configs/ui/auth/login.ui.js';
import { NAVIGATION_SELECTORS } from '../../../configs/ui/shared/navigation.ui.js';

export interface AuthHelpers {
  /** Navigate to login, fill credentials, and submit the form. */
  login(username: string, password: string): Promise<void>;
  /** Open the user profile dropdown and click Logout; waits for login page. */
  logout(): Promise<void>;
  /** Return the text content of the error alert shown after a failed login. */
  getErrorMessage(): Promise<string>;
  /** True when the current URL contains the dashboard path. */
  isDashboard(): boolean;
}

export function createAuthHelpers(page: Page): AuthHelpers {
  return {
    async login(username, password) {
      await page.goto(ROUTES.auth.login);
      await page.getByPlaceholder(LOGIN_UI.usernamePlaceholder).fill(username);
      await page.getByPlaceholder(LOGIN_UI.passwordPlaceholder).fill(password);
      await Promise.all([
        page.waitForResponse(
          (resp) => resp.url().includes('/auth/validate') || resp.url().includes('/auth/login'),
        ),
        page.getByRole('button', { name: LOGIN_UI.loginButtonName }).click(),
      ]);
    },

    async logout() {
      // Open user profile dropdown — OrangeHRM renders this as a <li> in the top banner
      await page.getByRole('banner').locator(NAVIGATION_SELECTORS.userMenu.toggleLocator).click();
      // Click the Logout menu item
      await page.getByRole('menuitem', { name: NAVIGATION_SELECTORS.userMenu.logout }).click();
      // Wait until we are back on the login page
      await page.waitForURL(`**${ROUTES.auth.login}`);
    },

    async getErrorMessage() {
      return (await page.getByRole('alert').textContent()) ?? '';
    },

    isDashboard() {
      return page.url().includes(ROUTES.auth.dashboard);
    },
  };
}
