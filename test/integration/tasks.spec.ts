/* tslint:disable only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import { ObjectID } from 'mongodb';
import request from 'supertest';

import main from '../../src';
import { dependencyContainer } from '../../src/dependency-container';

function getCollection(collection: string) {
  const { configService, mongoService } = dependencyContainer;
  const mongoClient = mongoService.getClient();
  const db = mongoClient.db(configService.get('mongo:database'));

  return db.collection(collection);
}

describe.only('Tasks', function () {
  let app: any;

  before(async function () {
    app = await main;
  });

  after(async function () {
    const { mongoService } = dependencyContainer;

    await mongoService.disconnet();
  });

  describe('GET /v1/tasks', function () {
    const tasks = [
      {
        _id: new ObjectID(),
        title: 'task 1',
        createdAt: new Date(),
        dueDate: new Date('2020-10-01T01:00:00.000Z'),
      },
      {
        _id: new ObjectID(),
        title: 'task 2',
        createdAt: new Date(),
        dueDate: new Date('2020-10-01T00:00:00.000Z'),
      },
      {
        _id: new ObjectID(),
        title: 'task 3',
        createdAt: new Date(),
      },
      {
        _id: new ObjectID(),
        title: 'task 4',
        createdAt: new Date(),
      },
      {
        _id: new ObjectID(),
        title: 'task 5',
        createdAt: new Date(),
      },
    ];

    before(function () {
      const collection = getCollection('tasks');
      return collection.insertMany(tasks);
    });

    after(function () {
      const collection = getCollection('tasks');
      return collection.deleteMany({});
    });

    it('should respond with correct array of tasks', async function () {
      const expectedTasks = tasks.map(({ _id, title, createdAt, dueDate }) => ({
        id: _id.toHexString(),
        title,
        ...(dueDate !== undefined) && { dueDate: dueDate.toISOString() },
        ...(createdAt !== undefined) && { createdAt: createdAt.toISOString() },
      }));

      const res = await request(app)
        .get('/v1/tasks');

      expect(res.status).to.be.equal(200);
      expect(res.header['Content-Type'], 'application/json');
      expect(res.body).to.be.deep.equal(expectedTasks);
    });

    it('should slice result using limit parameter', async function () {
      const expectedTasks = tasks.map(({ _id, title, createdAt, dueDate }) => ({
        id: _id.toHexString(),
        title,
        ...(dueDate !== undefined) && { dueDate: dueDate.toISOString() },
        ...(createdAt !== undefined) && { createdAt: createdAt.toISOString() },
      })).slice(0, 2);

      const res = await request(app)
        .get('/v1/tasks?limit=2');

      expect(res.status).to.be.equal(200);
      expect(res.header['Content-Type'], 'application/json');
      expect(res.body).to.be.deep.equal(expectedTasks);
    });

    it('should paginate correctly', async function () {
      const expectedTasks = tasks.map(({ _id, title, createdAt, dueDate }) => ({
        id: _id.toHexString(),
        title,
        ...(dueDate !== undefined) && { dueDate: dueDate.toISOString() },
        ...(createdAt !== undefined) && { createdAt: createdAt.toISOString() },
      })).slice(2, 4);

      const res = await request(app)
        .get('/v1/tasks?limit=2&offset=2');

      expect(res.status).to.be.equal(200);
      expect(res.header['Content-Type'], 'application/json');
      expect(res.body).to.be.deep.equal(expectedTasks);
    });

    it('should filter by dueDate', async function () {
      const expectedTasks = tasks.map(({ _id, title, createdAt, dueDate }) => ({
        id: _id.toHexString(),
        title,
        ...(dueDate !== undefined) && { dueDate: dueDate.toISOString() },
        ...(createdAt !== undefined) && { createdAt: createdAt.toISOString() },
      })).filter(task => !!task.dueDate);

      const res = await request(app)
        .get('/v1/tasks?dueDate=2020-10-01');

      expect(res.status).to.be.equal(200);
      expect(res.header['Content-Type'], 'application/json');
      expect(res.body).to.be.deep.equal(expectedTasks);
    });
  });
});
