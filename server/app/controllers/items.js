const config = require('../../config')
module.exports = require('./items-' + config.db.type);
