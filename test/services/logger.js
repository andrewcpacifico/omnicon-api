const Logger = require('../../lib/services/logger');

describe('LoggerService', function () {
  let container;

  beforeEach(function () {
    container = {
      configService: { get() {} },
      pino: () => ({ info() {}, debug() {}, error() {} }),
    };
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('init', function () {
    it('should create a pino logger', function () {
      const configValue = { a: true };
      const pinoInstance = {};

      container.configService.get = sinon.stub().returns(configValue);
      container.pino = sinon.stub().returns(pinoInstance);

      const loggerService = new Logger(container);
      loggerService.init();

      expect(container.pino).to.have.been.calledOnceWith(configValue);
      expect(loggerService.pinoLogger).to.be.equal(pinoInstance);
    });

    it('should get logger configuration', function () {
      const configValue = { a: true };

      container.configService.get = sinon.stub().returns(configValue);

      const loggerService = new Logger(container);
      loggerService.init();

      expect(container.configService.get).to.have.been.calledOnceWith('logger');
    });
  });

  describe('info', function () {
    it('should call pino info', function () {
      const params = ['1', '2'];
      const loggerService = new Logger(container);
      loggerService.pinoLogger = { info: sinon.stub() };

      loggerService.info(...params);

      expect(loggerService.pinoLogger.info).to.have.been.calledOnceWith(...params);
    });
  });

  describe('debug', function () {
    it('should call pino debug', function () {
      const params = ['1', '2'];
      const loggerService = new Logger(container);
      loggerService.pinoLogger = { debug: sinon.stub() };

      loggerService.debug(...params);

      expect(loggerService.pinoLogger.debug).to.have.been.calledOnceWith(...params);
    });
  });

  describe('error', function () {
    it('should call pino error', function () {
      const params = ['1', '2'];
      const loggerService = new Logger(container);
      loggerService.pinoLogger = { error: sinon.stub() };

      loggerService.error(...params);

      expect(loggerService.pinoLogger.error).to.have.been.calledOnceWith(...params);
    });
  });
});
