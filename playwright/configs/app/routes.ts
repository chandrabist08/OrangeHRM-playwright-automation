export const ROUTES = {
  auth: {
    login: '/web/index.php/auth/login',
    dashboard: '/web/index.php/dashboard/index',
  },
  pim: {
    employeeList: '/web/index.php/pim/viewEmployeeList',
    addEmployee: '/web/index.php/pim/addEmployee',
    personalDetails: (empNumber: number) =>
      `/web/index.php/pim/viewPersonalDetails/empNumber/${empNumber}`,
    contactDetails: (empNumber: number) =>
      `/web/index.php/pim/viewContactDetails/empNumber/${empNumber}`,
    emergencyContacts: (empNumber: number) =>
      `/web/index.php/pim/viewEmergencyContacts/empNumber/${empNumber}`,
    dependants: (empNumber: number) => `/web/index.php/pim/viewDependants/empNumber/${empNumber}`,
    jobDetails: (empNumber: number) => `/web/index.php/pim/viewJobDetails/empNumber/${empNumber}`,
    salary: (empNumber: number) => `/web/index.php/pim/viewSalaryList/empNumber/${empNumber}`,
    reportTo: (empNumber: number) => `/web/index.php/pim/viewReportTo/empNumber/${empNumber}`,
    qualifications: (empNumber: number) =>
      `/web/index.php/pim/viewQualifications/empNumber/${empNumber}`,
    memberships: (empNumber: number) => `/web/index.php/pim/viewMembership/empNumber/${empNumber}`,
    immigration: (empNumber: number) => `/web/index.php/pim/viewImmigration/empNumber/${empNumber}`,
    customFields: '/web/index.php/pim/defineCustomFields',
    defineReport: '/web/index.php/pim/defineReport',
    reports: '/web/index.php/pim/viewDefinedPredefinedReports',
    terminationReasons: '/web/index.php/pim/viewTerminationReasons',
  },
  leave: {
    leaveList: '/web/index.php/leave/viewLeaveList',
  },
  recruitment: {
    vacancies: '/web/index.php/recruitment/viewJobVacancy',
    addVacancy: '/web/index.php/recruitment/addJobVacancy',
    candidates: '/web/index.php/recruitment/viewCandidates',
  },
} as const;

export type Routes = typeof ROUTES;

// Re-export API_ENDPOINTS so existing helpers that import from this module continue to work.
export { API_ENDPOINTS } from './api-endpoints.js';
