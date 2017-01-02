export default function (wrapper, appendTo,dialogClass) {
  // Fail fast if `wrapper` is `null` or `undefined`,
  // and when `appendTo` is defined, but isn't an Element.
  if (appendTo && !(appendTo instanceof Element)) {
    throw new Error('The `appendTo` param must be an Element. You provided a ${typeof appendTo}');
  }
  if (wrapper === undefined || wrapper == null) {
    throw new Error('the argument provided as the `wrapper` parameter must be an HTMLElement');
  }


  // Get all dialog windows within the dialog wrapper,
  // hide and make them programatically selectable
  return Array.from(wrapper.getElementsByClassName(dialogClass))
    .map((dialog) => {
      dialog.setAttribute('aria-hidden', 'true');
      dialog.setAttribute('tabindex', '-1');

      return dialog;
    });
}