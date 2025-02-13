import { asClass, asValue, createContainer, asFunction, aliasTo } from 'awilix';
import bodyParser from 'body-parser';
import express, { Router } from 'express';
import { Joi, validate } from 'express-validation';
import moment from 'moment';
import mongo from 'mongodb';
import { Provider } from 'nconf';
import pino from 'pino';

import {
  BodyParser,
  Express,
  JoiModule,
  MongoModule,
  ValidateMiddleware,
  Pino,
  MomentModule,
} from './types-3rd';

import { IDao } from './dao';
import { TaskMongoDao } from './dao/mongo';

import { Task } from './models';

import {
  IConfigService,
  IDatabaseService,
  ILoggerService,
  ITaskService,
} from './services';
import { NconfConfigService } from './services/config';
import { MongoService } from './services/database';
import { PinoLoggerService } from './services/logger';
import { DefaultTaskService } from './services/task';

import { taskControllerModule, ITaskController } from './controllers';

import { v1MainRouter, v1TaskRouter } from './routes/v1';

import server, { IServer } from './server';
import { IMiddleware, bodyParserMiddleware, corsMiddleware } from './middlewares';
import { TaskListFormatter } from './formatters/task';
import { IFormatter } from './formatters';

export interface DependencyContainer {
  // node
  process: NodeJS.Process;

  // 3rd
  bodyParser: BodyParser;
  express: Express;
  joi: JoiModule;
  moment: MomentModule;
  mongo: MongoModule;
  nconfProvider: Provider;
  pino: Pino;
  validate: ValidateMiddleware;

  // dao
  taskDao: IDao<Task>;

  // services
  configService: IConfigService;
  databaseService: IDatabaseService;
  mongoService: MongoService;
  loggerService: ILoggerService;
  taskService: ITaskService;

  // formatters
  taskListFormatter: IFormatter<Task>;

  // controllers
  taskController: ITaskController;

  // routes
  v1MainRouter: Router;
  v1TaskRouter: Router;

  // middlewares
  middlewares: IMiddleware[];

  // general
  server: IServer;
}

function registerDependencies(): DependencyContainer {
  const container = createContainer<DependencyContainer>();

  container.register({
    bodyParser: asValue(bodyParser),
    express: asValue(express),
    joi: asValue(Joi),
    moment: asValue(moment),
    mongo: asValue(mongo),
    nconfProvider: asValue(new Provider()),
    pino: asValue(pino),
    validate: asValue(validate),

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
    taskService: asClass(DefaultTaskService).singleton(),

    // formatters
    taskListFormatter: asClass(TaskListFormatter).singleton(),

    // general
    server: asFunction(server).singleton(),
  });

  // controllers
  container.register({
    taskController: asFunction(taskControllerModule).singleton(),
  });

  // middlewares
  container.register({
    middlewares: asValue([
      asFunction(bodyParserMiddleware).resolve(container),
      asFunction(corsMiddleware).resolve(container),
    ]),
  });

  // routes
  container.register({
    v1MainRouter: asFunction(v1MainRouter).singleton(),
    v1TaskRouter: asFunction(v1TaskRouter).singleton(),
  });

  return container.cradle;
}

export const dependencyContainer = registerDependencies();
