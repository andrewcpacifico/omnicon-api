import { asClass, asValue, createContainer, asFunction } from 'awilix';
import bodyParser from 'body-parser';
import express, { Router } from 'express';
import mongoose, { Mongoose } from 'mongoose';
import { Provider } from 'nconf';
import pino from 'pino';

import { IConfigService, IDatabaseService, ILoggerService } from './services';
import { NconfConfigService } from './services/config';
import { MongoService } from './services/database';
import { PinoLoggerService } from './services/logger';

import { v1MainRouter } from './routes';

import server, { IServer } from './server';
import { BodyParser, Express, Pino } from './types-3rd';
import { IMiddleware, bodyParserMiddleware } from './middlewares';

export interface DependencyContainer {
  // node
  process: NodeJS.Process;

  // 3rd
  bodyParser: BodyParser;
  express: Express;
  nconfProvider: Provider;
  mongoose: Mongoose;
  pino: Pino;

  // services
  configService: IConfigService;
  databaseService: IDatabaseService;
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
    mongoose: asValue(mongoose),
    nconfProvider: asValue(new Provider()),
    pino: asValue(pino),

    process: asValue(process),

    // services
    configService: asClass(NconfConfigService).singleton(),
    databaseService: asClass(MongoService).singleton(),
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
