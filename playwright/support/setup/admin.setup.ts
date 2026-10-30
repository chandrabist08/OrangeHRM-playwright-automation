/**
 * Admin authentication setup — runs ONCE before the main test project.
 * Logs in with admin credentials from env vars and saves the browser
 * storage state so authenticated tests start with a valid session.
 */
import { test as setup } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const authFile = process.env.ADMIN_AUTH_STATE ?? 'playwright/storage/auth/admin.json';

setup('authenticate as admin', async ({ page }) => {
  const baseUrl = process.env.BASE_URL ?? '';
  const username = process.env.ADMIN_USERNAME ?? '';
  const password = process.env.ADMIN_PASSWORD ?? '';

  await page.goto(`${baseUrl}/web/index.php/auth/login`);
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);

  await Promise.all([
    page.waitForURL('**/dashboard/index'),
    page.getByRole('button', { name: 'Login' }).click(),
  ]);

  // Ensure the output directory exists before saving state
  const dir = path.dirname(authFile);
  fs.mkdirSync(dir, { recursive: true });

  await page.context().storageState({ path: authFile });
});
