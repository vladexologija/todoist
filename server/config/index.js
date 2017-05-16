
/**
 * Module dependencies.
 */

const path = require('path');
const extend = require('util')._extend;

const development = require('./env/development');
const test = require('./env/test');
const production = require('./env/production');

const publicDir = path.normalize(__dirname + '/../public/')

let defaults = {
  root: path.normalize(__dirname + '/..'),
  publicDir: publicDir,
  liveReload: {
    enabled: false,
    options: {
      port: 35729
    }
  },
  less: {
    path: publicDir,
    options: {
      force: true
    }
  },
  logger: {
    morgan: 'dev'
  },
  cors: {
    exposedHeaders: ['Link']
  }
};

/**
 * Expose
 */

module.exports = {
  development: extend(development, defaults),
  test: extend(test, defaults),
  production: extend(production, defaults)
}[process.env.NODE_ENV || 'development'];
