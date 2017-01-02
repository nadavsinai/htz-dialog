import dispatchEvent from './htz-dispatch-event';
/**
 * Reveal a dialog window.
 *
 * @callback module:htz-dialog#show
 * @fires module:htz-dialog#dialog:show-before
 * @fires module:htz-dialog#dialog:show-after
 */
export function show() {
  /**
   * Fired whenever a dialog is being opened.
   * Stops execution if any of its handlers calls `event.preventDefault`
   * @event module:htz-dialog#dialog:show-before
   * @type {Object}
   * @prop {Object} details
   * @prop {HTMLElement} details.dialog - The opened dialog wrapper
   */
  const allowed = dispatchEvent(this.wrapper, 'dialog:show-before', {
    dialog: this.wrapper,
  });

  if (allowed) {
    this.isVisible = true;
    this.wrapper.removeAttribute('aria-hidden');

    this.focusOnClose = document.activeElement;
    this.goToDialog(0);

    this.elemToConceal.setAttribute('aria-hidden', 'true');

    document.body.addEventListener('focus', this.hideWhenFocusLost, true);
    document.body.addEventListener('mousedown', this.hideWhenFocusLost);

    /**
     * Fired whenever a dialog is being opened.
     * @event module:htz-dialog#dialog:show-after
     * @type {Object}
     * @prop {Object} details
     * @prop {HTMLElement} details.dialog - The opened dialog wrapper
     */
    dispatchEvent(this.wrapper, 'dialog:show-after', {
      dialog: this.wrapper,
    });
  }
}
