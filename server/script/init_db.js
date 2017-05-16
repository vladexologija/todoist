var config = require('../config'),
  logger = require('../lib/logger')
  pg = require('pg');

// connect to postgres db
logger.debug('connecting to:', config.db.uri)
pg.connect(config.db.uri, function(err, client, done) {
    if (err) {
      return logger.error(err)
    }

    logger.debug('connection created')
    // create the db and ignore any errors, for example if it already exists.
    client.query('CREATE DATABASE ' + config.db.name, function(err) {
      if (err) {
        return logger.error(err)
      }

      client.end(); // close the connection
    });
});
