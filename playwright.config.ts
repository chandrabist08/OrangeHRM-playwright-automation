import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { FRAMEWORK_EVIDENCE } from './playwright/configs/app/framework-evidence.js';

const ENV = process.env.ENV ?? 'qa';
dotenv.config({ path: path.resolve(process.cwd(), `playwright/environments/.env.${ENV}`) });
dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: false });

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
const retries = process.env.PW_RETRIES ? parseInt(process.env.PW_RETRIES) : 0;
const trace = (process.env.PW_TRACE ?? 'on-first-retry') as 'on-first-retry' | 'retain-on-failure' | 'on' | 'off';
const testIdAttribute = process.env.TEST_ID_ATTRIBUTE ?? 'data-testid';

export default defineConfig({
  testDir: './playwright/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries,
  workers: process.env.CI ? 1 : 2,
  timeout: 30_000,
  expect: { timeout: 10_000 },

  reporter: [
    ['html', { outputFolder: FRAMEWORK_EVIDENCE.htmlReport, open: 'never' }],
    ['json', { outputFile: FRAMEWORK_EVIDENCE.jsonReport }],
    ['junit', { outputFile: FRAMEWORK_EVIDENCE.junitReport }],
    ['list'],
  ],

  use: {
    baseURL: BASE_URL,
    trace,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
    testIdAttribute,
  },

  projects: [
    // ── Setup: runs once to produce the admin auth storage state ──────────
    {
      name: 'setup',
      testDir: './playwright/support/setup',
      testMatch: /admin\.setup\.ts/,
    },

    // ── Authenticated project: depends on setup, skips @no-auth tests ─────
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: process.env.ADMIN_AUTH_STATE ?? 'playwright/storage/auth/admin.json',
      },
      dependencies: ['setup'],
      grepInvert: /@no-auth/,
    },

    // ── Unauthenticated project: for tests that must not carry a session ──
    {
      name: 'no-auth',
      use: { ...devices['Desktop Chrome'] },
      grep: /@no-auth/,
    },
  ],

  outputDir: FRAMEWORK_EVIDENCE.outputDir,
});
