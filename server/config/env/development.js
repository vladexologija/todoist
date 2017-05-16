
/**
 * Expose
 */
var maxAge = 24 * 60 * 60 * 1000;

module.exports = {
  db: {
    name: 'todoist_development',
    type: 'mongodb',
    uri: 'mongodb://localhost:27017/todoist_development'
    // type: 'sequelize',
    // uri: 'postgres://localhost:5432/todoist_development'
  },
  redis: {
    host: 'localhost',
    port: 6379,
    maxAge: maxAge
  },
  facebook: {
    clientID: 'APP_ID',
    clientSecret: 'SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    scope: [
      'email',
      'user_about_me',
      'user_friends'
    ]
  },
  google: {
    clientID: 'APP_ID',
    clientSecret: 'SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.google.com/m8/feeds',
    ]
  }
};
