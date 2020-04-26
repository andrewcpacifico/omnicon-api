import { asClass, asValue, createContainer } from 'awilix';
import { Provider } from 'nconf';
import path from 'path';

export interface DependencyContainer {
  nconfProvider: Provider
  process: NodeJS.Process
  path: path.PlatformPath
}

export function registerDependencies() {
  const container = createContainer<DependencyContainer>();

  // external dependencies
  container.register({
    nconfProvider: asClass(Provider),
    process: asValue(process),
    path: asValue(path),
  });
}
