# Module Context — Employee Management (PIM)

## Module name
Employee Management — Personal Information Management (EMP)

## User story / requirement IDs covered
- EMP-SEARCH-001
- EMP-ADD-001
- EMP-EDIT-001
- EMP-DELETE-001
- EMP-FILTER-001
- EMP-FILTER-002
- EMP-FILTER-003
- EMP-FILTER-004
- EMP-FILTER-005
- EMP-FILTER-006
- EMP-FILTER-007
- EMP-VALIDATE-001
- EMP-LOGIN-001
- EMP-CONTACT-001
- EMP-EMERGENCY-001
- EMP-JOB-001
- EMP-TERM-001
- EMP-REPORT-TO-001
- EMP-REPORT-TO-002
- EMP-REPORT-TO-003
- EMP-REPORT-TO-004
- EMP-QUAL-001
- EMP-DEPENDANT-001
- EMP-SALARY-001
- EMP-MEMBERSHIP-001
- EMP-IMMIGRATION-001
- EMP-PHOTO-001
- EMP-CUSTOM-001
- EMP-CUSTOM-002
- EMP-REPORTS-001

## Business intent
The PIM (Personal Information Management) module is the core HR record system. Admins create and
maintain employee records covering identity, contact details, job title, department, and employment
status. The employee list is the primary navigation surface for all HR workflows; other modules
(Leave, Recruitment, Payroll) reference employee records by ID. Accurate, searchable employee data
is a prerequisite for every downstream HR process.

## User roles involved
- Admin — full CRUD on all employee records
- ESS — read-only access to own record via "My Info"; cannot view other employees
- Supervisor — read access to direct reports; no create/delete access

## Key routes
| Route | Purpose |
|---|---|
| `/web/index.php/pim/viewEmployeeList` | Employee list with search/filter |
| `/web/index.php/pim/addEmployee` | Add new employee form |
| `/web/index.php/pim/viewPersonalDetails/empNumber/{id}` | Personal Details tab |
| `/web/index.php/pim/viewContactDetails/empNumber/{id}` | Contact Details tab |
| `/web/index.php/pim/viewEmergencyContacts/empNumber/{id}` | Emergency Contacts tab |
| `/web/index.php/pim/viewDependants/empNumber/{id}` | Dependants tab |
| `/web/index.php/pim/viewJobDetails/empNumber/{id}` | Job tab (title, department, status, location) |
| `/web/index.php/pim/viewSalaryList/empNumber/{id}` | Salary tab |
| `/web/index.php/pim/viewReportTo/empNumber/{id}` | Report-To tab (supervisor/subordinate) |
| `/web/index.php/pim/viewQualifications/empNumber/{id}` | Qualifications tab (education, skills, languages, licenses, work experience) |
| `/web/index.php/pim/viewMembership/empNumber/{id}` | Memberships tab |
| `/web/index.php/pim/viewImmigration/empNumber/{id}` | Immigration tab (passport, visa records) |
| `/web/index.php/pim/viewDefinedPredefinedReports` | PIM Reports list (custom and predefined reports) |
| `/web/index.php/pim/defineReport` | Define (create) a new PIM report |
| `/web/index.php/pim/defineCustomFields` | PIM Configuration — Custom Fields management |
| `/web/index.php/pim/viewTerminationReasons` | PIM Configuration — Termination Reasons (preconfiguration) |

