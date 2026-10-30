# Module Context — Leave Management

## Module name
Leave Management (LEAVE)

## User story / requirement IDs covered
- LEAVE-BALANCE-001
- LEAVE-APPLY-001
- LEAVE-APPROVE-001
- LEAVE-REJECT-001

## Business intent
The Leave Management module tracks employee absence entitlements, applications, approvals, and
rejections. ESS employees apply for leave against their entitlement balance. Supervisors and Admins
review and approve or reject requests. Leave type configuration (annual, sick, casual, etc.) is an
Admin-only function. The leave calendar gives managers visibility over team absence. Accurate leave
data feeds payroll and attendance calculations.

## User roles involved
- Admin — configure leave types and entitlements; view all leave requests; approve/reject any request
- ESS — view own leave balance; submit leave applications; view own application history
- Supervisor — view leave requests of direct reports; approve or reject team leave

## Key routes
| Route | Purpose |
|---|---|
| `/web/index.php/leave/viewLeaveList` | Admin/Supervisor: list of all leave requests with filters |
| `/web/index.php/leave/viewMyLeaveList` | ESS: own leave request history |
| `/web/index.php/leave/applyLeave` | ESS: apply for leave form |
| `/web/index.php/leave/viewLeaveEntitlement` | Admin: view/manage leave entitlements |
| `/web/index.php/leave/viewLeaveCalendar` | Calendar view of team leave |

## Key API endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/v2/leave/leave-types` | List available leave types |
| GET | `/api/v2/leave/employees/{empNumber}/leave-entitlements` | Retrieve entitlement (balance) for an employee |
| POST | `/api/v2/leave/employees/{empNumber}/leave-requests` | Submit a leave application |
| GET | `/api/v2/leave/employees/{empNumber}/leave-requests` | List leave requests for an employee |
| PUT | `/api/v2/leave/employees/{empNumber}/leave-requests/{id}` | Update leave request status (approve/reject) |

## Key selectors (observable, role/label-based)
| Element | Recommended locator strategy |
|---|---|
| Leave type dropdown | `getByRole('combobox', { name: /leave type/i })` |
| From date input | `getByRole('textbox', { name: /from date/i })` |
| To date input | `getByRole('textbox', { name: /to date/i })` |
| Apply / Submit button | `getByRole('button', { name: /apply/i })` |
| Approve button (in request row) | `getByRole('button', { name: /approve/i })` |
| Reject button (in request row) | `getByRole('button', { name: /reject/i })` |
| Leave balance table | `getByRole('table')` within the entitlement page |
| Success toast / alert | `getByRole('alert')` |

## Edge cases to test
- Applying for leave on a date when the employee already has an approved leave must surface a conflict error
- Applying for leave exceeding the remaining balance must surface a balance-exceeded warning
- Weekend/holiday dates selected in the leave form should display appropriate warnings per the work schedule
- An ESS user cannot approve or reject leave (role-based access control)
- Admin approving a leave request that has already been cancelled must handle the stale-state gracefully
- Leave balance must reflect correctly after an approved leave is cancelled

## Known risks / constraints
- The demo instance resets periodically; leave entitlements may be at zero if the demo data is reset — balance checks should be validated against API response, not hardcoded values
- Leave application is a mutating operation; tests must clean up created leave requests after execution
- Cleanup strategy: cancel or delete the leave request via API in test teardown
- SMOKE tests must not submit leave applications; balance read is the smoke-safe boundary
- Date inputs on OrangeHRM use a custom date picker; raw `fill()` may not work — the helper must interact with the picker widget
