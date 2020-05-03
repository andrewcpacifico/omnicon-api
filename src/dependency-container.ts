import { asClass, asValue, createContainer } from 'awilix';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose, { Mongoose } from 'mongoose';
import { Provider } from 'nconf';
import pino from 'pino';

import { IConfigService, IDatabaseService, ILoggerService } from './services';
import { NconfConfigService } from './services/config';
import { MongoService } from './services/database';
import { PinoLoggerService } from './services/logger';

import { IMiddleware } from './middlewares';
import { BodyParserMiddleware } from './middlewares/express';

import { IServer, ExpressServer } from './server';
import { BodyParser, Express, Pino } from './types-3rd';

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

  // middlewares
  bodyParserMiddleware: IMiddleware;

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

    // middlewares
    bodyParserMiddleware: asClass(BodyParserMiddleware).singleton(),

    // general
    server: asClass(ExpressServer).singleton(),
  });

  return container.cradle;
}
