import { Provider } from 'nconf';

import { DependencyContainer } from '../dependency-container';

export class Config {
  private container: DependencyContainer;
  private configProvider: Provider;

  constructor(container: DependencyContainer) {
    this.container = container;
    this.configProvider = container.nconfProvider;
  }

  load() {
    const { path, process } = this.container;
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    this.configProvider.file('environment', {
      file: path.join(__dirname, `../../config/${process.env.NODE_ENV}.json`),
    }).file('default', {
      file: path.join(__dirname, '../../config/default.json'),
    });
  }

  get(property: string) {
    return this.configProvider.get(property);
  }
}
