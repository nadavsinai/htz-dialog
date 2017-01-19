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
 * An array of all initialized instances
 *
 * @type {Array}
 *
 * @private
 */
const allInstances = [];

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
 * @throws Will throw an error if `wrapper` is null or undefined.
 * @throws Will throw an error if the `appendTo` param is defined with anything but an Element.
 *
 * @return {module:htz-dialog#API} - An API for programatically handling the
 *    initialized dialog.
 */
module.exports = htzDialog;
export default function htzDialog(
  wrapper,
  dialogClass = 'js-dialog',
  elemToHide = document.getElementById('page-wrapper'),
  appendTo = undefined
) {
  // Fail fast if `wrapper` is `null` or `undefined`,
  // and when `appendTo` is defined, but isn't an Element.
  if (appendTo && !(appendTo instanceof Element)) {
    throw new Error('The `appendTo` param must be an Element. You provided a ${typeof appendTo}');
  }
  if (wrapper === undefined || wrapper == null) {
    throw new Error('the argument provided as the `wrapper` parameter must be an HTMLElement');
  }

  // Ensure `wrapper` has an id attribute
  const wrapperId = wrapper.id || `dialog${Math.random()}`;

  // Get all dialog windows within the dialog wrapper,
  // hide and make them programatically selectable
  const dialogs = Array.from(wrapper.getElementsByClassName(dialogClass))
    .map((dialog) => {
      dialog.setAttribute('aria-hidden', 'true');
      dialog.setAttribute('tabindex', '-1');

      return dialog;
    });


  // --- Process DOM API --- //
  // Determine element to hide
  const elemToHideId = wrapper.getAttribute('data-htz-dialog-elem-to-hide');

  // Determine if dialog should be moved elsewhere in the DOM
  const moveToId = wrapper.getAttribute('data-htz-dialog-append-to');
  const moveToElem = appendTo || moveToId ? document.getElementById(moveToId) : undefined;

  // Get all show, hide, next and prev buttons
  const showBtns = Array.from(document.querySelectorAll(`[data-htz-dialog-show="${wrapperId}"]`));
  const nextBtns = Array.from(wrapper.querySelectorAll('[data-htz-dialog-next]'));
  const prevBtns = Array.from(wrapper.querySelectorAll('[data-htz-dialog-prev]'));
  const hideBtns = Array.from(document.querySelectorAll(`[data-htz-dialog-hide="${wrapperId}"]`))
    .concat(Array.from(wrapper.querySelectorAll('[data-htz-dialog-hide]')));


  // Determine Which element is being concealed by the dialog
  const elemToConceal = document.getElementById(elemToHideId) || elemToHide;


  // State
  let isVisible = false;
  let visibleDialogIndex = -1;
  let focusOnClose;

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
   * @fires module:htz-dialog#dialog:focus-dialog-window-before
   * @fires module:htz-dialog#dialog:focus-dialog-window-after
   *
   * @return {HTMLElement} The focused dialog window.
   *
   * @private
   */
  function goToDialog(goToIndex = 0) {
    const goToElem = dialogs[goToIndex];

    /**
     * Fired whenever a dialog  window is focused.
     * Stops execution if any of its handlers calls `event.preventDefault`
     * @event module:htz-dialog#dialog:focus-dialog-before
     * @type {Object}
     * @prop {Object} details
     * @prop {HTMLElement} details.wrapper - The wrapper element
     * @prop {HTMLElement} details.dialog - The focused dialog window
     */
    const allowed = dispatchEvent(wrapper, 'dialog:focus-dialog-before', {
      wrapper,
      dialog: goToElem,
    });

    if (allowed) {
      if (goToElem) {
        goToElem.removeAttribute('aria-hidden');
        goToElem.focus();

        if (visibleDialogIndex > -1) {
          dialogs[visibleDialogIndex].setAttribute('aria-hidden', 'true');
        }

        visibleDialogIndex = goToIndex;

        /**
         * Fired whenever a dialog  window is focused.
         * @event module:htz-dialog#dialog:focus-dialog-after
         * @type {Object}
         * @prop {Object} details
         * @prop {HTMLElement} details.wrapper - The wrapper element
         * @prop {HTMLElement} details.dialog - The focused dialog window
         */
        dispatchEvent(wrapper, 'dialog:focus-dialog-after', {
          wrapper,
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
   * @callback module:htz-dialog#show
   * @fires module:htz-dialog#dialog:show-before
   * @fires module:htz-dialog#dialog:show-after
   */
  function show() {
    /**
     * Fired whenever a dialog is being opened.
     * Stops execution if any of its handlers calls `event.preventDefault`
     * @event module:htz-dialog#dialog:show-before
     * @type {Object}
     * @prop {Object} details
     * @prop {HTMLElement} details.dialog - The opened dialog wrapper
     */
    const allowed = dispatchEvent(wrapper, 'dialog:show-before', {
      dialog: wrapper,
    });

    if (allowed) {
      isVisible = true;
      wrapper.removeAttribute('aria-hidden');

      focusOnClose = document.activeElement;
      goToDialog(0);

      elemToConceal.setAttribute('aria-hidden', 'true');


      document.body.addEventListener('focus', hideWhenFocusLost, true);
      document.body.addEventListener('mousedown', hideWhenFocusLost);

      /**
       * Fired whenever a dialog is being opened.
       * @event module:htz-dialog#dialog:show-after
       * @type {Object}
       * @prop {Object} details
       * @prop {HTMLElement} details.dialog - The opened dialog wrapper
       */
      dispatchEvent(wrapper, 'dialog:show-after', {
        dialog: wrapper,
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
  function hide() {
    /**
     * Fired whenever a dialog is being closed.
     * Stops execution if any of its handlers calls `event.preventDefault`
     * @event module:htz-dialog#dialog:hide-before
     * @type {Object}
     * @prop {Object} details
     * @prop {HTMLElement} details.dialog - The closed dialog wrapper
     */
    const allowed = dispatchEvent(wrapper, 'dialog:hide-before', {
      dialog: wrapper,
    });

    if (allowed) {
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
       * @event module:htz-dialog#dialog:hide-after
       * @type {Object}
       * @prop {Object} details
       * @prop {HTMLElement} details.dialog - The closed dialog wrapper
       */
      dispatchEvent(wrapper, 'dialog:hide-after', {
        dialog: wrapper,
      });
    }
  }

  /**
   * Go to next dialog within a wrapper
   *
   * @callback module:htz-dialog#next
   *
   * @return {HTMLElement} The focused dialog window.
   */
  function next() {
    return goToDialog(visibleDialogIndex + 1);
  }

  /**
   * Go to prev dialog within a dialog
   *
   * @callback module:htz-dialog#prev
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


  // --- Public API --- //
  /**
   * A public API for programmatically controlling the initialized dialog instance.
   * @typedef {Object} module:htz-dialog#API
   * @prop {HTMLElement} wrapper - The wrapper element of the current dialog
   * @prop {Boolean} isVisible - Indicates if the instance is currently visible.
   * @prop {module:htz-dialog#show} show - Reveal instance.
   * @prop {module:htz-dialog#hide} hide - Hide instance.
   * @prop {module:htz-dialog#next} next - Move to next dialog in wrapper, if one exists
   * @prop {module:htz-dialog#prev} prev - Move to previous dialog in wrapper, if one exists
   */
  const api = {
    wrapper,
    isVisible,
    hide,
    show,
    next,
    prev,
  };

  allInstances.push(api);

  return api;
}

/**
 * Get the instance API of a certain dialog wrapper.
 *
 * @memberof module:htz-dialog
 * @static
 *
 * @param {String|HTMLElement} dialog - A dialog wrapper (`HTMLElement`) or the `id` of one.
 *
 * @return {module:htz-dialog#API} - The API to control the instance.
 */
function getInstance(dialog) {
  const instanceType = (
    Object
      .prototype
      .toString
      .call(dialog)
      .match(/^\[object\s+(.*?)\]$/)[1]
    || ''
  ).toLowerCase();

  const elem = instanceType === 'string' ? document.getElementById(dialog) : dialog;

  return allInstances.filter(item => item.wrapper === elem)[0];
}

// Asign `getInstance` as a static method
htzDialog.getInstance = getInstance;
