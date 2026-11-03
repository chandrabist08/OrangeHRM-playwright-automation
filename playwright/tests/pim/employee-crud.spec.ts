import { test, expect } from '../../fixtures/base.fixture.js';
import { API_ENDPOINTS } from '../../configs/app/routes.js';
import { EMPLOYEE_UI } from '../../configs/ui/pim/employee.ui.js';

test.setTimeout(90000);

test(
  '[EMP-ADD-001] Admin can add a new employee with required fields',
  { tag: ['@EMP-ADD-001', '@regression', '@P1'] },
  async ({ emp, page, request }) => {
    const firstName = `AutoAdd_${Date.now()}`;
    await emp.goToAddEmployee();
    await emp.fillAddEmployeeForm({ firstName, lastName: 'TestUser' });
    await emp.saveForm();

    await page.waitForURL(/pim\/viewPersonalDetails/);
    const match = page.url().match(/empNumber\/(\d+)/);
    const empNumber = parseInt(match?.[1] ?? '0', 10);
    expect(empNumber).toBeGreaterThan(0);

    const baseUrl = `${process.env.BASE_URL ?? ''}/web/index.php`;
    const resp = await request.get(`${baseUrl}${API_ENDPOINTS.pim.employees}?nameOrId=${firstName}`);
    expect(resp.ok()).toBeTruthy();
    const body = await resp.json() as { data: Array<{ firstName: string }> };
    expect(body.data.some((e) => e.firstName === firstName)).toBeTruthy();

    await emp.deleteEmployee(empNumber);
  },
);

test(
  '[EMP-EDIT-001] Admin can update an existing employee\'s personal details',
  { tag: ['@EMP-EDIT-001', '@regression', '@P1'] },
  async ({ emp, request }) => {
    const rec = await emp.createEmployee();
    try {
      await emp.goToPersonalDetails(rec.empNumber);

      const updatedFirstName = `Updated_${Date.now()}`;
      await emp.fillFirstName(updatedFirstName);
      await emp.savePersonalDetails();
      await emp.expectSuccessToast();

      const baseUrl = `${process.env.BASE_URL ?? ''}/web/index.php`;
      const resp = await request.get(
        `${baseUrl}${API_ENDPOINTS.pim.personalDetails(rec.empNumber)}`,
      );
      expect(resp.ok()).toBeTruthy();
      const body = await resp.json() as { data: { firstName: string } };
      expect(body.data.firstName).toBe(updatedFirstName);
    } finally {
      await emp.deleteEmployee(rec.empNumber);
    }
  },
);

test(
  '[EMP-DELETE-001] Admin can delete an employee record',
  { tag: ['@EMP-DELETE-001', '@regression', '@P2'] },
  async ({ emp, request }) => {
    const rec = await emp.createEmployee();
    const firstName = rec.firstName;

    await emp.goToEmployeeList();
    await emp.searchByName(firstName);
    await emp.clickSearch();
    await emp.selectRowByName(firstName);
    await emp.clickDeleteSelected();
    await emp.confirmDelete();
    await emp.expectSuccessToast();

    await emp.clickSearch();
    await emp.expectNoRecordsFound();

    const baseUrl = `${process.env.BASE_URL ?? ''}/web/index.php`;
    const resp = await request.get(
      `${baseUrl}${API_ENDPOINTS.pim.employees}?nameOrId=${firstName}`,
    );
    if (resp.ok()) {
      const body = await resp.json() as { data: Array<{ firstName: string }> };
      expect(body.data.filter((e) => e.firstName === firstName)).toHaveLength(0);
    }
  },
);

test(
  '[EMP-VALIDATE-001] Required fields block save when adding an employee',
  { tag: ['@EMP-VALIDATE-001', '@regression', '@P1'] },
  async ({ emp, page }) => {
    await emp.goToAddEmployee();
    await emp.saveForm();

    const errors = page.locator(EMPLOYEE_UI.shared.validationError);
    await expect(errors.first()).toBeVisible();
    const count = await errors.count();
    expect(count).toBeGreaterThanOrEqual(2);
  },
);

test(
  '[EMP-LOGIN-001] Admin can create login details for a new employee during the add-employee workflow',
  { tag: ['@EMP-LOGIN-001', '@regression', '@P1'] },
  async ({ emp, page, request }) => {
    const firstName = `AutoLogin_${Date.now()}`;
    const username = `auto_${Date.now()}`;
    await emp.goToAddEmployee();
    await emp.fillAddEmployeeForm({ firstName, lastName: 'LoginUser' });
    await emp.enableCreateLoginDetails();
    await emp.fillLoginDetails({ username, password: process.env.ADMIN_PASSWORD ?? '', status: 'Enabled' });
    await emp.saveForm();

    await page.waitForURL(/pim\/viewPersonalDetails/);
    const match = page.url().match(/empNumber\/(\d+)/);
    const empNumber = parseInt(match?.[1] ?? '0', 10);
    expect(empNumber).toBeGreaterThan(0);

    const baseUrl = `${process.env.BASE_URL ?? ''}/web/index.php`;
    const resp = await request.get(`${baseUrl}${API_ENDPOINTS.pim.employees}?nameOrId=${firstName}`);
    expect(resp.ok()).toBeTruthy();
    const body = await resp.json() as { data: Array<{ firstName: string }> };
    expect(body.data.some((e) => e.firstName === firstName)).toBeTruthy();

    await emp.deleteEmployee(empNumber);
  },
);
