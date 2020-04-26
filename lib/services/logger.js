class Logger {
  constructor(container) {
    this.container = container;
  }

  init() {
    const { configService, pino } = this.container;
    this.pinoLogger = pino(configService.get('logger'));
  }

  info(...args) {
    this.pinoLogger.info(...args);
  }

  debug(...args) {
    this.pinoLogger.debug(...args);
  }

  error(...args) {
    this.pinoLogger.error(...args);
  }
}

module.exports = Logger;
