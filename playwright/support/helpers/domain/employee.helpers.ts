import { expect } from '@playwright/test';
import type { Page, APIRequestContext } from '@playwright/test';
import { ROUTES, API_ENDPOINTS } from '../../../configs/app/routes.js';
import { EMPLOYEE_UI } from '../../../configs/ui/pim/employee.ui.js';

export interface CreateEmployeeData {
  firstName: string;
  lastName: string;
  middleName?: string;
}

export interface EmployeeRecord {
  empNumber: number;
  firstName: string;
  lastName: string;
  employeeId: string;
}

export interface AddEmployeeFormData {
  firstName: string;
  lastName: string;
  middleName?: string;
  employeeId?: string;
}

export interface LoginDetailsData {
  username: string;
  password: string;
  status?: string;
}

export interface ContactDetailsData {
  workEmail?: string;
  workTelephone?: string;
}

export interface EmergencyContactData {
  name: string;
  relationship: string;
  homeTelephone?: string;
}

export interface DependantData {
  name: string;
  relationship: string;
  dateOfBirth?: string;
}

export interface JobDetailsFormData {
  jobTitle?: string;
  employmentStatus?: string;
  joinedDate?: string;
}

export interface TerminationData {
  reason: string;
  date: string;
  note?: string;
}

export interface SalaryData {
  salaryComponent: string;
  payFrequency: string;
  currency: string;
  amount: string;
}

export interface ReportToData {
  name: string;
  reportingMethod: string;
}

export interface EducationData {
  level: string;
  institute: string;
  year: string;
}

export interface MembershipData {
  membership: string;
  paidBy: string;
  amount: string;
  currency: string;
}

export interface ImmigrationData {
  document: string;
  number: string;
  issuedDate: string;
}

export interface CustomFieldData {
  fieldName: string;
  screen: string;
  type: string;
}

export interface PimReportData {
  reportName: string;
  include: string;
  criteria: string;
  displayFieldGroup: string;
  displayField: string;
}

export interface EmployeeHelpers {
  createEmployee(data?: Partial<CreateEmployeeData>): Promise<EmployeeRecord>;
  deleteEmployee(empNumber: number): Promise<void>;
  pickFirstEmployee(): Promise<{ empNumber: number; firstName: string; lastName: string }>;
  goToEmployeeList(): Promise<void>;
  goToAddEmployee(): Promise<void>;
  goToPersonalDetails(empNumber: number): Promise<void>;
  goToContactDetails(empNumber: number): Promise<void>;
  goToEmergencyContacts(empNumber: number): Promise<void>;
  goToDependants(empNumber: number): Promise<void>;
  goToJobDetails(empNumber: number): Promise<void>;
  goToSalary(empNumber: number): Promise<void>;
  goToReportTo(empNumber: number): Promise<void>;
  goToQualifications(empNumber: number): Promise<void>;
  goToMemberships(empNumber: number): Promise<void>;
  goToImmigration(empNumber: number): Promise<void>;
  goToCustomFields(): Promise<void>;
  goToPimReports(): Promise<void>;
  searchByName(name: string): Promise<void>;
  searchById(id: string): Promise<void>;
  clickSearch(): Promise<void>;
  clickReset(): Promise<void>;
  filterByEmploymentStatus(status: string): Promise<void>;
  filterByInclude(option: string): Promise<void>;
  filterByJobTitle(jobTitle: string): Promise<void>;
  filterBySubunit(subunit: string): Promise<void>;
  filterBySupervisor(name: string): Promise<void>;
  expectNoRecordsFound(): Promise<void>;
  expectRowsVisible(): Promise<void>;
  fillAddEmployeeForm(data: AddEmployeeFormData): Promise<void>;
  enableCreateLoginDetails(): Promise<void>;
  fillLoginDetails(data: LoginDetailsData): Promise<void>;
  saveForm(): Promise<void>;
  fillFirstName(firstName: string): Promise<void>;
  savePersonalDetails(): Promise<void>;
  clickSave(): Promise<void>;
  clickAdd(): Promise<void>;
  selectRowByName(name: string): Promise<void>;
  clickDeleteSelected(): Promise<void>;
  confirmDelete(): Promise<void>;
  expectSuccessToast(): Promise<void>;
  fillContactDetails(data: ContactDetailsData): Promise<void>;
  clickAddInSection(sectionText: string): Promise<void>;
  fillEmergencyContactForm(data: EmergencyContactData): Promise<void>;
  fillDependantForm(data: DependantData): Promise<void>;
  fillJobDetailsForm(data: JobDetailsFormData): Promise<void>;
  terminateEmployee(data: TerminationData): Promise<void>;
  addSalaryComponent(data?: Partial<SalaryData>): Promise<void>;
  addSupervisor(data: ReportToData): Promise<void>;
  addSubordinate(data: ReportToData): Promise<void>;
  editFirstSupervisor(newReportingMethod: string): Promise<void>;
  deleteFirstSupervisor(): Promise<void>;
  deleteFirstSubordinate(): Promise<void>;
  addEducation(data: EducationData): Promise<void>;
  addMembership(data?: Partial<MembershipData>): Promise<void>;
  addImmigrationDocument(data: ImmigrationData): Promise<void>;
  createCustomField(data: CustomFieldData): Promise<void>;
  deleteCustomFieldByName(fieldName: string): Promise<void>;
  editCustomFieldByName(oldName: string, newName: string): Promise<void>;
  createPimReport(data: PimReportData): Promise<void>;
  deletePimReportByName(reportName: string): Promise<void>;
  expectSupervisorsEmpty(): Promise<void>;
  expectSubordinatesEmpty(): Promise<void>;
  selectVueOption(label: string, optionText: string): Promise<void>;
  selectFirstVueOption(label: string): Promise<void>;
  typeaheadSelect(placeholder: string, searchText: string): Promise<void>;
}

