/* tslint:disable only-arrow-functions no-unused-expression no-string-literal */

import { expect } from 'chai';
import sinon from 'sinon';

import { v1TaskRouter } from './task';

describe('taskRouter', function () {
  let container: any;
  let expressMock: any;
  let joiMock: any;
  let taskControllerMock: any;
  let routerMock: any;
  let validateMock: any;

  beforeEach(function () {
    routerMock = {
      get: sinon.stub().returnsThis(),
      route: sinon.stub().returnsThis(),
    };
    expressMock = { Router: sinon.stub().returns(routerMock) };
    joiMock = {
      date: sinon.stub().returnsThis(),
      integer: sinon.stub().returnsThis(),
      min: sinon.stub().returnsThis(),
      number: sinon.stub().returnsThis(),
      object: sinon.stub().returnsThis(),
      positive: sinon.stub().returnsThis(),
    };
    taskControllerMock = { list: sinon.stub() };
    validateMock = sinon.stub();
    container = {
      express: expressMock,
      joi: joiMock,
      taskController: taskControllerMock,
      validate: validateMock,
    };
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('general', function () {
    it('should return a new express router', async function () {
      const { express } = container;
      const taskRouter = v1TaskRouter(container);

      expect(express.Router).to.have.been.calledOnce;
      expect(taskRouter).to.equal(routerMock);
    });
  });

  describe('GET /', function () {
    let getStub: any;

    beforeEach(function () {
      getStub = sinon.stub();
      routerMock.route = sinon.stub().returns({ get: getStub });
    });

    it('should register a get handler', async function () {
      v1TaskRouter(container);

      expect(routerMock.route).to.have.been.calledOnceWith('/');
      expect(getStub).to.have.been.calledOnce;
    });

    it('should pass a validate middleware to handler', async function () {
      const middlewareResult = {};
      container.validate = sinon.stub().returns(middlewareResult);
      v1TaskRouter(container);

      expect(container.validate).to.have.been.calledOnce;
      expect(getStub).to.have.been.calledOnceWith(middlewareResult);
    });

    it('should attach taskController.list to handle request', async function () {
      const { taskController } = container;
      v1TaskRouter(container);

      expect(getStub).to.have.been.calledOnceWith(sinon.match.any, taskController.list);
    });
  });
});
