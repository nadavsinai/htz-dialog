/**
 * An array of all initialized instances
 *
 * @type {Array}
 *
 * @private
 */
export const allInstances = [];

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
export function getInstance(dialog) {
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
