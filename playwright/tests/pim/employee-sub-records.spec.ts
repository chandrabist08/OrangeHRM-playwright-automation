import { test, expect } from '../../fixtures/base.fixture.js';
import { API_ENDPOINTS } from '../../configs/app/routes.js';

test(
  '[EMP-QUAL-001] Admin can add an education record to employee qualifications',
  { tag: ['@EMP-QUAL-001', '@regression', '@P1'] },
  async ({ emp, request }) => {
    const rec = await emp.createEmployee();
    try {
      await emp.goToQualifications(rec.empNumber);
      await emp.addEducation({ level: 'Bachelor\'s Degree', institute: 'AutoTest University', year: '2020' });
      await emp.expectSuccessToast();

      const baseUrl = `${process.env.BASE_URL ?? ''}/web/index.php`;
      const resp = await request.get(`${baseUrl}${API_ENDPOINTS.pim.qualificationsEducation(rec.empNumber)}`);
      expect(resp.ok()).toBeTruthy();
      const body = await resp.json() as { data: Array<{ institute: string }> };
      expect(body.data.some((e) => e.institute === 'AutoTest University')).toBeTruthy();
    } finally {
      await emp.deleteEmployee(rec.empNumber);
    }
  },
);

test(
  '[EMP-DEPENDANT-001] Admin can add a dependant for an employee',
  { tag: ['@EMP-DEPENDANT-001', '@regression', '@P2'] },
  async ({ emp, request }) => {
    const rec = await emp.createEmployee();
    try {
      await emp.goToDependants(rec.empNumber);
      const depName = `Dep_${Date.now()}`;
      await emp.clickAdd();
      await emp.fillDependantForm({ name: depName, relationship: 'Child', dateOfBirth: '2015-06-15' });
      await emp.clickSave();
      await emp.expectSuccessToast();

      const baseUrl = `${process.env.BASE_URL ?? ''}/web/index.php`;
      const resp = await request.get(`${baseUrl}${API_ENDPOINTS.pim.dependants(rec.empNumber)}`);
      expect(resp.ok()).toBeTruthy();
      const body = await resp.json() as { data: Array<{ name: string }> };
      expect(body.data.some((d) => d.name === depName)).toBeTruthy();
    } finally {
      await emp.deleteEmployee(rec.empNumber);
    }
  },
);

test(
  '[EMP-SALARY-001] Admin can add a salary component for an employee',
  { tag: ['@EMP-SALARY-001', '@regression', '@P2'] },
  async ({ emp, request }) => {
    const rec = await emp.createEmployee();
    try {
      await emp.goToSalary(rec.empNumber);
      await emp.addSalaryComponent({ amount: '5000' });
      await emp.expectSuccessToast();

      const baseUrl = `${process.env.BASE_URL ?? ''}/web/index.php`;
      const resp = await request.get(`${baseUrl}${API_ENDPOINTS.pim.salaryComponents(rec.empNumber)}`);
      expect(resp.ok()).toBeTruthy();
      const body = await resp.json() as { data: unknown[] };
      expect(body.data.length).toBeGreaterThan(0);
    } finally {
      await emp.deleteEmployee(rec.empNumber);
    }
  },
);

test(
  '[EMP-MEMBERSHIP-001] Admin can add a professional membership for an employee',
  { tag: ['@EMP-MEMBERSHIP-001', '@regression', '@P2'] },
  async ({ emp, request }) => {
    const rec = await emp.createEmployee();
    try {
      await emp.goToMemberships(rec.empNumber);
      await emp.addMembership({ amount: '100' });
      await emp.expectSuccessToast();

      const baseUrl = `${process.env.BASE_URL ?? ''}/web/index.php`;
      const resp = await request.get(`${baseUrl}${API_ENDPOINTS.pim.memberships(rec.empNumber)}`);
      expect(resp.ok()).toBeTruthy();
      const body = await resp.json() as { data: unknown[] };
      expect(body.data.length).toBeGreaterThan(0);
    } finally {
      await emp.deleteEmployee(rec.empNumber);
    }
  },
);

test(
  '[EMP-IMMIGRATION-001] Admin can add an immigration document for an employee',
  { tag: ['@EMP-IMMIGRATION-001', '@regression', '@P2'] },
  async ({ emp, request }) => {
    const rec = await emp.createEmployee();
    try {
      await emp.goToImmigration(rec.empNumber);
      const docNumber = `PASS_${Date.now()}`;
      await emp.addImmigrationDocument({ document: 'Passport', number: docNumber, issuedDate: '2023-01-01' });
      await emp.expectSuccessToast();

      const baseUrl = `${process.env.BASE_URL ?? ''}/web/index.php`;
      const resp = await request.get(`${baseUrl}${API_ENDPOINTS.pim.immigrationRecords(rec.empNumber)}`);
      expect(resp.ok()).toBeTruthy();
      const body = await resp.json() as { data: Array<{ number: string }> };
      expect(body.data.some((d) => d.number === docNumber)).toBeTruthy();
    } finally {
      await emp.deleteEmployee(rec.empNumber);
    }
  },
);
