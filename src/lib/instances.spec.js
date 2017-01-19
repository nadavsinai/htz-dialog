import {allInstances,getInstance} from './instances';
describe('getInstances', function () {

    it('gets instance via reference');

    it('gets instance via id', function () {
      let wrapper = document.createElement('div');
      wrapper.id = 'test';
      document.body.appendChild(wrapper);
      let dialogMock = {wrapper};
      allInstances.push(dialogMock);
      let found =getInstance('test');
      expect(found).to.exist();
    });

    it('returns undefined for unfound object');
    it('returns undefined for unfound selector');
});
