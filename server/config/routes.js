'use strict';

/**
 * Module dependencies.
 */

const express = require('express');
const path = require('path');
const csrf = require('csurf');
const items = require('../app/controllers/items');
const projects = require('../app/controllers/projects');
const logger = require('logger')

/**
 * Expose
 */

module.exports = function (app, passport) {
  const router = express.Router();

  router.get('/items', items.list);
  router.get('/items/:id', items.info);
  router.post('/items', items.create);
  router.put('/items/:id', items.update);
  router.delete('/items/:id', items.delete);

  router.get('/projects', projects.list);
  router.get('/projects/:id', projects.info);
  router.post('/projects', projects.create);
  router.put('/projects/:id', projects.update);
  router.delete('/projects/:id', projects.delete);

  app.use('/api', router);

  // NginX, CloudFront etc..
  if (process.env.NODE_ENV !== 'production') {
    app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname, '..','app', 'views', 'index.html'));
    });
  }

  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }

    logger.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
