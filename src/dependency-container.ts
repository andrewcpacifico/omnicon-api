import { asClass, asValue, createContainer } from 'awilix';
import { Provider } from 'nconf';

import { IConfigService, NconfConfigService } from './services/config';

export interface DependencyContainer {
  // node
  process: NodeJS.Process

  // 3rd
  nconfProvider: Provider,

  // internal
  configService: IConfigService
}

export function registerDependencies(): DependencyContainer {
  const container = createContainer<DependencyContainer>();

  container.register({
    nconfProvider: asClass(Provider),
    process: asValue(process),
    configService: asClass(NconfConfigService).singleton(),
  });

  return container.cradle;
}
