import { test, expect } from '../../fixtures/base.fixture.js';

test(
  '[EMP-CUSTOM-001] Admin can create a custom field in PIM Configuration',
  { tag: ['@EMP-CUSTOM-001', '@regression', '@P2'] },
  async ({ emp, page }) => {
    const fieldName = `AutoField_${Date.now()}`;
    await emp.goToCustomFields();
    try {
      await emp.createCustomField({ fieldName, screen: 'Personal Details', type: 'Text or Number' });
      await emp.expectSuccessToast();

      await expect(page.getByRole('cell', { name: fieldName })).toBeVisible();
    } finally {
      await emp.goToCustomFields();
      await emp.deleteCustomFieldByName(fieldName).catch(() => {});
    }
  },
);

test(
  '[EMP-CUSTOM-002] Admin can delete a custom field from PIM Configuration when no employee data is saved under it',
  { tag: ['@EMP-CUSTOM-002', '@regression', '@P2'] },
  async ({ emp, page }) => {
    const fieldName = `AutoField_${Date.now()}`;
    await emp.goToCustomFields();
    await emp.createCustomField({ fieldName, screen: 'Personal Details', type: 'Text or Number' });
    await emp.expectSuccessToast();

    await emp.goToCustomFields();
    await emp.deleteCustomFieldByName(fieldName);
    await emp.expectSuccessToast();

    await expect(page.getByRole('cell', { name: fieldName })).not.toBeVisible();
  },
);

test(
  '[EMP-CUSTOM-003] Admin can edit a custom field in PIM Configuration',
  { tag: ['@EMP-CUSTOM-003', '@regression', '@P2'] },
  async ({ emp, page }) => {
    const originalName = `AutoField_${Date.now()}`;
    const updatedName = `UpdatedField_${Date.now()}`;
    await emp.goToCustomFields();
    await emp.createCustomField({ fieldName: originalName, screen: 'Personal Details', type: 'Text or Number' });
    await emp.expectSuccessToast();

    try {
      await emp.goToCustomFields();
      await emp.editCustomFieldByName(originalName, updatedName);
      await emp.expectSuccessToast();

      await expect(page.getByRole('cell', { name: updatedName })).toBeVisible();
      await expect(page.getByRole('cell', { name: originalName })).not.toBeVisible();
    } finally {
      await emp.goToCustomFields();
      await emp.deleteCustomFieldByName(updatedName).catch(() => {
        emp.deleteCustomFieldByName(originalName).catch(() => {});
      });
    }
  },
);

test(
  '[EMP-REPORTS-001] Admin can create a custom PIM report with selection criteria and display fields',
  { tag: ['@EMP-REPORTS-001', '@regression', '@P2'] },
  async ({ emp, page }) => {
    const reportName = `AutoReport_${Date.now()}`;
    await emp.goToPimReports();
    try {
      await emp.createPimReport({
        reportName,
        include: 'Current Employees Only',
        criteria: 'Employee Name',
        displayFieldGroup: 'Personal',
        displayField: 'Employee First Name',
      });
      await emp.expectSuccessToast();

      await emp.goToPimReports();
      await expect(page.getByRole('cell', { name: reportName })).toBeVisible();
    } finally {
      await emp.goToPimReports();
      await emp.deletePimReportByName(reportName).catch(() => {});
    }
  },
);
