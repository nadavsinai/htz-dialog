/**
 * HTZ DIALOG
 *
 * Accessible dialog and modal windows
 * with JavaScript and DOM APIs
 *
 * @module htz-dialog
 * @license MIT
 */

import { DialogState } from './lib/dialogState';
import {getInstance,allInstances} from './lib/instances';


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
import { safeChecks, getDialogs, moveWrapper } from './lib/init';
import addEventListners from './lib/addEventListeners';
module.exports = htzDialog;
export default function htzDialog(wrapper,
                                  dialogClass = 'js-dialog',
                                  elemToHide = document.getElementById('page-wrapper'),
                                  appendTo = undefined) {

  safeChecks(wrapper, appendTo);
  // Get all dialog windows within the dialog wrapper,
  // hide and make them programatically selectable
  const dialogs = getDialogs(dialogClass, wrapper);

  moveWrapper(wrapper, appendTo);
  let dialogState = new DialogState(wrapper, dialogs);
  addEventListners(dialogState);

  // --- Process DOM API --- //
  // Determine element to hide
  const elemToHideId = dialogState.wrapper.getAttribute('data-htz-dialog-elem-to-hide');
  // Determine Which element is being concealed by the dialog
  dialogState.elemToConceal = document.getElementById(elemToHideId) || elemToHide;

  allInstances.push(dialogState);
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
  return dialogState;
}

// Asign `getInstance` as a static method
htzDialog.getInstance = getInstance;
