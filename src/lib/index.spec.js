let htzDialog;
import sinon from 'sinon'
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

  it('moves wrapper if attribute data-htz-dialog-append-to exists and its value is found on document via getElementById')
  it('returns public api')

});
describe('it adds event listeners', () => {
  it('adds show/hide event listeners to buttons found via attributes', () => {
    let wrapper = document.createElement('div');
    wrapper.id = 'test';
    let button = document.createElement('button');
    button.setAttribute('data-htz-dialog-show', 'test');
    button.addEventListener = sinon.spy();
    wrapper.appendChild(button);
    document.body.appendChild(wrapper);
    let api = htzDialog(wrapper);
    expect(button.addEventListener).to.have.been.calledWith('click', api.show)
  });
  it('adds next/prev event listeners to buttons found via attributes', () => {

  });

  it('adds onKeyDown listener to the wrapper for keyCode 27 if element is visible')
});

describe('getInstance static function', () => {
  it('checks getInstance returns instance by id');
  it('checks getInstance returns instance by Element');
  it('checks getInstance returns undefined for not found id/element');
});

