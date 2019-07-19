const passport = require('../util/passport');

module.exports = passport.authenticate('jwt', { session: false });
