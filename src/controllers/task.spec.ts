/* tslint:disable only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import sinon from 'sinon';
import { taskControllerModule, ITaskController } from './task';

describe('TaskController', function () {
  let container: any;
  let taskController: ITaskController;
  let reqMock: any;
  let resMock: any;

  beforeEach(function() {
    resMock = { json: sinon.stub() };
    reqMock = {
      query: {
        dueDate: new Date(),
        limit: 10,
        offset: 0
      },
    };
    container = {
      taskService: { getAll: sinon.stub() }
    };
    taskController = taskControllerModule(container);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('list', function () {
    it('should res.json once with taskService result', async function() {
      const { taskService } = container;
      const tasks = [{ id: 'task 1'}];

      taskService.getAll = sinon.stub().resolves(tasks);

      await taskController.list(reqMock, resMock);

      expect(resMock.json).to.have.been.calledOnceWith(tasks);
    });

    it('should call taskService.getAll once with correct arguments', async function() {
      const { taskService } = container;
      const { dueDate, limit, offset } = reqMock.query;

      await taskController.list(reqMock, resMock);

      expect(taskService.getAll).to.have.been.calledOnceWithExactly({
        filter: { dueDate },
        limit,
        offset,
      });
    });
  });
});
