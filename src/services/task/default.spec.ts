/* tslint:disable only-arrow-functions no-unused-expression no-string-literal */

import sinon from 'sinon';
import { expect } from 'chai';
import { DefaultTaskService } from './default';

describe('DefaultTaskService', function () {
  let container: any;

  beforeEach(function () {
    container = {
      taskDao: { find: sinon.stub() },
    };
  });

  describe('getAll', function () {
    it('should call taskDao.find only once', async function () {
      const { taskDao } = container;

      const service = new DefaultTaskService(container);
      await service.getAll();

      expect(taskDao.find).to.have.been.calledOnce;
    });

    it('should call taskDao.find correct query', async function () {
      const { taskDao } = container;

      const service = new DefaultTaskService(container);
      await service.getAll();

      expect(taskDao.find).to.have.been.calledWith({});
    });

    it('should return taskDao.find', async function () {
      const result: any = [];
      const { taskDao } = container;
      taskDao.find.returns(result);

      const service = new DefaultTaskService(container);
      const tasks = await service.getAll();

      expect(tasks).to.be.equal(result);
    });
  });
});
