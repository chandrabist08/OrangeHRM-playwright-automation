import { test, expect } from '../../fixtures/base.fixture.js';
import { ROUTES } from '../../configs/app/routes.js';
import { LOGIN_UI } from '../../configs/ui/auth/login.ui.js';

// ─────────────────────────────────────────────────────────────────────────────
// AUTH-LOGIN-001  Admin can log in with valid credentials  (SMOKE, P0)
// Runs in the authenticated 'chromium' project (storageState already applied).
// Navigating to the login URL with a valid session redirects to dashboard.
// ─────────────────────────────────────────────────────────────────────────────
test(
  '[AUTH-LOGIN-001] Admin can log in with valid credentials',
  {
    tag: ['@AUTH-LOGIN-001', '@smoke', '@P0'],
  },
  async ({ page, nav }) => {
    // With a valid session the app redirects login → dashboard
    await nav.goToUrl(ROUTES.auth.login);
    await page.waitForURL(`**${ROUTES.auth.dashboard}`);
    await expect(page.getByRole('heading', { name: LOGIN_UI.dashboardHeading })).toBeVisible();
  },
);

// ─────────────────────────────────────────────────────────────────────────────
// AUTH-LOGIN-002  Login fails with invalid credentials and shows an error
//                (REGRESSION, P1)
// Runs in the 'no-auth' project — no session cookie, no storageState.
// ─────────────────────────────────────────────────────────────────────────────
test(
  '[AUTH-LOGIN-002] Login fails with invalid credentials and shows an error',
  {
    tag: ['@AUTH-LOGIN-002', '@regression', '@P1', '@no-auth'],
  },
  async ({ auth, page }) => {
    await auth.login('invalid_user', 'wrong_password');

    // Error alert must be visible and contain the expected message
    const alert = page.getByRole('alert');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText(LOGIN_UI.invalidCredentialsText);

    // URL must remain on the login page — no redirect to dashboard
    expect(page.url()).toContain(ROUTES.auth.login);
  },
);

// ─────────────────────────────────────────────────────────────────────────────
// AUTH-LOGOUT-001  Authenticated user can log out and session is invalidated
//                 (REGRESSION, P1)
// Runs in the authenticated 'chromium' project (storageState already applied).
// ─────────────────────────────────────────────────────────────────────────────
test(
  '[AUTH-LOGOUT-001] Authenticated user can log out and session is invalidated',
  {
    tag: ['@AUTH-LOGOUT-001', '@regression', '@P1'],
  },
  async ({ auth, page, nav }) => {
    // Start from the dashboard (session is already active via storageState)
    await nav.goToUrl(ROUTES.auth.dashboard);
    await expect(page.getByRole('heading', { name: LOGIN_UI.dashboardHeading })).toBeVisible();

    // Perform logout — navigates to login page
    await auth.logout();
    await expect(page).toHaveURL(new RegExp(ROUTES.auth.login.replace(/\//g, '\\/')));

    // Back-navigation must not restore the authenticated session
    await page.goBack();
    await expect(page).toHaveURL(new RegExp(ROUTES.auth.login.replace(/\//g, '\\/')));
  },
);
