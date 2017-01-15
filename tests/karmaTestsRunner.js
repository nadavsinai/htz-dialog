import chaiAsPromised from 'chai-as-promised';
import dirtyChai from 'dirty-chai';

chai.use(chaiAsPromised);
chai.use(dirtyChai);

const testsContext = require.context('../src', true, /\.spec.js$/);
testsContext.keys().forEach(function (path) {
  try {
    testsContext(path);
  }
  catch (err) {
    console.error('[ERROR] WITH SPEC FILE: ', path);  // eslint-disable-line
    console.error(err);  // eslint-disable-line
  }
});
