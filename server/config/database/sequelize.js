const config = require('../.')
const logger = require('logger')
const Sequelize = require('sequelize');

const options = {
  dialect: 'postgres',
  logging: logger.debug,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
};

logger.debug('Connecting to:', config.db.uri);
module.exports = new Sequelize(config.db.uri, options);
