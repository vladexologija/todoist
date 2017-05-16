'use strict'
var mongo = require('../db');

exports.up = function(next) {

  mongo.connect( function ( err, db ) {
    var collection = db.collection('projects');

    collection.insert({
      name: 'Inbox',
      color: '#c9c9c9',
      isDeleted: false
    }, function(err, item) {
      if (err)
        return next(err);

      db.close();
      next();
    });
  });

};

exports.down = function(next) {
  next();
};
