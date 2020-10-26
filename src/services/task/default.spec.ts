/* tslint:disable only-arrow-functions no-unused-expression no-string-literal */

import sinon from 'sinon';
import { expect } from 'chai';
import { DefaultTaskService } from './default';

describe('DefaultTaskService', function () {
  let container: any;

  beforeEach(function () {
    container = {
      taskDao: { find: sinon.stub() },
      moment: {
        utc: sinon.stub().returnsThis(),
        startOf: sinon.stub().returnsThis(),
        endOf: sinon.stub().returnsThis(),
        clone: sinon.stub().returnsThis(),
        toDate: sinon.stub(),
      },
    };
  });

  describe('getAll', function () {
    it('should call taskDao.find only once', async function () {
      const { taskDao } = container;

      const service = new DefaultTaskService(container);
      await service.getAll();

      expect(taskDao.find).to.have.been.calledOnce;
    });

    it('should call taskDao.find with correct query', async function () {
      const { taskDao } = container;
      const startDate = new Date('2020-10-01T00:00:00.000Z');
      const endDate = new Date('2020-10-01T23:59:59.999Z');
      const filter = { dueDate: startDate };

      container.moment.toDate = sinon.stub().returns(startDate);
      container.moment.clone = () => ({
        endOf: () => ({
          toDate: sinon.stub().returns(endDate),
        }),
      });

      const service = new DefaultTaskService(container);
      await service.getAll({ filter });

      expect(taskDao.find).to.have.been.calledWith({
        dueDate: {
          $gte: startDate,
          $lte: endDate,
        },
      });
    });

    it('should call taskDao.find with limit and offset parameters', async function () {
      const { taskDao } = container;
      const limit = 2;
      const offset = 3;

      const service = new DefaultTaskService(container);
      await service.getAll({ limit, offset });

      expect(taskDao.find).to.have.been.calledWith({}, { limit, offset });
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
