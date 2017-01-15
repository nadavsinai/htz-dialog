/* global sinon, expect, describe, it, beforeEach, afterEach */
/* eslint-disable noinspection, prefer-arrow-callback, func-names, no-underscore-dangle */
import { show, hide, __RewireAPI__ } from './show-hide';

const jsdom = require('jsdom-global');

describe('show function', function () {
  let addEventListenerStub;
  let myDispatch;
  let dialogDummy;
  let randomElementThatWasActive;
  let cleanup;

  beforeEach(function () {
    cleanup = jsdom();
  });

  afterEach(function () {
    cleanup();
  });

  it('should have access to document global', function () {
    expect(document).to.not.be.undefined();
  });
  it('calls dispatchEvent on the wrapper with type `dialog:show-before` and dialog wrapper as data',
    function () {
      setup({ dispatchRetValue: false });
      show.call(dialogDummy);
      expect(myDispatch).to.have.been.calledOnce();
      expect(myDispatch).to.have.been.calledWith(
        dialogDummy.wrapper, 'dialog:show-before', { dialog: dialogDummy.wrapper });
    });
  it('cancels show (does not call show-after or goToDialog ) if event was prevented', function () {
    setup({ dispatchRetValue: false });
    expect(dialogDummy.goToDialog).to.have.been.not.called();
    expect(myDispatch).to.not.have.been.calledWith(
      dialogDummy.wrapper, 'dialog:show-before', { dialog: dialogDummy.wrapper });
  });
  it('sets state to visible', function () {
    setup({ dispatchRetValue: true });
    show.call(dialogDummy);
    expect(dialogDummy.isVisible).to.be.true();
  });
  it('removes the aria-hidden attribute on the wrapper', function () {
    setup({ dispatchRetValue: true });
    show.call(dialogDummy);
    expect(dialogDummy.wrapper.getAttribute('aria-hidden')).not.to.exist();
  });
  it('keeps track of focuses element on focusOnClose property on the dialogState ', function () {
    setup({ dispatchRetValue: true });
    randomElementThatWasActive.focus();
    expect(randomElementThatWasActive).to.be.equal(document.activeElement);
    expect(dialogDummy.focusOnClose).to.not.be.equal(randomElementThatWasActive);
    show.call(dialogDummy);
    expect(dialogDummy.focusOnClose).to.be.equal(randomElementThatWasActive);
  });
  it('calls goToDialog(0)', function () {
    setup({ dispatchRetValue: true });
    addEventListenerStub = sinon.stub(document.body, 'addEventListener');
    show.call(dialogDummy);
    expect(dialogDummy.goToDialog).to.have.been.calledOnce();
    expect(dialogDummy.goToDialog).to.have.been.calledWith(0);
    addEventListenerStub.restore();
  });
  it('sets aria-hidden on elemToConceal', function () {
    setup({ dispatchRetValue: true });
    show.call(dialogDummy);
    expect(dialogDummy.elemToConceal.getAttribute('aria-hidden')).to.equal('true');
  });
  it('adds focus eventListener on the document.body calling hideWhenFocusLost', function () {
    setup({ dispatchRetValue: true });
    show.call(dialogDummy);
    expect(addEventListenerStub).to.have.been.calledWith(
      'focus', dialogDummy.hideWhenFocusLost, true);
    addEventListenerStub.restore();
  });
  it('adds mousedown eventListener on the document.body calling hideWhenFocusLost', function () {
    setup({ dispatchRetValue: true });
    show.call(dialogDummy);
    expect(addEventListenerStub).to.have.been.calledWith(
      'mousedown', dialogDummy.hideWhenFocusLost);
    addEventListenerStub.restore();
  });
  it('calls dispatchEvent on the wrapper with type `dialog:show-after` and dialog wrapper as data',
    function () {
      setup({ dispatchRetValue: true });
      show.call(dialogDummy);
      expect(myDispatch).to.have.been.calledTwice();
      expect(myDispatch).to.have.been.calledWith(
        dialogDummy.wrapper, 'dialog:show-after', { dialog: dialogDummy.wrapper });
    });


  function setup(options) {
    // sets 'const allowed' to true or false
    myDispatch = sinon.stub().returns(options.dispatchRetValue);
    __RewireAPI__.__Rewire__('dispatchEvent', myDispatch);
    const wrapperElem = document.createElement('div');
    const elemToConceal = document.createElement('div');
    const focusOnClose = document.createElement('div');
    focusOnClose.id = 'focusOnClose';
    focusOnClose.setAttribute('tabindex', '-1'); // make it focusable
    wrapperElem.id = 'test';
    wrapperElem.setAttribute('aria-hidden', 'true');
    dialogDummy = {
      wrapper: wrapperElem,
      elemToConceal,
      goToDialog: sinon.spy(),
      isVisible: false,
      focusOnClose,
    };
    randomElementThatWasActive = document.createElement('div');
    // divs require tabindex attribute to be 'focusable'
    randomElementThatWasActive.setAttribute('tabindex', '-1');
  }
});