## Key API endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/v2/pim/employees` | List employees (`nameOrId`, `employeeId`, `departmentId`, `empStatusId`, `jobTitleId` query params) |
| POST | `/api/v2/pim/employees` | Create a new employee record |
| GET | `/api/v2/pim/employees/{id}` | Retrieve a single employee record |
| PUT | `/api/v2/pim/employees/{id}/personal-details` | Update personal details |
| DELETE | `/api/v2/pim/employees` | Bulk delete; body: `{ ids: [id, …] }` |
| PUT | `/api/v2/pim/employees/{id}/contact-details` | Update contact details (address, phone, work/home email) |
| GET | `/api/v2/pim/employees/{id}/emergency-contacts` | List emergency contacts |
| POST | `/api/v2/pim/employees/{id}/emergency-contacts` | Add an emergency contact |
| DELETE | `/api/v2/pim/employees/{id}/emergency-contacts` | Bulk delete emergency contacts |
| GET | `/api/v2/pim/employees/{id}/dependants` | List dependants |
| POST | `/api/v2/pim/employees/{id}/dependants` | Add a dependant |
| DELETE | `/api/v2/pim/employees/{id}/dependants` | Bulk delete dependants |
| GET | `/api/v2/pim/employees/{id}/job-details` | Retrieve job details |
| PUT | `/api/v2/pim/employees/{id}/job-details` | Update job details (title, employment status, department, location, joined date) |
| GET | `/api/v2/pim/employees/{id}/salary-components` | List salary components |
| POST | `/api/v2/pim/employees/{id}/salary-components` | Add a salary component |
| DELETE | `/api/v2/pim/employees/{id}/salary-components` | Bulk delete salary components |
| GET | `/api/v2/pim/employees/{id}/report-to` | List supervisor/subordinate assignments |
| POST | `/api/v2/pim/employees/{id}/report-to` | Add a supervisor or subordinate assignment |
| DELETE | `/api/v2/pim/employees/{id}/report-to` | Delete a report-to assignment |
| GET | `/api/v2/pim/employees/{id}/qualifications/educations` | List education records |
| POST | `/api/v2/pim/employees/{id}/qualifications/educations` | Add an education record |
| DELETE | `/api/v2/pim/employees/{id}/qualifications/educations` | Bulk delete education records |
| GET | `/api/v2/pim/employees/{id}/qualifications/skills` | List skills |
| POST | `/api/v2/pim/employees/{id}/qualifications/skills` | Add a skill |
| GET | `/api/v2/pim/employees/{id}/qualifications/languages` | List languages |
| POST | `/api/v2/pim/employees/{id}/qualifications/languages` | Add a language |
| GET | `/api/v2/pim/employees/{id}/qualifications/licenses` | List licenses |
| POST | `/api/v2/pim/employees/{id}/qualifications/licenses` | Add a license |
| GET | `/api/v2/pim/employees/{id}/memberships` | List memberships |
| POST | `/api/v2/pim/employees/{id}/memberships` | Add a membership |
| DELETE | `/api/v2/pim/employees/{id}/memberships` | Bulk delete memberships |
| GET | `/api/v2/pim/employees/{id}/immigration-records` | List immigration documents |
| POST | `/api/v2/pim/employees/{id}/immigration-records` | Add an immigration document |
| DELETE | `/api/v2/pim/employees/{id}/immigration-records` | Bulk delete immigration records |
| PUT | `/api/v2/pim/employees/{id}/job-details` | Includes termination payload (terminationId, terminationDate, note) when terminating |
| GET | `/api/v2/pim/employees/{id}/report-to` | List supervisor and subordinate assignments (type differentiates supervisor vs subordinate) |
| PUT | `/api/v2/pim/employees/{id}/report-to/{assignmentId}` | Edit the reporting method of an existing supervisor/subordinate assignment |
| DELETE | `/api/v2/pim/employees/{id}/report-to` | Remove supervisor or subordinate assignments; body: `{ ids: [assignmentId, …] }` |

## Key selectors (observable, role/label-based)
| Element | Recommended locator strategy |
|---|---|
| Search by name/ID input | `getByPlaceholder('Type for hints…')` (employee name search) |
| Employment Status filter | `getByLabel('Employment Status')` (select within search panel) |
| Job Title filter | `getByLabel('Job Title')` (select within search panel) |
| Sub-Unit (Department) filter | `getByLabel('Sub Unit')` (select within search panel) |
| Search button | `getByRole('button', { name: /search/i })` |
| Add employee button | `getByRole('button', { name: /add/i })` |
| First name input | `getByRole('textbox', { name: /first name/i })` |
| Last name input | `getByRole('textbox', { name: /last name/i })` |
| Employee ID input | `getByLabel('Employee Id')` |
| Save button | `getByRole('button', { name: /save/i })` |
| Employee table rows | `getByRole('row')` within the employee list table |
| Delete confirmation | `getByRole('button', { name: /yes, delete/i })` |
| Employee profile tabs | `getByRole('link', { name: /personal details|contact details|emergency contacts|dependants|job|salary|tax exemptions|report-to|qualifications|memberships|immigration/i })` |
| Sub-section Add button | `getByRole('button', { name: /add/i })` within the active tab panel |
| Sub-section table rows | `getByRole('row')` within the active tab panel |
| Work email input | `getByLabel('Work Email')` |
| Home email input | `getByLabel('Home Email')` |
| Work telephone input | `getByLabel('Work Telephone')` |
| Supervisor search input | `getByPlaceholder('Type for hints…')` within Report-To section |
| Reporting method select | `getByLabel('Reporting Method')` |
| Job Title select | `getByLabel('Job Title')` within Job tab |
| Employment Status select | `getByLabel('Employment Status')` within Job tab |
| Sub Unit select | `getByLabel('Sub Unit')` within Job tab |
| Location select | `getByLabel('Location')` within Job tab |
| Joined Date input | `getByLabel('Joined Date')` |
| Profile photo upload | `getByRole('button', { name: /change photo/i })` or file input within photo widget |
| Success toast | `getByRole('status')` or `.oxd-toast--success` |
| Validation error message | `.oxd-input-field-error-message` |
| Create Login Details toggle | `getByRole('checkbox', { name: /create login details/i })` on Add Employee page |
| Username input (login details) | `getByRole('textbox', { name: /username/i })` within the login details section |
| Password input (login details) | `getByLabel('Password')` within the login details section |
| Login Status select | `getByLabel('Status')` within the login details section |
| Terminate Employee button | `getByRole('button', { name: /terminate employment/i })` on the Job tab |
| Termination Reason select | `getByLabel('Reason')` in the termination dialog |
| Termination Date input | `getByLabel('Date')` in the termination dialog |
| Termination Note input | `getByRole('textbox', { name: /note/i })` in the termination dialog |
| Confirm termination button | `getByRole('button', { name: /confirm/i })` in the termination dialog |
| Include filter (employee list) | `getByLabel('Include')` in the Employee List search panel |
| Employee ID filter | `getByLabel('Employee Id')` in the Employee List search panel (distinct from the Employee ID field on the Add Employee form) |
| Supervisor Name filter | `getByRole('textbox')` autocomplete within Supervisor Name filter row |
| Reset button (employee list) | `getByRole('button', { name: /reset/i })` in the Employee List search panel |
| Custom Fields Add button | `getByRole('button', { name: /add/i })` on the Custom Fields configuration page |
| Custom Field Name input | `getByLabel('Field Name')` in the Add Custom Field dialog |
| Custom Field Screen select | `getByLabel('Screen')` in the Add Custom Field dialog |
| Custom Field Type select | `getByLabel('Type')` in the Add Custom Field dialog |
| PIM Reports Add button | `getByRole('button', { name: /add/i })` on the PIM Reports list page |
| Report Name input | `getByLabel('Report Name')` or `getByRole('textbox', { name: /report name/i })` |
| Include (active/inactive) select | `getByLabel('Include')` within the Define Report form |
| Display Field Groups select | `getByLabel('Display Field Groups')` in the Define Report form |
| Display Fields select | `getByLabel('Display Fields')` in the Define Report form |

