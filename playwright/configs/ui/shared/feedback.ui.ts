/**
 * Shared feedback / notification selectors for OrangeHRM.
 *
 * IMPORTANT — shape contract:
 *   The existing ui.helpers.ts reads `Object.values(FEEDBACK_SELECTORS)[0]` and
 *   expects a string (the primary toast CSS class). The first key MUST therefore
 *   be a top-level string value.
 *
 * Use with:
 *   getByText()  — partial text match on toast message (successToastText)
 *   locator()    — CSS class selectors
 *   getByRole()  — dialog roles
 */
export const FEEDBACK_SELECTORS = {
  /** Primary toast locator (CSS). Used by ui.helpers as Object.values(...)[0]. */
  toastSuccess: '.oxd-toast--success',
  toastError: '.oxd-toast--error',
  /**
   * Partial text that appears in every success toast.
   * Use: page.getByText(FEEDBACK_SELECTORS.successToastText)
   */
  successToastText: 'Successfully',
  /**
   * Inline field-level validation error CSS class.
   * Use: page.locator(FEEDBACK_SELECTORS.validationError)
   */
  validationError: '.oxd-input-field-error-message',
  /** Text for required field validation messages */
  requiredText: 'Required',
  /** OXD spinner CSS class — wait for this to disappear before asserting */
  spinner: '.oxd-loading-spinner',
  /** getByRole('button') — confirm delete inside dialog */
  confirmDeleteButton: 'Yes, Delete',
  /** getByRole('button') — cancel inside dialog */
  cancelButton: 'No, Cancel',
} as const;

export type FeedbackSelectors = typeof FEEDBACK_SELECTORS;
