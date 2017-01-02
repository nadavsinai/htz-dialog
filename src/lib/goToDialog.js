import dispatchEvent from './htz-dispatch-event';
/**
 * Unhide and focus a dialog window.
 * Focuses the first dialog window inside the wrapper by default.
 *
 * @param {array} the current dialogs state
 * @param {Number} [goToIndex=0] The index number of the dialog window to
 *    reveal in the `dialogs` array.
 *
 * @fires module:htz-dialog#dialog:focus-dialog-window-before
 * @fires module:htz-dialog#dialog:focus-dialog-window-after
 *
 * @return {HTMLElement} The focused dialog window.
 *
 * @private
 */
export function goToDialog(goToIndex = 0) {
  const goToElem = this.dialogs[goToIndex];

  /**
   * Fired whenever a dialog  window is focused.
   * Stops execution if any of its handlers calls `event.preventDefault`
   * @event module:htz-dialog#dialog:focus-dialog-before
   * @type {Object}
   * @prop {Object} details
   * @prop {HTMLElement} details.wrapper - The wrapper element
   * @prop {HTMLElement} details.dialog - The focused dialog window
   */
  const allowed = dispatchEvent(this.wrapper, 'dialog:focus-dialog-before', {
    wrapper: this.wrapper,
    dialog: goToElem,
  });

  if (allowed) {
    if (goToElem) {
      goToElem.removeAttribute('aria-hidden');
      goToElem.focus();

      if (this.visibleDialogIndex > -1) {
        this.dialogs[this.visibleDialogIndex].setAttribute('aria-hidden', 'true');
      }

      this.visibleDialogIndex = goToIndex;

      /**
       * Fired whenever a dialog  window is focused.
       * @event module:htz-dialog#dialog:focus-dialog-after
       * @type {Object}
       * @prop {Object} details
       * @prop {HTMLElement} details.wrapper - The wrapper element
       * @prop {HTMLElement} details.dialog - The focused dialog window
       */
      dispatchEvent(this.wrapper, 'dialog:focus-dialog-after', {
        wrapper: this.wrapper,
        dialog: goToElem,
      });

      return goToElem;
    }
  }

  return undefined;
}
