const compose = require('lodash/fp/compose');

const Root = require('./api/Root');
const User = require('./api/User');
const Game = require('./api/Game');

module.exports = compose(
  Root,
  User,
  Game,
);
