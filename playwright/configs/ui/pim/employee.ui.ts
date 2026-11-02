/**
 * PIM / Employee Management UI selector constants.
 *
 * Values are plain strings used by helpers with:
 *   getByRole()  — button names, heading text
 *   getByLabel() — form field labels
 *   getByPlaceholder() — autocomplete / typeahead placeholders
 *   getByText()  — visible text matches (success toast)
 *
 * Never use these strings directly in tests; always pass them to the
 * appropriate helper that calls the correct Playwright locator method.
 */
export const EMPLOYEE_UI = {
  list: {
    /** getByPlaceholder() — employee name typeahead */
    searchByName: 'Type for hints...',
    /** getByLabel() — employee ID search field */
    searchById: 'Employee Id',
    /** getByRole('button') */
    searchButton: 'Search',
    /** getByRole('button') */
    resetButton: 'Reset',
    /** getByRole('button') */
    addButton: 'Add',
    /** getByRole('button') */
    deleteButton: 'Delete Selected',
    /** getByLabel() — employment status dropdown in search panel */
    employmentStatusFilter: 'Employment Status',
    /** getByLabel() — include current/past/both employees */
    includeFilter: 'Include',
    /** getByLabel() — job title dropdown in search panel */
    jobTitleFilter: 'Job Title',
    /** getByLabel() — sub-unit (department) dropdown in search panel */
    subunitFilter: 'Sub Unit',
    /** getByPlaceholder() — supervisor name typeahead in search panel */
    supervisorFilter: 'Type for hints...',
    /** getByRole('cell') — empty state message text */
    noRecordsFound: 'No Records Found',
  },

  addEmployee: {
    /** getByRole('textbox', { name }) */
    firstName: 'First Name',
    /** getByRole('textbox', { name }) */
    middleName: 'Middle Name',
    /** getByRole('textbox', { name }) */
    lastName: 'Last Name',
    /** getByLabel() */
    employeeId: 'Employee Id',
    /** locator('.oxd-switch-input') — visual toggle that reveals login details section */
    createLoginToggle: 'Create Login Details',
    /** getByRole('textbox').nth(5) — no formal label; 6th textbox on the add-employee page */
    usernameLabel: 'Username',
    /** locator('input[type="password"]').first() — no formal label */
    passwordLabel: 'Password',
    /** locator('input[type="password"]').nth(1) — no formal label */
    confirmPasswordLabel: 'Confirm Password',
    /** getByRole('radio', { name }) — status is radio buttons, not a dropdown */
    statusEnabled: 'Enabled',
    statusDisabled: 'Disabled',
    /** getByRole('button') */
    saveButton: 'Save',
  },

  shared: {
    /** getByRole('button') */
    editButton: 'Edit',
    /** getByRole('button') */
    saveButton: 'Save',
    /** getByRole('button') */
    addButton: 'Add',
    /** getByRole('button') */
    deleteButton: 'Delete',
    /** getByRole('button') — inside confirmation dialog */
    confirmDeleteButton: 'Yes, Delete',
    /** getByRole('button') */
    cancelButton: 'Cancel',
    /**
     * getByText() exact match — the success toast title element.
     * Use: page.getByText(EMPLOYEE_UI.shared.successToast, { exact: true })
     */
    successToast: 'Success',
    /**
     * CSS class for inline validation error messages.
     * Use: page.locator(EMPLOYEE_UI.shared.validationError)
     */
    validationError: '.oxd-input-field-error-message',
  },

  tabs: {
    /** getByRole('link', { name }) — tab link names */
    personalDetails: 'Personal Details',
    contactDetails: 'Contact Details',
    emergencyContacts: 'Emergency Contacts',
    dependants: 'Dependants',
    job: 'Job',
    salary: 'Salary',
    reportTo: 'Report-to',
    qualifications: 'Qualifications',
    memberships: 'Memberships',
    immigration: 'Immigration',
  },

  personalDetails: {
    /** getByRole('button') — profile photo widget */
    changePhoto: 'Change Photo',
  },

  contactDetails: {
    /** getByLabel() */
    workEmail: 'Work Email',
    /** getByLabel() */
    homeEmail: 'Home Email',
    /** getByLabel() */
    workTelephone: 'Work Telephone',
    /** CSS locator from codegen — work email input */
    workEmailCss: 'div:nth-child(9) > .oxd-grid-3 > div > .oxd-input-group > div:nth-child(2) > .oxd-input',
    /** CSS locator from codegen — work telephone input */
    workTelephoneCss: 'div:nth-child(6) > .oxd-grid-3 > div:nth-child(3) > .oxd-input-group > div:nth-child(2) > .oxd-input',
  },

  emergencyContacts: {
    /** getByRole('textbox', { name }) — contact name field */
    name: 'Name',
    /** getByLabel() */
    relationship: 'Relationship',
    /** getByLabel() */
    homeTelephone: 'Home Telephone',
    /** getByLabel() */
    workTelephone: 'Work Telephone',
    /** getByLabel() */
    mobile: 'Mobile',
    /** nth indices from codegen — no ARIA labels on these inputs */
    nth: { name: 1, relationship: 2, homeTelephone: 3, workTelephone: 4, mobile: 5 },
  },

  dependants: {
    /** getByRole('textbox', { name }) */
    name: 'Name',
    /** getByLabel() */
    relationship: 'Relationship',
    /** getByLabel() */
    dateOfBirth: 'Date of Birth',
  },

  job: {
    /** getByLabel() — within Job tab */
    jobTitleSelect: 'Job Title',
    /** getByLabel() — within Job tab */
    employmentStatusSelect: 'Employment Status',
    /** getByLabel() — within Job tab */
    subUnitSelect: 'Sub Unit',
    /** getByLabel() — within Job tab */
    locationSelect: 'Location',
    /** getByLabel() */
    joinedDate: 'Joined Date',
    /** getByRole('button') */
    terminateButton: 'Terminate Employment',
    /** getByLabel() — inside termination dialog */
    terminationReasonSelect: 'Reason',
    /** getByLabel() — inside termination dialog */
    terminationDate: 'Date',
    /** getByRole('textbox', { name }) — inside termination dialog */
    terminationNote: 'Note',
    /** getByRole('button') — inside termination dialog */
    confirmTerminateButton: 'Save',
  },

  salary: {
    /** getByLabel() */
    salaryComponent: 'Salary Component',
    /** getByLabel() */
    payFrequency: 'Pay Frequency',
    /** getByLabel() */
    currency: 'Currency',
    /** getByLabel() */
    amount: 'Amount',
    /** getByLabel() */
    commentsTextarea: 'Comments',
  },

  reportTo: {
    /** getByPlaceholder() — name typeahead inside Report-To section */
    nameSearch: 'Type for hints...',
    /** getByLabel() */
    reportingMethodSelect: 'Reporting Method',
  },

  qualifications: {
    /** getByLabel() — education sub-section */
    educationLevel: 'Level',
    /** getByLabel() */
    institute: 'Institute',
    /** getByLabel() */
    major: 'Major/Specialization',
    /** getByLabel() */
    year: 'Year',
    /** getByLabel() */
    score: 'GPA/Score',
    /** getByLabel() */
    startDate: 'Start Date',
    /** getByLabel() */
    endDate: 'End Date',
  },

  memberships: {
    /** getByLabel() */
    membershipSelect: 'Membership',
    /** getByLabel() */
    subscriptionPaidBy: 'Subscription Paid By',
    /** getByLabel() */
    subscriptionAmount: 'Subscription Amount',
    /** getByLabel() */
    currency: 'Currency',
    /** getByLabel() */
    subscriptionCommenceDate: 'Subscription Commence Date',
    /** getByLabel() */
    subscriptionRenewalDate: 'Subscription Renewal Date',
  },

  immigration: {
    /** getByLabel() */
    documentSelect: 'Document',
    /** getByLabel() */
    documentNumber: 'Number',
    /** getByLabel() */
    issuedDate: 'Issued Date',
    /** getByLabel() */
    expiryDate: 'Expiry Date',
    /** getByLabel() */
    eligibilityStatus: 'Eligible Status',
    /** getByLabel() */
    issuedBy: 'Issued By',
    /** getByLabel() */
    eligibilityReviewDate: 'Eligible Review Date',
    /** getByLabel() */
    comments: 'Comments',
  },

  customFields: {
    /** getByRole('button') */
    addButton: 'Add',
    /** getByLabel() */
    fieldNameInput: 'Field Name',
    /** getByLabel() */
    screenSelect: 'Screen',
    /** getByLabel() */
    typeSelect: 'Type',
    /** getByRole('button') */
    saveButton: 'Save',
    /** getByRole('button') */
    deleteButton: 'Delete Selected',
  },

  reports: {
    /** getByRole('button') */
    addButton: 'Add',
    /** getByPlaceholder() — Report Name textbox has no formal label association */
    reportNamePlaceholder: 'Type here',
    /** getByLabel() — active/inactive/both employees within report definition */
    includeSelect: 'Include',
    /** getByText() — placeholder text shown in the Display Field Group dropdown trigger */
    displayFieldGroupsSelect: 'Select Display Field Group',
    /** getByText() — placeholder text shown in the Display Fields dropdown trigger */
    displayFieldsSelect: 'Select Display Field',
    /** getByRole('button') */
    saveButton: 'Save',
  },
} as const;

export type EmployeeUI = typeof EMPLOYEE_UI;
