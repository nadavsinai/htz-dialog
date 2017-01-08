import dispatchEvent from 'htz-dispatch-event';
import { show, hide } from './show-hide';
export class DialogState {

  focusOnClose;
  isVisible = false;
  visibleDialogIndex = -1;
  elemToConceal;
  visibleDialog;

  // pre bound functions - to help with invoking as event handlers and moving those from prototype to instance level
  show = show.bind(this);
  hide = hide.bind(this);
  next = this.next.bind(this);
  prev = this.prev.bind(this);

  constructor(wrapper, dialogs) {
    // Ensure `wrapper` has an id attribute
    this.wrapper = wrapper;
    this.wrapperId = wrapper.id || `dialog${Math.random()}`;
    this.dialogs = dialogs;


    // Determine element to hide
  }

  /**
   * Unhide and focus a dialog window.
   * Focuses the first dialog window inside the wrapper by default.
   *
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
  goToDialog(goToIndex = 0) {
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

  /**
   * Close the dialog if it no longer has focus (i.e., when user clicks outside it).
   *
   * @param {Object} evt - An event object
   *
   * @private
   */
  hideWhenFocusLost(evt) {
    // when handling click events, only handle left clicks
    if (!evt.button && this.isVisible && !(this.wrapper.contains(evt.target))) {
      evt.preventDefault();
      this.hide();
    }
  }

  /**
   * Go to next dialog within a wrapper
   *
   * @callback module:htz-dialog#next
   *
   * @return {HTMLElement} The focused dialog window.
   */
  next() {
    return this.goToDialog(this.visibleDialogIndex + 1);
  }

  /**
   * Go to prev dialog within a dialog
   *
   * @callback module:htz-dialog#prev
   *
   * @return {HTMLElement} The focused dialog window.
   */
  prev() {
    return this.goToDialog(this.visibleDialogIndex - 1);
  }


}
