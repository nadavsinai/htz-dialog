import sinon from 'sinon'

describe('addEventListeners', () => {
  let htzDialog;
  beforeEach(function (done) {
    jsdom();
    System.import('htz-dialog').then(htz => {
      htzDialog = htz.default; //wrapper, dialogClass, elemToHide, appendTo
      done();
    });
  });

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
