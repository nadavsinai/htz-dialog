let htzDialog;
before(function (done) {
  System.import('htz-dialog').then(htz => {
    htzDialog = htz.default;
    done();
  });
});
describe('test initiation', () => {
  it('is a function', () => {
    expect(htzDialog).to.be.a('function');
  })
});
