/**
 * Shared navigation selectors for the OrangeHRM top / side navigation.
 * Values are plain strings used by helpers with getByRole() / getByText().
 */
export const NAVIGATION_SELECTORS = {
  /** getByRole('link', { name }) — top-level sidebar menu items */
  menu: {
    admin: 'Admin',
    pim: 'PIM',
    leave: 'Leave',
    time: 'Time',
    recruitment: 'Recruitment',
    myInfo: 'My Info',
    performance: 'Performance',
    dashboard: 'Dashboard',
    directory: 'Directory',
    maintenance: 'Maintenance',
    buzz: 'Buzz',
  },
  /** getByRole / getByText — user menu in top-right */
  userMenu: {
    /** locator — OrangeHRM renders the user menu trigger as a <li> with this class */
    toggleLocator: 'li.oxd-userdropdown',
    /** getByRole('button') or getByAltText — opens dropdown */
    toggle: 'User Profile',
    /** getByRole('menuitem', { name }) */
    logout: 'Logout',
    /** getByRole('menuitem', { name }) */
    profile: 'My Profile',
    /** getByRole('menuitem', { name }) */
    changePassword: 'Change Password',
  },
} as const;

export type NavigationSelectors = typeof NAVIGATION_SELECTORS;
