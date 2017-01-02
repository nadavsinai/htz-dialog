describe('getInstance static function', () => {
  let getInstance;
  let myState;
  beforeEach((done) => {
    myState = [];
    System.set(System.normalizeSync('htz-dialog/lib/dialogsState'), System.newModule({
      getAllInstances: () => {
        return myState;
      }
    }));
    System.import('htz-dialog/lib/getInstance').then(htz => {
      getInstance = htz.default;
      done();
    });
  });
  it('checks getInstance returns instance by id', () => {
    let div = document.createElement('div');
    div.id = 'someId';
    document.body.appendChild(div);
    myState.push({wrapper: div});
    let retVal = getInstance('someId');
    expect(retVal).to.be.instanceof(HTMLElement);
  });
  it('checks getInstance returns instance by Element');
  it('checks getInstance returns undefined for not found id/element');
});
