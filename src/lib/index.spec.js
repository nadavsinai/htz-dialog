import htzDialog from '../index';
describe('test initiation', () => {
  let cleanUp;

  before(() => {
    cleanUp = jsdom();
  });
  after(() => {
    cleanUp();
  });


  it('is a function', () => {
    expect(htzDialog).to.be.a('function');
  });

  it('will throw if wrapper argument  is not an HTMLElement', function () {
    expect(() => {
      htzDialog()
    }).to.throw('the argument provided as the `wrapper` parameter must be an HTMLElement');
  });
  it('will throw if appendTo argument is not an HTMLElement', function () {
    expect(() => {
      htzDialog(document.createElement('div'), '', '', {});
    }).to.throw(/param must be an Element/);
  });

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


