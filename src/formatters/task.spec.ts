/* tslint:disable only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import sinon from 'sinon';

import { TaskListFormatter } from './task';

describe('TaskFormatter', function () {
  it('should map _id field to id', function() {
    const strIdA = '123';
    const strIdB = '456';
    const idA = { toHexString: sinon.stub().returns(strIdA) };
    const idB = { toHexString: sinon.stub().returns(strIdB) };
    const aDate = new Date();
    const anotherDate = new Date('1970-01-01T00:00:00.000Z');

    const tasks: any = [
      { _id: idA, title: 'task 1' },
      { _id: idB, title: 'task 2', createdAt: anotherDate, updatedAt: aDate, dueDate: aDate }
    ];
    const formatted = [
      { id: strIdA, title: 'task 1', createdAt: undefined, updatedAt: undefined, dueDate: undefined },
      { id: strIdB, title: 'task 2', createdAt: anotherDate, updatedAt: aDate, dueDate: aDate },
    ];

    const formatter = new TaskListFormatter();
    const response = formatter.format(tasks);

    expect(formatted).to.deep.equal(response)
;  });
});
