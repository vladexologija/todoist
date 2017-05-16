const config = require('../../../config'),
      MongoClient = require('mongodb').MongoClient;

var connect = function ( callback ) {
  MongoClient.connect(config.db.uri, function(err, db) {
    callback( err, db );
  });
}

module.exports = {
  connect: connect
};
