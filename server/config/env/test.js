
/**
 * Expose
 */

module.exports = {
  db: {
    name: 'todoist_test',
    // type: 'mongodb',
    // uri: 'mongodb://localhost:27017/todoist_test'
    type: 'sequelize',
    uri: 'postgres://localhost:5432/todoist_test'
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
