import getFocusables from './htz-get-focusable';
/**
 * Keep focus within an element when tabbing.
 *
 * @param {HTMLElement} container - The element to keep focus within
 * @param {Object} evt
 *    A [keyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
 *
 * @private
 */
export function keepFocus(container, evt) {
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
