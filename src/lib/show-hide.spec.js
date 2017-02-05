/* global sinon, expect, describe, it, beforeEach, afterEach */
/* eslint-disable noinspection, prefer-arrow-callback, func-names, no-underscore-dangle */
import { show, hide, __RewireAPI__ } from './show-hide';

describe('show function', function () {
  it('should have access to document global', function () {
    expect(document).to.not.be.undefined();
  });
  it('calls dispatchEvent on the wrapper with type `dialog:show-before` and dialog wrapper as data',
    function () {
      const { myDispatch, dialogDummy, destroy } = setup({ dispatchRetValue: false });
      show.call(dialogDummy);
      expect(myDispatch).to.have.been.calledOnce();
      expect(myDispatch).to.have.been.calledWith(
        dialogDummy.wrapper, 'dialog:show-before', { dialog: dialogDummy.wrapper });
      destroy();
    });
  it('cancels show (does not call show-after or goToDialog ) if event was prevented', function () {
    const { myDispatch, dialogDummy, destroy } = setup({ dispatchRetValue: false });
    show.call(dialogDummy);
    expect(dialogDummy.goToDialog).to.have.been.not.called();
    expect(myDispatch).to.have.been.calledWith(
      dialogDummy.wrapper, 'dialog:show-before', { dialog: dialogDummy.wrapper });
    expect(myDispatch).to.not.have.been.calledWith(
      dialogDummy.wrapper, 'dialog:show-after', { dialog: dialogDummy.wrapper });
    destroy();
  });
  it('sets state to visible', function () {
    const { dialogDummy, destroy } = setup({ dispatchRetValue: true });
    show.call(dialogDummy);
    expect(dialogDummy.isVisible).to.be.true();
    destroy();
  });
  it('removes the aria-hidden attribute on the wrapper', function () {
    const { dialogDummy, destroy } = setup({ dispatchRetValue: true });
    show.call(dialogDummy);
    expect(dialogDummy.wrapper.getAttribute('aria-hidden')).not.to.exist();
    destroy();
  });
  it('calls goToDialog(0)', function () {
    const { dialogDummy, destroy } = setup({ dispatchRetValue: true });
    show.call(dialogDummy);
    expect(dialogDummy.goToDialog).to.have.been.calledOnce();
    expect(dialogDummy.goToDialog).to.have.been.calledWith(0);
    destroy();
  });
  it('sets aria-hidden on elemToConceal', function () {
    const { dialogDummy, destroy } = setup({ dispatchRetValue: true });
    show.call(dialogDummy);
    expect(dialogDummy.elemToConceal.getAttribute('aria-hidden')).to.equal('true');
    destroy();
  });
  it('adds focus eventListener on the document.body calling hideWhenFocusLost', function () {
    const { dialogDummy, addEventListenerStub, destroy } = setup({ dispatchRetValue: true });
    show.call(dialogDummy);
    expect(addEventListenerStub).to.have.been.calledWith(
      'focus', dialogDummy.hideWhenFocusLost, true);
    destroy();
  });
  it('adds mousedown eventListener on the document.body calling hideWhenFocusLost', function () {
    const { dialogDummy, addEventListenerStub, destroy } = setup({ dispatchRetValue: true });
    show.call(dialogDummy);
    expect(addEventListenerStub).to.have.been.calledWith(
      'mousedown', dialogDummy.hideWhenFocusLost);
    destroy();
  });
  it('calls dispatchEvent on the wrapper with type `dialog:show-after` and dialog wrapper as data',
    function () {
      const { dialogDummy, myDispatch, destroy } = setup({ dispatchRetValue: true });
      show.call(dialogDummy);
      expect(myDispatch).to.have.been.calledTwice();
      expect(myDispatch).to.have.been.calledWith(
        dialogDummy.wrapper, 'dialog:show-after', { dialog: dialogDummy.wrapper });
      destroy();
    });
});

