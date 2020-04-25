const Server = require('../lib/server');

describe('server', function () {
  const sandbox = sinon.createSandbox();
  let container;

  beforeEach(function () {
    container = {
      dotenv: {
        config: sandbox.stub(),
      },
    };
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('loadEnv', function () {
    it('should load environment using dotenv', async function () {
      const server = new Server(container);
      server.loadEnv();

      expect(container.dotenv.config)
        .to
        .have
        .been
        .calledOnce;
    });
  });
});
