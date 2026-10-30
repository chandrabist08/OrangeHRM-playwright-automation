# Module Context — Authentication

## Module name
Authentication (AUTH)

## User story / requirement IDs covered
- AUTH-LOGIN-001
- AUTH-LOGIN-002
- AUTH-LOGOUT-001

## Business intent
Allow authorized users (Admin, ESS, Supervisor) to securely access OrangeHRM using session/cookie
authentication. The login gate enforces role-based access: each role sees a different dashboard and
menu after a successful login. Failed attempts must surface a visible error without disclosing which
credential is wrong. Logout must invalidate the session and redirect to the login page.

## User roles involved
- Admin — primary role for managing the system; lands on the Admin dashboard after login
- ESS (Employee Self Service) — lands on the ESS dashboard with limited menu
- Supervisor — lands on the Supervisor dashboard with team-scoped menu

## Key routes
| Route | Purpose |
|---|---|
| `/web/index.php/auth/login` | Login form (GET renders form, POST submits credentials) |
| `/web/index.php/dashboard/index` | Post-login landing page for Admin |
| `/web/index.php/auth/logout` | Session termination; redirects to `/auth/login` |

## Key API endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/web/index.php/auth/validate` | Validates credentials; issues session cookie on success |

## Key selectors (observable, role/label-based)
| Element | Recommended locator strategy |
|---|---|
| Username input | `getByRole('textbox', { name: /username/i })` or `getByPlaceholder('Username')` |
| Password input | `getByRole('textbox', { name: /password/i })` or `getByPlaceholder('Password')` |
| Login button | `getByRole('button', { name: /login/i })` |
| Error message | `getByRole('alert')` or text containing "Invalid credentials" |
| User dropdown (logged in) | `getByRole('banner').getByRole('img', { name: /profile/i })` |
| Logout menu item | `getByRole('menuitem', { name: /logout/i })` |

## Edge cases to test
- Submitting an empty form should surface field validation messages, not a server error
- Incorrect username or password returns "Invalid credentials" (no hint about which field is wrong)
- After logout, pressing browser Back should not re-enter the authenticated area
- Session cookie must be present after a successful login and absent after logout
- The demo instance is shared; tests must never change the admin password or lock the account

## Known risks / constraints
- The demo site (opensource-demo.orangehrmlive.com) is publicly shared and may be slow or
  intermittently reset by third parties; network timeouts are possible
- Credentials must come from CI secrets / `.env` — never hardcoded in specs
- Auth state is persisted via Playwright `storageState`; the setup project must run before any
  authenticated spec
- Smoke tests against the login page are read-only (no credential mutations)
