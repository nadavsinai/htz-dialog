/**
 * HTZ DIALOG
 *
 * Accessible dialog and modal windows
 * with JavaScript and DOM APIs
 *
 * @module htz-dialog
 * @license MIT
 */

import dispatchEvent from 'htz-dispatch-event';
import getFocusables from 'htz-get-focusables';


/**
 * Initialize a dialog.
 *
 * @param {HTMLElement} wrapper - A wrapper for the actual dialog window[s].
 * @param {String} [dialogClass='js-dialog'] - The class used
 *    as a javascript hook for dialog windows within the wrapper.
 * @param {HTMLElement} [elemToHide=document.getElementById('page-wrapper')]
 *    The element the dialog will cover.
 * @param {HTMLElement} [appendTo] - The element to append the dialog to, if any.
 *
 * @throws Will throw an error if the `wrapper` element does not have an `id` attribute.
 * @throws Will throw an error if the `appendTo` param is defined with anything but an Element.
 *
 * @return {module:htz-dialog~API} - An API for programatically handling the
 *    initialized dialog.
 */
export default function htzDialog(
  wrapper,
  dialogClass = 'js-dialog',
  elemToHide = document.getElementById('page-wrapper'),
  appendTo = undefined
) {
  // Fail fast if wrapper doesn't have an id or if `appendTo` is defined, but isn't an Element.
  if (!wrapper.id) throw new Error('Dialog wrapper elements must have an ID.');
  if (appendTo && !(appendTo instanceof Element)) {
    throw new Error('The `appendTo` param must be an Element. You provided a ${typeof appendTo}');
  }

  // Get all dialog windows within the dialog wrapper
  const dialogs = Array.from(wrapper.getElementsByClassName(dialogClass));

  // Hide dialog windows and make them programatically selectable
  dialogs.forEach((dialog) => {
    dialog
      .setAttribute('aria-hidden', 'true');
    dialog
      .setAttribute('tabindex', '-1');
  });


  // --- Process DOM API --- //

  // Determine element to hide
  const elemToHideId = wrapper.getAttribute('data-htz-dialog-elem-to-hide');

  // Determine if dialog should be moved elsewhere in the DOM
  const moveToId = wrapper.getAttribute('data-htz-dialog-append-to');
  const moveToElem = appendTo || moveToId ? document.getElementById(moveToId) : undefined;

  // Get all show, hide, next and prev buttons
  const showBtns = Array.from(document.querySelectorAll(`[data-htz-dialog-show="${wrapper.id}"]`));
  const nextBtns = Array.from(wrapper.querySelectorAll('[data-htz-dialog-next]'));
  const prevBtns = Array.from(wrapper.querySelectorAll('[data-htz-dialog-prev]'));
  const hideBtns = Array.from(document.querySelectorAll(`[data-htz-dialog-hide="${wrapper.id}"]`))
    .concat(Array.from(wrapper.querySelectorAll('[data-htz-dialog-hide]')));


  // Determine Which element is being concealed by the dialog
  const elemToConceal = document.getElementById(elemToHideId) || elemToHide;


  // State
  let isVisible = false;
  let visibleDialogIndex = -1;
  let focusOnClose = undefined;

  // Move dialog to correct DOM location
  if (moveToElem) moveToElem.appendChild(wrapper);


  // --- Private Functions --- //
  /**
   * Unhide and focus a dialog window.
   * Focuses the first dialog window inside the wrapper by default.
   *
   * @param {Number} [goToIndex=0] The index number of the dialog window to
   *    reveal in the `dialogs` array.
   *
   * @fires module:htz-dialog~dialog:focus-dialog-window
   *
   * @return {HTMLElement} The focused dialog window.
   *
   * @private
   */
  function goToDialog(goToIndex = 0) {
    const goToElem = dialogs[goToIndex];

    if (goToElem) {
      goToElem.removeAttribute('aria-hidden');
      goToElem.focus();

      if (visibleDialogIndex > -1) {
        dialogs[visibleDialogIndex].setAttribute('aria-hidden', 'true');
      }

      visibleDialogIndex = goToIndex;

      /**
      * Fired whenever a dialog  window is focused.
      * @event module:htz-dialog~dialog:focus-dialog
      * @type {Object}
      * @prop {Object} details
      * @prop {HTMLElement} details.wrapper - The wrapper element
      * @prop {HTMLElement} details.dialog - The focused dialog window
      */
      dispatchEvent(wrapper, 'dialog:focus-dialog', {
        wrapper,
        dialog: goToElem,
      });

      return goToElem;
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
  function hideWhenFocusLost(evt) {
    // when handling click events, only handle left clicks
    if (!evt.button && isVisible && !(wrapper.contains(evt.target))) {
      evt.preventDefault();
      hide();
    }
  }

  /**
   * Keep focus within an element when tabbing.
   *
   * @param {HTMLElement} container - The element to keep focus within
   * @param {Object} evt
   *    A [keyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
   *
   * @private
   */
  function keepFocus(container, evt) {
    const focusables = getFocusables(container);
    const focusedItem = document.activeElement;
    const firstItem = focusables[0];
    const lastItem = focusables[focusables.length - 1];

    if (evt.shiftKey && focusedItem === firstItem) {
      evt.preventDefault();
      lastItem && lastItem.focus();
    }
    else if (!evt.shiftKey && focusedItem === lastItem) {
      evt.preventDefault();
      firstItem && firstItem.focus();
    }
  }


  // --- JAVASCRIPT API --- //
  /**
   * Reveal a dialog window.
   *
   * @callback module:htz-dialog~show
   * @fires module:htz-dialog~dialog:show
   */
  function show() {
    isVisible = true;
    wrapper.removeAttribute('aria-hidden');

    focusOnClose = document.activeElement;
    goToDialog(0);

    elemToConceal.setAttribute('aria-hidden', 'true');


    document.body.addEventListener('focus', hideWhenFocusLost, true);
    document.body.addEventListener('mousedown', hideWhenFocusLost);

    /**
     * Fired whenever a dialog is being opened.
     * @event module:htz-dialog~dialog:show
     * @type {Object}
     * @prop {Object} details
     * @prop {HTMLElement} details.dialog - The opened dialog wrapper
     */
    dispatchEvent(wrapper, 'dialog:show', {
      dialog: wrapper,
    });
  }

  /**
   * Hide a dialog window.
   *
   * @callback module:htz-dialog~hide
   * @fires module:htz-dialog~dialog:hide
   */
  function hide() {
    const visibleDialog = dialogs[visibleDialogIndex];
    isVisible = false;
    elemToConceal.removeAttribute('aria-hidden');
    focusOnClose && focusOnClose.focus();

    visibleDialogIndex = -1;
    visibleDialog && visibleDialog.setAttribute('aria-hidden', 'true');
    wrapper.setAttribute('aria-hidden', 'true');
    document.body.removeEventListener('focus', hideWhenFocusLost, true);
    document.body.removeEventListener('mousedown', hideWhenFocusLost);

    /**
     * Fired whenever a dialog is being closed.
     * @event module:htz-dialog~dialog:hide
     * @type {Object}
     * @prop {Object} details
     * @prop {HTMLElement} details.dialog - The closed dialog wrapper
     */
    dispatchEvent(wrapper, 'dialog:hide', {
      dialog: wrapper,
    });
  }

  /**
   * Go to next dialog within a wrapper
   *
   * @callback module:htz-dialog~next
   *
   * @return {HTMLElement} The focused dialog window.
   */
  function next() {
    return goToDialog(visibleDialogIndex + 1);
  }

  /**
   * Go to prev dialog within a dialog
   *
   * @callback module:htz-dialog~prev
   *
   * @return {HTMLElement} The focused dialog window.
   */
  function prev() {
    return goToDialog(visibleDialogIndex - 1);
  }


  // --- Event Handlers --- //
  // Close and open dialog
  showBtns.forEach((showBtn) => { showBtn.addEventListener('click', show); });
  hideBtns.forEach((hideBtn) => { hideBtn.addEventListener('click', hide); });
  wrapper.addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target) hide();
  });

  // Next and previous dialogs
  nextBtns.forEach((nextBtn) => { nextBtn.addEventListener('click', next); });
  prevBtns.forEach((prevBtn) => { prevBtn.addEventListener('click', prev); });

  // Handle keyboard events
  wrapper.addEventListener('keydown', (evt) => {
    if (isVisible) {
      const key = evt.keyCode;

      // `Esc`
      if (key === 27) {
        evt.preventDefault();
        hide();
      }

      // `Tab`
      else if (key === 9) {
        keepFocus(wrapper, evt);
      }
    }
  });


  // --- Return Public API --- //
  /**
   * A public API for programmatically controlling the initialized dialog instance.
   * @typedef {Object} module:htz-dialog~API
   * @prop {Boolean} isVisible - Indicates if the instance is currently visible.
   * @prop {module:htz-dialog~show} show - Reveal instance.
   * @prop {module:htz-dialog~hide} hide - Hide instance.
   * @prop {module:htz-dialog~next} next - Move to next dialog in wrapper, if one exists
   * @prop {module:htz-dialog~prev} prev - Move to previous dialog in wrapper, if one exists
   */
  return {
    isVisible,
    hide,
    show,
    next,
    prev,
  };
}
