require('dotenv').config();

global.chai = require('chai');
global.assert = chai.assert;
global.expect = chai.expect;
chai.should();
chai.config.includeStack = true;

process.env.NODE_ENV = 'test';
