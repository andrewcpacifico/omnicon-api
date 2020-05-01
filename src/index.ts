import { DependencyContainer, registerDependencies } from './dependency-container';

const dependencyContainer: DependencyContainer = registerDependencies();

function initialize() {
  const { configService, loggerService } = dependencyContainer;

  configService.load();
  loggerService.init();
}

initialize();