describe('hide function', function () {
  it('should have access to document global', function () {
    expect(document).to.not.be.undefined();
  });
  it('calls dispatchEvent on the wrapper with type `dialog:hide-before` and dialog wrapper as data',
    function () {
      const { myDispatch, dialogDummy, destroy } = setup({ dispatchRetValue: false });
      hide.call(dialogDummy);
      expect(myDispatch).to.have.been.calledOnce();
      expect(myDispatch).to.have.been.calledWith(
        dialogDummy.wrapper, 'dialog:hide-before', { dialog: dialogDummy.wrapper });
      destroy();
    });
  it('cancels show (does not call hide-after or goToDialog ) if event was prevented', function () {
    const { myDispatch, dialogDummy, destroy } = setup({ dispatchRetValue: false });
    hide.call(dialogDummy);
    expect(dialogDummy.goToDialog).to.have.been.not.called();
    expect(myDispatch).to.have.been.calledWith(
      dialogDummy.wrapper, 'dialog:hide-before', { dialog: dialogDummy.wrapper });
    expect(myDispatch).to.not.have.been.calledWith(
      dialogDummy.wrapper, 'dialog:hide-after', { dialog: dialogDummy.wrapper });
    destroy();
  });
  it('sets state to not visible', function () {
    const { dialogDummy, destroy } = setup({ dispatchRetValue: true });
    hide.call(dialogDummy);
    expect(dialogDummy.isVisible).to.be.false();
    destroy();
  });
  it('adds the aria-hidden attribute with a \'true\' value on the wrapper element', function () {
    const { dialogDummy, destroy } = setup({ dispatchRetValue: true });
    hide.call(dialogDummy);
    expect(dialogDummy.wrapper.getAttribute('aria-hidden')).to.equal('true');
    destroy();
  });
  it('sets \'visibleDialogIndex\' to -1 on the wrapper', function () {
    const { dialogDummy, destroy } = setup({ dispatchRetValue: true });
    hide.call(dialogDummy);
    expect(dialogDummy.visibleDialogIndex).to.equal(-1);
    destroy();
  });
  it('removes the aria-hidden attribute on the elemToConceal', function () {
    const { dialogDummy, destroy } = setup({ dispatchRetValue: true });
    hide.call(dialogDummy);
    expect(dialogDummy.elemToConceal.getAttribute('aria-hidden')).not.to.exist();
    destroy();
  });
  it('adds focus eventListener on the document.body calling hideWhenFocusLost', function () {
    const { removeEventListenerStub, dialogDummy, destroy } = setup({ dispatchRetValue: true });
    hide.call(dialogDummy);
    expect(removeEventListenerStub).to.have.been.calledWith(
      'focus', dialogDummy.hideWhenFocusLost, true);
    destroy();
  });
  it('adds mousedown eventListener on the document.body calling hideWhenFocusLost', function () {
    const { removeEventListenerStub, dialogDummy, destroy } = setup({ dispatchRetValue: true });
    hide.call(dialogDummy);
    expect(removeEventListenerStub).to.have.been.calledWith(
      'mousedown', dialogDummy.hideWhenFocusLost);
    destroy();
  });
  it('calls dispatchEvent on the wrapper with type `dialog:hide-after` and dialog wrapper as data',
    function () {
      const { myDispatch, dialogDummy, destroy } = setup({ dispatchRetValue: true });
      hide.call(dialogDummy);
      expect(myDispatch).to.have.been.calledTwice();
      expect(myDispatch).to.have.been.calledWith(
        dialogDummy.wrapper, 'dialog:hide-after', { dialog: dialogDummy.wrapper });
      destroy();
    });
});

describe('show/hide flows', function () {
  it('keeps track of focused element on focusOnClose property on the dialogState ', function () {
    const { randomElementThatWasActive, dialogDummy, destroy } = setup({ dispatchRetValue: true });
    // First, show
    randomElementThatWasActive.focus();
    expect(randomElementThatWasActive).to.be.equal(document.activeElement);
    expect(dialogDummy.focusOnClose).to.not.be.equal(randomElementThatWasActive);
    show.call(dialogDummy);
    expect(dialogDummy.focusOnClose).to.be.equal(randomElementThatWasActive);
    // Then, hide
    hide.call(dialogDummy);
    expect(document.activeElement).to.be.equal(randomElementThatWasActive); // restores active focus
    destroy();
  });
});

function setup(options) {
  // sets 'const allowed' to true or false
  let myDispatch = sinon.stub().returns(options.dispatchRetValue);
  __RewireAPI__.__Rewire__('dispatchEvent', myDispatch);
  const wrapperElem = document.createElement('div');
  wrapperElem.id = 'test';
  wrapperElem.setAttribute('aria-hidden', 'true');
  const elemToConceal = document.createElement('div');

  const focusOnClose = document.createElement('div');
  focusOnClose.id = 'focusOnClose';
  focusOnClose.setAttribute('tabindex', '-1'); // make it focus-able

  const randomElementThatWasActive = document.createElement('div');
  randomElementThatWasActive.setAttribute('tabindex', '-1'); // make it focus-able
  randomElementThatWasActive.id = 'randomElement';

  let dialogDummy = {
    wrapper: wrapperElem,
    elemToConceal,
    goToDialog: sinon.spy(),
    isVisible: false,
    focusOnClose,
    dialogs: [randomElementThatWasActive],
  };

  // In case some tests broke, don't break the chain
  if (document.body.addEventListener.restore !== undefined) {
    document.body.addEventListener.restore();
  }
  if (document.body.removeEventListener.restore !== undefined) {
    document.body.removeEventListener.restore();
  }
  const addEventListenerStub = sinon.stub(document.body, 'addEventListener');
  const removeEventListenerStub = sinon.stub(document.body, 'removeEventListener');

  function destroy() {
    removeEventListenerStub.restore();
    addEventListenerStub.restore();
    randomElementThatWasActive.remove();
    focusOnClose.remove();
    elemToConceal.remove();
    wrapperElem.remove();
    dialogDummy = undefined;
    myDispatch = undefined;
  }

  return {
    myDispatch,
    dialogDummy,
    randomElementThatWasActive,
    addEventListenerStub,
    removeEventListenerStub,
    destroy };
}

/* eslint-enable no-use-before-define, prefer-arrow-callback, func-names, no-underscore-dangle */
