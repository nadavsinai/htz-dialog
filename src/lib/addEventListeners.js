import keepFocus from './keepFocus';


export default function (dialogState) {
  // Get all show, hide, next and prev buttons
  const showBtns = Array.from(document.querySelectorAll(`[data-htz-dialog-show="${dialogState.wrapperId}"]`));
  const nextBtns = Array.from(dialogState.wrapper.querySelectorAll('[data-htz-dialog-next]'));
  const prevBtns = Array.from(dialogState.wrapper.querySelectorAll('[data-htz-dialog-prev]'));
  const hideBtns = Array.from(document.querySelectorAll(`[data-htz-dialog-hide="${dialogState.wrapperId}"]`))
    .concat(Array.from(dialogState.wrapper.querySelectorAll('[data-htz-dialog-hide]')));


  // --- Event Handlers --- //
  // Close and open dialog
  showBtns.forEach((showBtn) => {
    showBtn.addEventListener('click', dialogState.show);
  });
  hideBtns.forEach((hideBtn) => {
    hideBtn.addEventListener('click', dialogState.hide);
  });
  dialogState.wrapper.addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target) dialogState.hide();
  });

  // Next and previous dialogs
  nextBtns.forEach((nextBtn) => {
    nextBtn.addEventListener('click', dialogState.next);
  });
  prevBtns.forEach((prevBtn) => {
    prevBtn.addEventListener('click', dialogState.prev);
  });

  // Handle keyboard events
  dialogState.wrapper.addEventListener('keydown', (evt) => {
    if (dialogState.isVisible) {
      const key = evt.keyCode;

      // `Esc`
      if (key === 27) {
        evt.preventDefault();
        dialogState.hide();
      }

      // `Tab`
      else if (key === 9) {
        keepFocus(wrapper, evt);
      }
    }
  });

}
