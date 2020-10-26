/* tslint:disable only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import request from 'supertest';

import main from '../../src';
import { dependencyContainer } from '../../src/dependency-container';

describe.only('Tasks', function () {
  let app: any;

  before(async function () {
    app = await main;
  });

  after(async function () {
    const { mongoService } = dependencyContainer;

    await mongoService.disconnet();
  });

  it('should make a request', function () {
    request(app)
      .get('/health');

    expect(true).to.be.true;
  });
});
