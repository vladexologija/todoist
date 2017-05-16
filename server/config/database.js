const config = require('./');
module.exports = require('./database/' + config.db.type);
