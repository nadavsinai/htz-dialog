let htzDialog;
beforeEach(function (done) {
  jsdom();
  System.import('htz-dialog').then(htz => {
    htzDialog = htz.default; //wrapper, dialogClass, elemToHide, appendTo
    done();
  });
});
describe('test initiation', () => {


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
    let api = htzDialog(wrapper, undefined, undefined, appendTo);
    expect(wrapper.parentElement).to.equal(appendTo);
  });


});
describe('it adds event listeners', () => {
})