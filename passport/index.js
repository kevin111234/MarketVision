const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return done(null, false, { message: '이메일이 존재하지 않습니다.' });
      }
      const isValid = await user.validPassword(password);
      if (!isValid) {
        return done(null, false, { message: '비밀번호가 올바르지 않습니다.' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};