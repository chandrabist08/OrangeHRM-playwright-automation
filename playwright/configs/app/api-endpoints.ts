export const API_ENDPOINTS = {
  auth: {
    login: '/api/v2/auth/login',
  },
  pim: {
    employees: '/api/v2/pim/employees',
    employee: (id: number) => `/api/v2/pim/employees/${id}`,
    personalDetails: (id: number) => `/api/v2/pim/employees/${id}/personal-details`,
    contactDetails: (id: number) => `/api/v2/pim/employees/${id}/contact-details`,
    emergencyContacts: (id: number) => `/api/v2/pim/employees/${id}/emergency-contacts`,
    dependants: (id: number) => `/api/v2/pim/employees/${id}/dependants`,
    jobDetails: (id: number) => `/api/v2/pim/employees/${id}/job-details`,
    salaryComponents: (id: number) => `/api/v2/pim/employees/${id}/salary-components`,
    reportTo: (id: number) => `/api/v2/pim/employees/${id}/report-to`,
    reportToAssignment: (id: number, assignmentId: number) =>
      `/api/v2/pim/employees/${id}/report-to/${assignmentId}`,
    qualificationsEducation: (id: number) =>
      `/api/v2/pim/employees/${id}/qualifications/educations`,
    qualificationsSkills: (id: number) => `/api/v2/pim/employees/${id}/qualifications/skills`,
    qualificationsLanguages: (id: number) => `/api/v2/pim/employees/${id}/qualifications/languages`,
    qualificationsLicenses: (id: number) => `/api/v2/pim/employees/${id}/qualifications/licenses`,
    memberships: (id: number) => `/api/v2/pim/employees/${id}/memberships`,
    immigrationRecords: (id: number) => `/api/v2/pim/employees/${id}/immigration-records`,
  },
} as const;

export type ApiEndpoints = typeof API_ENDPOINTS;
