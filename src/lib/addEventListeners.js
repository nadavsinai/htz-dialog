import {keepFocus} from "./keepFocus";
import getInstance from "./getInstance";

export function addEventListeners(dialogState) {
  let {wrapperId, wrapper} = dialogState;

// Get all show, hide, next and prev buttons
  const showBtns = Array.from(document.querySelectorAll(`[data-htz-dialog-show="${wrapperId}"]`));
  const nextBtns = Array.from(wrapper.querySelectorAll('[data-htz-dialog-next]'));
  const prevBtns = Array.from(wrapper.querySelectorAll('[data-htz-dialog-prev]'));
  const hideBtns = Array.from(document.querySelectorAll(`[data-htz-dialog-hide="${wrapperId}"]`))
    .concat(Array.from(wrapper.querySelectorAll('[data-htz-dialog-hide]')));


// --- Event Handlers --- //
// Close and open dialog
  showBtns.forEach((showBtn) => {
    showBtn.addEventListener('click', dialogState.show);
  });
  hideBtns.forEach((hideBtn) => {
    hideBtn.addEventListener('click', dialogState.hide);
  });
  wrapper.addEventListener('click', (evt) => {
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
  wrapper.addEventListener('keydown', (evt) => {
    let instance = getInstance(dialogState.wrapperId);
    if (instance && instance.isVisible) {
      const key = evt.keyCode;

      // `Esc`
      if (key === 27) {
        evt.preventDefault();
        dialogState.hide();
      }

      // `Tab`
      else if (key === 9) {
        keepFocus(dialogState.wrapper, evt);
      }
    }
  });
}
