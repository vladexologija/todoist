const config = require('../.')
const logger = require('logger')
const mongoose = require('mongoose');

const options = {
  server: {
    socketOptions: {
      keepAlive: 1
    }
  }
};

logger.debug('Connecting to:', config.db.uri);
module.exports = mongoose.connect(config.db.uri, options).connection;
