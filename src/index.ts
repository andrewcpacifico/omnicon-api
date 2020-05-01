import { DependencyContainer, registerDependencies } from './dependency-container';

const dependencyContainer: DependencyContainer = registerDependencies();

function initialize() {
  const { configService } = dependencyContainer;

  configService.load();
}

initialize();
