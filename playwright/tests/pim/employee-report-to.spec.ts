import { test, expect } from '../../fixtures/base.fixture.js';
import { API_ENDPOINTS } from '../../configs/app/routes.js';

const KNOWN_SUPERVISOR = 'Linda';
const KNOWN_SUBORDINATE = 'Peter';
const DEFAULT_REPORTING_METHOD = 'Direct';
const ALT_REPORTING_METHOD = 'Indirect';

test(
  '[EMP-REPORT-TO-001] Admin can assign a supervisor to an employee',
  { tag: ['@EMP-REPORT-TO-001', '@regression', '@P1'] },
  async ({ emp, request }) => {
    const rec = await emp.createEmployee();
    try {
      await emp.goToReportTo(rec.empNumber);
      await emp.addSupervisor({ name: KNOWN_SUPERVISOR, reportingMethod: DEFAULT_REPORTING_METHOD });
      await emp.expectSuccessToast();

      const baseUrl = `${process.env.BASE_URL ?? ''}/web/index.php`;
      const resp = await request.get(`${baseUrl}${API_ENDPOINTS.pim.reportTo(rec.empNumber)}`);
      expect(resp.ok()).toBeTruthy();
      const body = await resp.json() as { data: { supervisors?: unknown[] } };
      expect((body.data.supervisors ?? []).length).toBeGreaterThan(0);
    } finally {
      await emp.deleteEmployee(rec.empNumber);
    }
  },
);

test(
  '[EMP-REPORT-TO-002] Admin can add a subordinate to an employee\'s reporting structure',
  { tag: ['@EMP-REPORT-TO-002', '@regression', '@P1'] },
  async ({ emp, request }) => {
    const rec = await emp.createEmployee();
    try {
      await emp.goToReportTo(rec.empNumber);
      await emp.addSubordinate({ name: KNOWN_SUBORDINATE, reportingMethod: DEFAULT_REPORTING_METHOD });
      await emp.expectSuccessToast();

      const baseUrl = `${process.env.BASE_URL ?? ''}/web/index.php`;
      const resp = await request.get(`${baseUrl}${API_ENDPOINTS.pim.reportTo(rec.empNumber)}`);
      expect(resp.ok()).toBeTruthy();
      const body = await resp.json() as { data: { subordinates?: unknown[] } };
      expect((body.data.subordinates ?? []).length).toBeGreaterThan(0);
    } finally {
      await emp.deleteEmployee(rec.empNumber);
    }
  },
);

test(
  '[EMP-REPORT-TO-003] Admin can edit the reporting method for an assigned supervisor',
  { tag: ['@EMP-REPORT-TO-003', '@regression', '@P2'] },
  async ({ emp, request }) => {
    const rec = await emp.createEmployee();
    try {
      await emp.goToReportTo(rec.empNumber);
      await emp.addSupervisor({ name: KNOWN_SUPERVISOR, reportingMethod: DEFAULT_REPORTING_METHOD });
      await emp.expectSuccessToast();

      await emp.goToReportTo(rec.empNumber);
      await emp.editFirstSupervisor(ALT_REPORTING_METHOD);
      await emp.expectSuccessToast();

      const baseUrl = `${process.env.BASE_URL ?? ''}/web/index.php`;
      const resp = await request.get(`${baseUrl}${API_ENDPOINTS.pim.reportTo(rec.empNumber)}`);
      expect(resp.ok()).toBeTruthy();
      const body = await resp.json() as { data: { supervisors?: Array<{ reportingMethod?: { name: string } }> } };
      const supervisors = body.data.supervisors ?? [];
      expect(supervisors.length).toBeGreaterThan(0);
      expect(supervisors[0].reportingMethod?.name).toBe(ALT_REPORTING_METHOD);
    } finally {
      await emp.deleteEmployee(rec.empNumber);
    }
  },
);

test(
  '[EMP-REPORT-TO-004] Admin can remove an assigned supervisor from an employee',
  { tag: ['@EMP-REPORT-TO-004', '@regression', '@P2'] },
  async ({ emp }) => {
    const rec = await emp.createEmployee();
    try {
      await emp.goToReportTo(rec.empNumber);
      await emp.addSupervisor({ name: KNOWN_SUPERVISOR, reportingMethod: DEFAULT_REPORTING_METHOD });
      await emp.expectSuccessToast();

      await emp.goToReportTo(rec.empNumber);
      await emp.deleteFirstSupervisor();
      await emp.expectSuccessToast();

      await emp.expectSupervisorsEmpty();
    } finally {
      await emp.deleteEmployee(rec.empNumber);
    }
  },
);

test(
  '[EMP-REPORT-TO-005] Admin can remove an assigned subordinate from an employee',
  { tag: ['@EMP-REPORT-TO-005', '@regression', '@P2'] },
  async ({ emp }) => {
    const rec = await emp.createEmployee();
    try {
      await emp.goToReportTo(rec.empNumber);
      await emp.addSubordinate({ name: KNOWN_SUBORDINATE, reportingMethod: DEFAULT_REPORTING_METHOD });
      await emp.expectSuccessToast();

      await emp.goToReportTo(rec.empNumber);
      await emp.deleteFirstSubordinate();
      await emp.expectSuccessToast();

      await emp.expectSubordinatesEmpty();
    } finally {
      await emp.deleteEmployee(rec.empNumber);
    }
  },
);
