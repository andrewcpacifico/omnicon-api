/* tslint:disable only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import sinon from 'sinon';
import { taskControllerModule, ITaskController } from './task';

describe('TaskController', function () {
  let container: any;
  let taskController: ITaskController;
  let formatterMock: any;
  let reqMock: any;
  let resMock: any;

  beforeEach(function() {
    formatterMock = { format: sinon.stub() };
    resMock = { json: sinon.stub() };
    reqMock = {
      query: {
        dueDate: new Date(),
        limit: 10,
        offset: 0
      },
    };
    container = {
      taskService: { getAll: sinon.stub() },
      taskListFormatter: formatterMock,
    };
    taskController = taskControllerModule(container);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('list', function () {
    it('should res.json once with taskService formatted result', async function() {
      const { taskService } = container;
      const tasks = [{ _id: '123', title: 'task 1'}];
      const formattedTasks = [{ id: '123', title: 'task 1'}];

      taskService.getAll = sinon.stub().resolves(tasks);
      formatterMock.format.returns(formattedTasks)

      await taskController.list(reqMock, resMock);

      expect(resMock.json).to.have.been.calledOnceWith(formattedTasks);
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

    it('dueDate filter should not be defined if no dueDate is given via req.query', async function() {
      const { taskService } = container;
      const { limit, offset } = reqMock.query;

      delete reqMock.query.dueDate;

      await taskController.list(reqMock, resMock);

      expect(taskService.getAll).to.have.been.calledOnceWithExactly({
        filter: {},
        limit,
        offset,
      });
    });
  });
});
