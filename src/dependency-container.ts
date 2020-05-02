import { asClass, asValue, createContainer } from 'awilix';
import mongoose, { Mongoose } from 'mongoose';
import { Provider } from 'nconf';
import pino from 'pino';

import { IConfigService, IDatabaseService, ILoggerService } from './services';
import { NconfConfigService } from './services/config';
import { MongoService } from './services/database';
import { PinoLoggerService } from './services/logger';

export interface DependencyContainer {
  // node
  process: NodeJS.Process;
  pino: typeof pino;
  mongoose: Mongoose;

  // 3rd
  nconfProvider: Provider;

  // internal
  configService: IConfigService;
  loggerService: ILoggerService;
  databaseService: IDatabaseService;
}

export function registerDependencies(): DependencyContainer {
  const container = createContainer<DependencyContainer>();

  container.register({
    mongoose: asValue(mongoose),
    nconfProvider: asValue(new Provider()),
    pino: asValue(pino),

    process: asValue(process),

    configService: asClass(NconfConfigService).singleton(),
    loggerService: asClass(PinoLoggerService).singleton(),
    databaseService: asClass(MongoService).singleton(),
  });

  return container.cradle;
}
