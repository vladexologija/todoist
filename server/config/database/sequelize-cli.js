const config = require('../.')

module.exports = { 
  url: config.db.uri,
  dialect: config.db.type
};
