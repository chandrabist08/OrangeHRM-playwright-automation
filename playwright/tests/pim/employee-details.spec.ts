import { test, expect } from '../../fixtures/base.fixture.js';
import { EMPLOYEE_UI } from '../../configs/ui/pim/employee.ui.js';

test.setTimeout(90000);
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

test(
  '[EMP-CONTACT-001] Admin can update employee contact details',
  { tag: ['@EMP-CONTACT-001', '@regression', '@P1'] },
  async ({ emp, page }) => {
    const { empNumber } = await emp.pickFirstEmployee();
    await emp.goToContactDetails(empNumber);
    const workEmail = `auto_${Date.now()}@test.example.com`;
    await emp.fillContactDetails({ workEmail, workTelephone: '1234567890' });
    await emp.clickSave();
    await emp.expectSuccessToast();

    await emp.goToContactDetails(empNumber);
    await expect(page.locator(EMPLOYEE_UI.contactDetails.workEmailCss).first()).toHaveValue(workEmail);
  },
);

test(
  '[EMP-EMERGENCY-001] Admin can add an emergency contact for an employee',
  { tag: ['@EMP-EMERGENCY-001', '@regression', '@P1'] },
  async ({ emp, page }) => {
    const { empNumber } = await emp.pickFirstEmployee();
    await emp.goToEmergencyContacts(empNumber);
    const contactName = `EmContact_${Date.now()}`;
    await emp.clickAddInSection('Emergency Contacts');
    await emp.fillEmergencyContactForm({
      name: contactName,
      relationship: 'Spouse',
      homeTelephone: '9876543210',
    });
    await emp.clickSave();
    await emp.expectSuccessToast();

    await emp.goToEmergencyContacts(empNumber);
    await expect(page.getByRole('row').filter({ hasText: contactName })).toBeVisible();
  },
);

test(
  '[EMP-JOB-001] Admin can update employee job details',
  { tag: ['@EMP-JOB-001', '@regression', '@P1'] },
  async ({ emp, page }) => {
    const { empNumber } = await emp.pickFirstEmployee();
    await emp.goToJobDetails(empNumber);
    await emp.fillJobDetailsForm({
      jobTitle: 'Software Engineer',
      employmentStatus: 'Full-Time Permanent',
      joinedDate: '2024-01-15',
    });
    await emp.clickSave();
    await emp.expectSuccessToast();

    await emp.goToJobDetails(empNumber);
    await expect(page.getByText('Software Engineer').first()).toBeVisible();
  },
);

test(
  '[EMP-TERM-001] Admin can terminate an employee with a reason, termination date, and optional note',
  { tag: ['@EMP-TERM-001', '@regression', '@P1'] },
  async ({ emp }) => {
    const { empNumber } = await emp.pickFirstEmployee();
    await emp.goToJobDetails(empNumber);
    const today = new Date().toISOString().slice(0, 10);
    await emp.terminateEmployee({ reason: 'Resigned', date: today });
    await emp.expectSuccessToast();
  },
);

test(
  '[EMP-PHOTO-001] Admin can upload a profile photo for an employee',
  { tag: ['@EMP-PHOTO-001', '@regression', '@P2'] },
  async ({ emp, page }) => {
    const { empNumber } = await emp.pickFirstEmployee();
    await emp.goToPersonalDetails(empNumber);

    const tmpDir = os.tmpdir();
    const imgPath = path.join(tmpDir, `test_photo_${Date.now()}.jpg`);
    const minimalJpeg = Buffer.from(
      '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0a' +
      'HBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAABAAEDASIAAhEBAxEB/8QAFgAB' +
      'AQEAAAAAAAAAAAAAAAAABgUEB//EAB4QAAIBBAMAAAAAAAAAAAAAAAABAgMREiExQf/EABQBAQAA' +
      'AAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Ak1FVqOyp' +
      'GjNKm2MH3AABP//Z',
      'base64',
    );
    fs.writeFileSync(imgPath, minimalJpeg);

    try {
      await page.locator('.oxd-form-loader').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
      await page.getByRole('img', { name: 'profile picture' }).last().click();
      const fileInput = page.locator('input[type="file"]').first();
      await fileInput.waitFor({ state: 'attached', timeout: 10000 });
      await fileInput.setInputFiles(imgPath);
      await page.getByRole('button', { name: 'Save' }).click();
      await emp.expectSuccessToast();
    } finally {
      fs.unlinkSync(imgPath);
    }
  },
);
