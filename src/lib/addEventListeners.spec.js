import simulant from 'simulant';
import addEventListeners, { __RewireAPI__ } from './addEventListeners';

describe('Event handling', () => {
  const rewire = __RewireAPI__.__Rewire__; // eslint-disable-line no-underscore-dangle

  describe('Click events', () => {
    function prep(btnAttr, btnAttrValue = '') {
      const wrapper = document.createElement('div');
      wrapper.id = 'test';
      const button = document.createElement('button');
      button.setAttribute(btnAttr, btnAttrValue);

      return [wrapper, button];
    }

    it('executes show() on a button found via attribute inside the wrapper is clicked', () => {
      const [wrapper, button] = prep('data-htz-dialog-show', 'test');

      document.body.appendChild(wrapper);
      document.body.appendChild(button);

      const dialogState = { wrapperId: wrapper.id, wrapper, show: sinon.spy() };

      addEventListeners(dialogState);
      button.click();
      expect(dialogState.show).to.have.been.called();

      // Cleanup
      wrapper.remove();
      button.remove();
    });

    it('executes hide() on a button found via attribute inside the wrapper is clicked', () => {
      const [wrapper, button] = prep('data-htz-dialog-hide');

      wrapper.appendChild(button);
      document.body.appendChild(wrapper);

      const dialogState = { wrapperId: wrapper.id, wrapper, hide: sinon.spy() };
      addEventListeners(dialogState);
      button.click();
      expect(dialogState.hide).to.have.been.called();

      // Cleanup
      wrapper.remove();
    });

    it('executes hide() on a button found via attribute outside the wrapper is clicked', () => {
      const [wrapper, button] = prep('data-htz-dialog-hide', 'test');
      const dialogState = { wrapperId: wrapper.id, wrapper, hide: sinon.spy() };

      document.body.appendChild(wrapper);
      document.body.appendChild(button);

      addEventListeners(dialogState);
      button.click();
      expect(dialogState.hide).to.have.been.called();

      // Cleanup
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

      // Cleanup
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

      // Cleanup
      wrapper.remove();
    });

    it('executes next() when a next button found via attribute is clicked', () => {
      const [wrapper, button] = prep('data-htz-dialog-next');
      button.setAttribute('data-htz-dialog-next', '');
      wrapper.appendChild(button);
      document.body.appendChild(wrapper);

      const dialogState = { wrapperId: wrapper.id, wrapper, next: sinon.spy() };
      addEventListeners(dialogState);
      button.click();
      expect(dialogState.next).to.have.been.called();

      // Cleanup
      wrapper.remove();
    });

    it('executes prev() when a prev button found via attribute is clicked', () => {
      const [wrapper, button] = prep('data-htz-dialog-prev');
      wrapper.appendChild(button);
      document.body.appendChild(wrapper);

      const dialogState = { wrapperId: wrapper.id, wrapper, prev: sinon.spy() };
      addEventListeners(dialogState);
      button.click();
      expect(dialogState.prev).to.have.been.called();

      // Cleanup
      wrapper.remove();
    });
  });

  describe('Keydown events on the wrapper', () => {
    function prep(isVisible, keyCode) {
      const hideSpy = sinon.spy();
      const keepFocusSpy = sinon.spy();
      rewire('keepFocus', keepFocusSpy);

      const wrapper = document.createElement('div');
      wrapper.id = 'test';
      const dialogState = { wrapperId: wrapper.id, wrapper, isVisible, hide: hideSpy };

      document.body.appendChild(wrapper);
      addEventListeners(dialogState);
      simulant.fire(wrapper, 'keydown', { keyCode });

      return {
        wrapper,
        dialogState,
        keepFocusSpy,
        cleanup: () => {
          wrapper.remove();
          __RewireAPI__ // eslint-disable-line no-underscore-dangle
            .__ResetDependency__('keepFocus'); // eslint-disable-line no-underscore-dangle
        },
      };
    }

    it('hides open dialogs when "Esc" is clicked (This doesn\'t work)', () => {
      const { dialogState, cleanup } = prep(true, 27);

      expect(dialogState.hide).to.have.been.called();

      // Cleanup
      cleanup();
    });

    it('Does not execute hide() when "Esc" is clicked wrapper is *NOT* visible', () => {
      const { dialogState, cleanup } = prep(false, 27);

      expect(dialogState.hide).to.not.have.been.called();

      // Cleanup
      cleanup();
    });

    it('executes keepFocus "Tab" is clicked and wrapper is visible', () => {
      const { keepFocusSpy, cleanup } = prep(true, 9);

      expect(keepFocusSpy).to.have.been.called();

      // Cleanup
      cleanup();
    });

    it('Does not execute keepFocus "Tab" is clicked and wrapper is *NOT* visible', () => {
      const { keepFocusSpy, cleanup } = prep(false, 9);

      expect(keepFocusSpy).to.not.have.been.called();

      // Cleanup
      cleanup();
    });
  });
});
