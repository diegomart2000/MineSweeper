const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const UserService = require('../service/UserService');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SALT,
};

passport.use(new Strategy(opts, async (jwtPayload, done) => {
  try {
    const user = await UserService.get(jwtPayload._id);
    const { _id, email, name } = user.toJSON();
    done(null, { _id, email, name } );
  } catch (err) {
    done(err);
  }
}));

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (_id, done) => {
  try {
    const user = await UserService.get(_id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
