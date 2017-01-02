/**
 * Close the dialog if it no longer has focus (i.e., when user clicks outside it).
 *
 * @param {Object} evt - An event object
 *
 * @private
 */
export function hideWhenFocusLost(evt) {
  // when handling click events, only handle left clicks
  if (!evt.button && this.isVisible && !(this.wrapper.contains(evt.target))) {
    evt.preventDefault();
    this.hide();
  }
}
