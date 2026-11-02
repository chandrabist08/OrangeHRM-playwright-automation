# Project Context — OrangeHRM

## Application name
OrangeHRM

## Tech stack
- Frontend: PHP-based web application
- Auth: Session/cookie-based login
- API: REST API v2

## Authentication method
Session/cookie login via `/web/index.php/auth/login`.
Auth state stored via Playwright `storageState` — never login inside `beforeEach`.

## Key user roles
- **Admin** — full system access (HR configuration, user management), admin can perform all type of functionality available in the system


## Base URL (staging)
https://opensource-demo.orangehrmlive.com

## API base URL
https://opensource-demo.orangehrmlive.com/web/index.php/api/v2

## Known constraints
- Demo instance is shared and publicly accessible — no PII or real data
- Test data must be created fresh per test and cleaned up on failure
- Credentials sourced from CI secrets / `.env` — never hardcoded in specs
- Production smoke tests must be read-only (no mutations on shared demo data)
- Modules in scope to be confirmed during GATHER phase
