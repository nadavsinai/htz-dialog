export function safeChecks(wrapper, appendTo) {
  // Fail fast if `wrapper` is `null` or `undefined`,
  // and when `appendTo` is defined, but isn't an Element.
  if (appendTo && !(appendTo instanceof Element)) {
    throw new Error(`The 'appendTo' param must be an Element. You provided a ${typeof appendTo}`);
  }

  if (!(wrapper instanceof HTMLElement)) {
    throw new Error('the argument provided as the `wrapper` parameter must be an HTMLElement');
  }
}

export function getDialogs(dialogClass) {
  return Array.from(wrapper.getElementsByClassName(dialogClass))
    .map((dialog) => {
      dialog.setAttribute('aria-hidden', 'true');
      dialog.setAttribute('tabindex', '-1');

      return dialog;
    });
}
