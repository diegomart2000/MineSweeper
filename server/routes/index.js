const compose = require('lodash/fp/compose');

const User = require('./api/User');
const Game = require('./api/Game');

module.exports = compose(
  User,
  Game,
);
