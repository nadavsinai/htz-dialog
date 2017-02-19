import {allInstances,getInstance} from './instances';
describe('getInstances', function () {

    it('gets instance via reference', function () {
      let wrapper = document.createElement('div');
      document.body.appendChild(wrapper);
      let dialogMock = {wrapper};
      allInstances.push(dialogMock);
      let found = getInstance(wrapper);
      expect(found).to.exist();
    });

    it('gets instance via id', function () {
      let wrapper = document.createElement('div');
      wrapper.id = 'test';
      document.body.appendChild(wrapper);
      let dialogMock = {wrapper};
      allInstances.push(dialogMock);
      let found =getInstance('test');
      expect(found).to.exist();
    });

    it('returns undefined for unfound object',function (){
      let wrapper = document.createElement('div');
      document.body.appendChild(wrapper);
      let found =getInstance(wrapper);
      expect(found).not.to.exist("Object not found");
    });

    it('returns undefined for unfound selector',function (){
      let found =getInstance('nonExistId');
      expect(found).not.to.exist("Selector not found");
    });
});
