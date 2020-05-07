import { asClass, asValue, createContainer, asFunction, aliasTo } from 'awilix';
import bodyParser from 'body-parser';
import express, { Router } from 'express';
import mongo from 'mongodb';
import { Provider } from 'nconf';
import pino from 'pino';

import { IDao } from './dao';
import { TaskMongoDao } from './dao/mongo';

import { Task } from './models';

import { IConfigService, IDatabaseService, ILoggerService } from './services';
import { NconfConfigService } from './services/config';
import { MongoService } from './services/database';
import { PinoLoggerService } from './services/logger';

import { v1MainRouter } from './routes';

import server, { IServer } from './server';
import { BodyParser, Express, MongoModule, Pino } from './types-3rd';
import { IMiddleware, bodyParserMiddleware } from './middlewares';

export interface DependencyContainer {
  // node
  process: NodeJS.Process;

  // 3rd
  bodyParser: BodyParser;
  express: Express;
  mongo: MongoModule;
  nconfProvider: Provider;
  pino: Pino;

  // dao
  taskDao: IDao<Task>;

  // services
  configService: IConfigService;
  databaseService: IDatabaseService;
  mongoService: MongoService;
  loggerService: ILoggerService;

  // routes
  v1MainRouter: Router;

  // middlewares
  middlewares: IMiddleware[];

  // general
  server: IServer;
}

export function registerDependencies(): DependencyContainer {
  const container = createContainer<DependencyContainer>();

  container.register({
    bodyParser: asValue(bodyParser),
    express: asValue(express),
    mongo: asValue(mongo),
    nconfProvider: asValue(new Provider()),
    pino: asValue(pino),

    process: asValue(process),
  });

  // dao
  container.register({
    taskDao: asClass(TaskMongoDao).singleton(),
  });

  container.register({
    // services
    configService: asClass(NconfConfigService).singleton(),
    mongoService: asClass(MongoService).singleton(),
    databaseService: aliasTo('mongoService'),
    loggerService: asClass(PinoLoggerService).singleton(),

    // general
    server: asFunction(server).singleton(),
  });

  // middlewares
  container.register({
    middlewares: asValue([
      asFunction(bodyParserMiddleware).resolve(container),
    ]),
  });

  // routes
  container.register({
    v1MainRouter: asFunction(v1MainRouter).singleton(),
  });

  return container.cradle;
}
