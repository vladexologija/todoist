const config = require('../../config')
module.exports = require('./project-' + config.db.type);
