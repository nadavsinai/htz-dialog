/**
 *  HTZ GET FOCUSABLE ELEMENTS
 *
 * A module for getting an array of an element's
 * focusable descendant elements.
 *
 * @module htz-get-focusables
 * @license MIT
 */

/**
 * Get an array of all focusable descendants of an element
 * removed when clicked.
 *
 * @param {HTMLElement} parent - The parent to get focusable descendant elements from
 * @returns {HTMLElement[]} - An array of focusable descendants of `parent`
 */
export default function getFocusables(parent) {
  const focusableElements = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
    '[tabindex]:not([tabindex^="-"])',
  ];

  const focusableDescendants = Array.from(
    parent.querySelectorAll(focusableElements.join(','))
  )
    .filter(
      el => !el.hasAttribute('tabindex') ||
      parseInt(el.getAttribute('tabindex'), 10) > -1
    );

  return focusableDescendants.filter(
    el => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length) &&
    !!window.getComputedStyle && window.getComputedStyle(el).visibility !== 'hidden'
  );
}
