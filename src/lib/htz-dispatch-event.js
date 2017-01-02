/**
 *  HTZ DISPATCH EVENT
 *
 * A utility module for firing a synthesized event.
 *
 * @module htz-dispatch-event
 * @license MIT
 */


/**
 * Dispatch a custom event from an element
 *
 * @param {HTMLElement} target The element, which will be used to dispatch the
 *    event and determines which event listeners will be invoked;
 * @param {String} type The name of the custom dispatched event
 * @param {Object} [detail=null] An optional value, of any type, which is an
 *    event-dependent value associated with the event.
 *
 * @return {Boolean} `false` if at least one of the event handlers that handled the dispatched event
 *    called `Event.preventDefault()`, otherwise, `true`
 */
export default function dispatchEvent(target, type, detail = null) {
  const event = new CustomEvent(
    type,
    {
      bubbles: true,
      cancelable: true,
      detail,
    }
  );

  return target.dispatchEvent(event);
}
