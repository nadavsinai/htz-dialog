import dispatchEvent from 'htz-dispatch-event';
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

    if (this.elemToConceal) {
      this.elemToConceal.setAttribute('aria-hidden', 'true');
    }

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


/**
 * Hide a dialog window.
 *
 * @callback module:htz-dialog#hide
 * @fires module:htz-dialog#dialog:hide-before
 * @fires module:htz-dialog#dialog:hide-after
 */
export function hide() {
  /**
   * Fired whenever a dialog is being closed.
   * Stops execution if any of its handlers calls `event.preventDefault`
   * @event module:htz-dialog#dialog:hide-before
   * @type {Object}
   * @prop {Object} details
   * @prop {HTMLElement} details.dialog - The closed dialog wrapper
   */
  const allowed = dispatchEvent(this.wrapper, 'dialog:hide-before', {
    dialog: this.wrapper,
  });

  if (allowed) {
    const visibleDialog = this.dialogs[this.visibleDialogIndex];
    this.isVisible = false;
    this.elemToConceal.removeAttribute('aria-hidden');
    this.focusOnClose && this.focusOnClose.focus();

    this.visibleDialogIndex = -1;
    visibleDialog && visibleDialog.setAttribute('aria-hidden', 'true');
    this.wrapper.setAttribute('aria-hidden', 'true');
    document.body.removeEventListener('focus', this.hideWhenFocusLost, true);
    document.body.removeEventListener('mousedown', this.hideWhenFocusLost);

    /**
     * Fired whenever a dialog is being closed.
     * @event module:htz-dialog#dialog:hide-after
     * @type {Object}
     * @prop {Object} details
     * @prop {HTMLElement} details.dialog - The closed dialog wrapper
     */
    dispatchEvent(this.wrapper, 'dialog:hide-after', {
      dialog: this.wrapper,
    });
  }
}
