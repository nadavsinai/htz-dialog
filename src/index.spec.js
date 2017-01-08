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

  it('will throw if appendTo argument is not an HTMLElement', function () {
    expect(() => {
      htzDialog(document.createElement('div'), '', '', {});
    }).to.throw(/param must be an Element/);
  });


  it('todo - will works on all dialogs defined with the dialogClass');

  it('moves wrapper to appendTo element', () => {
    let wrapper = document.createElement('div');
    wrapper.id = 'TestWrapper';
    let appendTo = document.createElement('div');
    htzDialog(wrapper, undefined, undefined, appendTo);
    expect(wrapper.parentElement).to.equal(appendTo);
  });

  it('moves wrapper if attribute data-htz-dialog-append-to exists and its value is found on document via getElementById')
  it('returns public api')

});



