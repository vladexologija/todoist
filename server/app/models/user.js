const config = require('../../config')
module.exports = require('./user-' + config.db.type);
