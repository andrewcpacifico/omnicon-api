/* tslint:disable only-arrow-functions no-unused-expression no-string-literal */

import { expect } from 'chai';
import sinon from 'sinon';

import { v1MainRouter } from './main';

describe('taskRouter', function () {
  let container: any;
  let expressMock: any;
  let routerMock: any;
  let v1TaskRouterMock: any;

  beforeEach(function () {
    routerMock = {
      get: sinon.stub().returnsThis(),
      use: sinon.stub().returnsThis(),
    };
    expressMock = { Router: sinon.stub().returns(routerMock) };
    v1TaskRouterMock = sinon.stub();
    container = {
      express: expressMock,
      v1TaskRouter: v1TaskRouterMock,
    };
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should return a new express router', async function () {
    const { express } = container;
    const taskRouter = v1MainRouter(container);

    expect(express.Router).to.have.been.calledOnce;
    expect(taskRouter).to.equal(routerMock);
  });

  it('should register /tasks router', async function () {
    v1MainRouter(container);

    expect(routerMock.use).to.have.been.calledOnceWith('/tasks', v1TaskRouterMock);
  });

  it('should register /health handler', async function () {
    v1MainRouter(container);

    expect(routerMock.get).to.have.been.calledOnceWith('/health', sinon.match.func);
  });
});
