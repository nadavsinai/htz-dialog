/* eslint-disable import/no-unresolved */
import dialog from 'htz-dialog';
/* eslint-enable import/no-unresolved */


const dialogs = Array
  .from(document.getElementsByClassName('js-dialog-wrapper'))
  .map(item => dialog(item));

/* eslint-disable no-console */
console.log(
  'From string: ',
  dialog.getInstance('modalDialog').wrapper.id
);

const modalDialog = document.getElementById('modalDialog');
console.log(
  'From element: ',
  dialog.getInstance(modalDialog).wrapper.id
);
/* eslint-enable no-console */

export default dialogs;
