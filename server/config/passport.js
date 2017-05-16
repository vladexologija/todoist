'use strict';

const local = require('./passport/local');
const User = require('../app/models/user');

module.exports = function (passport) {
  // serialize and deserialize sessions
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => User.findOne({ _id: id }, done));

  // use these strategies
  passport.use(local);
};
