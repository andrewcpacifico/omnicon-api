import sinon from 'sinon';
import { expect } from 'chai';

import { NconfConfig } from '../../../src/services/config';

describe('configService', function () {
  let container: any;

  beforeEach(function () {
    container = {
      path: { join() {} },
      nconfProvider: { file() { return this; }, get() {} },
      process: { env: {} },
    };
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('load', function () {
    it('should fill NODE_ENV if it is undefined', function () {
      const configService = new NconfConfig(container);
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
      const configService = new Config(container);
      const value = 'a';

      sinon.stub(container.nconfProvider, 'get').returns(value);
      const result = configService.get('prop');

      expect(container.nconfProvider.get)
        .to
        .have
        .been
        .calledOnceWith('prop');

      expect(result).to.be.equal(value);
    });
  });
});
