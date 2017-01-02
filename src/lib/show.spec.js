import {DialogState} from "./dialogsState";
describe('show function', function () {
  jsdom();
  it('dispatched dialog:show-before event and proceeds only if event has not been prevented', (done) => {
    let wrapper = document.body;
    let dialogState = new DialogState(wrapper, [], document.body);
    document.body.addEventListener('dialog:show-before', (evt) => {
      expect(evt.detail.dialog).to.eq(wrapper);
      done()
    });
    dialogState.show();
  });
  it('sets state isVisible to true');
  it('removes aria-hidden attribute on the wrapper');
  it('sets aria-hidden attribute on the element to conceal');
  it('adds mousedown and focus eventlisteners to the document.body'); //todo : behaviour test missing - test this too in another suite
  it('dispatched dialog:show-after event with the dialog\'s wrapper');
});

