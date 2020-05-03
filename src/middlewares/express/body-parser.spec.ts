import { expect } from 'chai';
import sinon from 'sinon';

import { BodyParserMiddleware } from '.';

describe('BodyParserMiddleware', function () {
  let container: any;
  let jsonHandler: any;

  beforeEach(function () {
    jsonHandler = sinon.stub();
    container = {
      bodyParser: { json: sinon.stub().returns(jsonHandler) },
    };
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('handler', function () {
    it('should call body-parser json handler', function () {
      const req: any = {};
      const res: any = {};
      const next: any = {};
      const { bodyParser } = container;

      const middleware = new BodyParserMiddleware(container);
      middleware.handler(req, res, next);

      expect(bodyParser.json).to.have.been.calledOnce;
      expect(jsonHandler).to.have.been.calledOnceWith(req, res, next);
    });
  });
});
