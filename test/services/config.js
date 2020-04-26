const Config = require('../../lib/services/config');

describe('configService', function () {
  let container;

  function configProvider() {
    this.file = () => this;
  }

  beforeEach(function () {
    container = {
      path: { join: () => {} },
      nconf: {
        Provider: configProvider,
      },
      process: { env: {} },
    };
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('load', function () {
    it('should store an nconf provider', function () {
      const configService = new Config(container);
      configService.load();

      expect(configService.configProvider)
        .to
        .be
        .an
        .instanceOf(configProvider);
    });

    it('should fill NODE_ENV it is undefined', function () {
      const configService = new Config(container);
      configService.load();

      expect(container.process.env.NODE_ENV)
        .to
        .be
        .equal('development');
    });

    it('should not fill NODE_ENV', function () {
      container.process.env.NODE_ENV = 'production'

      const configService = new Config(container);
      configService.load();

      expect(container.process.env.NODE_ENV)
        .to
        .be
        .equal('production');
    });

    it('should load environment config');
  });

  describe('get', function () {
    it('should return nconf provider get', function () {
      const configService = new Config();
      const value = 'a';
      configService.configProvider = { get: sinon.stub().returns(value) };

      const result = configService.get('prop');

      expect(configService.configProvider.get)
        .to
        .have
        .been
        .calledOnceWith('prop');

      expect(result).to.be.equal(value);
    });
  });
});