## Edge cases to test
- Search with a partial name must return only matching results; empty results must show the "No Records Found" state
- Combining multiple search filters (Employment Status + name) must narrow results correctly
- Adding an employee with a duplicate Employee ID must surface a validation error, not silently overwrite
- Required fields (First Name, Last Name) must block save when empty and show inline validation errors
- Deleting an employee who has pending leave requests should be deferred to regression scope; the outcome depends on application business rules that need owner confirmation
- ESS user navigating to `/pim/viewEmployeeList` should be redirected or shown an access-denied page (out of scope for Admin-only requirements)
- Emergency contacts and dependants are not blocked from deletion even when the employee has active HR records
- The Salary tab requires at least one Pay Grade to be configured in Admin before a salary component can be added; tests should use an existing configured pay grade from the demo instance or skip if none exist
- The Memberships tab requires at least one Membership type configured in Admin; tests should use an existing membership from the demo instance
- Termination reasons must be preconfigured under PIM > Configuration > Termination Reasons before a termination test can execute; tests should use an existing termination reason from the demo instance
- When a termination date is in the future, the employee remains active in the system until that date is reached; a current-date termination removes the employee from the current employee list immediately
- Custom Fields are limited to 10 per OrangeHRM instance; test setup must verify headroom exists before attempting to create a custom field; teardown must delete the custom field after the test
- Custom fields cannot be deleted if any employee has data saved in that field; the delete test must use a freshly created custom field with no employee data
- Reporting Methods must be preconfigured under PIM > Configuration > Reporting Methods before any Report-To tests execute
- The Report-To endpoint and UI treat supervisor vs subordinate as a `type` discriminator; adding a subordinate is symmetric to adding a supervisor but targets the Assigned Subordinates section

## Documented gaps
- **Tax Exemptions tab**: The tab exists in OrangeHRM PIM but is a US W-4 form that only renders when the demo instance's nationality/region configuration is set to US. Validation of its presence on the demo instance is pending owner confirmation; no requirement is written for it.
- **Work Experience sub-tab** (under Qualifications): Exists in OrangeHRM but adding it would duplicate education-record coverage at P2; deferred to a future sprint unless the owner requests it.
- **Profile photo deletion**: OrangeHRM does not have a separate delete photo action; the photo is replaced by uploading a new one. No explicit delete requirement is written.
- **Custom Fields — Edit**: The spec states custom fields can be edited by selecting a field from the list, but the editable fields and save behavior are not described in sufficient detail to write a verifiable acceptance criterion without owner confirmation. Deferred.
- **Sorting the employee list by column header**: The spec mentions clicking column headers sorts alphabetically. No requirement written; behavior is native browser/framework table sorting with no distinct API call.
- **Searching PIM Reports by Report Name**: Covered as a secondary step within EMP-REPORTS-001 (the report must appear in the list after creation, where the Report Name filter is used to locate it). No standalone requirement needed.
- **Remove Subordinate**: Symmetric to Remove Supervisor (EMP-REPORT-TO-004). The spec describes identical steps. Owner may choose to combine into one test or add a separate requirement. Documented here to avoid silent omission.

## Known risks / constraints
- The demo instance is shared: employees created by other users may appear in search results; tests must search by the specific name/ID created within the test run
- Synthetic employee data must follow a naming convention that makes cleanup safe (e.g. a unique prefix such as "AutoTest_")
- Cleanup strategy: DELETE via API after test; failure-safe cleanup must be registered in an `afterEach` or teardown fixture
- Employee ID auto-generated by the application; specs must capture it from the API response or UI after creation
- Sub-section records (emergency contacts, dependants, qualifications, etc.) created during tests must be deleted via API in the same teardown hook that deletes the parent employee record; the parent employee DELETE cascades these records server-side, so a single employee DELETE is sufficient for cleanup
