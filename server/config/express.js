
/**
 * Module dependencies.
 */

const express = require('express');
const session = require('express-session');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const csrf = require('csurf');
const path = require('path');
const mongoStore = require('connect-mongo')(session);
const redisStore = require('connect-redis')(session);
const flash = require('connect-flash');
const winston = require('winston');
const swig = require('swig');
const helpers = require('view-helpers');
const config = require('./');
const pkg = require('../package.json');
const routes = require('./routes');
const lessMiddleware = require('less-middleware');
const cors = require('cors');

const env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */

module.exports = function (app, passport, logger) {

  // Compression middleware (should be placed before express.static)
  app.use(compression({
    threshold: 512
  }));

  // NginX, CloudFront etc..
  // app.use(lessMiddleware(config.less.path, config.less.options));
  // app.use(express.static(config.root + '/public'));

  // Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
  app.use(methodOverride());

  // Logging middleware
  if (env !== 'test') app.use(require('morgan')(config.logger.morgan, { 'stream': logger.stream }));

  // set views path and default layout
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('views', config.root + '/app/views');

  // expose package.json to views
  app.use(function (req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
  });

  // bodyParser should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

  // cookieParser should be above session
  app.use(cookieParser());
  app.use(cookieSession({ secret: 'secret' }));
  app.use(session({
    secret: pkg.name,
    proxy: true,
    resave: true,
    saveUninitialized: true,
    store: new redisStore(config.redis)
    // storing cookies in mongo alternative
    // store: new mongoStore({
    //   url: config.db,
    //   collection : 'sessions'
    // })
  }));

  // enable cors
  app.use(cors(config.cors));

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // connect flash for flash messages - should be declared after sessions
  app.use(flash());

  // should be declared after session and flash
  app.use(helpers(pkg.name));

  // Nothing ever comes from 'x-powered-by', but a security hole
  app.disable('x-powered-by');

};
