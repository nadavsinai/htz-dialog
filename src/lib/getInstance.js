import {getAllInstances} from "./dialogsState";

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

export default function (dialog) {
  const instanceType = ( // question: what's wrong with typeof === 'string'?
    Object
      .prototype
      .toString
      .call(dialog)
      .match(/^\[object\s+(.*?)\]$/)[1]
    || ''
  ).toLowerCase();

  const elem = instanceType === 'string' ? document.getElementById(dialog) : dialog;

  return getAllInstances().filter(item => item.wrapper === elem)[0];
}
