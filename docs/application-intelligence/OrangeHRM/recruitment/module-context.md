# Module Context — Recruitment

## Module name
Recruitment (RECRUIT)

## User story / requirement IDs covered
- RECRUIT-VACANCY-001
- RECRUIT-VACANCY-ADD-001
- RECRUIT-CANDIDATE-001

## Business intent
The Recruitment module manages the end-to-end hiring pipeline: publishing job vacancies, collecting
candidate applications, and progressing candidates through interview and offer stages. Admins and HR
Managers create vacancies linked to job titles and hiring managers. Candidates apply via external
links or are added manually. Interviewers are tracked per vacancy. The module feeds new hire data
into the PIM module when a candidate is converted to an employee.

## User roles involved
- Admin — create/edit/delete vacancies; view and manage all candidates; advance candidate stages
- ESS — no access to Recruitment; only Admin/HR roles can view this module

## Key routes
| Route | Purpose |
|---|---|
| `/web/index.php/recruitment/viewJobVacancy` | List active job vacancies |
| `/web/index.php/recruitment/addJobVacancy` | Create new vacancy form |
| `/web/index.php/recruitment/viewCandidates` | List candidates across all vacancies |
| `/web/index.php/recruitment/addCandidate` | Manually add a candidate |
| `/web/index.php/recruitment/viewCandidateProfile/id/{id}` | Candidate profile and stage history |

## Key API endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/v2/recruitment/vacancies` | List vacancies (supports `status`, `jobTitleId` filters) |
| POST | `/api/v2/recruitment/vacancies` | Create a new job vacancy |
| GET | `/api/v2/recruitment/vacancies/{id}` | Retrieve a single vacancy |
| DELETE | `/api/v2/recruitment/vacancies` | Bulk delete vacancies; body: `{ ids: [id, …] }` |
| GET | `/api/v2/recruitment/candidates` | List candidates (supports `vacancyId`, `status` filters) |
| POST | `/api/v2/recruitment/candidates` | Add a candidate manually |
| GET | `/api/v2/recruitment/candidates/{id}` | Retrieve a single candidate profile |

## Key selectors (observable, role/label-based)
| Element | Recommended locator strategy |
|---|---|
| Add vacancy button | `getByRole('button', { name: /add/i })` |
| Vacancy name input | `getByRole('textbox', { name: /vacancy name/i })` |
| Job title dropdown | `getByRole('combobox', { name: /job title/i })` |
| Hiring manager input | `getByRole('textbox', { name: /hiring manager/i })` |
| Save button | `getByRole('button', { name: /save/i })` |
| Vacancy list rows | `getByRole('row')` within the vacancy table |
| Candidate search filters | `getByRole('combobox', { name: /vacancy/i })` |
| Status badge | `getByRole('cell')` matching the status column |

## Edge cases to test
- Creating a vacancy without a required Job Title must surface a validation error
- Vacancy name must be unique; duplicates should surface an appropriate message (behavior needs owner confirmation — currently a gap)
- Candidate list filtered by a vacancy that has no candidates should show the "No Records Found" state
- Deleting an active vacancy with candidates in pipeline — outcome and allowed behavior needs owner confirmation (currently a documented gap)
- ESS user navigating directly to `/recruitment/viewJobVacancy` should be redirected or access-denied

## Known risks / constraints
- Job title options in the vacancy form depend on Admin-configured job titles; the test must verify at least one job title exists before creating a vacancy
- Cleanup strategy: delete created vacancies via API DELETE after test; candidates linked to the vacancy should be deleted first
- The demo instance may have a large number of existing vacancies; tests must search/filter by the specific vacancy created within the test run
- Duplicate vacancy name behavior is not confirmed from documentation — marked as a gap; do not write a requirement for it until confirmed
