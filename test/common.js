global.chaiAsPromised = require('chai-as-promised');
global.mockery = require('mockery');
global.chai = require('chai');
global.assert = chai.assert;
global.expect = chai.expect;

chai.should();
chai.config.includeStack = true;
chai.use(chaiAsPromised);

process.env.NODE_ENV = 'test';