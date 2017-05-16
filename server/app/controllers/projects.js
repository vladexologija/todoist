const config = require('../../config')
module.exports = require('./projects-' + config.db.type);