export function createEmployeeHelpers(page: Page, request: APIRequestContext): EmployeeHelpers {
  // OrangeHRM REST API lives under /web/index.php — API_ENDPOINTS paths start with /api/v2/...
  const apiBaseUrl = `${process.env.BASE_URL ?? ''}/web/index.php`;

  async function apiPost<T>(path: string, body: unknown): Promise<T> {
    const response = await request.post(`${apiBaseUrl}${path}`, {
      data: body,
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok()) {
      throw new Error(`POST ${path} failed: ${response.status()} ${await response.text()}`);
    }
    return response.json() as Promise<T>;
  }

  async function apiDelete(path: string, body?: unknown): Promise<void> {
    const response = await request.delete(`${apiBaseUrl}${path}`, {
      data: body,
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok() && response.status() !== 204) {
      throw new Error(`DELETE ${path} failed: ${response.status()}`);
    }
  }

  async function selectVueOption(label: string, optionText: string): Promise<void> {
    await page.locator('.oxd-form-loader').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
    await page.locator('label', { hasText: label }).locator('xpath=../..').locator('.oxd-select-text').click();
    await page.locator('[role="option"]').filter({ hasText: new RegExp(`^\\s*${optionText}\\s*$`) }).click();
  }

  async function selectFirstVueOption(label: string): Promise<void> {
    await page.getByLabel(label).click();
    await page.getByRole('option').first().click();
  }

  async function typeaheadSelect(placeholder: string, searchText: string): Promise<void> {
    await page.getByPlaceholder(placeholder).fill(searchText);
    await page.getByRole('option').first().waitFor({ state: 'visible' });
    await page.getByRole('option').first().click();
  }

  return {
    async createEmployee(data?: Partial<CreateEmployeeData>): Promise<EmployeeRecord> {
      const ts = Date.now();
      const firstName = data?.firstName ?? `AutoTest_${ts}`;
      const lastName = data?.lastName ?? 'User';
      const middleName = data?.middleName ?? '';
      const result = await apiPost<{ data: { empNumber: number; employeeId: string; firstName: string; lastName: string } }>(
        API_ENDPOINTS.pim.employees,
        { firstName, middleName, lastName },
      );
      return {
        empNumber: result.data.empNumber,
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        employeeId: result.data.employeeId,
      };
    },

    async deleteEmployee(empNumber: number): Promise<void> {
      await apiDelete(API_ENDPOINTS.pim.employees, { ids: [empNumber] });
    },

    async pickFirstEmployee(): Promise<{ empNumber: number; firstName: string; lastName: string }> {
      await page.goto(ROUTES.pim.employeeList);
      await page.getByRole('row').nth(1).waitFor({ state: 'visible', timeout: 20000 });
      const firstRow = page.getByRole('row').nth(1);
      const cells = firstRow.getByRole('cell');
      const firstName = ((await cells.nth(2).textContent()) ?? '').trim();
      const lastName = ((await cells.nth(3).textContent()) ?? '').trim();
      await firstRow.getByRole('button').first().click();
      await page.waitForURL(/viewPersonalDetails\/empNumber\/\d+/);
      const match = page.url().match(/empNumber\/(\d+)/);
      const empNumber = match ? parseInt(match[1], 10) : 0;
      return { empNumber, firstName, lastName };
    },

    async goToEmployeeList(): Promise<void> {
      await page.goto(ROUTES.pim.employeeList);
    },

    async goToAddEmployee(): Promise<void> {
      await page.goto(ROUTES.pim.addEmployee);
    },

    async goToPersonalDetails(empNumber: number): Promise<void> {
      await page.goto(ROUTES.pim.personalDetails(empNumber));
    },

    async goToContactDetails(empNumber: number): Promise<void> {
      await page.goto(ROUTES.pim.contactDetails(empNumber));
    },

    async goToEmergencyContacts(empNumber: number): Promise<void> {
      await page.goto(ROUTES.pim.emergencyContacts(empNumber));
    },

    async goToDependants(empNumber: number): Promise<void> {
      await page.goto(ROUTES.pim.dependants(empNumber));
    },

    async goToJobDetails(empNumber: number): Promise<void> {
      await page.goto(ROUTES.pim.jobDetails(empNumber));
      await page.locator('.oxd-form-loader').waitFor({ state: 'hidden' }).catch(() => {});
    },

    async goToSalary(empNumber: number): Promise<void> {
      await page.goto(ROUTES.pim.salary(empNumber));
    },

    async goToReportTo(empNumber: number): Promise<void> {
      await page.goto(ROUTES.pim.reportTo(empNumber));
      await page.locator('.oxd-form-loader').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
    },

    async goToQualifications(empNumber: number): Promise<void> {
      await page.goto(ROUTES.pim.qualifications(empNumber));
    },

    async goToMemberships(empNumber: number): Promise<void> {
      await page.goto(ROUTES.pim.memberships(empNumber));
    },

    async goToImmigration(empNumber: number): Promise<void> {
      await page.goto(ROUTES.pim.immigration(empNumber));
    },

    async goToCustomFields(): Promise<void> {
      await page.goto(ROUTES.pim.customFields);
      await page.waitForLoadState('domcontentloaded');
    },

    async goToPimReports(): Promise<void> {
      await page.goto(ROUTES.pim.reports);
      await page.waitForLoadState('domcontentloaded');
    },

    async searchByName(name: string): Promise<void> {
      await page.getByPlaceholder(EMPLOYEE_UI.list.searchByName).first().fill(name);
    },

    async searchById(id: string): Promise<void> {
      await page.locator('.oxd-input-group', { hasText: EMPLOYEE_UI.list.searchById })
        .locator('.oxd-input').fill(id);
    },

    async clickSearch(): Promise<void> {
      const resp = page.waitForResponse((r) => r.url().includes('/pim/employees') && r.status() === 200);
      await page.getByRole('button', { name: EMPLOYEE_UI.list.searchButton }).click();
      await resp;
    },

    async clickReset(): Promise<void> {
      const resp = page.waitForResponse((r) => r.url().includes('/pim/employees') && r.status() === 200);
      await page.getByRole('button', { name: EMPLOYEE_UI.list.resetButton }).click();
      await resp;
    },

    async filterByEmploymentStatus(status: string): Promise<void> {
      await selectVueOption(EMPLOYEE_UI.list.employmentStatusFilter, status);
    },

    async filterByInclude(option: string): Promise<void> {
      await selectVueOption(EMPLOYEE_UI.list.includeFilter, option);
    },

    async filterByJobTitle(jobTitle: string): Promise<void> {
      await selectVueOption(EMPLOYEE_UI.list.jobTitleFilter, jobTitle);
    },

    async filterBySubunit(subunit: string): Promise<void> {
      await selectVueOption(EMPLOYEE_UI.list.subunitFilter, subunit);
    },

    async filterBySupervisor(name: string): Promise<void> {
      const input = page.getByPlaceholder(EMPLOYEE_UI.list.supervisorFilter).nth(1);
      await input.fill(name);
      await page.getByRole('option').first().waitFor({ state: 'visible' });
      await page.getByRole('option').first().click();
    },

    async expectNoRecordsFound(): Promise<void> {
      // Wait for any loading overlay to clear before asserting empty state
      await page.locator('.oxd-loading-spinner').waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
      await expect(page.getByText(EMPLOYEE_UI.list.noRecordsFound).first()).toBeVisible({ timeout: 15000 });
    },

    async expectRowsVisible(): Promise<void> {
      await expect(page.getByRole('row').nth(1)).toBeVisible();
    },

    async fillAddEmployeeForm(data: AddEmployeeFormData): Promise<void> {
      await page.getByRole('textbox', { name: EMPLOYEE_UI.addEmployee.firstName }).fill(data.firstName);
      await page.getByRole('textbox', { name: EMPLOYEE_UI.addEmployee.lastName }).fill(data.lastName);
      if (data.middleName) {
        await page.getByRole('textbox', { name: EMPLOYEE_UI.addEmployee.middleName }).fill(data.middleName);
      }
    },

    async enableCreateLoginDetails(): Promise<void> {
      await page.locator('.oxd-switch-input').click();
      await page.getByRole('textbox').nth(5).waitFor({ state: 'visible' });
    },

    async fillLoginDetails(data: LoginDetailsData): Promise<void> {
      await page.getByRole('textbox').nth(5).fill(data.username);
      if (data.status) {
        await page.getByRole('radio', { name: EMPLOYEE_UI.addEmployee.statusEnabled }).check();
      }
      await page.locator('input[type="password"]').first().fill(data.password);
      await page.locator('input[type="password"]').nth(1).fill(data.password);
    },

    async saveForm(): Promise<void> {
      await page.getByRole('button', { name: EMPLOYEE_UI.shared.saveButton }).click();
    },

    async fillFirstName(firstName: string): Promise<void> {
      const input = page.getByRole('textbox', { name: 'First Name' });
      await input.click();
      await input.press('Control+a');
      await input.pressSequentially(firstName);
    },

    async savePersonalDetails(): Promise<void> {
      await Promise.all([
        page.waitForResponse(
          (resp) =>
            resp.url().includes('/personal-details') &&
            resp.request().method() === 'PUT' &&
            resp.status() === 200,
        ),
        page.getByRole('button', { name: EMPLOYEE_UI.shared.saveButton }).first().click(),
      ]);
    },

    async clickSave(): Promise<void> {
      await page.getByRole('button', { name: EMPLOYEE_UI.shared.saveButton }).click();
    },

    async clickAdd(): Promise<void> {
      await page.getByRole('button', { name: EMPLOYEE_UI.shared.addButton, exact: false }).click();
    },

    async selectRowByName(name: string): Promise<void> {
      const row = page.getByRole('row').filter({ hasText: name });
      await row.getByRole('checkbox').click({ force: true });
    },

    async clickDeleteSelected(): Promise<void> {
      await page.getByRole('button', { name: EMPLOYEE_UI.list.deleteButton }).click();
    },

    async confirmDelete(): Promise<void> {
      await page.getByRole('button', { name: EMPLOYEE_UI.shared.confirmDeleteButton }).click();
    },

    async expectSuccessToast(): Promise<void> {
      await expect(page.getByText(EMPLOYEE_UI.shared.successToast, { exact: true })).toBeVisible();
    },

    async fillContactDetails(data: ContactDetailsData): Promise<void> {
      if (data.workEmail) {
        await page.locator(EMPLOYEE_UI.contactDetails.workEmailCss).first().fill(data.workEmail);
      }
      if (data.workTelephone) {
        await page.locator(EMPLOYEE_UI.contactDetails.workTelephoneCss).fill(data.workTelephone);
      }
    },

    async clickAddInSection(sectionText: string): Promise<void> {
      const section = page.locator('.orangehrm-card-container').filter({ hasText: sectionText });
      await section.getByRole('button', { name: EMPLOYEE_UI.shared.addButton, exact: false }).first().click();
    },

    async fillEmergencyContactForm(data: EmergencyContactData): Promise<void> {
      const nth = EMPLOYEE_UI.emergencyContacts.nth;
      await page.getByRole('textbox').nth(nth.name).fill(data.name);
      await page.getByRole('textbox').nth(nth.relationship).fill(data.relationship);
      if (data.homeTelephone) {
        await page.getByRole('textbox').nth(nth.homeTelephone).fill(data.homeTelephone);
      }
    },

    async fillDependantForm(data: DependantData): Promise<void> {
      await page.getByRole('textbox', { name: EMPLOYEE_UI.dependants.name }).fill(data.name);
      await selectVueOption(EMPLOYEE_UI.dependants.relationship, data.relationship);
      if (data.dateOfBirth) {
        await page.getByLabel(EMPLOYEE_UI.dependants.dateOfBirth).fill(data.dateOfBirth);
      }
    },

    async fillJobDetailsForm(data: JobDetailsFormData): Promise<void> {
      if (data.jobTitle) {
        await selectVueOption(EMPLOYEE_UI.job.jobTitleSelect, data.jobTitle);
      }
      if (data.employmentStatus) {
        await selectVueOption(EMPLOYEE_UI.job.employmentStatusSelect, data.employmentStatus);
      }
      if (data.joinedDate) {
        await page.locator('.oxd-input-group', { hasText: EMPLOYEE_UI.job.joinedDate })
          .locator('.oxd-input').fill(data.joinedDate);
      }
    },

    async terminateEmployee(data: TerminationData): Promise<void> {
      await page.getByRole('button', { name: EMPLOYEE_UI.job.terminateButton }).click();
      const dialog = page.getByRole('dialog');
      await dialog.getByRole('textbox', { name: 'yyyy-dd-mm' }).fill(data.date);
      await dialog.getByText('-- Select --').click();
      await page.locator('[role="option"]').filter({ hasText: new RegExp(`^\\s*${data.reason}\\s*$`) }).click();
      if (data.note) {
        await dialog.getByRole('textbox', { name: 'Type here' }).fill(data.note);
      }
      const terminationResp = page.waitForResponse((resp) => resp.url().includes('/pim/employees') && resp.status() === 200);
      await dialog.getByRole('button', { name: 'Save' }).click();
      await terminationResp;
    },

    async addSalaryComponent(data?: Partial<SalaryData>): Promise<void> {
      await page.getByRole('button', { name: EMPLOYEE_UI.shared.addButton, exact: false }).click();
      if (data?.salaryComponent) {
        await selectVueOption(EMPLOYEE_UI.salary.salaryComponent, data.salaryComponent);
      } else {
        await selectFirstVueOption(EMPLOYEE_UI.salary.salaryComponent);
      }
      if (data?.payFrequency) {
        await selectVueOption(EMPLOYEE_UI.salary.payFrequency, data.payFrequency);
      } else {
        await selectFirstVueOption(EMPLOYEE_UI.salary.payFrequency);
      }
      if (data?.currency) {
        await selectVueOption(EMPLOYEE_UI.salary.currency, data.currency);
      } else {
        await selectFirstVueOption(EMPLOYEE_UI.salary.currency);
      }
      await page.getByLabel(EMPLOYEE_UI.salary.amount).fill(data?.amount ?? '5000');
      await page.getByRole('button', { name: EMPLOYEE_UI.shared.saveButton }).click();
    },

    async addSupervisor(data: ReportToData): Promise<void> {
      const section = page.locator('.orangehrm-card-container').filter({ hasText: 'Assigned Supervisors' });
      await section.getByRole('button', { name: EMPLOYEE_UI.shared.addButton, exact: false }).click();
      await typeaheadSelect(EMPLOYEE_UI.reportTo.nameSearch, data.name);
      await selectVueOption(EMPLOYEE_UI.reportTo.reportingMethodSelect, data.reportingMethod);
      await page.getByRole('button', { name: EMPLOYEE_UI.shared.saveButton }).click();
    },

    async addSubordinate(data: ReportToData): Promise<void> {
      const section = page.locator('.orangehrm-card-container').filter({ hasText: 'Assigned Subordinates' });
      await section.getByRole('button', { name: EMPLOYEE_UI.shared.addButton, exact: false }).click();
      await typeaheadSelect(EMPLOYEE_UI.reportTo.nameSearch, data.name);
      await selectVueOption(EMPLOYEE_UI.reportTo.reportingMethodSelect, data.reportingMethod);
      await page.getByRole('button', { name: EMPLOYEE_UI.shared.saveButton }).click();
    },

    async editFirstSupervisor(newReportingMethod: string): Promise<void> {
      const section = page.locator('.orangehrm-card-container').filter({ hasText: 'Assigned Supervisors' });
      await section.getByRole('button', { name: EMPLOYEE_UI.shared.editButton }).first().click();
      await selectVueOption(EMPLOYEE_UI.reportTo.reportingMethodSelect, newReportingMethod);
      await page.getByRole('button', { name: EMPLOYEE_UI.shared.saveButton }).click();
    },

    async deleteFirstSupervisor(): Promise<void> {
      const section = page.locator('.orangehrm-card-container').filter({ hasText: 'Assigned Supervisors' });
      await section.getByRole('checkbox').first().click();
      await section.getByRole('button', { name: EMPLOYEE_UI.shared.deleteButton }).click();
      await page.getByRole('button', { name: EMPLOYEE_UI.shared.confirmDeleteButton }).click();
    },

    async deleteFirstSubordinate(): Promise<void> {
      const section = page.locator('.orangehrm-card-container').filter({ hasText: 'Assigned Subordinates' });
      await section.getByRole('checkbox').first().click();
      await section.getByRole('button', { name: EMPLOYEE_UI.shared.deleteButton }).click();
      await page.getByRole('button', { name: EMPLOYEE_UI.shared.confirmDeleteButton }).click();
    },

    async addEducation(data: EducationData): Promise<void> {
      const section = page.locator('.orangehrm-card-container').filter({ hasText: 'Education' });
      await section.getByRole('button', { name: EMPLOYEE_UI.shared.addButton, exact: false }).click();
      await selectVueOption(EMPLOYEE_UI.qualifications.educationLevel, data.level);
      await page.getByLabel(EMPLOYEE_UI.qualifications.institute).fill(data.institute);
      await page.getByLabel(EMPLOYEE_UI.qualifications.year).fill(data.year);
      await page.getByRole('button', { name: EMPLOYEE_UI.shared.saveButton }).click();
    },

    async addMembership(data?: Partial<MembershipData>): Promise<void> {
      await page.getByRole('button', { name: EMPLOYEE_UI.shared.addButton, exact: false }).click();
      if (data?.membership) {
        await selectVueOption(EMPLOYEE_UI.memberships.membershipSelect, data.membership);
      } else {
        await selectFirstVueOption(EMPLOYEE_UI.memberships.membershipSelect);
      }
      if (data?.paidBy) {
        await selectVueOption(EMPLOYEE_UI.memberships.subscriptionPaidBy, data.paidBy);
      } else {
        await selectFirstVueOption(EMPLOYEE_UI.memberships.subscriptionPaidBy);
      }
      await page.getByLabel(EMPLOYEE_UI.memberships.subscriptionAmount).fill(data?.amount ?? '100');
      if (data?.currency) {
        await selectVueOption(EMPLOYEE_UI.memberships.currency, data.currency);
      } else {
        await selectFirstVueOption(EMPLOYEE_UI.memberships.currency);
      }
      await page.getByRole('button', { name: EMPLOYEE_UI.shared.saveButton }).click();
    },

    async addImmigrationDocument(data: ImmigrationData): Promise<void> {
      await page.getByRole('button', { name: EMPLOYEE_UI.shared.addButton, exact: false }).click();
      await selectVueOption(EMPLOYEE_UI.immigration.documentSelect, data.document);
      await page.getByLabel(EMPLOYEE_UI.immigration.documentNumber).fill(data.number);
      await page.getByLabel(EMPLOYEE_UI.immigration.issuedDate).fill(data.issuedDate);
      await page.getByRole('button', { name: EMPLOYEE_UI.shared.saveButton }).click();
    },

    async createCustomField(data: CustomFieldData): Promise<void> {
      await page.getByRole('button', { name: EMPLOYEE_UI.customFields.addButton, exact: false }).click();
      await page.waitForURL('**/saveCustomFields');
      await page.locator('form').getByRole('textbox').fill(data.fieldName);
      await selectVueOption(EMPLOYEE_UI.customFields.screenSelect, data.screen);
      await selectVueOption(EMPLOYEE_UI.customFields.typeSelect, data.type);
      await page.getByRole('button', { name: EMPLOYEE_UI.customFields.saveButton }).click();
    },

    async deleteCustomFieldByName(fieldName: string): Promise<void> {
      const row = page.getByRole('row').filter({ hasText: fieldName });
      await row.getByLabel('').click({ force: true });
      await page.getByRole('button', { name: EMPLOYEE_UI.customFields.deleteButton }).click();
      await page.getByRole('button', { name: EMPLOYEE_UI.shared.confirmDeleteButton }).click();
    },

    async editCustomFieldByName(oldName: string, newName: string): Promise<void> {
      const row = page.getByRole('row').filter({ hasText: oldName });
      await row.getByRole('button').nth(1).click();
      await page.waitForURL('**/saveCustomFields/**');
      await page.locator('.oxd-form-loader').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
      const nameInput = page.locator('form').getByRole('textbox');
      await nameInput.click();
      await nameInput.press('Control+a');
      await nameInput.pressSequentially(newName);
      await page.getByRole('button', { name: EMPLOYEE_UI.customFields.saveButton }).click();
    },

    async createPimReport(data: PimReportData): Promise<void> {
      await page.getByRole('button', { name: EMPLOYEE_UI.reports.addButton, exact: false }).click();
      await page.waitForURL('**/definePredefinedReport');
      await page.getByPlaceholder(EMPLOYEE_UI.reports.reportNamePlaceholder).fill(data.reportName);
      // OrangeHRM Vue dropdowns all show '-- Select --'; navigate positionally after each selection
      await page.getByText('-- Select --').first().click();
      await page.getByText(data.include, { exact: true }).click();
      await page.getByText('-- Select --').first().click();
      await page.getByText(data.criteria, { exact: true }).click();
      await page.getByText('-- Select --').first().click();
      await page.getByText(data.displayFieldGroup).click();
      await page.getByText('-- Select --').first().click();
      await page.getByText(data.displayField).click();
      await page.getByRole('button').nth(4).click();
      await page.getByRole('button', { name: EMPLOYEE_UI.reports.saveButton }).click();
    },

    async deletePimReportByName(reportName: string): Promise<void> {
      const row = page.getByRole('row').filter({ hasText: reportName });
      await row.getByRole('checkbox').click({ force: true });
      await page.getByRole('button', { name: EMPLOYEE_UI.shared.deleteButton }).click();
      await page.getByRole('button', { name: EMPLOYEE_UI.shared.confirmDeleteButton }).click();
    },

    async expectSupervisorsEmpty(): Promise<void> {
      const section = page.locator('.orangehrm-card-container').filter({ hasText: 'Assigned Supervisors' });
      const rows = section.getByRole('row');
      const count = await rows.count();
      expect(count).toBeLessThanOrEqual(1);
    },

    async expectSubordinatesEmpty(): Promise<void> {
      const section = page.locator('.orangehrm-card-container').filter({ hasText: 'Assigned Subordinates' });
      const rows = section.getByRole('row');
      const count = await rows.count();
      expect(count).toBeLessThanOrEqual(1);
    },

    selectVueOption,
    selectFirstVueOption,
    typeaheadSelect,
  };
}
