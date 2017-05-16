const Sequelize = require('sequelize');
const db = require('../../config/database');

let User = db.define('User', {
  name: Sequelize.TEXT,
  email: Sequelize.TEXT,
  hashed_password: Sequelize.TEXT,
  salt: Sequelize.TEXT
});

module.exports = User;
