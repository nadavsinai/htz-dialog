import  htzDialog from '../index';
import  {getDialogs} from './init';

it('throws if first argument is not instance of HTMLElement', function () {

  let tries = [undefined,[],{},'a',1, new Map()];
  for (let test of tries) {
    expect(() => {
      htzDialog(test);
    }).to.throw('the argument provided as the `wrapper` parameter must be an HTMLElement');
  }
});

it('will throw if appendTo argument is not an HTMLElement', function () {
  expect(() => {
    htzDialog(document.createElement('div'), '', '', {});
  }).to.throw(/param must be an Element/);
});

describe('get dialogs', () => {
  it('returns an array', () => {

    let dialogClass = 'theDialogClass';
    let wrapper = document.createElement('div');
    let arr = getDialogs(dialogClass, wrapper);
    expect(arr).to.be.instanceof(Array);

  });
  it('fills the array only with elements that have the dialog class', () => {

    let dialogClass = 'theDialogClass';
    let notTheDialogClass = 'notTheDialogClass';
    let wrapper = document.createElement('div');
    let element1 = document.createElement('div');
    element1.classList.add(dialogClass);
    let element2 = document.createElement('div');
    element2.classList.add(notTheDialogClass);
    wrapper.appendChild(element1).appendChild(element2);
    let arr = getDialogs(dialogClass, wrapper);
    expect(arr.length).to.equal(1);
    expect(arr[0]).to.equal(element1);
  });
});

it('moves wrapper to appendTo element', () => {
  let wrapper = document.createElement('div');
  wrapper.id = 'TestWrapper';
  let appendTo = document.createElement('div');
  htzDialog(wrapper, undefined, undefined, appendTo);
  expect(wrapper.parentElement).to.equal(appendTo);
});


it('moves wrapper if attribute data-htz-dialog-append-to exists and its value is found on document via getElementById', () => {
  let wrapper = document.createElement('div');
  wrapper.setAttribute("data-htz-dialog-append-to","append-to-target");
  wrapper.id = 'TestWrapper';
  let appendTo = document.createElement('div');
  appendTo.id = 'append-to-target';
  document.body.appendChild(appendTo);
  htzDialog(wrapper, undefined, undefined, undefined);
  expect(wrapper.parentElement).to.equal(appendTo);
});
