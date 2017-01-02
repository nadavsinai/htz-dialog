const jsdom = require('mocha-jsdom'),
  chai = require('chai'),
  mocha = require('mocha'),
  sinonChai = require('sinon-chai'),
  chaiDirty = require('dirty-chai'),
  chaiAsPromised = require("chai-as-promised");

global.expect = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiDirty); //should come last
global.jsdom = jsdom;

require('babel-register');
const System = require('systemjs');
global.System = System;
require('../jspm.config.js');
