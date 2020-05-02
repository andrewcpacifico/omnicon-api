import { asClass, asValue, createContainer } from 'awilix';
import express from 'express';
import mongoose, { Mongoose } from 'mongoose';
import { Provider } from 'nconf';
import pino from 'pino';

import { IServer, ExpressServer } from './server';
import { IConfigService, IDatabaseService, ILoggerService } from './services';
import { NconfConfigService } from './services/config';
import { MongoService } from './services/database';
import { PinoLoggerService } from './services/logger';

type ExpressCreator = typeof express;

export interface DependencyContainer {
  // node
  process: NodeJS.Process;

  // 3rd
  express: ExpressCreator;
  nconfProvider: Provider;
  mongoose: Mongoose;
  pino: typeof pino;

  // internal
  configService: IConfigService;
  databaseService: IDatabaseService;
  loggerService: ILoggerService;
  server: IServer;
}

export function registerDependencies(): DependencyContainer {
  const container = createContainer<DependencyContainer>();

  container.register({
    express: asValue(express),
    mongoose: asValue(mongoose),
    nconfProvider: asValue(new Provider()),
    pino: asValue(pino),

    process: asValue(process),

    configService: asClass(NconfConfigService).singleton(),
    databaseService: asClass(MongoService).singleton(),
    loggerService: asClass(PinoLoggerService).singleton(),
    server: asClass(ExpressServer).singleton(),
  });

  return container.cradle;
}
