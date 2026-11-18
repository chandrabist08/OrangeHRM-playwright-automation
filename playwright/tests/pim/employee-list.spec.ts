import { test, expect } from '../../fixtures/base.fixture.js';

test.setTimeout(90000);
test.use({ navigationTimeout: 30000 });

test(
  '[EMP-SEARCH-001] Admin can search for an employee by name',
  { tag: ['@EMP-SEARCH-001', '@smoke', '@P0'] },
  async ({ emp }) => {
    await emp.goToEmployeeList();

    await emp.searchByName('Linda');
    await emp.clickSearch();
    await emp.expectRowsVisible();

    await emp.clickReset();
    await emp.searchByName('ZZZ_NoSuchEmployee_XYZ_99999');
    await emp.clickSearch();
    await emp.expectNoRecordsFound();
  },
);

test(
  '[EMP-FILTER-001] Admin can filter the employee list by Employment Status',
  { tag: ['@EMP-FILTER-001', '@smoke', '@P0'] },
  async ({ emp }) => {
    await emp.goToEmployeeList();

    await emp.filterByEmploymentStatus('Full-Time Permanent');
    await emp.clickSearch();
    await emp.expectRowsVisible();

    await emp.clickReset();
    await emp.filterByEmploymentStatus('Full-Time Permanent');
    await emp.clickSearch();
    await emp.expectRowsVisible();
  },
);

test(
  '[EMP-FILTER-002] Admin can filter the employee list by Employee ID',
  { tag: ['@EMP-FILTER-002', '@regression', '@P1'] },
  async ({ emp }) => {
    await emp.goToEmployeeList();

    await emp.searchById('0001');
    await emp.clickSearch();
    await emp.expectRowsVisible();

    await emp.clickReset();
    await emp.searchById('000000');
    await emp.clickSearch();
    await emp.expectNoRecordsFound();
  },
);

test(
  '[EMP-FILTER-003] Admin can filter the employee list by Supervisor Name',
  { tag: ['@EMP-FILTER-003', '@regression', '@P1'] },
  async ({ emp }) => {
    await emp.goToEmployeeList();

    await emp.filterBySupervisor('Linda');
    await emp.clickSearch();
    await emp.expectRowsVisible();
  },
);

test(
  '[EMP-FILTER-004] Admin can filter the employee list by Job Title',
  { tag: ['@EMP-FILTER-004', '@regression', '@P1'] },
  async ({ emp }) => {
    await emp.goToEmployeeList();

    await emp.filterByJobTitle('Software Engineer');
    await emp.clickSearch();
    await emp.expectRowsVisible();
  },
);

test(
  '[EMP-FILTER-005] Admin can filter the employee list by Subunit (Department)',
  { tag: ['@EMP-FILTER-005', '@regression', '@P1'] },
  async ({ emp }) => {
    await emp.goToEmployeeList();

    await emp.filterBySubunit('Engineering');
    await emp.clickSearch();
    await emp.expectRowsVisible();
  },
);

test(
  '[EMP-FILTER-006] Admin can filter the employee list by Include (current, past, or both employees)',
  { tag: ['@EMP-FILTER-006', '@regression', '@P1'] },
  async ({ emp, page }) => {
    await emp.goToEmployeeList();

    await emp.filterByInclude('Past Employees Only');
    await emp.clickSearch();
    await page.getByRole('row').nth(1).waitFor({ state: 'attached', timeout: 10000 }).catch(() => {});
    const pastCount = await page.getByRole('row').count();

    await emp.clickReset();
    await emp.filterByInclude('Current Employees Only');
    await emp.clickSearch();
    await emp.expectRowsVisible();
    const currentCount = await page.getByRole('row').count();
    expect(currentCount).toBeGreaterThan(0);

    await emp.clickReset();
    await emp.filterByInclude('Current and Past Employees');
    await emp.clickSearch();
    await emp.expectRowsVisible();
    const bothCount = await page.getByRole('row').count();
    expect(bothCount).toBeGreaterThanOrEqual(Math.max(pastCount, currentCount));
  },
);

test(
  '[EMP-FILTER-007] Admin can reset Employee List filters to the default view',
  { tag: ['@EMP-FILTER-007', '@regression', '@P2'] },
  async ({ emp, page }) => {
    await emp.goToEmployeeList();

    await emp.filterByInclude('Past Employees Only');
    await emp.clickSearch();

    await emp.clickReset();

    await expect(
      page.locator('label', { hasText: 'Include' }).locator('xpath=../..').locator('.oxd-select-text--active'),
    ).toContainText('Current Employees Only');
    await emp.expectRowsVisible();
  },
);