describe('hide function', function () {
  let removeEventListenerStub;
  let myDispatch;
  let dialogDummy;
  let randomElementThatWasActive;
  let cleanup;

  beforeEach(function () {
    cleanup = jsdom();
  });

  afterEach(function () {
    cleanup();
  });

  it('should have access to document global', function () {
    expect(document).to.not.be.undefined();
  });
  it('calls dispatchEvent on the wrapper with type `dialog:hide-before` and dialog wrapper as data',
    function () {
      setup({ dispatchRetValue: false });
      hide.call(dialogDummy);
      expect(myDispatch).to.have.been.calledOnce();
      expect(myDispatch).to.have.been.calledWith(
        dialogDummy.wrapper, 'dialog:hide-before', { dialog: dialogDummy.wrapper });
    });
  it('cancels show (does not call show-after or goToDialog ) if event was prevented', function () {
    setup({ dispatchRetValue: false });
    expect(dialogDummy.goToDialog).to.have.been.not.called();
    expect(myDispatch).to.not.have.been.calledWith(
      dialogDummy.wrapper, 'dialog:hide-before', { dialog: dialogDummy.wrapper });
  });
  it('sets state to not visible', function () {
    setup({ dispatchRetValue: true });
    hide.call(dialogDummy);
    expect(dialogDummy.isVisible).to.be.false();
  });
  it('adds the aria-hidden attribute with a \'true\' value on the wrapper element', function () {
    setup({ dispatchRetValue: true });
    hide.call(dialogDummy);
    expect(dialogDummy.wrapper.getAttribute('aria-hidden')).to.equal('true');
  });
  it('keeps track of focuses element on focusOnClose property on the dialogState ', function () {
    setup({ dispatchRetValue: true });
    // First, show
    randomElementThatWasActive.focus();
    expect(randomElementThatWasActive).to.be.equal(document.activeElement);
    expect(dialogDummy.focusOnClose).to.not.be.equal(randomElementThatWasActive);
    show.call(dialogDummy);
    expect(dialogDummy.focusOnClose).to.be.equal(randomElementThatWasActive);
    // Then, hide
    hide.call(dialogDummy);
    expect(document.activeElement).to.be.equal(randomElementThatWasActive); // restores active focus
  });
  it('sets \'visibleDialogIndex\' to -1 on the wrapper', function () {
    setup({ dispatchRetValue: true });
    hide.call(dialogDummy);
    expect(dialogDummy.visibleDialogIndex).to.equal(-1);
  });
  it('removes the aria-hidden attribute on the elemToConceal', function () {
    setup({ dispatchRetValue: true });
    hide.call(dialogDummy);
    expect(dialogDummy.elemToConceal.getAttribute('aria-hidden')).not.to.exist();
  });
  it('adds focus eventListener on the document.body calling hideWhenFocusLost', function () {
    setup({ dispatchRetValue: true });
    hide.call(dialogDummy);
    expect(removeEventListenerStub).to.have.been.calledWith(
      'focus', dialogDummy.hideWhenFocusLost, true);
  });
  it('adds mousedown eventListener on the document.body calling hideWhenFocusLost', function () {
    setup({ dispatchRetValue: true });
    hide.call(dialogDummy);
    expect(removeEventListenerStub).to.have.been.calledWith(
      'mousedown', dialogDummy.hideWhenFocusLost);
  });
  it('calls dispatchEvent on the wrapper with type `dialog:hide-after` and dialog wrapper as data',
    function () {
      setup({ dispatchRetValue: true });
      hide.call(dialogDummy);
      expect(myDispatch).to.have.been.calledTwice();
      expect(myDispatch).to.have.been.calledWith(
        dialogDummy.wrapper, 'dialog:hide-after', { dialog: dialogDummy.wrapper });
    });

  function setup(options) {
    // sets 'const allowed' to true or false
    myDispatch = sinon.stub().returns(options.dispatchRetValue);
    __RewireAPI__.__Rewire__('dispatchEvent', myDispatch);
    const wrapperElem = document.createElement('div');
    const elemToConceal = document.createElement('div');
    const focusOnClose = document.createElement('div');
    focusOnClose.id = 'focusOnClose';
    focusOnClose.setAttribute('tabindex', '-1'); // make it focusable
    wrapperElem.id = 'test';
    wrapperElem.setAttribute('aria-hidden', 'true');
    dialogDummy = {
      wrapper: wrapperElem,
      elemToConceal,
      goToDialog: sinon.spy(),
      isVisible: false,
      focusOnClose,
      dialogs: [randomElementThatWasActive],
    };
    randomElementThatWasActive = document.createElement('div');
    randomElementThatWasActive.setAttribute('tabindex', '-1'); // make it focusable
    removeEventListenerStub = sinon.stub(document.body, 'removeEventListener');
  }
});
/* eslint-enable no-use-before-define, prefer-arrow-callback, func-names, no-underscore-dangle */
