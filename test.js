/* eslint-disable import/no-unresolved */
import dialog from 'htz-dialog';
/* eslint-enable import/no-unresolved */


const dialogs = Array.from(document.getElementsByClassName('js-dialog-wrapper'));

dialogs.forEach((item) => {
  dialog(item);
});
