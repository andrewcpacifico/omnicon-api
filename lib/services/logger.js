const pino = require('pino');

class Logger {
  constructor(container) {
    this.container = container;
  }
}

const config = require('../config');

module.exports = pino(config.get('logger'));
