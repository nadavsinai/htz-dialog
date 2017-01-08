/* eslint-disable no-unresolved-var */
window.addEventListener('DOMContentLoaded', () => {


  const dialogs = Array
    .from(document.getElementsByClassName('js-dialog-wrapper'))
    .map(item => htzDialog(item));

  /* eslint-disable no-console */
  console.log(
    'From string: ',
    htzDialog.getInstance('modalDialog').wrapper.id
  );

  const modalDialog = document.getElementById('modalDialog');
  console.log(
    'From element: ',
    htzDialog.getInstance(modalDialog).wrapper.id
  );

  /* eslint-enable no-unresolved-var */
});
