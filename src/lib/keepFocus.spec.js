import getFocus, { __RewireAPI__ } from './keepFocus';
describe('keepFocus - as used by keydown eventListner on key 9 (tab) ', function () {

  it('call getFocusables module with container', function () {
    let spy = sinon.stub().returns([1, 2]);
    __RewireAPI__.__Rewire__('getFocusables', spy);
    let c = {};
    getFocus(c, {});
    expect(spy).to.have.been.calledWith(c);
  });

  describe('if shift key is pressed (reverse tabbing) and focused item is the first in container', () => {
    it('prevents default event behaviour');
    it('keeps focus on the first element');
  });

  describe('if shift key is not pressed (forward tabbing) and focused item is the last in container', () => {
    it('prevents default event behaviour');
    it('keeps focus on the last element');
  })

});
