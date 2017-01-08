import  htzDialog from './index';

describe('test initiation', () => {
  it('is a function', () => {
    expect(htzDialog).to.be.a('function');
  });

  it('throws if first argument is not instance of HTMLElemnt', function () {
    expect(() => {
      htzDialog();
    }).to.throw('the argument provided as the `wrapper` parameter must be an HTMLElement');
  });
});
