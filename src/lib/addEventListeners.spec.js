import  addEventListners from './addEventListners';
describe('it adds event listeners', () => {
  it('adds show/hide event listeners to buttons found via attributes', () => {
    let wrapper = document.createElement('div');
    wrapper.id = 'test';
    let button = document.createElement('button');
    button.setAttribute('data-htz-dialog-show', 'test');
    wrapper.appendChild(button);
    document.body.appendChild(wrapper);
    let dialogState = { wrapper, show: sinon.spy()}
    addEventListners({ wrapper });
    button.click();
    expect(dialogState.show).to.have.been.called();
  });
  it('adds next/prev event listeners to buttons found via attributes');

  it('adds onKeyDown listener to the wrapper for keyCode 27 if element is visible');
});
