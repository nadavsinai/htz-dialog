import  htzDialog from './index';

describe('test initiation', () => {
  it('is a function', () => {
    expect(htzDialog).to.be.a('function');
  });

  it('throws if first argument is not instance of HTMLElemnt', function () {

    let tries = [undefined,[],{},'a',1, new Map()];
    for (let test of tries) {
      expect(() => {
        htzDialog(test);
      }).to.throw('the argument provided as the `wrapper` parameter must be an HTMLElement');
    }
  });



});
