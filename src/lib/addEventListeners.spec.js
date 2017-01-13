// import  simulant from 'simulant';
import  addEventListeners, { __RewireAPI__ } from './addEventListeners';

describe('Event handling', () => {
  describe('Click events', () => {
    it('executes show() on a button found via attribute inside the wrapper is clicked', () => {
      const wrapper = document.createElement('div');
      wrapper.id = 'test';
      const button = document.createElement('button');
      button.setAttribute('data-htz-dialog-show', 'test');
      document.body.appendChild(wrapper);
      document.body.appendChild(button);

      const dialogState = { wrapperId: wrapper.id, wrapper, show: sinon.spy() };
      addEventListeners(dialogState);
      button.click();
      expect(dialogState.show).to.have.been.called();
      wrapper.remove();
      button.remove();
    });

    it('executes hide() on a button found via attribute inside the wrapper is clicked', () => {
      const wrapper = document.createElement('div');
      wrapper.id = 'test';
      const button = document.createElement('button');
      button.setAttribute('data-htz-dialog-hide', '');
      wrapper.appendChild(button);
      document.body.appendChild(wrapper);

      const dialogState = { wrapperId: wrapper.id, wrapper, hide: sinon.spy() };
      addEventListeners(dialogState);
      button.click();
      expect(dialogState.hide).to.have.been.called();
      wrapper.remove();
    });

    it('executes hide() on a button found via attribute outside the wrapper is clicked', () => {
      const wrapper = document.createElement('div');
      wrapper.id = 'test';
      const button = document.createElement('button');
      button.setAttribute('data-htz-dialog-hide', 'test');
      const dialogState = { wrapperId: wrapper.id, wrapper, hide: sinon.spy() };
      document.body.appendChild(wrapper);
      document.body.appendChild(button);

      addEventListeners(dialogState);
      button.click();
      expect(dialogState.hide).to.have.been.called();
      wrapper.remove();
      button.remove();
    });

    it('Executes hide() when the wrapper is clicked', () => {
      const wrapper = document.createElement('div');
      const dialogState = { wrapperId: wrapper.id, wrapper, hide: sinon.spy() };
      document.body.appendChild(wrapper);

      addEventListeners(dialogState);
      wrapper.click();
      expect(dialogState.hide).to.have.been.called();
      wrapper.remove();
    });

    it('Does not execute hide() when an element inside the wrapper is clicked', () => {
      const wrapper = document.createElement('div');
      const dialog = document.createElement('div');
      const dialogState = { wrapperId: wrapper.id, wrapper, hide: sinon.spy() };

      wrapper.appendChild(dialog);
      document.body.appendChild(wrapper);

      addEventListeners(dialogState);
      dialog.click();
      expect(dialogState.hide).to.not.have.been.called();
      wrapper.remove();
    });

    it('executes next() when a next button found via attribute is clicked', () => {
      const wrapper = document.createElement('div');
      wrapper.id = 'test';
      const button = document.createElement('button');
      button.setAttribute('data-htz-dialog-next', '');
      wrapper.appendChild(button);
      document.body.appendChild(wrapper);

      const dialogState = { wrapperId: wrapper.id, wrapper, next: sinon.spy() };
      addEventListeners(dialogState);
      button.click();
      expect(dialogState.next).to.have.been.called();
      wrapper.remove();
    });

    it('executes prev() when a prev button found via attribute is clicked', () => {
      const wrapper = document.createElement('div');
      wrapper.id = 'test';
      const button = document.createElement('button');
      button.setAttribute('data-htz-dialog-prev', '');
      wrapper.appendChild(button);
      document.body.appendChild(wrapper);

      const dialogState = { wrapperId: wrapper.id, wrapper, prev: sinon.spy() };
      addEventListeners(dialogState);
      button.click();
      expect(dialogState.prev).to.have.been.called();
      wrapper.remove();
    });
  });

  describe('Keydown events on the wrapper', () => {
    it('adds keydown listener to the wrapper', () => {
      const simulant = require('simulant');

      const wrapper = document.createElement('div');
      wrapper.id = 'test';
      wrapper.addEventListener = sinon.spy();

      document.body.appendChild(wrapper);

      const dialogState = { wrapperId: wrapper.id, wrapper };

      addEventListeners(dialogState);
      simulant.fire(wrapper, 'keydown');

      // First call adds the 'hide' 'click' handler,
      // second call is the relevant one.
      // This is a little brittle. Is there no better,
      // less execution-order dependent way to do this?
      expect(wrapper.addEventListener.getCall(1).args[0]).to.equal('keydown');
    });

    it('executes hide() on keydown when keyCode is 27 and wrapper is visible', () => {
      const simulant = require('simulant');

      const wrapper = document.createElement('div');
      wrapper.id = 'test';

      document.body.appendChild(wrapper);

      const dialogState = { wrapperId: wrapper.id, wrapper, isVisible: true, hide: sinon.spy() };

      addEventListeners(dialogState);
      simulant.fire(wrapper, 'keydown', { keyCode: 27 });

      expect(dialogState.hide).to.have.been.called();
    });

    it('Does not execute hide() on keydown when keyCode is 27 and wrapper is *NOT* visible', () => {
    const simulant = require('simulant');

      const wrapper = document.createElement('div');
      wrapper.id = 'test';

      document.body.appendChild(wrapper);

      const dialogState = { wrapperId: wrapper.id, wrapper, isVisible: false, hide: sinon.spy() };

      addEventListeners(dialogState);
      simulant.fire(wrapper, 'keydown', { keyCode: 27 });

      expect(dialogState.hide).to.not.have.been.called();
    });

    it('executes keepFocus on keydown when keyCode is 9 and wrapper is visible', () => {
      const simulant = require('simulant');

      const wrapper = document.createElement('div');
      wrapper.id = 'test';

      document.body.appendChild(wrapper);

      const dialogState = { wrapperId: wrapper.id, wrapper, isVisible: true };
      const keepFocusSpy = sinon.spy();

      // 1st way
      __RewireAPI__.__Rewire__('keepFocus', keepFocusSpy);

      // 2nd way
      // addEventListeners.__Rewire__('keepFocus', keepFocusSpy);

      // 3rd way
      // const keepFocus = addEventListeners.__get__('keepFocus');
      // const keepFocusSpy = sinon.spy(keepFocus);
      // addEventListeners.__set__('keepFocus', keepFocusSpy);

      addEventListeners(dialogState);
      simulant.fire(wrapper, 'keydown', { keyCode: 9 });

      expect(keepFocusSpy).to.have.been.called();
    });

    // it('Does not execute keepFocus on keydown when keyCode is 9 and wrapper is not visible', () => {
    //  const simulant = require('simulant');
    //
    //   const wrapper = document.createElement('div');
    //   wrapper.id = 'test';
    //
    //   document.body.appendChild(wrapper);
    //
    //   const dialogState = { wrapperId: wrapper.id, wrapper, isVisible: false };
    //   const keepFocusSpy = sinon.spy();
    //   __RewireAPI__.__Rewire__('keepFocus', keepFocusSpy);
    //
    //   addEventListeners(dialogState);
    //   simulant.fire(wrapper, 'keydown', { keyCode: 9 });
    //
    //   expect(keepFocusSpy).to.not.have.been.called();
    // });
  });
});
