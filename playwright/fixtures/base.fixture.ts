import { test as base, expect } from '@playwright/test';
import type { Page, APIRequestContext, BrowserContext } from '@playwright/test';

// Common helpers — shared across all feature domains
import {createNavigationHelpers,type NavigationHelpers,} from '../support/helpers/common/navigation.helpers.js';
import { createUiHelpers, type UiHelpers } from '../support/helpers/common/ui.helpers.js';
import { createApiHelpers, type ApiHelpers } from '../support/helpers/common/api.helpers.js';
import { createHarHelpers, type HarHelpers } from '../support/helpers/common/har.helpers.js';
// Domain helpers — feature-specific actions
import { createAuthHelpers, type AuthHelpers } from '../support/helpers/domain/auth.helpers.js';
import {
  createEmployeeHelpers,
  type EmployeeHelpers,
} from '../support/helpers/domain/employee.helpers.js';

// Declares all custom fixtures available to tests via destructuring e.g. async ({ nav, emp })
type HarnessFixtures = {
  nav: NavigationHelpers;   // page navigation
  ui: UiHelpers;            // clicks, fills, dropdowns
  api: ApiHelpers;          // direct API calls
  har: HarHelpers;          // HAR network recording
  auth: AuthHelpers;        // login / logout
  emp: EmployeeHelpers;     // PIM / employee actions
  evidence: void;           // auto-runs on every test — no need to request it
};

// Extend Playwright's base test with our custom fixtures — this is what specs import
export const test = base.extend<HarnessFixtures>({

  // Auto fixture: runs for every test without being requested
  // Collects console logs, page errors, and failed requests during the test
  // Attaches them as failure-evidence.json only when the test fails
  evidence: [
    async ({ page }, use, testInfo) => {
      const consoleMessages: string[] = [];
      const pageErrors: string[] = [];
      const failedRequests: string[] = [];

      // Listen throughout the test lifecycle
      page.on('console', (msg) => consoleMessages.push(`[${msg.type()}] ${msg.text()}`));
      page.on('pageerror', (err) => pageErrors.push(err.message));
      page.on('requestfailed', (req) => {
        failedRequests.push(
          `${req.method()} ${req.url()} :: ${req.failure()?.errorText ?? 'failed'}`,
        );
      });

      await use(); // test runs here

      if (testInfo.status === testInfo.expectedStatus) return; // passed — nothing to attach

      // Test failed — attach collected diagnostics to the report
      await testInfo.attach('failure-evidence.json', {
        body: Buffer.from(
          JSON.stringify(
            {
              title: testInfo.title,
              file: testInfo.file,
              project: testInfo.project.name,
              status: testInfo.status,
              expectedStatus: testInfo.expectedStatus,
              url: page.url(),
              consoleMessages,
              pageErrors,
              failedRequests,
            },
            null,
            2,
          ),
          'utf8',
        ),
        contentType: 'application/json',
      });
    },
    { auto: true }, // runs automatically — tests don't need to request this fixture
  ],

  // Wraps page into navigation helpers and injects as `nav`
  nav: async ({ page }: { page: Page }, use: (h: NavigationHelpers) => Promise<void>) => {
    await use(createNavigationHelpers(page));
  },

  // Wraps page into UI interaction helpers and injects as `ui`
  ui: async ({ page }: { page: Page }, use: (h: UiHelpers) => Promise<void>) => {
    await use(createUiHelpers(page));
  },

  // Needs both page and request — some API helpers trigger UI side effects
  api: async (
    { page, request }: { page: Page; request: APIRequestContext },
    use: (h: ApiHelpers) => Promise<void>,
  ) => {
    await use(createApiHelpers(page, request));
  },

  // Needs context (full browser session) to record HAR network traffic
  har: async (
    { page, context }: { page: Page; context: BrowserContext },
    use: (h: HarHelpers) => Promise<void>,
  ) => {
    await use(createHarHelpers(page, context));
  },

  // Wraps page into auth helpers (login/logout) and injects as `auth`
  auth: async ({ page }: { page: Page }, use: (h: AuthHelpers) => Promise<void>) => {
    await use(createAuthHelpers(page));
  },

  // Needs request alongside page — employee helpers make direct API calls (e.g. create via API)
  emp: async (
    { page, request }: { page: Page; request: APIRequestContext },
    use: (h: EmployeeHelpers) => Promise<void>,
  ) => {
    await use(createEmployeeHelpers(page, request));
  },
});

// Re-export expect so specs only need to import from this file, not from @playwright/test
export { expect };
