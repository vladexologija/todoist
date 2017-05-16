const config = require('../../config')
module.exports = require('./item-' + config.db.type);
