/**
 * Auth / login screen selectors for OrangeHRM.
 * All values are plain strings consumed by helpers with:
 *   getByPlaceholder()  — form field placeholders
 *   getByRole()         — button and landmark roles
 *   getByText()         — visible text assertions
 */
export const LOGIN_UI = {
  /** getByPlaceholder(LOGIN_UI.usernamePlaceholder) */
  usernamePlaceholder: 'Username',
  /** getByPlaceholder(LOGIN_UI.passwordPlaceholder) */
  passwordPlaceholder: 'Password',
  /** getByRole('button', { name: LOGIN_UI.loginButtonName }) */
  loginButtonName: 'Login',
  /** getByRole('alert') → expected to contain this text on failure */
  invalidCredentialsText: 'Invalid credentials',
  /** getByRole('heading') → visible after a successful login */
  dashboardHeading: 'Dashboard',
} as const;

export type LoginUi = typeof LOGIN_UI;
