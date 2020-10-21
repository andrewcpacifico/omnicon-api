/* tslint:disable only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import sinon from 'sinon';

import { corsMiddleware } from '.';

describe('corsMiddleware', function () {
  describe('handler', function () {
    it('should add cors headers to response', function () {
      const req: any = {};
      const res: any = {
        setHeader: sinon.stub(),
      };
      const next: any = sinon.stub();

      const middleware = corsMiddleware();
      middleware(req, res, next);

      expect(res.setHeader).to.have.been.calledTwice;
      expect(res.setHeader.firstCall).to.have.been.calledWith('Access-Control-Allow-Origin', '*');
      expect(res.setHeader.secondCall).to.have.been.calledWith('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    });

    it('should call next after set headers', function () {
      const req: any = {};
      const res: any = {
        setHeader: sinon.stub(),
      };
      const next: any = sinon.stub();

      const middleware = corsMiddleware();
      middleware(req, res, next);

      expect(next).to.have.been.calledOnce;
      expect(next.firstCall).to.have.been.calledImmediatelyAfter(res.setHeader.secondCall);
    });
  });
});
