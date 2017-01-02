/**
 * Go to next dialog within a wrapper
 *
 * @callback module:htz-dialog#next
 *
 * @return {HTMLElement} The focused dialog window.
 */
export function next() {
  return this.goToDialog(this.visibleDialogIndex + 1);
}

/**
 * Go to prev dialog within a dialog
 *
 * @callback module:htz-dialog#prev
 *
 * @return {HTMLElement} The focused dialog window.
 */
export function prev() {
  return this.goToDialog(this.visibleDialogIndex - 1);
}
