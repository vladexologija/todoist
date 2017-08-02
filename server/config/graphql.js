'use strict';

/**
 * Module dependencies.
 */

const path = require('path');
var graphqlHTTP = require('express-graphql');
var schema = require('./schema');
const logger = require('logger');

/**
 * Expose
 */

module.exports = function(app, passport) {
  app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true
    })
  );

  // NginX, CloudFront etc..
  if (process.env.NODE_ENV !== 'production') {
    app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname, '..', 'app', 'views', 'index.html'));
    });
  }

  /**
   * Error handling
   */

  app.use(function(err, req, res, next) {
    // treat as 404
    if (
      err.message &&
      (~err.message.indexOf('not found') ||
        ~err.message.indexOf('Cast to ObjectId failed'))
    ) {
      return next();
    }

    logger.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function(req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
