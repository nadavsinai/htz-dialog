/**
 * An array of all initialized instances
 *
 * @type {Array}
 *
 * @private
 */
const allInstances = [];
export function getAllInstances() {
  return allInstances;
}


import {next, prev} from './nextPrev';
import {show} from './show';
import {hide} from './hide';
import {hideWhenFocusLost} from './hideWhenFocusLost';

import {goToDialog}from './goToDialog';
export class DialogState {
  constructor(wrapper, dialogs, elemToHide) {
    this.dialogs = dialogs;
    this.isVisible = false;
    this.wrapper = wrapper;
    this.wrapperId = wrapper.id || `dialog${Math.random()}`;
    this.visibleDialogIndex = -1;
    this.focusOnClose = undefined;
    // Determine element to hide
    this.elemToHideId = wrapper.getAttribute('data-htz-dialog-elem-to-hide');
    // Determine Which element is being concealed by the dialog
    this.elemToConceal = document.getElementById(this.elemToHideId) || elemToHide;
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
    this.show = show.bind(this);
    this.hide = hide.bind(this);
    this.next = next.bind(this);
    this.prev = prev.bind(this);
    this.goToDialog = goToDialog.bind(this);

    //private
    this.hideWhenFocusLost = hideWhenFocusLost.bind(this);
  }

}
