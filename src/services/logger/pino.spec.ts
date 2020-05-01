import sinon from 'sinon';
import { expect } from 'chai';

import { PinoLoggerService } from '.';

describe('PinoLoggerService', function () {
  let container: any;
  let pinoInstance: any;

  beforeEach(function () {
    pinoInstance = { info() {}, debug() {}, error() {} };
    container = {
      configService: { get: () => {} },
      pino: () => pinoInstance,
    };
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('init', function () {
    it('should create a pino logger', function () {
      const pinoSpy = sinon.spy(container, 'pino');

      const loggerService = new PinoLoggerService(container);
      loggerService.init();

      expect(pinoSpy).to.have.been.calledOnce;
    });

    it('should get logger configuration', function () {
      const config = { a: 1 };
      const configServiceStub = sinon.stub(container.configService, 'get')
        .returns(config);
      const pinoSpy = sinon.spy(container, 'pino');

      const loggerService = new PinoLoggerService(container);
      loggerService.init();

      expect(configServiceStub).to.have.been.calledOnceWith('logger');
      expect(pinoSpy).to.have.been.calledOnceWith(config);
    });
  });

  describe('info', function () {
    it('should call pino info', function () {
      const params = ['1', '2'];
      const loggerService = new PinoLoggerService(container);
      loggerService['pinoLogger'] = pinoInstance;

      sinon.stub(loggerService['pinoLogger'], 'info');

      loggerService.info('a', ...params);

      expect(loggerService['pinoLogger'].info).to.have.been.calledOnceWith('a', ...params);
    });
  });

  describe('debug', function () {
    it('should call pino debug', function () {
      const params = ['1', '2'];
      const loggerService = new PinoLoggerService(container);
      loggerService['pinoLogger'] = pinoInstance;

      sinon.stub(loggerService['pinoLogger'], 'debug');

      loggerService.debug('a', ...params);

      expect(loggerService['pinoLogger'].debug).to.have.been.calledOnceWith('a', ...params);
    });
  });

  describe('error', function () {
    it('should call pino error', function () {
      const params = ['1', '2'];
      const loggerService = new PinoLoggerService(container);
      loggerService['pinoLogger'] = pinoInstance;

      sinon.stub(loggerService['pinoLogger'], 'error');

      loggerService.error('a', ...params);

      expect(loggerService['pinoLogger'].error).to.have.been.calledOnceWith('a', ...params);
    });
  });
});
