/**
 * HTZ DIALOG
 *
 * Accessible dialog and modal windows
 * with JavaScript and DOM APIs
 *
 * @module htz-dialog
 * @license MIT
 */

import { getAllInstances, DialogState } from './lib/dialogsState';
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
import initDialogs from './lib/init';
import getInstance from "./lib/getInstance";
import { addEventListeners } from "./lib/addEventListeners";

export default function htzDialog(wrapper,
                                  dialogClass = 'js-dialog',
                                  elemToHide = document.getElementById('page-wrapper'),
                                  appendTo = undefined) {

  // Ensure `wrapper` has an id attribute
  const dialogs = initDialogs(wrapper, appendTo, dialogClass);
  const dialogState = new DialogState(wrapper, dialogs, elemToHide);
  addEventListeners(dialogState);
  // --- Process DOM API --- //
  // Determine if dialog should be moved elsewhere in the DOM
  const moveToId = wrapper.getAttribute('data-htz-dialog-append-to');
  const moveToElem = appendTo || (moveToId ? document.getElementById(moveToId) : undefined);

  if (moveToElem)
    moveToElem.appendChild(wrapper);

  getAllInstances().push(dialogState);

  return dialogState;
}
// Assign `getInstance` as a static method
htzDialog.getInstance = getInstance;
// module.exports = htzDialog; //using CJS so babel woudn't make it into an object with .default
