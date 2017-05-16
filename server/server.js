'use strict';

require('dotenv').config();
require('app-module-path').addPath(__dirname + '/lib');

const fs = require('fs');
const join = require('path').join;
const express = require('express');
const passport = require('passport');
const cluster = require('cluster');
const config = require('./config');
const logger = require('logger');

const port = process.env.PORT || 3000;

const app = express();

// Bootstrap database
const connection = require('./config/database');
// connection
//   .on('error', logger.error)
//   .on('disconnected', logger.warn)
//   .once('open', listen);
listen();

// Bootstrap models so they can be fetched via require('mongoose').model
// For more complex apss consider using Electrolyte IOC instead of app-module-path and bootstraping
// const models = join(__dirname, 'app/models');
// fs.readdirSync(models)
//   .filter(file => ~file.indexOf('.js'))
//   .forEach(file => require(join(models, file)));

require('./config/passport')(passport);
require('./config/express')(app, passport, logger);
require('./config/routes')(app, passport);

function listen () {
  if (app.get('env') === 'test') return;

  if (cluster.isMaster && config.clusteringEnabled) {
    require('./config/clustering')(logger.debug);
  } else {
    app.listen(port);
    logger.debug('Express app started on port ' + port);
  }
}

module.exports = {
  app,
  connection
};
