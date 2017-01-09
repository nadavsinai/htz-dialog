import getFocus, { __RewireAPI__ } from './keepFocus';
describe('keepFocus', function () {
  it('call getFocusables module with container', function () {
    let spy = sinon.stub().returns([1,2]);
    __RewireAPI__.__Rewire__('getFocusables', spy);
    let c = {};
    getFocus(c,{});
    expect(spy).to.have.been.calledWith(c);

  });
});
