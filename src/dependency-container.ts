import { asClass, asValue, createContainer } from 'awilix';
import { Provider } from 'nconf';
import pino from 'pino';

import { IConfigService, ILoggerService } from './services';
import { NconfConfigService } from './services/config';
import { PinoLoggerService } from './services/logger';

export interface DependencyContainer {
  // node
  process: NodeJS.Process;
  pino: any;

  // 3rd
  nconfProvider: Provider;

  // internal
  configService: IConfigService;
  loggerService: ILoggerService;
}

export function registerDependencies(): DependencyContainer {
  const container = createContainer<DependencyContainer>();

  container.register({
    nconfProvider: asClass(Provider),
    pino: asValue(pino),

    process: asValue(process),

    configService: asClass(NconfConfigService).singleton(),
    loggerService: asClass(PinoLoggerService).singleton(),
  });

  return container.cradle;
}
