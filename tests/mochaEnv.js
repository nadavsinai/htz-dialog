require('source-map-support/register');
global.jsdom = require('jsdom-global');
const chai = require('chai'),
  sinonChai = require('sinon-chai'),
  chaiDirty = require('dirty-chai'),
  chaiAsPromised = require("chai-as-promised");
global.expect = chai.expect;
global.sinon = require('sinon');
chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiDirty); //should come last

