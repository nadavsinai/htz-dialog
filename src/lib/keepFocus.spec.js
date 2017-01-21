import getFocus, { __RewireAPI__ } from './keepFocus';

describe('keepFocus - as used by keydown eventListner on key 9 (tab) ', function () {
  let cleanup;

  it('call getFocusables module with container', function () {
    let mockGetFocusables = sinon.stub().returns([1, 2]);
    __RewireAPI__.__Rewire__('getFocusables', mockGetFocusables);
    let container = document.createElement('div');
    getFocus(container, {});
    expect(mockGetFocusables).to.have.been.calledWith(container);
  });

  describe('if shift key is pressed (reverse tabbing) and focused item is the first in container', () => {
    it('keeps focus on the first element', () => {
      const $container = document.createElement('div');
      const $input1 = document.createElement('input');
      const $input2 = document.createElement('input');
      $container.appendChild($input1);
      $container.appendChild($input2);
      $container.id="test";
      document.body.appendChild($container);
      $input1.focus();

      let event = document.createEvent('Event');
      event.keyCode = 9;
      event.shiftKey=true;
      event.initEvent('keydown',true,true);
      document.dispatchEvent(event);

      expect(document.activeElement).to.be.equals($input1);
      $container.remove();

    });



    it('prevents default event behaviour', () => {
      const $container = document.createElement('div');
      const $input1 = document.createElement('input');
      const $input2 = document.createElement('input');
      const preventDefaultpy   = sinon.spy(Event.prototype,'preventDefault');
      $container.appendChild($input1);
      $container.appendChild($input2);
      $container.id="test";
      document.body.appendChild($container);
      $input1.focus();

      let event = document.createEvent('Event');
      event.keyCode = 9;
      event.shiftKey=true;
      event.initEvent('keydown',true,true);
      document.dispatchEvent(event);

      getFocus($container,event);
      expect(preventDefaultpy).to.have.been.calledOnce;

      preventDefaultpy.restore();
      $container.remove();
    });
  });

  describe('if shift key is not pressed (forward tabbing) and focused item is the last in container', () => {
    it('prevents default event behaviour', () => {
      const $container = document.createElement('div');
      const $input1 = document.createElement('input');
      const $input2 = document.createElement('input');
      const preventDefaultpy   = sinon.spy(Event.prototype,'preventDefault');
      $container.appendChild($input1);
      $container.appendChild($input2);
      $container.id="test";
      document.body.appendChild($container);
      $input1.focus();

      let event = document.createEvent('Event');
      event.keyCode = 9;
      event.shiftKey=false;
      event.initEvent('keydown',true,true);
      document.dispatchEvent(event);

      getFocus($container,event);
      expect(preventDefaultpy).to.have.been.calledOnce;

      preventDefaultpy.restore();
      $container.remove();

    });
    it('keeps focus on the last element' , () =>{
      const $container = document.createElement('div');
      const $input1 = document.createElement('input');
      const $input2 = document.createElement('input');
      $container.appendChild($input1);
      $container.appendChild($input2);
      $container.id="test";
      document.body.appendChild($container);
      $input2.focus();

      let event = document.createEvent('Event');
      event.keyCode = 9;
      event.shiftKey=false;
      event.initEvent('keydown',true,true);
      document.dispatchEvent(event);

      getFocus($container,event);
      expect(document.activeElement).to.be.equals($input2);
      $container.remove();

    });
  })

});
