import { expect } from 'chai';
import sinon from 'sinon';

import { ExpressServer } from '.';

describe('expressServer', function () {
  let container: any;
  let expressApp: any;
  let config: any;

  beforeEach(function () {
    config = { port: 123 };
    expressApp = {
      listen: sinon.stub().callsFake(({}, cb) => cb()),
    };
    container = {
      express: sinon.stub().returns(expressApp),
      configService: { get: sinon.stub().returns(config) },
      loggerService: { info: sinon.stub() },
    };
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('start', function () {
    it('should create an express app', async function () {
      const { express } = container;

      const server = new ExpressServer(container);
      await server.start();

      expect(express).to.have.been.calledOnce;
    });

    it('should start express app with configured port', async function () {
      const server = new ExpressServer(container);
      await server.start();

      expect(expressApp.listen).to.have.been.calledOnceWith(config.port);
    });

    it('should reject if express.listen returns error', async function () {
      const error = new Error();
      expressApp.listen = ({}, cb: any) => {
        cb(error);
      };

      const server = new ExpressServer(container);
      try {
        await server.start();
      } catch(err) {
        expect(err).to.be.equal(error);
      }
    });
  });
});
