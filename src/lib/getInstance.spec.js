import {getAllInstances} from "./dialogsState";
import getInstance from "./getInstance";
describe('getInstance static function', () => {
  it('checks getInstance returns instance by id', () => {
    let div = document.createElement('div');
    div.id = 'someId';
    document.body.appendChild(div);
    let target = {wrapper: div};
    getAllInstances().push(target);
    let retVal = getInstance('someId');
    expect(retVal).to.be.eq(target);
  });
  it('checks getInstance returns instance by Element');
  it('checks getInstance returns undefined for not found id/element');
});
