import { show, hide, __RewireAPI__ } from './show-hide';

describe('show function', function () {
  it('calls dispatchEvent on the wrapper with type `dialog:show-before` and dialog wrapper as data');
  it('cancels show (does not call show-after or goToDialog ) if event was prevented', () => {
    let myDispatch = sinon.stub().returns(false);
    __RewireAPI__.__Rewire__('dispatchEvent', myDispatch);
    let dialogDummy = { wrapper: 'test', goToDialog: sinon.spy() };
    show.call(dialogDummy);
    expect(myDispatch).to.have.been.calledOnce();
    expect(myDispatch).to.have.been.calledWith('test', 'dialog:show-before', { dialog: 'test' });
    expect(dialogDummy.goToDialog).to.have.been.not.called()
  });
  it('sets state to visible');
  it('removes the aria-hidden attribute on the wrapper');
  it('keeps track of focuses element on focusOnClose property on the dialogState ');
  it('calls goToDialog(0)'); // either do this or continue the testing inwards - sometimes not practical...
  it('sets aria-hidden on elemToConceal');
  it('adds an eventListener on the document.body calling hideWhenFocusLost on focus ', () => {
    let simulant = require('simulant');
    let myDispatch = sinon.stub().returns(true);
    __RewireAPI__.__Rewire__('dispatchEvent', myDispatch);
    let dialogDummy = { wrapper: { removeAttribute: Function.prototype }, goToDialog: sinon.stub(), hideWhenFocusLost: sinon.spy() };
    show.call(dialogDummy);
    simulant.fire(document.body, 'focus');
    expect(dialogDummy.hideWhenFocusLost).to.have.been.called();
  });
  it('adds mousedown eventListener on the document.body calling hideWhenFocusLost');
  it('calls dispatchEvent on the wrapper with type `dialog:show-after` and dialog wrapper as data');
});
